import { createSelector } from 'reselect';

/**
 * Direct selector to the blogSection state domain
 */
const selectProjectsSectionDomain = () => (state) => state.get('projectsSection');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BlogSection
 */

export const selectProjects = () => createSelector(
  selectProjectsSectionDomain(),
  (substate) => substate.get("projects").toJS()
);

export const selectLoading = () => createSelector(
  selectProjectsSectionDomain(),
  (substate) => substate.get("loading")
);