import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';

import { Menu, Input, Row, Col } from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const { Search } = Input;

const SearchInput = styled(Search)`
  width: 200px;
  vertical-align: middle;
`;

// 하단 스크롤바 없애기 antd gutter 문제
const Global = createGlobalStyle`
   .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  
  .ant-col:first-child {
      padding-left: 0 !important;
  }
  
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

// 공통 메뉴
const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.user);

  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput placeholder="#해쉬 태그로 검색하세요." onSearch />
        </Menu.Item>
        {me ? (
          <Menu.Item key="profile">
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="signup">
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="signin">
          <Link href="/signin">
            <a>로그인</a>
          </Link>
        </Menu.Item>
      </Menu>

      <Row gutter={16}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/seungwonleee" target="_blank" rel="noreferrer noopener">
            Made By seungwonleee
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
