import { createSelector } from 'reselect';

/**
 * Direct selector to the blogSection state domain
 */
const selectExperienceSectionDomain = () => (state) => state.get('experienceSection');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BlogSection
 */

export const selectExperience = () => createSelector(
  selectExperienceSectionDomain(),
  (substate) => substate.get("experience").toJS()
);

export const selectLoading = () => createSelector(
  selectExperienceSectionDomain(),
  (substate) => substate.get("loading")
);