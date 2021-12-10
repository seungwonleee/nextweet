import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

export const StyledLabel = styled.label`
  margin-left: 1rem;
`;

export const StyledInput = styled(Input)`
  border-radius: 25px;
`;

export const FormWrapper = styled(Form)`
  padding: 10px;
`;

export const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export const LoginButton = styled(Button)`
  width: 49%;
  border-radius: 25px;
`;

export const SignUpButton = styled(Button)`
  width: 49%;
  float: right;
  border-radius: 25px;
`;

export const GoogleLoginButton = styled(Button)`
  width: 100%;
  color: black;
  margin-top: 4px;
  border-radius: 25px;

  span :nth-child(1) {
    color: #4384f4;
  }
  span :nth-child(2) {
    color: #ea4335;
  }
  span :nth-child(3) {
    color: #fbbc08;
  }
  span :nth-child(4) {
    color: #4384f4;
  }
  span :nth-child(5) {
    color: #34a853;
  }
  span :nth-child(6) {
    color: #ea4335;
  }
`;
