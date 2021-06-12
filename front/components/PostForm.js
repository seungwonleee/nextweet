import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import useInput from './hooks/useInput';

const { TextArea } = Input;

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [text, setText, resetText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      resetText('');
    }
  }, [addPostDone]);

  const handleSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const imageInput = useRef();
  const handleImageUpload = useCallback(() => {
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

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={handleSubmit}
    >
      <TextArea
        value={text}
        onChange={setText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
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
        {imagePaths.map((value) => (
          <div key={value} style={{ display: 'inline-block' }}>
            <img src={value} style={{ width: '200px' }} alt={value} />
          </div>
        ))}
        <div>
          <Button>제거</Button>
        </div>
      </div>
    </Form>
  );
};

export default PostForm;
