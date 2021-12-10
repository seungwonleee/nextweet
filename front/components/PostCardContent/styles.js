import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

export const ModifyButton = styled.button`
  border: none;
  border-radius: 25px;
  margin-top: 0.3rem;
  cursor: pointer;
`;

export const StyledTextArea = styled(TextArea)`
  border-radius: 15px;
`;
