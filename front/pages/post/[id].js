import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

import wrapper from '../../store/configureStore';

import AppLayout from '../../components/AppLayout/AppLayout';
import PostCard from '../../components/PostCard/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        {/* 공유시 미리 정보 */}
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : 'https://nextweet.site/favicon.ico'
          }
        />
        <meta property="og:url" content={`https://nextweet.site/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

// next ssr setting. dispatch시 reducer index.js의 hydrate 실행
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // front server에서 backend server로 쿠키 전달
    const cookie = context.req ? context.req.headers.cookie : '';
    // front server Cookie 공유 방지 (*중요*)
    // 프론트 서버는 하나이므로 axios.defaults.headers.Cookie=cookie 로 쿠키를 설정하게 되면 프론트 서버에 이 쿠키가 설정되어 버린다. 그러면 다른 사용자가 타인의 계정으로 접근이 가능해진다. 그러므로 axios.defaults.headers.Cookie = ''; 로 쿠키를 비워주어야한다.
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // 사용자 정보 요청
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    // 게시글 정보 요청
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  },
);

export default Post;
