import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { Row, Col } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import LoginForm from '../LoginForm/LoginForm';
import UserProfile from '../UserProfile/UserProfile';
import useInput from '../hooks/useInput';
import MobileToggleMenu from './Sections/MobileToggleMenu';
import Global from './commonStyles';
import { Content, Menu, SearchInput } from './AppLayoutStyles';

// 전체 레이아웃
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchText, onChangeSearchText] = useInput();

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchText}`);
  }, [searchText]);

  return (
    <>
      <Global />
      {/* 메뉴 */}
      <Menu>
        <Row>
          <Col xs={22} md={6}>
            <Link href="/">
              <a>
                <MessageOutlined /> Nextweet
              </a>
            </Link>
          </Col>
          <Col xs={0} md={12}>
            <SearchInput
              placeholder="#해쉬 태그로 검색하세요."
              value={searchText}
              onChange={onChangeSearchText}
              onSearch={onSearch}
            />
          </Col>
          {/* 모바일 메뉴 */}
          <MobileToggleMenu />
        </Row>
      </Menu>
      {/* 컨텐츠 */}
      <Content>
        <Row gutter={16}>
          <Col xs={0} md={6}>
            {me ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6} id="madeBy">
            <a
              href="https://github.com/seungwonleee"
              target="_blank"
              rel="noreferrer noopener"
            >
              Made By seungwonleee
            </a>
          </Col>
        </Row>
      </Content>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
