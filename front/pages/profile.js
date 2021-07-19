import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useMediaQuery } from 'react-responsive';
import AppLayout from '../components/AppLayout/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_MY_INFO_REQUEST,
} from '../reducers/user';
import wrapper from '../store/configureStore';
import UserProfile from '../components/UserProfile';

const Profile = () => {
  const router = useRouter();

  const { me } = useSelector((state) => state.user);

  const isMobileOrTablet = useMediaQuery({
    query: '(max-width: 768px)',
  });

  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | nextweet</title>
      </Head>
      <AppLayout>
        {isMobileOrTablet && <UserProfile />}
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
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
    context.store.dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    });
    context.store.dispatch(END);
    // console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
  },
);

export default Profile;
