import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from './api';

// Individual exports for testing
export function* loadExperience(action) {
  try{
    var experience = yield call(api.loadExperience);
    yield put(actions.loadExperienceSucceeded(experience));
  }catch(e){
    yield put(actions.loadExperienceFailed());
  } 
}

export function* listener(){
  yield takeLatest(constants.LOAD_EXPERIENCE_REQUESTED, loadExperience);
}

// All sagas to be loaded
export default [
  listener,
];
