import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const { Meta } = Card;

const CardWrapper = styled(Card)`
  padding: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const handleLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  return (
    <>
      <CardWrapper
        actions={[
          <div key="tweets">
            <Link href={`/user/${me.id}`}>
              <a>
                게시글
                <br />
                {me.Posts.length}
              </a>
            </Link>
          </div>,
          <div key="followings">
            <Link href="/profile">
              <a>
                팔로잉
                <br />
                {me.Followings.length}
              </a>
            </Link>
          </div>,
          <div key="followers">
            <Link href="/profile">
              <a>
                팔로워
                <br />
                {me.Followers.length}
              </a>
            </Link>
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Link href={`/user/${me.id}`}>
              <a>
                <Avatar>{me.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={me.nickname}
        />
        <Button onClick={handleLogout} loading={logOutLoading}>
          로그아웃
        </Button>
      </CardWrapper>
    </>
  );
};

export default UserProfile;
