;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    259: function(module, exports, __webpack_require__) {
      __webpack_require__(260),
        __webpack_require__(373),
        (module.exports = __webpack_require__(374))
    },
    281: function(module, exports) {},
    374: function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        function(module) {
          var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            257
          )
          Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
            __webpack_require__(557),
            module
          )
        }.call(this, __webpack_require__(375)(module))
    },
    557: function(module, exports, __webpack_require__) {
      var map = { './0-Welcome.stories.js': 558, './1-Button.stories.js': 564 }
      function webpackContext(req) {
        var id = webpackContextResolve(req)
        return __webpack_require__(id)
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'")
          throw ((e.code = 'MODULE_NOT_FOUND'), e)
        }
        return map[req]
      }
      ;(webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map)
      }),
        (webpackContext.resolve = webpackContextResolve),
        (module.exports = webpackContext),
        (webpackContext.id = 557)
    },
    558: function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'toStorybook', function() {
          return toStorybook
        })
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26),
        react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        ),
        _storybook_addon_links__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          258
        ),
        _storybook_react_demo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          80
        )
      __webpack_exports__.default = { title: 'Welcome' }
      var toStorybook = function() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          _storybook_react_demo__WEBPACK_IMPORTED_MODULE_2__.Welcome,
          {
            showApp: Object(
              _storybook_addon_links__WEBPACK_IMPORTED_MODULE_1__.linkTo
            )('Button'),
          }
        )
      }
      ;(toStorybook.displayName = 'toStorybook'),
        (toStorybook.story = { name: 'to Storybook' }),
        (toStorybook.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'toStorybook',
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['stories/0-Welcome.stories.js'] = {
            name: 'toStorybook',
            docgenInfo: toStorybook.__docgenInfo,
            path: 'stories/0-Welcome.stories.js',
          })
    },
    564: function(module, __webpack_exports__, __webpack_require__) {
      'use strict'
      __webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, 'text', function() {
          return text
        }),
        __webpack_require__.d(__webpack_exports__, 'emoji', function() {
          return emoji
        })
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26),
        react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
          react__WEBPACK_IMPORTED_MODULE_0__
        ),
        _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          156
        ),
        _storybook_react_demo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          80
        )
      __webpack_exports__.default = { title: 'Button' }
      var text = function() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          _storybook_react_demo__WEBPACK_IMPORTED_MODULE_2__.Button,
          {
            onClick: Object(
              _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.action
            )('clicked'),
          },
          'Hello Button'
        )
      }
      text.displayName = 'text'
      var _ref = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'span',
          { role: 'img', 'aria-label': 'so cool' },
          '😀 😎 👍 💯'
        ),
        emoji = function() {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            _storybook_react_demo__WEBPACK_IMPORTED_MODULE_2__.Button,
            {
              onClick: Object(
                _storybook_addon_actions__WEBPACK_IMPORTED_MODULE_1__.action
              )('clicked'),
            },
            _ref
          )
        }
      ;(emoji.displayName = 'emoji'),
        (text.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'text',
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['stories/1-Button.stories.js'] = {
            name: 'text',
            docgenInfo: text.__docgenInfo,
            path: 'stories/1-Button.stories.js',
          }),
        (emoji.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'emoji',
        }),
        'undefined' != typeof STORYBOOK_REACT_CLASSES &&
          (STORYBOOK_REACT_CLASSES['stories/1-Button.stories.js'] = {
            name: 'emoji',
            docgenInfo: emoji.__docgenInfo,
            path: 'stories/1-Button.stories.js',
          })
    },
  },
  [[259, 1, 2]],
])
//# sourceMappingURL=main.3c39647a833e9eecd6d6.bundle.js.map
