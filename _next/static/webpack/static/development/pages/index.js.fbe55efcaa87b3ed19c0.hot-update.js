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
    var savedPref = localStorage.getItem('isLight');
    if (savedPref) setIsLight(savedPref === 'true');
  }, []);
  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {
    setTheme(isLight ? _styles_theme__WEBPACK_IMPORTED_MODULE_6__["light"] : _styles_theme__WEBPACK_IMPORTED_MODULE_6__["dark"]);
    localStorage.setItem('isLight', isLight ? 'true' : 'false');
  }, [isLight]);
  return __jsx("div", {
    style: _objectSpread({
      backgroundColor: theme.bg.primary,
      color: theme.text.primary
    }, _styles_theme__WEBPACK_IMPORTED_MODULE_6__["animation"].transition),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }, __jsx("title", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31,
      columnNumber: 9
    }
  }, "Home | Kal"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 9
    }
  })), __jsx(_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
    themeToggle: themeToggle,
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "container mx-auto max-w-screen-lg p-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "py-16",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, __jsx("h1", {
    className: "text-2xl md:text-5xl font-bold ",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 11
    }
  }, "Hey, I'm Calvin Leung"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 11
    }
  }, "Welcome to my page. Here is small intro of my life as a dev, student, and geek.")), __jsx("div", {
    className: "py-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-xl md:text-3xl font-bold",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 11
    }
  }, "About me"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 11
    }
  }, "I'm a final year computer science student in Hong Kong. During school, I learnt a lot of computer theory, algorithm etc. At night, when I am free, I also do coding for fun. Trying out new things, new language to make my life easier. When I don't code, I like boardgames, tabletop rpg and video games. Occasionally, I am scout and outdoor sports, like hiking and camping.")), __jsx("div", {
    className: "py-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-xl md:text-3xl font-bold",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 11
    }
  }, "Timeline"), __jsx(_components_Timeline_Timeline__WEBPACK_IMPORTED_MODULE_5__["default"], {
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 11
    }
  }))));
};

