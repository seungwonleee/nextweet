import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

// axios 요청 기본 주소
axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
