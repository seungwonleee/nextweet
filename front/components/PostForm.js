import React, { useCallback, useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

const { TextArea } = Input;

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const imageInput = useRef();
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChangeText = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);

  const handleImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={handleSubmit}
    >
      <TextArea
        value={text}
        onChange={handleChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={handleImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          트윗
        </Button>
      </div>
      <div>
        {imagePaths.map((value) => (
          <div key={value} style={{ display: "inline-block" }}>
            <img src={value} style={{ width: "200px" }} alt={value} />
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
