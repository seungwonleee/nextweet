import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const { Meta } = Card;

const CardWrapper = styled(Card)`
  padding: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector(state => state.user);

  const handleLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <>
      <CardWrapper
        actions={[
          <div key="tweets">
            게시글
            <br />
            {me.Posts.length}
          </div>,
          <div key="followings">
            팔로잉
            <br />
            {me.Followings.length}
          </div>,
          <div key="followers">
            팔로워
            <br />
            {me.Followers.length}
          </div>,
        ]}
      >
        <Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
        <Button onClick={handleLogout} loading={logOutLoading}>
          로그아웃
        </Button>
      </CardWrapper>
    </>
  );
};

export default UserProfile;
