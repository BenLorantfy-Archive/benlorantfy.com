/*
 *
 * BlogSection reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
   projects: []
  ,loading: false
});

function projectsSectionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_PROJECTS_REQUESTED:
      return state.merge({
        loading: true,
      });
    case constants.LOAD_PROJECTS_SUCCEEDED:
      return state.merge({
        loading: false,
        projects: action.projects,
      });
    case constants.LOAD_PROJECTS_FAILED:
      return state.merge({
        loading: false,
      });
    default:
      return state;
  }
}

export default projectsSectionReducer;
