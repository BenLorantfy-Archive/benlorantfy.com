/*
 *
 * BlogSection reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ARTICLES_REQUESTED,
  LOAD_ARTICLES_SUCCEEDED,
  LOAD_ARTICLES_FAILED,
} from './constants';

const initialState = fromJS({
   articles: []
  ,loading: false
});

function blogSectionReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES_REQUESTED:
      return state.merge({
        loading: true,
      });
    case LOAD_ARTICLES_SUCCEEDED:
      return state.merge({
        loading: false,
        articles: action.articles,
      });
    case LOAD_ARTICLES_FAILED:
      return state.merge({
        loading: false,
      });
    default:
      return state;
  }
}

export default blogSectionReducer;
