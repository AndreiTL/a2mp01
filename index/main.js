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
	var weather_service_1 = __webpack_require__(6);
	var googlemap_service_1 = __webpack_require__(9);
	var Main = (function () {
	    function Main() {
	        this.weatherService = new weather_service_1.WeatherService();
	        this.googleMapService = new googlemap_service_1.GoogleMapService();
	    }
	    Main.prototype.renderData = function () {
	        return "<div> \n          <div class='weather'>" + this.weatherService.getInner() + "</div>\n          <div class='map'>" + this.googleMapService.getInner() + "</div>\n      </div>";
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
	var rest_service_1 = __webpack_require__(7);
	var location_service_1 = __webpack_require__(8);
	var WeatherService = (function () {
	    function WeatherService() {
	        this.API = "94c7919f6854ca11558382472a998f8f";
	        this.cnt = '10';
	        this.url = "http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=" + this.API; // Minsk id
	        this.type = 'GET';
	        this.async = true;
	        this.townTableTemp = '';
	        this.townTableRender = 'Loading';
	        this.innerBlock = "<div>        \n            <div>Weather in towns: </div>\n            <div class=\"townstable\"></div>\n        </div> ";
	    }
	    WeatherService.prototype._initTable = function () {
	        return "<div class='tablewrapper'>";
	    };
	    WeatherService.prototype._addLineToTable = function (tableQuery, row) {
	        tableQuery.concat(row);
	    };
	    WeatherService.prototype._endTable = function () {
	        return '</div>';
	    };
	    WeatherService.prototype.generateTableRow = function (rowObject) {
	        return "<div class=\"tablerow\"> \n        <div class=\"cell townname\"><span>" + rowObject.name + "</span></div>\n        <div class=\"cell towntemp\"><span>" + (rowObject.main.temp - 274.15) + "</span></div>\n      </div>";
	    };
	    WeatherService.prototype.generateTownTable = function (array, context) {
	        context.townTableTemp = context._initTable();
	        array.forEach(function (value, index, array) {
	            // context._addLineToTable(context.townTableTemp, context.generateTableRow(value));
	            context.townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
	        });
	        // context._endTable(context.townTableTemp);
	        context.townTableTemp = context.townTableTemp.concat(context._endTable());
	        console.log(context.townTableTemp);
	        context.townTableRender = String(context.townTableTemp);
	        context.updateTowsTable(context);
	    };
	    WeatherService.prototype.updateTowsTable = function (context) {
	        document.querySelector('.townstable').innerHTML = context.townTableRender;
	    };
	    WeatherService.prototype.downloadWeatherInCircle = function (coordinates, context) {
	        var urlTemplate = "http://api.openweathermap.org/data/2.5/find?lat=" + coordinates.latitude + "&lon=" + coordinates.longitude + "&cnt=" + context.cnt + "&appid=" + context.API;
	        console.log(urlTemplate);
	        rest_service_1.RestService.sendRequest(context.type, urlTemplate, context.async, context.callBackResponseList, context, '');
	    };
	    WeatherService.prototype.callBackResponseList = function (data, context) {
	        if (data !== null) {
	            console.log(' data ' + data);
	            context.weatherObject = JSON.parse(data);
	            context.generateTownTable(context.weatherObject.list, context);
	            context.updateTowsTable(context);
	        }
	        else {
	            console.log('Cann\'t load data from weather portal!');
	            alert('Cann\'t load data from weather portal!');
	        }
	    };
	    WeatherService.prototype.getInner = function () {
	        location_service_1.LocationService.getCurrentLocation(this.downloadWeatherInCircle, this);
	        // this.downloadweather();
	        return this.innerBlock;
	    };
	    return WeatherService;
	}());
	exports.WeatherService = WeatherService;


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.RestService = {
	    sendRequest: function (type, url, async, callBack, context, body) {
	        var xhr = new XMLHttpRequest();
	        xhr.open(type, url, async);
	        xhr.send([body]);
	        xhr.onreadystatechange = function () {
	            if (this.readyState != 4)
	                return;
	            // console.log(this.readyState + "" + this.status);
	            if (this.status != 200) {
	                // console.log(this.status + ': ' + this.statusText);
	                callBack(null);
	            }
	            else {
	                // console.log(this.responseText);
	                callBack(this.responseText, context);
	            }
	        };
	    }
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	exports.LocationService = {
	    getCurrentLocation: function (callBack, context) {
	        var options = {
	            enableHighAccuracy: true,
	            timeout: 5000,
	            maximumAge: 0
	        };
	        function success(pos) {
	            var crd = pos.coords;
	            console.log('Your current position is:');
	            console.log('Latitude : ' + crd.latitude);
	            console.log('Longitude: ' + crd.longitude);
	            console.log('More or less ' + crd.accuracy + ' meters.');
	            callBack(crd, context);
	            return;
	        }
	        function error(err) {
	            console.warn('ERROR(' + err.code + '): ' + err.message);
	            return;
	        }
	        navigator.geolocation.getCurrentPosition(success, error, options);
	    }
	};


/***/ },
/* 9 */
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