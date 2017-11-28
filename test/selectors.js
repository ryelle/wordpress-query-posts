/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { keyBy } from 'lodash';

/**
 * Internal dependencies
 */
import * as selectors from '../src/selectors';
import posts from './fixtures/posts';

const postsById = keyBy( posts, 'id' );

const state = deepFreeze( {
	posts: {
		items: postsById,
		requests: {
			'wordpress-query-component-tests': false,
			'some-pending-post-title': true,
		},
		totalPages: {
			'{"paged":1}': '3',
			'{"paged":2}': '3',
		},
		queryRequests: {
			'{"paged":1}': false,
			'{"paged":2}': false,
			'{"paged":3}': true,
		},
		queries: {
			'{"paged":1}': [
				6,
				5,
			],
			'{"paged":2}': [
				4,
				3,
			]
		},
		slugs: {
			'wordpress-query-component-tests': 6,
			'local-development-requires-testing': 5,
			'api-tests': 4,
			'private-post-example': 3,
		}
	}
} );

describe( 'Post selectors', function() {
	it( 'should contain isRequestingPost method', function() {
		expect( selectors.isRequestingPost ).to.be.a( 'function' );
	} );

	it( 'should contain getPostIdFromSlug method', function() {
		expect( selectors.getPostIdFromSlug ).to.be.a( 'function' );
	} );

	it( 'should contain getPost method', function() {
		expect( selectors.getPost ).to.be.a( 'function' );
	} );

	it( 'should contain isRequestingPostsForQuery method', function() {
		expect( selectors.isRequestingPostsForQuery ).to.be.a( 'function' );
	} );

	it( 'should contain getPostsForQuery method', function() {
		expect( selectors.getPostsForQuery ).to.be.a( 'function' );
	} );

	it( 'should contain getTotalPagesForQuery method', function() {
		expect( selectors.getTotalPagesForQuery ).to.be.a( 'function' );
	} );

	describe( 'isRequestingPost', function() {
		it( 'Should get `false` if the post has not been requested yet', function() {
			expect( selectors.isRequestingPost( state, 'unrequested-post' ) ).to.be.false;
		} );

		it( 'Should get `false` if this post has already been fetched', function() {
			expect( selectors.isRequestingPost( state, 'wordpress-query-component-tests' ) ).to.be.false;
		} );

		it( 'Should get `true` if this post is being fetched', function() {
			expect( selectors.isRequestingPost( state, 'some-pending-post-title' ) ).to.be.true;
		} );
	} );

	describe( 'getPostIdFromSlug', function() {
		it( 'Should get `false` if the post has not been requested yet', function() {
			expect( selectors.getPostIdFromSlug( state, 'unrequested-post' ) ).to.be.false;
		} );

		it( 'Should get the post ID if this post is in our state', function() {
			expect( selectors.getPostIdFromSlug( state, 'wordpress-query-component-tests' ) ).to.eql( 6 );
		} );
	} );

	describe( 'getPost', function() {
		it( 'Should get `undefined` if the post has not been requested yet', function() {
			expect( selectors.getPost( state, 9 ) ).to.be.undefined;
		} );

		it( 'Should get the post object if this post is in our state', function() {
			expect( selectors.getPost( state, 6 ) ).to.eql( postsById[ 6 ] );
		} );
	} );

	describe( 'isRequestingPostsForQuery', function() {
		it( 'Should get `false` if the post query has not been requested yet', function() {
			expect( selectors.isRequestingPostsForQuery( state, { paged: 4 } ) ).to.be.false;
		} );

		it( 'Should get `false` if this post query has already been fetched', function() {
			expect( selectors.isRequestingPostsForQuery( state, { paged: 1 } ) ).to.be.false;
		} );

		it( 'Should get `true` if this post query is being fetched', function() {
			expect( selectors.isRequestingPostsForQuery( state, { paged: 3 } ) ).to.be.true;
		} );
	} );

	describe( 'getPostsForQuery', function() {
		it( 'Should get null if the post query has not been requested yet', function() {
			expect( selectors.getPostsForQuery( state, { paged: 4 } ) ).to.be.null;
		} );

		it( 'Should get a list of post objects if the response is in our state', function() {
			const postList = [
				postsById[ 6 ],
				postsById[ 5 ]
			];
			expect( selectors.getPostsForQuery( state, { paged: 1 } ) ).to.eql( postList );
		} );
	} );

	describe( 'getTotalPagesForQuery', function() {
		it( 'Should get a default number (1) of pages available if the query has not been requested yet', function() {
			expect( selectors.getTotalPagesForQuery( state, { paged: 4 } ) ).to.eql( 1 );
		} );

		it( 'Should get the number of pages (pagination) available for a query', function() {
			expect( selectors.getTotalPagesForQuery( state, { paged: 1 } ) ).to.eql( 3 );
		} );
	} );
} );
