/*
 *
 * BlogSection actions
 *
 */

import * as constants from './constants';

export function loadArticles() {
  return { type: constants.LOAD_ARTICLES_REQUESTED };
}

export function loadArticlesSucceeded(articles) {
  return { type: constants.LOAD_ARTICLES_SUCCEEDED, articles };
}

export function loadArticlesFailed() {
  return { type: constants.LOAD_ARTICLES_FAILED };
}
