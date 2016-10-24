'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _selectors = require('./selectors');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * External dependencies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Internal dependencies
 */


var debug = (0, _debug2.default)('query:post');

var QueryPosts = function (_Component) {
	_inherits(QueryPosts, _Component);

	function QueryPosts() {
		_classCallCheck(this, QueryPosts);

		return _possibleConstructorReturn(this, (QueryPosts.__proto__ || Object.getPrototypeOf(QueryPosts)).apply(this, arguments));
	}

	_createClass(QueryPosts, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.request(this.props);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.postSlug === nextProps.postSlug && (0, _shallowequal2.default)(this.props.query, nextProps.query)) {
				return;
			}

			this.request(nextProps);
		}
	}, {
		key: 'request',
		value: function request(props) {
			var single = !!props.postSlug;

			if (!single && !props.requestingPosts) {
				debug('Request post list using query ' + props.query);
				props.requestPosts(props.query);
			}

			if (single && !props.requestingPost) {
				debug('Request single post ' + props.postSlug);
				props.requestPost(props.postSlug);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return QueryPosts;
}(_react.Component);

QueryPosts.propTypes = {
	postSlug: _react.PropTypes.string,
	query: _react.PropTypes.object,
	requestingPosts: _react.PropTypes.bool,
	requestPosts: _react.PropTypes.func
};

QueryPosts.defaultProps = {
	requestPosts: function requestPosts() {}
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
	var postSlug = ownProps.postSlug;
	var query = ownProps.query;

	return {
		requestingPost: (0, _selectors.isRequestingPost)(state, postSlug),
		requestingPosts: (0, _selectors.isRequestingPostsForQuery)(state, query)
	};
}, function (dispatch) {
	return (0, _redux.bindActionCreators)({
		requestPosts: _state.requestPosts,
		requestPost: _state.requestPost
	}, dispatch);
})(QueryPosts);
module.exports = exports['default'];