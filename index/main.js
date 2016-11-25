/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./a2mp01/index/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	// import './main.css'
	// // import './index.scss';  // not work
	// class Greeter {
	//     constructor(public greeting: string) { }
	//     greet() {
	//         return "<h1>" + this.greeting + "</h1>";
	//     }
	// }
	//
	// var greeter = new Greeter("Hello, world!");
	//
	// document.body.innerHTML = greeter.greet();
	var weather_service_1 = __webpack_require__(6);
	var googlemap_service_1 = __webpack_require__(8);
	var Main = (function () {
	    function Main() {
	    }
	    Main.prototype.renderData = function () {
	        var weatherService = new weather_service_1.WeatherService();
	        var googleMapService = new googlemap_service_1.GoogleMapService();
	        var innerBlock = "<div> \n          <div>" + weatherService.getInner() + "</div>\n          <div>" + googleMapService.getInner() + "</div>\n      </div>";
	        return innerBlock;
	    };
	    return Main;
	}());
	var main = new Main();
	document.querySelector('.app').innerHTML = main.renderData();


/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(7);
	var WeatherService = (function () {
	    function WeatherService() {
	        this.innerBlock = "<div> \n        <!--$ {this.dowloadButton} -->\n        <div> Wheather table will be here </div>\n        </div> ";
	    }
	    WeatherService.prototype.downloadweather = function () {
	    };
	    WeatherService.prototype.getInner = function () {
	        return this.innerBlock;
	    };
	    return WeatherService;
	}());
	exports.WeatherService = WeatherService;


/***/ },
/* 7 */
/***/ function(module, exports) {

	// var Promise = require("es6-promise").Promise;
	// require('es6-promise').polyfill();
	// import * as Promise from 'es6-promise/Promise';
	"use strict";
	var RestService = (function () {
	    function RestService() {
	    }
	    return RestService;
	}());
	exports.RestService = RestService;
	// import '../../../app';
	// import IOptions = Bua.IOptions;
	//
	// import * as Promise from 'es6-promise/dist/es6-promise.js'
	// import 'whatwg-fetch';
	//
	// export class RestService {
	//
	//   constructor() {
	//
	//   }
	//
	//   sendRequest(type, url, data) {
	//     const lowerCaseType = type.toLowerCase();
	//
	//     const headers = lowerCaseType !== 'get' ? {
	//       'Content-Type': 'application/json',
	//       'Accept': 'application/json',
	//     } : {};
	//
	//     const options: IOptions  = {
	//       method: type,
	//       headers,
	//     };
	//
	//     if (data) {
	//       options.body = JSON.stringify(data);
	//     }
	//
	//     return fetch(url, options)
	//       .then(response => {
	//         // if (response.status === 401) {
	//         //   notAuthorizedHandlers.forEach(handler => handler());
	//         // }
	//         // if (response.status !== 200) {
	//         //   return Promise.reject(response.status);
	//         // }
	//         return response.json();
	//       })
	//       .catch(err => Promise.reject(err));
	//
	//
	//   }
	// } 


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var GoogleMapService = (function () {
	    function GoogleMapService() {
	        // api-key AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA
	        // lat: string = '52.4383235';
	        // lng: string = '31.0015138';
	        this.innerBlock = "<div id=\"map\"></div>";
	    }
	    GoogleMapService.prototype.getInner = function () {
	        return this.innerBlock;
	    };
	    return GoogleMapService;
	}());
	exports.GoogleMapService = GoogleMapService;


/***/ }
/******/ ]);