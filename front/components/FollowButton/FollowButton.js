import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user,
  );
  // 팔로잉한 유저인지 아닌지 확인
  const isFollowing = me?.Followings.find(
    (FollowingUser) => FollowingUser.id === post.User.id,
  );
  const handleFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);
  return (
    <Button loading={followLoading || unfollowLoading} onClick={handleFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape.isRequired,
};

export default FollowButton;
