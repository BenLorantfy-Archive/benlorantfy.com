/*
 *
 * BlogSection reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
   experience: []
  ,loading: false
});

function experienceSectionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_EXPERIENCE_REQUESTED:
      return state.merge({
        loading: true,
      });
    case constants.LOAD_EXPERIENCE_SUCCEEDED:
      return state.merge({
        loading: false,
        experience: action.experience,
      });
    case constants.LOAD_EXPERIENCE_FAILED:
      return state.merge({
        loading: false,
      });
    default:
      return state;
  }
}

export default experienceSectionReducer;
