import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from './api';

// Individual exports for testing
export function* loadEducation(action) {
  try{
    var education = yield call(api.loadEducation);
    yield put(actions.loadEducationSucceeded(education.items));
  }catch(e){
    yield put(actions.loadEducationFailed());
  } 
}

export function* listener(){
  yield takeLatest(constants.LOAD_EDUCATION_REQUESTED, loadEducation);
}

// All sagas to be loaded
export default [
  listener,
];
