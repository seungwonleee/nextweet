import React, { useCallback, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormWrapper,
  SubmitButton,
  UploadButton,
  ButtonWrapper,
  StyledTextArea,
  RemoveButton,
  ImageWrapper,
} from './styles';
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
} from '../../reducers/post';
import useInput from '../hooks/useInput';
// import backUrl from '../config/config';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [text, setText, resetText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      resetText('');
    }
  }, [addPostDone]);

  const handleSubmit = useCallback(() => {
    if (!me) {
      return alert('로그인 후 이용 가능합니다.');
    }
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((path) => {
      formData.append('image', path); // backend에서 req.body.image로 받을 수 있다.
    });
    formData.append('content', text); // backend에서 req.body.content로 받을 수 있다.

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const imageInput = useRef();
  const handleImageUpload = useCallback(() => {
    if (!me) {
      return alert('로그인 후 이용 가능합니다.');
    }
    imageInput.current.click();
  }, [imageInput.current, me]);

  const handleChangeImages = useCallback((e) => {
    // console.log('images', e.target.files); // image에 대한 정보
    const fileCount = e.target.files.length;
    if (fileCount > 4) {
      return alert('사진은 최대 4개까지 가능합니다.');
    }

    const fileList = Array.from(e.target.files);

    // 20MB 미만 업로드시 true 20MB 이상 false
    const isUnderSize = (file) => (file.size / (1024 * 1024)).toFixed(2) < 20;

    const restrictFileSize = fileList.every(isUnderSize);
    if (!restrictFileSize) {
      return alert('20MB 미만의 사진만 업로드 할 수 있습니다.');
    }

    // 파일 확장자 jpeg, jpg, png만 업로드 가능
    const result = fileList.every(
      (file) =>
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png',
    );

    if (!result) {
      return alert('png, jpg, jpeg 확장자만 가능합니다.');
    }

    const imageFormData = new FormData(); // multipart로 백엔드로 전송가능, 백엔드에서 multer가 처리하기 위해서는 FormData로 전송하기
    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('image', file);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  });

  const handleRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });

  return (
    <FormWrapper encType="multipart/form-data" onFinish={handleSubmit}>
      <StyledTextArea
        value={text}
        onChange={setText}
        maxLength={200}
        placeholder="어떤 신기한 일이 있었나요?(200자)"
        autoSize={{ minRows: 3, maxRows: 3 }}
      />
      <ButtonWrapper>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={handleChangeImages}
        />
        <UploadButton onClick={handleImageUpload}>이미지 업로드</UploadButton>
        <SubmitButton type="primary" htmlType="submit">
          트윗
        </SubmitButton>
      </ButtonWrapper>
      <div>
        {imagePaths.map((value, index) => (
          <ImageWrapper key={value}>
            <img
              src={value.replace(/\/thumb\//, '/original/')} // s3 image
              style={{ width: '200px' }}
              alt={value}
            />
            <div>
              <RemoveButton onClick={handleRemoveImage(index)}>
                제거
              </RemoveButton>
            </div>
          </ImageWrapper>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostForm;
