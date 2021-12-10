import styled from 'styled-components';
import { Drawer } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

export const ToggleMenu = styled(MenuFoldOutlined)`
  font-size: 2.2rem;
  height: 100%;
`;

export const ToggleMenuContent = styled(Drawer)`
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
