import React, { useCallback } from 'react';
import Link from 'next/link';
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CardWrapper, LogoutButton } from './styles';
import { LOG_OUT_REQUEST } from '../../reducers/user';

const { Meta } = Card;

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
            <Link href="/profile">
              <a>
                <Avatar icon={<UserOutlined />}>{me.nickname[0]}</Avatar>
              </a>
            </Link>
          }
          title={
            <Link href="/profile">
              <a className="profile-nickname">{me.nickname}</a>
            </Link>
          }
          description={
            <LogoutButton onClick={handleLogout} loading={logOutLoading}>
              로그아웃
            </LogoutButton>
          }
        />
      </CardWrapper>
    </>
  );
};

export default UserProfile;
