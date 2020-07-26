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
    setIsLight(!isLight);
    localStorage.setItem('isLight', isLight ? '0' : '1');
  };

  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {
    var savedPref = localStorage.getItem('isLight');
    if (savedPref) setIsLight(savedPref === '1');
  }, []);
  react__WEBPACK_IMPORTED_MODULE_2___default.a.useEffect(function () {
    setTheme(isLight ? _styles_theme__WEBPACK_IMPORTED_MODULE_6__["light"] : _styles_theme__WEBPACK_IMPORTED_MODULE_6__["dark"]);
  }, [isLight]);
  return __jsx("div", {
    style: _objectSpread({
      backgroundColor: theme.bg.primary,
      color: theme.text.primary
    }, _styles_theme__WEBPACK_IMPORTED_MODULE_6__["animation"].transition),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 5
    }
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32,
      columnNumber: 7
    }
  }, __jsx("title", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33,
      columnNumber: 9
    }
  }, "Home | Kal"), __jsx("link", {
    rel: "icon",
    href: "/favicon.ico",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34,
      columnNumber: 9
    }
  })), __jsx(_components_Header__WEBPACK_IMPORTED_MODULE_4__["default"], {
    themeToggle: themeToggle,
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }
  }), __jsx("div", {
    className: "container mx-auto max-w-screen-lg p-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "py-16",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 9
    }
  }, __jsx("h1", {
    className: "text-2xl md:text-5xl font-bold ",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 11
    }
  }, "Hey, I'm Calvin Leung"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 11
    }
  }, "Welcome to my page. Here is small intro of my life as a dev, student, and geek.")), __jsx("div", {
    className: "py-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-xl md:text-3xl font-bold",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 11
    }
  }, "About me"), __jsx("p", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 11
    }
  }, "I'm a final year computer science student in Hong Kong. During school, I learnt a lot of computer theory, algorithm etc. At night, when I am free, I also do coding for fun. Trying out new things, new language to make my life easier. When I don't code, I like boardgames, tabletop rpg and video games. Occasionally, I am scout and outdoor sports, like hiking and camping.")), __jsx("div", {
    className: "py-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 9
    }
  }, __jsx("h2", {
    className: "text-xl md:text-3xl font-bold",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 11
    }
  }, "Timeline"), __jsx(_components_Timeline_Timeline__WEBPACK_IMPORTED_MODULE_5__["default"], {
    theme: theme,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qc3giXSwibmFtZXMiOlsiSG9tZSIsIlJlYWN0IiwidXNlU3RhdGUiLCJpc0xpZ2h0Iiwic2V0SXNMaWdodCIsImxpZ2h0IiwiZGFyayIsInRoZW1lIiwic2V0VGhlbWUiLCJ0aGVtZVRvZ2dsZSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJ1c2VFZmZlY3QiLCJzYXZlZFByZWYiLCJnZXRJdGVtIiwiYmFja2dyb3VuZENvbG9yIiwiYmciLCJwcmltYXJ5IiwiY29sb3IiLCJ0ZXh0IiwiYW5pbWF0aW9uIiwidHJhbnNpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBTTtBQUFBOztBQUFBLHdCQUNhQyw0Q0FBSyxDQUFDQyxRQUFOLENBQWUsSUFBZixDQURiO0FBQUE7QUFBQSxNQUNWQyxPQURVO0FBQUEsTUFDREMsVUFEQzs7QUFBQSx5QkFFU0gsNENBQUssQ0FBQ0MsUUFBTixDQUFlQyxPQUFPLEdBQUdFLG1EQUFILEdBQVdDLGtEQUFqQyxDQUZUO0FBQUE7QUFBQSxNQUVWQyxLQUZVO0FBQUEsTUFFSEMsUUFGRzs7QUFHakIsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsR0FBTTtBQUN4QkwsY0FBVSxDQUFDLENBQUNELE9BQUYsQ0FBVjtBQUNBTyxnQkFBWSxDQUFDQyxPQUFiLENBQXFCLFNBQXJCLEVBQWdDUixPQUFPLEdBQUcsR0FBSCxHQUFTLEdBQWhEO0FBQ0QsR0FIRDs7QUFLQUYsOENBQUssQ0FBQ1csU0FBTixDQUFnQixZQUFNO0FBQ3BCLFFBQU1DLFNBQVMsR0FBR0gsWUFBWSxDQUFDSSxPQUFiLENBQXFCLFNBQXJCLENBQWxCO0FBQ0EsUUFBSUQsU0FBSixFQUFlVCxVQUFVLENBQUNTLFNBQVMsS0FBSyxHQUFmLENBQVY7QUFDaEIsR0FIRCxFQUdHLEVBSEg7QUFLQVosOENBQUssQ0FBQ1csU0FBTixDQUFnQixZQUFNO0FBQ3BCSixZQUFRLENBQUNMLE9BQU8sR0FBR0UsbURBQUgsR0FBV0Msa0RBQW5CLENBQVI7QUFDRCxHQUZELEVBRUcsQ0FBQ0gsT0FBRCxDQUZIO0FBSUEsU0FDRTtBQUNFLFNBQUs7QUFDSFkscUJBQWUsRUFBRVIsS0FBSyxDQUFDUyxFQUFOLENBQVNDLE9BRHZCO0FBRUhDLFdBQUssRUFBRVgsS0FBSyxDQUFDWSxJQUFOLENBQVdGO0FBRmYsT0FHQUcsdURBQVMsQ0FBQ0MsVUFIVixDQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FPRSxNQUFDLGdEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQURGLEVBRUU7QUFBTSxPQUFHLEVBQUMsTUFBVjtBQUFpQixRQUFJLEVBQUMsY0FBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUZGLENBUEYsRUFZRSxNQUFDLDBEQUFEO0FBQVEsZUFBVyxFQUFFWixXQUFyQjtBQUFrQyxTQUFLLEVBQUVGLEtBQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFaRixFQWFFO0FBQUssYUFBUyxFQUFDLHVDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBQyxPQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFJLGFBQVMsRUFBQyxpQ0FBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQURGLEVBSUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1RkFKRixDQURGLEVBVUU7QUFBSyxhQUFTLEVBQUMsTUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSSxhQUFTLEVBQUMsK0JBQWQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFERixFQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMFhBRkYsQ0FWRixFQXFCRTtBQUFLLGFBQVMsRUFBQyxNQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFJLGFBQVMsRUFBQywrQkFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLEVBRUUsTUFBQyxxRUFBRDtBQUFVLFNBQUssRUFBRUEsS0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUZGLENBckJGLENBYkYsQ0FERjtBQTBDRCxDQTNERDs7R0FBTVAsSTs7S0FBQUEsSTtBQTZEU0EsbUVBQWYiLCJmaWxlIjoic3RhdGljL3dlYnBhY2svc3RhdGljXFxkZXZlbG9wbWVudFxccGFnZXNcXGluZGV4LmpzLmM0NjJlNzA3NzRlMjZkMjhmYWIxLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9pbmRleC5qc3hcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4uL2NvbXBvbmVudHMvSGVhZGVyJztcbmltcG9ydCBUaW1lbGluZSBmcm9tICcuLi9jb21wb25lbnRzL1RpbWVsaW5lL1RpbWVsaW5lJztcbmltcG9ydCB7IGxpZ2h0LCBkYXJrLCBhbmltYXRpb24gfSBmcm9tICcuLi9zdHlsZXMvdGhlbWUnO1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBjb25zdCBbaXNMaWdodCwgc2V0SXNMaWdodF0gPSBSZWFjdC51c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3RoZW1lLCBzZXRUaGVtZV0gPSBSZWFjdC51c2VTdGF0ZShpc0xpZ2h0ID8gbGlnaHQgOiBkYXJrKTtcbiAgY29uc3QgdGhlbWVUb2dnbGUgPSAoKSA9PiB7XG4gICAgc2V0SXNMaWdodCghaXNMaWdodCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzTGlnaHQnLCBpc0xpZ2h0ID8gJzAnIDogJzEnKTtcbiAgfTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkUHJlZiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xpZ2h0Jyk7XG4gICAgaWYgKHNhdmVkUHJlZikgc2V0SXNMaWdodChzYXZlZFByZWYgPT09ICcxJyk7XG4gIH0sIFtdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFRoZW1lKGlzTGlnaHQgPyBsaWdodCA6IGRhcmspO1xuICB9LCBbaXNMaWdodF0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5iZy5wcmltYXJ5LFxuICAgICAgICBjb2xvcjogdGhlbWUudGV4dC5wcmltYXJ5LFxuICAgICAgICAuLi5hbmltYXRpb24udHJhbnNpdGlvbixcbiAgICAgIH19XG4gICAgPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5Ib21lIHwgS2FsPC90aXRsZT5cbiAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgPC9IZWFkPlxuXG4gICAgICA8SGVhZGVyIHRoZW1lVG9nZ2xlPXt0aGVtZVRvZ2dsZX0gdGhlbWU9e3RoZW1lfSAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgbXgtYXV0byBtYXgtdy1zY3JlZW4tbGcgcC04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHktMTZcIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgbWQ6dGV4dC01eGwgZm9udC1ib2xkIFwiPlxuICAgICAgICAgICAgSGV5LCBJJ20gQ2FsdmluIExldW5nXG4gICAgICAgICAgPC9oMT5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIFdlbGNvbWUgdG8gbXkgcGFnZS4gSGVyZSBpcyBzbWFsbCBpbnRybyBvZiBteSBsaWZlIGFzIGEgZGV2LFxuICAgICAgICAgICAgc3R1ZGVudCwgYW5kIGdlZWsuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS04XCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgbWQ6dGV4dC0zeGwgZm9udC1ib2xkXCI+QWJvdXQgbWU8L2gyPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAgSSdtIGEgZmluYWwgeWVhciBjb21wdXRlciBzY2llbmNlIHN0dWRlbnQgaW4gSG9uZyBLb25nLiBEdXJpbmdcbiAgICAgICAgICAgIHNjaG9vbCwgSSBsZWFybnQgYSBsb3Qgb2YgY29tcHV0ZXIgdGhlb3J5LCBhbGdvcml0aG0gZXRjLiBBdCBuaWdodCxcbiAgICAgICAgICAgIHdoZW4gSSBhbSBmcmVlLCBJIGFsc28gZG8gY29kaW5nIGZvciBmdW4uIFRyeWluZyBvdXQgbmV3IHRoaW5ncywgbmV3XG4gICAgICAgICAgICBsYW5ndWFnZSB0byBtYWtlIG15IGxpZmUgZWFzaWVyLiBXaGVuIEkgZG9uJ3QgY29kZSwgSSBsaWtlXG4gICAgICAgICAgICBib2FyZGdhbWVzLCB0YWJsZXRvcCBycGcgYW5kIHZpZGVvIGdhbWVzLiBPY2Nhc2lvbmFsbHksIEkgYW0gc2NvdXRcbiAgICAgICAgICAgIGFuZCBvdXRkb29yIHNwb3J0cywgbGlrZSBoaWtpbmcgYW5kIGNhbXBpbmcuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS04XCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgbWQ6dGV4dC0zeGwgZm9udC1ib2xkXCI+VGltZWxpbmU8L2gyPlxuICAgICAgICAgIDxUaW1lbGluZSB0aGVtZT17dGhlbWV9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIb21lO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==