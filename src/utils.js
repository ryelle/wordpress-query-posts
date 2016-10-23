/**
 * External dependencies
 */
import omitBy from 'lodash/omitBy';

const DEFAULT_POST_QUERY = {
	number: 10,
	offset: 0,
	order: 'DESC',
	order_by: 'date',
	type: 'post',
	status: 'publish',
	sticky: 'include',
	search: ''
};

/**
 * Returns a normalized posts query, excluding any values which match the
 * default post query.
 *
 * @param  {Object} query Posts query
 * @return {Object}       Normalized posts query
 */
export function getNormalizedPostsQuery( query ) {
	return omitBy( query, ( value, key ) => DEFAULT_POST_QUERY[ key ] === value );
}

/**
 * Returns a serialized posts query, used as the key in the
 * `state.posts.queries` state object.
 *
 * @param  {Object} query  Posts query
 * @return {String}        Serialized posts query
 */
export function getSerializedPostsQuery( query = {} ) {
	const normalizedQuery = getNormalizedPostsQuery( query );
	return JSON.stringify( normalizedQuery ).toLocaleLowerCase();
}
