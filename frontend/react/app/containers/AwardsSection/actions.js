/*
 *
 * BlogSection actions
 *
 */

import * as constants from './constants';

export function loadAwards() {
  return { type: constants.LOAD_AWARDS_REQUESTED };
}

export function loadAwardsSucceeded(awards) {
  return { type: constants.LOAD_AWARDS_SUCCEEDED, awards };
}

export function loadAwardsFailed() {
  return { type: constants.LOAD_AWARDS_FAILED };
}
