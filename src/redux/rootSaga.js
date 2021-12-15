import { all, fork } from 'redux-saga/effects';
import { watchAddFormDetailsRequest } from '../features/AddForm/saga';

export default function* rootSaga() {
    yield all([
      fork(watchAddFormDetailsRequest),
    ]);
  }