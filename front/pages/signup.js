import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout/AppLayout';
import useInput from '../components/hooks/useInput';
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;

const Title = styled.h1`
  text-align: center;
  padding-top: 2rem;

  a {
    color: ${(props) => props.theme.colors.black};
  }
`;

const SubTitle = styled.h2`
  text-align: center;
`;

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user,
  );

  // 로그인 정보 있으면 홈으로 페이지 라우팅(push 대신 replace 사용시 이전페이지 기록 삭제)
  useEffect(() => {
    if (me && me.id) {
      router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    // 회원가입 성공시 홈으로 페이지 라우팅
    if (signUpDone) {
      alert('회원가입에 성공했습니다.');
      router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [nickname, setNickname] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);

  const handlePasswordCheck = useCallback(
    (event) => {
      setPasswordError(event.target.value !== password);
      setPasswordCheck(event.target.value);
    },
    [password],
  );

  const handleTerm = useCallback((event) => {
    setTerm(event.target.checked);
    setTermError(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, nickname, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | nextweet</title>
      </Head>
      <Title>
        <Link href="/">
          <a>
            <MessageOutlined /> Nextweet
          </a>
        </Link>
      </Title>
      <SubTitle>
        <LockOutlined /> 회원가입
      </SubTitle>
      <Form onFinish={handleSubmit}>
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
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input
            name="user-nickname"
            value={nickname}
            required
            onChange={setNickname}
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
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={handlePasswordCheck}
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={handleTerm}>
            사진 활용에 동의합니다.
          </Checkbox>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  },
);

export default Signup;
