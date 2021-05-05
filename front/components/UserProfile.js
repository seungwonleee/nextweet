import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";

const { Meta } = Card;

const CardWrapper = styled(Card)`
  padding: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <>
      <CardWrapper
        actions={[
          <div key="tweets">
            게시글
            <br />0
          </div>,
          <div key="followings">
            팔로잉
            <br />0
          </div>,
          <div key="followers">
            팔로워
            <br />0
          </div>,
        ]}
      >
        <Meta avatar={<Avatar>SW</Avatar>} title="seungwon" />
        <Button onClick={handleLogout}>로그아웃</Button>
      </CardWrapper>
    </>
  );
};

export default UserProfile;
