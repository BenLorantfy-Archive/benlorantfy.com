import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from './api';

// Individual exports for testing
export function* loadAwards(action) {
  try{
    var awards = yield call(api.loadAwards);
    yield put(actions.loadAwardsSucceeded(awards));
  }catch(e){
    yield put(actions.loadAwardsFailed());
  } 
}

export function* listener(){
  yield takeLatest(constants.LOAD_AWARDS_REQUESTED, loadAwards);
}

// All sagas to be loaded
export default [
  listener,
];
