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
	var googlemap_service_1 = __webpack_require__(8);
	var location_service_1 = __webpack_require__(10);
	var markers_service_1 = __webpack_require__(11);
	var Main = (function () {
	    function Main(townCount) {
	        this.defaultZoom = 8;
	        this.defaultCount = 5;
	        this.weatherService = new weather_service_1.WeatherService();
	        this.googleMapService = new googlemap_service_1.GoogleMapService();
	        this.defaultCount = townCount;
	    }
	    Main.prototype.updateForLocation = function (crd, context) {
	        var lat = crd.latitude;
	        var lng = crd.longitude;
	        var zoom = context.defaultZoom;
	        var count = context.defaultCount;
	        context.googleMapService.setMapCenterAndZoom.call(context.googleMapService, lat, lng, zoom);
	        context.weatherService.downloadWeatherInCircle.call(context.weatherService, lat, lng, count, context.updateWeatherMarkers.bind(context));
	    };
	    Main.prototype.updateWeatherMarkers = function () {
	        var markers = markers_service_1.MarkersService.processMarkers(this.weatherService.getWeatherObject().list);
	        this.googleMapService.setMarkers(markers);
	    };
	    Main.prototype.renderData = function () {
	        location_service_1.LocationService.getCurrentLocation(this.updateForLocation, this);
	        return "<div class=\"container\"> \n          <div class='weather'>" + this.weatherService.getInner() + "</div>\n          <div class='map'>" + this.googleMapService.getInner() + "</div>\n      </div>";
	    };
	    return Main;
	}());
	var main = new Main(10);
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
	var WeatherService = (function () {
	    function WeatherService() {
	        this.API = "94c7919f6854ca11558382472a998f8f";
	        this.cnt = '10';
	        this.url = "http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=" + this.API; // Minsk id
	        this.type = 'GET';
	        this.async = true;
	        this.townTableTemp = '';
	        this.townTableRender = 'Loading';
	        this.innerBlock = "<div>        \n            <div>Weather in towns: </div>\n            <div class=\"townstable\">" + this.townTableRender + "</div>\n        </div> ";
	    }
	    WeatherService.prototype._initTable = function () {
	        return "<div class='tablewrapper'>";
	    };
	    // _addLineToTable(tableQuery: string, row: string){
	    //   tableQuery.concat(row);
	    // }
	    WeatherService.prototype._endTable = function () {
	        return '</div>';
	    };
	    WeatherService.prototype.generateTableRow = function (rowObject) {
	        return "<div class=\"rowelement\">         \n        <table class=\"tablerow\">\n            <tr>\n                <td><span class=\"townname\">" + rowObject.name + "</span></td>\n                <td></td>\n                <td></td>\n            </tr>\n            <tr>\n                <td><span>Temperature: </span><span>" + Math.round(rowObject.main.temp - 273.15) + "</span></td>\n                <td><span>Humidity: </span><span>" + (rowObject.main.humidity || '') + "</span></td>\n                <td><span>Wind: </span><span>" + (rowObject.wind.speed || '') + "</span></td>\n            </tr>\n        </table>        \n      </div>";
	    };
	    WeatherService.prototype.generateTownTable = function (array, context) {
	        context.townTableTemp = context._initTable();
	        array.forEach(function (value, index, array) {
	            context.townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
	        });
	        context.townTableTemp = context.townTableTemp.concat(context._endTable());
	        context.townTableRender = String(context.townTableTemp);
	        context.updateTowsTable(context);
	    };
	    WeatherService.prototype.updateTowsTable = function (context) {
	        document.querySelector('.townstable').innerHTML = context.townTableRender;
	    };
	    WeatherService.prototype.callBackResponseList = function (data, context) {
	        if (data !== null) {
	            context.weatherObject = JSON.parse(data);
	            context.generateTownTable(context.weatherObject.list, context);
	            context.updateTowsTable(context);
	            if (context.callbackDownloadFunction !== undefined) {
	                context.callbackDownloadFunction();
	            }
	        }
	        else {
	            console.log('Cann\'t load data from weather portal!');
	            alert('Cann\'t load data from weather portal!');
	        }
	    };
	    WeatherService.prototype.downloadWeatherInCircle = function (latitude, longitude, count, callbackFunction) {
	        var urlTemplate = "http://api.openweathermap.org/data/2.5/find?lat=" + latitude + "&lon=" + longitude + "&cnt=" + count + "&appid=" + this.API;
	        this.callbackDownloadFunction = callbackFunction;
	        rest_service_1.RestService.sendRequest(this.type, urlTemplate, this.async, this.callBackResponseList, this, '');
	    };
	    WeatherService.prototype.getWeatherObject = function () {
	        return this.weatherObject;
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

	"use strict";
	exports.RestService = {
	    sendRequest: function (type, url, async, callBack, context, body) {
	        var xhr = new XMLHttpRequest();
	        xhr.open(type, url, async);
	        xhr.send([body]);
	        xhr.onreadystatechange = function () {
	            if (this.readyState != 4)
	                return;
	            if (this.status != 200) {
	                callBack(null);
	            }
	            else {
	                callBack(this.responseText, context);
	            }
	        };
	    }
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var load_google_maps_api_1 = __webpack_require__(9);
	// import * as loadGoogleMapsAPI from 'load-google-maps-api/index.js';
	var GoogleMapService = (function () {
	    function GoogleMapService() {
	        // api-key AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA
	        // lat: string = '52.4383235';
	        // lng: string = '31.0015138';
	        this.lat = '0.0';
	        this.lng = '0.0';
	        this.zoom = '1';
	        this.key = 'AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA';
	        this.innerBlock = "<div id=\"googlemap\"></div>";
	        this.initMap();
	    }
	    GoogleMapService.prototype.setMapCenterAndZoom = function (lat, lng, zoom) {
	        var mapOptions = {
	            center: {
	                lat: lat,
	                lng: lng
	            },
	            zoom: zoom
	        };
	        this.googleMapObj.setOptions(mapOptions);
	    };
	    GoogleMapService.prototype.setMarkers = function (markerSetArray) {
	        var _this = this;
	        this.markerArray = markerSetArray;
	        markerSetArray.forEach(function (value, index, array) {
	            var marker = new google.maps.Marker({
	                position: { lat: value.lat, lng: value.lng },
	                map: _this.googleMapObj,
	                title: value.text
	            });
	        });
	    };
	    GoogleMapService.prototype.initMap = function () {
	        var _this = this;
	        load_google_maps_api_1.default({ key: this.key }).then(function (googleMaps) {
	            _this.googleMapObj = new googleMaps.Map(document.getElementById('googlemap'), {
	                center: { lat: parseFloat(_this.lat), lng: parseFloat(_this.lng) },
	                zoom: parseInt(_this.zoom)
	            });
	        }).catch(function (err) {
	            console.error(err);
	            alert('Cann\'t load google map!');
	        });
	    };
	    GoogleMapService.prototype.getInner = function () {
	        return this.innerBlock;
	    };
	    return GoogleMapService;
	}());
	exports.GoogleMapService = GoogleMapService;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var client = _ref.client;
	  var key = _ref.key;
	  var language = _ref.language;
	  var _ref$libraries = _ref.libraries;
	  var libraries = _ref$libraries === undefined ? [] : _ref$libraries;
	  var _ref$timeout = _ref.timeout;
	  var timeout = _ref$timeout === undefined ? 10000 : _ref$timeout;
	  var v = _ref.v;

	  var callbackName = '__googleMapsApiOnLoadCallback';

	  return new Promise(function (resolve, reject) {

	    // Exit if not running inside a browser.
	    if (typeof window === 'undefined') {
	      return reject(new Error('Can only load the Google Maps API in the browser'));
	    }

	    // Prepare the `script` tag to be inserted into the page.
	    var scriptElement = document.createElement('script');
	    var params = ['callback=' + callbackName];
	    if (client) params.push('client=' + client);
	    if (key) params.push('key=' + key);
	    if (language) params.push('language=' + language);
	    libraries = [].concat(libraries); // Ensure that `libraries` is an array
	    if (libraries.length) params.push('libraries=' + libraries.join(','));
	    if (v) params.push('v=' + v);
	    scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');

	    // Timeout if necessary.
	    var timeoutId = null;
	    if (timeout) {
	      timeoutId = setTimeout(function () {
	        window[callbackName] = function () {}; // Set the on load callback to a no-op.
	        reject(new Error('Could not load the Google Maps API'));
	      }, timeout);
	    }

	    // Hook up the on load callback.
	    window[callbackName] = function () {
	      if (timeoutId !== null) {
	        clearTimeout(timeoutId);
	      }
	      resolve(window.google.maps);
	      delete window[callbackName];
	    };

	    // Insert the `script` tag.
	    document.body.appendChild(scriptElement);
	  });
	};

/***/ },
/* 10 */
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
	            alert('Cann\'t get your current position!');
	            return;
	        }
	        navigator.geolocation.getCurrentPosition(success, error, options);
	    }
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	exports.MarkersService = {
	    processMarkers: function (array) {
	        var sampleArray = [];
	        array.forEach(function (value, index, array) {
	            // townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
	            sampleArray.push({
	                lng: value.coord.lon,
	                lat: value.coord.lat,
	                text: value.name + ': ' + String(Math.round(value.main.temp - 273.15)),
	                name: value.name
	            });
	        });
	        return sampleArray;
	    }
	};


/***/ }
/******/ ]);