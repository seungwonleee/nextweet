import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

// axios 요청 기본 주소
axios.defaults.baseURL = 'http://localhost:3065';
// cookie 전송을 위한 설정. defaults로 설정하지 않으면 요청마다 세번째 인자로 { withCredentials: true } 를 작성해야한다.
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
