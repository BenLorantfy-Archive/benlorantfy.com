import { take, takeLatest, call, put, select } from 'redux-saga/effects';
import * as constants from './constants';
import * as actions from './actions';
import * as api from './api';

// Individual exports for testing
export function* loadArticles(action) {
  console.log("LOAD DEE ARTICLES");
  try{
    var articles = yield call(api.loadArticles);
    yield put(actions.loadArticlesSucceeded(articles.items));
  }catch(e){
    yield put(actions.loadArticlesFailed());
  } 

  console.log("LOADED DEE ARTICLES");
}

export function* listener(){
  console.log("TAKING LATEST LOAD_ARTICLES_REQUESTED");
  yield takeLatest(constants.LOAD_ARTICLES_REQUESTED, loadArticles);
}

// All sagas to be loaded
export default [
  listener,
];
