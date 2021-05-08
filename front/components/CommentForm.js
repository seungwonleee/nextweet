import React, { useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import useInput from "./hooks/useInput";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);
  const [commentText, setCommentText, resetCommentText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      resetCommentText("");
    }
  }, [addCommentDone]);

  const handleSubmit = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: id,
      },
    });
  }, [commentText, id]);

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
