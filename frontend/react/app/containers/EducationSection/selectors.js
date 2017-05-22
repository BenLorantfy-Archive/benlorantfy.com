import { createSelector } from 'reselect';

/**
 * Direct selector to the blogSection state domain
 */
const selectEducationSectionDomain = () => (state) => state.get('educationSection');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BlogSection
 */

export const selectEducation = () => createSelector(
  selectEducationSectionDomain(),
  (substate) => substate.get("education").toJS()
);

export const selectLoading = () => createSelector(
  selectEducationSectionDomain(),
  (substate) => substate.get("loading")
);