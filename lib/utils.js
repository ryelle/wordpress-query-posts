'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNormalizedPostsQuery = getNormalizedPostsQuery;
exports.getSerializedPostsQuery = getSerializedPostsQuery;

var _omitBy = require('lodash/omitBy');

var _omitBy2 = _interopRequireDefault(_omitBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_POST_QUERY = {
  _embed: true,
  offset: 0,
  order: 'DESC',
  order_by: 'date',
  type: 'post',
  status: 'publish',
  search: ''
};

/**
 * Returns a normalized posts query, excluding any values which match the
 * default post query.
 *
 * @param  {Object} query Posts query
 * @return {Object}       Normalized posts query
 */
/**
 * External dependencies
 */
function getNormalizedPostsQuery(query) {
  return (0, _omitBy2.default)(query, function (value, key) {
    return DEFAULT_POST_QUERY[key] === value;
  });
}

/**
 * Returns a serialized posts query, used as the key in the
 * `state.posts.queries` state object.
 *
 * @param  {Object} query  Posts query
 * @return {String}        Serialized posts query
 */
function getSerializedPostsQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var normalizedQuery = getNormalizedPostsQuery(query);
  return JSON.stringify(normalizedQuery).toLocaleLowerCase();
}