webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./pages/index.jsx":
/*!*************************!*\
  !*** ./pages/index.jsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Header */ "./components/Header.jsx");
/* harmony import */ var _components_Timeline_Timeline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Timeline/Timeline */ "./components/Timeline/Timeline.jsx");
/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/theme */ "./styles/theme.js");



var _this = undefined,
    _jsxFileName = "C:\\Users\\kal\\Documents\\Workspace\\kalpage\\pages\\index.jsx",
    _s = $RefreshSig$();


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// pages/index.jsx





var Home = function Home() {
  _s();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(true),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      isLight = _React$useState2[0],
      setIsLight = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(isLight ? _styles_theme__WEBPACK_IMPORTED_MODULE_6__["light"] : _styles_theme__WEBPACK_IMPORTED_MODULE_6__["dark"]),
      _React$useState4 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState3, 2),
      theme = _React$useState4[0],
      setTheme = _React$useState4[1];

  var themeToggle = function themeToggle() {
    return setIsLight(!isLight);
  };

  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {
    setTheme(isLight ? _styles_theme__WEBPACK_IMPORTED_MODULE_6__["light"] : _styles_theme__WEBPACK_IMPORTED_MODULE_6__["dark"]);
    localStorage.setItem(isLight, isLight ? 'true' : 'false');
  }, [isLight]);
  return __jsx("div", {
    style: _objectSpread({
      backgroundColor: theme.bg.primary,
      color: theme.text.primary
    }, _styles_theme__WEBPACK_IMPORTED_MODULE_6__["animation"].transition),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, __jsx("title", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }, "Home | Kal"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27,
      columnNumber: 9
    }
  })), __jsx(_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
    themeToggle: themeToggle,
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "container mx-auto max-w-screen-lg p-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "py-16",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }
  }, __jsx("h1", {
    className: "text-2xl md:text-5xl font-bold ",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 11
    }
  }, "Hey, I'm Calvin Leung"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 11
    }
  }, "Welcome to my page. Here is small intro of my life as a dev, student, and geek.")), __jsx("div", {
    className: "py-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-xl md:text-3xl font-bold",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 11
    }
  }, "About me"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 11
    }
  }, "I'm a final year computer science student in Hong Kong. During school, I learnt a lot of computer theory, algorithm etc. At night, when I am free, I also do coding for fun. Trying out new things, new language to make my life easier. When I don't code, I like boardgames, tabletop rpg and video games. Occasionally, I am scout and outdoor sports, like hiking and camping.")), __jsx("div", {
    className: "py-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-xl md:text-3xl font-bold",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 11
    }
  }, "Timeline"), __jsx(_components_Timeline_Timeline__WEBPACK_IMPORTED_MODULE_5__["default"], {
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 11
    }
  }))));
};

_s(Home, "7xB8GhJWwGmSHS+QFcJL/3WFKUs=");

_c = Home;
/* harmony default export */ __webpack_exports__["default"] = (Home);

var _c;

$RefreshReg$(_c, "Home");

