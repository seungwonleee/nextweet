import styled, { createGlobalStyle } from 'styled-components';
import { Modal, Input } from 'antd';

export const GlobalStyle = createGlobalStyle`
/* 팝업 삭제 수정 팝업 창 */
 .ant-popover-inner {
   border-radius: 25px;
 }

 /* 카드 테두리 */
 .ant-card {
    overflow: hidden;
    border-radius: 25px;
  }
 
`;

const { TextArea } = Input;

export const Nickname = styled.a`
  color: #000000;
`;

export const CreatedAt = styled.div`
  float: right;
  font-size: 0.5rem;
  color: #808080;

  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    float: none;
  }
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
