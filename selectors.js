/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(66);


/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

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
	
	var _utils = __webpack_require__(67);
	
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

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNormalizedPostsQuery = getNormalizedPostsQuery;
	exports.getSerializedPostsQuery = getSerializedPostsQuery;
	
	var _omitBy = __webpack_require__(68);
	
	var _omitBy2 = _interopRequireDefault(_omitBy);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DEFAULT_POST_QUERY = {
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

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(69),
	    negate = __webpack_require__(70),
	    pickBy = __webpack_require__(71);
	
	/**
	 * The opposite of `_.pickBy`; this method creates an object composed of
	 * the own and inherited enumerable string keyed properties of `object` that
	 * `predicate` doesn't return truthy for. The predicate is invoked with two
	 * arguments: (value, key).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function} [predicate=_.identity] The function invoked per property.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omitBy(object, _.isNumber);
	 * // => { 'b': '2' }
	 */
	function omitBy(object, predicate) {
	  return pickBy(object, negate(baseIteratee(predicate)));
	}
	
	module.exports = omitBy;


/***/ },

/***/ 69:
/***/ function(module, exports) {

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },

/***/ 70:
/***/ function(module, exports) {

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that negates the result of the predicate `func`. The
	 * `func` predicate is invoked with the `this` binding and arguments of the
	 * created function.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Function
	 * @param {Function} predicate The predicate to negate.
	 * @returns {Function} Returns the new negated function.
	 * @example
	 *
	 * function isEven(n) {
	 *   return n % 2 == 0;
	 * }
	 *
	 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	 * // => [1, 3, 5]
	 */
	function negate(predicate) {
	  if (typeof predicate != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  return function() {
	    var args = arguments;
	    switch (args.length) {
	      case 0: return !predicate.call(this);
	      case 1: return !predicate.call(this, args[0]);
	      case 2: return !predicate.call(this, args[0], args[1]);
	      case 3: return !predicate.call(this, args[0], args[1], args[2]);
	    }
	    return !predicate.apply(this, args);
	  };
	}
	
	module.exports = negate;


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(69),
	    basePickBy = __webpack_require__(72),
	    getAllKeysIn = __webpack_require__(76);
	
	/**
	 * Creates an object composed of the `object` properties `predicate` returns
	 * truthy for. The predicate is invoked with two arguments: (value, key).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function} [predicate=_.identity] The function invoked per property.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pickBy(object, _.isNumber);
	 * // => { 'a': 1, 'c': 3 }
	 */
	function pickBy(object, predicate) {
	  return object == null ? {} : basePickBy(object, getAllKeysIn(object), baseIteratee(predicate));
	}
	
	module.exports = pickBy;


/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	var baseAssignValue = __webpack_require__(73);
	
	/**
	 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property identifiers to pick from.
	 * @param {Function} predicate The function invoked per property.
	 * @returns {Object} Returns the new object.
	 */
	function basePickBy(object, props, predicate) {
	  var index = -1,
	      length = props.length,
	      result = {};
	
	  while (++index < length) {
	    var key = props[index],
	        value = object[key];
	
	    if (predicate(value, key)) {
	      baseAssignValue(result, key, value);
	    }
	  }
	  return result;
	}
	
	module.exports = basePickBy;


/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	var defineProperty = __webpack_require__(74);
	
	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}
	
	module.exports = baseAssignValue;


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75);
	
	var defineProperty = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());
	
	module.exports = defineProperty;


/***/ },

/***/ 75:
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },

/***/ 76:
/***/ function(module, exports) {

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = nativeKeysIn;


/***/ }

/******/ });
//# sourceMappingURL=selectors.js.map