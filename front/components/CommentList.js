import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, List, Comment, Input } from 'antd';
import PropTypes from 'prop-types';
import {
  DELETE_COMMENT_REQUEST,
  UPDATE_COMMENT_REQUEST,
} from '../reducers/post';

const { TextArea } = Input;

const CommentList = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);

  const [modify, setModify] = useState({
    fix: false,
    commentId: null,
  });
  const [commentId, setCommentId] = useState('');
  const [modifyText, setModifyText] = useState('');

  // 댓글 수정 폼 출력
  const handleModifyComment = useCallback(
    (event) => {
      const targetComment = Number(event.currentTarget.id);
      const commentText = event.target.dataset.content;
      setModify({ fix: true, commentId: targetComment });
      setModifyText(commentText);
      setCommentId(targetComment);
    },
    [commentId],
  );

  // 댓글 텍스트 수정
  const handleModifyText = useCallback(
    (event) => {
      setModifyText(event.target.value);
    },
    [modifyText],
  );

  // 댓글 삭제
  const handleRemoveComment = useCallback((event) => {
    const targetComment = Number(event.target.dataset.commentid);
    const result = window.confirm('정말로 삭제할까요?');
    if (result) {
      dispatch({
        type: DELETE_COMMENT_REQUEST,
        data: {
          postId: post.id,
          commentId: targetComment,
        },
      });
    }
  }, []);

  // 수정 취소
  const handleCancelModifyComment = useCallback(() => {
    setModify({ fix: false, commentId: null });
  }, []);

  // 수정 댓글 저장
  const handleSaveComment = useCallback(() => {
    // console.log({ postId: post.id, commentId, updateComment: modifyText });
    dispatch({
      type: UPDATE_COMMENT_REQUEST,
      data: {
        postId: post.id,
        commentId,
        updateComment: modifyText,
      },
    });
    setModify({
      fix: false,
      commentId: null,
    });
  }, [commentId, modifyText]);

  return (
    <List
      header={
        post.Comments.length >= 1
          ? `${post.Comments.length}개의 댓글`
          : '댓글 없음'
      }
      itemLayout="horizontal"
      dataSource={post.Comments}
      renderItem={(item) => (
        <List.Item>
          <Comment
            author={
              <Link href={`/user/${item.User.id}`}>
                <a>{item.User.nickname}</a>
              </Link>
            }
            avatar={
              <Link href={`/user/${item.User.id}`}>
                <a>
                  <Avatar>{item.User.nickname[0]}</Avatar>
                </a>
              </Link>
            }
            content={
              <>
                {/* 수정시 textarea */}
                {modify.fix && modify.commentId === item.id ? (
                  <TextArea
                    showCount
                    maxLength="30"
                    value={modifyText}
                    onChange={handleModifyText}
                  />
                ) : (
                  // 댓글
                  <>
                    <div>{item.content}</div>
                    <br />
                    <div
                      style={{
                        fontSize: '0.3rem',
                        color: '#808080',
                      }}
                    >
                      {moment(item.createdAt).format('LLL')}
                    </div>
                  </>
                )}
              </>
            }
          />
          <Comment
            style={{ paddingRight: '1rem' }}
            content={
              <>
                {/* 수정 메뉴 */}
                {id === item.UserId ? (
                  <>
                    {modify.fix && modify.commentId === item.id ? (
                      <div>
                        <span
                          id={item.id}
                          role="presentation"
                          onClick={handleCancelModifyComment}
                          style={{ cursor: 'pointer' }}
                        >
                          취소
                        </span>
                        <span> | </span>
                        <span
                          id={item.id}
                          role="presentation"
                          onClick={handleSaveComment}
                          style={{ cursor: 'pointer' }}
                        >
                          완료
                        </span>
                      </div>
                    ) : (
                      // 일반 메뉴
                      <div>
                        <span
                          id={item.id}
                          data-content={item.content}
                          role="presentation"
                          onClick={handleModifyComment}
                          style={{ cursor: 'pointer' }}
                        >
                          수정
                        </span>
                        <span> | </span>
                        <span
                          id={item.id}
                          data-commentid={item.id}
                          role="presentation"
                          onClick={handleRemoveComment}
                          style={{ cursor: 'pointer' }}
                        >
                          삭제
                        </span>
                      </div>
                    )}
                  </>
                ) : null}
              </>
            }
          />
        </List.Item>
      )}
    />
  );
};

CommentList.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default CommentList;