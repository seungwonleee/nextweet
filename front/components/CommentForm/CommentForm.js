import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'antd';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
import { StyledTextArea, FormItem, SubmitButton } from './styles';

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
        <StyledTextArea
          value={commentText}
          onChange={setCommentText}
          row={4}
          maxLength={15}
          placeholder="댓글 (15자)"
          autoSize={{ minRows: 2, maxRows: 2 }}
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
