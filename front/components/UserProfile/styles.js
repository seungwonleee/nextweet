import { Card, Button } from 'antd';
import styled from 'styled-components';

export const CardWrapper = styled(Card)`
  padding: 10px;
  border-radius: 25px;

  .profile-nickname {
    color: ${(props) => props.theme.colors.black};
  }
`;

export const LogoutButton = styled(Button)`
  border-radius: 25px;
`;
