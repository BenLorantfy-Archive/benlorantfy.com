import { createSelector } from 'reselect';

/**
 * Direct selector to the blogSection state domain
 */
const selectBlogSectionDomain = () => (state) => state.get('blogSection');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BlogSection
 */

export const selectArticles = () => createSelector(
  selectBlogSectionDomain(),
  (substate) => substate.get("articles").toJS()
);

export const selectLoading = () => createSelector(
  selectBlogSectionDomain(),
  (substate) => substate.get("loading")
);