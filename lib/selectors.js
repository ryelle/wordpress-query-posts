'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPost = getPost;
exports.getPostsForQuery = getPostsForQuery;
exports.isRequestingPostsForQuery = isRequestingPostsForQuery;
exports.getTotalPagesForQuery = getTotalPagesForQuery;
exports.isRequestingPost = isRequestingPost;
exports.getPostIdFromSlug = getPostIdFromSlug;

var _utils = require('./utils');

/**
 * Returns a post object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Post global ID
 * @return {Object}          Post object
 */
function getPost(state, globalId) {
  return state.posts.items[globalId];
}

/**
 * Returns an array of posts for the posts query, or null if no posts have been
 * received.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Post query object
 * @return {?Array}         Posts for the post query
 */
/**
 * Internal dependencies
 */
function getPostsForQuery(state, query) {
  var serializedQuery = (0, _utils.getSerializedPostsQuery)(query);
  if (!state.posts.queries[serializedQuery]) {
    return null;
  }

  return state.posts.queries[serializedQuery].map(function (globalId) {
    return getPost(state, globalId);
  }).filter(Boolean);
}

/**
 * Returns true if currently requesting posts for the posts query, or false
 * otherwise.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Post query object
 * @return {Boolean}        Whether posts are being requested
 */
function isRequestingPostsForQuery(state, query) {
  var serializedQuery = (0, _utils.getSerializedPostsQuery)(query);
  return !!state.posts.queryRequests[serializedQuery];
}

/**
 * Returns the number of total pages available for a given query.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Object}  query  Post query object
 * @return {int}            Number of pages
 */
function getTotalPagesForQuery(state, query) {
  var serializedQuery = (0, _utils.getSerializedPostsQuery)(query);
  if (!state.posts.totalPages[serializedQuery]) {
    return 1;
  }

  return parseInt(state.posts.totalPages[serializedQuery], 10);
}

/**
 * Returns true if a request is in progress for the specified post, or
 * false otherwise.
 *
 * @param  {Object}  state     Global state tree
 * @param  {String}  postSlug  Post Slug
 * @return {Boolean}           Whether request is in progress
 */
function isRequestingPost(state, postSlug) {
  if (!state.posts.requests) {
    return false;
  }

  return !!state.posts.requests[postSlug];
}

/**
 * Returns the Post ID for a given page slug
 *
 * @param  {Object}  state  Global state tree
 * @param  {string}  slug   Post slug
 * @return {int}            Post ID
 */
function getPostIdFromSlug(state, slug) {
  if (!state.posts.slugs[slug]) {
    return false;
  }

  return state.posts.slugs[slug];
}