import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE,
  ADD_POST_REQUEST,
} from '../reducers/post';
import useInput from './hooks/useInput';

const { TextArea } = Input;

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
  }, [imageInput.current]);

  const handleChangeImages = useCallback((e) => {
    console.log('images', e.target.files); // image에 대한 정보
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
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={handleSubmit}
    >
      <TextArea
        value={text}
        onChange={setText}
        maxLength={30}
        placeholder="어떤 신기한 일이 있었나요?(30자)"
      />
      <div>
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={handleChangeImages}
        />
        <Button onClick={handleImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          트윗
        </Button>
      </div>
      <div>
        {imagePaths.map((value, index) => (
          <div key={value} style={{ display: 'inline-block' }}>
            <img
              src={`http://localhost:3065/${value}`}
              style={{ width: '200px' }}
              alt={value}
            />
            <div>
              <Button onClick={handleRemoveImage(index)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
