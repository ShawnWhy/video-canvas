/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/canvas-sketch-util/random.js":
/*!***************************************************!*\
  !*** ./node_modules/canvas-sketch-util/random.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var seedRandom = __webpack_require__(/*! seed-random */ "./node_modules/seed-random/index.js");
var SimplexNoise = __webpack_require__(/*! simplex-noise */ "./node_modules/simplex-noise/simplex-noise.js");
var defined = __webpack_require__(/*! defined */ "./node_modules/defined/index.js");

function createRandom (defaultSeed) {
  defaultSeed = defined(defaultSeed, null);
  var defaultRandom = Math.random;
  var currentSeed;
  var currentRandom;
  var noiseGenerator;
  var _nextGaussian = null;
  var _hasNextGaussian = false;

  setSeed(defaultSeed);

  return {
    value: value,
    createRandom: function (defaultSeed) {
      return createRandom(defaultSeed);
    },
    setSeed: setSeed,
    getSeed: getSeed,
    getRandomSeed: getRandomSeed,
    valueNonZero: valueNonZero,
    permuteNoise: permuteNoise,
    noise1D: noise1D,
    noise2D: noise2D,
    noise3D: noise3D,
    noise4D: noise4D,
    sign: sign,
    boolean: boolean,
    chance: chance,
    range: range,
    rangeFloor: rangeFloor,
    pick: pick,
    shuffle: shuffle,
    onCircle: onCircle,
    insideCircle: insideCircle,
    onSphere: onSphere,
    insideSphere: insideSphere,
    quaternion: quaternion,
    weighted: weighted,
    weightedSet: weightedSet,
    weightedSetIndex: weightedSetIndex,
    gaussian: gaussian
  };

  function setSeed (seed, opt) {
    if (typeof seed === 'number' || typeof seed === 'string') {
      currentSeed = seed;
      currentRandom = seedRandom(currentSeed, opt);
    } else {
      currentSeed = undefined;
      currentRandom = defaultRandom;
    }
    noiseGenerator = createNoise();
    _nextGaussian = null;
    _hasNextGaussian = false;
  }

  function value () {
    return currentRandom();
  }

  function valueNonZero () {
    var u = 0;
    while (u === 0) u = value();
    return u;
  }

  function getSeed () {
    return currentSeed;
  }

  function getRandomSeed () {
    var seed = String(Math.floor(Math.random() * 1000000));
    return seed;
  }

  function createNoise () {
    return new SimplexNoise(currentRandom);
  }

  function permuteNoise () {
    noiseGenerator = createNoise();
  }

  function noise1D (x, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise2D(x * frequency, 0);
  }

  function noise2D (x, y, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise2D(x * frequency, y * frequency);
  }

  function noise3D (x, y, z, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    if (!isFinite(z)) throw new TypeError('z component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise3D(
      x * frequency,
      y * frequency,
      z * frequency
    );
  }

  function noise4D (x, y, z, w, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    if (!isFinite(z)) throw new TypeError('z component for noise() must be finite');
    if (!isFinite(w)) throw new TypeError('w component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise4D(
      x * frequency,
      y * frequency,
      z * frequency,
      w * frequency
    );
  }

  function sign () {
    return boolean() ? 1 : -1;
  }

  function boolean () {
    return value() > 0.5;
  }

  function chance (n) {
    n = defined(n, 0.5);
    if (typeof n !== 'number') throw new TypeError('expected n to be a number');
    return value() < n;
  }

  function range (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }

    return value() * (max - min) + min;
  }

  function rangeFloor (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }

    return Math.floor(range(min, max));
  }

  function pick (array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  function shuffle (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('Expected Array, got ' + typeof arr);
    }

    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();
    while (len) {
      rand = Math.floor(value() * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }
    return ret;
  }

  function onCircle (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var theta = value() * 2.0 * Math.PI;
    out[0] = radius * Math.cos(theta);
    out[1] = radius * Math.sin(theta);
    return out;
  }

  function insideCircle (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    onCircle(1, out);
    var r = radius * Math.sqrt(value());
    out[0] *= r;
    out[1] *= r;
    return out;
  }

  function onSphere (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var u = value() * Math.PI * 2;
    var v = value() * 2 - 1;
    var phi = u;
    var theta = Math.acos(v);
    out[0] = radius * Math.sin(theta) * Math.cos(phi);
    out[1] = radius * Math.sin(theta) * Math.sin(phi);
    out[2] = radius * Math.cos(theta);
    return out;
  }

  function insideSphere (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var u = value() * Math.PI * 2;
    var v = value() * 2 - 1;
    var k = value();

    var phi = u;
    var theta = Math.acos(v);
    var r = radius * Math.cbrt(k);
    out[0] = r * Math.sin(theta) * Math.cos(phi);
    out[1] = r * Math.sin(theta) * Math.sin(phi);
    out[2] = r * Math.cos(theta);
    return out;
  }

  function quaternion (out) {
    out = out || [];
    var u1 = value();
    var u2 = value();
    var u3 = value();

    var sq1 = Math.sqrt(1 - u1);
    var sq2 = Math.sqrt(u1);

    var theta1 = Math.PI * 2 * u2;
    var theta2 = Math.PI * 2 * u3;

    var x = Math.sin(theta1) * sq1;
    var y = Math.cos(theta1) * sq1;
    var z = Math.sin(theta2) * sq2;
    var w = Math.cos(theta2) * sq2;
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  function weightedSet (set) {
    set = set || [];
    if (set.length === 0) return null;
    return set[weightedSetIndex(set)].value;
  }

  function weightedSetIndex (set) {
    set = set || [];
    if (set.length === 0) return -1;
    return weighted(set.map(function (s) {
      return s.weight;
    }));
  }

  function weighted (weights) {
    weights = weights || [];
    if (weights.length === 0) return -1;
    var totalWeight = 0;
    var i;

    for (i = 0; i < weights.length; i++) {
      totalWeight += weights[i];
    }

    if (totalWeight <= 0) throw new Error('Weights must sum to > 0');

    var random = value() * totalWeight;
    for (i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i;
      }
      random -= weights[i];
    }
    return 0;
  }

  function gaussian (mean, standardDerivation) {
    mean = defined(mean, 0);
    standardDerivation = defined(standardDerivation, 1);

    // https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/classes/java/util/Random.java#L496
    if (_hasNextGaussian) {
      _hasNextGaussian = false;
      var result = _nextGaussian;
      _nextGaussian = null;
      return mean + standardDerivation * result;
    } else {
      var v1 = 0;
      var v2 = 0;
      var s = 0;
      do {
        v1 = value() * 2 - 1; // between -1 and 1
        v2 = value() * 2 - 1; // between -1 and 1
        s = v1 * v1 + v2 * v2;
      } while (s >= 1 || s === 0);
      var multiplier = Math.sqrt(-2 * Math.log(s) / s);
      _nextGaussian = (v2 * multiplier);
      _hasNextGaussian = true;
      return mean + standardDerivation * (v1 * multiplier);
    }
  }
}

module.exports = createRandom();


/***/ }),

/***/ "./node_modules/canvas-sketch/dist/canvas-sketch.umd.js":
/*!**************************************************************!*\
  !*** ./node_modules/canvas-sketch/dist/canvas-sketch.umd.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var browser =
	  commonjsGlobal.performance &&
	  commonjsGlobal.performance.now ? function now() {
	    return performance.now()
	  } : Date.now || function now() {
	    return +new Date
	  };

	var isPromise_1 = isPromise;

	function isPromise(obj) {
	  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}

	var isDom = isNode;

	function isNode (val) {
	  return (!val || typeof val !== 'object')
	    ? false
	    : (typeof window === 'object' && typeof window.Node === 'object')
	      ? (val instanceof window.Node)
	      : (typeof val.nodeType === 'number') &&
	        (typeof val.nodeName === 'string')
	}

	function getClientAPI() {
	    return typeof window !== 'undefined' && window['canvas-sketch-cli'];
	}

	function defined() {
	    var arguments$1 = arguments;

	    for (var i = 0;i < arguments.length; i++) {
	        if (arguments$1[i] != null) {
	            return arguments$1[i];
	        }
	    }
	    return undefined;
	}

	function isBrowser() {
	    return typeof document !== 'undefined';
	}

	function isWebGLContext(ctx) {
	    return typeof ctx.clear === 'function' && typeof ctx.clearColor === 'function' && typeof ctx.bufferData === 'function';
	}

	function isCanvas(element) {
	    return isDom(element) && /canvas/i.test(element.nodeName) && typeof element.getContext === 'function';
	}

	var keys = createCommonjsModule(function (module, exports) {
	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}
	});
	var keys_1 = keys.shim;

	var is_arguments = createCommonjsModule(function (module, exports) {
	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	}});
	var is_arguments_1 = is_arguments.supported;
	var is_arguments_2 = is_arguments.unsupported;

	var deepEqual_1 = createCommonjsModule(function (module) {
	var pSlice = Array.prototype.slice;



	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	};

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (is_arguments(a)) {
	    if (!is_arguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = keys(a),
	        kb = keys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}
	});

	var dateformat = createCommonjsModule(function (module, exports) {
	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	(function(global) {

	  var dateFormat = (function() {
	      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
	      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
	      var timezoneClip = /[^-+\dA-Z]/g;
	  
	      // Regexes and supporting functions are cached through closure
	      return function (date, mask, utc, gmt) {
	  
	        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
	          mask = date;
	          date = undefined;
	        }
	  
	        date = date || new Date;
	  
	        if(!(date instanceof Date)) {
	          date = new Date(date);
	        }
	  
	        if (isNaN(date)) {
	          throw TypeError('Invalid date');
	        }
	  
	        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
	  
	        // Allow setting the utc/gmt argument via the mask
	        var maskSlice = mask.slice(0, 4);
	        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
	          mask = mask.slice(4);
	          utc = true;
	          if (maskSlice === 'GMT:') {
	            gmt = true;
	          }
	        }
	  
	        var _ = utc ? 'getUTC' : 'get';
	        var d = date[_ + 'Date']();
	        var D = date[_ + 'Day']();
	        var m = date[_ + 'Month']();
	        var y = date[_ + 'FullYear']();
	        var H = date[_ + 'Hours']();
	        var M = date[_ + 'Minutes']();
	        var s = date[_ + 'Seconds']();
	        var L = date[_ + 'Milliseconds']();
	        var o = utc ? 0 : date.getTimezoneOffset();
	        var W = getWeek(date);
	        var N = getDayOfWeek(date);
	        var flags = {
	          d:    d,
	          dd:   pad(d),
	          ddd:  dateFormat.i18n.dayNames[D],
	          dddd: dateFormat.i18n.dayNames[D + 7],
	          m:    m + 1,
	          mm:   pad(m + 1),
	          mmm:  dateFormat.i18n.monthNames[m],
	          mmmm: dateFormat.i18n.monthNames[m + 12],
	          yy:   String(y).slice(2),
	          yyyy: y,
	          h:    H % 12 || 12,
	          hh:   pad(H % 12 || 12),
	          H:    H,
	          HH:   pad(H),
	          M:    M,
	          MM:   pad(M),
	          s:    s,
	          ss:   pad(s),
	          l:    pad(L, 3),
	          L:    pad(Math.round(L / 10)),
	          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
	          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
	          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
	          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
	          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
	          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
	          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
	          W:    W,
	          N:    N
	        };
	  
	        return mask.replace(token, function (match) {
	          if (match in flags) {
	            return flags[match];
	          }
	          return match.slice(1, match.length - 1);
	        });
	      };
	    })();

	  dateFormat.masks = {
	    'default':               'ddd mmm dd yyyy HH:MM:ss',
	    'shortDate':             'm/d/yy',
	    'mediumDate':            'mmm d, yyyy',
	    'longDate':              'mmmm d, yyyy',
	    'fullDate':              'dddd, mmmm d, yyyy',
	    'shortTime':             'h:MM TT',
	    'mediumTime':            'h:MM:ss TT',
	    'longTime':              'h:MM:ss TT Z',
	    'isoDate':               'yyyy-mm-dd',
	    'isoTime':               'HH:MM:ss',
	    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
	    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
	    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
	  };

	  // Internationalization strings
	  dateFormat.i18n = {
	    dayNames: [
	      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
	      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	    ],
	    monthNames: [
	      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
	      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
	    ],
	    timeNames: [
	      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
	    ]
	  };

	function pad(val, len) {
	  val = String(val);
	  len = len || 2;
	  while (val.length < len) {
	    val = '0' + val;
	  }
	  return val;
	}

	/**
	 * Get the ISO 8601 week number
	 * Based on comments from
	 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
	 *
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getWeek(date) {
	  // Remove time components of date
	  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	  // Change date to Thursday same week
	  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

	  // Take January 4th as it is always in week 1 (see ISO 8601)
	  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

	  // Change date to Thursday same week
	  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

	  // Check if daylight-saving-time-switch occurred and correct for it
	  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
	  targetThursday.setHours(targetThursday.getHours() - ds);

	  // Number of weeks between target Thursday and first Thursday
	  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
	  return 1 + Math.floor(weekDiff);
	}

	/**
	 * Get ISO-8601 numeric representation of the day of the week
	 * 1 (for Monday) through 7 (for Sunday)
	 * 
	 * @param  {Object} `date`
	 * @return {Number}
	 */
	function getDayOfWeek(date) {
	  var dow = date.getDay();
	  if(dow === 0) {
	    dow = 7;
	  }
	  return dow;
	}

	/**
	 * kind-of shortcut
	 * @param  {*} val
	 * @return {String}
	 */
	function kindOf(val) {
	  if (val === null) {
	    return 'null';
	  }

	  if (val === undefined) {
	    return 'undefined';
	  }

	  if (typeof val !== 'object') {
	    return typeof val;
	  }

	  if (Array.isArray(val)) {
	    return 'array';
	  }

	  return {}.toString.call(val)
	    .slice(8, -1).toLowerCase();
	}


	  if (false) {} else {
	    module.exports = dateFormat;
	  }
	})(commonjsGlobal);
	});

	/*!
	 * repeat-string <https://github.com/jonschlinkert/repeat-string>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	/**
	 * Results cache
	 */

	var res = '';
	var cache;

	/**
	 * Expose `repeat`
	 */

	var repeatString = repeat;

	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */

	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }

	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;

	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  } else if (res.length >= max) {
	    return res.substr(0, max);
	  }

	  while (max > res.length && num > 1) {
	    if (num & 1) {
	      res += str;
	    }

	    num >>= 1;
	    str += str;
	  }

	  res += str;
	  res = res.substr(0, max);
	  return res;
	}

	var padLeft = function padLeft(str, num, ch) {
	  str = str.toString();

	  if (typeof num === 'undefined') {
	    return str;
	  }

	  if (ch === 0) {
	    ch = '0';
	  } else if (ch) {
	    ch = ch.toString();
	  } else {
	    ch = ' ';
	  }

	  return repeatString(ch, num - str.length) + str;
	};

	var noop = function () {};
	var link;
	var defaultExts = {
	    extension: '',
	    prefix: '',
	    suffix: ''
	};
	var supportedEncodings = ['image/png','image/jpeg','image/webp'];
	function stream(isStart, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve, reject) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = resolveFilename(Object.assign({}, opts, {
	            extension: '',
	            frame: undefined
	        }));
	        var func = isStart ? 'streamStart' : 'streamEnd';
	        var client = getClientAPI();
	        if (client && client.output && typeof client[func] === 'function') {
	            return client[func](objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            return resolve({
	                filename: filename,
	                client: false
	            });
	        }
	    });
	}

	function streamStart(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(true, opts);
	}

	function streamEnd(opts) {
	    if ( opts === void 0 ) opts = {};

	    return stream(false, opts);
	}

	function exportCanvas(canvas, opt) {
	    if ( opt === void 0 ) opt = {};

	    var encoding = opt.encoding || 'image/png';
	    if (!supportedEncodings.includes(encoding)) 
	        { throw new Error(("Invalid canvas encoding " + encoding)); }
	    var extension = (encoding.split('/')[1] || '').replace(/jpeg/i, 'jpg');
	    if (extension) 
	        { extension = ("." + extension).toLowerCase(); }
	    return {
	        extension: extension,
	        type: encoding,
	        dataURL: canvas.toDataURL(encoding, opt.encodingQuality)
	    };
	}

	function createBlobFromDataURL(dataURL) {
	    return new Promise(function (resolve) {
	        var splitIndex = dataURL.indexOf(',');
	        if (splitIndex === -1) {
	            resolve(new window.Blob());
	            return;
	        }
	        var base64 = dataURL.slice(splitIndex + 1);
	        var byteString = window.atob(base64);
	        var type = dataURL.slice(0, splitIndex);
	        var mimeMatch = /data:([^;]+)/.exec(type);
	        var mime = (mimeMatch ? mimeMatch[1] : '') || undefined;
	        var ab = new ArrayBuffer(byteString.length);
	        var ia = new Uint8Array(ab);
	        for (var i = 0;i < byteString.length; i++) {
	            ia[i] = byteString.charCodeAt(i);
	        }
	        resolve(new window.Blob([ab], {
	            type: mime
	        }));
	    });
	}

	function saveDataURL(dataURL, opts) {
	    if ( opts === void 0 ) opts = {};

	    return createBlobFromDataURL(dataURL).then(function (blob) { return saveBlob(blob, opts); });
	}

	function saveBlob(blob, opts) {
	    if ( opts === void 0 ) opts = {};

	    return new Promise(function (resolve) {
	        opts = objectAssign({}, defaultExts, opts);
	        var filename = opts.filename;
	        var client = getClientAPI();
	        if (client && typeof client.saveBlob === 'function' && client.output) {
	            return client.saveBlob(blob, objectAssign({}, opts, {
	                filename: filename
	            })).then(function (ev) { return resolve(ev); });
	        } else {
	            if (!link) {
	                link = document.createElement('a');
	                link.style.visibility = 'hidden';
	                link.target = '_blank';
	            }
	            link.download = filename;
	            link.href = window.URL.createObjectURL(blob);
	            document.body.appendChild(link);
	            link.onclick = (function () {
	                link.onclick = noop;
	                setTimeout(function () {
	                    window.URL.revokeObjectURL(blob);
	                    if (link.parentElement) 
	                        { link.parentElement.removeChild(link); }
	                    link.removeAttribute('href');
	                    resolve({
	                        filename: filename,
	                        client: false
	                    });
	                });
	            });
	            link.click();
	        }
	    });
	}

	function saveFile(data, opts) {
	    if ( opts === void 0 ) opts = {};

	    var parts = Array.isArray(data) ? data : [data];
	    var blob = new window.Blob(parts, {
	        type: opts.type || ''
	    });
	    return saveBlob(blob, opts);
	}

	function getTimeStamp() {
	    var dateFormatStr = "yyyy.mm.dd-HH.MM.ss";
	    return dateformat(new Date(), dateFormatStr);
	}

	function resolveFilename(opt) {
	    if ( opt === void 0 ) opt = {};

	    opt = objectAssign({}, opt);
	    if (typeof opt.file === 'function') {
	        return opt.file(opt);
	    } else if (opt.file) {
	        return opt.file;
	    }
	    var frame = null;
	    var extension = '';
	    if (typeof opt.extension === 'string') 
	        { extension = opt.extension; }
	    if (typeof opt.frame === 'number') {
	        var totalFrames;
	        if (typeof opt.totalFrames === 'number') {
	            totalFrames = opt.totalFrames;
	        } else {
	            totalFrames = Math.max(10000, opt.frame);
	        }
	        frame = padLeft(String(opt.frame), String(totalFrames).length, '0');
	    }
	    var layerStr = isFinite(opt.totalLayers) && isFinite(opt.layer) && opt.totalLayers > 1 ? ("" + (opt.layer)) : '';
	    if (frame != null) {
	        return [layerStr,frame].filter(Boolean).join('-') + extension;
	    } else {
	        var defaultFileName = opt.timeStamp;
	        return [opt.prefix,opt.name || defaultFileName,layerStr,opt.hash,opt.suffix].filter(Boolean).join('-') + extension;
	    }
	}

	var commonTypos = {
	    dimension: 'dimensions',
	    animated: 'animate',
	    animating: 'animate',
	    unit: 'units',
	    P5: 'p5',
	    pixellated: 'pixelated',
	    looping: 'loop',
	    pixelPerInch: 'pixels'
	};
	var allKeys = ['dimensions','units','pixelsPerInch','orientation','scaleToFit',
	    'scaleToView','bleed','pixelRatio','exportPixelRatio','maxPixelRatio','scaleContext',
	    'resizeCanvas','styleCanvas','canvas','context','attributes','parent','file',
	    'name','prefix','suffix','animate','playing','loop','duration','totalFrames',
	    'fps','playbackRate','timeScale','frame','time','flush','pixelated','hotkeys',
	    'p5','id','scaleToFitPadding','data','params','encoding','encodingQuality'];
	var checkSettings = function (settings) {
	    var keys = Object.keys(settings);
	    keys.forEach(function (key) {
	        if (key in commonTypos) {
	            var actual = commonTypos[key];
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\", did you mean \"" + actual + "\"?"));
	        } else if (!allKeys.includes(key)) {
	            console.warn(("[canvas-sketch] Could not recognize the setting \"" + key + "\""));
	        }
	    });
	};

	function keyboardShortcuts (opt) {
	    if ( opt === void 0 ) opt = {};

	    var handler = function (ev) {
	        if (!opt.enabled()) 
	            { return; }
	        var client = getClientAPI();
	        if (ev.keyCode === 83 && !ev.altKey && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.save(ev);
	        } else if (ev.keyCode === 32) {
	            opt.togglePlay(ev);
	        } else if (client && !ev.altKey && ev.keyCode === 75 && (ev.metaKey || ev.ctrlKey)) {
	            ev.preventDefault();
	            opt.commit(ev);
	        }
	    };
	    var attach = function () {
	        window.addEventListener('keydown', handler);
	    };
	    var detach = function () {
	        window.removeEventListener('keydown', handler);
	    };
	    return {
	        attach: attach,
	        detach: detach
	    };
	}

	var defaultUnits = 'mm';
	var data = [['postcard',101.6,152.4],['poster-small',280,430],['poster',460,610],
	    ['poster-large',610,910],['business-card',50.8,88.9],['2r',64,89],['3r',89,127],
	    ['4r',102,152],['5r',127,178],['6r',152,203],['8r',203,254],['10r',254,305],['11r',
	    279,356],['12r',305,381],['a0',841,1189],['a1',594,841],['a2',420,594],['a3',
	    297,420],['a4',210,297],['a5',148,210],['a6',105,148],['a7',74,105],['a8',52,
	    74],['a9',37,52],['a10',26,37],['2a0',1189,1682],['4a0',1682,2378],['b0',1000,
	    1414],['b1',707,1000],['b1+',720,1020],['b2',500,707],['b2+',520,720],['b3',353,
	    500],['b4',250,353],['b5',176,250],['b6',125,176],['b7',88,125],['b8',62,88],
	    ['b9',44,62],['b10',31,44],['b11',22,32],['b12',16,22],['c0',917,1297],['c1',
	    648,917],['c2',458,648],['c3',324,458],['c4',229,324],['c5',162,229],['c6',114,
	    162],['c7',81,114],['c8',57,81],['c9',40,57],['c10',28,40],['c11',22,32],['c12',
	    16,22],['half-letter',5.5,8.5,'in'],['letter',8.5,11,'in'],['legal',8.5,14,'in'],
	    ['junior-legal',5,8,'in'],['ledger',11,17,'in'],['tabloid',11,17,'in'],['ansi-a',
	    8.5,11.0,'in'],['ansi-b',11.0,17.0,'in'],['ansi-c',17.0,22.0,'in'],['ansi-d',
	    22.0,34.0,'in'],['ansi-e',34.0,44.0,'in'],['arch-a',9,12,'in'],['arch-b',12,18,
	    'in'],['arch-c',18,24,'in'],['arch-d',24,36,'in'],['arch-e',36,48,'in'],['arch-e1',
	    30,42,'in'],['arch-e2',26,38,'in'],['arch-e3',27,39,'in']];
	var paperSizes = data.reduce(function (dict, preset) {
	    var item = {
	        units: preset[3] || defaultUnits,
	        dimensions: [preset[1],preset[2]]
	    };
	    dict[preset[0]] = item;
	    dict[preset[0].replace(/-/g, ' ')] = item;
	    return dict;
	}, {})

	var defined$1 = function () {
	    for (var i = 0; i < arguments.length; i++) {
	        if (arguments[i] !== undefined) return arguments[i];
	    }
	};

	var units = [ 'mm', 'cm', 'm', 'pc', 'pt', 'in', 'ft', 'px' ];

	var conversions = {
	  // metric
	  m: {
	    system: 'metric',
	    factor: 1
	  },
	  cm: {
	    system: 'metric',
	    factor: 1 / 100
	  },
	  mm: {
	    system: 'metric',
	    factor: 1 / 1000
	  },
	  // imperial
	  pt: {
	    system: 'imperial',
	    factor: 1 / 72
	  },
	  pc: {
	    system: 'imperial',
	    factor: 1 / 6
	  },
	  in: {
	    system: 'imperial',
	    factor: 1
	  },
	  ft: {
	    system: 'imperial',
	    factor: 12
	  }
	};

	const anchors = {
	  metric: {
	    unit: 'm',
	    ratio: 1 / 0.0254
	  },
	  imperial: {
	    unit: 'in',
	    ratio: 0.0254
	  }
	};

	function round (value, decimals) {
	  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
	}

	function convertDistance (value, fromUnit, toUnit, opts) {
	  if (typeof value !== 'number' || !isFinite(value)) throw new Error('Value must be a finite number');
	  if (!fromUnit || !toUnit) throw new Error('Must specify from and to units');

	  opts = opts || {};
	  var pixelsPerInch = defined$1(opts.pixelsPerInch, 96);
	  var precision = opts.precision;
	  var roundPixel = opts.roundPixel !== false;

	  fromUnit = fromUnit.toLowerCase();
	  toUnit = toUnit.toLowerCase();

	  if (units.indexOf(fromUnit) === -1) throw new Error('Invalid from unit "' + fromUnit + '", must be one of: ' + units.join(', '));
	  if (units.indexOf(toUnit) === -1) throw new Error('Invalid from unit "' + toUnit + '", must be one of: ' + units.join(', '));

	  if (fromUnit === toUnit) {
	    // We don't need to convert from A to B since they are the same already
	    return value;
	  }

	  var toFactor = 1;
	  var fromFactor = 1;
	  var isToPixel = false;

	  if (fromUnit === 'px') {
	    fromFactor = 1 / pixelsPerInch;
	    fromUnit = 'in';
	  }
	  if (toUnit === 'px') {
	    isToPixel = true;
	    toFactor = pixelsPerInch;
	    toUnit = 'in';
	  }

	  var fromUnitData = conversions[fromUnit];
	  var toUnitData = conversions[toUnit];

	  // source to anchor inside source's system
	  var anchor = value * fromUnitData.factor * fromFactor;

	  // if systems differ, convert one to another
	  if (fromUnitData.system !== toUnitData.system) {
	    // regular 'm' to 'in' and so forth
	    anchor *= anchors[fromUnitData.system].ratio;
	  }

	  var result = anchor / toUnitData.factor * toFactor;
	  if (isToPixel && roundPixel) {
	    result = Math.round(result);
	  } else if (typeof precision === 'number' && isFinite(precision)) {
	    result = round(result, precision);
	  }
	  return result;
	}

	var convertLength = convertDistance;
	var units_1 = units;
	convertLength.units = units_1;

	function getDimensionsFromPreset(dimensions, unitsTo, pixelsPerInch) {
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    if (typeof dimensions === 'string') {
	        var key = dimensions.toLowerCase();
	        if (!(key in paperSizes)) {
	            throw new Error(("The dimension preset \"" + dimensions + "\" is not supported or could not be found; try using a4, a3, postcard, letter, etc."));
	        }
	        var preset = paperSizes[key];
	        return preset.dimensions.map(function (d) { return convertDistance$1(d, preset.units, unitsTo, pixelsPerInch); });
	    } else {
	        return dimensions;
	    }
	}

	function convertDistance$1(dimension, unitsFrom, unitsTo, pixelsPerInch) {
	    if ( unitsFrom === void 0 ) unitsFrom = 'px';
	    if ( unitsTo === void 0 ) unitsTo = 'px';
	    if ( pixelsPerInch === void 0 ) pixelsPerInch = 72;

	    return convertLength(dimension, unitsFrom, unitsTo, {
	        pixelsPerInch: pixelsPerInch,
	        precision: 4,
	        roundPixel: true
	    });
	}

	function checkIfHasDimensions(settings) {
	    if (!settings.dimensions) 
	        { return false; }
	    if (typeof settings.dimensions === 'string') 
	        { return true; }
	    if (Array.isArray(settings.dimensions) && settings.dimensions.length >= 2) 
	        { return true; }
	    return false;
	}

	function getParentSize(props, settings) {
	    if (!isBrowser()) {
	        return [300,150];
	    }
	    var element = settings.parent || window;
	    if (element === window || element === document || element === document.body) {
	        return [window.innerWidth,window.innerHeight];
	    } else {
	        var ref = element.getBoundingClientRect();
	        var width = ref.width;
	        var height = ref.height;
	        return [width,height];
	    }
	}

	function resizeCanvas(props, settings) {
	    var width, height;
	    var styleWidth, styleHeight;
	    var canvasWidth, canvasHeight;
	    var browser = isBrowser();
	    var dimensions = settings.dimensions;
	    var hasDimensions = checkIfHasDimensions(settings);
	    var exporting = props.exporting;
	    var scaleToFit = hasDimensions ? settings.scaleToFit !== false : false;
	    var scaleToView = !exporting && hasDimensions ? settings.scaleToView : true;
	    if (!browser) 
	        { scaleToFit = (scaleToView = false); }
	    var units = settings.units;
	    var pixelsPerInch = typeof settings.pixelsPerInch === 'number' && isFinite(settings.pixelsPerInch) ? settings.pixelsPerInch : 72;
	    var bleed = defined(settings.bleed, 0);
	    var devicePixelRatio = browser ? window.devicePixelRatio : 1;
	    var basePixelRatio = scaleToView ? devicePixelRatio : 1;
	    var pixelRatio, exportPixelRatio;
	    if (typeof settings.pixelRatio === 'number' && isFinite(settings.pixelRatio)) {
	        pixelRatio = settings.pixelRatio;
	        exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	    } else {
	        if (hasDimensions) {
	            pixelRatio = basePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, 1);
	        } else {
	            pixelRatio = devicePixelRatio;
	            exportPixelRatio = defined(settings.exportPixelRatio, pixelRatio);
	        }
	    }
	    if (typeof settings.maxPixelRatio === 'number' && isFinite(settings.maxPixelRatio)) {
	        pixelRatio = Math.min(settings.maxPixelRatio, pixelRatio);
	    }
	    if (exporting) {
	        pixelRatio = exportPixelRatio;
	    }
	    var ref = getParentSize(props, settings);
	    var parentWidth = ref[0];
	    var parentHeight = ref[1];
	    var trimWidth, trimHeight;
	    if (hasDimensions) {
	        var result = getDimensionsFromPreset(dimensions, units, pixelsPerInch);
	        var highest = Math.max(result[0], result[1]);
	        var lowest = Math.min(result[0], result[1]);
	        if (settings.orientation) {
	            var landscape = settings.orientation === 'landscape';
	            width = landscape ? highest : lowest;
	            height = landscape ? lowest : highest;
	        } else {
	            width = result[0];
	            height = result[1];
	        }
	        trimWidth = width;
	        trimHeight = height;
	        width += bleed * 2;
	        height += bleed * 2;
	    } else {
	        width = parentWidth;
	        height = parentHeight;
	        trimWidth = width;
	        trimHeight = height;
	    }
	    var realWidth = width;
	    var realHeight = height;
	    if (hasDimensions && units) {
	        realWidth = convertDistance$1(width, units, 'px', pixelsPerInch);
	        realHeight = convertDistance$1(height, units, 'px', pixelsPerInch);
	    }
	    styleWidth = Math.round(realWidth);
	    styleHeight = Math.round(realHeight);
	    if (scaleToFit && !exporting && hasDimensions) {
	        var aspect = width / height;
	        var windowAspect = parentWidth / parentHeight;
	        var scaleToFitPadding = defined(settings.scaleToFitPadding, 40);
	        var maxWidth = Math.round(parentWidth - scaleToFitPadding * 2);
	        var maxHeight = Math.round(parentHeight - scaleToFitPadding * 2);
	        if (styleWidth > maxWidth || styleHeight > maxHeight) {
	            if (windowAspect > aspect) {
	                styleHeight = maxHeight;
	                styleWidth = Math.round(styleHeight * aspect);
	            } else {
	                styleWidth = maxWidth;
	                styleHeight = Math.round(styleWidth / aspect);
	            }
	        }
	    }
	    canvasWidth = scaleToView ? Math.round(pixelRatio * styleWidth) : Math.round(pixelRatio * realWidth);
	    canvasHeight = scaleToView ? Math.round(pixelRatio * styleHeight) : Math.round(pixelRatio * realHeight);
	    var viewportWidth = scaleToView ? Math.round(styleWidth) : Math.round(realWidth);
	    var viewportHeight = scaleToView ? Math.round(styleHeight) : Math.round(realHeight);
	    var scaleX = canvasWidth / width;
	    var scaleY = canvasHeight / height;
	    return {
	        bleed: bleed,
	        pixelRatio: pixelRatio,
	        width: width,
	        height: height,
	        dimensions: [width,height],
	        units: units || 'px',
	        scaleX: scaleX,
	        scaleY: scaleY,
	        pixelsPerInch: pixelsPerInch,
	        viewportWidth: viewportWidth,
	        viewportHeight: viewportHeight,
	        canvasWidth: canvasWidth,
	        canvasHeight: canvasHeight,
	        trimWidth: trimWidth,
	        trimHeight: trimHeight,
	        styleWidth: styleWidth,
	        styleHeight: styleHeight
	    };
	}

	var getCanvasContext_1 = getCanvasContext;
	function getCanvasContext (type, opts) {
	  if (typeof type !== 'string') {
	    throw new TypeError('must specify type string')
	  }

	  opts = opts || {};

	  if (typeof document === 'undefined' && !opts.canvas) {
	    return null // check for Node
	  }

	  var canvas = opts.canvas || document.createElement('canvas');
	  if (typeof opts.width === 'number') {
	    canvas.width = opts.width;
	  }
	  if (typeof opts.height === 'number') {
	    canvas.height = opts.height;
	  }

	  var attribs = opts;
	  var gl;
	  try {
	    var names = [ type ];
	    // prefix GL contexts
	    if (type.indexOf('webgl') === 0) {
	      names.push('experimental-' + type);
	    }

	    for (var i = 0; i < names.length; i++) {
	      gl = canvas.getContext(names[i], attribs);
	      if (gl) return gl
	    }
	  } catch (e) {
	    gl = null;
	  }
	  return (gl || null) // ensure null on fail
	}

	function createCanvasElement() {
	    if (!isBrowser()) {
	        throw new Error('It appears you are runing from Node.js or a non-browser environment. Try passing in an existing { canvas } interface instead.');
	    }
	    return document.createElement('canvas');
	}

	function createCanvas(settings) {
	    if ( settings === void 0 ) settings = {};

	    var context, canvas;
	    var ownsCanvas = false;
	    if (settings.canvas !== false) {
	        context = settings.context;
	        if (!context || typeof context === 'string') {
	            var newCanvas = settings.canvas;
	            if (!newCanvas) {
	                newCanvas = createCanvasElement();
	                ownsCanvas = true;
	            }
	            var type = context || '2d';
	            if (typeof newCanvas.getContext !== 'function') {
	                throw new Error("The specified { canvas } element does not have a getContext() function, maybe it is not a <canvas> tag?");
	            }
	            context = getCanvasContext_1(type, objectAssign({}, settings.attributes, {
	                canvas: newCanvas
	            }));
	            if (!context) {
	                throw new Error(("Failed at canvas.getContext('" + type + "') - the browser may not support this context, or a different context may already be in use with this canvas."));
	            }
	        }
	        canvas = context.canvas;
	        if (settings.canvas && canvas !== settings.canvas) {
	            throw new Error('The { canvas } and { context } settings must point to the same underlying canvas element');
	        }
	        if (settings.pixelated) {
	            context.imageSmoothingEnabled = false;
	            context.mozImageSmoothingEnabled = false;
	            context.oImageSmoothingEnabled = false;
	            context.webkitImageSmoothingEnabled = false;
	            context.msImageSmoothingEnabled = false;
	            canvas.style['image-rendering'] = 'pixelated';
	        }
	    }
	    return {
	        canvas: canvas,
	        context: context,
	        ownsCanvas: ownsCanvas
	    };
	}

	var SketchManager = function SketchManager() {
	    var this$1 = this;

	    this._settings = {};
	    this._props = {};
	    this._sketch = undefined;
	    this._raf = null;
	    this._recordTimeout = null;
	    this._lastRedrawResult = undefined;
	    this._isP5Resizing = false;
	    this._keyboardShortcuts = keyboardShortcuts({
	        enabled: function () { return this$1.settings.hotkeys !== false; },
	        save: function (ev) {
	            if (ev.shiftKey) {
	                if (this$1.props.recording) {
	                    this$1.endRecord();
	                    this$1.run();
	                } else 
	                    { this$1.record(); }
	            } else if (!this$1.props.recording) {
	                this$1.exportFrame();
	            }
	        },
	        togglePlay: function () {
	            if (this$1.props.playing) 
	                { this$1.pause(); }
	             else 
	                { this$1.play(); }
	        },
	        commit: function (ev) {
	            this$1.exportFrame({
	                commit: true
	            });
	        }
	    });
	    this._animateHandler = (function () { return this$1.animate(); });
	    this._resizeHandler = (function () {
	        var changed = this$1.resize();
	        if (changed) {
	            this$1.render();
	        }
	    });
	};

	var prototypeAccessors = { sketch: { configurable: true },settings: { configurable: true },props: { configurable: true } };
	prototypeAccessors.sketch.get = function () {
	    return this._sketch;
	};
	prototypeAccessors.settings.get = function () {
	    return this._settings;
	};
	prototypeAccessors.props.get = function () {
	    return this._props;
	};
	SketchManager.prototype._computePlayhead = function _computePlayhead (currentTime, duration) {
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    return hasDuration ? currentTime / duration : 0;
	};
	SketchManager.prototype._computeFrame = function _computeFrame (playhead, time, totalFrames, fps) {
	    return isFinite(totalFrames) && totalFrames > 1 ? Math.floor(playhead * (totalFrames - 1)) : Math.floor(fps * time);
	};
	SketchManager.prototype._computeCurrentFrame = function _computeCurrentFrame () {
	    return this._computeFrame(this.props.playhead, this.props.time, this.props.totalFrames, this.props.fps);
	};
	SketchManager.prototype._getSizeProps = function _getSizeProps () {
	    var props = this.props;
	    return {
	        width: props.width,
	        height: props.height,
	        pixelRatio: props.pixelRatio,
	        canvasWidth: props.canvasWidth,
	        canvasHeight: props.canvasHeight,
	        viewportWidth: props.viewportWidth,
	        viewportHeight: props.viewportHeight
	    };
	};
	SketchManager.prototype.run = function run () {
	    if (!this.sketch) 
	        { throw new Error('should wait until sketch is loaded before trying to play()'); }
	    if (this.settings.playing !== false) {
	        this.play();
	    }
	    if (typeof this.sketch.dispose === 'function') {
	        console.warn('In canvas-sketch@0.0.23 the dispose() event has been renamed to unload()');
	    }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.tick();
	    this.render();
	    return this;
	};
	SketchManager.prototype._cancelTimeouts = function _cancelTimeouts () {
	    if (this._raf != null && typeof window !== 'undefined' && typeof window.cancelAnimationFrame === 'function') {
	        window.cancelAnimationFrame(this._raf);
	        this._raf = null;
	    }
	    if (this._recordTimeout != null) {
	        clearTimeout(this._recordTimeout);
	        this._recordTimeout = null;
	    }
	};
	SketchManager.prototype.play = function play () {
	    var animate = this.settings.animate;
	    if ('animation' in this.settings) {
	        animate = true;
	        console.warn('[canvas-sketch] { animation } has been renamed to { animate }');
	    }
	    if (!animate) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Using { animate } in Node.js is not yet supported');
	        return;
	    }
	    if (this.props.playing) 
	        { return; }
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    this.props.playing = true;
	    this._cancelTimeouts();
	    this._lastTime = browser();
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	};
	SketchManager.prototype.pause = function pause () {
	    if (this.props.recording) 
	        { this.endRecord(); }
	    this.props.playing = false;
	    this._cancelTimeouts();
	};
	SketchManager.prototype.togglePlay = function togglePlay () {
	    if (this.props.playing) 
	        { this.pause(); }
	     else 
	        { this.play(); }
	};
	SketchManager.prototype.stop = function stop () {
	    this.pause();
	    this.props.frame = 0;
	    this.props.playhead = 0;
	    this.props.time = 0;
	    this.props.deltaTime = 0;
	    this.props.started = false;
	    this.render();
	};
	SketchManager.prototype.record = function record () {
	        var this$1 = this;

	    if (this.props.recording) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Recording from Node.js is not yet supported');
	        return;
	    }
	    this.stop();
	    this.props.playing = true;
	    this.props.recording = true;
	    var exportOpts = this._createExportOptions({
	        sequence: true
	    });
	    var frameInterval = 1 / this.props.fps;
	    this._cancelTimeouts();
	    var tick = function () {
	        if (!this$1.props.recording) 
	            { return Promise.resolve(); }
	        this$1.props.deltaTime = frameInterval;
	        this$1.tick();
	        return this$1.exportFrame(exportOpts).then(function () {
	            if (!this$1.props.recording) 
	                { return; }
	            this$1.props.deltaTime = 0;
	            this$1.props.frame++;
	            if (this$1.props.frame < this$1.props.totalFrames) {
	                this$1.props.time += frameInterval;
	                this$1.props.playhead = this$1._computePlayhead(this$1.props.time, this$1.props.duration);
	                this$1._recordTimeout = setTimeout(tick, 0);
	            } else {
	                console.log('Finished recording');
	                this$1._signalEnd();
	                this$1.endRecord();
	                this$1.stop();
	                this$1.run();
	            }
	        });
	    };
	    if (!this.props.started) {
	        this._signalBegin();
	        this.props.started = true;
	    }
	    if (this.sketch && typeof this.sketch.beginRecord === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.beginRecord(props); });
	    }
	    streamStart(exportOpts).catch(function (err) {
	        console.error(err);
	    }).then(function (response) {
	        this$1._raf = window.requestAnimationFrame(tick);
	    });
	};
	SketchManager.prototype._signalBegin = function _signalBegin () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.begin === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.begin(props); });
	    }
	};
	SketchManager.prototype._signalEnd = function _signalEnd () {
	        var this$1 = this;

	    if (this.sketch && typeof this.sketch.end === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.end(props); });
	    }
	};
	SketchManager.prototype.endRecord = function endRecord () {
	        var this$1 = this;

	    var wasRecording = this.props.recording;
	    this._cancelTimeouts();
	    this.props.recording = false;
	    this.props.deltaTime = 0;
	    this.props.playing = false;
	    return streamEnd().catch(function (err) {
	        console.error(err);
	    }).then(function () {
	        if (wasRecording && this$1.sketch && typeof this$1.sketch.endRecord === 'function') {
	            this$1._wrapContextScale(function (props) { return this$1.sketch.endRecord(props); });
	        }
	    });
	};
	SketchManager.prototype._createExportOptions = function _createExportOptions (opt) {
	        if ( opt === void 0 ) opt = {};

	    return {
	        sequence: opt.sequence,
	        save: opt.save,
	        fps: this.props.fps,
	        frame: opt.sequence ? this.props.frame : undefined,
	        file: this.settings.file,
	        name: this.settings.name,
	        prefix: this.settings.prefix,
	        suffix: this.settings.suffix,
	        encoding: this.settings.encoding,
	        encodingQuality: this.settings.encodingQuality,
	        timeStamp: opt.timeStamp || getTimeStamp(),
	        totalFrames: isFinite(this.props.totalFrames) ? Math.max(0, this.props.totalFrames) : 1000
	    };
	};
	SketchManager.prototype.exportFrame = function exportFrame (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    if (!this.sketch) 
	        { return Promise.all([]); }
	    if (typeof this.sketch.preExport === 'function') {
	        this.sketch.preExport();
	    }
	    var exportOpts = this._createExportOptions(opt);
	    var client = getClientAPI();
	    var p = Promise.resolve();
	    if (client && opt.commit && typeof client.commit === 'function') {
	        var commitOpts = objectAssign({}, exportOpts);
	        var hash = client.commit(commitOpts);
	        if (isPromise_1(hash)) 
	            { p = hash; }
	         else 
	            { p = Promise.resolve(hash); }
	    }
	    return p.then(function (hash) { return this$1._doExportFrame(objectAssign({}, exportOpts, {
	        hash: hash || ''
	    })); }).then(function (result) {
	        if (result.length === 1) 
	            { return result[0]; }
	         else 
	            { return result; }
	    });
	};
	SketchManager.prototype._doExportFrame = function _doExportFrame (exportOpts) {
	        var this$1 = this;
	        if ( exportOpts === void 0 ) exportOpts = {};

	    this._props.exporting = true;
	    this.resize();
	    var drawResult = this.render();
	    var canvas = this.props.canvas;
	    if (typeof drawResult === 'undefined') {
	        drawResult = [canvas];
	    }
	    drawResult = [].concat(drawResult).filter(Boolean);
	    drawResult = drawResult.map(function (result) {
	        var hasDataObject = typeof result === 'object' && result && ('data' in result || 'dataURL' in result);
	        var data = hasDataObject ? result.data : result;
	        var opts = hasDataObject ? objectAssign({}, result, {
	            data: data
	        }) : {
	            data: data
	        };
	        if (isCanvas(data)) {
	            var encoding = opts.encoding || exportOpts.encoding;
	            var encodingQuality = defined(opts.encodingQuality, exportOpts.encodingQuality, 0.95);
	            var ref = exportCanvas(data, {
	                encoding: encoding,
	                encodingQuality: encodingQuality
	            });
	                var dataURL = ref.dataURL;
	                var extension = ref.extension;
	                var type = ref.type;
	            return Object.assign(opts, {
	                dataURL: dataURL,
	                extension: extension,
	                type: type
	            });
	        } else {
	            return opts;
	        }
	    });
	    this._props.exporting = false;
	    this.resize();
	    this.render();
	    return Promise.all(drawResult.map(function (result, i, layerList) {
	        var curOpt = objectAssign({
	            extension: '',
	            prefix: '',
	            suffix: ''
	        }, exportOpts, result, {
	            layer: i,
	            totalLayers: layerList.length
	        });
	        var saveParam = exportOpts.save === false ? false : result.save;
	        curOpt.save = saveParam !== false;
	        curOpt.filename = resolveFilename(curOpt);
	        delete curOpt.encoding;
	        delete curOpt.encodingQuality;
	        for (var k in curOpt) {
	            if (typeof curOpt[k] === 'undefined') 
	                { delete curOpt[k]; }
	        }
	        var savePromise = Promise.resolve({});
	        if (curOpt.save) {
	            var data = curOpt.data;
	            if (curOpt.dataURL) {
	                var dataURL = curOpt.dataURL;
	                savePromise = saveDataURL(dataURL, curOpt);
	            } else {
	                savePromise = saveFile(data, curOpt);
	            }
	        }
	        return savePromise.then(function (saveResult) { return Object.assign({}, curOpt, saveResult); });
	    })).then(function (ev) {
	        var savedEvents = ev.filter(function (e) { return e.save; });
	        if (savedEvents.length > 0) {
	            var eventWithOutput = savedEvents.find(function (e) { return e.outputName; });
	            var isClient = savedEvents.some(function (e) { return e.client; });
	            var isStreaming = savedEvents.some(function (e) { return e.stream; });
	            var item;
	            if (savedEvents.length > 1) 
	                { item = savedEvents.length; }
	             else if (eventWithOutput) 
	                { item = (eventWithOutput.outputName) + "/" + (savedEvents[0].filename); }
	             else 
	                { item = "" + (savedEvents[0].filename); }
	            var ofSeq = '';
	            if (exportOpts.sequence) {
	                var hasTotalFrames = isFinite(this$1.props.totalFrames);
	                ofSeq = hasTotalFrames ? (" (frame " + (exportOpts.frame + 1) + " / " + (this$1.props.totalFrames) + ")") : (" (frame " + (exportOpts.frame) + ")");
	            } else if (savedEvents.length > 1) {
	                ofSeq = " files";
	            }
	            var client = isClient ? 'canvas-sketch-cli' : 'canvas-sketch';
	            var action = isStreaming ? 'Streaming into' : 'Exported';
	            console.log(("%c[" + client + "]%c " + action + " %c" + item + "%c" + ofSeq), 'color: #8e8e8e;', 'color: initial;', 'font-weight: bold;', 'font-weight: initial;');
	        }
	        if (typeof this$1.sketch.postExport === 'function') {
	            this$1.sketch.postExport();
	        }
	        return ev;
	    });
	};
	SketchManager.prototype._wrapContextScale = function _wrapContextScale (cb) {
	    this._preRender();
	    cb(this.props);
	    this._postRender();
	};
	SketchManager.prototype._preRender = function _preRender () {
	    var props = this.props;
	    if (!this.props.gl && props.context && !props.p5) {
	        props.context.save();
	        if (this.settings.scaleContext !== false) {
	            props.context.scale(props.scaleX, props.scaleY);
	        }
	    } else if (props.p5) {
	        props.p5.scale(props.scaleX / props.pixelRatio, props.scaleY / props.pixelRatio);
	    }
	};
	SketchManager.prototype._postRender = function _postRender () {
	    var props = this.props;
	    if (!this.props.gl && props.context && !props.p5) {
	        props.context.restore();
	    }
	    if (props.gl && this.settings.flush !== false && !props.p5) {
	        props.gl.flush();
	    }
	};
	SketchManager.prototype.tick = function tick () {
	    if (this.sketch && typeof this.sketch.tick === 'function') {
	        this._preRender();
	        this.sketch.tick(this.props);
	        this._postRender();
	    }
	};
	SketchManager.prototype.render = function render () {
	    if (this.props.p5) {
	        this._lastRedrawResult = undefined;
	        this.props.p5.redraw();
	        return this._lastRedrawResult;
	    } else {
	        return this.submitDrawCall();
	    }
	};
	SketchManager.prototype.submitDrawCall = function submitDrawCall () {
	    if (!this.sketch) 
	        { return; }
	    var props = this.props;
	    this._preRender();
	    var drawResult;
	    if (typeof this.sketch === 'function') {
	        drawResult = this.sketch(props);
	    } else if (typeof this.sketch.render === 'function') {
	        drawResult = this.sketch.render(props);
	    }
	    this._postRender();
	    return drawResult;
	};
	SketchManager.prototype.update = function update (opt) {
	        var this$1 = this;
	        if ( opt === void 0 ) opt = {};

	    var notYetSupported = ['animate'];
	    Object.keys(opt).forEach(function (key) {
	        if (notYetSupported.indexOf(key) >= 0) {
	            throw new Error(("Sorry, the { " + key + " } option is not yet supported with update()."));
	        }
	    });
	    var oldCanvas = this._settings.canvas;
	    var oldContext = this._settings.context;
	    for (var key in opt) {
	        var value = opt[key];
	        if (typeof value !== 'undefined') {
	            this$1._settings[key] = value;
	        }
	    }
	    var timeOpts = Object.assign({}, this._settings, opt);
	    if ('time' in opt && 'frame' in opt) 
	        { throw new Error('You should specify { time } or { frame } but not both'); }
	     else if ('time' in opt) 
	        { delete timeOpts.frame; }
	     else if ('frame' in opt) 
	        { delete timeOpts.time; }
	    if ('duration' in opt && 'totalFrames' in opt) 
	        { throw new Error('You should specify { duration } or { totalFrames } but not both'); }
	     else if ('duration' in opt) 
	        { delete timeOpts.totalFrames; }
	     else if ('totalFrames' in opt) 
	        { delete timeOpts.duration; }
	    if ('data' in opt) 
	        { this._props.data = opt.data; }
	    var timeProps = this.getTimeProps(timeOpts);
	    Object.assign(this._props, timeProps);
	    if (oldCanvas !== this._settings.canvas || oldContext !== this._settings.context) {
	        var ref = createCanvas(this._settings);
	            var canvas = ref.canvas;
	            var context = ref.context;
	        this.props.canvas = canvas;
	        this.props.context = context;
	        this._setupGLKey();
	        this._appendCanvasIfNeeded();
	    }
	    if (opt.p5 && typeof opt.p5 !== 'function') {
	        this.props.p5 = opt.p5;
	        this.props.p5.draw = (function () {
	            if (this$1._isP5Resizing) 
	                { return; }
	            this$1._lastRedrawResult = this$1.submitDrawCall();
	        });
	    }
	    if ('playing' in opt) {
	        if (opt.playing) 
	            { this.play(); }
	         else 
	            { this.pause(); }
	    }
	    checkSettings(this._settings);
	    this.resize();
	    this.render();
	    return this.props;
	};
	SketchManager.prototype.resize = function resize () {
	    var oldSizes = this._getSizeProps();
	    var settings = this.settings;
	    var props = this.props;
	    var newProps = resizeCanvas(props, settings);
	    Object.assign(this._props, newProps);
	    var ref = this.props;
	        var pixelRatio = ref.pixelRatio;
	        var canvasWidth = ref.canvasWidth;
	        var canvasHeight = ref.canvasHeight;
	        var styleWidth = ref.styleWidth;
	        var styleHeight = ref.styleHeight;
	    var canvas = this.props.canvas;
	    if (canvas && settings.resizeCanvas !== false) {
	        if (props.p5) {
	            if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
	                this._isP5Resizing = true;
	                props.p5.pixelDensity(pixelRatio);
	                props.p5.resizeCanvas(canvasWidth / pixelRatio, canvasHeight / pixelRatio, false);
	                this._isP5Resizing = false;
	            }
	        } else {
	            if (canvas.width !== canvasWidth) 
	                { canvas.width = canvasWidth; }
	            if (canvas.height !== canvasHeight) 
	                { canvas.height = canvasHeight; }
	        }
	        if (isBrowser() && settings.styleCanvas !== false) {
	            canvas.style.width = styleWidth + "px";
	            canvas.style.height = styleHeight + "px";
	        }
	    }
	    var newSizes = this._getSizeProps();
	    var changed = !deepEqual_1(oldSizes, newSizes);
	    if (changed) {
	        this._sizeChanged();
	    }
	    return changed;
	};
	SketchManager.prototype._sizeChanged = function _sizeChanged () {
	    if (this.sketch && typeof this.sketch.resize === 'function') {
	        this.sketch.resize(this.props);
	    }
	};
	SketchManager.prototype.animate = function animate () {
	    if (!this.props.playing) 
	        { return; }
	    if (!isBrowser()) {
	        console.error('[canvas-sketch] WARN: Animation in Node.js is not yet supported');
	        return;
	    }
	    this._raf = window.requestAnimationFrame(this._animateHandler);
	    var now = browser();
	    var fps = this.props.fps;
	    var frameIntervalMS = 1000 / fps;
	    var deltaTimeMS = now - this._lastTime;
	    var duration = this.props.duration;
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    var isNewFrame = true;
	    var playbackRate = this.settings.playbackRate;
	    if (playbackRate === 'fixed') {
	        deltaTimeMS = frameIntervalMS;
	    } else if (playbackRate === 'throttle') {
	        if (deltaTimeMS > frameIntervalMS) {
	            now = now - deltaTimeMS % frameIntervalMS;
	            this._lastTime = now;
	        } else {
	            isNewFrame = false;
	        }
	    } else {
	        this._lastTime = now;
	    }
	    var deltaTime = deltaTimeMS / 1000;
	    var newTime = this.props.time + deltaTime * this.props.timeScale;
	    if (newTime < 0 && hasDuration) {
	        newTime = duration + newTime;
	    }
	    var isFinished = false;
	    var isLoopStart = false;
	    var looping = this.settings.loop !== false;
	    if (hasDuration && newTime >= duration) {
	        if (looping) {
	            isNewFrame = true;
	            newTime = newTime % duration;
	            isLoopStart = true;
	        } else {
	            isNewFrame = false;
	            newTime = duration;
	            isFinished = true;
	        }
	        this._signalEnd();
	    }
	    if (isNewFrame) {
	        this.props.deltaTime = deltaTime;
	        this.props.time = newTime;
	        this.props.playhead = this._computePlayhead(newTime, duration);
	        var lastFrame = this.props.frame;
	        this.props.frame = this._computeCurrentFrame();
	        if (isLoopStart) 
	            { this._signalBegin(); }
	        if (lastFrame !== this.props.frame) 
	            { this.tick(); }
	        this.render();
	        this.props.deltaTime = 0;
	    }
	    if (isFinished) {
	        this.pause();
	    }
	};
	SketchManager.prototype.dispatch = function dispatch (cb) {
	    if (typeof cb !== 'function') 
	        { throw new Error('must pass function into dispatch()'); }
	    cb(this.props);
	    this.render();
	};
	SketchManager.prototype.mount = function mount () {
	    this._appendCanvasIfNeeded();
	};
	SketchManager.prototype.unmount = function unmount () {
	    if (isBrowser()) {
	        window.removeEventListener('resize', this._resizeHandler);
	        this._keyboardShortcuts.detach();
	    }
	    if (this.props.canvas.parentElement) {
	        this.props.canvas.parentElement.removeChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._appendCanvasIfNeeded = function _appendCanvasIfNeeded () {
	    if (!isBrowser()) 
	        { return; }
	    if (this.settings.parent !== false && (this.props.canvas && !this.props.canvas.parentElement)) {
	        var defaultParent = this.settings.parent || document.body;
	        defaultParent.appendChild(this.props.canvas);
	    }
	};
	SketchManager.prototype._setupGLKey = function _setupGLKey () {
	    if (this.props.context) {
	        if (isWebGLContext(this.props.context)) {
	            this._props.gl = this.props.context;
	        } else {
	            delete this._props.gl;
	        }
	    }
	};
	SketchManager.prototype.getTimeProps = function getTimeProps (settings) {
	        if ( settings === void 0 ) settings = {};

	    var duration = settings.duration;
	    var totalFrames = settings.totalFrames;
	    var timeScale = defined(settings.timeScale, 1);
	    var fps = defined(settings.fps, 24);
	    var hasDuration = typeof duration === 'number' && isFinite(duration);
	    var hasTotalFrames = typeof totalFrames === 'number' && isFinite(totalFrames);
	    var totalFramesFromDuration = hasDuration ? Math.floor(fps * duration) : undefined;
	    var durationFromTotalFrames = hasTotalFrames ? totalFrames / fps : undefined;
	    if (hasDuration && hasTotalFrames && totalFramesFromDuration !== totalFrames) {
	        throw new Error('You should specify either duration or totalFrames, but not both. Or, they must match exactly.');
	    }
	    if (typeof settings.dimensions === 'undefined' && typeof settings.units !== 'undefined') {
	        console.warn("You've specified a { units } setting but no { dimension }, so the units will be ignored.");
	    }
	    totalFrames = defined(totalFrames, totalFramesFromDuration, Infinity);
	    duration = defined(duration, durationFromTotalFrames, Infinity);
	    var startTime = settings.time;
	    var startFrame = settings.frame;
	    var hasStartTime = typeof startTime === 'number' && isFinite(startTime);
	    var hasStartFrame = typeof startFrame === 'number' && isFinite(startFrame);
	    var time = 0;
	    var frame = 0;
	    var playhead = 0;
	    if (hasStartTime && hasStartFrame) {
	        throw new Error('You should specify either start frame or time, but not both.');
	    } else if (hasStartTime) {
	        time = startTime;
	        playhead = this._computePlayhead(time, duration);
	        frame = this._computeFrame(playhead, time, totalFrames, fps);
	    } else if (hasStartFrame) {
	        frame = startFrame;
	        time = frame / fps;
	        playhead = this._computePlayhead(time, duration);
	    }
	    return {
	        playhead: playhead,
	        time: time,
	        frame: frame,
	        duration: duration,
	        totalFrames: totalFrames,
	        fps: fps,
	        timeScale: timeScale
	    };
	};
	SketchManager.prototype.setup = function setup (settings) {
	        var this$1 = this;
	        if ( settings === void 0 ) settings = {};

	    if (this.sketch) 
	        { throw new Error('Multiple setup() calls not yet supported.'); }
	    this._settings = Object.assign({}, settings, this._settings);
	    checkSettings(this._settings);
	    var ref = createCanvas(this._settings);
	        var context = ref.context;
	        var canvas = ref.canvas;
	    var timeProps = this.getTimeProps(this._settings);
	    this._props = Object.assign({}, timeProps,
	        {canvas: canvas,
	        context: context,
	        deltaTime: 0,
	        started: false,
	        exporting: false,
	        playing: false,
	        recording: false,
	        settings: this.settings,
	        data: this.settings.data,
	        render: function () { return this$1.render(); },
	        togglePlay: function () { return this$1.togglePlay(); },
	        dispatch: function (cb) { return this$1.dispatch(cb); },
	        tick: function () { return this$1.tick(); },
	        resize: function () { return this$1.resize(); },
	        update: function (opt) { return this$1.update(opt); },
	        exportFrame: function (opt) { return this$1.exportFrame(opt); },
	        record: function () { return this$1.record(); },
	        play: function () { return this$1.play(); },
	        pause: function () { return this$1.pause(); },
	        stop: function () { return this$1.stop(); }});
	    this._setupGLKey();
	    this.resize();
	};
	SketchManager.prototype.loadAndRun = function loadAndRun (canvasSketch, newSettings) {
	        var this$1 = this;

	    return this.load(canvasSketch, newSettings).then(function () {
	        this$1.run();
	        return this$1;
	    });
	};
	SketchManager.prototype.unload = function unload () {
	        var this$1 = this;

	    this.pause();
	    if (!this.sketch) 
	        { return; }
	    if (typeof this.sketch.unload === 'function') {
	        this._wrapContextScale(function (props) { return this$1.sketch.unload(props); });
	    }
	    this._sketch = null;
	};
	SketchManager.prototype.destroy = function destroy () {
	    this.unload();
	    this.unmount();
	};
	SketchManager.prototype.load = function load (createSketch, newSettings) {
	        var this$1 = this;

	    if (typeof createSketch !== 'function') {
	        throw new Error('The function must take in a function as the first parameter. Example:\n  canvasSketcher(() => { ... }, settings)');
	    }
	    if (this.sketch) {
	        this.unload();
	    }
	    if (typeof newSettings !== 'undefined') {
	        this.update(newSettings);
	    }
	    this._preRender();
	    var preload = Promise.resolve();
	    if (this.settings.p5) {
	        if (!isBrowser()) {
	            throw new Error('[canvas-sketch] ERROR: Using p5.js in Node.js is not supported');
	        }
	        preload = new Promise(function (resolve) {
	            var P5Constructor = this$1.settings.p5;
	            var preload;
	            if (P5Constructor.p5) {
	                preload = P5Constructor.preload;
	                P5Constructor = P5Constructor.p5;
	            }
	            var p5Sketch = function (p5) {
	                if (preload) 
	                    { p5.preload = (function () { return preload(p5); }); }
	                p5.setup = (function () {
	                    var props = this$1.props;
	                    var isGL = this$1.settings.context === 'webgl';
	                    var renderer = isGL ? p5.WEBGL : p5.P2D;
	                    p5.noLoop();
	                    p5.pixelDensity(props.pixelRatio);
	                    p5.createCanvas(props.viewportWidth, props.viewportHeight, renderer);
	                    if (isGL && this$1.settings.attributes) {
	                        p5.setAttributes(this$1.settings.attributes);
	                    }
	                    this$1.update({
	                        p5: p5,
	                        canvas: p5.canvas,
	                        context: p5._renderer.drawingContext
	                    });
	                    resolve();
	                });
	            };
	            if (typeof P5Constructor === 'function') {
	                new P5Constructor(p5Sketch);
	            } else {
	                if (typeof window.createCanvas !== 'function') {
	                    throw new Error("{ p5 } setting is passed but can't find p5.js in global (window) scope. Maybe you did not create it globally?\nnew p5(); // <-- attaches to global scope");
	                }
	                p5Sketch(window);
	            }
	        });
	    }
	    return preload.then(function () {
	        var loader = createSketch(this$1.props);
	        if (!isPromise_1(loader)) {
	            loader = Promise.resolve(loader);
	        }
	        return loader;
	    }).then(function (sketch) {
	        if (!sketch) 
	            { sketch = {}; }
	        this$1._sketch = sketch;
	        if (isBrowser()) {
	            this$1._keyboardShortcuts.attach();
	            window.addEventListener('resize', this$1._resizeHandler);
	        }
	        this$1._postRender();
	        this$1._sizeChanged();
	        return this$1;
	    }).catch(function (err) {
	        console.warn('Could not start sketch, the async loading function rejected with an error:\n    Error: ' + err.message);
	        throw err;
	    });
	};

	Object.defineProperties( SketchManager.prototype, prototypeAccessors );

	var CACHE = 'hot-id-cache';
	var runtimeCollisions = [];
	function isHotReload() {
	    var client = getClientAPI();
	    return client && client.hot;
	}

	function cacheGet(id) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    return client[CACHE][id];
	}

	function cachePut(id, data) {
	    var client = getClientAPI();
	    if (!client) 
	        { return undefined; }
	    client[CACHE] = client[CACHE] || {};
	    client[CACHE][id] = data;
	}

	function getTimeProp(oldManager, newSettings) {
	    return newSettings.animate ? {
	        time: oldManager.props.time
	    } : undefined;
	}

	function canvasSketch(sketch, settings) {
	    if ( settings === void 0 ) settings = {};

	    if (settings.p5) {
	        if (settings.canvas || settings.context && typeof settings.context !== 'string') {
	            throw new Error("In { p5 } mode, you can't pass your own canvas or context, unless the context is a \"webgl\" or \"2d\" string");
	        }
	        var context = typeof settings.context === 'string' ? settings.context : false;
	        settings = Object.assign({}, settings, {
	            canvas: false,
	            context: context
	        });
	    }
	    var isHot = isHotReload();
	    var hotID;
	    if (isHot) {
	        hotID = defined(settings.id, '$__DEFAULT_CANVAS_SKETCH_ID__$');
	    }
	    var isInjecting = isHot && typeof hotID === 'string';
	    if (isInjecting && runtimeCollisions.includes(hotID)) {
	        console.warn("Warning: You have multiple calls to canvasSketch() in --hot mode. You must pass unique { id } strings in settings to enable hot reload across multiple sketches. ", hotID);
	        isInjecting = false;
	    }
	    var preload = Promise.resolve();
	    if (isInjecting) {
	        runtimeCollisions.push(hotID);
	        var previousData = cacheGet(hotID);
	        if (previousData) {
	            var next = function () {
	                var newProps = getTimeProp(previousData.manager, settings);
	                previousData.manager.destroy();
	                return newProps;
	            };
	            preload = previousData.load.then(next).catch(next);
	        }
	    }
	    return preload.then(function (newProps) {
	        var manager = new SketchManager();
	        var result;
	        if (sketch) {
	            settings = Object.assign({}, settings, newProps);
	            manager.setup(settings);
	            manager.mount();
	            result = manager.loadAndRun(sketch);
	        } else {
	            result = Promise.resolve(manager);
	        }
	        if (isInjecting) {
	            cachePut(hotID, {
	                load: result,
	                manager: manager
	            });
	        }
	        return result;
	    });
	}

	canvasSketch.canvasSketch = canvasSketch;
	canvasSketch.PaperSizes = paperSizes;

	return canvasSketch;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXNrZXRjaC51bWQuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JpZ2h0LW5vdy9icm93c2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2lzLXByb21pc2UvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaXMtZG9tL2luZGV4LmpzIiwiLi4vbGliL3V0aWwuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9saWIva2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kZWVwLWVxdWFsL2xpYi9pc19hcmd1bWVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVlcC1lcXVhbC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9kYXRlZm9ybWF0L2xpYi9kYXRlZm9ybWF0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanMiLCIuLi9saWIvc2F2ZS5qcyIsIi4uL2xpYi9hY2Nlc3NpYmlsaXR5LmpzIiwiLi4vbGliL2NvcmUva2V5Ym9hcmRTaG9ydGN1dHMuanMiLCIuLi9saWIvcGFwZXItc2l6ZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZGVmaW5lZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb252ZXJ0LWxlbmd0aC9jb252ZXJ0LWxlbmd0aC5qcyIsIi4uL2xpYi9kaXN0YW5jZXMuanMiLCIuLi9saWIvY29yZS9yZXNpemVDYW52YXMuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2V0LWNhbnZhcy1jb250ZXh0L2luZGV4LmpzIiwiLi4vbGliL2NvcmUvY3JlYXRlQ2FudmFzLmpzIiwiLi4vbGliL2NvcmUvU2tldGNoTWFuYWdlci5qcyIsIi4uL2xpYi9jYW52YXMtc2tldGNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gIGdsb2JhbC5wZXJmb3JtYW5jZSAmJlxuICBnbG9iYWwucGVyZm9ybWFuY2Uubm93ID8gZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKVxuICB9IDogRGF0ZS5ub3cgfHwgZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiArbmV3IERhdGVcbiAgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1Byb21pc2U7XG5cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuICEhb2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGlzTm9kZVxuXG5mdW5jdGlvbiBpc05vZGUgKHZhbCkge1xuICByZXR1cm4gKCF2YWwgfHwgdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpXG4gICAgPyBmYWxzZVxuICAgIDogKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHR5cGVvZiB3aW5kb3cuTm9kZSA9PT0gJ29iamVjdCcpXG4gICAgICA/ICh2YWwgaW5zdGFuY2VvZiB3aW5kb3cuTm9kZSlcbiAgICAgIDogKHR5cGVvZiB2YWwubm9kZVR5cGUgPT09ICdudW1iZXInKSAmJlxuICAgICAgICAodHlwZW9mIHZhbC5ub2RlTmFtZSA9PT0gJ3N0cmluZycpXG59XG4iLCIvLyBUT0RPOiBXZSBjYW4gcmVtb3ZlIGEgaHVnZSBjaHVuayBvZiBidW5kbGUgc2l6ZSBieSB1c2luZyBhIHNtYWxsZXJcbi8vIHV0aWxpdHkgbW9kdWxlIGZvciBjb252ZXJ0aW5nIHVuaXRzLlxuaW1wb3J0IGlzRE9NIGZyb20gJ2lzLWRvbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGllbnRBUEkgKCkge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93WydjYW52YXMtc2tldGNoLWNsaSddO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lZCAoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFyZ3VtZW50c1tpXSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNCcm93c2VyICgpIHtcbiAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1dlYkdMQ29udGV4dCAoY3R4KSB7XG4gIHJldHVybiB0eXBlb2YgY3R4LmNsZWFyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBjdHguY2xlYXJDb2xvciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgY3R4LmJ1ZmZlckRhdGEgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NhbnZhcyAoZWxlbWVudCkge1xuICByZXR1cm4gaXNET00oZWxlbWVudCkgJiYgL2NhbnZhcy9pLnRlc3QoZWxlbWVudC5ub2RlTmFtZSkgJiYgdHlwZW9mIGVsZW1lbnQuZ2V0Q29udGV4dCA9PT0gJ2Z1bmN0aW9uJztcbn1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuICA/IE9iamVjdC5rZXlzIDogc2hpbTtcblxuZXhwb3J0cy5zaGltID0gc2hpbTtcbmZ1bmN0aW9uIHNoaW0gKG9iaikge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgcmV0dXJuIGtleXM7XG59XG4iLCJ2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcbn0pKCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5mdW5jdGlvbiBzdXBwb3J0ZWQob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbmV4cG9ydHMudW5zdXBwb3J0ZWQgPSB1bnN1cHBvcnRlZDtcbmZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG4gIHJldHVybiBvYmplY3QgJiZcbiAgICB0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmXG4gICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcbiAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcbiAgICAhT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgJ2NhbGxlZScpIHx8XG4gICAgZmFsc2U7XG59O1xuIiwidmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnLi9saWIva2V5cy5qcycpO1xudmFyIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9saWIvaXNfYXJndW1lbnRzLmpzJyk7XG5cbnZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG4gIH0gZWxzZSBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgdHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0cy5zdHJpY3QgPyBhY3R1YWwgPT09IGV4cGVjdGVkIDogYWN0dWFsID09IGV4cGVjdGVkO1xuXG4gIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcbiAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIGlmICh0eXBlb2YgeC5jb3B5ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB4LnNsaWNlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDAgJiYgdHlwZW9mIHhbMF0gIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiLCBvcHRzKSB7XG4gIHZhciBpLCBrZXk7XG4gIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvL35+fkkndmUgbWFuYWdlZCB0byBicmVhayBPYmplY3Qua2V5cyB0aHJvdWdoIHNjcmV3eSBhcmd1bWVudHMgcGFzc2luZy5cbiAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cbiAgaWYgKGlzQXJndW1lbnRzKGEpKSB7XG4gICAgaWYgKCFpc0FyZ3VtZW50cyhiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgb3B0cyk7XG4gIH1cbiAgaWYgKGlzQnVmZmVyKGEpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihiKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHRyeSB7XG4gICAgdmFyIGthID0gb2JqZWN0S2V5cyhhKSxcbiAgICAgICAga2IgPSBvYmplY3RLZXlzKGIpO1xuICB9IGNhdGNoIChlKSB7Ly9oYXBwZW5zIHdoZW4gb25lIGlzIGEgc3RyaW5nIGxpdGVyYWwgYW5kIHRoZSBvdGhlciBpc24ndFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHR5cGVvZiBhID09PSB0eXBlb2YgYjtcbn1cbiIsIi8qXG4gKiBEYXRlIEZvcm1hdCAxLjIuM1xuICogKGMpIDIwMDctMjAwOSBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT5cbiAqIE1JVCBsaWNlbnNlXG4gKlxuICogSW5jbHVkZXMgZW5oYW5jZW1lbnRzIGJ5IFNjb3R0IFRyZW5kYSA8c2NvdHQudHJlbmRhLm5ldD5cbiAqIGFuZCBLcmlzIEtvd2FsIDxjaXhhci5jb20vfmtyaXMua293YWwvPlxuICpcbiAqIEFjY2VwdHMgYSBkYXRlLCBhIG1hc2ssIG9yIGEgZGF0ZSBhbmQgYSBtYXNrLlxuICogUmV0dXJucyBhIGZvcm1hdHRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBkYXRlLlxuICogVGhlIGRhdGUgZGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgZGF0ZS90aW1lLlxuICogVGhlIG1hc2sgZGVmYXVsdHMgdG8gZGF0ZUZvcm1hdC5tYXNrcy5kZWZhdWx0LlxuICovXG5cbihmdW5jdGlvbihnbG9iYWwpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBkYXRlRm9ybWF0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRva2VuID0gL2R7MSw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFtMbG9TWldOXXxcIlteXCJdKlwifCdbXiddKicvZztcbiAgICAgIHZhciB0aW1lem9uZSA9IC9cXGIoPzpbUE1DRUFdW1NEUF1UfCg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lfCg/OkdNVHxVVEMpKD86Wy0rXVxcZHs0fSk/KVxcYi9nO1xuICAgICAgdmFyIHRpbWV6b25lQ2xpcCA9IC9bXi0rXFxkQS1aXS9nO1xuICBcbiAgICAgIC8vIFJlZ2V4ZXMgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zIGFyZSBjYWNoZWQgdGhyb3VnaCBjbG9zdXJlXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUsIG1hc2ssIHV0YywgZ210KSB7XG4gIFxuICAgICAgICAvLyBZb3UgY2FuJ3QgcHJvdmlkZSB1dGMgaWYgeW91IHNraXAgb3RoZXIgYXJncyAodXNlIHRoZSAnVVRDOicgbWFzayBwcmVmaXgpXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIGtpbmRPZihkYXRlKSA9PT0gJ3N0cmluZycgJiYgIS9cXGQvLnRlc3QoZGF0ZSkpIHtcbiAgICAgICAgICBtYXNrID0gZGF0ZTtcbiAgICAgICAgICBkYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gIFxuICAgICAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZTtcbiAgXG4gICAgICAgIGlmKCEoZGF0ZSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBpZiAoaXNOYU4oZGF0ZSkpIHtcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgZGF0ZScpO1xuICAgICAgICB9XG4gIFxuICAgICAgICBtYXNrID0gU3RyaW5nKGRhdGVGb3JtYXQubWFza3NbbWFza10gfHwgbWFzayB8fCBkYXRlRm9ybWF0Lm1hc2tzWydkZWZhdWx0J10pO1xuICBcbiAgICAgICAgLy8gQWxsb3cgc2V0dGluZyB0aGUgdXRjL2dtdCBhcmd1bWVudCB2aWEgdGhlIG1hc2tcbiAgICAgICAgdmFyIG1hc2tTbGljZSA9IG1hc2suc2xpY2UoMCwgNCk7XG4gICAgICAgIGlmIChtYXNrU2xpY2UgPT09ICdVVEM6JyB8fCBtYXNrU2xpY2UgPT09ICdHTVQ6Jykge1xuICAgICAgICAgIG1hc2sgPSBtYXNrLnNsaWNlKDQpO1xuICAgICAgICAgIHV0YyA9IHRydWU7XG4gICAgICAgICAgaWYgKG1hc2tTbGljZSA9PT0gJ0dNVDonKSB7XG4gICAgICAgICAgICBnbXQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICBcbiAgICAgICAgdmFyIF8gPSB1dGMgPyAnZ2V0VVRDJyA6ICdnZXQnO1xuICAgICAgICB2YXIgZCA9IGRhdGVbXyArICdEYXRlJ10oKTtcbiAgICAgICAgdmFyIEQgPSBkYXRlW18gKyAnRGF5J10oKTtcbiAgICAgICAgdmFyIG0gPSBkYXRlW18gKyAnTW9udGgnXSgpO1xuICAgICAgICB2YXIgeSA9IGRhdGVbXyArICdGdWxsWWVhciddKCk7XG4gICAgICAgIHZhciBIID0gZGF0ZVtfICsgJ0hvdXJzJ10oKTtcbiAgICAgICAgdmFyIE0gPSBkYXRlW18gKyAnTWludXRlcyddKCk7XG4gICAgICAgIHZhciBzID0gZGF0ZVtfICsgJ1NlY29uZHMnXSgpO1xuICAgICAgICB2YXIgTCA9IGRhdGVbXyArICdNaWxsaXNlY29uZHMnXSgpO1xuICAgICAgICB2YXIgbyA9IHV0YyA/IDAgOiBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gICAgICAgIHZhciBXID0gZ2V0V2VlayhkYXRlKTtcbiAgICAgICAgdmFyIE4gPSBnZXREYXlPZldlZWsoZGF0ZSk7XG4gICAgICAgIHZhciBmbGFncyA9IHtcbiAgICAgICAgICBkOiAgICBkLFxuICAgICAgICAgIGRkOiAgIHBhZChkKSxcbiAgICAgICAgICBkZGQ6ICBkYXRlRm9ybWF0LmkxOG4uZGF5TmFtZXNbRF0sXG4gICAgICAgICAgZGRkZDogZGF0ZUZvcm1hdC5pMThuLmRheU5hbWVzW0QgKyA3XSxcbiAgICAgICAgICBtOiAgICBtICsgMSxcbiAgICAgICAgICBtbTogICBwYWQobSArIDEpLFxuICAgICAgICAgIG1tbTogIGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW21dLFxuICAgICAgICAgIG1tbW06IGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW20gKyAxMl0sXG4gICAgICAgICAgeXk6ICAgU3RyaW5nKHkpLnNsaWNlKDIpLFxuICAgICAgICAgIHl5eXk6IHksXG4gICAgICAgICAgaDogICAgSCAlIDEyIHx8IDEyLFxuICAgICAgICAgIGhoOiAgIHBhZChIICUgMTIgfHwgMTIpLFxuICAgICAgICAgIEg6ICAgIEgsXG4gICAgICAgICAgSEg6ICAgcGFkKEgpLFxuICAgICAgICAgIE06ICAgIE0sXG4gICAgICAgICAgTU06ICAgcGFkKE0pLFxuICAgICAgICAgIHM6ICAgIHMsXG4gICAgICAgICAgc3M6ICAgcGFkKHMpLFxuICAgICAgICAgIGw6ICAgIHBhZChMLCAzKSxcbiAgICAgICAgICBMOiAgICBwYWQoTWF0aC5yb3VuZChMIC8gMTApKSxcbiAgICAgICAgICB0OiAgICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzBdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1sxXSxcbiAgICAgICAgICB0dDogICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzJdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1szXSxcbiAgICAgICAgICBUOiAgICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzRdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s1XSxcbiAgICAgICAgICBUVDogICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzZdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s3XSxcbiAgICAgICAgICBaOiAgICBnbXQgPyAnR01UJyA6IHV0YyA/ICdVVEMnIDogKFN0cmluZyhkYXRlKS5tYXRjaCh0aW1lem9uZSkgfHwgWycnXSkucG9wKCkucmVwbGFjZSh0aW1lem9uZUNsaXAsICcnKSxcbiAgICAgICAgICBvOiAgICAobyA+IDAgPyAnLScgOiAnKycpICsgcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMobykgLyA2MCkgKiAxMDAgKyBNYXRoLmFicyhvKSAlIDYwLCA0KSxcbiAgICAgICAgICBTOiAgICBbJ3RoJywgJ3N0JywgJ25kJywgJ3JkJ11bZCAlIDEwID4gMyA/IDAgOiAoZCAlIDEwMCAtIGQgJSAxMCAhPSAxMCkgKiBkICUgMTBdLFxuICAgICAgICAgIFc6ICAgIFcsXG4gICAgICAgICAgTjogICAgTlxuICAgICAgICB9O1xuICBcbiAgICAgICAgcmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbiwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgaWYgKG1hdGNoIGluIGZsYWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmxhZ3NbbWF0Y2hdO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWF0Y2guc2xpY2UoMSwgbWF0Y2gubGVuZ3RoIC0gMSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KSgpO1xuXG4gIGRhdGVGb3JtYXQubWFza3MgPSB7XG4gICAgJ2RlZmF1bHQnOiAgICAgICAgICAgICAgICdkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3MnLFxuICAgICdzaG9ydERhdGUnOiAgICAgICAgICAgICAnbS9kL3l5JyxcbiAgICAnbWVkaXVtRGF0ZSc6ICAgICAgICAgICAgJ21tbSBkLCB5eXl5JyxcbiAgICAnbG9uZ0RhdGUnOiAgICAgICAgICAgICAgJ21tbW0gZCwgeXl5eScsXG4gICAgJ2Z1bGxEYXRlJzogICAgICAgICAgICAgICdkZGRkLCBtbW1tIGQsIHl5eXknLFxuICAgICdzaG9ydFRpbWUnOiAgICAgICAgICAgICAnaDpNTSBUVCcsXG4gICAgJ21lZGl1bVRpbWUnOiAgICAgICAgICAgICdoOk1NOnNzIFRUJyxcbiAgICAnbG9uZ1RpbWUnOiAgICAgICAgICAgICAgJ2g6TU06c3MgVFQgWicsXG4gICAgJ2lzb0RhdGUnOiAgICAgICAgICAgICAgICd5eXl5LW1tLWRkJyxcbiAgICAnaXNvVGltZSc6ICAgICAgICAgICAgICAgJ0hIOk1NOnNzJyxcbiAgICAnaXNvRGF0ZVRpbWUnOiAgICAgICAgICAgJ3l5eXktbW0tZGRcXCdUXFwnSEg6TU06c3NvJyxcbiAgICAnaXNvVXRjRGF0ZVRpbWUnOiAgICAgICAgJ1VUQzp5eXl5LW1tLWRkXFwnVFxcJ0hIOk1NOnNzXFwnWlxcJycsXG4gICAgJ2V4cGlyZXNIZWFkZXJGb3JtYXQnOiAgICdkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFonXG4gIH07XG5cbiAgLy8gSW50ZXJuYXRpb25hbGl6YXRpb24gc3RyaW5nc1xuICBkYXRlRm9ybWF0LmkxOG4gPSB7XG4gICAgZGF5TmFtZXM6IFtcbiAgICAgICdTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnLFxuICAgICAgJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J1xuICAgIF0sXG4gICAgbW9udGhOYW1lczogW1xuICAgICAgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJyxcbiAgICAgICdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ1xuICAgIF0sXG4gICAgdGltZU5hbWVzOiBbXG4gICAgICAnYScsICdwJywgJ2FtJywgJ3BtJywgJ0EnLCAnUCcsICdBTScsICdQTSdcbiAgICBdXG4gIH07XG5cbmZ1bmN0aW9uIHBhZCh2YWwsIGxlbikge1xuICB2YWwgPSBTdHJpbmcodmFsKTtcbiAgbGVuID0gbGVuIHx8IDI7XG4gIHdoaWxlICh2YWwubGVuZ3RoIDwgbGVuKSB7XG4gICAgdmFsID0gJzAnICsgdmFsO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbi8qKlxuICogR2V0IHRoZSBJU08gODYwMSB3ZWVrIG51bWJlclxuICogQmFzZWQgb24gY29tbWVudHMgZnJvbVxuICogaHR0cDovL3RlY2hibG9nLnByb2N1cmlvcy5ubC9rL242MTgvbmV3cy92aWV3LzMzNzk2LzE0ODYzL0NhbGN1bGF0ZS1JU08tODYwMS13ZWVrLWFuZC15ZWFyLWluLWphdmFzY3JpcHQuaHRtbFxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gYGRhdGVgXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldFdlZWsoZGF0ZSkge1xuICAvLyBSZW1vdmUgdGltZSBjb21wb25lbnRzIG9mIGRhdGVcbiAgdmFyIHRhcmdldFRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcblxuICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcbiAgdGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCkgLSAoKHRhcmdldFRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpO1xuXG4gIC8vIFRha2UgSmFudWFyeSA0dGggYXMgaXQgaXMgYWx3YXlzIGluIHdlZWsgMSAoc2VlIElTTyA4NjAxKVxuICB2YXIgZmlyc3RUaHVyc2RheSA9IG5ldyBEYXRlKHRhcmdldFRodXJzZGF5LmdldEZ1bGxZZWFyKCksIDAsIDQpO1xuXG4gIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuICBmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCkgLSAoKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMyk7XG5cbiAgLy8gQ2hlY2sgaWYgZGF5bGlnaHQtc2F2aW5nLXRpbWUtc3dpdGNoIG9jY3VycmVkIGFuZCBjb3JyZWN0IGZvciBpdFxuICB2YXIgZHMgPSB0YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICB0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpIC0gZHMpO1xuXG4gIC8vIE51bWJlciBvZiB3ZWVrcyBiZXR3ZWVuIHRhcmdldCBUaHVyc2RheSBhbmQgZmlyc3QgVGh1cnNkYXlcbiAgdmFyIHdlZWtEaWZmID0gKHRhcmdldFRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoODY0MDAwMDAqNyk7XG4gIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZik7XG59XG5cbi8qKlxuICogR2V0IElTTy04NjAxIG51bWVyaWMgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBvZiB0aGUgd2Vla1xuICogMSAoZm9yIE1vbmRheSkgdGhyb3VnaCA3IChmb3IgU3VuZGF5KVxuICogXG4gKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSkge1xuICB2YXIgZG93ID0gZGF0ZS5nZXREYXkoKTtcbiAgaWYoZG93ID09PSAwKSB7XG4gICAgZG93ID0gNztcbiAgfVxuICByZXR1cm4gZG93O1xufVxuXG4vKipcbiAqIGtpbmQtb2Ygc2hvcnRjdXRcbiAqIEBwYXJhbSAgeyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBraW5kT2YodmFsKSB7XG4gIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gJ251bGwnO1xuICB9XG5cbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWw7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cblxuICByZXR1cm4ge30udG9TdHJpbmcuY2FsbCh2YWwpXG4gICAgLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xufTtcblxuXG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZGF0ZUZvcm1hdDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRhdGVGb3JtYXQ7XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLmRhdGVGb3JtYXQgPSBkYXRlRm9ybWF0O1xuICB9XG59KSh0aGlzKTtcbiIsIi8qIVxuICogcmVwZWF0LXN0cmluZyA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcmVwZWF0LXN0cmluZz5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlc3VsdHMgY2FjaGVcbiAqL1xuXG52YXIgcmVzID0gJyc7XG52YXIgY2FjaGU7XG5cbi8qKlxuICogRXhwb3NlIGByZXBlYXRgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7XG5cbi8qKlxuICogUmVwZWF0IHRoZSBnaXZlbiBgc3RyaW5nYCB0aGUgc3BlY2lmaWVkIGBudW1iZXJgXG4gKiBvZiB0aW1lcy5cbiAqXG4gKiAqKkV4YW1wbGU6KipcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcbiAqIHJlcGVhdCgnQScsIDUpO1xuICogLy89PiBBQUFBQVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJpbmdgIFRoZSBzdHJpbmcgdG8gcmVwZWF0XG4gKiBAcGFyYW0ge051bWJlcn0gYG51bWJlcmAgVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBSZXBlYXRlZCBzdHJpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgbnVtKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICAvLyBjb3ZlciBjb21tb24sIHF1aWNrIHVzZSBjYXNlc1xuICBpZiAobnVtID09PSAxKSByZXR1cm4gc3RyO1xuICBpZiAobnVtID09PSAyKSByZXR1cm4gc3RyICsgc3RyO1xuXG4gIHZhciBtYXggPSBzdHIubGVuZ3RoICogbnVtO1xuICBpZiAoY2FjaGUgIT09IHN0ciB8fCB0eXBlb2YgY2FjaGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2FjaGUgPSBzdHI7XG4gICAgcmVzID0gJyc7XG4gIH0gZWxzZSBpZiAocmVzLmxlbmd0aCA+PSBtYXgpIHtcbiAgICByZXR1cm4gcmVzLnN1YnN0cigwLCBtYXgpO1xuICB9XG5cbiAgd2hpbGUgKG1heCA+IHJlcy5sZW5ndGggJiYgbnVtID4gMSkge1xuICAgIGlmIChudW0gJiAxKSB7XG4gICAgICByZXMgKz0gc3RyO1xuICAgIH1cblxuICAgIG51bSA+Pj0gMTtcbiAgICBzdHIgKz0gc3RyO1xuICB9XG5cbiAgcmVzICs9IHN0cjtcbiAgcmVzID0gcmVzLnN1YnN0cigwLCBtYXgpO1xuICByZXR1cm4gcmVzO1xufVxuIiwiLyohXG4gKiBwYWQtbGVmdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcGFkLWxlZnQ+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWRMZWZ0KHN0ciwgbnVtLCBjaCkge1xuICBzdHIgPSBzdHIudG9TdHJpbmcoKTtcblxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgaWYgKGNoID09PSAwKSB7XG4gICAgY2ggPSAnMCc7XG4gIH0gZWxzZSBpZiAoY2gpIHtcbiAgICBjaCA9IGNoLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgY2ggPSAnICc7XG4gIH1cblxuICByZXR1cm4gcmVwZWF0KGNoLCBudW0gLSBzdHIubGVuZ3RoKSArIHN0cjtcbn07XG4iLCJpbXBvcnQgZGF0ZWZvcm1hdCBmcm9tICdkYXRlZm9ybWF0JztcbmltcG9ydCBhc3NpZ24gZnJvbSAnb2JqZWN0LWFzc2lnbic7XG5pbXBvcnQgcGFkTGVmdCBmcm9tICdwYWQtbGVmdCc7XG5pbXBvcnQgeyBnZXRDbGllbnRBUEkgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5sZXQgbGluaztcbmxldCBkZWZhdWx0RXh0cyA9IHsgZXh0ZW5zaW9uOiAnJywgcHJlZml4OiAnJywgc3VmZml4OiAnJyB9O1xuXG4vLyBBbHRlcm5hdGl2ZSBzb2x1dGlvbiBmb3Igc2F2aW5nIGZpbGVzLFxuLy8gYSBiaXQgc2xvd2VyIGFuZCBkb2VzIG5vdCB3b3JrIGluIFNhZmFyaVxuLy8gZnVuY3Rpb24gZmV0Y2hCbG9iRnJvbURhdGFVUkwgKGRhdGFVUkwpIHtcbi8vICAgcmV0dXJuIHdpbmRvdy5mZXRjaChkYXRhVVJMKS50aGVuKHJlcyA9PiByZXMuYmxvYigpKTtcbi8vIH1cblxuY29uc3Qgc3VwcG9ydGVkRW5jb2RpbmdzID0gW1xuICAnaW1hZ2UvcG5nJyxcbiAgJ2ltYWdlL2pwZWcnLFxuICAnaW1hZ2Uvd2VicCdcbl07XG5cbmZ1bmN0aW9uIHN0cmVhbSAoaXNTdGFydCwgb3B0cyA9IHt9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgb3B0cyA9IGFzc2lnbih7fSwgZGVmYXVsdEV4dHMsIG9wdHMpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gcmVzb2x2ZUZpbGVuYW1lKE9iamVjdC5hc3NpZ24oe30sIG9wdHMsIHtcbiAgICAgIGV4dGVuc2lvbjogJycsXG4gICAgICBmcmFtZTogdW5kZWZpbmVkXG4gICAgfSkpO1xuICAgIGNvbnN0IGZ1bmMgPSBpc1N0YXJ0ID8gJ3N0cmVhbVN0YXJ0JyA6ICdzdHJlYW1FbmQnO1xuICAgIGNvbnN0IGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuICAgIGlmIChjbGllbnQgJiYgY2xpZW50Lm91dHB1dCAmJiB0eXBlb2YgY2xpZW50W2Z1bmNdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY2xpZW50W2Z1bmNdKGFzc2lnbih7fSwgb3B0cywgeyBmaWxlbmFtZSB9KSlcbiAgICAgICAgLnRoZW4oZXYgPT4gcmVzb2x2ZShldikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZSh7IGZpbGVuYW1lLCBjbGllbnQ6IGZhbHNlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1TdGFydCAob3B0cyA9IHt9KSB7XG4gIHJldHVybiBzdHJlYW0odHJ1ZSwgb3B0cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJlYW1FbmQgKG9wdHMgPSB7fSkge1xuICByZXR1cm4gc3RyZWFtKGZhbHNlLCBvcHRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydENhbnZhcyAoY2FudmFzLCBvcHQgPSB7fSkge1xuICBjb25zdCBlbmNvZGluZyA9IG9wdC5lbmNvZGluZyB8fCAnaW1hZ2UvcG5nJztcbiAgaWYgKCFzdXBwb3J0ZWRFbmNvZGluZ3MuaW5jbHVkZXMoZW5jb2RpbmcpKSB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgY2FudmFzIGVuY29kaW5nICR7ZW5jb2Rpbmd9YCk7XG4gIGxldCBleHRlbnNpb24gPSAoZW5jb2Rpbmcuc3BsaXQoJy8nKVsxXSB8fCAnJykucmVwbGFjZSgvanBlZy9pLCAnanBnJyk7XG4gIGlmIChleHRlbnNpb24pIGV4dGVuc2lvbiA9IGAuJHtleHRlbnNpb259YC50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4ge1xuICAgIGV4dGVuc2lvbixcbiAgICB0eXBlOiBlbmNvZGluZyxcbiAgICBkYXRhVVJMOiBjYW52YXMudG9EYXRhVVJMKGVuY29kaW5nLCBvcHQuZW5jb2RpbmdRdWFsaXR5KVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCbG9iRnJvbURhdGFVUkwgKGRhdGFVUkwpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY29uc3Qgc3BsaXRJbmRleCA9IGRhdGFVUkwuaW5kZXhPZignLCcpO1xuICAgIGlmIChzcGxpdEluZGV4ID09PSAtMSkge1xuICAgICAgcmVzb2x2ZShuZXcgd2luZG93LkJsb2IoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJhc2U2NCA9IGRhdGFVUkwuc2xpY2Uoc3BsaXRJbmRleCArIDEpO1xuICAgIGNvbnN0IGJ5dGVTdHJpbmcgPSB3aW5kb3cuYXRvYihiYXNlNjQpO1xuICAgIGNvbnN0IHR5cGUgPSBkYXRhVVJMLnNsaWNlKDAsIHNwbGl0SW5kZXgpO1xuICAgIGNvbnN0IG1pbWVNYXRjaCA9IC9kYXRhOihbXjtdKykvLmV4ZWModHlwZSk7XG4gICAgY29uc3QgbWltZSA9IChtaW1lTWF0Y2ggPyBtaW1lTWF0Y2hbMV0gOiAnJykgfHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFiID0gbmV3IEFycmF5QnVmZmVyKGJ5dGVTdHJpbmcubGVuZ3RoKTtcbiAgICBjb25zdCBpYSA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXNvbHZlKG5ldyB3aW5kb3cuQmxvYihbIGFiIF0sIHsgdHlwZTogbWltZSB9KSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2F2ZURhdGFVUkwgKGRhdGFVUkwsIG9wdHMgPSB7fSkge1xuICByZXR1cm4gY3JlYXRlQmxvYkZyb21EYXRhVVJMKGRhdGFVUkwpXG4gICAgLnRoZW4oYmxvYiA9PiBzYXZlQmxvYihibG9iLCBvcHRzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlQmxvYiAoYmxvYiwgb3B0cyA9IHt9KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBvcHRzID0gYXNzaWduKHt9LCBkZWZhdWx0RXh0cywgb3B0cyk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBvcHRzLmZpbGVuYW1lO1xuXG4gICAgY29uc3QgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG4gICAgaWYgKGNsaWVudCAmJiB0eXBlb2YgY2xpZW50LnNhdmVCbG9iID09PSAnZnVuY3Rpb24nICYmIGNsaWVudC5vdXRwdXQpIHtcbiAgICAgIC8vIG5hdGl2ZSBzYXZpbmcgdXNpbmcgYSBDTEkgdG9vbFxuICAgICAgcmV0dXJuIGNsaWVudC5zYXZlQmxvYihibG9iLCBhc3NpZ24oe30sIG9wdHMsIHsgZmlsZW5hbWUgfSkpXG4gICAgICAgIC50aGVuKGV2ID0+IHJlc29sdmUoZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yY2UgZG93bmxvYWRcbiAgICAgIGlmICghbGluaykge1xuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBsaW5rLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgbGluay50YXJnZXQgPSAnX2JsYW5rJztcbiAgICAgIH1cbiAgICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICAgIGxpbmsuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgbGluay5vbmNsaWNrID0gbm9vcDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoYmxvYik7XG4gICAgICAgICAgaWYgKGxpbmsucGFyZW50RWxlbWVudCkgbGluay5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgcmVzb2x2ZSh7IGZpbGVuYW1lLCBjbGllbnQ6IGZhbHNlIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhdmVGaWxlIChkYXRhLCBvcHRzID0ge30pIHtcbiAgY29uc3QgcGFydHMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFsgZGF0YSBdO1xuICBjb25zdCBibG9iID0gbmV3IHdpbmRvdy5CbG9iKHBhcnRzLCB7IHR5cGU6IG9wdHMudHlwZSB8fCAnJyB9KTtcbiAgcmV0dXJuIHNhdmVCbG9iKGJsb2IsIG9wdHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVN0YW1wICgpIHtcbiAgY29uc3QgZGF0ZUZvcm1hdFN0ciA9IGB5eXl5Lm1tLmRkLUhILk1NLnNzYDtcbiAgcmV0dXJuIGRhdGVmb3JtYXQobmV3IERhdGUoKSwgZGF0ZUZvcm1hdFN0cik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RmlsZSAocHJlZml4ID0gJycsIHN1ZmZpeCA9ICcnLCBleHQpIHtcbiAgLy8gY29uc3QgZGF0ZUZvcm1hdFN0ciA9IGB5eXl5Lm1tLmRkLUhILk1NLnNzYDtcbiAgY29uc3QgZGF0ZUZvcm1hdFN0ciA9IGB5eXl5LW1tLWRkICdhdCcgaC5NTS5zcyBUVGA7XG4gIHJldHVybiBgJHtwcmVmaXh9JHtkYXRlZm9ybWF0KG5ldyBEYXRlKCksIGRhdGVGb3JtYXRTdHIpfSR7c3VmZml4fSR7ZXh0fWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRmlsZW5hbWUgKG9wdCA9IHt9KSB7XG4gIG9wdCA9IGFzc2lnbih7fSwgb3B0KTtcblxuICAvLyBDdXN0b20gZmlsZW5hbWUgZnVuY3Rpb25cbiAgaWYgKHR5cGVvZiBvcHQuZmlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHQuZmlsZShvcHQpO1xuICB9IGVsc2UgaWYgKG9wdC5maWxlKSB7XG4gICAgcmV0dXJuIG9wdC5maWxlO1xuICB9XG5cbiAgbGV0IGZyYW1lID0gbnVsbDtcbiAgbGV0IGV4dGVuc2lvbiA9ICcnO1xuICBpZiAodHlwZW9mIG9wdC5leHRlbnNpb24gPT09ICdzdHJpbmcnKSBleHRlbnNpb24gPSBvcHQuZXh0ZW5zaW9uO1xuXG4gIGlmICh0eXBlb2Ygb3B0LmZyYW1lID09PSAnbnVtYmVyJykge1xuICAgIGxldCB0b3RhbEZyYW1lcztcbiAgICBpZiAodHlwZW9mIG9wdC50b3RhbEZyYW1lcyA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRvdGFsRnJhbWVzID0gb3B0LnRvdGFsRnJhbWVzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3RhbEZyYW1lcyA9IE1hdGgubWF4KDEwMDAwLCBvcHQuZnJhbWUpO1xuICAgIH1cbiAgICBmcmFtZSA9IHBhZExlZnQoU3RyaW5nKG9wdC5mcmFtZSksIFN0cmluZyh0b3RhbEZyYW1lcykubGVuZ3RoLCAnMCcpO1xuICB9XG5cbiAgY29uc3QgbGF5ZXJTdHIgPSBpc0Zpbml0ZShvcHQudG90YWxMYXllcnMpICYmIGlzRmluaXRlKG9wdC5sYXllcikgJiYgb3B0LnRvdGFsTGF5ZXJzID4gMSA/IGAke29wdC5sYXllcn1gIDogJyc7XG4gIGlmIChmcmFtZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIFsgbGF5ZXJTdHIsIGZyYW1lIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJy0nKSArIGV4dGVuc2lvbjtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkZWZhdWx0RmlsZU5hbWUgPSBvcHQudGltZVN0YW1wO1xuICAgIHJldHVybiBbIG9wdC5wcmVmaXgsIG9wdC5uYW1lIHx8IGRlZmF1bHRGaWxlTmFtZSwgbGF5ZXJTdHIsIG9wdC5oYXNoLCBvcHQuc3VmZml4IF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJy0nKSArIGV4dGVuc2lvbjtcbiAgfVxufVxuIiwiLy8gSGFuZGxlIHNvbWUgY29tbW9uIHR5cG9zXG5jb25zdCBjb21tb25UeXBvcyA9IHtcbiAgZGltZW5zaW9uOiAnZGltZW5zaW9ucycsXG4gIGFuaW1hdGVkOiAnYW5pbWF0ZScsXG4gIGFuaW1hdGluZzogJ2FuaW1hdGUnLFxuICB1bml0OiAndW5pdHMnLFxuICBQNTogJ3A1JyxcbiAgcGl4ZWxsYXRlZDogJ3BpeGVsYXRlZCcsXG4gIGxvb3Bpbmc6ICdsb29wJyxcbiAgcGl4ZWxQZXJJbmNoOiAncGl4ZWxzJ1xufTtcblxuLy8gSGFuZGxlIGFsbCBvdGhlciB0eXBvc1xuY29uc3QgYWxsS2V5cyA9IFtcbiAgJ2RpbWVuc2lvbnMnLCAndW5pdHMnLCAncGl4ZWxzUGVySW5jaCcsICdvcmllbnRhdGlvbicsXG4gICdzY2FsZVRvRml0JywgJ3NjYWxlVG9WaWV3JywgJ2JsZWVkJywgJ3BpeGVsUmF0aW8nLFxuICAnZXhwb3J0UGl4ZWxSYXRpbycsICdtYXhQaXhlbFJhdGlvJywgJ3NjYWxlQ29udGV4dCcsXG4gICdyZXNpemVDYW52YXMnLCAnc3R5bGVDYW52YXMnLCAnY2FudmFzJywgJ2NvbnRleHQnLCAnYXR0cmlidXRlcycsXG4gICdwYXJlbnQnLCAnZmlsZScsICduYW1lJywgJ3ByZWZpeCcsICdzdWZmaXgnLCAnYW5pbWF0ZScsICdwbGF5aW5nJyxcbiAgJ2xvb3AnLCAnZHVyYXRpb24nLCAndG90YWxGcmFtZXMnLCAnZnBzJywgJ3BsYXliYWNrUmF0ZScsICd0aW1lU2NhbGUnLFxuICAnZnJhbWUnLCAndGltZScsICdmbHVzaCcsICdwaXhlbGF0ZWQnLCAnaG90a2V5cycsICdwNScsICdpZCcsXG4gICdzY2FsZVRvRml0UGFkZGluZycsICdkYXRhJywgJ3BhcmFtcycsICdlbmNvZGluZycsICdlbmNvZGluZ1F1YWxpdHknXG5dO1xuXG4vLyBUaGlzIGlzIGZhaXJseSBvcGluaW9uYXRlZCBhbmQgZm9yY2VzIHVzZXJzIHRvIHVzZSB0aGUgJ2RhdGEnIHBhcmFtZXRlclxuLy8gaWYgdGhleSB3YW50IHRvIHBhc3MgYWxvbmcgbm9uLXNldHRpbmcgb2JqZWN0cy4uLlxuZXhwb3J0IGNvbnN0IGNoZWNrU2V0dGluZ3MgPSAoc2V0dGluZ3MpID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNldHRpbmdzKTtcbiAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKGtleSBpbiBjb21tb25UeXBvcykge1xuICAgICAgY29uc3QgYWN0dWFsID0gY29tbW9uVHlwb3Nba2V5XTtcbiAgICAgIGNvbnNvbGUud2FybihgW2NhbnZhcy1za2V0Y2hdIENvdWxkIG5vdCByZWNvZ25pemUgdGhlIHNldHRpbmcgXCIke2tleX1cIiwgZGlkIHlvdSBtZWFuIFwiJHthY3R1YWx9XCI/YCk7XG4gICAgfSBlbHNlIGlmICghYWxsS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFtjYW52YXMtc2tldGNoXSBDb3VsZCBub3QgcmVjb2duaXplIHRoZSBzZXR0aW5nIFwiJHtrZXl9XCJgKTtcbiAgICB9XG4gIH0pO1xufTtcbiIsImltcG9ydCB7IGdldENsaWVudEFQSSB9IGZyb20gJy4uL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAob3B0ID0ge30pIHtcbiAgY29uc3QgaGFuZGxlciA9IGV2ID0+IHtcbiAgICBpZiAoIW9wdC5lbmFibGVkKCkpIHJldHVybjtcblxuICAgIGNvbnN0IGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuICAgIGlmIChldi5rZXlDb2RlID09PSA4MyAmJiAhZXYuYWx0S2V5ICYmIChldi5tZXRhS2V5IHx8IGV2LmN0cmxLZXkpKSB7XG4gICAgICAvLyBDbWQgKyBTXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3B0LnNhdmUoZXYpO1xuICAgIH0gZWxzZSBpZiAoZXYua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIC8vIFNwYWNlXG4gICAgICAvLyBUT0RPOiB3aGF0IHRvIGRvIHdpdGggdGhpcz8ga2VlcCBpdCwgb3IgcmVtb3ZlIGl0P1xuICAgICAgb3B0LnRvZ2dsZVBsYXkoZXYpO1xuICAgIH0gZWxzZSBpZiAoY2xpZW50ICYmICFldi5hbHRLZXkgJiYgZXYua2V5Q29kZSA9PT0gNzUgJiYgKGV2Lm1ldGFLZXkgfHwgZXYuY3RybEtleSkpIHtcbiAgICAgIC8vIENtZCArIEssIG9ubHkgd2hlbiBjYW52YXMtc2tldGNoLWNsaSBpcyB1c2VkXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3B0LmNvbW1pdChldik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFjaCA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuICB9O1xuXG4gIGNvbnN0IGRldGFjaCA9ICgpID0+IHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNoLFxuICAgIGRldGFjaFxuICB9O1xufVxuIiwiY29uc3QgZGVmYXVsdFVuaXRzID0gJ21tJztcblxuY29uc3QgZGF0YSA9IFtcbiAgLy8gQ29tbW9uIFBhcGVyIFNpemVzXG4gIC8vIChNb3N0bHkgTm9ydGgtQW1lcmljYW4gYmFzZWQpXG4gIFsgJ3Bvc3RjYXJkJywgMTAxLjYsIDE1Mi40IF0sXG4gIFsgJ3Bvc3Rlci1zbWFsbCcsIDI4MCwgNDMwIF0sXG4gIFsgJ3Bvc3RlcicsIDQ2MCwgNjEwIF0sXG4gIFsgJ3Bvc3Rlci1sYXJnZScsIDYxMCwgOTEwIF0sXG4gIFsgJ2J1c2luZXNzLWNhcmQnLCA1MC44LCA4OC45IF0sXG5cbiAgLy8gUGhvdG9ncmFwaGljIFByaW50IFBhcGVyIFNpemVzXG4gIFsgJzJyJywgNjQsIDg5IF0sXG4gIFsgJzNyJywgODksIDEyNyBdLFxuICBbICc0cicsIDEwMiwgMTUyIF0sXG4gIFsgJzVyJywgMTI3LCAxNzggXSwgLy8gNeKAs3g34oCzXG4gIFsgJzZyJywgMTUyLCAyMDMgXSwgLy8gNuKAs3g44oCzXG4gIFsgJzhyJywgMjAzLCAyNTQgXSwgLy8gOOKAs3gxMOKAs1xuICBbICcxMHInLCAyNTQsIDMwNSBdLCAvLyAxMOKAs3gxMuKAs1xuICBbICcxMXInLCAyNzksIDM1NiBdLCAvLyAxMeKAs3gxNOKAs1xuICBbICcxMnInLCAzMDUsIDM4MSBdLFxuXG4gIC8vIFN0YW5kYXJkIFBhcGVyIFNpemVzXG4gIFsgJ2EwJywgODQxLCAxMTg5IF0sXG4gIFsgJ2ExJywgNTk0LCA4NDEgXSxcbiAgWyAnYTInLCA0MjAsIDU5NCBdLFxuICBbICdhMycsIDI5NywgNDIwIF0sXG4gIFsgJ2E0JywgMjEwLCAyOTcgXSxcbiAgWyAnYTUnLCAxNDgsIDIxMCBdLFxuICBbICdhNicsIDEwNSwgMTQ4IF0sXG4gIFsgJ2E3JywgNzQsIDEwNSBdLFxuICBbICdhOCcsIDUyLCA3NCBdLFxuICBbICdhOScsIDM3LCA1MiBdLFxuICBbICdhMTAnLCAyNiwgMzcgXSxcbiAgWyAnMmEwJywgMTE4OSwgMTY4MiBdLFxuICBbICc0YTAnLCAxNjgyLCAyMzc4IF0sXG4gIFsgJ2IwJywgMTAwMCwgMTQxNCBdLFxuICBbICdiMScsIDcwNywgMTAwMCBdLFxuICBbICdiMSsnLCA3MjAsIDEwMjAgXSxcbiAgWyAnYjInLCA1MDAsIDcwNyBdLFxuICBbICdiMisnLCA1MjAsIDcyMCBdLFxuICBbICdiMycsIDM1MywgNTAwIF0sXG4gIFsgJ2I0JywgMjUwLCAzNTMgXSxcbiAgWyAnYjUnLCAxNzYsIDI1MCBdLFxuICBbICdiNicsIDEyNSwgMTc2IF0sXG4gIFsgJ2I3JywgODgsIDEyNSBdLFxuICBbICdiOCcsIDYyLCA4OCBdLFxuICBbICdiOScsIDQ0LCA2MiBdLFxuICBbICdiMTAnLCAzMSwgNDQgXSxcbiAgWyAnYjExJywgMjIsIDMyIF0sXG4gIFsgJ2IxMicsIDE2LCAyMiBdLFxuICBbICdjMCcsIDkxNywgMTI5NyBdLFxuICBbICdjMScsIDY0OCwgOTE3IF0sXG4gIFsgJ2MyJywgNDU4LCA2NDggXSxcbiAgWyAnYzMnLCAzMjQsIDQ1OCBdLFxuICBbICdjNCcsIDIyOSwgMzI0IF0sXG4gIFsgJ2M1JywgMTYyLCAyMjkgXSxcbiAgWyAnYzYnLCAxMTQsIDE2MiBdLFxuICBbICdjNycsIDgxLCAxMTQgXSxcbiAgWyAnYzgnLCA1NywgODEgXSxcbiAgWyAnYzknLCA0MCwgNTcgXSxcbiAgWyAnYzEwJywgMjgsIDQwIF0sXG4gIFsgJ2MxMScsIDIyLCAzMiBdLFxuICBbICdjMTInLCAxNiwgMjIgXSxcblxuICAvLyBVc2UgaW5jaGVzIGZvciBOb3J0aCBBbWVyaWNhbiBzaXplcyxcbiAgLy8gYXMgaXQgcHJvZHVjZXMgbGVzcyBmbG9hdCBwcmVjaXNpb24gZXJyb3JzXG4gIFsgJ2hhbGYtbGV0dGVyJywgNS41LCA4LjUsICdpbicgXSxcbiAgWyAnbGV0dGVyJywgOC41LCAxMSwgJ2luJyBdLFxuICBbICdsZWdhbCcsIDguNSwgMTQsICdpbicgXSxcbiAgWyAnanVuaW9yLWxlZ2FsJywgNSwgOCwgJ2luJyBdLFxuICBbICdsZWRnZXInLCAxMSwgMTcsICdpbicgXSxcbiAgWyAndGFibG9pZCcsIDExLCAxNywgJ2luJyBdLFxuICBbICdhbnNpLWEnLCA4LjUsIDExLjAsICdpbicgXSxcbiAgWyAnYW5zaS1iJywgMTEuMCwgMTcuMCwgJ2luJyBdLFxuICBbICdhbnNpLWMnLCAxNy4wLCAyMi4wLCAnaW4nIF0sXG4gIFsgJ2Fuc2ktZCcsIDIyLjAsIDM0LjAsICdpbicgXSxcbiAgWyAnYW5zaS1lJywgMzQuMCwgNDQuMCwgJ2luJyBdLFxuICBbICdhcmNoLWEnLCA5LCAxMiwgJ2luJyBdLFxuICBbICdhcmNoLWInLCAxMiwgMTgsICdpbicgXSxcbiAgWyAnYXJjaC1jJywgMTgsIDI0LCAnaW4nIF0sXG4gIFsgJ2FyY2gtZCcsIDI0LCAzNiwgJ2luJyBdLFxuICBbICdhcmNoLWUnLCAzNiwgNDgsICdpbicgXSxcbiAgWyAnYXJjaC1lMScsIDMwLCA0MiwgJ2luJyBdLFxuICBbICdhcmNoLWUyJywgMjYsIDM4LCAnaW4nIF0sXG4gIFsgJ2FyY2gtZTMnLCAyNywgMzksICdpbicgXVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZGF0YS5yZWR1Y2UoKGRpY3QsIHByZXNldCkgPT4ge1xuICBjb25zdCBpdGVtID0ge1xuICAgIHVuaXRzOiBwcmVzZXRbM10gfHwgZGVmYXVsdFVuaXRzLFxuICAgIGRpbWVuc2lvbnM6IFsgcHJlc2V0WzFdLCBwcmVzZXRbMl0gXVxuICB9O1xuICBkaWN0W3ByZXNldFswXV0gPSBpdGVtO1xuICBkaWN0W3ByZXNldFswXS5yZXBsYWNlKC8tL2csICcgJyldID0gaXRlbTtcbiAgcmV0dXJuIGRpY3Q7XG59LCB7fSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJndW1lbnRzW2ldICE9PSB1bmRlZmluZWQpIHJldHVybiBhcmd1bWVudHNbaV07XG4gICAgfVxufTtcbiIsInZhciBkZWZpbmVkID0gcmVxdWlyZSgnZGVmaW5lZCcpO1xudmFyIHVuaXRzID0gWyAnbW0nLCAnY20nLCAnbScsICdwYycsICdwdCcsICdpbicsICdmdCcsICdweCcgXTtcblxudmFyIGNvbnZlcnNpb25zID0ge1xuICAvLyBtZXRyaWNcbiAgbToge1xuICAgIHN5c3RlbTogJ21ldHJpYycsXG4gICAgZmFjdG9yOiAxXG4gIH0sXG4gIGNtOiB7XG4gICAgc3lzdGVtOiAnbWV0cmljJyxcbiAgICBmYWN0b3I6IDEgLyAxMDBcbiAgfSxcbiAgbW06IHtcbiAgICBzeXN0ZW06ICdtZXRyaWMnLFxuICAgIGZhY3RvcjogMSAvIDEwMDBcbiAgfSxcbiAgLy8gaW1wZXJpYWxcbiAgcHQ6IHtcbiAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG4gICAgZmFjdG9yOiAxIC8gNzJcbiAgfSxcbiAgcGM6IHtcbiAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG4gICAgZmFjdG9yOiAxIC8gNlxuICB9LFxuICBpbjoge1xuICAgIHN5c3RlbTogJ2ltcGVyaWFsJyxcbiAgICBmYWN0b3I6IDFcbiAgfSxcbiAgZnQ6IHtcbiAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG4gICAgZmFjdG9yOiAxMlxuICB9XG59O1xuXG5jb25zdCBhbmNob3JzID0ge1xuICBtZXRyaWM6IHtcbiAgICB1bml0OiAnbScsXG4gICAgcmF0aW86IDEgLyAwLjAyNTRcbiAgfSxcbiAgaW1wZXJpYWw6IHtcbiAgICB1bml0OiAnaW4nLFxuICAgIHJhdGlvOiAwLjAyNTRcbiAgfVxufTtcblxuZnVuY3Rpb24gcm91bmQgKHZhbHVlLCBkZWNpbWFscykge1xuICByZXR1cm4gTnVtYmVyKE1hdGgucm91bmQodmFsdWUgKyAnZScgKyBkZWNpbWFscykgKyAnZS0nICsgZGVjaW1hbHMpO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0RGlzdGFuY2UgKHZhbHVlLCBmcm9tVW5pdCwgdG9Vbml0LCBvcHRzKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHRocm93IG5ldyBFcnJvcignVmFsdWUgbXVzdCBiZSBhIGZpbml0ZSBudW1iZXInKTtcbiAgaWYgKCFmcm9tVW5pdCB8fCAhdG9Vbml0KSB0aHJvdyBuZXcgRXJyb3IoJ011c3Qgc3BlY2lmeSBmcm9tIGFuZCB0byB1bml0cycpO1xuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB2YXIgcGl4ZWxzUGVySW5jaCA9IGRlZmluZWQob3B0cy5waXhlbHNQZXJJbmNoLCA5Nik7XG4gIHZhciBwcmVjaXNpb24gPSBvcHRzLnByZWNpc2lvbjtcbiAgdmFyIHJvdW5kUGl4ZWwgPSBvcHRzLnJvdW5kUGl4ZWwgIT09IGZhbHNlO1xuXG4gIGZyb21Vbml0ID0gZnJvbVVuaXQudG9Mb3dlckNhc2UoKTtcbiAgdG9Vbml0ID0gdG9Vbml0LnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKHVuaXRzLmluZGV4T2YoZnJvbVVuaXQpID09PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyb20gdW5pdCBcIicgKyBmcm9tVW5pdCArICdcIiwgbXVzdCBiZSBvbmUgb2Y6ICcgKyB1bml0cy5qb2luKCcsICcpKTtcbiAgaWYgKHVuaXRzLmluZGV4T2YodG9Vbml0KSA9PT0gLTEpIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmcm9tIHVuaXQgXCInICsgdG9Vbml0ICsgJ1wiLCBtdXN0IGJlIG9uZSBvZjogJyArIHVuaXRzLmpvaW4oJywgJykpO1xuXG4gIGlmIChmcm9tVW5pdCA9PT0gdG9Vbml0KSB7XG4gICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBjb252ZXJ0IGZyb20gQSB0byBCIHNpbmNlIHRoZXkgYXJlIHRoZSBzYW1lIGFscmVhZHlcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB2YXIgdG9GYWN0b3IgPSAxO1xuICB2YXIgZnJvbUZhY3RvciA9IDE7XG4gIHZhciBpc1RvUGl4ZWwgPSBmYWxzZTtcblxuICBpZiAoZnJvbVVuaXQgPT09ICdweCcpIHtcbiAgICBmcm9tRmFjdG9yID0gMSAvIHBpeGVsc1BlckluY2g7XG4gICAgZnJvbVVuaXQgPSAnaW4nO1xuICB9XG4gIGlmICh0b1VuaXQgPT09ICdweCcpIHtcbiAgICBpc1RvUGl4ZWwgPSB0cnVlO1xuICAgIHRvRmFjdG9yID0gcGl4ZWxzUGVySW5jaDtcbiAgICB0b1VuaXQgPSAnaW4nO1xuICB9XG5cbiAgdmFyIGZyb21Vbml0RGF0YSA9IGNvbnZlcnNpb25zW2Zyb21Vbml0XTtcbiAgdmFyIHRvVW5pdERhdGEgPSBjb252ZXJzaW9uc1t0b1VuaXRdO1xuXG4gIC8vIHNvdXJjZSB0byBhbmNob3IgaW5zaWRlIHNvdXJjZSdzIHN5c3RlbVxuICB2YXIgYW5jaG9yID0gdmFsdWUgKiBmcm9tVW5pdERhdGEuZmFjdG9yICogZnJvbUZhY3RvcjtcblxuICAvLyBpZiBzeXN0ZW1zIGRpZmZlciwgY29udmVydCBvbmUgdG8gYW5vdGhlclxuICBpZiAoZnJvbVVuaXREYXRhLnN5c3RlbSAhPT0gdG9Vbml0RGF0YS5zeXN0ZW0pIHtcbiAgICAvLyByZWd1bGFyICdtJyB0byAnaW4nIGFuZCBzbyBmb3J0aFxuICAgIGFuY2hvciAqPSBhbmNob3JzW2Zyb21Vbml0RGF0YS5zeXN0ZW1dLnJhdGlvO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IGFuY2hvciAvIHRvVW5pdERhdGEuZmFjdG9yICogdG9GYWN0b3I7XG4gIGlmIChpc1RvUGl4ZWwgJiYgcm91bmRQaXhlbCkge1xuICAgIHJlc3VsdCA9IE1hdGgucm91bmQocmVzdWx0KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJlY2lzaW9uID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShwcmVjaXNpb24pKSB7XG4gICAgcmVzdWx0ID0gcm91bmQocmVzdWx0LCBwcmVjaXNpb24pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udmVydERpc3RhbmNlO1xubW9kdWxlLmV4cG9ydHMudW5pdHMgPSB1bml0cztcbiIsImltcG9ydCBwYXBlclNpemVzIGZyb20gJy4vcGFwZXItc2l6ZXMnO1xuaW1wb3J0IGNvbnZlcnRMZW5ndGggZnJvbSAnY29udmVydC1sZW5ndGgnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGltZW5zaW9uc0Zyb21QcmVzZXQgKGRpbWVuc2lvbnMsIHVuaXRzVG8gPSAncHgnLCBwaXhlbHNQZXJJbmNoID0gNzIpIHtcbiAgaWYgKHR5cGVvZiBkaW1lbnNpb25zID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGtleSA9IGRpbWVuc2lvbnMudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIShrZXkgaW4gcGFwZXJTaXplcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGRpbWVuc2lvbiBwcmVzZXQgXCIke2RpbWVuc2lvbnN9XCIgaXMgbm90IHN1cHBvcnRlZCBvciBjb3VsZCBub3QgYmUgZm91bmQ7IHRyeSB1c2luZyBhNCwgYTMsIHBvc3RjYXJkLCBsZXR0ZXIsIGV0Yy5gKVxuICAgIH1cbiAgICBjb25zdCBwcmVzZXQgPSBwYXBlclNpemVzW2tleV07XG4gICAgcmV0dXJuIHByZXNldC5kaW1lbnNpb25zLm1hcChkID0+IHtcbiAgICAgIHJldHVybiBjb252ZXJ0RGlzdGFuY2UoZCwgcHJlc2V0LnVuaXRzLCB1bml0c1RvLCBwaXhlbHNQZXJJbmNoKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydERpc3RhbmNlIChkaW1lbnNpb24sIHVuaXRzRnJvbSA9ICdweCcsIHVuaXRzVG8gPSAncHgnLCBwaXhlbHNQZXJJbmNoID0gNzIpIHtcbiAgcmV0dXJuIGNvbnZlcnRMZW5ndGgoZGltZW5zaW9uLCB1bml0c0Zyb20sIHVuaXRzVG8sIHtcbiAgICBwaXhlbHNQZXJJbmNoLFxuICAgIHByZWNpc2lvbjogNCxcbiAgICByb3VuZFBpeGVsOiB0cnVlXG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgZ2V0RGltZW5zaW9uc0Zyb21QcmVzZXQsIGNvbnZlcnREaXN0YW5jZSB9IGZyb20gJy4uL2Rpc3RhbmNlcyc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIsIGRlZmluZWQgfSBmcm9tICcuLi91dGlsJztcblxuZnVuY3Rpb24gY2hlY2tJZkhhc0RpbWVuc2lvbnMgKHNldHRpbmdzKSB7XG4gIGlmICghc2V0dGluZ3MuZGltZW5zaW9ucykgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIHNldHRpbmdzLmRpbWVuc2lvbnMgPT09ICdzdHJpbmcnKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2V0dGluZ3MuZGltZW5zaW9ucykgJiYgc2V0dGluZ3MuZGltZW5zaW9ucy5sZW5ndGggPj0gMikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50U2l6ZSAocHJvcHMsIHNldHRpbmdzKSB7XG4gIC8vIFdoZW4gbm8geyBkaW1lbnNpb24gfSBpcyBwYXNzZWQgaW4gbm9kZSwgd2UgZGVmYXVsdCB0byBIVE1MIGNhbnZhcyBzaXplXG4gIGlmICghaXNCcm93c2VyKCkpIHtcbiAgICByZXR1cm4gWyAzMDAsIDE1MCBdO1xuICB9XG5cbiAgbGV0IGVsZW1lbnQgPSBzZXR0aW5ncy5wYXJlbnQgfHwgd2luZG93O1xuXG4gIGlmIChlbGVtZW50ID09PSB3aW5kb3cgfHxcbiAgICAgIGVsZW1lbnQgPT09IGRvY3VtZW50IHx8XG4gICAgICBlbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIFsgd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCBdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gWyB3aWR0aCwgaGVpZ2h0IF07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzaXplQ2FudmFzIChwcm9wcywgc2V0dGluZ3MpIHtcbiAgbGV0IHdpZHRoLCBoZWlnaHQ7XG4gIGxldCBzdHlsZVdpZHRoLCBzdHlsZUhlaWdodDtcbiAgbGV0IGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQ7XG5cbiAgY29uc3QgYnJvd3NlciA9IGlzQnJvd3NlcigpO1xuICBjb25zdCBkaW1lbnNpb25zID0gc2V0dGluZ3MuZGltZW5zaW9ucztcbiAgY29uc3QgaGFzRGltZW5zaW9ucyA9IGNoZWNrSWZIYXNEaW1lbnNpb25zKHNldHRpbmdzKTtcbiAgY29uc3QgZXhwb3J0aW5nID0gcHJvcHMuZXhwb3J0aW5nO1xuICBsZXQgc2NhbGVUb0ZpdCA9IGhhc0RpbWVuc2lvbnMgPyBzZXR0aW5ncy5zY2FsZVRvRml0ICE9PSBmYWxzZSA6IGZhbHNlO1xuICBsZXQgc2NhbGVUb1ZpZXcgPSAoIWV4cG9ydGluZyAmJiBoYXNEaW1lbnNpb25zKSA/IHNldHRpbmdzLnNjYWxlVG9WaWV3IDogdHJ1ZTtcbiAgLy8gaW4gbm9kZSwgY2FuY2VsIGJvdGggb2YgdGhlc2Ugb3B0aW9uc1xuICBpZiAoIWJyb3dzZXIpIHNjYWxlVG9GaXQgPSBzY2FsZVRvVmlldyA9IGZhbHNlO1xuICBjb25zdCB1bml0cyA9IHNldHRpbmdzLnVuaXRzO1xuICBjb25zdCBwaXhlbHNQZXJJbmNoID0gKHR5cGVvZiBzZXR0aW5ncy5waXhlbHNQZXJJbmNoID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzZXR0aW5ncy5waXhlbHNQZXJJbmNoKSkgPyBzZXR0aW5ncy5waXhlbHNQZXJJbmNoIDogNzI7XG4gIGNvbnN0IGJsZWVkID0gZGVmaW5lZChzZXR0aW5ncy5ibGVlZCwgMCk7XG5cbiAgY29uc3QgZGV2aWNlUGl4ZWxSYXRpbyA9IGJyb3dzZXIgPyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG4gIGNvbnN0IGJhc2VQaXhlbFJhdGlvID0gc2NhbGVUb1ZpZXcgPyBkZXZpY2VQaXhlbFJhdGlvIDogMTtcblxuICBsZXQgcGl4ZWxSYXRpbywgZXhwb3J0UGl4ZWxSYXRpbztcblxuICAvLyBJZiBhIHBpeGVsIHJhdGlvIGlzIHNwZWNpZmllZCwgd2Ugd2lsbCB1c2UgaXQuXG4gIC8vIE90aGVyd2lzZTpcbiAgLy8gIC0+IElmIGRpbWVuc2lvbiBpcyBzcGVjaWZpZWQsIHVzZSBiYXNlIHJhdGlvIChpLmUuIHNpemUgZm9yIGV4cG9ydClcbiAgLy8gIC0+IElmIG5vIGRpbWVuc2lvbiBpcyBzcGVjaWZpZWQsIHVzZSBkZXZpY2UgcmF0aW8gKGkuZS4gc2l6ZSBmb3Igc2NyZWVuKVxuICBpZiAodHlwZW9mIHNldHRpbmdzLnBpeGVsUmF0aW8gPT09ICdudW1iZXInICYmIGlzRmluaXRlKHNldHRpbmdzLnBpeGVsUmF0aW8pKSB7XG4gICAgLy8gV2hlbiB7IHBpeGVsUmF0aW8gfSBpcyBzcGVjaWZpZWQsIGl0J3MgYWxzbyB1c2VkIGFzIGRlZmF1bHQgZXhwb3J0UGl4ZWxSYXRpby5cbiAgICBwaXhlbFJhdGlvID0gc2V0dGluZ3MucGl4ZWxSYXRpbztcbiAgICBleHBvcnRQaXhlbFJhdGlvID0gZGVmaW5lZChzZXR0aW5ncy5leHBvcnRQaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaGFzRGltZW5zaW9ucykge1xuICAgICAgLy8gV2hlbiBhIGRpbWVuc2lvbiBpcyBzcGVjaWZpZWQsIHVzZSB0aGUgYmFzZSByYXRpbyByYXRoZXIgdGhhbiBzY3JlZW4gcmF0aW9cbiAgICAgIHBpeGVsUmF0aW8gPSBiYXNlUGl4ZWxSYXRpbztcbiAgICAgIC8vIERlZmF1bHQgdG8gYSBwaXhlbCByYXRpbyBvZiAxIHNvIHRoYXQgeW91IGVuZCB1cCB3aXRoIHRoZSBzYW1lIGRpbWVuc2lvblxuICAgICAgLy8geW91IHNwZWNpZmllZCwgaS5lLiBbIDUwMCwgNTAwIF0gaXMgZXhwb3J0ZWQgYXMgNTAweDUwMCBweFxuICAgICAgZXhwb3J0UGl4ZWxSYXRpbyA9IGRlZmluZWQoc2V0dGluZ3MuZXhwb3J0UGl4ZWxSYXRpbywgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5vIGRpbWVuc2lvbiBpcyBzcGVjaWZpZWQsIGFzc3VtZSBmdWxsLXNjcmVlbiByZXRpbmEgc2l6aW5nXG4gICAgICBwaXhlbFJhdGlvID0gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgIC8vIERlZmF1bHQgdG8gc2NyZWVuIHBpeGVsIHJhdGlvLCBzbyB0aGF0IGl0J3MgbGlrZSB0YWtpbmcgYSBkZXZpY2Ugc2NyZWVuc2hvdFxuICAgICAgZXhwb3J0UGl4ZWxSYXRpbyA9IGRlZmluZWQoc2V0dGluZ3MuZXhwb3J0UGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xhbXAgcGl4ZWwgcmF0aW9cbiAgaWYgKHR5cGVvZiBzZXR0aW5ncy5tYXhQaXhlbFJhdGlvID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzZXR0aW5ncy5tYXhQaXhlbFJhdGlvKSkge1xuICAgIHBpeGVsUmF0aW8gPSBNYXRoLm1pbihzZXR0aW5ncy5tYXhQaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBleHBvcnQgcGl4ZWwgcmF0aW9cbiAgaWYgKGV4cG9ydGluZykge1xuICAgIHBpeGVsUmF0aW8gPSBleHBvcnRQaXhlbFJhdGlvO1xuICB9XG5cbiAgLy8gcGFyZW50V2lkdGggPSB0eXBlb2YgcGFyZW50V2lkdGggPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdE5vZGVTaXplWzBdIDogcGFyZW50V2lkdGg7XG4gIC8vIHBhcmVudEhlaWdodCA9IHR5cGVvZiBwYXJlbnRIZWlnaHQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdE5vZGVTaXplWzFdIDogcGFyZW50SGVpZ2h0O1xuXG4gIGxldCBbIHBhcmVudFdpZHRoLCBwYXJlbnRIZWlnaHQgXSA9IGdldFBhcmVudFNpemUocHJvcHMsIHNldHRpbmdzKTtcbiAgbGV0IHRyaW1XaWR0aCwgdHJpbUhlaWdodDtcblxuICAvLyBZb3UgY2FuIHNwZWNpZnkgYSBkaW1lbnNpb25zIGluIHBpeGVscyBvciBjbS9tL2luL2V0Y1xuICBpZiAoaGFzRGltZW5zaW9ucykge1xuICAgIGNvbnN0IHJlc3VsdCA9IGdldERpbWVuc2lvbnNGcm9tUHJlc2V0KGRpbWVuc2lvbnMsIHVuaXRzLCBwaXhlbHNQZXJJbmNoKTtcbiAgICBjb25zdCBoaWdoZXN0ID0gTWF0aC5tYXgocmVzdWx0WzBdLCByZXN1bHRbMV0pO1xuICAgIGNvbnN0IGxvd2VzdCA9IE1hdGgubWluKHJlc3VsdFswXSwgcmVzdWx0WzFdKTtcbiAgICBpZiAoc2V0dGluZ3Mub3JpZW50YXRpb24pIHtcbiAgICAgIGNvbnN0IGxhbmRzY2FwZSA9IHNldHRpbmdzLm9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJztcbiAgICAgIHdpZHRoID0gbGFuZHNjYXBlID8gaGlnaGVzdCA6IGxvd2VzdDtcbiAgICAgIGhlaWdodCA9IGxhbmRzY2FwZSA/IGxvd2VzdCA6IGhpZ2hlc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoID0gcmVzdWx0WzBdO1xuICAgICAgaGVpZ2h0ID0gcmVzdWx0WzFdO1xuICAgIH1cblxuICAgIHRyaW1XaWR0aCA9IHdpZHRoO1xuICAgIHRyaW1IZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAvLyBBcHBseSBibGVlZCB3aGljaCBpcyBhc3N1bWVkIHRvIGJlIGluIHRoZSBzYW1lIHVuaXRzXG4gICAgd2lkdGggKz0gYmxlZWQgKiAyO1xuICAgIGhlaWdodCArPSBibGVlZCAqIDI7XG4gIH0gZWxzZSB7XG4gICAgd2lkdGggPSBwYXJlbnRXaWR0aDtcbiAgICBoZWlnaHQgPSBwYXJlbnRIZWlnaHQ7XG4gICAgdHJpbVdpZHRoID0gd2lkdGg7XG4gICAgdHJpbUhlaWdodCA9IGhlaWdodDtcbiAgfVxuXG4gIC8vIFJlYWwgc2l6ZSBpbiBwaXhlbHMgYWZ0ZXIgUFBJIGlzIHRha2VuIGludG8gYWNjb3VudFxuICBsZXQgcmVhbFdpZHRoID0gd2lkdGg7XG4gIGxldCByZWFsSGVpZ2h0ID0gaGVpZ2h0O1xuICBpZiAoaGFzRGltZW5zaW9ucyAmJiB1bml0cykge1xuICAgIC8vIENvbnZlcnQgdG8gZGlnaXRhbC9waXhlbCB1bml0cyBpZiBuZWNlc3NhcnlcbiAgICByZWFsV2lkdGggPSBjb252ZXJ0RGlzdGFuY2Uod2lkdGgsIHVuaXRzLCAncHgnLCBwaXhlbHNQZXJJbmNoKTtcbiAgICByZWFsSGVpZ2h0ID0gY29udmVydERpc3RhbmNlKGhlaWdodCwgdW5pdHMsICdweCcsIHBpeGVsc1BlckluY2gpO1xuICB9XG5cbiAgLy8gSG93IGJpZyB0byBzZXQgdGhlICd2aWV3JyBvZiB0aGUgY2FudmFzIGluIHRoZSBicm93c2VyIChpLmUuIHN0eWxlKVxuICBzdHlsZVdpZHRoID0gTWF0aC5yb3VuZChyZWFsV2lkdGgpO1xuICBzdHlsZUhlaWdodCA9IE1hdGgucm91bmQocmVhbEhlaWdodCk7XG5cbiAgLy8gSWYgd2Ugd2lzaCB0byBzY2FsZSB0aGUgdmlldyB0byB0aGUgYnJvd3NlciB3aW5kb3dcbiAgaWYgKHNjYWxlVG9GaXQgJiYgIWV4cG9ydGluZyAmJiBoYXNEaW1lbnNpb25zKSB7XG4gICAgY29uc3QgYXNwZWN0ID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgY29uc3Qgd2luZG93QXNwZWN0ID0gcGFyZW50V2lkdGggLyBwYXJlbnRIZWlnaHQ7XG4gICAgY29uc3Qgc2NhbGVUb0ZpdFBhZGRpbmcgPSBkZWZpbmVkKHNldHRpbmdzLnNjYWxlVG9GaXRQYWRkaW5nLCA0MCk7XG4gICAgY29uc3QgbWF4V2lkdGggPSBNYXRoLnJvdW5kKHBhcmVudFdpZHRoIC0gc2NhbGVUb0ZpdFBhZGRpbmcgKiAyKTtcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBNYXRoLnJvdW5kKHBhcmVudEhlaWdodCAtIHNjYWxlVG9GaXRQYWRkaW5nICogMik7XG4gICAgaWYgKHN0eWxlV2lkdGggPiBtYXhXaWR0aCB8fCBzdHlsZUhlaWdodCA+IG1heEhlaWdodCkge1xuICAgICAgaWYgKHdpbmRvd0FzcGVjdCA+IGFzcGVjdCkge1xuICAgICAgICBzdHlsZUhlaWdodCA9IG1heEhlaWdodDtcbiAgICAgICAgc3R5bGVXaWR0aCA9IE1hdGgucm91bmQoc3R5bGVIZWlnaHQgKiBhc3BlY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVXaWR0aCA9IG1heFdpZHRoO1xuICAgICAgICBzdHlsZUhlaWdodCA9IE1hdGgucm91bmQoc3R5bGVXaWR0aCAvIGFzcGVjdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FudmFzV2lkdGggPSBzY2FsZVRvVmlldyA/IE1hdGgucm91bmQocGl4ZWxSYXRpbyAqIHN0eWxlV2lkdGgpIDogTWF0aC5yb3VuZChwaXhlbFJhdGlvICogcmVhbFdpZHRoKTtcbiAgY2FudmFzSGVpZ2h0ID0gc2NhbGVUb1ZpZXcgPyBNYXRoLnJvdW5kKHBpeGVsUmF0aW8gKiBzdHlsZUhlaWdodCkgOiBNYXRoLnJvdW5kKHBpeGVsUmF0aW8gKiByZWFsSGVpZ2h0KTtcblxuICBjb25zdCB2aWV3cG9ydFdpZHRoID0gc2NhbGVUb1ZpZXcgPyBNYXRoLnJvdW5kKHN0eWxlV2lkdGgpIDogTWF0aC5yb3VuZChyZWFsV2lkdGgpO1xuICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHNjYWxlVG9WaWV3ID8gTWF0aC5yb3VuZChzdHlsZUhlaWdodCkgOiBNYXRoLnJvdW5kKHJlYWxIZWlnaHQpO1xuXG4gIGNvbnN0IHNjYWxlWCA9IGNhbnZhc1dpZHRoIC8gd2lkdGg7XG4gIGNvbnN0IHNjYWxlWSA9IGNhbnZhc0hlaWdodCAvIGhlaWdodDtcblxuICAvLyBBc3NpZ24gdG8gY3VycmVudCBwcm9wc1xuICByZXR1cm4ge1xuICAgIGJsZWVkLFxuICAgIHBpeGVsUmF0aW8sXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGRpbWVuc2lvbnM6IFsgd2lkdGgsIGhlaWdodCBdLFxuICAgIHVuaXRzOiB1bml0cyB8fCAncHgnLFxuICAgIHNjYWxlWCxcbiAgICBzY2FsZVksXG4gICAgcGl4ZWxzUGVySW5jaCxcbiAgICB2aWV3cG9ydFdpZHRoLFxuICAgIHZpZXdwb3J0SGVpZ2h0LFxuICAgIGNhbnZhc1dpZHRoLFxuICAgIGNhbnZhc0hlaWdodCxcbiAgICB0cmltV2lkdGgsXG4gICAgdHJpbUhlaWdodCxcbiAgICBzdHlsZVdpZHRoLFxuICAgIHN0eWxlSGVpZ2h0XG4gIH07XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGdldENhbnZhc0NvbnRleHRcbmZ1bmN0aW9uIGdldENhbnZhc0NvbnRleHQgKHR5cGUsIG9wdHMpIHtcbiAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3Qgc3BlY2lmeSB0eXBlIHN0cmluZycpXG4gIH1cblxuICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnICYmICFvcHRzLmNhbnZhcykge1xuICAgIHJldHVybiBudWxsIC8vIGNoZWNrIGZvciBOb2RlXG4gIH1cblxuICB2YXIgY2FudmFzID0gb3B0cy5jYW52YXMgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgaWYgKHR5cGVvZiBvcHRzLndpZHRoID09PSAnbnVtYmVyJykge1xuICAgIGNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGhcbiAgfVxuICBpZiAodHlwZW9mIG9wdHMuaGVpZ2h0ID09PSAnbnVtYmVyJykge1xuICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodFxuICB9XG5cbiAgdmFyIGF0dHJpYnMgPSBvcHRzXG4gIHZhciBnbFxuICB0cnkge1xuICAgIHZhciBuYW1lcyA9IFsgdHlwZSBdXG4gICAgLy8gcHJlZml4IEdMIGNvbnRleHRzXG4gICAgaWYgKHR5cGUuaW5kZXhPZignd2ViZ2wnKSA9PT0gMCkge1xuICAgICAgbmFtZXMucHVzaCgnZXhwZXJpbWVudGFsLScgKyB0eXBlKVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdsID0gY2FudmFzLmdldENvbnRleHQobmFtZXNbaV0sIGF0dHJpYnMpXG4gICAgICBpZiAoZ2wpIHJldHVybiBnbFxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGdsID0gbnVsbFxuICB9XG4gIHJldHVybiAoZ2wgfHwgbnVsbCkgLy8gZW5zdXJlIG51bGwgb24gZmFpbFxufVxuIiwiaW1wb3J0IGFzc2lnbiBmcm9tICdvYmplY3QtYXNzaWduJztcbmltcG9ydCBnZXRDYW52YXNDb250ZXh0IGZyb20gJ2dldC1jYW52YXMtY29udGV4dCc7XG5pbXBvcnQgeyBpc0Jyb3dzZXIgfSBmcm9tICcuLi91dGlsJztcblxuZnVuY3Rpb24gY3JlYXRlQ2FudmFzRWxlbWVudCAoKSB7XG4gIGlmICghaXNCcm93c2VyKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0IGFwcGVhcnMgeW91IGFyZSBydW5pbmcgZnJvbSBOb2RlLmpzIG9yIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuIFRyeSBwYXNzaW5nIGluIGFuIGV4aXN0aW5nIHsgY2FudmFzIH0gaW50ZXJmYWNlIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDYW52YXMgKHNldHRpbmdzID0ge30pIHtcbiAgbGV0IGNvbnRleHQsIGNhbnZhcztcbiAgbGV0IG93bnNDYW52YXMgPSBmYWxzZTtcbiAgaWYgKHNldHRpbmdzLmNhbnZhcyAhPT0gZmFsc2UpIHtcbiAgICAvLyBEZXRlcm1pbmUgdGhlIGNhbnZhcyBhbmQgY29udGV4dCB0byBjcmVhdGVcbiAgICBjb250ZXh0ID0gc2V0dGluZ3MuY29udGV4dDtcbiAgICBpZiAoIWNvbnRleHQgfHwgdHlwZW9mIGNvbnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbmV3Q2FudmFzID0gc2V0dGluZ3MuY2FudmFzO1xuICAgICAgaWYgKCFuZXdDYW52YXMpIHtcbiAgICAgICAgbmV3Q2FudmFzID0gY3JlYXRlQ2FudmFzRWxlbWVudCgpO1xuICAgICAgICBvd25zQ2FudmFzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHR5cGUgPSBjb250ZXh0IHx8ICcyZCc7XG4gICAgICBpZiAodHlwZW9mIG5ld0NhbnZhcy5nZXRDb250ZXh0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHNwZWNpZmllZCB7IGNhbnZhcyB9IGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhIGdldENvbnRleHQoKSBmdW5jdGlvbiwgbWF5YmUgaXQgaXMgbm90IGEgPGNhbnZhcz4gdGFnP2ApO1xuICAgICAgfVxuICAgICAgY29udGV4dCA9IGdldENhbnZhc0NvbnRleHQodHlwZSwgYXNzaWduKHt9LCBzZXR0aW5ncy5hdHRyaWJ1dGVzLCB7IGNhbnZhczogbmV3Q2FudmFzIH0pKTtcbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCBhdCBjYW52YXMuZ2V0Q29udGV4dCgnJHt0eXBlfScpIC0gdGhlIGJyb3dzZXIgbWF5IG5vdCBzdXBwb3J0IHRoaXMgY29udGV4dCwgb3IgYSBkaWZmZXJlbnQgY29udGV4dCBtYXkgYWxyZWFkeSBiZSBpbiB1c2Ugd2l0aCB0aGlzIGNhbnZhcy5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYW52YXMgPSBjb250ZXh0LmNhbnZhcztcbiAgICAvLyBFbnN1cmUgY29udGV4dCBtYXRjaGVzIHVzZXIncyBjYW52YXMgZXhwZWN0YXRpb25zXG4gICAgaWYgKHNldHRpbmdzLmNhbnZhcyAmJiBjYW52YXMgIT09IHNldHRpbmdzLmNhbnZhcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgeyBjYW52YXMgfSBhbmQgeyBjb250ZXh0IH0gc2V0dGluZ3MgbXVzdCBwb2ludCB0byB0aGUgc2FtZSB1bmRlcmx5aW5nIGNhbnZhcyBlbGVtZW50Jyk7XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgcGl4ZWxhdGlvbiB0byBjYW52YXMgaWYgbmVjZXNzYXJ5LCB0aGlzIGlzIG1vc3RseSBhIGNvbnZlbmllbmNlIHV0aWxpdHlcbiAgICBpZiAoc2V0dGluZ3MucGl4ZWxhdGVkKSB7XG4gICAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgY29udGV4dC5tb3pJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRleHQub0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNvbnRleHQubXNJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgIGNhbnZhcy5zdHlsZVsnaW1hZ2UtcmVuZGVyaW5nJ10gPSAncGl4ZWxhdGVkJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgY2FudmFzLCBjb250ZXh0LCBvd25zQ2FudmFzIH07XG59XG4iLCJpbXBvcnQgYXNzaWduIGZyb20gJ29iamVjdC1hc3NpZ24nO1xuaW1wb3J0IHJpZ2h0Tm93IGZyb20gJ3JpZ2h0LW5vdyc7XG5pbXBvcnQgaXNQcm9taXNlIGZyb20gJ2lzLXByb21pc2UnO1xuaW1wb3J0IHsgaXNCcm93c2VyLCBkZWZpbmVkLCBpc1dlYkdMQ29udGV4dCwgaXNDYW52YXMsIGdldENsaWVudEFQSSB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IGRlZXBFcXVhbCBmcm9tICdkZWVwLWVxdWFsJztcbmltcG9ydCB7XG4gIHJlc29sdmVGaWxlbmFtZSxcbiAgc2F2ZUZpbGUsXG4gIHNhdmVEYXRhVVJMLFxuICBnZXRUaW1lU3RhbXAsXG4gIGV4cG9ydENhbnZhcyxcbiAgc3RyZWFtU3RhcnQsXG4gIHN0cmVhbUVuZFxufSBmcm9tICcuLi9zYXZlJztcbmltcG9ydCB7IGNoZWNrU2V0dGluZ3MgfSBmcm9tICcuLi9hY2Nlc3NpYmlsaXR5JztcblxuaW1wb3J0IGtleWJvYXJkU2hvcnRjdXRzIGZyb20gJy4va2V5Ym9hcmRTaG9ydGN1dHMnO1xuaW1wb3J0IHJlc2l6ZUNhbnZhcyBmcm9tICcuL3Jlc2l6ZUNhbnZhcyc7XG5pbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vY3JlYXRlQ2FudmFzJztcblxuY2xhc3MgU2tldGNoTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuICAgIHRoaXMuX3Byb3BzID0ge307XG4gICAgdGhpcy5fc2tldGNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3JhZiA9IG51bGw7XG4gICAgdGhpcy5fcmVjb3JkVGltZW91dCA9IG51bGw7XG5cbiAgICAvLyBTb21lIGhhY2t5IHRoaW5ncyByZXF1aXJlZCB0byBnZXQgYXJvdW5kIHA1LmpzIHN0cnVjdHVyZVxuICAgIHRoaXMuX2xhc3RSZWRyYXdSZXN1bHQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5faXNQNVJlc2l6aW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLl9rZXlib2FyZFNob3J0Y3V0cyA9IGtleWJvYXJkU2hvcnRjdXRzKHtcbiAgICAgIGVuYWJsZWQ6ICgpID0+IHRoaXMuc2V0dGluZ3MuaG90a2V5cyAhPT0gZmFsc2UsXG4gICAgICBzYXZlOiAoZXYpID0+IHtcbiAgICAgICAgaWYgKGV2LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgaWYgKHRoaXMucHJvcHMucmVjb3JkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmVuZFJlY29yZCgpO1xuICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgICB9IGVsc2UgdGhpcy5yZWNvcmQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5yZWNvcmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmV4cG9ydEZyYW1lKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2dnbGVQbGF5OiAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnBsYXlpbmcpIHRoaXMucGF1c2UoKTtcbiAgICAgICAgZWxzZSB0aGlzLnBsYXkoKTtcbiAgICAgIH0sXG4gICAgICBjb21taXQ6IChldikgPT4ge1xuICAgICAgICB0aGlzLmV4cG9ydEZyYW1lKHsgY29tbWl0OiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fYW5pbWF0ZUhhbmRsZXIgPSAoKSA9PiB0aGlzLmFuaW1hdGUoKTtcblxuICAgIHRoaXMuX3Jlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjaGFuZ2VkID0gdGhpcy5yZXNpemUoKTtcbiAgICAgIC8vIE9ubHkgcmUtcmVuZGVyIHdoZW4gc2l6ZSBhY3R1YWxseSBjaGFuZ2VzXG4gICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgc2tldGNoICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2tldGNoO1xuICB9XG5cbiAgZ2V0IHNldHRpbmdzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3M7XG4gIH1cblxuICBnZXQgcHJvcHMgKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wcztcbiAgfVxuXG4gIF9jb21wdXRlUGxheWhlYWQgKGN1cnJlbnRUaW1lLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IGhhc0R1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShkdXJhdGlvbik7XG4gICAgcmV0dXJuIGhhc0R1cmF0aW9uID8gY3VycmVudFRpbWUgLyBkdXJhdGlvbiA6IDA7XG4gIH1cblxuICBfY29tcHV0ZUZyYW1lIChwbGF5aGVhZCwgdGltZSwgdG90YWxGcmFtZXMsIGZwcykge1xuICAgIHJldHVybiAoaXNGaW5pdGUodG90YWxGcmFtZXMpICYmIHRvdGFsRnJhbWVzID4gMSlcbiAgICAgID8gTWF0aC5mbG9vcihwbGF5aGVhZCAqICh0b3RhbEZyYW1lcyAtIDEpKVxuICAgICAgOiBNYXRoLmZsb29yKGZwcyAqIHRpbWUpO1xuICB9XG5cbiAgX2NvbXB1dGVDdXJyZW50RnJhbWUgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb21wdXRlRnJhbWUoXG4gICAgICB0aGlzLnByb3BzLnBsYXloZWFkLCB0aGlzLnByb3BzLnRpbWUsXG4gICAgICB0aGlzLnByb3BzLnRvdGFsRnJhbWVzLCB0aGlzLnByb3BzLmZwc1xuICAgICk7XG4gIH1cblxuICBfZ2V0U2l6ZVByb3BzICgpIHtcbiAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuICAgICAgcGl4ZWxSYXRpbzogcHJvcHMucGl4ZWxSYXRpbyxcbiAgICAgIGNhbnZhc1dpZHRoOiBwcm9wcy5jYW52YXNXaWR0aCxcbiAgICAgIGNhbnZhc0hlaWdodDogcHJvcHMuY2FudmFzSGVpZ2h0LFxuICAgICAgdmlld3BvcnRXaWR0aDogcHJvcHMudmlld3BvcnRXaWR0aCxcbiAgICAgIHZpZXdwb3J0SGVpZ2h0OiBwcm9wcy52aWV3cG9ydEhlaWdodFxuICAgIH07XG4gIH1cblxuICBydW4gKCkge1xuICAgIGlmICghdGhpcy5za2V0Y2gpIHRocm93IG5ldyBFcnJvcignc2hvdWxkIHdhaXQgdW50aWwgc2tldGNoIGlzIGxvYWRlZCBiZWZvcmUgdHJ5aW5nIHRvIHBsYXkoKScpO1xuXG4gICAgLy8gU3RhcnQgYW4gYW5pbWF0aW9uIGZyYW1lIGxvb3AgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucGxheWluZyAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8vIExldCdzIGxldCB0aGlzIHdhcm5pbmcgaGFuZyBhcm91bmQgZm9yIGEgZmV3IHZlcnNpb25zLi4uXG4gICAgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaC5kaXNwb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0luIGNhbnZhcy1za2V0Y2hAMC4wLjIzIHRoZSBkaXNwb3NlKCkgZXZlbnQgaGFzIGJlZW4gcmVuYW1lZCB0byB1bmxvYWQoKScpO1xuICAgIH1cblxuICAgIC8vIEluIGNhc2Ugd2UgYXJlbid0IHBsYXlpbmcgb3IgYW5pbWF0ZWQsIG1ha2Ugc3VyZSB3ZSBzdGlsbCB0cmlnZ2VyIGJlZ2luIG1lc3NhZ2UuLi5cbiAgICBpZiAoIXRoaXMucHJvcHMuc3RhcnRlZCkge1xuICAgICAgdGhpcy5fc2lnbmFsQmVnaW4oKTtcbiAgICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIGFuIGluaXRpYWwgZnJhbWVcbiAgICB0aGlzLnRpY2soKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgX2NhbmNlbFRpbWVvdXRzICgpIHtcbiAgICBpZiAodGhpcy5fcmFmICE9IG51bGwgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JhZik7XG4gICAgICB0aGlzLl9yYWYgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcmVjb3JkVGltZW91dCAhPSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVjb3JkVGltZW91dCk7XG4gICAgICB0aGlzLl9yZWNvcmRUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBsZXQgYW5pbWF0ZSA9IHRoaXMuc2V0dGluZ3MuYW5pbWF0ZTtcbiAgICBpZiAoJ2FuaW1hdGlvbicgaW4gdGhpcy5zZXR0aW5ncykge1xuICAgICAgYW5pbWF0ZSA9IHRydWU7XG4gICAgICBjb25zb2xlLndhcm4oJ1tjYW52YXMtc2tldGNoXSB7IGFuaW1hdGlvbiB9IGhhcyBiZWVuIHJlbmFtZWQgdG8geyBhbmltYXRlIH0nKTtcbiAgICB9XG4gICAgaWYgKCFhbmltYXRlKSByZXR1cm47XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuICAgICAgY29uc29sZS5lcnJvcignW2NhbnZhcy1za2V0Y2hdIFdBUk46IFVzaW5nIHsgYW5pbWF0ZSB9IGluIE5vZGUuanMgaXMgbm90IHlldCBzdXBwb3J0ZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMucGxheWluZykgcmV0dXJuO1xuICAgIGlmICghdGhpcy5wcm9wcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLl9zaWduYWxCZWdpbigpO1xuICAgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZygncGxheScsIHRoaXMucHJvcHMudGltZSlcblxuICAgIC8vIFN0YXJ0IGEgcmVuZGVyIGxvb3BcbiAgICB0aGlzLnByb3BzLnBsYXlpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG4gICAgdGhpcy5fbGFzdFRpbWUgPSByaWdodE5vdygpO1xuICAgIHRoaXMuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0ZUhhbmRsZXIpO1xuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnJlY29yZGluZykgdGhpcy5lbmRSZWNvcmQoKTtcbiAgICB0aGlzLnByb3BzLnBsYXlpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG4gIH1cblxuICB0b2dnbGVQbGF5ICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wbGF5aW5nKSB0aGlzLnBhdXNlKCk7XG4gICAgZWxzZSB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIC8vIFN0b3AgYW5kIHJlc2V0IHRvIGZyYW1lIHplcm9cbiAgc3RvcCAoKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMucHJvcHMuZnJhbWUgPSAwO1xuICAgIHRoaXMucHJvcHMucGxheWhlYWQgPSAwO1xuICAgIHRoaXMucHJvcHMudGltZSA9IDA7XG4gICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZWNvcmQgKCkge1xuICAgIGlmICh0aGlzLnByb3BzLnJlY29yZGluZykgcmV0dXJuO1xuICAgIGlmICghaXNCcm93c2VyKCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tjYW52YXMtc2tldGNoXSBXQVJOOiBSZWNvcmRpbmcgZnJvbSBOb2RlLmpzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy5wcm9wcy5wbGF5aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnByb3BzLnJlY29yZGluZyA9IHRydWU7XG5cbiAgICBjb25zdCBleHBvcnRPcHRzID0gdGhpcy5fY3JlYXRlRXhwb3J0T3B0aW9ucyh7IHNlcXVlbmNlOiB0cnVlIH0pO1xuXG4gICAgY29uc3QgZnJhbWVJbnRlcnZhbCA9IDEgLyB0aGlzLnByb3BzLmZwcztcbiAgICAvLyBSZW5kZXIgZWFjaCBmcmFtZSBpbiB0aGUgc2VxdWVuY2VcbiAgICB0aGlzLl9jYW5jZWxUaW1lb3V0cygpO1xuICAgIGNvbnN0IHRpY2sgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMucmVjb3JkaW5nKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB0aGlzLnByb3BzLmRlbHRhVGltZSA9IGZyYW1lSW50ZXJ2YWw7XG4gICAgICB0aGlzLnRpY2soKTtcbiAgICAgIHJldHVybiB0aGlzLmV4cG9ydEZyYW1lKGV4cG9ydE9wdHMpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMucHJvcHMucmVjb3JkaW5nKSByZXR1cm47IC8vIHdhcyBjYW5jZWxsZWQgYmVmb3JlXG4gICAgICAgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuICAgICAgICAgIHRoaXMucHJvcHMuZnJhbWUrKztcbiAgICAgICAgICBpZiAodGhpcy5wcm9wcy5mcmFtZSA8IHRoaXMucHJvcHMudG90YWxGcmFtZXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMudGltZSArPSBmcmFtZUludGVydmFsO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5wbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZCh0aGlzLnByb3BzLnRpbWUsIHRoaXMucHJvcHMuZHVyYXRpb24pO1xuICAgICAgICAgICAgdGhpcy5fcmVjb3JkVGltZW91dCA9IHNldFRpbWVvdXQodGljaywgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGaW5pc2hlZCByZWNvcmRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMuX3NpZ25hbEVuZCgpO1xuICAgICAgICAgICAgdGhpcy5lbmRSZWNvcmQoKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5ydW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBUcmlnZ2VyIGEgc3RhcnQgZXZlbnQgYmVmb3JlIHdlIGJlZ2luIHJlY29yZGluZ1xuICAgIGlmICghdGhpcy5wcm9wcy5zdGFydGVkKSB7XG4gICAgICB0aGlzLl9zaWduYWxCZWdpbigpO1xuICAgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyICdiZWdpbiByZWNvcmQnIGV2ZW50XG4gICAgaWYgKHRoaXMuc2tldGNoICYmIHR5cGVvZiB0aGlzLnNrZXRjaC5iZWdpblJlY29yZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZShwcm9wcyA9PiB0aGlzLnNrZXRjaC5iZWdpblJlY29yZChwcm9wcykpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYXRlIGEgc3RyZWFtaW5nIHN0YXJ0IGlmIG5lY2Vzc2FyeVxuICAgIHN0cmVhbVN0YXJ0KGV4cG9ydE9wdHMpXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5fcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgX3NpZ25hbEJlZ2luICgpIHtcbiAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLmJlZ2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKHByb3BzID0+IHRoaXMuc2tldGNoLmJlZ2luKHByb3BzKSk7XG4gICAgfVxuICB9XG5cbiAgX3NpZ25hbEVuZCAoKSB7XG4gICAgaWYgKHRoaXMuc2tldGNoICYmIHR5cGVvZiB0aGlzLnNrZXRjaC5lbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3dyYXBDb250ZXh0U2NhbGUocHJvcHMgPT4gdGhpcy5za2V0Y2guZW5kKHByb3BzKSk7XG4gICAgfVxuICB9XG5cbiAgZW5kUmVjb3JkICgpIHtcbiAgICBjb25zdCB3YXNSZWNvcmRpbmcgPSB0aGlzLnByb3BzLnJlY29yZGluZztcblxuICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG4gICAgdGhpcy5wcm9wcy5yZWNvcmRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByb3BzLmRlbHRhVGltZSA9IDA7XG4gICAgdGhpcy5wcm9wcy5wbGF5aW5nID0gZmFsc2U7XG5cbiAgICAvLyB0ZWxsIENMSSB0aGF0IHN0cmVhbSBoYXMgZmluaXNoZWRcbiAgICByZXR1cm4gc3RyZWFtRW5kKClcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBUcmlnZ2VyICdlbmQgcmVjb3JkJyBldmVudFxuICAgICAgICBpZiAod2FzUmVjb3JkaW5nICYmIHRoaXMuc2tldGNoICYmIHR5cGVvZiB0aGlzLnNrZXRjaC5lbmRSZWNvcmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKHByb3BzID0+IHRoaXMuc2tldGNoLmVuZFJlY29yZChwcm9wcykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIF9jcmVhdGVFeHBvcnRPcHRpb25zIChvcHQgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXF1ZW5jZTogb3B0LnNlcXVlbmNlLFxuICAgICAgc2F2ZTogb3B0LnNhdmUsXG4gICAgICBmcHM6IHRoaXMucHJvcHMuZnBzLFxuICAgICAgZnJhbWU6IG9wdC5zZXF1ZW5jZSA/IHRoaXMucHJvcHMuZnJhbWUgOiB1bmRlZmluZWQsXG4gICAgICBmaWxlOiB0aGlzLnNldHRpbmdzLmZpbGUsXG4gICAgICBuYW1lOiB0aGlzLnNldHRpbmdzLm5hbWUsXG4gICAgICBwcmVmaXg6IHRoaXMuc2V0dGluZ3MucHJlZml4LFxuICAgICAgc3VmZml4OiB0aGlzLnNldHRpbmdzLnN1ZmZpeCxcbiAgICAgIGVuY29kaW5nOiB0aGlzLnNldHRpbmdzLmVuY29kaW5nLFxuICAgICAgZW5jb2RpbmdRdWFsaXR5OiB0aGlzLnNldHRpbmdzLmVuY29kaW5nUXVhbGl0eSxcbiAgICAgIHRpbWVTdGFtcDogb3B0LnRpbWVTdGFtcCB8fCBnZXRUaW1lU3RhbXAoKSxcbiAgICAgIHRvdGFsRnJhbWVzOiBpc0Zpbml0ZSh0aGlzLnByb3BzLnRvdGFsRnJhbWVzKSA/IE1hdGgubWF4KDAsIHRoaXMucHJvcHMudG90YWxGcmFtZXMpIDogMTAwMFxuICAgIH07XG4gIH1cblxuICBleHBvcnRGcmFtZSAob3B0ID0ge30pIHtcbiAgICBpZiAoIXRoaXMuc2tldGNoKSByZXR1cm4gUHJvbWlzZS5hbGwoW10pO1xuICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2gucHJlRXhwb3J0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNrZXRjaC5wcmVFeHBvcnQoKTtcbiAgICB9XG5cbiAgICAvLyBPcHRpb25zIGZvciBleHBvcnQgZnVuY3Rpb25cbiAgICBsZXQgZXhwb3J0T3B0cyA9IHRoaXMuX2NyZWF0ZUV4cG9ydE9wdGlvbnMob3B0KTtcblxuICAgIGNvbnN0IGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuICAgIGxldCBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKGNsaWVudCAmJiBvcHQuY29tbWl0ICYmIHR5cGVvZiBjbGllbnQuY29tbWl0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBjb21taXRPcHRzID0gYXNzaWduKHt9LCBleHBvcnRPcHRzKTtcbiAgICAgIGNvbnN0IGhhc2ggPSBjbGllbnQuY29tbWl0KGNvbW1pdE9wdHMpO1xuICAgICAgaWYgKGlzUHJvbWlzZShoYXNoKSkgcCA9IGhhc2g7XG4gICAgICBlbHNlIHAgPSBQcm9taXNlLnJlc29sdmUoaGFzaCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHAudGhlbihoYXNoID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl9kb0V4cG9ydEZyYW1lKGFzc2lnbih7fSwgZXhwb3J0T3B0cywgeyBoYXNoOiBoYXNoIHx8ICcnIH0pKTtcbiAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAvLyBNb3N0IGNvbW1vbiB1c2VjYXNlIGlzIHRvIGV4cG9ydCBhIHNpbmdsZSBsYXllcixcbiAgICAgIC8vIHNvIGxldCdzIG9wdGltaXplIHRoZSB1c2VyIGV4cGVyaWVuY2UgZm9yIHRoYXQuXG4gICAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuIHJlc3VsdFswXTtcbiAgICAgIGVsc2UgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfVxuXG4gIF9kb0V4cG9ydEZyYW1lIChleHBvcnRPcHRzID0ge30pIHtcbiAgICB0aGlzLl9wcm9wcy5leHBvcnRpbmcgPSB0cnVlO1xuXG4gICAgLy8gUmVzaXplIHRvIG91dHB1dCByZXNvbHV0aW9uXG4gICAgdGhpcy5yZXNpemUoKTtcblxuICAgIC8vIERyYXcgYXQgdGhpcyBvdXRwdXQgcmVzb2x1dGlvblxuICAgIGxldCBkcmF3UmVzdWx0ID0gdGhpcy5yZW5kZXIoKTtcblxuICAgIC8vIFRoZSBzZWxmIG93bmVkIGNhbnZhcyAobWF5IGJlIHVuZGVmaW5lZC4uLiEpXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5wcm9wcy5jYW52YXM7XG5cbiAgICAvLyBHZXQgbGlzdCBvZiByZXN1bHRzIGZyb20gcmVuZGVyXG4gICAgaWYgKHR5cGVvZiBkcmF3UmVzdWx0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZHJhd1Jlc3VsdCA9IFsgY2FudmFzIF07XG4gICAgfVxuICAgIGRyYXdSZXN1bHQgPSBbXS5jb25jYXQoZHJhd1Jlc3VsdCkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgLy8gVHJhbnNmb3JtIHRoZSBjYW52YXMvZmlsZSBkZXNjcmlwdG9ycyBpbnRvIGEgY29uc2lzdGVudCBmb3JtYXQsXG4gICAgLy8gYW5kIHB1bGwgb3V0IGFueSBkYXRhIFVSTHMgZnJvbSBjYW52YXMgZWxlbWVudHNcbiAgICBkcmF3UmVzdWx0ID0gZHJhd1Jlc3VsdC5tYXAocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IGhhc0RhdGFPYmplY3QgPSB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyAmJiByZXN1bHQgJiYgKCdkYXRhJyBpbiByZXN1bHQgfHwgJ2RhdGFVUkwnIGluIHJlc3VsdCk7XG4gICAgICBjb25zdCBkYXRhID0gaGFzRGF0YU9iamVjdCA/IHJlc3VsdC5kYXRhIDogcmVzdWx0O1xuICAgICAgY29uc3Qgb3B0cyA9IGhhc0RhdGFPYmplY3QgPyBhc3NpZ24oe30sIHJlc3VsdCwgeyBkYXRhIH0pIDogeyBkYXRhIH07XG4gICAgICBpZiAoaXNDYW52YXMoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgZW5jb2RpbmcgPSBvcHRzLmVuY29kaW5nIHx8IGV4cG9ydE9wdHMuZW5jb2Rpbmc7XG4gICAgICAgIGNvbnN0IGVuY29kaW5nUXVhbGl0eSA9IGRlZmluZWQob3B0cy5lbmNvZGluZ1F1YWxpdHksIGV4cG9ydE9wdHMuZW5jb2RpbmdRdWFsaXR5LCAwLjk1KTtcbiAgICAgICAgY29uc3QgeyBkYXRhVVJMLCBleHRlbnNpb24sIHR5cGUgfSA9IGV4cG9ydENhbnZhcyhkYXRhLCB7IGVuY29kaW5nLCBlbmNvZGluZ1F1YWxpdHkgfSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG9wdHMsIHsgZGF0YVVSTCwgZXh0ZW5zaW9uLCB0eXBlIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBOb3cgcmV0dXJuIHRvIHJlZ3VsYXIgcmVuZGVyaW5nIG1vZGVcbiAgICB0aGlzLl9wcm9wcy5leHBvcnRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAvLyBBbmQgbm93IHdlIGNhbiBzYXZlIGVhY2ggcmVzdWx0XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGRyYXdSZXN1bHQubWFwKChyZXN1bHQsIGksIGxheWVyTGlzdCkgPT4ge1xuICAgICAgLy8gQnkgZGVmYXVsdCwgaWYgcmVuZGVyaW5nIG11bHRpcGxlIGxheWVycyB3ZSB3aWxsIGdpdmUgdGhlbSBpbmRpY2VzXG4gICAgICBjb25zdCBjdXJPcHQgPSBhc3NpZ24oe1xuICAgICAgICBleHRlbnNpb246ICcnLFxuICAgICAgICBwcmVmaXg6ICcnLFxuICAgICAgICBzdWZmaXg6ICcnXG4gICAgICB9LCBleHBvcnRPcHRzLCByZXN1bHQsIHtcbiAgICAgICAgbGF5ZXI6IGksXG4gICAgICAgIHRvdGFsTGF5ZXJzOiBsYXllckxpc3QubGVuZ3RoXG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgZXhwb3J0IGlzIGV4cGxpY2l0bHkgbm90IHNhdmluZywgbWFrZSBzdXJlIG5vdGhpbmcgc2F2ZXNcbiAgICAgIC8vIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBsYXllciBzYXZlIG9wdGlvbiwgb3IgZmFsbGJhY2sgdG8gdHJ1ZVxuICAgICAgY29uc3Qgc2F2ZVBhcmFtID0gZXhwb3J0T3B0cy5zYXZlID09PSBmYWxzZSA/IGZhbHNlIDogcmVzdWx0LnNhdmU7XG4gICAgICBjdXJPcHQuc2F2ZSA9IHNhdmVQYXJhbSAhPT0gZmFsc2U7XG5cbiAgICAgIC8vIFJlc29sdmUgYSBmdWxsIGZpbGVuYW1lIGZyb20gYWxsIHRoZSBvcHRpb25zXG4gICAgICBjdXJPcHQuZmlsZW5hbWUgPSByZXNvbHZlRmlsZW5hbWUoY3VyT3B0KTtcblxuICAgICAgLy8gQ2xlYW4gdXAgc29tZSBwYXJhbWV0ZXJzIHRoYXQgbWF5IGJlIGFtYmlndW91cyB0byB0aGUgdXNlclxuICAgICAgZGVsZXRlIGN1ck9wdC5lbmNvZGluZztcbiAgICAgIGRlbGV0ZSBjdXJPcHQuZW5jb2RpbmdRdWFsaXR5O1xuXG4gICAgICAvLyBDbGVhbiBpdCB1cCBmdXJ0aGVyIGJ5IGp1c3QgcmVtb3ZpbmcgdW5kZWZpbmVkIHZhbHVlc1xuICAgICAgZm9yIChsZXQgayBpbiBjdXJPcHQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjdXJPcHRba10gPT09ICd1bmRlZmluZWQnKSBkZWxldGUgY3VyT3B0W2tdO1xuICAgICAgfVxuXG4gICAgICBsZXQgc2F2ZVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoe30pO1xuICAgICAgaWYgKGN1ck9wdC5zYXZlKSB7XG4gICAgICAgIC8vIFdoZXRoZXIgdG8gYWN0dWFsbHkgc2F2ZSAoZG93bmxvYWQpIHRoaXMgZnJhZ21lbnRcbiAgICAgICAgY29uc3QgZGF0YSA9IGN1ck9wdC5kYXRhO1xuICAgICAgICBpZiAoY3VyT3B0LmRhdGFVUkwpIHtcbiAgICAgICAgICBjb25zdCBkYXRhVVJMID0gY3VyT3B0LmRhdGFVUkw7XG4gICAgICAgICAgc2F2ZVByb21pc2UgPSBzYXZlRGF0YVVSTChkYXRhVVJMLCBjdXJPcHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNhdmVQcm9taXNlID0gc2F2ZUZpbGUoZGF0YSwgY3VyT3B0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNhdmVQcm9taXNlLnRoZW4oc2F2ZVJlc3VsdCA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjdXJPcHQsIHNhdmVSZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSkpLnRoZW4oZXYgPT4ge1xuICAgICAgY29uc3Qgc2F2ZWRFdmVudHMgPSBldi5maWx0ZXIoZSA9PiBlLnNhdmUpO1xuICAgICAgaWYgKHNhdmVkRXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gTG9nIHRoZSBzYXZlZCBleHBvcnRzXG4gICAgICAgIGNvbnN0IGV2ZW50V2l0aE91dHB1dCA9IHNhdmVkRXZlbnRzLmZpbmQoZSA9PiBlLm91dHB1dE5hbWUpO1xuICAgICAgICBjb25zdCBpc0NsaWVudCA9IHNhdmVkRXZlbnRzLnNvbWUoZSA9PiBlLmNsaWVudCk7XG4gICAgICAgIGNvbnN0IGlzU3RyZWFtaW5nID0gc2F2ZWRFdmVudHMuc29tZShlID0+IGUuc3RyZWFtKTtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIC8vIG1hbnkgZmlsZXMsIGp1c3QgbG9nIGhvdyBtYW55IHdlcmUgZXhwb3J0ZWRcbiAgICAgICAgaWYgKHNhdmVkRXZlbnRzLmxlbmd0aCA+IDEpIGl0ZW0gPSBzYXZlZEV2ZW50cy5sZW5ndGg7XG4gICAgICAgIC8vIGluIENMSSwgd2Uga25vdyBleGFjdCBwYXRoIGRpcm5hbWVcbiAgICAgICAgZWxzZSBpZiAoZXZlbnRXaXRoT3V0cHV0KSBpdGVtID0gYCR7ZXZlbnRXaXRoT3V0cHV0Lm91dHB1dE5hbWV9LyR7c2F2ZWRFdmVudHNbMF0uZmlsZW5hbWV9YDtcbiAgICAgICAgLy8gaW4gYnJvd3Nlciwgd2UgY2FuIG9ubHkga25vdyBpdCB3ZW50IHRvIFwiYnJvd3NlciBkb3dubG9hZCBmb2xkZXJcIlxuICAgICAgICBlbHNlIGl0ZW0gPSBgJHtzYXZlZEV2ZW50c1swXS5maWxlbmFtZX1gO1xuICAgICAgICBsZXQgb2ZTZXEgPSAnJztcbiAgICAgICAgaWYgKGV4cG9ydE9wdHMuc2VxdWVuY2UpIHtcbiAgICAgICAgICBjb25zdCBoYXNUb3RhbEZyYW1lcyA9IGlzRmluaXRlKHRoaXMucHJvcHMudG90YWxGcmFtZXMpO1xuICAgICAgICAgIG9mU2VxID0gaGFzVG90YWxGcmFtZXMgPyBgIChmcmFtZSAke2V4cG9ydE9wdHMuZnJhbWUgKyAxfSAvICR7dGhpcy5wcm9wcy50b3RhbEZyYW1lc30pYCA6IGAgKGZyYW1lICR7ZXhwb3J0T3B0cy5mcmFtZX0pYDtcbiAgICAgICAgfSBlbHNlIGlmIChzYXZlZEV2ZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgb2ZTZXEgPSBgIGZpbGVzYDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbGllbnQgPSBpc0NsaWVudCA/ICdjYW52YXMtc2tldGNoLWNsaScgOiAnY2FudmFzLXNrZXRjaCc7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGlzU3RyZWFtaW5nID8gJ1N0cmVhbWluZyBpbnRvJyA6ICdFeHBvcnRlZCc7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlY1ske2NsaWVudH1dJWMgJHthY3Rpb259ICVjJHtpdGVtfSVjJHtvZlNlcX1gLCAnY29sb3I6ICM4ZThlOGU7JywgJ2NvbG9yOiBpbml0aWFsOycsICdmb250LXdlaWdodDogYm9sZDsnLCAnZm9udC13ZWlnaHQ6IGluaXRpYWw7Jyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2tldGNoLnBvc3RFeHBvcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5za2V0Y2gucG9zdEV4cG9ydCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2O1xuICAgIH0pO1xuICB9XG5cbiAgX3dyYXBDb250ZXh0U2NhbGUgKGNiKSB7XG4gICAgdGhpcy5fcHJlUmVuZGVyKCk7XG4gICAgY2IodGhpcy5wcm9wcyk7XG4gICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuICB9XG5cbiAgX3ByZVJlbmRlciAoKSB7XG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gU2NhbGUgY29udGV4dCBmb3IgdW5pdCBzaXppbmdcbiAgICBpZiAoIXRoaXMucHJvcHMuZ2wgJiYgcHJvcHMuY29udGV4dCAmJiAhcHJvcHMucDUpIHtcbiAgICAgIHByb3BzLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2NhbGVDb250ZXh0ICE9PSBmYWxzZSkge1xuICAgICAgICBwcm9wcy5jb250ZXh0LnNjYWxlKHByb3BzLnNjYWxlWCwgcHJvcHMuc2NhbGVZKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3BzLnA1KSB7XG4gICAgICBwcm9wcy5wNS5zY2FsZShwcm9wcy5zY2FsZVggLyBwcm9wcy5waXhlbFJhdGlvLCBwcm9wcy5zY2FsZVkgLyBwcm9wcy5waXhlbFJhdGlvKTtcbiAgICB9XG4gIH1cblxuICBfcG9zdFJlbmRlciAoKSB7XG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCF0aGlzLnByb3BzLmdsICYmIHByb3BzLmNvbnRleHQgJiYgIXByb3BzLnA1KSB7XG4gICAgICBwcm9wcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvLyBGbHVzaCBieSBkZWZhdWx0LCB0aGlzIG1heSBiZSByZXZpc2l0ZWQgYXQgYSBsYXRlciBwb2ludC5cbiAgICAvLyBXZSBkbyB0aGlzIHRvIGVuc3VyZSB0b0RhdGFVUkwgY2FuIGJlIGNhbGxlZCBpbW1lZGlhdGVseSBhZnRlci5cbiAgICAvLyBNb3N0IGxpa2VseSBicm93c2VycyBhbHJlYWR5IGhhbmRsZSB0aGlzLCBzbyB3ZSBtYXkgcmV2aXNpdCB0aGlzIGFuZFxuICAgIC8vIHJlbW92ZSBpdCBpZiBpdCBpbXByb3ZlcyBwZXJmb3JtYW5jZSB3aXRob3V0IGFueSB1c2FiaWxpdHkgaXNzdWVzLlxuICAgIGlmIChwcm9wcy5nbCAmJiB0aGlzLnNldHRpbmdzLmZsdXNoICE9PSBmYWxzZSAmJiAhcHJvcHMucDUpIHtcbiAgICAgIHByb3BzLmdsLmZsdXNoKCk7XG4gICAgfVxuICB9XG5cbiAgdGljayAoKSB7XG4gICAgaWYgKHRoaXMuc2tldGNoICYmIHR5cGVvZiB0aGlzLnNrZXRjaC50aWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9wcmVSZW5kZXIoKTtcbiAgICAgIHRoaXMuc2tldGNoLnRpY2sodGhpcy5wcm9wcyk7XG4gICAgICB0aGlzLl9wb3N0UmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5wNSkge1xuICAgICAgdGhpcy5fbGFzdFJlZHJhd1Jlc3VsdCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMucHJvcHMucDUucmVkcmF3KCk7XG4gICAgICByZXR1cm4gdGhpcy5fbGFzdFJlZHJhd1Jlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3VibWl0RHJhd0NhbGwoKTtcbiAgICB9XG4gIH1cblxuICBzdWJtaXREcmF3Q2FsbCAoKSB7XG4gICAgaWYgKCF0aGlzLnNrZXRjaCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuX3ByZVJlbmRlcigpO1xuXG4gICAgbGV0IGRyYXdSZXN1bHQ7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuc2tldGNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkcmF3UmVzdWx0ID0gdGhpcy5za2V0Y2gocHJvcHMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuc2tldGNoLnJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZHJhd1Jlc3VsdCA9IHRoaXMuc2tldGNoLnJlbmRlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuXG4gICAgcmV0dXJuIGRyYXdSZXN1bHQ7XG4gIH1cblxuICB1cGRhdGUgKG9wdCA9IHt9KSB7XG4gICAgLy8gQ3VycmVudGx5IHVwZGF0ZSgpIGlzIG9ubHkgZm9jdXNlZCBvbiByZXNpemluZyxcbiAgICAvLyBidXQgbGF0ZXIgd2Ugd2lsbCBzdXBwb3J0IG90aGVyIG9wdGlvbnMgbGlrZSBzd2l0Y2hpbmdcbiAgICAvLyBmcmFtZXMgYW5kIHN1Y2guXG4gICAgY29uc3Qgbm90WWV0U3VwcG9ydGVkID0gW1xuICAgICAgJ2FuaW1hdGUnXG4gICAgXTtcblxuICAgIE9iamVjdC5rZXlzKG9wdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKG5vdFlldFN1cHBvcnRlZC5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFNvcnJ5LCB0aGUgeyAke2tleX0gfSBvcHRpb24gaXMgbm90IHlldCBzdXBwb3J0ZWQgd2l0aCB1cGRhdGUoKS5gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG9sZENhbnZhcyA9IHRoaXMuX3NldHRpbmdzLmNhbnZhcztcbiAgICBjb25zdCBvbGRDb250ZXh0ID0gdGhpcy5fc2V0dGluZ3MuY29udGV4dDtcblxuICAgIC8vIE1lcmdlIG5ldyBvcHRpb25zIGludG8gc2V0dGluZ3NcbiAgICBmb3IgKGxldCBrZXkgaW4gb3B0KSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IG9wdFtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gaWdub3JlIHVuZGVmaW5lZFxuICAgICAgICB0aGlzLl9zZXR0aW5nc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWVyZ2UgaW4gdGltZSBwcm9wc1xuICAgIGNvbnN0IHRpbWVPcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fc2V0dGluZ3MsIG9wdCk7XG4gICAgaWYgKCd0aW1lJyBpbiBvcHQgJiYgJ2ZyYW1lJyBpbiBvcHQpIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IHsgdGltZSB9IG9yIHsgZnJhbWUgfSBidXQgbm90IGJvdGgnKTtcbiAgICBlbHNlIGlmICgndGltZScgaW4gb3B0KSBkZWxldGUgdGltZU9wdHMuZnJhbWU7XG4gICAgZWxzZSBpZiAoJ2ZyYW1lJyBpbiBvcHQpIGRlbGV0ZSB0aW1lT3B0cy50aW1lO1xuICAgIGlmICgnZHVyYXRpb24nIGluIG9wdCAmJiAndG90YWxGcmFtZXMnIGluIG9wdCkgdGhyb3cgbmV3IEVycm9yKCdZb3Ugc2hvdWxkIHNwZWNpZnkgeyBkdXJhdGlvbiB9IG9yIHsgdG90YWxGcmFtZXMgfSBidXQgbm90IGJvdGgnKTtcbiAgICBlbHNlIGlmICgnZHVyYXRpb24nIGluIG9wdCkgZGVsZXRlIHRpbWVPcHRzLnRvdGFsRnJhbWVzO1xuICAgIGVsc2UgaWYgKCd0b3RhbEZyYW1lcycgaW4gb3B0KSBkZWxldGUgdGltZU9wdHMuZHVyYXRpb247XG5cbiAgICAvLyBNZXJnZSBpbiB1c2VyIGRhdGEgd2l0aG91dCBjb3B5aW5nXG4gICAgaWYgKCdkYXRhJyBpbiBvcHQpIHRoaXMuX3Byb3BzLmRhdGEgPSBvcHQuZGF0YTtcblxuICAgIGNvbnN0IHRpbWVQcm9wcyA9IHRoaXMuZ2V0VGltZVByb3BzKHRpbWVPcHRzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Byb3BzLCB0aW1lUHJvcHMpO1xuXG4gICAgLy8gSWYgZWl0aGVyIGNhbnZhcyBvciBjb250ZXh0IGlzIGNoYW5nZWQsIHdlIHNob3VsZCByZS11cGRhdGVcbiAgICBpZiAob2xkQ2FudmFzICE9PSB0aGlzLl9zZXR0aW5ncy5jYW52YXMgfHwgb2xkQ29udGV4dCAhPT0gdGhpcy5fc2V0dGluZ3MuY29udGV4dCkge1xuICAgICAgY29uc3QgeyBjYW52YXMsIGNvbnRleHQgfSA9IGNyZWF0ZUNhbnZhcyh0aGlzLl9zZXR0aW5ncyk7XG5cbiAgICAgIHRoaXMucHJvcHMuY2FudmFzID0gY2FudmFzO1xuICAgICAgdGhpcy5wcm9wcy5jb250ZXh0ID0gY29udGV4dDtcblxuICAgICAgLy8gRGVsZXRlIG9yIGFkZCBhICdnbCcgcHJvcCBmb3IgY29udmVuaWVuY2VcbiAgICAgIHRoaXMuX3NldHVwR0xLZXkoKTtcblxuICAgICAgLy8gUmUtbW91bnQgdGhlIG5ldyBjYW52YXMgaWYgaXQgaGFzIG5vIHBhcmVudFxuICAgICAgdGhpcy5fYXBwZW5kQ2FudmFzSWZOZWVkZWQoKTtcbiAgICB9XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gc3VwcG9ydCBQNS5qc1xuICAgIGlmIChvcHQucDUgJiYgdHlwZW9mIG9wdC5wNSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5wcm9wcy5wNSA9IG9wdC5wNTtcbiAgICAgIHRoaXMucHJvcHMucDUuZHJhdyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUDVSZXNpemluZykgcmV0dXJuO1xuICAgICAgICB0aGlzLl9sYXN0UmVkcmF3UmVzdWx0ID0gdGhpcy5zdWJtaXREcmF3Q2FsbCgpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgcGxheWluZyBzdGF0ZSBpZiBuZWNlc3NhcnlcbiAgICBpZiAoJ3BsYXlpbmcnIGluIG9wdCkge1xuICAgICAgaWYgKG9wdC5wbGF5aW5nKSB0aGlzLnBsYXkoKTtcbiAgICAgIGVsc2UgdGhpcy5wYXVzZSgpO1xuICAgIH1cblxuICAgIGNoZWNrU2V0dGluZ3ModGhpcy5fc2V0dGluZ3MpO1xuXG4gICAgLy8gRHJhdyBuZXcgZnJhbWVcbiAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gICAgcmV0dXJuIHRoaXMucHJvcHM7XG4gIH1cblxuICByZXNpemUgKCkge1xuICAgIGNvbnN0IG9sZFNpemVzID0gdGhpcy5fZ2V0U2l6ZVByb3BzKCk7XG5cbiAgICBjb25zdCBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG4gICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gUmVjb21wdXRlIG5ldyBwcm9wZXJ0aWVzIGJhc2VkIG9uIGN1cnJlbnQgc2V0dXBcbiAgICBjb25zdCBuZXdQcm9wcyA9IHJlc2l6ZUNhbnZhcyhwcm9wcywgc2V0dGluZ3MpO1xuXG4gICAgLy8gQXNzaWduIHRvIGN1cnJlbnQgcHJvcHNcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Byb3BzLCBuZXdQcm9wcyk7XG5cbiAgICAvLyBOb3cgd2UgYWN0dWFsbHkgdXBkYXRlIHRoZSBjYW52YXMgd2lkdGgvaGVpZ2h0IGFuZCBzdHlsZSBwcm9wc1xuICAgIGNvbnN0IHtcbiAgICAgIHBpeGVsUmF0aW8sXG4gICAgICBjYW52YXNXaWR0aCxcbiAgICAgIGNhbnZhc0hlaWdodCxcbiAgICAgIHN0eWxlV2lkdGgsXG4gICAgICBzdHlsZUhlaWdodFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gVXBkYXRlIGNhbnZhcyBzZXR0aW5nc1xuICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMucHJvcHMuY2FudmFzO1xuICAgIGlmIChjYW52YXMgJiYgc2V0dGluZ3MucmVzaXplQ2FudmFzICE9PSBmYWxzZSkge1xuICAgICAgaWYgKHByb3BzLnA1KSB7XG4gICAgICAgIC8vIFA1LmpzIHNwZWNpZmljIGVkZ2UgY2FzZVxuICAgICAgICBpZiAoY2FudmFzLndpZHRoICE9PSBjYW52YXNXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBjYW52YXNIZWlnaHQpIHtcbiAgICAgICAgICB0aGlzLl9pc1A1UmVzaXppbmcgPSB0cnVlO1xuICAgICAgICAgIC8vIFRoaXMgY2F1c2VzIGEgcmUtZHJhdyA6XFwgc28gd2UgaWdub3JlIGRyYXdzIGluIHRoZSBtZWFuIHRpbWUuLi4gc29ydGEgaGFja3lcbiAgICAgICAgICBwcm9wcy5wNS5waXhlbERlbnNpdHkocGl4ZWxSYXRpbyk7XG4gICAgICAgICAgcHJvcHMucDUucmVzaXplQ2FudmFzKGNhbnZhc1dpZHRoIC8gcGl4ZWxSYXRpbywgY2FudmFzSGVpZ2h0IC8gcGl4ZWxSYXRpbywgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuX2lzUDVSZXNpemluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3JjZSBjYW52YXMgc2l6ZVxuICAgICAgICBpZiAoY2FudmFzLndpZHRoICE9PSBjYW52YXNXaWR0aCkgY2FudmFzLndpZHRoID0gY2FudmFzV2lkdGg7XG4gICAgICAgIGlmIChjYW52YXMuaGVpZ2h0ICE9PSBjYW52YXNIZWlnaHQpIGNhbnZhcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgY2FudmFzIHN0eWxlXG4gICAgICBpZiAoaXNCcm93c2VyKCkgJiYgc2V0dGluZ3Muc3R5bGVDYW52YXMgIT09IGZhbHNlKSB7XG4gICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3N0eWxlV2lkdGh9cHhgO1xuICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c3R5bGVIZWlnaHR9cHhgO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5ld1NpemVzID0gdGhpcy5fZ2V0U2l6ZVByb3BzKCk7XG4gICAgbGV0IGNoYW5nZWQgPSAhZGVlcEVxdWFsKG9sZFNpemVzLCBuZXdTaXplcyk7XG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX3NpemVDaGFuZ2VkKCk7XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VkO1xuICB9XG5cbiAgX3NpemVDaGFuZ2VkICgpIHtcbiAgICAvLyBTZW5kIHJlc2l6ZSBldmVudCB0byBza2V0Y2hcbiAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLnJlc2l6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5za2V0Y2gucmVzaXplKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGUgKCkge1xuICAgIGlmICghdGhpcy5wcm9wcy5wbGF5aW5nKSByZXR1cm47XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuICAgICAgY29uc29sZS5lcnJvcignW2NhbnZhcy1za2V0Y2hdIFdBUk46IEFuaW1hdGlvbiBpbiBOb2RlLmpzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0ZUhhbmRsZXIpO1xuXG4gICAgbGV0IG5vdyA9IHJpZ2h0Tm93KCk7XG5cbiAgICBjb25zdCBmcHMgPSB0aGlzLnByb3BzLmZwcztcbiAgICBjb25zdCBmcmFtZUludGVydmFsTVMgPSAxMDAwIC8gZnBzO1xuICAgIGxldCBkZWx0YVRpbWVNUyA9IG5vdyAtIHRoaXMuX2xhc3RUaW1lO1xuXG4gICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLnByb3BzLmR1cmF0aW9uO1xuICAgIGNvbnN0IGhhc0R1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShkdXJhdGlvbik7XG5cbiAgICBsZXQgaXNOZXdGcmFtZSA9IHRydWU7XG4gICAgY29uc3QgcGxheWJhY2tSYXRlID0gdGhpcy5zZXR0aW5ncy5wbGF5YmFja1JhdGU7XG4gICAgaWYgKHBsYXliYWNrUmF0ZSA9PT0gJ2ZpeGVkJykge1xuICAgICAgZGVsdGFUaW1lTVMgPSBmcmFtZUludGVydmFsTVM7XG4gICAgfSBlbHNlIGlmIChwbGF5YmFja1JhdGUgPT09ICd0aHJvdHRsZScpIHtcbiAgICAgIGlmIChkZWx0YVRpbWVNUyA+IGZyYW1lSW50ZXJ2YWxNUykge1xuICAgICAgICBub3cgPSBub3cgLSAoZGVsdGFUaW1lTVMgJSBmcmFtZUludGVydmFsTVMpO1xuICAgICAgICB0aGlzLl9sYXN0VGltZSA9IG5vdztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzTmV3RnJhbWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFzdFRpbWUgPSBub3c7XG4gICAgfVxuXG4gICAgY29uc3QgZGVsdGFUaW1lID0gZGVsdGFUaW1lTVMgLyAxMDAwO1xuICAgIGxldCBuZXdUaW1lID0gdGhpcy5wcm9wcy50aW1lICsgZGVsdGFUaW1lICogdGhpcy5wcm9wcy50aW1lU2NhbGU7XG5cbiAgICAvLyBIYW5kbGUgcmV2ZXJzZSB0aW1lIHNjYWxlXG4gICAgaWYgKG5ld1RpbWUgPCAwICYmIGhhc0R1cmF0aW9uKSB7XG4gICAgICBuZXdUaW1lID0gZHVyYXRpb24gKyBuZXdUaW1lO1xuICAgIH1cblxuICAgIC8vIFJlLXN0YXJ0IGFuaW1hdGlvblxuICAgIGxldCBpc0ZpbmlzaGVkID0gZmFsc2U7XG4gICAgbGV0IGlzTG9vcFN0YXJ0ID0gZmFsc2U7XG5cbiAgICBjb25zdCBsb29waW5nID0gdGhpcy5zZXR0aW5ncy5sb29wICE9PSBmYWxzZTtcblxuICAgIGlmIChoYXNEdXJhdGlvbiAmJiBuZXdUaW1lID49IGR1cmF0aW9uKSB7XG4gICAgICAvLyBSZS1zdGFydCBhbmltYXRpb25cbiAgICAgIGlmIChsb29waW5nKSB7XG4gICAgICAgIGlzTmV3RnJhbWUgPSB0cnVlO1xuICAgICAgICBuZXdUaW1lID0gbmV3VGltZSAlIGR1cmF0aW9uO1xuICAgICAgICBpc0xvb3BTdGFydCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc05ld0ZyYW1lID0gZmFsc2U7XG4gICAgICAgIG5ld1RpbWUgPSBkdXJhdGlvbjtcbiAgICAgICAgaXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NpZ25hbEVuZCgpO1xuICAgIH1cblxuICAgIGlmIChpc05ld0ZyYW1lKSB7XG4gICAgICB0aGlzLnByb3BzLmRlbHRhVGltZSA9IGRlbHRhVGltZTtcbiAgICAgIHRoaXMucHJvcHMudGltZSA9IG5ld1RpbWU7XG4gICAgICB0aGlzLnByb3BzLnBsYXloZWFkID0gdGhpcy5fY29tcHV0ZVBsYXloZWFkKG5ld1RpbWUsIGR1cmF0aW9uKTtcbiAgICAgIGNvbnN0IGxhc3RGcmFtZSA9IHRoaXMucHJvcHMuZnJhbWU7XG4gICAgICB0aGlzLnByb3BzLmZyYW1lID0gdGhpcy5fY29tcHV0ZUN1cnJlbnRGcmFtZSgpO1xuICAgICAgaWYgKGlzTG9vcFN0YXJ0KSB0aGlzLl9zaWduYWxCZWdpbigpO1xuICAgICAgaWYgKGxhc3RGcmFtZSAhPT0gdGhpcy5wcm9wcy5mcmFtZSkgdGhpcy50aWNrKCk7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbmlzaGVkKSB7XG4gICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2ggKGNiKSB7XG4gICAgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IEVycm9yKCdtdXN0IHBhc3MgZnVuY3Rpb24gaW50byBkaXNwYXRjaCgpJyk7XG4gICAgY2IodGhpcy5wcm9wcyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIG1vdW50ICgpIHtcbiAgICB0aGlzLl9hcHBlbmRDYW52YXNJZk5lZWRlZCgpO1xuICB9XG5cbiAgdW5tb3VudCAoKSB7XG4gICAgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fcmVzaXplSGFuZGxlcik7XG4gICAgICB0aGlzLl9rZXlib2FyZFNob3J0Y3V0cy5kZXRhY2goKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuY2FudmFzLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMucHJvcHMuY2FudmFzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5wcm9wcy5jYW52YXMpO1xuICAgIH1cbiAgfVxuXG4gIF9hcHBlbmRDYW52YXNJZk5lZWRlZCAoKSB7XG4gICAgaWYgKCFpc0Jyb3dzZXIoKSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnBhcmVudCAhPT0gZmFsc2UgJiYgKHRoaXMucHJvcHMuY2FudmFzICYmICF0aGlzLnByb3BzLmNhbnZhcy5wYXJlbnRFbGVtZW50KSkge1xuICAgICAgY29uc3QgZGVmYXVsdFBhcmVudCA9IHRoaXMuc2V0dGluZ3MucGFyZW50IHx8IGRvY3VtZW50LmJvZHk7XG4gICAgICBkZWZhdWx0UGFyZW50LmFwcGVuZENoaWxkKHRoaXMucHJvcHMuY2FudmFzKTtcbiAgICB9XG4gIH1cblxuICBfc2V0dXBHTEtleSAoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuY29udGV4dCkge1xuICAgICAgaWYgKGlzV2ViR0xDb250ZXh0KHRoaXMucHJvcHMuY29udGV4dCkpIHtcbiAgICAgICAgdGhpcy5fcHJvcHMuZ2wgPSB0aGlzLnByb3BzLmNvbnRleHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy5fcHJvcHMuZ2w7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0VGltZVByb3BzIChzZXR0aW5ncyA9IHt9KSB7XG4gICAgLy8gR2V0IHRpbWluZyBkYXRhXG4gICAgbGV0IGR1cmF0aW9uID0gc2V0dGluZ3MuZHVyYXRpb247XG4gICAgbGV0IHRvdGFsRnJhbWVzID0gc2V0dGluZ3MudG90YWxGcmFtZXM7XG4gICAgY29uc3QgdGltZVNjYWxlID0gZGVmaW5lZChzZXR0aW5ncy50aW1lU2NhbGUsIDEpO1xuICAgIGNvbnN0IGZwcyA9IGRlZmluZWQoc2V0dGluZ3MuZnBzLCAyNCk7XG4gICAgY29uc3QgaGFzRHVyYXRpb24gPSB0eXBlb2YgZHVyYXRpb24gPT09ICdudW1iZXInICYmIGlzRmluaXRlKGR1cmF0aW9uKTtcbiAgICBjb25zdCBoYXNUb3RhbEZyYW1lcyA9IHR5cGVvZiB0b3RhbEZyYW1lcyA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodG90YWxGcmFtZXMpO1xuXG4gICAgY29uc3QgdG90YWxGcmFtZXNGcm9tRHVyYXRpb24gPSBoYXNEdXJhdGlvbiA/IE1hdGguZmxvb3IoZnBzICogZHVyYXRpb24pIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGR1cmF0aW9uRnJvbVRvdGFsRnJhbWVzID0gaGFzVG90YWxGcmFtZXMgPyAodG90YWxGcmFtZXMgLyBmcHMpIDogdW5kZWZpbmVkO1xuICAgIGlmIChoYXNEdXJhdGlvbiAmJiBoYXNUb3RhbEZyYW1lcyAmJiB0b3RhbEZyYW1lc0Zyb21EdXJhdGlvbiAhPT0gdG90YWxGcmFtZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IGVpdGhlciBkdXJhdGlvbiBvciB0b3RhbEZyYW1lcywgYnV0IG5vdCBib3RoLiBPciwgdGhleSBtdXN0IG1hdGNoIGV4YWN0bHkuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5kaW1lbnNpb25zID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygc2V0dGluZ3MudW5pdHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFlvdSd2ZSBzcGVjaWZpZWQgYSB7IHVuaXRzIH0gc2V0dGluZyBidXQgbm8geyBkaW1lbnNpb24gfSwgc28gdGhlIHVuaXRzIHdpbGwgYmUgaWdub3JlZC5gKTtcbiAgICB9XG5cbiAgICB0b3RhbEZyYW1lcyA9IGRlZmluZWQodG90YWxGcmFtZXMsIHRvdGFsRnJhbWVzRnJvbUR1cmF0aW9uLCBJbmZpbml0eSk7XG4gICAgZHVyYXRpb24gPSBkZWZpbmVkKGR1cmF0aW9uLCBkdXJhdGlvbkZyb21Ub3RhbEZyYW1lcywgSW5maW5pdHkpO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gc2V0dGluZ3MudGltZTtcbiAgICBjb25zdCBzdGFydEZyYW1lID0gc2V0dGluZ3MuZnJhbWU7XG4gICAgY29uc3QgaGFzU3RhcnRUaW1lID0gdHlwZW9mIHN0YXJ0VGltZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoc3RhcnRUaW1lKTtcbiAgICBjb25zdCBoYXNTdGFydEZyYW1lID0gdHlwZW9mIHN0YXJ0RnJhbWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHN0YXJ0RnJhbWUpO1xuXG4gICAgLy8gc3RhcnQgYXQgemVybyB1bmxlc3MgdXNlciBzcGVjaWZpZXMgZnJhbWUgb3IgdGltZSAoYnV0IG5vdCBib3RoIG1pc21hdGNoZWQpXG4gICAgbGV0IHRpbWUgPSAwO1xuICAgIGxldCBmcmFtZSA9IDA7XG4gICAgbGV0IHBsYXloZWFkID0gMDtcbiAgICBpZiAoaGFzU3RhcnRUaW1lICYmIGhhc1N0YXJ0RnJhbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IGVpdGhlciBzdGFydCBmcmFtZSBvciB0aW1lLCBidXQgbm90IGJvdGguJyk7XG4gICAgfSBlbHNlIGlmIChoYXNTdGFydFRpbWUpIHtcbiAgICAgIC8vIFVzZXIgc3BlY2lmaWVzIHRpbWUsIHdlIGluZmVyIGZyYW1lcyBmcm9tIEZQU1xuICAgICAgdGltZSA9IHN0YXJ0VGltZTtcbiAgICAgIHBsYXloZWFkID0gdGhpcy5fY29tcHV0ZVBsYXloZWFkKHRpbWUsIGR1cmF0aW9uKTtcbiAgICAgIGZyYW1lID0gdGhpcy5fY29tcHV0ZUZyYW1lKFxuICAgICAgICBwbGF5aGVhZCwgdGltZSxcbiAgICAgICAgdG90YWxGcmFtZXMsIGZwc1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0RnJhbWUpIHtcbiAgICAgIC8vIFVzZXIgc3BlY2lmaWVzIGZyYW1lIG51bWJlciwgd2UgaW5mZXIgdGltZSBmcm9tIEZQU1xuICAgICAgZnJhbWUgPSBzdGFydEZyYW1lO1xuICAgICAgdGltZSA9IGZyYW1lIC8gZnBzO1xuICAgICAgcGxheWhlYWQgPSB0aGlzLl9jb21wdXRlUGxheWhlYWQodGltZSwgZHVyYXRpb24pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwbGF5aGVhZCxcbiAgICAgIHRpbWUsXG4gICAgICBmcmFtZSxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdG90YWxGcmFtZXMsXG4gICAgICBmcHMsXG4gICAgICB0aW1lU2NhbGVcbiAgICB9O1xuICB9XG5cbiAgc2V0dXAgKHNldHRpbmdzID0ge30pIHtcbiAgICBpZiAodGhpcy5za2V0Y2gpIHRocm93IG5ldyBFcnJvcignTXVsdGlwbGUgc2V0dXAoKSBjYWxscyBub3QgeWV0IHN1cHBvcnRlZC4nKTtcblxuICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MsIHRoaXMuX3NldHRpbmdzKTtcblxuICAgIGNoZWNrU2V0dGluZ3ModGhpcy5fc2V0dGluZ3MpO1xuXG4gICAgLy8gR2V0IGluaXRpYWwgY2FudmFzICYgY29udGV4dFxuICAgIGNvbnN0IHsgY29udGV4dCwgY2FudmFzIH0gPSBjcmVhdGVDYW52YXModGhpcy5fc2V0dGluZ3MpO1xuXG4gICAgY29uc3QgdGltZVByb3BzID0gdGhpcy5nZXRUaW1lUHJvcHModGhpcy5fc2V0dGluZ3MpO1xuXG4gICAgLy8gSW5pdGlhbCByZW5kZXIgc3RhdGUgZmVhdHVyZXNcbiAgICB0aGlzLl9wcm9wcyA9IHtcbiAgICAgIC4uLnRpbWVQcm9wcyxcbiAgICAgIGNhbnZhcyxcbiAgICAgIGNvbnRleHQsXG4gICAgICBkZWx0YVRpbWU6IDAsXG4gICAgICBzdGFydGVkOiBmYWxzZSxcbiAgICAgIGV4cG9ydGluZzogZmFsc2UsXG4gICAgICBwbGF5aW5nOiBmYWxzZSxcbiAgICAgIHJlY29yZGluZzogZmFsc2UsXG4gICAgICBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyxcbiAgICAgIGRhdGE6IHRoaXMuc2V0dGluZ3MuZGF0YSxcblxuICAgICAgLy8gRXhwb3J0IHNvbWUgc3BlY2lmaWMgYWN0aW9ucyB0byB0aGUgc2tldGNoXG4gICAgICByZW5kZXI6ICgpID0+IHRoaXMucmVuZGVyKCksXG4gICAgICB0b2dnbGVQbGF5OiAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSxcbiAgICAgIGRpc3BhdGNoOiAoY2IpID0+IHRoaXMuZGlzcGF0Y2goY2IpLFxuICAgICAgdGljazogKCkgPT4gdGhpcy50aWNrKCksXG4gICAgICByZXNpemU6ICgpID0+IHRoaXMucmVzaXplKCksXG4gICAgICB1cGRhdGU6IChvcHQpID0+IHRoaXMudXBkYXRlKG9wdCksXG4gICAgICBleHBvcnRGcmFtZTogb3B0ID0+IHRoaXMuZXhwb3J0RnJhbWUob3B0KSxcbiAgICAgIHJlY29yZDogKCkgPT4gdGhpcy5yZWNvcmQoKSxcbiAgICAgIHBsYXk6ICgpID0+IHRoaXMucGxheSgpLFxuICAgICAgcGF1c2U6ICgpID0+IHRoaXMucGF1c2UoKSxcbiAgICAgIHN0b3A6ICgpID0+IHRoaXMuc3RvcCgpXG4gICAgfTtcblxuICAgIC8vIEZvciBXZWJHTCBza2V0Y2hlcywgYSBnbCB2YXJpYWJsZSByZWFkcyBhIGJpdCBiZXR0ZXJcbiAgICB0aGlzLl9zZXR1cEdMS2V5KCk7XG5cbiAgICAvLyBUcmlnZ2VyIGluaXRpYWwgcmVzaXplIG5vdyBzbyB0aGF0IGNhbnZhcyBpcyBhbHJlYWR5IHNpemVkXG4gICAgLy8gYnkgdGhlIHRpbWUgd2UgbG9hZCB0aGUgc2tldGNoXG4gICAgdGhpcy5yZXNpemUoKTtcbiAgfVxuXG4gIGxvYWRBbmRSdW4gKGNhbnZhc1NrZXRjaCwgbmV3U2V0dGluZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkKGNhbnZhc1NrZXRjaCwgbmV3U2V0dGluZ3MpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5ydW4oKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9XG5cbiAgdW5sb2FkICgpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgaWYgKCF0aGlzLnNrZXRjaCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2gudW5sb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKHByb3BzID0+IHRoaXMuc2tldGNoLnVubG9hZChwcm9wcykpO1xuICAgIH1cbiAgICB0aGlzLl9za2V0Y2ggPSBudWxsO1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy51bmxvYWQoKTtcbiAgICB0aGlzLnVubW91bnQoKTtcbiAgfVxuXG4gIGxvYWQgKGNyZWF0ZVNrZXRjaCwgbmV3U2V0dGluZ3MpIHtcbiAgICAvLyBVc2VyIGRpZG4ndCBzcGVjaWZ5IGEgZnVuY3Rpb25cbiAgICBpZiAodHlwZW9mIGNyZWF0ZVNrZXRjaCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZnVuY3Rpb24gbXVzdCB0YWtlIGluIGEgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IHBhcmFtZXRlci4gRXhhbXBsZTpcXG4gIGNhbnZhc1NrZXRjaGVyKCgpID0+IHsgLi4uIH0sIHNldHRpbmdzKScpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNrZXRjaCkge1xuICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5ld1NldHRpbmdzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy51cGRhdGUobmV3U2V0dGluZ3MpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgaXMgYSBiaXQgb2YgYSB0cmlja3kgY2FzZTsgd2Ugc2V0IHVwIHRoZSBhdXRvLXNjYWxpbmcgaGVyZVxuICAgIC8vIGluIGNhc2UgdGhlIHVzZXIgZGVjaWRlcyB0byByZW5kZXIgYW55dGhpbmcgdG8gdGhlIGNvbnRleHQgKmJlZm9yZSogdGhlXG4gICAgLy8gcmVuZGVyKCkgZnVuY3Rpb24uLi4gSG93ZXZlciwgdXNlcnMgc2hvdWxkIGluc3RlYWQgdXNlIGJlZ2luKCkgZnVuY3Rpb24gZm9yIHRoYXQuXG4gICAgdGhpcy5fcHJlUmVuZGVyKCk7XG5cbiAgICBsZXQgcHJlbG9hZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXG4gICAgLy8gQmVjYXVzZSBvZiBQNS5qcydzIHVudXN1YWwgc3RydWN0dXJlLCB3ZSBoYXZlIHRvIGRvIGEgYml0IG9mXG4gICAgLy8gbGlicmFyeS1zcGVjaWZpYyBjaGFuZ2VzIHRvIHN1cHBvcnQgaXQgcHJvcGVybHkuXG4gICAgaWYgKHRoaXMuc2V0dGluZ3MucDUpIHtcbiAgICAgIGlmICghaXNCcm93c2VyKCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbY2FudmFzLXNrZXRjaF0gRVJST1I6IFVzaW5nIHA1LmpzIGluIE5vZGUuanMgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgfVxuICAgICAgcHJlbG9hZCA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBsZXQgUDVDb25zdHJ1Y3RvciA9IHRoaXMuc2V0dGluZ3MucDU7XG4gICAgICAgIGxldCBwcmVsb2FkO1xuICAgICAgICBpZiAoUDVDb25zdHJ1Y3Rvci5wNSkge1xuICAgICAgICAgIHByZWxvYWQgPSBQNUNvbnN0cnVjdG9yLnByZWxvYWQ7XG4gICAgICAgICAgUDVDb25zdHJ1Y3RvciA9IFA1Q29uc3RydWN0b3IucDU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgc2tldGNoIHNldHVwOyBkaXNhYmxlIGxvb3AsIHNldCBzaXppbmcsIGV0Yy5cbiAgICAgICAgY29uc3QgcDVTa2V0Y2ggPSBwNSA9PiB7XG4gICAgICAgICAgLy8gSG9vayBpbiBwcmVsb2FkIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgIGlmIChwcmVsb2FkKSBwNS5wcmVsb2FkID0gKCkgPT4gcHJlbG9hZChwNSk7XG4gICAgICAgICAgcDUuc2V0dXAgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBpc0dMID0gdGhpcy5zZXR0aW5ncy5jb250ZXh0ID09PSAnd2ViZ2wnO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBpc0dMID8gcDUuV0VCR0wgOiBwNS5QMkQ7XG4gICAgICAgICAgICBwNS5ub0xvb3AoKTtcbiAgICAgICAgICAgIHA1LnBpeGVsRGVuc2l0eShwcm9wcy5waXhlbFJhdGlvKTtcbiAgICAgICAgICAgIHA1LmNyZWF0ZUNhbnZhcyhwcm9wcy52aWV3cG9ydFdpZHRoLCBwcm9wcy52aWV3cG9ydEhlaWdodCwgcmVuZGVyZXIpO1xuICAgICAgICAgICAgaWYgKGlzR0wgJiYgdGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgIHA1LnNldEF0dHJpYnV0ZXModGhpcy5zZXR0aW5ncy5hdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51cGRhdGUoeyBwNSwgY2FudmFzOiBwNS5jYW52YXMsIGNvbnRleHQ6IHA1Ll9yZW5kZXJlci5kcmF3aW5nQ29udGV4dCB9KTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFN1cHBvcnQgZ2xvYmFsIGFuZCBpbnN0YW5jZSBQNS5qcyBtb2Rlc1xuICAgICAgICBpZiAodHlwZW9mIFA1Q29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBuZXcgUDVDb25zdHJ1Y3RvcihwNVNrZXRjaCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuY3JlYXRlQ2FudmFzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ7IHA1IH0gc2V0dGluZyBpcyBwYXNzZWQgYnV0IGNhbid0IGZpbmQgcDUuanMgaW4gZ2xvYmFsICh3aW5kb3cpIHNjb3BlLiBNYXliZSB5b3UgZGlkIG5vdCBjcmVhdGUgaXQgZ2xvYmFsbHk/XFxubmV3IHA1KCk7IC8vIDwtLSBhdHRhY2hlcyB0byBnbG9iYWwgc2NvcGVcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHA1U2tldGNoKHdpbmRvdyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwcmVsb2FkLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gTG9hZCB0aGUgdXNlcidzIHNrZXRjaFxuICAgICAgbGV0IGxvYWRlciA9IGNyZWF0ZVNrZXRjaCh0aGlzLnByb3BzKTtcbiAgICAgIGlmICghaXNQcm9taXNlKGxvYWRlcikpIHtcbiAgICAgICAgbG9hZGVyID0gUHJvbWlzZS5yZXNvbHZlKGxvYWRlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG9hZGVyO1xuICAgIH0pLnRoZW4oc2tldGNoID0+IHtcbiAgICAgIGlmICghc2tldGNoKSBza2V0Y2ggPSB7fTtcbiAgICAgIHRoaXMuX3NrZXRjaCA9IHNrZXRjaDtcblxuICAgICAgLy8gT25jZSB0aGUgc2tldGNoIGlzIGxvYWRlZCB3ZSBjYW4gYWRkIHRoZSBldmVudHNcbiAgICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgICB0aGlzLl9rZXlib2FyZFNob3J0Y3V0cy5hdHRhY2goKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZUhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9wb3N0UmVuZGVyKCk7XG5cbiAgICAgIC8vIFRoZSBpbml0aWFsIHJlc2l6ZSgpIGluIHRoZSBjb25zdHJ1Y3RvciB3aWxsIG5vdCBoYXZlXG4gICAgICAvLyB0cmlnZ2VyZWQgYSByZXNpemUoKSBldmVudCBvbiB0aGUgc2tldGNoLCBzaW5jZSBpdCB3YXMgYmVmb3JlXG4gICAgICAvLyB0aGUgc2tldGNoIHdhcyBsb2FkZWQuIFNvIHdlIHNlbmQgdGhlIHNpZ25hbCBoZXJlLCBhbGxvd2luZ1xuICAgICAgLy8gdXNlcnMgdG8gcmVhY3QgdG8gdGhlIGluaXRpYWwgc2l6ZSBiZWZvcmUgZmlyc3QgcmVuZGVyLlxuICAgICAgdGhpcy5fc2l6ZUNoYW5nZWQoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLndhcm4oJ0NvdWxkIG5vdCBzdGFydCBza2V0Y2gsIHRoZSBhc3luYyBsb2FkaW5nIGZ1bmN0aW9uIHJlamVjdGVkIHdpdGggYW4gZXJyb3I6XFxuICAgIEVycm9yOiAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNrZXRjaE1hbmFnZXI7XG4iLCJpbXBvcnQgU2tldGNoTWFuYWdlciBmcm9tICcuL2NvcmUvU2tldGNoTWFuYWdlcic7XG5pbXBvcnQgUGFwZXJTaXplcyBmcm9tICcuL3BhcGVyLXNpemVzJztcbmltcG9ydCB7IGdldENsaWVudEFQSSwgZGVmaW5lZCB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IENBQ0hFID0gJ2hvdC1pZC1jYWNoZSc7XG5jb25zdCBydW50aW1lQ29sbGlzaW9ucyA9IFtdO1xuXG5mdW5jdGlvbiBpc0hvdFJlbG9hZCAoKSB7XG4gIGNvbnN0IGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuICByZXR1cm4gY2xpZW50ICYmIGNsaWVudC5ob3Q7XG59XG5cbmZ1bmN0aW9uIGNhY2hlR2V0IChpZCkge1xuICBjb25zdCBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcbiAgaWYgKCFjbGllbnQpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNsaWVudFtDQUNIRV0gPSBjbGllbnRbQ0FDSEVdIHx8IHt9O1xuICByZXR1cm4gY2xpZW50W0NBQ0hFXVtpZF07XG59XG5cbmZ1bmN0aW9uIGNhY2hlUHV0IChpZCwgZGF0YSkge1xuICBjb25zdCBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcbiAgaWYgKCFjbGllbnQpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNsaWVudFtDQUNIRV0gPSBjbGllbnRbQ0FDSEVdIHx8IHt9O1xuICBjbGllbnRbQ0FDSEVdW2lkXSA9IGRhdGE7XG59XG5cbmZ1bmN0aW9uIGdldFRpbWVQcm9wIChvbGRNYW5hZ2VyLCBuZXdTZXR0aW5ncykge1xuICAvLyBTdGF0aWMgc2tldGNoZXMgaWdub3JlIHRoZSB0aW1lIHBlcnNpc3RlbmN5XG4gIHJldHVybiBuZXdTZXR0aW5ncy5hbmltYXRlID8geyB0aW1lOiBvbGRNYW5hZ2VyLnByb3BzLnRpbWUgfSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gY2FudmFzU2tldGNoIChza2V0Y2gsIHNldHRpbmdzID0ge30pIHtcbiAgaWYgKHNldHRpbmdzLnA1KSB7XG4gICAgaWYgKHNldHRpbmdzLmNhbnZhcyB8fCAoc2V0dGluZ3MuY29udGV4dCAmJiB0eXBlb2Ygc2V0dGluZ3MuY29udGV4dCAhPT0gJ3N0cmluZycpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEluIHsgcDUgfSBtb2RlLCB5b3UgY2FuJ3QgcGFzcyB5b3VyIG93biBjYW52YXMgb3IgY29udGV4dCwgdW5sZXNzIHRoZSBjb250ZXh0IGlzIGEgXCJ3ZWJnbFwiIG9yIFwiMmRcIiBzdHJpbmdgKTtcbiAgICB9XG5cbiAgICAvLyBEbyBub3QgY3JlYXRlIGEgY2FudmFzIG9uIHN0YXJ0dXAsIHNpbmNlIFA1LmpzIGRvZXMgdGhhdCBmb3IgdXNcbiAgICBjb25zdCBjb250ZXh0ID0gdHlwZW9mIHNldHRpbmdzLmNvbnRleHQgPT09ICdzdHJpbmcnID8gc2V0dGluZ3MuY29udGV4dCA6IGZhbHNlO1xuICAgIHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MsIHsgY2FudmFzOiBmYWxzZSwgY29udGV4dCB9KTtcbiAgfVxuXG4gIGNvbnN0IGlzSG90ID0gaXNIb3RSZWxvYWQoKTtcbiAgbGV0IGhvdElEO1xuICBpZiAoaXNIb3QpIHtcbiAgICAvLyBVc2UgYSBtYWdpYyBuYW1lIGJ5IGRlZmF1bHQsIGZvcmNlIHVzZXIgdG8gZGVmaW5lIGVhY2ggc2tldGNoIGlmIHRoZXlcbiAgICAvLyByZXF1aXJlIG1vcmUgdGhhbiBvbmUgaW4gYW4gYXBwbGljYXRpb24uIE9wZW4gdG8gb3RoZXIgaWRlYXMgb24gaG93IHRvIHRhY2tsZVxuICAgIC8vIHRoaXMgYXMgd2VsbC4uLlxuICAgIGhvdElEID0gZGVmaW5lZChzZXR0aW5ncy5pZCwgJyRfX0RFRkFVTFRfQ0FOVkFTX1NLRVRDSF9JRF9fJCcpO1xuICB9XG4gIGxldCBpc0luamVjdGluZyA9IGlzSG90ICYmIHR5cGVvZiBob3RJRCA9PT0gJ3N0cmluZyc7XG5cbiAgaWYgKGlzSW5qZWN0aW5nICYmIHJ1bnRpbWVDb2xsaXNpb25zLmluY2x1ZGVzKGhvdElEKSkge1xuICAgIGNvbnNvbGUud2FybihgV2FybmluZzogWW91IGhhdmUgbXVsdGlwbGUgY2FsbHMgdG8gY2FudmFzU2tldGNoKCkgaW4gLS1ob3QgbW9kZS4gWW91IG11c3QgcGFzcyB1bmlxdWUgeyBpZCB9IHN0cmluZ3MgaW4gc2V0dGluZ3MgdG8gZW5hYmxlIGhvdCByZWxvYWQgYWNyb3NzIG11bHRpcGxlIHNrZXRjaGVzLiBgLCBob3RJRCk7XG4gICAgaXNJbmplY3RpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGxldCBwcmVsb2FkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgaWYgKGlzSW5qZWN0aW5nKSB7XG4gICAgLy8gTWFyayB0aGlzIGFzIGFscmVhZHkgc3BvdHRlZCBpbiB0aGlzIHJ1bnRpbWUgaW5zdGFuY2VcbiAgICBydW50aW1lQ29sbGlzaW9ucy5wdXNoKGhvdElEKTtcblxuICAgIGNvbnN0IHByZXZpb3VzRGF0YSA9IGNhY2hlR2V0KGhvdElEKTtcbiAgICBpZiAocHJldmlvdXNEYXRhKSB7XG4gICAgICBjb25zdCBuZXh0ID0gKCkgPT4ge1xuICAgICAgICAvLyBHcmFiIG5ldyBwcm9wcyBmcm9tIG9sZCBza2V0Y2ggaW5zdGFuY2VcbiAgICAgICAgY29uc3QgbmV3UHJvcHMgPSBnZXRUaW1lUHJvcChwcmV2aW91c0RhdGEubWFuYWdlciwgc2V0dGluZ3MpO1xuICAgICAgICAvLyBEZXN0cm95IHRoZSBvbGQgaW5zdGFuY2VcbiAgICAgICAgcHJldmlvdXNEYXRhLm1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAvLyBQYXNzIGFsb25nIG5ldyBwcm9wc1xuICAgICAgICByZXR1cm4gbmV3UHJvcHM7XG4gICAgICB9O1xuXG4gICAgICAvLyBNb3ZlIGFsb25nIHRoZSBuZXh0IGRhdGEuLi5cbiAgICAgIHByZWxvYWQgPSBwcmV2aW91c0RhdGEubG9hZC50aGVuKG5leHQpLmNhdGNoKG5leHQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcmVsb2FkLnRoZW4obmV3UHJvcHMgPT4ge1xuICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgU2tldGNoTWFuYWdlcigpO1xuICAgIGxldCByZXN1bHQ7XG4gICAgaWYgKHNrZXRjaCkge1xuICAgICAgLy8gTWVyZ2Ugd2l0aCBpbmNvbWluZyBkYXRhXG4gICAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzLCBuZXdQcm9wcyk7XG5cbiAgICAgIC8vIEFwcGx5IHNldHRpbmdzIGFuZCBjcmVhdGUgYSBjYW52YXNcbiAgICAgIG1hbmFnZXIuc2V0dXAoc2V0dGluZ3MpO1xuXG4gICAgICAvLyBNb3VudCB0byBET01cbiAgICAgIG1hbmFnZXIubW91bnQoKTtcblxuICAgICAgLy8gbG9hZCB0aGUgc2tldGNoIGZpcnN0XG4gICAgICByZXN1bHQgPSBtYW5hZ2VyLmxvYWRBbmRSdW4oc2tldGNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKG1hbmFnZXIpO1xuICAgIH1cbiAgICBpZiAoaXNJbmplY3RpbmcpIHtcbiAgICAgIGNhY2hlUHV0KGhvdElELCB7IGxvYWQ6IHJlc3VsdCwgbWFuYWdlciB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG59XG5cbi8vIFRPRE86IEZpZ3VyZSBvdXQgYSBuaWNlIHdheSB0byBleHBvcnQgdGhpbmdzLlxuY2FudmFzU2tldGNoLmNhbnZhc1NrZXRjaCA9IGNhbnZhc1NrZXRjaDtcbmNhbnZhc1NrZXRjaC5QYXBlclNpemVzID0gUGFwZXJTaXplcztcblxuZXhwb3J0IGRlZmF1bHQgY2FudmFzU2tldGNoO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsImxldCIsImFyZ3VtZW50cyIsImlzRE9NIiwiaXNBcmd1bWVudHMiLCJvYmplY3RLZXlzIiwiZGVmaW5lIiwidGhpcyIsInJlcGVhdCIsImNvbnN0IiwiYXNzaWduIiwiZGVmaW5lZCIsImNvbnZlcnREaXN0YW5jZSIsImdldENhbnZhc0NvbnRleHQiLCJyaWdodE5vdyIsImlzUHJvbWlzZSIsImRlZXBFcXVhbCIsIlBhcGVyU2l6ZXMiXSwibWFwcGluZ3MiOiI7Ozs7OztDQUFBOzs7Ozs7Q0FRQSxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztDQUN6RCxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztDQUNyRCxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7O0NBRTdELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtFQUN0QixJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtHQUN0QyxNQUFNLElBQUksU0FBUyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7R0FDN0U7O0VBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDbkI7O0NBRUQsU0FBUyxlQUFlLEdBQUc7RUFD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SyxDQUFDO1dBQ1AsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7V0FDWixDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7V0FDZixDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1dBQzdCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztXQUMxRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7V0FDMUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQzFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztXQUMxRSxDQUFDLEtBQUssR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDO1dBQ3hHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtB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TSxNQUd6QixDQUFFLEtBQU0sR0FBSSxJQUNaLENBQUUsS0FBTSxHQUFJO0tBQ1osQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLE1BQU8sSUFBSyxLQUNkLENBQUU7S0FBTyxJQUFLLEtBQ2QsQ0FBRSxNQUFPLElBQUssS0FHZCxDQUFFLEtBQU0sSUFBSyxNQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFO0tBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxHQUFJLEtBQ1osQ0FBRSxLQUFNO0tBQUksSUFDWixDQUFFLEtBQU0sR0FBSSxJQUNaLENBQUUsTUFBTyxHQUFJLElBQ2IsQ0FBRSxNQUFPLEtBQU0sTUFDZixDQUFFLE1BQU8sS0FBTSxNQUNmLENBQUUsS0FBTTtLQUFNLE1BQ2QsQ0FBRSxLQUFNLElBQUssTUFDYixDQUFFLE1BQU8sSUFBSyxNQUNkLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxNQUFPLElBQUssS0FDZCxDQUFFLEtBQU07S0FBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxHQUFJLEtBQ1osQ0FBRSxLQUFNLEdBQUk7S0FDWixDQUFFLEtBQU0sR0FBSSxJQUNaLENBQUUsTUFBTyxHQUFJLElBQ2IsQ0FBRSxNQUFPLEdBQUksSUFDYixDQUFFLE1BQU8sR0FBSSxJQUNiLENBQUUsS0FBTSxJQUFLLE1BQ2IsQ0FBRTtLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTSxJQUFLLEtBQ2IsQ0FBRSxLQUFNLElBQUssS0FDYixDQUFFLEtBQU0sSUFBSyxLQUNiLENBQUUsS0FBTTtLQUFLLEtBQ2IsQ0FBRSxLQUFNLEdB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


/***/ }),

/***/ "./node_modules/defined/index.js":
/*!***************************************!*\
  !*** ./node_modules/defined/index.js ***!
  \***************************************/
/***/ ((module) => {

module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};


/***/ }),

/***/ "./node_modules/seed-random/index.js":
/*!*******************************************!*\
  !*** ./node_modules/seed-random/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var width = 256;// each RC4 output is 0 <= x < 256
var chunks = 6;// at least six RC4 outputs for each double
var digits = 52;// there are 52 significant digits in a double
var pool = [];// pool: entropy pool starts empty
var GLOBAL = typeof __webpack_require__.g === 'undefined' ? window : __webpack_require__.g;

//
// The following constants are related to IEEE 754 limits.
//
var startdenom = Math.pow(width, chunks),
    significance = Math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1;


var oldRandom = Math.random;

//
// seedrandom()
// This is the seedrandom function described above.
//
module.exports = function(seed, options) {
  if (options && options.global === true) {
    options.global = false;
    Math.random = module.exports(seed, options);
    options.global = true;
    return Math.random;
  }
  var use_entropy = (options && options.entropy) || false;
  var key = [];

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    use_entropy ? [seed, tostring(pool)] :
    0 in arguments ? seed : autoseed(), 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  return function() {         // Closure to return a random double:
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer Math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };
};

module.exports.resetGlobal = function () {
  Math.random = oldRandom;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj)[0], prop;
  if (depth && typ == 'o') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 's' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//
/** @param {Uint8Array=} seed */
function autoseed(seed) {
  try {
    GLOBAL.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date, GLOBAL, GLOBAL.navigator && GLOBAL.navigator.plugins,
            GLOBAL.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call Math.random on its own again after
// initialization.
//
mixkey(Math.random(), pool);


/***/ }),

/***/ "./node_modules/simplex-noise/simplex-noise.js":
/*!*****************************************************!*\
  !*** ./node_modules/simplex-noise/simplex-noise.js ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.


 Copyright (c) 2018 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function() {
  'use strict';

  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  var F3 = 1.0 / 3.0;
  var G3 = 1.0 / 6.0;
  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

  function SimplexNoise(randomOrSeed) {
    var random;
    if (typeof randomOrSeed == 'function') {
      random = randomOrSeed;
    }
    else if (randomOrSeed) {
      random = alea(randomOrSeed);
    } else {
      random = Math.random;
    }
    this.p = buildPermutationTable(random);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);
    for (var i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }

  }
  SimplexNoise.prototype = {
    grad3: new Float32Array([1, 1, 0,
      -1, 1, 0,
      1, -1, 0,

      -1, -1, 0,
      1, 0, 1,
      -1, 0, 1,

      1, 0, -1,
      -1, 0, -1,
      0, 1, 1,

      0, -1, 1,
      0, 1, -1,
      0, -1, -1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
      0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
      1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
      -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
      1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
      -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
      1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
      -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
    noise2D: function(xin, yin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0 = 0; // Noise contributions from the three corners
      var n1 = 0;
      var n2 = 0;
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin) * F2; // Hairy factor for 2D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var X0 = i - t; // Unskew the cell origin back to (x,y) space
      var Y0 = j - t;
      var x0 = xin - X0; // The x,y distances from the cell origin
      var y0 = yin - Y0;
      // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.
      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      else {
        i1 = 0;
        j1 = 1;
      } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6
      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords
      var y2 = y0 - 1.0 + 2.0 * G2;
      // Work out the hashed gradient indices of the three simplex corners
      var ii = i & 255;
      var jj = j & 255;
      // Calculate the contribution from the three corners
      var t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 >= 0) {
        var gi0 = permMod12[ii + perm[jj]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
      }
      var t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 >= 0) {
        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
      }
      var t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 >= 0) {
        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 70.0 * (n0 + n1 + n2);
    },
    // 3D simplex noise
    noise3D: function(xin, yin, zin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0, n1, n2, n3; // Noise contributions from the four corners
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var k = Math.floor(zin + s);
      var t = (i + j + k) * G3;
      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space
      var Y0 = j - t;
      var Z0 = k - t;
      var x0 = xin - X0; // The x,y,z distances from the cell origin
      var y0 = yin - Y0;
      var z0 = zin - Z0;
      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
      // Determine which simplex we are in.
      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // X Y Z order
        else if (x0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // X Z Y order
        else {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } // Z X Y order
      }
      else { // x0<y0
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Z Y X order
        else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Y Z X order
        else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // Y X Z order
      }
      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
      // c = 1/6.
      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords
      var y1 = y0 - j1 + G3;
      var z1 = z0 - k1 + G3;
      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords
      var y2 = y0 - j2 + 2.0 * G3;
      var z2 = z0 - k2 + 2.0 * G3;
      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords
      var y3 = y0 - 1.0 + 3.0 * G3;
      var z3 = z0 - 1.0 + 3.0 * G3;
      // Work out the hashed gradient indices of the four simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      // Calculate the contribution from the four corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
        t3 *= t3;
        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to stay just inside [-1,1]
      return 32.0 * (n0 + n1 + n2 + n3);
    },
    // 4D simplex noise, better simplex rank ordering method 2012-03-09
    noise4D: function(x, y, z, w) {
      var perm = this.perm;
      var grad4 = this.grad4;

      var n0, n1, n2, n3, n4; // Noise contributions from the five corners
      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in
      var s = (x + y + z + w) * F4; // Factor for 4D skewing
      var i = Math.floor(x + s);
      var j = Math.floor(y + s);
      var k = Math.floor(z + s);
      var l = Math.floor(w + s);
      var t = (i + j + k + l) * G4; // Factor for 4D unskewing
      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space
      var Y0 = j - t;
      var Z0 = k - t;
      var W0 = l - t;
      var x0 = x - X0; // The x,y,z,w distances from the cell origin
      var y0 = y - Y0;
      var z0 = z - Z0;
      var w0 = w - W0;
      // For the 4D case, the simplex is a 4D shape I won't even try to describe.
      // To find out which of the 24 possible simplices we're in, we need to
      // determine the magnitude ordering of x0, y0, z0 and w0.
      // Six pair-wise comparisons are performed between each possible pair
      // of the four coordinates, and the results are used to rank the numbers.
      var rankx = 0;
      var ranky = 0;
      var rankz = 0;
      var rankw = 0;
      if (x0 > y0) rankx++;
      else ranky++;
      if (x0 > z0) rankx++;
      else rankz++;
      if (x0 > w0) rankx++;
      else rankw++;
      if (y0 > z0) ranky++;
      else rankz++;
      if (y0 > w0) ranky++;
      else rankw++;
      if (z0 > w0) rankz++;
      else rankw++;
      var i1, j1, k1, l1; // The integer offsets for the second simplex corner
      var i2, j2, k2, l2; // The integer offsets for the third simplex corner
      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
      // impossible. Only the 24 indices which have non-zero entries make any sense.
      // We use a thresholding to set the coordinates in turn from the largest magnitude.
      // Rank 3 denotes the largest coordinate.
      i1 = rankx >= 3 ? 1 : 0;
      j1 = ranky >= 3 ? 1 : 0;
      k1 = rankz >= 3 ? 1 : 0;
      l1 = rankw >= 3 ? 1 : 0;
      // Rank 2 denotes the second largest coordinate.
      i2 = rankx >= 2 ? 1 : 0;
      j2 = ranky >= 2 ? 1 : 0;
      k2 = rankz >= 2 ? 1 : 0;
      l2 = rankw >= 2 ? 1 : 0;
      // Rank 1 denotes the second smallest coordinate.
      i3 = rankx >= 1 ? 1 : 0;
      j3 = ranky >= 1 ? 1 : 0;
      k3 = rankz >= 1 ? 1 : 0;
      l3 = rankw >= 1 ? 1 : 0;
      // The fifth corner has all coordinate offsets = 1, so no need to compute that.
      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords
      var y1 = y0 - j1 + G4;
      var z1 = z0 - k1 + G4;
      var w1 = w0 - l1 + G4;
      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords
      var y2 = y0 - j2 + 2.0 * G4;
      var z2 = z0 - k2 + 2.0 * G4;
      var w2 = w0 - l2 + 2.0 * G4;
      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords
      var y3 = y0 - j3 + 3.0 * G4;
      var z3 = z0 - k3 + 3.0 * G4;
      var w3 = w0 - l3 + 3.0 * G4;
      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords
      var y4 = y0 - 1.0 + 4.0 * G4;
      var z4 = z0 - 1.0 + 4.0 * G4;
      var w4 = w0 - 1.0 + 4.0 * G4;
      // Work out the hashed gradient indices of the five simplex corners
      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      var ll = l & 255;
      // Calculate the contribution from the five corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
      if (t0 < 0) n0 = 0.0;
      else {
        var gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
        t0 *= t0;
        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
      if (t1 < 0) n1 = 0.0;
      else {
        var gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
        t1 *= t1;
        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
      if (t2 < 0) n2 = 0.0;
      else {
        var gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
        t2 *= t2;
        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
      if (t3 < 0) n3 = 0.0;
      else {
        var gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
        t3 *= t3;
        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
      }
      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
      if (t4 < 0) n4 = 0.0;
      else {
        var gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
        t4 *= t4;
        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
      }
      // Sum up and scale the result to cover the range [-1,1]
      return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
  };

  function buildPermutationTable(random) {
    var i;
    var p = new Uint8Array(256);
    for (i = 0; i < 256; i++) {
      p[i] = i;
    }
    for (i = 0; i < 255; i++) {
      var r = i + ~~(random() * (256 - i));
      var aux = p[i];
      p[i] = p[r];
      p[r] = aux;
    }
    return p;
  }
  SimplexNoise._buildPermutationTable = buildPermutationTable;

  function alea() {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    var mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < arguments.length; i++) {
      s0 -= mash(arguments[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(arguments[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(arguments[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;
    return function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
  }
  function masher() {
    var n = 0xefc8249d;
    return function(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
  }

  // amd
  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {return SimplexNoise;}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  // common js
  if (true) exports.SimplexNoise = SimplexNoise;
  // browser
  else {}
  // nodejs
  if (true) {
    module.exports = SimplexNoise;
  }

})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const canvasSketch = __webpack_require__(/*! canvas-sketch */ "./node_modules/canvas-sketch/dist/canvas-sketch.umd.js");
const random = __webpack_require__(/*! canvas-sketch-util/random */ "./node_modules/canvas-sketch-util/random.js");

const settings = {
	dimensions: [ 1080, 1080 ]
};



let manager;

let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {

let imgObj = new Image();
imgObj.src = './jean.jpg'

imgObj.onload = function(){
console.log(imgObj)
// let w = typeCanvas.width;
// let nw = imgObj.naturalWidth;
// let nh = imgObj.naturalHeight;
// let aspect = nw/nh;
// let h = typeCanvas.width / aspect;
// typeCanvas.height = h;
typeContext.drawImage(imgObj, 0 ,0, 100,100)
}

	const cell = 20;
	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;
	typeCanvas.height = rows;

	return ({ context, width, height }) => {
		typeContext.fillStyle = 'black';
		typeContext.fillRect(0, 0, cols, rows);

		fontSize = cols * 1.2;

		typeContext.fillStyle = 'white';
		typeContext.font = `${fontSize}px ${fontFamily}`;
		typeContext.textBaseline = 'top';

		const metrics = typeContext.measureText(text);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

		const tx = (cols - mw) * 0.5 - mx;
		const ty = (rows - mh) * 0.5 - my;

		typeContext.save();
		typeContext.translate(tx, ty);

		typeContext.beginPath();
		typeContext.rect(mx, my, mw, mh);
		typeContext.stroke();

		typeContext.fillText(text, 0, 0);
		typeContext.restore();




		const typeData = typeContext.getImageData(0, 0, cols, rows).data;


		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		// context.drawImage(typeCanvas, 0, 0);

		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];

			const glyph = getGlyph(r);

			context.font = `${cell * 2}px ${fontFamily}`;
			if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

			context.fillStyle = 'white';

			context.save();
			context.translate(x, y);
			context.translate(cell * 0.5, cell * 0.5);

			// context.fillRect(0, 0, cell, cell);

			context.fillText(glyph, 0, 0);
			
			context.restore();

		}
	};
};

const getGlyph = (v) => {
	if (v < 50) return '';
	if (v < 100) return '.';
	if (v < 150) return '-';
	if (v < 200) return '+';

	const glyphs = '_= /'.split('');

	return random.pick(glyphs);
};


const onKeyUp = (e) => {
	text = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);


const start = async () => {
	manager = await canvasSketch(sketch, settings);
};

start();

// function getMyVideo() {
//   var canvas = document.getElementById('canvas');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');

//     return document.getElementById('myvideo');
//   }
// }

// getMyVideo




// const url = 'https://picsum.photos/200';

// const loadMeSomeImage = (url) => {
// 	return new Promise((resolve, reject) => {
// 		const img = new Image();
// 		img.onload = () => resolve(img);
// 		img.onerror = () => reject();
// 		img.src = url;
// 	});
// };

// const start = async () => {
// 	const img = await loadMeSomeImage(url);
// 	console.log('image width', img.width);
// 	console.log('this line');
// };

// const start = () => {
// 	loadMeSomeImage(url).then(img => {
// 		console.log('image width', img.width);
// 	});
// 	console.log('this line');
// };


// start();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFlBQVk7QUFDWjtBQUNBOzs7QUFHQSxPQUFPLEtBQWdELEVBQUUsRUFJckQsQ0FBQztBQUNMO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvY2FudmFzLXNrZXRjaC11dGlsL3JhbmRvbS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2NhbnZhcy1za2V0Y2gvZGlzdC9jYW52YXMtc2tldGNoLnVtZC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2RlZmluZWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9zZWVkLXJhbmRvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL3NpbXBsZXgtbm9pc2Uvc2ltcGxleC1ub2lzZS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzZWVkUmFuZG9tID0gcmVxdWlyZSgnc2VlZC1yYW5kb20nKTtcbnZhciBTaW1wbGV4Tm9pc2UgPSByZXF1aXJlKCdzaW1wbGV4LW5vaXNlJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJ2RlZmluZWQnKTtcblxuZnVuY3Rpb24gY3JlYXRlUmFuZG9tIChkZWZhdWx0U2VlZCkge1xuICBkZWZhdWx0U2VlZCA9IGRlZmluZWQoZGVmYXVsdFNlZWQsIG51bGwpO1xuICB2YXIgZGVmYXVsdFJhbmRvbSA9IE1hdGgucmFuZG9tO1xuICB2YXIgY3VycmVudFNlZWQ7XG4gIHZhciBjdXJyZW50UmFuZG9tO1xuICB2YXIgbm9pc2VHZW5lcmF0b3I7XG4gIHZhciBfbmV4dEdhdXNzaWFuID0gbnVsbDtcbiAgdmFyIF9oYXNOZXh0R2F1c3NpYW4gPSBmYWxzZTtcblxuICBzZXRTZWVkKGRlZmF1bHRTZWVkKTtcblxuICByZXR1cm4ge1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBjcmVhdGVSYW5kb206IGZ1bmN0aW9uIChkZWZhdWx0U2VlZCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVJhbmRvbShkZWZhdWx0U2VlZCk7XG4gICAgfSxcbiAgICBzZXRTZWVkOiBzZXRTZWVkLFxuICAgIGdldFNlZWQ6IGdldFNlZWQsXG4gICAgZ2V0UmFuZG9tU2VlZDogZ2V0UmFuZG9tU2VlZCxcbiAgICB2YWx1ZU5vblplcm86IHZhbHVlTm9uWmVybyxcbiAgICBwZXJtdXRlTm9pc2U6IHBlcm11dGVOb2lzZSxcbiAgICBub2lzZTFEOiBub2lzZTFELFxuICAgIG5vaXNlMkQ6IG5vaXNlMkQsXG4gICAgbm9pc2UzRDogbm9pc2UzRCxcbiAgICBub2lzZTREOiBub2lzZTRELFxuICAgIHNpZ246IHNpZ24sXG4gICAgYm9vbGVhbjogYm9vbGVhbixcbiAgICBjaGFuY2U6IGNoYW5jZSxcbiAgICByYW5nZTogcmFuZ2UsXG4gICAgcmFuZ2VGbG9vcjogcmFuZ2VGbG9vcixcbiAgICBwaWNrOiBwaWNrLFxuICAgIHNodWZmbGU6IHNodWZmbGUsXG4gICAgb25DaXJjbGU6IG9uQ2lyY2xlLFxuICAgIGluc2lkZUNpcmNsZTogaW5zaWRlQ2lyY2xlLFxuICAgIG9uU3BoZXJlOiBvblNwaGVyZSxcbiAgICBpbnNpZGVTcGhlcmU6IGluc2lkZVNwaGVyZSxcbiAgICBxdWF0ZXJuaW9uOiBxdWF0ZXJuaW9uLFxuICAgIHdlaWdodGVkOiB3ZWlnaHRlZCxcbiAgICB3ZWlnaHRlZFNldDogd2VpZ2h0ZWRTZXQsXG4gICAgd2VpZ2h0ZWRTZXRJbmRleDogd2VpZ2h0ZWRTZXRJbmRleCxcbiAgICBnYXVzc2lhbjogZ2F1c3NpYW5cbiAgfTtcblxuICBmdW5jdGlvbiBzZXRTZWVkIChzZWVkLCBvcHQpIHtcbiAgICBpZiAodHlwZW9mIHNlZWQgPT09ICdudW1iZXInIHx8IHR5cGVvZiBzZWVkID09PSAnc3RyaW5nJykge1xuICAgICAgY3VycmVudFNlZWQgPSBzZWVkO1xuICAgICAgY3VycmVudFJhbmRvbSA9IHNlZWRSYW5kb20oY3VycmVudFNlZWQsIG9wdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRTZWVkID0gdW5kZWZpbmVkO1xuICAgICAgY3VycmVudFJhbmRvbSA9IGRlZmF1bHRSYW5kb207XG4gICAgfVxuICAgIG5vaXNlR2VuZXJhdG9yID0gY3JlYXRlTm9pc2UoKTtcbiAgICBfbmV4dEdhdXNzaWFuID0gbnVsbDtcbiAgICBfaGFzTmV4dEdhdXNzaWFuID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB2YWx1ZSAoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRSYW5kb20oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbHVlTm9uWmVybyAoKSB7XG4gICAgdmFyIHUgPSAwO1xuICAgIHdoaWxlICh1ID09PSAwKSB1ID0gdmFsdWUoKTtcbiAgICByZXR1cm4gdTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNlZWQgKCkge1xuICAgIHJldHVybiBjdXJyZW50U2VlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJhbmRvbVNlZWQgKCkge1xuICAgIHZhciBzZWVkID0gU3RyaW5nKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApKTtcbiAgICByZXR1cm4gc2VlZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vaXNlICgpIHtcbiAgICByZXR1cm4gbmV3IFNpbXBsZXhOb2lzZShjdXJyZW50UmFuZG9tKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBlcm11dGVOb2lzZSAoKSB7XG4gICAgbm9pc2VHZW5lcmF0b3IgPSBjcmVhdGVOb2lzZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbm9pc2UxRCAoeCwgZnJlcXVlbmN5LCBhbXBsaXR1ZGUpIHtcbiAgICBpZiAoIWlzRmluaXRlKHgpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd4IGNvbXBvbmVudCBmb3Igbm9pc2UoKSBtdXN0IGJlIGZpbml0ZScpO1xuICAgIGZyZXF1ZW5jeSA9IGRlZmluZWQoZnJlcXVlbmN5LCAxKTtcbiAgICBhbXBsaXR1ZGUgPSBkZWZpbmVkKGFtcGxpdHVkZSwgMSk7XG4gICAgcmV0dXJuIGFtcGxpdHVkZSAqIG5vaXNlR2VuZXJhdG9yLm5vaXNlMkQoeCAqIGZyZXF1ZW5jeSwgMCk7XG4gIH1cblxuICBmdW5jdGlvbiBub2lzZTJEICh4LCB5LCBmcmVxdWVuY3ksIGFtcGxpdHVkZSkge1xuICAgIGlmICghaXNGaW5pdGUoeCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ggY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgaWYgKCFpc0Zpbml0ZSh5KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigneSBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBmcmVxdWVuY3kgPSBkZWZpbmVkKGZyZXF1ZW5jeSwgMSk7XG4gICAgYW1wbGl0dWRlID0gZGVmaW5lZChhbXBsaXR1ZGUsIDEpO1xuICAgIHJldHVybiBhbXBsaXR1ZGUgKiBub2lzZUdlbmVyYXRvci5ub2lzZTJEKHggKiBmcmVxdWVuY3ksIHkgKiBmcmVxdWVuY3kpO1xuICB9XG5cbiAgZnVuY3Rpb24gbm9pc2UzRCAoeCwgeSwgeiwgZnJlcXVlbmN5LCBhbXBsaXR1ZGUpIHtcbiAgICBpZiAoIWlzRmluaXRlKHgpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd4IGNvbXBvbmVudCBmb3Igbm9pc2UoKSBtdXN0IGJlIGZpbml0ZScpO1xuICAgIGlmICghaXNGaW5pdGUoeSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3kgY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgaWYgKCFpc0Zpbml0ZSh6KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigneiBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBmcmVxdWVuY3kgPSBkZWZpbmVkKGZyZXF1ZW5jeSwgMSk7XG4gICAgYW1wbGl0dWRlID0gZGVmaW5lZChhbXBsaXR1ZGUsIDEpO1xuICAgIHJldHVybiBhbXBsaXR1ZGUgKiBub2lzZUdlbmVyYXRvci5ub2lzZTNEKFxuICAgICAgeCAqIGZyZXF1ZW5jeSxcbiAgICAgIHkgKiBmcmVxdWVuY3ksXG4gICAgICB6ICogZnJlcXVlbmN5XG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vaXNlNEQgKHgsIHksIHosIHcsIGZyZXF1ZW5jeSwgYW1wbGl0dWRlKSB7XG4gICAgaWYgKCFpc0Zpbml0ZSh4KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigneCBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBpZiAoIWlzRmluaXRlKHkpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd5IGNvbXBvbmVudCBmb3Igbm9pc2UoKSBtdXN0IGJlIGZpbml0ZScpO1xuICAgIGlmICghaXNGaW5pdGUoeikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ogY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgaWYgKCFpc0Zpbml0ZSh3KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigndyBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBmcmVxdWVuY3kgPSBkZWZpbmVkKGZyZXF1ZW5jeSwgMSk7XG4gICAgYW1wbGl0dWRlID0gZGVmaW5lZChhbXBsaXR1ZGUsIDEpO1xuICAgIHJldHVybiBhbXBsaXR1ZGUgKiBub2lzZUdlbmVyYXRvci5ub2lzZTREKFxuICAgICAgeCAqIGZyZXF1ZW5jeSxcbiAgICAgIHkgKiBmcmVxdWVuY3ksXG4gICAgICB6ICogZnJlcXVlbmN5LFxuICAgICAgdyAqIGZyZXF1ZW5jeVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBzaWduICgpIHtcbiAgICByZXR1cm4gYm9vbGVhbigpID8gMSA6IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gYm9vbGVhbiAoKSB7XG4gICAgcmV0dXJuIHZhbHVlKCkgPiAwLjU7XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuY2UgKG4pIHtcbiAgICBuID0gZGVmaW5lZChuLCAwLjUpO1xuICAgIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIG4gdG8gYmUgYSBudW1iZXInKTtcbiAgICByZXR1cm4gdmFsdWUoKSA8IG47XG4gIH1cblxuICBmdW5jdGlvbiByYW5nZSAobWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtaW4gIT09ICdudW1iZXInIHx8IHR5cGVvZiBtYXggIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgYXJndW1lbnRzIHRvIGJlIG51bWJlcnMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUoKSAqIChtYXggLSBtaW4pICsgbWluO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZ2VGbG9vciAobWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBtaW4gIT09ICdudW1iZXInIHx8IHR5cGVvZiBtYXggIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhbGwgYXJndW1lbnRzIHRvIGJlIG51bWJlcnMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihyYW5nZShtaW4sIG1heCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGljayAoYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHJldHVybiBhcnJheVtyYW5nZUZsb29yKDAsIGFycmF5Lmxlbmd0aCldO1xuICB9XG5cbiAgZnVuY3Rpb24gc2h1ZmZsZSAoYXJyKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIEFycmF5LCBnb3QgJyArIHR5cGVvZiBhcnIpO1xuICAgIH1cblxuICAgIHZhciByYW5kO1xuICAgIHZhciB0bXA7XG4gICAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgdmFyIHJldCA9IGFyci5zbGljZSgpO1xuICAgIHdoaWxlIChsZW4pIHtcbiAgICAgIHJhbmQgPSBNYXRoLmZsb29yKHZhbHVlKCkgKiBsZW4tLSk7XG4gICAgICB0bXAgPSByZXRbbGVuXTtcbiAgICAgIHJldFtsZW5dID0gcmV0W3JhbmRdO1xuICAgICAgcmV0W3JhbmRdID0gdG1wO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZnVuY3Rpb24gb25DaXJjbGUgKHJhZGl1cywgb3V0KSB7XG4gICAgcmFkaXVzID0gZGVmaW5lZChyYWRpdXMsIDEpO1xuICAgIG91dCA9IG91dCB8fCBbXTtcbiAgICB2YXIgdGhldGEgPSB2YWx1ZSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSByYWRpdXMgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgb3V0WzFdID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBpbnNpZGVDaXJjbGUgKHJhZGl1cywgb3V0KSB7XG4gICAgcmFkaXVzID0gZGVmaW5lZChyYWRpdXMsIDEpO1xuICAgIG91dCA9IG91dCB8fCBbXTtcbiAgICBvbkNpcmNsZSgxLCBvdXQpO1xuICAgIHZhciByID0gcmFkaXVzICogTWF0aC5zcXJ0KHZhbHVlKCkpO1xuICAgIG91dFswXSAqPSByO1xuICAgIG91dFsxXSAqPSByO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBvblNwaGVyZSAocmFkaXVzLCBvdXQpIHtcbiAgICByYWRpdXMgPSBkZWZpbmVkKHJhZGl1cywgMSk7XG4gICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgIHZhciB1ID0gdmFsdWUoKSAqIE1hdGguUEkgKiAyO1xuICAgIHZhciB2ID0gdmFsdWUoKSAqIDIgLSAxO1xuICAgIHZhciBwaGkgPSB1O1xuICAgIHZhciB0aGV0YSA9IE1hdGguYWNvcyh2KTtcbiAgICBvdXRbMF0gPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLmNvcyhwaGkpO1xuICAgIG91dFsxXSA9IHJhZGl1cyAqIE1hdGguc2luKHRoZXRhKSAqIE1hdGguc2luKHBoaSk7XG4gICAgb3V0WzJdID0gcmFkaXVzICogTWF0aC5jb3ModGhldGEpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBpbnNpZGVTcGhlcmUgKHJhZGl1cywgb3V0KSB7XG4gICAgcmFkaXVzID0gZGVmaW5lZChyYWRpdXMsIDEpO1xuICAgIG91dCA9IG91dCB8fCBbXTtcbiAgICB2YXIgdSA9IHZhbHVlKCkgKiBNYXRoLlBJICogMjtcbiAgICB2YXIgdiA9IHZhbHVlKCkgKiAyIC0gMTtcbiAgICB2YXIgayA9IHZhbHVlKCk7XG5cbiAgICB2YXIgcGhpID0gdTtcbiAgICB2YXIgdGhldGEgPSBNYXRoLmFjb3Modik7XG4gICAgdmFyIHIgPSByYWRpdXMgKiBNYXRoLmNicnQoayk7XG4gICAgb3V0WzBdID0gciAqIE1hdGguc2luKHRoZXRhKSAqIE1hdGguY29zKHBoaSk7XG4gICAgb3V0WzFdID0gciAqIE1hdGguc2luKHRoZXRhKSAqIE1hdGguc2luKHBoaSk7XG4gICAgb3V0WzJdID0gciAqIE1hdGguY29zKHRoZXRhKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gcXVhdGVybmlvbiAob3V0KSB7XG4gICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgIHZhciB1MSA9IHZhbHVlKCk7XG4gICAgdmFyIHUyID0gdmFsdWUoKTtcbiAgICB2YXIgdTMgPSB2YWx1ZSgpO1xuXG4gICAgdmFyIHNxMSA9IE1hdGguc3FydCgxIC0gdTEpO1xuICAgIHZhciBzcTIgPSBNYXRoLnNxcnQodTEpO1xuXG4gICAgdmFyIHRoZXRhMSA9IE1hdGguUEkgKiAyICogdTI7XG4gICAgdmFyIHRoZXRhMiA9IE1hdGguUEkgKiAyICogdTM7XG5cbiAgICB2YXIgeCA9IE1hdGguc2luKHRoZXRhMSkgKiBzcTE7XG4gICAgdmFyIHkgPSBNYXRoLmNvcyh0aGV0YTEpICogc3ExO1xuICAgIHZhciB6ID0gTWF0aC5zaW4odGhldGEyKSAqIHNxMjtcbiAgICB2YXIgdyA9IE1hdGguY29zKHRoZXRhMikgKiBzcTI7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gdztcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gd2VpZ2h0ZWRTZXQgKHNldCkge1xuICAgIHNldCA9IHNldCB8fCBbXTtcbiAgICBpZiAoc2V0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHNldFt3ZWlnaHRlZFNldEluZGV4KHNldCldLnZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gd2VpZ2h0ZWRTZXRJbmRleCAoc2V0KSB7XG4gICAgc2V0ID0gc2V0IHx8IFtdO1xuICAgIGlmIChzZXQubGVuZ3RoID09PSAwKSByZXR1cm4gLTE7XG4gICAgcmV0dXJuIHdlaWdodGVkKHNldC5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgIHJldHVybiBzLndlaWdodDtcbiAgICB9KSk7XG4gIH1cblxuICBmdW5jdGlvbiB3ZWlnaHRlZCAod2VpZ2h0cykge1xuICAgIHdlaWdodHMgPSB3ZWlnaHRzIHx8IFtdO1xuICAgIGlmICh3ZWlnaHRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xO1xuICAgIHZhciB0b3RhbFdlaWdodCA9IDA7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgd2VpZ2h0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxXZWlnaHQgKz0gd2VpZ2h0c1tpXTtcbiAgICB9XG5cbiAgICBpZiAodG90YWxXZWlnaHQgPD0gMCkgdGhyb3cgbmV3IEVycm9yKCdXZWlnaHRzIG11c3Qgc3VtIHRvID4gMCcpO1xuXG4gICAgdmFyIHJhbmRvbSA9IHZhbHVlKCkgKiB0b3RhbFdlaWdodDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgd2VpZ2h0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJhbmRvbSA8IHdlaWdodHNbaV0pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgICByYW5kb20gLT0gd2VpZ2h0c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBmdW5jdGlvbiBnYXVzc2lhbiAobWVhbiwgc3RhbmRhcmREZXJpdmF0aW9uKSB7XG4gICAgbWVhbiA9IGRlZmluZWQobWVhbiwgMCk7XG4gICAgc3RhbmRhcmREZXJpdmF0aW9uID0gZGVmaW5lZChzdGFuZGFyZERlcml2YXRpb24sIDEpO1xuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL29wZW5qZGstbWlycm9yL2pkazd1LWpkay9ibG9iL2Y0ZDgwOTU3ZTg5YTE5YTI5YmI5Zjk4MDdkMmEyODM1MWVkN2Y3ZGYvc3JjL3NoYXJlL2NsYXNzZXMvamF2YS91dGlsL1JhbmRvbS5qYXZhI0w0OTZcbiAgICBpZiAoX2hhc05leHRHYXVzc2lhbikge1xuICAgICAgX2hhc05leHRHYXVzc2lhbiA9IGZhbHNlO1xuICAgICAgdmFyIHJlc3VsdCA9IF9uZXh0R2F1c3NpYW47XG4gICAgICBfbmV4dEdhdXNzaWFuID0gbnVsbDtcbiAgICAgIHJldHVybiBtZWFuICsgc3RhbmRhcmREZXJpdmF0aW9uICogcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdjEgPSAwO1xuICAgICAgdmFyIHYyID0gMDtcbiAgICAgIHZhciBzID0gMDtcbiAgICAgIGRvIHtcbiAgICAgICAgdjEgPSB2YWx1ZSgpICogMiAtIDE7IC8vIGJldHdlZW4gLTEgYW5kIDFcbiAgICAgICAgdjIgPSB2YWx1ZSgpICogMiAtIDE7IC8vIGJldHdlZW4gLTEgYW5kIDFcbiAgICAgICAgcyA9IHYxICogdjEgKyB2MiAqIHYyO1xuICAgICAgfSB3aGlsZSAocyA+PSAxIHx8IHMgPT09IDApO1xuICAgICAgdmFyIG11bHRpcGxpZXIgPSBNYXRoLnNxcnQoLTIgKiBNYXRoLmxvZyhzKSAvIHMpO1xuICAgICAgX25leHRHYXVzc2lhbiA9ICh2MiAqIG11bHRpcGxpZXIpO1xuICAgICAgX2hhc05leHRHYXVzc2lhbiA9IHRydWU7XG4gICAgICByZXR1cm4gbWVhbiArIHN0YW5kYXJkRGVyaXZhdGlvbiAqICh2MSAqIG11bHRpcGxpZXIpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVJhbmRvbSgpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLmNhbnZhc1NrZXRjaCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7XG5cblx0Lypcblx0b2JqZWN0LWFzc2lnblxuXHQoYykgU2luZHJlIFNvcmh1c1xuXHRAbGljZW5zZSBNSVRcblx0Ki9cblx0LyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblx0dmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cdHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdHZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXHRmdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0XHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBPYmplY3QodmFsKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0XHR9XG5cdFx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0XHR9KTtcblx0XHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0dmFyIG9iamVjdEFzc2lnbiA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHRcdHZhciBmcm9tO1xuXHRcdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdFx0dmFyIHN5bWJvbHM7XG5cblx0XHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdG87XG5cdH07XG5cblx0dmFyIGNvbW1vbmpzR2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB7fTtcblxuXHRmdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdFx0cmV0dXJuIG1vZHVsZSA9IHsgZXhwb3J0czoge30gfSwgZm4obW9kdWxlLCBtb2R1bGUuZXhwb3J0cyksIG1vZHVsZS5leHBvcnRzO1xuXHR9XG5cblx0dmFyIGJyb3dzZXIgPVxuXHQgIGNvbW1vbmpzR2xvYmFsLnBlcmZvcm1hbmNlICYmXG5cdCAgY29tbW9uanNHbG9iYWwucGVyZm9ybWFuY2Uubm93ID8gZnVuY3Rpb24gbm93KCkge1xuXHQgICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpXG5cdCAgfSA6IERhdGUubm93IHx8IGZ1bmN0aW9uIG5vdygpIHtcblx0ICAgIHJldHVybiArbmV3IERhdGVcblx0ICB9O1xuXG5cdHZhciBpc1Byb21pc2VfMSA9IGlzUHJvbWlzZTtcblxuXHRmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG5cdCAgcmV0dXJuICEhb2JqICYmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG5cdH1cblxuXHR2YXIgaXNEb20gPSBpc05vZGU7XG5cblx0ZnVuY3Rpb24gaXNOb2RlICh2YWwpIHtcblx0ICByZXR1cm4gKCF2YWwgfHwgdHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpXG5cdCAgICA/IGZhbHNlXG5cdCAgICA6ICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygd2luZG93Lk5vZGUgPT09ICdvYmplY3QnKVxuXHQgICAgICA/ICh2YWwgaW5zdGFuY2VvZiB3aW5kb3cuTm9kZSlcblx0ICAgICAgOiAodHlwZW9mIHZhbC5ub2RlVHlwZSA9PT0gJ251bWJlcicpICYmXG5cdCAgICAgICAgKHR5cGVvZiB2YWwubm9kZU5hbWUgPT09ICdzdHJpbmcnKVxuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Q2xpZW50QVBJKCkge1xuXHQgICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvd1snY2FudmFzLXNrZXRjaC1jbGknXTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRlZmluZWQoKSB7XG5cdCAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cblx0ICAgIGZvciAodmFyIGkgPSAwO2kgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICBpZiAoYXJndW1lbnRzJDFbaV0gIT0gbnVsbCkge1xuXHQgICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzJDFbaV07XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGlzQnJvd3NlcigpIHtcblx0ICAgIHJldHVybiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXHR9XG5cblx0ZnVuY3Rpb24gaXNXZWJHTENvbnRleHQoY3R4KSB7XG5cdCAgICByZXR1cm4gdHlwZW9mIGN0eC5jbGVhciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgY3R4LmNsZWFyQ29sb3IgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGN0eC5idWZmZXJEYXRhID09PSAnZnVuY3Rpb24nO1xuXHR9XG5cblx0ZnVuY3Rpb24gaXNDYW52YXMoZWxlbWVudCkge1xuXHQgICAgcmV0dXJuIGlzRG9tKGVsZW1lbnQpICYmIC9jYW52YXMvaS50ZXN0KGVsZW1lbnQubm9kZU5hbWUpICYmIHR5cGVvZiBlbGVtZW50LmdldENvbnRleHQgPT09ICdmdW5jdGlvbic7XG5cdH1cblxuXHR2YXIga2V5cyA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcblx0ZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nXG5cdCAgPyBPYmplY3Qua2V5cyA6IHNoaW07XG5cblx0ZXhwb3J0cy5zaGltID0gc2hpbTtcblx0ZnVuY3Rpb24gc2hpbSAob2JqKSB7XG5cdCAgdmFyIGtleXMgPSBbXTtcblx0ICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcblx0ICByZXR1cm4ga2V5cztcblx0fVxuXHR9KTtcblx0dmFyIGtleXNfMSA9IGtleXMuc2hpbTtcblxuXHR2YXIgaXNfYXJndW1lbnRzID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuXHR2YXIgc3VwcG9ydHNBcmd1bWVudHNDbGFzcyA9IChmdW5jdGlvbigpe1xuXHQgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKVxuXHR9KSgpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG5cdGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPyBzdXBwb3J0ZWQgOiB1bnN1cHBvcnRlZDtcblxuXHRleHBvcnRzLnN1cHBvcnRlZCA9IHN1cHBvcnRlZDtcblx0ZnVuY3Rpb24gc3VwcG9ydGVkKG9iamVjdCkge1xuXHQgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0fVxuXHRleHBvcnRzLnVuc3VwcG9ydGVkID0gdW5zdXBwb3J0ZWQ7XG5cdGZ1bmN0aW9uIHVuc3VwcG9ydGVkKG9iamVjdCl7XG5cdCAgcmV0dXJuIG9iamVjdCAmJlxuXHQgICAgdHlwZW9mIG9iamVjdCA9PSAnb2JqZWN0JyAmJlxuXHQgICAgdHlwZW9mIG9iamVjdC5sZW5ndGggPT0gJ251bWJlcicgJiZcblx0ICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdjYWxsZWUnKSAmJlxuXHQgICAgIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsICdjYWxsZWUnKSB8fFxuXHQgICAgZmFsc2U7XG5cdH19KTtcblx0dmFyIGlzX2FyZ3VtZW50c18xID0gaXNfYXJndW1lbnRzLnN1cHBvcnRlZDtcblx0dmFyIGlzX2FyZ3VtZW50c18yID0gaXNfYXJndW1lbnRzLnVuc3VwcG9ydGVkO1xuXG5cdHZhciBkZWVwRXF1YWxfMSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUpIHtcblx0dmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuXG5cblx0dmFyIGRlZXBFcXVhbCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpIHtcblx0ICBpZiAoIW9wdHMpIG9wdHMgPSB7fTtcblx0ICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cblx0ICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuXHQgICAgcmV0dXJuIHRydWU7XG5cblx0ICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUgJiYgZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG5cdCAgICByZXR1cm4gYWN0dWFsLmdldFRpbWUoKSA9PT0gZXhwZWN0ZWQuZ2V0VGltZSgpO1xuXG5cdCAgLy8gNy4zLiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuXHQgIC8vIGVxdWl2YWxlbmNlIGlzIGRldGVybWluZWQgYnkgPT0uXG5cdCAgfSBlbHNlIGlmICghYWN0dWFsIHx8ICFleHBlY3RlZCB8fCB0eXBlb2YgYWN0dWFsICE9ICdvYmplY3QnICYmIHR5cGVvZiBleHBlY3RlZCAhPSAnb2JqZWN0Jykge1xuXHQgICAgcmV0dXJuIG9wdHMuc3RyaWN0ID8gYWN0dWFsID09PSBleHBlY3RlZCA6IGFjdHVhbCA9PSBleHBlY3RlZDtcblxuXHQgIC8vIDcuNC4gRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuXHQgIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuXHQgIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcblx0ICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG5cdCAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcblx0ICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIG9iakVxdWl2KGFjdHVhbCwgZXhwZWN0ZWQsIG9wdHMpO1xuXHQgIH1cblx0fTtcblxuXHRmdW5jdGlvbiBpc1VuZGVmaW5lZE9yTnVsbCh2YWx1ZSkge1xuXHQgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuXHR9XG5cblx0ZnVuY3Rpb24gaXNCdWZmZXIgKHgpIHtcblx0ICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcblx0ICBpZiAodHlwZW9mIHguY29weSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgeC5zbGljZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblx0ICBpZiAoeC5sZW5ndGggPiAwICYmIHR5cGVvZiB4WzBdICE9PSAnbnVtYmVyJykgcmV0dXJuIGZhbHNlO1xuXHQgIHJldHVybiB0cnVlO1xuXHR9XG5cblx0ZnVuY3Rpb24gb2JqRXF1aXYoYSwgYiwgb3B0cykge1xuXHQgIHZhciBpLCBrZXk7XG5cdCAgaWYgKGlzVW5kZWZpbmVkT3JOdWxsKGEpIHx8IGlzVW5kZWZpbmVkT3JOdWxsKGIpKVxuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cblx0ICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSByZXR1cm4gZmFsc2U7XG5cdCAgLy9+fn5JJ3ZlIG1hbmFnZWQgdG8gYnJlYWsgT2JqZWN0LmtleXMgdGhyb3VnaCBzY3Jld3kgYXJndW1lbnRzIHBhc3NpbmcuXG5cdCAgLy8gICBDb252ZXJ0aW5nIHRvIGFycmF5IHNvbHZlcyB0aGUgcHJvYmxlbS5cblx0ICBpZiAoaXNfYXJndW1lbnRzKGEpKSB7XG5cdCAgICBpZiAoIWlzX2FyZ3VtZW50cyhiKSkge1xuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICB9XG5cdCAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG5cdCAgICBiID0gcFNsaWNlLmNhbGwoYik7XG5cdCAgICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIG9wdHMpO1xuXHQgIH1cblx0ICBpZiAoaXNCdWZmZXIoYSkpIHtcblx0ICAgIGlmICghaXNCdWZmZXIoYikpIHtcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfVxuXHQgICAgaWYgKGEubGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXHQgICAgZm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHJldHVybiBmYWxzZTtcblx0ICAgIH1cblx0ICAgIHJldHVybiB0cnVlO1xuXHQgIH1cblx0ICB0cnkge1xuXHQgICAgdmFyIGthID0ga2V5cyhhKSxcblx0ICAgICAgICBrYiA9IGtleXMoYik7XG5cdCAgfSBjYXRjaCAoZSkgey8vaGFwcGVucyB3aGVuIG9uZSBpcyBhIHN0cmluZyBsaXRlcmFsIGFuZCB0aGUgb3RoZXIgaXNuJ3Rcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdCAgLy8gaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChrZXlzIGluY29ycG9yYXRlc1xuXHQgIC8vIGhhc093blByb3BlcnR5KVxuXHQgIGlmIChrYS5sZW5ndGggIT0ga2IubGVuZ3RoKVxuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG5cdCAga2Euc29ydCgpO1xuXHQgIGtiLnNvcnQoKTtcblx0ICAvL35+fmNoZWFwIGtleSB0ZXN0XG5cdCAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgIGlmIChrYVtpXSAhPSBrYltpXSlcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblx0ICAvL2VxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeSBjb3JyZXNwb25kaW5nIGtleSwgYW5kXG5cdCAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG5cdCAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgIGtleSA9IGthW2ldO1xuXHQgICAgaWYgKCFkZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMpKSByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIHJldHVybiB0eXBlb2YgYSA9PT0gdHlwZW9mIGI7XG5cdH1cblx0fSk7XG5cblx0dmFyIGRhdGVmb3JtYXQgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRzKSB7XG5cdC8qXG5cdCAqIERhdGUgRm9ybWF0IDEuMi4zXG5cdCAqIChjKSAyMDA3LTIwMDkgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+XG5cdCAqIE1JVCBsaWNlbnNlXG5cdCAqXG5cdCAqIEluY2x1ZGVzIGVuaGFuY2VtZW50cyBieSBTY290dCBUcmVuZGEgPHNjb3R0LnRyZW5kYS5uZXQ+XG5cdCAqIGFuZCBLcmlzIEtvd2FsIDxjaXhhci5jb20vfmtyaXMua293YWwvPlxuXHQgKlxuXHQgKiBBY2NlcHRzIGEgZGF0ZSwgYSBtYXNrLCBvciBhIGRhdGUgYW5kIGEgbWFzay5cblx0ICogUmV0dXJucyBhIGZvcm1hdHRlZCB2ZXJzaW9uIG9mIHRoZSBnaXZlbiBkYXRlLlxuXHQgKiBUaGUgZGF0ZSBkZWZhdWx0cyB0byB0aGUgY3VycmVudCBkYXRlL3RpbWUuXG5cdCAqIFRoZSBtYXNrIGRlZmF1bHRzIHRvIGRhdGVGb3JtYXQubWFza3MuZGVmYXVsdC5cblx0ICovXG5cblx0KGZ1bmN0aW9uKGdsb2JhbCkge1xuXG5cdCAgdmFyIGRhdGVGb3JtYXQgPSAoZnVuY3Rpb24oKSB7XG5cdCAgICAgIHZhciB0b2tlbiA9IC9kezEsNH18bXsxLDR9fHl5KD86eXkpP3woW0hoTXNUdF0pXFwxP3xbTGxvU1pXTl18XCJbXlwiXSpcInwnW14nXSonL2c7XG5cdCAgICAgIHZhciB0aW1lem9uZSA9IC9cXGIoPzpbUE1DRUFdW1NEUF1UfCg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lfCg/OkdNVHxVVEMpKD86Wy0rXVxcZHs0fSk/KVxcYi9nO1xuXHQgICAgICB2YXIgdGltZXpvbmVDbGlwID0gL1teLStcXGRBLVpdL2c7XG5cdCAgXG5cdCAgICAgIC8vIFJlZ2V4ZXMgYW5kIHN1cHBvcnRpbmcgZnVuY3Rpb25zIGFyZSBjYWNoZWQgdGhyb3VnaCBjbG9zdXJlXG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoZGF0ZSwgbWFzaywgdXRjLCBnbXQpIHtcblx0ICBcblx0ICAgICAgICAvLyBZb3UgY2FuJ3QgcHJvdmlkZSB1dGMgaWYgeW91IHNraXAgb3RoZXIgYXJncyAodXNlIHRoZSAnVVRDOicgbWFzayBwcmVmaXgpXG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYga2luZE9mKGRhdGUpID09PSAnc3RyaW5nJyAmJiAhL1xcZC8udGVzdChkYXRlKSkge1xuXHQgICAgICAgICAgbWFzayA9IGRhdGU7XG5cdCAgICAgICAgICBkYXRlID0gdW5kZWZpbmVkO1xuXHQgICAgICAgIH1cblx0ICBcblx0ICAgICAgICBkYXRlID0gZGF0ZSB8fCBuZXcgRGF0ZTtcblx0ICBcblx0ICAgICAgICBpZighKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSkge1xuXHQgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuXHQgICAgICAgIH1cblx0ICBcblx0ICAgICAgICBpZiAoaXNOYU4oZGF0ZSkpIHtcblx0ICAgICAgICAgIHRocm93IFR5cGVFcnJvcignSW52YWxpZCBkYXRlJyk7XG5cdCAgICAgICAgfVxuXHQgIFxuXHQgICAgICAgIG1hc2sgPSBTdHJpbmcoZGF0ZUZvcm1hdC5tYXNrc1ttYXNrXSB8fCBtYXNrIHx8IGRhdGVGb3JtYXQubWFza3NbJ2RlZmF1bHQnXSk7XG5cdCAgXG5cdCAgICAgICAgLy8gQWxsb3cgc2V0dGluZyB0aGUgdXRjL2dtdCBhcmd1bWVudCB2aWEgdGhlIG1hc2tcblx0ICAgICAgICB2YXIgbWFza1NsaWNlID0gbWFzay5zbGljZSgwLCA0KTtcblx0ICAgICAgICBpZiAobWFza1NsaWNlID09PSAnVVRDOicgfHwgbWFza1NsaWNlID09PSAnR01UOicpIHtcblx0ICAgICAgICAgIG1hc2sgPSBtYXNrLnNsaWNlKDQpO1xuXHQgICAgICAgICAgdXRjID0gdHJ1ZTtcblx0ICAgICAgICAgIGlmIChtYXNrU2xpY2UgPT09ICdHTVQ6Jykge1xuXHQgICAgICAgICAgICBnbXQgPSB0cnVlO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICBcblx0ICAgICAgICB2YXIgXyA9IHV0YyA/ICdnZXRVVEMnIDogJ2dldCc7XG5cdCAgICAgICAgdmFyIGQgPSBkYXRlW18gKyAnRGF0ZSddKCk7XG5cdCAgICAgICAgdmFyIEQgPSBkYXRlW18gKyAnRGF5J10oKTtcblx0ICAgICAgICB2YXIgbSA9IGRhdGVbXyArICdNb250aCddKCk7XG5cdCAgICAgICAgdmFyIHkgPSBkYXRlW18gKyAnRnVsbFllYXInXSgpO1xuXHQgICAgICAgIHZhciBIID0gZGF0ZVtfICsgJ0hvdXJzJ10oKTtcblx0ICAgICAgICB2YXIgTSA9IGRhdGVbXyArICdNaW51dGVzJ10oKTtcblx0ICAgICAgICB2YXIgcyA9IGRhdGVbXyArICdTZWNvbmRzJ10oKTtcblx0ICAgICAgICB2YXIgTCA9IGRhdGVbXyArICdNaWxsaXNlY29uZHMnXSgpO1xuXHQgICAgICAgIHZhciBvID0gdXRjID8gMCA6IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblx0ICAgICAgICB2YXIgVyA9IGdldFdlZWsoZGF0ZSk7XG5cdCAgICAgICAgdmFyIE4gPSBnZXREYXlPZldlZWsoZGF0ZSk7XG5cdCAgICAgICAgdmFyIGZsYWdzID0ge1xuXHQgICAgICAgICAgZDogICAgZCxcblx0ICAgICAgICAgIGRkOiAgIHBhZChkKSxcblx0ICAgICAgICAgIGRkZDogIGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEXSxcblx0ICAgICAgICAgIGRkZGQ6IGRhdGVGb3JtYXQuaTE4bi5kYXlOYW1lc1tEICsgN10sXG5cdCAgICAgICAgICBtOiAgICBtICsgMSxcblx0ICAgICAgICAgIG1tOiAgIHBhZChtICsgMSksXG5cdCAgICAgICAgICBtbW06ICBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttXSxcblx0ICAgICAgICAgIG1tbW06IGRhdGVGb3JtYXQuaTE4bi5tb250aE5hbWVzW20gKyAxMl0sXG5cdCAgICAgICAgICB5eTogICBTdHJpbmcoeSkuc2xpY2UoMiksXG5cdCAgICAgICAgICB5eXl5OiB5LFxuXHQgICAgICAgICAgaDogICAgSCAlIDEyIHx8IDEyLFxuXHQgICAgICAgICAgaGg6ICAgcGFkKEggJSAxMiB8fCAxMiksXG5cdCAgICAgICAgICBIOiAgICBILFxuXHQgICAgICAgICAgSEg6ICAgcGFkKEgpLFxuXHQgICAgICAgICAgTTogICAgTSxcblx0ICAgICAgICAgIE1NOiAgIHBhZChNKSxcblx0ICAgICAgICAgIHM6ICAgIHMsXG5cdCAgICAgICAgICBzczogICBwYWQocyksXG5cdCAgICAgICAgICBsOiAgICBwYWQoTCwgMyksXG5cdCAgICAgICAgICBMOiAgICBwYWQoTWF0aC5yb3VuZChMIC8gMTApKSxcblx0ICAgICAgICAgIHQ6ICAgIEggPCAxMiA/IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMF0gOiBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzFdLFxuXHQgICAgICAgICAgdHQ6ICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1syXSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbM10sXG5cdCAgICAgICAgICBUOiAgICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzRdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s1XSxcblx0ICAgICAgICAgIFRUOiAgIEggPCAxMiA/IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNl0gOiBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzddLFxuXHQgICAgICAgICAgWjogICAgZ210ID8gJ0dNVCcgOiB1dGMgPyAnVVRDJyA6IChTdHJpbmcoZGF0ZSkubWF0Y2godGltZXpvbmUpIHx8IFsnJ10pLnBvcCgpLnJlcGxhY2UodGltZXpvbmVDbGlwLCAnJyksXG5cdCAgICAgICAgICBvOiAgICAobyA+IDAgPyAnLScgOiAnKycpICsgcGFkKE1hdGguZmxvb3IoTWF0aC5hYnMobykgLyA2MCkgKiAxMDAgKyBNYXRoLmFicyhvKSAlIDYwLCA0KSxcblx0ICAgICAgICAgIFM6ICAgIFsndGgnLCAnc3QnLCAnbmQnLCAncmQnXVtkICUgMTAgPiAzID8gMCA6IChkICUgMTAwIC0gZCAlIDEwICE9IDEwKSAqIGQgJSAxMF0sXG5cdCAgICAgICAgICBXOiAgICBXLFxuXHQgICAgICAgICAgTjogICAgTlxuXHQgICAgICAgIH07XG5cdCAgXG5cdCAgICAgICAgcmV0dXJuIG1hc2sucmVwbGFjZSh0b2tlbiwgZnVuY3Rpb24gKG1hdGNoKSB7XG5cdCAgICAgICAgICBpZiAobWF0Y2ggaW4gZmxhZ3MpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZsYWdzW21hdGNoXTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICAgIHJldHVybiBtYXRjaC5zbGljZSgxLCBtYXRjaC5sZW5ndGggLSAxKTtcblx0ICAgICAgICB9KTtcblx0ICAgICAgfTtcblx0ICAgIH0pKCk7XG5cblx0ICBkYXRlRm9ybWF0Lm1hc2tzID0ge1xuXHQgICAgJ2RlZmF1bHQnOiAgICAgICAgICAgICAgICdkZGQgbW1tIGRkIHl5eXkgSEg6TU06c3MnLFxuXHQgICAgJ3Nob3J0RGF0ZSc6ICAgICAgICAgICAgICdtL2QveXknLFxuXHQgICAgJ21lZGl1bURhdGUnOiAgICAgICAgICAgICdtbW0gZCwgeXl5eScsXG5cdCAgICAnbG9uZ0RhdGUnOiAgICAgICAgICAgICAgJ21tbW0gZCwgeXl5eScsXG5cdCAgICAnZnVsbERhdGUnOiAgICAgICAgICAgICAgJ2RkZGQsIG1tbW0gZCwgeXl5eScsXG5cdCAgICAnc2hvcnRUaW1lJzogICAgICAgICAgICAgJ2g6TU0gVFQnLFxuXHQgICAgJ21lZGl1bVRpbWUnOiAgICAgICAgICAgICdoOk1NOnNzIFRUJyxcblx0ICAgICdsb25nVGltZSc6ICAgICAgICAgICAgICAnaDpNTTpzcyBUVCBaJyxcblx0ICAgICdpc29EYXRlJzogICAgICAgICAgICAgICAneXl5eS1tbS1kZCcsXG5cdCAgICAnaXNvVGltZSc6ICAgICAgICAgICAgICAgJ0hIOk1NOnNzJyxcblx0ICAgICdpc29EYXRlVGltZSc6ICAgICAgICAgICAneXl5eS1tbS1kZFxcJ1RcXCdISDpNTTpzc28nLFxuXHQgICAgJ2lzb1V0Y0RhdGVUaW1lJzogICAgICAgICdVVEM6eXl5eS1tbS1kZFxcJ1RcXCdISDpNTTpzc1xcJ1pcXCcnLFxuXHQgICAgJ2V4cGlyZXNIZWFkZXJGb3JtYXQnOiAgICdkZGQsIGRkIG1tbSB5eXl5IEhIOk1NOnNzIFonXG5cdCAgfTtcblxuXHQgIC8vIEludGVybmF0aW9uYWxpemF0aW9uIHN0cmluZ3Ncblx0ICBkYXRlRm9ybWF0LmkxOG4gPSB7XG5cdCAgICBkYXlOYW1lczogW1xuXHQgICAgICAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0Jyxcblx0ICAgICAgJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J1xuXHQgICAgXSxcblx0ICAgIG1vbnRoTmFtZXM6IFtcblx0ICAgICAgJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJyxcblx0ICAgICAgJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXG5cdCAgICBdLFxuXHQgICAgdGltZU5hbWVzOiBbXG5cdCAgICAgICdhJywgJ3AnLCAnYW0nLCAncG0nLCAnQScsICdQJywgJ0FNJywgJ1BNJ1xuXHQgICAgXVxuXHQgIH07XG5cblx0ZnVuY3Rpb24gcGFkKHZhbCwgbGVuKSB7XG5cdCAgdmFsID0gU3RyaW5nKHZhbCk7XG5cdCAgbGVuID0gbGVuIHx8IDI7XG5cdCAgd2hpbGUgKHZhbC5sZW5ndGggPCBsZW4pIHtcblx0ICAgIHZhbCA9ICcwJyArIHZhbDtcblx0ICB9XG5cdCAgcmV0dXJuIHZhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIElTTyA4NjAxIHdlZWsgbnVtYmVyXG5cdCAqIEJhc2VkIG9uIGNvbW1lbnRzIGZyb21cblx0ICogaHR0cDovL3RlY2hibG9nLnByb2N1cmlvcy5ubC9rL242MTgvbmV3cy92aWV3LzMzNzk2LzE0ODYzL0NhbGN1bGF0ZS1JU08tODYwMS13ZWVrLWFuZC15ZWFyLWluLWphdmFzY3JpcHQuaHRtbFxuXHQgKlxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9XG5cdCAqL1xuXHRmdW5jdGlvbiBnZXRXZWVrKGRhdGUpIHtcblx0ICAvLyBSZW1vdmUgdGltZSBjb21wb25lbnRzIG9mIGRhdGVcblx0ICB2YXIgdGFyZ2V0VGh1cnNkYXkgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xuXG5cdCAgLy8gQ2hhbmdlIGRhdGUgdG8gVGh1cnNkYXkgc2FtZSB3ZWVrXG5cdCAgdGFyZ2V0VGh1cnNkYXkuc2V0RGF0ZSh0YXJnZXRUaHVyc2RheS5nZXREYXRlKCkgLSAoKHRhcmdldFRodXJzZGF5LmdldERheSgpICsgNikgJSA3KSArIDMpO1xuXG5cdCAgLy8gVGFrZSBKYW51YXJ5IDR0aCBhcyBpdCBpcyBhbHdheXMgaW4gd2VlayAxIChzZWUgSVNPIDg2MDEpXG5cdCAgdmFyIGZpcnN0VGh1cnNkYXkgPSBuZXcgRGF0ZSh0YXJnZXRUaHVyc2RheS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcblxuXHQgIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuXHQgIGZpcnN0VGh1cnNkYXkuc2V0RGF0ZShmaXJzdFRodXJzZGF5LmdldERhdGUoKSAtICgoZmlyc3RUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKTtcblxuXHQgIC8vIENoZWNrIGlmIGRheWxpZ2h0LXNhdmluZy10aW1lLXN3aXRjaCBvY2N1cnJlZCBhbmQgY29ycmVjdCBmb3IgaXRcblx0ICB2YXIgZHMgPSB0YXJnZXRUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpIC0gZmlyc3RUaHVyc2RheS5nZXRUaW1lem9uZU9mZnNldCgpO1xuXHQgIHRhcmdldFRodXJzZGF5LnNldEhvdXJzKHRhcmdldFRodXJzZGF5LmdldEhvdXJzKCkgLSBkcyk7XG5cblx0ICAvLyBOdW1iZXIgb2Ygd2Vla3MgYmV0d2VlbiB0YXJnZXQgVGh1cnNkYXkgYW5kIGZpcnN0IFRodXJzZGF5XG5cdCAgdmFyIHdlZWtEaWZmID0gKHRhcmdldFRodXJzZGF5IC0gZmlyc3RUaHVyc2RheSkgLyAoODY0MDAwMDAqNyk7XG5cdCAgcmV0dXJuIDEgKyBNYXRoLmZsb29yKHdlZWtEaWZmKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgSVNPLTg2MDEgbnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IG9mIHRoZSB3ZWVrXG5cdCAqIDEgKGZvciBNb25kYXkpIHRocm91Z2ggNyAoZm9yIFN1bmRheSlcblx0ICogXG5cdCAqIEBwYXJhbSAge09iamVjdH0gYGRhdGVgXG5cdCAqIEByZXR1cm4ge051bWJlcn1cblx0ICovXG5cdGZ1bmN0aW9uIGdldERheU9mV2VlayhkYXRlKSB7XG5cdCAgdmFyIGRvdyA9IGRhdGUuZ2V0RGF5KCk7XG5cdCAgaWYoZG93ID09PSAwKSB7XG5cdCAgICBkb3cgPSA3O1xuXHQgIH1cblx0ICByZXR1cm4gZG93O1xuXHR9XG5cblx0LyoqXG5cdCAqIGtpbmQtb2Ygc2hvcnRjdXRcblx0ICogQHBhcmFtICB7Kn0gdmFsXG5cdCAqIEByZXR1cm4ge1N0cmluZ31cblx0ICovXG5cdGZ1bmN0aW9uIGtpbmRPZih2YWwpIHtcblx0ICBpZiAodmFsID09PSBudWxsKSB7XG5cdCAgICByZXR1cm4gJ251bGwnO1xuXHQgIH1cblxuXHQgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuXHQgIH1cblxuXHQgIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0Jykge1xuXHQgICAgcmV0dXJuIHR5cGVvZiB2YWw7XG5cdCAgfVxuXG5cdCAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuXHQgICAgcmV0dXJuICdhcnJheSc7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIHt9LnRvU3RyaW5nLmNhbGwodmFsKVxuXHQgICAgLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpO1xuXHR9XG5cblxuXHQgIGlmICh0eXBlb2YgdW5kZWZpbmVkID09PSAnZnVuY3Rpb24nICYmIHVuZGVmaW5lZC5hbWQpIHtcblx0ICAgIHVuZGVmaW5lZChmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBkYXRlRm9ybWF0O1xuXHQgICAgfSk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIG1vZHVsZS5leHBvcnRzID0gZGF0ZUZvcm1hdDtcblx0ICB9XG5cdH0pKGNvbW1vbmpzR2xvYmFsKTtcblx0fSk7XG5cblx0LyohXG5cdCAqIHJlcGVhdC1zdHJpbmcgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3JlcGVhdC1zdHJpbmc+XG5cdCAqXG5cdCAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cblx0ICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuXHQgKi9cblxuXHQvKipcblx0ICogUmVzdWx0cyBjYWNoZVxuXHQgKi9cblxuXHR2YXIgcmVzID0gJyc7XG5cdHZhciBjYWNoZTtcblxuXHQvKipcblx0ICogRXhwb3NlIGByZXBlYXRgXG5cdCAqL1xuXG5cdHZhciByZXBlYXRTdHJpbmcgPSByZXBlYXQ7XG5cblx0LyoqXG5cdCAqIFJlcGVhdCB0aGUgZ2l2ZW4gYHN0cmluZ2AgdGhlIHNwZWNpZmllZCBgbnVtYmVyYFxuXHQgKiBvZiB0aW1lcy5cblx0ICpcblx0ICogKipFeGFtcGxlOioqXG5cdCAqXG5cdCAqIGBgYGpzXG5cdCAqIHZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG5cdCAqIHJlcGVhdCgnQScsIDUpO1xuXHQgKiAvLz0+IEFBQUFBXG5cdCAqIGBgYFxuXHQgKlxuXHQgKiBAcGFyYW0ge1N0cmluZ30gYHN0cmluZ2AgVGhlIHN0cmluZyB0byByZXBlYXRcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGBudW1iZXJgIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSBzdHJpbmdcblx0ICogQHJldHVybiB7U3RyaW5nfSBSZXBlYXRlZCBzdHJpbmdcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cblx0ZnVuY3Rpb24gcmVwZWF0KHN0ciwgbnVtKSB7XG5cdCAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdCAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBhIHN0cmluZycpO1xuXHQgIH1cblxuXHQgIC8vIGNvdmVyIGNvbW1vbiwgcXVpY2sgdXNlIGNhc2VzXG5cdCAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIHN0cjtcblx0ICBpZiAobnVtID09PSAyKSByZXR1cm4gc3RyICsgc3RyO1xuXG5cdCAgdmFyIG1heCA9IHN0ci5sZW5ndGggKiBudW07XG5cdCAgaWYgKGNhY2hlICE9PSBzdHIgfHwgdHlwZW9mIGNhY2hlID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgY2FjaGUgPSBzdHI7XG5cdCAgICByZXMgPSAnJztcblx0ICB9IGVsc2UgaWYgKHJlcy5sZW5ndGggPj0gbWF4KSB7XG5cdCAgICByZXR1cm4gcmVzLnN1YnN0cigwLCBtYXgpO1xuXHQgIH1cblxuXHQgIHdoaWxlIChtYXggPiByZXMubGVuZ3RoICYmIG51bSA+IDEpIHtcblx0ICAgIGlmIChudW0gJiAxKSB7XG5cdCAgICAgIHJlcyArPSBzdHI7XG5cdCAgICB9XG5cblx0ICAgIG51bSA+Pj0gMTtcblx0ICAgIHN0ciArPSBzdHI7XG5cdCAgfVxuXG5cdCAgcmVzICs9IHN0cjtcblx0ICByZXMgPSByZXMuc3Vic3RyKDAsIG1heCk7XG5cdCAgcmV0dXJuIHJlcztcblx0fVxuXG5cdHZhciBwYWRMZWZ0ID0gZnVuY3Rpb24gcGFkTGVmdChzdHIsIG51bSwgY2gpIHtcblx0ICBzdHIgPSBzdHIudG9TdHJpbmcoKTtcblxuXHQgIGlmICh0eXBlb2YgbnVtID09PSAndW5kZWZpbmVkJykge1xuXHQgICAgcmV0dXJuIHN0cjtcblx0ICB9XG5cblx0ICBpZiAoY2ggPT09IDApIHtcblx0ICAgIGNoID0gJzAnO1xuXHQgIH0gZWxzZSBpZiAoY2gpIHtcblx0ICAgIGNoID0gY2gudG9TdHJpbmcoKTtcblx0ICB9IGVsc2Uge1xuXHQgICAgY2ggPSAnICc7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIHJlcGVhdFN0cmluZyhjaCwgbnVtIC0gc3RyLmxlbmd0aCkgKyBzdHI7XG5cdH07XG5cblx0dmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcblx0dmFyIGxpbms7XG5cdHZhciBkZWZhdWx0RXh0cyA9IHtcblx0ICAgIGV4dGVuc2lvbjogJycsXG5cdCAgICBwcmVmaXg6ICcnLFxuXHQgICAgc3VmZml4OiAnJ1xuXHR9O1xuXHR2YXIgc3VwcG9ydGVkRW5jb2RpbmdzID0gWydpbWFnZS9wbmcnLCdpbWFnZS9qcGVnJywnaW1hZ2Uvd2VicCddO1xuXHRmdW5jdGlvbiBzdHJlYW0oaXNTdGFydCwgb3B0cykge1xuXHQgICAgaWYgKCBvcHRzID09PSB2b2lkIDAgKSBvcHRzID0ge307XG5cblx0ICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdCAgICAgICAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgZGVmYXVsdEV4dHMsIG9wdHMpO1xuXHQgICAgICAgIHZhciBmaWxlbmFtZSA9IHJlc29sdmVGaWxlbmFtZShPYmplY3QuYXNzaWduKHt9LCBvcHRzLCB7XG5cdCAgICAgICAgICAgIGV4dGVuc2lvbjogJycsXG5cdCAgICAgICAgICAgIGZyYW1lOiB1bmRlZmluZWRcblx0ICAgICAgICB9KSk7XG5cdCAgICAgICAgdmFyIGZ1bmMgPSBpc1N0YXJ0ID8gJ3N0cmVhbVN0YXJ0JyA6ICdzdHJlYW1FbmQnO1xuXHQgICAgICAgIHZhciBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcblx0ICAgICAgICBpZiAoY2xpZW50ICYmIGNsaWVudC5vdXRwdXQgJiYgdHlwZW9mIGNsaWVudFtmdW5jXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICByZXR1cm4gY2xpZW50W2Z1bmNdKG9iamVjdEFzc2lnbih7fSwgb3B0cywge1xuXHQgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGVuYW1lXG5cdCAgICAgICAgICAgIH0pKS50aGVuKGZ1bmN0aW9uIChldikgeyByZXR1cm4gcmVzb2x2ZShldik7IH0pO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHtcblx0ICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZSxcblx0ICAgICAgICAgICAgICAgIGNsaWVudDogZmFsc2Vcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdHJlYW1TdGFydChvcHRzKSB7XG5cdCAgICBpZiAoIG9wdHMgPT09IHZvaWQgMCApIG9wdHMgPSB7fTtcblxuXHQgICAgcmV0dXJuIHN0cmVhbSh0cnVlLCBvcHRzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHN0cmVhbUVuZChvcHRzKSB7XG5cdCAgICBpZiAoIG9wdHMgPT09IHZvaWQgMCApIG9wdHMgPSB7fTtcblxuXHQgICAgcmV0dXJuIHN0cmVhbShmYWxzZSwgb3B0cyk7XG5cdH1cblxuXHRmdW5jdGlvbiBleHBvcnRDYW52YXMoY2FudmFzLCBvcHQpIHtcblx0ICAgIGlmICggb3B0ID09PSB2b2lkIDAgKSBvcHQgPSB7fTtcblxuXHQgICAgdmFyIGVuY29kaW5nID0gb3B0LmVuY29kaW5nIHx8ICdpbWFnZS9wbmcnO1xuXHQgICAgaWYgKCFzdXBwb3J0ZWRFbmNvZGluZ3MuaW5jbHVkZXMoZW5jb2RpbmcpKSBcblx0ICAgICAgICB7IHRocm93IG5ldyBFcnJvcigoXCJJbnZhbGlkIGNhbnZhcyBlbmNvZGluZyBcIiArIGVuY29kaW5nKSk7IH1cblx0ICAgIHZhciBleHRlbnNpb24gPSAoZW5jb2Rpbmcuc3BsaXQoJy8nKVsxXSB8fCAnJykucmVwbGFjZSgvanBlZy9pLCAnanBnJyk7XG5cdCAgICBpZiAoZXh0ZW5zaW9uKSBcblx0ICAgICAgICB7IGV4dGVuc2lvbiA9IChcIi5cIiArIGV4dGVuc2lvbikudG9Mb3dlckNhc2UoKTsgfVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICBleHRlbnNpb246IGV4dGVuc2lvbixcblx0ICAgICAgICB0eXBlOiBlbmNvZGluZyxcblx0ICAgICAgICBkYXRhVVJMOiBjYW52YXMudG9EYXRhVVJMKGVuY29kaW5nLCBvcHQuZW5jb2RpbmdRdWFsaXR5KVxuXHQgICAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUJsb2JGcm9tRGF0YVVSTChkYXRhVVJMKSB7XG5cdCAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0ICAgICAgICB2YXIgc3BsaXRJbmRleCA9IGRhdGFVUkwuaW5kZXhPZignLCcpO1xuXHQgICAgICAgIGlmIChzcGxpdEluZGV4ID09PSAtMSkge1xuXHQgICAgICAgICAgICByZXNvbHZlKG5ldyB3aW5kb3cuQmxvYigpKTtcblx0ICAgICAgICAgICAgcmV0dXJuO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgYmFzZTY0ID0gZGF0YVVSTC5zbGljZShzcGxpdEluZGV4ICsgMSk7XG5cdCAgICAgICAgdmFyIGJ5dGVTdHJpbmcgPSB3aW5kb3cuYXRvYihiYXNlNjQpO1xuXHQgICAgICAgIHZhciB0eXBlID0gZGF0YVVSTC5zbGljZSgwLCBzcGxpdEluZGV4KTtcblx0ICAgICAgICB2YXIgbWltZU1hdGNoID0gL2RhdGE6KFteO10rKS8uZXhlYyh0eXBlKTtcblx0ICAgICAgICB2YXIgbWltZSA9IChtaW1lTWF0Y2ggPyBtaW1lTWF0Y2hbMV0gOiAnJykgfHwgdW5kZWZpbmVkO1xuXHQgICAgICAgIHZhciBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlU3RyaW5nLmxlbmd0aCk7XG5cdCAgICAgICAgdmFyIGlhID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuXHQgICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCBieXRlU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgIGlhW2ldID0gYnl0ZVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXNvbHZlKG5ldyB3aW5kb3cuQmxvYihbYWJdLCB7XG5cdCAgICAgICAgICAgIHR5cGU6IG1pbWVcblx0ICAgICAgICB9KSk7XG5cdCAgICB9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNhdmVEYXRhVVJMKGRhdGFVUkwsIG9wdHMpIHtcblx0ICAgIGlmICggb3B0cyA9PT0gdm9pZCAwICkgb3B0cyA9IHt9O1xuXG5cdCAgICByZXR1cm4gY3JlYXRlQmxvYkZyb21EYXRhVVJMKGRhdGFVUkwpLnRoZW4oZnVuY3Rpb24gKGJsb2IpIHsgcmV0dXJuIHNhdmVCbG9iKGJsb2IsIG9wdHMpOyB9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNhdmVCbG9iKGJsb2IsIG9wdHMpIHtcblx0ICAgIGlmICggb3B0cyA9PT0gdm9pZCAwICkgb3B0cyA9IHt9O1xuXG5cdCAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0ICAgICAgICBvcHRzID0gb2JqZWN0QXNzaWduKHt9LCBkZWZhdWx0RXh0cywgb3B0cyk7XG5cdCAgICAgICAgdmFyIGZpbGVuYW1lID0gb3B0cy5maWxlbmFtZTtcblx0ICAgICAgICB2YXIgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG5cdCAgICAgICAgaWYgKGNsaWVudCAmJiB0eXBlb2YgY2xpZW50LnNhdmVCbG9iID09PSAnZnVuY3Rpb24nICYmIGNsaWVudC5vdXRwdXQpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5zYXZlQmxvYihibG9iLCBvYmplY3RBc3NpZ24oe30sIG9wdHMsIHtcblx0ICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZVxuXHQgICAgICAgICAgICB9KSkudGhlbihmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHJlc29sdmUoZXYpOyB9KTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpZiAoIWxpbmspIHtcblx0ICAgICAgICAgICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdCAgICAgICAgICAgICAgICBsaW5rLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblx0ICAgICAgICAgICAgICAgIGxpbmsudGFyZ2V0ID0gJ19ibGFuayc7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuXHQgICAgICAgICAgICBsaW5rLmhyZWYgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblx0ICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcblx0ICAgICAgICAgICAgbGluay5vbmNsaWNrID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIGxpbmsub25jbGljayA9IG5vb3A7XG5cdCAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChibG9iKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAobGluay5wYXJlbnRFbGVtZW50KSBcblx0ICAgICAgICAgICAgICAgICAgICAgICAgeyBsaW5rLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQobGluayk7IH1cblx0ICAgICAgICAgICAgICAgICAgICBsaW5rLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZW5hbWUsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogZmFsc2Vcblx0ICAgICAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgbGluay5jbGljaygpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2F2ZUZpbGUoZGF0YSwgb3B0cykge1xuXHQgICAgaWYgKCBvcHRzID09PSB2b2lkIDAgKSBvcHRzID0ge307XG5cblx0ICAgIHZhciBwYXJ0cyA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdO1xuXHQgICAgdmFyIGJsb2IgPSBuZXcgd2luZG93LkJsb2IocGFydHMsIHtcblx0ICAgICAgICB0eXBlOiBvcHRzLnR5cGUgfHwgJydcblx0ICAgIH0pO1xuXHQgICAgcmV0dXJuIHNhdmVCbG9iKGJsb2IsIG9wdHMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0VGltZVN0YW1wKCkge1xuXHQgICAgdmFyIGRhdGVGb3JtYXRTdHIgPSBcInl5eXkubW0uZGQtSEguTU0uc3NcIjtcblx0ICAgIHJldHVybiBkYXRlZm9ybWF0KG5ldyBEYXRlKCksIGRhdGVGb3JtYXRTdHIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzb2x2ZUZpbGVuYW1lKG9wdCkge1xuXHQgICAgaWYgKCBvcHQgPT09IHZvaWQgMCApIG9wdCA9IHt9O1xuXG5cdCAgICBvcHQgPSBvYmplY3RBc3NpZ24oe30sIG9wdCk7XG5cdCAgICBpZiAodHlwZW9mIG9wdC5maWxlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgcmV0dXJuIG9wdC5maWxlKG9wdCk7XG5cdCAgICB9IGVsc2UgaWYgKG9wdC5maWxlKSB7XG5cdCAgICAgICAgcmV0dXJuIG9wdC5maWxlO1xuXHQgICAgfVxuXHQgICAgdmFyIGZyYW1lID0gbnVsbDtcblx0ICAgIHZhciBleHRlbnNpb24gPSAnJztcblx0ICAgIGlmICh0eXBlb2Ygb3B0LmV4dGVuc2lvbiA9PT0gJ3N0cmluZycpIFxuXHQgICAgICAgIHsgZXh0ZW5zaW9uID0gb3B0LmV4dGVuc2lvbjsgfVxuXHQgICAgaWYgKHR5cGVvZiBvcHQuZnJhbWUgPT09ICdudW1iZXInKSB7XG5cdCAgICAgICAgdmFyIHRvdGFsRnJhbWVzO1xuXHQgICAgICAgIGlmICh0eXBlb2Ygb3B0LnRvdGFsRnJhbWVzID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgICAgICB0b3RhbEZyYW1lcyA9IG9wdC50b3RhbEZyYW1lcztcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB0b3RhbEZyYW1lcyA9IE1hdGgubWF4KDEwMDAwLCBvcHQuZnJhbWUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBmcmFtZSA9IHBhZExlZnQoU3RyaW5nKG9wdC5mcmFtZSksIFN0cmluZyh0b3RhbEZyYW1lcykubGVuZ3RoLCAnMCcpO1xuXHQgICAgfVxuXHQgICAgdmFyIGxheWVyU3RyID0gaXNGaW5pdGUob3B0LnRvdGFsTGF5ZXJzKSAmJiBpc0Zpbml0ZShvcHQubGF5ZXIpICYmIG9wdC50b3RhbExheWVycyA+IDEgPyAoXCJcIiArIChvcHQubGF5ZXIpKSA6ICcnO1xuXHQgICAgaWYgKGZyYW1lICE9IG51bGwpIHtcblx0ICAgICAgICByZXR1cm4gW2xheWVyU3RyLGZyYW1lXS5maWx0ZXIoQm9vbGVhbikuam9pbignLScpICsgZXh0ZW5zaW9uO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB2YXIgZGVmYXVsdEZpbGVOYW1lID0gb3B0LnRpbWVTdGFtcDtcblx0ICAgICAgICByZXR1cm4gW29wdC5wcmVmaXgsb3B0Lm5hbWUgfHwgZGVmYXVsdEZpbGVOYW1lLGxheWVyU3RyLG9wdC5oYXNoLG9wdC5zdWZmaXhdLmZpbHRlcihCb29sZWFuKS5qb2luKCctJykgKyBleHRlbnNpb247XG5cdCAgICB9XG5cdH1cblxuXHR2YXIgY29tbW9uVHlwb3MgPSB7XG5cdCAgICBkaW1lbnNpb246ICdkaW1lbnNpb25zJyxcblx0ICAgIGFuaW1hdGVkOiAnYW5pbWF0ZScsXG5cdCAgICBhbmltYXRpbmc6ICdhbmltYXRlJyxcblx0ICAgIHVuaXQ6ICd1bml0cycsXG5cdCAgICBQNTogJ3A1Jyxcblx0ICAgIHBpeGVsbGF0ZWQ6ICdwaXhlbGF0ZWQnLFxuXHQgICAgbG9vcGluZzogJ2xvb3AnLFxuXHQgICAgcGl4ZWxQZXJJbmNoOiAncGl4ZWxzJ1xuXHR9O1xuXHR2YXIgYWxsS2V5cyA9IFsnZGltZW5zaW9ucycsJ3VuaXRzJywncGl4ZWxzUGVySW5jaCcsJ29yaWVudGF0aW9uJywnc2NhbGVUb0ZpdCcsXG5cdCAgICAnc2NhbGVUb1ZpZXcnLCdibGVlZCcsJ3BpeGVsUmF0aW8nLCdleHBvcnRQaXhlbFJhdGlvJywnbWF4UGl4ZWxSYXRpbycsJ3NjYWxlQ29udGV4dCcsXG5cdCAgICAncmVzaXplQ2FudmFzJywnc3R5bGVDYW52YXMnLCdjYW52YXMnLCdjb250ZXh0JywnYXR0cmlidXRlcycsJ3BhcmVudCcsJ2ZpbGUnLFxuXHQgICAgJ25hbWUnLCdwcmVmaXgnLCdzdWZmaXgnLCdhbmltYXRlJywncGxheWluZycsJ2xvb3AnLCdkdXJhdGlvbicsJ3RvdGFsRnJhbWVzJyxcblx0ICAgICdmcHMnLCdwbGF5YmFja1JhdGUnLCd0aW1lU2NhbGUnLCdmcmFtZScsJ3RpbWUnLCdmbHVzaCcsJ3BpeGVsYXRlZCcsJ2hvdGtleXMnLFxuXHQgICAgJ3A1JywnaWQnLCdzY2FsZVRvRml0UGFkZGluZycsJ2RhdGEnLCdwYXJhbXMnLCdlbmNvZGluZycsJ2VuY29kaW5nUXVhbGl0eSddO1xuXHR2YXIgY2hlY2tTZXR0aW5ncyA9IGZ1bmN0aW9uIChzZXR0aW5ncykge1xuXHQgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzZXR0aW5ncyk7XG5cdCAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHQgICAgICAgIGlmIChrZXkgaW4gY29tbW9uVHlwb3MpIHtcblx0ICAgICAgICAgICAgdmFyIGFjdHVhbCA9IGNvbW1vblR5cG9zW2tleV07XG5cdCAgICAgICAgICAgIGNvbnNvbGUud2FybigoXCJbY2FudmFzLXNrZXRjaF0gQ291bGQgbm90IHJlY29nbml6ZSB0aGUgc2V0dGluZyBcXFwiXCIgKyBrZXkgKyBcIlxcXCIsIGRpZCB5b3UgbWVhbiBcXFwiXCIgKyBhY3R1YWwgKyBcIlxcXCI/XCIpKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKCFhbGxLZXlzLmluY2x1ZGVzKGtleSkpIHtcblx0ICAgICAgICAgICAgY29uc29sZS53YXJuKChcIltjYW52YXMtc2tldGNoXSBDb3VsZCBub3QgcmVjb2duaXplIHRoZSBzZXR0aW5nIFxcXCJcIiArIGtleSArIFwiXFxcIlwiKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH07XG5cblx0ZnVuY3Rpb24ga2V5Ym9hcmRTaG9ydGN1dHMgKG9wdCkge1xuXHQgICAgaWYgKCBvcHQgPT09IHZvaWQgMCApIG9wdCA9IHt9O1xuXG5cdCAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIChldikge1xuXHQgICAgICAgIGlmICghb3B0LmVuYWJsZWQoKSkgXG5cdCAgICAgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICAgICAgdmFyIGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuXHQgICAgICAgIGlmIChldi5rZXlDb2RlID09PSA4MyAmJiAhZXYuYWx0S2V5ICYmIChldi5tZXRhS2V5IHx8IGV2LmN0cmxLZXkpKSB7XG5cdCAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICAgICAgICAgIG9wdC5zYXZlKGV2KTtcblx0ICAgICAgICB9IGVsc2UgaWYgKGV2LmtleUNvZGUgPT09IDMyKSB7XG5cdCAgICAgICAgICAgIG9wdC50b2dnbGVQbGF5KGV2KTtcblx0ICAgICAgICB9IGVsc2UgaWYgKGNsaWVudCAmJiAhZXYuYWx0S2V5ICYmIGV2LmtleUNvZGUgPT09IDc1ICYmIChldi5tZXRhS2V5IHx8IGV2LmN0cmxLZXkpKSB7XG5cdCAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdCAgICAgICAgICAgIG9wdC5jb21taXQoZXYpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICB2YXIgYXR0YWNoID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcik7XG5cdCAgICB9O1xuXHQgICAgdmFyIGRldGFjaCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuXHQgICAgfTtcblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgYXR0YWNoOiBhdHRhY2gsXG5cdCAgICAgICAgZGV0YWNoOiBkZXRhY2hcblx0ICAgIH07XG5cdH1cblxuXHR2YXIgZGVmYXVsdFVuaXRzID0gJ21tJztcblx0dmFyIGRhdGEgPSBbWydwb3N0Y2FyZCcsMTAxLjYsMTUyLjRdLFsncG9zdGVyLXNtYWxsJywyODAsNDMwXSxbJ3Bvc3RlcicsNDYwLDYxMF0sXG5cdCAgICBbJ3Bvc3Rlci1sYXJnZScsNjEwLDkxMF0sWydidXNpbmVzcy1jYXJkJyw1MC44LDg4LjldLFsnMnInLDY0LDg5XSxbJzNyJyw4OSwxMjddLFxuXHQgICAgWyc0cicsMTAyLDE1Ml0sWyc1cicsMTI3LDE3OF0sWyc2cicsMTUyLDIwM10sWyc4cicsMjAzLDI1NF0sWycxMHInLDI1NCwzMDVdLFsnMTFyJyxcblx0ICAgIDI3OSwzNTZdLFsnMTJyJywzMDUsMzgxXSxbJ2EwJyw4NDEsMTE4OV0sWydhMScsNTk0LDg0MV0sWydhMicsNDIwLDU5NF0sWydhMycsXG5cdCAgICAyOTcsNDIwXSxbJ2E0JywyMTAsMjk3XSxbJ2E1JywxNDgsMjEwXSxbJ2E2JywxMDUsMTQ4XSxbJ2E3Jyw3NCwxMDVdLFsnYTgnLDUyLFxuXHQgICAgNzRdLFsnYTknLDM3LDUyXSxbJ2ExMCcsMjYsMzddLFsnMmEwJywxMTg5LDE2ODJdLFsnNGEwJywxNjgyLDIzNzhdLFsnYjAnLDEwMDAsXG5cdCAgICAxNDE0XSxbJ2IxJyw3MDcsMTAwMF0sWydiMSsnLDcyMCwxMDIwXSxbJ2IyJyw1MDAsNzA3XSxbJ2IyKycsNTIwLDcyMF0sWydiMycsMzUzLFxuXHQgICAgNTAwXSxbJ2I0JywyNTAsMzUzXSxbJ2I1JywxNzYsMjUwXSxbJ2I2JywxMjUsMTc2XSxbJ2I3Jyw4OCwxMjVdLFsnYjgnLDYyLDg4XSxcblx0ICAgIFsnYjknLDQ0LDYyXSxbJ2IxMCcsMzEsNDRdLFsnYjExJywyMiwzMl0sWydiMTInLDE2LDIyXSxbJ2MwJyw5MTcsMTI5N10sWydjMScsXG5cdCAgICA2NDgsOTE3XSxbJ2MyJyw0NTgsNjQ4XSxbJ2MzJywzMjQsNDU4XSxbJ2M0JywyMjksMzI0XSxbJ2M1JywxNjIsMjI5XSxbJ2M2JywxMTQsXG5cdCAgICAxNjJdLFsnYzcnLDgxLDExNF0sWydjOCcsNTcsODFdLFsnYzknLDQwLDU3XSxbJ2MxMCcsMjgsNDBdLFsnYzExJywyMiwzMl0sWydjMTInLFxuXHQgICAgMTYsMjJdLFsnaGFsZi1sZXR0ZXInLDUuNSw4LjUsJ2luJ10sWydsZXR0ZXInLDguNSwxMSwnaW4nXSxbJ2xlZ2FsJyw4LjUsMTQsJ2luJ10sXG5cdCAgICBbJ2p1bmlvci1sZWdhbCcsNSw4LCdpbiddLFsnbGVkZ2VyJywxMSwxNywnaW4nXSxbJ3RhYmxvaWQnLDExLDE3LCdpbiddLFsnYW5zaS1hJyxcblx0ICAgIDguNSwxMS4wLCdpbiddLFsnYW5zaS1iJywxMS4wLDE3LjAsJ2luJ10sWydhbnNpLWMnLDE3LjAsMjIuMCwnaW4nXSxbJ2Fuc2ktZCcsXG5cdCAgICAyMi4wLDM0LjAsJ2luJ10sWydhbnNpLWUnLDM0LjAsNDQuMCwnaW4nXSxbJ2FyY2gtYScsOSwxMiwnaW4nXSxbJ2FyY2gtYicsMTIsMTgsXG5cdCAgICAnaW4nXSxbJ2FyY2gtYycsMTgsMjQsJ2luJ10sWydhcmNoLWQnLDI0LDM2LCdpbiddLFsnYXJjaC1lJywzNiw0OCwnaW4nXSxbJ2FyY2gtZTEnLFxuXHQgICAgMzAsNDIsJ2luJ10sWydhcmNoLWUyJywyNiwzOCwnaW4nXSxbJ2FyY2gtZTMnLDI3LDM5LCdpbiddXTtcblx0dmFyIHBhcGVyU2l6ZXMgPSBkYXRhLnJlZHVjZShmdW5jdGlvbiAoZGljdCwgcHJlc2V0KSB7XG5cdCAgICB2YXIgaXRlbSA9IHtcblx0ICAgICAgICB1bml0czogcHJlc2V0WzNdIHx8IGRlZmF1bHRVbml0cyxcblx0ICAgICAgICBkaW1lbnNpb25zOiBbcHJlc2V0WzFdLHByZXNldFsyXV1cblx0ICAgIH07XG5cdCAgICBkaWN0W3ByZXNldFswXV0gPSBpdGVtO1xuXHQgICAgZGljdFtwcmVzZXRbMF0ucmVwbGFjZSgvLS9nLCAnICcpXSA9IGl0ZW07XG5cdCAgICByZXR1cm4gZGljdDtcblx0fSwge30pXG5cblx0dmFyIGRlZmluZWQkMSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgaWYgKGFyZ3VtZW50c1tpXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gYXJndW1lbnRzW2ldO1xuXHQgICAgfVxuXHR9O1xuXG5cdHZhciB1bml0cyA9IFsgJ21tJywgJ2NtJywgJ20nLCAncGMnLCAncHQnLCAnaW4nLCAnZnQnLCAncHgnIF07XG5cblx0dmFyIGNvbnZlcnNpb25zID0ge1xuXHQgIC8vIG1ldHJpY1xuXHQgIG06IHtcblx0ICAgIHN5c3RlbTogJ21ldHJpYycsXG5cdCAgICBmYWN0b3I6IDFcblx0ICB9LFxuXHQgIGNtOiB7XG5cdCAgICBzeXN0ZW06ICdtZXRyaWMnLFxuXHQgICAgZmFjdG9yOiAxIC8gMTAwXG5cdCAgfSxcblx0ICBtbToge1xuXHQgICAgc3lzdGVtOiAnbWV0cmljJyxcblx0ICAgIGZhY3RvcjogMSAvIDEwMDBcblx0ICB9LFxuXHQgIC8vIGltcGVyaWFsXG5cdCAgcHQ6IHtcblx0ICAgIHN5c3RlbTogJ2ltcGVyaWFsJyxcblx0ICAgIGZhY3RvcjogMSAvIDcyXG5cdCAgfSxcblx0ICBwYzoge1xuXHQgICAgc3lzdGVtOiAnaW1wZXJpYWwnLFxuXHQgICAgZmFjdG9yOiAxIC8gNlxuXHQgIH0sXG5cdCAgaW46IHtcblx0ICAgIHN5c3RlbTogJ2ltcGVyaWFsJyxcblx0ICAgIGZhY3RvcjogMVxuXHQgIH0sXG5cdCAgZnQ6IHtcblx0ICAgIHN5c3RlbTogJ2ltcGVyaWFsJyxcblx0ICAgIGZhY3RvcjogMTJcblx0ICB9XG5cdH07XG5cblx0Y29uc3QgYW5jaG9ycyA9IHtcblx0ICBtZXRyaWM6IHtcblx0ICAgIHVuaXQ6ICdtJyxcblx0ICAgIHJhdGlvOiAxIC8gMC4wMjU0XG5cdCAgfSxcblx0ICBpbXBlcmlhbDoge1xuXHQgICAgdW5pdDogJ2luJyxcblx0ICAgIHJhdGlvOiAwLjAyNTRcblx0ICB9XG5cdH07XG5cblx0ZnVuY3Rpb24gcm91bmQgKHZhbHVlLCBkZWNpbWFscykge1xuXHQgIHJldHVybiBOdW1iZXIoTWF0aC5yb3VuZCh2YWx1ZSArICdlJyArIGRlY2ltYWxzKSArICdlLScgKyBkZWNpbWFscyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjb252ZXJ0RGlzdGFuY2UgKHZhbHVlLCBmcm9tVW5pdCwgdG9Vbml0LCBvcHRzKSB7XG5cdCAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicgfHwgIWlzRmluaXRlKHZhbHVlKSkgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBtdXN0IGJlIGEgZmluaXRlIG51bWJlcicpO1xuXHQgIGlmICghZnJvbVVuaXQgfHwgIXRvVW5pdCkgdGhyb3cgbmV3IEVycm9yKCdNdXN0IHNwZWNpZnkgZnJvbSBhbmQgdG8gdW5pdHMnKTtcblxuXHQgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXHQgIHZhciBwaXhlbHNQZXJJbmNoID0gZGVmaW5lZCQxKG9wdHMucGl4ZWxzUGVySW5jaCwgOTYpO1xuXHQgIHZhciBwcmVjaXNpb24gPSBvcHRzLnByZWNpc2lvbjtcblx0ICB2YXIgcm91bmRQaXhlbCA9IG9wdHMucm91bmRQaXhlbCAhPT0gZmFsc2U7XG5cblx0ICBmcm9tVW5pdCA9IGZyb21Vbml0LnRvTG93ZXJDYXNlKCk7XG5cdCAgdG9Vbml0ID0gdG9Vbml0LnRvTG93ZXJDYXNlKCk7XG5cblx0ICBpZiAodW5pdHMuaW5kZXhPZihmcm9tVW5pdCkgPT09IC0xKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZnJvbSB1bml0IFwiJyArIGZyb21Vbml0ICsgJ1wiLCBtdXN0IGJlIG9uZSBvZjogJyArIHVuaXRzLmpvaW4oJywgJykpO1xuXHQgIGlmICh1bml0cy5pbmRleE9mKHRvVW5pdCkgPT09IC0xKSB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZnJvbSB1bml0IFwiJyArIHRvVW5pdCArICdcIiwgbXVzdCBiZSBvbmUgb2Y6ICcgKyB1bml0cy5qb2luKCcsICcpKTtcblxuXHQgIGlmIChmcm9tVW5pdCA9PT0gdG9Vbml0KSB7XG5cdCAgICAvLyBXZSBkb24ndCBuZWVkIHRvIGNvbnZlcnQgZnJvbSBBIHRvIEIgc2luY2UgdGhleSBhcmUgdGhlIHNhbWUgYWxyZWFkeVxuXHQgICAgcmV0dXJuIHZhbHVlO1xuXHQgIH1cblxuXHQgIHZhciB0b0ZhY3RvciA9IDE7XG5cdCAgdmFyIGZyb21GYWN0b3IgPSAxO1xuXHQgIHZhciBpc1RvUGl4ZWwgPSBmYWxzZTtcblxuXHQgIGlmIChmcm9tVW5pdCA9PT0gJ3B4Jykge1xuXHQgICAgZnJvbUZhY3RvciA9IDEgLyBwaXhlbHNQZXJJbmNoO1xuXHQgICAgZnJvbVVuaXQgPSAnaW4nO1xuXHQgIH1cblx0ICBpZiAodG9Vbml0ID09PSAncHgnKSB7XG5cdCAgICBpc1RvUGl4ZWwgPSB0cnVlO1xuXHQgICAgdG9GYWN0b3IgPSBwaXhlbHNQZXJJbmNoO1xuXHQgICAgdG9Vbml0ID0gJ2luJztcblx0ICB9XG5cblx0ICB2YXIgZnJvbVVuaXREYXRhID0gY29udmVyc2lvbnNbZnJvbVVuaXRdO1xuXHQgIHZhciB0b1VuaXREYXRhID0gY29udmVyc2lvbnNbdG9Vbml0XTtcblxuXHQgIC8vIHNvdXJjZSB0byBhbmNob3IgaW5zaWRlIHNvdXJjZSdzIHN5c3RlbVxuXHQgIHZhciBhbmNob3IgPSB2YWx1ZSAqIGZyb21Vbml0RGF0YS5mYWN0b3IgKiBmcm9tRmFjdG9yO1xuXG5cdCAgLy8gaWYgc3lzdGVtcyBkaWZmZXIsIGNvbnZlcnQgb25lIHRvIGFub3RoZXJcblx0ICBpZiAoZnJvbVVuaXREYXRhLnN5c3RlbSAhPT0gdG9Vbml0RGF0YS5zeXN0ZW0pIHtcblx0ICAgIC8vIHJlZ3VsYXIgJ20nIHRvICdpbicgYW5kIHNvIGZvcnRoXG5cdCAgICBhbmNob3IgKj0gYW5jaG9yc1tmcm9tVW5pdERhdGEuc3lzdGVtXS5yYXRpbztcblx0ICB9XG5cblx0ICB2YXIgcmVzdWx0ID0gYW5jaG9yIC8gdG9Vbml0RGF0YS5mYWN0b3IgKiB0b0ZhY3Rvcjtcblx0ICBpZiAoaXNUb1BpeGVsICYmIHJvdW5kUGl4ZWwpIHtcblx0ICAgIHJlc3VsdCA9IE1hdGgucm91bmQocmVzdWx0KTtcblx0ICB9IGVsc2UgaWYgKHR5cGVvZiBwcmVjaXNpb24gPT09ICdudW1iZXInICYmIGlzRmluaXRlKHByZWNpc2lvbikpIHtcblx0ICAgIHJlc3VsdCA9IHJvdW5kKHJlc3VsdCwgcHJlY2lzaW9uKTtcblx0ICB9XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdHZhciBjb252ZXJ0TGVuZ3RoID0gY29udmVydERpc3RhbmNlO1xuXHR2YXIgdW5pdHNfMSA9IHVuaXRzO1xuXHRjb252ZXJ0TGVuZ3RoLnVuaXRzID0gdW5pdHNfMTtcblxuXHRmdW5jdGlvbiBnZXREaW1lbnNpb25zRnJvbVByZXNldChkaW1lbnNpb25zLCB1bml0c1RvLCBwaXhlbHNQZXJJbmNoKSB7XG5cdCAgICBpZiAoIHVuaXRzVG8gPT09IHZvaWQgMCApIHVuaXRzVG8gPSAncHgnO1xuXHQgICAgaWYgKCBwaXhlbHNQZXJJbmNoID09PSB2b2lkIDAgKSBwaXhlbHNQZXJJbmNoID0gNzI7XG5cblx0ICAgIGlmICh0eXBlb2YgZGltZW5zaW9ucyA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICB2YXIga2V5ID0gZGltZW5zaW9ucy50b0xvd2VyQ2FzZSgpO1xuXHQgICAgICAgIGlmICghKGtleSBpbiBwYXBlclNpemVzKSkge1xuXHQgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwiVGhlIGRpbWVuc2lvbiBwcmVzZXQgXFxcIlwiICsgZGltZW5zaW9ucyArIFwiXFxcIiBpcyBub3Qgc3VwcG9ydGVkIG9yIGNvdWxkIG5vdCBiZSBmb3VuZDsgdHJ5IHVzaW5nIGE0LCBhMywgcG9zdGNhcmQsIGxldHRlciwgZXRjLlwiKSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBwcmVzZXQgPSBwYXBlclNpemVzW2tleV07XG5cdCAgICAgICAgcmV0dXJuIHByZXNldC5kaW1lbnNpb25zLm1hcChmdW5jdGlvbiAoZCkgeyByZXR1cm4gY29udmVydERpc3RhbmNlJDEoZCwgcHJlc2V0LnVuaXRzLCB1bml0c1RvLCBwaXhlbHNQZXJJbmNoKTsgfSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY29udmVydERpc3RhbmNlJDEoZGltZW5zaW9uLCB1bml0c0Zyb20sIHVuaXRzVG8sIHBpeGVsc1BlckluY2gpIHtcblx0ICAgIGlmICggdW5pdHNGcm9tID09PSB2b2lkIDAgKSB1bml0c0Zyb20gPSAncHgnO1xuXHQgICAgaWYgKCB1bml0c1RvID09PSB2b2lkIDAgKSB1bml0c1RvID0gJ3B4Jztcblx0ICAgIGlmICggcGl4ZWxzUGVySW5jaCA9PT0gdm9pZCAwICkgcGl4ZWxzUGVySW5jaCA9IDcyO1xuXG5cdCAgICByZXR1cm4gY29udmVydExlbmd0aChkaW1lbnNpb24sIHVuaXRzRnJvbSwgdW5pdHNUbywge1xuXHQgICAgICAgIHBpeGVsc1BlckluY2g6IHBpeGVsc1BlckluY2gsXG5cdCAgICAgICAgcHJlY2lzaW9uOiA0LFxuXHQgICAgICAgIHJvdW5kUGl4ZWw6IHRydWVcblx0ICAgIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2hlY2tJZkhhc0RpbWVuc2lvbnMoc2V0dGluZ3MpIHtcblx0ICAgIGlmICghc2V0dGluZ3MuZGltZW5zaW9ucykgXG5cdCAgICAgICAgeyByZXR1cm4gZmFsc2U7IH1cblx0ICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MuZGltZW5zaW9ucyA9PT0gJ3N0cmluZycpIFxuXHQgICAgICAgIHsgcmV0dXJuIHRydWU7IH1cblx0ICAgIGlmIChBcnJheS5pc0FycmF5KHNldHRpbmdzLmRpbWVuc2lvbnMpICYmIHNldHRpbmdzLmRpbWVuc2lvbnMubGVuZ3RoID49IDIpIFxuXHQgICAgICAgIHsgcmV0dXJuIHRydWU7IH1cblx0ICAgIHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldFBhcmVudFNpemUocHJvcHMsIHNldHRpbmdzKSB7XG5cdCAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG5cdCAgICAgICAgcmV0dXJuIFszMDAsMTUwXTtcblx0ICAgIH1cblx0ICAgIHZhciBlbGVtZW50ID0gc2V0dGluZ3MucGFyZW50IHx8IHdpbmRvdztcblx0ICAgIGlmIChlbGVtZW50ID09PSB3aW5kb3cgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQgfHwgZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkge1xuXHQgICAgICAgIHJldHVybiBbd2luZG93LmlubmVyV2lkdGgsd2luZG93LmlubmVySGVpZ2h0XTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIHJlZiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdCAgICAgICAgdmFyIHdpZHRoID0gcmVmLndpZHRoO1xuXHQgICAgICAgIHZhciBoZWlnaHQgPSByZWYuaGVpZ2h0O1xuXHQgICAgICAgIHJldHVybiBbd2lkdGgsaGVpZ2h0XTtcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2l6ZUNhbnZhcyhwcm9wcywgc2V0dGluZ3MpIHtcblx0ICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuXHQgICAgdmFyIHN0eWxlV2lkdGgsIHN0eWxlSGVpZ2h0O1xuXHQgICAgdmFyIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQ7XG5cdCAgICB2YXIgYnJvd3NlciA9IGlzQnJvd3NlcigpO1xuXHQgICAgdmFyIGRpbWVuc2lvbnMgPSBzZXR0aW5ncy5kaW1lbnNpb25zO1xuXHQgICAgdmFyIGhhc0RpbWVuc2lvbnMgPSBjaGVja0lmSGFzRGltZW5zaW9ucyhzZXR0aW5ncyk7XG5cdCAgICB2YXIgZXhwb3J0aW5nID0gcHJvcHMuZXhwb3J0aW5nO1xuXHQgICAgdmFyIHNjYWxlVG9GaXQgPSBoYXNEaW1lbnNpb25zID8gc2V0dGluZ3Muc2NhbGVUb0ZpdCAhPT0gZmFsc2UgOiBmYWxzZTtcblx0ICAgIHZhciBzY2FsZVRvVmlldyA9ICFleHBvcnRpbmcgJiYgaGFzRGltZW5zaW9ucyA/IHNldHRpbmdzLnNjYWxlVG9WaWV3IDogdHJ1ZTtcblx0ICAgIGlmICghYnJvd3NlcikgXG5cdCAgICAgICAgeyBzY2FsZVRvRml0ID0gKHNjYWxlVG9WaWV3ID0gZmFsc2UpOyB9XG5cdCAgICB2YXIgdW5pdHMgPSBzZXR0aW5ncy51bml0cztcblx0ICAgIHZhciBwaXhlbHNQZXJJbmNoID0gdHlwZW9mIHNldHRpbmdzLnBpeGVsc1BlckluY2ggPT09ICdudW1iZXInICYmIGlzRmluaXRlKHNldHRpbmdzLnBpeGVsc1BlckluY2gpID8gc2V0dGluZ3MucGl4ZWxzUGVySW5jaCA6IDcyO1xuXHQgICAgdmFyIGJsZWVkID0gZGVmaW5lZChzZXR0aW5ncy5ibGVlZCwgMCk7XG5cdCAgICB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IGJyb3dzZXIgPyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG5cdCAgICB2YXIgYmFzZVBpeGVsUmF0aW8gPSBzY2FsZVRvVmlldyA/IGRldmljZVBpeGVsUmF0aW8gOiAxO1xuXHQgICAgdmFyIHBpeGVsUmF0aW8sIGV4cG9ydFBpeGVsUmF0aW87XG5cdCAgICBpZiAodHlwZW9mIHNldHRpbmdzLnBpeGVsUmF0aW8gPT09ICdudW1iZXInICYmIGlzRmluaXRlKHNldHRpbmdzLnBpeGVsUmF0aW8pKSB7XG5cdCAgICAgICAgcGl4ZWxSYXRpbyA9IHNldHRpbmdzLnBpeGVsUmF0aW87XG5cdCAgICAgICAgZXhwb3J0UGl4ZWxSYXRpbyA9IGRlZmluZWQoc2V0dGluZ3MuZXhwb3J0UGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIGlmIChoYXNEaW1lbnNpb25zKSB7XG5cdCAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBiYXNlUGl4ZWxSYXRpbztcblx0ICAgICAgICAgICAgZXhwb3J0UGl4ZWxSYXRpbyA9IGRlZmluZWQoc2V0dGluZ3MuZXhwb3J0UGl4ZWxSYXRpbywgMSk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IGRldmljZVBpeGVsUmF0aW87XG5cdCAgICAgICAgICAgIGV4cG9ydFBpeGVsUmF0aW8gPSBkZWZpbmVkKHNldHRpbmdzLmV4cG9ydFBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmICh0eXBlb2Ygc2V0dGluZ3MubWF4UGl4ZWxSYXRpbyA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoc2V0dGluZ3MubWF4UGl4ZWxSYXRpbykpIHtcblx0ICAgICAgICBwaXhlbFJhdGlvID0gTWF0aC5taW4oc2V0dGluZ3MubWF4UGl4ZWxSYXRpbywgcGl4ZWxSYXRpbyk7XG5cdCAgICB9XG5cdCAgICBpZiAoZXhwb3J0aW5nKSB7XG5cdCAgICAgICAgcGl4ZWxSYXRpbyA9IGV4cG9ydFBpeGVsUmF0aW87XG5cdCAgICB9XG5cdCAgICB2YXIgcmVmID0gZ2V0UGFyZW50U2l6ZShwcm9wcywgc2V0dGluZ3MpO1xuXHQgICAgdmFyIHBhcmVudFdpZHRoID0gcmVmWzBdO1xuXHQgICAgdmFyIHBhcmVudEhlaWdodCA9IHJlZlsxXTtcblx0ICAgIHZhciB0cmltV2lkdGgsIHRyaW1IZWlnaHQ7XG5cdCAgICBpZiAoaGFzRGltZW5zaW9ucykge1xuXHQgICAgICAgIHZhciByZXN1bHQgPSBnZXREaW1lbnNpb25zRnJvbVByZXNldChkaW1lbnNpb25zLCB1bml0cywgcGl4ZWxzUGVySW5jaCk7XG5cdCAgICAgICAgdmFyIGhpZ2hlc3QgPSBNYXRoLm1heChyZXN1bHRbMF0sIHJlc3VsdFsxXSk7XG5cdCAgICAgICAgdmFyIGxvd2VzdCA9IE1hdGgubWluKHJlc3VsdFswXSwgcmVzdWx0WzFdKTtcblx0ICAgICAgICBpZiAoc2V0dGluZ3Mub3JpZW50YXRpb24pIHtcblx0ICAgICAgICAgICAgdmFyIGxhbmRzY2FwZSA9IHNldHRpbmdzLm9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJztcblx0ICAgICAgICAgICAgd2lkdGggPSBsYW5kc2NhcGUgPyBoaWdoZXN0IDogbG93ZXN0O1xuXHQgICAgICAgICAgICBoZWlnaHQgPSBsYW5kc2NhcGUgPyBsb3dlc3QgOiBoaWdoZXN0O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHdpZHRoID0gcmVzdWx0WzBdO1xuXHQgICAgICAgICAgICBoZWlnaHQgPSByZXN1bHRbMV07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRyaW1XaWR0aCA9IHdpZHRoO1xuXHQgICAgICAgIHRyaW1IZWlnaHQgPSBoZWlnaHQ7XG5cdCAgICAgICAgd2lkdGggKz0gYmxlZWQgKiAyO1xuXHQgICAgICAgIGhlaWdodCArPSBibGVlZCAqIDI7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHdpZHRoID0gcGFyZW50V2lkdGg7XG5cdCAgICAgICAgaGVpZ2h0ID0gcGFyZW50SGVpZ2h0O1xuXHQgICAgICAgIHRyaW1XaWR0aCA9IHdpZHRoO1xuXHQgICAgICAgIHRyaW1IZWlnaHQgPSBoZWlnaHQ7XG5cdCAgICB9XG5cdCAgICB2YXIgcmVhbFdpZHRoID0gd2lkdGg7XG5cdCAgICB2YXIgcmVhbEhlaWdodCA9IGhlaWdodDtcblx0ICAgIGlmIChoYXNEaW1lbnNpb25zICYmIHVuaXRzKSB7XG5cdCAgICAgICAgcmVhbFdpZHRoID0gY29udmVydERpc3RhbmNlJDEod2lkdGgsIHVuaXRzLCAncHgnLCBwaXhlbHNQZXJJbmNoKTtcblx0ICAgICAgICByZWFsSGVpZ2h0ID0gY29udmVydERpc3RhbmNlJDEoaGVpZ2h0LCB1bml0cywgJ3B4JywgcGl4ZWxzUGVySW5jaCk7XG5cdCAgICB9XG5cdCAgICBzdHlsZVdpZHRoID0gTWF0aC5yb3VuZChyZWFsV2lkdGgpO1xuXHQgICAgc3R5bGVIZWlnaHQgPSBNYXRoLnJvdW5kKHJlYWxIZWlnaHQpO1xuXHQgICAgaWYgKHNjYWxlVG9GaXQgJiYgIWV4cG9ydGluZyAmJiBoYXNEaW1lbnNpb25zKSB7XG5cdCAgICAgICAgdmFyIGFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xuXHQgICAgICAgIHZhciB3aW5kb3dBc3BlY3QgPSBwYXJlbnRXaWR0aCAvIHBhcmVudEhlaWdodDtcblx0ICAgICAgICB2YXIgc2NhbGVUb0ZpdFBhZGRpbmcgPSBkZWZpbmVkKHNldHRpbmdzLnNjYWxlVG9GaXRQYWRkaW5nLCA0MCk7XG5cdCAgICAgICAgdmFyIG1heFdpZHRoID0gTWF0aC5yb3VuZChwYXJlbnRXaWR0aCAtIHNjYWxlVG9GaXRQYWRkaW5nICogMik7XG5cdCAgICAgICAgdmFyIG1heEhlaWdodCA9IE1hdGgucm91bmQocGFyZW50SGVpZ2h0IC0gc2NhbGVUb0ZpdFBhZGRpbmcgKiAyKTtcblx0ICAgICAgICBpZiAoc3R5bGVXaWR0aCA+IG1heFdpZHRoIHx8IHN0eWxlSGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XG5cdCAgICAgICAgICAgIGlmICh3aW5kb3dBc3BlY3QgPiBhc3BlY3QpIHtcblx0ICAgICAgICAgICAgICAgIHN0eWxlSGVpZ2h0ID0gbWF4SGVpZ2h0O1xuXHQgICAgICAgICAgICAgICAgc3R5bGVXaWR0aCA9IE1hdGgucm91bmQoc3R5bGVIZWlnaHQgKiBhc3BlY3QpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgc3R5bGVXaWR0aCA9IG1heFdpZHRoO1xuXHQgICAgICAgICAgICAgICAgc3R5bGVIZWlnaHQgPSBNYXRoLnJvdW5kKHN0eWxlV2lkdGggLyBhc3BlY3QpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgY2FudmFzV2lkdGggPSBzY2FsZVRvVmlldyA/IE1hdGgucm91bmQocGl4ZWxSYXRpbyAqIHN0eWxlV2lkdGgpIDogTWF0aC5yb3VuZChwaXhlbFJhdGlvICogcmVhbFdpZHRoKTtcblx0ICAgIGNhbnZhc0hlaWdodCA9IHNjYWxlVG9WaWV3ID8gTWF0aC5yb3VuZChwaXhlbFJhdGlvICogc3R5bGVIZWlnaHQpIDogTWF0aC5yb3VuZChwaXhlbFJhdGlvICogcmVhbEhlaWdodCk7XG5cdCAgICB2YXIgdmlld3BvcnRXaWR0aCA9IHNjYWxlVG9WaWV3ID8gTWF0aC5yb3VuZChzdHlsZVdpZHRoKSA6IE1hdGgucm91bmQocmVhbFdpZHRoKTtcblx0ICAgIHZhciB2aWV3cG9ydEhlaWdodCA9IHNjYWxlVG9WaWV3ID8gTWF0aC5yb3VuZChzdHlsZUhlaWdodCkgOiBNYXRoLnJvdW5kKHJlYWxIZWlnaHQpO1xuXHQgICAgdmFyIHNjYWxlWCA9IGNhbnZhc1dpZHRoIC8gd2lkdGg7XG5cdCAgICB2YXIgc2NhbGVZID0gY2FudmFzSGVpZ2h0IC8gaGVpZ2h0O1xuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICBibGVlZDogYmxlZWQsXG5cdCAgICAgICAgcGl4ZWxSYXRpbzogcGl4ZWxSYXRpbyxcblx0ICAgICAgICB3aWR0aDogd2lkdGgsXG5cdCAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG5cdCAgICAgICAgZGltZW5zaW9uczogW3dpZHRoLGhlaWdodF0sXG5cdCAgICAgICAgdW5pdHM6IHVuaXRzIHx8ICdweCcsXG5cdCAgICAgICAgc2NhbGVYOiBzY2FsZVgsXG5cdCAgICAgICAgc2NhbGVZOiBzY2FsZVksXG5cdCAgICAgICAgcGl4ZWxzUGVySW5jaDogcGl4ZWxzUGVySW5jaCxcblx0ICAgICAgICB2aWV3cG9ydFdpZHRoOiB2aWV3cG9ydFdpZHRoLFxuXHQgICAgICAgIHZpZXdwb3J0SGVpZ2h0OiB2aWV3cG9ydEhlaWdodCxcblx0ICAgICAgICBjYW52YXNXaWR0aDogY2FudmFzV2lkdGgsXG5cdCAgICAgICAgY2FudmFzSGVpZ2h0OiBjYW52YXNIZWlnaHQsXG5cdCAgICAgICAgdHJpbVdpZHRoOiB0cmltV2lkdGgsXG5cdCAgICAgICAgdHJpbUhlaWdodDogdHJpbUhlaWdodCxcblx0ICAgICAgICBzdHlsZVdpZHRoOiBzdHlsZVdpZHRoLFxuXHQgICAgICAgIHN0eWxlSGVpZ2h0OiBzdHlsZUhlaWdodFxuXHQgICAgfTtcblx0fVxuXG5cdHZhciBnZXRDYW52YXNDb250ZXh0XzEgPSBnZXRDYW52YXNDb250ZXh0O1xuXHRmdW5jdGlvbiBnZXRDYW52YXNDb250ZXh0ICh0eXBlLCBvcHRzKSB7XG5cdCAgaWYgKHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuXHQgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbXVzdCBzcGVjaWZ5IHR5cGUgc3RyaW5nJylcblx0ICB9XG5cblx0ICBvcHRzID0gb3B0cyB8fCB7fTtcblxuXHQgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnICYmICFvcHRzLmNhbnZhcykge1xuXHQgICAgcmV0dXJuIG51bGwgLy8gY2hlY2sgZm9yIE5vZGVcblx0ICB9XG5cblx0ICB2YXIgY2FudmFzID0gb3B0cy5jYW52YXMgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdCAgaWYgKHR5cGVvZiBvcHRzLndpZHRoID09PSAnbnVtYmVyJykge1xuXHQgICAgY2FudmFzLndpZHRoID0gb3B0cy53aWR0aDtcblx0ICB9XG5cdCAgaWYgKHR5cGVvZiBvcHRzLmhlaWdodCA9PT0gJ251bWJlcicpIHtcblx0ICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRzLmhlaWdodDtcblx0ICB9XG5cblx0ICB2YXIgYXR0cmlicyA9IG9wdHM7XG5cdCAgdmFyIGdsO1xuXHQgIHRyeSB7XG5cdCAgICB2YXIgbmFtZXMgPSBbIHR5cGUgXTtcblx0ICAgIC8vIHByZWZpeCBHTCBjb250ZXh0c1xuXHQgICAgaWYgKHR5cGUuaW5kZXhPZignd2ViZ2wnKSA9PT0gMCkge1xuXHQgICAgICBuYW1lcy5wdXNoKCdleHBlcmltZW50YWwtJyArIHR5cGUpO1xuXHQgICAgfVxuXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIGdsID0gY2FudmFzLmdldENvbnRleHQobmFtZXNbaV0sIGF0dHJpYnMpO1xuXHQgICAgICBpZiAoZ2wpIHJldHVybiBnbFxuXHQgICAgfVxuXHQgIH0gY2F0Y2ggKGUpIHtcblx0ICAgIGdsID0gbnVsbDtcblx0ICB9XG5cdCAgcmV0dXJuIChnbCB8fCBudWxsKSAvLyBlbnN1cmUgbnVsbCBvbiBmYWlsXG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVDYW52YXNFbGVtZW50KCkge1xuXHQgICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignSXQgYXBwZWFycyB5b3UgYXJlIHJ1bmluZyBmcm9tIE5vZGUuanMgb3IgYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gVHJ5IHBhc3NpbmcgaW4gYW4gZXhpc3RpbmcgeyBjYW52YXMgfSBpbnRlcmZhY2UgaW5zdGVhZC4nKTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhzZXR0aW5ncykge1xuXHQgICAgaWYgKCBzZXR0aW5ncyA9PT0gdm9pZCAwICkgc2V0dGluZ3MgPSB7fTtcblxuXHQgICAgdmFyIGNvbnRleHQsIGNhbnZhcztcblx0ICAgIHZhciBvd25zQ2FudmFzID0gZmFsc2U7XG5cdCAgICBpZiAoc2V0dGluZ3MuY2FudmFzICE9PSBmYWxzZSkge1xuXHQgICAgICAgIGNvbnRleHQgPSBzZXR0aW5ncy5jb250ZXh0O1xuXHQgICAgICAgIGlmICghY29udGV4dCB8fCB0eXBlb2YgY29udGV4dCA9PT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgdmFyIG5ld0NhbnZhcyA9IHNldHRpbmdzLmNhbnZhcztcblx0ICAgICAgICAgICAgaWYgKCFuZXdDYW52YXMpIHtcblx0ICAgICAgICAgICAgICAgIG5ld0NhbnZhcyA9IGNyZWF0ZUNhbnZhc0VsZW1lbnQoKTtcblx0ICAgICAgICAgICAgICAgIG93bnNDYW52YXMgPSB0cnVlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciB0eXBlID0gY29udGV4dCB8fCAnMmQnO1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIG5ld0NhbnZhcy5nZXRDb250ZXh0ICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3BlY2lmaWVkIHsgY2FudmFzIH0gZWxlbWVudCBkb2VzIG5vdCBoYXZlIGEgZ2V0Q29udGV4dCgpIGZ1bmN0aW9uLCBtYXliZSBpdCBpcyBub3QgYSA8Y2FudmFzPiB0YWc/XCIpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGNvbnRleHQgPSBnZXRDYW52YXNDb250ZXh0XzEodHlwZSwgb2JqZWN0QXNzaWduKHt9LCBzZXR0aW5ncy5hdHRyaWJ1dGVzLCB7XG5cdCAgICAgICAgICAgICAgICBjYW52YXM6IG5ld0NhbnZhc1xuXHQgICAgICAgICAgICB9KSk7XG5cdCAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcIkZhaWxlZCBhdCBjYW52YXMuZ2V0Q29udGV4dCgnXCIgKyB0eXBlICsgXCInKSAtIHRoZSBicm93c2VyIG1heSBub3Qgc3VwcG9ydCB0aGlzIGNvbnRleHQsIG9yIGEgZGlmZmVyZW50IGNvbnRleHQgbWF5IGFscmVhZHkgYmUgaW4gdXNlIHdpdGggdGhpcyBjYW52YXMuXCIpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBjYW52YXMgPSBjb250ZXh0LmNhbnZhcztcblx0ICAgICAgICBpZiAoc2V0dGluZ3MuY2FudmFzICYmIGNhbnZhcyAhPT0gc2V0dGluZ3MuY2FudmFzKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHsgY2FudmFzIH0gYW5kIHsgY29udGV4dCB9IHNldHRpbmdzIG11c3QgcG9pbnQgdG8gdGhlIHNhbWUgdW5kZXJseWluZyBjYW52YXMgZWxlbWVudCcpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoc2V0dGluZ3MucGl4ZWxhdGVkKSB7XG5cdCAgICAgICAgICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cdCAgICAgICAgICAgIGNvbnRleHQubW96SW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cdCAgICAgICAgICAgIGNvbnRleHQub0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICBjb250ZXh0LndlYmtpdEltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICBjb250ZXh0Lm1zSW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cdCAgICAgICAgICAgIGNhbnZhcy5zdHlsZVsnaW1hZ2UtcmVuZGVyaW5nJ10gPSAncGl4ZWxhdGVkJztcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIGNhbnZhczogY2FudmFzLFxuXHQgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG5cdCAgICAgICAgb3duc0NhbnZhczogb3duc0NhbnZhc1xuXHQgICAgfTtcblx0fVxuXG5cdHZhciBTa2V0Y2hNYW5hZ2VyID0gZnVuY3Rpb24gU2tldGNoTWFuYWdlcigpIHtcblx0ICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdCAgICB0aGlzLl9zZXR0aW5ncyA9IHt9O1xuXHQgICAgdGhpcy5fcHJvcHMgPSB7fTtcblx0ICAgIHRoaXMuX3NrZXRjaCA9IHVuZGVmaW5lZDtcblx0ICAgIHRoaXMuX3JhZiA9IG51bGw7XG5cdCAgICB0aGlzLl9yZWNvcmRUaW1lb3V0ID0gbnVsbDtcblx0ICAgIHRoaXMuX2xhc3RSZWRyYXdSZXN1bHQgPSB1bmRlZmluZWQ7XG5cdCAgICB0aGlzLl9pc1A1UmVzaXppbmcgPSBmYWxzZTtcblx0ICAgIHRoaXMuX2tleWJvYXJkU2hvcnRjdXRzID0ga2V5Ym9hcmRTaG9ydGN1dHMoe1xuXHQgICAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zZXR0aW5ncy5ob3RrZXlzICE9PSBmYWxzZTsgfSxcblx0ICAgICAgICBzYXZlOiBmdW5jdGlvbiAoZXYpIHtcblx0ICAgICAgICAgICAgaWYgKGV2LnNoaWZ0S2V5KSB7XG5cdCAgICAgICAgICAgICAgICBpZiAodGhpcyQxLnByb3BzLnJlY29yZGluZykge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMkMS5lbmRSZWNvcmQoKTtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzJDEucnVuKCk7XG5cdCAgICAgICAgICAgICAgICB9IGVsc2UgXG5cdCAgICAgICAgICAgICAgICAgICAgeyB0aGlzJDEucmVjb3JkKCk7IH1cblx0ICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcyQxLnByb3BzLnJlY29yZGluZykge1xuXHQgICAgICAgICAgICAgICAgdGhpcyQxLmV4cG9ydEZyYW1lKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXHQgICAgICAgIHRvZ2dsZVBsYXk6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMkMS5wcm9wcy5wbGF5aW5nKSBcblx0ICAgICAgICAgICAgICAgIHsgdGhpcyQxLnBhdXNlKCk7IH1cblx0ICAgICAgICAgICAgIGVsc2UgXG5cdCAgICAgICAgICAgICAgICB7IHRoaXMkMS5wbGF5KCk7IH1cblx0ICAgICAgICB9LFxuXHQgICAgICAgIGNvbW1pdDogZnVuY3Rpb24gKGV2KSB7XG5cdCAgICAgICAgICAgIHRoaXMkMS5leHBvcnRGcmFtZSh7XG5cdCAgICAgICAgICAgICAgICBjb21taXQ6IHRydWVcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICB0aGlzLl9hbmltYXRlSGFuZGxlciA9IChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuYW5pbWF0ZSgpOyB9KTtcblx0ICAgIHRoaXMuX3Jlc2l6ZUhhbmRsZXIgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBjaGFuZ2VkID0gdGhpcyQxLnJlc2l6ZSgpO1xuXHQgICAgICAgIGlmIChjaGFuZ2VkKSB7XG5cdCAgICAgICAgICAgIHRoaXMkMS5yZW5kZXIoKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fTtcblxuXHR2YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBza2V0Y2g6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0sc2V0dGluZ3M6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0scHJvcHM6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblx0cHJvdG90eXBlQWNjZXNzb3JzLnNrZXRjaC5nZXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fc2tldGNoO1xuXHR9O1xuXHRwcm90b3R5cGVBY2Nlc3NvcnMuc2V0dGluZ3MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuXHR9O1xuXHRwcm90b3R5cGVBY2Nlc3NvcnMucHJvcHMuZ2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuX3Byb3BzO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fY29tcHV0ZVBsYXloZWFkID0gZnVuY3Rpb24gX2NvbXB1dGVQbGF5aGVhZCAoY3VycmVudFRpbWUsIGR1cmF0aW9uKSB7XG5cdCAgICB2YXIgaGFzRHVyYXRpb24gPSB0eXBlb2YgZHVyYXRpb24gPT09ICdudW1iZXInICYmIGlzRmluaXRlKGR1cmF0aW9uKTtcblx0ICAgIHJldHVybiBoYXNEdXJhdGlvbiA/IGN1cnJlbnRUaW1lIC8gZHVyYXRpb24gOiAwO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fY29tcHV0ZUZyYW1lID0gZnVuY3Rpb24gX2NvbXB1dGVGcmFtZSAocGxheWhlYWQsIHRpbWUsIHRvdGFsRnJhbWVzLCBmcHMpIHtcblx0ICAgIHJldHVybiBpc0Zpbml0ZSh0b3RhbEZyYW1lcykgJiYgdG90YWxGcmFtZXMgPiAxID8gTWF0aC5mbG9vcihwbGF5aGVhZCAqICh0b3RhbEZyYW1lcyAtIDEpKSA6IE1hdGguZmxvb3IoZnBzICogdGltZSk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9jb21wdXRlQ3VycmVudEZyYW1lID0gZnVuY3Rpb24gX2NvbXB1dGVDdXJyZW50RnJhbWUgKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVGcmFtZSh0aGlzLnByb3BzLnBsYXloZWFkLCB0aGlzLnByb3BzLnRpbWUsIHRoaXMucHJvcHMudG90YWxGcmFtZXMsIHRoaXMucHJvcHMuZnBzKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2dldFNpemVQcm9wcyA9IGZ1bmN0aW9uIF9nZXRTaXplUHJvcHMgKCkge1xuXHQgICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcztcblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgd2lkdGg6IHByb3BzLndpZHRoLFxuXHQgICAgICAgIGhlaWdodDogcHJvcHMuaGVpZ2h0LFxuXHQgICAgICAgIHBpeGVsUmF0aW86IHByb3BzLnBpeGVsUmF0aW8sXG5cdCAgICAgICAgY2FudmFzV2lkdGg6IHByb3BzLmNhbnZhc1dpZHRoLFxuXHQgICAgICAgIGNhbnZhc0hlaWdodDogcHJvcHMuY2FudmFzSGVpZ2h0LFxuXHQgICAgICAgIHZpZXdwb3J0V2lkdGg6IHByb3BzLnZpZXdwb3J0V2lkdGgsXG5cdCAgICAgICAgdmlld3BvcnRIZWlnaHQ6IHByb3BzLnZpZXdwb3J0SGVpZ2h0XG5cdCAgICB9O1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiBydW4gKCkge1xuXHQgICAgaWYgKCF0aGlzLnNrZXRjaCkgXG5cdCAgICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoJ3Nob3VsZCB3YWl0IHVudGlsIHNrZXRjaCBpcyBsb2FkZWQgYmVmb3JlIHRyeWluZyB0byBwbGF5KCknKTsgfVxuXHQgICAgaWYgKHRoaXMuc2V0dGluZ3MucGxheWluZyAhPT0gZmFsc2UpIHtcblx0ICAgICAgICB0aGlzLnBsYXkoKTtcblx0ICAgIH1cblx0ICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2guZGlzcG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIGNvbnNvbGUud2FybignSW4gY2FudmFzLXNrZXRjaEAwLjAuMjMgdGhlIGRpc3Bvc2UoKSBldmVudCBoYXMgYmVlbiByZW5hbWVkIHRvIHVubG9hZCgpJyk7XG5cdCAgICB9XG5cdCAgICBpZiAoIXRoaXMucHJvcHMuc3RhcnRlZCkge1xuXHQgICAgICAgIHRoaXMuX3NpZ25hbEJlZ2luKCk7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gdHJ1ZTtcblx0ICAgIH1cblx0ICAgIHRoaXMudGljaygpO1xuXHQgICAgdGhpcy5yZW5kZXIoKTtcblx0ICAgIHJldHVybiB0aGlzO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fY2FuY2VsVGltZW91dHMgPSBmdW5jdGlvbiBfY2FuY2VsVGltZW91dHMgKCkge1xuXHQgICAgaWYgKHRoaXMuX3JhZiAhPSBudWxsICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5fcmFmKTtcblx0ICAgICAgICB0aGlzLl9yYWYgPSBudWxsO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuX3JlY29yZFRpbWVvdXQgIT0gbnVsbCkge1xuXHQgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZWNvcmRUaW1lb3V0KTtcblx0ICAgICAgICB0aGlzLl9yZWNvcmRUaW1lb3V0ID0gbnVsbDtcblx0ICAgIH1cblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uIHBsYXkgKCkge1xuXHQgICAgdmFyIGFuaW1hdGUgPSB0aGlzLnNldHRpbmdzLmFuaW1hdGU7XG5cdCAgICBpZiAoJ2FuaW1hdGlvbicgaW4gdGhpcy5zZXR0aW5ncykge1xuXHQgICAgICAgIGFuaW1hdGUgPSB0cnVlO1xuXHQgICAgICAgIGNvbnNvbGUud2FybignW2NhbnZhcy1za2V0Y2hdIHsgYW5pbWF0aW9uIH0gaGFzIGJlZW4gcmVuYW1lZCB0byB7IGFuaW1hdGUgfScpO1xuXHQgICAgfVxuXHQgICAgaWYgKCFhbmltYXRlKSBcblx0ICAgICAgICB7IHJldHVybjsgfVxuXHQgICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuXHQgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tjYW52YXMtc2tldGNoXSBXQVJOOiBVc2luZyB7IGFuaW1hdGUgfSBpbiBOb2RlLmpzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMucHJvcHMucGxheWluZykgXG5cdCAgICAgICAgeyByZXR1cm47IH1cblx0ICAgIGlmICghdGhpcy5wcm9wcy5zdGFydGVkKSB7XG5cdCAgICAgICAgdGhpcy5fc2lnbmFsQmVnaW4oKTtcblx0ICAgICAgICB0aGlzLnByb3BzLnN0YXJ0ZWQgPSB0cnVlO1xuXHQgICAgfVxuXHQgICAgdGhpcy5wcm9wcy5wbGF5aW5nID0gdHJ1ZTtcblx0ICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG5cdCAgICB0aGlzLl9sYXN0VGltZSA9IGJyb3dzZXIoKTtcblx0ICAgIHRoaXMuX3JhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5fYW5pbWF0ZUhhbmRsZXIpO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlICgpIHtcblx0ICAgIGlmICh0aGlzLnByb3BzLnJlY29yZGluZykgXG5cdCAgICAgICAgeyB0aGlzLmVuZFJlY29yZCgpOyB9XG5cdCAgICB0aGlzLnByb3BzLnBsYXlpbmcgPSBmYWxzZTtcblx0ICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnRvZ2dsZVBsYXkgPSBmdW5jdGlvbiB0b2dnbGVQbGF5ICgpIHtcblx0ICAgIGlmICh0aGlzLnByb3BzLnBsYXlpbmcpIFxuXHQgICAgICAgIHsgdGhpcy5wYXVzZSgpOyB9XG5cdCAgICAgZWxzZSBcblx0ICAgICAgICB7IHRoaXMucGxheSgpOyB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiBzdG9wICgpIHtcblx0ICAgIHRoaXMucGF1c2UoKTtcblx0ICAgIHRoaXMucHJvcHMuZnJhbWUgPSAwO1xuXHQgICAgdGhpcy5wcm9wcy5wbGF5aGVhZCA9IDA7XG5cdCAgICB0aGlzLnByb3BzLnRpbWUgPSAwO1xuXHQgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuXHQgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gZmFsc2U7XG5cdCAgICB0aGlzLnJlbmRlcigpO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5yZWNvcmQgPSBmdW5jdGlvbiByZWNvcmQgKCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdCAgICBpZiAodGhpcy5wcm9wcy5yZWNvcmRpbmcpIFxuXHQgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG5cdCAgICAgICAgY29uc29sZS5lcnJvcignW2NhbnZhcy1za2V0Y2hdIFdBUk46IFJlY29yZGluZyBmcm9tIE5vZGUuanMgaXMgbm90IHlldCBzdXBwb3J0ZWQnKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cdCAgICB0aGlzLnN0b3AoKTtcblx0ICAgIHRoaXMucHJvcHMucGxheWluZyA9IHRydWU7XG5cdCAgICB0aGlzLnByb3BzLnJlY29yZGluZyA9IHRydWU7XG5cdCAgICB2YXIgZXhwb3J0T3B0cyA9IHRoaXMuX2NyZWF0ZUV4cG9ydE9wdGlvbnMoe1xuXHQgICAgICAgIHNlcXVlbmNlOiB0cnVlXG5cdCAgICB9KTtcblx0ICAgIHZhciBmcmFtZUludGVydmFsID0gMSAvIHRoaXMucHJvcHMuZnBzO1xuXHQgICAgdGhpcy5fY2FuY2VsVGltZW91dHMoKTtcblx0ICAgIHZhciB0aWNrID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICghdGhpcyQxLnByb3BzLnJlY29yZGluZykgXG5cdCAgICAgICAgICAgIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpOyB9XG5cdCAgICAgICAgdGhpcyQxLnByb3BzLmRlbHRhVGltZSA9IGZyYW1lSW50ZXJ2YWw7XG5cdCAgICAgICAgdGhpcyQxLnRpY2soKTtcblx0ICAgICAgICByZXR1cm4gdGhpcyQxLmV4cG9ydEZyYW1lKGV4cG9ydE9wdHMpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBpZiAoIXRoaXMkMS5wcm9wcy5yZWNvcmRpbmcpIFxuXHQgICAgICAgICAgICAgICAgeyByZXR1cm47IH1cblx0ICAgICAgICAgICAgdGhpcyQxLnByb3BzLmRlbHRhVGltZSA9IDA7XG5cdCAgICAgICAgICAgIHRoaXMkMS5wcm9wcy5mcmFtZSsrO1xuXHQgICAgICAgICAgICBpZiAodGhpcyQxLnByb3BzLmZyYW1lIDwgdGhpcyQxLnByb3BzLnRvdGFsRnJhbWVzKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzJDEucHJvcHMudGltZSArPSBmcmFtZUludGVydmFsO1xuXHQgICAgICAgICAgICAgICAgdGhpcyQxLnByb3BzLnBsYXloZWFkID0gdGhpcyQxLl9jb21wdXRlUGxheWhlYWQodGhpcyQxLnByb3BzLnRpbWUsIHRoaXMkMS5wcm9wcy5kdXJhdGlvbik7XG5cdCAgICAgICAgICAgICAgICB0aGlzJDEuX3JlY29yZFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRpY2ssIDApO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZpbmlzaGVkIHJlY29yZGluZycpO1xuXHQgICAgICAgICAgICAgICAgdGhpcyQxLl9zaWduYWxFbmQoKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMkMS5lbmRSZWNvcmQoKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMkMS5zdG9wKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzJDEucnVuKCk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblx0ICAgIH07XG5cdCAgICBpZiAoIXRoaXMucHJvcHMuc3RhcnRlZCkge1xuXHQgICAgICAgIHRoaXMuX3NpZ25hbEJlZ2luKCk7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gdHJ1ZTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnNrZXRjaCAmJiB0eXBlb2YgdGhpcy5za2V0Y2guYmVnaW5SZWNvcmQgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gdGhpcyQxLnNrZXRjaC5iZWdpblJlY29yZChwcm9wcyk7IH0pO1xuXHQgICAgfVxuXHQgICAgc3RyZWFtU3RhcnQoZXhwb3J0T3B0cykuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHQgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0ICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdCAgICAgICAgdGhpcyQxLl9yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuXHQgICAgfSk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9zaWduYWxCZWdpbiA9IGZ1bmN0aW9uIF9zaWduYWxCZWdpbiAoKSB7XG5cdCAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0ICAgIGlmICh0aGlzLnNrZXRjaCAmJiB0eXBlb2YgdGhpcy5za2V0Y2guYmVnaW4gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gdGhpcyQxLnNrZXRjaC5iZWdpbihwcm9wcyk7IH0pO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fc2lnbmFsRW5kID0gZnVuY3Rpb24gX3NpZ25hbEVuZCAoKSB7XG5cdCAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0ICAgIGlmICh0aGlzLnNrZXRjaCAmJiB0eXBlb2YgdGhpcy5za2V0Y2guZW5kID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZShmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHRoaXMkMS5za2V0Y2guZW5kKHByb3BzKTsgfSk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmVuZFJlY29yZCA9IGZ1bmN0aW9uIGVuZFJlY29yZCAoKSB7XG5cdCAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0ICAgIHZhciB3YXNSZWNvcmRpbmcgPSB0aGlzLnByb3BzLnJlY29yZGluZztcblx0ICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG5cdCAgICB0aGlzLnByb3BzLnJlY29yZGluZyA9IGZhbHNlO1xuXHQgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuXHQgICAgdGhpcy5wcm9wcy5wbGF5aW5nID0gZmFsc2U7XG5cdCAgICByZXR1cm4gc3RyZWFtRW5kKCkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHQgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcblx0ICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGlmICh3YXNSZWNvcmRpbmcgJiYgdGhpcyQxLnNrZXRjaCAmJiB0eXBlb2YgdGhpcyQxLnNrZXRjaC5lbmRSZWNvcmQgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgdGhpcyQxLl93cmFwQ29udGV4dFNjYWxlKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gdGhpcyQxLnNrZXRjaC5lbmRSZWNvcmQocHJvcHMpOyB9KTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2NyZWF0ZUV4cG9ydE9wdGlvbnMgPSBmdW5jdGlvbiBfY3JlYXRlRXhwb3J0T3B0aW9ucyAob3B0KSB7XG5cdCAgICAgICAgaWYgKCBvcHQgPT09IHZvaWQgMCApIG9wdCA9IHt9O1xuXG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIHNlcXVlbmNlOiBvcHQuc2VxdWVuY2UsXG5cdCAgICAgICAgc2F2ZTogb3B0LnNhdmUsXG5cdCAgICAgICAgZnBzOiB0aGlzLnByb3BzLmZwcyxcblx0ICAgICAgICBmcmFtZTogb3B0LnNlcXVlbmNlID8gdGhpcy5wcm9wcy5mcmFtZSA6IHVuZGVmaW5lZCxcblx0ICAgICAgICBmaWxlOiB0aGlzLnNldHRpbmdzLmZpbGUsXG5cdCAgICAgICAgbmFtZTogdGhpcy5zZXR0aW5ncy5uYW1lLFxuXHQgICAgICAgIHByZWZpeDogdGhpcy5zZXR0aW5ncy5wcmVmaXgsXG5cdCAgICAgICAgc3VmZml4OiB0aGlzLnNldHRpbmdzLnN1ZmZpeCxcblx0ICAgICAgICBlbmNvZGluZzogdGhpcy5zZXR0aW5ncy5lbmNvZGluZyxcblx0ICAgICAgICBlbmNvZGluZ1F1YWxpdHk6IHRoaXMuc2V0dGluZ3MuZW5jb2RpbmdRdWFsaXR5LFxuXHQgICAgICAgIHRpbWVTdGFtcDogb3B0LnRpbWVTdGFtcCB8fCBnZXRUaW1lU3RhbXAoKSxcblx0ICAgICAgICB0b3RhbEZyYW1lczogaXNGaW5pdGUodGhpcy5wcm9wcy50b3RhbEZyYW1lcykgPyBNYXRoLm1heCgwLCB0aGlzLnByb3BzLnRvdGFsRnJhbWVzKSA6IDEwMDBcblx0ICAgIH07XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmV4cG9ydEZyYW1lID0gZnVuY3Rpb24gZXhwb3J0RnJhbWUgKG9wdCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXHQgICAgICAgIGlmICggb3B0ID09PSB2b2lkIDAgKSBvcHQgPSB7fTtcblxuXHQgICAgaWYgKCF0aGlzLnNrZXRjaCkgXG5cdCAgICAgICAgeyByZXR1cm4gUHJvbWlzZS5hbGwoW10pOyB9XG5cdCAgICBpZiAodHlwZW9mIHRoaXMuc2tldGNoLnByZUV4cG9ydCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRoaXMuc2tldGNoLnByZUV4cG9ydCgpO1xuXHQgICAgfVxuXHQgICAgdmFyIGV4cG9ydE9wdHMgPSB0aGlzLl9jcmVhdGVFeHBvcnRPcHRpb25zKG9wdCk7XG5cdCAgICB2YXIgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG5cdCAgICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXHQgICAgaWYgKGNsaWVudCAmJiBvcHQuY29tbWl0ICYmIHR5cGVvZiBjbGllbnQuY29tbWl0ID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdmFyIGNvbW1pdE9wdHMgPSBvYmplY3RBc3NpZ24oe30sIGV4cG9ydE9wdHMpO1xuXHQgICAgICAgIHZhciBoYXNoID0gY2xpZW50LmNvbW1pdChjb21taXRPcHRzKTtcblx0ICAgICAgICBpZiAoaXNQcm9taXNlXzEoaGFzaCkpIFxuXHQgICAgICAgICAgICB7IHAgPSBoYXNoOyB9XG5cdCAgICAgICAgIGVsc2UgXG5cdCAgICAgICAgICAgIHsgcCA9IFByb21pc2UucmVzb2x2ZShoYXNoKTsgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbiAoaGFzaCkgeyByZXR1cm4gdGhpcyQxLl9kb0V4cG9ydEZyYW1lKG9iamVjdEFzc2lnbih7fSwgZXhwb3J0T3B0cywge1xuXHQgICAgICAgIGhhc2g6IGhhc2ggfHwgJydcblx0ICAgIH0pKTsgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG5cdCAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT09IDEpIFxuXHQgICAgICAgICAgICB7IHJldHVybiByZXN1bHRbMF07IH1cblx0ICAgICAgICAgZWxzZSBcblx0ICAgICAgICAgICAgeyByZXR1cm4gcmVzdWx0OyB9XG5cdCAgICB9KTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2RvRXhwb3J0RnJhbWUgPSBmdW5jdGlvbiBfZG9FeHBvcnRGcmFtZSAoZXhwb3J0T3B0cykge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXHQgICAgICAgIGlmICggZXhwb3J0T3B0cyA9PT0gdm9pZCAwICkgZXhwb3J0T3B0cyA9IHt9O1xuXG5cdCAgICB0aGlzLl9wcm9wcy5leHBvcnRpbmcgPSB0cnVlO1xuXHQgICAgdGhpcy5yZXNpemUoKTtcblx0ICAgIHZhciBkcmF3UmVzdWx0ID0gdGhpcy5yZW5kZXIoKTtcblx0ICAgIHZhciBjYW52YXMgPSB0aGlzLnByb3BzLmNhbnZhcztcblx0ICAgIGlmICh0eXBlb2YgZHJhd1Jlc3VsdCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICBkcmF3UmVzdWx0ID0gW2NhbnZhc107XG5cdCAgICB9XG5cdCAgICBkcmF3UmVzdWx0ID0gW10uY29uY2F0KGRyYXdSZXN1bHQpLmZpbHRlcihCb29sZWFuKTtcblx0ICAgIGRyYXdSZXN1bHQgPSBkcmF3UmVzdWx0Lm1hcChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdCAgICAgICAgdmFyIGhhc0RhdGFPYmplY3QgPSB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyAmJiByZXN1bHQgJiYgKCdkYXRhJyBpbiByZXN1bHQgfHwgJ2RhdGFVUkwnIGluIHJlc3VsdCk7XG5cdCAgICAgICAgdmFyIGRhdGEgPSBoYXNEYXRhT2JqZWN0ID8gcmVzdWx0LmRhdGEgOiByZXN1bHQ7XG5cdCAgICAgICAgdmFyIG9wdHMgPSBoYXNEYXRhT2JqZWN0ID8gb2JqZWN0QXNzaWduKHt9LCByZXN1bHQsIHtcblx0ICAgICAgICAgICAgZGF0YTogZGF0YVxuXHQgICAgICAgIH0pIDoge1xuXHQgICAgICAgICAgICBkYXRhOiBkYXRhXG5cdCAgICAgICAgfTtcblx0ICAgICAgICBpZiAoaXNDYW52YXMoZGF0YSkpIHtcblx0ICAgICAgICAgICAgdmFyIGVuY29kaW5nID0gb3B0cy5lbmNvZGluZyB8fCBleHBvcnRPcHRzLmVuY29kaW5nO1xuXHQgICAgICAgICAgICB2YXIgZW5jb2RpbmdRdWFsaXR5ID0gZGVmaW5lZChvcHRzLmVuY29kaW5nUXVhbGl0eSwgZXhwb3J0T3B0cy5lbmNvZGluZ1F1YWxpdHksIDAuOTUpO1xuXHQgICAgICAgICAgICB2YXIgcmVmID0gZXhwb3J0Q2FudmFzKGRhdGEsIHtcblx0ICAgICAgICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZyxcblx0ICAgICAgICAgICAgICAgIGVuY29kaW5nUXVhbGl0eTogZW5jb2RpbmdRdWFsaXR5XG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICAgICAgdmFyIGRhdGFVUkwgPSByZWYuZGF0YVVSTDtcblx0ICAgICAgICAgICAgICAgIHZhciBleHRlbnNpb24gPSByZWYuZXh0ZW5zaW9uO1xuXHQgICAgICAgICAgICAgICAgdmFyIHR5cGUgPSByZWYudHlwZTtcblx0ICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24ob3B0cywge1xuXHQgICAgICAgICAgICAgICAgZGF0YVVSTDogZGF0YVVSTCxcblx0ICAgICAgICAgICAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uLFxuXHQgICAgICAgICAgICAgICAgdHlwZTogdHlwZVxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gb3B0cztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0ICAgIHRoaXMuX3Byb3BzLmV4cG9ydGluZyA9IGZhbHNlO1xuXHQgICAgdGhpcy5yZXNpemUoKTtcblx0ICAgIHRoaXMucmVuZGVyKCk7XG5cdCAgICByZXR1cm4gUHJvbWlzZS5hbGwoZHJhd1Jlc3VsdC5tYXAoZnVuY3Rpb24gKHJlc3VsdCwgaSwgbGF5ZXJMaXN0KSB7XG5cdCAgICAgICAgdmFyIGN1ck9wdCA9IG9iamVjdEFzc2lnbih7XG5cdCAgICAgICAgICAgIGV4dGVuc2lvbjogJycsXG5cdCAgICAgICAgICAgIHByZWZpeDogJycsXG5cdCAgICAgICAgICAgIHN1ZmZpeDogJydcblx0ICAgICAgICB9LCBleHBvcnRPcHRzLCByZXN1bHQsIHtcblx0ICAgICAgICAgICAgbGF5ZXI6IGksXG5cdCAgICAgICAgICAgIHRvdGFsTGF5ZXJzOiBsYXllckxpc3QubGVuZ3RoXG5cdCAgICAgICAgfSk7XG5cdCAgICAgICAgdmFyIHNhdmVQYXJhbSA9IGV4cG9ydE9wdHMuc2F2ZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHJlc3VsdC5zYXZlO1xuXHQgICAgICAgIGN1ck9wdC5zYXZlID0gc2F2ZVBhcmFtICE9PSBmYWxzZTtcblx0ICAgICAgICBjdXJPcHQuZmlsZW5hbWUgPSByZXNvbHZlRmlsZW5hbWUoY3VyT3B0KTtcblx0ICAgICAgICBkZWxldGUgY3VyT3B0LmVuY29kaW5nO1xuXHQgICAgICAgIGRlbGV0ZSBjdXJPcHQuZW5jb2RpbmdRdWFsaXR5O1xuXHQgICAgICAgIGZvciAodmFyIGsgaW4gY3VyT3B0KSB7XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgY3VyT3B0W2tdID09PSAndW5kZWZpbmVkJykgXG5cdCAgICAgICAgICAgICAgICB7IGRlbGV0ZSBjdXJPcHRba107IH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIHNhdmVQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHt9KTtcblx0ICAgICAgICBpZiAoY3VyT3B0LnNhdmUpIHtcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSBjdXJPcHQuZGF0YTtcblx0ICAgICAgICAgICAgaWYgKGN1ck9wdC5kYXRhVVJMKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgZGF0YVVSTCA9IGN1ck9wdC5kYXRhVVJMO1xuXHQgICAgICAgICAgICAgICAgc2F2ZVByb21pc2UgPSBzYXZlRGF0YVVSTChkYXRhVVJMLCBjdXJPcHQpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgc2F2ZVByb21pc2UgPSBzYXZlRmlsZShkYXRhLCBjdXJPcHQpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBzYXZlUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChzYXZlUmVzdWx0KSB7IHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjdXJPcHQsIHNhdmVSZXN1bHQpOyB9KTtcblx0ICAgIH0pKS50aGVuKGZ1bmN0aW9uIChldikge1xuXHQgICAgICAgIHZhciBzYXZlZEV2ZW50cyA9IGV2LmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5zYXZlOyB9KTtcblx0ICAgICAgICBpZiAoc2F2ZWRFdmVudHMubGVuZ3RoID4gMCkge1xuXHQgICAgICAgICAgICB2YXIgZXZlbnRXaXRoT3V0cHV0ID0gc2F2ZWRFdmVudHMuZmluZChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5vdXRwdXROYW1lOyB9KTtcblx0ICAgICAgICAgICAgdmFyIGlzQ2xpZW50ID0gc2F2ZWRFdmVudHMuc29tZShmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5jbGllbnQ7IH0pO1xuXHQgICAgICAgICAgICB2YXIgaXNTdHJlYW1pbmcgPSBzYXZlZEV2ZW50cy5zb21lKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnN0cmVhbTsgfSk7XG5cdCAgICAgICAgICAgIHZhciBpdGVtO1xuXHQgICAgICAgICAgICBpZiAoc2F2ZWRFdmVudHMubGVuZ3RoID4gMSkgXG5cdCAgICAgICAgICAgICAgICB7IGl0ZW0gPSBzYXZlZEV2ZW50cy5sZW5ndGg7IH1cblx0ICAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50V2l0aE91dHB1dCkgXG5cdCAgICAgICAgICAgICAgICB7IGl0ZW0gPSAoZXZlbnRXaXRoT3V0cHV0Lm91dHB1dE5hbWUpICsgXCIvXCIgKyAoc2F2ZWRFdmVudHNbMF0uZmlsZW5hbWUpOyB9XG5cdCAgICAgICAgICAgICBlbHNlIFxuXHQgICAgICAgICAgICAgICAgeyBpdGVtID0gXCJcIiArIChzYXZlZEV2ZW50c1swXS5maWxlbmFtZSk7IH1cblx0ICAgICAgICAgICAgdmFyIG9mU2VxID0gJyc7XG5cdCAgICAgICAgICAgIGlmIChleHBvcnRPcHRzLnNlcXVlbmNlKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaGFzVG90YWxGcmFtZXMgPSBpc0Zpbml0ZSh0aGlzJDEucHJvcHMudG90YWxGcmFtZXMpO1xuXHQgICAgICAgICAgICAgICAgb2ZTZXEgPSBoYXNUb3RhbEZyYW1lcyA/IChcIiAoZnJhbWUgXCIgKyAoZXhwb3J0T3B0cy5mcmFtZSArIDEpICsgXCIgLyBcIiArICh0aGlzJDEucHJvcHMudG90YWxGcmFtZXMpICsgXCIpXCIpIDogKFwiIChmcmFtZSBcIiArIChleHBvcnRPcHRzLmZyYW1lKSArIFwiKVwiKTtcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChzYXZlZEV2ZW50cy5sZW5ndGggPiAxKSB7XG5cdCAgICAgICAgICAgICAgICBvZlNlcSA9IFwiIGZpbGVzXCI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgdmFyIGNsaWVudCA9IGlzQ2xpZW50ID8gJ2NhbnZhcy1za2V0Y2gtY2xpJyA6ICdjYW52YXMtc2tldGNoJztcblx0ICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGlzU3RyZWFtaW5nID8gJ1N0cmVhbWluZyBpbnRvJyA6ICdFeHBvcnRlZCc7XG5cdCAgICAgICAgICAgIGNvbnNvbGUubG9nKChcIiVjW1wiICsgY2xpZW50ICsgXCJdJWMgXCIgKyBhY3Rpb24gKyBcIiAlY1wiICsgaXRlbSArIFwiJWNcIiArIG9mU2VxKSwgJ2NvbG9yOiAjOGU4ZThlOycsICdjb2xvcjogaW5pdGlhbDsnLCAnZm9udC13ZWlnaHQ6IGJvbGQ7JywgJ2ZvbnQtd2VpZ2h0OiBpbml0aWFsOycpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAodHlwZW9mIHRoaXMkMS5za2V0Y2gucG9zdEV4cG9ydCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICB0aGlzJDEuc2tldGNoLnBvc3RFeHBvcnQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGV2O1xuXHQgICAgfSk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl93cmFwQ29udGV4dFNjYWxlID0gZnVuY3Rpb24gX3dyYXBDb250ZXh0U2NhbGUgKGNiKSB7XG5cdCAgICB0aGlzLl9wcmVSZW5kZXIoKTtcblx0ICAgIGNiKHRoaXMucHJvcHMpO1xuXHQgICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fcHJlUmVuZGVyID0gZnVuY3Rpb24gX3ByZVJlbmRlciAoKSB7XG5cdCAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXHQgICAgaWYgKCF0aGlzLnByb3BzLmdsICYmIHByb3BzLmNvbnRleHQgJiYgIXByb3BzLnA1KSB7XG5cdCAgICAgICAgcHJvcHMuY29udGV4dC5zYXZlKCk7XG5cdCAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc2NhbGVDb250ZXh0ICE9PSBmYWxzZSkge1xuXHQgICAgICAgICAgICBwcm9wcy5jb250ZXh0LnNjYWxlKHByb3BzLnNjYWxlWCwgcHJvcHMuc2NhbGVZKTtcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2UgaWYgKHByb3BzLnA1KSB7XG5cdCAgICAgICAgcHJvcHMucDUuc2NhbGUocHJvcHMuc2NhbGVYIC8gcHJvcHMucGl4ZWxSYXRpbywgcHJvcHMuc2NhbGVZIC8gcHJvcHMucGl4ZWxSYXRpbyk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9wb3N0UmVuZGVyID0gZnVuY3Rpb24gX3Bvc3RSZW5kZXIgKCkge1xuXHQgICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcztcblx0ICAgIGlmICghdGhpcy5wcm9wcy5nbCAmJiBwcm9wcy5jb250ZXh0ICYmICFwcm9wcy5wNSkge1xuXHQgICAgICAgIHByb3BzLmNvbnRleHQucmVzdG9yZSgpO1xuXHQgICAgfVxuXHQgICAgaWYgKHByb3BzLmdsICYmIHRoaXMuc2V0dGluZ3MuZmx1c2ggIT09IGZhbHNlICYmICFwcm9wcy5wNSkge1xuXHQgICAgICAgIHByb3BzLmdsLmZsdXNoKCk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbiB0aWNrICgpIHtcblx0ICAgIGlmICh0aGlzLnNrZXRjaCAmJiB0eXBlb2YgdGhpcy5za2V0Y2gudGljayA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRoaXMuX3ByZVJlbmRlcigpO1xuXHQgICAgICAgIHRoaXMuc2tldGNoLnRpY2sodGhpcy5wcm9wcyk7XG5cdCAgICAgICAgdGhpcy5fcG9zdFJlbmRlcigpO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIgKCkge1xuXHQgICAgaWYgKHRoaXMucHJvcHMucDUpIHtcblx0ICAgICAgICB0aGlzLl9sYXN0UmVkcmF3UmVzdWx0ID0gdW5kZWZpbmVkO1xuXHQgICAgICAgIHRoaXMucHJvcHMucDUucmVkcmF3KCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RSZWRyYXdSZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHJldHVybiB0aGlzLnN1Ym1pdERyYXdDYWxsKCk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnN1Ym1pdERyYXdDYWxsID0gZnVuY3Rpb24gc3VibWl0RHJhd0NhbGwgKCkge1xuXHQgICAgaWYgKCF0aGlzLnNrZXRjaCkgXG5cdCAgICAgICAgeyByZXR1cm47IH1cblx0ICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdCAgICB0aGlzLl9wcmVSZW5kZXIoKTtcblx0ICAgIHZhciBkcmF3UmVzdWx0O1xuXHQgICAgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIGRyYXdSZXN1bHQgPSB0aGlzLnNrZXRjaChwcm9wcyk7XG5cdCAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaC5yZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBkcmF3UmVzdWx0ID0gdGhpcy5za2V0Y2gucmVuZGVyKHByb3BzKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX3Bvc3RSZW5kZXIoKTtcblx0ICAgIHJldHVybiBkcmF3UmVzdWx0O1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKG9wdCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXHQgICAgICAgIGlmICggb3B0ID09PSB2b2lkIDAgKSBvcHQgPSB7fTtcblxuXHQgICAgdmFyIG5vdFlldFN1cHBvcnRlZCA9IFsnYW5pbWF0ZSddO1xuXHQgICAgT2JqZWN0LmtleXMob3B0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0ICAgICAgICBpZiAobm90WWV0U3VwcG9ydGVkLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJTb3JyeSwgdGhlIHsgXCIgKyBrZXkgKyBcIiB9IG9wdGlvbiBpcyBub3QgeWV0IHN1cHBvcnRlZCB3aXRoIHVwZGF0ZSgpLlwiKSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICB2YXIgb2xkQ2FudmFzID0gdGhpcy5fc2V0dGluZ3MuY2FudmFzO1xuXHQgICAgdmFyIG9sZENvbnRleHQgPSB0aGlzLl9zZXR0aW5ncy5jb250ZXh0O1xuXHQgICAgZm9yICh2YXIga2V5IGluIG9wdCkge1xuXHQgICAgICAgIHZhciB2YWx1ZSA9IG9wdFtrZXldO1xuXHQgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgICAgIHRoaXMkMS5fc2V0dGluZ3Nba2V5XSA9IHZhbHVlO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHZhciB0aW1lT3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3NldHRpbmdzLCBvcHQpO1xuXHQgICAgaWYgKCd0aW1lJyBpbiBvcHQgJiYgJ2ZyYW1lJyBpbiBvcHQpIFxuXHQgICAgICAgIHsgdGhyb3cgbmV3IEVycm9yKCdZb3Ugc2hvdWxkIHNwZWNpZnkgeyB0aW1lIH0gb3IgeyBmcmFtZSB9IGJ1dCBub3QgYm90aCcpOyB9XG5cdCAgICAgZWxzZSBpZiAoJ3RpbWUnIGluIG9wdCkgXG5cdCAgICAgICAgeyBkZWxldGUgdGltZU9wdHMuZnJhbWU7IH1cblx0ICAgICBlbHNlIGlmICgnZnJhbWUnIGluIG9wdCkgXG5cdCAgICAgICAgeyBkZWxldGUgdGltZU9wdHMudGltZTsgfVxuXHQgICAgaWYgKCdkdXJhdGlvbicgaW4gb3B0ICYmICd0b3RhbEZyYW1lcycgaW4gb3B0KSBcblx0ICAgICAgICB7IHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IHsgZHVyYXRpb24gfSBvciB7IHRvdGFsRnJhbWVzIH0gYnV0IG5vdCBib3RoJyk7IH1cblx0ICAgICBlbHNlIGlmICgnZHVyYXRpb24nIGluIG9wdCkgXG5cdCAgICAgICAgeyBkZWxldGUgdGltZU9wdHMudG90YWxGcmFtZXM7IH1cblx0ICAgICBlbHNlIGlmICgndG90YWxGcmFtZXMnIGluIG9wdCkgXG5cdCAgICAgICAgeyBkZWxldGUgdGltZU9wdHMuZHVyYXRpb247IH1cblx0ICAgIGlmICgnZGF0YScgaW4gb3B0KSBcblx0ICAgICAgICB7IHRoaXMuX3Byb3BzLmRhdGEgPSBvcHQuZGF0YTsgfVxuXHQgICAgdmFyIHRpbWVQcm9wcyA9IHRoaXMuZ2V0VGltZVByb3BzKHRpbWVPcHRzKTtcblx0ICAgIE9iamVjdC5hc3NpZ24odGhpcy5fcHJvcHMsIHRpbWVQcm9wcyk7XG5cdCAgICBpZiAob2xkQ2FudmFzICE9PSB0aGlzLl9zZXR0aW5ncy5jYW52YXMgfHwgb2xkQ29udGV4dCAhPT0gdGhpcy5fc2V0dGluZ3MuY29udGV4dCkge1xuXHQgICAgICAgIHZhciByZWYgPSBjcmVhdGVDYW52YXModGhpcy5fc2V0dGluZ3MpO1xuXHQgICAgICAgICAgICB2YXIgY2FudmFzID0gcmVmLmNhbnZhcztcblx0ICAgICAgICAgICAgdmFyIGNvbnRleHQgPSByZWYuY29udGV4dDtcblx0ICAgICAgICB0aGlzLnByb3BzLmNhbnZhcyA9IGNhbnZhcztcblx0ICAgICAgICB0aGlzLnByb3BzLmNvbnRleHQgPSBjb250ZXh0O1xuXHQgICAgICAgIHRoaXMuX3NldHVwR0xLZXkoKTtcblx0ICAgICAgICB0aGlzLl9hcHBlbmRDYW52YXNJZk5lZWRlZCgpO1xuXHQgICAgfVxuXHQgICAgaWYgKG9wdC5wNSAmJiB0eXBlb2Ygb3B0LnA1ICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5wNSA9IG9wdC5wNTtcblx0ICAgICAgICB0aGlzLnByb3BzLnA1LmRyYXcgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICBpZiAodGhpcyQxLl9pc1A1UmVzaXppbmcpIFxuXHQgICAgICAgICAgICAgICAgeyByZXR1cm47IH1cblx0ICAgICAgICAgICAgdGhpcyQxLl9sYXN0UmVkcmF3UmVzdWx0ID0gdGhpcyQxLnN1Ym1pdERyYXdDYWxsKCk7XG5cdCAgICAgICAgfSk7XG5cdCAgICB9XG5cdCAgICBpZiAoJ3BsYXlpbmcnIGluIG9wdCkge1xuXHQgICAgICAgIGlmIChvcHQucGxheWluZykgXG5cdCAgICAgICAgICAgIHsgdGhpcy5wbGF5KCk7IH1cblx0ICAgICAgICAgZWxzZSBcblx0ICAgICAgICAgICAgeyB0aGlzLnBhdXNlKCk7IH1cblx0ICAgIH1cblx0ICAgIGNoZWNrU2V0dGluZ3ModGhpcy5fc2V0dGluZ3MpO1xuXHQgICAgdGhpcy5yZXNpemUoKTtcblx0ICAgIHRoaXMucmVuZGVyKCk7XG5cdCAgICByZXR1cm4gdGhpcy5wcm9wcztcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24gcmVzaXplICgpIHtcblx0ICAgIHZhciBvbGRTaXplcyA9IHRoaXMuX2dldFNpemVQcm9wcygpO1xuXHQgICAgdmFyIHNldHRpbmdzID0gdGhpcy5zZXR0aW5ncztcblx0ICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdCAgICB2YXIgbmV3UHJvcHMgPSByZXNpemVDYW52YXMocHJvcHMsIHNldHRpbmdzKTtcblx0ICAgIE9iamVjdC5hc3NpZ24odGhpcy5fcHJvcHMsIG5ld1Byb3BzKTtcblx0ICAgIHZhciByZWYgPSB0aGlzLnByb3BzO1xuXHQgICAgICAgIHZhciBwaXhlbFJhdGlvID0gcmVmLnBpeGVsUmF0aW87XG5cdCAgICAgICAgdmFyIGNhbnZhc1dpZHRoID0gcmVmLmNhbnZhc1dpZHRoO1xuXHQgICAgICAgIHZhciBjYW52YXNIZWlnaHQgPSByZWYuY2FudmFzSGVpZ2h0O1xuXHQgICAgICAgIHZhciBzdHlsZVdpZHRoID0gcmVmLnN0eWxlV2lkdGg7XG5cdCAgICAgICAgdmFyIHN0eWxlSGVpZ2h0ID0gcmVmLnN0eWxlSGVpZ2h0O1xuXHQgICAgdmFyIGNhbnZhcyA9IHRoaXMucHJvcHMuY2FudmFzO1xuXHQgICAgaWYgKGNhbnZhcyAmJiBzZXR0aW5ncy5yZXNpemVDYW52YXMgIT09IGZhbHNlKSB7XG5cdCAgICAgICAgaWYgKHByb3BzLnA1KSB7XG5cdCAgICAgICAgICAgIGlmIChjYW52YXMud2lkdGggIT09IGNhbnZhc1dpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGNhbnZhc0hlaWdodCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5faXNQNVJlc2l6aW5nID0gdHJ1ZTtcblx0ICAgICAgICAgICAgICAgIHByb3BzLnA1LnBpeGVsRGVuc2l0eShwaXhlbFJhdGlvKTtcblx0ICAgICAgICAgICAgICAgIHByb3BzLnA1LnJlc2l6ZUNhbnZhcyhjYW52YXNXaWR0aCAvIHBpeGVsUmF0aW8sIGNhbnZhc0hlaWdodCAvIHBpeGVsUmF0aW8sIGZhbHNlKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2lzUDVSZXNpemluZyA9IGZhbHNlO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKGNhbnZhcy53aWR0aCAhPT0gY2FudmFzV2lkdGgpIFxuXHQgICAgICAgICAgICAgICAgeyBjYW52YXMud2lkdGggPSBjYW52YXNXaWR0aDsgfVxuXHQgICAgICAgICAgICBpZiAoY2FudmFzLmhlaWdodCAhPT0gY2FudmFzSGVpZ2h0KSBcblx0ICAgICAgICAgICAgICAgIHsgY2FudmFzLmhlaWdodCA9IGNhbnZhc0hlaWdodDsgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoaXNCcm93c2VyKCkgJiYgc2V0dGluZ3Muc3R5bGVDYW52YXMgIT09IGZhbHNlKSB7XG5cdCAgICAgICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IHN0eWxlV2lkdGggKyBcInB4XCI7XG5cdCAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBzdHlsZUhlaWdodCArIFwicHhcIjtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgbmV3U2l6ZXMgPSB0aGlzLl9nZXRTaXplUHJvcHMoKTtcblx0ICAgIHZhciBjaGFuZ2VkID0gIWRlZXBFcXVhbF8xKG9sZFNpemVzLCBuZXdTaXplcyk7XG5cdCAgICBpZiAoY2hhbmdlZCkge1xuXHQgICAgICAgIHRoaXMuX3NpemVDaGFuZ2VkKCk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gY2hhbmdlZDtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX3NpemVDaGFuZ2VkID0gZnVuY3Rpb24gX3NpemVDaGFuZ2VkICgpIHtcblx0ICAgIGlmICh0aGlzLnNrZXRjaCAmJiB0eXBlb2YgdGhpcy5za2V0Y2gucmVzaXplID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhpcy5za2V0Y2gucmVzaXplKHRoaXMucHJvcHMpO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24gYW5pbWF0ZSAoKSB7XG5cdCAgICBpZiAoIXRoaXMucHJvcHMucGxheWluZykgXG5cdCAgICAgICAgeyByZXR1cm47IH1cblx0ICAgIGlmICghaXNCcm93c2VyKCkpIHtcblx0ICAgICAgICBjb25zb2xlLmVycm9yKCdbY2FudmFzLXNrZXRjaF0gV0FSTjogQW5pbWF0aW9uIGluIE5vZGUuanMgaXMgbm90IHlldCBzdXBwb3J0ZWQnKTtcblx0ICAgICAgICByZXR1cm47XG5cdCAgICB9XG5cdCAgICB0aGlzLl9yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGVIYW5kbGVyKTtcblx0ICAgIHZhciBub3cgPSBicm93c2VyKCk7XG5cdCAgICB2YXIgZnBzID0gdGhpcy5wcm9wcy5mcHM7XG5cdCAgICB2YXIgZnJhbWVJbnRlcnZhbE1TID0gMTAwMCAvIGZwcztcblx0ICAgIHZhciBkZWx0YVRpbWVNUyA9IG5vdyAtIHRoaXMuX2xhc3RUaW1lO1xuXHQgICAgdmFyIGR1cmF0aW9uID0gdGhpcy5wcm9wcy5kdXJhdGlvbjtcblx0ICAgIHZhciBoYXNEdXJhdGlvbiA9IHR5cGVvZiBkdXJhdGlvbiA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoZHVyYXRpb24pO1xuXHQgICAgdmFyIGlzTmV3RnJhbWUgPSB0cnVlO1xuXHQgICAgdmFyIHBsYXliYWNrUmF0ZSA9IHRoaXMuc2V0dGluZ3MucGxheWJhY2tSYXRlO1xuXHQgICAgaWYgKHBsYXliYWNrUmF0ZSA9PT0gJ2ZpeGVkJykge1xuXHQgICAgICAgIGRlbHRhVGltZU1TID0gZnJhbWVJbnRlcnZhbE1TO1xuXHQgICAgfSBlbHNlIGlmIChwbGF5YmFja1JhdGUgPT09ICd0aHJvdHRsZScpIHtcblx0ICAgICAgICBpZiAoZGVsdGFUaW1lTVMgPiBmcmFtZUludGVydmFsTVMpIHtcblx0ICAgICAgICAgICAgbm93ID0gbm93IC0gZGVsdGFUaW1lTVMgJSBmcmFtZUludGVydmFsTVM7XG5cdCAgICAgICAgICAgIHRoaXMuX2xhc3RUaW1lID0gbm93O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlzTmV3RnJhbWUgPSBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX2xhc3RUaW1lID0gbm93O1xuXHQgICAgfVxuXHQgICAgdmFyIGRlbHRhVGltZSA9IGRlbHRhVGltZU1TIC8gMTAwMDtcblx0ICAgIHZhciBuZXdUaW1lID0gdGhpcy5wcm9wcy50aW1lICsgZGVsdGFUaW1lICogdGhpcy5wcm9wcy50aW1lU2NhbGU7XG5cdCAgICBpZiAobmV3VGltZSA8IDAgJiYgaGFzRHVyYXRpb24pIHtcblx0ICAgICAgICBuZXdUaW1lID0gZHVyYXRpb24gKyBuZXdUaW1lO1xuXHQgICAgfVxuXHQgICAgdmFyIGlzRmluaXNoZWQgPSBmYWxzZTtcblx0ICAgIHZhciBpc0xvb3BTdGFydCA9IGZhbHNlO1xuXHQgICAgdmFyIGxvb3BpbmcgPSB0aGlzLnNldHRpbmdzLmxvb3AgIT09IGZhbHNlO1xuXHQgICAgaWYgKGhhc0R1cmF0aW9uICYmIG5ld1RpbWUgPj0gZHVyYXRpb24pIHtcblx0ICAgICAgICBpZiAobG9vcGluZykge1xuXHQgICAgICAgICAgICBpc05ld0ZyYW1lID0gdHJ1ZTtcblx0ICAgICAgICAgICAgbmV3VGltZSA9IG5ld1RpbWUgJSBkdXJhdGlvbjtcblx0ICAgICAgICAgICAgaXNMb29wU3RhcnQgPSB0cnVlO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlzTmV3RnJhbWUgPSBmYWxzZTtcblx0ICAgICAgICAgICAgbmV3VGltZSA9IGR1cmF0aW9uO1xuXHQgICAgICAgICAgICBpc0ZpbmlzaGVkID0gdHJ1ZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcy5fc2lnbmFsRW5kKCk7XG5cdCAgICB9XG5cdCAgICBpZiAoaXNOZXdGcmFtZSkge1xuXHQgICAgICAgIHRoaXMucHJvcHMuZGVsdGFUaW1lID0gZGVsdGFUaW1lO1xuXHQgICAgICAgIHRoaXMucHJvcHMudGltZSA9IG5ld1RpbWU7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5wbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZChuZXdUaW1lLCBkdXJhdGlvbik7XG5cdCAgICAgICAgdmFyIGxhc3RGcmFtZSA9IHRoaXMucHJvcHMuZnJhbWU7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5mcmFtZSA9IHRoaXMuX2NvbXB1dGVDdXJyZW50RnJhbWUoKTtcblx0ICAgICAgICBpZiAoaXNMb29wU3RhcnQpIFxuXHQgICAgICAgICAgICB7IHRoaXMuX3NpZ25hbEJlZ2luKCk7IH1cblx0ICAgICAgICBpZiAobGFzdEZyYW1lICE9PSB0aGlzLnByb3BzLmZyYW1lKSBcblx0ICAgICAgICAgICAgeyB0aGlzLnRpY2soKTsgfVxuXHQgICAgICAgIHRoaXMucmVuZGVyKCk7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuXHQgICAgfVxuXHQgICAgaWYgKGlzRmluaXNoZWQpIHtcblx0ICAgICAgICB0aGlzLnBhdXNlKCk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2ggKGNiKSB7XG5cdCAgICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSBcblx0ICAgICAgICB7IHRocm93IG5ldyBFcnJvcignbXVzdCBwYXNzIGZ1bmN0aW9uIGludG8gZGlzcGF0Y2goKScpOyB9XG5cdCAgICBjYih0aGlzLnByb3BzKTtcblx0ICAgIHRoaXMucmVuZGVyKCk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24gbW91bnQgKCkge1xuXHQgICAgdGhpcy5fYXBwZW5kQ2FudmFzSWZOZWVkZWQoKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUudW5tb3VudCA9IGZ1bmN0aW9uIHVubW91bnQgKCkge1xuXHQgICAgaWYgKGlzQnJvd3NlcigpKSB7XG5cdCAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZUhhbmRsZXIpO1xuXHQgICAgICAgIHRoaXMuX2tleWJvYXJkU2hvcnRjdXRzLmRldGFjaCgpO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMucHJvcHMuY2FudmFzLnBhcmVudEVsZW1lbnQpIHtcblx0ICAgICAgICB0aGlzLnByb3BzLmNhbnZhcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMucHJvcHMuY2FudmFzKTtcblx0ICAgIH1cblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2FwcGVuZENhbnZhc0lmTmVlZGVkID0gZnVuY3Rpb24gX2FwcGVuZENhbnZhc0lmTmVlZGVkICgpIHtcblx0ICAgIGlmICghaXNCcm93c2VyKCkpIFxuXHQgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICBpZiAodGhpcy5zZXR0aW5ncy5wYXJlbnQgIT09IGZhbHNlICYmICh0aGlzLnByb3BzLmNhbnZhcyAmJiAhdGhpcy5wcm9wcy5jYW52YXMucGFyZW50RWxlbWVudCkpIHtcblx0ICAgICAgICB2YXIgZGVmYXVsdFBhcmVudCA9IHRoaXMuc2V0dGluZ3MucGFyZW50IHx8IGRvY3VtZW50LmJvZHk7XG5cdCAgICAgICAgZGVmYXVsdFBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLnByb3BzLmNhbnZhcyk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9zZXR1cEdMS2V5ID0gZnVuY3Rpb24gX3NldHVwR0xLZXkgKCkge1xuXHQgICAgaWYgKHRoaXMucHJvcHMuY29udGV4dCkge1xuXHQgICAgICAgIGlmIChpc1dlYkdMQ29udGV4dCh0aGlzLnByb3BzLmNvbnRleHQpKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX3Byb3BzLmdsID0gdGhpcy5wcm9wcy5jb250ZXh0O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcm9wcy5nbDtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmdldFRpbWVQcm9wcyA9IGZ1bmN0aW9uIGdldFRpbWVQcm9wcyAoc2V0dGluZ3MpIHtcblx0ICAgICAgICBpZiAoIHNldHRpbmdzID09PSB2b2lkIDAgKSBzZXR0aW5ncyA9IHt9O1xuXG5cdCAgICB2YXIgZHVyYXRpb24gPSBzZXR0aW5ncy5kdXJhdGlvbjtcblx0ICAgIHZhciB0b3RhbEZyYW1lcyA9IHNldHRpbmdzLnRvdGFsRnJhbWVzO1xuXHQgICAgdmFyIHRpbWVTY2FsZSA9IGRlZmluZWQoc2V0dGluZ3MudGltZVNjYWxlLCAxKTtcblx0ICAgIHZhciBmcHMgPSBkZWZpbmVkKHNldHRpbmdzLmZwcywgMjQpO1xuXHQgICAgdmFyIGhhc0R1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShkdXJhdGlvbik7XG5cdCAgICB2YXIgaGFzVG90YWxGcmFtZXMgPSB0eXBlb2YgdG90YWxGcmFtZXMgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHRvdGFsRnJhbWVzKTtcblx0ICAgIHZhciB0b3RhbEZyYW1lc0Zyb21EdXJhdGlvbiA9IGhhc0R1cmF0aW9uID8gTWF0aC5mbG9vcihmcHMgKiBkdXJhdGlvbikgOiB1bmRlZmluZWQ7XG5cdCAgICB2YXIgZHVyYXRpb25Gcm9tVG90YWxGcmFtZXMgPSBoYXNUb3RhbEZyYW1lcyA/IHRvdGFsRnJhbWVzIC8gZnBzIDogdW5kZWZpbmVkO1xuXHQgICAgaWYgKGhhc0R1cmF0aW9uICYmIGhhc1RvdGFsRnJhbWVzICYmIHRvdGFsRnJhbWVzRnJvbUR1cmF0aW9uICE9PSB0b3RhbEZyYW1lcykge1xuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IGVpdGhlciBkdXJhdGlvbiBvciB0b3RhbEZyYW1lcywgYnV0IG5vdCBib3RoLiBPciwgdGhleSBtdXN0IG1hdGNoIGV4YWN0bHkuJyk7XG5cdCAgICB9XG5cdCAgICBpZiAodHlwZW9mIHNldHRpbmdzLmRpbWVuc2lvbnMgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzZXR0aW5ncy51bml0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICBjb25zb2xlLndhcm4oXCJZb3UndmUgc3BlY2lmaWVkIGEgeyB1bml0cyB9IHNldHRpbmcgYnV0IG5vIHsgZGltZW5zaW9uIH0sIHNvIHRoZSB1bml0cyB3aWxsIGJlIGlnbm9yZWQuXCIpO1xuXHQgICAgfVxuXHQgICAgdG90YWxGcmFtZXMgPSBkZWZpbmVkKHRvdGFsRnJhbWVzLCB0b3RhbEZyYW1lc0Zyb21EdXJhdGlvbiwgSW5maW5pdHkpO1xuXHQgICAgZHVyYXRpb24gPSBkZWZpbmVkKGR1cmF0aW9uLCBkdXJhdGlvbkZyb21Ub3RhbEZyYW1lcywgSW5maW5pdHkpO1xuXHQgICAgdmFyIHN0YXJ0VGltZSA9IHNldHRpbmdzLnRpbWU7XG5cdCAgICB2YXIgc3RhcnRGcmFtZSA9IHNldHRpbmdzLmZyYW1lO1xuXHQgICAgdmFyIGhhc1N0YXJ0VGltZSA9IHR5cGVvZiBzdGFydFRpbWUgPT09ICdudW1iZXInICYmIGlzRmluaXRlKHN0YXJ0VGltZSk7XG5cdCAgICB2YXIgaGFzU3RhcnRGcmFtZSA9IHR5cGVvZiBzdGFydEZyYW1lID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzdGFydEZyYW1lKTtcblx0ICAgIHZhciB0aW1lID0gMDtcblx0ICAgIHZhciBmcmFtZSA9IDA7XG5cdCAgICB2YXIgcGxheWhlYWQgPSAwO1xuXHQgICAgaWYgKGhhc1N0YXJ0VGltZSAmJiBoYXNTdGFydEZyYW1lKSB7XG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3Ugc2hvdWxkIHNwZWNpZnkgZWl0aGVyIHN0YXJ0IGZyYW1lIG9yIHRpbWUsIGJ1dCBub3QgYm90aC4nKTtcblx0ICAgIH0gZWxzZSBpZiAoaGFzU3RhcnRUaW1lKSB7XG5cdCAgICAgICAgdGltZSA9IHN0YXJ0VGltZTtcblx0ICAgICAgICBwbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZCh0aW1lLCBkdXJhdGlvbik7XG5cdCAgICAgICAgZnJhbWUgPSB0aGlzLl9jb21wdXRlRnJhbWUocGxheWhlYWQsIHRpbWUsIHRvdGFsRnJhbWVzLCBmcHMpO1xuXHQgICAgfSBlbHNlIGlmIChoYXNTdGFydEZyYW1lKSB7XG5cdCAgICAgICAgZnJhbWUgPSBzdGFydEZyYW1lO1xuXHQgICAgICAgIHRpbWUgPSBmcmFtZSAvIGZwcztcblx0ICAgICAgICBwbGF5aGVhZCA9IHRoaXMuX2NvbXB1dGVQbGF5aGVhZCh0aW1lLCBkdXJhdGlvbik7XG5cdCAgICB9XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIHBsYXloZWFkOiBwbGF5aGVhZCxcblx0ICAgICAgICB0aW1lOiB0aW1lLFxuXHQgICAgICAgIGZyYW1lOiBmcmFtZSxcblx0ICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG5cdCAgICAgICAgdG90YWxGcmFtZXM6IHRvdGFsRnJhbWVzLFxuXHQgICAgICAgIGZwczogZnBzLFxuXHQgICAgICAgIHRpbWVTY2FsZTogdGltZVNjYWxlXG5cdCAgICB9O1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uIHNldHVwIChzZXR0aW5ncykge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXHQgICAgICAgIGlmICggc2V0dGluZ3MgPT09IHZvaWQgMCApIHNldHRpbmdzID0ge307XG5cblx0ICAgIGlmICh0aGlzLnNrZXRjaCkgXG5cdCAgICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoJ011bHRpcGxlIHNldHVwKCkgY2FsbHMgbm90IHlldCBzdXBwb3J0ZWQuJyk7IH1cblx0ICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MsIHRoaXMuX3NldHRpbmdzKTtcblx0ICAgIGNoZWNrU2V0dGluZ3ModGhpcy5fc2V0dGluZ3MpO1xuXHQgICAgdmFyIHJlZiA9IGNyZWF0ZUNhbnZhcyh0aGlzLl9zZXR0aW5ncyk7XG5cdCAgICAgICAgdmFyIGNvbnRleHQgPSByZWYuY29udGV4dDtcblx0ICAgICAgICB2YXIgY2FudmFzID0gcmVmLmNhbnZhcztcblx0ICAgIHZhciB0aW1lUHJvcHMgPSB0aGlzLmdldFRpbWVQcm9wcyh0aGlzLl9zZXR0aW5ncyk7XG5cdCAgICB0aGlzLl9wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRpbWVQcm9wcyxcblx0ICAgICAgICB7Y2FudmFzOiBjYW52YXMsXG5cdCAgICAgICAgY29udGV4dDogY29udGV4dCxcblx0ICAgICAgICBkZWx0YVRpbWU6IDAsXG5cdCAgICAgICAgc3RhcnRlZDogZmFsc2UsXG5cdCAgICAgICAgZXhwb3J0aW5nOiBmYWxzZSxcblx0ICAgICAgICBwbGF5aW5nOiBmYWxzZSxcblx0ICAgICAgICByZWNvcmRpbmc6IGZhbHNlLFxuXHQgICAgICAgIHNldHRpbmdzOiB0aGlzLnNldHRpbmdzLFxuXHQgICAgICAgIGRhdGE6IHRoaXMuc2V0dGluZ3MuZGF0YSxcblx0ICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5yZW5kZXIoKTsgfSxcblx0ICAgICAgICB0b2dnbGVQbGF5OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEudG9nZ2xlUGxheSgpOyB9LFxuXHQgICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAoY2IpIHsgcmV0dXJuIHRoaXMkMS5kaXNwYXRjaChjYik7IH0sXG5cdCAgICAgICAgdGljazogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnRpY2soKTsgfSxcblx0ICAgICAgICByZXNpemU6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5yZXNpemUoKTsgfSxcblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChvcHQpIHsgcmV0dXJuIHRoaXMkMS51cGRhdGUob3B0KTsgfSxcblx0ICAgICAgICBleHBvcnRGcmFtZTogZnVuY3Rpb24gKG9wdCkgeyByZXR1cm4gdGhpcyQxLmV4cG9ydEZyYW1lKG9wdCk7IH0sXG5cdCAgICAgICAgcmVjb3JkOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEucmVjb3JkKCk7IH0sXG5cdCAgICAgICAgcGxheTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnBsYXkoKTsgfSxcblx0ICAgICAgICBwYXVzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnBhdXNlKCk7IH0sXG5cdCAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnN0b3AoKTsgfX0pO1xuXHQgICAgdGhpcy5fc2V0dXBHTEtleSgpO1xuXHQgICAgdGhpcy5yZXNpemUoKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUubG9hZEFuZFJ1biA9IGZ1bmN0aW9uIGxvYWRBbmRSdW4gKGNhbnZhc1NrZXRjaCwgbmV3U2V0dGluZ3MpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXHQgICAgcmV0dXJuIHRoaXMubG9hZChjYW52YXNTa2V0Y2gsIG5ld1NldHRpbmdzKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB0aGlzJDEucnVuKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMkMTtcblx0ICAgIH0pO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbiB1bmxvYWQgKCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdCAgICB0aGlzLnBhdXNlKCk7XG5cdCAgICBpZiAoIXRoaXMuc2tldGNoKSBcblx0ICAgICAgICB7IHJldHVybjsgfVxuXHQgICAgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaC51bmxvYWQgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzLl93cmFwQ29udGV4dFNjYWxlKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gdGhpcyQxLnNrZXRjaC51bmxvYWQocHJvcHMpOyB9KTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX3NrZXRjaCA9IG51bGw7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcblx0ICAgIHRoaXMudW5sb2FkKCk7XG5cdCAgICB0aGlzLnVubW91bnQoKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIGxvYWQgKGNyZWF0ZVNrZXRjaCwgbmV3U2V0dGluZ3MpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXHQgICAgaWYgKHR5cGVvZiBjcmVhdGVTa2V0Y2ggIT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBmdW5jdGlvbiBtdXN0IHRha2UgaW4gYSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLiBFeGFtcGxlOlxcbiAgY2FudmFzU2tldGNoZXIoKCkgPT4geyAuLi4gfSwgc2V0dGluZ3MpJyk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5za2V0Y2gpIHtcblx0ICAgICAgICB0aGlzLnVubG9hZCgpO1xuXHQgICAgfVxuXHQgICAgaWYgKHR5cGVvZiBuZXdTZXR0aW5ncyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgICAgICB0aGlzLnVwZGF0ZShuZXdTZXR0aW5ncyk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9wcmVSZW5kZXIoKTtcblx0ICAgIHZhciBwcmVsb2FkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cdCAgICBpZiAodGhpcy5zZXR0aW5ncy5wNSkge1xuXHQgICAgICAgIGlmICghaXNCcm93c2VyKCkpIHtcblx0ICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbY2FudmFzLXNrZXRjaF0gRVJST1I6IFVzaW5nIHA1LmpzIGluIE5vZGUuanMgaXMgbm90IHN1cHBvcnRlZCcpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBwcmVsb2FkID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0ICAgICAgICAgICAgdmFyIFA1Q29uc3RydWN0b3IgPSB0aGlzJDEuc2V0dGluZ3MucDU7XG5cdCAgICAgICAgICAgIHZhciBwcmVsb2FkO1xuXHQgICAgICAgICAgICBpZiAoUDVDb25zdHJ1Y3Rvci5wNSkge1xuXHQgICAgICAgICAgICAgICAgcHJlbG9hZCA9IFA1Q29uc3RydWN0b3IucHJlbG9hZDtcblx0ICAgICAgICAgICAgICAgIFA1Q29uc3RydWN0b3IgPSBQNUNvbnN0cnVjdG9yLnA1O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBwNVNrZXRjaCA9IGZ1bmN0aW9uIChwNSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHByZWxvYWQpIFxuXHQgICAgICAgICAgICAgICAgICAgIHsgcDUucHJlbG9hZCA9IChmdW5jdGlvbiAoKSB7IHJldHVybiBwcmVsb2FkKHA1KTsgfSk7IH1cblx0ICAgICAgICAgICAgICAgIHA1LnNldHVwID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSB0aGlzJDEucHJvcHM7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGlzR0wgPSB0aGlzJDEuc2V0dGluZ3MuY29udGV4dCA9PT0gJ3dlYmdsJztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVuZGVyZXIgPSBpc0dMID8gcDUuV0VCR0wgOiBwNS5QMkQ7XG5cdCAgICAgICAgICAgICAgICAgICAgcDUubm9Mb29wKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgcDUucGl4ZWxEZW5zaXR5KHByb3BzLnBpeGVsUmF0aW8pO1xuXHQgICAgICAgICAgICAgICAgICAgIHA1LmNyZWF0ZUNhbnZhcyhwcm9wcy52aWV3cG9ydFdpZHRoLCBwcm9wcy52aWV3cG9ydEhlaWdodCwgcmVuZGVyZXIpO1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChpc0dMICYmIHRoaXMkMS5zZXR0aW5ncy5hdHRyaWJ1dGVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHA1LnNldEF0dHJpYnV0ZXModGhpcyQxLnNldHRpbmdzLmF0dHJpYnV0ZXMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgICAgICB0aGlzJDEudXBkYXRlKHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgcDU6IHA1LFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXM6IHA1LmNhbnZhcyxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogcDUuX3JlbmRlcmVyLmRyYXdpbmdDb250ZXh0XG5cdCAgICAgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXHQgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2YgUDVDb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgbmV3IFA1Q29uc3RydWN0b3IocDVTa2V0Y2gpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuY3JlYXRlQ2FudmFzICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwieyBwNSB9IHNldHRpbmcgaXMgcGFzc2VkIGJ1dCBjYW4ndCBmaW5kIHA1LmpzIGluIGdsb2JhbCAod2luZG93KSBzY29wZS4gTWF5YmUgeW91IGRpZCBub3QgY3JlYXRlIGl0IGdsb2JhbGx5P1xcbm5ldyBwNSgpOyAvLyA8LS0gYXR0YWNoZXMgdG8gZ2xvYmFsIHNjb3BlXCIpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcDVTa2V0Y2god2luZG93KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0pO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHByZWxvYWQudGhlbihmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdmFyIGxvYWRlciA9IGNyZWF0ZVNrZXRjaCh0aGlzJDEucHJvcHMpO1xuXHQgICAgICAgIGlmICghaXNQcm9taXNlXzEobG9hZGVyKSkge1xuXHQgICAgICAgICAgICBsb2FkZXIgPSBQcm9taXNlLnJlc29sdmUobG9hZGVyKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIGxvYWRlcjtcblx0ICAgIH0pLnRoZW4oZnVuY3Rpb24gKHNrZXRjaCkge1xuXHQgICAgICAgIGlmICghc2tldGNoKSBcblx0ICAgICAgICAgICAgeyBza2V0Y2ggPSB7fTsgfVxuXHQgICAgICAgIHRoaXMkMS5fc2tldGNoID0gc2tldGNoO1xuXHQgICAgICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuXHQgICAgICAgICAgICB0aGlzJDEuX2tleWJvYXJkU2hvcnRjdXRzLmF0dGFjaCgpO1xuXHQgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyQxLl9yZXNpemVIYW5kbGVyKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdGhpcyQxLl9wb3N0UmVuZGVyKCk7XG5cdCAgICAgICAgdGhpcyQxLl9zaXplQ2hhbmdlZCgpO1xuXHQgICAgICAgIHJldHVybiB0aGlzJDE7XG5cdCAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG5cdCAgICAgICAgY29uc29sZS53YXJuKCdDb3VsZCBub3Qgc3RhcnQgc2tldGNoLCB0aGUgYXN5bmMgbG9hZGluZyBmdW5jdGlvbiByZWplY3RlZCB3aXRoIGFuIGVycm9yOlxcbiAgICBFcnJvcjogJyArIGVyci5tZXNzYWdlKTtcblx0ICAgICAgICB0aHJvdyBlcnI7XG5cdCAgICB9KTtcblx0fTtcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyggU2tldGNoTWFuYWdlci5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG5cdHZhciBDQUNIRSA9ICdob3QtaWQtY2FjaGUnO1xuXHR2YXIgcnVudGltZUNvbGxpc2lvbnMgPSBbXTtcblx0ZnVuY3Rpb24gaXNIb3RSZWxvYWQoKSB7XG5cdCAgICB2YXIgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG5cdCAgICByZXR1cm4gY2xpZW50ICYmIGNsaWVudC5ob3Q7XG5cdH1cblxuXHRmdW5jdGlvbiBjYWNoZUdldChpZCkge1xuXHQgICAgdmFyIGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuXHQgICAgaWYgKCFjbGllbnQpIFxuXHQgICAgICAgIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXHQgICAgY2xpZW50W0NBQ0hFXSA9IGNsaWVudFtDQUNIRV0gfHwge307XG5cdCAgICByZXR1cm4gY2xpZW50W0NBQ0hFXVtpZF07XG5cdH1cblxuXHRmdW5jdGlvbiBjYWNoZVB1dChpZCwgZGF0YSkge1xuXHQgICAgdmFyIGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuXHQgICAgaWYgKCFjbGllbnQpIFxuXHQgICAgICAgIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXHQgICAgY2xpZW50W0NBQ0hFXSA9IGNsaWVudFtDQUNIRV0gfHwge307XG5cdCAgICBjbGllbnRbQ0FDSEVdW2lkXSA9IGRhdGE7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRUaW1lUHJvcChvbGRNYW5hZ2VyLCBuZXdTZXR0aW5ncykge1xuXHQgICAgcmV0dXJuIG5ld1NldHRpbmdzLmFuaW1hdGUgPyB7XG5cdCAgICAgICAgdGltZTogb2xkTWFuYWdlci5wcm9wcy50aW1lXG5cdCAgICB9IDogdW5kZWZpbmVkO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2FudmFzU2tldGNoKHNrZXRjaCwgc2V0dGluZ3MpIHtcblx0ICAgIGlmICggc2V0dGluZ3MgPT09IHZvaWQgMCApIHNldHRpbmdzID0ge307XG5cblx0ICAgIGlmIChzZXR0aW5ncy5wNSkge1xuXHQgICAgICAgIGlmIChzZXR0aW5ncy5jYW52YXMgfHwgc2V0dGluZ3MuY29udGV4dCAmJiB0eXBlb2Ygc2V0dGluZ3MuY29udGV4dCAhPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW4geyBwNSB9IG1vZGUsIHlvdSBjYW4ndCBwYXNzIHlvdXIgb3duIGNhbnZhcyBvciBjb250ZXh0LCB1bmxlc3MgdGhlIGNvbnRleHQgaXMgYSBcXFwid2ViZ2xcXFwiIG9yIFxcXCIyZFxcXCIgc3RyaW5nXCIpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgY29udGV4dCA9IHR5cGVvZiBzZXR0aW5ncy5jb250ZXh0ID09PSAnc3RyaW5nJyA/IHNldHRpbmdzLmNvbnRleHQgOiBmYWxzZTtcblx0ICAgICAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzLCB7XG5cdCAgICAgICAgICAgIGNhbnZhczogZmFsc2UsXG5cdCAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcblx0ICAgICAgICB9KTtcblx0ICAgIH1cblx0ICAgIHZhciBpc0hvdCA9IGlzSG90UmVsb2FkKCk7XG5cdCAgICB2YXIgaG90SUQ7XG5cdCAgICBpZiAoaXNIb3QpIHtcblx0ICAgICAgICBob3RJRCA9IGRlZmluZWQoc2V0dGluZ3MuaWQsICckX19ERUZBVUxUX0NBTlZBU19TS0VUQ0hfSURfXyQnKTtcblx0ICAgIH1cblx0ICAgIHZhciBpc0luamVjdGluZyA9IGlzSG90ICYmIHR5cGVvZiBob3RJRCA9PT0gJ3N0cmluZyc7XG5cdCAgICBpZiAoaXNJbmplY3RpbmcgJiYgcnVudGltZUNvbGxpc2lvbnMuaW5jbHVkZXMoaG90SUQpKSB7XG5cdCAgICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogWW91IGhhdmUgbXVsdGlwbGUgY2FsbHMgdG8gY2FudmFzU2tldGNoKCkgaW4gLS1ob3QgbW9kZS4gWW91IG11c3QgcGFzcyB1bmlxdWUgeyBpZCB9IHN0cmluZ3MgaW4gc2V0dGluZ3MgdG8gZW5hYmxlIGhvdCByZWxvYWQgYWNyb3NzIG11bHRpcGxlIHNrZXRjaGVzLiBcIiwgaG90SUQpO1xuXHQgICAgICAgIGlzSW5qZWN0aW5nID0gZmFsc2U7XG5cdCAgICB9XG5cdCAgICB2YXIgcHJlbG9hZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXHQgICAgaWYgKGlzSW5qZWN0aW5nKSB7XG5cdCAgICAgICAgcnVudGltZUNvbGxpc2lvbnMucHVzaChob3RJRCk7XG5cdCAgICAgICAgdmFyIHByZXZpb3VzRGF0YSA9IGNhY2hlR2V0KGhvdElEKTtcblx0ICAgICAgICBpZiAocHJldmlvdXNEYXRhKSB7XG5cdCAgICAgICAgICAgIHZhciBuZXh0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIG5ld1Byb3BzID0gZ2V0VGltZVByb3AocHJldmlvdXNEYXRhLm1hbmFnZXIsIHNldHRpbmdzKTtcblx0ICAgICAgICAgICAgICAgIHByZXZpb3VzRGF0YS5tYW5hZ2VyLmRlc3Ryb3koKTtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXdQcm9wcztcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgcHJlbG9hZCA9IHByZXZpb3VzRGF0YS5sb2FkLnRoZW4obmV4dCkuY2F0Y2gobmV4dCk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHByZWxvYWQudGhlbihmdW5jdGlvbiAobmV3UHJvcHMpIHtcblx0ICAgICAgICB2YXIgbWFuYWdlciA9IG5ldyBTa2V0Y2hNYW5hZ2VyKCk7XG5cdCAgICAgICAgdmFyIHJlc3VsdDtcblx0ICAgICAgICBpZiAoc2tldGNoKSB7XG5cdCAgICAgICAgICAgIHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MsIG5ld1Byb3BzKTtcblx0ICAgICAgICAgICAgbWFuYWdlci5zZXR1cChzZXR0aW5ncyk7XG5cdCAgICAgICAgICAgIG1hbmFnZXIubW91bnQoKTtcblx0ICAgICAgICAgICAgcmVzdWx0ID0gbWFuYWdlci5sb2FkQW5kUnVuKHNrZXRjaCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKG1hbmFnZXIpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBpZiAoaXNJbmplY3RpbmcpIHtcblx0ICAgICAgICAgICAgY2FjaGVQdXQoaG90SUQsIHtcblx0ICAgICAgICAgICAgICAgIGxvYWQ6IHJlc3VsdCxcblx0ICAgICAgICAgICAgICAgIG1hbmFnZXI6IG1hbmFnZXJcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQ7XG5cdCAgICB9KTtcblx0fVxuXG5cdGNhbnZhc1NrZXRjaC5jYW52YXNTa2V0Y2ggPSBjYW52YXNTa2V0Y2g7XG5cdGNhbnZhc1NrZXRjaC5QYXBlclNpemVzID0gcGFwZXJTaXplcztcblxuXHRyZXR1cm4gY2FudmFzU2tldGNoO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lZMkZ1ZG1GekxYTnJaWFJqYUM1MWJXUXVhbk1pTENKemIzVnlZMlZ6SWpwYklpNHVMMjV2WkdWZmJXOWtkV3hsY3k5dlltcGxZM1F0WVhOemFXZHVMMmx1WkdWNExtcHpJaXdpTGk0dmJtOWtaVjl0YjJSMWJHVnpMM0pwWjJoMExXNXZkeTlpY205M2MyVnlMbXB6SWl3aUxpNHZibTlrWlY5dGIyUjFiR1Z6TDJsekxYQnliMjFwYzJVdmFXNWtaWGd1YW5NaUxDSXVMaTl1YjJSbFgyMXZaSFZzWlhNdmFYTXRaRzl0TDJsdVpHVjRMbXB6SWl3aUxpNHZiR2xpTDNWMGFXd3Vhbk1pTENJdUxpOXViMlJsWDIxdlpIVnNaWE12WkdWbGNDMWxjWFZoYkM5c2FXSXZhMlY1Y3k1cWN5SXNJaTR1TDI1dlpHVmZiVzlrZFd4bGN5OWtaV1Z3TFdWeGRXRnNMMnhwWWk5cGMxOWhjbWQxYldWdWRITXVhbk1pTENJdUxpOXViMlJsWDIxdlpIVnNaWE12WkdWbGNDMWxjWFZoYkM5cGJtUmxlQzVxY3lJc0lpNHVMMjV2WkdWZmJXOWtkV3hsY3k5a1lYUmxabTl5YldGMEwyeHBZaTlrWVhSbFptOXliV0YwTG1weklpd2lMaTR2Ym05a1pWOXRiMlIxYkdWekwzSmxjR1ZoZEMxemRISnBibWN2YVc1a1pYZ3Vhbk1pTENJdUxpOXViMlJsWDIxdlpIVnNaWE12Y0dGa0xXeGxablF2YVc1a1pYZ3Vhbk1pTENJdUxpOXNhV0l2YzJGMlpTNXFjeUlzSWk0dUwyeHBZaTloWTJObGMzTnBZbWxzYVhSNUxtcHpJaXdpTGk0dmJHbGlMMk52Y21VdmEyVjVZbTloY21SVGFHOXlkR04xZEhNdWFuTWlMQ0l1TGk5c2FXSXZjR0Z3WlhJdGMybDZaWE11YW5NaUxDSXVMaTl1YjJSbFgyMXZaSFZzWlhNdlpHVm1hVzVsWkM5cGJtUmxlQzVxY3lJc0lpNHVMMjV2WkdWZmJXOWtkV3hsY3k5amIyNTJaWEowTFd4bGJtZDBhQzlqYjI1MlpYSjBMV3hsYm1kMGFDNXFjeUlzSWk0dUwyeHBZaTlrYVhOMFlXNWpaWE11YW5NaUxDSXVMaTlzYVdJdlkyOXlaUzl5WlhOcGVtVkRZVzUyWVhNdWFuTWlMQ0l1TGk5dWIyUmxYMjF2WkhWc1pYTXZaMlYwTFdOaGJuWmhjeTFqYjI1MFpYaDBMMmx1WkdWNExtcHpJaXdpTGk0dmJHbGlMMk52Y21VdlkzSmxZWFJsUTJGdWRtRnpMbXB6SWl3aUxpNHZiR2xpTDJOdmNtVXZVMnRsZEdOb1RXRnVZV2RsY2k1cWN5SXNJaTR1TDJ4cFlpOWpZVzUyWVhNdGMydGxkR05vTG1weklsMHNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxWEc1dlltcGxZM1F0WVhOemFXZHVYRzRvWXlrZ1UybHVaSEpsSUZOdmNtaDFjMXh1UUd4cFkyVnVjMlVnVFVsVVhHNHFMMXh1WEc0bmRYTmxJSE4wY21samRDYzdYRzR2S2lCbGMyeHBiblF0WkdsellXSnNaU0J1YnkxMWJuVnpaV1F0ZG1GeWN5QXFMMXh1ZG1GeUlHZGxkRTkzYmxCeWIzQmxjblI1VTNsdFltOXNjeUE5SUU5aWFtVmpkQzVuWlhSUGQyNVFjbTl3WlhKMGVWTjViV0p2YkhNN1hHNTJZWElnYUdGelQzZHVVSEp2Y0dWeWRIa2dQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNU8xeHVkbUZ5SUhCeWIzQkpjMFZ1ZFcxbGNtRmliR1VnUFNCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG5CeWIzQmxjblI1U1hORmJuVnRaWEpoWW14bE8xeHVYRzVtZFc1amRHbHZiaUIwYjA5aWFtVmpkQ2gyWVd3cElIdGNibHgwYVdZZ0tIWmhiQ0E5UFQwZ2JuVnNiQ0I4ZkNCMllXd2dQVDA5SUhWdVpHVm1hVzVsWkNrZ2UxeHVYSFJjZEhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0owOWlhbVZqZEM1aGMzTnBaMjRnWTJGdWJtOTBJR0psSUdOaGJHeGxaQ0IzYVhSb0lHNTFiR3dnYjNJZ2RXNWtaV1pwYm1Wa0p5azdYRzVjZEgxY2JseHVYSFJ5WlhSMWNtNGdUMkpxWldOMEtIWmhiQ2s3WEc1OVhHNWNibVoxYm1OMGFXOXVJSE5vYjNWc1pGVnpaVTVoZEdsMlpTZ3BJSHRjYmx4MGRISjVJSHRjYmx4MFhIUnBaaUFvSVU5aWFtVmpkQzVoYzNOcFoyNHBJSHRjYmx4MFhIUmNkSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBYSFI5WEc1Y2JseDBYSFF2THlCRVpYUmxZM1FnWW5Wbloza2djSEp2Y0dWeWRIa2daVzUxYldWeVlYUnBiMjRnYjNKa1pYSWdhVzRnYjJ4a1pYSWdWamdnZG1WeWMybHZibk11WEc1Y2JseDBYSFF2THlCb2RIUndjem92TDJKMVozTXVZMmh5YjIxcGRXMHViM0puTDNBdmRqZ3ZhWE56ZFdWekwyUmxkR0ZwYkQ5cFpEMDBNVEU0WEc1Y2RGeDBkbUZ5SUhSbGMzUXhJRDBnYm1WM0lGTjBjbWx1WnlnbllXSmpKeWs3SUNBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxc2FXNWxJRzV2TFc1bGR5MTNjbUZ3Y0dWeWMxeHVYSFJjZEhSbGMzUXhXelZkSUQwZ0oyUmxKenRjYmx4MFhIUnBaaUFvVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVRtRnRaWE1vZEdWemRERXBXekJkSUQwOVBTQW5OU2NwSUh0Y2JseDBYSFJjZEhKbGRIVnliaUJtWVd4elpUdGNibHgwWEhSOVhHNWNibHgwWEhRdkx5Qm9kSFJ3Y3pvdkwySjFaM011WTJoeWIyMXBkVzB1YjNKbkwzQXZkamd2YVhOemRXVnpMMlJsZEdGcGJEOXBaRDB6TURVMlhHNWNkRngwZG1GeUlIUmxjM1F5SUQwZ2UzMDdYRzVjZEZ4MFptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQXhNRHNnYVNzcktTQjdYRzVjZEZ4MFhIUjBaWE4wTWxzblh5Y2dLeUJUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0drcFhTQTlJR2s3WEc1Y2RGeDBmVnh1WEhSY2RIWmhjaUJ2Y21SbGNqSWdQU0JQWW1wbFkzUXVaMlYwVDNkdVVISnZjR1Z5ZEhsT1lXMWxjeWgwWlhOME1pa3ViV0Z3S0daMWJtTjBhVzl1SUNodUtTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z2RHVnpkREpiYmwwN1hHNWNkRngwZlNrN1hHNWNkRngwYVdZZ0tHOXlaR1Z5TWk1cWIybHVLQ2NuS1NBaFBUMGdKekF4TWpNME5UWTNPRGtuS1NCN1hHNWNkRngwWEhSeVpYUjFjbTRnWm1Gc2MyVTdYRzVjZEZ4MGZWeHVYRzVjZEZ4MEx5OGdhSFIwY0hNNkx5OWlkV2R6TG1Ob2NtOXRhWFZ0TG05eVp5OXdMM1k0TDJsemMzVmxjeTlrWlhSaGFXdy9hV1E5TXpBMU5seHVYSFJjZEhaaGNpQjBaWE4wTXlBOUlIdDlPMXh1WEhSY2RDZGhZbU5rWldabmFHbHFhMnh0Ym05d2NYSnpkQ2N1YzNCc2FYUW9KeWNwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRnS0d4bGRIUmxjaWtnZTF4dVhIUmNkRngwZEdWemRETmJiR1YwZEdWeVhTQTlJR3hsZEhSbGNqdGNibHgwWEhSOUtUdGNibHgwWEhScFppQW9UMkpxWldOMExtdGxlWE1vVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnZEdWemRETXBLUzVxYjJsdUtDY25LU0FoUFQxY2JseDBYSFJjZEZ4MEoyRmlZMlJsWm1kb2FXcHJiRzF1YjNCeGNuTjBKeWtnZTF4dVhIUmNkRngwY21WMGRYSnVJR1poYkhObE8xeHVYSFJjZEgxY2JseHVYSFJjZEhKbGRIVnliaUIwY25WbE8xeHVYSFI5SUdOaGRHTm9JQ2hsY25JcElIdGNibHgwWEhRdkx5QlhaU0JrYjI0bmRDQmxlSEJsWTNRZ1lXNTVJRzltSUhSb1pTQmhZbTkyWlNCMGJ5QjBhSEp2ZHl3Z1luVjBJR0psZEhSbGNpQjBieUJpWlNCellXWmxMbHh1WEhSY2RISmxkSFZ5YmlCbVlXeHpaVHRjYmx4MGZWeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhOb2IzVnNaRlZ6WlU1aGRHbDJaU2dwSUQ4Z1QySnFaV04wTG1GemMybG5iaUE2SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFzSUhOdmRYSmpaU2tnZTF4dVhIUjJZWElnWm5KdmJUdGNibHgwZG1GeUlIUnZJRDBnZEc5UFltcGxZM1FvZEdGeVoyVjBLVHRjYmx4MGRtRnlJSE41YldKdmJITTdYRzVjYmx4MFptOXlJQ2gyWVhJZ2N5QTlJREU3SUhNZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb095QnpLeXNwSUh0Y2JseDBYSFJtY205dElEMGdUMkpxWldOMEtHRnlaM1Z0Wlc1MGMxdHpYU2s3WEc1Y2JseDBYSFJtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdabkp2YlNrZ2UxeHVYSFJjZEZ4MGFXWWdLR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvWm5KdmJTd2dhMlY1S1NrZ2UxeHVYSFJjZEZ4MFhIUjBiMXRyWlhsZElEMGdabkp2YlZ0clpYbGRPMXh1WEhSY2RGeDBmVnh1WEhSY2RIMWNibHh1WEhSY2RHbG1JQ2huWlhSUGQyNVFjbTl3WlhKMGVWTjViV0p2YkhNcElIdGNibHgwWEhSY2RITjViV0p2YkhNZ1BTQm5aWFJQZDI1UWNtOXdaWEowZVZONWJXSnZiSE1vWm5KdmJTazdYRzVjZEZ4MFhIUm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJSE41YldKdmJITXViR1Z1WjNSb095QnBLeXNwSUh0Y2JseDBYSFJjZEZ4MGFXWWdLSEJ5YjNCSmMwVnVkVzFsY21GaWJHVXVZMkZzYkNobWNtOXRMQ0J6ZVcxaWIyeHpXMmxkS1NrZ2UxeHVYSFJjZEZ4MFhIUmNkSFJ2VzNONWJXSnZiSE5iYVYxZElEMGdabkp2YlZ0emVXMWliMnh6VzJsZFhUdGNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmVnh1WEhSY2RIMWNibHgwZlZ4dVhHNWNkSEpsZEhWeWJpQjBienRjYm4wN1hHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlYRzRnSUdkc2IySmhiQzV3WlhKbWIzSnRZVzVqWlNBbUpseHVJQ0JuYkc5aVlXd3VjR1Z5Wm05eWJXRnVZMlV1Ym05M0lEOGdablZ1WTNScGIyNGdibTkzS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ3WlhKbWIzSnRZVzVqWlM1dWIzY29LVnh1SUNCOUlEb2dSR0YwWlM1dWIzY2dmSHdnWm5WdVkzUnBiMjRnYm05M0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlBcmJtVjNJRVJoZEdWY2JpQWdmVnh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCcGMxQnliMjFwYzJVN1hHNWNibVoxYm1OMGFXOXVJR2x6VUhKdmJXbHpaU2h2WW1vcElIdGNiaUFnY21WMGRYSnVJQ0VoYjJKcUlDWW1JQ2gwZVhCbGIyWWdiMkpxSUQwOVBTQW5iMkpxWldOMEp5QjhmQ0IwZVhCbGIyWWdiMkpxSUQwOVBTQW5ablZ1WTNScGIyNG5LU0FtSmlCMGVYQmxiMllnYjJKcUxuUm9aVzRnUFQwOUlDZG1kVzVqZEdsdmJpYzdYRzU5WEc0aUxDSnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHbHpUbTlrWlZ4dVhHNW1kVzVqZEdsdmJpQnBjMDV2WkdVZ0tIWmhiQ2tnZTF4dUlDQnlaWFIxY200Z0tDRjJZV3dnZkh3Z2RIbHdaVzltSUhaaGJDQWhQVDBnSjI5aWFtVmpkQ2NwWEc0Z0lDQWdQeUJtWVd4elpWeHVJQ0FnSURvZ0tIUjVjR1Z2WmlCM2FXNWtiM2NnUFQwOUlDZHZZbXBsWTNRbklDWW1JSFI1Y0dWdlppQjNhVzVrYjNjdVRtOWtaU0E5UFQwZ0oyOWlhbVZqZENjcFhHNGdJQ0FnSUNBL0lDaDJZV3dnYVc1emRHRnVZMlZ2WmlCM2FXNWtiM2N1VG05a1pTbGNiaUFnSUNBZ0lEb2dLSFI1Y0dWdlppQjJZV3d1Ym05a1pWUjVjR1VnUFQwOUlDZHVkVzFpWlhJbktTQW1KbHh1SUNBZ0lDQWdJQ0FvZEhsd1pXOW1JSFpoYkM1dWIyUmxUbUZ0WlNBOVBUMGdKM04wY21sdVp5Y3BYRzU5WEc0aUxDSXZMeUJVVDBSUE9pQlhaU0JqWVc0Z2NtVnRiM1psSUdFZ2FIVm5aU0JqYUhWdWF5QnZaaUJpZFc1a2JHVWdjMmw2WlNCaWVTQjFjMmx1WnlCaElITnRZV3hzWlhKY2JpOHZJSFYwYVd4cGRIa2diVzlrZFd4bElHWnZjaUJqYjI1MlpYSjBhVzVuSUhWdWFYUnpMbHh1YVcxd2IzSjBJR2x6UkU5TklHWnliMjBnSjJsekxXUnZiU2M3WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCblpYUkRiR2xsYm5SQlVFa2dLQ2tnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUhkcGJtUnZkeUFoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnZDJsdVpHOTNXeWRqWVc1MllYTXRjMnRsZEdOb0xXTnNhU2RkTzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdaR1ZtYVc1bFpDQW9LU0I3WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dZWEpuZFcxbGJuUnpMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHRnlaM1Z0Wlc1MGMxdHBYU0FoUFNCdWRXeHNLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdZWEpuZFcxbGJuUnpXMmxkTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdkVzVrWldacGJtVmtPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z2FYTkNjbTkzYzJWeUlDZ3BJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJrYjJOMWJXVnVkQ0FoUFQwZ0ozVnVaR1ZtYVc1bFpDYzdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCcGMxZGxZa2RNUTI5dWRHVjRkQ0FvWTNSNEtTQjdYRzRnSUhKbGRIVnliaUIwZVhCbGIyWWdZM1I0TG1Oc1pXRnlJRDA5UFNBblpuVnVZM1JwYjI0bklDWW1JSFI1Y0dWdlppQmpkSGd1WTJ4bFlYSkRiMnh2Y2lBOVBUMGdKMloxYm1OMGFXOXVKeUFtSmlCMGVYQmxiMllnWTNSNExtSjFabVpsY2tSaGRHRWdQVDA5SUNkbWRXNWpkR2x2YmljN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJwYzBOaGJuWmhjeUFvWld4bGJXVnVkQ2tnZTF4dUlDQnlaWFIxY200Z2FYTkVUMDBvWld4bGJXVnVkQ2tnSmlZZ0wyTmhiblpoY3k5cExuUmxjM1FvWld4bGJXVnVkQzV1YjJSbFRtRnRaU2tnSmlZZ2RIbHdaVzltSUdWc1pXMWxiblF1WjJWMFEyOXVkR1Y0ZENBOVBUMGdKMloxYm1OMGFXOXVKenRjYm4xY2JpSXNJbVY0Y0c5eWRITWdQU0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFI1Y0dWdlppQlBZbXBsWTNRdWEyVjVjeUE5UFQwZ0oyWjFibU4wYVc5dUoxeHVJQ0EvSUU5aWFtVmpkQzVyWlhseklEb2djMmhwYlR0Y2JseHVaWGh3YjNKMGN5NXphR2x0SUQwZ2MyaHBiVHRjYm1aMWJtTjBhVzl1SUhOb2FXMGdLRzlpYWlrZ2UxeHVJQ0IyWVhJZ2EyVjVjeUE5SUZ0ZE8xeHVJQ0JtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdiMkpxS1NCclpYbHpMbkIxYzJnb2EyVjVLVHRjYmlBZ2NtVjBkWEp1SUd0bGVYTTdYRzU5WEc0aUxDSjJZWElnYzNWd2NHOXlkSE5CY21kMWJXVnVkSE5EYkdGemN5QTlJQ2htZFc1amRHbHZiaWdwZTF4dUlDQnlaWFIxY200Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnk1allXeHNLR0Z5WjNWdFpXNTBjeWxjYm4wcEtDa2dQVDBnSjF0dlltcGxZM1FnUVhKbmRXMWxiblJ6WFNjN1hHNWNibVY0Y0c5eWRITWdQU0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSE4xY0hCdmNuUnpRWEpuZFcxbGJuUnpRMnhoYzNNZ1B5QnpkWEJ3YjNKMFpXUWdPaUIxYm5OMWNIQnZjblJsWkR0Y2JseHVaWGh3YjNKMGN5NXpkWEJ3YjNKMFpXUWdQU0J6ZFhCd2IzSjBaV1E3WEc1bWRXNWpkR2x2YmlCemRYQndiM0owWldRb2IySnFaV04wS1NCN1hHNGdJSEpsZEhWeWJpQlBZbXBsWTNRdWNISnZkRzkwZVhCbExuUnZVM1J5YVc1bkxtTmhiR3dvYjJKcVpXTjBLU0E5UFNBblcyOWlhbVZqZENCQmNtZDFiV1Z1ZEhOZEp6dGNibjA3WEc1Y2JtVjRjRzl5ZEhNdWRXNXpkWEJ3YjNKMFpXUWdQU0IxYm5OMWNIQnZjblJsWkR0Y2JtWjFibU4wYVc5dUlIVnVjM1Z3Y0c5eWRHVmtLRzlpYW1WamRDbDdYRzRnSUhKbGRIVnliaUJ2WW1wbFkzUWdKaVpjYmlBZ0lDQjBlWEJsYjJZZ2IySnFaV04wSUQwOUlDZHZZbXBsWTNRbklDWW1YRzRnSUNBZ2RIbHdaVzltSUc5aWFtVmpkQzVzWlc1bmRHZ2dQVDBnSjI1MWJXSmxjaWNnSmlaY2JpQWdJQ0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0FuWTJGc2JHVmxKeWtnSmlaY2JpQWdJQ0FoVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzV3Y205d1pYSjBlVWx6Ulc1MWJXVnlZV0pzWlM1allXeHNLRzlpYW1WamRDd2dKMk5oYkd4bFpTY3BJSHg4WEc0Z0lDQWdabUZzYzJVN1hHNTlPMXh1SWl3aWRtRnlJSEJUYkdsalpTQTlJRUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlR0Y2JuWmhjaUJ2WW1wbFkzUkxaWGx6SUQwZ2NtVnhkV2x5WlNnbkxpOXNhV0l2YTJWNWN5NXFjeWNwTzF4dWRtRnlJR2x6UVhKbmRXMWxiblJ6SUQwZ2NtVnhkV2x5WlNnbkxpOXNhV0l2YVhOZllYSm5kVzFsYm5SekxtcHpKeWs3WEc1Y2JuWmhjaUJrWldWd1JYRjFZV3dnUFNCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNoaFkzUjFZV3dzSUdWNGNHVmpkR1ZrTENCdmNIUnpLU0I3WEc0Z0lHbG1JQ2doYjNCMGN5a2diM0IwY3lBOUlIdDlPMXh1SUNBdkx5QTNMakV1SUVGc2JDQnBaR1Z1ZEdsallXd2dkbUZzZFdWeklHRnlaU0JsY1hWcGRtRnNaVzUwTENCaGN5QmtaWFJsY20xcGJtVmtJR0o1SUQwOVBTNWNiaUFnYVdZZ0tHRmpkSFZoYkNBOVBUMGdaWGh3WldOMFpXUXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmx4dUlDQjlJR1ZzYzJVZ2FXWWdLR0ZqZEhWaGJDQnBibk4wWVc1alpXOW1JRVJoZEdVZ0ppWWdaWGh3WldOMFpXUWdhVzV6ZEdGdVkyVnZaaUJFWVhSbEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUdGamRIVmhiQzVuWlhSVWFXMWxLQ2tnUFQwOUlHVjRjR1ZqZEdWa0xtZGxkRlJwYldVb0tUdGNibHh1SUNBdkx5QTNMak11SUU5MGFHVnlJSEJoYVhKeklIUm9ZWFFnWkc4Z2JtOTBJR0p2ZEdnZ2NHRnpjeUIwZVhCbGIyWWdkbUZzZFdVZ1BUMGdKMjlpYW1WamRDY3NYRzRnSUM4dklHVnhkV2wyWVd4bGJtTmxJR2x6SUdSbGRHVnliV2x1WldRZ1lua2dQVDB1WEc0Z0lIMGdaV3h6WlNCcFppQW9JV0ZqZEhWaGJDQjhmQ0FoWlhod1pXTjBaV1FnZkh3Z2RIbHdaVzltSUdGamRIVmhiQ0FoUFNBbmIySnFaV04wSnlBbUppQjBlWEJsYjJZZ1pYaHdaV04wWldRZ0lUMGdKMjlpYW1WamRDY3BJSHRjYmlBZ0lDQnlaWFIxY200Z2IzQjBjeTV6ZEhKcFkzUWdQeUJoWTNSMVlXd2dQVDA5SUdWNGNHVmpkR1ZrSURvZ1lXTjBkV0ZzSUQwOUlHVjRjR1ZqZEdWa08xeHVYRzRnSUM4dklEY3VOQzRnUm05eUlHRnNiQ0J2ZEdobGNpQlBZbXBsWTNRZ2NHRnBjbk1zSUdsdVkyeDFaR2x1WnlCQmNuSmhlU0J2WW1wbFkzUnpMQ0JsY1hWcGRtRnNaVzVqWlNCcGMxeHVJQ0F2THlCa1pYUmxjbTFwYm1Wa0lHSjVJR2hoZG1sdVp5QjBhR1VnYzJGdFpTQnVkVzFpWlhJZ2IyWWdiM2R1WldRZ2NISnZjR1Z5ZEdsbGN5QW9ZWE1nZG1WeWFXWnBaV1JjYmlBZ0x5OGdkMmwwYUNCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3cExDQjBhR1VnYzJGdFpTQnpaWFFnYjJZZ2EyVjVjMXh1SUNBdkx5QW9ZV3gwYUc5MVoyZ2dibTkwSUc1bFkyVnpjMkZ5YVd4NUlIUm9aU0J6WVcxbElHOXlaR1Z5S1N3Z1pYRjFhWFpoYkdWdWRDQjJZV3gxWlhNZ1ptOXlJR1YyWlhKNVhHNGdJQzh2SUdOdmNuSmxjM0J2Ym1ScGJtY2dhMlY1TENCaGJtUWdZVzRnYVdSbGJuUnBZMkZzSUNkd2NtOTBiM1I1Y0dVbklIQnliM0JsY25SNUxpQk9iM1JsT2lCMGFHbHpYRzRnSUM4dklHRmpZMjkxYm5SeklHWnZjaUJpYjNSb0lHNWhiV1ZrSUdGdVpDQnBibVJsZUdWa0lIQnliM0JsY25ScFpYTWdiMjRnUVhKeVlYbHpMbHh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsZEhWeWJpQnZZbXBGY1hWcGRpaGhZM1IxWVd3c0lHVjRjR1ZqZEdWa0xDQnZjSFJ6S1R0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnBjMVZ1WkdWbWFXNWxaRTl5VG5Wc2JDaDJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdkbUZzZFdVZ1BUMDlJRzUxYkd3Z2ZId2dkbUZzZFdVZ1BUMDlJSFZ1WkdWbWFXNWxaRHRjYm4xY2JseHVablZ1WTNScGIyNGdhWE5DZFdabVpYSWdLSGdwSUh0Y2JpQWdhV1lnS0NGNElIeDhJSFI1Y0dWdlppQjRJQ0U5UFNBbmIySnFaV04wSnlCOGZDQjBlWEJsYjJZZ2VDNXNaVzVuZEdnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJR2xtSUNoMGVYQmxiMllnZUM1amIzQjVJQ0U5UFNBblpuVnVZM1JwYjI0bklIeDhJSFI1Y0dWdlppQjRMbk5zYVdObElDRTlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0I5WEc0Z0lHbG1JQ2g0TG14bGJtZDBhQ0ErSURBZ0ppWWdkSGx3Wlc5bUlIaGJNRjBnSVQwOUlDZHVkVzFpWlhJbktTQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lISmxkSFZ5YmlCMGNuVmxPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnZZbXBGY1hWcGRpaGhMQ0JpTENCdmNIUnpLU0I3WEc0Z0lIWmhjaUJwTENCclpYazdYRzRnSUdsbUlDaHBjMVZ1WkdWbWFXNWxaRTl5VG5Wc2JDaGhLU0I4ZkNCcGMxVnVaR1ZtYVc1bFpFOXlUblZzYkNoaUtTbGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUM4dklHRnVJR2xrWlc1MGFXTmhiQ0FuY0hKdmRHOTBlWEJsSnlCd2NtOXdaWEowZVM1Y2JpQWdhV1lnS0dFdWNISnZkRzkwZVhCbElDRTlQU0JpTG5CeWIzUnZkSGx3WlNrZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBdkwzNStma2tuZG1VZ2JXRnVZV2RsWkNCMGJ5QmljbVZoYXlCUFltcGxZM1F1YTJWNWN5QjBhSEp2ZFdkb0lITmpjbVYzZVNCaGNtZDFiV1Z1ZEhNZ2NHRnpjMmx1Wnk1Y2JpQWdMeThnSUNCRGIyNTJaWEowYVc1bklIUnZJR0Z5Y21GNUlITnZiSFpsY3lCMGFHVWdjSEp2WW14bGJTNWNiaUFnYVdZZ0tHbHpRWEpuZFcxbGJuUnpLR0VwS1NCN1hHNGdJQ0FnYVdZZ0tDRnBjMEZ5WjNWdFpXNTBjeWhpS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lIMWNiaUFnSUNCaElEMGdjRk5zYVdObExtTmhiR3dvWVNrN1hHNGdJQ0FnWWlBOUlIQlRiR2xqWlM1allXeHNLR0lwTzF4dUlDQWdJSEpsZEhWeWJpQmtaV1Z3UlhGMVlXd29ZU3dnWWl3Z2IzQjBjeWs3WEc0Z0lIMWNiaUFnYVdZZ0tHbHpRblZtWm1WeUtHRXBLU0I3WEc0Z0lDQWdhV1lnS0NGcGMwSjFabVpsY2loaUtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvWVM1c1pXNW5kR2dnSVQwOUlHSXViR1Z1WjNSb0tTQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElHRXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdsbUlDaGhXMmxkSUNFOVBTQmlXMmxkS1NCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0I5WEc0Z0lIUnllU0I3WEc0Z0lDQWdkbUZ5SUd0aElEMGdiMkpxWldOMFMyVjVjeWhoS1N4Y2JpQWdJQ0FnSUNBZ2EySWdQU0J2WW1wbFkzUkxaWGx6S0dJcE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN0x5OW9ZWEJ3Wlc1eklIZG9aVzRnYjI1bElHbHpJR0VnYzNSeWFXNW5JR3hwZEdWeVlXd2dZVzVrSUhSb1pTQnZkR2hsY2lCcGMyNG5kRnh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVJQ0F2THlCb1lYWnBibWNnZEdobElITmhiV1VnYm5WdFltVnlJRzltSUc5M2JtVmtJSEJ5YjNCbGNuUnBaWE1nS0d0bGVYTWdhVzVqYjNKd2IzSmhkR1Z6WEc0Z0lDOHZJR2hoYzA5M2JsQnliM0JsY25SNUtWeHVJQ0JwWmlBb2EyRXViR1Z1WjNSb0lDRTlJR3RpTG14bGJtZDBhQ2xjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDOHZkR2hsSUhOaGJXVWdjMlYwSUc5bUlHdGxlWE1nS0dGc2RHaHZkV2RvSUc1dmRDQnVaV05sYzNOaGNtbHNlU0IwYUdVZ2MyRnRaU0J2Y21SbGNpa3NYRzRnSUd0aExuTnZjblFvS1R0Y2JpQWdhMkl1YzI5eWRDZ3BPMXh1SUNBdkwzNStmbU5vWldGd0lHdGxlU0IwWlhOMFhHNGdJR1p2Y2lBb2FTQTlJR3RoTG14bGJtZDBhQ0F0SURFN0lHa2dQajBnTURzZ2FTMHRLU0I3WEc0Z0lDQWdhV1lnS0d0aFcybGRJQ0U5SUd0aVcybGRLVnh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQjlYRzRnSUM4dlpYRjFhWFpoYkdWdWRDQjJZV3gxWlhNZ1ptOXlJR1YyWlhKNUlHTnZjbkpsYzNCdmJtUnBibWNnYTJWNUxDQmhibVJjYmlBZ0x5OStmbjV3YjNOemFXSnNlU0JsZUhCbGJuTnBkbVVnWkdWbGNDQjBaWE4wWEc0Z0lHWnZjaUFvYVNBOUlHdGhMbXhsYm1kMGFDQXRJREU3SUdrZ1BqMGdNRHNnYVMwdEtTQjdYRzRnSUNBZ2EyVjVJRDBnYTJGYmFWMDdYRzRnSUNBZ2FXWWdLQ0ZrWldWd1JYRjFZV3dvWVZ0clpYbGRMQ0JpVzJ0bGVWMHNJRzl3ZEhNcEtTQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNiaUFnY21WMGRYSnVJSFI1Y0dWdlppQmhJRDA5UFNCMGVYQmxiMllnWWp0Y2JuMWNiaUlzSWk4cVhHNGdLaUJFWVhSbElFWnZjbTFoZENBeExqSXVNMXh1SUNvZ0tHTXBJREl3TURjdE1qQXdPU0JUZEdWMlpXNGdUR1YyYVhSb1lXNGdQSE4wWlhabGJteGxkbWwwYUdGdUxtTnZiVDVjYmlBcUlFMUpWQ0JzYVdObGJuTmxYRzRnS2x4dUlDb2dTVzVqYkhWa1pYTWdaVzVvWVc1alpXMWxiblJ6SUdKNUlGTmpiM1IwSUZSeVpXNWtZU0E4YzJOdmRIUXVkSEpsYm1SaExtNWxkRDVjYmlBcUlHRnVaQ0JMY21seklFdHZkMkZzSUR4amFYaGhjaTVqYjIwdmZtdHlhWE11YTI5M1lXd3ZQbHh1SUNwY2JpQXFJRUZqWTJWd2RITWdZU0JrWVhSbExDQmhJRzFoYzJzc0lHOXlJR0VnWkdGMFpTQmhibVFnWVNCdFlYTnJMbHh1SUNvZ1VtVjBkWEp1Y3lCaElHWnZjbTFoZEhSbFpDQjJaWEp6YVc5dUlHOW1JSFJvWlNCbmFYWmxiaUJrWVhSbExseHVJQ29nVkdobElHUmhkR1VnWkdWbVlYVnNkSE1nZEc4Z2RHaGxJR04xY25KbGJuUWdaR0YwWlM5MGFXMWxMbHh1SUNvZ1ZHaGxJRzFoYzJzZ1pHVm1ZWFZzZEhNZ2RHOGdaR0YwWlVadmNtMWhkQzV0WVhOcmN5NWtaV1poZFd4MExseHVJQ292WEc1Y2JpaG1kVzVqZEdsdmJpaG5iRzlpWVd3cElIdGNiaUFnSjNWelpTQnpkSEpwWTNRbk8xeHVYRzRnSUhaaGNpQmtZWFJsUm05eWJXRjBJRDBnS0daMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUNBZ2RtRnlJSFJ2YTJWdUlEMGdMMlI3TVN3MGZYeHRlekVzTkgxOGVYa29QenA1ZVNrL2ZDaGJTR2hOYzFSMFhTbGNYREUvZkZ0TWJHOVRXbGRPWFh4Y0lsdGVYQ0pkS2x3aWZDZGJYaWRkS2ljdlp6dGNiaUFnSUNBZ0lIWmhjaUIwYVcxbGVtOXVaU0E5SUM5Y1hHSW9QenBiVUUxRFJVRmRXMU5FVUYxVWZDZy9PbEJoWTJsbWFXTjhUVzkxYm5SaGFXNThRMlZ1ZEhKaGJIeEZZWE4wWlhKdWZFRjBiR0Z1ZEdsaktTQW9QenBUZEdGdVpHRnlaSHhFWVhsc2FXZG9kSHhRY21WMllXbHNhVzVuS1NCVWFXMWxmQ2cvT2tkTlZIeFZWRU1wS0Q4Nld5MHJYVnhjWkhzMGZTay9LVnhjWWk5bk8xeHVJQ0FnSUNBZ2RtRnlJSFJwYldWNmIyNWxRMnhwY0NBOUlDOWJYaTByWEZ4a1FTMWFYUzluTzF4dUlDQmNiaUFnSUNBZ0lDOHZJRkpsWjJWNFpYTWdZVzVrSUhOMWNIQnZjblJwYm1jZ1puVnVZM1JwYjI1eklHRnlaU0JqWVdOb1pXUWdkR2h5YjNWbmFDQmpiRzl6ZFhKbFhHNGdJQ0FnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dSaGRHVXNJRzFoYzJzc0lIVjBZeXdnWjIxMEtTQjdYRzRnSUZ4dUlDQWdJQ0FnSUNBdkx5QlpiM1VnWTJGdUozUWdjSEp2ZG1sa1pTQjFkR01nYVdZZ2VXOTFJSE5yYVhBZ2IzUm9aWElnWVhKbmN5QW9kWE5sSUhSb1pTQW5WVlJET2ljZ2JXRnpheUJ3Y21WbWFYZ3BYRzRnSUNBZ0lDQWdJR2xtSUNoaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQwOVBTQXhJQ1ltSUd0cGJtUlBaaWhrWVhSbEtTQTlQVDBnSjNOMGNtbHVaeWNnSmlZZ0lTOWNYR1F2TG5SbGMzUW9aR0YwWlNrcElIdGNiaUFnSUNBZ0lDQWdJQ0J0WVhOcklEMGdaR0YwWlR0Y2JpQWdJQ0FnSUNBZ0lDQmtZWFJsSUQwZ2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUZ4dUlDQWdJQ0FnSUNCa1lYUmxJRDBnWkdGMFpTQjhmQ0J1WlhjZ1JHRjBaVHRjYmlBZ1hHNGdJQ0FnSUNBZ0lHbG1LQ0VvWkdGMFpTQnBibk4wWVc1alpXOW1JRVJoZEdVcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnWkdGMFpTQTlJRzVsZHlCRVlYUmxLR1JoZEdVcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUZ4dUlDQWdJQ0FnSUNCcFppQW9hWE5PWVU0b1pHRjBaU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb0owbHVkbUZzYVdRZ1pHRjBaU2NwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJRnh1SUNBZ0lDQWdJQ0J0WVhOcklEMGdVM1J5YVc1bktHUmhkR1ZHYjNKdFlYUXViV0Z6YTNOYmJXRnphMTBnZkh3Z2JXRnpheUI4ZkNCa1lYUmxSbTl5YldGMExtMWhjMnR6V3lka1pXWmhkV3gwSjEwcE8xeHVJQ0JjYmlBZ0lDQWdJQ0FnTHk4Z1FXeHNiM2NnYzJWMGRHbHVaeUIwYUdVZ2RYUmpMMmR0ZENCaGNtZDFiV1Z1ZENCMmFXRWdkR2hsSUcxaGMydGNiaUFnSUNBZ0lDQWdkbUZ5SUcxaGMydFRiR2xqWlNBOUlHMWhjMnN1YzJ4cFkyVW9NQ3dnTkNrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2h0WVhOclUyeHBZMlVnUFQwOUlDZFZWRU02SnlCOGZDQnRZWE5yVTJ4cFkyVWdQVDA5SUNkSFRWUTZKeWtnZTF4dUlDQWdJQ0FnSUNBZ0lHMWhjMnNnUFNCdFlYTnJMbk5zYVdObEtEUXBPMXh1SUNBZ0lDQWdJQ0FnSUhWMFl5QTlJSFJ5ZFdVN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0cxaGMydFRiR2xqWlNBOVBUMGdKMGROVkRvbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCbmJYUWdQU0IwY25WbE8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQmNiaUFnSUNBZ0lDQWdkbUZ5SUY4Z1BTQjFkR01nUHlBbloyVjBWVlJESnlBNklDZG5aWFFuTzF4dUlDQWdJQ0FnSUNCMllYSWdaQ0E5SUdSaGRHVmJYeUFySUNkRVlYUmxKMTBvS1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJRVFnUFNCa1lYUmxXMThnS3lBblJHRjVKMTBvS1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJRzBnUFNCa1lYUmxXMThnS3lBblRXOXVkR2duWFNncE8xeHVJQ0FnSUNBZ0lDQjJZWElnZVNBOUlHUmhkR1ZiWHlBcklDZEdkV3hzV1dWaGNpZGRLQ2s3WEc0Z0lDQWdJQ0FnSUhaaGNpQklJRDBnWkdGMFpWdGZJQ3NnSjBodmRYSnpKMTBvS1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJRTBnUFNCa1lYUmxXMThnS3lBblRXbHVkWFJsY3lkZEtDazdYRzRnSUNBZ0lDQWdJSFpoY2lCeklEMGdaR0YwWlZ0ZklDc2dKMU5sWTI5dVpITW5YU2dwTzF4dUlDQWdJQ0FnSUNCMllYSWdUQ0E5SUdSaGRHVmJYeUFySUNkTmFXeHNhWE5sWTI5dVpITW5YU2dwTzF4dUlDQWdJQ0FnSUNCMllYSWdieUE5SUhWMFl5QS9JREFnT2lCa1lYUmxMbWRsZEZScGJXVjZiMjVsVDJabWMyVjBLQ2s3WEc0Z0lDQWdJQ0FnSUhaaGNpQlhJRDBnWjJWMFYyVmxheWhrWVhSbEtUdGNiaUFnSUNBZ0lDQWdkbUZ5SUU0Z1BTQm5aWFJFWVhsUFpsZGxaV3NvWkdGMFpTazdYRzRnSUNBZ0lDQWdJSFpoY2lCbWJHRm5jeUE5SUh0Y2JpQWdJQ0FnSUNBZ0lDQmtPaUFnSUNCa0xGeHVJQ0FnSUNBZ0lDQWdJR1JrT2lBZ0lIQmhaQ2hrS1N4Y2JpQWdJQ0FnSUNBZ0lDQmtaR1E2SUNCa1lYUmxSbTl5YldGMExta3hPRzR1WkdGNVRtRnRaWE5iUkYwc1hHNGdJQ0FnSUNBZ0lDQWdaR1JrWkRvZ1pHRjBaVVp2Y20xaGRDNXBNVGh1TG1SaGVVNWhiV1Z6VzBRZ0t5QTNYU3hjYmlBZ0lDQWdJQ0FnSUNCdE9pQWdJQ0J0SUNzZ01TeGNiaUFnSUNBZ0lDQWdJQ0J0YlRvZ0lDQndZV1FvYlNBcklERXBMRnh1SUNBZ0lDQWdJQ0FnSUcxdGJUb2dJR1JoZEdWR2IzSnRZWFF1YVRFNGJpNXRiMjUwYUU1aGJXVnpXMjFkTEZ4dUlDQWdJQ0FnSUNBZ0lHMXRiVzA2SUdSaGRHVkdiM0p0WVhRdWFURTRiaTV0YjI1MGFFNWhiV1Z6VzIwZ0t5QXhNbDBzWEc0Z0lDQWdJQ0FnSUNBZ2VYazZJQ0FnVTNSeWFXNW5LSGtwTG5Oc2FXTmxLRElwTEZ4dUlDQWdJQ0FnSUNBZ0lIbDVlWGs2SUhrc1hHNGdJQ0FnSUNBZ0lDQWdhRG9nSUNBZ1NDQWxJREV5SUh4OElERXlMRnh1SUNBZ0lDQWdJQ0FnSUdob09pQWdJSEJoWkNoSUlDVWdNVElnZkh3Z01USXBMRnh1SUNBZ0lDQWdJQ0FnSUVnNklDQWdJRWdzWEc0Z0lDQWdJQ0FnSUNBZ1NFZzZJQ0FnY0dGa0tFZ3BMRnh1SUNBZ0lDQWdJQ0FnSUUwNklDQWdJRTBzWEc0Z0lDQWdJQ0FnSUNBZ1RVMDZJQ0FnY0dGa0tFMHBMRnh1SUNBZ0lDQWdJQ0FnSUhNNklDQWdJSE1zWEc0Z0lDQWdJQ0FnSUNBZ2MzTTZJQ0FnY0dGa0tITXBMRnh1SUNBZ0lDQWdJQ0FnSUd3NklDQWdJSEJoWkNoTUxDQXpLU3hjYmlBZ0lDQWdJQ0FnSUNCTU9pQWdJQ0J3WVdRb1RXRjBhQzV5YjNWdVpDaE1JQzhnTVRBcEtTeGNiaUFnSUNBZ0lDQWdJQ0IwT2lBZ0lDQklJRHdnTVRJZ1B5QmtZWFJsUm05eWJXRjBMbWt4T0c0dWRHbHRaVTVoYldWeld6QmRJRG9nWkdGMFpVWnZjbTFoZEM1cE1UaHVMblJwYldWT1lXMWxjMXN4WFN4Y2JpQWdJQ0FnSUNBZ0lDQjBkRG9nSUNCSUlEd2dNVElnUHlCa1lYUmxSbTl5YldGMExta3hPRzR1ZEdsdFpVNWhiV1Z6V3pKZElEb2daR0YwWlVadmNtMWhkQzVwTVRodUxuUnBiV1ZPWVcxbGMxc3pYU3hjYmlBZ0lDQWdJQ0FnSUNCVU9pQWdJQ0JJSUR3Z01USWdQeUJrWVhSbFJtOXliV0YwTG1reE9HNHVkR2x0WlU1aGJXVnpXelJkSURvZ1pHRjBaVVp2Y20xaGRDNXBNVGh1TG5ScGJXVk9ZVzFsYzFzMVhTeGNiaUFnSUNBZ0lDQWdJQ0JVVkRvZ0lDQklJRHdnTVRJZ1B5QmtZWFJsUm05eWJXRjBMbWt4T0c0dWRHbHRaVTVoYldWeld6WmRJRG9nWkdGMFpVWnZjbTFoZEM1cE1UaHVMblJwYldWT1lXMWxjMXMzWFN4Y2JpQWdJQ0FnSUNBZ0lDQmFPaUFnSUNCbmJYUWdQeUFuUjAxVUp5QTZJSFYwWXlBL0lDZFZWRU1uSURvZ0tGTjBjbWx1Wnloa1lYUmxLUzV0WVhSamFDaDBhVzFsZW05dVpTa2dmSHdnV3ljblhTa3VjRzl3S0NrdWNtVndiR0ZqWlNoMGFXMWxlbTl1WlVOc2FYQXNJQ2NuS1N4Y2JpQWdJQ0FnSUNBZ0lDQnZPaUFnSUNBb2J5QStJREFnUHlBbkxTY2dPaUFuS3ljcElDc2djR0ZrS0UxaGRHZ3VabXh2YjNJb1RXRjBhQzVoWW5Nb2J5a2dMeUEyTUNrZ0tpQXhNREFnS3lCTllYUm9MbUZpY3lodktTQWxJRFl3TENBMEtTeGNiaUFnSUNBZ0lDQWdJQ0JUT2lBZ0lDQmJKM1JvSnl3Z0ozTjBKeXdnSjI1a0p5d2dKM0prSjExYlpDQWxJREV3SUQ0Z015QS9JREFnT2lBb1pDQWxJREV3TUNBdElHUWdKU0F4TUNBaFBTQXhNQ2tnS2lCa0lDVWdNVEJkTEZ4dUlDQWdJQ0FnSUNBZ0lGYzZJQ0FnSUZjc1hHNGdJQ0FnSUNBZ0lDQWdUam9nSUNBZ1RseHVJQ0FnSUNBZ0lDQjlPMXh1SUNCY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUcxaGMyc3VjbVZ3YkdGalpTaDBiMnRsYml3Z1puVnVZM1JwYjI0Z0tHMWhkR05vS1NCN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0cxaGRHTm9JR2x1SUdac1lXZHpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1pteGhaM05iYldGMFkyaGRPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JXRjBZMmd1YzJ4cFkyVW9NU3dnYldGMFkyZ3ViR1Z1WjNSb0lDMGdNU2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOUtTZ3BPMXh1WEc0Z0lHUmhkR1ZHYjNKdFlYUXViV0Z6YTNNZ1BTQjdYRzRnSUNBZ0oyUmxabUYxYkhRbk9pQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNka1pHUWdiVzF0SUdSa0lIbDVlWGtnU0VnNlRVMDZjM01uTEZ4dUlDQWdJQ2R6YUc5eWRFUmhkR1VuT2lBZ0lDQWdJQ0FnSUNBZ0lDQW5iUzlrTDNsNUp5eGNiaUFnSUNBbmJXVmthWFZ0UkdGMFpTYzZJQ0FnSUNBZ0lDQWdJQ0FnSjIxdGJTQmtMQ0I1ZVhsNUp5eGNiaUFnSUNBbmJHOXVaMFJoZEdVbk9pQWdJQ0FnSUNBZ0lDQWdJQ0FnSjIxdGJXMGdaQ3dnZVhsNWVTY3NYRzRnSUNBZ0oyWjFiR3hFWVhSbEp6b2dJQ0FnSUNBZ0lDQWdJQ0FnSUNka1pHUmtMQ0J0YlcxdElHUXNJSGw1ZVhrbkxGeHVJQ0FnSUNkemFHOXlkRlJwYldVbk9pQWdJQ0FnSUNBZ0lDQWdJQ0FuYURwTlRTQlVWQ2NzWEc0Z0lDQWdKMjFsWkdsMWJWUnBiV1VuT2lBZ0lDQWdJQ0FnSUNBZ0lDZG9PazFOT25OeklGUlVKeXhjYmlBZ0lDQW5iRzl1WjFScGJXVW5PaUFnSUNBZ0lDQWdJQ0FnSUNBZ0oyZzZUVTA2YzNNZ1ZGUWdXaWNzWEc0Z0lDQWdKMmx6YjBSaGRHVW5PaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDZDVlWGw1TFcxdExXUmtKeXhjYmlBZ0lDQW5hWE52VkdsdFpTYzZJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0owaElPazFOT25Oekp5eGNiaUFnSUNBbmFYTnZSR0YwWlZScGJXVW5PaUFnSUNBZ0lDQWdJQ0FnSjNsNWVYa3RiVzB0WkdSY1hDZFVYRnduU0VnNlRVMDZjM052Snl4Y2JpQWdJQ0FuYVhOdlZYUmpSR0YwWlZScGJXVW5PaUFnSUNBZ0lDQWdKMVZVUXpwNWVYbDVMVzF0TFdSa1hGd25WRnhjSjBoSU9rMU5Pbk56WEZ3bldseGNKeWNzWEc0Z0lDQWdKMlY0Y0dseVpYTklaV0ZrWlhKR2IzSnRZWFFuT2lBZ0lDZGtaR1FzSUdSa0lHMXRiU0I1ZVhsNUlFaElPazFOT25OeklGb25YRzRnSUgwN1hHNWNiaUFnTHk4Z1NXNTBaWEp1WVhScGIyNWhiR2w2WVhScGIyNGdjM1J5YVc1bmMxeHVJQ0JrWVhSbFJtOXliV0YwTG1reE9HNGdQU0I3WEc0Z0lDQWdaR0Y1VG1GdFpYTTZJRnRjYmlBZ0lDQWdJQ2RUZFc0bkxDQW5UVzl1Snl3Z0oxUjFaU2NzSUNkWFpXUW5MQ0FuVkdoMUp5d2dKMFp5YVNjc0lDZFRZWFFuTEZ4dUlDQWdJQ0FnSjFOMWJtUmhlU2NzSUNkTmIyNWtZWGtuTENBblZIVmxjMlJoZVNjc0lDZFhaV1J1WlhOa1lYa25MQ0FuVkdoMWNuTmtZWGtuTENBblJuSnBaR0Y1Snl3Z0oxTmhkSFZ5WkdGNUoxeHVJQ0FnSUYwc1hHNGdJQ0FnYlc5dWRHaE9ZVzFsY3pvZ1cxeHVJQ0FnSUNBZ0owcGhiaWNzSUNkR1pXSW5MQ0FuVFdGeUp5d2dKMEZ3Y2ljc0lDZE5ZWGtuTENBblNuVnVKeXdnSjBwMWJDY3NJQ2RCZFdjbkxDQW5VMlZ3Snl3Z0owOWpkQ2NzSUNkT2IzWW5MQ0FuUkdWakp5eGNiaUFnSUNBZ0lDZEtZVzUxWVhKNUp5d2dKMFpsWW5KMVlYSjVKeXdnSjAxaGNtTm9KeXdnSjBGd2NtbHNKeXdnSjAxaGVTY3NJQ2RLZFc1bEp5d2dKMHAxYkhrbkxDQW5RWFZuZFhOMEp5d2dKMU5sY0hSbGJXSmxjaWNzSUNkUFkzUnZZbVZ5Snl3Z0owNXZkbVZ0WW1WeUp5d2dKMFJsWTJWdFltVnlKMXh1SUNBZ0lGMHNYRzRnSUNBZ2RHbHRaVTVoYldWek9pQmJYRzRnSUNBZ0lDQW5ZU2NzSUNkd0p5d2dKMkZ0Snl3Z0ozQnRKeXdnSjBFbkxDQW5VQ2NzSUNkQlRTY3NJQ2RRVFNkY2JpQWdJQ0JkWEc0Z0lIMDdYRzVjYm1aMWJtTjBhVzl1SUhCaFpDaDJZV3dzSUd4bGJpa2dlMXh1SUNCMllXd2dQU0JUZEhKcGJtY29kbUZzS1R0Y2JpQWdiR1Z1SUQwZ2JHVnVJSHg4SURJN1hHNGdJSGRvYVd4bElDaDJZV3d1YkdWdVozUm9JRHdnYkdWdUtTQjdYRzRnSUNBZ2RtRnNJRDBnSnpBbklDc2dkbUZzTzF4dUlDQjlYRzRnSUhKbGRIVnliaUIyWVd3N1hHNTlYRzVjYmk4cUtseHVJQ29nUjJWMElIUm9aU0JKVTA4Z09EWXdNU0IzWldWcklHNTFiV0psY2x4dUlDb2dRbUZ6WldRZ2IyNGdZMjl0YldWdWRITWdabkp2YlZ4dUlDb2dhSFIwY0RvdkwzUmxZMmhpYkc5bkxuQnliMk4xY21sdmN5NXViQzlyTDI0Mk1UZ3ZibVYzY3k5MmFXVjNMek16TnprMkx6RTBPRFl6TDBOaGJHTjFiR0YwWlMxSlUwOHRPRFl3TVMxM1pXVnJMV0Z1WkMxNVpXRnlMV2x1TFdwaGRtRnpZM0pwY0hRdWFIUnRiRnh1SUNwY2JpQXFJRUJ3WVhKaGJTQWdlMDlpYW1WamRIMGdZR1JoZEdWZ1hHNGdLaUJBY21WMGRYSnVJSHRPZFcxaVpYSjlYRzRnS2k5Y2JtWjFibU4wYVc5dUlHZGxkRmRsWldzb1pHRjBaU2tnZTF4dUlDQXZMeUJTWlcxdmRtVWdkR2x0WlNCamIyMXdiMjVsYm5SeklHOW1JR1JoZEdWY2JpQWdkbUZ5SUhSaGNtZGxkRlJvZFhKelpHRjVJRDBnYm1WM0lFUmhkR1VvWkdGMFpTNW5aWFJHZFd4c1dXVmhjaWdwTENCa1lYUmxMbWRsZEUxdmJuUm9LQ2tzSUdSaGRHVXVaMlYwUkdGMFpTZ3BLVHRjYmx4dUlDQXZMeUJEYUdGdVoyVWdaR0YwWlNCMGJ5QlVhSFZ5YzJSaGVTQnpZVzFsSUhkbFpXdGNiaUFnZEdGeVoyVjBWR2gxY25Oa1lYa3VjMlYwUkdGMFpTaDBZWEpuWlhSVWFIVnljMlJoZVM1blpYUkVZWFJsS0NrZ0xTQW9LSFJoY21kbGRGUm9kWEp6WkdGNUxtZGxkRVJoZVNncElDc2dOaWtnSlNBM0tTQXJJRE1wTzF4dVhHNGdJQzh2SUZSaGEyVWdTbUZ1ZFdGeWVTQTBkR2dnWVhNZ2FYUWdhWE1nWVd4M1lYbHpJR2x1SUhkbFpXc2dNU0FvYzJWbElFbFRUeUE0TmpBeEtWeHVJQ0IyWVhJZ1ptbHljM1JVYUhWeWMyUmhlU0E5SUc1bGR5QkVZWFJsS0hSaGNtZGxkRlJvZFhKelpHRjVMbWRsZEVaMWJHeFpaV0Z5S0Nrc0lEQXNJRFFwTzF4dVhHNGdJQzh2SUVOb1lXNW5aU0JrWVhSbElIUnZJRlJvZFhKelpHRjVJSE5oYldVZ2QyVmxhMXh1SUNCbWFYSnpkRlJvZFhKelpHRjVMbk5sZEVSaGRHVW9abWx5YzNSVWFIVnljMlJoZVM1blpYUkVZWFJsS0NrZ0xTQW9LR1pwY25OMFZHaDFjbk5rWVhrdVoyVjBSR0Y1S0NrZ0t5QTJLU0FsSURjcElDc2dNeWs3WEc1Y2JpQWdMeThnUTJobFkyc2dhV1lnWkdGNWJHbG5hSFF0YzJGMmFXNW5MWFJwYldVdGMzZHBkR05vSUc5alkzVnljbVZrSUdGdVpDQmpiM0p5WldOMElHWnZjaUJwZEZ4dUlDQjJZWElnWkhNZ1BTQjBZWEpuWlhSVWFIVnljMlJoZVM1blpYUlVhVzFsZW05dVpVOW1abk5sZENncElDMGdabWx5YzNSVWFIVnljMlJoZVM1blpYUlVhVzFsZW05dVpVOW1abk5sZENncE8xeHVJQ0IwWVhKblpYUlVhSFZ5YzJSaGVTNXpaWFJJYjNWeWN5aDBZWEpuWlhSVWFIVnljMlJoZVM1blpYUkliM1Z5Y3lncElDMGdaSE1wTzF4dVhHNGdJQzh2SUU1MWJXSmxjaUJ2WmlCM1pXVnJjeUJpWlhSM1pXVnVJSFJoY21kbGRDQlVhSFZ5YzJSaGVTQmhibVFnWm1seWMzUWdWR2gxY25Oa1lYbGNiaUFnZG1GeUlIZGxaV3RFYVdabUlEMGdLSFJoY21kbGRGUm9kWEp6WkdGNUlDMGdabWx5YzNSVWFIVnljMlJoZVNrZ0x5QW9PRFkwTURBd01EQXFOeWs3WEc0Z0lISmxkSFZ5YmlBeElDc2dUV0YwYUM1bWJHOXZjaWgzWldWclJHbG1aaWs3WEc1OVhHNWNiaThxS2x4dUlDb2dSMlYwSUVsVFR5MDROakF4SUc1MWJXVnlhV01nY21Wd2NtVnpaVzUwWVhScGIyNGdiMllnZEdobElHUmhlU0J2WmlCMGFHVWdkMlZsYTF4dUlDb2dNU0FvWm05eUlFMXZibVJoZVNrZ2RHaHliM1ZuYUNBM0lDaG1iM0lnVTNWdVpHRjVLVnh1SUNvZ1hHNGdLaUJBY0dGeVlXMGdJSHRQWW1wbFkzUjlJR0JrWVhSbFlGeHVJQ29nUUhKbGRIVnliaUI3VG5WdFltVnlmVnh1SUNvdlhHNW1kVzVqZEdsdmJpQm5aWFJFWVhsUFpsZGxaV3NvWkdGMFpTa2dlMXh1SUNCMllYSWdaRzkzSUQwZ1pHRjBaUzVuWlhSRVlYa29LVHRjYmlBZ2FXWW9aRzkzSUQwOVBTQXdLU0I3WEc0Z0lDQWdaRzkzSUQwZ056dGNiaUFnZlZ4dUlDQnlaWFIxY200Z1pHOTNPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlHdHBibVF0YjJZZ2MyaHZjblJqZFhSY2JpQXFJRUJ3WVhKaGJTQWdleXA5SUhaaGJGeHVJQ29nUUhKbGRIVnliaUI3VTNSeWFXNW5mVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnJhVzVrVDJZb2RtRnNLU0I3WEc0Z0lHbG1JQ2gyWVd3Z1BUMDlJRzUxYkd3cElIdGNiaUFnSUNCeVpYUjFjbTRnSjI1MWJHd25PMXh1SUNCOVhHNWNiaUFnYVdZZ0tIWmhiQ0E5UFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUNkMWJtUmxabWx1WldRbk8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0hSNWNHVnZaaUIyWVd3Z0lUMDlJQ2R2WW1wbFkzUW5LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUjVjR1Z2WmlCMllXdzdYRzRnSUgxY2JseHVJQ0JwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2gyWVd3cEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUNkaGNuSmhlU2M3WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnZTMwdWRHOVRkSEpwYm1jdVkyRnNiQ2gyWVd3cFhHNGdJQ0FnTG5Oc2FXTmxLRGdzSUMweEtTNTBiMHh2ZDJWeVEyRnpaU2dwTzF4dWZUdGNibHh1WEc1Y2JpQWdhV1lnS0hSNWNHVnZaaUJrWldacGJtVWdQVDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdaR1ZtYVc1bExtRnRaQ2tnZTF4dUlDQWdJR1JsWm1sdVpTaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdaR0YwWlVadmNtMWhkRHRjYmlBZ0lDQjlLVHRjYmlBZ2ZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ1pYaHdiM0owY3lBOVBUMGdKMjlpYW1WamRDY3BJSHRjYmlBZ0lDQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHUmhkR1ZHYjNKdFlYUTdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdaMnh2WW1Gc0xtUmhkR1ZHYjNKdFlYUWdQU0JrWVhSbFJtOXliV0YwTzF4dUlDQjlYRzU5S1NoMGFHbHpLVHRjYmlJc0lpOHFJVnh1SUNvZ2NtVndaV0YwTFhOMGNtbHVaeUE4YUhSMGNITTZMeTluYVhSb2RXSXVZMjl0TDJwdmJuTmphR3hwYm10bGNuUXZjbVZ3WldGMExYTjBjbWx1Wno1Y2JpQXFYRzRnS2lCRGIzQjVjbWxuYUhRZ0tHTXBJREl3TVRRdE1qQXhOU3dnU205dUlGTmphR3hwYm10bGNuUXVYRzRnS2lCTWFXTmxibk5sWkNCMWJtUmxjaUIwYUdVZ1RVbFVJRXhwWTJWdWMyVXVYRzRnS2k5Y2JseHVKM1Z6WlNCemRISnBZM1FuTzF4dVhHNHZLaXBjYmlBcUlGSmxjM1ZzZEhNZ1kyRmphR1ZjYmlBcUwxeHVYRzUyWVhJZ2NtVnpJRDBnSnljN1hHNTJZWElnWTJGamFHVTdYRzVjYmk4cUtseHVJQ29nUlhod2IzTmxJR0J5WlhCbFlYUmdYRzRnS2k5Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlaWEJsWVhRN1hHNWNiaThxS2x4dUlDb2dVbVZ3WldGMElIUm9aU0JuYVhabGJpQmdjM1J5YVc1bllDQjBhR1VnYzNCbFkybG1hV1ZrSUdCdWRXMWlaWEpnWEc0Z0tpQnZaaUIwYVcxbGN5NWNiaUFxWEc0Z0tpQXFLa1Y0WVcxd2JHVTZLaXBjYmlBcVhHNGdLaUJnWUdCcWMxeHVJQ29nZG1GeUlISmxjR1ZoZENBOUlISmxjWFZwY21Vb0ozSmxjR1ZoZEMxemRISnBibWNuS1R0Y2JpQXFJSEpsY0dWaGRDZ25RU2NzSURVcE8xeHVJQ29nTHk4OVBpQkJRVUZCUVZ4dUlDb2dZR0JnWEc0Z0tseHVJQ29nUUhCaGNtRnRJSHRUZEhKcGJtZDlJR0J6ZEhKcGJtZGdJRlJvWlNCemRISnBibWNnZEc4Z2NtVndaV0YwWEc0Z0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ1lHNTFiV0psY21BZ1ZHaGxJRzUxYldKbGNpQnZaaUIwYVcxbGN5QjBieUJ5WlhCbFlYUWdkR2hsSUhOMGNtbHVaMXh1SUNvZ1FISmxkSFZ5YmlCN1UzUnlhVzVuZlNCU1pYQmxZWFJsWkNCemRISnBibWRjYmlBcUlFQmhjR2tnY0hWaWJHbGpYRzRnS2k5Y2JseHVablZ1WTNScGIyNGdjbVZ3WldGMEtITjBjaXdnYm5WdEtTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2MzUnlJQ0U5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0oyVjRjR1ZqZEdWa0lHRWdjM1J5YVc1bkp5azdYRzRnSUgxY2JseHVJQ0F2THlCamIzWmxjaUJqYjIxdGIyNHNJSEYxYVdOcklIVnpaU0JqWVhObGMxeHVJQ0JwWmlBb2JuVnRJRDA5UFNBeEtTQnlaWFIxY200Z2MzUnlPMXh1SUNCcFppQW9iblZ0SUQwOVBTQXlLU0J5WlhSMWNtNGdjM1J5SUNzZ2MzUnlPMXh1WEc0Z0lIWmhjaUJ0WVhnZ1BTQnpkSEl1YkdWdVozUm9JQ29nYm5WdE8xeHVJQ0JwWmlBb1kyRmphR1VnSVQwOUlITjBjaUI4ZkNCMGVYQmxiMllnWTJGamFHVWdQVDA5SUNkMWJtUmxabWx1WldRbktTQjdYRzRnSUNBZ1kyRmphR1VnUFNCemRISTdYRzRnSUNBZ2NtVnpJRDBnSnljN1hHNGdJSDBnWld4elpTQnBaaUFvY21WekxteGxibWQwYUNBK1BTQnRZWGdwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6TG5OMVluTjBjaWd3TENCdFlYZ3BPMXh1SUNCOVhHNWNiaUFnZDJocGJHVWdLRzFoZUNBK0lISmxjeTVzWlc1bmRHZ2dKaVlnYm5WdElENGdNU2tnZTF4dUlDQWdJR2xtSUNodWRXMGdKaUF4S1NCN1hHNGdJQ0FnSUNCeVpYTWdLejBnYzNSeU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUc1MWJTQStQajBnTVR0Y2JpQWdJQ0J6ZEhJZ0t6MGdjM1J5TzF4dUlDQjlYRzVjYmlBZ2NtVnpJQ3M5SUhOMGNqdGNiaUFnY21WeklEMGdjbVZ6TG5OMVluTjBjaWd3TENCdFlYZ3BPMXh1SUNCeVpYUjFjbTRnY21Wek8xeHVmVnh1SWl3aUx5b2hYRzRnS2lCd1lXUXRiR1ZtZENBOGFIUjBjSE02THk5bmFYUm9kV0l1WTI5dEwycHZibk5qYUd4cGJtdGxjblF2Y0dGa0xXeGxablErWEc0Z0tseHVJQ29nUTI5d2VYSnBaMmgwSUNoaktTQXlNREUwTFRJd01UVXNJRXB2YmlCVFkyaHNhVzVyWlhKMExseHVJQ29nVEdsalpXNXpaV1FnZFc1a1pYSWdkR2hsSUUxSlZDQnNhV05sYm5ObExseHVJQ292WEc1Y2JpZDFjMlVnYzNSeWFXTjBKenRjYmx4dWRtRnlJSEpsY0dWaGRDQTlJSEpsY1hWcGNtVW9KM0psY0dWaGRDMXpkSEpwYm1jbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUJ3WVdSTVpXWjBLSE4wY2l3Z2JuVnRMQ0JqYUNrZ2UxeHVJQ0J6ZEhJZ1BTQnpkSEl1ZEc5VGRISnBibWNvS1R0Y2JseHVJQ0JwWmlBb2RIbHdaVzltSUc1MWJTQTlQVDBnSjNWdVpHVm1hVzVsWkNjcElIdGNiaUFnSUNCeVpYUjFjbTRnYzNSeU8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0dOb0lEMDlQU0F3S1NCN1hHNGdJQ0FnWTJnZ1BTQW5NQ2M3WEc0Z0lIMGdaV3h6WlNCcFppQW9ZMmdwSUh0Y2JpQWdJQ0JqYUNBOUlHTm9MblJ2VTNSeWFXNW5LQ2s3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnWTJnZ1BTQW5JQ2M3WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnY21Wd1pXRjBLR05vTENCdWRXMGdMU0J6ZEhJdWJHVnVaM1JvS1NBcklITjBjanRjYm4wN1hHNGlMQ0pwYlhCdmNuUWdaR0YwWldadmNtMWhkQ0JtY205dElDZGtZWFJsWm05eWJXRjBKenRjYm1sdGNHOXlkQ0JoYzNOcFoyNGdabkp2YlNBbmIySnFaV04wTFdGemMybG5iaWM3WEc1cGJYQnZjblFnY0dGa1RHVm1kQ0JtY205dElDZHdZV1F0YkdWbWRDYzdYRzVwYlhCdmNuUWdleUJuWlhSRGJHbGxiblJCVUVrZ2ZTQm1jbTl0SUNjdUwzVjBhV3duTzF4dVhHNWpiMjV6ZENCdWIyOXdJRDBnS0NrZ1BUNGdlMzA3WEc1c1pYUWdiR2x1YXp0Y2JteGxkQ0JrWldaaGRXeDBSWGgwY3lBOUlIc2daWGgwWlc1emFXOXVPaUFuSnl3Z2NISmxabWw0T2lBbkp5d2djM1ZtWm1sNE9pQW5KeUI5TzF4dVhHNHZMeUJCYkhSbGNtNWhkR2wyWlNCemIyeDFkR2x2YmlCbWIzSWdjMkYyYVc1bklHWnBiR1Z6TEZ4dUx5OGdZU0JpYVhRZ2MyeHZkMlZ5SUdGdVpDQmtiMlZ6SUc1dmRDQjNiM0pySUdsdUlGTmhabUZ5YVZ4dUx5OGdablZ1WTNScGIyNGdabVYwWTJoQ2JHOWlSbkp2YlVSaGRHRlZVa3dnS0dSaGRHRlZVa3dwSUh0Y2JpOHZJQ0FnY21WMGRYSnVJSGRwYm1SdmR5NW1aWFJqYUNoa1lYUmhWVkpNS1M1MGFHVnVLSEpsY3lBOVBpQnlaWE11WW14dllpZ3BLVHRjYmk4dklIMWNibHh1WTI5dWMzUWdjM1Z3Y0c5eWRHVmtSVzVqYjJScGJtZHpJRDBnVzF4dUlDQW5hVzFoWjJVdmNHNW5KeXhjYmlBZ0oybHRZV2RsTDJwd1pXY25MRnh1SUNBbmFXMWhaMlV2ZDJWaWNDZGNibDA3WEc1Y2JtWjFibU4wYVc5dUlITjBjbVZoYlNBb2FYTlRkR0Z5ZEN3Z2IzQjBjeUE5SUh0OUtTQjdYRzRnSUhKbGRIVnliaUJ1WlhjZ1VISnZiV2x6WlNnb2NtVnpiMngyWlN3Z2NtVnFaV04wS1NBOVBpQjdYRzRnSUNBZ2IzQjBjeUE5SUdGemMybG5iaWg3ZlN3Z1pHVm1ZWFZzZEVWNGRITXNJRzl3ZEhNcE8xeHVJQ0FnSUdOdmJuTjBJR1pwYkdWdVlXMWxJRDBnY21WemIyeDJaVVpwYkdWdVlXMWxLRTlpYW1WamRDNWhjM05wWjI0b2UzMHNJRzl3ZEhNc0lIdGNiaUFnSUNBZ0lHVjRkR1Z1YzJsdmJqb2dKeWNzWEc0Z0lDQWdJQ0JtY21GdFpUb2dkVzVrWldacGJtVmtYRzRnSUNBZ2ZTa3BPMXh1SUNBZ0lHTnZibk4wSUdaMWJtTWdQU0JwYzFOMFlYSjBJRDhnSjNOMGNtVmhiVk4wWVhKMEp5QTZJQ2R6ZEhKbFlXMUZibVFuTzF4dUlDQWdJR052Ym5OMElHTnNhV1Z1ZENBOUlHZGxkRU5zYVdWdWRFRlFTU2dwTzF4dUlDQWdJR2xtSUNoamJHbGxiblFnSmlZZ1kyeHBaVzUwTG05MWRIQjFkQ0FtSmlCMGVYQmxiMllnWTJ4cFpXNTBXMloxYm1OZElEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWTJ4cFpXNTBXMloxYm1OZEtHRnpjMmxuYmloN2ZTd2diM0IwY3l3Z2V5Qm1hV3hsYm1GdFpTQjlLU2xjYmlBZ0lDQWdJQ0FnTG5Sb1pXNG9aWFlnUFQ0Z2NtVnpiMngyWlNobGRpa3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnY21WemIyeDJaU2g3SUdacGJHVnVZVzFsTENCamJHbGxiblE2SUdaaGJITmxJSDBwTzF4dUlDQWdJSDFjYmlBZ2ZTazdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCemRISmxZVzFUZEdGeWRDQW9iM0IwY3lBOUlIdDlLU0I3WEc0Z0lISmxkSFZ5YmlCemRISmxZVzBvZEhKMVpTd2diM0IwY3lrN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJ6ZEhKbFlXMUZibVFnS0c5d2RITWdQU0I3ZlNrZ2UxeHVJQ0J5WlhSMWNtNGdjM1J5WldGdEtHWmhiSE5sTENCdmNIUnpLVHRjYm4xY2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHVjRjRzl5ZEVOaGJuWmhjeUFvWTJGdWRtRnpMQ0J2Y0hRZ1BTQjdmU2tnZTF4dUlDQmpiMjV6ZENCbGJtTnZaR2x1WnlBOUlHOXdkQzVsYm1OdlpHbHVaeUI4ZkNBbmFXMWhaMlV2Y0c1bkp6dGNiaUFnYVdZZ0tDRnpkWEJ3YjNKMFpXUkZibU52WkdsdVozTXVhVzVqYkhWa1pYTW9aVzVqYjJScGJtY3BLU0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9ZRWx1ZG1Gc2FXUWdZMkZ1ZG1GeklHVnVZMjlrYVc1bklDUjdaVzVqYjJScGJtZDlZQ2s3WEc0Z0lHeGxkQ0JsZUhSbGJuTnBiMjRnUFNBb1pXNWpiMlJwYm1jdWMzQnNhWFFvSnk4bktWc3hYU0I4ZkNBbkp5a3VjbVZ3YkdGalpTZ3ZhbkJsWnk5cExDQW5hbkJuSnlrN1hHNGdJR2xtSUNobGVIUmxibk5wYjI0cElHVjRkR1Z1YzJsdmJpQTlJR0F1Skh0bGVIUmxibk5wYjI1OVlDNTBiMHh2ZDJWeVEyRnpaU2dwTzF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUdWNGRHVnVjMmx2Yml4Y2JpQWdJQ0IwZVhCbE9pQmxibU52WkdsdVp5eGNiaUFnSUNCa1lYUmhWVkpNT2lCallXNTJZWE11ZEc5RVlYUmhWVkpNS0dWdVkyOWthVzVuTENCdmNIUXVaVzVqYjJScGJtZFJkV0ZzYVhSNUtWeHVJQ0I5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqY21WaGRHVkNiRzlpUm5KdmJVUmhkR0ZWVWt3Z0tHUmhkR0ZWVWt3cElIdGNiaUFnY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0NoeVpYTnZiSFpsS1NBOVBpQjdYRzRnSUNBZ1kyOXVjM1FnYzNCc2FYUkpibVJsZUNBOUlHUmhkR0ZWVWt3dWFXNWtaWGhQWmlnbkxDY3BPMXh1SUNBZ0lHbG1JQ2h6Y0d4cGRFbHVaR1Y0SUQwOVBTQXRNU2tnZTF4dUlDQWdJQ0FnY21WemIyeDJaU2h1WlhjZ2QybHVaRzkzTGtKc2IySW9LU2s3WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVJQ0FnSUdOdmJuTjBJR0poYzJVMk5DQTlJR1JoZEdGVlVrd3VjMnhwWTJVb2MzQnNhWFJKYm1SbGVDQXJJREVwTzF4dUlDQWdJR052Ym5OMElHSjVkR1ZUZEhKcGJtY2dQU0IzYVc1a2IzY3VZWFJ2WWloaVlYTmxOalFwTzF4dUlDQWdJR052Ym5OMElIUjVjR1VnUFNCa1lYUmhWVkpNTG5Oc2FXTmxLREFzSUhOd2JHbDBTVzVrWlhncE8xeHVJQ0FnSUdOdmJuTjBJRzFwYldWTllYUmphQ0E5SUM5a1lYUmhPaWhiWGp0ZEt5a3ZMbVY0WldNb2RIbHdaU2s3WEc0Z0lDQWdZMjl1YzNRZ2JXbHRaU0E5SUNodGFXMWxUV0YwWTJnZ1B5QnRhVzFsVFdGMFkyaGJNVjBnT2lBbkp5a2dmSHdnZFc1a1pXWnBibVZrTzF4dUlDQWdJR052Ym5OMElHRmlJRDBnYm1WM0lFRnljbUY1UW5WbVptVnlLR0o1ZEdWVGRISnBibWN1YkdWdVozUm9LVHRjYmlBZ0lDQmpiMjV6ZENCcFlTQTlJRzVsZHlCVmFXNTBPRUZ5Y21GNUtHRmlLVHRjYmlBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR0o1ZEdWVGRISnBibWN1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHbGhXMmxkSUQwZ1lubDBaVk4wY21sdVp5NWphR0Z5UTI5a1pVRjBLR2twTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWE52YkhabEtHNWxkeUIzYVc1a2IzY3VRbXh2WWloYklHRmlJRjBzSUhzZ2RIbHdaVG9nYldsdFpTQjlLU2s3WEc0Z0lIMHBPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z2MyRjJaVVJoZEdGVlVrd2dLR1JoZEdGVlVrd3NJRzl3ZEhNZ1BTQjdmU2tnZTF4dUlDQnlaWFIxY200Z1kzSmxZWFJsUW14dllrWnliMjFFWVhSaFZWSk1LR1JoZEdGVlVrd3BYRzRnSUNBZ0xuUm9aVzRvWW14dllpQTlQaUJ6WVhabFFteHZZaWhpYkc5aUxDQnZjSFJ6S1NrN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJ6WVhabFFteHZZaUFvWW14dllpd2diM0IwY3lBOUlIdDlLU0I3WEc0Z0lISmxkSFZ5YmlCdVpYY2dVSEp2YldselpTaHlaWE52YkhabElEMCtJSHRjYmlBZ0lDQnZjSFJ6SUQwZ1lYTnphV2R1S0h0OUxDQmtaV1poZFd4MFJYaDBjeXdnYjNCMGN5azdYRzRnSUNBZ1kyOXVjM1FnWm1sc1pXNWhiV1VnUFNCdmNIUnpMbVpwYkdWdVlXMWxPMXh1WEc0Z0lDQWdZMjl1YzNRZ1kyeHBaVzUwSUQwZ1oyVjBRMnhwWlc1MFFWQkpLQ2s3WEc0Z0lDQWdhV1lnS0dOc2FXVnVkQ0FtSmlCMGVYQmxiMllnWTJ4cFpXNTBMbk5oZG1WQ2JHOWlJRDA5UFNBblpuVnVZM1JwYjI0bklDWW1JR05zYVdWdWRDNXZkWFJ3ZFhRcElIdGNiaUFnSUNBZ0lDOHZJRzVoZEdsMlpTQnpZWFpwYm1jZ2RYTnBibWNnWVNCRFRFa2dkRzl2YkZ4dUlDQWdJQ0FnY21WMGRYSnVJR05zYVdWdWRDNXpZWFpsUW14dllpaGliRzlpTENCaGMzTnBaMjRvZTMwc0lHOXdkSE1zSUhzZ1ptbHNaVzVoYldVZ2ZTa3BYRzRnSUNBZ0lDQWdJQzUwYUdWdUtHVjJJRDArSUhKbGMyOXNkbVVvWlhZcEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnTHk4Z1ptOXlZMlVnWkc5M2JteHZZV1JjYmlBZ0lDQWdJR2xtSUNnaGJHbHVheWtnZTF4dUlDQWdJQ0FnSUNCc2FXNXJJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25ZU2NwTzF4dUlDQWdJQ0FnSUNCc2FXNXJMbk4wZVd4bExuWnBjMmxpYVd4cGRIa2dQU0FuYUdsa1pHVnVKenRjYmlBZ0lDQWdJQ0FnYkdsdWF5NTBZWEpuWlhRZ1BTQW5YMkpzWVc1ckp6dGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lHeHBibXN1Wkc5M2JteHZZV1FnUFNCbWFXeGxibUZ0WlR0Y2JpQWdJQ0FnSUd4cGJtc3VhSEpsWmlBOUlIZHBibVJ2ZHk1VlVrd3VZM0psWVhSbFQySnFaV04wVlZKTUtHSnNiMklwTzF4dUlDQWdJQ0FnWkc5amRXMWxiblF1WW05a2VTNWhjSEJsYm1SRGFHbHNaQ2hzYVc1cktUdGNiaUFnSUNBZ0lHeHBibXN1YjI1amJHbGpheUE5SUNncElEMCtJSHRjYmlBZ0lDQWdJQ0FnYkdsdWF5NXZibU5zYVdOcklEMGdibTl2Y0R0Y2JpQWdJQ0FnSUNBZ2MyVjBWR2x0Wlc5MWRDZ29LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdkMmx1Wkc5M0xsVlNUQzV5WlhadmEyVlBZbXBsWTNSVlVrd29ZbXh2WWlrN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0d4cGJtc3VjR0Z5Wlc1MFJXeGxiV1Z1ZENrZ2JHbHVheTV3WVhKbGJuUkZiR1Z0Wlc1MExuSmxiVzkyWlVOb2FXeGtLR3hwYm1zcE8xeHVJQ0FnSUNBZ0lDQWdJR3hwYm1zdWNtVnRiM1psUVhSMGNtbGlkWFJsS0Nkb2NtVm1KeWs3WEc0Z0lDQWdJQ0FnSUNBZ2NtVnpiMngyWlNoN0lHWnBiR1Z1WVcxbExDQmpiR2xsYm5RNklHWmhiSE5sSUgwcE8xeHVJQ0FnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0JzYVc1ckxtTnNhV05yS0NrN1hHNGdJQ0FnZlZ4dUlDQjlLVHRjYm4xY2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlITmhkbVZHYVd4bElDaGtZWFJoTENCdmNIUnpJRDBnZTMwcElIdGNiaUFnWTI5dWMzUWdjR0Z5ZEhNZ1BTQkJjbkpoZVM1cGMwRnljbUY1S0dSaGRHRXBJRDhnWkdGMFlTQTZJRnNnWkdGMFlTQmRPMXh1SUNCamIyNXpkQ0JpYkc5aUlEMGdibVYzSUhkcGJtUnZkeTVDYkc5aUtIQmhjblJ6TENCN0lIUjVjR1U2SUc5d2RITXVkSGx3WlNCOGZDQW5KeUI5S1R0Y2JpQWdjbVYwZFhKdUlITmhkbVZDYkc5aUtHSnNiMklzSUc5d2RITXBPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1oyVjBWR2x0WlZOMFlXMXdJQ2dwSUh0Y2JpQWdZMjl1YzNRZ1pHRjBaVVp2Y20xaGRGTjBjaUE5SUdCNWVYbDVMbTF0TG1Sa0xVaElMazFOTG5OellEdGNiaUFnY21WMGRYSnVJR1JoZEdWbWIzSnRZWFFvYm1WM0lFUmhkR1VvS1N3Z1pHRjBaVVp2Y20xaGRGTjBjaWs3WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm5aWFJFWldaaGRXeDBSbWxzWlNBb2NISmxabWw0SUQwZ0p5Y3NJSE4xWm1acGVDQTlJQ2NuTENCbGVIUXBJSHRjYmlBZ0x5OGdZMjl1YzNRZ1pHRjBaVVp2Y20xaGRGTjBjaUE5SUdCNWVYbDVMbTF0TG1Sa0xVaElMazFOTG5OellEdGNiaUFnWTI5dWMzUWdaR0YwWlVadmNtMWhkRk4wY2lBOUlHQjVlWGw1TFcxdExXUmtJQ2RoZENjZ2FDNU5UUzV6Y3lCVVZHQTdYRzRnSUhKbGRIVnliaUJnSkh0d2NtVm1hWGg5Skh0a1lYUmxabTl5YldGMEtHNWxkeUJFWVhSbEtDa3NJR1JoZEdWR2IzSnRZWFJUZEhJcGZTUjdjM1ZtWm1sNGZTUjdaWGgwZldBN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJ5WlhOdmJIWmxSbWxzWlc1aGJXVWdLRzl3ZENBOUlIdDlLU0I3WEc0Z0lHOXdkQ0E5SUdGemMybG5iaWg3ZlN3Z2IzQjBLVHRjYmx4dUlDQXZMeUJEZFhOMGIyMGdabWxzWlc1aGJXVWdablZ1WTNScGIyNWNiaUFnYVdZZ0tIUjVjR1Z2WmlCdmNIUXVabWxzWlNBOVBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJSEpsZEhWeWJpQnZjSFF1Wm1sc1pTaHZjSFFwTzF4dUlDQjlJR1ZzYzJVZ2FXWWdLRzl3ZEM1bWFXeGxLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHOXdkQzVtYVd4bE8xeHVJQ0I5WEc1Y2JpQWdiR1YwSUdaeVlXMWxJRDBnYm5Wc2JEdGNiaUFnYkdWMElHVjRkR1Z1YzJsdmJpQTlJQ2NuTzF4dUlDQnBaaUFvZEhsd1pXOW1JRzl3ZEM1bGVIUmxibk5wYjI0Z1BUMDlJQ2R6ZEhKcGJtY25LU0JsZUhSbGJuTnBiMjRnUFNCdmNIUXVaWGgwWlc1emFXOXVPMXh1WEc0Z0lHbG1JQ2gwZVhCbGIyWWdiM0IwTG1aeVlXMWxJRDA5UFNBbmJuVnRZbVZ5SnlrZ2UxeHVJQ0FnSUd4bGRDQjBiM1JoYkVaeVlXMWxjenRjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JRzl3ZEM1MGIzUmhiRVp5WVcxbGN5QTlQVDBnSjI1MWJXSmxjaWNwSUh0Y2JpQWdJQ0FnSUhSdmRHRnNSbkpoYldWeklEMGdiM0IwTG5SdmRHRnNSbkpoYldWek8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IwYjNSaGJFWnlZVzFsY3lBOUlFMWhkR2d1YldGNEtERXdNREF3TENCdmNIUXVabkpoYldVcE8xeHVJQ0FnSUgxY2JpQWdJQ0JtY21GdFpTQTlJSEJoWkV4bFpuUW9VM1J5YVc1bktHOXdkQzVtY21GdFpTa3NJRk4wY21sdVp5aDBiM1JoYkVaeVlXMWxjeWt1YkdWdVozUm9MQ0FuTUNjcE8xeHVJQ0I5WEc1Y2JpQWdZMjl1YzNRZ2JHRjVaWEpUZEhJZ1BTQnBjMFpwYm1sMFpTaHZjSFF1ZEc5MFlXeE1ZWGxsY25NcElDWW1JR2x6Um1sdWFYUmxLRzl3ZEM1c1lYbGxjaWtnSmlZZ2IzQjBMblJ2ZEdGc1RHRjVaWEp6SUQ0Z01TQS9JR0FrZTI5d2RDNXNZWGxsY24xZ0lEb2dKeWM3WEc0Z0lHbG1JQ2htY21GdFpTQWhQU0J1ZFd4c0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUZzZ2JHRjVaWEpUZEhJc0lHWnlZVzFsSUYwdVptbHNkR1Z5S0VKdmIyeGxZVzRwTG1wdmFXNG9KeTBuS1NBcklHVjRkR1Z1YzJsdmJqdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmpiMjV6ZENCa1pXWmhkV3gwUm1sc1pVNWhiV1VnUFNCdmNIUXVkR2x0WlZOMFlXMXdPMXh1SUNBZ0lISmxkSFZ5YmlCYklHOXdkQzV3Y21WbWFYZ3NJRzl3ZEM1dVlXMWxJSHg4SUdSbFptRjFiSFJHYVd4bFRtRnRaU3dnYkdGNVpYSlRkSElzSUc5d2RDNW9ZWE5vTENCdmNIUXVjM1ZtWm1sNElGMHVabWxzZEdWeUtFSnZiMnhsWVc0cExtcHZhVzRvSnkwbktTQXJJR1Y0ZEdWdWMybHZianRjYmlBZ2ZWeHVmVnh1SWl3aUx5OGdTR0Z1Wkd4bElITnZiV1VnWTI5dGJXOXVJSFI1Y0c5elhHNWpiMjV6ZENCamIyMXRiMjVVZVhCdmN5QTlJSHRjYmlBZ1pHbHRaVzV6YVc5dU9pQW5aR2x0Wlc1emFXOXVjeWNzWEc0Z0lHRnVhVzFoZEdWa09pQW5ZVzVwYldGMFpTY3NYRzRnSUdGdWFXMWhkR2x1WnpvZ0oyRnVhVzFoZEdVbkxGeHVJQ0IxYm1sME9pQW5kVzVwZEhNbkxGeHVJQ0JRTlRvZ0ozQTFKeXhjYmlBZ2NHbDRaV3hzWVhSbFpEb2dKM0JwZUdWc1lYUmxaQ2NzWEc0Z0lHeHZiM0JwYm1jNklDZHNiMjl3Snl4Y2JpQWdjR2w0Wld4UVpYSkpibU5vT2lBbmNHbDRaV3h6SjF4dWZUdGNibHh1THk4Z1NHRnVaR3hsSUdGc2JDQnZkR2hsY2lCMGVYQnZjMXh1WTI5dWMzUWdZV3hzUzJWNWN5QTlJRnRjYmlBZ0oyUnBiV1Z1YzJsdmJuTW5MQ0FuZFc1cGRITW5MQ0FuY0dsNFpXeHpVR1Z5U1c1amFDY3NJQ2R2Y21sbGJuUmhkR2x2Ymljc1hHNGdJQ2R6WTJGc1pWUnZSbWwwSnl3Z0ozTmpZV3hsVkc5V2FXVjNKeXdnSjJKc1pXVmtKeXdnSjNCcGVHVnNVbUYwYVc4bkxGeHVJQ0FuWlhod2IzSjBVR2w0Wld4U1lYUnBieWNzSUNkdFlYaFFhWGhsYkZKaGRHbHZKeXdnSjNOallXeGxRMjl1ZEdWNGRDY3NYRzRnSUNkeVpYTnBlbVZEWVc1MllYTW5MQ0FuYzNSNWJHVkRZVzUyWVhNbkxDQW5ZMkZ1ZG1Gekp5d2dKMk52Ym5SbGVIUW5MQ0FuWVhSMGNtbGlkWFJsY3ljc1hHNGdJQ2R3WVhKbGJuUW5MQ0FuWm1sc1pTY3NJQ2R1WVcxbEp5d2dKM0J5WldacGVDY3NJQ2R6ZFdabWFYZ25MQ0FuWVc1cGJXRjBaU2NzSUNkd2JHRjVhVzVuSnl4Y2JpQWdKMnh2YjNBbkxDQW5aSFZ5WVhScGIyNG5MQ0FuZEc5MFlXeEdjbUZ0WlhNbkxDQW5abkJ6Snl3Z0ozQnNZWGxpWVdOclVtRjBaU2NzSUNkMGFXMWxVMk5oYkdVbkxGeHVJQ0FuWm5KaGJXVW5MQ0FuZEdsdFpTY3NJQ2RtYkhWemFDY3NJQ2R3YVhobGJHRjBaV1FuTENBbmFHOTBhMlY1Y3ljc0lDZHdOU2NzSUNkcFpDY3NYRzRnSUNkelkyRnNaVlJ2Um1sMFVHRmtaR2x1Wnljc0lDZGtZWFJoSnl3Z0ozQmhjbUZ0Y3ljc0lDZGxibU52WkdsdVp5Y3NJQ2RsYm1OdlpHbHVaMUYxWVd4cGRIa25YRzVkTzF4dVhHNHZMeUJVYUdseklHbHpJR1poYVhKc2VTQnZjR2x1YVc5dVlYUmxaQ0JoYm1RZ1ptOXlZMlZ6SUhWelpYSnpJSFJ2SUhWelpTQjBhR1VnSjJSaGRHRW5JSEJoY21GdFpYUmxjbHh1THk4Z2FXWWdkR2hsZVNCM1lXNTBJSFJ2SUhCaGMzTWdZV3h2Ym1jZ2JtOXVMWE5sZEhScGJtY2diMkpxWldOMGN5NHVMbHh1Wlhod2IzSjBJR052Ym5OMElHTm9aV05yVTJWMGRHbHVaM01nUFNBb2MyVjBkR2x1WjNNcElEMCtJSHRjYmlBZ1kyOXVjM1FnYTJWNWN5QTlJRTlpYW1WamRDNXJaWGx6S0hObGRIUnBibWR6S1R0Y2JpQWdhMlY1Y3k1bWIzSkZZV05vS0d0bGVTQTlQaUI3WEc0Z0lDQWdhV1lnS0d0bGVTQnBiaUJqYjIxdGIyNVVlWEJ2Y3lrZ2UxeHVJQ0FnSUNBZ1kyOXVjM1FnWVdOMGRXRnNJRDBnWTI5dGJXOXVWSGx3YjNOYmEyVjVYVHRjYmlBZ0lDQWdJR052Ym5OdmJHVXVkMkZ5YmloZ1cyTmhiblpoY3kxemEyVjBZMmhkSUVOdmRXeGtJRzV2ZENCeVpXTnZaMjVwZW1VZ2RHaGxJSE5sZEhScGJtY2dYQ0lrZTJ0bGVYMWNJaXdnWkdsa0lIbHZkU0J0WldGdUlGd2lKSHRoWTNSMVlXeDlYQ0kvWUNrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNnaFlXeHNTMlY1Y3k1cGJtTnNkV1JsY3loclpYa3BLU0I3WEc0Z0lDQWdJQ0JqYjI1emIyeGxMbmRoY200b1lGdGpZVzUyWVhNdGMydGxkR05vWFNCRGIzVnNaQ0J1YjNRZ2NtVmpiMmR1YVhwbElIUm9aU0J6WlhSMGFXNW5JRndpSkh0clpYbDlYQ0pnS1R0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1ZlR0Y2JpSXNJbWx0Y0c5eWRDQjdJR2RsZEVOc2FXVnVkRUZRU1NCOUlHWnliMjBnSnk0dUwzVjBhV3duTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlBb2IzQjBJRDBnZTMwcElIdGNiaUFnWTI5dWMzUWdhR0Z1Wkd4bGNpQTlJR1YySUQwK0lIdGNiaUFnSUNCcFppQW9JVzl3ZEM1bGJtRmliR1ZrS0NrcElISmxkSFZ5Ymp0Y2JseHVJQ0FnSUdOdmJuTjBJR05zYVdWdWRDQTlJR2RsZEVOc2FXVnVkRUZRU1NncE8xeHVJQ0FnSUdsbUlDaGxkaTVyWlhsRGIyUmxJRDA5UFNBNE15QW1KaUFoWlhZdVlXeDBTMlY1SUNZbUlDaGxkaTV0WlhSaFMyVjVJSHg4SUdWMkxtTjBjbXhMWlhrcEtTQjdYRzRnSUNBZ0lDQXZMeUJEYldRZ0t5QlRYRzRnSUNBZ0lDQmxkaTV3Y21WMlpXNTBSR1ZtWVhWc2RDZ3BPMXh1SUNBZ0lDQWdiM0IwTG5OaGRtVW9aWFlwTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWlhZdWEyVjVRMjlrWlNBOVBUMGdNeklwSUh0Y2JpQWdJQ0FnSUM4dklGTndZV05sWEc0Z0lDQWdJQ0F2THlCVVQwUlBPaUIzYUdGMElIUnZJR1J2SUhkcGRHZ2dkR2hwY3o4Z2EyVmxjQ0JwZEN3Z2IzSWdjbVZ0YjNabElHbDBQMXh1SUNBZ0lDQWdiM0IwTG5SdloyZHNaVkJzWVhrb1pYWXBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9ZMnhwWlc1MElDWW1JQ0ZsZGk1aGJIUkxaWGtnSmlZZ1pYWXVhMlY1UTI5a1pTQTlQVDBnTnpVZ0ppWWdLR1YyTG0xbGRHRkxaWGtnZkh3Z1pYWXVZM1J5YkV0bGVTa3BJSHRjYmlBZ0lDQWdJQzh2SUVOdFpDQXJJRXNzSUc5dWJIa2dkMmhsYmlCallXNTJZWE10YzJ0bGRHTm9MV05zYVNCcGN5QjFjMlZrWEc0Z0lDQWdJQ0JsZGk1d2NtVjJaVzUwUkdWbVlYVnNkQ2dwTzF4dUlDQWdJQ0FnYjNCMExtTnZiVzFwZENobGRpazdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJR052Ym5OMElHRjBkR0ZqYUNBOUlDZ3BJRDArSUh0Y2JpQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25hMlY1Wkc5M2JpY3NJR2hoYm1Sc1pYSXBPMXh1SUNCOU8xeHVYRzRnSUdOdmJuTjBJR1JsZEdGamFDQTlJQ2dwSUQwK0lIdGNiaUFnSUNCM2FXNWtiM2N1Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2lnbmEyVjVaRzkzYmljc0lHaGhibVJzWlhJcE8xeHVJQ0I5TzF4dVhHNGdJSEpsZEhWeWJpQjdYRzRnSUNBZ1lYUjBZV05vTEZ4dUlDQWdJR1JsZEdGamFGeHVJQ0I5TzF4dWZWeHVJaXdpWTI5dWMzUWdaR1ZtWVhWc2RGVnVhWFJ6SUQwZ0oyMXRKenRjYmx4dVkyOXVjM1FnWkdGMFlTQTlJRnRjYmlBZ0x5OGdRMjl0Ylc5dUlGQmhjR1Z5SUZOcGVtVnpYRzRnSUM4dklDaE5iM04wYkhrZ1RtOXlkR2d0UVcxbGNtbGpZVzRnWW1GelpXUXBYRzRnSUZzZ0ozQnZjM1JqWVhKa0p5d2dNVEF4TGpZc0lERTFNaTQwSUYwc1hHNGdJRnNnSjNCdmMzUmxjaTF6YldGc2JDY3NJREk0TUN3Z05ETXdJRjBzWEc0Z0lGc2dKM0J2YzNSbGNpY3NJRFEyTUN3Z05qRXdJRjBzWEc0Z0lGc2dKM0J2YzNSbGNpMXNZWEpuWlNjc0lEWXhNQ3dnT1RFd0lGMHNYRzRnSUZzZ0oySjFjMmx1WlhOekxXTmhjbVFuTENBMU1DNDRMQ0E0T0M0NUlGMHNYRzVjYmlBZ0x5OGdVR2h2ZEc5bmNtRndhR2xqSUZCeWFXNTBJRkJoY0dWeUlGTnBlbVZ6WEc0Z0lGc2dKekp5Snl3Z05qUXNJRGc1SUYwc1hHNGdJRnNnSnpOeUp5d2dPRGtzSURFeU55QmRMRnh1SUNCYklDYzBjaWNzSURFd01pd2dNVFV5SUYwc1hHNGdJRnNnSnpWeUp5d2dNVEkzTENBeE56Z2dYU3dnTHk4Z05lS0FzM2czNG9DelhHNGdJRnNnSnpaeUp5d2dNVFV5TENBeU1ETWdYU3dnTHk4Z051S0FzM2c0NG9DelhHNGdJRnNnSnpoeUp5d2dNakF6TENBeU5UUWdYU3dnTHk4Z09PS0FzM2d4TU9LQXMxeHVJQ0JiSUNjeE1ISW5MQ0F5TlRRc0lETXdOU0JkTENBdkx5QXhNT0tBczNneE11S0FzMXh1SUNCYklDY3hNWEluTENBeU56a3NJRE0xTmlCZExDQXZMeUF4TWVLQXMzZ3hOT0tBczF4dUlDQmJJQ2N4TW5JbkxDQXpNRFVzSURNNE1TQmRMRnh1WEc0Z0lDOHZJRk4wWVc1a1lYSmtJRkJoY0dWeUlGTnBlbVZ6WEc0Z0lGc2dKMkV3Snl3Z09EUXhMQ0F4TVRnNUlGMHNYRzRnSUZzZ0oyRXhKeXdnTlRrMExDQTROREVnWFN4Y2JpQWdXeUFuWVRJbkxDQTBNakFzSURVNU5DQmRMRnh1SUNCYklDZGhNeWNzSURJNU55d2dOREl3SUYwc1hHNGdJRnNnSjJFMEp5d2dNakV3TENBeU9UY2dYU3hjYmlBZ1d5QW5ZVFVuTENBeE5EZ3NJREl4TUNCZExGeHVJQ0JiSUNkaE5pY3NJREV3TlN3Z01UUTRJRjBzWEc0Z0lGc2dKMkUzSnl3Z056UXNJREV3TlNCZExGeHVJQ0JiSUNkaE9DY3NJRFV5TENBM05DQmRMRnh1SUNCYklDZGhPU2NzSURNM0xDQTFNaUJkTEZ4dUlDQmJJQ2RoTVRBbkxDQXlOaXdnTXpjZ1hTeGNiaUFnV3lBbk1tRXdKeXdnTVRFNE9Td2dNVFk0TWlCZExGeHVJQ0JiSUNjMFlUQW5MQ0F4TmpneUxDQXlNemM0SUYwc1hHNGdJRnNnSjJJd0p5d2dNVEF3TUN3Z01UUXhOQ0JkTEZ4dUlDQmJJQ2RpTVNjc0lEY3dOeXdnTVRBd01DQmRMRnh1SUNCYklDZGlNU3NuTENBM01qQXNJREV3TWpBZ1hTeGNiaUFnV3lBbllqSW5MQ0ExTURBc0lEY3dOeUJkTEZ4dUlDQmJJQ2RpTWlzbkxDQTFNakFzSURjeU1DQmRMRnh1SUNCYklDZGlNeWNzSURNMU15d2dOVEF3SUYwc1hHNGdJRnNnSjJJMEp5d2dNalV3TENBek5UTWdYU3hjYmlBZ1d5QW5ZalVuTENBeE56WXNJREkxTUNCZExGeHVJQ0JiSUNkaU5pY3NJREV5TlN3Z01UYzJJRjBzWEc0Z0lGc2dKMkkzSnl3Z09EZ3NJREV5TlNCZExGeHVJQ0JiSUNkaU9DY3NJRFl5TENBNE9DQmRMRnh1SUNCYklDZGlPU2NzSURRMExDQTJNaUJkTEZ4dUlDQmJJQ2RpTVRBbkxDQXpNU3dnTkRRZ1hTeGNiaUFnV3lBbllqRXhKeXdnTWpJc0lETXlJRjBzWEc0Z0lGc2dKMkl4TWljc0lERTJMQ0F5TWlCZExGeHVJQ0JiSUNkak1DY3NJRGt4Tnl3Z01USTVOeUJkTEZ4dUlDQmJJQ2RqTVNjc0lEWTBPQ3dnT1RFM0lGMHNYRzRnSUZzZ0oyTXlKeXdnTkRVNExDQTJORGdnWFN4Y2JpQWdXeUFuWXpNbkxDQXpNalFzSURRMU9DQmRMRnh1SUNCYklDZGpOQ2NzSURJeU9Td2dNekkwSUYwc1hHNGdJRnNnSjJNMUp5d2dNVFl5TENBeU1qa2dYU3hjYmlBZ1d5QW5ZelluTENBeE1UUXNJREUyTWlCZExGeHVJQ0JiSUNkak55Y3NJRGd4TENBeE1UUWdYU3hjYmlBZ1d5QW5ZemduTENBMU55d2dPREVnWFN4Y2JpQWdXeUFuWXprbkxDQTBNQ3dnTlRjZ1hTeGNiaUFnV3lBbll6RXdKeXdnTWpnc0lEUXdJRjBzWEc0Z0lGc2dKMk14TVNjc0lESXlMQ0F6TWlCZExGeHVJQ0JiSUNkak1USW5MQ0F4Tml3Z01qSWdYU3hjYmx4dUlDQXZMeUJWYzJVZ2FXNWphR1Z6SUdadmNpQk9iM0owYUNCQmJXVnlhV05oYmlCemFYcGxjeXhjYmlBZ0x5OGdZWE1nYVhRZ2NISnZaSFZqWlhNZ2JHVnpjeUJtYkc5aGRDQndjbVZqYVhOcGIyNGdaWEp5YjNKelhHNGdJRnNnSjJoaGJHWXRiR1YwZEdWeUp5d2dOUzQxTENBNExqVXNJQ2RwYmljZ1hTeGNiaUFnV3lBbmJHVjBkR1Z5Snl3Z09DNDFMQ0F4TVN3Z0oybHVKeUJkTEZ4dUlDQmJJQ2RzWldkaGJDY3NJRGd1TlN3Z01UUXNJQ2RwYmljZ1hTeGNiaUFnV3lBbmFuVnVhVzl5TFd4bFoyRnNKeXdnTlN3Z09Dd2dKMmx1SnlCZExGeHVJQ0JiSUNkc1pXUm5aWEluTENBeE1Td2dNVGNzSUNkcGJpY2dYU3hjYmlBZ1d5QW5kR0ZpYkc5cFpDY3NJREV4TENBeE55d2dKMmx1SnlCZExGeHVJQ0JiSUNkaGJuTnBMV0VuTENBNExqVXNJREV4TGpBc0lDZHBiaWNnWFN4Y2JpQWdXeUFuWVc1emFTMWlKeXdnTVRFdU1Dd2dNVGN1TUN3Z0oybHVKeUJkTEZ4dUlDQmJJQ2RoYm5OcExXTW5MQ0F4Tnk0d0xDQXlNaTR3TENBbmFXNG5JRjBzWEc0Z0lGc2dKMkZ1YzJrdFpDY3NJREl5TGpBc0lETTBMakFzSUNkcGJpY2dYU3hjYmlBZ1d5QW5ZVzV6YVMxbEp5d2dNelF1TUN3Z05EUXVNQ3dnSjJsdUp5QmRMRnh1SUNCYklDZGhjbU5vTFdFbkxDQTVMQ0F4TWl3Z0oybHVKeUJkTEZ4dUlDQmJJQ2RoY21Ob0xXSW5MQ0F4TWl3Z01UZ3NJQ2RwYmljZ1hTeGNiaUFnV3lBbllYSmphQzFqSnl3Z01UZ3NJREkwTENBbmFXNG5JRjBzWEc0Z0lGc2dKMkZ5WTJndFpDY3NJREkwTENBek5pd2dKMmx1SnlCZExGeHVJQ0JiSUNkaGNtTm9MV1VuTENBek5pd2dORGdzSUNkcGJpY2dYU3hjYmlBZ1d5QW5ZWEpqYUMxbE1TY3NJRE13TENBME1pd2dKMmx1SnlCZExGeHVJQ0JiSUNkaGNtTm9MV1V5Snl3Z01qWXNJRE00TENBbmFXNG5JRjBzWEc0Z0lGc2dKMkZ5WTJndFpUTW5MQ0F5Tnl3Z016a3NJQ2RwYmljZ1hWeHVYVHRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWkdGMFlTNXlaV1IxWTJVb0tHUnBZM1FzSUhCeVpYTmxkQ2tnUFQ0Z2UxeHVJQ0JqYjI1emRDQnBkR1Z0SUQwZ2UxeHVJQ0FnSUhWdWFYUnpPaUJ3Y21WelpYUmJNMTBnZkh3Z1pHVm1ZWFZzZEZWdWFYUnpMRnh1SUNBZ0lHUnBiV1Z1YzJsdmJuTTZJRnNnY0hKbGMyVjBXekZkTENCd2NtVnpaWFJiTWwwZ1hWeHVJQ0I5TzF4dUlDQmthV04wVzNCeVpYTmxkRnN3WFYwZ1BTQnBkR1Z0TzF4dUlDQmthV04wVzNCeVpYTmxkRnN3WFM1eVpYQnNZV05sS0M4dEwyY3NJQ2NnSnlsZElEMGdhWFJsYlR0Y2JpQWdjbVYwZFhKdUlHUnBZM1E3WEc1OUxDQjdmU2s3WEc0aUxDSnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvWVhKbmRXMWxiblJ6VzJsZElDRTlQU0IxYm1SbFptbHVaV1FwSUhKbGRIVnliaUJoY21kMWJXVnVkSE5iYVYwN1hHNGdJQ0FnZlZ4dWZUdGNiaUlzSW5aaGNpQmtaV1pwYm1Wa0lEMGdjbVZ4ZFdseVpTZ25aR1ZtYVc1bFpDY3BPMXh1ZG1GeUlIVnVhWFJ6SUQwZ1d5QW5iVzBuTENBblkyMG5MQ0FuYlNjc0lDZHdZeWNzSUNkd2RDY3NJQ2RwYmljc0lDZG1kQ2NzSUNkd2VDY2dYVHRjYmx4dWRtRnlJR052Ym5abGNuTnBiMjV6SUQwZ2UxeHVJQ0F2THlCdFpYUnlhV05jYmlBZ2JUb2dlMXh1SUNBZ0lITjVjM1JsYlRvZ0oyMWxkSEpwWXljc1hHNGdJQ0FnWm1GamRHOXlPaUF4WEc0Z0lIMHNYRzRnSUdOdE9pQjdYRzRnSUNBZ2MzbHpkR1Z0T2lBbmJXVjBjbWxqSnl4Y2JpQWdJQ0JtWVdOMGIzSTZJREVnTHlBeE1EQmNiaUFnZlN4Y2JpQWdiVzA2SUh0Y2JpQWdJQ0J6ZVhOMFpXMDZJQ2R0WlhSeWFXTW5MRnh1SUNBZ0lHWmhZM1J2Y2pvZ01TQXZJREV3TURCY2JpQWdmU3hjYmlBZ0x5OGdhVzF3WlhKcFlXeGNiaUFnY0hRNklIdGNiaUFnSUNCemVYTjBaVzA2SUNkcGJYQmxjbWxoYkNjc1hHNGdJQ0FnWm1GamRHOXlPaUF4SUM4Z056SmNiaUFnZlN4Y2JpQWdjR002SUh0Y2JpQWdJQ0J6ZVhOMFpXMDZJQ2RwYlhCbGNtbGhiQ2NzWEc0Z0lDQWdabUZqZEc5eU9pQXhJQzhnTmx4dUlDQjlMRnh1SUNCcGJqb2dlMXh1SUNBZ0lITjVjM1JsYlRvZ0oybHRjR1Z5YVdGc0p5eGNiaUFnSUNCbVlXTjBiM0k2SURGY2JpQWdmU3hjYmlBZ1puUTZJSHRjYmlBZ0lDQnplWE4wWlcwNklDZHBiWEJsY21saGJDY3NYRzRnSUNBZ1ptRmpkRzl5T2lBeE1seHVJQ0I5WEc1OU8xeHVYRzVqYjI1emRDQmhibU5vYjNKeklEMGdlMXh1SUNCdFpYUnlhV002SUh0Y2JpQWdJQ0IxYm1sME9pQW5iU2NzWEc0Z0lDQWdjbUYwYVc4NklERWdMeUF3TGpBeU5UUmNiaUFnZlN4Y2JpQWdhVzF3WlhKcFlXdzZJSHRjYmlBZ0lDQjFibWwwT2lBbmFXNG5MRnh1SUNBZ0lISmhkR2x2T2lBd0xqQXlOVFJjYmlBZ2ZWeHVmVHRjYmx4dVpuVnVZM1JwYjI0Z2NtOTFibVFnS0haaGJIVmxMQ0JrWldOcGJXRnNjeWtnZTF4dUlDQnlaWFIxY200Z1RuVnRZbVZ5S0UxaGRHZ3VjbTkxYm1Rb2RtRnNkV1VnS3lBblpTY2dLeUJrWldOcGJXRnNjeWtnS3lBblpTMG5JQ3NnWkdWamFXMWhiSE1wTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYjI1MlpYSjBSR2x6ZEdGdVkyVWdLSFpoYkhWbExDQm1jbTl0Vlc1cGRDd2dkRzlWYm1sMExDQnZjSFJ6S1NCN1hHNGdJR2xtSUNoMGVYQmxiMllnZG1Gc2RXVWdJVDA5SUNkdWRXMWlaWEluSUh4OElDRnBjMFpwYm1sMFpTaDJZV3gxWlNrcElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblZtRnNkV1VnYlhWemRDQmlaU0JoSUdacGJtbDBaU0J1ZFcxaVpYSW5LVHRjYmlBZ2FXWWdLQ0ZtY205dFZXNXBkQ0I4ZkNBaGRHOVZibWwwS1NCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjAxMWMzUWdjM0JsWTJsbWVTQm1jbTl0SUdGdVpDQjBieUIxYm1sMGN5Y3BPMXh1WEc0Z0lHOXdkSE1nUFNCdmNIUnpJSHg4SUh0OU8xeHVJQ0IyWVhJZ2NHbDRaV3h6VUdWeVNXNWphQ0E5SUdSbFptbHVaV1FvYjNCMGN5NXdhWGhsYkhOUVpYSkpibU5vTENBNU5pazdYRzRnSUhaaGNpQndjbVZqYVhOcGIyNGdQU0J2Y0hSekxuQnlaV05wYzJsdmJqdGNiaUFnZG1GeUlISnZkVzVrVUdsNFpXd2dQU0J2Y0hSekxuSnZkVzVrVUdsNFpXd2dJVDA5SUdaaGJITmxPMXh1WEc0Z0lHWnliMjFWYm1sMElEMGdabkp2YlZWdWFYUXVkRzlNYjNkbGNrTmhjMlVvS1R0Y2JpQWdkRzlWYm1sMElEMGdkRzlWYm1sMExuUnZURzkzWlhKRFlYTmxLQ2s3WEc1Y2JpQWdhV1lnS0hWdWFYUnpMbWx1WkdWNFQyWW9abkp2YlZWdWFYUXBJRDA5UFNBdE1Ta2dkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZEpiblpoYkdsa0lHWnliMjBnZFc1cGRDQmNJaWNnS3lCbWNtOXRWVzVwZENBcklDZGNJaXdnYlhWemRDQmlaU0J2Ym1VZ2IyWTZJQ2NnS3lCMWJtbDBjeTVxYjJsdUtDY3NJQ2NwS1R0Y2JpQWdhV1lnS0hWdWFYUnpMbWx1WkdWNFQyWW9kRzlWYm1sMEtTQTlQVDBnTFRFcElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblNXNTJZV3hwWkNCbWNtOXRJSFZ1YVhRZ1hDSW5JQ3NnZEc5VmJtbDBJQ3NnSjF3aUxDQnRkWE4wSUdKbElHOXVaU0J2WmpvZ0p5QXJJSFZ1YVhSekxtcHZhVzRvSnl3Z0p5a3BPMXh1WEc0Z0lHbG1JQ2htY205dFZXNXBkQ0E5UFQwZ2RHOVZibWwwS1NCN1hHNGdJQ0FnTHk4Z1YyVWdaRzl1SjNRZ2JtVmxaQ0IwYnlCamIyNTJaWEowSUdaeWIyMGdRU0IwYnlCQ0lITnBibU5sSUhSb1pYa2dZWEpsSUhSb1pTQnpZVzFsSUdGc2NtVmhaSGxjYmlBZ0lDQnlaWFIxY200Z2RtRnNkV1U3WEc0Z0lIMWNibHh1SUNCMllYSWdkRzlHWVdOMGIzSWdQU0F4TzF4dUlDQjJZWElnWm5KdmJVWmhZM1J2Y2lBOUlERTdYRzRnSUhaaGNpQnBjMVJ2VUdsNFpXd2dQU0JtWVd4elpUdGNibHh1SUNCcFppQW9abkp2YlZWdWFYUWdQVDA5SUNkd2VDY3BJSHRjYmlBZ0lDQm1jbTl0Um1GamRHOXlJRDBnTVNBdklIQnBlR1ZzYzFCbGNrbHVZMmc3WEc0Z0lDQWdabkp2YlZWdWFYUWdQU0FuYVc0bk8xeHVJQ0I5WEc0Z0lHbG1JQ2gwYjFWdWFYUWdQVDA5SUNkd2VDY3BJSHRjYmlBZ0lDQnBjMVJ2VUdsNFpXd2dQU0IwY25WbE8xeHVJQ0FnSUhSdlJtRmpkRzl5SUQwZ2NHbDRaV3h6VUdWeVNXNWphRHRjYmlBZ0lDQjBiMVZ1YVhRZ1BTQW5hVzRuTzF4dUlDQjlYRzVjYmlBZ2RtRnlJR1p5YjIxVmJtbDBSR0YwWVNBOUlHTnZiblpsY25OcGIyNXpXMlp5YjIxVmJtbDBYVHRjYmlBZ2RtRnlJSFJ2Vlc1cGRFUmhkR0VnUFNCamIyNTJaWEp6YVc5dWMxdDBiMVZ1YVhSZE8xeHVYRzRnSUM4dklITnZkWEpqWlNCMGJ5QmhibU5vYjNJZ2FXNXphV1JsSUhOdmRYSmpaU2R6SUhONWMzUmxiVnh1SUNCMllYSWdZVzVqYUc5eUlEMGdkbUZzZFdVZ0tpQm1jbTl0Vlc1cGRFUmhkR0V1Wm1GamRHOXlJQ29nWm5KdmJVWmhZM1J2Y2p0Y2JseHVJQ0F2THlCcFppQnplWE4wWlcxeklHUnBabVpsY2l3Z1kyOXVkbVZ5ZENCdmJtVWdkRzhnWVc1dmRHaGxjbHh1SUNCcFppQW9abkp2YlZWdWFYUkVZWFJoTG5ONWMzUmxiU0FoUFQwZ2RHOVZibWwwUkdGMFlTNXplWE4wWlcwcElIdGNiaUFnSUNBdkx5QnlaV2QxYkdGeUlDZHRKeUIwYnlBbmFXNG5JR0Z1WkNCemJ5Qm1iM0owYUZ4dUlDQWdJR0Z1WTJodmNpQXFQU0JoYm1Ob2IzSnpXMlp5YjIxVmJtbDBSR0YwWVM1emVYTjBaVzFkTG5KaGRHbHZPMXh1SUNCOVhHNWNiaUFnZG1GeUlISmxjM1ZzZENBOUlHRnVZMmh2Y2lBdklIUnZWVzVwZEVSaGRHRXVabUZqZEc5eUlDb2dkRzlHWVdOMGIzSTdYRzRnSUdsbUlDaHBjMVJ2VUdsNFpXd2dKaVlnY205MWJtUlFhWGhsYkNrZ2UxeHVJQ0FnSUhKbGMzVnNkQ0E5SUUxaGRHZ3VjbTkxYm1Rb2NtVnpkV3gwS1R0Y2JpQWdmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdjSEpsWTJsemFXOXVJRDA5UFNBbmJuVnRZbVZ5SnlBbUppQnBjMFpwYm1sMFpTaHdjbVZqYVhOcGIyNHBLU0I3WEc0Z0lDQWdjbVZ6ZFd4MElEMGdjbTkxYm1Rb2NtVnpkV3gwTENCd2NtVmphWE5wYjI0cE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc1OVhHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdZMjl1ZG1WeWRFUnBjM1JoYm1ObE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNdWRXNXBkSE1nUFNCMWJtbDBjenRjYmlJc0ltbHRjRzl5ZENCd1lYQmxjbE5wZW1WeklHWnliMjBnSnk0dmNHRndaWEl0YzJsNlpYTW5PMXh1YVcxd2IzSjBJR052Ym5abGNuUk1aVzVuZEdnZ1puSnZiU0FuWTI5dWRtVnlkQzFzWlc1bmRHZ25PMXh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWjJWMFJHbHRaVzV6YVc5dWMwWnliMjFRY21WelpYUWdLR1JwYldWdWMybHZibk1zSUhWdWFYUnpWRzhnUFNBbmNIZ25MQ0J3YVhobGJITlFaWEpKYm1Ob0lEMGdOeklwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJrYVcxbGJuTnBiMjV6SUQwOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lHTnZibk4wSUd0bGVTQTlJR1JwYldWdWMybHZibk11ZEc5TWIzZGxja05oYzJVb0tUdGNiaUFnSUNCcFppQW9JU2hyWlhrZ2FXNGdjR0Z3WlhKVGFYcGxjeWtwSUh0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWhnVkdobElHUnBiV1Z1YzJsdmJpQndjbVZ6WlhRZ1hDSWtlMlJwYldWdWMybHZibk45WENJZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNCdmNpQmpiM1ZzWkNCdWIzUWdZbVVnWm05MWJtUTdJSFJ5ZVNCMWMybHVaeUJoTkN3Z1lUTXNJSEJ2YzNSallYSmtMQ0JzWlhSMFpYSXNJR1YwWXk1Z0tWeHVJQ0FnSUgxY2JpQWdJQ0JqYjI1emRDQndjbVZ6WlhRZ1BTQndZWEJsY2xOcGVtVnpXMnRsZVYwN1hHNGdJQ0FnY21WMGRYSnVJSEJ5WlhObGRDNWthVzFsYm5OcGIyNXpMbTFoY0Noa0lEMCtJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQmpiMjUyWlhKMFJHbHpkR0Z1WTJVb1pDd2djSEpsYzJWMExuVnVhWFJ6TENCMWJtbDBjMVJ2TENCd2FYaGxiSE5RWlhKSmJtTm9LVHRjYmlBZ0lDQjlLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J5WlhSMWNtNGdaR2x0Wlc1emFXOXVjenRjYmlBZ2ZWeHVmVnh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWTI5dWRtVnlkRVJwYzNSaGJtTmxJQ2hrYVcxbGJuTnBiMjRzSUhWdWFYUnpSbkp2YlNBOUlDZHdlQ2NzSUhWdWFYUnpWRzhnUFNBbmNIZ25MQ0J3YVhobGJITlFaWEpKYm1Ob0lEMGdOeklwSUh0Y2JpQWdjbVYwZFhKdUlHTnZiblpsY25STVpXNW5kR2dvWkdsdFpXNXphVzl1TENCMWJtbDBjMFp5YjIwc0lIVnVhWFJ6Vkc4c0lIdGNiaUFnSUNCd2FYaGxiSE5RWlhKSmJtTm9MRnh1SUNBZ0lIQnlaV05wYzJsdmJqb2dOQ3hjYmlBZ0lDQnliM1Z1WkZCcGVHVnNPaUIwY25WbFhHNGdJSDBwTzF4dWZWeHVJaXdpYVcxd2IzSjBJSHNnWjJWMFJHbHRaVzV6YVc5dWMwWnliMjFRY21WelpYUXNJR052Ym5abGNuUkVhWE4wWVc1alpTQjlJR1p5YjIwZ0p5NHVMMlJwYzNSaGJtTmxjeWM3WEc1cGJYQnZjblFnZXlCcGMwSnliM2R6WlhJc0lHUmxabWx1WldRZ2ZTQm1jbTl0SUNjdUxpOTFkR2xzSnp0Y2JseHVablZ1WTNScGIyNGdZMmhsWTJ0SlpraGhjMFJwYldWdWMybHZibk1nS0hObGRIUnBibWR6S1NCN1hHNGdJR2xtSUNnaGMyVjBkR2x1WjNNdVpHbHRaVzV6YVc5dWN5a2djbVYwZFhKdUlHWmhiSE5sTzF4dUlDQnBaaUFvZEhsd1pXOW1JSE5sZEhScGJtZHpMbVJwYldWdWMybHZibk1nUFQwOUlDZHpkSEpwYm1jbktTQnlaWFIxY200Z2RISjFaVHRjYmlBZ2FXWWdLRUZ5Y21GNUxtbHpRWEp5WVhrb2MyVjBkR2x1WjNNdVpHbHRaVzV6YVc5dWN5a2dKaVlnYzJWMGRHbHVaM011WkdsdFpXNXphVzl1Y3k1c1pXNW5kR2dnUGowZ01pa2djbVYwZFhKdUlIUnlkV1U3WEc0Z0lISmxkSFZ5YmlCbVlXeHpaVHRjYm4xY2JseHVablZ1WTNScGIyNGdaMlYwVUdGeVpXNTBVMmw2WlNBb2NISnZjSE1zSUhObGRIUnBibWR6S1NCN1hHNGdJQzh2SUZkb1pXNGdibThnZXlCa2FXMWxibk5wYjI0Z2ZTQnBjeUJ3WVhOelpXUWdhVzRnYm05a1pTd2dkMlVnWkdWbVlYVnNkQ0IwYnlCSVZFMU1JR05oYm5aaGN5QnphWHBsWEc0Z0lHbG1JQ2doYVhOQ2NtOTNjMlZ5S0NrcElIdGNiaUFnSUNCeVpYUjFjbTRnV3lBek1EQXNJREUxTUNCZE8xeHVJQ0I5WEc1Y2JpQWdiR1YwSUdWc1pXMWxiblFnUFNCelpYUjBhVzVuY3k1d1lYSmxiblFnZkh3Z2QybHVaRzkzTzF4dVhHNGdJR2xtSUNobGJHVnRaVzUwSUQwOVBTQjNhVzVrYjNjZ2ZIeGNiaUFnSUNBZ0lHVnNaVzFsYm5RZ1BUMDlJR1J2WTNWdFpXNTBJSHg4WEc0Z0lDQWdJQ0JsYkdWdFpXNTBJRDA5UFNCa2IyTjFiV1Z1ZEM1aWIyUjVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlGc2dkMmx1Wkc5M0xtbHVibVZ5VjJsa2RHZ3NJSGRwYm1SdmR5NXBibTVsY2tobGFXZG9kQ0JkTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdOdmJuTjBJSHNnZDJsa2RHZ3NJR2hsYVdkb2RDQjlJRDBnWld4bGJXVnVkQzVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRb0tUdGNiaUFnSUNCeVpYUjFjbTRnV3lCM2FXUjBhQ3dnYUdWcFoyaDBJRjA3WEc0Z0lIMWNibjFjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWm5WdVkzUnBiMjRnY21WemFYcGxRMkZ1ZG1GeklDaHdjbTl3Y3l3Z2MyVjBkR2x1WjNNcElIdGNiaUFnYkdWMElIZHBaSFJvTENCb1pXbG5hSFE3WEc0Z0lHeGxkQ0J6ZEhsc1pWZHBaSFJvTENCemRIbHNaVWhsYVdkb2REdGNiaUFnYkdWMElHTmhiblpoYzFkcFpIUm9MQ0JqWVc1MllYTklaV2xuYUhRN1hHNWNiaUFnWTI5dWMzUWdZbkp2ZDNObGNpQTlJR2x6UW5KdmQzTmxjaWdwTzF4dUlDQmpiMjV6ZENCa2FXMWxibk5wYjI1eklEMGdjMlYwZEdsdVozTXVaR2x0Wlc1emFXOXVjenRjYmlBZ1kyOXVjM1FnYUdGelJHbHRaVzV6YVc5dWN5QTlJR05vWldOclNXWklZWE5FYVcxbGJuTnBiMjV6S0hObGRIUnBibWR6S1R0Y2JpQWdZMjl1YzNRZ1pYaHdiM0owYVc1bklEMGdjSEp2Y0hNdVpYaHdiM0owYVc1bk8xeHVJQ0JzWlhRZ2MyTmhiR1ZVYjBacGRDQTlJR2hoYzBScGJXVnVjMmx2Ym5NZ1B5QnpaWFIwYVc1bmN5NXpZMkZzWlZSdlJtbDBJQ0U5UFNCbVlXeHpaU0E2SUdaaGJITmxPMXh1SUNCc1pYUWdjMk5oYkdWVWIxWnBaWGNnUFNBb0lXVjRjRzl5ZEdsdVp5QW1KaUJvWVhORWFXMWxibk5wYjI1ektTQS9JSE5sZEhScGJtZHpMbk5qWVd4bFZHOVdhV1YzSURvZ2RISjFaVHRjYmlBZ0x5OGdhVzRnYm05a1pTd2dZMkZ1WTJWc0lHSnZkR2dnYjJZZ2RHaGxjMlVnYjNCMGFXOXVjMXh1SUNCcFppQW9JV0p5YjNkelpYSXBJSE5qWVd4bFZHOUdhWFFnUFNCelkyRnNaVlJ2Vm1sbGR5QTlJR1poYkhObE8xeHVJQ0JqYjI1emRDQjFibWwwY3lBOUlITmxkSFJwYm1kekxuVnVhWFJ6TzF4dUlDQmpiMjV6ZENCd2FYaGxiSE5RWlhKSmJtTm9JRDBnS0hSNWNHVnZaaUJ6WlhSMGFXNW5jeTV3YVhobGJITlFaWEpKYm1Ob0lEMDlQU0FuYm5WdFltVnlKeUFtSmlCcGMwWnBibWwwWlNoelpYUjBhVzVuY3k1d2FYaGxiSE5RWlhKSmJtTm9LU2tnUHlCelpYUjBhVzVuY3k1d2FYaGxiSE5RWlhKSmJtTm9JRG9nTnpJN1hHNGdJR052Ym5OMElHSnNaV1ZrSUQwZ1pHVm1hVzVsWkNoelpYUjBhVzVuY3k1aWJHVmxaQ3dnTUNrN1hHNWNiaUFnWTI5dWMzUWdaR1YyYVdObFVHbDRaV3hTWVhScGJ5QTlJR0p5YjNkelpYSWdQeUIzYVc1a2IzY3VaR1YyYVdObFVHbDRaV3hTWVhScGJ5QTZJREU3WEc0Z0lHTnZibk4wSUdKaGMyVlFhWGhsYkZKaGRHbHZJRDBnYzJOaGJHVlViMVpwWlhjZ1B5QmtaWFpwWTJWUWFYaGxiRkpoZEdsdklEb2dNVHRjYmx4dUlDQnNaWFFnY0dsNFpXeFNZWFJwYnl3Z1pYaHdiM0owVUdsNFpXeFNZWFJwYnp0Y2JseHVJQ0F2THlCSlppQmhJSEJwZUdWc0lISmhkR2x2SUdseklITndaV05wWm1sbFpDd2dkMlVnZDJsc2JDQjFjMlVnYVhRdVhHNGdJQzh2SUU5MGFHVnlkMmx6WlRwY2JpQWdMeThnSUMwK0lFbG1JR1JwYldWdWMybHZiaUJwY3lCemNHVmphV1pwWldRc0lIVnpaU0JpWVhObElISmhkR2x2SUNocExtVXVJSE5wZW1VZ1ptOXlJR1Y0Y0c5eWRDbGNiaUFnTHk4Z0lDMCtJRWxtSUc1dklHUnBiV1Z1YzJsdmJpQnBjeUJ6Y0dWamFXWnBaV1FzSUhWelpTQmtaWFpwWTJVZ2NtRjBhVzhnS0drdVpTNGdjMmw2WlNCbWIzSWdjMk55WldWdUtWeHVJQ0JwWmlBb2RIbHdaVzltSUhObGRIUnBibWR6TG5CcGVHVnNVbUYwYVc4Z1BUMDlJQ2R1ZFcxaVpYSW5JQ1ltSUdselJtbHVhWFJsS0hObGRIUnBibWR6TG5CcGVHVnNVbUYwYVc4cEtTQjdYRzRnSUNBZ0x5OGdWMmhsYmlCN0lIQnBlR1ZzVW1GMGFXOGdmU0JwY3lCemNHVmphV1pwWldRc0lHbDBKM01nWVd4emJ5QjFjMlZrSUdGeklHUmxabUYxYkhRZ1pYaHdiM0owVUdsNFpXeFNZWFJwYnk1Y2JpQWdJQ0J3YVhobGJGSmhkR2x2SUQwZ2MyVjBkR2x1WjNNdWNHbDRaV3hTWVhScGJ6dGNiaUFnSUNCbGVIQnZjblJRYVhobGJGSmhkR2x2SUQwZ1pHVm1hVzVsWkNoelpYUjBhVzVuY3k1bGVIQnZjblJRYVhobGJGSmhkR2x2TENCd2FYaGxiRkpoZEdsdktUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnBaaUFvYUdGelJHbHRaVzV6YVc5dWN5a2dlMXh1SUNBZ0lDQWdMeThnVjJobGJpQmhJR1JwYldWdWMybHZiaUJwY3lCemNHVmphV1pwWldRc0lIVnpaU0IwYUdVZ1ltRnpaU0J5WVhScGJ5QnlZWFJvWlhJZ2RHaGhiaUJ6WTNKbFpXNGdjbUYwYVc5Y2JpQWdJQ0FnSUhCcGVHVnNVbUYwYVc4Z1BTQmlZWE5sVUdsNFpXeFNZWFJwYnp0Y2JpQWdJQ0FnSUM4dklFUmxabUYxYkhRZ2RHOGdZU0J3YVhobGJDQnlZWFJwYnlCdlppQXhJSE52SUhSb1lYUWdlVzkxSUdWdVpDQjFjQ0IzYVhSb0lIUm9aU0J6WVcxbElHUnBiV1Z1YzJsdmJseHVJQ0FnSUNBZ0x5OGdlVzkxSUhOd1pXTnBabWxsWkN3Z2FTNWxMaUJiSURVd01Dd2dOVEF3SUYwZ2FYTWdaWGh3YjNKMFpXUWdZWE1nTlRBd2VEVXdNQ0J3ZUZ4dUlDQWdJQ0FnWlhod2IzSjBVR2w0Wld4U1lYUnBieUE5SUdSbFptbHVaV1FvYzJWMGRHbHVaM011Wlhod2IzSjBVR2w0Wld4U1lYUnBieXdnTVNrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQzh2SUU1dklHUnBiV1Z1YzJsdmJpQnBjeUJ6Y0dWamFXWnBaV1FzSUdGemMzVnRaU0JtZFd4c0xYTmpjbVZsYmlCeVpYUnBibUVnYzJsNmFXNW5YRzRnSUNBZ0lDQndhWGhsYkZKaGRHbHZJRDBnWkdWMmFXTmxVR2w0Wld4U1lYUnBienRjYmlBZ0lDQWdJQzh2SUVSbFptRjFiSFFnZEc4Z2MyTnlaV1Z1SUhCcGVHVnNJSEpoZEdsdkxDQnpieUIwYUdGMElHbDBKM01nYkdsclpTQjBZV3RwYm1jZ1lTQmtaWFpwWTJVZ2MyTnlaV1Z1YzJodmRGeHVJQ0FnSUNBZ1pYaHdiM0owVUdsNFpXeFNZWFJwYnlBOUlHUmxabWx1WldRb2MyVjBkR2x1WjNNdVpYaHdiM0owVUdsNFpXeFNZWFJwYnl3Z2NHbDRaV3hTWVhScGJ5azdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdMeThnUTJ4aGJYQWdjR2w0Wld3Z2NtRjBhVzljYmlBZ2FXWWdLSFI1Y0dWdlppQnpaWFIwYVc1bmN5NXRZWGhRYVhobGJGSmhkR2x2SUQwOVBTQW5iblZ0WW1WeUp5QW1KaUJwYzBacGJtbDBaU2h6WlhSMGFXNW5jeTV0WVhoUWFYaGxiRkpoZEdsdktTa2dlMXh1SUNBZ0lIQnBlR1ZzVW1GMGFXOGdQU0JOWVhSb0xtMXBiaWh6WlhSMGFXNW5jeTV0WVhoUWFYaGxiRkpoZEdsdkxDQndhWGhsYkZKaGRHbHZLVHRjYmlBZ2ZWeHVYRzRnSUM4dklFaGhibVJzWlNCbGVIQnZjblFnY0dsNFpXd2djbUYwYVc5Y2JpQWdhV1lnS0dWNGNHOXlkR2x1WnlrZ2UxeHVJQ0FnSUhCcGVHVnNVbUYwYVc4Z1BTQmxlSEJ2Y25SUWFYaGxiRkpoZEdsdk8xeHVJQ0I5WEc1Y2JpQWdMeThnY0dGeVpXNTBWMmxrZEdnZ1BTQjBlWEJsYjJZZ2NHRnlaVzUwVjJsa2RHZ2dQVDA5SUNkMWJtUmxabWx1WldRbklEOGdaR1ZtWVhWc2RFNXZaR1ZUYVhwbFd6QmRJRG9nY0dGeVpXNTBWMmxrZEdnN1hHNGdJQzh2SUhCaGNtVnVkRWhsYVdkb2RDQTlJSFI1Y0dWdlppQndZWEpsYm5SSVpXbG5hSFFnUFQwOUlDZDFibVJsWm1sdVpXUW5JRDhnWkdWbVlYVnNkRTV2WkdWVGFYcGxXekZkSURvZ2NHRnlaVzUwU0dWcFoyaDBPMXh1WEc0Z0lHeGxkQ0JiSUhCaGNtVnVkRmRwWkhSb0xDQndZWEpsYm5SSVpXbG5hSFFnWFNBOUlHZGxkRkJoY21WdWRGTnBlbVVvY0hKdmNITXNJSE5sZEhScGJtZHpLVHRjYmlBZ2JHVjBJSFJ5YVcxWGFXUjBhQ3dnZEhKcGJVaGxhV2RvZER0Y2JseHVJQ0F2THlCWmIzVWdZMkZ1SUhOd1pXTnBabmtnWVNCa2FXMWxibk5wYjI1eklHbHVJSEJwZUdWc2N5QnZjaUJqYlM5dEwybHVMMlYwWTF4dUlDQnBaaUFvYUdGelJHbHRaVzV6YVc5dWN5a2dlMXh1SUNBZ0lHTnZibk4wSUhKbGMzVnNkQ0E5SUdkbGRFUnBiV1Z1YzJsdmJuTkdjbTl0VUhKbGMyVjBLR1JwYldWdWMybHZibk1zSUhWdWFYUnpMQ0J3YVhobGJITlFaWEpKYm1Ob0tUdGNiaUFnSUNCamIyNXpkQ0JvYVdkb1pYTjBJRDBnVFdGMGFDNXRZWGdvY21WemRXeDBXekJkTENCeVpYTjFiSFJiTVYwcE8xeHVJQ0FnSUdOdmJuTjBJR3h2ZDJWemRDQTlJRTFoZEdndWJXbHVLSEpsYzNWc2RGc3dYU3dnY21WemRXeDBXekZkS1R0Y2JpQWdJQ0JwWmlBb2MyVjBkR2x1WjNNdWIzSnBaVzUwWVhScGIyNHBJSHRjYmlBZ0lDQWdJR052Ym5OMElHeGhibVJ6WTJGd1pTQTlJSE5sZEhScGJtZHpMbTl5YVdWdWRHRjBhVzl1SUQwOVBTQW5iR0Z1WkhOallYQmxKenRjYmlBZ0lDQWdJSGRwWkhSb0lEMGdiR0Z1WkhOallYQmxJRDhnYUdsbmFHVnpkQ0E2SUd4dmQyVnpkRHRjYmlBZ0lDQWdJR2hsYVdkb2RDQTlJR3hoYm1SelkyRndaU0EvSUd4dmQyVnpkQ0E2SUdocFoyaGxjM1E3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIZHBaSFJvSUQwZ2NtVnpkV3gwV3pCZE8xeHVJQ0FnSUNBZ2FHVnBaMmgwSUQwZ2NtVnpkV3gwV3pGZE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhSeWFXMVhhV1IwYUNBOUlIZHBaSFJvTzF4dUlDQWdJSFJ5YVcxSVpXbG5hSFFnUFNCb1pXbG5hSFE3WEc1Y2JpQWdJQ0F2THlCQmNIQnNlU0JpYkdWbFpDQjNhR2xqYUNCcGN5QmhjM04xYldWa0lIUnZJR0psSUdsdUlIUm9aU0J6WVcxbElIVnVhWFJ6WEc0Z0lDQWdkMmxrZEdnZ0t6MGdZbXhsWldRZ0tpQXlPMXh1SUNBZ0lHaGxhV2RvZENBclBTQmliR1ZsWkNBcUlESTdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdkMmxrZEdnZ1BTQndZWEpsYm5SWGFXUjBhRHRjYmlBZ0lDQm9aV2xuYUhRZ1BTQndZWEpsYm5SSVpXbG5hSFE3WEc0Z0lDQWdkSEpwYlZkcFpIUm9JRDBnZDJsa2RHZzdYRzRnSUNBZ2RISnBiVWhsYVdkb2RDQTlJR2hsYVdkb2REdGNiaUFnZlZ4dVhHNGdJQzh2SUZKbFlXd2djMmw2WlNCcGJpQndhWGhsYkhNZ1lXWjBaWElnVUZCSklHbHpJSFJoYTJWdUlHbHVkRzhnWVdOamIzVnVkRnh1SUNCc1pYUWdjbVZoYkZkcFpIUm9JRDBnZDJsa2RHZzdYRzRnSUd4bGRDQnlaV0ZzU0dWcFoyaDBJRDBnYUdWcFoyaDBPMXh1SUNCcFppQW9hR0Z6UkdsdFpXNXphVzl1Y3lBbUppQjFibWwwY3lrZ2UxeHVJQ0FnSUM4dklFTnZiblpsY25RZ2RHOGdaR2xuYVhSaGJDOXdhWGhsYkNCMWJtbDBjeUJwWmlCdVpXTmxjM05oY25sY2JpQWdJQ0J5WldGc1YybGtkR2dnUFNCamIyNTJaWEowUkdsemRHRnVZMlVvZDJsa2RHZ3NJSFZ1YVhSekxDQW5jSGduTENCd2FYaGxiSE5RWlhKSmJtTm9LVHRjYmlBZ0lDQnlaV0ZzU0dWcFoyaDBJRDBnWTI5dWRtVnlkRVJwYzNSaGJtTmxLR2hsYVdkb2RDd2dkVzVwZEhNc0lDZHdlQ2NzSUhCcGVHVnNjMUJsY2tsdVkyZ3BPMXh1SUNCOVhHNWNiaUFnTHk4Z1NHOTNJR0pwWnlCMGJ5QnpaWFFnZEdobElDZDJhV1YzSnlCdlppQjBhR1VnWTJGdWRtRnpJR2x1SUhSb1pTQmljbTkzYzJWeUlDaHBMbVV1SUhOMGVXeGxLVnh1SUNCemRIbHNaVmRwWkhSb0lEMGdUV0YwYUM1eWIzVnVaQ2h5WldGc1YybGtkR2dwTzF4dUlDQnpkSGxzWlVobGFXZG9kQ0E5SUUxaGRHZ3VjbTkxYm1Rb2NtVmhiRWhsYVdkb2RDazdYRzVjYmlBZ0x5OGdTV1lnZDJVZ2QybHphQ0IwYnlCelkyRnNaU0IwYUdVZ2RtbGxkeUIwYnlCMGFHVWdZbkp2ZDNObGNpQjNhVzVrYjNkY2JpQWdhV1lnS0hOallXeGxWRzlHYVhRZ0ppWWdJV1Y0Y0c5eWRHbHVaeUFtSmlCb1lYTkVhVzFsYm5OcGIyNXpLU0I3WEc0Z0lDQWdZMjl1YzNRZ1lYTndaV04wSUQwZ2QybGtkR2dnTHlCb1pXbG5hSFE3WEc0Z0lDQWdZMjl1YzNRZ2QybHVaRzkzUVhOd1pXTjBJRDBnY0dGeVpXNTBWMmxrZEdnZ0x5QndZWEpsYm5SSVpXbG5hSFE3WEc0Z0lDQWdZMjl1YzNRZ2MyTmhiR1ZVYjBacGRGQmhaR1JwYm1jZ1BTQmtaV1pwYm1Wa0tITmxkSFJwYm1kekxuTmpZV3hsVkc5R2FYUlFZV1JrYVc1bkxDQTBNQ2s3WEc0Z0lDQWdZMjl1YzNRZ2JXRjRWMmxrZEdnZ1BTQk5ZWFJvTG5KdmRXNWtLSEJoY21WdWRGZHBaSFJvSUMwZ2MyTmhiR1ZVYjBacGRGQmhaR1JwYm1jZ0tpQXlLVHRjYmlBZ0lDQmpiMjV6ZENCdFlYaElaV2xuYUhRZ1BTQk5ZWFJvTG5KdmRXNWtLSEJoY21WdWRFaGxhV2RvZENBdElITmpZV3hsVkc5R2FYUlFZV1JrYVc1bklDb2dNaWs3WEc0Z0lDQWdhV1lnS0hOMGVXeGxWMmxrZEdnZ1BpQnRZWGhYYVdSMGFDQjhmQ0J6ZEhsc1pVaGxhV2RvZENBK0lHMWhlRWhsYVdkb2RDa2dlMXh1SUNBZ0lDQWdhV1lnS0hkcGJtUnZkMEZ6Y0dWamRDQStJR0Z6Y0dWamRDa2dlMXh1SUNBZ0lDQWdJQ0J6ZEhsc1pVaGxhV2RvZENBOUlHMWhlRWhsYVdkb2REdGNiaUFnSUNBZ0lDQWdjM1I1YkdWWGFXUjBhQ0E5SUUxaGRHZ3VjbTkxYm1Rb2MzUjViR1ZJWldsbmFIUWdLaUJoYzNCbFkzUXBPMXh1SUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdjM1I1YkdWWGFXUjBhQ0E5SUcxaGVGZHBaSFJvTzF4dUlDQWdJQ0FnSUNCemRIbHNaVWhsYVdkb2RDQTlJRTFoZEdndWNtOTFibVFvYzNSNWJHVlhhV1IwYUNBdklHRnpjR1ZqZENrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1kyRnVkbUZ6VjJsa2RHZ2dQU0J6WTJGc1pWUnZWbWxsZHlBL0lFMWhkR2d1Y205MWJtUW9jR2w0Wld4U1lYUnBieUFxSUhOMGVXeGxWMmxrZEdncElEb2dUV0YwYUM1eWIzVnVaQ2h3YVhobGJGSmhkR2x2SUNvZ2NtVmhiRmRwWkhSb0tUdGNiaUFnWTJGdWRtRnpTR1ZwWjJoMElEMGdjMk5oYkdWVWIxWnBaWGNnUHlCTllYUm9Mbkp2ZFc1a0tIQnBlR1ZzVW1GMGFXOGdLaUJ6ZEhsc1pVaGxhV2RvZENrZ09pQk5ZWFJvTG5KdmRXNWtLSEJwZUdWc1VtRjBhVzhnS2lCeVpXRnNTR1ZwWjJoMEtUdGNibHh1SUNCamIyNXpkQ0IyYVdWM2NHOXlkRmRwWkhSb0lEMGdjMk5oYkdWVWIxWnBaWGNnUHlCTllYUm9Mbkp2ZFc1a0tITjBlV3hsVjJsa2RHZ3BJRG9nVFdGMGFDNXliM1Z1WkNoeVpXRnNWMmxrZEdncE8xeHVJQ0JqYjI1emRDQjJhV1YzY0c5eWRFaGxhV2RvZENBOUlITmpZV3hsVkc5V2FXVjNJRDhnVFdGMGFDNXliM1Z1WkNoemRIbHNaVWhsYVdkb2RDa2dPaUJOWVhSb0xuSnZkVzVrS0hKbFlXeElaV2xuYUhRcE8xeHVYRzRnSUdOdmJuTjBJSE5qWVd4bFdDQTlJR05oYm5aaGMxZHBaSFJvSUM4Z2QybGtkR2c3WEc0Z0lHTnZibk4wSUhOallXeGxXU0E5SUdOaGJuWmhjMGhsYVdkb2RDQXZJR2hsYVdkb2REdGNibHh1SUNBdkx5QkJjM05wWjI0Z2RHOGdZM1Z5Y21WdWRDQndjbTl3YzF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUdKc1pXVmtMRnh1SUNBZ0lIQnBlR1ZzVW1GMGFXOHNYRzRnSUNBZ2QybGtkR2dzWEc0Z0lDQWdhR1ZwWjJoMExGeHVJQ0FnSUdScGJXVnVjMmx2Ym5NNklGc2dkMmxrZEdnc0lHaGxhV2RvZENCZExGeHVJQ0FnSUhWdWFYUnpPaUIxYm1sMGN5QjhmQ0FuY0hnbkxGeHVJQ0FnSUhOallXeGxXQ3hjYmlBZ0lDQnpZMkZzWlZrc1hHNGdJQ0FnY0dsNFpXeHpVR1Z5U1c1amFDeGNiaUFnSUNCMmFXVjNjRzl5ZEZkcFpIUm9MRnh1SUNBZ0lIWnBaWGR3YjNKMFNHVnBaMmgwTEZ4dUlDQWdJR05oYm5aaGMxZHBaSFJvTEZ4dUlDQWdJR05oYm5aaGMwaGxhV2RvZEN4Y2JpQWdJQ0IwY21sdFYybGtkR2dzWEc0Z0lDQWdkSEpwYlVobGFXZG9kQ3hjYmlBZ0lDQnpkSGxzWlZkcFpIUm9MRnh1SUNBZ0lITjBlV3hsU0dWcFoyaDBYRzRnSUgwN1hHNTlYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdkbGRFTmhiblpoYzBOdmJuUmxlSFJjYm1aMWJtTjBhVzl1SUdkbGRFTmhiblpoYzBOdmJuUmxlSFFnS0hSNWNHVXNJRzl3ZEhNcElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCMGVYQmxJQ0U5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb0oyMTFjM1FnYzNCbFkybG1lU0IwZVhCbElITjBjbWx1WnljcFhHNGdJSDFjYmx4dUlDQnZjSFJ6SUQwZ2IzQjBjeUI4ZkNCN2ZWeHVYRzRnSUdsbUlDaDBlWEJsYjJZZ1pHOWpkVzFsYm5RZ1BUMDlJQ2QxYm1SbFptbHVaV1FuSUNZbUlDRnZjSFJ6TG1OaGJuWmhjeWtnZTF4dUlDQWdJSEpsZEhWeWJpQnVkV3hzSUM4dklHTm9aV05ySUdadmNpQk9iMlJsWEc0Z0lIMWNibHh1SUNCMllYSWdZMkZ1ZG1GeklEMGdiM0IwY3k1allXNTJZWE1nZkh3Z1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWTJGdWRtRnpKeWxjYmlBZ2FXWWdLSFI1Y0dWdlppQnZjSFJ6TG5kcFpIUm9JRDA5UFNBbmJuVnRZbVZ5SnlrZ2UxeHVJQ0FnSUdOaGJuWmhjeTUzYVdSMGFDQTlJRzl3ZEhNdWQybGtkR2hjYmlBZ2ZWeHVJQ0JwWmlBb2RIbHdaVzltSUc5d2RITXVhR1ZwWjJoMElEMDlQU0FuYm5WdFltVnlKeWtnZTF4dUlDQWdJR05oYm5aaGN5NW9aV2xuYUhRZ1BTQnZjSFJ6TG1obGFXZG9kRnh1SUNCOVhHNWNiaUFnZG1GeUlHRjBkSEpwWW5NZ1BTQnZjSFJ6WEc0Z0lIWmhjaUJuYkZ4dUlDQjBjbmtnZTF4dUlDQWdJSFpoY2lCdVlXMWxjeUE5SUZzZ2RIbHdaU0JkWEc0Z0lDQWdMeThnY0hKbFptbDRJRWRNSUdOdmJuUmxlSFJ6WEc0Z0lDQWdhV1lnS0hSNWNHVXVhVzVrWlhoUFppZ25kMlZpWjJ3bktTQTlQVDBnTUNrZ2UxeHVJQ0FnSUNBZ2JtRnRaWE11Y0hWemFDZ25aWGh3WlhKcGJXVnVkR0ZzTFNjZ0t5QjBlWEJsS1Z4dUlDQWdJSDFjYmx4dUlDQWdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYm1GdFpYTXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdkc0lEMGdZMkZ1ZG1GekxtZGxkRU52Ym5SbGVIUW9ibUZ0WlhOYmFWMHNJR0YwZEhKcFluTXBYRzRnSUNBZ0lDQnBaaUFvWjJ3cElISmxkSFZ5YmlCbmJGeHVJQ0FnSUgxY2JpQWdmU0JqWVhSamFDQW9aU2tnZTF4dUlDQWdJR2RzSUQwZ2JuVnNiRnh1SUNCOVhHNGdJSEpsZEhWeWJpQW9aMndnZkh3Z2JuVnNiQ2tnTHk4Z1pXNXpkWEpsSUc1MWJHd2diMjRnWm1GcGJGeHVmVnh1SWl3aWFXMXdiM0owSUdGemMybG5iaUJtY205dElDZHZZbXBsWTNRdFlYTnphV2R1Snp0Y2JtbHRjRzl5ZENCblpYUkRZVzUyWVhORGIyNTBaWGgwSUdaeWIyMGdKMmRsZEMxallXNTJZWE10WTI5dWRHVjRkQ2M3WEc1cGJYQnZjblFnZXlCcGMwSnliM2R6WlhJZ2ZTQm1jbTl0SUNjdUxpOTFkR2xzSnp0Y2JseHVablZ1WTNScGIyNGdZM0psWVhSbFEyRnVkbUZ6Uld4bGJXVnVkQ0FvS1NCN1hHNGdJR2xtSUNnaGFYTkNjbTkzYzJWeUtDa3BJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0owbDBJR0Z3Y0dWaGNuTWdlVzkxSUdGeVpTQnlkVzVwYm1jZ1puSnZiU0JPYjJSbExtcHpJRzl5SUdFZ2JtOXVMV0p5YjNkelpYSWdaVzUyYVhKdmJtMWxiblF1SUZSeWVTQndZWE56YVc1bklHbHVJR0Z1SUdWNGFYTjBhVzVuSUhzZ1kyRnVkbUZ6SUgwZ2FXNTBaWEptWVdObElHbHVjM1JsWVdRdUp5azdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSjJOaGJuWmhjeWNwTzF4dWZWeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQmpjbVZoZEdWRFlXNTJZWE1nS0hObGRIUnBibWR6SUQwZ2UzMHBJSHRjYmlBZ2JHVjBJR052Ym5SbGVIUXNJR05oYm5aaGN6dGNiaUFnYkdWMElHOTNibk5EWVc1MllYTWdQU0JtWVd4elpUdGNiaUFnYVdZZ0tITmxkSFJwYm1kekxtTmhiblpoY3lBaFBUMGdabUZzYzJVcElIdGNiaUFnSUNBdkx5QkVaWFJsY20xcGJtVWdkR2hsSUdOaGJuWmhjeUJoYm1RZ1kyOXVkR1Y0ZENCMGJ5QmpjbVZoZEdWY2JpQWdJQ0JqYjI1MFpYaDBJRDBnYzJWMGRHbHVaM011WTI5dWRHVjRkRHRjYmlBZ0lDQnBaaUFvSVdOdmJuUmxlSFFnZkh3Z2RIbHdaVzltSUdOdmJuUmxlSFFnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ0lDQnNaWFFnYm1WM1EyRnVkbUZ6SUQwZ2MyVjBkR2x1WjNNdVkyRnVkbUZ6TzF4dUlDQWdJQ0FnYVdZZ0tDRnVaWGREWVc1MllYTXBJSHRjYmlBZ0lDQWdJQ0FnYm1WM1EyRnVkbUZ6SUQwZ1kzSmxZWFJsUTJGdWRtRnpSV3hsYldWdWRDZ3BPMXh1SUNBZ0lDQWdJQ0J2ZDI1elEyRnVkbUZ6SUQwZ2RISjFaVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR052Ym5OMElIUjVjR1VnUFNCamIyNTBaWGgwSUh4OElDY3laQ2M3WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUc1bGQwTmhiblpoY3k1blpYUkRiMjUwWlhoMElDRTlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2loZ1ZHaGxJSE53WldOcFptbGxaQ0I3SUdOaGJuWmhjeUI5SUdWc1pXMWxiblFnWkc5bGN5QnViM1FnYUdGMlpTQmhJR2RsZEVOdmJuUmxlSFFvS1NCbWRXNWpkR2x2Yml3Z2JXRjVZbVVnYVhRZ2FYTWdibTkwSUdFZ1BHTmhiblpoY3o0Z2RHRm5QMkFwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnWTI5dWRHVjRkQ0E5SUdkbGRFTmhiblpoYzBOdmJuUmxlSFFvZEhsd1pTd2dZWE56YVdkdUtIdDlMQ0J6WlhSMGFXNW5jeTVoZEhSeWFXSjFkR1Z6TENCN0lHTmhiblpoY3pvZ2JtVjNRMkZ1ZG1GeklIMHBLVHRjYmlBZ0lDQWdJR2xtSUNnaFkyOXVkR1Y0ZENrZ2UxeHVJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb1lFWmhhV3hsWkNCaGRDQmpZVzUyWVhNdVoyVjBRMjl1ZEdWNGRDZ25KSHQwZVhCbGZTY3BJQzBnZEdobElHSnliM2R6WlhJZ2JXRjVJRzV2ZENCemRYQndiM0owSUhSb2FYTWdZMjl1ZEdWNGRDd2diM0lnWVNCa2FXWm1aWEpsYm5RZ1kyOXVkR1Y0ZENCdFlYa2dZV3h5WldGa2VTQmlaU0JwYmlCMWMyVWdkMmwwYUNCMGFHbHpJR05oYm5aaGN5NWdLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQmpZVzUyWVhNZ1BTQmpiMjUwWlhoMExtTmhiblpoY3p0Y2JpQWdJQ0F2THlCRmJuTjFjbVVnWTI5dWRHVjRkQ0J0WVhSamFHVnpJSFZ6WlhJbmN5QmpZVzUyWVhNZ1pYaHdaV04wWVhScGIyNXpYRzRnSUNBZ2FXWWdLSE5sZEhScGJtZHpMbU5oYm5aaGN5QW1KaUJqWVc1MllYTWdJVDA5SUhObGRIUnBibWR6TG1OaGJuWmhjeWtnZTF4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RVYUdVZ2V5QmpZVzUyWVhNZ2ZTQmhibVFnZXlCamIyNTBaWGgwSUgwZ2MyVjBkR2x1WjNNZ2JYVnpkQ0J3YjJsdWRDQjBieUIwYUdVZ2MyRnRaU0IxYm1SbGNteDVhVzVuSUdOaGJuWmhjeUJsYkdWdFpXNTBKeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnUVhCd2JIa2djR2w0Wld4aGRHbHZiaUIwYnlCallXNTJZWE1nYVdZZ2JtVmpaWE56WVhKNUxDQjBhR2x6SUdseklHMXZjM1JzZVNCaElHTnZiblpsYm1sbGJtTmxJSFYwYVd4cGRIbGNiaUFnSUNCcFppQW9jMlYwZEdsdVozTXVjR2w0Wld4aGRHVmtLU0I3WEc0Z0lDQWdJQ0JqYjI1MFpYaDBMbWx0WVdkbFUyMXZiM1JvYVc1blJXNWhZbXhsWkNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnWTI5dWRHVjRkQzV0YjNwSmJXRm5aVk50YjI5MGFHbHVaMFZ1WVdKc1pXUWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWIwbHRZV2RsVTIxdmIzUm9hVzVuUlc1aFlteGxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdZMjl1ZEdWNGRDNTNaV0pyYVhSSmJXRm5aVk50YjI5MGFHbHVaMFZ1WVdKc1pXUWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWJYTkpiV0ZuWlZOdGIyOTBhR2x1WjBWdVlXSnNaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJR05oYm5aaGN5NXpkSGxzWlZzbmFXMWhaMlV0Y21WdVpHVnlhVzVuSjEwZ1BTQW5jR2w0Wld4aGRHVmtKenRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlIc2dZMkZ1ZG1GekxDQmpiMjUwWlhoMExDQnZkMjV6UTJGdWRtRnpJSDA3WEc1OVhHNGlMQ0pwYlhCdmNuUWdZWE56YVdkdUlHWnliMjBnSjI5aWFtVmpkQzFoYzNOcFoyNG5PMXh1YVcxd2IzSjBJSEpwWjJoMFRtOTNJR1p5YjIwZ0ozSnBaMmgwTFc1dmR5YzdYRzVwYlhCdmNuUWdhWE5RY205dGFYTmxJR1p5YjIwZ0oybHpMWEJ5YjIxcGMyVW5PMXh1YVcxd2IzSjBJSHNnYVhOQ2NtOTNjMlZ5TENCa1pXWnBibVZrTENCcGMxZGxZa2RNUTI5dWRHVjRkQ3dnYVhORFlXNTJZWE1zSUdkbGRFTnNhV1Z1ZEVGUVNTQjlJR1p5YjIwZ0p5NHVMM1YwYVd3bk8xeHVhVzF3YjNKMElHUmxaWEJGY1hWaGJDQm1jbTl0SUNka1pXVndMV1Z4ZFdGc0p6dGNibWx0Y0c5eWRDQjdYRzRnSUhKbGMyOXNkbVZHYVd4bGJtRnRaU3hjYmlBZ2MyRjJaVVpwYkdVc1hHNGdJSE5oZG1WRVlYUmhWVkpNTEZ4dUlDQm5aWFJVYVcxbFUzUmhiWEFzWEc0Z0lHVjRjRzl5ZEVOaGJuWmhjeXhjYmlBZ2MzUnlaV0Z0VTNSaGNuUXNYRzRnSUhOMGNtVmhiVVZ1WkZ4dWZTQm1jbTl0SUNjdUxpOXpZWFpsSnp0Y2JtbHRjRzl5ZENCN0lHTm9aV05yVTJWMGRHbHVaM01nZlNCbWNtOXRJQ2N1TGk5aFkyTmxjM05wWW1sc2FYUjVKenRjYmx4dWFXMXdiM0owSUd0bGVXSnZZWEprVTJodmNuUmpkWFJ6SUdaeWIyMGdKeTR2YTJWNVltOWhjbVJUYUc5eWRHTjFkSE1uTzF4dWFXMXdiM0owSUhKbGMybDZaVU5oYm5aaGN5Qm1jbTl0SUNjdUwzSmxjMmw2WlVOaGJuWmhjeWM3WEc1cGJYQnZjblFnWTNKbFlYUmxRMkZ1ZG1GeklHWnliMjBnSnk0dlkzSmxZWFJsUTJGdWRtRnpKenRjYmx4dVkyeGhjM01nVTJ0bGRHTm9UV0Z1WVdkbGNpQjdYRzRnSUdOdmJuTjBjblZqZEc5eUlDZ3BJSHRjYmlBZ0lDQjBhR2x6TGw5elpYUjBhVzVuY3lBOUlIdDlPMXh1SUNBZ0lIUm9hWE11WDNCeWIzQnpJRDBnZTMwN1hHNGdJQ0FnZEdocGN5NWZjMnRsZEdOb0lEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lIUm9hWE11WDNKaFppQTlJRzUxYkd3N1hHNGdJQ0FnZEdocGN5NWZjbVZqYjNKa1ZHbHRaVzkxZENBOUlHNTFiR3c3WEc1Y2JpQWdJQ0F2THlCVGIyMWxJR2hoWTJ0NUlIUm9hVzVuY3lCeVpYRjFhWEpsWkNCMGJ5Qm5aWFFnWVhKdmRXNWtJSEExTG1weklITjBjblZqZEhWeVpWeHVJQ0FnSUhSb2FYTXVYMnhoYzNSU1pXUnlZWGRTWlhOMWJIUWdQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdkR2hwY3k1ZmFYTlFOVkpsYzJsNmFXNW5JRDBnWm1Gc2MyVTdYRzVjYmlBZ0lDQjBhR2x6TGw5clpYbGliMkZ5WkZOb2IzSjBZM1YwY3lBOUlHdGxlV0p2WVhKa1UyaHZjblJqZFhSektIdGNiaUFnSUNBZ0lHVnVZV0pzWldRNklDZ3BJRDArSUhSb2FYTXVjMlYwZEdsdVozTXVhRzkwYTJWNWN5QWhQVDBnWm1Gc2MyVXNYRzRnSUNBZ0lDQnpZWFpsT2lBb1pYWXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR1YyTG5Ob2FXWjBTMlY1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVjSEp2Y0hNdWNtVmpiM0prYVc1bktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbVZ1WkZKbFkyOXlaQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1eWRXNG9LVHRjYmlBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZEdocGN5NXlaV052Y21Rb0tUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2doZEdocGN5NXdjbTl3Y3k1eVpXTnZjbVJwYm1jcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtVjRjRzl5ZEVaeVlXMWxLQ2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgwc1hHNGdJQ0FnSUNCMGIyZG5iR1ZRYkdGNU9pQW9LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQnliM0J6TG5Cc1lYbHBibWNwSUhSb2FYTXVjR0YxYzJVb0tUdGNiaUFnSUNBZ0lDQWdaV3h6WlNCMGFHbHpMbkJzWVhrb0tUdGNiaUFnSUNBZ0lIMHNYRzRnSUNBZ0lDQmpiMjF0YVhRNklDaGxkaWtnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WNGNHOXlkRVp5WVcxbEtIc2dZMjl0YldsME9pQjBjblZsSUgwcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ2RHaHBjeTVmWVc1cGJXRjBaVWhoYm1Sc1pYSWdQU0FvS1NBOVBpQjBhR2x6TG1GdWFXMWhkR1VvS1R0Y2JseHVJQ0FnSUhSb2FYTXVYM0psYzJsNlpVaGhibVJzWlhJZ1BTQW9LU0E5UGlCN1hHNGdJQ0FnSUNCamIyNXpkQ0JqYUdGdVoyVmtJRDBnZEdocGN5NXlaWE5wZW1Vb0tUdGNiaUFnSUNBZ0lDOHZJRTl1YkhrZ2NtVXRjbVZ1WkdWeUlIZG9aVzRnYzJsNlpTQmhZM1IxWVd4c2VTQmphR0Z1WjJWelhHNGdJQ0FnSUNCcFppQW9ZMmhoYm1kbFpDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxuSmxibVJsY2lncE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQm5aWFFnYzJ0bGRHTm9JQ2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1ZmMydGxkR05vTzF4dUlDQjlYRzVjYmlBZ1oyVjBJSE5sZEhScGJtZHpJQ2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1ZmMyVjBkR2x1WjNNN1hHNGdJSDFjYmx4dUlDQm5aWFFnY0hKdmNITWdLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TGw5d2NtOXdjenRjYmlBZ2ZWeHVYRzRnSUY5amIyMXdkWFJsVUd4aGVXaGxZV1FnS0dOMWNuSmxiblJVYVcxbExDQmtkWEpoZEdsdmJpa2dlMXh1SUNBZ0lHTnZibk4wSUdoaGMwUjFjbUYwYVc5dUlEMGdkSGx3Wlc5bUlHUjFjbUYwYVc5dUlEMDlQU0FuYm5WdFltVnlKeUFtSmlCcGMwWnBibWwwWlNoa2RYSmhkR2x2YmlrN1hHNGdJQ0FnY21WMGRYSnVJR2hoYzBSMWNtRjBhVzl1SUQ4Z1kzVnljbVZ1ZEZScGJXVWdMeUJrZFhKaGRHbHZiaUE2SURBN1hHNGdJSDFjYmx4dUlDQmZZMjl0Y0hWMFpVWnlZVzFsSUNod2JHRjVhR1ZoWkN3Z2RHbHRaU3dnZEc5MFlXeEdjbUZ0WlhNc0lHWndjeWtnZTF4dUlDQWdJSEpsZEhWeWJpQW9hWE5HYVc1cGRHVW9kRzkwWVd4R2NtRnRaWE1wSUNZbUlIUnZkR0ZzUm5KaGJXVnpJRDRnTVNsY2JpQWdJQ0FnSUQ4Z1RXRjBhQzVtYkc5dmNpaHdiR0Y1YUdWaFpDQXFJQ2gwYjNSaGJFWnlZVzFsY3lBdElERXBLVnh1SUNBZ0lDQWdPaUJOWVhSb0xtWnNiMjl5S0dad2N5QXFJSFJwYldVcE8xeHVJQ0I5WEc1Y2JpQWdYMk52YlhCMWRHVkRkWEp5Wlc1MFJuSmhiV1VnS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxsOWpiMjF3ZFhSbFJuSmhiV1VvWEc0Z0lDQWdJQ0IwYUdsekxuQnliM0J6TG5Cc1lYbG9aV0ZrTENCMGFHbHpMbkJ5YjNCekxuUnBiV1VzWEc0Z0lDQWdJQ0IwYUdsekxuQnliM0J6TG5SdmRHRnNSbkpoYldWekxDQjBhR2x6TG5CeWIzQnpMbVp3YzF4dUlDQWdJQ2s3WEc0Z0lIMWNibHh1SUNCZloyVjBVMmw2WlZCeWIzQnpJQ2dwSUh0Y2JpQWdJQ0JqYjI1emRDQndjbTl3Y3lBOUlIUm9hWE11Y0hKdmNITTdYRzRnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUhkcFpIUm9PaUJ3Y205d2N5NTNhV1IwYUN4Y2JpQWdJQ0FnSUdobGFXZG9kRG9nY0hKdmNITXVhR1ZwWjJoMExGeHVJQ0FnSUNBZ2NHbDRaV3hTWVhScGJ6b2djSEp2Y0hNdWNHbDRaV3hTWVhScGJ5eGNiaUFnSUNBZ0lHTmhiblpoYzFkcFpIUm9PaUJ3Y205d2N5NWpZVzUyWVhOWGFXUjBhQ3hjYmlBZ0lDQWdJR05oYm5aaGMwaGxhV2RvZERvZ2NISnZjSE11WTJGdWRtRnpTR1ZwWjJoMExGeHVJQ0FnSUNBZ2RtbGxkM0J2Y25SWGFXUjBhRG9nY0hKdmNITXVkbWxsZDNCdmNuUlhhV1IwYUN4Y2JpQWdJQ0FnSUhacFpYZHdiM0owU0dWcFoyaDBPaUJ3Y205d2N5NTJhV1YzY0c5eWRFaGxhV2RvZEZ4dUlDQWdJSDA3WEc0Z0lIMWNibHh1SUNCeWRXNGdLQ2tnZTF4dUlDQWdJR2xtSUNnaGRHaHBjeTV6YTJWMFkyZ3BJSFJvY205M0lHNWxkeUJGY25KdmNpZ25jMmh2ZFd4a0lIZGhhWFFnZFc1MGFXd2djMnRsZEdOb0lHbHpJR3h2WVdSbFpDQmlaV1p2Y21VZ2RISjVhVzVuSUhSdklIQnNZWGtvS1NjcE8xeHVYRzRnSUNBZ0x5OGdVM1JoY25RZ1lXNGdZVzVwYldGMGFXOXVJR1p5WVcxbElHeHZiM0FnYVdZZ2JtVmpaWE56WVhKNVhHNGdJQ0FnYVdZZ0tIUm9hWE11YzJWMGRHbHVaM011Y0d4aGVXbHVaeUFoUFQwZ1ptRnNjMlVwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVjR3hoZVNncE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklFeGxkQ2R6SUd4bGRDQjBhR2x6SUhkaGNtNXBibWNnYUdGdVp5QmhjbTkxYm1RZ1ptOXlJR0VnWm1WM0lIWmxjbk5wYjI1ekxpNHVYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQjBhR2x6TG5OclpYUmphQzVrYVhOd2IzTmxJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQmpiMjV6YjJ4bExuZGhjbTRvSjBsdUlHTmhiblpoY3kxemEyVjBZMmhBTUM0d0xqSXpJSFJvWlNCa2FYTndiM05sS0NrZ1pYWmxiblFnYUdGeklHSmxaVzRnY21WdVlXMWxaQ0IwYnlCMWJteHZZV1FvS1NjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklFbHVJR05oYzJVZ2QyVWdZWEpsYmlkMElIQnNZWGxwYm1jZ2IzSWdZVzVwYldGMFpXUXNJRzFoYTJVZ2MzVnlaU0IzWlNCemRHbHNiQ0IwY21sbloyVnlJR0psWjJsdUlHMWxjM05oWjJVdUxpNWNiaUFnSUNCcFppQW9JWFJvYVhNdWNISnZjSE11YzNSaGNuUmxaQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NWZjMmxuYm1Gc1FtVm5hVzRvS1R0Y2JpQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdWMzUmhjblJsWkNBOUlIUnlkV1U3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnVW1WdVpHVnlJR0Z1SUdsdWFYUnBZV3dnWm5KaGJXVmNiaUFnSUNCMGFHbHpMblJwWTJzb0tUdGNiaUFnSUNCMGFHbHpMbkpsYm1SbGNpZ3BPMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh1SUNCOVhHNWNiaUFnWDJOaGJtTmxiRlJwYldWdmRYUnpJQ2dwSUh0Y2JpQWdJQ0JwWmlBb2RHaHBjeTVmY21GbUlDRTlJRzUxYkd3Z0ppWWdkSGx3Wlc5bUlIZHBibVJ2ZHlBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2RIbHdaVzltSUhkcGJtUnZkeTVqWVc1alpXeEJibWx0WVhScGIyNUdjbUZ0WlNBOVBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJQ0FnZDJsdVpHOTNMbU5oYm1ObGJFRnVhVzFoZEdsdmJrWnlZVzFsS0hSb2FYTXVYM0poWmlrN1hHNGdJQ0FnSUNCMGFHbHpMbDl5WVdZZ1BTQnVkV3hzTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZEdocGN5NWZjbVZqYjNKa1ZHbHRaVzkxZENBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCamJHVmhjbFJwYldWdmRYUW9kR2hwY3k1ZmNtVmpiM0prVkdsdFpXOTFkQ2s3WEc0Z0lDQWdJQ0IwYUdsekxsOXlaV052Y21SVWFXMWxiM1YwSUQwZ2JuVnNiRHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J3YkdGNUlDZ3BJSHRjYmlBZ0lDQnNaWFFnWVc1cGJXRjBaU0E5SUhSb2FYTXVjMlYwZEdsdVozTXVZVzVwYldGMFpUdGNiaUFnSUNCcFppQW9KMkZ1YVcxaGRHbHZiaWNnYVc0Z2RHaHBjeTV6WlhSMGFXNW5jeWtnZTF4dUlDQWdJQ0FnWVc1cGJXRjBaU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQmpiMjV6YjJ4bExuZGhjbTRvSjF0allXNTJZWE10YzJ0bGRHTm9YU0I3SUdGdWFXMWhkR2x2YmlCOUlHaGhjeUJpWldWdUlISmxibUZ0WldRZ2RHOGdleUJoYm1sdFlYUmxJSDBuS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0NGaGJtbHRZWFJsS1NCeVpYUjFjbTQ3WEc0Z0lDQWdhV1lnS0NGcGMwSnliM2R6WlhJb0tTa2dlMXh1SUNBZ0lDQWdZMjl1YzI5c1pTNWxjbkp2Y2lnblcyTmhiblpoY3kxemEyVjBZMmhkSUZkQlVrNDZJRlZ6YVc1bklIc2dZVzVwYldGMFpTQjlJR2x1SUU1dlpHVXVhbk1nYVhNZ2JtOTBJSGxsZENCemRYQndiM0owWldRbktUdGNiaUFnSUNBZ0lISmxkSFZ5Ymp0Y2JpQWdJQ0I5WEc0Z0lDQWdhV1lnS0hSb2FYTXVjSEp2Y0hNdWNHeGhlV2x1WnlrZ2NtVjBkWEp1TzF4dUlDQWdJR2xtSUNnaGRHaHBjeTV3Y205d2N5NXpkR0Z5ZEdWa0tTQjdYRzRnSUNBZ0lDQjBhR2x6TGw5emFXZHVZV3hDWldkcGJpZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1d2NtOXdjeTV6ZEdGeWRHVmtJRDBnZEhKMVpUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QmpiMjV6YjJ4bExteHZaeWduY0d4aGVTY3NJSFJvYVhNdWNISnZjSE11ZEdsdFpTbGNibHh1SUNBZ0lDOHZJRk4wWVhKMElHRWdjbVZ1WkdWeUlHeHZiM0JjYmlBZ0lDQjBhR2x6TG5CeWIzQnpMbkJzWVhscGJtY2dQU0IwY25WbE8xeHVJQ0FnSUhSb2FYTXVYMk5oYm1ObGJGUnBiV1Z2ZFhSektDazdYRzRnSUNBZ2RHaHBjeTVmYkdGemRGUnBiV1VnUFNCeWFXZG9kRTV2ZHlncE8xeHVJQ0FnSUhSb2FYTXVYM0poWmlBOUlIZHBibVJ2ZHk1eVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVW9kR2hwY3k1ZllXNXBiV0YwWlVoaGJtUnNaWElwTzF4dUlDQjlYRzVjYmlBZ2NHRjFjMlVnS0NrZ2UxeHVJQ0FnSUdsbUlDaDBhR2x6TG5CeWIzQnpMbkpsWTI5eVpHbHVaeWtnZEdocGN5NWxibVJTWldOdmNtUW9LVHRjYmlBZ0lDQjBhR2x6TG5CeWIzQnpMbkJzWVhscGJtY2dQU0JtWVd4elpUdGNibHh1SUNBZ0lIUm9hWE11WDJOaGJtTmxiRlJwYldWdmRYUnpLQ2s3WEc0Z0lIMWNibHh1SUNCMGIyZG5iR1ZRYkdGNUlDZ3BJSHRjYmlBZ0lDQnBaaUFvZEdocGN5NXdjbTl3Y3k1d2JHRjVhVzVuS1NCMGFHbHpMbkJoZFhObEtDazdYRzRnSUNBZ1pXeHpaU0IwYUdsekxuQnNZWGtvS1R0Y2JpQWdmVnh1WEc0Z0lDOHZJRk4wYjNBZ1lXNWtJSEpsYzJWMElIUnZJR1p5WVcxbElIcGxjbTljYmlBZ2MzUnZjQ0FvS1NCN1hHNGdJQ0FnZEdocGN5NXdZWFZ6WlNncE8xeHVJQ0FnSUhSb2FYTXVjSEp2Y0hNdVpuSmhiV1VnUFNBd08xeHVJQ0FnSUhSb2FYTXVjSEp2Y0hNdWNHeGhlV2hsWVdRZ1BTQXdPMXh1SUNBZ0lIUm9hWE11Y0hKdmNITXVkR2x0WlNBOUlEQTdYRzRnSUNBZ2RHaHBjeTV3Y205d2N5NWtaV3gwWVZScGJXVWdQU0F3TzF4dUlDQWdJSFJvYVhNdWNISnZjSE11YzNSaGNuUmxaQ0E5SUdaaGJITmxPMXh1SUNBZ0lIUm9hWE11Y21WdVpHVnlLQ2s3WEc0Z0lIMWNibHh1SUNCeVpXTnZjbVFnS0NrZ2UxeHVJQ0FnSUdsbUlDaDBhR2x6TG5CeWIzQnpMbkpsWTI5eVpHbHVaeWtnY21WMGRYSnVPMXh1SUNBZ0lHbG1JQ2doYVhOQ2NtOTNjMlZ5S0NrcElIdGNiaUFnSUNBZ0lHTnZibk52YkdVdVpYSnliM0lvSjF0allXNTJZWE10YzJ0bGRHTm9YU0JYUVZKT09pQlNaV052Y21ScGJtY2dabkp2YlNCT2IyUmxMbXB6SUdseklHNXZkQ0I1WlhRZ2MzVndjRzl5ZEdWa0p5azdYRzRnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZEdocGN5NXpkRzl3S0NrN1hHNGdJQ0FnZEdocGN5NXdjbTl3Y3k1d2JHRjVhVzVuSUQwZ2RISjFaVHRjYmlBZ0lDQjBhR2x6TG5CeWIzQnpMbkpsWTI5eVpHbHVaeUE5SUhSeWRXVTdYRzVjYmlBZ0lDQmpiMjV6ZENCbGVIQnZjblJQY0hSeklEMGdkR2hwY3k1ZlkzSmxZWFJsUlhod2IzSjBUM0IwYVc5dWN5aDdJSE5sY1hWbGJtTmxPaUIwY25WbElIMHBPMXh1WEc0Z0lDQWdZMjl1YzNRZ1puSmhiV1ZKYm5SbGNuWmhiQ0E5SURFZ0x5QjBhR2x6TG5CeWIzQnpMbVp3Y3p0Y2JpQWdJQ0F2THlCU1pXNWtaWElnWldGamFDQm1jbUZ0WlNCcGJpQjBhR1VnYzJWeGRXVnVZMlZjYmlBZ0lDQjBhR2x6TGw5allXNWpaV3hVYVcxbGIzVjBjeWdwTzF4dUlDQWdJR052Ym5OMElIUnBZMnNnUFNBb0tTQTlQaUI3WEc0Z0lDQWdJQ0JwWmlBb0lYUm9hWE11Y0hKdmNITXVjbVZqYjNKa2FXNW5LU0J5WlhSMWNtNGdVSEp2YldselpTNXlaWE52YkhabEtDazdYRzRnSUNBZ0lDQjBhR2x6TG5CeWIzQnpMbVJsYkhSaFZHbHRaU0E5SUdaeVlXMWxTVzUwWlhKMllXdzdYRzRnSUNBZ0lDQjBhR2x6TG5ScFkyc29LVHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1WNGNHOXlkRVp5WVcxbEtHVjRjRzl5ZEU5d2RITXBYRzRnSUNBZ0lDQWdJQzUwYUdWdUtDZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvSVhSb2FYTXVjSEp2Y0hNdWNtVmpiM0prYVc1bktTQnlaWFIxY200N0lDOHZJSGRoY3lCallXNWpaV3hzWldRZ1ltVm1iM0psWEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5NWtaV3gwWVZScGJXVWdQU0F3TzF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11Y0hKdmNITXVabkpoYldVckt6dGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV3Y205d2N5NW1jbUZ0WlNBOElIUm9hWE11Y0hKdmNITXVkRzkwWVd4R2NtRnRaWE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWNISnZjSE11ZEdsdFpTQXJQU0JtY21GdFpVbHVkR1Z5ZG1Gc08xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXdjbTl3Y3k1d2JHRjVhR1ZoWkNBOUlIUm9hWE11WDJOdmJYQjFkR1ZRYkdGNWFHVmhaQ2gwYUdsekxuQnliM0J6TG5ScGJXVXNJSFJvYVhNdWNISnZjSE11WkhWeVlYUnBiMjRwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmNtVmpiM0prVkdsdFpXOTFkQ0E5SUhObGRGUnBiV1Z2ZFhRb2RHbGpheXdnTUNrN1hHNGdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktDZEdhVzVwYzJobFpDQnlaV052Y21ScGJtY25LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDNOcFoyNWhiRVZ1WkNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWxibVJTWldOdmNtUW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YzNSdmNDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV5ZFc0b0tUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdkx5QlVjbWxuWjJWeUlHRWdjM1JoY25RZ1pYWmxiblFnWW1WbWIzSmxJSGRsSUdKbFoybHVJSEpsWTI5eVpHbHVaMXh1SUNBZ0lHbG1JQ2doZEdocGN5NXdjbTl3Y3k1emRHRnlkR1ZrS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbDl6YVdkdVlXeENaV2RwYmlncE8xeHVJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5NXpkR0Z5ZEdWa0lEMGdkSEoxWlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCVWNtbG5aMlZ5SUNkaVpXZHBiaUJ5WldOdmNtUW5JR1YyWlc1MFhHNGdJQ0FnYVdZZ0tIUm9hWE11YzJ0bGRHTm9JQ1ltSUhSNWNHVnZaaUIwYUdsekxuTnJaWFJqYUM1aVpXZHBibEpsWTI5eVpDQTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmZDNKaGNFTnZiblJsZUhSVFkyRnNaU2h3Y205d2N5QTlQaUIwYUdsekxuTnJaWFJqYUM1aVpXZHBibEpsWTI5eVpDaHdjbTl3Y3lrcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklFbHVhWFJwWVhSbElHRWdjM1J5WldGdGFXNW5JSE4wWVhKMElHbG1JRzVsWTJWemMyRnllVnh1SUNBZ0lITjBjbVZoYlZOMFlYSjBLR1Y0Y0c5eWRFOXdkSE1wWEc0Z0lDQWdJQ0F1WTJGMFkyZ29aWEp5SUQwK0lIdGNiaUFnSUNBZ0lDQWdZMjl1YzI5c1pTNWxjbkp2Y2lobGNuSXBPMXh1SUNBZ0lDQWdmU2xjYmlBZ0lDQWdJQzUwYUdWdUtISmxjM0J2Ym5ObElEMCtJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZjbUZtSUQwZ2QybHVaRzkzTG5KbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTaDBhV05yS1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0I5WEc1Y2JpQWdYM05wWjI1aGJFSmxaMmx1SUNncElIdGNiaUFnSUNCcFppQW9kR2hwY3k1emEyVjBZMmdnSmlZZ2RIbHdaVzltSUhSb2FYTXVjMnRsZEdOb0xtSmxaMmx1SUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0IwYUdsekxsOTNjbUZ3UTI5dWRHVjRkRk5qWVd4bEtIQnliM0J6SUQwK0lIUm9hWE11YzJ0bGRHTm9MbUpsWjJsdUtIQnliM0J6S1NrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1gzTnBaMjVoYkVWdVpDQW9LU0I3WEc0Z0lDQWdhV1lnS0hSb2FYTXVjMnRsZEdOb0lDWW1JSFI1Y0dWdlppQjBhR2x6TG5OclpYUmphQzVsYm1RZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVYM2R5WVhCRGIyNTBaWGgwVTJOaGJHVW9jSEp2Y0hNZ1BUNGdkR2hwY3k1emEyVjBZMmd1Wlc1a0tIQnliM0J6S1NrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1pXNWtVbVZqYjNKa0lDZ3BJSHRjYmlBZ0lDQmpiMjV6ZENCM1lYTlNaV052Y21ScGJtY2dQU0IwYUdsekxuQnliM0J6TG5KbFkyOXlaR2x1Wnp0Y2JseHVJQ0FnSUhSb2FYTXVYMk5oYm1ObGJGUnBiV1Z2ZFhSektDazdYRzRnSUNBZ2RHaHBjeTV3Y205d2N5NXlaV052Y21ScGJtY2dQU0JtWVd4elpUdGNiaUFnSUNCMGFHbHpMbkJ5YjNCekxtUmxiSFJoVkdsdFpTQTlJREE3WEc0Z0lDQWdkR2hwY3k1d2NtOXdjeTV3YkdGNWFXNW5JRDBnWm1Gc2MyVTdYRzVjYmlBZ0lDQXZMeUIwWld4c0lFTk1TU0IwYUdGMElITjBjbVZoYlNCb1lYTWdabWx1YVhOb1pXUmNiaUFnSUNCeVpYUjFjbTRnYzNSeVpXRnRSVzVrS0NsY2JpQWdJQ0FnSUM1allYUmphQ2hsY25JZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JqYjI1emIyeGxMbVZ5Y205eUtHVnljaWs3WEc0Z0lDQWdJQ0I5S1Z4dUlDQWdJQ0FnTG5Sb1pXNG9LQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQXZMeUJVY21sbloyVnlJQ2RsYm1RZ2NtVmpiM0prSnlCbGRtVnVkRnh1SUNBZ0lDQWdJQ0JwWmlBb2QyRnpVbVZqYjNKa2FXNW5JQ1ltSUhSb2FYTXVjMnRsZEdOb0lDWW1JSFI1Y0dWdlppQjBhR2x6TG5OclpYUmphQzVsYm1SU1pXTnZjbVFnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbDkzY21Gd1EyOXVkR1Y0ZEZOallXeGxLSEJ5YjNCeklEMCtJSFJvYVhNdWMydGxkR05vTG1WdVpGSmxZMjl5WkNod2NtOXdjeWtwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUtUdGNiaUFnZlZ4dVhHNGdJRjlqY21WaGRHVkZlSEJ2Y25SUGNIUnBiMjV6SUNodmNIUWdQU0I3ZlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0J6WlhGMVpXNWpaVG9nYjNCMExuTmxjWFZsYm1ObExGeHVJQ0FnSUNBZ2MyRjJaVG9nYjNCMExuTmhkbVVzWEc0Z0lDQWdJQ0JtY0hNNklIUm9hWE11Y0hKdmNITXVabkJ6TEZ4dUlDQWdJQ0FnWm5KaGJXVTZJRzl3ZEM1elpYRjFaVzVqWlNBL0lIUm9hWE11Y0hKdmNITXVabkpoYldVZ09pQjFibVJsWm1sdVpXUXNYRzRnSUNBZ0lDQm1hV3hsT2lCMGFHbHpMbk5sZEhScGJtZHpMbVpwYkdVc1hHNGdJQ0FnSUNCdVlXMWxPaUIwYUdsekxuTmxkSFJwYm1kekxtNWhiV1VzWEc0Z0lDQWdJQ0J3Y21WbWFYZzZJSFJvYVhNdWMyVjBkR2x1WjNNdWNISmxabWw0TEZ4dUlDQWdJQ0FnYzNWbVptbDRPaUIwYUdsekxuTmxkSFJwYm1kekxuTjFabVpwZUN4Y2JpQWdJQ0FnSUdWdVkyOWthVzVuT2lCMGFHbHpMbk5sZEhScGJtZHpMbVZ1WTI5a2FXNW5MRnh1SUNBZ0lDQWdaVzVqYjJScGJtZFJkV0ZzYVhSNU9pQjBhR2x6TG5ObGRIUnBibWR6TG1WdVkyOWthVzVuVVhWaGJHbDBlU3hjYmlBZ0lDQWdJSFJwYldWVGRHRnRjRG9nYjNCMExuUnBiV1ZUZEdGdGNDQjhmQ0JuWlhSVWFXMWxVM1JoYlhBb0tTeGNiaUFnSUNBZ0lIUnZkR0ZzUm5KaGJXVnpPaUJwYzBacGJtbDBaU2gwYUdsekxuQnliM0J6TG5SdmRHRnNSbkpoYldWektTQS9JRTFoZEdndWJXRjRLREFzSUhSb2FYTXVjSEp2Y0hNdWRHOTBZV3hHY21GdFpYTXBJRG9nTVRBd01GeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQmxlSEJ2Y25SR2NtRnRaU0FvYjNCMElEMGdlMzBwSUh0Y2JpQWdJQ0JwWmlBb0lYUm9hWE11YzJ0bGRHTm9LU0J5WlhSMWNtNGdVSEp2YldselpTNWhiR3dvVzEwcE8xeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ2RHaHBjeTV6YTJWMFkyZ3VjSEpsUlhod2IzSjBJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQjBhR2x6TG5OclpYUmphQzV3Y21WRmVIQnZjblFvS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCUGNIUnBiMjV6SUdadmNpQmxlSEJ2Y25RZ1puVnVZM1JwYjI1Y2JpQWdJQ0JzWlhRZ1pYaHdiM0owVDNCMGN5QTlJSFJvYVhNdVgyTnlaV0YwWlVWNGNHOXlkRTl3ZEdsdmJuTW9iM0IwS1R0Y2JseHVJQ0FnSUdOdmJuTjBJR05zYVdWdWRDQTlJR2RsZEVOc2FXVnVkRUZRU1NncE8xeHVJQ0FnSUd4bGRDQndJRDBnVUhKdmJXbHpaUzV5WlhOdmJIWmxLQ2s3WEc0Z0lDQWdhV1lnS0dOc2FXVnVkQ0FtSmlCdmNIUXVZMjl0YldsMElDWW1JSFI1Y0dWdlppQmpiR2xsYm5RdVkyOXRiV2wwSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0JqYjI1emRDQmpiMjF0YVhSUGNIUnpJRDBnWVhOemFXZHVLSHQ5TENCbGVIQnZjblJQY0hSektUdGNiaUFnSUNBZ0lHTnZibk4wSUdoaGMyZ2dQU0JqYkdsbGJuUXVZMjl0YldsMEtHTnZiVzFwZEU5d2RITXBPMXh1SUNBZ0lDQWdhV1lnS0dselVISnZiV2x6WlNob1lYTm9LU2tnY0NBOUlHaGhjMmc3WEc0Z0lDQWdJQ0JsYkhObElIQWdQU0JRY205dGFYTmxMbkpsYzI5c2RtVW9hR0Z6YUNrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJSEF1ZEdobGJpaG9ZWE5vSUQwK0lIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDlrYjBWNGNHOXlkRVp5WVcxbEtHRnpjMmxuYmloN2ZTd2daWGh3YjNKMFQzQjBjeXdnZXlCb1lYTm9PaUJvWVhOb0lIeDhJQ2NuSUgwcEtUdGNiaUFnSUNCOUtTNTBhR1Z1S0hKbGMzVnNkQ0E5UGlCN1hHNGdJQ0FnSUNBdkx5Qk5iM04wSUdOdmJXMXZiaUIxYzJWallYTmxJR2x6SUhSdklHVjRjRzl5ZENCaElITnBibWRzWlNCc1lYbGxjaXhjYmlBZ0lDQWdJQzh2SUhOdklHeGxkQ2R6SUc5d2RHbHRhWHBsSUhSb1pTQjFjMlZ5SUdWNGNHVnlhV1Z1WTJVZ1ptOXlJSFJvWVhRdVhHNGdJQ0FnSUNCcFppQW9jbVZ6ZFd4MExteGxibWQwYUNBOVBUMGdNU2tnY21WMGRYSnVJSEpsYzNWc2RGc3dYVHRjYmlBZ0lDQWdJR1ZzYzJVZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYmlBZ0lDQjlLVHRjYmlBZ2ZWeHVYRzRnSUY5a2IwVjRjRzl5ZEVaeVlXMWxJQ2hsZUhCdmNuUlBjSFJ6SUQwZ2UzMHBJSHRjYmlBZ0lDQjBhR2x6TGw5d2NtOXdjeTVsZUhCdmNuUnBibWNnUFNCMGNuVmxPMXh1WEc0Z0lDQWdMeThnVW1WemFYcGxJSFJ2SUc5MWRIQjFkQ0J5WlhOdmJIVjBhVzl1WEc0Z0lDQWdkR2hwY3k1eVpYTnBlbVVvS1R0Y2JseHVJQ0FnSUM4dklFUnlZWGNnWVhRZ2RHaHBjeUJ2ZFhSd2RYUWdjbVZ6YjJ4MWRHbHZibHh1SUNBZ0lHeGxkQ0JrY21GM1VtVnpkV3gwSUQwZ2RHaHBjeTV5Wlc1a1pYSW9LVHRjYmx4dUlDQWdJQzh2SUZSb1pTQnpaV3htSUc5M2JtVmtJR05oYm5aaGN5QW9iV0Y1SUdKbElIVnVaR1ZtYVc1bFpDNHVMaUVwWEc0Z0lDQWdZMjl1YzNRZ1kyRnVkbUZ6SUQwZ2RHaHBjeTV3Y205d2N5NWpZVzUyWVhNN1hHNWNiaUFnSUNBdkx5QkhaWFFnYkdsemRDQnZaaUJ5WlhOMWJIUnpJR1p5YjIwZ2NtVnVaR1Z5WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJrY21GM1VtVnpkV3gwSUQwOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQ0FnWkhKaGQxSmxjM1ZzZENBOUlGc2dZMkZ1ZG1GeklGMDdYRzRnSUNBZ2ZWeHVJQ0FnSUdSeVlYZFNaWE4xYkhRZ1BTQmJYUzVqYjI1allYUW9aSEpoZDFKbGMzVnNkQ2t1Wm1sc2RHVnlLRUp2YjJ4bFlXNHBPMXh1WEc0Z0lDQWdMeThnVkhKaGJuTm1iM0p0SUhSb1pTQmpZVzUyWVhNdlptbHNaU0JrWlhOamNtbHdkRzl5Y3lCcGJuUnZJR0VnWTI5dWMybHpkR1Z1ZENCbWIzSnRZWFFzWEc0Z0lDQWdMeThnWVc1a0lIQjFiR3dnYjNWMElHRnVlU0JrWVhSaElGVlNUSE1nWm5KdmJTQmpZVzUyWVhNZ1pXeGxiV1Z1ZEhOY2JpQWdJQ0JrY21GM1VtVnpkV3gwSUQwZ1pISmhkMUpsYzNWc2RDNXRZWEFvY21WemRXeDBJRDArSUh0Y2JpQWdJQ0FnSUdOdmJuTjBJR2hoYzBSaGRHRlBZbXBsWTNRZ1BTQjBlWEJsYjJZZ2NtVnpkV3gwSUQwOVBTQW5iMkpxWldOMEp5QW1KaUJ5WlhOMWJIUWdKaVlnS0Nka1lYUmhKeUJwYmlCeVpYTjFiSFFnZkh3Z0oyUmhkR0ZWVWt3bklHbHVJSEpsYzNWc2RDazdYRzRnSUNBZ0lDQmpiMjV6ZENCa1lYUmhJRDBnYUdGelJHRjBZVTlpYW1WamRDQS9JSEpsYzNWc2RDNWtZWFJoSURvZ2NtVnpkV3gwTzF4dUlDQWdJQ0FnWTI5dWMzUWdiM0IwY3lBOUlHaGhjMFJoZEdGUFltcGxZM1FnUHlCaGMzTnBaMjRvZTMwc0lISmxjM1ZzZEN3Z2V5QmtZWFJoSUgwcElEb2dleUJrWVhSaElIMDdYRzRnSUNBZ0lDQnBaaUFvYVhORFlXNTJZWE1vWkdGMFlTa3BJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdaVzVqYjJScGJtY2dQU0J2Y0hSekxtVnVZMjlrYVc1bklIeDhJR1Y0Y0c5eWRFOXdkSE11Wlc1amIyUnBibWM3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR1Z1WTI5a2FXNW5VWFZoYkdsMGVTQTlJR1JsWm1sdVpXUW9iM0IwY3k1bGJtTnZaR2x1WjFGMVlXeHBkSGtzSUdWNGNHOXlkRTl3ZEhNdVpXNWpiMlJwYm1kUmRXRnNhWFI1TENBd0xqazFLVHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdleUJrWVhSaFZWSk1MQ0JsZUhSbGJuTnBiMjRzSUhSNWNHVWdmU0E5SUdWNGNHOXlkRU5oYm5aaGN5aGtZWFJoTENCN0lHVnVZMjlrYVc1bkxDQmxibU52WkdsdVoxRjFZV3hwZEhrZ2ZTazdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQlBZbXBsWTNRdVlYTnphV2R1S0c5d2RITXNJSHNnWkdGMFlWVlNUQ3dnWlhoMFpXNXphVzl1TENCMGVYQmxJSDBwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzl3ZEhNN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNrN1hHNWNiaUFnSUNBdkx5Qk9iM2NnY21WMGRYSnVJSFJ2SUhKbFozVnNZWElnY21WdVpHVnlhVzVuSUcxdlpHVmNiaUFnSUNCMGFHbHpMbDl3Y205d2N5NWxlSEJ2Y25ScGJtY2dQU0JtWVd4elpUdGNiaUFnSUNCMGFHbHpMbkpsYzJsNlpTZ3BPMXh1SUNBZ0lIUm9hWE11Y21WdVpHVnlLQ2s3WEc1Y2JpQWdJQ0F2THlCQmJtUWdibTkzSUhkbElHTmhiaUJ6WVhabElHVmhZMmdnY21WemRXeDBYRzRnSUNBZ2NtVjBkWEp1SUZCeWIyMXBjMlV1WVd4c0tHUnlZWGRTWlhOMWJIUXViV0Z3S0NoeVpYTjFiSFFzSUdrc0lHeGhlV1Z5VEdsemRDa2dQVDRnZTF4dUlDQWdJQ0FnTHk4Z1Fua2daR1ZtWVhWc2RDd2dhV1lnY21WdVpHVnlhVzVuSUcxMWJIUnBjR3hsSUd4aGVXVnljeUIzWlNCM2FXeHNJR2RwZG1VZ2RHaGxiU0JwYm1ScFkyVnpYRzRnSUNBZ0lDQmpiMjV6ZENCamRYSlBjSFFnUFNCaGMzTnBaMjRvZTF4dUlDQWdJQ0FnSUNCbGVIUmxibk5wYjI0NklDY25MRnh1SUNBZ0lDQWdJQ0J3Y21WbWFYZzZJQ2NuTEZ4dUlDQWdJQ0FnSUNCemRXWm1hWGc2SUNjblhHNGdJQ0FnSUNCOUxDQmxlSEJ2Y25SUGNIUnpMQ0J5WlhOMWJIUXNJSHRjYmlBZ0lDQWdJQ0FnYkdGNVpYSTZJR2tzWEc0Z0lDQWdJQ0FnSUhSdmRHRnNUR0Y1WlhKek9pQnNZWGxsY2t4cGMzUXViR1Z1WjNSb1hHNGdJQ0FnSUNCOUtUdGNibHh1SUNBZ0lDQWdMeThnU1dZZ1pYaHdiM0owSUdseklHVjRjR3hwWTJsMGJIa2dibTkwSUhOaGRtbHVaeXdnYldGclpTQnpkWEpsSUc1dmRHaHBibWNnYzJGMlpYTmNiaUFnSUNBZ0lDOHZJRTkwYUdWeWQybHpaU0JrWldaaGRXeDBJSFJ2SUhSb1pTQnNZWGxsY2lCellYWmxJRzl3ZEdsdmJpd2diM0lnWm1Gc2JHSmhZMnNnZEc4Z2RISjFaVnh1SUNBZ0lDQWdZMjl1YzNRZ2MyRjJaVkJoY21GdElEMGdaWGh3YjNKMFQzQjBjeTV6WVhabElEMDlQU0JtWVd4elpTQS9JR1poYkhObElEb2djbVZ6ZFd4MExuTmhkbVU3WEc0Z0lDQWdJQ0JqZFhKUGNIUXVjMkYyWlNBOUlITmhkbVZRWVhKaGJTQWhQVDBnWm1Gc2MyVTdYRzVjYmlBZ0lDQWdJQzh2SUZKbGMyOXNkbVVnWVNCbWRXeHNJR1pwYkdWdVlXMWxJR1p5YjIwZ1lXeHNJSFJvWlNCdmNIUnBiMjV6WEc0Z0lDQWdJQ0JqZFhKUGNIUXVabWxzWlc1aGJXVWdQU0J5WlhOdmJIWmxSbWxzWlc1aGJXVW9ZM1Z5VDNCMEtUdGNibHh1SUNBZ0lDQWdMeThnUTJ4bFlXNGdkWEFnYzI5dFpTQndZWEpoYldWMFpYSnpJSFJvWVhRZ2JXRjVJR0psSUdGdFltbG5kVzkxY3lCMGJ5QjBhR1VnZFhObGNseHVJQ0FnSUNBZ1pHVnNaWFJsSUdOMWNrOXdkQzVsYm1OdlpHbHVaenRjYmlBZ0lDQWdJR1JsYkdWMFpTQmpkWEpQY0hRdVpXNWpiMlJwYm1kUmRXRnNhWFI1TzF4dVhHNGdJQ0FnSUNBdkx5QkRiR1ZoYmlCcGRDQjFjQ0JtZFhKMGFHVnlJR0o1SUdwMWMzUWdjbVZ0YjNacGJtY2dkVzVrWldacGJtVmtJSFpoYkhWbGMxeHVJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ2F5QnBiaUJqZFhKUGNIUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCamRYSlBjSFJiYTEwZ1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCa1pXeGxkR1VnWTNWeVQzQjBXMnRkTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCc1pYUWdjMkYyWlZCeWIyMXBjMlVnUFNCUWNtOXRhWE5sTG5KbGMyOXNkbVVvZTMwcE8xeHVJQ0FnSUNBZ2FXWWdLR04xY2s5d2RDNXpZWFpsS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRmRvWlhSb1pYSWdkRzhnWVdOMGRXRnNiSGtnYzJGMlpTQW9aRzkzYm14dllXUXBJSFJvYVhNZ1puSmhaMjFsYm5SY2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWkdGMFlTQTlJR04xY2s5d2RDNWtZWFJoTzF4dUlDQWdJQ0FnSUNCcFppQW9ZM1Z5VDNCMExtUmhkR0ZWVWt3cElIdGNiaUFnSUNBZ0lDQWdJQ0JqYjI1emRDQmtZWFJoVlZKTUlEMGdZM1Z5VDNCMExtUmhkR0ZWVWt3N1hHNGdJQ0FnSUNBZ0lDQWdjMkYyWlZCeWIyMXBjMlVnUFNCellYWmxSR0YwWVZWU1RDaGtZWFJoVlZKTUxDQmpkWEpQY0hRcE8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJSE5oZG1WUWNtOXRhWE5sSUQwZ2MyRjJaVVpwYkdVb1pHRjBZU3dnWTNWeVQzQjBLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJSE5oZG1WUWNtOXRhWE5sTG5Sb1pXNG9jMkYyWlZKbGMzVnNkQ0E5UGlCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCUFltcGxZM1F1WVhOemFXZHVLSHQ5TENCamRYSlBjSFFzSUhOaGRtVlNaWE4xYkhRcE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZTa3BMblJvWlc0b1pYWWdQVDRnZTF4dUlDQWdJQ0FnWTI5dWMzUWdjMkYyWldSRmRtVnVkSE1nUFNCbGRpNW1hV3gwWlhJb1pTQTlQaUJsTG5OaGRtVXBPMXh1SUNBZ0lDQWdhV1lnS0hOaGRtVmtSWFpsYm5SekxteGxibWQwYUNBK0lEQXBJSHRjYmlBZ0lDQWdJQ0FnTHk4Z1RHOW5JSFJvWlNCellYWmxaQ0JsZUhCdmNuUnpYRzRnSUNBZ0lDQWdJR052Ym5OMElHVjJaVzUwVjJsMGFFOTFkSEIxZENBOUlITmhkbVZrUlhabGJuUnpMbVpwYm1Rb1pTQTlQaUJsTG05MWRIQjFkRTVoYldVcE8xeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCcGMwTnNhV1Z1ZENBOUlITmhkbVZrUlhabGJuUnpMbk52YldVb1pTQTlQaUJsTG1Oc2FXVnVkQ2s3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR2x6VTNSeVpXRnRhVzVuSUQwZ2MyRjJaV1JGZG1WdWRITXVjMjl0WlNobElEMCtJR1V1YzNSeVpXRnRLVHRjYmlBZ0lDQWdJQ0FnYkdWMElHbDBaVzA3WEc0Z0lDQWdJQ0FnSUM4dklHMWhibmtnWm1sc1pYTXNJR3AxYzNRZ2JHOW5JR2h2ZHlCdFlXNTVJSGRsY21VZ1pYaHdiM0owWldSY2JpQWdJQ0FnSUNBZ2FXWWdLSE5oZG1Wa1JYWmxiblJ6TG14bGJtZDBhQ0ErSURFcElHbDBaVzBnUFNCellYWmxaRVYyWlc1MGN5NXNaVzVuZEdnN1hHNGdJQ0FnSUNBZ0lDOHZJR2x1SUVOTVNTd2dkMlVnYTI1dmR5QmxlR0ZqZENCd1lYUm9JR1JwY201aGJXVmNiaUFnSUNBZ0lDQWdaV3h6WlNCcFppQW9aWFpsYm5SWGFYUm9UM1YwY0hWMEtTQnBkR1Z0SUQwZ1lDUjdaWFpsYm5SWGFYUm9UM1YwY0hWMExtOTFkSEIxZEU1aGJXVjlMeVI3YzJGMlpXUkZkbVZ1ZEhOYk1GMHVabWxzWlc1aGJXVjlZRHRjYmlBZ0lDQWdJQ0FnTHk4Z2FXNGdZbkp2ZDNObGNpd2dkMlVnWTJGdUlHOXViSGtnYTI1dmR5QnBkQ0IzWlc1MElIUnZJRndpWW5KdmQzTmxjaUJrYjNkdWJHOWhaQ0JtYjJ4a1pYSmNJbHh1SUNBZ0lDQWdJQ0JsYkhObElHbDBaVzBnUFNCZ0pIdHpZWFpsWkVWMlpXNTBjMXN3WFM1bWFXeGxibUZ0WlgxZ08xeHVJQ0FnSUNBZ0lDQnNaWFFnYjJaVFpYRWdQU0FuSnp0Y2JpQWdJQ0FnSUNBZ2FXWWdLR1Y0Y0c5eWRFOXdkSE11YzJWeGRXVnVZMlVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCb1lYTlViM1JoYkVaeVlXMWxjeUE5SUdselJtbHVhWFJsS0hSb2FYTXVjSEp2Y0hNdWRHOTBZV3hHY21GdFpYTXBPMXh1SUNBZ0lDQWdJQ0FnSUc5bVUyVnhJRDBnYUdGelZHOTBZV3hHY21GdFpYTWdQeUJnSUNobWNtRnRaU0FrZTJWNGNHOXlkRTl3ZEhNdVpuSmhiV1VnS3lBeGZTQXZJQ1I3ZEdocGN5NXdjbTl3Y3k1MGIzUmhiRVp5WVcxbGMzMHBZQ0E2SUdBZ0tHWnlZVzFsSUNSN1pYaHdiM0owVDNCMGN5NW1jbUZ0WlgwcFlEdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h6WVhabFpFVjJaVzUwY3k1c1pXNW5kR2dnUGlBeEtTQjdYRzRnSUNBZ0lDQWdJQ0FnYjJaVFpYRWdQU0JnSUdacGJHVnpZRHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCamIyNXpkQ0JqYkdsbGJuUWdQU0JwYzBOc2FXVnVkQ0EvSUNkallXNTJZWE10YzJ0bGRHTm9MV05zYVNjZ09pQW5ZMkZ1ZG1GekxYTnJaWFJqYUNjN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUdGamRHbHZiaUE5SUdselUzUnlaV0Z0YVc1bklEOGdKMU4wY21WaGJXbHVaeUJwYm5Sdkp5QTZJQ2RGZUhCdmNuUmxaQ2M3WEc0Z0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHQWxZMXNrZTJOc2FXVnVkSDFkSldNZ0pIdGhZM1JwYjI1OUlDVmpKSHRwZEdWdGZTVmpKSHR2WmxObGNYMWdMQ0FuWTI5c2IzSTZJQ000WlRobE9HVTdKeXdnSjJOdmJHOXlPaUJwYm1sMGFXRnNPeWNzSUNkbWIyNTBMWGRsYVdkb2REb2dZbTlzWkRzbkxDQW5abTl1ZEMxM1pXbG5hSFE2SUdsdWFYUnBZV3c3SnlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlIUm9hWE11YzJ0bGRHTm9MbkJ2YzNSRmVIQnZjblFnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXphMlYwWTJndWNHOXpkRVY0Y0c5eWRDZ3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdjbVYwZFhKdUlHVjJPMXh1SUNBZ0lIMHBPMXh1SUNCOVhHNWNiaUFnWDNkeVlYQkRiMjUwWlhoMFUyTmhiR1VnS0dOaUtTQjdYRzRnSUNBZ2RHaHBjeTVmY0hKbFVtVnVaR1Z5S0NrN1hHNGdJQ0FnWTJJb2RHaHBjeTV3Y205d2N5azdYRzRnSUNBZ2RHaHBjeTVmY0c5emRGSmxibVJsY2lncE8xeHVJQ0I5WEc1Y2JpQWdYM0J5WlZKbGJtUmxjaUFvS1NCN1hHNGdJQ0FnWTI5dWMzUWdjSEp2Y0hNZ1BTQjBhR2x6TG5CeWIzQnpPMXh1WEc0Z0lDQWdMeThnVTJOaGJHVWdZMjl1ZEdWNGRDQm1iM0lnZFc1cGRDQnphWHBwYm1kY2JpQWdJQ0JwWmlBb0lYUm9hWE11Y0hKdmNITXVaMndnSmlZZ2NISnZjSE11WTI5dWRHVjRkQ0FtSmlBaGNISnZjSE11Y0RVcElIdGNiaUFnSUNBZ0lIQnliM0J6TG1OdmJuUmxlSFF1YzJGMlpTZ3BPMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXVjMlYwZEdsdVozTXVjMk5oYkdWRGIyNTBaWGgwSUNFOVBTQm1ZV3h6WlNrZ2UxeHVJQ0FnSUNBZ0lDQndjbTl3Y3k1amIyNTBaWGgwTG5OallXeGxLSEJ5YjNCekxuTmpZV3hsV0N3Z2NISnZjSE11YzJOaGJHVlpLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLSEJ5YjNCekxuQTFLU0I3WEc0Z0lDQWdJQ0J3Y205d2N5NXdOUzV6WTJGc1pTaHdjbTl3Y3k1elkyRnNaVmdnTHlCd2NtOXdjeTV3YVhobGJGSmhkR2x2TENCd2NtOXdjeTV6WTJGc1pWa2dMeUJ3Y205d2N5NXdhWGhsYkZKaGRHbHZLVHRjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0JmY0c5emRGSmxibVJsY2lBb0tTQjdYRzRnSUNBZ1kyOXVjM1FnY0hKdmNITWdQU0IwYUdsekxuQnliM0J6TzF4dVhHNGdJQ0FnYVdZZ0tDRjBhR2x6TG5CeWIzQnpMbWRzSUNZbUlIQnliM0J6TG1OdmJuUmxlSFFnSmlZZ0lYQnliM0J6TG5BMUtTQjdYRzRnSUNBZ0lDQndjbTl3Y3k1amIyNTBaWGgwTG5KbGMzUnZjbVVvS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCR2JIVnphQ0JpZVNCa1pXWmhkV3gwTENCMGFHbHpJRzFoZVNCaVpTQnlaWFpwYzJsMFpXUWdZWFFnWVNCc1lYUmxjaUJ3YjJsdWRDNWNiaUFnSUNBdkx5QlhaU0JrYnlCMGFHbHpJSFJ2SUdWdWMzVnlaU0IwYjBSaGRHRlZVa3dnWTJGdUlHSmxJR05oYkd4bFpDQnBiVzFsWkdsaGRHVnNlU0JoWm5SbGNpNWNiaUFnSUNBdkx5Qk5iM04wSUd4cGEyVnNlU0JpY205M2MyVnljeUJoYkhKbFlXUjVJR2hoYm1Sc1pTQjBhR2x6TENCemJ5QjNaU0J0WVhrZ2NtVjJhWE5wZENCMGFHbHpJR0Z1WkZ4dUlDQWdJQzh2SUhKbGJXOTJaU0JwZENCcFppQnBkQ0JwYlhCeWIzWmxjeUJ3WlhKbWIzSnRZVzVqWlNCM2FYUm9iM1YwSUdGdWVTQjFjMkZpYVd4cGRIa2dhWE56ZFdWekxseHVJQ0FnSUdsbUlDaHdjbTl3Y3k1bmJDQW1KaUIwYUdsekxuTmxkSFJwYm1kekxtWnNkWE5vSUNFOVBTQm1ZV3h6WlNBbUppQWhjSEp2Y0hNdWNEVXBJSHRjYmlBZ0lDQWdJSEJ5YjNCekxtZHNMbVpzZFhOb0tDazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdkR2xqYXlBb0tTQjdYRzRnSUNBZ2FXWWdLSFJvYVhNdWMydGxkR05vSUNZbUlIUjVjR1Z2WmlCMGFHbHpMbk5yWlhSamFDNTBhV05ySUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0IwYUdsekxsOXdjbVZTWlc1a1pYSW9LVHRjYmlBZ0lDQWdJSFJvYVhNdWMydGxkR05vTG5ScFkyc29kR2hwY3k1d2NtOXdjeWs3WEc0Z0lDQWdJQ0IwYUdsekxsOXdiM04wVW1WdVpHVnlLQ2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnY21WdVpHVnlJQ2dwSUh0Y2JpQWdJQ0JwWmlBb2RHaHBjeTV3Y205d2N5NXdOU2tnZTF4dUlDQWdJQ0FnZEdocGN5NWZiR0Z6ZEZKbFpISmhkMUpsYzNWc2RDQTlJSFZ1WkdWbWFXNWxaRHRjYmlBZ0lDQWdJSFJvYVhNdWNISnZjSE11Y0RVdWNtVmtjbUYzS0NrN1hHNGdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWZiR0Z6ZEZKbFpISmhkMUpsYzNWc2REdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWMzVmliV2wwUkhKaGQwTmhiR3dvS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCemRXSnRhWFJFY21GM1EyRnNiQ0FvS1NCN1hHNGdJQ0FnYVdZZ0tDRjBhR2x6TG5OclpYUmphQ2tnY21WMGRYSnVPMXh1WEc0Z0lDQWdZMjl1YzNRZ2NISnZjSE1nUFNCMGFHbHpMbkJ5YjNCek8xeHVJQ0FnSUhSb2FYTXVYM0J5WlZKbGJtUmxjaWdwTzF4dVhHNGdJQ0FnYkdWMElHUnlZWGRTWlhOMWJIUTdYRzVjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JSFJvYVhNdWMydGxkR05vSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0JrY21GM1VtVnpkV3gwSUQwZ2RHaHBjeTV6YTJWMFkyZ29jSEp2Y0hNcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RIbHdaVzltSUhSb2FYTXVjMnRsZEdOb0xuSmxibVJsY2lBOVBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJQ0FnWkhKaGQxSmxjM1ZzZENBOUlIUm9hWE11YzJ0bGRHTm9MbkpsYm1SbGNpaHdjbTl3Y3lrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnZEdocGN5NWZjRzl6ZEZKbGJtUmxjaWdwTzF4dVhHNGdJQ0FnY21WMGRYSnVJR1J5WVhkU1pYTjFiSFE3WEc0Z0lIMWNibHh1SUNCMWNHUmhkR1VnS0c5d2RDQTlJSHQ5S1NCN1hHNGdJQ0FnTHk4Z1EzVnljbVZ1ZEd4NUlIVndaR0YwWlNncElHbHpJRzl1YkhrZ1ptOWpkWE5sWkNCdmJpQnlaWE5wZW1sdVp5eGNiaUFnSUNBdkx5QmlkWFFnYkdGMFpYSWdkMlVnZDJsc2JDQnpkWEJ3YjNKMElHOTBhR1Z5SUc5d2RHbHZibk1nYkdsclpTQnpkMmwwWTJocGJtZGNiaUFnSUNBdkx5Qm1jbUZ0WlhNZ1lXNWtJSE4xWTJndVhHNGdJQ0FnWTI5dWMzUWdibTkwV1dWMFUzVndjRzl5ZEdWa0lEMGdXMXh1SUNBZ0lDQWdKMkZ1YVcxaGRHVW5YRzRnSUNBZ1hUdGNibHh1SUNBZ0lFOWlhbVZqZEM1clpYbHpLRzl3ZENrdVptOXlSV0ZqYUNoclpYa2dQVDRnZTF4dUlDQWdJQ0FnYVdZZ0tHNXZkRmxsZEZOMWNIQnZjblJsWkM1cGJtUmxlRTltS0d0bGVTa2dQajBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb1lGTnZjbko1TENCMGFHVWdleUFrZTJ0bGVYMGdmU0J2Y0hScGIyNGdhWE1nYm05MElIbGxkQ0J6ZFhCd2IzSjBaV1FnZDJsMGFDQjFjR1JoZEdVb0tTNWdLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlLVHRjYmx4dUlDQWdJR052Ym5OMElHOXNaRU5oYm5aaGN5QTlJSFJvYVhNdVgzTmxkSFJwYm1kekxtTmhiblpoY3p0Y2JpQWdJQ0JqYjI1emRDQnZiR1JEYjI1MFpYaDBJRDBnZEdocGN5NWZjMlYwZEdsdVozTXVZMjl1ZEdWNGREdGNibHh1SUNBZ0lDOHZJRTFsY21kbElHNWxkeUJ2Y0hScGIyNXpJR2x1ZEc4Z2MyVjBkR2x1WjNOY2JpQWdJQ0JtYjNJZ0tHeGxkQ0JyWlhrZ2FXNGdiM0IwS1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0IyWVd4MVpTQTlJRzl3ZEZ0clpYbGRPMXh1SUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUIyWVd4MVpTQWhQVDBnSjNWdVpHVm1hVzVsWkNjcElIc2dMeThnYVdkdWIzSmxJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lDQWdJQ0IwYUdsekxsOXpaWFIwYVc1bmMxdHJaWGxkSUQwZ2RtRnNkV1U3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnVFdWeVoyVWdhVzRnZEdsdFpTQndjbTl3YzF4dUlDQWdJR052Ym5OMElIUnBiV1ZQY0hSeklEMGdUMkpxWldOMExtRnpjMmxuYmloN2ZTd2dkR2hwY3k1ZmMyVjBkR2x1WjNNc0lHOXdkQ2s3WEc0Z0lDQWdhV1lnS0NkMGFXMWxKeUJwYmlCdmNIUWdKaVlnSjJaeVlXMWxKeUJwYmlCdmNIUXBJSFJvY205M0lHNWxkeUJGY25KdmNpZ25XVzkxSUhOb2IzVnNaQ0J6Y0dWamFXWjVJSHNnZEdsdFpTQjlJRzl5SUhzZ1puSmhiV1VnZlNCaWRYUWdibTkwSUdKdmRHZ25LVHRjYmlBZ0lDQmxiSE5sSUdsbUlDZ25kR2x0WlNjZ2FXNGdiM0IwS1NCa1pXeGxkR1VnZEdsdFpVOXdkSE11Wm5KaGJXVTdYRzRnSUNBZ1pXeHpaU0JwWmlBb0oyWnlZVzFsSnlCcGJpQnZjSFFwSUdSbGJHVjBaU0IwYVcxbFQzQjBjeTUwYVcxbE8xeHVJQ0FnSUdsbUlDZ25aSFZ5WVhScGIyNG5JR2x1SUc5d2RDQW1KaUFuZEc5MFlXeEdjbUZ0WlhNbklHbHVJRzl3ZENrZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkWmIzVWdjMmh2ZFd4a0lITndaV05wWm5rZ2V5QmtkWEpoZEdsdmJpQjlJRzl5SUhzZ2RHOTBZV3hHY21GdFpYTWdmU0JpZFhRZ2JtOTBJR0p2ZEdnbktUdGNiaUFnSUNCbGJITmxJR2xtSUNnblpIVnlZWFJwYjI0bklHbHVJRzl3ZENrZ1pHVnNaWFJsSUhScGJXVlBjSFJ6TG5SdmRHRnNSbkpoYldWek8xeHVJQ0FnSUdWc2MyVWdhV1lnS0NkMGIzUmhiRVp5WVcxbGN5Y2dhVzRnYjNCMEtTQmtaV3hsZEdVZ2RHbHRaVTl3ZEhNdVpIVnlZWFJwYjI0N1hHNWNiaUFnSUNBdkx5Qk5aWEpuWlNCcGJpQjFjMlZ5SUdSaGRHRWdkMmwwYUc5MWRDQmpiM0I1YVc1blhHNGdJQ0FnYVdZZ0tDZGtZWFJoSnlCcGJpQnZjSFFwSUhSb2FYTXVYM0J5YjNCekxtUmhkR0VnUFNCdmNIUXVaR0YwWVR0Y2JseHVJQ0FnSUdOdmJuTjBJSFJwYldWUWNtOXdjeUE5SUhSb2FYTXVaMlYwVkdsdFpWQnliM0J6S0hScGJXVlBjSFJ6S1R0Y2JpQWdJQ0JQWW1wbFkzUXVZWE56YVdkdUtIUm9hWE11WDNCeWIzQnpMQ0IwYVcxbFVISnZjSE1wTzF4dVhHNGdJQ0FnTHk4Z1NXWWdaV2wwYUdWeUlHTmhiblpoY3lCdmNpQmpiMjUwWlhoMElHbHpJR05vWVc1blpXUXNJSGRsSUhOb2IzVnNaQ0J5WlMxMWNHUmhkR1ZjYmlBZ0lDQnBaaUFvYjJ4a1EyRnVkbUZ6SUNFOVBTQjBhR2x6TGw5elpYUjBhVzVuY3k1allXNTJZWE1nZkh3Z2IyeGtRMjl1ZEdWNGRDQWhQVDBnZEdocGN5NWZjMlYwZEdsdVozTXVZMjl1ZEdWNGRDa2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ2V5QmpZVzUyWVhNc0lHTnZiblJsZUhRZ2ZTQTlJR055WldGMFpVTmhiblpoY3loMGFHbHpMbDl6WlhSMGFXNW5jeWs3WEc1Y2JpQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdVkyRnVkbUZ6SUQwZ1kyRnVkbUZ6TzF4dUlDQWdJQ0FnZEdocGN5NXdjbTl3Y3k1amIyNTBaWGgwSUQwZ1kyOXVkR1Y0ZER0Y2JseHVJQ0FnSUNBZ0x5OGdSR1ZzWlhSbElHOXlJR0ZrWkNCaElDZG5iQ2NnY0hKdmNDQm1iM0lnWTI5dWRtVnVhV1Z1WTJWY2JpQWdJQ0FnSUhSb2FYTXVYM05sZEhWd1IweExaWGtvS1R0Y2JseHVJQ0FnSUNBZ0x5OGdVbVV0Ylc5MWJuUWdkR2hsSUc1bGR5QmpZVzUyWVhNZ2FXWWdhWFFnYUdGeklHNXZJSEJoY21WdWRGeHVJQ0FnSUNBZ2RHaHBjeTVmWVhCd1pXNWtRMkZ1ZG1GelNXWk9aV1ZrWldRb0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QlRjR1ZqYVdGc0lHTmhjMlVnZEc4Z2MzVndjRzl5ZENCUU5TNXFjMXh1SUNBZ0lHbG1JQ2h2Y0hRdWNEVWdKaVlnZEhsd1pXOW1JRzl3ZEM1d05TQWhQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5NXdOU0E5SUc5d2RDNXdOVHRjYmlBZ0lDQWdJSFJvYVhNdWNISnZjSE11Y0RVdVpISmhkeUE5SUNncElEMCtJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11WDJselVEVlNaWE5wZW1sdVp5a2djbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5c1lYTjBVbVZrY21GM1VtVnpkV3gwSUQwZ2RHaHBjeTV6ZFdKdGFYUkVjbUYzUTJGc2JDZ3BPMXh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJWY0dSaGRHVWdjR3hoZVdsdVp5QnpkR0YwWlNCcFppQnVaV05sYzNOaGNubGNiaUFnSUNCcFppQW9KM0JzWVhscGJtY25JR2x1SUc5d2RDa2dlMXh1SUNBZ0lDQWdhV1lnS0c5d2RDNXdiR0Y1YVc1bktTQjBhR2x6TG5Cc1lYa29LVHRjYmlBZ0lDQWdJR1ZzYzJVZ2RHaHBjeTV3WVhWelpTZ3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHTm9aV05yVTJWMGRHbHVaM01vZEdocGN5NWZjMlYwZEdsdVozTXBPMXh1WEc0Z0lDQWdMeThnUkhKaGR5QnVaWGNnWm5KaGJXVmNiaUFnSUNCMGFHbHpMbkpsYzJsNlpTZ3BPMXh1SUNBZ0lIUm9hWE11Y21WdVpHVnlLQ2s3WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE11Y0hKdmNITTdYRzRnSUgxY2JseHVJQ0J5WlhOcGVtVWdLQ2tnZTF4dUlDQWdJR052Ym5OMElHOXNaRk5wZW1WeklEMGdkR2hwY3k1ZloyVjBVMmw2WlZCeWIzQnpLQ2s3WEc1Y2JpQWdJQ0JqYjI1emRDQnpaWFIwYVc1bmN5QTlJSFJvYVhNdWMyVjBkR2x1WjNNN1hHNGdJQ0FnWTI5dWMzUWdjSEp2Y0hNZ1BTQjBhR2x6TG5CeWIzQnpPMXh1WEc0Z0lDQWdMeThnVW1WamIyMXdkWFJsSUc1bGR5QndjbTl3WlhKMGFXVnpJR0poYzJWa0lHOXVJR04xY25KbGJuUWdjMlYwZFhCY2JpQWdJQ0JqYjI1emRDQnVaWGRRY205d2N5QTlJSEpsYzJsNlpVTmhiblpoY3lod2NtOXdjeXdnYzJWMGRHbHVaM01wTzF4dVhHNGdJQ0FnTHk4Z1FYTnphV2R1SUhSdklHTjFjbkpsYm5RZ2NISnZjSE5jYmlBZ0lDQlBZbXBsWTNRdVlYTnphV2R1S0hSb2FYTXVYM0J5YjNCekxDQnVaWGRRY205d2N5azdYRzVjYmlBZ0lDQXZMeUJPYjNjZ2QyVWdZV04wZFdGc2JIa2dkWEJrWVhSbElIUm9aU0JqWVc1MllYTWdkMmxrZEdndmFHVnBaMmgwSUdGdVpDQnpkSGxzWlNCd2NtOXdjMXh1SUNBZ0lHTnZibk4wSUh0Y2JpQWdJQ0FnSUhCcGVHVnNVbUYwYVc4c1hHNGdJQ0FnSUNCallXNTJZWE5YYVdSMGFDeGNiaUFnSUNBZ0lHTmhiblpoYzBobGFXZG9kQ3hjYmlBZ0lDQWdJSE4wZVd4bFYybGtkR2dzWEc0Z0lDQWdJQ0J6ZEhsc1pVaGxhV2RvZEZ4dUlDQWdJSDBnUFNCMGFHbHpMbkJ5YjNCek8xeHVYRzRnSUNBZ0x5OGdWWEJrWVhSbElHTmhiblpoY3lCelpYUjBhVzVuYzF4dUlDQWdJR052Ym5OMElHTmhiblpoY3lBOUlIUm9hWE11Y0hKdmNITXVZMkZ1ZG1Gek8xeHVJQ0FnSUdsbUlDaGpZVzUyWVhNZ0ppWWdjMlYwZEdsdVozTXVjbVZ6YVhwbFEyRnVkbUZ6SUNFOVBTQm1ZV3h6WlNrZ2UxeHVJQ0FnSUNBZ2FXWWdLSEJ5YjNCekxuQTFLU0I3WEc0Z0lDQWdJQ0FnSUM4dklGQTFMbXB6SUhOd1pXTnBabWxqSUdWa1oyVWdZMkZ6WlZ4dUlDQWdJQ0FnSUNCcFppQW9ZMkZ1ZG1GekxuZHBaSFJvSUNFOVBTQmpZVzUyWVhOWGFXUjBhQ0I4ZkNCallXNTJZWE11YUdWcFoyaDBJQ0U5UFNCallXNTJZWE5JWldsbmFIUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbDlwYzFBMVVtVnphWHBwYm1jZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNBZ0lDOHZJRlJvYVhNZ1kyRjFjMlZ6SUdFZ2NtVXRaSEpoZHlBNlhGd2djMjhnZDJVZ2FXZHViM0psSUdSeVlYZHpJR2x1SUhSb1pTQnRaV0Z1SUhScGJXVXVMaTRnYzI5eWRHRWdhR0ZqYTNsY2JpQWdJQ0FnSUNBZ0lDQndjbTl3Y3k1d05TNXdhWGhsYkVSbGJuTnBkSGtvY0dsNFpXeFNZWFJwYnlrN1hHNGdJQ0FnSUNBZ0lDQWdjSEp2Y0hNdWNEVXVjbVZ6YVhwbFEyRnVkbUZ6S0dOaGJuWmhjMWRwWkhSb0lDOGdjR2w0Wld4U1lYUnBieXdnWTJGdWRtRnpTR1ZwWjJoMElDOGdjR2w0Wld4U1lYUnBieXdnWm1Gc2MyVXBPMXh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMmx6VURWU1pYTnBlbWx1WnlBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBdkx5QkdiM0pqWlNCallXNTJZWE1nYzJsNlpWeHVJQ0FnSUNBZ0lDQnBaaUFvWTJGdWRtRnpMbmRwWkhSb0lDRTlQU0JqWVc1MllYTlhhV1IwYUNrZ1kyRnVkbUZ6TG5kcFpIUm9JRDBnWTJGdWRtRnpWMmxrZEdnN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hqWVc1MllYTXVhR1ZwWjJoMElDRTlQU0JqWVc1MllYTklaV2xuYUhRcElHTmhiblpoY3k1b1pXbG5hSFFnUFNCallXNTJZWE5JWldsbmFIUTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQXZMeUJWY0dSaGRHVWdZMkZ1ZG1GeklITjBlV3hsWEc0Z0lDQWdJQ0JwWmlBb2FYTkNjbTkzYzJWeUtDa2dKaVlnYzJWMGRHbHVaM011YzNSNWJHVkRZVzUyWVhNZ0lUMDlJR1poYkhObEtTQjdYRzRnSUNBZ0lDQWdJR05oYm5aaGN5NXpkSGxzWlM1M2FXUjBhQ0E5SUdBa2UzTjBlV3hsVjJsa2RHaDljSGhnTzF4dUlDQWdJQ0FnSUNCallXNTJZWE11YzNSNWJHVXVhR1ZwWjJoMElEMGdZQ1I3YzNSNWJHVklaV2xuYUhSOWNIaGdPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lHTnZibk4wSUc1bGQxTnBlbVZ6SUQwZ2RHaHBjeTVmWjJWMFUybDZaVkJ5YjNCektDazdYRzRnSUNBZ2JHVjBJR05vWVc1blpXUWdQU0FoWkdWbGNFVnhkV0ZzS0c5c1pGTnBlbVZ6TENCdVpYZFRhWHBsY3lrN1hHNGdJQ0FnYVdZZ0tHTm9ZVzVuWldRcElIdGNiaUFnSUNBZ0lIUm9hWE11WDNOcGVtVkRhR0Z1WjJWa0tDazdYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGRIVnliaUJqYUdGdVoyVmtPMXh1SUNCOVhHNWNiaUFnWDNOcGVtVkRhR0Z1WjJWa0lDZ3BJSHRjYmlBZ0lDQXZMeUJUWlc1a0lISmxjMmw2WlNCbGRtVnVkQ0IwYnlCemEyVjBZMmhjYmlBZ0lDQnBaaUFvZEdocGN5NXphMlYwWTJnZ0ppWWdkSGx3Wlc5bUlIUm9hWE11YzJ0bGRHTm9MbkpsYzJsNlpTQTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTV6YTJWMFkyZ3VjbVZ6YVhwbEtIUm9hWE11Y0hKdmNITXBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR0Z1YVcxaGRHVWdLQ2tnZTF4dUlDQWdJR2xtSUNnaGRHaHBjeTV3Y205d2N5NXdiR0Y1YVc1bktTQnlaWFIxY200N1hHNGdJQ0FnYVdZZ0tDRnBjMEp5YjNkelpYSW9LU2tnZTF4dUlDQWdJQ0FnWTI5dWMyOXNaUzVsY25KdmNpZ25XMk5oYm5aaGN5MXphMlYwWTJoZElGZEJVazQ2SUVGdWFXMWhkR2x2YmlCcGJpQk9iMlJsTG1weklHbHpJRzV2ZENCNVpYUWdjM1Z3Y0c5eWRHVmtKeWs3WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVJQ0FnSUhSb2FYTXVYM0poWmlBOUlIZHBibVJ2ZHk1eVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVW9kR2hwY3k1ZllXNXBiV0YwWlVoaGJtUnNaWElwTzF4dVhHNGdJQ0FnYkdWMElHNXZkeUE5SUhKcFoyaDBUbTkzS0NrN1hHNWNiaUFnSUNCamIyNXpkQ0JtY0hNZ1BTQjBhR2x6TG5CeWIzQnpMbVp3Y3p0Y2JpQWdJQ0JqYjI1emRDQm1jbUZ0WlVsdWRHVnlkbUZzVFZNZ1BTQXhNREF3SUM4Z1puQnpPMXh1SUNBZ0lHeGxkQ0JrWld4MFlWUnBiV1ZOVXlBOUlHNXZkeUF0SUhSb2FYTXVYMnhoYzNSVWFXMWxPMXh1WEc0Z0lDQWdZMjl1YzNRZ1pIVnlZWFJwYjI0Z1BTQjBhR2x6TG5CeWIzQnpMbVIxY21GMGFXOXVPMXh1SUNBZ0lHTnZibk4wSUdoaGMwUjFjbUYwYVc5dUlEMGdkSGx3Wlc5bUlHUjFjbUYwYVc5dUlEMDlQU0FuYm5WdFltVnlKeUFtSmlCcGMwWnBibWwwWlNoa2RYSmhkR2x2YmlrN1hHNWNiaUFnSUNCc1pYUWdhWE5PWlhkR2NtRnRaU0E5SUhSeWRXVTdYRzRnSUNBZ1kyOXVjM1FnY0d4aGVXSmhZMnRTWVhSbElEMGdkR2hwY3k1elpYUjBhVzVuY3k1d2JHRjVZbUZqYTFKaGRHVTdYRzRnSUNBZ2FXWWdLSEJzWVhsaVlXTnJVbUYwWlNBOVBUMGdKMlpwZUdWa0p5a2dlMXh1SUNBZ0lDQWdaR1ZzZEdGVWFXMWxUVk1nUFNCbWNtRnRaVWx1ZEdWeWRtRnNUVk03WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2h3YkdGNVltRmphMUpoZEdVZ1BUMDlJQ2QwYUhKdmRIUnNaU2NwSUh0Y2JpQWdJQ0FnSUdsbUlDaGtaV3gwWVZScGJXVk5VeUErSUdaeVlXMWxTVzUwWlhKMllXeE5VeWtnZTF4dUlDQWdJQ0FnSUNCdWIzY2dQU0J1YjNjZ0xTQW9aR1ZzZEdGVWFXMWxUVk1nSlNCbWNtRnRaVWx1ZEdWeWRtRnNUVk1wTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDlzWVhOMFZHbHRaU0E5SUc1dmR6dGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lHbHpUbVYzUm5KaGJXVWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnZEdocGN5NWZiR0Z6ZEZScGJXVWdQU0J1YjNjN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnWTI5dWMzUWdaR1ZzZEdGVWFXMWxJRDBnWkdWc2RHRlVhVzFsVFZNZ0x5QXhNREF3TzF4dUlDQWdJR3hsZENCdVpYZFVhVzFsSUQwZ2RHaHBjeTV3Y205d2N5NTBhVzFsSUNzZ1pHVnNkR0ZVYVcxbElDb2dkR2hwY3k1d2NtOXdjeTUwYVcxbFUyTmhiR1U3WEc1Y2JpQWdJQ0F2THlCSVlXNWtiR1VnY21WMlpYSnpaU0IwYVcxbElITmpZV3hsWEc0Z0lDQWdhV1lnS0c1bGQxUnBiV1VnUENBd0lDWW1JR2hoYzBSMWNtRjBhVzl1S1NCN1hHNGdJQ0FnSUNCdVpYZFVhVzFsSUQwZ1pIVnlZWFJwYjI0Z0t5QnVaWGRVYVcxbE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklGSmxMWE4wWVhKMElHRnVhVzFoZEdsdmJseHVJQ0FnSUd4bGRDQnBjMFpwYm1semFHVmtJRDBnWm1Gc2MyVTdYRzRnSUNBZ2JHVjBJR2x6VEc5dmNGTjBZWEowSUQwZ1ptRnNjMlU3WEc1Y2JpQWdJQ0JqYjI1emRDQnNiMjl3YVc1bklEMGdkR2hwY3k1elpYUjBhVzVuY3k1c2IyOXdJQ0U5UFNCbVlXeHpaVHRjYmx4dUlDQWdJR2xtSUNob1lYTkVkWEpoZEdsdmJpQW1KaUJ1WlhkVWFXMWxJRDQ5SUdSMWNtRjBhVzl1S1NCN1hHNGdJQ0FnSUNBdkx5QlNaUzF6ZEdGeWRDQmhibWx0WVhScGIyNWNiaUFnSUNBZ0lHbG1JQ2hzYjI5d2FXNW5LU0I3WEc0Z0lDQWdJQ0FnSUdselRtVjNSbkpoYldVZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNCdVpYZFVhVzFsSUQwZ2JtVjNWR2x0WlNBbElHUjFjbUYwYVc5dU8xeHVJQ0FnSUNBZ0lDQnBjMHh2YjNCVGRHRnlkQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQnBjMDVsZDBaeVlXMWxJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJRzVsZDFScGJXVWdQU0JrZFhKaGRHbHZianRjYmlBZ0lDQWdJQ0FnYVhOR2FXNXBjMmhsWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhSb2FYTXVYM05wWjI1aGJFVnVaQ2dwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNocGMwNWxkMFp5WVcxbEtTQjdYRzRnSUNBZ0lDQjBhR2x6TG5CeWIzQnpMbVJsYkhSaFZHbHRaU0E5SUdSbGJIUmhWR2x0WlR0Y2JpQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdWRHbHRaU0E5SUc1bGQxUnBiV1U3WEc0Z0lDQWdJQ0IwYUdsekxuQnliM0J6TG5Cc1lYbG9aV0ZrSUQwZ2RHaHBjeTVmWTI5dGNIVjBaVkJzWVhsb1pXRmtLRzVsZDFScGJXVXNJR1IxY21GMGFXOXVLVHRjYmlBZ0lDQWdJR052Ym5OMElHeGhjM1JHY21GdFpTQTlJSFJvYVhNdWNISnZjSE11Wm5KaGJXVTdYRzRnSUNBZ0lDQjBhR2x6TG5CeWIzQnpMbVp5WVcxbElEMGdkR2hwY3k1ZlkyOXRjSFYwWlVOMWNuSmxiblJHY21GdFpTZ3BPMXh1SUNBZ0lDQWdhV1lnS0dselRHOXZjRk4wWVhKMEtTQjBhR2x6TGw5emFXZHVZV3hDWldkcGJpZ3BPMXh1SUNBZ0lDQWdhV1lnS0d4aGMzUkdjbUZ0WlNBaFBUMGdkR2hwY3k1d2NtOXdjeTVtY21GdFpTa2dkR2hwY3k1MGFXTnJLQ2s3WEc0Z0lDQWdJQ0IwYUdsekxuSmxibVJsY2lncE8xeHVJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5NWtaV3gwWVZScGJXVWdQU0F3TzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNocGMwWnBibWx6YUdWa0tTQjdYRzRnSUNBZ0lDQjBhR2x6TG5CaGRYTmxLQ2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWkdsemNHRjBZMmdnS0dOaUtTQjdYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQmpZaUFoUFQwZ0oyWjFibU4wYVc5dUp5a2dkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHRkWE4wSUhCaGMzTWdablZ1WTNScGIyNGdhVzUwYnlCa2FYTndZWFJqYUNncEp5azdYRzRnSUNBZ1kySW9kR2hwY3k1d2NtOXdjeWs3WEc0Z0lDQWdkR2hwY3k1eVpXNWtaWElvS1R0Y2JpQWdmVnh1WEc0Z0lHMXZkVzUwSUNncElIdGNiaUFnSUNCMGFHbHpMbDloY0hCbGJtUkRZVzUyWVhOSlprNWxaV1JsWkNncE8xeHVJQ0I5WEc1Y2JpQWdkVzV0YjNWdWRDQW9LU0I3WEc0Z0lDQWdhV1lnS0dselFuSnZkM05sY2lncEtTQjdYRzRnSUNBZ0lDQjNhVzVrYjNjdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpZ25jbVZ6YVhwbEp5d2dkR2hwY3k1ZmNtVnphWHBsU0dGdVpHeGxjaWs3WEc0Z0lDQWdJQ0IwYUdsekxsOXJaWGxpYjJGeVpGTm9iM0owWTNWMGN5NWtaWFJoWTJnb0tUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tIUm9hWE11Y0hKdmNITXVZMkZ1ZG1GekxuQmhjbVZ1ZEVWc1pXMWxiblFwSUh0Y2JpQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdVkyRnVkbUZ6TG5CaGNtVnVkRVZzWlcxbGJuUXVjbVZ0YjNabFEyaHBiR1FvZEdocGN5NXdjbTl3Y3k1allXNTJZWE1wTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUY5aGNIQmxibVJEWVc1MllYTkpaazVsWldSbFpDQW9LU0I3WEc0Z0lDQWdhV1lnS0NGcGMwSnliM2R6WlhJb0tTa2djbVYwZFhKdU8xeHVJQ0FnSUdsbUlDaDBhR2x6TG5ObGRIUnBibWR6TG5CaGNtVnVkQ0FoUFQwZ1ptRnNjMlVnSmlZZ0tIUm9hWE11Y0hKdmNITXVZMkZ1ZG1GeklDWW1JQ0YwYUdsekxuQnliM0J6TG1OaGJuWmhjeTV3WVhKbGJuUkZiR1Z0Wlc1MEtTa2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ1pHVm1ZWFZzZEZCaGNtVnVkQ0E5SUhSb2FYTXVjMlYwZEdsdVozTXVjR0Z5Wlc1MElIeDhJR1J2WTNWdFpXNTBMbUp2WkhrN1hHNGdJQ0FnSUNCa1pXWmhkV3gwVUdGeVpXNTBMbUZ3Y0dWdVpFTm9hV3hrS0hSb2FYTXVjSEp2Y0hNdVkyRnVkbUZ6S1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCZmMyVjBkWEJIVEV0bGVTQW9LU0I3WEc0Z0lDQWdhV1lnS0hSb2FYTXVjSEp2Y0hNdVkyOXVkR1Y0ZENrZ2UxeHVJQ0FnSUNBZ2FXWWdLR2x6VjJWaVIweERiMjUwWlhoMEtIUm9hWE11Y0hKdmNITXVZMjl1ZEdWNGRDa3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZjSEp2Y0hNdVoyd2dQU0IwYUdsekxuQnliM0J6TG1OdmJuUmxlSFE3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0JrWld4bGRHVWdkR2hwY3k1ZmNISnZjSE11WjJ3N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1oyVjBWR2x0WlZCeWIzQnpJQ2h6WlhSMGFXNW5jeUE5SUh0OUtTQjdYRzRnSUNBZ0x5OGdSMlYwSUhScGJXbHVaeUJrWVhSaFhHNGdJQ0FnYkdWMElHUjFjbUYwYVc5dUlEMGdjMlYwZEdsdVozTXVaSFZ5WVhScGIyNDdYRzRnSUNBZ2JHVjBJSFJ2ZEdGc1JuSmhiV1Z6SUQwZ2MyVjBkR2x1WjNNdWRHOTBZV3hHY21GdFpYTTdYRzRnSUNBZ1kyOXVjM1FnZEdsdFpWTmpZV3hsSUQwZ1pHVm1hVzVsWkNoelpYUjBhVzVuY3k1MGFXMWxVMk5oYkdVc0lERXBPMXh1SUNBZ0lHTnZibk4wSUdad2N5QTlJR1JsWm1sdVpXUW9jMlYwZEdsdVozTXVabkJ6TENBeU5DazdYRzRnSUNBZ1kyOXVjM1FnYUdGelJIVnlZWFJwYjI0Z1BTQjBlWEJsYjJZZ1pIVnlZWFJwYjI0Z1BUMDlJQ2R1ZFcxaVpYSW5JQ1ltSUdselJtbHVhWFJsS0dSMWNtRjBhVzl1S1R0Y2JpQWdJQ0JqYjI1emRDQm9ZWE5VYjNSaGJFWnlZVzFsY3lBOUlIUjVjR1Z2WmlCMGIzUmhiRVp5WVcxbGN5QTlQVDBnSjI1MWJXSmxjaWNnSmlZZ2FYTkdhVzVwZEdVb2RHOTBZV3hHY21GdFpYTXBPMXh1WEc0Z0lDQWdZMjl1YzNRZ2RHOTBZV3hHY21GdFpYTkdjbTl0UkhWeVlYUnBiMjRnUFNCb1lYTkVkWEpoZEdsdmJpQS9JRTFoZEdndVpteHZiM0lvWm5CeklDb2daSFZ5WVhScGIyNHBJRG9nZFc1a1pXWnBibVZrTzF4dUlDQWdJR052Ym5OMElHUjFjbUYwYVc5dVJuSnZiVlJ2ZEdGc1JuSmhiV1Z6SUQwZ2FHRnpWRzkwWVd4R2NtRnRaWE1nUHlBb2RHOTBZV3hHY21GdFpYTWdMeUJtY0hNcElEb2dkVzVrWldacGJtVmtPMXh1SUNBZ0lHbG1JQ2hvWVhORWRYSmhkR2x2YmlBbUppQm9ZWE5VYjNSaGJFWnlZVzFsY3lBbUppQjBiM1JoYkVaeVlXMWxjMFp5YjIxRWRYSmhkR2x2YmlBaFBUMGdkRzkwWVd4R2NtRnRaWE1wSUh0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduV1c5MUlITm9iM1ZzWkNCemNHVmphV1o1SUdWcGRHaGxjaUJrZFhKaGRHbHZiaUJ2Y2lCMGIzUmhiRVp5WVcxbGN5d2dZblYwSUc1dmRDQmliM1JvTGlCUGNpd2dkR2hsZVNCdGRYTjBJRzFoZEdOb0lHVjRZV04wYkhrdUp5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLSFI1Y0dWdlppQnpaWFIwYVc1bmN5NWthVzFsYm5OcGIyNXpJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUIwZVhCbGIyWWdjMlYwZEdsdVozTXVkVzVwZEhNZ0lUMDlJQ2QxYm1SbFptbHVaV1FuS1NCN1hHNGdJQ0FnSUNCamIyNXpiMnhsTG5kaGNtNG9ZRmx2ZFNkMlpTQnpjR1ZqYVdacFpXUWdZU0I3SUhWdWFYUnpJSDBnYzJWMGRHbHVaeUJpZFhRZ2JtOGdleUJrYVcxbGJuTnBiMjRnZlN3Z2MyOGdkR2hsSUhWdWFYUnpJSGRwYkd3Z1ltVWdhV2R1YjNKbFpDNWdLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjBiM1JoYkVaeVlXMWxjeUE5SUdSbFptbHVaV1FvZEc5MFlXeEdjbUZ0WlhNc0lIUnZkR0ZzUm5KaGJXVnpSbkp2YlVSMWNtRjBhVzl1TENCSmJtWnBibWwwZVNrN1hHNGdJQ0FnWkhWeVlYUnBiMjRnUFNCa1pXWnBibVZrS0dSMWNtRjBhVzl1TENCa2RYSmhkR2x2YmtaeWIyMVViM1JoYkVaeVlXMWxjeXdnU1c1bWFXNXBkSGtwTzF4dVhHNGdJQ0FnWTI5dWMzUWdjM1JoY25SVWFXMWxJRDBnYzJWMGRHbHVaM011ZEdsdFpUdGNiaUFnSUNCamIyNXpkQ0J6ZEdGeWRFWnlZVzFsSUQwZ2MyVjBkR2x1WjNNdVpuSmhiV1U3WEc0Z0lDQWdZMjl1YzNRZ2FHRnpVM1JoY25SVWFXMWxJRDBnZEhsd1pXOW1JSE4wWVhKMFZHbHRaU0E5UFQwZ0oyNTFiV0psY2ljZ0ppWWdhWE5HYVc1cGRHVW9jM1JoY25SVWFXMWxLVHRjYmlBZ0lDQmpiMjV6ZENCb1lYTlRkR0Z5ZEVaeVlXMWxJRDBnZEhsd1pXOW1JSE4wWVhKMFJuSmhiV1VnUFQwOUlDZHVkVzFpWlhJbklDWW1JR2x6Um1sdWFYUmxLSE4wWVhKMFJuSmhiV1VwTzF4dVhHNGdJQ0FnTHk4Z2MzUmhjblFnWVhRZ2VtVnlieUIxYm14bGMzTWdkWE5sY2lCemNHVmphV1pwWlhNZ1puSmhiV1VnYjNJZ2RHbHRaU0FvWW5WMElHNXZkQ0JpYjNSb0lHMXBjMjFoZEdOb1pXUXBYRzRnSUNBZ2JHVjBJSFJwYldVZ1BTQXdPMXh1SUNBZ0lHeGxkQ0JtY21GdFpTQTlJREE3WEc0Z0lDQWdiR1YwSUhCc1lYbG9aV0ZrSUQwZ01EdGNiaUFnSUNCcFppQW9hR0Z6VTNSaGNuUlVhVzFsSUNZbUlHaGhjMU4wWVhKMFJuSmhiV1VwSUh0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduV1c5MUlITm9iM1ZzWkNCemNHVmphV1o1SUdWcGRHaGxjaUJ6ZEdGeWRDQm1jbUZ0WlNCdmNpQjBhVzFsTENCaWRYUWdibTkwSUdKdmRHZ3VKeWs3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hvWVhOVGRHRnlkRlJwYldVcElIdGNiaUFnSUNBZ0lDOHZJRlZ6WlhJZ2MzQmxZMmxtYVdWeklIUnBiV1VzSUhkbElHbHVabVZ5SUdaeVlXMWxjeUJtY205dElFWlFVMXh1SUNBZ0lDQWdkR2x0WlNBOUlITjBZWEowVkdsdFpUdGNiaUFnSUNBZ0lIQnNZWGxvWldGa0lEMGdkR2hwY3k1ZlkyOXRjSFYwWlZCc1lYbG9aV0ZrS0hScGJXVXNJR1IxY21GMGFXOXVLVHRjYmlBZ0lDQWdJR1p5WVcxbElEMGdkR2hwY3k1ZlkyOXRjSFYwWlVaeVlXMWxLRnh1SUNBZ0lDQWdJQ0J3YkdGNWFHVmhaQ3dnZEdsdFpTeGNiaUFnSUNBZ0lDQWdkRzkwWVd4R2NtRnRaWE1zSUdad2MxeHVJQ0FnSUNBZ0tUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHaGhjMU4wWVhKMFJuSmhiV1VwSUh0Y2JpQWdJQ0FnSUM4dklGVnpaWElnYzNCbFkybG1hV1Z6SUdaeVlXMWxJRzUxYldKbGNpd2dkMlVnYVc1bVpYSWdkR2x0WlNCbWNtOXRJRVpRVTF4dUlDQWdJQ0FnWm5KaGJXVWdQU0J6ZEdGeWRFWnlZVzFsTzF4dUlDQWdJQ0FnZEdsdFpTQTlJR1p5WVcxbElDOGdabkJ6TzF4dUlDQWdJQ0FnY0d4aGVXaGxZV1FnUFNCMGFHbHpMbDlqYjIxd2RYUmxVR3hoZVdobFlXUW9kR2x0WlN3Z1pIVnlZWFJwYjI0cE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0J3YkdGNWFHVmhaQ3hjYmlBZ0lDQWdJSFJwYldVc1hHNGdJQ0FnSUNCbWNtRnRaU3hjYmlBZ0lDQWdJR1IxY21GMGFXOXVMRnh1SUNBZ0lDQWdkRzkwWVd4R2NtRnRaWE1zWEc0Z0lDQWdJQ0JtY0hNc1hHNGdJQ0FnSUNCMGFXMWxVMk5oYkdWY2JpQWdJQ0I5TzF4dUlDQjlYRzVjYmlBZ2MyVjBkWEFnS0hObGRIUnBibWR6SUQwZ2UzMHBJSHRjYmlBZ0lDQnBaaUFvZEdocGN5NXphMlYwWTJncElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblRYVnNkR2x3YkdVZ2MyVjBkWEFvS1NCallXeHNjeUJ1YjNRZ2VXVjBJSE4xY0hCdmNuUmxaQzRuS1R0Y2JseHVJQ0FnSUhSb2FYTXVYM05sZEhScGJtZHpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnYzJWMGRHbHVaM01zSUhSb2FYTXVYM05sZEhScGJtZHpLVHRjYmx4dUlDQWdJR05vWldOclUyVjBkR2x1WjNNb2RHaHBjeTVmYzJWMGRHbHVaM01wTzF4dVhHNGdJQ0FnTHk4Z1IyVjBJR2x1YVhScFlXd2dZMkZ1ZG1GeklDWWdZMjl1ZEdWNGRGeHVJQ0FnSUdOdmJuTjBJSHNnWTI5dWRHVjRkQ3dnWTJGdWRtRnpJSDBnUFNCamNtVmhkR1ZEWVc1MllYTW9kR2hwY3k1ZmMyVjBkR2x1WjNNcE8xeHVYRzRnSUNBZ1kyOXVjM1FnZEdsdFpWQnliM0J6SUQwZ2RHaHBjeTVuWlhSVWFXMWxVSEp2Y0hNb2RHaHBjeTVmYzJWMGRHbHVaM01wTzF4dVhHNGdJQ0FnTHk4Z1NXNXBkR2xoYkNCeVpXNWtaWElnYzNSaGRHVWdabVZoZEhWeVpYTmNiaUFnSUNCMGFHbHpMbDl3Y205d2N5QTlJSHRjYmlBZ0lDQWdJQzR1TG5ScGJXVlFjbTl3Y3l4Y2JpQWdJQ0FnSUdOaGJuWmhjeXhjYmlBZ0lDQWdJR052Ym5SbGVIUXNYRzRnSUNBZ0lDQmtaV3gwWVZScGJXVTZJREFzWEc0Z0lDQWdJQ0J6ZEdGeWRHVmtPaUJtWVd4elpTeGNiaUFnSUNBZ0lHVjRjRzl5ZEdsdVp6b2dabUZzYzJVc1hHNGdJQ0FnSUNCd2JHRjVhVzVuT2lCbVlXeHpaU3hjYmlBZ0lDQWdJSEpsWTI5eVpHbHVaem9nWm1Gc2MyVXNYRzRnSUNBZ0lDQnpaWFIwYVc1bmN6b2dkR2hwY3k1elpYUjBhVzVuY3l4Y2JpQWdJQ0FnSUdSaGRHRTZJSFJvYVhNdWMyVjBkR2x1WjNNdVpHRjBZU3hjYmx4dUlDQWdJQ0FnTHk4Z1JYaHdiM0owSUhOdmJXVWdjM0JsWTJsbWFXTWdZV04wYVc5dWN5QjBieUIwYUdVZ2MydGxkR05vWEc0Z0lDQWdJQ0J5Wlc1a1pYSTZJQ2dwSUQwK0lIUm9hWE11Y21WdVpHVnlLQ2tzWEc0Z0lDQWdJQ0IwYjJkbmJHVlFiR0Y1T2lBb0tTQTlQaUIwYUdsekxuUnZaMmRzWlZCc1lYa29LU3hjYmlBZ0lDQWdJR1JwYzNCaGRHTm9PaUFvWTJJcElEMCtJSFJvYVhNdVpHbHpjR0YwWTJnb1kySXBMRnh1SUNBZ0lDQWdkR2xqYXpvZ0tDa2dQVDRnZEdocGN5NTBhV05yS0Nrc1hHNGdJQ0FnSUNCeVpYTnBlbVU2SUNncElEMCtJSFJvYVhNdWNtVnphWHBsS0Nrc1hHNGdJQ0FnSUNCMWNHUmhkR1U2SUNodmNIUXBJRDArSUhSb2FYTXVkWEJrWVhSbEtHOXdkQ2tzWEc0Z0lDQWdJQ0JsZUhCdmNuUkdjbUZ0WlRvZ2IzQjBJRDArSUhSb2FYTXVaWGh3YjNKMFJuSmhiV1VvYjNCMEtTeGNiaUFnSUNBZ0lISmxZMjl5WkRvZ0tDa2dQVDRnZEdocGN5NXlaV052Y21Rb0tTeGNiaUFnSUNBZ0lIQnNZWGs2SUNncElEMCtJSFJvYVhNdWNHeGhlU2dwTEZ4dUlDQWdJQ0FnY0dGMWMyVTZJQ2dwSUQwK0lIUm9hWE11Y0dGMWMyVW9LU3hjYmlBZ0lDQWdJSE4wYjNBNklDZ3BJRDArSUhSb2FYTXVjM1J2Y0NncFhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4dklFWnZjaUJYWldKSFRDQnphMlYwWTJobGN5d2dZU0JuYkNCMllYSnBZV0pzWlNCeVpXRmtjeUJoSUdKcGRDQmlaWFIwWlhKY2JpQWdJQ0IwYUdsekxsOXpaWFIxY0VkTVMyVjVLQ2s3WEc1Y2JpQWdJQ0F2THlCVWNtbG5aMlZ5SUdsdWFYUnBZV3dnY21WemFYcGxJRzV2ZHlCemJ5QjBhR0YwSUdOaGJuWmhjeUJwY3lCaGJISmxZV1I1SUhOcGVtVmtYRzRnSUNBZ0x5OGdZbmtnZEdobElIUnBiV1VnZDJVZ2JHOWhaQ0IwYUdVZ2MydGxkR05vWEc0Z0lDQWdkR2hwY3k1eVpYTnBlbVVvS1R0Y2JpQWdmVnh1WEc0Z0lHeHZZV1JCYm1SU2RXNGdLR05oYm5aaGMxTnJaWFJqYUN3Z2JtVjNVMlYwZEdsdVozTXBJSHRjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTVzYjJGa0tHTmhiblpoYzFOclpYUmphQ3dnYm1WM1UyVjBkR2x1WjNNcExuUm9aVzRvS0NrZ1BUNGdlMXh1SUNBZ0lDQWdkR2hwY3k1eWRXNG9LVHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQWdJSDBwTzF4dUlDQjlYRzVjYmlBZ2RXNXNiMkZrSUNncElIdGNiaUFnSUNCMGFHbHpMbkJoZFhObEtDazdYRzRnSUNBZ2FXWWdLQ0YwYUdsekxuTnJaWFJqYUNrZ2NtVjBkWEp1TzF4dUlDQWdJR2xtSUNoMGVYQmxiMllnZEdocGN5NXphMlYwWTJndWRXNXNiMkZrSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0IwYUdsekxsOTNjbUZ3UTI5dWRHVjRkRk5qWVd4bEtIQnliM0J6SUQwK0lIUm9hWE11YzJ0bGRHTm9MblZ1Ykc5aFpDaHdjbTl3Y3lrcE8xeHVJQ0FnSUgxY2JpQWdJQ0IwYUdsekxsOXphMlYwWTJnZ1BTQnVkV3hzTzF4dUlDQjlYRzVjYmlBZ1pHVnpkSEp2ZVNBb0tTQjdYRzRnSUNBZ2RHaHBjeTUxYm14dllXUW9LVHRjYmlBZ0lDQjBhR2x6TG5WdWJXOTFiblFvS1R0Y2JpQWdmVnh1WEc0Z0lHeHZZV1FnS0dOeVpXRjBaVk5yWlhSamFDd2dibVYzVTJWMGRHbHVaM01wSUh0Y2JpQWdJQ0F2THlCVmMyVnlJR1JwWkc0bmRDQnpjR1ZqYVdaNUlHRWdablZ1WTNScGIyNWNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHTnlaV0YwWlZOclpYUmphQ0FoUFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFVhR1VnWm5WdVkzUnBiMjRnYlhWemRDQjBZV3RsSUdsdUlHRWdablZ1WTNScGIyNGdZWE1nZEdobElHWnBjbk4wSUhCaGNtRnRaWFJsY2k0Z1JYaGhiWEJzWlRwY1hHNGdJR05oYm5aaGMxTnJaWFJqYUdWeUtDZ3BJRDArSUhzZ0xpNHVJSDBzSUhObGRIUnBibWR6S1NjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaDBhR2x6TG5OclpYUmphQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NTFibXh2WVdRb0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHNWxkMU5sZEhScGJtZHpJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1MWNHUmhkR1VvYm1WM1UyVjBkR2x1WjNNcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklGUm9hWE1nYVhNZ1lTQmlhWFFnYjJZZ1lTQjBjbWxqYTNrZ1kyRnpaVHNnZDJVZ2MyVjBJSFZ3SUhSb1pTQmhkWFJ2TFhOallXeHBibWNnYUdWeVpWeHVJQ0FnSUM4dklHbHVJR05oYzJVZ2RHaGxJSFZ6WlhJZ1pHVmphV1JsY3lCMGJ5QnlaVzVrWlhJZ1lXNTVkR2hwYm1jZ2RHOGdkR2hsSUdOdmJuUmxlSFFnS21KbFptOXlaU29nZEdobFhHNGdJQ0FnTHk4Z2NtVnVaR1Z5S0NrZ1puVnVZM1JwYjI0dUxpNGdTRzkzWlhabGNpd2dkWE5sY25NZ2MyaHZkV3hrSUdsdWMzUmxZV1FnZFhObElHSmxaMmx1S0NrZ1puVnVZM1JwYjI0Z1ptOXlJSFJvWVhRdVhHNGdJQ0FnZEdocGN5NWZjSEpsVW1WdVpHVnlLQ2s3WEc1Y2JpQWdJQ0JzWlhRZ2NISmxiRzloWkNBOUlGQnliMjFwYzJVdWNtVnpiMngyWlNncE8xeHVYRzRnSUNBZ0x5OGdRbVZqWVhWelpTQnZaaUJRTlM1cWN5ZHpJSFZ1ZFhOMVlXd2djM1J5ZFdOMGRYSmxMQ0IzWlNCb1lYWmxJSFJ2SUdSdklHRWdZbWwwSUc5bVhHNGdJQ0FnTHk4Z2JHbGljbUZ5ZVMxemNHVmphV1pwWXlCamFHRnVaMlZ6SUhSdklITjFjSEJ2Y25RZ2FYUWdjSEp2Y0dWeWJIa3VYRzRnSUNBZ2FXWWdLSFJvYVhNdWMyVjBkR2x1WjNNdWNEVXBJSHRjYmlBZ0lDQWdJR2xtSUNnaGFYTkNjbTkzYzJWeUtDa3BJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RiWTJGdWRtRnpMWE5yWlhSamFGMGdSVkpTVDFJNklGVnphVzVuSUhBMUxtcHpJR2x1SUU1dlpHVXVhbk1nYVhNZ2JtOTBJSE4xY0hCdmNuUmxaQ2NwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY0hKbGJHOWhaQ0E5SUc1bGR5QlFjbTl0YVhObEtISmxjMjlzZG1VZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JzWlhRZ1VEVkRiMjV6ZEhKMVkzUnZjaUE5SUhSb2FYTXVjMlYwZEdsdVozTXVjRFU3WEc0Z0lDQWdJQ0FnSUd4bGRDQndjbVZzYjJGa08xeHVJQ0FnSUNBZ0lDQnBaaUFvVURWRGIyNXpkSEoxWTNSdmNpNXdOU2tnZTF4dUlDQWdJQ0FnSUNBZ0lIQnlaV3h2WVdRZ1BTQlFOVU52Ym5OMGNuVmpkRzl5TG5CeVpXeHZZV1E3WEc0Z0lDQWdJQ0FnSUNBZ1VEVkRiMjV6ZEhKMVkzUnZjaUE5SUZBMVEyOXVjM1J5ZFdOMGIzSXVjRFU3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQXZMeUJVYUdVZ2MydGxkR05vSUhObGRIVndPeUJrYVhOaFlteGxJR3h2YjNBc0lITmxkQ0J6YVhwcGJtY3NJR1YwWXk1Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnY0RWVGEyVjBZMmdnUFNCd05TQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdTRzl2YXlCcGJpQndjbVZzYjJGa0lHbG1JRzVsWTJWemMyRnllVnh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHdjbVZzYjJGa0tTQndOUzV3Y21Wc2IyRmtJRDBnS0NrZ1BUNGdjSEpsYkc5aFpDaHdOU2s3WEc0Z0lDQWdJQ0FnSUNBZ2NEVXVjMlYwZFhBZ1BTQW9LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQndjbTl3Y3lBOUlIUm9hWE11Y0hKdmNITTdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JwYzBkTUlEMGdkR2hwY3k1elpYUjBhVzVuY3k1amIyNTBaWGgwSUQwOVBTQW5kMlZpWjJ3bk8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdjbVZ1WkdWeVpYSWdQU0JwYzBkTUlEOGdjRFV1VjBWQ1Iwd2dPaUJ3TlM1UU1rUTdYRzRnSUNBZ0lDQWdJQ0FnSUNCd05TNXViMHh2YjNBb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhBMUxuQnBlR1ZzUkdWdWMybDBlU2h3Y205d2N5NXdhWGhsYkZKaGRHbHZLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQTFMbU55WldGMFpVTmhiblpoY3lod2NtOXdjeTUyYVdWM2NHOXlkRmRwWkhSb0xDQndjbTl3Y3k1MmFXVjNjRzl5ZEVobGFXZG9kQ3dnY21WdVpHVnlaWElwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dselIwd2dKaVlnZEdocGN5NXpaWFIwYVc1bmN5NWhkSFJ5YVdKMWRHVnpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSEExTG5ObGRFRjBkSEpwWW5WMFpYTW9kR2hwY3k1elpYUjBhVzVuY3k1aGRIUnlhV0oxZEdWektUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NTFjR1JoZEdVb2V5QndOU3dnWTJGdWRtRnpPaUJ3TlM1allXNTJZWE1zSUdOdmJuUmxlSFE2SUhBMUxsOXlaVzVrWlhKbGNpNWtjbUYzYVc1blEyOXVkR1Y0ZENCOUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGMyOXNkbVVvS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0I5TzF4dVhHNGdJQ0FnSUNBZ0lDOHZJRk4xY0hCdmNuUWdaMnh2WW1Gc0lHRnVaQ0JwYm5OMFlXNWpaU0JRTlM1cWN5QnRiMlJsYzF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlGQTFRMjl1YzNSeWRXTjBiM0lnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnSUNCdVpYY2dVRFZEYjI1emRISjFZM1J2Y2lod05WTnJaWFJqYUNrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUIzYVc1a2IzY3VZM0psWVhSbFEyRnVkbUZ6SUNFOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb1hDSjdJSEExSUgwZ2MyVjBkR2x1WnlCcGN5QndZWE56WldRZ1luVjBJR05oYmlkMElHWnBibVFnY0RVdWFuTWdhVzRnWjJ4dlltRnNJQ2gzYVc1a2IzY3BJSE5qYjNCbExpQk5ZWGxpWlNCNWIzVWdaR2xrSUc1dmRDQmpjbVZoZEdVZ2FYUWdaMnh2WW1Gc2JIay9YRnh1Ym1WM0lIQTFLQ2s3SUM4dklEd3RMU0JoZEhSaFkyaGxjeUIwYnlCbmJHOWlZV3dnYzJOdmNHVmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJSEExVTJ0bGRHTm9LSGRwYm1SdmR5azdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQndjbVZzYjJGa0xuUm9aVzRvS0NrZ1BUNGdlMXh1SUNBZ0lDQWdMeThnVEc5aFpDQjBhR1VnZFhObGNpZHpJSE5yWlhSamFGeHVJQ0FnSUNBZ2JHVjBJR3h2WVdSbGNpQTlJR055WldGMFpWTnJaWFJqYUNoMGFHbHpMbkJ5YjNCektUdGNiaUFnSUNBZ0lHbG1JQ2doYVhOUWNtOXRhWE5sS0d4dllXUmxjaWtwSUh0Y2JpQWdJQ0FnSUNBZ2JHOWhaR1Z5SUQwZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0d4dllXUmxjaWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdiRzloWkdWeU8xeHVJQ0FnSUgwcExuUm9aVzRvYzJ0bGRHTm9JRDArSUh0Y2JpQWdJQ0FnSUdsbUlDZ2hjMnRsZEdOb0tTQnphMlYwWTJnZ1BTQjdmVHRjYmlBZ0lDQWdJSFJvYVhNdVgzTnJaWFJqYUNBOUlITnJaWFJqYUR0Y2JseHVJQ0FnSUNBZ0x5OGdUMjVqWlNCMGFHVWdjMnRsZEdOb0lHbHpJR3h2WVdSbFpDQjNaU0JqWVc0Z1lXUmtJSFJvWlNCbGRtVnVkSE5jYmlBZ0lDQWdJR2xtSUNocGMwSnliM2R6WlhJb0tTa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxsOXJaWGxpYjJGeVpGTm9iM0owWTNWMGN5NWhkSFJoWTJnb0tUdGNiaUFnSUNBZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0ozSmxjMmw2WlNjc0lIUm9hWE11WDNKbGMybDZaVWhoYm1Sc1pYSXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IwYUdsekxsOXdiM04wVW1WdVpHVnlLQ2s3WEc1Y2JpQWdJQ0FnSUM4dklGUm9aU0JwYm1sMGFXRnNJSEpsYzJsNlpTZ3BJR2x1SUhSb1pTQmpiMjV6ZEhKMVkzUnZjaUIzYVd4c0lHNXZkQ0JvWVhabFhHNGdJQ0FnSUNBdkx5QjBjbWxuWjJWeVpXUWdZU0J5WlhOcGVtVW9LU0JsZG1WdWRDQnZiaUIwYUdVZ2MydGxkR05vTENCemFXNWpaU0JwZENCM1lYTWdZbVZtYjNKbFhHNGdJQ0FnSUNBdkx5QjBhR1VnYzJ0bGRHTm9JSGRoY3lCc2IyRmtaV1F1SUZOdklIZGxJSE5sYm1RZ2RHaGxJSE5wWjI1aGJDQm9aWEpsTENCaGJHeHZkMmx1WjF4dUlDQWdJQ0FnTHk4Z2RYTmxjbk1nZEc4Z2NtVmhZM1FnZEc4Z2RHaGxJR2x1YVhScFlXd2djMmw2WlNCaVpXWnZjbVVnWm1seWMzUWdjbVZ1WkdWeUxseHVJQ0FnSUNBZ2RHaHBjeTVmYzJsNlpVTm9ZVzVuWldRb0tUdGNiaUFnSUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh1SUNBZ0lIMHBMbU5oZEdOb0tHVnljaUE5UGlCN1hHNGdJQ0FnSUNCamIyNXpiMnhsTG5kaGNtNG9KME52ZFd4a0lHNXZkQ0J6ZEdGeWRDQnphMlYwWTJnc0lIUm9aU0JoYzNsdVl5QnNiMkZrYVc1bklHWjFibU4wYVc5dUlISmxhbVZqZEdWa0lIZHBkR2dnWVc0Z1pYSnliM0k2WEZ4dUlDQWdJRVZ5Y205eU9pQW5JQ3NnWlhKeUxtMWxjM05oWjJVcE8xeHVJQ0FnSUNBZ2RHaHliM2NnWlhKeU8xeHVJQ0FnSUgwcE8xeHVJQ0I5WEc1OVhHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElGTnJaWFJqYUUxaGJtRm5aWEk3WEc0aUxDSnBiWEJ2Y25RZ1UydGxkR05vVFdGdVlXZGxjaUJtY205dElDY3VMMk52Y21VdlUydGxkR05vVFdGdVlXZGxjaWM3WEc1cGJYQnZjblFnVUdGd1pYSlRhWHBsY3lCbWNtOXRJQ2N1TDNCaGNHVnlMWE5wZW1Wekp6dGNibWx0Y0c5eWRDQjdJR2RsZEVOc2FXVnVkRUZRU1N3Z1pHVm1hVzVsWkNCOUlHWnliMjBnSnk0dmRYUnBiQ2M3WEc1Y2JtTnZibk4wSUVOQlEwaEZJRDBnSjJodmRDMXBaQzFqWVdOb1pTYzdYRzVqYjI1emRDQnlkVzUwYVcxbFEyOXNiR2x6YVc5dWN5QTlJRnRkTzF4dVhHNW1kVzVqZEdsdmJpQnBjMGh2ZEZKbGJHOWhaQ0FvS1NCN1hHNGdJR052Ym5OMElHTnNhV1Z1ZENBOUlHZGxkRU5zYVdWdWRFRlFTU2dwTzF4dUlDQnlaWFIxY200Z1kyeHBaVzUwSUNZbUlHTnNhV1Z1ZEM1b2IzUTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHTmhZMmhsUjJWMElDaHBaQ2tnZTF4dUlDQmpiMjV6ZENCamJHbGxiblFnUFNCblpYUkRiR2xsYm5SQlVFa29LVHRjYmlBZ2FXWWdLQ0ZqYkdsbGJuUXBJSEpsZEhWeWJpQjFibVJsWm1sdVpXUTdYRzRnSUdOc2FXVnVkRnREUVVOSVJWMGdQU0JqYkdsbGJuUmJRMEZEU0VWZElIeDhJSHQ5TzF4dUlDQnlaWFIxY200Z1kyeHBaVzUwVzBOQlEwaEZYVnRwWkYwN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdOaFkyaGxVSFYwSUNocFpDd2daR0YwWVNrZ2UxeHVJQ0JqYjI1emRDQmpiR2xsYm5RZ1BTQm5aWFJEYkdsbGJuUkJVRWtvS1R0Y2JpQWdhV1lnS0NGamJHbGxiblFwSUhKbGRIVnliaUIxYm1SbFptbHVaV1E3WEc0Z0lHTnNhV1Z1ZEZ0RFFVTklSVjBnUFNCamJHbGxiblJiUTBGRFNFVmRJSHg4SUh0OU8xeHVJQ0JqYkdsbGJuUmJRMEZEU0VWZFcybGtYU0E5SUdSaGRHRTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHZGxkRlJwYldWUWNtOXdJQ2h2YkdSTllXNWhaMlZ5TENCdVpYZFRaWFIwYVc1bmN5a2dlMXh1SUNBdkx5QlRkR0YwYVdNZ2MydGxkR05vWlhNZ2FXZHViM0psSUhSb1pTQjBhVzFsSUhCbGNuTnBjM1JsYm1ONVhHNGdJSEpsZEhWeWJpQnVaWGRUWlhSMGFXNW5jeTVoYm1sdFlYUmxJRDhnZXlCMGFXMWxPaUJ2YkdSTllXNWhaMlZ5TG5CeWIzQnpMblJwYldVZ2ZTQTZJSFZ1WkdWbWFXNWxaRHRjYm4xY2JseHVablZ1WTNScGIyNGdZMkZ1ZG1GelUydGxkR05vSUNoemEyVjBZMmdzSUhObGRIUnBibWR6SUQwZ2UzMHBJSHRjYmlBZ2FXWWdLSE5sZEhScGJtZHpMbkExS1NCN1hHNGdJQ0FnYVdZZ0tITmxkSFJwYm1kekxtTmhiblpoY3lCOGZDQW9jMlYwZEdsdVozTXVZMjl1ZEdWNGRDQW1KaUIwZVhCbGIyWWdjMlYwZEdsdVozTXVZMjl1ZEdWNGRDQWhQVDBnSjNOMGNtbHVaeWNwS1NCN1hHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvWUVsdUlIc2djRFVnZlNCdGIyUmxMQ0I1YjNVZ1kyRnVKM1FnY0dGemN5QjViM1Z5SUc5M2JpQmpZVzUyWVhNZ2IzSWdZMjl1ZEdWNGRDd2dkVzVzWlhOeklIUm9aU0JqYjI1MFpYaDBJR2x6SUdFZ1hDSjNaV0puYkZ3aUlHOXlJRndpTW1SY0lpQnpkSEpwYm1kZ0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QkVieUJ1YjNRZ1kzSmxZWFJsSUdFZ1kyRnVkbUZ6SUc5dUlITjBZWEowZFhBc0lITnBibU5sSUZBMUxtcHpJR1J2WlhNZ2RHaGhkQ0JtYjNJZ2RYTmNiaUFnSUNCamIyNXpkQ0JqYjI1MFpYaDBJRDBnZEhsd1pXOW1JSE5sZEhScGJtZHpMbU52Ym5SbGVIUWdQVDA5SUNkemRISnBibWNuSUQ4Z2MyVjBkR2x1WjNNdVkyOXVkR1Y0ZENBNklHWmhiSE5sTzF4dUlDQWdJSE5sZEhScGJtZHpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnYzJWMGRHbHVaM01zSUhzZ1kyRnVkbUZ6T2lCbVlXeHpaU3dnWTI5dWRHVjRkQ0I5S1R0Y2JpQWdmVnh1WEc0Z0lHTnZibk4wSUdselNHOTBJRDBnYVhOSWIzUlNaV3h2WVdRb0tUdGNiaUFnYkdWMElHaHZkRWxFTzF4dUlDQnBaaUFvYVhOSWIzUXBJSHRjYmlBZ0lDQXZMeUJWYzJVZ1lTQnRZV2RwWXlCdVlXMWxJR0o1SUdSbFptRjFiSFFzSUdadmNtTmxJSFZ6WlhJZ2RHOGdaR1ZtYVc1bElHVmhZMmdnYzJ0bGRHTm9JR2xtSUhSb1pYbGNiaUFnSUNBdkx5QnlaWEYxYVhKbElHMXZjbVVnZEdoaGJpQnZibVVnYVc0Z1lXNGdZWEJ3YkdsallYUnBiMjR1SUU5d1pXNGdkRzhnYjNSb1pYSWdhV1JsWVhNZ2IyNGdhRzkzSUhSdklIUmhZMnRzWlZ4dUlDQWdJQzh2SUhSb2FYTWdZWE1nZDJWc2JDNHVMbHh1SUNBZ0lHaHZkRWxFSUQwZ1pHVm1hVzVsWkNoelpYUjBhVzVuY3k1cFpDd2dKeVJmWDBSRlJrRlZURlJmUTBGT1ZrRlRYMU5MUlZSRFNGOUpSRjlmSkNjcE8xeHVJQ0I5WEc0Z0lHeGxkQ0JwYzBsdWFtVmpkR2x1WnlBOUlHbHpTRzkwSUNZbUlIUjVjR1Z2WmlCb2IzUkpSQ0E5UFQwZ0ozTjBjbWx1WnljN1hHNWNiaUFnYVdZZ0tHbHpTVzVxWldOMGFXNW5JQ1ltSUhKMWJuUnBiV1ZEYjJ4c2FYTnBiMjV6TG1sdVkyeDFaR1Z6S0dodmRFbEVLU2tnZTF4dUlDQWdJR052Ym5OdmJHVXVkMkZ5YmloZ1YyRnlibWx1WnpvZ1dXOTFJR2hoZG1VZ2JYVnNkR2x3YkdVZ1kyRnNiSE1nZEc4Z1kyRnVkbUZ6VTJ0bGRHTm9LQ2tnYVc0Z0xTMW9iM1FnYlc5a1pTNGdXVzkxSUcxMWMzUWdjR0Z6Y3lCMWJtbHhkV1VnZXlCcFpDQjlJSE4wY21sdVozTWdhVzRnYzJWMGRHbHVaM01nZEc4Z1pXNWhZbXhsSUdodmRDQnlaV3h2WVdRZ1lXTnliM056SUcxMWJIUnBjR3hsSUhOclpYUmphR1Z6TGlCZ0xDQm9iM1JKUkNrN1hHNGdJQ0FnYVhOSmJtcGxZM1JwYm1jZ1BTQm1ZV3h6WlR0Y2JpQWdmVnh1WEc0Z0lHeGxkQ0J3Y21Wc2IyRmtJRDBnVUhKdmJXbHpaUzV5WlhOdmJIWmxLQ2s3WEc1Y2JpQWdhV1lnS0dselNXNXFaV04wYVc1bktTQjdYRzRnSUNBZ0x5OGdUV0Z5YXlCMGFHbHpJR0Z6SUdGc2NtVmhaSGtnYzNCdmRIUmxaQ0JwYmlCMGFHbHpJSEoxYm5ScGJXVWdhVzV6ZEdGdVkyVmNiaUFnSUNCeWRXNTBhVzFsUTI5c2JHbHphVzl1Y3k1d2RYTm9LR2h2ZEVsRUtUdGNibHh1SUNBZ0lHTnZibk4wSUhCeVpYWnBiM1Z6UkdGMFlTQTlJR05oWTJobFIyVjBLR2h2ZEVsRUtUdGNiaUFnSUNCcFppQW9jSEpsZG1sdmRYTkVZWFJoS1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0J1WlhoMElEMGdLQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQXZMeUJIY21GaUlHNWxkeUJ3Y205d2N5Qm1jbTl0SUc5c1pDQnphMlYwWTJnZ2FXNXpkR0Z1WTJWY2JpQWdJQ0FnSUNBZ1kyOXVjM1FnYm1WM1VISnZjSE1nUFNCblpYUlVhVzFsVUhKdmNDaHdjbVYyYVc5MWMwUmhkR0V1YldGdVlXZGxjaXdnYzJWMGRHbHVaM01wTzF4dUlDQWdJQ0FnSUNBdkx5QkVaWE4wY205NUlIUm9aU0J2YkdRZ2FXNXpkR0Z1WTJWY2JpQWdJQ0FnSUNBZ2NISmxkbWx2ZFhORVlYUmhMbTFoYm1GblpYSXVaR1Z6ZEhKdmVTZ3BPMXh1SUNBZ0lDQWdJQ0F2THlCUVlYTnpJR0ZzYjI1bklHNWxkeUJ3Y205d2MxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjNVSEp2Y0hNN1hHNGdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQXZMeUJOYjNabElHRnNiMjVuSUhSb1pTQnVaWGgwSUdSaGRHRXVMaTVjYmlBZ0lDQWdJSEJ5Wld4dllXUWdQU0J3Y21WMmFXOTFjMFJoZEdFdWJHOWhaQzUwYUdWdUtHNWxlSFFwTG1OaGRHTm9LRzVsZUhRcE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCd2NtVnNiMkZrTG5Sb1pXNG9ibVYzVUhKdmNITWdQVDRnZTF4dUlDQWdJR052Ym5OMElHMWhibUZuWlhJZ1BTQnVaWGNnVTJ0bGRHTm9UV0Z1WVdkbGNpZ3BPMXh1SUNBZ0lHeGxkQ0J5WlhOMWJIUTdYRzRnSUNBZ2FXWWdLSE5yWlhSamFDa2dlMXh1SUNBZ0lDQWdMeThnVFdWeVoyVWdkMmwwYUNCcGJtTnZiV2x1WnlCa1lYUmhYRzRnSUNBZ0lDQnpaWFIwYVc1bmN5QTlJRTlpYW1WamRDNWhjM05wWjI0b2UzMHNJSE5sZEhScGJtZHpMQ0J1WlhkUWNtOXdjeWs3WEc1Y2JpQWdJQ0FnSUM4dklFRndjR3g1SUhObGRIUnBibWR6SUdGdVpDQmpjbVZoZEdVZ1lTQmpZVzUyWVhOY2JpQWdJQ0FnSUcxaGJtRm5aWEl1YzJWMGRYQW9jMlYwZEdsdVozTXBPMXh1WEc0Z0lDQWdJQ0F2THlCTmIzVnVkQ0IwYnlCRVQwMWNiaUFnSUNBZ0lHMWhibUZuWlhJdWJXOTFiblFvS1R0Y2JseHVJQ0FnSUNBZ0x5OGdiRzloWkNCMGFHVWdjMnRsZEdOb0lHWnBjbk4wWEc0Z0lDQWdJQ0J5WlhOMWJIUWdQU0J0WVc1aFoyVnlMbXh2WVdSQmJtUlNkVzRvYzJ0bGRHTm9LVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwSUQwZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0cxaGJtRm5aWElwTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvYVhOSmJtcGxZM1JwYm1jcElIdGNiaUFnSUNBZ0lHTmhZMmhsVUhWMEtHaHZkRWxFTENCN0lHeHZZV1E2SUhKbGMzVnNkQ3dnYldGdVlXZGxjaUI5S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JpQWdmU2s3WEc1OVhHNWNiaTh2SUZSUFJFODZJRVpwWjNWeVpTQnZkWFFnWVNCdWFXTmxJSGRoZVNCMGJ5QmxlSEJ2Y25RZ2RHaHBibWR6TGx4dVkyRnVkbUZ6VTJ0bGRHTm9MbU5oYm5aaGMxTnJaWFJqYUNBOUlHTmhiblpoYzFOclpYUmphRHRjYm1OaGJuWmhjMU5yWlhSamFDNVFZWEJsY2xOcGVtVnpJRDBnVUdGd1pYSlRhWHBsY3p0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1kyRnVkbUZ6VTJ0bGRHTm9PMXh1SWwwc0ltNWhiV1Z6SWpwYkltZHNiMkpoYkNJc0lteGxkQ0lzSW1GeVozVnRaVzUwY3lJc0ltbHpSRTlOSWl3aWFYTkJjbWQxYldWdWRITWlMQ0p2WW1wbFkzUkxaWGx6SWl3aVpHVm1hVzVsSWl3aWRHaHBjeUlzSW5KbGNHVmhkQ0lzSW1OdmJuTjBJaXdpWVhOemFXZHVJaXdpWkdWbWFXNWxaQ0lzSW1OdmJuWmxjblJFYVhOMFlXNWpaU0lzSW1kbGRFTmhiblpoYzBOdmJuUmxlSFFpTENKeWFXZG9kRTV2ZHlJc0ltbHpVSEp2YldselpTSXNJbVJsWlhCRmNYVmhiQ0lzSWxCaGNHVnlVMmw2WlhNaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096dERRVUZCT3pzN096czdRMEZSUVN4SlFVRkpMSEZDUVVGeFFpeEhRVUZITEUxQlFVMHNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dERRVU42UkN4SlFVRkpMR05CUVdNc1IwRkJSeXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEdOQlFXTXNRMEZCUXp0RFFVTnlSQ3hKUVVGSkxHZENRVUZuUWl4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zYjBKQlFXOUNMRU5CUVVNN08wTkJSVGRFTEZOQlFWTXNVVUZCVVN4RFFVRkRMRWRCUVVjc1JVRkJSVHRGUVVOMFFpeEpRVUZKTEVkQlFVY3NTMEZCU3l4SlFVRkpMRWxCUVVrc1IwRkJSeXhMUVVGTExGTkJRVk1zUlVGQlJUdEhRVU4wUXl4TlFVRk5MRWxCUVVrc1UwRkJVeXhEUVVGRExIVkVRVUYxUkN4RFFVRkRMRU5CUVVNN1IwRkROMFU3TzBWQlJVUXNUMEZCVHl4TlFVRk5MRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03UlVGRGJrSTdPME5CUlVRc1UwRkJVeXhsUVVGbExFZEJRVWM3UlVGRE1VSXNTVUZCU1R0SFFVTklMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTzBsQlEyNUNMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMkk3T3pzN08wZEJTMFFzU1VGQlNTeExRVUZMTEVkQlFVY3NTVUZCU1N4TlFVRk5MRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU03UjBGRE9VSXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dEhRVU5vUWl4SlFVRkpMRTFCUVUwc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eEhRVUZITEVWQlFVVTdTVUZEYWtRc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRFlqczdPMGRCUjBRc1NVRkJTU3hMUVVGTExFZEJRVWNzUlVGQlJTeERRVUZETzBkQlEyWXNTMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRKUVVNMVFpeExRVUZMTEVOQlFVTXNSMEZCUnl4SFFVRkhMRTFCUVUwc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1NVRkRlRU03UjBGRFJDeEpRVUZKTEUxQlFVMHNSMEZCUnl4TlFVRk5MRU5CUVVNc2JVSkJRVzFDTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExGVkJRVlVzUTBGQlF5eEZRVUZGTzBsQlF5OUVMRTlCUVU4c1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzBsQlEyaENMRU5CUVVNc1EwRkJRenRIUVVOSUxFbEJRVWtzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNc1MwRkJTeXhaUVVGWkxFVkJRVVU3U1VGRGNrTXNUMEZCVHl4TFFVRkxMRU5CUVVNN1NVRkRZanM3TzBkQlIwUXNTVUZCU1N4TFFVRkxMRWRCUVVjc1JVRkJSU3hEUVVGRE8wZEJRMllzYzBKQlFYTkNMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlZMRTFCUVUwc1JVRkJSVHRKUVVNeFJDeExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1RVRkJUU3hEUVVGRE8wbEJRM1pDTEVOQlFVTXNRMEZCUXp0SFFVTklMRWxCUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4RlFVRkZMRU5CUVVNN1MwRkRhRVFzYzBKQlFYTkNMRVZCUVVVN1NVRkRla0lzVDBGQlR5eExRVUZMTEVOQlFVTTdTVUZEWWpzN1IwRkZSQ3hQUVVGUExFbEJRVWtzUTBGQlF6dEhRVU5hTEVOQlFVTXNUMEZCVHl4SFFVRkhMRVZCUVVVN08wZEJSV0lzVDBGQlR5eExRVUZMTEVOQlFVTTdSMEZEWWp0RlFVTkVPenREUVVWRUxHZENRVUZqTEVkQlFVY3NaVUZCWlN4RlFVRkZMRWRCUVVjc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eFZRVUZWTEUxQlFVMHNSVUZCUlN4TlFVRk5MRVZCUVVVN1JVRkRPVVVzU1VGQlNTeEpRVUZKTEVOQlFVTTdSVUZEVkN4SlFVRkpMRVZCUVVVc1IwRkJSeXhSUVVGUkxFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTTdSVUZETVVJc1NVRkJTU3hQUVVGUExFTkJRVU03TzBWQlJWb3NTMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEZOQlFWTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3UjBGRE1VTXNTVUZCU1N4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXpzN1IwRkZOVUlzUzBGQlN5eEpRVUZKTEVkQlFVY3NTVUZCU1N4SlFVRkpMRVZCUVVVN1NVRkRja0lzU1VGQlNTeGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hIUVVGSExFTkJRVU1zUlVGQlJUdExRVU51UXl4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMHRCUTNCQ08wbEJRMFE3TzBkQlJVUXNTVUZCU1N4eFFrRkJjVUlzUlVGQlJUdEpRVU14UWl4UFFVRlBMRWRCUVVjc2NVSkJRWEZDTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1NVRkRkRU1zUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFOUJRVThzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1MwRkRlRU1zU1VGQlNTeG5Ra0ZCWjBJc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRk8wMUJRelZETEVWQlFVVXNRMEZCUXl4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VFVGRGJFTTdTMEZEUkR0SlFVTkVPMGRCUTBRN08wVkJSVVFzVDBGQlR5eEZRVUZGTEVOQlFVTTdSVUZEVml4RFFVRkRPenM3T3pzN096dERRM3BHUml4WFFVRmpPMGRCUTFwQkxHTkJRVTBzUTBGQlF5eFhRVUZYTzBkQlEyeENRU3hqUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEVkQlFVY3NSMEZCUnl4VFFVRlRMRWRCUVVjc1IwRkJSenRMUVVOMFF5eFBRVUZQTEZkQlFWY3NRMEZCUXl4SFFVRkhMRVZCUVVVN1NVRkRla0lzUjBGQlJ5eEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRk5CUVZNc1IwRkJSeXhIUVVGSE8wdEJRemRDTEU5QlFVOHNRMEZCUXl4SlFVRkpMRWxCUVVrN1NVRkRha0k3TzBORFRrZ3NaVUZCWXl4SFFVRkhMRk5CUVZNc1EwRkJRenM3UTBGRk0wSXNVMEZCVXl4VFFVRlRMRU5CUVVNc1IwRkJSeXhGUVVGRk8wZEJRM1JDTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWRCUVVjc1MwRkJTeXhQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTEVsQlFVa3NUMEZCVHl4SFFVRkhMRXRCUVVzc1ZVRkJWU3hEUVVGRExFbEJRVWtzVDBGQlR5eEhRVUZITEVOQlFVTXNTVUZCU1N4TFFVRkxMRlZCUVZVc1EwRkJRenRGUVVNeFJ6czdRME5LUkN4VFFVRmpMRWRCUVVjc1QwRkJUVHM3UTBGRmRrSXNVMEZCVXl4TlFVRk5MRVZCUVVVc1IwRkJSeXhGUVVGRk8wZEJRM0JDTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTzA5QlEyNURMRXRCUVVzN1QwRkRUQ3hEUVVGRExFOUJRVThzVFVGQlRTeExRVUZMTEZGQlFWRXNTVUZCU1N4UFFVRlBMRTFCUVUwc1EwRkJReXhKUVVGSkxFdEJRVXNzVVVGQlVUdFZRVU16UkN4SFFVRkhMRmxCUVZrc1RVRkJUU3hEUVVGRExFbEJRVWs3VTBGRE0wSXNRMEZCUXl4UFFVRlBMRWRCUVVjc1EwRkJReXhSUVVGUkxFdEJRVXNzVVVGQlVUdFZRVU5vUXl4UFFVRlBMRWRCUVVjc1EwRkJReXhSUVVGUkxFdEJRVXNzVVVGQlVTeERRVUZETzBWQlEzcERPenREUTB4TkxGTkJRVk1zWlVGQlowSTdTMEZET1VJc1QwRkJUeXhQUVVGUExFMUJRVkFzUzBGQmEwSXNWMEZCYkVJc1NVRkJhVU1zVFVGQlFTeERRVUZQT3pzN1FVRkhha1FzUTBGQlR5eFRRVUZUTEZWQlFWYzdPenRMUVVONlFpeExRVUZMUXl4SlFVRkpMRWxCUVVrc1JVRkJSeXhEUVVGQkxFZEJRVWtzVTBGQlFTeERRVUZWTEZGQlFWRXNRMEZCUVN4SlFVRkxPMU5CUTNwRExFbEJRVWxETEZkQlFVRXNRMEZCVlN4RlFVRldMRWxCUVdkQ0xFMUJRVTA3WVVGRGVFSXNUMEZCVDBFc1YwRkJRU3hEUVVGVk96czdTMEZIY2tJc1QwRkJUenM3TzBGQlIxUXNRMEZCVHl4VFFVRlRMRmxCUVdFN1MwRkRNMElzVDBGQlR5eFBRVUZQTEZGQlFWQXNTMEZCYjBJN096dEJRVWMzUWl4RFFVRlBMRk5CUVZNc1pVRkJaMElzUzBGQlN6dExRVU51UXl4UFFVRlBMRTlCUVU4c1IwRkJRU3hEUVVGSkxFdEJRVmdzUzBGQmNVSXNWVUZCY2tJc1NVRkJiVU1zVDBGQlR5eEhRVUZCTEVOQlFVa3NWVUZCV0N4TFFVRXdRaXhWUVVFM1JDeEpRVUV5UlN4UFFVRlBMRWRCUVVFc1EwRkJTU3hWUVVGWUxFdEJRVEJDT3pzN1FVRkhPVWNzUTBGQlR5eFRRVUZUTEZOQlFWVXNVMEZCVXp0TFFVTnFReXhQUVVGUFF5eExRVUZCTEVOQlFVMHNVVUZCVGl4SlFVRnJRaXhUUVVGQkxFTkJRVlVzU1VGQlZpeERRVUZsTEU5QlFVRXNRMEZCVVN4VFFVRjZReXhKUVVGelJDeFBRVUZQTEU5QlFVRXNRMEZCVVN4VlFVRm1MRXRCUVRoQ096czdPME5ETVVJM1JpeFBRVUZQTEVkQlFVY3NZMEZCWXl4SFFVRkhMRTlCUVU4c1RVRkJUU3hEUVVGRExFbEJRVWtzUzBGQlN5eFZRVUZWTzB0QlEzaEVMRTFCUVUwc1EwRkJReXhKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZET3p0RFFVVjJRaXhaUVVGWkxFZEJRVWNzU1VGQlNTeERRVUZETzBOQlEzQkNMRk5CUVZNc1NVRkJTU3hGUVVGRkxFZEJRVWNzUlVGQlJUdEhRVU5zUWl4SlFVRkpMRWxCUVVrc1IwRkJSeXhGUVVGRkxFTkJRVU03UjBGRFpDeExRVUZMTEVsQlFVa3NSMEZCUnl4SlFVRkpMRWRCUVVjc1JVRkJSU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMGRCUTNCRExFOUJRVThzU1VGQlNTeERRVUZETzBWQlEySTdPenM3TzBORFVrUXNTVUZCU1N4elFrRkJjMElzUjBGQlJ5eERRVUZETEZWQlFWVTdSMEZEZEVNc1QwRkJUeXhOUVVGTkxFTkJRVU1zVTBGQlV5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRE8wVkJRMnBFTEVkQlFVY3NTVUZCU1N4dlFrRkJiMElzUTBGQlF6czdRMEZGTjBJc1QwRkJUeXhIUVVGSExHTkJRV01zUjBGQlJ5eHpRa0ZCYzBJc1IwRkJSeXhUUVVGVExFZEJRVWNzVjBGQlZ5eERRVUZET3p0RFFVVTFSU3hwUWtGQmFVSXNSMEZCUnl4VFFVRlRMRU5CUVVNN1EwRkRPVUlzVTBGQlV5eFRRVUZUTEVOQlFVTXNUVUZCVFN4RlFVRkZPMGRCUTNwQ0xFOUJRVThzVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEc5Q1FVRnZRaXhEUVVGRE8wVkJRM1pGTzBOQlJVUXNiVUpCUVcxQ0xFZEJRVWNzVjBGQlZ5eERRVUZETzBOQlEyeERMRk5CUVZNc1YwRkJWeXhEUVVGRExFMUJRVTBzUTBGQlF6dEhRVU14UWl4UFFVRlBMRTFCUVUwN1MwRkRXQ3hQUVVGUExFMUJRVTBzU1VGQlNTeFJRVUZSTzB0QlEzcENMRTlCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzU1VGQlNTeFJRVUZSTzB0QlEyaERMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zWTBGQll5eERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1VVRkJVU3hEUVVGRE8wdEJRM1JFTEVOQlFVTXNUVUZCVFN4RFFVRkRMRk5CUVZNc1EwRkJReXh2UWtGQmIwSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxGRkJRVkVzUTBGQlF6dExRVU0zUkN4TFFVRkxMRU5CUVVNN1JVRkRWRHM3T3pzN1EwTnVRa1FzU1VGQlNTeE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU03T3pzN1EwRkpia01zU1VGQlNTeFRRVUZUTEVkQlFVY3NZMEZCWXl4SFFVRkhMRlZCUVZVc1RVRkJUU3hGUVVGRkxGRkJRVkVzUlVGQlJTeEpRVUZKTEVWQlFVVTdSMEZEYWtVc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVkQlFVY3NSVUZCUlN4RFFVRkRPenRIUVVWeVFpeEpRVUZKTEUxQlFVMHNTMEZCU3l4UlFVRlJMRVZCUVVVN1MwRkRka0lzVDBGQlR5eEpRVUZKTEVOQlFVTTdPMGxCUldJc1RVRkJUU3hKUVVGSkxFMUJRVTBzV1VGQldTeEpRVUZKTEVsQlFVa3NVVUZCVVN4WlFVRlpMRWxCUVVrc1JVRkJSVHRMUVVNM1JDeFBRVUZQTEUxQlFVMHNRMEZCUXl4UFFVRlBMRVZCUVVVc1MwRkJTeXhSUVVGUkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdPenM3U1VGSmFFUXNUVUZCVFN4SlFVRkpMRU5CUVVNc1RVRkJUU3hKUVVGSkxFTkJRVU1zVVVGQlVTeEpRVUZKTEU5QlFVOHNUVUZCVFN4SlFVRkpMRkZCUVZFc1NVRkJTU3hQUVVGUExGRkJRVkVzU1VGQlNTeFJRVUZSTEVWQlFVVTdTMEZETTBZc1QwRkJUeXhKUVVGSkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNTMEZCU3l4UlFVRlJMRWRCUVVjc1RVRkJUU3hKUVVGSkxGRkJRVkVzUTBGQlF6czdPenM3T3pzN1NVRlJMMFFzVFVGQlRUdExRVU5NTEU5QlFVOHNVVUZCVVN4RFFVRkRMRTFCUVUwc1JVRkJSU3hSUVVGUkxFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEZWtNN1IwRkRSanM3UTBGRlJDeFRRVUZUTEdsQ1FVRnBRaXhEUVVGRExFdEJRVXNzUlVGQlJUdEhRVU5vUXl4UFFVRlBMRXRCUVVzc1MwRkJTeXhKUVVGSkxFbEJRVWtzUzBGQlN5eExRVUZMTEZOQlFWTXNRMEZCUXp0RlFVTTVRenM3UTBGRlJDeFRRVUZUTEZGQlFWRXNSVUZCUlN4RFFVRkRMRVZCUVVVN1IwRkRjRUlzU1VGQlNTeERRVUZETEVOQlFVTXNTVUZCU1N4UFFVRlBMRU5CUVVNc1MwRkJTeXhSUVVGUkxFbEJRVWtzVDBGQlR5eERRVUZETEVOQlFVTXNUVUZCVFN4TFFVRkxMRkZCUVZFc1JVRkJSU3hQUVVGUExFdEJRVXNzUTBGQlF6dEhRVU01UlN4SlFVRkpMRTlCUVU4c1EwRkJReXhEUVVGRExFbEJRVWtzUzBGQlN5eFZRVUZWTEVsQlFVa3NUMEZCVHl4RFFVRkRMRU5CUVVNc1MwRkJTeXhMUVVGTExGVkJRVlVzUlVGQlJUdExRVU5xUlN4UFFVRlBMRXRCUVVzc1EwRkJRenRKUVVOa08wZEJRMFFzU1VGQlNTeERRVUZETEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1NVRkJTU3hQUVVGUExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4UlFVRlJMRVZCUVVVc1QwRkJUeXhMUVVGTExFTkJRVU03UjBGRE0wUXNUMEZCVHl4SlFVRkpMRU5CUVVNN1JVRkRZanM3UTBGRlJDeFRRVUZUTEZGQlFWRXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJUdEhRVU0xUWl4SlFVRkpMRU5CUVVNc1JVRkJSU3hIUVVGSExFTkJRVU03UjBGRFdDeEpRVUZKTEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEdsQ1FVRnBRaXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVU01UXl4UFFVRlBMRXRCUVVzc1EwRkJRenM3UjBGRlppeEpRVUZKTEVOQlFVTXNRMEZCUXl4VFFVRlRMRXRCUVVzc1EwRkJReXhEUVVGRExGTkJRVk1zUlVGQlJTeFBRVUZQTEV0QlFVc3NRMEZCUXpzN08wZEJSemxETEVsQlFVbERMRmxCUVZjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJUdExRVU5zUWl4SlFVRkpMRU5CUVVOQkxGbEJRVmNzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlR0UFFVTnVRaXhQUVVGUExFdEJRVXNzUTBGQlF6dE5RVU5rTzB0QlEwUXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTMEZEYmtJc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkRia0lzVDBGQlR5eFRRVUZUTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dEpRVU01UWp0SFFVTkVMRWxCUVVrc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTzB0QlEyWXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJUdFBRVU5vUWl4UFFVRlBMRXRCUVVzc1EwRkJRenROUVVOa08wdEJRMFFzU1VGQlNTeERRVUZETEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1EwRkJReXhOUVVGTkxFVkJRVVVzVDBGQlR5eExRVUZMTEVOQlFVTTdTMEZEZUVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1RVRkJUU3hGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzA5QlF6ZENMRWxCUVVrc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSU3hQUVVGUExFdEJRVXNzUTBGQlF6dE5RVU5xUXp0TFFVTkVMRTlCUVU4c1NVRkJTU3hEUVVGRE8wbEJRMkk3UjBGRFJDeEpRVUZKTzB0QlEwWXNTVUZCU1N4RlFVRkZMRWRCUVVkRExFbEJRVlVzUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEYkVJc1JVRkJSU3hIUVVGSFFTeEpRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1NVRkRlRUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlR0TFFVTldMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMlE3T3p0SFFVZEVMRWxCUVVrc1JVRkJSU3hEUVVGRExFMUJRVTBzU1VGQlNTeEZRVUZGTEVOQlFVTXNUVUZCVFR0TFFVTjRRaXhQUVVGUExFdEJRVXNzUTBGQlF6czdSMEZGWml4RlFVRkZMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU03UjBGRFZpeEZRVUZGTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNN08wZEJSVllzUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRMRTFCUVUwc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRMUVVOdVF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzA5QlEyaENMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMmhDT3pzN1IwRkhSQ3hMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZPMHRCUTI1RExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1MwRkRXaXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNTVUZCU1N4RFFVRkRMRVZCUVVVc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRGNFUTdSMEZEUkN4UFFVRlBMRTlCUVU4c1EwRkJReXhMUVVGTExFOUJRVThzUTBGQlF5eERRVUZETzBWQlF6bENPenM3TzBORE4wWkVPenM3T3pzN096czdPenM3T3p0RFFXTkJMRU5CUVVNc1UwRkJVeXhOUVVGTkxFVkJRVVU3TzBkQlIyaENMRWxCUVVrc1ZVRkJWU3hIUVVGSExFTkJRVU1zVjBGQlZ6dFBRVU42UWl4SlFVRkpMRXRCUVVzc1IwRkJSeXhyUlVGQmEwVXNRMEZCUXp0UFFVTXZSU3hKUVVGSkxGRkJRVkVzUjBGQlJ5eHpTVUZCYzBrc1EwRkJRenRQUVVOMFNpeEpRVUZKTEZsQlFWa3NSMEZCUnl4aFFVRmhMRU5CUVVNN096dFBRVWRxUXl4UFFVRlBMRlZCUVZVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZPenM3VTBGSGNrTXNTVUZCU1N4VFFVRlRMRU5CUVVNc1RVRkJUU3hMUVVGTExFTkJRVU1zU1VGQlNTeE5RVUZOTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1VVRkJVU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1JVRkJSVHRYUVVNelJTeEpRVUZKTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWRCUTFvc1NVRkJTU3hIUVVGSExGTkJRVk1zUTBGQlF6dFZRVU5zUWpzN1UwRkZSQ3hKUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRPenRUUVVWNFFpeEhRVUZITEVWQlFVVXNTVUZCU1N4WlFVRlpMRWxCUVVrc1EwRkJReXhGUVVGRk8xZEJRekZDTEVsQlFVa3NSMEZCUnl4SlFVRkpMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFZRVU4yUWpzN1UwRkZSQ3hKUVVGSkxFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlR0WFFVTm1MRTFCUVUwc1UwRkJVeXhEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETzFWQlEycERPenRUUVVWRUxFbEJRVWtzUjBGQlJ5eE5RVUZOTEVOQlFVTXNWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeEpRVUZKTEVsQlFVa3NWVUZCVlN4RFFVRkRMRXRCUVVzc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZET3pzN1UwRkhOMFVzU1VGQlNTeFRRVUZUTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEYWtNc1NVRkJTU3hUUVVGVExFdEJRVXNzVFVGQlRTeEpRVUZKTEZOQlFWTXNTMEZCU3l4TlFVRk5MRVZCUVVVN1YwRkRhRVFzU1VGQlNTeEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03VjBGRGNrSXNSMEZCUnl4SFFVRkhMRWxCUVVrc1EwRkJRenRYUVVOWUxFbEJRVWtzVTBGQlV5eExRVUZMTEUxQlFVMHNSVUZCUlR0aFFVTjRRaXhIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETzFsQlExbzdWVUZEUmpzN1UwRkZSQ3hKUVVGSkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVkQlFVY3NVVUZCVVN4SFFVRkhMRXRCUVVzc1EwRkJRenRUUVVNdlFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExFMUJRVTBzUTBGQlF5eEZRVUZGTEVOQlFVTTdVMEZETTBJc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4TFFVRkxMRU5CUVVNc1JVRkJSU3hEUVVGRE8xTkJRekZDTEVsQlFVa3NRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVXNRMEZCUXp0VFFVTTFRaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRlZCUVZVc1EwRkJReXhGUVVGRkxFTkJRVU03VTBGREwwSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRPMU5CUXpWQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1UwRkJVeXhEUVVGRExFVkJRVVVzUTBGQlF6dFRRVU01UWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEZOQlFWTXNRMEZCUXl4RlFVRkZMRU5CUVVNN1UwRkRPVUlzU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhqUVVGakxFTkJRVU1zUlVGQlJTeERRVUZETzFOQlEyNURMRWxCUVVrc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMR2xDUVVGcFFpeEZRVUZGTEVOQlFVTTdVMEZETTBNc1NVRkJTU3hEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTNSQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEZsQlFWa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRUUVVNelFpeEpRVUZKTEV0QlFVc3NSMEZCUnp0WFFVTldMRU5CUVVNc1MwRkJTeXhEUVVGRE8xZEJRMUFzUlVGQlJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1YwRkRXaXhIUVVGSExFZEJRVWNzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRE8xZEJRMnBETEVsQlFVa3NSVUZCUlN4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMWRCUTNKRExFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NRMEZCUXp0WFFVTllMRVZCUVVVc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0WFFVTm9RaXhIUVVGSExFZEJRVWNzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJReXhEUVVGRE8xZEJRMjVETEVsQlFVa3NSVUZCUlN4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETEVkQlFVY3NSVUZCUlN4RFFVRkRPMWRCUTNoRExFVkJRVVVzU1VGQlNTeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUTBGQlF6dFhRVU40UWl4SlFVRkpMRVZCUVVVc1EwRkJRenRYUVVOUUxFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVN1YwRkRiRUlzUlVGQlJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzUTBGQlF6dFhRVU4yUWl4RFFVRkRMRXRCUVVzc1EwRkJRenRYUVVOUUxFVkJRVVVzU1VGQlNTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMWRCUTFvc1EwRkJReXhMUVVGTExFTkJRVU03VjBGRFVDeEZRVUZGTEVsQlFVa3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJRenRYUVVOYUxFTkJRVU1zUzBGQlN5eERRVUZETzFkQlExQXNSVUZCUlN4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03VjBGRFdpeERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRExFTkJRVU03VjBGRFppeERRVUZETEV0QlFVc3NSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4RFFVRkRPMWRCUXpkQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRlZCUVZVc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXp0WFFVTXhSU3hGUVVGRkxFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUTBGQlF5eERRVUZETEVOQlFVTTdWMEZETVVVc1EwRkJReXhMUVVGTExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NWVUZCVlN4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETzFkQlF6RkZMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF6dFhRVU14UlN4RFFVRkRMRXRCUVVzc1IwRkJSeXhIUVVGSExFdEJRVXNzUjBGQlJ5eEhRVUZITEVkQlFVY3NTMEZCU3l4SFFVRkhMRU5CUVVNc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVkQlFVY3NSVUZCUlN4RFFVRkRMRTlCUVU4c1EwRkJReXhaUVVGWkxFVkJRVVVzUlVGQlJTeERRVUZETzFkQlEzaEhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NSMEZCUnl4SFFVRkhMRWRCUVVjc1NVRkJTU3hIUVVGSExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03VjBGRGVrWXNRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzFkQlEyeEdMRU5CUVVNc1MwRkJTeXhEUVVGRE8xZEJRMUFzUTBGQlF5eExRVUZMTEVOQlFVTTdWVUZEVWl4RFFVRkRPenRUUVVWR0xFOUJRVThzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4TFFVRkxMRVZCUVVVc1ZVRkJWU3hMUVVGTExFVkJRVVU3VjBGRE1VTXNTVUZCU1N4TFFVRkxMRWxCUVVrc1MwRkJTeXhGUVVGRk8yRkJRMnhDTEU5QlFVOHNTMEZCU3l4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRE8xbEJRM0pDTzFkQlEwUXNUMEZCVHl4TFFVRkxMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUlVGQlJTeExRVUZMTEVOQlFVTXNUVUZCVFN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRE8xVkJRM3BETEVOQlFVTXNRMEZCUXp0UlFVTktMRU5CUVVNN1RVRkRTQ3hIUVVGSExFTkJRVU03TzBkQlJWQXNWVUZCVlN4RFFVRkRMRXRCUVVzc1IwRkJSenRMUVVOcVFpeFRRVUZUTEdkQ1FVRm5RaXd3UWtGQk1FSTdTMEZEYmtRc1YwRkJWeXhqUVVGakxGRkJRVkU3UzBGRGFrTXNXVUZCV1N4aFFVRmhMR0ZCUVdFN1MwRkRkRU1zVlVGQlZTeGxRVUZsTEdOQlFXTTdTMEZEZGtNc1ZVRkJWU3hsUVVGbExHOUNRVUZ2UWp0TFFVTTNReXhYUVVGWExHTkJRV01zVTBGQlV6dExRVU5zUXl4WlFVRlpMR0ZCUVdFc1dVRkJXVHRMUVVOeVF5eFZRVUZWTEdWQlFXVXNZMEZCWXp0TFFVTjJReXhUUVVGVExHZENRVUZuUWl4WlFVRlpPMHRCUTNKRExGTkJRVk1zWjBKQlFXZENMRlZCUVZVN1MwRkRia01zWVVGQllTeFpRVUZaTERCQ1FVRXdRanRMUVVOdVJDeG5Ra0ZCWjBJc1UwRkJVeXhyUTBGQmEwTTdTMEZETTBRc2NVSkJRWEZDTEVsQlFVa3NOa0pCUVRaQ08wbEJRM1pFTEVOQlFVTTdPenRIUVVkR0xGVkJRVlVzUTBGQlF5eEpRVUZKTEVkQlFVYzdTMEZEYUVJc1VVRkJVU3hGUVVGRk8wOUJRMUlzUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVVc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTMEZCU3p0UFFVTXZReXhSUVVGUkxFVkJRVVVzVVVGQlVTeEZRVUZGTEZOQlFWTXNSVUZCUlN4WFFVRlhMRVZCUVVVc1ZVRkJWU3hGUVVGRkxGRkJRVkVzUlVGQlJTeFZRVUZWTzAxQlF6ZEZPMHRCUTBRc1ZVRkJWU3hGUVVGRk8wOUJRMVlzUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVVc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxPMDlCUTJ4R0xGTkJRVk1zUlVGQlJTeFZRVUZWTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSU3hMUVVGTExFVkJRVVVzVFVGQlRTeEZRVUZGTEUxQlFVMHNSVUZCUlN4UlFVRlJMRVZCUVVVc1YwRkJWeXhGUVVGRkxGTkJRVk1zUlVGQlJTeFZRVUZWTEVWQlFVVXNWVUZCVlR0TlFVTjZTRHRMUVVORUxGTkJRVk1zUlVGQlJUdFBRVU5VTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSk8wMUJRek5ETzBsQlEwWXNRMEZCUXpzN1EwRkZTaXhUUVVGVExFZEJRVWNzUTBGQlF5eEhRVUZITEVWQlFVVXNSMEZCUnl4RlFVRkZPMGRCUTNKQ0xFZEJRVWNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1IwRkRiRUlzUjBGQlJ5eEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNN1IwRkRaaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVkQlFVY3NSMEZCUnl4RlFVRkZPMHRCUTNaQ0xFZEJRVWNzUjBGQlJ5eEhRVUZITEVkQlFVY3NSMEZCUnl4RFFVRkRPMGxCUTJwQ08wZEJRMFFzVDBGQlR5eEhRVUZITEVOQlFVTTdSVUZEV2pzN096czdPenM3T3p0RFFWVkVMRk5CUVZNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJUczdSMEZGY2tJc1NVRkJTU3hqUVVGakxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1JVRkJSU3hGUVVGRkxFbEJRVWtzUTBGQlF5eFJRVUZSTEVWQlFVVXNSVUZCUlN4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU1zUTBGQlF6czdPMGRCUjI1R0xHTkJRV01zUTBGQlF5eFBRVUZQTEVOQlFVTXNZMEZCWXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zWTBGQll5eERRVUZETEUxQlFVMHNSVUZCUlN4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXpzN08wZEJSek5HTEVsQlFVa3NZVUZCWVN4SFFVRkhMRWxCUVVrc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eFhRVUZYTEVWQlFVVXNSVUZCUlN4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03T3p0SFFVZHFSU3hoUVVGaExFTkJRVU1zVDBGQlR5eERRVUZETEdGQlFXRXNRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hEUVVGRExHRkJRV0VzUTBGQlF5eE5RVUZOTEVWQlFVVXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdPenRIUVVkNFJpeEpRVUZKTEVWQlFVVXNSMEZCUnl4alFVRmpMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVXNSMEZCUnl4aFFVRmhMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVXNRMEZCUXp0SFFVTm9SaXhqUVVGakxFTkJRVU1zVVVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4UlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF6czdPMGRCUjNoRUxFbEJRVWtzVVVGQlVTeEhRVUZITEVOQlFVTXNZMEZCWXl4SFFVRkhMR0ZCUVdFc1MwRkJTeXhSUVVGUkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdSMEZETDBRc1QwRkJUeXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRGUVVOcVF6czdPenM3T3pzN08wTkJVMFFzVTBGQlV5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RlFVRkZPMGRCUXpGQ0xFbEJRVWtzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJRenRIUVVONFFpeEhRVUZITEVkQlFVY3NTMEZCU3l4RFFVRkRMRVZCUVVVN1MwRkRXaXhIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZETzBsQlExUTdSMEZEUkN4UFFVRlBMRWRCUVVjc1EwRkJRenRGUVVOYU96czdPenM3TzBOQlQwUXNVMEZCVXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRk8wZEJRMjVDTEVsQlFVa3NSMEZCUnl4TFFVRkxMRWxCUVVrc1JVRkJSVHRMUVVOb1FpeFBRVUZQTEUxQlFVMHNRMEZCUXp0SlFVTm1PenRIUVVWRUxFbEJRVWtzUjBGQlJ5eExRVUZMTEZOQlFWTXNSVUZCUlR0TFFVTnlRaXhQUVVGUExGZEJRVmNzUTBGQlF6dEpRVU53UWpzN1IwRkZSQ3hKUVVGSkxFOUJRVThzUjBGQlJ5eExRVUZMTEZGQlFWRXNSVUZCUlR0TFFVTXpRaXhQUVVGUExFOUJRVThzUjBGQlJ5eERRVUZETzBsQlEyNUNPenRIUVVWRUxFbEJRVWtzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSVHRMUVVOMFFpeFBRVUZQTEU5QlFVOHNRMEZCUXp0SlFVTm9RanM3UjBGRlJDeFBRVUZQTEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF6dE5RVU42UWl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1JVRkRMMEk3T3p0SFFVbERMRWxCUVVrc1QwRkJUME1zVTBGQlRTeExRVUZMTEZWQlFWVXNTVUZCU1VFc1UwRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJUdExRVU01UTBFc1UwRkJUU3hEUVVGRExGbEJRVms3VDBGRGFrSXNUMEZCVHl4VlFVRlZMRU5CUVVNN1RVRkRia0lzUTBGQlF5eERRVUZETzBsQlEwb3NUVUZCVFN4QlFVRnBRenRMUVVOMFF5eGpRVUZqTEVkQlFVY3NWVUZCVlN4RFFVRkRPMGxCUXpkQ0xFRkJSVUU3UlVGRFJpeEZRVUZGUXl4alFVRkpMRU5CUVVNc1EwRkJRenM3TzBORGNFOVVPenM3T3pzN096czdPenREUVdGQkxFbEJRVWtzUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXp0RFFVTmlMRWxCUVVrc1MwRkJTeXhEUVVGRE96czdPenM3UTBGTlZpeG5Ra0ZCWXl4SFFVRkhMRTFCUVUwc1EwRkJRenM3T3pzN096czdPenM3T3pzN096czdPenM3UTBGdlFuaENMRk5CUVZNc1RVRkJUU3hEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVTdSMEZEZUVJc1NVRkJTU3hQUVVGUExFZEJRVWNzUzBGQlN5eFJRVUZSTEVWQlFVVTdTMEZETTBJc1RVRkJUU3hKUVVGSkxGTkJRVk1zUTBGQlF5eHRRa0ZCYlVJc1EwRkJReXhEUVVGRE8wbEJRekZET3pzN1IwRkhSQ3hKUVVGSkxFZEJRVWNzUzBGQlN5eERRVUZETEVWQlFVVXNUMEZCVHl4SFFVRkhMRU5CUVVNN1IwRkRNVUlzU1VGQlNTeEhRVUZITEV0QlFVc3NRMEZCUXl4RlFVRkZMRTlCUVU4c1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF6czdSMEZGYUVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUnl4SFFVRkhMRU5CUVVNN1IwRkRNMElzU1VGQlNTeExRVUZMTEV0QlFVc3NSMEZCUnl4SlFVRkpMRTlCUVU4c1MwRkJTeXhMUVVGTExGZEJRVmNzUlVGQlJUdExRVU5xUkN4TFFVRkxMRWRCUVVjc1IwRkJSeXhEUVVGRE8wdEJRMW9zUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXp0SlFVTldMRTFCUVUwc1NVRkJTU3hIUVVGSExFTkJRVU1zVFVGQlRTeEpRVUZKTEVkQlFVY3NSVUZCUlR0TFFVTTFRaXhQUVVGUExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRek5DT3p0SFFVVkVMRTlCUVU4c1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF5eE5RVUZOTEVsQlFVa3NSMEZCUnl4SFFVRkhMRU5CUVVNc1JVRkJSVHRMUVVOc1F5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRMRVZCUVVVN1QwRkRXQ3hIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETzAxQlExbzdPMHRCUlVRc1IwRkJSeXhMUVVGTExFTkJRVU1zUTBGQlF6dExRVU5XTEVkQlFVY3NTVUZCU1N4SFFVRkhMRU5CUVVNN1NVRkRXanM3UjBGRlJDeEhRVUZITEVsQlFVa3NSMEZCUnl4RFFVRkRPMGRCUTFnc1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8wZEJRM3BDTEU5QlFVOHNSMEZCUnl4RFFVRkRPMFZCUTFvN08wTkRNVVJFTEZkQlFXTXNSMEZCUnl4VFFVRlRMRTlCUVU4c1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVWQlFVVXNSVUZCUlR0SFFVTTVReXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETEZGQlFWRXNSVUZCUlN4RFFVRkRPenRIUVVWeVFpeEpRVUZKTEU5QlFVOHNSMEZCUnl4TFFVRkxMRmRCUVZjc1JVRkJSVHRMUVVNNVFpeFBRVUZQTEVkQlFVY3NRMEZCUXp0SlFVTmFPenRIUVVWRUxFbEJRVWtzUlVGQlJTeExRVUZMTEVOQlFVTXNSVUZCUlR0TFFVTmFMRVZCUVVVc1IwRkJSeXhIUVVGSExFTkJRVU03U1VGRFZpeE5RVUZOTEVsQlFVa3NSVUZCUlN4RlFVRkZPMHRCUTJJc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF5eFJRVUZSTEVWQlFVVXNRMEZCUXp0SlFVTndRaXhOUVVGTk8wdEJRMHdzUlVGQlJTeEhRVUZITEVkQlFVY3NRMEZCUXp0SlFVTldPenRIUVVWRUxFOUJRVTlETEZsQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1IwRkJSeXhIUVVGSExFZEJRVWNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSMEZCUnl4SFFVRkhMRU5CUVVNN1JVRkRNME1zUTBGQlF6czdRME4wUWtaRExFbEJRVTBzYlVKQlFVODdRMEZEWWxJc1NVRkJTVHREUVVOS1FTeEpRVUZKTEdOQlFXTTdTMEZCUlN4WFFVRlhMRVZCUVdJN1MwRkJhVUlzVVVGQlVTeEZRVUY2UWp0TFFVRTJRaXhSUVVGUk96dERRVkYyUkZFc1NVRkJUU3h4UWtGQmNVSXNRMEZEZWtJc1dVRkRRU3hoUVVOQk8wTkJSMFlzVTBGQlV5eFBRVUZSTEU5QlFWTXNSVUZCUVN4TlFVRlhPMmREUVVGWUxFZEJRVTg3TzB0QlF5OUNMRTlCUVU4c1NVRkJTU3hQUVVGS0xGZEJRV0VzVDBGQlV5eEZRVUZCTEZGQlFWWTdVMEZEYWtJc1NVRkJRU3hIUVVGUFF5eFpRVUZCTEVOQlFVOHNTVUZCU1N4aFFVRmhPMU5CUXk5Q1JDeEpRVUZOTEZkQlFWY3NaVUZCUVN4RFFVRm5RaXhOUVVGQkxFTkJRVThzVFVGQlVDeERRVUZqTEVsQlFVa3NUVUZCVFR0aFFVTjJSQ3hYUVVGWExFVkJSRFJETzJGQlJYWkVMRTlCUVU4N08xTkJSVlJCTEVsQlFVMHNUMEZCVHl4UFFVRkJMRWRCUVZVc1owSkJRV2RDTzFOQlEzWkRRU3hKUVVGTkxGTkJRVk1zV1VGQlFUdFRRVU5tTEVsQlFVa3NUVUZCUVN4SlFVRlZMRTFCUVVFc1EwRkJUeXhOUVVGcVFpeEpRVUV5UWl4UFFVRlBMRTFCUVVFc1EwRkJUeXhMUVVGa0xFdEJRWGRDTEZsQlFWazdZVUZEYWtVc1QwRkJUeXhOUVVGQkxFTkJRVThzUzBGQlVDeERRVUZoUXl4WlFVRkJMRU5CUVU4c1NVRkJTU3hOUVVGTk96SkNRVUZGTzJkQ1FVRm9ReXhEUVVOS0xFbEJSRWtzVjBGRFF5eGhRVUZOTEU5QlFVRXNRMEZCVVR0blFrRkRha0k3WVVGRFRDeFBRVUZQTEU5QlFVRXNRMEZCVVRzeVFrRkJSU3hSUVVGR08ybENRVUZaTEZGQlFWRTdPenM3T3p0QlFVdDZReXhEUVVGUExGTkJRVk1zV1VGQllTeE5RVUZYTzJkRFFVRllMRWRCUVU4N08wdEJRMnhETEU5QlFVOHNUVUZCUVN4RFFVRlBMRTFCUVUwN096dEJRVWQwUWl4RFFVRlBMRk5CUVZNc1ZVRkJWeXhOUVVGWE8yZERRVUZZTEVkQlFVODdPMHRCUTJoRExFOUJRVThzVFVGQlFTeERRVUZQTEU5QlFVODdPenRCUVVkMlFpeERRVUZQTEZOQlFWTXNZVUZCWXl4TlFVRlJMRVZCUVVFc1MwRkJWVHM0UWtGQlZpeEhRVUZOT3p0TFFVTXhRMFFzU1VGQlRTeFhRVUZYTEVkQlFVRXNRMEZCU1N4UlFVRktMRWxCUVdkQ08wdEJRMnBETEVsQlFVa3NRMEZCUXl4clFrRkJRU3hEUVVGdFFpeFJRVUZ1UWl4RFFVRTBRanRYUVVGWExFMUJRVTBzU1VGQlNTeExRVUZLTEN0Q1FVRnhRenRMUVVOMlJsSXNTVUZCU1N4aFFVRmhMRkZCUVVFc1EwRkJVeXhMUVVGVUxFTkJRV1VzU1VGQlppeERRVUZ2UWl4RlFVRndRaXhKUVVFd1FpeEpRVUZKTEU5QlFTOUNMRU5CUVhWRExGTkJRVk03UzBGRGFFVXNTVUZCU1R0WFFVRlhMRk5CUVVFc1IwRkJXU3hQUVVGSkxGZEJRVmtzVjBGQmFFSTdTMEZETTBJc1QwRkJUenR2UWtGRFRDeFRRVVJMTzFOQlJVd3NUVUZCVFN4UlFVWkVPMU5CUjB3c1UwRkJVeXhOUVVGQkxFTkJRVThzVTBGQlVDeERRVUZwUWl4VlFVRlZMRWRCUVVFc1EwRkJTVHM3T3p0RFFVazFReXhUUVVGVExITkNRVUYxUWl4VFFVRlRPMHRCUTNaRExFOUJRVThzU1VGQlNTeFBRVUZLTEZkQlFXRTdVMEZEYkVKUkxFbEJRVTBzWVVGQllTeFBRVUZCTEVOQlFWRXNUMEZCVWl4RFFVRm5RanRUUVVOdVF5eEpRVUZKTEZWQlFVRXNTMEZCWlN4RFFVRkRMRWRCUVVjN1lVRkRja0lzVDBGQlFTeERRVUZSTEVsQlFVa3NUVUZCUVN4RFFVRlBMRWxCUVZnN1lVRkRVanM3VTBGRlJrRXNTVUZCVFN4VFFVRlRMRTlCUVVFc1EwRkJVU3hMUVVGU0xFTkJRV01zVlVGQlFTeEhRVUZoTzFOQlF6RkRRU3hKUVVGTkxHRkJRV0VzVFVGQlFTeERRVUZQTEVsQlFWQXNRMEZCV1R0VFFVTXZRa0VzU1VGQlRTeFBRVUZQTEU5QlFVRXNRMEZCVVN4TFFVRlNMRU5CUVdNc1IwRkJSenRUUVVNNVFrRXNTVUZCVFN4WlFVRlpMR05CUVVFc1EwRkJaU3hKUVVGbUxFTkJRVzlDTzFOQlEzUkRRU3hKUVVGTkxGRkJRVkVzVTBGQlFTeEhRVUZaTEZOQlFVRXNRMEZCVlN4TFFVRkxMRTlCUVU4N1UwRkRhRVJCTEVsQlFVMHNTMEZCU3l4SlFVRkpMRmRCUVVvc1EwRkJaMElzVlVGQlFTeERRVUZYTzFOQlEzUkRRU3hKUVVGTkxFdEJRVXNzU1VGQlNTeFZRVUZLTEVOQlFXVTdVMEZETVVJc1MwRkJTeXhKUVVGSkxFbEJRVWtzUlVGQlJ5eERRVUZCTEVkQlFVa3NWVUZCUVN4RFFVRlhMRkZCUVZFc1EwRkJRU3hKUVVGTE8yRkJRekZETEVWQlFVRXNRMEZCUnl4RlFVRklMRWRCUVZFc1ZVRkJRU3hEUVVGWExGVkJRVmdzUTBGQmMwSTdPMU5CUldoRExFOUJRVUVzUTBGQlVTeEpRVUZKTEUxQlFVRXNRMEZCVHl4SlFVRllMRU5CUVdkQ0xFTkJRVVVzUzBGQlRUdGhRVUZGTEUxQlFVMDdPenM3TzBGQlNUVkRMRU5CUVU4c1UwRkJVeXhaUVVGaExFOUJRVk1zUlVGQlFTeE5RVUZYTzJkRFFVRllMRWRCUVU4N08wdEJRek5ETEU5QlFVOHNjVUpCUVVFc1EwRkJjMElzVVVGQmRFSXNRMEZEU2l4SlFVUkpMRmRCUTBNc1pVRkJVU3hSUVVGQkxFTkJRVk1zVFVGQlRUczdPMEZCUjJwRExFTkJRVThzVTBGQlV5eFRRVUZWTEVsQlFVMHNSVUZCUVN4TlFVRlhPMmREUVVGWUxFZEJRVTg3TzB0QlEzSkRMRTlCUVU4c1NVRkJTU3hQUVVGS0xGZEJRVms3VTBGRGFrSXNTVUZCUVN4SFFVRlBReXhaUVVGQkxFTkJRVThzU1VGQlNTeGhRVUZoTzFOQlF5OUNSQ3hKUVVGTkxGZEJRVmNzU1VGQlFTeERRVUZMTzFOQlJYUkNRU3hKUVVGTkxGTkJRVk1zV1VGQlFUdFRRVU5tTEVsQlFVa3NUVUZCUVN4SlFVRlZMRTlCUVU4c1RVRkJRU3hEUVVGUExGRkJRV1FzUzBGQk1rSXNWVUZCY2tNc1NVRkJiVVFzVFVGQlFTeERRVUZQTEZGQlFWRTdZVUZGY0VVc1QwRkJUeXhOUVVGQkxFTkJRVThzVVVGQlVDeERRVUZuUWl4TlFVRk5ReXhaUVVGQkxFTkJRVThzU1VGQlNTeE5RVUZOT3pKQ1FVRkZPMmRDUVVGNlF5eERRVU5LTEVsQlJFa3NWMEZEUXl4aFFVRk5MRTlCUVVFc1EwRkJVVHRuUWtGRGFrSTdZVUZGVEN4SlFVRkpMRU5CUVVNc1RVRkJUVHRwUWtGRFZDeEpRVUZCTEVkQlFVOHNVVUZCUVN4RFFVRlRMR0ZCUVZRc1EwRkJkVUk3YVVKQlF6bENMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVlVGQldDeEhRVUYzUWp0cFFrRkRlRUlzU1VGQlFTeERRVUZMTEUxQlFVd3NSMEZCWXpzN1lVRkZhRUlzU1VGQlFTeERRVUZMTEZGQlFVd3NSMEZCWjBJN1lVRkRhRUlzU1VGQlFTeERRVUZMTEVsQlFVd3NSMEZCV1N4TlFVRkJMRU5CUVU4c1IwRkJVQ3hEUVVGWExHVkJRVmdzUTBGQk1rSTdZVUZEZGtNc1VVRkJRU3hEUVVGVExFbEJRVlFzUTBGQll5eFhRVUZrTEVOQlFUQkNPMkZCUXpGQ0xFbEJRVUVzUTBGQlN5eFBRVUZNTEdkQ1FVRmxPMmxDUVVOaUxFbEJRVUVzUTBGQlN5eFBRVUZNTEVkQlFXVTdhVUpCUTJZc1ZVRkJRU3hoUVVGWE8zRkNRVU5VTEUxQlFVRXNRMEZCVHl4SFFVRlFMRU5CUVZjc1pVRkJXQ3hEUVVFeVFqdHhRa0ZETTBJc1NVRkJTU3hKUVVGQkxFTkJRVXM3TWtKQlFXVXNTVUZCUVN4RFFVRkxMR0ZCUVV3c1EwRkJiVUlzVjBGQmJrSXNRMEZCSzBJN2NVSkJRM1pFTEVsQlFVRXNRMEZCU3l4bFFVRk1MRU5CUVhGQ08zRkNRVU55UWl4UFFVRkJMRU5CUVZFN2JVTkJRVVVzVVVGQlJqdDVRa0ZCV1N4UlFVRlJPenM3TzJGQlIyaERMRWxCUVVFc1EwRkJTeXhMUVVGTU96czdPenRCUVV0T0xFTkJRVThzVTBGQlV5eFRRVUZWTEVsQlFVMHNSVUZCUVN4TlFVRlhPMmREUVVGWUxFZEJRVTg3TzB0QlEzSkRSQ3hKUVVGTkxGRkJRVkVzUzBGQlFTeERRVUZOTEU5QlFVNHNRMEZCWXl4TFFVRmtMRWRCUVhOQ0xFOUJRVThzUTBGQlJUdExRVU0zUTBFc1NVRkJUU3hQUVVGUExFbEJRVWtzVFVGQlFTeERRVUZQTEVsQlFWZ3NRMEZCWjBJc1QwRkJUenRUUVVGRkxFMUJRVTBzU1VGQlFTeERRVUZMTEVsQlFVd3NTVUZCWVRzN1MwRkRla1FzVDBGQlR5eFJRVUZCTEVOQlFWTXNUVUZCVFRzN08wRkJSM2hDTEVOQlFVOHNVMEZCVXl4bFFVRm5RanRMUVVNNVFrRXNTVUZCVFN4blFrRkJaMEk3UzBGRGRFSXNUMEZCVHl4VlFVRkJMRU5CUVZjc1NVRkJTU3hKUVVGS0xFbEJRVms3T3p0QlFWTm9ReXhEUVVGUExGTkJRVk1zWjBKQlFXbENMRXRCUVZVN09FSkJRVllzUjBGQlRUczdTMEZEY2tNc1IwRkJRU3hIUVVGTlF5eFpRVUZCTEVOQlFVOHNTVUZCU1R0TFFVZHFRaXhKUVVGSkxFOUJRVThzUjBGQlFTeERRVUZKTEVsQlFWZ3NTMEZCYjBJc1dVRkJXVHRUUVVOc1F5eFBRVUZQTEVkQlFVRXNRMEZCU1N4SlFVRktMRU5CUVZNN1dVRkRXQ3hKUVVGSkxFZEJRVUVzUTBGQlNTeE5RVUZOTzFOQlEyNUNMRTlCUVU4c1IwRkJRU3hEUVVGSk96dExRVWRpVkN4SlFVRkpMRkZCUVZFN1MwRkRXa0VzU1VGQlNTeFpRVUZaTzB0QlEyaENMRWxCUVVrc1QwRkJUeXhIUVVGQkxFTkJRVWtzVTBGQldDeExRVUY1UWp0WFFVRlZMRk5CUVVFc1IwRkJXU3hIUVVGQkxFTkJRVWs3UzBGRmRrUXNTVUZCU1N4UFFVRlBMRWRCUVVFc1EwRkJTU3hMUVVGWUxFdEJRWEZDTEZWQlFWVTdVMEZEYWtOQkxFbEJRVWs3VTBGRFNpeEpRVUZKTEU5QlFVOHNSMEZCUVN4RFFVRkpMRmRCUVZnc1MwRkJNa0lzVlVGQlZUdGhRVU4yUXl4WFFVRkJMRWRCUVdNc1IwRkJRU3hEUVVGSk8yZENRVU5pTzJGQlEwd3NWMEZCUVN4SFFVRmpMRWxCUVVFc1EwRkJTeXhIUVVGTUxFTkJRVk1zVDBGQlR5eEhRVUZCTEVOQlFVazdPMU5CUlhCRExFdEJRVUVzUjBGQlVTeFBRVUZCTEVOQlFWRXNUVUZCUVN4RFFVRlBMRWRCUVVFc1EwRkJTU3hSUVVGUkxFMUJRVUVzUTBGQlR5eFpRVUZRTEVOQlFXOUNMRkZCUVZFN08wdEJSMnBGVVN4SlFVRk5MRmRCUVZjc1VVRkJRU3hEUVVGVExFZEJRVUVzUTBGQlNTeFpRVUZpTEVsQlFUWkNMRkZCUVVFc1EwRkJVeXhIUVVGQkxFTkJRVWtzVFVGQk1VTXNTVUZCYjBRc1IwRkJRU3hEUVVGSkxGZEJRVW9zUjBGQmEwSXNRMEZCZEVVc1ZVRkJOa1VzUjBGQlFTeERRVUZKTEZWQlFWVTdTMEZETlVjc1NVRkJTU3hMUVVGQkxFbEJRVk1zVFVGQlRUdFRRVU5xUWl4UFFVRlBMRU5CUVVVc1UwRkJWU3hOUVVGYUxFTkJRVzlDTEUxQlFYQkNMRU5CUVRKQ0xGRkJRVE5DTEVOQlFXOURMRWxCUVhCRExFTkJRWGxETEVsQlFYcERMRWRCUVdkRU8xbEJRMnhFTzFOQlEweEJMRWxCUVUwc2EwSkJRV3RDTEVkQlFVRXNRMEZCU1R0VFFVTTFRaXhQUVVGUExFTkJRVVVzUjBGQlFTeERRVUZKTEU5QlFWRXNSMEZCUVN4RFFVRkpMRWxCUVVvc1NVRkJXU3huUWtGQmFVSXNVMEZCVlN4SFFVRkJMRU5CUVVrc1MwRkJUU3hIUVVGQkxFTkJRVWtzVDBGQmJrVXNRMEZCTkVVc1RVRkJOVVVzUTBGQmJVWXNVVUZCYmtZc1EwRkJORVlzU1VGQk5VWXNRMEZCYVVjc1NVRkJha2NzUjBGQmQwYzdPenM3UTBOd1MyNUlRU3hKUVVGTkxHTkJRV003UzBGRGJFSXNWMEZCVnl4WlFVUlBPMHRCUld4Q0xGVkJRVlVzVTBGR1VUdExRVWRzUWl4WFFVRlhMRk5CU0U4N1MwRkpiRUlzVFVGQlRTeFBRVXBaTzB0QlMyeENMRWxCUVVrc1NVRk1ZenRMUVUxc1FpeFpRVUZaTEZkQlRrMDdTMEZQYkVJc1UwRkJVeXhOUVZCVE8wdEJVV3hDTEdOQlFXTTdPME5CU1doQ1FTeEpRVUZOTEZWQlFWVXNRMEZEWkN4aFFVRmpMRkZCUVZNc1owSkJRV2xDTEdOQlEzaERPMHRCUVdNc1kwRkJaU3hSUVVGVExHRkJRM1JETEcxQ1FVRnZRaXhuUWtGQmFVSTdTMEZEY2tNc1pVRkJaMElzWTBGQlpTeFRRVUZWTEZWQlFWY3NZVUZEY0VRc1UwRkJWVHRMUVVGUkxFOUJRVkVzVTBGQlZTeFRRVUZWTEZWQlFWY3NWVUZEZWtRc1QwRkJVU3hYUVVGWk8wdEJRV1VzVFVGQlR5eGxRVUZuUWl4WlFVTXhSQ3hSUVVGVExFOUJRVkVzVVVGQlV5eFpRVUZoTzB0QlFWY3NTMEZCVFN4TFFVTjRSQ3h2UWtGQmNVSXNUMEZCVVN4VFFVRlZMRmRCUVZrN1FVRkxja1FzUTBGQlQwRXNTVUZCVFN3d1FrRkJhVUk3UzBGRE5VSkJMRWxCUVUwc1QwRkJUeXhOUVVGQkxFTkJRVThzU1VGQlVDeERRVUZaTzB0QlEzcENMRWxCUVVFc1EwRkJTeXhQUVVGTUxGZEJRV0U3VTBGRFdDeEpRVUZKTEVkQlFVRXNTVUZCVHl4aFFVRmhPMkZCUTNSQ1FTeEpRVUZOTEZOQlFWTXNWMEZCUVN4RFFVRlpPMkZCUXpOQ0xFOUJRVUVzUTBGQlVTeEpRVUZTTEhsRVFVRnBSU3c0UWtGQmRVSTdaMEpCUTI1R0xFbEJRVWtzUTBGQlF5eFBRVUZCTEVOQlFWRXNVVUZCVWl4RFFVRnBRaXhOUVVGTk8yRkJRMnBETEU5QlFVRXNRMEZCVVN4SlFVRlNMSGxFUVVGcFJUczdPenM3UTBNdlFuaEVMRFJDUVVGVkxFdEJRVlU3T0VKQlFWWXNSMEZCVFRzN1MwRkROMEpCTEVsQlFVMHNiMEpCUVZVN1UwRkRaQ3hKUVVGSkxFTkJRVU1zUjBGQlFTeERRVUZKTEU5QlFVbzdaVUZCWlR0VFFVVndRa0VzU1VGQlRTeFRRVUZUTEZsQlFVRTdVMEZEWml4SlFVRkpMRVZCUVVFc1EwRkJSeXhQUVVGSUxFdEJRV1VzUlVGQlppeEpRVUZ4UWl4RFFVRkRMRVZCUVVFc1EwRkJSeXhOUVVGNlFpeExRVUZ2UXl4RlFVRkJMRU5CUVVjc1QwRkJTQ3hKUVVGakxFVkJRVUVzUTBGQlJ5eFZRVUZWTzJGQlJXcEZMRVZCUVVFc1EwRkJSeXhqUVVGSU8yRkJRMEVzUjBGQlFTeERRVUZKTEVsQlFVb3NRMEZCVXp0blFrRkRTaXhKUVVGSkxFVkJRVUVzUTBGQlJ5eFBRVUZJTEV0QlFXVXNTVUZCU1R0aFFVYzFRaXhIUVVGQkxFTkJRVWtzVlVGQlNpeERRVUZsTzJkQ1FVTldMRWxCUVVrc1RVRkJRU3hKUVVGVkxFTkJRVU1zUlVGQlFTeERRVUZITEUxQlFXUXNTVUZCZDBJc1JVRkJRU3hEUVVGSExFOUJRVWdzUzBGQlpTeEZRVUYyUXl4TFFVRTRReXhGUVVGQkxFTkJRVWNzVDBGQlNDeEpRVUZqTEVWQlFVRXNRMEZCUnl4VlFVRlZPMkZCUld4R0xFVkJRVUVzUTBGQlJ5eGpRVUZJTzJGQlEwRXNSMEZCUVN4RFFVRkpMRTFCUVVvc1EwRkJWenM3TzB0QlNXWkJMRWxCUVUwc2NVSkJRVk03VTBGRFlpeE5RVUZCTEVOQlFVOHNaMEpCUVZBc1EwRkJkMElzVjBGQlZ6czdTMEZIY2tOQkxFbEJRVTBzY1VKQlFWTTdVMEZEWWl4TlFVRkJMRU5CUVU4c2JVSkJRVkFzUTBGQk1rSXNWMEZCVnpzN1MwRkhlRU1zVDBGQlR6dHBRa0ZEVEN4TlFVUkxPMmxDUVVWTU96czdPME5EYUVOS1FTeEpRVUZOTEdWQlFXVTdRMEZGY2tKQkxFbEJRVTBzVDBGQlR5eERRVWRZTEVOQlFVVXNWMEZCV1N4TlFVRlBMRTlCUTNKQ0xFTkJRVVVzWlVGQlowSXNTVUZCU3l4TFFVTjJRaXhEUVVGRkxGTkJRVlVzU1VGQlN6dExRVU5xUWl4RFFVRkZMR1ZCUVdkQ0xFbEJRVXNzUzBGRGRrSXNRMEZCUlN4blFrRkJhVUlzUzBGQlRTeE5RVWQ2UWl4RFFVRkZMRXRCUVUwc1IwRkJTU3hKUVVOYUxFTkJRVVVzUzBGQlRTeEhRVUZKTzB0QlExb3NRMEZCUlN4TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRkxFdEJRVTBzU1VGQlN5eExRVU5pTEVOQlFVVXNTMEZCVFN4SlFVRkxMRXRCUTJJc1EwRkJSU3hMUVVGTkxFbEJRVXNzUzBGRFlpeERRVUZGTEUxQlFVOHNTVUZCU3l4TFFVTmtMRU5CUVVVN1MwRkJUeXhKUVVGTExFdEJRMlFzUTBGQlJTeE5RVUZQTEVsQlFVc3NTMEZIWkN4RFFVRkZMRXRCUVUwc1NVRkJTeXhOUVVOaUxFTkJRVVVzUzBGQlRTeEpRVUZMTEV0QlEySXNRMEZCUlN4TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRk8wdEJRVTBzU1VGQlN5eExRVU5pTEVOQlFVVXNTMEZCVFN4SlFVRkxMRXRCUTJJc1EwRkJSU3hMUVVGTkxFbEJRVXNzUzBGRFlpeERRVUZGTEV0QlFVMHNTVUZCU3l4TFFVTmlMRU5CUVVVc1MwRkJUU3hIUVVGSkxFdEJRMW9zUTBGQlJTeExRVUZOTzB0QlFVa3NTVUZEV2l4RFFVRkZMRXRCUVUwc1IwRkJTU3hKUVVOYUxFTkJRVVVzVFVGQlR5eEhRVUZKTEVsQlEySXNRMEZCUlN4TlFVRlBMRXRCUVUwc1RVRkRaaXhEUVVGRkxFMUJRVThzUzBGQlRTeE5RVU5tTEVOQlFVVXNTMEZCVFR0TFFVRk5MRTFCUTJRc1EwRkJSU3hMUVVGTkxFbEJRVXNzVFVGRFlpeERRVUZGTEUxQlFVOHNTVUZCU3l4TlFVTmtMRU5CUVVVc1MwRkJUU3hKUVVGTExFdEJRMklzUTBGQlJTeE5RVUZQTEVsQlFVc3NTMEZEWkN4RFFVRkZMRXRCUVUwN1MwRkJTeXhMUVVOaUxFTkJRVVVzUzBGQlRTeEpRVUZMTEV0QlEySXNRMEZCUlN4TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRkxFdEJRVTBzU1VGQlN5eExRVU5pTEVOQlFVVXNTMEZCVFN4SFFVRkpMRXRCUTFvc1EwRkJSU3hMUVVGTkxFZEJRVWs3UzBGRFdpeERRVUZGTEV0QlFVMHNSMEZCU1N4SlFVTmFMRU5CUVVVc1RVRkJUeXhIUVVGSkxFbEJRMklzUTBGQlJTeE5RVUZQTEVkQlFVa3NTVUZEWWl4RFFVRkZMRTFCUVU4c1IwRkJTU3hKUVVOaUxFTkJRVVVzUzBGQlRTeEpRVUZMTEUxQlEySXNRMEZCUlR0TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRkxFdEJRVTBzU1VGQlN5eExRVU5pTEVOQlFVVXNTMEZCVFN4SlFVRkxMRXRCUTJJc1EwRkJSU3hMUVVGTkxFbEJRVXNzUzBGRFlpeERRVUZGTEV0QlFVMHNTVUZCU3l4TFFVTmlMRU5CUVVVc1MwRkJUVHRMUVVGTExFdEJRMklzUTBGQlJTeExRVUZOTEVkQlFVa3NTMEZEV2l4RFFVRkZMRXRCUVUwc1IwRkJTU3hKUVVOYUxFTkJRVVVzUzBGQlRTeEhRVUZKTEVsQlExb3NRMEZCUlN4TlFVRlBMRWRCUVVrc1NVRkRZaXhEUVVGRkxFMUJRVThzUjBGQlNTeEpRVU5pTEVOQlFVVTdTMEZCVHl4SFFVRkpMRWxCU1dJc1EwRkJSU3hqUVVGbExFbEJRVXNzU1VGQlN5eE5RVU16UWl4RFFVRkZMRk5CUVZVc1NVRkJTeXhIUVVGSkxFMUJRM0pDTEVOQlFVVXNVVUZCVXl4SlFVRkxMRWRCUVVrN1MwRkRjRUlzUTBGQlJTeGxRVUZuUWl4RlFVRkhMRVZCUVVjc1RVRkRlRUlzUTBGQlJTeFRRVUZWTEVkQlFVa3NSMEZCU1N4TlFVTndRaXhEUVVGRkxGVkJRVmNzUjBGQlNTeEhRVUZKTEUxQlEzSkNMRU5CUVVVN1MwRkJWU3hKUVVGTExFdEJRVTBzVFVGRGRrSXNRMEZCUlN4VFFVRlZMRXRCUVUwc1MwRkJUU3hOUVVONFFpeERRVUZGTEZOQlFWVXNTMEZCVFN4TFFVRk5MRTFCUTNoQ0xFTkJRVVU3UzBGQlZTeExRVUZOTEV0QlFVMHNUVUZEZUVJc1EwRkJSU3hUUVVGVkxFdEJRVTBzUzBGQlRTeE5RVU40UWl4RFFVRkZMRk5CUVZVc1JVRkJSeXhIUVVGSkxFMUJRMjVDTEVOQlFVVXNVMEZCVlN4SFFVRkpPMHRCUVVrc1RVRkRjRUlzUTBGQlJTeFRRVUZWTEVkQlFVa3NSMEZCU1N4TlFVTndRaXhEUVVGRkxGTkJRVlVzUjBGQlNTeEhRVUZKTEUxQlEzQkNMRU5CUVVVc1UwRkJWU3hIUVVGSkxFZEJRVWtzVFVGRGNFSXNRMEZCUlR0TFFVRlhMRWRCUVVrc1IwRkJTU3hOUVVOeVFpeERRVUZGTEZWQlFWY3NSMEZCU1N4SFFVRkpMRTFCUTNKQ0xFTkJRVVVzVlVGQlZ5eEhRVUZKTEVkQlFVazdRVUZIZGtJc2EwSkJRV1VzU1VGQlFTeERRVUZMTEUxQlFVd3NWMEZCWVN4SlFVRk5MRVZCUVVFc1VVRkJVRHRMUVVONlFrRXNTVUZCVFN4UFFVRlBPMU5CUTFnc1QwRkJUeXhOUVVGQkxFTkJRVThzUlVGQlVDeEpRVUZoTEZsQlJGUTdVMEZGV0N4WlFVRlpMRU5CUVVVc1RVRkJRU3hEUVVGUExFZEJRVWtzVFVGQlFTeERRVUZQT3p0TFFVVnNReXhKUVVGQkxFTkJRVXNzVFVGQlFTeERRVUZQTEVkQlFWb3NSMEZCYTBJN1MwRkRiRUlzU1VGQlFTeERRVUZMTEUxQlFVRXNRMEZCVHl4RlFVRlFMRU5CUVZVc1QwRkJWaXhEUVVGclFpeE5RVUZOTEV0QlFUZENMRWRCUVhGRE8wdEJRM0pETEU5QlFVODdTVUZEVGpzN1EwTm9SMGdzWVVGQll5eEhRVUZITEZsQlFWazdTMEZEZWtJc1MwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRk5CUVZNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdVMEZEZGtNc1NVRkJTU3hUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NVMEZCVXl4RlFVRkZMRTlCUVU4c1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzAxQlEzWkVPMFZCUTBvc1EwRkJRenM3UTBOSVJpeEpRVUZKTEV0QlFVc3NSMEZCUnl4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1NVRkJTU3hGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNRMEZCUXpzN1EwRkZPVVFzU1VGQlNTeFhRVUZYTEVkQlFVYzdPMGRCUldoQ0xFTkJRVU1zUlVGQlJUdExRVU5FTEUxQlFVMHNSVUZCUlN4UlFVRlJPMHRCUTJoQ0xFMUJRVTBzUlVGQlJTeERRVUZETzBsQlExWTdSMEZEUkN4RlFVRkZMRVZCUVVVN1MwRkRSaXhOUVVGTkxFVkJRVVVzVVVGQlVUdExRVU5vUWl4TlFVRk5MRVZCUVVVc1EwRkJReXhIUVVGSExFZEJRVWM3U1VGRGFFSTdSMEZEUkN4RlFVRkZMRVZCUVVVN1MwRkRSaXhOUVVGTkxFVkJRVVVzVVVGQlVUdExRVU5vUWl4TlFVRk5MRVZCUVVVc1EwRkJReXhIUVVGSExFbEJRVWs3U1VGRGFrSTdPMGRCUlVRc1JVRkJSU3hGUVVGRk8wdEJRMFlzVFVGQlRTeEZRVUZGTEZWQlFWVTdTMEZEYkVJc1RVRkJUU3hGUVVGRkxFTkJRVU1zUjBGQlJ5eEZRVUZGTzBsQlEyWTdSMEZEUkN4RlFVRkZMRVZCUVVVN1MwRkRSaXhOUVVGTkxFVkJRVVVzVlVGQlZUdExRVU5zUWl4TlFVRk5MRVZCUVVVc1EwRkJReXhIUVVGSExFTkJRVU03U1VGRFpEdEhRVU5FTEVWQlFVVXNSVUZCUlR0TFFVTkdMRTFCUVUwc1JVRkJSU3hWUVVGVk8wdEJRMnhDTEUxQlFVMHNSVUZCUlN4RFFVRkRPMGxCUTFZN1IwRkRSQ3hGUVVGRkxFVkJRVVU3UzBGRFJpeE5RVUZOTEVWQlFVVXNWVUZCVlR0TFFVTnNRaXhOUVVGTkxFVkJRVVVzUlVGQlJUdEpRVU5ZTzBWQlEwWXNRMEZCUXpzN1EwRkZSaXhOUVVGTkxFOUJRVThzUjBGQlJ6dEhRVU5rTEUxQlFVMHNSVUZCUlR0TFFVTk9MRWxCUVVrc1JVRkJSU3hIUVVGSE8wdEJRMVFzUzBGQlN5eEZRVUZGTEVOQlFVTXNSMEZCUnl4TlFVRk5PMGxCUTJ4Q08wZEJRMFFzVVVGQlVTeEZRVUZGTzB0QlExSXNTVUZCU1N4RlFVRkZMRWxCUVVrN1MwRkRWaXhMUVVGTExFVkJRVVVzVFVGQlRUdEpRVU5rTzBWQlEwWXNRMEZCUXpzN1EwRkZSaXhUUVVGVExFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNVVUZCVVN4RlFVRkZPMGRCUXk5Q0xFOUJRVThzVFVGQlRTeERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFZEJRVWNzUjBGQlJ5eFJRVUZSTEVOQlFVTXNSMEZCUnl4SlFVRkpMRWRCUVVjc1VVRkJVU3hEUVVGRExFTkJRVU03UlVGRGNrVTdPME5CUlVRc1UwRkJVeXhsUVVGbExFVkJRVVVzUzBGQlN5eEZRVUZGTEZGQlFWRXNSVUZCUlN4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRk8wZEJRM1pFTEVsQlFVa3NUMEZCVHl4TFFVRkxMRXRCUVVzc1VVRkJVU3hKUVVGSkxFTkJRVU1zVVVGQlVTeERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZMRTFCUVUwc1NVRkJTU3hMUVVGTExFTkJRVU1zSzBKQlFTdENMRU5CUVVNc1EwRkJRenRIUVVOd1J5eEpRVUZKTEVOQlFVTXNVVUZCVVN4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRkxFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNaME5CUVdkRExFTkJRVU1zUTBGQlF6czdSMEZGTlVVc1NVRkJTU3hIUVVGSExFbEJRVWtzU1VGQlNTeEZRVUZGTEVOQlFVTTdSMEZEYkVJc1NVRkJTU3hoUVVGaExFZEJRVWRGTEZOQlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1lVRkJZU3hGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzBkQlEzQkVMRWxCUVVrc1UwRkJVeXhIUVVGSExFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTTdSMEZETDBJc1NVRkJTU3hWUVVGVkxFZEJRVWNzU1VGQlNTeERRVUZETEZWQlFWVXNTMEZCU3l4TFFVRkxMRU5CUVVNN08wZEJSVE5ETEZGQlFWRXNSMEZCUnl4UlFVRlJMRU5CUVVNc1YwRkJWeXhGUVVGRkxFTkJRVU03UjBGRGJFTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6czdSMEZGT1VJc1NVRkJTU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEZGQlFWRXNRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhGUVVGRkxFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNjVUpCUVhGQ0xFZEJRVWNzVVVGQlVTeEhRVUZITEhGQ1FVRnhRaXhIUVVGSExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1EwRkJRenRIUVVOcVNTeEpRVUZKTEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1RVRkJUU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVWQlFVVXNUVUZCVFN4SlFVRkpMRXRCUVVzc1EwRkJReXh4UWtGQmNVSXNSMEZCUnl4TlFVRk5MRWRCUVVjc2NVSkJRWEZDTEVkQlFVY3NTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZET3p0SFFVVTNTQ3hKUVVGSkxGRkJRVkVzUzBGQlN5eE5RVUZOTEVWQlFVVTdPMHRCUlhaQ0xFOUJRVThzUzBGQlN5eERRVUZETzBsQlEyUTdPMGRCUlVRc1NVRkJTU3hSUVVGUkxFZEJRVWNzUTBGQlF5eERRVUZETzBkQlEycENMRWxCUVVrc1ZVRkJWU3hIUVVGSExFTkJRVU1zUTBGQlF6dEhRVU51UWl4SlFVRkpMRk5CUVZNc1IwRkJSeXhMUVVGTExFTkJRVU03TzBkQlJYUkNMRWxCUVVrc1VVRkJVU3hMUVVGTExFbEJRVWtzUlVGQlJUdExRVU55UWl4VlFVRlZMRWRCUVVjc1EwRkJReXhIUVVGSExHRkJRV0VzUTBGQlF6dExRVU12UWl4UlFVRlJMRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJRMnBDTzBkQlEwUXNTVUZCU1N4TlFVRk5MRXRCUVVzc1NVRkJTU3hGUVVGRk8wdEJRMjVDTEZOQlFWTXNSMEZCUnl4SlFVRkpMRU5CUVVNN1MwRkRha0lzVVVGQlVTeEhRVUZITEdGQlFXRXNRMEZCUXp0TFFVTjZRaXhOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETzBsQlEyWTdPMGRCUlVRc1NVRkJTU3haUVVGWkxFZEJRVWNzVjBGQlZ5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMGRCUTNwRExFbEJRVWtzVlVGQlZTeEhRVUZITEZkQlFWY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJRenM3TzBkQlIzSkRMRWxCUVVrc1RVRkJUU3hIUVVGSExFdEJRVXNzUjBGQlJ5eFpRVUZaTEVOQlFVTXNUVUZCVFN4SFFVRkhMRlZCUVZVc1EwRkJRenM3TzBkQlIzUkVMRWxCUVVrc1dVRkJXU3hEUVVGRExFMUJRVTBzUzBGQlN5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RlFVRkZPenRMUVVVM1F5eE5RVUZOTEVsQlFVa3NUMEZCVHl4RFFVRkRMRmxCUVZrc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eExRVUZMTEVOQlFVTTdTVUZET1VNN08wZEJSVVFzU1VGQlNTeE5RVUZOTEVkQlFVY3NUVUZCVFN4SFFVRkhMRlZCUVZVc1EwRkJReXhOUVVGTkxFZEJRVWNzVVVGQlVTeERRVUZETzBkQlEyNUVMRWxCUVVrc1UwRkJVeXhKUVVGSkxGVkJRVlVzUlVGQlJUdExRVU16UWl4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXp0SlFVTTNRaXhOUVVGTkxFbEJRVWtzVDBGQlR5eFRRVUZUTEV0QlFVc3NVVUZCVVN4SlFVRkpMRkZCUVZFc1EwRkJReXhUUVVGVExFTkJRVU1zUlVGQlJUdExRVU12UkN4TlFVRk5MRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUlVGQlJTeFRRVUZUTEVOQlFVTXNRMEZCUXp0SlFVTnVRenRIUVVORUxFOUJRVThzVFVGQlRTeERRVUZETzBWQlEyWTdPME5CUlVRc2FVSkJRV01zUjBGQlJ5eGxRVUZsTEVOQlFVTTdRMEZEYWtNc1YwRkJiMElzUjBGQlJ5eExRVUZMTEVOQlFVTTdPenREUTNoSGRFSXNVMEZCVXl4M1FrRkJlVUlzVlVGQldTeEZRVUZCTEU5QlFXZENMRVZCUVVFc1pVRkJiMEk3YzBOQlFYQkRMRWRCUVZVN2EwUkJRVTBzUjBGQlowSTdPMHRCUTI1R0xFbEJRVWtzVDBGQlR5eFZRVUZRTEV0QlFYTkNMRlZCUVZVN1UwRkRiRU5HTEVsQlFVMHNUVUZCVFN4VlFVRkJMRU5CUVZjc1YwRkJXRHRUUVVOYUxFbEJRVWtzUlVGQlJTeEhRVUZCTEVsQlFVOHNZVUZCWVR0aFFVTjRRaXhOUVVGTkxFbEJRVWtzUzBGQlNpdzRRa0ZCYlVNN08xTkJSVE5EUVN4SlFVRk5MRk5CUVZNc1ZVRkJRU3hEUVVGWE8xTkJRekZDTEU5QlFVOHNUVUZCUVN4RFFVRlBMRlZCUVZBc1EwRkJhMElzUjBGQmJFSXNWMEZCYzBJc1dVRkRjRUpITEdsQ1FVRkJMRU5CUVdkQ0xFZEJRVWNzVFVGQlFTeERRVUZQTEU5QlFVOHNVMEZCVXp0WlFVVTVRenRUUVVOTUxFOUJRVTg3T3pzN1FVRkpXQ3hEUVVGUExGTkJRVk5CTEd0Q1FVRnBRaXhUUVVGWExFVkJRVUVzVTBGQmEwSXNSVUZCUVN4UFFVRm5RaXhGUVVGQkxHVkJRVzlDT3pCRFFVRjBSQ3hIUVVGWk8zTkRRVUZOTEVkQlFWVTdhMFJCUVUwc1IwRkJaMEk3TzB0QlF6VkdMRTlCUVU4c1lVRkJRU3hEUVVGakxGZEJRVmNzVjBGQlZ5eFRRVUZUTzNkQ1FVTnNSQ3hoUVVSclJEdFRRVVZzUkN4WFFVRlhMRU5CUm5WRE8xTkJSMnhFTEZsQlFWazdPenM3UTBOdVFtaENMRk5CUVZNc2NVSkJRWE5DTEZWQlFWVTdTMEZEZGtNc1NVRkJTU3hEUVVGRExGRkJRVUVzUTBGQlV6dFhRVUZaTEU5QlFVODdTMEZEYWtNc1NVRkJTU3hQUVVGUExGRkJRVUVzUTBGQlV5eFZRVUZvUWl4TFFVRXJRanRYUVVGVkxFOUJRVTg3UzBGRGNFUXNTVUZCU1N4TFFVRkJMRU5CUVUwc1QwRkJUaXhEUVVGakxGRkJRVUVzUTBGQlV5eFhRVUYyUWl4SlFVRnpReXhSUVVGQkxFTkJRVk1zVlVGQlZDeERRVUZ2UWl4TlFVRndRaXhKUVVFNFFqdFhRVUZITEU5QlFVODdTMEZEYkVZc1QwRkJUenM3TzBOQlIxUXNVMEZCVXl4alFVRmxMRXRCUVU4c1JVRkJRU3hWUVVGVk8wdEJSWFpETEVsQlFVa3NRMEZCUXl4VFFVRkJMRWxCUVdFN1UwRkRhRUlzVDBGQlR5eERRVUZGTEVsQlFVczdPMHRCUjJoQ1dDeEpRVUZKTEZWQlFWVXNVVUZCUVN4RFFVRlRMRTFCUVZRc1NVRkJiVUk3UzBGRmFrTXNTVUZCU1N4UFFVRkJMRXRCUVZrc1RVRkJXaXhKUVVOQkxFOUJRVUVzUzBGQldTeFJRVVJhTEVsQlJVRXNUMEZCUVN4TFFVRlpMRkZCUVVFc1EwRkJVeXhOUVVGTk8xTkJRemRDTEU5QlFVOHNRMEZCUlN4TlFVRkJMRU5CUVU4c1YwRkJXU3hOUVVGQkxFTkJRVTg3V1VGRE9VSTdVMEZEVEN4VlFVRXdRaXhQUVVGQkxFTkJRVkVzY1VKQlFWSTdVMEZCYkVJN1UwRkJUenRUUVVObUxFOUJRVThzUTBGQlJTeE5RVUZQT3pzN08wRkJTWEJDTEVOQlFXVXNVMEZCVXl4aFFVRmpMRXRCUVU4c1JVRkJRU3hWUVVGVk8wdEJRM0pFUVN4SlFVRkpMRTlCUVU4N1MwRkRXRUVzU1VGQlNTeFpRVUZaTzB0QlEyaENRU3hKUVVGSkxHRkJRV0U3UzBGRmFrSlJMRWxCUVUwc1ZVRkJWU3hUUVVGQk8wdEJRMmhDUVN4SlFVRk5MR0ZCUVdFc1VVRkJRU3hEUVVGVE8wdEJRelZDUVN4SlFVRk5MR2RDUVVGblFpeHZRa0ZCUVN4RFFVRnhRanRMUVVNelEwRXNTVUZCVFN4WlFVRlpMRXRCUVVFc1EwRkJUVHRMUVVONFFsSXNTVUZCU1N4aFFVRmhMR0ZCUVVFc1IwRkJaMElzVVVGQlFTeERRVUZUTEZWQlFWUXNTMEZCZDBJc1VVRkJVVHRMUVVOcVJVRXNTVUZCU1N4alFVRmxMRU5CUVVNc1UwRkJSQ3hKUVVGakxHRkJRV1lzUjBGQlowTXNVVUZCUVN4RFFVRlRMR05CUVdNN1MwRkZla1VzU1VGQlNTeERRVUZETzFkQlFWTXNWVUZCUVN4SlFVRmhMRmRCUVVFc1IwRkJZenRMUVVONlExRXNTVUZCVFN4UlFVRlJMRkZCUVVFc1EwRkJVenRMUVVOMlFrRXNTVUZCVFN4blFrRkJhVUlzVDBGQlR5eFJRVUZCTEVOQlFWTXNZVUZCYUVJc1MwRkJhME1zVVVGQmJFTXNTVUZCT0VNc1VVRkJRU3hEUVVGVExGRkJRVUVzUTBGQlV5eGpRVUZxUlN4SFFVRnRSaXhSUVVGQkxFTkJRVk1zWjBKQlFXZENPMHRCUTJ4SlFTeEpRVUZOTEZGQlFWRXNUMEZCUVN4RFFVRlJMRkZCUVVFc1EwRkJVeXhQUVVGUE8wdEJSWFJEUVN4SlFVRk5MRzFDUVVGdFFpeFBRVUZCTEVkQlFWVXNUVUZCUVN4RFFVRlBMRzFDUVVGdFFqdExRVU0zUkVFc1NVRkJUU3hwUWtGQmFVSXNWMEZCUVN4SFFVRmpMRzFDUVVGdFFqdExRVVY0UkZJc1NVRkJTU3haUVVGWk8wdEJUV2hDTEVsQlFVa3NUMEZCVHl4UlFVRkJMRU5CUVZNc1ZVRkJhRUlzUzBGQkswSXNVVUZCTDBJc1NVRkJNa01zVVVGQlFTeERRVUZUTEZGQlFVRXNRMEZCVXl4aFFVRmhPMU5CUlRWRkxGVkJRVUVzUjBGQllTeFJRVUZCTEVOQlFWTTdVMEZEZEVJc1owSkJRVUVzUjBGQmJVSXNUMEZCUVN4RFFVRlJMRkZCUVVFc1EwRkJVeXhyUWtGQmEwSTdXVUZEYWtRN1UwRkRUQ3hKUVVGSkxHVkJRV1U3WVVGRmFrSXNWVUZCUVN4SFFVRmhPMkZCUjJJc1owSkJRVUVzUjBGQmJVSXNUMEZCUVN4RFFVRlJMRkZCUVVFc1EwRkJVeXhyUWtGQmEwSTdaMEpCUTJwRU8yRkJSVXdzVlVGQlFTeEhRVUZoTzJGQlJXSXNaMEpCUVVFc1IwRkJiVUlzVDBGQlFTeERRVUZSTEZGQlFVRXNRMEZCVXl4clFrRkJhMEk3T3p0TFFVc3hSQ3hKUVVGSkxFOUJRVThzVVVGQlFTeERRVUZUTEdGQlFXaENMRXRCUVd0RExGRkJRV3hETEVsQlFUaERMRkZCUVVFc1EwRkJVeXhSUVVGQkxFTkJRVk1zWjBKQlFXZENPMU5CUTJ4R0xGVkJRVUVzUjBGQllTeEpRVUZCTEVOQlFVc3NSMEZCVEN4RFFVRlRMRkZCUVVFc1EwRkJVeXhsUVVGbE96dExRVWxvUkN4SlFVRkpMRmRCUVZjN1UwRkRZaXhWUVVGQkxFZEJRV0U3TzB0QlRXWXNWVUZCYjBNc1lVRkJRU3hEUVVGakxFOUJRVTg3UzBGQmJrUTdTMEZCWVR0TFFVTnVRa0VzU1VGQlNTeFhRVUZYTzB0QlIyWXNTVUZCU1N4bFFVRmxPMU5CUTJwQ1VTeEpRVUZOTEZOQlFWTXNkVUpCUVVFc1EwRkJkMElzV1VGQldTeFBRVUZQTzFOQlF6RkVRU3hKUVVGTkxGVkJRVlVzU1VGQlFTeERRVUZMTEVkQlFVd3NRMEZCVXl4TlFVRkJMRU5CUVU4c1NVRkJTU3hOUVVGQkxFTkJRVTg3VTBGRE0wTkJMRWxCUVUwc1UwRkJVeXhKUVVGQkxFTkJRVXNzUjBGQlRDeERRVUZUTEUxQlFVRXNRMEZCVHl4SlFVRkpMRTFCUVVFc1EwRkJUenRUUVVNeFF5eEpRVUZKTEZGQlFVRXNRMEZCVXl4aFFVRmhPMkZCUTNoQ1FTeEpRVUZOTEZsQlFWa3NVVUZCUVN4RFFVRlRMRmRCUVZRc1MwRkJlVUk3WVVGRE0wTXNTMEZCUVN4SFFVRlJMRk5CUVVFc1IwRkJXU3hWUVVGVk8yRkJRemxDTEUxQlFVRXNSMEZCVXl4VFFVRkJMRWRCUVZrc1UwRkJVenRuUWtGRGVrSTdZVUZEVEN4TFFVRkJMRWRCUVZFc1RVRkJRU3hEUVVGUE8yRkJRMllzVFVGQlFTeEhRVUZUTEUxQlFVRXNRMEZCVHpzN1UwRkhiRUlzVTBGQlFTeEhRVUZaTzFOQlExb3NWVUZCUVN4SFFVRmhPMU5CUjJJc1MwRkJRU3hKUVVGVExFdEJRVUVzUjBGQlVUdFRRVU5xUWl4TlFVRkJMRWxCUVZVc1MwRkJRU3hIUVVGUk8xbEJRMkk3VTBGRFRDeExRVUZCTEVkQlFWRTdVMEZEVWl4TlFVRkJMRWRCUVZNN1UwRkRWQ3hUUVVGQkxFZEJRVms3VTBGRFdpeFZRVUZCTEVkQlFXRTdPMHRCU1daU0xFbEJRVWtzV1VGQldUdExRVU5vUWtFc1NVRkJTU3hoUVVGaE8wdEJRMnBDTEVsQlFVa3NZVUZCUVN4SlFVRnBRaXhQUVVGUE8xTkJSVEZDTEZOQlFVRXNSMEZCV1Zjc2FVSkJRVUVzUTBGQlowSXNUMEZCVHl4UFFVRlBMRTFCUVUwN1UwRkRhRVFzVlVGQlFTeEhRVUZoUVN4cFFrRkJRU3hEUVVGblFpeFJRVUZSTEU5QlFVOHNUVUZCVFRzN1MwRkpjRVFzVlVGQlFTeEhRVUZoTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1MwRkRlRUlzVjBGQlFTeEhRVUZqTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1MwRkhla0lzU1VGQlNTeFZRVUZCTEVsQlFXTXNRMEZCUXl4VFFVRm1MRWxCUVRSQ0xHVkJRV1U3VTBGRE4wTklMRWxCUVUwc1UwRkJVeXhMUVVGQkxFZEJRVkU3VTBGRGRrSkJMRWxCUVUwc1pVRkJaU3hYUVVGQkxFZEJRV003VTBGRGJrTkJMRWxCUVUwc2IwSkJRVzlDTEU5QlFVRXNRMEZCVVN4UlFVRkJMRU5CUVZNc2JVSkJRVzFDTzFOQlF6bEVRU3hKUVVGTkxGZEJRVmNzU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4WFFVRkJMRWRCUVdNc2FVSkJRVUVzUjBGQmIwSTdVMEZET1VSQkxFbEJRVTBzV1VGQldTeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRmxCUVVFc1IwRkJaU3hwUWtGQlFTeEhRVUZ2UWp0VFFVTm9SU3hKUVVGSkxGVkJRVUVzUjBGQllTeFJRVUZpTEVsQlFYbENMRmRCUVVFc1IwRkJZeXhYUVVGWE8yRkJRM0JFTEVsQlFVa3NXVUZCUVN4SFFVRmxMRkZCUVZFN2FVSkJRM3BDTEZkQlFVRXNSMEZCWXp0cFFrRkRaQ3hWUVVGQkxFZEJRV0VzU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4WFFVRkJMRWRCUVdNN2IwSkJRMnBETzJsQ1FVTk1MRlZCUVVFc1IwRkJZVHRwUWtGRFlpeFhRVUZCTEVkQlFXTXNTVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWeXhWUVVGQkxFZEJRV0U3T3pzN1MwRkxOVU1zVjBGQlFTeEhRVUZqTEZkQlFVRXNSMEZCWXl4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExGVkJRVUVzUjBGQllTeGpRVUZqTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1ZVRkJRU3hIUVVGaE8wdEJRekZHTEZsQlFVRXNSMEZCWlN4WFFVRkJMRWRCUVdNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFZRVUZCTEVkQlFXRXNaVUZCWlN4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExGVkJRVUVzUjBGQllUdExRVVUxUmtFc1NVRkJUU3huUWtGQlowSXNWMEZCUVN4SFFVRmpMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzWTBGQll5eEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPMHRCUTNoRlFTeEpRVUZOTEdsQ1FVRnBRaXhYUVVGQkxFZEJRV01zU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4bFFVRmxMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3UzBGRk1VVkJMRWxCUVUwc1UwRkJVeXhYUVVGQkxFZEJRV003UzBGRE4wSkJMRWxCUVUwc1UwRkJVeXhaUVVGQkxFZEJRV1U3UzBGSE9VSXNUMEZCVHp0blFrRkRUQ3hMUVVSTE8zRkNRVVZNTEZWQlJrczdaMEpCUjB3c1MwRklTenRwUWtGSlRDeE5RVXBMTzFOQlMwd3NXVUZCV1N4RFFVRkZMRTFCUVU4c1QwRk1hRUk3VTBGTlRDeFBRVUZQTEV0QlFVRXNTVUZCVXl4SlFVNVlPMmxDUVU5TUxFMUJVRXM3YVVKQlVVd3NUVUZTU3p0M1FrRlRUQ3hoUVZSTE8zZENRVlZNTEdGQlZrczdlVUpCVjB3c1kwRllTenR6UWtGWlRDeFhRVnBMTzNWQ1FXRk1MRmxCWWtzN2IwSkJZMHdzVTBGa1N6dHhRa0ZsVEN4VlFXWkxPM0ZDUVdkQ1RDeFZRV2hDU3p0elFrRnBRa3c3T3pzN1EwTTVTMG9zYzBKQlFXTXNSMEZCUnl4cFFrRkJaMEk3UTBGRGFrTXNVMEZCVXl4blFrRkJaMElzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZPMGRCUTNKRExFbEJRVWtzVDBGQlR5eEpRVUZKTEV0QlFVc3NVVUZCVVN4RlFVRkZPMHRCUXpWQ0xFMUJRVTBzU1VGQlNTeFRRVUZUTEVOQlFVTXNNRUpCUVRCQ0xFTkJRVU03U1VGRGFFUTdPMGRCUlVRc1NVRkJTU3hIUVVGSExFbEJRVWtzU1VGQlNTeEhRVUZGT3p0SFFVVnFRaXhKUVVGSkxFOUJRVThzVVVGQlVTeExRVUZMTEZkQlFWY3NTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFVkJRVVU3UzBGRGJrUXNUMEZCVHl4SlFVRkpPMGxCUTFvN08wZEJSVVFzU1VGQlNTeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1NVRkJTU3hSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEZGQlFWRXNSVUZCUXp0SFFVTTFSQ3hKUVVGSkxFOUJRVThzU1VGQlNTeERRVUZETEV0QlFVc3NTMEZCU3l4UlFVRlJMRVZCUVVVN1MwRkRiRU1zVFVGQlRTeERRVUZETEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJTenRKUVVNeFFqdEhRVU5FTEVsQlFVa3NUMEZCVHl4SlFVRkpMRU5CUVVNc1RVRkJUU3hMUVVGTExGRkJRVkVzUlVGQlJUdExRVU51UXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFbEJRVWtzUTBGQlF5eFBRVUZOTzBsQlF6VkNPenRIUVVWRUxFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVazdSMEZEYkVJc1NVRkJTU3hIUVVGRk8wZEJRMDRzU1VGQlNUdExRVU5HTEVsQlFVa3NTMEZCU3l4SFFVRkhMRVZCUVVVc1NVRkJTU3hIUVVGRk96dExRVVZ3UWl4SlFVRkpMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eERRVUZETEV0QlFVc3NRMEZCUXl4RlFVRkZPMDlCUXk5Q0xFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4SFFVRkhMRWxCUVVrc1JVRkJRenROUVVOdVF6czdTMEZGUkN4TFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJUdFBRVU55UXl4RlFVRkZMRWRCUVVjc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1QwRkJUeXhGUVVGRE8wOUJRM3BETEVsQlFVa3NSVUZCUlN4RlFVRkZMRTlCUVU4c1JVRkJSVHROUVVOc1FqdEpRVU5HTEVOQlFVTXNUMEZCVHl4RFFVRkRMRVZCUVVVN1MwRkRWaXhGUVVGRkxFZEJRVWNzUzBGQlNUdEpRVU5XTzBkQlEwUXNVVUZCVVN4RlFVRkZMRWxCUVVrc1NVRkJTU3hEUVVGRE8wVkJRM0JDT3p0RFEycERSQ3hUUVVGVExITkNRVUYxUWp0TFFVTTVRaXhKUVVGSkxFTkJRVU1zVTBGQlFTeEpRVUZoTzFOQlEyaENMRTFCUVUwc1NVRkJTU3hMUVVGS0xFTkJRVlU3TzB0QlJXeENMRTlCUVU4c1VVRkJRU3hEUVVGVExHRkJRVlFzUTBGQmRVSTdPenRCUVVkb1F5eERRVUZsTEZOQlFWTXNZVUZCWXl4VlFVRmxPM2REUVVGbUxFZEJRVmM3TzB0QlF5OURVaXhKUVVGSkxGTkJRVk03UzBGRFlrRXNTVUZCU1N4aFFVRmhPMHRCUTJwQ0xFbEJRVWtzVVVGQlFTeERRVUZUTEUxQlFWUXNTMEZCYjBJc1QwRkJUenRUUVVVM1FpeFBRVUZCTEVkQlFWVXNVVUZCUVN4RFFVRlRPMU5CUTI1Q0xFbEJRVWtzUTBGQlF5eFBRVUZFTEVsQlFWa3NUMEZCVHl4UFFVRlFMRXRCUVcxQ0xGVkJRVlU3WVVGRE0wTkJMRWxCUVVrc1dVRkJXU3hSUVVGQkxFTkJRVk03WVVGRGVrSXNTVUZCU1N4RFFVRkRMRmRCUVZjN2FVSkJRMlFzVTBGQlFTeEhRVUZaTEcxQ1FVRkJPMmxDUVVOYUxGVkJRVUVzUjBGQllUczdZVUZGWmxFc1NVRkJUU3hQUVVGUExFOUJRVUVzU1VGQlZ6dGhRVU40UWl4SlFVRkpMRTlCUVU4c1UwRkJRU3hEUVVGVkxGVkJRV3BDTEV0QlFXZERMRmxCUVZrN2FVSkJRemxETEUxQlFVMHNTVUZCU1N4TFFVRktMRU5CUVZVN08yRkJSV3hDTEU5QlFVRXNSMEZCVlVrc2EwSkJRVUVzUTBGQmFVSXNUVUZCVFVnc1dVRkJRU3hEUVVGUExFbEJRVWtzVVVGQlFTeERRVUZUTEZsQlFWazdhVUpCUVVVc1VVRkJVVHM3WVVGRE0wVXNTVUZCU1N4RFFVRkRMRk5CUVZNN2FVSkJRMW9zVFVGQlRTeEpRVUZKTEV0QlFVb3NiME5CUVRCRE96czdVMEZKY0VRc1RVRkJRU3hIUVVGVExFOUJRVUVzUTBGQlVUdFRRVVZxUWl4SlFVRkpMRkZCUVVFc1EwRkJVeXhOUVVGVUxFbEJRVzFDTEUxQlFVRXNTMEZCVnl4UlFVRkJMRU5CUVZNc1VVRkJVVHRoUVVOcVJDeE5RVUZOTEVsQlFVa3NTMEZCU2l4RFFVRlZPenRUUVVsc1FpeEpRVUZKTEZGQlFVRXNRMEZCVXl4WFFVRlhPMkZCUTNSQ0xFOUJRVUVzUTBGQlVTeHhRa0ZCVWl4SFFVRm5RenRoUVVOb1F5eFBRVUZCTEVOQlFWRXNkMEpCUVZJc1IwRkJiVU03WVVGRGJrTXNUMEZCUVN4RFFVRlJMSE5DUVVGU0xFZEJRV2xETzJGQlEycERMRTlCUVVFc1EwRkJVU3d5UWtGQlVpeEhRVUZ6UXp0aFFVTjBReXhQUVVGQkxFTkJRVkVzZFVKQlFWSXNSMEZCYTBNN1lVRkRiRU1zVFVGQlFTeERRVUZQTEV0QlFWQXNRMEZCWVN4clFrRkJZaXhIUVVGclF6czdPMHRCUjNSRExFOUJRVTg3YVVKQlFVVXNUVUZCUmp0clFrRkJWU3hQUVVGV08zRkNRVUZ0UWpzN096dERRemRDTlVJc1NVRkJUU3huUWtGRFNpeDVRa0ZCWlRzN08xTkJRMklzUTBGQlN5eFRRVUZNTEVkQlFXbENPMU5CUTJwQ0xFTkJRVXNzVFVGQlRDeEhRVUZqTzFOQlEyUXNRMEZCU3l4UFFVRk1MRWRCUVdVN1UwRkRaaXhEUVVGTExFbEJRVXdzUjBGQldUdFRRVU5hTEVOQlFVc3NZMEZCVEN4SFFVRnpRanRUUVVkMFFpeERRVUZMTEdsQ1FVRk1MRWRCUVhsQ08xTkJRM3BDTEVOQlFVc3NZVUZCVEN4SFFVRnhRanRUUVVWeVFpeERRVUZMTEd0Q1FVRk1MRWRCUVRCQ0xHbENRVUZCTEVOQlFXdENPemhDUVVOcVF5eFRRVUZOU0N4TlFVRkJMRU5CUVVzc1VVRkJUQ3hEUVVGakxFOUJRV1FzUzBGQk1FSXNVVUZFUXp0NVFrRkZia003YVVKQlEwUXNSVUZCUVN4RFFVRkhMRlZCUVZVN2NVSkJRMWhCTEUxQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1YwRkJWenN5UWtGRGVFSXNRMEZCU3l4VFFVRk1PekpDUVVOQkxFTkJRVXNzUjBGQlREczdkVUpCUTB0QkxFMUJRVUVzUTBGQlN5eE5RVUZNTzI5Q1FVTkdMRWxCUVVrc1EwRkJRMEVzVFVGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4WFFVRlhPM1ZDUVVOb1F5eERRVUZMTEZkQlFVdzdPMVZCVkhORE8ybERRVms1UWp0cFFrRkRUa0VzVFVGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnp0dFFrRkJVMEVzVFVGQlFTeERRVUZMTEV0QlFVdzdPMjFDUVVOdVFrRXNUVUZCUVN4RFFVRkxMRWxCUVV3N1ZVRmtiVU03TWtKQlowSnFRenR0UWtGRFVDeERRVUZMTEZkQlFVd3NRMEZCYVVJN2VVSkJRVlU3T3pzN1UwRkpMMElzUTBGQlN5eGxRVUZNTEdkQ1FVRjFRaXhUUVVGTlFTeE5RVUZCTEVOQlFVc3NUMEZCVER0VFFVVTNRaXhEUVVGTExHTkJRVXdzWjBKQlFYTkNPMkZCUTJRc1ZVRkJWVUVzVFVGQlFTeERRVUZMTEUxQlFVdzdZVUZGV2l4VFFVRlRPMjFDUVVOWUxFTkJRVXNzVFVGQlREczdPenM3TzI5Q1FVdEdMSGxDUVVGVk8xbEJRMHdzU1VGQlFTeERRVUZMT3p0dlFrRkhWaXd5UWtGQldUdFpRVU5RTEVsQlFVRXNRMEZCU3pzN2IwSkJSMVlzZDBKQlFWTTdXVUZEU2l4SlFVRkJMRU5CUVVzN08zbENRVWRrTERoRFFVRnJRaXhYUVVGaExFVkJRVUVzVlVGQlZUdFRRVU5xUXl4alFVRmpMRTlCUVU4c1VVRkJVQ3hMUVVGdlFpeFJRVUZ3UWl4SlFVRm5ReXhSUVVGQkxFTkJRVk03V1VGRGRFUXNWMEZCUVN4SFFVRmpMRmRCUVVFc1IwRkJZeXhYUVVGWE96dDVRa0ZIYUVRc2QwTkJRV1VzVVVGQlZTeEZRVUZCTEVsQlFVMHNSVUZCUVN4WFFVRmhMRVZCUVVFc1MwRkJTenRaUVVOMlF5eFJRVUZCTEVOQlFWTXNXVUZCVkN4SlFVRjVRaXhYUVVGQkxFZEJRV01zUTBGQmVFTXNSMEZEU0N4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExGRkJRVUVzU1VGQldTeFhRVUZCTEVkQlFXTXNUVUZEY2tNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eEhRVUZCTEVkQlFVMDdPM2xDUVVkMlFpeDNSRUZCZDBJN1dVRkRaaXhKUVVGQkxFTkJRVXNzWVVGQlRDeERRVU5NTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1ZVRkJWU3hKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEUxQlEyaERMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzWVVGQllTeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPenQ1UWtGSmRrTXNNRU5CUVdsQ08xTkJRMVFzVVVGQlVTeEpRVUZCTEVOQlFVczdXVUZEV2p0blFrRkRSU3hMUVVGQkxFTkJRVTBzUzBGRVVqdHBRa0ZGUnl4TFFVRkJMRU5CUVUwc1RVRkdWRHR4UWtGSFR5eExRVUZCTEVOQlFVMHNWVUZJWWp0elFrRkpVU3hMUVVGQkxFTkJRVTBzVjBGS1pEdDFRa0ZMVXl4TFFVRkJMRU5CUVUwc1dVRk1aanQzUWtGTlZTeExRVUZCTEVOQlFVMHNZVUZPYUVJN2VVSkJUMWNzUzBGQlFTeERRVUZOT3pzN2VVSkJTVEZDTEhOQ1FVRlBPMU5CUTBRc1EwRkJReXhKUVVGQkxFTkJRVXM3VjBGQlVTeE5RVUZOTEVsQlFVa3NTMEZCU2l4RFFVRlZPMU5CUnpsQ0xFbEJRVUVzUTBGQlN5eFJRVUZNTEVOQlFXTXNUMEZCWkN4TFFVRXdRaXhQUVVGUE8yRkJRMjVETEVOQlFVc3NTVUZCVERzN1UwRkpSU3hQUVVGUExFbEJRVUVzUTBGQlN5eE5RVUZNTEVOQlFWa3NUMEZCYmtJc1MwRkJLMElzV1VGQldUdG5Ra0ZETjBNc1EwRkJVU3hKUVVGU0xFTkJRV0U3TzFOQlNWZ3NRMEZCUXl4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExGTkJRVk03WVVGRGRrSXNRMEZCU3l4WlFVRk1PMkZCUTBFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVDBGQldDeEhRVUZ4UWpzN1UwRkpka0lzUTBGQlN5eEpRVUZNTzFOQlEwRXNRMEZCU3l4TlFVRk1PMWxCUTA4N08zbENRVWRVTERoRFFVRnRRanRUUVVOaUxFbEJRVUVzUTBGQlN5eEpRVUZNTEVsQlFXRXNTVUZCWWl4SlFVRnhRaXhQUVVGUExFMUJRVkFzUzBGQmEwSXNWMEZCZGtNc1NVRkJjMFFzVDBGQlR5eE5RVUZCTEVOQlFVOHNiMEpCUVdRc1MwRkJkVU1zV1VGQldUdGxRVU16Unl4RFFVRlBMRzlDUVVGUUxFTkJRVFJDTEVsQlFVRXNRMEZCU3p0aFFVTnFReXhEUVVGTExFbEJRVXdzUjBGQldUczdVMEZGVml4SlFVRkJMRU5CUVVzc1kwRkJUQ3hKUVVGMVFpeE5RVUZOTzNGQ1FVTXZRaXhEUVVGaExFbEJRVUVzUTBGQlN6dGhRVU5zUWl4RFFVRkxMR05CUVV3c1IwRkJjMEk3T3p0NVFrRkpNVUlzZDBKQlFWRTdVMEZEUml4VlFVRlZMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV003VTBGRGVFSXNWMEZCUVN4SlFVRmxMRWxCUVVFc1EwRkJTeXhWUVVGVk8yZENRVU5vUXl4SFFVRlZPMmRDUVVOV0xFTkJRVkVzU1VGQlVpeERRVUZoT3p0VFFVVllMRU5CUVVNN1YwRkJVenRUUVVOV0xFTkJRVU1zVTBGQlFTeEpRVUZoTzJkQ1FVTm9RaXhEUVVGUkxFdEJRVklzUTBGQll6czdPMU5CUjFvc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dFhRVUZUTzFOQlEzQkNMRU5CUVVNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZUTzJGQlEzWkNMRU5CUVVzc1dVRkJURHRoUVVOQkxFTkJRVXNzUzBGQlRDeERRVUZYTEU5QlFWZ3NSMEZCY1VJN08xTkJUWFpDTEVOQlFVc3NTMEZCVEN4RFFVRlhMRTlCUVZnc1IwRkJjVUk3VTBGRGNrSXNRMEZCU3l4bFFVRk1PMU5CUTBFc1EwRkJTeXhUUVVGTUxFZEJRV2xDVHl4UFFVRkJPMU5CUTJwQ0xFTkJRVXNzU1VGQlRDeEhRVUZaTEUxQlFVRXNRMEZCVHl4eFFrRkJVQ3hEUVVFMlFpeEpRVUZCTEVOQlFVczdPM2xDUVVkb1JDd3dRa0ZCVXp0VFFVTklMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3VjBGQlZ5eEpRVUZCTEVOQlFVc3NVMEZCVER0VFFVTXhRaXhEUVVGTExFdEJRVXdzUTBGQlZ5eFBRVUZZTEVkQlFYRkNPMU5CUlhKQ0xFTkJRVXNzWlVGQlREczdlVUpCUjBZc2IwTkJRV003VTBGRFVpeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPMWRCUVZNc1NVRkJRU3hEUVVGTExFdEJRVXc3TzFkQlEyNUNMRWxCUVVFc1EwRkJTeXhKUVVGTU96dDVRa0ZKVUN4M1FrRkJVVHRUUVVOT0xFTkJRVXNzUzBGQlREdFRRVU5CTEVOQlFVc3NTMEZCVEN4RFFVRlhMRXRCUVZnc1IwRkJiVUk3VTBGRGJrSXNRMEZCU3l4TFFVRk1MRU5CUVZjc1VVRkJXQ3hIUVVGelFqdFRRVU4wUWl4RFFVRkxMRXRCUVV3c1EwRkJWeXhKUVVGWUxFZEJRV3RDTzFOQlEyeENMRU5CUVVzc1MwRkJUQ3hEUVVGWExGTkJRVmdzUjBGQmRVSTdVMEZEZGtJc1EwRkJTeXhMUVVGTUxFTkJRVmNzVDBGQldDeEhRVUZ4UWp0VFFVTnlRaXhEUVVGTExFMUJRVXc3TzNsQ1FVZEdMRFJDUVVGVk96czdVMEZEU2l4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWE8xZEJRVmM3VTBGRGRFSXNRMEZCUXl4VFFVRkJMRWxCUVdFN1owSkJRMmhDTEVOQlFWRXNTMEZCVWl4RFFVRmpPenM3VTBGSmFFSXNRMEZCU3l4SlFVRk1PMU5CUTBFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVDBGQldDeEhRVUZ4UWp0VFFVTnlRaXhEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZZTEVkQlFYVkNPMU5CUldwQ0xHRkJRV0VzU1VGQlFTeERRVUZMTEc5Q1FVRk1MRU5CUVRCQ08yMUNRVUZaT3p0VFFVVnVSQ3huUWtGQlowSXNRMEZCUVN4SFFVRkpMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3VTBGRmNrTXNRMEZCU3l4bFFVRk1PMU5CUTAwc2JVSkJRVTg3WVVGRFVDeERRVUZEVUN4TlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWE8yVkJRVmNzVDBGQlR5eFBRVUZCTEVOQlFWRXNUMEZCVWp0bFFVTnNReXhEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZZTEVkQlFYVkNPMlZCUTNaQ0xFTkJRVXNzU1VGQlREdG5Ra0ZEVDBFc1RVRkJRU3hEUVVGTExGZEJRVXdzUTBGQmFVSXNWMEZCYWtJc1EwRkRTaXhKUVVSSkxHRkJRME03YVVKQlEwRXNRMEZCUTBFc1RVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dHRRa0ZCVnp0dFFrRkRNMElzUTBGQlN5eExRVUZNTEVOQlFWY3NVMEZCV0N4SFFVRjFRanR0UWtGRGRrSXNRMEZCU3l4TFFVRk1MRU5CUVZjc1MwRkJXRHRwUWtGRFNVRXNUVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWeXhMUVVGWUxFZEJRVzFDUVN4TlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExHRkJRV0U3ZFVKQlF6ZERMRU5CUVVzc1MwRkJUQ3hEUVVGWExFbEJRVmdzU1VGQmJVSTdkVUpCUTI1Q0xFTkJRVXNzUzBGQlRDeERRVUZYTEZGQlFWZ3NSMEZCYzBKQkxFMUJRVUVzUTBGQlN5eG5Ra0ZCVEN4RFFVRnpRa0VzVFVGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4TlFVRk5RU3hOUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTzNWQ1FVTjRSU3hEUVVGTExHTkJRVXdzUjBGQmMwSXNWVUZCUVN4RFFVRlhMRTFCUVUwN2IwSkJRMnhETzNkQ1FVTk1MRU5CUVZFc1IwRkJVaXhEUVVGWk8zVkNRVU5hTEVOQlFVc3NWVUZCVER0MVFrRkRRU3hEUVVGTExGTkJRVXc3ZFVKQlEwRXNRMEZCU3l4SlFVRk1PM1ZDUVVOQkxFTkJRVXNzUjBGQlREczdPenRUUVUxS0xFTkJRVU1zU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4VFFVRlRPMkZCUTNaQ0xFTkJRVXNzV1VGQlREdGhRVU5CTEVOQlFVc3NTMEZCVEN4RFFVRlhMRTlCUVZnc1IwRkJjVUk3TzFOQlNXNUNMRWxCUVVFc1EwRkJTeXhOUVVGTUxFbEJRV1VzVDBGQlR5eEpRVUZCTEVOQlFVc3NUVUZCVEN4RFFVRlpMRmRCUVc1Q0xFdEJRVzFETEZsQlFWazdZVUZEYUVVc1EwRkJTeXhwUWtGQlRDeFhRVUYxUWl4blFrRkJVMEVzVFVGQlFTeERRVUZMTEUxQlFVd3NRMEZCV1N4WFFVRmFMRU5CUVhkQ096dG5Ra0ZKTVVRc1EwRkJXU3hYUVVGYUxFTkJRMGNzUzBGRVNDeFhRVU5UTzJkQ1FVTk1MRU5CUVZFc1MwRkJVaXhEUVVGak8wOUJSbXhDTEVOQlNVY3NTVUZLU0N4WFFVbFJPMlZCUTBvc1EwRkJTeXhKUVVGTUxFZEJRVmtzVFVGQlFTeERRVUZQTEhGQ1FVRlFMRU5CUVRaQ096czdlVUpCU1M5RExIZERRVUZuUWpzN08xTkJRMVlzU1VGQlFTeERRVUZMTEUxQlFVd3NTVUZCWlN4UFFVRlBMRWxCUVVFc1EwRkJTeXhOUVVGTUxFTkJRVmtzUzBGQmJrSXNTMEZCTmtJc1dVRkJXVHRoUVVNeFJDeERRVUZMTEdsQ1FVRk1MRmRCUVhWQ0xHZENRVUZUUVN4TlFVRkJMRU5CUVVzc1RVRkJUQ3hEUVVGWkxFdEJRVm9zUTBGQmEwSTdPenQ1UWtGSmRFUXNiME5CUVdNN096dFRRVU5TTEVsQlFVRXNRMEZCU3l4TlFVRk1MRWxCUVdVc1QwRkJUeXhKUVVGQkxFTkJRVXNzVFVGQlRDeERRVUZaTEVkQlFXNUNMRXRCUVRKQ0xGbEJRVms3WVVGRGVFUXNRMEZCU3l4cFFrRkJUQ3hYUVVGMVFpeG5Ra0ZCVTBFc1RVRkJRU3hEUVVGTExFMUJRVXdzUTBGQldTeEhRVUZhTEVOQlFXZENPenM3ZVVKQlNYQkVMR3REUVVGaE96czdVMEZEVEN4bFFVRmxMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3VTBGRmFFTXNRMEZCU3l4bFFVRk1PMU5CUTBFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVTBGQldDeEhRVUYxUWp0VFFVTjJRaXhEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZZTEVkQlFYVkNPMU5CUTNaQ0xFTkJRVXNzUzBGQlRDeERRVUZYTEU5QlFWZ3NSMEZCY1VJN1dVRkhaQ3hUUVVGQkxFVkJRVUVzUTBGRFNpeExRVVJKTEZkQlEwVTdaMEpCUTB3c1EwRkJVU3hMUVVGU0xFTkJRV003VDBGR1dDeERRVWxLTEVsQlNra3NZVUZKUXp0aFFVVkJMRmxCUVVFc1NVRkJaMEpCTEUxQlFVRXNRMEZCU3l4TlFVRnlRaXhKUVVFclFpeFBRVUZQUVN4TlFVRkJMRU5CUVVzc1RVRkJUQ3hEUVVGWkxGTkJRVzVDTEV0QlFXbERMRmxCUVZrN2JVSkJRemxGTEVOQlFVc3NhVUpCUVV3c1YwRkJkVUlzWjBKQlFWTkJMRTFCUVVFc1EwRkJTeXhOUVVGTUxFTkJRVmtzVTBGQldpeERRVUZ6UWpzN096dDVRa0ZMT1VRc2MwUkJRWE5DTEV0QlFWVTdhME5CUVZZc1IwRkJUVHM3V1VGRGJrSTdiVUpCUTBzc1IwRkJRU3hEUVVGSkxGRkJSRlE3WlVGRlF5eEhRVUZCTEVOQlFVa3NTVUZHVER0alFVZEJMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzUjBGSVdEdG5Ra0ZKUlN4SFFVRkJMRU5CUVVrc1VVRkJTaXhIUVVGbExFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWY3NVVUZCVVN4VFFVcHdRenRsUVV0RExFbEJRVUVzUTBGQlN5eFJRVUZNTEVOQlFXTXNTVUZNWmp0bFFVMURMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zU1VGT1pqdHBRa0ZQUnl4SlFVRkJMRU5CUVVzc1VVRkJUQ3hEUVVGakxFMUJVR3BDTzJsQ1FWRkhMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zVFVGU2FrSTdiVUpCVTBzc1NVRkJRU3hEUVVGTExGRkJRVXdzUTBGQll5eFJRVlJ1UWpzd1FrRlZXU3hKUVVGQkxFTkJRVXNzVVVGQlRDeERRVUZqTEdWQlZqRkNPMjlDUVZkTkxFZEJRVUVzUTBGQlNTeFRRVUZLTEVsQlFXbENMRmxCUVVFc1JVRllka0k3YzBKQldWRXNVVUZCUVN4RFFVRlRMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzV1VGQmNFSXNSMEZCYlVNc1NVRkJRU3hEUVVGTExFZEJRVXdzUTBGQlV5eEhRVUZITEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1pVRkJaVHM3TzNsQ1FVa3hSaXh2UTBGQllTeExRVUZWT3p0clEwRkJWaXhIUVVGTk96dFRRVU5pTEVOQlFVTXNTVUZCUVN4RFFVRkxPMWRCUVZFc1QwRkJUeXhQUVVGQkxFTkJRVkVzUjBGQlVpeERRVUZaTzFOQlEycERMRTlCUVU4c1NVRkJRU3hEUVVGTExFMUJRVXdzUTBGQldTeFRRVUZ1UWl4TFFVRnBReXhaUVVGWk8yRkJReTlETEVOQlFVc3NUVUZCVEN4RFFVRlpMRk5CUVZvN08xTkJTVVVzWVVGQllTeEpRVUZCTEVOQlFVc3NiMEpCUVV3c1EwRkJNRUk3VTBGRmNrTXNVMEZCVXl4WlFVRkJPMU5CUTFnc1NVRkJTU3hQUVVGQkxFTkJRVkVzVDBGQlVqdFRRVU5LTEUxQlFVRXNTVUZCVlN4SFFVRkJMRU5CUVVrc1RVRkJaQ3hKUVVGM1FpeFBRVUZQTEUxQlFVRXNRMEZCVHl4TlFVRmtMRXRCUVhsQ0xGbEJRVms3WVVGRGVrUXNZVUZCWVVjc1dVRkJRU3hEUVVGUExFbEJRVWs3WVVGRGVFSXNUMEZCVHl4TlFVRkJMRU5CUVU4c1RVRkJVQ3hEUVVGak8yRkJRM1pDU3l4WFFVRkJMRU5CUVZVN1pVRkJUeXhEUVVGQkxFZEJRVWs3TzJWQlEzQkNMRU5CUVVFc1IwRkJTU3hQUVVGQkxFTkJRVkVzVDBGQlVpeERRVUZuUWpzN1dVRkhjRUlzUTBGQlFTeERRVUZGTEVsQlFVWXNWMEZCVHl4bFFVTk1VaXhOUVVGQkxFTkJRVXNzWTBGQlRDeERRVUZ2UWtjc1dVRkJRU3hEUVVGUExFbEJRVWtzV1VGQldUdGxRVUZSTEVsQlFVRXNTVUZCVVR0WlFVUTNSQ3hEUVVWS0xFbEJSa2tzVjBGRlF6dGhRVWRHTEUxQlFVRXNRMEZCVHl4TlFVRlFMRXRCUVd0Q08yVkJRVWNzVDBGQlR5eE5RVUZCTEVOQlFVODdPMlZCUTJ4RExFOUJRVTg3T3p0NVFrRkphRUlzTUVOQlFXZENMRmxCUVdsQ096dG5SRUZCYWtJc1IwRkJZVHM3VTBGRE0wSXNRMEZCU3l4TlFVRk1MRU5CUVZrc1UwRkJXaXhIUVVGM1FqdFRRVWQ0UWl4RFFVRkxMRTFCUVV3N1UwRkhTU3hoUVVGaExFbEJRVUVzUTBGQlN5eE5RVUZNTzFOQlIxZ3NVMEZCVXl4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWE8xTkJSM1JDTEU5QlFVOHNWVUZCVUN4TFFVRnpRaXhoUVVGaE8yMUNRVU55UXl4SFFVRmhMRU5CUVVVN08yVkJSV3BDTEVkQlFXRXNSVUZCUVN4RFFVRkhMRTFCUVVnc1EwRkJWU3hYUVVGV0xFTkJRWE5DTEUxQlFYUkNMRU5CUVRaQ08yVkJTVEZETEVkQlFXRXNWVUZCUVN4RFFVRlhMRWRCUVZnc1YwRkJaVHRoUVVOd1FpeG5Ra0ZCWjBJc1QwRkJUeXhOUVVGUUxFdEJRV3RDTEZGQlFXeENMRWxCUVRoQ0xFMUJRVGxDTEV0QlFYbERMRTFCUVVFc1NVRkJWU3hOUVVGV0xFbEJRVzlDTEZOQlFVRXNTVUZCWVR0aFFVTXhSaXhQUVVGUExHRkJRVUVzUjBGQlowSXNUVUZCUVN4RFFVRlBMRTlCUVU4N1lVRkRja01zVDBGQlR5eGhRVUZCTEVkQlFXZENRU3haUVVGQkxFTkJRVThzU1VGQlNTeFJRVUZSTzIxQ1FVRkZPMk5CUVZVN2JVSkJRVVU3TzJGQlF6RkVMRkZCUVVFc1EwRkJVeXhQUVVGUE8ybENRVU5hTEZkQlFWY3NTVUZCUVN4RFFVRkxMRkZCUVV3c1NVRkJhVUlzVlVGQlFTeERRVUZYTzJsQ1FVTjJReXhyUWtGQmEwSXNUMEZCUVN4RFFVRlJMRWxCUVVFc1EwRkJTeXhwUWtGQmFVSXNWVUZCUVN4RFFVRlhMR2xDUVVGcFFqdDFRa0ZETjBNc1dVRkJRU3hEUVVGaExFMUJRVTA3TWtKQlFVVXNVVUZCUmp0clEwRkJXVHM3YVVKQlFUVkVPMmxDUVVGVE8ybENRVUZYTzI5Q1FVTnlRaXhOUVVGQkxFTkJRVThzVFVGQlVDeERRVUZqTEUxQlFVMDdNRUpCUVVVc1QwRkJSanMwUWtGQlZ5eFRRVUZZTzNWQ1FVRnpRanM3WjBKQlF6VkRPMjlDUVVORk96czdVMEZMV0N4RFFVRkxMRTFCUVV3c1EwRkJXU3hUUVVGYUxFZEJRWGRDTzFOQlEzaENMRU5CUVVzc1RVRkJURHRUUVVOQkxFTkJRVXNzVFVGQlREdFpRVWRQTEU5QlFVRXNRMEZCVVN4SFFVRlNMRU5CUVZrc1ZVRkJRU3hEUVVGWExFZEJRVmdzVjBGQlowSXNUVUZCVVN4RlFVRkJMRU5CUVVjc1JVRkJRU3hYUVVGYU8yRkJSVEZDTEZOQlFWTkJMRmxCUVVFc1EwRkJUenQzUWtGRFZDeEZRVVJUTzNGQ1FVVmFMRVZCUmxrN2NVSkJSMW83V1VGRFVDeFpRVUZaTEZGQlFWRTdiMEpCUTJRc1EwRkVZenN3UWtGRlVpeFRRVUZCTEVOQlFWVTdPMkZCUzI1Q0xGbEJRVmtzVlVGQlFTeERRVUZYTEVsQlFWZ3NTMEZCYjBJc1MwRkJjRUlzUjBGQk5FSXNVVUZCVVN4TlFVRkJMRU5CUVU4N1pVRkROMFFzUTBGQlR5eEpRVUZRTEVkQlFXTXNVMEZCUVN4TFFVRmpPMlZCUnpWQ0xFTkJRVThzVVVGQlVDeEhRVUZyUWl4bFFVRkJMRU5CUVdkQ08yZENRVWN6UWl4TlFVRkJMRU5CUVU4N1owSkJRMUFzVFVGQlFTeERRVUZQTzJOQlIxUlVMRWxCUVVrc1MwRkJTeXhSUVVGUk8ybENRVU5vUWl4UFFVRlBMRTFCUVVFc1EwRkJUeXhGUVVGa0xFdEJRWEZDTzIxQ1FVRmhMRTlCUVU4c1RVRkJRU3hEUVVGUE96dGhRVWRzUkN4alFVRmpMRTlCUVVFc1EwRkJVU3hQUVVGU0xFTkJRV2RDTzJGQlF6bENMRTFCUVVFc1EwRkJUeXhOUVVGTk8ybENRVVZVTEU5QlFVOHNUVUZCUVN4RFFVRlBPMmxDUVVOb1FpeE5RVUZCTEVOQlFVOHNVMEZCVXp0eFFrRkRXaXhWUVVGVkxFMUJRVUVzUTBGQlR6czBRa0ZEZGtJc1IwRkJZeXhYUVVGQkxFTkJRVmtzVTBGQlV6dHZRa0ZET1VJN05FSkJRMHdzUjBGQll5eFJRVUZCTEVOQlFWTXNUVUZCVFRzN08yZENRVWN4UWl4WFFVRkJMRU5CUVZrc1NVRkJXaXhYUVVGcFFpeHhRa0ZEWml4TlFVRkJMRU5CUVU4c1RVRkJVQ3hEUVVGakxFbEJRVWtzVVVGQlVUdFJRWGhET1VJc1EwRXdRMGdzU1VFeFEwY3NWMEV3UTBVN1lVRkRSQ3hqUVVGakxFVkJRVUVzUTBGQlJ5eE5RVUZJTEZkQlFWVXNXVUZCU3l4RFFVRkJMRU5CUVVVN1lVRkRha01zVjBGQlFTeERRVUZaTEUxQlFWb3NSMEZCY1VJc1IwRkJSenRwUWtGRmNFSXNhMEpCUVd0Q0xGZEJRVUVzUTBGQldTeEpRVUZhTEZkQlFXbENMRmxCUVVzc1EwRkJRU3hEUVVGRk8ybENRVU14UXl4WFFVRlhMRmRCUVVFc1EwRkJXU3hKUVVGYUxGZEJRV2xDTEZsQlFVc3NRMEZCUVN4RFFVRkZPMmxDUVVOdVF5eGpRVUZqTEZkQlFVRXNRMEZCV1N4SlFVRmFMRmRCUVdsQ0xGbEJRVXNzUTBGQlFTeERRVUZGTzJsQ1FVTjRRenRwUWtGRlFTeFhRVUZCTEVOQlFWa3NUVUZCV2l4SFFVRnhRanR0UWtGQlJ5eEpRVUZCTEVkQlFVOHNWMEZCUVN4RFFVRlpPMjFDUVVVeFF5eEpRVUZKTzIxQ1FVRnBRaXhKUVVGQkxFZEJRVThzUTBGQlJ5eGxRVUZCTEVOQlFXZENMSEZDUVVGakxGZEJRVUVzUTBGQldTeEZRVUZhTEVOQlFXVTdPMjFDUVVVMVJTeEpRVUZCTEVkQlFVOHNUVUZCUnl4WFFVRkJMRU5CUVZrc1JVRkJXaXhEUVVGbE8ybENRVU14UWl4UlFVRlJPMmxDUVVOU0xGVkJRVUVzUTBGQlZ5eFZRVUZWTzNGQ1FVTnFRaXhwUWtGQmFVSXNVVUZCUVN4RFFVRlRUU3hOUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTzNOQ1FVTXpReXhIUVVGUkxHTkJRVUVzYTBKQlFUUkNMRlZCUVVFc1EwRkJWeXhMUVVGWUxFZEJRVzFDTEdOQlFVOUJMRTFCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzY1VOQlFUUkNMRlZCUVVFc1EwRkJWenR2UWtGRE0wY3NTVUZCU1N4WFFVRkJMRU5CUVZrc1RVRkJXaXhIUVVGeFFpeEhRVUZITzNOQ1FVTnFReXhIUVVGUk96dHBRa0ZGU2l4VFFVRlRMRkZCUVVFc1IwRkJWeXh6UWtGQmMwSTdhVUpCUXpGRExGTkJRVk1zVjBGQlFTeEhRVUZqTEcxQ1FVRnRRanR2UWtGRGFFUXNRMEZCVVN4SFFVRlNMRlZCUVd0Q0xHdENRVUZoTEdsQ1FVRlpMR05CUVZNc1VVRkJVeXh0UWtGQmJVSXNiVUpCUVcxQ0xITkNRVUZ6UWpzN1lVRkZka2dzVDBGQlQwRXNUVUZCUVN4RFFVRkxMRTFCUVV3c1EwRkJXU3hWUVVGdVFpeExRVUZyUXl4WlFVRlpPMjFDUVVOb1JDeERRVUZMTEUxQlFVd3NRMEZCV1N4VlFVRmFPenRuUWtGRlN6czdPM2xDUVVsWUxHZEVRVUZ0UWl4SlFVRkpPMU5CUTNKQ0xFTkJRVXNzVlVGQlREdFBRVU5CTEVOQlFVY3NTVUZCUVN4RFFVRkxPMU5CUTFJc1EwRkJTeXhYUVVGTU96dDVRa0ZIUml4dlEwRkJZenRUUVVOT0xGRkJRVkVzU1VGQlFTeERRVUZMTzFOQlIyWXNRMEZCUXl4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFVkJRVm9zU1VGQmEwSXNTMEZCUVN4RFFVRk5MRTlCUVhoQ0xFbEJRVzFETEVOQlFVTXNTMEZCUVN4RFFVRk5MRWxCUVVrN1kwRkRhRVFzUTBGQlRTeFBRVUZPTEVOQlFXTXNTVUZCWkR0aFFVTkpMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zV1VGQlpDeExRVUVyUWl4UFFVRlBPMnRDUVVONFF5eERRVUZOTEU5QlFVNHNRMEZCWXl4TFFVRmtMRU5CUVc5Q0xFdEJRVUVzUTBGQlRTeFJRVUZSTEV0QlFVRXNRMEZCVFRzN1dVRkZja01zU1VGQlNTeExRVUZCTEVOQlFVMHNTVUZCU1R0alFVTnVRaXhEUVVGTkxFVkJRVTRzUTBGQlV5eExRVUZVTEVOQlFXVXNTMEZCUVN4RFFVRk5MRTFCUVU0c1IwRkJaU3hMUVVGQkxFTkJRVTBzV1VGQldTeExRVUZCTEVOQlFVMHNUVUZCVGl4SFFVRmxMRXRCUVVFc1EwRkJUVHM3TzNsQ1FVbDZSU3h6UTBGQlpUdFRRVU5RTEZGQlFWRXNTVUZCUVN4RFFVRkxPMU5CUldZc1EwRkJReXhKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEVWQlFWb3NTVUZCYTBJc1MwRkJRU3hEUVVGTkxFOUJRWGhDTEVsQlFXMURMRU5CUVVNc1MwRkJRU3hEUVVGTkxFbEJRVWs3WTBGRGFFUXNRMEZCVFN4UFFVRk9MRU5CUVdNc1QwRkJaRHM3VTBGUFJTeExRVUZCTEVOQlFVMHNSVUZCVGl4SlFVRlpMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zUzBGQlpDeExRVUYzUWl4TFFVRndReXhKUVVFMlF5eERRVUZETEV0QlFVRXNRMEZCVFN4SlFVRkpPMk5CUXpGRUxFTkJRVTBzUlVGQlRpeERRVUZUTEV0QlFWUTdPenQ1UWtGSlNpeDNRa0ZCVVR0VFFVTkdMRWxCUVVFc1EwRkJTeXhOUVVGTUxFbEJRV1VzVDBGQlR5eEpRVUZCTEVOQlFVc3NUVUZCVEN4RFFVRlpMRWxCUVc1Q0xFdEJRVFJDTEZsQlFWazdZVUZEZWtRc1EwRkJTeXhWUVVGTU8yRkJRMEVzUTBGQlN5eE5RVUZNTEVOQlFWa3NTVUZCV2l4RFFVRnBRaXhKUVVGQkxFTkJRVXM3WVVGRGRFSXNRMEZCU3l4WFFVRk1PenM3ZVVKQlNVb3NORUpCUVZVN1UwRkRTaXhKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEVsQlFVazdZVUZEYWtJc1EwRkJTeXhwUWtGQlRDeEhRVUY1UWp0aFFVTjZRaXhEUVVGTExFdEJRVXdzUTBGQlZ5eEZRVUZZTEVOQlFXTXNUVUZCWkR0blFrRkRUeXhKUVVGQkxFTkJRVXM3V1VGRFVEdG5Ra0ZEUlN4SlFVRkJMRU5CUVVzc1kwRkJURHM3TzNsQ1FVbFlMRFJEUVVGclFqdFRRVU5hTEVOQlFVTXNTVUZCUVN4RFFVRkxPMWRCUVZFN1UwRkZXaXhSUVVGUkxFbEJRVUVzUTBGQlN6dFRRVU51UWl4RFFVRkxMRlZCUVV3N1UwRkZTVHRUUVVWQkxFOUJRVThzU1VGQlFTeERRVUZMTEUxQlFWb3NTMEZCZFVJc1dVRkJXVHR0UWtGRGNrTXNSMEZCWVN4SlFVRkJMRU5CUVVzc1RVRkJUQ3hEUVVGWk8xbEJRM0JDTEVsQlFVa3NUMEZCVHl4SlFVRkJMRU5CUVVzc1RVRkJUQ3hEUVVGWkxFMUJRVzVDTEV0QlFUaENMRmxCUVZrN2JVSkJRMjVFTEVkQlFXRXNTVUZCUVN4RFFVRkxMRTFCUVV3c1EwRkJXU3hOUVVGYUxFTkJRVzFDT3p0VFFVZHNReXhEUVVGTExGZEJRVXc3V1VGRlR6czdlVUpCUjFRc01FSkJRVkVzUzBGQlZUczdhME5CUVZZc1IwRkJUVHM3VTBGSlRpeHJRa0ZCYTBJc1EwRkRkRUk3VjBGSFJpeERRVUZQTEVsQlFWQXNRMEZCV1N4SlFVRmFMRU5CUVdsQ0xFOUJRV3BDTEZkQlFYbENPMkZCUTI1Q0xHVkJRVUVzUTBGQlowSXNUMEZCYUVJc1EwRkJkMElzU1VGQmVFSXNTVUZCWjBNc1IwRkJSenR0UWtGREwwSXNTVUZCU1N4TFFVRktMRzlDUVVFd1FqczdPMU5CU1RsQ0xGbEJRVmtzU1VGQlFTeERRVUZMTEZOQlFVd3NRMEZCWlR0VFFVTXpRaXhoUVVGaExFbEJRVUVzUTBGQlN5eFRRVUZNTEVOQlFXVTdWVUZITjBKT0xFbEJRVWtzVDBGQlR5eExRVUZMTzJGQlEySXNVVUZCVVN4SFFVRkJMRU5CUVVrN1lVRkRaQ3hQUVVGUExFdEJRVkFzUzBGQmFVSXNZVUZCWVR0dFFrRkRhRU1zUTBGQlN5eFRRVUZNTEVOQlFXVXNTVUZCWml4SFFVRnpRanM3TzFOQlMzQkNMRmRCUVZjc1RVRkJRU3hEUVVGUExFMUJRVkFzUTBGQll5eEpRVUZKTEVsQlFVRXNRMEZCU3l4WFFVRlhPMU5CUXk5RExFMUJRVUVzU1VGQlZTeEhRVUZXTEVsQlFXbENMRTlCUVVFc1NVRkJWenRYUVVGTExFMUJRVTBzU1VGQlNTeExRVUZLTEVOQlFWVTdWMEZEYUVRc1NVRkJTU3hOUVVGQkxFbEJRVlU3VjBGQlN5eFBRVUZQTEZGQlFVRXNRMEZCVXp0WFFVTnVReXhKUVVGSkxFOUJRVUVzU1VGQlZ6dFhRVUZMTEU5QlFVOHNVVUZCUVN4RFFVRlRPMU5CUTNKRExGVkJRVUVzU1VGQll5eEhRVUZrTEVsQlFYRkNMR0ZCUVVFc1NVRkJhVUk3VjBGQlN5eE5RVUZOTEVsQlFVa3NTMEZCU2l4RFFVRlZPMWRCUXpGRUxFbEJRVWtzVlVGQlFTeEpRVUZqTzFkQlFVc3NUMEZCVHl4UlFVRkJMRU5CUVZNN1YwRkRka01zU1VGQlNTeGhRVUZCTEVsQlFXbENPMWRCUVVzc1QwRkJUeXhSUVVGQkxFTkJRVk03VTBGSE0wTXNUVUZCUVN4SlFVRlZPMWRCUVVzc1NVRkJRU3hEUVVGTExFMUJRVXdzUTBGQldTeEpRVUZhTEVkQlFXMUNMRWRCUVVFc1EwRkJTVHRUUVVWd1F5eFpRVUZaTEVsQlFVRXNRMEZCU3l4WlFVRk1MRU5CUVd0Q08xZEJRM0JETEVOQlFVOHNUVUZCVUN4RFFVRmpMRWxCUVVFc1EwRkJTeXhSUVVGUk8xTkJSM1pDTEZOQlFVRXNTMEZCWXl4SlFVRkJMRU5CUVVzc1UwRkJUQ3hEUVVGbExFMUJRVGRDTEVsQlFYVkRMRlZCUVVFc1MwRkJaU3hKUVVGQkxFTkJRVXNzVTBGQlRDeERRVUZsTEZOQlFWTTdiVUpCUTNCRUxGbEJRVUVzUTBGQllTeEpRVUZCTEVOQlFVczdZVUZCZEVNN1lVRkJVVHRoUVVWb1FpeERRVUZMTEV0QlFVd3NRMEZCVnl4TlFVRllMRWRCUVc5Q08yRkJRM0JDTEVOQlFVc3NTMEZCVEN4RFFVRlhMRTlCUVZnc1IwRkJjVUk3WVVGSGNrSXNRMEZCU3l4WFFVRk1PMkZCUjBFc1EwRkJTeXh4UWtGQlREczdVMEZKUlN4SFFVRkJMRU5CUVVrc1JVRkJTaXhKUVVGVkxFOUJRVThzUjBGQlFTeERRVUZKTEVWQlFWZ3NTMEZCYTBJc1dVRkJXVHRoUVVNeFF5eERRVUZMTEV0QlFVd3NRMEZCVnl4RlFVRllMRWRCUVdkQ0xFZEJRVUVzUTBGQlNUdGhRVU53UWl4RFFVRkxMRXRCUVV3c1EwRkJWeXhGUVVGWUxFTkJRV01zU1VGQlpDeG5Ra0ZCY1VJN2FVSkJRMlpOTEUxQlFVRXNRMEZCU3p0dFFrRkJaVHR0UWtGRGVFSXNRMEZCU3l4cFFrRkJUQ3hIUVVGNVFrRXNUVUZCUVN4RFFVRkxMR05CUVV3N096dFRRVXQ2UWl4VFFVRkJMRWxCUVdFc1MwRkJTenRoUVVOb1FpeEhRVUZCTEVOQlFVazdaVUZCVXl4SlFVRkJMRU5CUVVzc1NVRkJURHM3WlVGRFdpeEpRVUZCTEVOQlFVc3NTMEZCVERzN2EwSkJSMUFzUTBGQll5eEpRVUZCTEVOQlFVczdVMEZIYmtJc1EwRkJTeXhOUVVGTU8xTkJRMEVzUTBGQlN5eE5RVUZNTzFsQlEwOHNTVUZCUVN4RFFVRkxPenQ1UWtGSFpDdzBRa0ZCVlR0VFFVTkdMRmRCUVZjc1NVRkJRU3hEUVVGTExHRkJRVXc3VTBGRldDeFhRVUZYTEVsQlFVRXNRMEZCU3p0VFFVTm9RaXhSUVVGUkxFbEJRVUVzUTBGQlN6dFRRVWRpTEZkQlFWY3NXVUZCUVN4RFFVRmhMRTlCUVU4N1YwRkhja01zUTBGQlR5eE5RVUZRTEVOQlFXTXNTVUZCUVN4RFFVRkxMRkZCUVZFN1pVRlRka0lzU1VGQlFTeERRVUZMTzFOQlRGQTdVMEZEUVR0VFFVTkJPMU5CUTBFN1UwRkRRVHRUUVVsSkxGTkJRVk1zU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnp0VFFVTjBRaXhOUVVGQkxFbEJRVlVzVVVGQlFTeERRVUZUTEZsQlFWUXNTMEZCTUVJc1QwRkJUenRoUVVONlF5eExRVUZCTEVOQlFVMHNTVUZCU1R0cFFrRkZVaXhOUVVGQkxFTkJRVThzUzBGQlVDeExRVUZwUWl4WFFVRnFRaXhKUVVGblF5eE5RVUZCTEVOQlFVOHNUVUZCVUN4TFFVRnJRaXhqUVVGak8zRkNRVU5zUlN4RFFVRkxMR0ZCUVV3c1IwRkJjVUk3YzBKQlJYSkNMRU5CUVUwc1JVRkJUaXhEUVVGVExGbEJRVlFzUTBGQmMwSTdjMEpCUTNSQ0xFTkJRVTBzUlVGQlRpeERRVUZUTEZsQlFWUXNRMEZCYzBJc1YwRkJRU3hIUVVGakxGbEJRVmtzV1VGQlFTeEhRVUZsTEZsQlFWazdjVUpCUXpORkxFTkJRVXNzWVVGQlRDeEhRVUZ4UWpzN1owSkJSV3hDTzJsQ1FVVkVMRTFCUVVFc1EwRkJUeXhMUVVGUUxFdEJRV2xDTzIxQ1FVRmhMRTFCUVVFc1EwRkJUeXhMUVVGUUxFZEJRV1U3YVVKQlF6ZERMRTFCUVVFc1EwRkJUeXhOUVVGUUxFdEJRV3RDTzIxQ1FVRmpMRTFCUVVFc1EwRkJUeXhOUVVGUUxFZEJRV2RDT3p0aFFVZHNSQ3hUUVVGQkxFVkJRVUVzU1VGQlpTeFJRVUZCTEVOQlFWTXNWMEZCVkN4TFFVRjVRaXhQUVVGUE8yMUNRVU5xUkN4RFFVRlBMRXRCUVZBc1EwRkJZU3hMUVVGaUxFZEJRWEZDTzIxQ1FVTnlRaXhEUVVGUExFdEJRVkFzUTBGQllTeE5RVUZpTEVkQlFYTkNPenM3VTBGSmNFSXNWMEZCVnl4SlFVRkJMRU5CUVVzc1lVRkJURHRUUVVOaUxGVkJRVlVzUTBGQlExTXNWMEZCUVN4RFFVRlZMRlZCUVZVN1UwRkRMMElzVTBGQlV6dGhRVU5ZTEVOQlFVc3NXVUZCVERzN1dVRkZTenM3ZVVKQlIxUXNkME5CUVdkQ08xTkJSVllzU1VGQlFTeERRVUZMTEUxQlFVd3NTVUZCWlN4UFFVRlBMRWxCUVVFc1EwRkJTeXhOUVVGTUxFTkJRVmtzVFVGQmJrSXNTMEZCT0VJc1dVRkJXVHRoUVVNelJDeERRVUZMTEUxQlFVd3NRMEZCV1N4TlFVRmFMRU5CUVcxQ0xFbEJRVUVzUTBGQlN6czdPM2xDUVVrMVFpdzRRa0ZCVnp0VFFVTk1MRU5CUVVNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dFhRVUZUTzFOQlEzSkNMRU5CUVVNc1UwRkJRU3hKUVVGaE8yZENRVU5vUWl4RFFVRlJMRXRCUVZJc1EwRkJZenM3TzFOQlIyaENMRU5CUVVzc1NVRkJUQ3hIUVVGWkxFMUJRVUVzUTBGQlR5eHhRa0ZCVUN4RFFVRTJRaXhKUVVGQkxFTkJRVXM3VTBGRk1VTXNUVUZCVFVZc1QwRkJRVHRUUVVWS0xFMUJRVTBzU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnp0VFFVTnFRaXhyUWtGQmEwSXNTVUZCUVN4SFFVRlBPMU5CUXpOQ0xHTkJRV01zUjBGQlFTeEhRVUZOTEVsQlFVRXNRMEZCU3p0VFFVVjJRaXhYUVVGWExFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWYzdVMEZEZEVJc1kwRkJZeXhQUVVGUExGRkJRVkFzUzBGQmIwSXNVVUZCY0VJc1NVRkJaME1zVVVGQlFTeERRVUZUTzFOQlJYcEVMR0ZCUVdFN1UwRkRXQ3hsUVVGbExFbEJRVUVzUTBGQlN5eFJRVUZNTEVOQlFXTTdVMEZETDBJc1dVRkJRU3hMUVVGcFFpeFRRVUZUTzI5Q1FVTTFRaXhIUVVGak8xbEJRMVFzU1VGQlNTeFpRVUZCTEV0QlFXbENMRmxCUVZrN1lVRkRiRU1zVjBGQlFTeEhRVUZqTEdsQ1FVRnBRanRuUWtGRGFrTXNSMEZCVFN4SFFVRkJMRWRCUVU4c1YwRkJRU3hIUVVGak8ybENRVU16UWl4RFFVRkxMRk5CUVV3c1IwRkJhVUk3WjBKQlExbzdkVUpCUTB3c1IwRkJZVHM3V1VGRlZqdGhRVU5NTEVOQlFVc3NVMEZCVEN4SFFVRnBRanM3VTBGSFlpeFpRVUZaTEZkQlFVRXNSMEZCWXp0VFFVTTFRaXhWUVVGVkxFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWY3NTVUZCV0N4SFFVRnJRaXhUUVVGQkxFZEJRVmtzU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnp0VFFVZHVSQ3hQUVVGQkxFZEJRVlVzUTBGQlZpeEpRVUZsTEdGQlFXRTdaMEpCUXpsQ0xFZEJRVlVzVVVGQlFTeEhRVUZYT3p0VFFVbHVRaXhoUVVGaE8xTkJRMklzWTBGQll6dFRRVVZhTEZWQlFWVXNTVUZCUVN4RFFVRkxMRkZCUVV3c1EwRkJZeXhKUVVGa0xFdEJRWFZDTzFOQlJXNURMRmRCUVVFc1NVRkJaU3hQUVVGQkxFbEJRVmNzVlVGQlZUdGhRVVZzUXl4VFFVRlRPM1ZDUVVOWUxFZEJRV0U3YjBKQlEySXNSMEZCVlN4UFFVRkJMRWRCUVZVN2QwSkJRM0JDTEVkQlFXTTdaMEpCUTFRN2RVSkJRMHdzUjBGQllUdHZRa0ZEWWl4SFFVRlZPM1ZDUVVOV0xFZEJRV0U3TzJGQlIyWXNRMEZCU3l4VlFVRk1PenRUUVVkRkxGbEJRVms3WVVGRFpDeERRVUZMTEV0QlFVd3NRMEZCVnl4VFFVRllMRWRCUVhWQ08yRkJRM1pDTEVOQlFVc3NTMEZCVEN4RFFVRlhMRWxCUVZnc1IwRkJhMEk3WVVGRGJFSXNRMEZCU3l4TFFVRk1MRU5CUVZjc1VVRkJXQ3hIUVVGelFpeEpRVUZCTEVOQlFVc3NaMEpCUVV3c1EwRkJjMElzVTBGQlV6dGhRVU12UXl4WlFVRlpMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3WVVGRE4wSXNRMEZCU3l4TFFVRk1MRU5CUVZjc1MwRkJXQ3hIUVVGdFFpeEpRVUZCTEVOQlFVc3NiMEpCUVV3N1lVRkRaanRsUVVGaExFbEJRVUVzUTBGQlN5eFpRVUZNTzJGQlEySXNVMEZCUVN4TFFVRmpMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3WlVGQlR5eEpRVUZCTEVOQlFVc3NTVUZCVER0aFFVTndReXhEUVVGTExFMUJRVXc3WVVGRFFTeERRVUZMTEV0QlFVd3NRMEZCVnl4VFFVRllMRWRCUVhWQ096dFRRVWR5UWl4WlFVRlpPMkZCUTJRc1EwRkJTeXhMUVVGTU96czdlVUpCU1Vvc09FSkJRVlVzU1VGQlNUdFRRVU5TTEU5QlFVOHNSVUZCVUN4TFFVRmpPMWRCUVZrc1RVRkJUU3hKUVVGSkxFdEJRVW9zUTBGQlZUdFBRVU01UXl4RFFVRkhMRWxCUVVFc1EwRkJTenRUUVVOU0xFTkJRVXNzVFVGQlREczdlVUpCUjBZc01FSkJRVk03VTBGRFVDeERRVUZMTEhGQ1FVRk1PenQ1UWtGSFJpdzRRa0ZCVnp0VFFVTk1MRk5CUVVFc1NVRkJZVHRsUVVObUxFTkJRVThzYlVKQlFWQXNRMEZCTWtJc1ZVRkJWU3hKUVVGQkxFTkJRVXM3WVVGRE1VTXNRMEZCU3l4clFrRkJUQ3hEUVVGM1FpeE5RVUY0UWpzN1UwRkZSU3hKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEUxQlFWZ3NRMEZCYTBJc1pVRkJaVHRoUVVOdVF5eERRVUZMTEV0QlFVd3NRMEZCVnl4TlFVRllMRU5CUVd0Q0xHRkJRV3hDTEVOQlFXZERMRmRCUVdoRExFTkJRVFJETEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN096dDVRa0ZKTTBRc01FUkJRWGxDTzFOQlEyNUNMRU5CUVVNc1UwRkJRVHRYUVVGaE8xTkJRMlFzU1VGQlFTeERRVUZMTEZGQlFVd3NRMEZCWXl4TlFVRmtMRXRCUVhsQ0xFdEJRWHBDTEV0QlFXMURMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVFVGQldDeEpRVUZ4UWl4RFFVRkRMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVFVGQldDeERRVUZyUWl4blFrRkJaMEk3WVVGRGRrWXNaMEpCUVdkQ0xFbEJRVUVzUTBGQlN5eFJRVUZNTEVOQlFXTXNUVUZCWkN4SlFVRjNRaXhSUVVGQkxFTkJRVk03YzBKQlEzWkVMRU5CUVdNc1YwRkJaQ3hEUVVFd1FpeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPenM3ZVVKQlNYcERMSE5EUVVGbE8xTkJRMVFzU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4VFFVRlRPMkZCUTJ4Q0xHTkJRVUVzUTBGQlpTeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRlZCUVZVN2FVSkJRM1JETEVOQlFVc3NUVUZCVEN4RFFVRlpMRVZCUVZvc1IwRkJhVUlzU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnp0blFrRkRka0k3YjBKQlEwVXNTVUZCUVN4RFFVRkxMRTFCUVV3c1EwRkJXVHM3T3p0NVFrRkxla0lzYzBOQlFXTXNWVUZCWlRzMFEwRkJaaXhIUVVGWE96dFRRVVZ1UWl4WFFVRlhMRkZCUVVFc1EwRkJVenRUUVVOd1FpeGpRVUZqTEZGQlFVRXNRMEZCVXp0VFFVTnlRaXhaUVVGWkxFOUJRVUVzUTBGQlVTeFJRVUZCTEVOQlFWTXNWMEZCVnp0VFFVTjRReXhOUVVGTkxFOUJRVUVzUTBGQlVTeFJRVUZCTEVOQlFWTXNTMEZCU3p0VFFVTTFRaXhqUVVGakxFOUJRVThzVVVGQlVDeExRVUZ2UWl4UlFVRndRaXhKUVVGblF5eFJRVUZCTEVOQlFWTTdVMEZEZGtRc2FVSkJRV2xDTEU5QlFVOHNWMEZCVUN4TFFVRjFRaXhSUVVGMlFpeEpRVUZ0UXl4UlFVRkJMRU5CUVZNN1UwRkZOMFFzTUVKQlFUQkNMRmRCUVVFc1IwRkJZeXhKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEVkQlFVRXNSMEZCVFN4WlFVRlpPMU5CUTNKRkxEQkNRVUV3UWl4alFVRkJMRWRCUVd0Q0xGZEJRVUVzUjBGQll5eE5RVUZQTzFOQlEyNUZMRmRCUVVFc1NVRkJaU3hqUVVGbUxFbEJRV2xETEhWQ1FVRkJMRXRCUVRSQ0xHRkJRV0U3WlVGRGRFVXNTVUZCU1N4TFFVRktMRU5CUVZVN08xTkJSMlFzVDBGQlR5eFJRVUZCTEVOQlFWTXNWVUZCYUVJc1MwRkJLMElzVjBGQkwwSXNTVUZCT0VNc1QwRkJUeXhSUVVGQkxFTkJRVk1zUzBGQmFFSXNTMEZCTUVJc1lVRkJZVHRuUWtGRGRrWXNRMEZCVVN4SlFVRlNMRU5CUVdFN08yZENRVWRtTEVkQlFXTXNUMEZCUVN4RFFVRlJMR0ZCUVdFc2VVSkJRWGxDTzJGQlF6VkVMRWRCUVZjc1QwRkJRU3hEUVVGUkxGVkJRVlVzZVVKQlFYbENPMU5CUldoRUxGbEJRVmtzVVVGQlFTeERRVUZUTzFOQlEzSkNMR0ZCUVdFc1VVRkJRU3hEUVVGVE8xTkJRM1JDTEdWQlFXVXNUMEZCVHl4VFFVRlFMRXRCUVhGQ0xGRkJRWEpDTEVsQlFXbERMRkZCUVVFc1EwRkJVenRUUVVONlJDeG5Ra0ZCWjBJc1QwRkJUeXhWUVVGUUxFdEJRWE5DTEZGQlFYUkNMRWxCUVd0RExGRkJRVUVzUTBGQlV6dFRRVWMzUkN4UFFVRlBPMU5CUTFBc1VVRkJVVHRUUVVOU0xGZEJRVmM3VTBGRFdDeFpRVUZCTEVsQlFXZENMR1ZCUVdVN1pVRkRNMElzU1VGQlNTeExRVUZLTEVOQlFWVTdXVUZEV0N4SlFVRkpMR05CUVdNN1lVRkZka0lzUjBGQlR6dHBRa0ZEVUN4SFFVRlhMRWxCUVVFc1EwRkJTeXhuUWtGQlRDeERRVUZ6UWl4TlFVRk5PMk5CUTNaRExFZEJRVkVzU1VGQlFTeERRVUZMTEdGQlFVd3NRMEZEVGl4VlFVRlZMRTFCUTFZc1lVRkJZVHRaUVVWV0xFbEJRVWtzWlVGQlpUdGpRVVY0UWl4SFFVRlJPMkZCUTFJc1IwRkJUeXhMUVVGQkxFZEJRVkU3YVVKQlEyWXNSMEZCVnl4SlFVRkJMRU5CUVVzc1owSkJRVXdzUTBGQmMwSXNUVUZCVFRzN1dVRkhiRU03YlVKQlEwd3NVVUZFU3p0bFFVVk1MRWxCUmtzN1owSkJSMHdzUzBGSVN6dHRRa0ZKVEN4UlFVcExPM05DUVV0TUxGZEJURXM3WTBGTlRDeEhRVTVMTzI5Q1FVOU1PenM3ZVVKQlNVb3NkMEpCUVU4c1ZVRkJaVHM3TkVOQlFXWXNSMEZCVnpzN1UwRkRXaXhKUVVGQkxFTkJRVXM3VjBGQlVTeE5RVUZOTEVsQlFVa3NTMEZCU2l4RFFVRlZPMU5CUldwRExFTkJRVXNzVTBGQlRDeEhRVUZwUWl4TlFVRkJMRU5CUVU4c1RVRkJVQ3hEUVVGakxFbEJRVWtzVlVGQlZTeEpRVUZCTEVOQlFVczdhMEpCUld4RUxFTkJRV01zU1VGQlFTeERRVUZMTzJWQlIxTXNXVUZCUVN4RFFVRmhMRWxCUVVFc1EwRkJTenRUUVVGMFF6dFRRVUZUTzFOQlJWZ3NXVUZCV1N4SlFVRkJMRU5CUVVzc1dVRkJUQ3hEUVVGclFpeEpRVUZCTEVOQlFVczdVMEZIZWtNc1EwRkJTeXhOUVVGTUxFZEJRV01zYTBKQlExUXNVMEZFVXp0clFrRkZXaXhOUVVaWk8ydENRVWRhTEU5QlNGazdiMEpCU1VRc1EwRktRenRyUWtGTFNDeExRVXhITzI5Q1FVMUVMRXRCVGtNN2EwSkJUMGdzUzBGUVJ6dHZRa0ZSUkN4TFFWSkRPMjFDUVZOR0xFbEJRVUVzUTBGQlN5eFJRVlJJTzJWQlZVNHNTVUZCUVN4RFFVRkxMRkZCUVV3c1EwRkJZeXhKUVZaU096WkNRV0ZLTEZOQlFVMVFMRTFCUVVFc1EwRkJTeXhOUVVGTUxFdEJZa1k3YVVOQlkwRXNVMEZCVFVFc1RVRkJRU3hEUVVGTExGVkJRVXdzUzBGa1RqczJRa0ZsUkN4aFFVRlBRU3hOUVVGQkxFTkJRVXNzVVVGQlRDeERRVUZqTEUxQlpuQkNPekpDUVdkQ1RpeFRRVUZOUVN4TlFVRkJMRU5CUVVzc1NVRkJUQ3hMUVdoQ1FUczJRa0ZwUWtvc1UwRkJUVUVzVFVGQlFTeERRVUZMTEUxQlFVd3NTMEZxUWtZN01rSkJhMEpJTEdOQlFWRkJMRTFCUVVFc1EwRkJTeXhOUVVGTUxFTkJRVmtzVDBGc1FtcENPMmREUVcxQ1F5eGpRVUZQUVN4TlFVRkJMRU5CUVVzc1YwRkJUQ3hEUVVGcFFpeFBRVzVDZWtJN05rSkJiMEpLTEZOQlFVMUJMRTFCUVVFc1EwRkJTeXhOUVVGTUxFdEJjRUpHT3pKQ1FYRkNUaXhUUVVGTlFTeE5RVUZCTEVOQlFVc3NTVUZCVEN4TFFYSkNRVHMwUWtGelFrd3NVMEZCVFVFc1RVRkJRU3hEUVVGTExFdEJRVXdzUzBGMFFrUTdNa0pCZFVKT0xGTkJRVTFCTEUxQlFVRXNRMEZCU3l4SlFVRk1PMU5CU1dRc1EwRkJTeXhYUVVGTU8xTkJTVUVzUTBGQlN5eE5RVUZNT3p0NVFrRkhSaXhyUTBGQldTeFpRVUZqTEVWQlFVRXNZVUZCWVRzN08xbEJRemxDTEVsQlFVRXNRMEZCU3l4SlFVRk1MRU5CUVZVc1kwRkJZeXhaUVVGNFFpeERRVUZ4UXl4SlFVRnlReXhoUVVFd1F6dGxRVU12UXl4RFFVRkxMRWRCUVV3N1owSkJRMDlCT3pzN2VVSkJTVmdzTkVKQlFWVTdPenRUUVVOU0xFTkJRVXNzUzBGQlREdFRRVU5KTEVOQlFVTXNTVUZCUVN4RFFVRkxPMWRCUVZFN1UwRkRaQ3hQUVVGUExFbEJRVUVzUTBGQlN5eE5RVUZNTEVOQlFWa3NUVUZCYmtJc1MwRkJPRUlzV1VGQldUdGhRVU0xUXl4RFFVRkxMR2xDUVVGTUxGZEJRWFZDTEdkQ1FVRlRRU3hOUVVGQkxFTkJRVXNzVFVGQlRDeERRVUZaTEUxQlFWb3NRMEZCYlVJN08xTkJSWEpFTEVOQlFVc3NUMEZCVEN4SFFVRmxPenQ1UWtGSGFrSXNPRUpCUVZjN1UwRkRWQ3hEUVVGTExFMUJRVXc3VTBGRFFTeERRVUZMTEU5QlFVdzdPM2xDUVVkR0xITkNRVUZOTEZsQlFXTXNSVUZCUVN4aFFVRmhPenM3VTBGRk0wSXNUMEZCVHl4WlFVRlFMRXRCUVhkQ0xGbEJRVms3WlVGRGFFTXNTVUZCU1N4TFFVRktMRU5CUVZVN08xTkJSMlFzU1VGQlFTeERRVUZMTEZGQlFWRTdZVUZEWml4RFFVRkxMRTFCUVV3N08xTkJSMFVzVDBGQlR5eFhRVUZRTEV0QlFYVkNMR0ZCUVdFN1lVRkRkRU1zUTBGQlN5eE5RVUZNTEVOQlFWazdPMU5CVFdRc1EwRkJTeXhWUVVGTU8xTkJSVWtzVlVGQlZTeFBRVUZCTEVOQlFWRXNUMEZCVWp0VFFVbFdMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zU1VGQlNUdGhRVU5vUWl4RFFVRkRMRk5CUVVFc1NVRkJZVHR0UWtGRFZpeEpRVUZKTEV0QlFVb3NRMEZCVlRzN1owSkJSV3hDTEVkQlFWVXNTVUZCU1N4UFFVRktMRmRCUVZrN2FVSkJRMmhDTEdkQ1FVRm5Ra0VzVFVGQlFTeERRVUZMTEZGQlFVd3NRMEZCWXp0cFFrRkRPVUk3YVVKQlEwRXNZVUZCUVN4RFFVRmpMRWxCUVVrN2QwSkJRM0JDTEVkQlFWVXNZVUZCUVN4RFFVRmpPemhDUVVONFFpeEhRVUZuUWl4aFFVRkJMRU5CUVdNN08ybENRVWt4UWl4eFFrRkJWenR4UWtGRldEdDFRa0ZCVXl4RlFVRkJMRU5CUVVjc1QwRkJTQ3huUWtGQllTeFRRVUZOTEU5QlFVRXNRMEZCVVR0dFFrRkRlRU1zUTBGQlJ5eExRVUZJTEdkQ1FVRlhPM2xDUVVOSUxGRkJRVkZCTEUxQlFVRXNRMEZCU3p0NVFrRkRZaXhQUVVGUFFTeE5RVUZCTEVOQlFVc3NVVUZCVEN4RFFVRmpMRTlCUVdRc1MwRkJNRUk3ZVVKQlEycERMRmRCUVZjc1NVRkJRU3hIUVVGUExFVkJRVUVzUTBGQlJ5eFJRVUZSTEVWQlFVRXNRMEZCUnp0MVFrRkRkRU1zUTBGQlJ5eE5RVUZJTzNWQ1FVTkJMRU5CUVVjc1dVRkJTQ3hEUVVGblFpeExRVUZCTEVOQlFVMDdkVUpCUTNSQ0xFTkJRVWNzV1VGQlNDeERRVUZuUWl4TFFVRkJMRU5CUVUwc1pVRkJaU3hMUVVGQkxFTkJRVTBzWjBKQlFXZENPM2xDUVVOMlJDeEpRVUZCTEVsQlFWRkJMRTFCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zV1VGQldUc3lRa0ZEY0VNc1EwRkJSeXhoUVVGSUxFTkJRV2xDUVN4TlFVRkJMRU5CUVVzc1VVRkJUQ3hEUVVGak96c3lRa0ZIYWtNc1EwRkJTeXhOUVVGTUxFTkJRVms3TmtKQlFVVXNSVUZCUmp0cFEwRkJZeXhGUVVGQkxFTkJRVWNzVFVGQmFrSTdhME5CUVd0RExFVkJRVUVzUTBGQlJ5eFRRVUZJTEVOQlFXRTdPelJDUVVNelJEczdPMmxDUVV0QkxFOUJRVThzWVVGQlVDeExRVUY1UWl4WlFVRlpPM0ZDUVVOdVF5eGhRVUZLTEVOQlFXdENPMjlDUVVOaU8zRkNRVU5FTEU5QlFVOHNUVUZCUVN4RFFVRlBMRmxCUVdRc1MwRkJLMElzV1VGQldUc3lRa0ZEZGtNc1NVRkJTU3hMUVVGS0xFTkJRVlU3TzNsQ1FVVnNRaXhEUVVGVE96czdPMWxCUzFJc1QwRkJRU3hEUVVGUkxFbEJRVklzWVVGQllUdGhRVVZrTEZOQlFWTXNXVUZCUVN4RFFVRmhRU3hOUVVGQkxFTkJRVXM3WVVGRE0wSXNRMEZCUTFFc1YwRkJRU3hEUVVGVkxGTkJRVk03YlVKQlEzUkNMRWRCUVZNc1QwRkJRU3hEUVVGUkxFOUJRVklzUTBGQlowSTdPMmRDUVVWd1FqdFBRVTVHTEVOQlQwb3NTVUZRU1N4WFFVOURPMkZCUTBZc1EwRkJRenRsUVVGUkxFMUJRVUVzUjBGQlV6dGxRVU4wUWl4RFFVRkxMRTlCUVV3c1IwRkJaVHRoUVVkWUxGTkJRVUVzU1VGQllUdHRRa0ZEWml4RFFVRkxMR3RDUVVGTUxFTkJRWGRDTEUxQlFYaENPMjFDUVVOQkxFTkJRVThzWjBKQlFWQXNRMEZCZDBJc1ZVRkJWVklzVFVGQlFTeERRVUZMT3p0bFFVZDZReXhEUVVGTExGZEJRVXc3WlVGTlFTeERRVUZMTEZsQlFVdzdaMEpCUTA5Qk8wOUJlRUpHTEVOQmVVSktMRXRCZWtKSkxGZEJlVUpGTzJkQ1FVTlFMRU5CUVZFc1NVRkJVaXhEUVVGaExIbEdRVUZCTEVkQlFUUkdMRWRCUVVFc1EwRkJTVHRsUVVOMlJ6czdPenM3TzBORE16bENXa1VzU1VGQlRTeFJRVUZSTzBOQlEyUkJMRWxCUVUwc2IwSkJRVzlDTzBOQlJURkNMRk5CUVZNc1kwRkJaVHRMUVVOMFFrRXNTVUZCVFN4VFFVRlRMRmxCUVVFN1MwRkRaaXhQUVVGUExFMUJRVUVzU1VGQlZTeE5RVUZCTEVOQlFVODdPenREUVVjeFFpeFRRVUZUTEZOQlFWVXNTVUZCU1R0TFFVTnlRa0VzU1VGQlRTeFRRVUZUTEZsQlFVRTdTMEZEWml4SlFVRkpMRU5CUVVNN1YwRkJVU3hQUVVGUE8wdEJRM0JDTEUxQlFVRXNRMEZCVHl4TlFVRlFMRWRCUVdkQ0xFMUJRVUVzUTBGQlR5eE5RVUZRTEVsQlFXbENPMHRCUTJwRExFOUJRVThzVFVGQlFTeERRVUZQTEUxQlFWQXNRMEZCWXpzN08wTkJSM1pDTEZOQlFWTXNVMEZCVlN4RlFVRkpMRVZCUVVFc1RVRkJUVHRMUVVNelFrRXNTVUZCVFN4VFFVRlRMRmxCUVVFN1MwRkRaaXhKUVVGSkxFTkJRVU03VjBGQlVTeFBRVUZQTzB0QlEzQkNMRTFCUVVFc1EwRkJUeXhOUVVGUUxFZEJRV2RDTEUxQlFVRXNRMEZCVHl4TlFVRlFMRWxCUVdsQ08wdEJRMnBETEUxQlFVRXNRMEZCVHl4TlFVRlFMRU5CUVdNc1IwRkJaQ3hIUVVGdlFqczdPME5CUjNSQ0xGTkJRVk1zV1VGQllTeFZRVUZaTEVWQlFVRXNZVUZCWVR0TFFVVTNReXhQUVVGUExGZEJRVUVzUTBGQldTeFBRVUZhTEVkQlFYTkNPMU5CUVVVc1RVRkJUU3hWUVVGQkxFTkJRVmNzUzBGQldDeERRVUZwUWp0VFFVRlRPenM3UTBGSGFrVXNVMEZCVXl4aFFVRmpMRTFCUVZFc1JVRkJRU3hWUVVGbE8zZERRVUZtTEVkQlFWYzdPMHRCUTNoRExFbEJRVWtzVVVGQlFTeERRVUZUTEVsQlFVazdVMEZEWml4SlFVRkpMRkZCUVVFc1EwRkJVeXhOUVVGVUxFbEJRVzlDTEZGQlFVRXNRMEZCVXl4UFFVRlVMRWxCUVc5Q0xFOUJRVThzVVVGQlFTeERRVUZUTEU5QlFXaENMRXRCUVRSQ0xGVkJRVmM3WVVGRGFrWXNUVUZCVFN4SlFVRkpMRXRCUVVvc1EwRkJWVHM3VTBGSmJFSkJMRWxCUVUwc1ZVRkJWU3hQUVVGUExGRkJRVUVzUTBGQlV5eFBRVUZvUWl4TFFVRTBRaXhSUVVFMVFpeEhRVUYxUXl4UlFVRkJMRU5CUVZNc1ZVRkJWVHRUUVVNeFJTeFJRVUZCTEVkQlFWY3NUVUZCUVN4RFFVRlBMRTFCUVZBc1EwRkJZeXhKUVVGSkxGVkJRVlU3WVVGQlJTeFJRVUZSTEV0QlFWWTdjMEpCUVdsQ096czdTMEZITVVSQkxFbEJRVTBzVVVGQlVTeFhRVUZCTzB0QlEyUlNMRWxCUVVrN1MwRkRTaXhKUVVGSkxFOUJRVTg3VTBGSlZDeExRVUZCTEVkQlFWRXNUMEZCUVN4RFFVRlJMRkZCUVVFc1EwRkJVeXhKUVVGSk96dExRVVV2UWtFc1NVRkJTU3hqUVVGakxFdEJRVUVzU1VGQlV5eFBRVUZQTEV0QlFWQXNTMEZCYVVJN1MwRkZOVU1zU1VGQlNTeFhRVUZCTEVsQlFXVXNhVUpCUVVFc1EwRkJhMElzVVVGQmJFSXNRMEZCTWtJc1VVRkJVVHRUUVVOd1JDeFBRVUZCTEVOQlFWRXNTVUZCVWl4RFFVRmhMSEZMUVVGeFN6dFRRVU5zVEN4WFFVRkJMRWRCUVdNN08wdEJSMmhDUVN4SlFVRkpMRlZCUVZVc1QwRkJRU3hEUVVGUkxFOUJRVkk3UzBGRlpDeEpRVUZKTEdGQlFXRTdVMEZGWml4cFFrRkJRU3hEUVVGclFpeEpRVUZzUWl4RFFVRjFRanRUUVVWMlFsRXNTVUZCVFN4bFFVRmxMRkZCUVVFc1EwRkJVenRUUVVNNVFpeEpRVUZKTEdOQlFXTTdZVUZEYUVKQkxFbEJRVTBzYlVKQlFVODdhVUpCUlZoQkxFbEJRVTBzVjBGQlZ5eFhRVUZCTEVOQlFWa3NXVUZCUVN4RFFVRmhMRk5CUVZNN2FVSkJSVzVFTEZsQlFVRXNRMEZCWVN4UFFVRmlMRU5CUVhGQ0xFOUJRWEpDTzJsQ1FVVkJMRTlCUVU4N08yRkJTVlFzVDBGQlFTeEhRVUZWTEZsQlFVRXNRMEZCWVN4SlFVRmlMRU5CUVd0Q0xFbEJRV3hDTEVOQlFYVkNMRXRCUVhaQ0xFTkJRVFpDTEV0QlFUZENMRU5CUVcxRE96czdTMEZKYWtRc1QwRkJUeXhQUVVGQkxFTkJRVkVzU1VGQlVpeFhRVUZoTzFOQlEyeENRU3hKUVVGTkxGVkJRVlVzU1VGQlNTeGhRVUZLTzFOQlEyaENVaXhKUVVGSk8xTkJRMG9zU1VGQlNTeFJRVUZSTzJGQlJWWXNVVUZCUVN4SFFVRlhMRTFCUVVFc1EwRkJUeXhOUVVGUUxFTkJRV01zU1VGQlNTeFZRVUZWTzJGQlIzWkRMRTlCUVVFc1EwRkJVU3hMUVVGU0xFTkJRV003WVVGSFpDeFBRVUZCTEVOQlFWRXNTMEZCVWp0aFFVZEJMRTFCUVVFc1IwRkJVeXhQUVVGQkxFTkJRVkVzVlVGQlVpeERRVUZ0UWp0blFrRkRka0k3WVVGRFRDeE5RVUZCTEVkQlFWTXNUMEZCUVN4RFFVRlJMRTlCUVZJc1EwRkJaMEk3TzFOQlJUTkNMRWxCUVVrc1lVRkJZVHRoUVVObUxGRkJRVUVzUTBGQlV5eFBRVUZQTzJsQ1FVRkZMRTFCUVUwc1RVRkJVanN3UWtGQlowSTdPenRUUVVWc1F5eFBRVUZQT3pzN08wTkJTMWdzV1VGQlFTeERRVUZoTEZsQlFXSXNSMEZCTkVJN1EwRkROVUlzV1VGQlFTeERRVUZoTEZWQlFXSXNSMEZCTUVKblFqczdPenM3T3pzN0luMD1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbaV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGFyZ3VtZW50c1tpXTtcbiAgICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHdpZHRoID0gMjU2Oy8vIGVhY2ggUkM0IG91dHB1dCBpcyAwIDw9IHggPCAyNTZcclxudmFyIGNodW5rcyA9IDY7Ly8gYXQgbGVhc3Qgc2l4IFJDNCBvdXRwdXRzIGZvciBlYWNoIGRvdWJsZVxyXG52YXIgZGlnaXRzID0gNTI7Ly8gdGhlcmUgYXJlIDUyIHNpZ25pZmljYW50IGRpZ2l0cyBpbiBhIGRvdWJsZVxyXG52YXIgcG9vbCA9IFtdOy8vIHBvb2w6IGVudHJvcHkgcG9vbCBzdGFydHMgZW1wdHlcclxudmFyIEdMT0JBTCA9IHR5cGVvZiBnbG9iYWwgPT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xyXG5cclxuLy9cclxuLy8gVGhlIGZvbGxvd2luZyBjb25zdGFudHMgYXJlIHJlbGF0ZWQgdG8gSUVFRSA3NTQgbGltaXRzLlxyXG4vL1xyXG52YXIgc3RhcnRkZW5vbSA9IE1hdGgucG93KHdpZHRoLCBjaHVua3MpLFxyXG4gICAgc2lnbmlmaWNhbmNlID0gTWF0aC5wb3coMiwgZGlnaXRzKSxcclxuICAgIG92ZXJmbG93ID0gc2lnbmlmaWNhbmNlICogMixcclxuICAgIG1hc2sgPSB3aWR0aCAtIDE7XHJcblxyXG5cclxudmFyIG9sZFJhbmRvbSA9IE1hdGgucmFuZG9tO1xyXG5cclxuLy9cclxuLy8gc2VlZHJhbmRvbSgpXHJcbi8vIFRoaXMgaXMgdGhlIHNlZWRyYW5kb20gZnVuY3Rpb24gZGVzY3JpYmVkIGFib3ZlLlxyXG4vL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNlZWQsIG9wdGlvbnMpIHtcclxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdsb2JhbCA9PT0gdHJ1ZSkge1xyXG4gICAgb3B0aW9ucy5nbG9iYWwgPSBmYWxzZTtcclxuICAgIE1hdGgucmFuZG9tID0gbW9kdWxlLmV4cG9ydHMoc2VlZCwgb3B0aW9ucyk7XHJcbiAgICBvcHRpb25zLmdsb2JhbCA9IHRydWU7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb207XHJcbiAgfVxyXG4gIHZhciB1c2VfZW50cm9weSA9IChvcHRpb25zICYmIG9wdGlvbnMuZW50cm9weSkgfHwgZmFsc2U7XHJcbiAgdmFyIGtleSA9IFtdO1xyXG5cclxuICAvLyBGbGF0dGVuIHRoZSBzZWVkIHN0cmluZyBvciBidWlsZCBvbmUgZnJvbSBsb2NhbCBlbnRyb3B5IGlmIG5lZWRlZC5cclxuICB2YXIgc2hvcnRzZWVkID0gbWl4a2V5KGZsYXR0ZW4oXHJcbiAgICB1c2VfZW50cm9weSA/IFtzZWVkLCB0b3N0cmluZyhwb29sKV0gOlxyXG4gICAgMCBpbiBhcmd1bWVudHMgPyBzZWVkIDogYXV0b3NlZWQoKSwgMyksIGtleSk7XHJcblxyXG4gIC8vIFVzZSB0aGUgc2VlZCB0byBpbml0aWFsaXplIGFuIEFSQzQgZ2VuZXJhdG9yLlxyXG4gIHZhciBhcmM0ID0gbmV3IEFSQzQoa2V5KTtcclxuXHJcbiAgLy8gTWl4IHRoZSByYW5kb21uZXNzIGludG8gYWNjdW11bGF0ZWQgZW50cm9weS5cclxuICBtaXhrZXkodG9zdHJpbmcoYXJjNC5TKSwgcG9vbCk7XHJcblxyXG4gIC8vIE92ZXJyaWRlIE1hdGgucmFuZG9tXHJcblxyXG4gIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIHJhbmRvbSBkb3VibGUgaW4gWzAsIDEpIHRoYXQgY29udGFpbnNcclxuICAvLyByYW5kb21uZXNzIGluIGV2ZXJ5IGJpdCBvZiB0aGUgbWFudGlzc2Egb2YgdGhlIElFRUUgNzU0IHZhbHVlLlxyXG5cclxuICByZXR1cm4gZnVuY3Rpb24oKSB7ICAgICAgICAgLy8gQ2xvc3VyZSB0byByZXR1cm4gYSByYW5kb20gZG91YmxlOlxyXG4gICAgdmFyIG4gPSBhcmM0LmcoY2h1bmtzKSwgICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG51bWVyYXRvciBuIDwgMiBeIDQ4XHJcbiAgICAgICAgZCA9IHN0YXJ0ZGVub20sICAgICAgICAgICAgICAgICAvLyAgIGFuZCBkZW5vbWluYXRvciBkID0gMiBeIDQ4LlxyXG4gICAgICAgIHggPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBhbmQgbm8gJ2V4dHJhIGxhc3QgYnl0ZScuXHJcbiAgICB3aGlsZSAobiA8IHNpZ25pZmljYW5jZSkgeyAgICAgICAgICAvLyBGaWxsIHVwIGFsbCBzaWduaWZpY2FudCBkaWdpdHMgYnlcclxuICAgICAgbiA9IChuICsgeCkgKiB3aWR0aDsgICAgICAgICAgICAgIC8vICAgc2hpZnRpbmcgbnVtZXJhdG9yIGFuZFxyXG4gICAgICBkICo9IHdpZHRoOyAgICAgICAgICAgICAgICAgICAgICAgLy8gICBkZW5vbWluYXRvciBhbmQgZ2VuZXJhdGluZyBhXHJcbiAgICAgIHggPSBhcmM0LmcoMSk7ICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBsZWFzdC1zaWduaWZpY2FudC1ieXRlLlxyXG4gICAgfVxyXG4gICAgd2hpbGUgKG4gPj0gb3ZlcmZsb3cpIHsgICAgICAgICAgICAgLy8gVG8gYXZvaWQgcm91bmRpbmcgdXAsIGJlZm9yZSBhZGRpbmdcclxuICAgICAgbiAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFzdCBieXRlLCBzaGlmdCBldmVyeXRoaW5nXHJcbiAgICAgIGQgLz0gMjsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHJpZ2h0IHVzaW5nIGludGVnZXIgTWF0aCB1bnRpbFxyXG4gICAgICB4ID4+Pj0gMTsgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICB3ZSBoYXZlIGV4YWN0bHkgdGhlIGRlc2lyZWQgYml0cy5cclxuICAgIH1cclxuICAgIHJldHVybiAobiArIHgpIC8gZDsgICAgICAgICAgICAgICAgIC8vIEZvcm0gdGhlIG51bWJlciB3aXRoaW4gWzAsIDEpLlxyXG4gIH07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5yZXNldEdsb2JhbCA9IGZ1bmN0aW9uICgpIHtcclxuICBNYXRoLnJhbmRvbSA9IG9sZFJhbmRvbTtcclxufTtcclxuXHJcbi8vXHJcbi8vIEFSQzRcclxuLy9cclxuLy8gQW4gQVJDNCBpbXBsZW1lbnRhdGlvbi4gIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBhIGtleSBpbiB0aGUgZm9ybSBvZlxyXG4vLyBhbiBhcnJheSBvZiBhdCBtb3N0ICh3aWR0aCkgaW50ZWdlcnMgdGhhdCBzaG91bGQgYmUgMCA8PSB4IDwgKHdpZHRoKS5cclxuLy9cclxuLy8gVGhlIGcoY291bnQpIG1ldGhvZCByZXR1cm5zIGEgcHNldWRvcmFuZG9tIGludGVnZXIgdGhhdCBjb25jYXRlbmF0ZXNcclxuLy8gdGhlIG5leHQgKGNvdW50KSBvdXRwdXRzIGZyb20gQVJDNC4gIEl0cyByZXR1cm4gdmFsdWUgaXMgYSBudW1iZXIgeFxyXG4vLyB0aGF0IGlzIGluIHRoZSByYW5nZSAwIDw9IHggPCAod2lkdGggXiBjb3VudCkuXHJcbi8vXHJcbi8qKiBAY29uc3RydWN0b3IgKi9cclxuZnVuY3Rpb24gQVJDNChrZXkpIHtcclxuICB2YXIgdCwga2V5bGVuID0ga2V5Lmxlbmd0aCxcclxuICAgICAgbWUgPSB0aGlzLCBpID0gMCwgaiA9IG1lLmkgPSBtZS5qID0gMCwgcyA9IG1lLlMgPSBbXTtcclxuXHJcbiAgLy8gVGhlIGVtcHR5IGtleSBbXSBpcyB0cmVhdGVkIGFzIFswXS5cclxuICBpZiAoIWtleWxlbikgeyBrZXkgPSBba2V5bGVuKytdOyB9XHJcblxyXG4gIC8vIFNldCB1cCBTIHVzaW5nIHRoZSBzdGFuZGFyZCBrZXkgc2NoZWR1bGluZyBhbGdvcml0aG0uXHJcbiAgd2hpbGUgKGkgPCB3aWR0aCkge1xyXG4gICAgc1tpXSA9IGkrKztcclxuICB9XHJcbiAgZm9yIChpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcclxuICAgIHNbaV0gPSBzW2ogPSBtYXNrICYgKGogKyBrZXlbaSAlIGtleWxlbl0gKyAodCA9IHNbaV0pKV07XHJcbiAgICBzW2pdID0gdDtcclxuICB9XHJcblxyXG4gIC8vIFRoZSBcImdcIiBtZXRob2QgcmV0dXJucyB0aGUgbmV4dCAoY291bnQpIG91dHB1dHMgYXMgb25lIG51bWJlci5cclxuICAobWUuZyA9IGZ1bmN0aW9uKGNvdW50KSB7XHJcbiAgICAvLyBVc2luZyBpbnN0YW5jZSBtZW1iZXJzIGluc3RlYWQgb2YgY2xvc3VyZSBzdGF0ZSBuZWFybHkgZG91YmxlcyBzcGVlZC5cclxuICAgIHZhciB0LCByID0gMCxcclxuICAgICAgICBpID0gbWUuaSwgaiA9IG1lLmosIHMgPSBtZS5TO1xyXG4gICAgd2hpbGUgKGNvdW50LS0pIHtcclxuICAgICAgdCA9IHNbaSA9IG1hc2sgJiAoaSArIDEpXTtcclxuICAgICAgciA9IHIgKiB3aWR0aCArIHNbbWFzayAmICgoc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIHQpXSkgKyAoc1tqXSA9IHQpKV07XHJcbiAgICB9XHJcbiAgICBtZS5pID0gaTsgbWUuaiA9IGo7XHJcbiAgICByZXR1cm4gcjtcclxuICAgIC8vIEZvciByb2J1c3QgdW5wcmVkaWN0YWJpbGl0eSBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgdmFsdWVzLlxyXG4gICAgLy8gU2VlIGh0dHA6Ly93d3cucnNhLmNvbS9yc2FsYWJzL25vZGUuYXNwP2lkPTIwMDlcclxuICB9KSh3aWR0aCk7XHJcbn1cclxuXHJcbi8vXHJcbi8vIGZsYXR0ZW4oKVxyXG4vLyBDb252ZXJ0cyBhbiBvYmplY3QgdHJlZSB0byBuZXN0ZWQgYXJyYXlzIG9mIHN0cmluZ3MuXHJcbi8vXHJcbmZ1bmN0aW9uIGZsYXR0ZW4ob2JqLCBkZXB0aCkge1xyXG4gIHZhciByZXN1bHQgPSBbXSwgdHlwID0gKHR5cGVvZiBvYmopWzBdLCBwcm9wO1xyXG4gIGlmIChkZXB0aCAmJiB0eXAgPT0gJ28nKSB7XHJcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XHJcbiAgICAgIHRyeSB7IHJlc3VsdC5wdXNoKGZsYXR0ZW4ob2JqW3Byb3BdLCBkZXB0aCAtIDEpKTsgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIChyZXN1bHQubGVuZ3RoID8gcmVzdWx0IDogdHlwID09ICdzJyA/IG9iaiA6IG9iaiArICdcXDAnKTtcclxufVxyXG5cclxuLy9cclxuLy8gbWl4a2V5KClcclxuLy8gTWl4ZXMgYSBzdHJpbmcgc2VlZCBpbnRvIGEga2V5IHRoYXQgaXMgYW4gYXJyYXkgb2YgaW50ZWdlcnMsIGFuZFxyXG4vLyByZXR1cm5zIGEgc2hvcnRlbmVkIHN0cmluZyBzZWVkIHRoYXQgaXMgZXF1aXZhbGVudCB0byB0aGUgcmVzdWx0IGtleS5cclxuLy9cclxuZnVuY3Rpb24gbWl4a2V5KHNlZWQsIGtleSkge1xyXG4gIHZhciBzdHJpbmdzZWVkID0gc2VlZCArICcnLCBzbWVhciwgaiA9IDA7XHJcbiAgd2hpbGUgKGogPCBzdHJpbmdzZWVkLmxlbmd0aCkge1xyXG4gICAga2V5W21hc2sgJiBqXSA9XHJcbiAgICAgIG1hc2sgJiAoKHNtZWFyIF49IGtleVttYXNrICYgal0gKiAxOSkgKyBzdHJpbmdzZWVkLmNoYXJDb2RlQXQoaisrKSk7XHJcbiAgfVxyXG4gIHJldHVybiB0b3N0cmluZyhrZXkpO1xyXG59XHJcblxyXG4vL1xyXG4vLyBhdXRvc2VlZCgpXHJcbi8vIFJldHVybnMgYW4gb2JqZWN0IGZvciBhdXRvc2VlZGluZywgdXNpbmcgd2luZG93LmNyeXB0byBpZiBhdmFpbGFibGUuXHJcbi8vXHJcbi8qKiBAcGFyYW0ge1VpbnQ4QXJyYXk9fSBzZWVkICovXHJcbmZ1bmN0aW9uIGF1dG9zZWVkKHNlZWQpIHtcclxuICB0cnkge1xyXG4gICAgR0xPQkFMLmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoc2VlZCA9IG5ldyBVaW50OEFycmF5KHdpZHRoKSk7XHJcbiAgICByZXR1cm4gdG9zdHJpbmcoc2VlZCk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIFsrbmV3IERhdGUsIEdMT0JBTCwgR0xPQkFMLm5hdmlnYXRvciAmJiBHTE9CQUwubmF2aWdhdG9yLnBsdWdpbnMsXHJcbiAgICAgICAgICAgIEdMT0JBTC5zY3JlZW4sIHRvc3RyaW5nKHBvb2wpXTtcclxuICB9XHJcbn1cclxuXHJcbi8vXHJcbi8vIHRvc3RyaW5nKClcclxuLy8gQ29udmVydHMgYW4gYXJyYXkgb2YgY2hhcmNvZGVzIHRvIGEgc3RyaW5nXHJcbi8vXHJcbmZ1bmN0aW9uIHRvc3RyaW5nKGEpIHtcclxuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseSgwLCBhKTtcclxufVxyXG5cclxuLy9cclxuLy8gV2hlbiBzZWVkcmFuZG9tLmpzIGlzIGxvYWRlZCwgd2UgaW1tZWRpYXRlbHkgbWl4IGEgZmV3IGJpdHNcclxuLy8gZnJvbSB0aGUgYnVpbHQtaW4gUk5HIGludG8gdGhlIGVudHJvcHkgcG9vbC4gIEJlY2F1c2Ugd2UgZG9cclxuLy8gbm90IHdhbnQgdG8gaW50ZWZlcmUgd2l0aCBkZXRlcm1pbnN0aWMgUFJORyBzdGF0ZSBsYXRlcixcclxuLy8gc2VlZHJhbmRvbSB3aWxsIG5vdCBjYWxsIE1hdGgucmFuZG9tIG9uIGl0cyBvd24gYWdhaW4gYWZ0ZXJcclxuLy8gaW5pdGlhbGl6YXRpb24uXHJcbi8vXHJcbm1peGtleShNYXRoLnJhbmRvbSgpLCBwb29sKTtcclxuIiwiLypcbiAqIEEgZmFzdCBqYXZhc2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHNpbXBsZXggbm9pc2UgYnkgSm9uYXMgV2FnbmVyXG5cbkJhc2VkIG9uIGEgc3BlZWQtaW1wcm92ZWQgc2ltcGxleCBub2lzZSBhbGdvcml0aG0gZm9yIDJELCAzRCBhbmQgNEQgaW4gSmF2YS5cbldoaWNoIGlzIGJhc2VkIG9uIGV4YW1wbGUgY29kZSBieSBTdGVmYW4gR3VzdGF2c29uIChzdGVndUBpdG4ubGl1LnNlKS5cbldpdGggT3B0aW1pc2F0aW9ucyBieSBQZXRlciBFYXN0bWFuIChwZWFzdG1hbkBkcml6emxlLnN0YW5mb3JkLmVkdSkuXG5CZXR0ZXIgcmFuayBvcmRlcmluZyBtZXRob2QgYnkgU3RlZmFuIEd1c3RhdnNvbiBpbiAyMDEyLlxuXG5cbiBDb3B5cmlnaHQgKGMpIDIwMTggSm9uYXMgV2FnbmVyXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiBTT0ZUV0FSRS5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEYyID0gMC41ICogKE1hdGguc3FydCgzLjApIC0gMS4wKTtcbiAgdmFyIEcyID0gKDMuMCAtIE1hdGguc3FydCgzLjApKSAvIDYuMDtcbiAgdmFyIEYzID0gMS4wIC8gMy4wO1xuICB2YXIgRzMgPSAxLjAgLyA2LjA7XG4gIHZhciBGNCA9IChNYXRoLnNxcnQoNS4wKSAtIDEuMCkgLyA0LjA7XG4gIHZhciBHNCA9ICg1LjAgLSBNYXRoLnNxcnQoNS4wKSkgLyAyMC4wO1xuXG4gIGZ1bmN0aW9uIFNpbXBsZXhOb2lzZShyYW5kb21PclNlZWQpIHtcbiAgICB2YXIgcmFuZG9tO1xuICAgIGlmICh0eXBlb2YgcmFuZG9tT3JTZWVkID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJhbmRvbSA9IHJhbmRvbU9yU2VlZDtcbiAgICB9XG4gICAgZWxzZSBpZiAocmFuZG9tT3JTZWVkKSB7XG4gICAgICByYW5kb20gPSBhbGVhKHJhbmRvbU9yU2VlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmRvbSA9IE1hdGgucmFuZG9tO1xuICAgIH1cbiAgICB0aGlzLnAgPSBidWlsZFBlcm11dGF0aW9uVGFibGUocmFuZG9tKTtcbiAgICB0aGlzLnBlcm0gPSBuZXcgVWludDhBcnJheSg1MTIpO1xuICAgIHRoaXMucGVybU1vZDEyID0gbmV3IFVpbnQ4QXJyYXkoNTEyKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDUxMjsgaSsrKSB7XG4gICAgICB0aGlzLnBlcm1baV0gPSB0aGlzLnBbaSAmIDI1NV07XG4gICAgICB0aGlzLnBlcm1Nb2QxMltpXSA9IHRoaXMucGVybVtpXSAlIDEyO1xuICAgIH1cblxuICB9XG4gIFNpbXBsZXhOb2lzZS5wcm90b3R5cGUgPSB7XG4gICAgZ3JhZDM6IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDEsIDAsXG4gICAgICAtMSwgMSwgMCxcbiAgICAgIDEsIC0xLCAwLFxuXG4gICAgICAtMSwgLTEsIDAsXG4gICAgICAxLCAwLCAxLFxuICAgICAgLTEsIDAsIDEsXG5cbiAgICAgIDEsIDAsIC0xLFxuICAgICAgLTEsIDAsIC0xLFxuICAgICAgMCwgMSwgMSxcblxuICAgICAgMCwgLTEsIDEsXG4gICAgICAwLCAxLCAtMSxcbiAgICAgIDAsIC0xLCAtMV0pLFxuICAgIGdyYWQ0OiBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAxLCAxLCAwLCAxLCAxLCAtMSwgMCwgMSwgLTEsIDEsIDAsIDEsIC0xLCAtMSxcbiAgICAgIDAsIC0xLCAxLCAxLCAwLCAtMSwgMSwgLTEsIDAsIC0xLCAtMSwgMSwgMCwgLTEsIC0xLCAtMSxcbiAgICAgIDEsIDAsIDEsIDEsIDEsIDAsIDEsIC0xLCAxLCAwLCAtMSwgMSwgMSwgMCwgLTEsIC0xLFxuICAgICAgLTEsIDAsIDEsIDEsIC0xLCAwLCAxLCAtMSwgLTEsIDAsIC0xLCAxLCAtMSwgMCwgLTEsIC0xLFxuICAgICAgMSwgMSwgMCwgMSwgMSwgMSwgMCwgLTEsIDEsIC0xLCAwLCAxLCAxLCAtMSwgMCwgLTEsXG4gICAgICAtMSwgMSwgMCwgMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsIDAsIDEsIC0xLCAtMSwgMCwgLTEsXG4gICAgICAxLCAxLCAxLCAwLCAxLCAxLCAtMSwgMCwgMSwgLTEsIDEsIDAsIDEsIC0xLCAtMSwgMCxcbiAgICAgIC0xLCAxLCAxLCAwLCAtMSwgMSwgLTEsIDAsIC0xLCAtMSwgMSwgMCwgLTEsIC0xLCAtMSwgMF0pLFxuICAgIG5vaXNlMkQ6IGZ1bmN0aW9uKHhpbiwgeWluKSB7XG4gICAgICB2YXIgcGVybU1vZDEyID0gdGhpcy5wZXJtTW9kMTI7XG4gICAgICB2YXIgcGVybSA9IHRoaXMucGVybTtcbiAgICAgIHZhciBncmFkMyA9IHRoaXMuZ3JhZDM7XG4gICAgICB2YXIgbjAgPSAwOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgIHZhciBuMSA9IDA7XG4gICAgICB2YXIgbjIgPSAwO1xuICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgdmFyIHMgPSAoeGluICsgeWluKSAqIEYyOyAvLyBIYWlyeSBmYWN0b3IgZm9yIDJEXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XG4gICAgICB2YXIgdCA9IChpICsgaikgKiBHMjtcbiAgICAgIHZhciBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSkgc3BhY2VcbiAgICAgIHZhciBZMCA9IGogLSB0O1xuICAgICAgdmFyIHgwID0geGluIC0gWDA7IC8vIFRoZSB4LHkgZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG4gICAgICB2YXIgeTAgPSB5aW4gLSBZMDtcbiAgICAgIC8vIEZvciB0aGUgMkQgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYW4gZXF1aWxhdGVyYWwgdHJpYW5nbGUuXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG4gICAgICB2YXIgaTEsIGoxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgKG1pZGRsZSkgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaikgY29vcmRzXG4gICAgICBpZiAoeDAgPiB5MCkge1xuICAgICAgICBpMSA9IDE7XG4gICAgICAgIGoxID0gMDtcbiAgICAgIH0gLy8gbG93ZXIgdHJpYW5nbGUsIFhZIG9yZGVyOiAoMCwwKS0+KDEsMCktPigxLDEpXG4gICAgICBlbHNlIHtcbiAgICAgICAgaTEgPSAwO1xuICAgICAgICBqMSA9IDE7XG4gICAgICB9IC8vIHVwcGVyIHRyaWFuZ2xlLCBZWCBvcmRlcjogKDAsMCktPigwLDEpLT4oMSwxKVxuICAgICAgLy8gQSBzdGVwIG9mICgxLDApIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jKSBpbiAoeCx5KSwgYW5kXG4gICAgICAvLyBhIHN0ZXAgb2YgKDAsMSkgaW4gKGksaikgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMpIGluICh4LHkpLCB3aGVyZVxuICAgICAgLy8gYyA9ICgzLXNxcnQoMykpLzZcbiAgICAgIHZhciB4MSA9IHgwIC0gaTEgKyBHMjsgLy8gT2Zmc2V0cyBmb3IgbWlkZGxlIGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgIHZhciB5MSA9IHkwIC0gajEgKyBHMjtcbiAgICAgIHZhciB4MiA9IHgwIC0gMS4wICsgMi4wICogRzI7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkpIHVuc2tld2VkIGNvb3Jkc1xuICAgICAgdmFyIHkyID0geTAgLSAxLjAgKyAyLjAgKiBHMjtcbiAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgdGhyZWUgc2ltcGxleCBjb3JuZXJzXG4gICAgICB2YXIgaWkgPSBpICYgMjU1O1xuICAgICAgdmFyIGpqID0gaiAmIDI1NTtcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIHRocmVlIGNvcm5lcnNcbiAgICAgIHZhciB0MCA9IDAuNSAtIHgwICogeDAgLSB5MCAqIHkwO1xuICAgICAgaWYgKHQwID49IDApIHtcbiAgICAgICAgdmFyIGdpMCA9IHBlcm1Nb2QxMltpaSArIHBlcm1bampdXSAqIDM7XG4gICAgICAgIHQwICo9IHQwO1xuICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZDNbZ2kwXSAqIHgwICsgZ3JhZDNbZ2kwICsgMV0gKiB5MCk7IC8vICh4LHkpIG9mIGdyYWQzIHVzZWQgZm9yIDJEIGdyYWRpZW50XG4gICAgICB9XG4gICAgICB2YXIgdDEgPSAwLjUgLSB4MSAqIHgxIC0geTEgKiB5MTtcbiAgICAgIGlmICh0MSA+PSAwKSB7XG4gICAgICAgIHZhciBnaTEgPSBwZXJtTW9kMTJbaWkgKyBpMSArIHBlcm1bamogKyBqMV1dICogMztcbiAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgIG4xID0gdDEgKiB0MSAqIChncmFkM1tnaTFdICogeDEgKyBncmFkM1tnaTEgKyAxXSAqIHkxKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MiA9IDAuNSAtIHgyICogeDIgLSB5MiAqIHkyO1xuICAgICAgaWYgKHQyID49IDApIHtcbiAgICAgICAgdmFyIGdpMiA9IHBlcm1Nb2QxMltpaSArIDEgKyBwZXJtW2pqICsgMV1dICogMztcbiAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgIG4yID0gdDIgKiB0MiAqIChncmFkM1tnaTJdICogeDIgKyBncmFkM1tnaTIgKyAxXSAqIHkyKTtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cbiAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHJldHVybiB2YWx1ZXMgaW4gdGhlIGludGVydmFsIFstMSwxXS5cbiAgICAgIHJldHVybiA3MC4wICogKG4wICsgbjEgKyBuMik7XG4gICAgfSxcbiAgICAvLyAzRCBzaW1wbGV4IG5vaXNlXG4gICAgbm9pc2UzRDogZnVuY3Rpb24oeGluLCB5aW4sIHppbikge1xuICAgICAgdmFyIHBlcm1Nb2QxMiA9IHRoaXMucGVybU1vZDEyO1xuICAgICAgdmFyIHBlcm0gPSB0aGlzLnBlcm07XG4gICAgICB2YXIgZ3JhZDMgPSB0aGlzLmdyYWQzO1xuICAgICAgdmFyIG4wLCBuMSwgbjIsIG4zOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZvdXIgY29ybmVyc1xuICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxuICAgICAgdmFyIHMgPSAoeGluICsgeWluICsgemluKSAqIEYzOyAvLyBWZXJ5IG5pY2UgYW5kIHNpbXBsZSBza2V3IGZhY3RvciBmb3IgM0RcbiAgICAgIHZhciBpID0gTWF0aC5mbG9vcih4aW4gKyBzKTtcbiAgICAgIHZhciBqID0gTWF0aC5mbG9vcih5aW4gKyBzKTtcbiAgICAgIHZhciBrID0gTWF0aC5mbG9vcih6aW4gKyBzKTtcbiAgICAgIHZhciB0ID0gKGkgKyBqICsgaykgKiBHMztcbiAgICAgIHZhciBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSx6KSBzcGFjZVxuICAgICAgdmFyIFkwID0gaiAtIHQ7XG4gICAgICB2YXIgWjAgPSBrIC0gdDtcbiAgICAgIHZhciB4MCA9IHhpbiAtIFgwOyAvLyBUaGUgeCx5LHogZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG4gICAgICB2YXIgeTAgPSB5aW4gLSBZMDtcbiAgICAgIHZhciB6MCA9IHppbiAtIFowO1xuICAgICAgLy8gRm9yIHRoZSAzRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhIHNsaWdodGx5IGlycmVndWxhciB0ZXRyYWhlZHJvbi5cbiAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cbiAgICAgIHZhciBpMSwgajEsIGsxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcbiAgICAgIHZhciBpMiwgajIsIGsyOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xuICAgICAgaWYgKHgwID49IHkwKSB7XG4gICAgICAgIGlmICh5MCA+PSB6MCkge1xuICAgICAgICAgIGkxID0gMTtcbiAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgazEgPSAwO1xuICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICBqMiA9IDE7XG4gICAgICAgICAgazIgPSAwO1xuICAgICAgICB9IC8vIFggWSBaIG9yZGVyXG4gICAgICAgIGVsc2UgaWYgKHgwID49IHowKSB7XG4gICAgICAgICAgaTEgPSAxO1xuICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgIGoyID0gMDtcbiAgICAgICAgICBrMiA9IDE7XG4gICAgICAgIH0gLy8gWCBaIFkgb3JkZXJcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgIGoxID0gMDtcbiAgICAgICAgICBrMSA9IDE7XG4gICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgIGoyID0gMDtcbiAgICAgICAgICBrMiA9IDE7XG4gICAgICAgIH0gLy8gWiBYIFkgb3JkZXJcbiAgICAgIH1cbiAgICAgIGVsc2UgeyAvLyB4MDx5MFxuICAgICAgICBpZiAoeTAgPCB6MCkge1xuICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgazEgPSAxO1xuICAgICAgICAgIGkyID0gMDtcbiAgICAgICAgICBqMiA9IDE7XG4gICAgICAgICAgazIgPSAxO1xuICAgICAgICB9IC8vIFogWSBYIG9yZGVyXG4gICAgICAgIGVsc2UgaWYgKHgwIDwgejApIHtcbiAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgajEgPSAxO1xuICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICBpMiA9IDA7XG4gICAgICAgICAgajIgPSAxO1xuICAgICAgICAgIGsyID0gMTtcbiAgICAgICAgfSAvLyBZIFogWCBvcmRlclxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgajEgPSAxO1xuICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgajIgPSAxO1xuICAgICAgICAgIGsyID0gMDtcbiAgICAgICAgfSAvLyBZIFggWiBvcmRlclxuICAgICAgfVxuICAgICAgLy8gQSBzdGVwIG9mICgxLDAsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYywtYykgaW4gKHgseSx6KSxcbiAgICAgIC8vIGEgc3RlcCBvZiAoMCwxLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMsLWMpIGluICh4LHkseiksIGFuZFxuICAgICAgLy8gYSBzdGVwIG9mICgwLDAsMSkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLC1jLDEtYykgaW4gKHgseSx6KSwgd2hlcmVcbiAgICAgIC8vIGMgPSAxLzYuXG4gICAgICB2YXIgeDEgPSB4MCAtIGkxICsgRzM7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcbiAgICAgIHZhciB5MSA9IHkwIC0gajEgKyBHMztcbiAgICAgIHZhciB6MSA9IHowIC0gazEgKyBHMztcbiAgICAgIHZhciB4MiA9IHgwIC0gaTIgKyAyLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXG4gICAgICB2YXIgeTIgPSB5MCAtIGoyICsgMi4wICogRzM7XG4gICAgICB2YXIgejIgPSB6MCAtIGsyICsgMi4wICogRzM7XG4gICAgICB2YXIgeDMgPSB4MCAtIDEuMCArIDMuMCAqIEczOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xuICAgICAgdmFyIHkzID0geTAgLSAxLjAgKyAzLjAgKiBHMztcbiAgICAgIHZhciB6MyA9IHowIC0gMS4wICsgMy4wICogRzM7XG4gICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIGZvdXIgc2ltcGxleCBjb3JuZXJzXG4gICAgICB2YXIgaWkgPSBpICYgMjU1O1xuICAgICAgdmFyIGpqID0gaiAmIDI1NTtcbiAgICAgIHZhciBrayA9IGsgJiAyNTU7XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcbiAgICAgIHZhciB0MCA9IDAuNiAtIHgwICogeDAgLSB5MCAqIHkwIC0gejAgKiB6MDtcbiAgICAgIGlmICh0MCA8IDApIG4wID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTAgPSBwZXJtTW9kMTJbaWkgKyBwZXJtW2pqICsgcGVybVtra11dXSAqIDM7XG4gICAgICAgIHQwICo9IHQwO1xuICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZDNbZ2kwXSAqIHgwICsgZ3JhZDNbZ2kwICsgMV0gKiB5MCArIGdyYWQzW2dpMCArIDJdICogejApO1xuICAgICAgfVxuICAgICAgdmFyIHQxID0gMC42IC0geDEgKiB4MSAtIHkxICogeTEgLSB6MSAqIHoxO1xuICAgICAgaWYgKHQxIDwgMCkgbjEgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMSA9IHBlcm1Nb2QxMltpaSArIGkxICsgcGVybVtqaiArIGoxICsgcGVybVtrayArIGsxXV1dICogMztcbiAgICAgICAgdDEgKj0gdDE7XG4gICAgICAgIG4xID0gdDEgKiB0MSAqIChncmFkM1tnaTFdICogeDEgKyBncmFkM1tnaTEgKyAxXSAqIHkxICsgZ3JhZDNbZ2kxICsgMl0gKiB6MSk7XG4gICAgICB9XG4gICAgICB2YXIgdDIgPSAwLjYgLSB4MiAqIHgyIC0geTIgKiB5MiAtIHoyICogejI7XG4gICAgICBpZiAodDIgPCAwKSBuMiA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kyID0gcGVybU1vZDEyW2lpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazJdXV0gKiAzO1xuICAgICAgICB0MiAqPSB0MjtcbiAgICAgICAgbjIgPSB0MiAqIHQyICogKGdyYWQzW2dpMl0gKiB4MiArIGdyYWQzW2dpMiArIDFdICogeTIgKyBncmFkM1tnaTIgKyAyXSAqIHoyKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MyA9IDAuNiAtIHgzICogeDMgLSB5MyAqIHkzIC0gejMgKiB6MztcbiAgICAgIGlmICh0MyA8IDApIG4zID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTMgPSBwZXJtTW9kMTJbaWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMV1dXSAqIDM7XG4gICAgICAgIHQzICo9IHQzO1xuICAgICAgICBuMyA9IHQzICogdDMgKiAoZ3JhZDNbZ2kzXSAqIHgzICsgZ3JhZDNbZ2kzICsgMV0gKiB5MyArIGdyYWQzW2dpMyArIDJdICogejMpO1xuICAgICAgfVxuICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxuICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gc3RheSBqdXN0IGluc2lkZSBbLTEsMV1cbiAgICAgIHJldHVybiAzMi4wICogKG4wICsgbjEgKyBuMiArIG4zKTtcbiAgICB9LFxuICAgIC8vIDREIHNpbXBsZXggbm9pc2UsIGJldHRlciBzaW1wbGV4IHJhbmsgb3JkZXJpbmcgbWV0aG9kIDIwMTItMDMtMDlcbiAgICBub2lzZTREOiBmdW5jdGlvbih4LCB5LCB6LCB3KSB7XG4gICAgICB2YXIgcGVybSA9IHRoaXMucGVybTtcbiAgICAgIHZhciBncmFkNCA9IHRoaXMuZ3JhZDQ7XG5cbiAgICAgIHZhciBuMCwgbjEsIG4yLCBuMywgbjQ7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgZml2ZSBjb3JuZXJzXG4gICAgICAvLyBTa2V3IHRoZSAoeCx5LHosdykgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIGNlbGwgb2YgMjQgc2ltcGxpY2VzIHdlJ3JlIGluXG4gICAgICB2YXIgcyA9ICh4ICsgeSArIHogKyB3KSAqIEY0OyAvLyBGYWN0b3IgZm9yIDREIHNrZXdpbmdcbiAgICAgIHZhciBpID0gTWF0aC5mbG9vcih4ICsgcyk7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoeSArIHMpO1xuICAgICAgdmFyIGsgPSBNYXRoLmZsb29yKHogKyBzKTtcbiAgICAgIHZhciBsID0gTWF0aC5mbG9vcih3ICsgcyk7XG4gICAgICB2YXIgdCA9IChpICsgaiArIGsgKyBsKSAqIEc0OyAvLyBGYWN0b3IgZm9yIDREIHVuc2tld2luZ1xuICAgICAgdmFyIFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5LHosdykgc3BhY2VcbiAgICAgIHZhciBZMCA9IGogLSB0O1xuICAgICAgdmFyIFowID0gayAtIHQ7XG4gICAgICB2YXIgVzAgPSBsIC0gdDtcbiAgICAgIHZhciB4MCA9IHggLSBYMDsgLy8gVGhlIHgseSx6LHcgZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXG4gICAgICB2YXIgeTAgPSB5IC0gWTA7XG4gICAgICB2YXIgejAgPSB6IC0gWjA7XG4gICAgICB2YXIgdzAgPSB3IC0gVzA7XG4gICAgICAvLyBGb3IgdGhlIDREIGNhc2UsIHRoZSBzaW1wbGV4IGlzIGEgNEQgc2hhcGUgSSB3b24ndCBldmVuIHRyeSB0byBkZXNjcmliZS5cbiAgICAgIC8vIFRvIGZpbmQgb3V0IHdoaWNoIG9mIHRoZSAyNCBwb3NzaWJsZSBzaW1wbGljZXMgd2UncmUgaW4sIHdlIG5lZWQgdG9cbiAgICAgIC8vIGRldGVybWluZSB0aGUgbWFnbml0dWRlIG9yZGVyaW5nIG9mIHgwLCB5MCwgejAgYW5kIHcwLlxuICAgICAgLy8gU2l4IHBhaXItd2lzZSBjb21wYXJpc29ucyBhcmUgcGVyZm9ybWVkIGJldHdlZW4gZWFjaCBwb3NzaWJsZSBwYWlyXG4gICAgICAvLyBvZiB0aGUgZm91ciBjb29yZGluYXRlcywgYW5kIHRoZSByZXN1bHRzIGFyZSB1c2VkIHRvIHJhbmsgdGhlIG51bWJlcnMuXG4gICAgICB2YXIgcmFua3ggPSAwO1xuICAgICAgdmFyIHJhbmt5ID0gMDtcbiAgICAgIHZhciByYW5reiA9IDA7XG4gICAgICB2YXIgcmFua3cgPSAwO1xuICAgICAgaWYgKHgwID4geTApIHJhbmt4Kys7XG4gICAgICBlbHNlIHJhbmt5Kys7XG4gICAgICBpZiAoeDAgPiB6MCkgcmFua3grKztcbiAgICAgIGVsc2UgcmFua3orKztcbiAgICAgIGlmICh4MCA+IHcwKSByYW5reCsrO1xuICAgICAgZWxzZSByYW5rdysrO1xuICAgICAgaWYgKHkwID4gejApIHJhbmt5Kys7XG4gICAgICBlbHNlIHJhbmt6Kys7XG4gICAgICBpZiAoeTAgPiB3MCkgcmFua3krKztcbiAgICAgIGVsc2UgcmFua3crKztcbiAgICAgIGlmICh6MCA+IHcwKSByYW5reisrO1xuICAgICAgZWxzZSByYW5rdysrO1xuICAgICAgdmFyIGkxLCBqMSwgazEsIGwxOyAvLyBUaGUgaW50ZWdlciBvZmZzZXRzIGZvciB0aGUgc2Vjb25kIHNpbXBsZXggY29ybmVyXG4gICAgICB2YXIgaTIsIGoyLCBrMiwgbDI7IC8vIFRoZSBpbnRlZ2VyIG9mZnNldHMgZm9yIHRoZSB0aGlyZCBzaW1wbGV4IGNvcm5lclxuICAgICAgdmFyIGkzLCBqMywgazMsIGwzOyAvLyBUaGUgaW50ZWdlciBvZmZzZXRzIGZvciB0aGUgZm91cnRoIHNpbXBsZXggY29ybmVyXG4gICAgICAvLyBzaW1wbGV4W2NdIGlzIGEgNC12ZWN0b3Igd2l0aCB0aGUgbnVtYmVycyAwLCAxLCAyIGFuZCAzIGluIHNvbWUgb3JkZXIuXG4gICAgICAvLyBNYW55IHZhbHVlcyBvZiBjIHdpbGwgbmV2ZXIgb2NjdXIsIHNpbmNlIGUuZy4geD55Pno+dyBtYWtlcyB4PHosIHk8dyBhbmQgeDx3XG4gICAgICAvLyBpbXBvc3NpYmxlLiBPbmx5IHRoZSAyNCBpbmRpY2VzIHdoaWNoIGhhdmUgbm9uLXplcm8gZW50cmllcyBtYWtlIGFueSBzZW5zZS5cbiAgICAgIC8vIFdlIHVzZSBhIHRocmVzaG9sZGluZyB0byBzZXQgdGhlIGNvb3JkaW5hdGVzIGluIHR1cm4gZnJvbSB0aGUgbGFyZ2VzdCBtYWduaXR1ZGUuXG4gICAgICAvLyBSYW5rIDMgZGVub3RlcyB0aGUgbGFyZ2VzdCBjb29yZGluYXRlLlxuICAgICAgaTEgPSByYW5reCA+PSAzID8gMSA6IDA7XG4gICAgICBqMSA9IHJhbmt5ID49IDMgPyAxIDogMDtcbiAgICAgIGsxID0gcmFua3ogPj0gMyA/IDEgOiAwO1xuICAgICAgbDEgPSByYW5rdyA+PSAzID8gMSA6IDA7XG4gICAgICAvLyBSYW5rIDIgZGVub3RlcyB0aGUgc2Vjb25kIGxhcmdlc3QgY29vcmRpbmF0ZS5cbiAgICAgIGkyID0gcmFua3ggPj0gMiA/IDEgOiAwO1xuICAgICAgajIgPSByYW5reSA+PSAyID8gMSA6IDA7XG4gICAgICBrMiA9IHJhbmt6ID49IDIgPyAxIDogMDtcbiAgICAgIGwyID0gcmFua3cgPj0gMiA/IDEgOiAwO1xuICAgICAgLy8gUmFuayAxIGRlbm90ZXMgdGhlIHNlY29uZCBzbWFsbGVzdCBjb29yZGluYXRlLlxuICAgICAgaTMgPSByYW5reCA+PSAxID8gMSA6IDA7XG4gICAgICBqMyA9IHJhbmt5ID49IDEgPyAxIDogMDtcbiAgICAgIGszID0gcmFua3ogPj0gMSA/IDEgOiAwO1xuICAgICAgbDMgPSByYW5rdyA+PSAxID8gMSA6IDA7XG4gICAgICAvLyBUaGUgZmlmdGggY29ybmVyIGhhcyBhbGwgY29vcmRpbmF0ZSBvZmZzZXRzID0gMSwgc28gbm8gbmVlZCB0byBjb21wdXRlIHRoYXQuXG4gICAgICB2YXIgeDEgPSB4MCAtIGkxICsgRzQ7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgdmFyIHkxID0geTAgLSBqMSArIEc0O1xuICAgICAgdmFyIHoxID0gejAgLSBrMSArIEc0O1xuICAgICAgdmFyIHcxID0gdzAgLSBsMSArIEc0O1xuICAgICAgdmFyIHgyID0geDAgLSBpMiArIDIuMCAqIEc0OyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgaW4gKHgseSx6LHcpIGNvb3Jkc1xuICAgICAgdmFyIHkyID0geTAgLSBqMiArIDIuMCAqIEc0O1xuICAgICAgdmFyIHoyID0gejAgLSBrMiArIDIuMCAqIEc0O1xuICAgICAgdmFyIHcyID0gdzAgLSBsMiArIDIuMCAqIEc0O1xuICAgICAgdmFyIHgzID0geDAgLSBpMyArIDMuMCAqIEc0OyAvLyBPZmZzZXRzIGZvciBmb3VydGggY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgIHZhciB5MyA9IHkwIC0gajMgKyAzLjAgKiBHNDtcbiAgICAgIHZhciB6MyA9IHowIC0gazMgKyAzLjAgKiBHNDtcbiAgICAgIHZhciB3MyA9IHcwIC0gbDMgKyAzLjAgKiBHNDtcbiAgICAgIHZhciB4NCA9IHgwIC0gMS4wICsgNC4wICogRzQ7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgIHZhciB5NCA9IHkwIC0gMS4wICsgNC4wICogRzQ7XG4gICAgICB2YXIgejQgPSB6MCAtIDEuMCArIDQuMCAqIEc0O1xuICAgICAgdmFyIHc0ID0gdzAgLSAxLjAgKyA0LjAgKiBHNDtcbiAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgZml2ZSBzaW1wbGV4IGNvcm5lcnNcbiAgICAgIHZhciBpaSA9IGkgJiAyNTU7XG4gICAgICB2YXIgamogPSBqICYgMjU1O1xuICAgICAgdmFyIGtrID0gayAmIDI1NTtcbiAgICAgIHZhciBsbCA9IGwgJiAyNTU7XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSBmaXZlIGNvcm5lcnNcbiAgICAgIHZhciB0MCA9IDAuNiAtIHgwICogeDAgLSB5MCAqIHkwIC0gejAgKiB6MCAtIHcwICogdzA7XG4gICAgICBpZiAodDAgPCAwKSBuMCA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kwID0gKHBlcm1baWkgKyBwZXJtW2pqICsgcGVybVtrayArIHBlcm1bbGxdXV1dICUgMzIpICogNDtcbiAgICAgICAgdDAgKj0gdDA7XG4gICAgICAgIG4wID0gdDAgKiB0MCAqIChncmFkNFtnaTBdICogeDAgKyBncmFkNFtnaTAgKyAxXSAqIHkwICsgZ3JhZDRbZ2kwICsgMl0gKiB6MCArIGdyYWQ0W2dpMCArIDNdICogdzApO1xuICAgICAgfVxuICAgICAgdmFyIHQxID0gMC42IC0geDEgKiB4MSAtIHkxICogeTEgLSB6MSAqIHoxIC0gdzEgKiB3MTtcbiAgICAgIGlmICh0MSA8IDApIG4xID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTEgPSAocGVybVtpaSArIGkxICsgcGVybVtqaiArIGoxICsgcGVybVtrayArIGsxICsgcGVybVtsbCArIGwxXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQxICo9IHQxO1xuICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZDRbZ2kxXSAqIHgxICsgZ3JhZDRbZ2kxICsgMV0gKiB5MSArIGdyYWQ0W2dpMSArIDJdICogejEgKyBncmFkNFtnaTEgKyAzXSAqIHcxKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MiA9IDAuNiAtIHgyICogeDIgLSB5MiAqIHkyIC0gejIgKiB6MiAtIHcyICogdzI7XG4gICAgICBpZiAodDIgPCAwKSBuMiA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kyID0gKHBlcm1baWkgKyBpMiArIHBlcm1bamogKyBqMiArIHBlcm1ba2sgKyBrMiArIHBlcm1bbGwgKyBsMl1dXV0gJSAzMikgKiA0O1xuICAgICAgICB0MiAqPSB0MjtcbiAgICAgICAgbjIgPSB0MiAqIHQyICogKGdyYWQ0W2dpMl0gKiB4MiArIGdyYWQ0W2dpMiArIDFdICogeTIgKyBncmFkNFtnaTIgKyAyXSAqIHoyICsgZ3JhZDRbZ2kyICsgM10gKiB3Mik7XG4gICAgICB9XG4gICAgICB2YXIgdDMgPSAwLjYgLSB4MyAqIHgzIC0geTMgKiB5MyAtIHozICogejMgLSB3MyAqIHczO1xuICAgICAgaWYgKHQzIDwgMCkgbjMgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMyA9IChwZXJtW2lpICsgaTMgKyBwZXJtW2pqICsgajMgKyBwZXJtW2trICsgazMgKyBwZXJtW2xsICsgbDNdXV1dICUgMzIpICogNDtcbiAgICAgICAgdDMgKj0gdDM7XG4gICAgICAgIG4zID0gdDMgKiB0MyAqIChncmFkNFtnaTNdICogeDMgKyBncmFkNFtnaTMgKyAxXSAqIHkzICsgZ3JhZDRbZ2kzICsgMl0gKiB6MyArIGdyYWQ0W2dpMyArIDNdICogdzMpO1xuICAgICAgfVxuICAgICAgdmFyIHQ0ID0gMC42IC0geDQgKiB4NCAtIHk0ICogeTQgLSB6NCAqIHo0IC0gdzQgKiB3NDtcbiAgICAgIGlmICh0NCA8IDApIG40ID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTQgPSAocGVybVtpaSArIDEgKyBwZXJtW2pqICsgMSArIHBlcm1ba2sgKyAxICsgcGVybVtsbCArIDFdXV1dICUgMzIpICogNDtcbiAgICAgICAgdDQgKj0gdDQ7XG4gICAgICAgIG40ID0gdDQgKiB0NCAqIChncmFkNFtnaTRdICogeDQgKyBncmFkNFtnaTQgKyAxXSAqIHk0ICsgZ3JhZDRbZ2k0ICsgMl0gKiB6NCArIGdyYWQ0W2dpNCArIDNdICogdzQpO1xuICAgICAgfVxuICAgICAgLy8gU3VtIHVwIGFuZCBzY2FsZSB0aGUgcmVzdWx0IHRvIGNvdmVyIHRoZSByYW5nZSBbLTEsMV1cbiAgICAgIHJldHVybiAyNy4wICogKG4wICsgbjEgKyBuMiArIG4zICsgbjQpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBidWlsZFBlcm11dGF0aW9uVGFibGUocmFuZG9tKSB7XG4gICAgdmFyIGk7XG4gICAgdmFyIHAgPSBuZXcgVWludDhBcnJheSgyNTYpO1xuICAgIGZvciAoaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICAgICAgcFtpXSA9IGk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCAyNTU7IGkrKykge1xuICAgICAgdmFyIHIgPSBpICsgfn4ocmFuZG9tKCkgKiAoMjU2IC0gaSkpO1xuICAgICAgdmFyIGF1eCA9IHBbaV07XG4gICAgICBwW2ldID0gcFtyXTtcbiAgICAgIHBbcl0gPSBhdXg7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9XG4gIFNpbXBsZXhOb2lzZS5fYnVpbGRQZXJtdXRhdGlvblRhYmxlID0gYnVpbGRQZXJtdXRhdGlvblRhYmxlO1xuXG4gIGZ1bmN0aW9uIGFsZWEoKSB7XG4gICAgLy8gSm9oYW5uZXMgQmFhZ8O4ZSA8YmFhZ29lQGJhYWdvZS5jb20+LCAyMDEwXG4gICAgdmFyIHMwID0gMDtcbiAgICB2YXIgczEgPSAwO1xuICAgIHZhciBzMiA9IDA7XG4gICAgdmFyIGMgPSAxO1xuXG4gICAgdmFyIG1hc2ggPSBtYXNoZXIoKTtcbiAgICBzMCA9IG1hc2goJyAnKTtcbiAgICBzMSA9IG1hc2goJyAnKTtcbiAgICBzMiA9IG1hc2goJyAnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzMCAtPSBtYXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAoczAgPCAwKSB7XG4gICAgICAgIHMwICs9IDE7XG4gICAgICB9XG4gICAgICBzMSAtPSBtYXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAoczEgPCAwKSB7XG4gICAgICAgIHMxICs9IDE7XG4gICAgICB9XG4gICAgICBzMiAtPSBtYXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICBpZiAoczIgPCAwKSB7XG4gICAgICAgIHMyICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIG1hc2ggPSBudWxsO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0ID0gMjA5MTYzOSAqIHMwICsgYyAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG4gICAgICBzMCA9IHMxO1xuICAgICAgczEgPSBzMjtcbiAgICAgIHJldHVybiBzMiA9IHQgLSAoYyA9IHQgfCAwKTtcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIG1hc2hlcigpIHtcbiAgICB2YXIgbiA9IDB4ZWZjODI0OWQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbiArPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG4gICAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgICBoIC09IG47XG4gICAgICAgIGggKj0gbjtcbiAgICAgICAgbiA9IGggPj4+IDA7XG4gICAgICAgIGggLT0gbjtcbiAgICAgICAgbiArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcbiAgICAgIH1cbiAgICAgIHJldHVybiAobiA+Pj4gMCkgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgIH07XG4gIH1cblxuICAvLyBhbWRcbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09ICd1bmRlZmluZWQnICYmIGRlZmluZS5hbWQpIGRlZmluZShmdW5jdGlvbigpIHtyZXR1cm4gU2ltcGxleE5vaXNlO30pO1xuICAvLyBjb21tb24ganNcbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykgZXhwb3J0cy5TaW1wbGV4Tm9pc2UgPSBTaW1wbGV4Tm9pc2U7XG4gIC8vIGJyb3dzZXJcbiAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHdpbmRvdy5TaW1wbGV4Tm9pc2UgPSBTaW1wbGV4Tm9pc2U7XG4gIC8vIG5vZGVqc1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFNpbXBsZXhOb2lzZTtcbiAgfVxuXG59KSgpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiY29uc3QgY2FudmFzU2tldGNoID0gcmVxdWlyZSgnY2FudmFzLXNrZXRjaCcpO1xuY29uc3QgcmFuZG9tID0gcmVxdWlyZSgnY2FudmFzLXNrZXRjaC11dGlsL3JhbmRvbScpO1xuXG5jb25zdCBzZXR0aW5ncyA9IHtcblx0ZGltZW5zaW9uczogWyAxMDgwLCAxMDgwIF1cbn07XG5cblxuXG5sZXQgbWFuYWdlcjtcblxubGV0IHRleHQgPSAnQSc7XG5sZXQgZm9udFNpemUgPSAxMjAwO1xubGV0IGZvbnRGYW1pbHkgPSAnc2VyaWYnO1xuXG5jb25zdCB0eXBlQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jb25zdCB0eXBlQ29udGV4dCA9IHR5cGVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuY29uc3Qgc2tldGNoID0gKHsgY29udGV4dCwgd2lkdGgsIGhlaWdodCB9KSA9PiB7XG5cbmxldCBpbWdPYmogPSBuZXcgSW1hZ2UoKTtcbmltZ09iai5zcmMgPSAnLi9qZWFuLmpwZydcblxuaW1nT2JqLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG5jb25zb2xlLmxvZyhpbWdPYmopXG4vLyBsZXQgdyA9IHR5cGVDYW52YXMud2lkdGg7XG4vLyBsZXQgbncgPSBpbWdPYmoubmF0dXJhbFdpZHRoO1xuLy8gbGV0IG5oID0gaW1nT2JqLm5hdHVyYWxIZWlnaHQ7XG4vLyBsZXQgYXNwZWN0ID0gbncvbmg7XG4vLyBsZXQgaCA9IHR5cGVDYW52YXMud2lkdGggLyBhc3BlY3Q7XG4vLyB0eXBlQ2FudmFzLmhlaWdodCA9IGg7XG50eXBlQ29udGV4dC5kcmF3SW1hZ2UoaW1nT2JqLCAwICwwLCAxMDAsMTAwKVxufVxuXG5cdGNvbnN0IGNlbGwgPSAyMDtcblx0Y29uc3QgY29scyA9IE1hdGguZmxvb3Iod2lkdGggIC8gY2VsbCk7XG5cdGNvbnN0IHJvd3MgPSBNYXRoLmZsb29yKGhlaWdodCAvIGNlbGwpO1xuXHRjb25zdCBudW1DZWxscyA9IGNvbHMgKiByb3dzO1xuXG5cdHR5cGVDYW52YXMud2lkdGggID0gY29scztcblx0dHlwZUNhbnZhcy5oZWlnaHQgPSByb3dzO1xuXG5cdHJldHVybiAoeyBjb250ZXh0LCB3aWR0aCwgaGVpZ2h0IH0pID0+IHtcblx0XHR0eXBlQ29udGV4dC5maWxsU3R5bGUgPSAnYmxhY2snO1xuXHRcdHR5cGVDb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNvbHMsIHJvd3MpO1xuXG5cdFx0Zm9udFNpemUgPSBjb2xzICogMS4yO1xuXG5cdFx0dHlwZUNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcblx0XHR0eXBlQ29udGV4dC5mb250ID0gYCR7Zm9udFNpemV9cHggJHtmb250RmFtaWx5fWA7XG5cdFx0dHlwZUNvbnRleHQudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG5cblx0XHRjb25zdCBtZXRyaWNzID0gdHlwZUNvbnRleHQubWVhc3VyZVRleHQodGV4dCk7XG5cdFx0Y29uc3QgbXggPSBtZXRyaWNzLmFjdHVhbEJvdW5kaW5nQm94TGVmdCAqIC0xO1xuXHRcdGNvbnN0IG15ID0gbWV0cmljcy5hY3R1YWxCb3VuZGluZ0JveEFzY2VudCAqIC0xO1xuXHRcdGNvbnN0IG13ID0gbWV0cmljcy5hY3R1YWxCb3VuZGluZ0JveExlZnQgKyBtZXRyaWNzLmFjdHVhbEJvdW5kaW5nQm94UmlnaHQ7XG5cdFx0Y29uc3QgbWggPSBtZXRyaWNzLmFjdHVhbEJvdW5kaW5nQm94QXNjZW50ICsgbWV0cmljcy5hY3R1YWxCb3VuZGluZ0JveERlc2NlbnQ7XG5cblx0XHRjb25zdCB0eCA9IChjb2xzIC0gbXcpICogMC41IC0gbXg7XG5cdFx0Y29uc3QgdHkgPSAocm93cyAtIG1oKSAqIDAuNSAtIG15O1xuXG5cdFx0dHlwZUNvbnRleHQuc2F2ZSgpO1xuXHRcdHR5cGVDb250ZXh0LnRyYW5zbGF0ZSh0eCwgdHkpO1xuXG5cdFx0dHlwZUNvbnRleHQuYmVnaW5QYXRoKCk7XG5cdFx0dHlwZUNvbnRleHQucmVjdChteCwgbXksIG13LCBtaCk7XG5cdFx0dHlwZUNvbnRleHQuc3Ryb2tlKCk7XG5cblx0XHR0eXBlQ29udGV4dC5maWxsVGV4dCh0ZXh0LCAwLCAwKTtcblx0XHR0eXBlQ29udGV4dC5yZXN0b3JlKCk7XG5cblxuXG5cblx0XHRjb25zdCB0eXBlRGF0YSA9IHR5cGVDb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCBjb2xzLCByb3dzKS5kYXRhO1xuXG5cblx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICdibGFjayc7XG5cdFx0Y29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuXHRcdGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cdFx0Y29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcblxuXHRcdC8vIGNvbnRleHQuZHJhd0ltYWdlKHR5cGVDYW52YXMsIDAsIDApO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBudW1DZWxsczsgaSsrKSB7XG5cdFx0XHRjb25zdCBjb2wgPSBpICUgY29scztcblx0XHRcdGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaSAvIGNvbHMpO1xuXG5cdFx0XHRjb25zdCB4ID0gY29sICogY2VsbDtcblx0XHRcdGNvbnN0IHkgPSByb3cgKiBjZWxsO1xuXG5cdFx0XHRjb25zdCByID0gdHlwZURhdGFbaSAqIDQgKyAwXTtcblx0XHRcdGNvbnN0IGcgPSB0eXBlRGF0YVtpICogNCArIDFdO1xuXHRcdFx0Y29uc3QgYiA9IHR5cGVEYXRhW2kgKiA0ICsgMl07XG5cdFx0XHRjb25zdCBhID0gdHlwZURhdGFbaSAqIDQgKyAzXTtcblxuXHRcdFx0Y29uc3QgZ2x5cGggPSBnZXRHbHlwaChyKTtcblxuXHRcdFx0Y29udGV4dC5mb250ID0gYCR7Y2VsbCAqIDJ9cHggJHtmb250RmFtaWx5fWA7XG5cdFx0XHRpZiAoTWF0aC5yYW5kb20oKSA8IDAuMSkgY29udGV4dC5mb250ID0gYCR7Y2VsbCAqIDZ9cHggJHtmb250RmFtaWx5fWA7XG5cblx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gJ3doaXRlJztcblxuXHRcdFx0Y29udGV4dC5zYXZlKCk7XG5cdFx0XHRjb250ZXh0LnRyYW5zbGF0ZSh4LCB5KTtcblx0XHRcdGNvbnRleHQudHJhbnNsYXRlKGNlbGwgKiAwLjUsIGNlbGwgKiAwLjUpO1xuXG5cdFx0XHQvLyBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNlbGwsIGNlbGwpO1xuXG5cdFx0XHRjb250ZXh0LmZpbGxUZXh0KGdseXBoLCAwLCAwKTtcblx0XHRcdFxuXHRcdFx0Y29udGV4dC5yZXN0b3JlKCk7XG5cblx0XHR9XG5cdH07XG59O1xuXG5jb25zdCBnZXRHbHlwaCA9ICh2KSA9PiB7XG5cdGlmICh2IDwgNTApIHJldHVybiAnJztcblx0aWYgKHYgPCAxMDApIHJldHVybiAnLic7XG5cdGlmICh2IDwgMTUwKSByZXR1cm4gJy0nO1xuXHRpZiAodiA8IDIwMCkgcmV0dXJuICcrJztcblxuXHRjb25zdCBnbHlwaHMgPSAnXz0gLycuc3BsaXQoJycpO1xuXG5cdHJldHVybiByYW5kb20ucGljayhnbHlwaHMpO1xufTtcblxuXG5jb25zdCBvbktleVVwID0gKGUpID0+IHtcblx0dGV4dCA9IGUua2V5LnRvVXBwZXJDYXNlKCk7XG5cdG1hbmFnZXIucmVuZGVyKCk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApO1xuXG5cbmNvbnN0IHN0YXJ0ID0gYXN5bmMgKCkgPT4ge1xuXHRtYW5hZ2VyID0gYXdhaXQgY2FudmFzU2tldGNoKHNrZXRjaCwgc2V0dGluZ3MpO1xufTtcblxuc3RhcnQoKTtcblxuLy8gZnVuY3Rpb24gZ2V0TXlWaWRlbygpIHtcbi8vICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbi8vICAgaWYgKGNhbnZhcy5nZXRDb250ZXh0KSB7XG4vLyAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4vLyAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteXZpZGVvJyk7XG4vLyAgIH1cbi8vIH1cblxuLy8gZ2V0TXlWaWRlb1xuXG5cblxuXG4vLyBjb25zdCB1cmwgPSAnaHR0cHM6Ly9waWNzdW0ucGhvdG9zLzIwMCc7XG5cbi8vIGNvbnN0IGxvYWRNZVNvbWVJbWFnZSA9ICh1cmwpID0+IHtcbi8vIFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbi8vIFx0XHRjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbi8vIFx0XHRpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpO1xuLy8gXHRcdGltZy5vbmVycm9yID0gKCkgPT4gcmVqZWN0KCk7XG4vLyBcdFx0aW1nLnNyYyA9IHVybDtcbi8vIFx0fSk7XG4vLyB9O1xuXG4vLyBjb25zdCBzdGFydCA9IGFzeW5jICgpID0+IHtcbi8vIFx0Y29uc3QgaW1nID0gYXdhaXQgbG9hZE1lU29tZUltYWdlKHVybCk7XG4vLyBcdGNvbnNvbGUubG9nKCdpbWFnZSB3aWR0aCcsIGltZy53aWR0aCk7XG4vLyBcdGNvbnNvbGUubG9nKCd0aGlzIGxpbmUnKTtcbi8vIH07XG5cbi8vIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuLy8gXHRsb2FkTWVTb21lSW1hZ2UodXJsKS50aGVuKGltZyA9PiB7XG4vLyBcdFx0Y29uc29sZS5sb2coJ2ltYWdlIHdpZHRoJywgaW1nLndpZHRoKTtcbi8vIFx0fSk7XG4vLyBcdGNvbnNvbGUubG9nKCd0aGlzIGxpbmUnKTtcbi8vIH07XG5cblxuLy8gc3RhcnQoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9