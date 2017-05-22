/*
 *
 * BlogSection reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
   education: []
  ,loading: false
});

function educationSectionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_EDUCATION_REQUESTED:
      return state.merge({
        loading: true,
      });
    case constants.LOAD_EDUCATION_SUCCEEDED:
      return state.merge({
        loading: false,
        education: action.education,
      });
    case constants.LOAD_EDUCATION_FAILED:
      return state.merge({
        loading: false,
      });
    default:
      return state;
  }
}

export default educationSectionReducer;
