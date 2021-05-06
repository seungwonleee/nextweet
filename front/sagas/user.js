import { all, delay, fork, put, takeLatest } from "@redux-saga/core/effects";

// function logInAPI(data) {
//   return axios.post("/api/login", data);
// }

function* logIn(action) {
  try {
    console.log("saga logIn");
    console.log("saga logIn", action);
    // const result = yield call(logInAPI);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: "LOG_IN_FAILURE",
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
      type: "LOG_OUT_SUCCESS",
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: "LOG_OUT_FAILURE",
      error: err.response.data,
    });
  }
}

function* watchLoginIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLoginIn), fork(watchLogOut)]);
}
