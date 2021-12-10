import { Form, Button, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

export const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

export const SubmitButton = styled(Button)`
  float: right;
  border-radius: 25px;
`;

export const UploadButton = styled(Button)`
  border-radius: 25px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 0.5rem;
`;

export const StyledTextArea = styled(TextArea)`
  border-radius: 10px;
`;

export const RemoveButton = styled(Button)`
  margin-top: 0.5rem;
  border-radius: 25px;
  float: right;
`;

export const ImageWrapper = styled.div`
  display: inline-block;

  img {
    margin-top: 0.5rem;
  }
`;
