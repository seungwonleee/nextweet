import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Drawer } from 'antd';
import {
  HomeOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { LOG_OUT_REQUEST } from '../../../reducers/user';

const ToggleMenu = styled(MenuFoldOutlined)`
  font-size: 2.2rem;
  height: 100%;
`;

const ToggleMenuContent = styled(Drawer)`
  a {
    color: ${(props) => props.theme.colors.black};
  }

  span {
    cursor: pointer;
  }

  .menu-route {
    font-size: ${(props) => props.theme.fontSizes.base};
  }
`;

const MobileToggleMenu = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);

  const showDrawer = useCallback(() => {
    setVisible(true);
  }, [visible]);

  const onClose = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const handleLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <Col xs={2} md={0}>
      <ToggleMenu onClick={showDrawer} />
      <ToggleMenuContent
        title="Menu"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div>
          <Link href="/">
            <a className="menu-route" onClick={onClose}>
              <HomeOutlined /> 홈으로
            </a>
          </Link>
        </div>
        <br />
        {me ? (
          // 로그인 (O) 메뉴
          <>
            <div>
              <Link href="/profile">
                <a className="menu-route" onClick={onClose}>
                  <UserOutlined /> 내 정보
                </a>
              </Link>
            </div>
            <br />
            <div>
              <span onClick={handleLogout} className="menu-route">
                <LogoutOutlined /> 로그아웃
              </span>
            </div>
          </>
        ) : (
          // 로그인 (X) 메뉴
          <>
            <div>
              <Link href="/signin">
                <a className="menu-route" onClick={onClose}>
                  <UserOutlined /> 로그인
                </a>
              </Link>
            </div>
            <br />
            <div>
              <Link href="/signup">
                <a className="menu-route" onClick={onClose}>
                  <UserAddOutlined /> 회원가입
                </a>
              </Link>
            </div>
            <br />
          </>
        )}
      </ToggleMenuContent>
    </Col>
  );
};

export default MobileToggleMenu;
