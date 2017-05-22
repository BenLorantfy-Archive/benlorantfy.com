/*
 *
 * BlogSection actions
 *
 */

import * as constants from './constants';

export function loadEducation() {
  return { type: constants.LOAD_EDUCATION_REQUESTED };
}

export function loadEducationSucceeded(education) {
  return { type: constants.LOAD_EDUCATION_SUCCEEDED, education };
}

export function loadEducationFailed() {
  return { type: constants.LOAD_EDUCATION_FAILED };
}
