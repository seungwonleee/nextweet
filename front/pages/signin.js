import React, { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { LockOutlined, MessageOutlined } from '@ant-design/icons';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import LoginForm from '../components/LoginForm/LoginForm';
import AppLayout from '../components/AppLayout/AppLayout';
import { Title, SubTitle } from '../pageStyles/signin';

const SignIn = () => {
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      router.push('/');
    }
  }, [me && me.id]);

  return (
    <AppLayout>
      <Head>
        <title>로그인 | Nextweet</title>
      </Head>
      <Title>
        <Link href="/">
          <a>
            <MessageOutlined /> Nextweet
          </a>
        </Link>
      </Title>
      <SubTitle>
        <LockOutlined /> 로그인
      </SubTitle>
      {/* 로그인 폼 */}
      <LoginForm />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);

    await context.store.sagaTask.toPromise();
  },
);

export default SignIn;
