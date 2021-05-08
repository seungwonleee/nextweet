import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';
// function logInAPI(data) {
//   return axios.post("/api/login", data);
// }

// export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
// export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
// export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

// export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
// export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
// export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

// export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
// export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
// export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

function* logIn(action) {
  try {
    console.log('saga logIn');
    console.log('saga logIn', action);
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

// function logOutAPI(data) {
//   return axios.post("/api/logout", data);
// }

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

// function signUpAPI(data) {
//   return axios.post("/api/logout", data);
// }

function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoginIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLoginIn), fork(watchLogOut), fork(watchSignUp)]);
}