_s(Home, "aLhWyBtMw2aNcZHVGRxU6C1xSGU=");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qc3giXSwibmFtZXMiOlsiSG9tZSIsIlJlYWN0IiwidXNlU3RhdGUiLCJpc0xpZ2h0Iiwic2V0SXNMaWdodCIsImxpZ2h0IiwiZGFyayIsInRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZVRvZ2dsZSIsInVzZUVmZmVjdCIsInNhdmVkUHJlZiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiYmFja2dyb3VuZENvbG9yIiwiYmciLCJwcmltYXJ5IiwiY29sb3IiLCJ0ZXh0IiwiYW5pbWF0aW9uIiwidHJhbnNpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUFBOztBQUFBLHdCQUNhQyw0Q0FBSyxDQUFDQyxRQUFOLENBQWUsSUFBZixDQURiO0FBQUE7QUFBQSxNQUNWQyxPQURVO0FBQUEsTUFDREMsVUFEQzs7QUFBQSx5QkFFU0gsNENBQUssQ0FBQ0MsUUFBTixDQUFlQyxPQUFPLEdBQUdFLG1EQUFILEdBQVdDLGtEQUFqQyxDQUZUO0FBQUE7QUFBQSxNQUVWQyxLQUZVO0FBQUEsTUFFSEMsUUFGRzs7QUFHakIsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxXQUFNTCxVQUFVLENBQUMsQ0FBQ0QsT0FBRixDQUFoQjtBQUFBLEdBQXBCOztBQUVBRiw4Q0FBSyxDQUFDUyxTQUFOLENBQWdCLFlBQU07QUFDcEIsUUFBTUMsU0FBUyxHQUFHQyxZQUFZLENBQUNDLE9BQWIsQ0FBcUIsU0FBckIsQ0FBbEI7QUFDQSxRQUFJRixTQUFKLEVBQWVQLFVBQVUsQ0FBQ08sU0FBUyxLQUFLLE1BQWYsQ0FBVjtBQUNoQixHQUhELEVBR0csRUFISDtBQUtBViw4Q0FBSyxDQUFDUyxTQUFOLENBQWdCLFlBQU07QUFDcEJGLFlBQVEsQ0FBQ0wsT0FBTyxHQUFHRSxtREFBSCxHQUFXQyxrREFBbkIsQ0FBUjtBQUNBTSxnQkFBWSxDQUFDRSxPQUFiLENBQXFCLFNBQXJCLEVBQWdDWCxPQUFPLEdBQUcsTUFBSCxHQUFZLE9BQW5EO0FBQ0QsR0FIRCxFQUdHLENBQUNBLE9BQUQsQ0FISDtBQUtBLFNBQ0U7QUFDRSxTQUFLO0FBQ0hZLHFCQUFlLEVBQUVSLEtBQUssQ0FBQ1MsRUFBTixDQUFTQyxPQUR2QjtBQUVIQyxXQUFLLEVBQUVYLEtBQUssQ0FBQ1ksSUFBTixDQUFXRjtBQUZmLE9BR0FHLHVEQUFTLENBQUNDLFVBSFYsQ0FEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBT0UsTUFBQyxnREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixFQUVFO0FBQU0sT0FBRyxFQUFDLE1BQVY7QUFBaUIsUUFBSSxFQUFDLGNBQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixDQVBGLEVBWUUsTUFBQywwREFBRDtBQUFRLGVBQVcsRUFBRVosV0FBckI7QUFBa0MsU0FBSyxFQUFFRixLQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBWkYsRUFhRTtBQUFLLGFBQVMsRUFBQyx1Q0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsT0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSSxhQUFTLEVBQUMsaUNBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFERixFQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUZBSkYsQ0FERixFQVVFO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUksYUFBUyxFQUFDLCtCQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsRUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBYQUZGLENBVkYsRUFxQkU7QUFBSyxhQUFTLEVBQUMsTUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSSxhQUFTLEVBQUMsK0JBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixFQUVFLE1BQUMscUVBQUQ7QUFBVSxTQUFLLEVBQUVBLEtBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGRixDQXJCRixDQWJGLENBREY7QUEwQ0QsQ0F6REQ7O0dBQU1QLEk7O0tBQUFBLEk7QUEyRFNBLG1FQUFmIiwiZmlsZSI6InN0YXRpYy93ZWJwYWNrL3N0YXRpY1xcZGV2ZWxvcG1lbnRcXHBhZ2VzXFxpbmRleC5qcy5mYmU1NWVmY2FhODdiM2VkMTljMC5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvaW5kZXguanN4XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9jb21wb25lbnRzL0hlYWRlcic7XG5pbXBvcnQgVGltZWxpbmUgZnJvbSAnLi4vY29tcG9uZW50cy9UaW1lbGluZS9UaW1lbGluZSc7XG5pbXBvcnQgeyBsaWdodCwgZGFyaywgYW5pbWF0aW9uIH0gZnJvbSAnLi4vc3R5bGVzL3RoZW1lJztcblxuY29uc3QgSG9tZSA9ICgpID0+IHtcbiAgY29uc3QgW2lzTGlnaHQsIHNldElzTGlnaHRdID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFt0aGVtZSwgc2V0VGhlbWVdID0gUmVhY3QudXNlU3RhdGUoaXNMaWdodCA/IGxpZ2h0IDogZGFyayk7XG4gIGNvbnN0IHRoZW1lVG9nZ2xlID0gKCkgPT4gc2V0SXNMaWdodCghaXNMaWdodCk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZFByZWYgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMaWdodCcpO1xuICAgIGlmIChzYXZlZFByZWYpIHNldElzTGlnaHQoc2F2ZWRQcmVmID09PSAndHJ1ZScpO1xuICB9LCBbXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRUaGVtZShpc0xpZ2h0ID8gbGlnaHQgOiBkYXJrKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMaWdodCcsIGlzTGlnaHQgPyAndHJ1ZScgOiAnZmFsc2UnKTtcbiAgfSwgW2lzTGlnaHRdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmcucHJpbWFyeSxcbiAgICAgICAgY29sb3I6IHRoZW1lLnRleHQucHJpbWFyeSxcbiAgICAgICAgLi4uYW5pbWF0aW9uLnRyYW5zaXRpb24sXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+SG9tZSB8IEthbDwvdGl0bGU+XG4gICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCIgLz5cbiAgICAgIDwvSGVhZD5cblxuICAgICAgPEhlYWRlciB0aGVtZVRvZ2dsZT17dGhlbWVUb2dnbGV9IHRoZW1lPXt0aGVtZX0gLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gbWF4LXctc2NyZWVuLWxnIHAtOFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTE2XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIG1kOnRleHQtNXhsIGZvbnQtYm9sZCBcIj5cbiAgICAgICAgICAgIEhleSwgSSdtIENhbHZpbiBMZXVuZ1xuICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICBXZWxjb21lIHRvIG15IHBhZ2UuIEhlcmUgaXMgc21hbGwgaW50cm8gb2YgbXkgbGlmZSBhcyBhIGRldixcbiAgICAgICAgICAgIHN0dWRlbnQsIGFuZCBnZWVrLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktOFwiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIG1kOnRleHQtM3hsIGZvbnQtYm9sZFwiPkFib3V0IG1lPC9oMj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIEknbSBhIGZpbmFsIHllYXIgY29tcHV0ZXIgc2NpZW5jZSBzdHVkZW50IGluIEhvbmcgS29uZy4gRHVyaW5nXG4gICAgICAgICAgICBzY2hvb2wsIEkgbGVhcm50IGEgbG90IG9mIGNvbXB1dGVyIHRoZW9yeSwgYWxnb3JpdGhtIGV0Yy4gQXQgbmlnaHQsXG4gICAgICAgICAgICB3aGVuIEkgYW0gZnJlZSwgSSBhbHNvIGRvIGNvZGluZyBmb3IgZnVuLiBUcnlpbmcgb3V0IG5ldyB0aGluZ3MsIG5ld1xuICAgICAgICAgICAgbGFuZ3VhZ2UgdG8gbWFrZSBteSBsaWZlIGVhc2llci4gV2hlbiBJIGRvbid0IGNvZGUsIEkgbGlrZVxuICAgICAgICAgICAgYm9hcmRnYW1lcywgdGFibGV0b3AgcnBnIGFuZCB2aWRlbyBnYW1lcy4gT2NjYXNpb25hbGx5LCBJIGFtIHNjb3V0XG4gICAgICAgICAgICBhbmQgb3V0ZG9vciBzcG9ydHMsIGxpa2UgaGlraW5nIGFuZCBjYW1waW5nLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktOFwiPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIG1kOnRleHQtM3hsIGZvbnQtYm9sZFwiPlRpbWVsaW5lPC9oMj5cbiAgICAgICAgICA8VGltZWxpbmUgdGhlbWU9e3RoZW1lfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=