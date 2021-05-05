import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import useInput from "./hooks/useInput";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, setCommentText] = useInput("");

  const handleSubmit = useCallback(() => {
    console.log(id, post.id, commentText);
  }, [commentText]);

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea value={commentText} onChange={setCommentText} row={4} />
        <Button
          style={{
            position: "absolute",
            right: 0,
            bottom: "-40px",
            zIndex: "20",
          }}
          type="primary"
          htmlType="submit"
        >
          댓글쓰기
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
