/*
 *
 * BlogSection reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

const initialState = fromJS({
   awards: []
  ,loading: false
});

function awardsSectionReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_AWARDS_REQUESTED:
      return state.merge({
        loading: true,
      });
    case constants.LOAD_AWARDS_SUCCEEDED:
      return state.merge({
        loading: false,
        awards: action.awards,
      });
    case constants.LOAD_AWARDS_FAILED:
      return state.merge({
        loading: false,
      });
    default:
      return state;
  }
}

export default awardsSectionReducer;
