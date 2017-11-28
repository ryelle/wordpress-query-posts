/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { keyBy } from 'lodash';

/**
 * Internal dependencies
 */
import {
	// action-types
	POST_REQUEST,
	POST_REQUEST_FAILURE,
	POST_REQUEST_SUCCESS,
	POSTS_RECEIVE,
	POSTS_REQUEST,
	POSTS_REQUEST_FAILURE,
	POSTS_REQUEST_SUCCESS,
	// reducers
	items,
	requests,
	totalPages,
	queryRequests,
	queries,
	slugs
} from '../src/state';

import posts from './fixtures/posts';
import post from './fixtures/single';

describe( 'Post reducer', () => {
	describe( 'items', () => {
		it( 'should have no change by default', () => {
			const newState = items( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should store the new posts in state', () => {
			const newState = items( undefined, { type: POSTS_RECEIVE, posts } );
			const postsById = keyBy( posts, 'id' );
			expect( newState ).to.eql( postsById );
		} );

		it( 'should add new posts onto the existing post array', () => {
			const originalState = deepFreeze( keyBy( posts, 'id' ) );
			const newState = items( originalState, { type: POSTS_RECEIVE, posts: [ post ] } );
			expect( newState ).to.eql( { ...originalState, 7: post } );
		} );
	} );

	describe( 'queryRequests', () => {
		it( 'should have no change by default', () => {
			const newState = queryRequests( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the requesting state of new queries', () => {
			const newState = queryRequests( undefined, { type: POSTS_REQUEST, query: { paged: 1 } } );
			expect( newState ).to.eql( { '{"paged":1}': true } );
		} );

		it( 'should track the requesting state of successful queries', () => {
			const originalState = deepFreeze( { '{"paged":1}': true } );
			const newState = queryRequests( originalState, { type: POSTS_REQUEST_SUCCESS, query: { paged: 1 } } );
			expect( newState ).to.eql( { '{"paged":1}': false } );
		} );

		it( 'should track the requesting state of failed queries', () => {
			const originalState = deepFreeze( { '{"paged":1}': true } );
			const newState = queryRequests( originalState, { type: POSTS_REQUEST_FAILURE, query: { paged: 1 } } );
			expect( newState ).to.eql( { '{"paged":1}': false } );
		} );

		it( 'should track the requesting state of additional queries', () => {
			const originalState = deepFreeze( { '{"paged":1}': false } );
			const newState = queryRequests( originalState, { type: POSTS_REQUEST, query: { paged: 2 } } );
			expect( newState ).to.eql( { ...originalState, '{"paged":2}': true } );
		} );
	} );

	describe( 'requests', () => {
		it( 'should have no change by default', () => {
			const newState = requests( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the requesting state of a new post', () => {
			const newState = requests( undefined, { type: POST_REQUEST, postSlug: 'some-pending-slug' } );
			expect( newState ).to.eql( { 'some-pending-slug': true } );
		} );

		it( 'should track the requesting state of successful post requests', () => {
			const originalState = deepFreeze( { 'some-pending-slug': true } );
			const newState = requests( originalState, { type: POST_REQUEST_SUCCESS, postSlug: 'some-pending-slug' } );
			expect( newState ).to.eql( { 'some-pending-slug': false } );
		} );

		it( 'should track the requesting state of failed post requests', () => {
			const originalState = deepFreeze( { 'some-pending-slug': true } );
			const newState = requests( originalState, { type: POST_REQUEST_FAILURE, postSlug: 'some-pending-slug' } );
			expect( newState ).to.eql( { 'some-pending-slug': false } );
		} );

		it( 'should track the requesting state of additional post requests', () => {
			const originalState = deepFreeze( { 'some-pending-slug': true } );
			const newState = requests( originalState, { type: POST_REQUEST, postSlug: 'a-new-post' } );
			expect( newState ).to.eql( { ...originalState, 'a-new-post': true } );
		} );
	} );

	describe( 'queries', () => {
		it( 'should have no change by default', () => {
			const newState = queries( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the post IDs for requested queries', () => {
			const action = {
				type: POSTS_REQUEST_SUCCESS,
				query: { paged: 1 },
				posts
			};
			const newState = queries( undefined, action );
			expect( newState ).to.eql( { '{"paged":1}': [ 6, 5, 4, 3 ] } );
		} );

		it( 'should track the post IDs for additional requested queries', () => {
			const originalState = deepFreeze( { '{"paged":1}': [ 6, 5, 4, 3 ] } );
			const action = {
				type: POSTS_REQUEST_SUCCESS,
				query: { paged: 2 },
				posts: [ post ]
			};
			const newState = queries( originalState, action );
			expect( newState ).to.eql( {
				'{"paged":1}': [ 6, 5, 4, 3 ],
				'{"paged":2}': [ 7 ]
			} );
		} );
	} );

	describe( 'slugs', () => {
		it( 'should have no change by default', () => {
			const newState = slugs( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the post IDs for requested post slugs', () => {
			const action = {
				type: POST_REQUEST_SUCCESS,
				postId: 6,
				postSlug: 'wordpress-query-component-tests',
			};
			const newState = slugs( undefined, action );
			expect( newState ).to.eql( { 'wordpress-query-component-tests': 6 } );
		} );

		it( 'should track the post IDs for additional requested post slugs', () => {
			const originalState = deepFreeze( { 'wordpress-query-component-tests': 6 } );
			const action = {
				type: POST_REQUEST_SUCCESS,
				postId: 7,
				postSlug: 'a-single-post',
			};
			const newState = slugs( originalState, action );
			expect( newState ).to.eql( {
				'wordpress-query-component-tests': 6,
				'a-single-post': 7
			} );
		} );
	} );

	describe( 'totalPages', () => {
		it( 'should have no change by default', () => {
			const newState = totalPages( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the pagination count for requested queries', () => {
			const action = {
				type: POSTS_REQUEST_SUCCESS,
				query: { paged: 1 },
				totalPages: 3
			};
			const newState = totalPages( undefined, action );
			expect( newState ).to.eql( { '{"paged":1}': 3 } );
		} );

		it( 'should track the pagination count for additional requested queries', () => {
			const originalState = deepFreeze( { '{"paged":1}': 3 } );
			const action = {
				type: POSTS_REQUEST_SUCCESS,
				query: { category: 51 },
				totalPages: 4
			};
			const newState = totalPages( originalState, action );
			expect( newState ).to.eql( {
				'{"paged":1}': 3,
				'{"category":51}': 4
			} );
		} );
	} );
} );
