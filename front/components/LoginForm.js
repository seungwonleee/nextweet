import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';
import useInput from './hooks/useInput';
import backUrl from '../config/config';

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
        <Link href={`${backUrl}/user/auth/google`}>
          <a>
            <GoogleLoginButton>
              <span>G</span>
              <span>o</span>
              <span>o</span>
              <span>g</span>
              <span>l</span>
              <span>e</span>
              <span>로 시작하기</span>
            </GoogleLoginButton>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
