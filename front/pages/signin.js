import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { LockOutlined, MessageOutlined } from '@ant-design/icons';
import LoginForm from '../components/LoginForm';
import AppLayout from '../components/AppLayout/AppLayout';

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

export default SignIn;
