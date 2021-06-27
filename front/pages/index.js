import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  // useEffect(() => {
  //   // 사용자 정보 요청
  //   dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  //   // 게시글 정보 요청
  //   dispatch({
  //     type: LOAD_POSTS_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    function hanldeScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          // 게시글이 하나도 없을 경우를 생각해서 처리
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    // 컴포넌트 내부에서 addEventListener 사용시 return removeEventListener 해야한다. 안할시 메모리 문제 발생
    window.addEventListener('scroll', hanldeScroll);
    return () => {
      window.removeEventListener('scroll', hanldeScroll);
    };
  }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
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
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Home;
