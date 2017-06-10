import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from './api';

// Individual exports for testing
export function* loadProjects(action) {
  console.log("LOAD DEE PROJECTS");
  try{
    var projects = yield call(api.loadProjects);
    yield put(actions.loadProjectsSucceeded(projects.items));
  }catch(e){
    yield put(actions.loadProjectsFailed());
  } 

  console.log("LOADED DEE PROJECTS");
}

export function* listener(){
  console.log("TAKING LATEST LOAD_PROJECTS_REQUESTED");
  yield takeLatest(constants.LOAD_PROJECTS_REQUESTED, loadProjects);
}

// All sagas to be loaded
export default [
  listener,
];
