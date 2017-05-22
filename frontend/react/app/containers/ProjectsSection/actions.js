/*
 *
 * BlogSection actions
 *
 */

import * as constants from './constants';

export function loadProjects() {
  return { type: constants.LOAD_PROJECTS_REQUESTED };
}

export function loadProjectsSucceeded(projects) {
  return { type: constants.LOAD_PROJECTS_SUCCEEDED, projects };
}

export function loadProjectsFailed() {
  return { type: constants.LOAD_PROJECTS_FAILED };
}
