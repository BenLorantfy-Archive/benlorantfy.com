/*
 *
 * BlogSection actions
 *
 */

import * as constants from './constants';

export function loadExperience() {
  return { type: constants.LOAD_EXPERIENCE_REQUESTED };
}

export function loadExperienceSucceeded(experience) {
  return { type: constants.LOAD_EXPERIENCE_SUCCEEDED, experience };
}

export function loadExperienceFailed() {
  return { type: constants.LOAD_EXPERIENCE_FAILED };
}
