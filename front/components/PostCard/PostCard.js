import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card, Avatar, Popover } from 'antd';
import {
  UserOutlined,
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import PostImages from '../PostImages/PostImages';
import CommentForm from '../CommentForm/CommentForm';
import PostCardContent from '../PostCardContent/PostCardContent';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
  UPDATE_POST_REQUEST,
  REPORT_POST_REQUEST,
} from '../../reducers/post';
import FollowButton from '../FollowButton/FollowButton';
import CommentList from '../CommentList/CommentList';
import useInput from '../hooks/useInput';
import {
  CreatedAt,
  StyledTextArea,
  StyledModal,
  GlobalStyle,
  Nickname,
} from './styles';

const { Meta } = Card;

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  const { removePostLoading, reportPostLoading, reportPostDone } = useSelector(
    (state) => state.post,
  );
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [modify, setModify] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [reportButtonVisible, setReportButtonVisible] = useState(true);

  const [reportText, handleReportText] = useInput('');

  const handleLike = useCallback(() => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const handleUnlike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const handleRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const handleRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const handleModifyPost = useCallback(() => {
    setModify(true);
  }, []);

  const handleCancelModifyPost = useCallback(() => {
    setModify(false);
  }, []);

  const handleSavePost = useCallback(
    (modifyText) => () => {
      dispatch({
        type: UPDATE_POST_REQUEST,
        data: {
          PostId: post.id,
          content: modifyText,
        },
      });
    },
    [post],
  );

  const handleReport = useCallback(() => {
    // console.log('신고', post.id);
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    setModalVisible(true);
    setReportButtonVisible(false);
  }, []);

  const handleSubmitReport = useCallback(() => {
    // console.log(id, post.id, reportText);
    setModalVisible(false);
    setReportButtonVisible(true);

    dispatch({
      type: REPORT_POST_REQUEST,
      data: {
        postId: post.id,
        userId: id,
        content: reportText,
      },
    });
  }, [reportText]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setReportButtonVisible(true);
  };

  useEffect(() => {
    if (reportPostDone) {
      setModalVisible(false);
      setReportButtonVisible(true);
    }
  }, [reportPostDone]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <GlobalStyle />
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={handleRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={handleUnlike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={handleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <>
            {reportButtonVisible ? (
              <Popover
                key="more"
                content={
                  <Button.Group>
                    {id && post.User.id === id ? (
                      <>
                        {!post.RetweetId && (
                          <Button onClick={handleModifyPost}>수정</Button>
                        )}
                        <Button
                          type="danger"
                          loading={removePostLoading}
                          onClick={handleRemovePost}
                        >
                          삭제
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleReport}>신고</Button>
                    )}
                  </Button.Group>
                }
              >
                <EllipsisOutlined />
              </Popover>
            ) : null}
            <StyledModal
              title="게시글 신고"
              visible={modalVisible}
              onOk={handleSubmitReport}
              onCancel={handleCloseModal}
            >
              <form>
                <StyledTextArea
                  value={reportText}
                  onChange={handleReportText}
                  autoSize={{ minRows: 3, maxRows: 3 }}
                />
              </form>
            </StyledModal>
          </>,
        ]}
        extra={id && <FollowButton post={post} />}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null
        }
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar icon={<UserOutlined />}>
                      {post.Retweet.User.nickname[0]}
                    </Avatar>
                  </a>
                </Link>
              }
              title={
                <>
                  <Link href={`/user/${post.Retweet.User.id}`}>
                    <Nickname>{post.Retweet.User.nickname}</Nickname>
                  </Link>
                  <CreatedAt>{moment(post.createdAt).format('LLL')}</CreatedAt>
                </>
              }
              description={
                <PostCardContent
                  postData={post.Retweet.content}
                  handleCancelModifyPost={handleCancelModifyPost}
                  handleSavePost={handleSavePost}
                />
              }
            />
          </Card>
        ) : (
          <>
            <Meta
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar icon={<UserOutlined />}>
                      {post.User.nickname[0]}
                    </Avatar>
                  </a>
                </Link>
              }
              title={
                <>
                  <Link href={`/user/${post.User.id}`}>
                    <a style={{ color: 'black' }}>{post.User.nickname}</a>
                  </Link>
                  <CreatedAt>{moment(post.createdAt).format('LLL')}</CreatedAt>
                </>
              }
              description={
                <PostCardContent
                  modify={modify}
                  postData={post.content}
                  handleCancelModifyPost={handleCancelModifyPost}
                  handleSavePost={handleSavePost}
                />
              }
            />
          </>
        )}
      </Card>

      {commentFormOpened && (
        <>
          {/* 댓글 작성 폼 */}
          <CommentForm post={post} />
          {/* 댓글 목록 */}
          <CommentList post={post} />
        </>
      )}
    </div>
  );
};

PostCard.propTypes = {
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

export default PostCard;
