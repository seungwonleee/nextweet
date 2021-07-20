import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import useInput from './hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const SubmitButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
  z-index: 20;
`;

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post,
  );
  const [commentText, setCommentText, resetCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      resetCommentText('');
    }
  }, [addCommentDone]);

  const handleSubmit = useCallback(() => {
    if (!me) {
      return alert('로그인 후 이용 가능합니다.');
    }
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
      <FormItem>
        <Input.TextArea
          value={commentText}
          onChange={setCommentText}
          row={4}
          maxLength={15}
          placeholder="댓글 (15자)"
        />
        <SubmitButton
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          댓글쓰기
        </SubmitButton>
      </FormItem>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
