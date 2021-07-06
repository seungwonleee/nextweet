import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import useInput from './hooks/useInput';

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginButton = styled(Button)`
  width: 49%;
`;

const SignUpButton = styled(Button)`
  width: 49%;
  float: right;
`;

const GoogleLoginButton = styled(Button)`
  width: 100%;
  color: black;
  margin-top: 4px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmit = useCallback(() => {
    console.log({
      email,
      password,
    });
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmit}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          required
          onChange={setEmail}
        />
      </div>

      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          required
          onChange={setPassword}
        />
      </div>
      <ButtonWrapper>
        <LoginButton type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </LoginButton>
        <Link href="/signup">
          <a>
            <SignUpButton>회원가입</SignUpButton>
          </a>
        </Link>
        <Link href="http://localhost:3065/user/auth/google">
          <a>
            <GoogleLoginButton>
              <span style={{ color: '#4384F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC08' }}>o</span>
              <span style={{ color: '#4384F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
              <span>로 시작하기</span>
            </GoogleLoginButton>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
