Query Posts
===========

Query Posts is a React component used in managing the fetching of posts queries, or single posts by the post slug.

## Usage

Used to request a single post, or list of posts, based on either a query object, or post slug.

Render the component, passing in the `query` or a single `postSlug`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryPosts from 'wordpress-query-posts';
import MyPostsListItem from './list-item';

export default function MyPostsList( { posts } ) {
	return (
		<div>
			<QueryPosts query={ { search: 'Themes' } } />
			{ posts.map( ( post ) => {
				return (
					<MyPostsListItem
						key={ post.id }
						post={ post } />
				);
			} }
		</div>
	);
}
```

or for a single post:

```jsx
import React from 'react';
import QueryPosts from 'wordpress-query-posts';
import SinglePost from './single';

export default function MyPostsList( { post } ) {
	return (
		<div>
			<QueryPosts postSlug="local-development-for-wordcamp-websites" />
			<SinglePost post={ post } />
		</div>
	);
}
```

## Props

### `query`

<table>
	<tr><th>Type</th><td>Object</td></tr>
	<tr><th>Required</th><td>No</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The query to be used in requesting posts.

### `postSlug`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>No</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The post slug of the post to request.

Posts Selectors
===============

#### `getPost( state, globalId )`

#### `getPostsForQuery( state, query )`

#### `isRequestingPostsForQuery( state, query )`

#### `getTotalPagesForQuery( state, query )`

#### `isRequestingPost( state, postSlug )`

#### `getPostIdFromSlug( state, slug )`
