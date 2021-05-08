import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SignIn = () => (
  <>
    <Head>
      <title>로그인 | nextweet</title>
    </Head>
    <Link href="/">
      <a>Nextweet</a>
    </Link>
  </>
);

export default SignIn;
