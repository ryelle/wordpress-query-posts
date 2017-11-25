'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.POSTS_REQUEST_FAILURE = exports.POSTS_REQUEST_SUCCESS = exports.POSTS_REQUEST = exports.POSTS_RECEIVE = exports.POST_REQUEST_FAILURE = exports.POST_REQUEST_SUCCESS = exports.POST_REQUEST = undefined;
exports.items = items;
exports.requests = requests;
exports.queryRequests = queryRequests;
exports.totalPages = totalPages;
exports.queries = queries;
exports.slugs = slugs;
exports.requestPosts = requestPosts;
exports.requestPost = requestPost;

var _redux = require('redux');

var _keyBy = require('lodash/keyBy');

var _keyBy2 = _interopRequireDefault(_keyBy);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _wordpressRestApiOauth = require('wordpress-rest-api-oauth-1');

var _wordpressRestApiOauth2 = _interopRequireDefault(_wordpressRestApiOauth);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*global SiteSettings */
/**
 * External dependencies
 */


var api = new _wordpressRestApiOauth2.default({
	url: SiteSettings.endpoint
});

/**
 * Post actions
 */
var POST_REQUEST = exports.POST_REQUEST = 'wordpress-redux/post/REQUEST';
var POST_REQUEST_SUCCESS = exports.POST_REQUEST_SUCCESS = 'wordpress-redux/post/REQUEST_SUCCESS';
var POST_REQUEST_FAILURE = exports.POST_REQUEST_FAILURE = 'wordpress-redux/post/REQUEST_FAILURE';
var POSTS_RECEIVE = exports.POSTS_RECEIVE = 'wordpress-redux/posts/RECEIVE';
var POSTS_REQUEST = exports.POSTS_REQUEST = 'wordpress-redux/posts/REQUEST';
var POSTS_REQUEST_SUCCESS = exports.POSTS_REQUEST_SUCCESS = 'wordpress-redux/posts/REQUEST_SUCCESS';
var POSTS_REQUEST_FAILURE = exports.POSTS_REQUEST_FAILURE = 'wordpress-redux/posts/REQUEST_FAILURE';

/**
 * Tracks all known post objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function items() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case POSTS_RECEIVE:
			var posts = (0, _keyBy2.default)(action.posts, 'id');
			return Object.assign({}, state, posts);
		default:
			return state;
	}
}

/**
 * Returns the updated post requests state after an action has been
 * dispatched. The state reflects a mapping of post ID to a
 * boolean reflecting whether a request for the post is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function requests() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case POST_REQUEST:
		case POST_REQUEST_SUCCESS:
		case POST_REQUEST_FAILURE:
			return Object.assign({}, state, _defineProperty({}, action.postSlug, POST_REQUEST === action.type));
		default:
			return state;
	}
}

/**
 * Returns the updated post query requesting state after an action has been
 * dispatched. The state reflects a mapping of serialized query to whether a
 * network request is in-progress for that query.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function queryRequests() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case POSTS_REQUEST:
		case POSTS_REQUEST_SUCCESS:
		case POSTS_REQUEST_FAILURE:
			var serializedQuery = (0, _utils.getSerializedPostsQuery)(action.query);
			return Object.assign({}, state, _defineProperty({}, serializedQuery, POSTS_REQUEST === action.type));

		default:
			return state;
	}
}

/**
 * Tracks the page length for a given query.
 * @todo Bring in the "without paged" util, to reduce duplication
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function totalPages() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case POSTS_REQUEST_SUCCESS:
			var serializedQuery = (0, _utils.getSerializedPostsQuery)(action.query);
			return Object.assign({}, state, _defineProperty({}, serializedQuery, action.totalPages));
		default:
			return state;
	}
}

/**
 * Returns the updated post query state after an action has been dispatched.
 * The state reflects a mapping of serialized query key to an array of post
 * global IDs for the query, if a query response was successfully received.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function queries() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case POSTS_REQUEST_SUCCESS:
			var serializedQuery = (0, _utils.getSerializedPostsQuery)(action.query);
			return Object.assign({}, state, _defineProperty({}, serializedQuery, action.posts.map(function (post) {
				return post.id;
			})));
		default:
			return state;
	}
}

/**
 * Tracks the slug->ID mapping for posts
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function slugs() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case POST_REQUEST_SUCCESS:
			return Object.assign({}, state, _defineProperty({}, action.postSlug, action.postId));
		case POSTS_RECEIVE:
			var posts = (0, _reduce2.default)(action.posts, function (memo, p) {
				memo[p.slug] = p.id;
				return memo;
			}, {});
			return Object.assign({}, state, posts);
		default:
			return state;
	}
}

exports.default = (0, _redux.combineReducers)({
	items: items,
	requests: requests,
	totalPages: totalPages,
	queryRequests: queryRequests,
	queries: queries,
	slugs: slugs
});

/**
 * Triggers a network request to fetch posts for the specified site and query.
 *
 * @param  {String}   query  Post query
 * @return {Function}        Action thunk
 */

function requestPosts() {
	var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return function (dispatch) {
		dispatch({
			type: POSTS_REQUEST,
			query: query
		});

		query._embed = true;

		api.get('/wp/v2/posts', query).then(function (posts) {
			dispatch({
				type: POSTS_RECEIVE,
				posts: posts
			});
			requestPageCount('/wp/v2/posts', query).then(function (count) {
				dispatch({
					type: POSTS_REQUEST_SUCCESS,
					query: query,
					totalPages: count,
					posts: posts
				});
			});
			return null;
		}).catch(function (error) {
			dispatch({
				type: POSTS_REQUEST_FAILURE,
				query: query,
				error: error
			});
		});
	};
}

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {string}   postSlug  Post slug
 * @return {Function}           Action thunk
 */
function requestPost(postSlug) {
	return function (dispatch) {
		dispatch({
			type: POST_REQUEST,
			postSlug: postSlug
		});

		var query = {
			slug: postSlug,
			_embed: true
		};

		api.get('/wp/v2/posts', query).then(function (data) {
			var post = data[0];
			dispatch({
				type: POSTS_RECEIVE,
				posts: [post]
			});
			dispatch({
				type: POST_REQUEST_SUCCESS,
				postId: post.id,
				postSlug: postSlug
			});
			return null;
		}).catch(function (error) {
			dispatch({
				type: POST_REQUEST_FAILURE,
				postSlug: postSlug,
				error: error
			});
		});
	};
}

function requestPageCount(url) {
	var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (url.indexOf('http') !== 0) {
		url = api.config.url + 'wp-json' + url;
	}

	if (data) {
		// must be decoded before being passed to ouath
		url += '?' + decodeURIComponent(_qs2.default.stringify(data));
		data = null;
	}

	var headers = {
		Accept: 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	};

	return fetch(url, {
		method: 'HEAD',
		headers: headers,
		mode: 'cors',
		body: null
	}).then(function (response) {
		return parseInt(response.headers.get('X-WP-TotalPages'), 10) || 1;
	});
}