import { createSelector } from 'reselect';

/**
 * Direct selector to the blogSection state domain
 */
const selectAwardsSectionDomain = () => (state) => state.get('awardsSection');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BlogSection
 */

export const selectAwards = () => createSelector(
  selectAwardsSectionDomain(),
  (substate) => substate.get("awards").toJS()
);

export const selectLoading = () => createSelector(
  selectAwardsSectionDomain(),
  (substate) => substate.get("loading")
);