;
    var _a, _b;
    // Legacy CSS implementations will `eval` browser code in a Node.js context
    // to extract CSS. For backwards compatibility, we need to check we're in a
    // browser context before continuing.
    if (typeof self !== 'undefined' &&
        // AMP / No-JS mode does not inject these helpers:
        '$RefreshHelpers$' in self) {
        var currentExports_1 = module.__proto__.exports;
        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
        // This cannot happen in MainTemplate because the exports mismatch between
        // templating and execution.
        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);
        // A module can be accepted automatically based on its exports, e.g. when
        // it is a Refresh Boundary.
        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {
            // Save the previous exports on update so we can compare the boundary
            // signatures.
            module.hot.dispose(function (data) {
                data.prevExports = currentExports_1;
            });
            // Unconditionally accept an update to this module, we'll check if it's
            // still a Refresh Boundary later.
            module.hot.accept();
            // This field is set when the previous version of this module was a
            // Refresh Boundary, letting us know we need to check for invalidation or
            // enqueue an update.
            if (prevExports !== null) {
                // A boundary can become ineligible if its exports are incompatible
                // with the previous exports.
                //
                // For example, if you add/remove/change exports, we'll want to
                // re-execute the importing modules, and force those components to
                // re-render. Similarly, if you convert a class component to a
                // function, we want to invalidate the boundary.
                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {
                    module.hot.invalidate();
                }
                else {
                    self.$RefreshHelpers$.scheduleUpdate();
                }
            }
        }
        else {
            // Since we just executed the code for the module, it's possible that the
            // new exports made it ineligible for being a boundary.
            // We only care about the case when we were _previously_ a boundary,
            // because we already accepted this update (accidental side effect).
            var isNoLongerABoundary = prevExports !== null;
            if (isNoLongerABoundary) {
                module.hot.invalidate();
            }
        }
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qc3giXSwibmFtZXMiOlsiSG9tZSIsIlJlYWN0IiwidXNlU3RhdGUiLCJpc0xpZ2h0Iiwic2V0SXNMaWdodCIsImxpZ2h0IiwiZGFyayIsInRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZVRvZ2dsZSIsInVzZUVmZmVjdCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJiYWNrZ3JvdW5kQ29sb3IiLCJiZyIsInByaW1hcnkiLCJjb2xvciIsInRleHQiLCJhbmltYXRpb24iLCJ0cmFuc2l0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxJQUFJLEdBQUcsU0FBUEEsSUFBTyxHQUFNO0FBQUE7O0FBQUEsd0JBQ2FDLDRDQUFLLENBQUNDLFFBQU4sQ0FBZSxJQUFmLENBRGI7QUFBQTtBQUFBLE1BQ1ZDLE9BRFU7QUFBQSxNQUNEQyxVQURDOztBQUFBLHlCQUVTSCw0Q0FBSyxDQUFDQyxRQUFOLENBQWVDLE9BQU8sR0FBR0UsbURBQUgsR0FBV0Msa0RBQWpDLENBRlQ7QUFBQTtBQUFBLE1BRVZDLEtBRlU7QUFBQSxNQUVIQyxRQUZHOztBQUdqQixNQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLFdBQU1MLFVBQVUsQ0FBQyxDQUFDRCxPQUFGLENBQWhCO0FBQUEsR0FBcEI7O0FBRUFGLDhDQUFLLENBQUNTLFNBQU4sQ0FBZ0IsWUFBTTtBQUNwQkYsWUFBUSxDQUFDTCxPQUFPLEdBQUdFLG1EQUFILEdBQVdDLGtEQUFuQixDQUFSO0FBQ0FLLGdCQUFZLENBQUNDLE9BQWIsQ0FBcUJULE9BQXJCLEVBQThCQSxPQUFPLEdBQUUsTUFBRixHQUFVLE9BQS9DO0FBQ0QsR0FIRCxFQUdHLENBQUNBLE9BQUQsQ0FISDtBQUtBLFNBQ0U7QUFDRSxTQUFLO0FBQ0hVLHFCQUFlLEVBQUVOLEtBQUssQ0FBQ08sRUFBTixDQUFTQyxPQUR2QjtBQUVIQyxXQUFLLEVBQUVULEtBQUssQ0FBQ1UsSUFBTixDQUFXRjtBQUZmLE9BR0FHLHVEQUFTLENBQUNDLFVBSFYsQ0FEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBT0UsTUFBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixFQUVFO0FBQU0sT0FBRyxFQUFDLE1BQVY7QUFBaUIsUUFBSSxFQUFDLGNBQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixDQVBGLEVBWUUsTUFBQywwREFBRDtBQUFRLGVBQVcsRUFBRVYsV0FBckI7QUFBa0MsU0FBSyxFQUFFRixLQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBWkYsRUFhRTtBQUFLLGFBQVMsRUFBQyx1Q0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsT0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSSxhQUFTLEVBQUMsaUNBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFERixFQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUZBSkYsQ0FERixFQVVFO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUksYUFBUyxFQUFDLCtCQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsRUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBYQUZGLENBVkYsRUFxQkU7QUFBSyxhQUFTLEVBQUMsTUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSSxhQUFTLEVBQUMsK0JBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixFQUVFLE1BQUMscUVBQUQ7QUFBVSxTQUFLLEVBQUVBLEtBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixDQXJCRixDQWJGLENBREY7QUEwQ0QsQ0FwREQ7O0dBQU1QLEk7O0tBQUFBLEk7QUFzRFNBLG1FQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3N0YXRpY1xcZGV2ZWxvcG1lbnRcXHBhZ2VzXFxpbmRleC5qcy43MDk0MmIwMjk4ZTlmZTgwZjQ2Yi5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvaW5kZXguanN4XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9jb21wb25lbnRzL0hlYWRlcic7XG5pbXBvcnQgVGltZWxpbmUgZnJvbSAnLi4vY29tcG9uZW50cy9UaW1lbGluZS9UaW1lbGluZSc7XG5pbXBvcnQgeyBsaWdodCwgZGFyaywgYW5pbWF0aW9uIH0gZnJvbSAnLi4vc3R5bGVzL3RoZW1lJztcblxuY29uc3QgSG9tZSA9ICgpID0+IHtcbiAgY29uc3QgW2lzTGlnaHQsIHNldElzTGlnaHRdID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gUmVhY3QudXNlU3RhdGUoaXNMaWdodCA/IGxpZ2h0IDogZGFyayk7XG4gIGNvbnN0IHRoZW1lVG9nZ2xlID0gKCkgPT4gc2V0SXNMaWdodCghaXNMaWdodCk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRUaGVtZShpc0xpZ2h0ID8gbGlnaHQgOiBkYXJrKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShpc0xpZ2h0LCBpc0xpZ2h0PyAndHJ1ZSc6ICdmYWxzZScpXG4gIH0sIFtpc0xpZ2h0XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmJnLnByaW1hcnksXG4gICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LnByaW1hcnksXG4gICAgICAgIC4uLmFuaW1hdGlvbi50cmFuc2l0aW9uLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPkhvbWUgfCBLYWw8L3RpdGxlPlxuICAgICAgICA8bGluayByZWw9XCJpY29uXCIgaHJlZj1cIi9mYXZpY29uLmljb1wiIC8+XG4gICAgICA8L0hlYWQ+XG5cbiAgICAgIDxIZWFkZXIgdGhlbWVUb2dnbGU9e3RoZW1lVG9nZ2xlfSB0aGVtZT17dGhlbWV9IC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC1hdXRvIG1heC13LXNjcmVlbi1sZyBwLThcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0xNlwiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBtZDp0ZXh0LTV4bCBmb250LWJvbGQgXCI+XG4gICAgICAgICAgICBIZXksIEknbSBDYWx2aW4gTGV1bmdcbiAgICAgICAgICA8L2gxPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgV2VsY29tZSB0byBteSBwYWdlLiBIZXJlIGlzIHNtYWxsIGludHJvIG9mIG15IGxpZmUgYXMgYSBkZXYsXG4gICAgICAgICAgICBzdHVkZW50LCBhbmQgZ2Vlay5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LThcIj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBtZDp0ZXh0LTN4bCBmb250LWJvbGRcIj5BYm91dCBtZTwvaDI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBJJ20gYSBmaW5hbCB5ZWFyIGNvbXB1dGVyIHNjaWVuY2Ugc3R1ZGVudCBpbiBIb25nIEtvbmcuIER1cmluZ1xuICAgICAgICAgICAgc2Nob29sLCBJIGxlYXJudCBhIGxvdCBvZiBjb21wdXRlciB0aGVvcnksIGFsZ29yaXRobSBldGMuIEF0IG5pZ2h0LFxuICAgICAgICAgICAgd2hlbiBJIGFtIGZyZWUsIEkgYWxzbyBkbyBjb2RpbmcgZm9yIGZ1bi4gVHJ5aW5nIG91dCBuZXcgdGhpbmdzLCBuZXdcbiAgICAgICAgICAgIGxhbmd1YWdlIHRvIG1ha2UgbXkgbGlmZSBlYXNpZXIuIFdoZW4gSSBkb24ndCBjb2RlLCBJIGxpa2VcbiAgICAgICAgICAgIGJvYXJkZ2FtZXMsIHRhYmxldG9wIHJwZyBhbmQgdmlkZW8gZ2FtZXMuIE9jY2FzaW9uYWxseSwgSSBhbSBzY291dFxuICAgICAgICAgICAgYW5kIG91dGRvb3Igc3BvcnRzLCBsaWtlIGhpa2luZyBhbmQgY2FtcGluZy5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LThcIj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBtZDp0ZXh0LTN4bCBmb250LWJvbGRcIj5UaW1lbGluZTwvaDI+XG4gICAgICAgICAgPFRpbWVsaW5lIHRoZW1lPXt0aGVtZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG4iXSwic291cmNlUm9vdCI6IiJ9