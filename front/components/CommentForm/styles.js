import styled from 'styled-components';

import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

export const StyledTextArea = styled(TextArea)`
  border-radius: 15px;
  margin-top: 0.3rem;
`;

export const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

export const SubmitButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
  z-index: 20;
`;
