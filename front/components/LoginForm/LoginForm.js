import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../../reducers/user';
import useInput from '../hooks/useInput';
import backUrl from '../../config/config';
import {
  StyledLabel,
  StyledInput,
  FormWrapper,
  ButtonWrapper,
  LoginButton,
  SignUpButton,
  GoogleLoginButton,
} from './styles';

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
        <StyledLabel htmlFor="user-email">이메일</StyledLabel>
        <br />
        <StyledInput
          name="user-email"
          type="email"
          value={email}
          required
          onChange={setEmail}
        />
      </div>

      <div>
        <StyledLabel htmlFor="user-password">비밀번호</StyledLabel>
        <br />
        <StyledInput
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
