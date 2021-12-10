import styled from 'styled-components';
import { Form, Input } from 'antd';

const { Search } = Input;

export const NicknameEditFormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
  border-radius: 25px;
`;

export const StyledSearch = styled(Search)`

  .ant-btn {
    border-radius: 0 25px 25px 0 !important;
    border-left: none;
  }

  .ant-input-group-addon {
    border-radius: 25px 0 0 25px !important;
     */
  }
`;
