import styled from 'styled-components';
import { Button, Card, Avatar, Popover, Modal, Input } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;

export const StyledMeta = styled(Meta)`
  a {
    color: #000000;
  }
`;

export const CreatedAt = styled.div`
  float: right;
  font-size: 0.5rem;
  color: #808080;
`;

export const StyledTextArea = styled(TextArea)`
  border-radius: 10px;
`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    overflow: auto;
    border-radius: 25px;
  }
  .ant-btn {
    border-radius: 25px;
  }
`;
