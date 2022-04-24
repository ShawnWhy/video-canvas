/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/browser-media-mime-type/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/browser-media-mime-type/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// sourced from:
// http://www.leanbackplayer.com/test/h5mt.html
// https://github.com/broofa/node-mime/blob/master/types.json
var mimeTypes = __webpack_require__(/*! ./mime-types.json */ "./node_modules/browser-media-mime-type/mime-types.json")

var mimeLookup = {}
Object.keys(mimeTypes).forEach(function (key) {
  var extensions = mimeTypes[key]
  extensions.forEach(function (ext) {
    mimeLookup[ext] = key
  })
})

module.exports = function lookup (ext) {
  if (!ext) throw new TypeError('must specify extension string')
  if (ext.indexOf('.') === 0) {
    ext = ext.substring(1)
  }
  return mimeLookup[ext.toLowerCase()]
}


/***/ }),

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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/main.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/main.css ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body{\r\ncolor:rgb(27, 72, 84);\r\nbackground-color: rgb(0, 0, 0);\r\n}\r\nvideo{\r\n/* width:30%; */\r\nborder-radius:4px;\r\nborder:1px solid black;\r\nfloat:left;\r\n}\r\n\r\ncanvas{\r\n/* width:30%; */\r\nborder-radius:4px;\r\nborder:1px solid black;\r\nfloat:left;\r\n\r\n}\r\n\r\n#controls{\r\nwidth:100%;\r\ndisplay: flex;\r\nclear: both;\r\n}\r\n\r\n#controls div{\r\nwidth:100%;\r\n}\r\n\r\n\r\n", "",{"version":3,"sources":["webpack://./src/main.css"],"names":[],"mappings":"AAAA;AACA,qBAAqB;AACrB,8BAA8B;AAC9B;AACA;AACA,eAAe;AACf,iBAAiB;AACjB,sBAAsB;AACtB,UAAU;AACV;;AAEA;AACA,eAAe;AACf,iBAAiB;AACjB,sBAAsB;AACtB,UAAU;;AAEV;;AAEA;AACA,UAAU;AACV,aAAa;AACb,WAAW;AACX;;AAEA;AACA,UAAU;AACV","sourcesContent":["body{\r\ncolor:rgb(27, 72, 84);\r\nbackground-color: rgb(0, 0, 0);\r\n}\r\nvideo{\r\n/* width:30%; */\r\nborder-radius:4px;\r\nborder:1px solid black;\r\nfloat:left;\r\n}\r\n\r\ncanvas{\r\n/* width:30%; */\r\nborder-radius:4px;\r\nborder:1px solid black;\r\nfloat:left;\r\n\r\n}\r\n\r\n#controls{\r\nwidth:100%;\r\ndisplay: flex;\r\nclear: both;\r\n}\r\n\r\n#controls div{\r\nwidth:100%;\r\n}\r\n\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

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

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof __webpack_require__.g !== "undefined") {
    win = __webpack_require__.g;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;


/***/ }),

/***/ "./node_modules/is-function/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-function/index.js ***!
  \*******************************************/
/***/ ((module) => {

module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  if (!fn) {
    return false
  }
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};


/***/ }),

/***/ "./node_modules/is-promise/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-promise/index.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = isPromise;
module.exports["default"] = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}


/***/ }),

/***/ "./node_modules/load-asset/index.js":
/*!******************************************!*\
  !*** ./node_modules/load-asset/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var loaders = __webpack_require__(/*! ./loaders */ "./node_modules/load-asset/loaders/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var isPromise = __webpack_require__(/*! is-promise */ "./node_modules/is-promise/index.js");
var noop = function () {};

module.exports = loadAsset;

module.exports.all = function all (opt, progress) {
  return loadMultiple(opt, progress, false);
};

module.exports.any = function any (opt, progress) {
  return loadMultiple(opt, progress, true);
};

function loadMultiple (opt, progress, skipMissing) {
  progress = progress || noop;
  if (typeof progress !== 'function') {
    return Promise.reject(new Error('The second argument to load.all() and load.any() must be a function, or undefined'));
  }

  var total;
  var count = 0;
  var load;
  var emitProgress = function (item, value, count, error) {
    var obj = {
      target: item,
      total: total,
      count: count,
      progress: count / total,
      value: value
    };
    if (error) obj.error = error;
    progress(obj);
  };

  if (skipMissing) {
    load = function (opt) {
      return loadAsset(opt).then(function (result) {
        return { value: result };
      }, function (error) {
        return { value: null, error: error };
      }).then(function (optional) {
        emitProgress(opt, optional.value, ++count, optional.error);
        return optional.value;
      });
    };
  } else {
    load = function (opt) {
      return loadAsset(opt).then(function (result) {
        emitProgress(opt, result, ++count);
        return result;
      });
    };
  }

  if (Array.isArray(opt)) {
    total = opt.length;
    return Promise.all(opt.map(function (item) {
      return load(item);
    }));
  } else if (opt) {
    var entries = Object.keys(opt).map(function (key) {
      return { key: key, value: opt[key] };
    });
    total = entries.length;
    return Promise.all(entries.map(function (item) {
      var key = item.key;
      return load(item.value).then(function (value) {
        return { value: value, key: key };
      });
    })).then(function (results) {
      return results.reduce(function (obj, item) {
        obj[item.key] = item.value;
        return obj;
      }, {});
    });
  } else {
    return Promise.reject(new Error('You must specify an array of assets or object group to load'));
  }
}

function loadAsset (opt) {
  if (!opt) return Promise.reject(new Error('You must specify a URL or descriptor of the asset to load'));
  if (typeof opt === 'string') {
    opt = { url: opt };
  }
  // If it's a promise, assume nested features...
  if (isPromise(opt)) return opt;
  return getLoader(opt).then(function (loader) {
    opt = assign({}, opt);
    delete opt.type;
    return loader(opt);
  });
}

function getLoader (opt) {
  var i, loader;
  var type = opt.type ? opt.type : null;
  if (type) {
    // Allow user to specify custom type function
    if (typeof type === 'function') {
      return Promise.resolve(type);
    } else {
      type = type.toLowerCase();
    }
    // User specified an explicit type, use that.
    if (!opt.url) {
      return Promise.reject(new Error('When using loadAsset(), you must specify a URL or descriptor of the asset to load'));
    }
    for (i = 0; i < loaders.length; i++) {
      loader = loaders[i];
      if (loader.key === type) return Promise.resolve(loader.load);
    }
    return Promise.reject(new Error('Could not find an asset loader by the key "' + opt.type + '"'));
  } else {
    // User didn't specify type, try to infer from file extension
    if (!opt.url) {
      return Promise.reject(new Error('When using loadAsset(), you must specify a URL or descriptor of the asset to load'));
    }
    var ext = extname(opt.url);
    if (!ext) return Promise.reject(new Error('No extension found for input URL "' + opt.url + '", try to specify a { type } such as "image" or "text"'));
    for (i = 0; i < loaders.length; i++) {
      loader = loaders[i];
      if (!loader.match) continue;
      var isMatch = typeof loader.match === 'function'
        ? loader.match(ext)
        : loader.match.test(ext);
      if (isMatch) return Promise.resolve(loader.load);
    }
    return Promise.reject(new Error('Could not infer an asset loader from the file type "' + ext + '", try specifying { type } such as "image" or "text"'));
  }
}

function extname (url) {
  if (!url) return '';
  var idx = url.lastIndexOf('/');
  if (idx !== -1) url = url.substring(idx + 1); // Keep path without its segments
  idx = url.indexOf('?');
  if (idx !== -1) url = url.substring(0, idx); // Remove query
  idx = url.indexOf('#');
  if (idx !== -1) url = url.substring(0, idx); // Remove fragment
  idx = url.lastIndexOf('.');
  return idx !== -1 ? url.substring(idx) : '';
}


/***/ }),

/***/ "./node_modules/load-asset/loaders/createFileLoader.js":
/*!*************************************************************!*\
  !*** ./node_modules/load-asset/loaders/createFileLoader.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var xhr = __webpack_require__(/*! xhr */ "./node_modules/xhr/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

module.exports = function (type) {
  return function loadFile (opt) {
    var p;
    if ('fetch' in window) {
      p = window.fetch(opt.url, opt)
        .then(function (response) {
          if (/404/.test(response.status)) {
            throw new Error('Resource not found');
          }
          if (!/^2/.test(response.status)) {
            throw new Error('Unexpected HTTP Status Code: ' + response.status);
          }
          if (!response.ok) {
            throw new Error('Response not OK');
          }
          if (type === 'json') {
            return response.json();
          } else if (type === 'binary') {
            return response.arrayBuffer();
          } else if (type === 'blob') {
            return response.blob();
          } else {
            return response.text();
          }
        });
    } else {
      p = xhrFetch(type, opt);
    }
    return p.catch(function (err) {
      throw new Error(
        err.message + ' while loading file ' + opt.url
      );
    });
  };
};

function xhrFetch (type, opt) {
  return new Promise(function (resolve, reject) {
    var responseType = 'text';
    if (type === 'json') responseType = 'text';
    else if (type === 'binary') responseType = 'arraybuffer';
    else if (type === 'blob') responseType = 'blob';
    opt = assign({}, opt, {
      json: false,
      responseType: responseType
    });
    xhr(opt, function (err, res, body) {
      if (err) return reject(err);
      if (/404/.test(res.statusCode)) {
        throw new Error('Resource not found');
      }
      if (!/^2/.test(res.statusCode)) {
        return reject(new Error('Unexpected HTTP Status Code: ' + res.statusCode));
      }
      if (type === 'json') {
        try {
          body = JSON.parse(body);
        } catch (err) {
          return reject(err);
        }
      }
      resolve(body);
    });
  });
}


/***/ }),

/***/ "./node_modules/load-asset/loaders/createMediaLoader.js":
/*!**************************************************************!*\
  !*** ./node_modules/load-asset/loaders/createMediaLoader.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mime = __webpack_require__(/*! browser-media-mime-type */ "./node_modules/browser-media-mime-type/index.js");

function getMediaType (ext) {
  var result = mime(ext);
  if (!result) return null;
  if (result.indexOf('audio') === 0) return 'audio';
  if (result.indexOf('video') === 0) return 'video';
  return null;
}

module.exports = function createMediaLoader (type, createElement) {
  return {
    key: type,
    match: function (ext) {
      return getMediaType(ext) === type;
    },
    load: function (opt) {
      return new Promise(function (resolve, reject) {
        var finished = false;
        var media = createElement();
        var onLoaded = function onLoaded () {
          if (finished) return;
          finished = true;
          resolve(media);
        };

        var event = (opt.event || 'canplay').toLowerCase();
        if (event === 'loadedmetadata') {
          media.onloadedmetadata = onLoaded;
        } else if (event === 'canplaythrough') {
          media.oncanplaythrough = onLoaded;
        } else if (event === 'loadeddata') {
          media.onloadeddata = onLoaded;
        } else {
          media.oncanplay = onLoaded;
        }

        media.onerror = function onError (er) {
          if (finished) return;
          finished = true;
          reject(new Error('Error while loading ' + type + ' at ' + opt.url));
        };

        // pass through media properties if defined
        if (opt.crossOrigin) media.crossOrigin = opt.crossOrigin;
        if (typeof opt.volume !== 'undefined') media.volume = opt.volume;
        if (typeof opt.preload !== 'undefined') media.preload = opt.volume;
        if (typeof opt.playbackRate !== 'undefined') media.playbackRate = opt.volume;
        if (typeof opt.muted !== 'undefined') media.muted = opt.volume;
        if (typeof opt.currentTime !== 'undefined') media.currentTime = opt.volume;
        if (typeof opt.controls !== 'undefined') media.controls = opt.volume;
        if (typeof opt.autoPlay !== 'undefined') media.autoPlay = opt.volume;

        media.src = opt.url;

        if (media.readyState >= media.HAVE_ENOUGH_DATA) {
          finished = true;
          return resolve(media);
        }

        media.load();
      });
    }
  };
};


/***/ }),

/***/ "./node_modules/load-asset/loaders/index.js":
/*!**************************************************!*\
  !*** ./node_modules/load-asset/loaders/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const createMediaLoader = __webpack_require__(/*! ./createMediaLoader */ "./node_modules/load-asset/loaders/createMediaLoader.js");
const createFileLoader = __webpack_require__(/*! ./createFileLoader */ "./node_modules/load-asset/loaders/createFileLoader.js");
const loadImage = __webpack_require__(/*! ./loadImage */ "./node_modules/load-asset/loaders/loadImage.js");

module.exports = [
  // json
  {
    key: 'json',
    match: /\.json$/i,
    load: createFileLoader('json')
  },
  // text
  {
    key: 'text',
    match: /\.txt$/i,
    load: createFileLoader('text')
  },
  // image
  {
    key: 'image',
    match: /\.(jpg|jpeg|svg|png|gif|webp|bmp|tga|tif|apng|wbpm|ico)$/i,
    load: loadImage
  },
  // audio
  createMediaLoader('audio', function () {
    return new window.Audio();
  }),
  // video
  createMediaLoader('video', function () {
    return document.createElement('video');
  }),
  // binary
  {
    key: 'binary',
    match: /\.bin$/i,
    load: createFileLoader('binary')
  },
  // blob
  {
    key: 'blob',
    load: createFileLoader('blob')
  }
];


/***/ }),

/***/ "./node_modules/load-asset/loaders/loadImage.js":
/*!******************************************************!*\
  !*** ./node_modules/load-asset/loaders/loadImage.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function (opt) {
  return new Promise(function (resolve, reject) {
    var finished = false;
    var image = new window.Image();
    image.onload = function onLoaded () {
      if (finished) return;
      finished = true;
      resolve(image);
    };
    image.onerror = function onError () {
      if (finished) return;
      finished = true;
      reject(new Error('Error while loading image at ' + opt.url));
    };
    if (opt.crossOrigin) image.crossOrigin = opt.crossOrigin;
    image.src = opt.url;
  });
};


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
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

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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


/***/ }),

/***/ "./node_modules/parse-headers/parse-headers.js":
/*!*****************************************************!*\
  !*** ./node_modules/parse-headers/parse-headers.js ***!
  \*****************************************************/
/***/ ((module) => {

var trim = function(string) {
  return string.replace(/^\s+|\s+$/g, '');
}
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  var headersArr = trim(headers).split('\n')

  for (var i = 0; i < headersArr.length; i++) {
    var row = headersArr[i]
    var index = row.indexOf(':')
    , key = trim(row.slice(0, index)).toLowerCase()
    , value = trim(row.slice(index + 1))

    if (typeof(result[key]) === 'undefined') {
      result[key] = value
    } else if (isArray(result[key])) {
      result[key].push(value)
    } else {
      result[key] = [ result[key], value ]
    }
  }

  return result
}


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


/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/xhr/index.js":
/*!***********************************!*\
  !*** ./node_modules/xhr/index.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var window = __webpack_require__(/*! global/window */ "./node_modules/global/window.js")
var isFunction = __webpack_require__(/*! is-function */ "./node_modules/is-function/index.js")
var parseHeaders = __webpack_require__(/*! parse-headers */ "./node_modules/parse-headers/parse-headers.js")
var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js")

module.exports = createXHR
// Allow use of default import syntax in TypeScript
module.exports["default"] = createXHR;
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
        options = initParams(uri, options, callback)
        options.method = method.toUpperCase()
        return _createXHR(options)
    }
})

function forEachArray(array, iterator) {
    for (var i = 0; i < array.length; i++) {
        iterator(array[i])
    }
}

function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function initParams(uri, options, callback) {
    var params = uri

    if (isFunction(options)) {
        callback = options
        if (typeof uri === "string") {
            params = {uri:uri}
        }
    } else {
        params = xtend(options, {uri: uri})
    }

    params.callback = callback
    return params
}

function createXHR(uri, options, callback) {
    options = initParams(uri, options, callback)
    return _createXHR(options)
}

function _createXHR(options) {
    if(typeof options.callback === "undefined"){
        throw new Error("callback argument missing")
    }

    var called = false
    var callback = function cbOnce(err, response, body){
        if(!called){
            called = true
            options.callback(err, response, body)
        }
    }

    function readystatechange() {
        if (xhr.readyState === 4) {
            setTimeout(loadFunc, 0)
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else {
            body = xhr.responseText || getXml(xhr)
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        return callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        return callback(err, response, response.body)
    }

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer
    var failureResponse = {
        body: undefined,
        headers: {},
        statusCode: 0,
        method: method,
        url: uri,
        rawRequest: xhr
    }

    if ("json" in options && options.json !== false) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json === true ? body : options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.onabort = function(){
        aborted = true;
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            if (aborted) return
            aborted = true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    // Microsoft Edge browser sends "undefined" when send is called with undefined value.
    // XMLHttpRequest spec says to pass null as body to indicate no body
    // See https://github.com/naugtur/xhr/issues/100.
    xhr.send(body || null)

    return xhr


}

function getXml(xhr) {
    // xhr.responseXML will throw Exception "InvalidStateError" or "DOMException"
    // See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML.
    try {
        if (xhr.responseType === "document") {
            return xhr.responseXML
        }
        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
            return xhr.responseXML
        }
    } catch (e) {}

    return null
}

function noop() {}


/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ "./node_modules/browser-media-mime-type/mime-types.json":
/*!**************************************************************!*\
  !*** ./node_modules/browser-media-mime-type/mime-types.json ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"audio/midi":["mid","midi","kar","rmi"],"audio/mp4":["mp4a","m4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/webm":["weba"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/wav":["wav"],"video/3gpp":["3gp"],"video/3gpp2":["3g2"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"]}');

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.css */ "./src/main.css");
const canvasSketch = __webpack_require__(/*! canvas-sketch */ "./node_modules/canvas-sketch/dist/canvas-sketch.umd.js");
const random = __webpack_require__(/*! canvas-sketch-util/random */ "./node_modules/canvas-sketch-util/random.js");
const load = __webpack_require__(/*! load-asset */ "./node_modules/load-asset/index.js");

// const { ContextReplacementPlugin } = require('webpack');
let fpsInterval;
let then;
let startTime;
let now
let elapsed;
let agents = [];
let dotsmove = 'off'
let canvas
let movieInterval
let context
let typeContext
let typeCanvas
let video
let cell = 5
let generateFilter
let shape='circles'
let mousePos
let inputStrings = []
let glyphs = '_= /'.split('');
let videoWidth;
let videoHeight;
let videoChoice = "troika"
// glyphs.push("Ukrain")


const getGlyph = (v) => {
	
	return random.pick(glyphs);
};

function getMousePos(canvas, evt) {
console.log("gettingmouse pos")
  var rect = canvas.getBoundingClientRect();
	console.log(rect)
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    tick();
}
class Agent {
	constructor(x, y, fillStyle, cell) {
		// this.pos = new Vector(x, y);
		this.x=x;
		this.y=y;
		this.radius=cell/2;
		this.fillStyle=fillStyle
		this.vel = {x:random.range(-.5, .5), y:random.range(-.5, .5)};

	}


getDistance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
}

moveBit(){
	this.x += this.vel.x;
	this.y += this.vel.y;
	switch(shape){
case 'circles':
this.draw(context)
break;
case 'squares':
this.drawSquare(context)
break;
case 'rumbus':
this.drawRumbus(context)
break;
case 'words':
context.fillStyle = 'black';
context.textBaseline = 'middle';
context.textAlign = 'center';
this.drawText(context)
}

this.bounce(1000, 1000)
}




	bounce(width, height) {
		if (this.x <= 0 || this.x >= width)  this.vel.x *= -1;
		if (this.y <= 0 || this.y >= height) this.vel.y *= -1;
	}

	update() {
		this.x += this.vel.x;
		this.y += this.vel.y;
	}

	draw(context) {
		context.save();

		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);
	    context.translate(this.radius, this.radius);

		context.beginPath();
		context.arc(0, 0, this.radius, 0, Math.PI * 2);
		context.fill();
		context.restore();
	}
	drawSquare(context) {
		context.save();

		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);
	    // context.translate(this.radius, this.radius);

		context.beginPath();

		context.fillRect(0,0,this.radius*2, this.radius*2);
		context.fill();
		context.restore();
	}
	drawRumbus(context) {
		context.save();

		context.fillStyle = this.fillStyle
		context.translate(this.x, this.y);
		context.rotate(Math.PI*.25);

	    // context.translate(this.radius, this.radius);

		context.beginPath();

		context.fillRect(0,0,this.radius, this.radius);



		context.fill();

		context.restore();
	}
	drawText(context) {


		const glyph = getGlyph(200);
		fontSize = this.radius * 2.4;

		typeContext.fillStyle = 'black';
	

			context.font = `${this.radius * 2}px ${fontFamily}`;
			if (Math.random() < 0.1) context.font = `${this.radius * 6}px ${fontFamily}`;
			typeContext.textBaseline = 'top';

		context.fillStyle = this.fillStyle

			context.save();
			context.translate(this.x, this.y);
			context.translate(this.radius * 0.5, this.radius * 0.5);

			// context.fillRect(0, 0, cell, cell);

			context.fillText(glyph, 0, 0);
			
			context.restore();

		
	}
}



let agentPushed = 0 
let fontSize = 1200;
let fontFamily = 'serif';

document.addEventListener("DOMContentLoaded", function(event) { 

typeCanvas=document.getElementById('canvas1');
canvas=document.getElementById('canvas2');
context = canvas.getContext('2d');

// console.log(typeCanvas)
typeContext = typeCanvas.getContext('2d');
video  = document.getElementById('video');
var checkvideo = setInterval(() => {
	if ( video.readyState === 4 ) {
videoWidth = video.videoWidth;
videoHeight = video.videoHeight;
// console.log(videoHeight)
var typeCanvasHeight = videoHeight/cell;
var typeCanvasWidth = videoWidth/cell
// console.log(typeCanvasHeight)
// console.log(typeCanvasWidth)
typeCanvas.width = typeCanvasWidth;
typeCanvas.height = typeCanvasHeight;
canvas.height = videoHeight;
canvas.width= videoWidth;
clearInterval(checkvideo)

}
}, 200);



//main funciton
generateFilter= function(video){
	// console.log('mousedown')
	clearInterval(movieInterval)
	 movieInterval = setInterval(() => {
	context.clearRect(0, 0, canvas.width, canvas.height);

	dotsmove= 'off'
	agents = [];

    var $this = this; //cache
	const width= typeCanvas.width;
	const height = typeCanvas.height
	// const cols = Math.floor(width  / cell);
	// const rows = Math.floor(height / cell);
	const cols = width;
	const rows = height;
	const numCells = cols * rows
  
        typeContext.drawImage(video, 0, 0, width, height);
		var typeData = typeContext.getImageData(0, 0, width, height).data;
		// console.log(typeData)
		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		// context.drawImage(typeCanvas, 0, 0);
		for (let i = 0; i < numCells; i++) {

			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col*cell;
			const y = row*cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];
			// let newAgent = new Agent(x, y,'rgb('+r+','+g+','+b+')', cell )
			// console.log(newAgent)

			agents.push(new Agent(x, y,'rgb('+r+','+g+','+b+')', cell ))
			// console.log(agents)
			// console.log(Agent)
			// console.log("agent")
			agentPushed++;

		}
		if(agentPushed>=numCells){
	
				agents.forEach(agent=>{

			switch(shape){
case 'circles':
agent.draw(context)
break;
case 'squares':
agent.drawSquare(context)
break;
case 'rumbus':
agent.drawRumbus(context)
break;
case 'words':
context.textBaseline = 'middle';
context.textAlign = 'center';
agent.drawText(context)
}




})
	}	

}, 500);


if(canvas){
canvas.addEventListener('mousedown', canvasClick);
canvas.addEventListener('mousemove', (e)=>{
console.log('moisemove')
movePixles(e)
})
}
}



video.addEventListener('play', function () {

generateFilter(video);

})



})
const canvasClick = ()=>{
clearInterval(movieInterval)
console.log('canvas click')
if(dotsmove=='off'){
dotsmove ='on'
}
else{
dotsmove="off"
generateFilter(video);
}
}


const tick = () =>{

if(agents.length>0&&dotsmove=='on'){
for(let i = 0; i<agents.length;i++){
agents[i].update()
switch(shape){
case 'circles':
agents[i].draw(context)
break;
case 'squares':
agents[i].drawSquare(context)
break;
case 'rumbus':
agents[i].drawRumbus(context)
break;
case 'words':
context.fillStyle = 'black';
context.textBaseline = 'middle';
context.textAlign = 'center';
agents[i].drawText(context)
}

agents[i].bounce(videoWidth, videoHeight)
}
}
     window.requestAnimationFrame(tick)
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);   
}
}
startAnimating(5)


const selectSizes = document.getElementById('sizeSelect')
//select sizes function
const changeSize= function(){
let sizeValue = parseInt(selectSizes.value);
console.log(sizeValue);
cell=sizeValue
	if ( video.readyState === 4 ) {
var videoWidth = video.videoWidth;
var videoHeight = video.videoHeight;
// console.log(videoHeight)
var typeCanvasHeight = videoHeight/cell;
var typeCanvasWidth = videoWidth/cell
// console.log(typeCanvasHeight)
// console.log(typeCanvasWidth)
typeCanvas.width = typeCanvasWidth;
typeCanvas.height = typeCanvasHeight;
canvas.height = videoHeight;
canvas.width= videoWidth;
clearInterval(movieInterval);
generateFilter(video)
	}
}
selectSizes.addEventListener('change', ()=>{changeSize()})


const selectFilter = document.getElementById('filterSelect')
selectFilter.addEventListener('change', ()=>{changeFilter()})


function changeFilter(){
console.log(selectFilter.value)
shape = selectFilter.value;
}




const loadVideo= function(){
video  = document.getElementById('video');
switch(videoChoice){
case "troika":
video.src = "./troika.mp4"
break;
case "pedler":
video.src="./koro.mp4"
}
}

loadVideo()

const selectVideo = document.getElementById('videoSelect')
function changeVideo(){
console.log(selectVideo.value)
videoChoice=selectVideo.value;
loadVideo()
setTimeout(() => {
	

if ( video.readyState === 4 ){
var videoWidth = video.videoWidth;
var videoHeight = video.videoHeight;
// console.log(videoHeight)
var typeCanvasHeight = videoHeight/cell;
var typeCanvasWidth = videoWidth/cell
// console.log(typeCanvasHeight)
// console.log(typeCanvasWidth)
typeCanvas.width = typeCanvasWidth;
typeCanvas.height = typeCanvasHeight;
canvas.height = videoHeight;
canvas.width= videoWidth;
clearInterval(movieInterval);
generateFilter(video)
}
}, 50);
}
selectVideo.addEventListener('change', ()=>{changeVideo()})

// selectVideos.addEventListener('change', loadVideo())

const wordsInputForm = document.getElementById('inputWordsForm')
const wordsInput = document.getElementById('inputWords')

wordsInputForm.addEventListener('submit',(e)=>{
e.preventDefault();
e.stopPropagation();

addWords()})

function addWords(){
var word = wordsInput.value;
console.log(wordsInput.value)
if(word.length<20){
inputStrings.push(word)
glyphs=glyphs.concat(inputStrings)
console.log(glyphs)
};
}

const movePixles=(e)=>{
mousePos = getMousePos(canvas, e)

for (let i = 0; i < agents.length; i++) {
	const agent = agents[i];
const dist = agent.getDistance(mousePos);
	if (dist > 200) continue;
		agent.moveBit()
		}	



}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi44YzEyYjcwYzEyNzI4ZTQzNDA2MC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxpRkFBbUI7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNuQkEsaUJBQWlCLG1CQUFPLENBQUMsd0RBQWE7QUFDdEMsbUJBQW1CLG1CQUFPLENBQUMsb0VBQWU7QUFDMUMsY0FBYyxtQkFBTyxDQUFDLGdEQUFTOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEhBQTRILFNBQVM7QUFDckk7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsUUFBUSxpQkFBaUIsV0FBVztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFX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Q3RCO0FBQ0EsTUFBTTtBQUNOLGlDQUFpQyxTQUFTO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDdFBBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9CLHNCQUFzQjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkEscUJBQXFCLG1CQUFPLENBQUMsNkVBQWU7QUFDNUMsZUFBZSxtQkFBTyxDQUFDLDhFQUEyQjtBQUNsRCxhQUFhLG1CQUFPLENBQUMsc0RBQVk7QUFDSDtBQUM5QixXQUFXLDJCQUEyQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxxQkFBcUIsZ0JBQWdCLEtBQUssV0FBVztBQUNyRCw4Q0FBOEMsZ0JBQWdCLEtBQUssV0FBVztBQUM5RTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixjQUFjOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBLENBQUM7QUFDRDs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7Ozs7QUFJQTs7QUFFQTs7QUFFQSxDQUFDOzs7O0FBSUQsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxhQUFhOzs7QUFHekQ7QUFDQSw2Q0FBNkMsZUFBZTs7O0FBRzVEO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDRDQUE0QyxjQUFjOztBQUUxRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9icm93c2VyLW1lZGlhLW1pbWUtdHlwZS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2NhbnZhcy1za2V0Y2gtdXRpbC9yYW5kb20uanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9jYW52YXMtc2tldGNoL2Rpc3QvY2FudmFzLXNrZXRjaC51bWQuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL3NyYy9tYWluLmNzcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9kZWZpbmVkL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2lzLWZ1bmN0aW9uL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvaXMtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2xvYWQtYXNzZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9sb2FkLWFzc2V0L2xvYWRlcnMvY3JlYXRlRmlsZUxvYWRlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2xvYWQtYXNzZXQvbG9hZGVycy9jcmVhdGVNZWRpYUxvYWRlci5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2xvYWQtYXNzZXQvbG9hZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL2xvYWQtYXNzZXQvbG9hZGVycy9sb2FkSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvc2VlZC1yYW5kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9zaW1wbGV4LW5vaXNlL3NpbXBsZXgtbm9pc2UuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL3NyYy9tYWluLmNzcz9kZGQzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi8uL25vZGVfbW9kdWxlcy94dGVuZC9pbW11dGFibGUuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly93ZWJwYWNrcHJhY3RpY2UyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFja3ByYWN0aWNlMi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYnBhY2twcmFjdGljZTIvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc291cmNlZCBmcm9tOlxuLy8gaHR0cDovL3d3dy5sZWFuYmFja3BsYXllci5jb20vdGVzdC9oNW10Lmh0bWxcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS1taW1lL2Jsb2IvbWFzdGVyL3R5cGVzLmpzb25cbnZhciBtaW1lVHlwZXMgPSByZXF1aXJlKCcuL21pbWUtdHlwZXMuanNvbicpXG5cbnZhciBtaW1lTG9va3VwID0ge31cbk9iamVjdC5rZXlzKG1pbWVUeXBlcykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIHZhciBleHRlbnNpb25zID0gbWltZVR5cGVzW2tleV1cbiAgZXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChleHQpIHtcbiAgICBtaW1lTG9va3VwW2V4dF0gPSBrZXlcbiAgfSlcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9va3VwIChleHQpIHtcbiAgaWYgKCFleHQpIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3Qgc3BlY2lmeSBleHRlbnNpb24gc3RyaW5nJylcbiAgaWYgKGV4dC5pbmRleE9mKCcuJykgPT09IDApIHtcbiAgICBleHQgPSBleHQuc3Vic3RyaW5nKDEpXG4gIH1cbiAgcmV0dXJuIG1pbWVMb29rdXBbZXh0LnRvTG93ZXJDYXNlKCldXG59XG4iLCJ2YXIgc2VlZFJhbmRvbSA9IHJlcXVpcmUoJ3NlZWQtcmFuZG9tJyk7XG52YXIgU2ltcGxleE5vaXNlID0gcmVxdWlyZSgnc2ltcGxleC1ub2lzZScpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCdkZWZpbmVkJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVJhbmRvbSAoZGVmYXVsdFNlZWQpIHtcbiAgZGVmYXVsdFNlZWQgPSBkZWZpbmVkKGRlZmF1bHRTZWVkLCBudWxsKTtcbiAgdmFyIGRlZmF1bHRSYW5kb20gPSBNYXRoLnJhbmRvbTtcbiAgdmFyIGN1cnJlbnRTZWVkO1xuICB2YXIgY3VycmVudFJhbmRvbTtcbiAgdmFyIG5vaXNlR2VuZXJhdG9yO1xuICB2YXIgX25leHRHYXVzc2lhbiA9IG51bGw7XG4gIHZhciBfaGFzTmV4dEdhdXNzaWFuID0gZmFsc2U7XG5cbiAgc2V0U2VlZChkZWZhdWx0U2VlZCk7XG5cbiAgcmV0dXJuIHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgY3JlYXRlUmFuZG9tOiBmdW5jdGlvbiAoZGVmYXVsdFNlZWQpIHtcbiAgICAgIHJldHVybiBjcmVhdGVSYW5kb20oZGVmYXVsdFNlZWQpO1xuICAgIH0sXG4gICAgc2V0U2VlZDogc2V0U2VlZCxcbiAgICBnZXRTZWVkOiBnZXRTZWVkLFxuICAgIGdldFJhbmRvbVNlZWQ6IGdldFJhbmRvbVNlZWQsXG4gICAgdmFsdWVOb25aZXJvOiB2YWx1ZU5vblplcm8sXG4gICAgcGVybXV0ZU5vaXNlOiBwZXJtdXRlTm9pc2UsXG4gICAgbm9pc2UxRDogbm9pc2UxRCxcbiAgICBub2lzZTJEOiBub2lzZTJELFxuICAgIG5vaXNlM0Q6IG5vaXNlM0QsXG4gICAgbm9pc2U0RDogbm9pc2U0RCxcbiAgICBzaWduOiBzaWduLFxuICAgIGJvb2xlYW46IGJvb2xlYW4sXG4gICAgY2hhbmNlOiBjaGFuY2UsXG4gICAgcmFuZ2U6IHJhbmdlLFxuICAgIHJhbmdlRmxvb3I6IHJhbmdlRmxvb3IsXG4gICAgcGljazogcGljayxcbiAgICBzaHVmZmxlOiBzaHVmZmxlLFxuICAgIG9uQ2lyY2xlOiBvbkNpcmNsZSxcbiAgICBpbnNpZGVDaXJjbGU6IGluc2lkZUNpcmNsZSxcbiAgICBvblNwaGVyZTogb25TcGhlcmUsXG4gICAgaW5zaWRlU3BoZXJlOiBpbnNpZGVTcGhlcmUsXG4gICAgcXVhdGVybmlvbjogcXVhdGVybmlvbixcbiAgICB3ZWlnaHRlZDogd2VpZ2h0ZWQsXG4gICAgd2VpZ2h0ZWRTZXQ6IHdlaWdodGVkU2V0LFxuICAgIHdlaWdodGVkU2V0SW5kZXg6IHdlaWdodGVkU2V0SW5kZXgsXG4gICAgZ2F1c3NpYW46IGdhdXNzaWFuXG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0U2VlZCAoc2VlZCwgb3B0KSB7XG4gICAgaWYgKHR5cGVvZiBzZWVkID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygc2VlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGN1cnJlbnRTZWVkID0gc2VlZDtcbiAgICAgIGN1cnJlbnRSYW5kb20gPSBzZWVkUmFuZG9tKGN1cnJlbnRTZWVkLCBvcHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50U2VlZCA9IHVuZGVmaW5lZDtcbiAgICAgIGN1cnJlbnRSYW5kb20gPSBkZWZhdWx0UmFuZG9tO1xuICAgIH1cbiAgICBub2lzZUdlbmVyYXRvciA9IGNyZWF0ZU5vaXNlKCk7XG4gICAgX25leHRHYXVzc2lhbiA9IG51bGw7XG4gICAgX2hhc05leHRHYXVzc2lhbiA9IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsdWUgKCkge1xuICAgIHJldHVybiBjdXJyZW50UmFuZG9tKCk7XG4gIH1cblxuICBmdW5jdGlvbiB2YWx1ZU5vblplcm8gKCkge1xuICAgIHZhciB1ID0gMDtcbiAgICB3aGlsZSAodSA9PT0gMCkgdSA9IHZhbHVlKCk7XG4gICAgcmV0dXJuIHU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTZWVkICgpIHtcbiAgICByZXR1cm4gY3VycmVudFNlZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSYW5kb21TZWVkICgpIHtcbiAgICB2YXIgc2VlZCA9IFN0cmluZyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKSk7XG4gICAgcmV0dXJuIHNlZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2lzZSAoKSB7XG4gICAgcmV0dXJuIG5ldyBTaW1wbGV4Tm9pc2UoY3VycmVudFJhbmRvbSk7XG4gIH1cblxuICBmdW5jdGlvbiBwZXJtdXRlTm9pc2UgKCkge1xuICAgIG5vaXNlR2VuZXJhdG9yID0gY3JlYXRlTm9pc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vaXNlMUQgKHgsIGZyZXF1ZW5jeSwgYW1wbGl0dWRlKSB7XG4gICAgaWYgKCFpc0Zpbml0ZSh4KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigneCBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBmcmVxdWVuY3kgPSBkZWZpbmVkKGZyZXF1ZW5jeSwgMSk7XG4gICAgYW1wbGl0dWRlID0gZGVmaW5lZChhbXBsaXR1ZGUsIDEpO1xuICAgIHJldHVybiBhbXBsaXR1ZGUgKiBub2lzZUdlbmVyYXRvci5ub2lzZTJEKHggKiBmcmVxdWVuY3ksIDApO1xuICB9XG5cbiAgZnVuY3Rpb24gbm9pc2UyRCAoeCwgeSwgZnJlcXVlbmN5LCBhbXBsaXR1ZGUpIHtcbiAgICBpZiAoIWlzRmluaXRlKHgpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd4IGNvbXBvbmVudCBmb3Igbm9pc2UoKSBtdXN0IGJlIGZpbml0ZScpO1xuICAgIGlmICghaXNGaW5pdGUoeSkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3kgY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgZnJlcXVlbmN5ID0gZGVmaW5lZChmcmVxdWVuY3ksIDEpO1xuICAgIGFtcGxpdHVkZSA9IGRlZmluZWQoYW1wbGl0dWRlLCAxKTtcbiAgICByZXR1cm4gYW1wbGl0dWRlICogbm9pc2VHZW5lcmF0b3Iubm9pc2UyRCh4ICogZnJlcXVlbmN5LCB5ICogZnJlcXVlbmN5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vaXNlM0QgKHgsIHksIHosIGZyZXF1ZW5jeSwgYW1wbGl0dWRlKSB7XG4gICAgaWYgKCFpc0Zpbml0ZSh4KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigneCBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBpZiAoIWlzRmluaXRlKHkpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd5IGNvbXBvbmVudCBmb3Igbm9pc2UoKSBtdXN0IGJlIGZpbml0ZScpO1xuICAgIGlmICghaXNGaW5pdGUoeikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ogY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgZnJlcXVlbmN5ID0gZGVmaW5lZChmcmVxdWVuY3ksIDEpO1xuICAgIGFtcGxpdHVkZSA9IGRlZmluZWQoYW1wbGl0dWRlLCAxKTtcbiAgICByZXR1cm4gYW1wbGl0dWRlICogbm9pc2VHZW5lcmF0b3Iubm9pc2UzRChcbiAgICAgIHggKiBmcmVxdWVuY3ksXG4gICAgICB5ICogZnJlcXVlbmN5LFxuICAgICAgeiAqIGZyZXF1ZW5jeVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBub2lzZTREICh4LCB5LCB6LCB3LCBmcmVxdWVuY3ksIGFtcGxpdHVkZSkge1xuICAgIGlmICghaXNGaW5pdGUoeCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ggY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgaWYgKCFpc0Zpbml0ZSh5KSkgdGhyb3cgbmV3IFR5cGVFcnJvcigneSBjb21wb25lbnQgZm9yIG5vaXNlKCkgbXVzdCBiZSBmaW5pdGUnKTtcbiAgICBpZiAoIWlzRmluaXRlKHopKSB0aHJvdyBuZXcgVHlwZUVycm9yKCd6IGNvbXBvbmVudCBmb3Igbm9pc2UoKSBtdXN0IGJlIGZpbml0ZScpO1xuICAgIGlmICghaXNGaW5pdGUodykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ3cgY29tcG9uZW50IGZvciBub2lzZSgpIG11c3QgYmUgZmluaXRlJyk7XG4gICAgZnJlcXVlbmN5ID0gZGVmaW5lZChmcmVxdWVuY3ksIDEpO1xuICAgIGFtcGxpdHVkZSA9IGRlZmluZWQoYW1wbGl0dWRlLCAxKTtcbiAgICByZXR1cm4gYW1wbGl0dWRlICogbm9pc2VHZW5lcmF0b3Iubm9pc2U0RChcbiAgICAgIHggKiBmcmVxdWVuY3ksXG4gICAgICB5ICogZnJlcXVlbmN5LFxuICAgICAgeiAqIGZyZXF1ZW5jeSxcbiAgICAgIHcgKiBmcmVxdWVuY3lcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2lnbiAoKSB7XG4gICAgcmV0dXJuIGJvb2xlYW4oKSA/IDEgOiAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJvb2xlYW4gKCkge1xuICAgIHJldHVybiB2YWx1ZSgpID4gMC41O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmNlIChuKSB7XG4gICAgbiA9IGRlZmluZWQobiwgMC41KTtcbiAgICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBuIHRvIGJlIGEgbnVtYmVyJyk7XG4gICAgcmV0dXJuIHZhbHVlKCkgPCBuO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZ2UgKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWluICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgbWF4ICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIGFyZ3VtZW50cyB0byBiZSBudW1iZXJzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmdlRmxvb3IgKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbWluICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgbWF4ICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIGFyZ3VtZW50cyB0byBiZSBudW1iZXJzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IocmFuZ2UobWluLCBtYXgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBpY2sgKGFycmF5KSB7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYXJyYXlbcmFuZ2VGbG9vcigwLCBhcnJheS5sZW5ndGgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNodWZmbGUgKGFycikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBBcnJheSwgZ290ICcgKyB0eXBlb2YgYXJyKTtcbiAgICB9XG5cbiAgICB2YXIgcmFuZDtcbiAgICB2YXIgdG1wO1xuICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIHZhciByZXQgPSBhcnIuc2xpY2UoKTtcbiAgICB3aGlsZSAobGVuKSB7XG4gICAgICByYW5kID0gTWF0aC5mbG9vcih2YWx1ZSgpICogbGVuLS0pO1xuICAgICAgdG1wID0gcmV0W2xlbl07XG4gICAgICByZXRbbGVuXSA9IHJldFtyYW5kXTtcbiAgICAgIHJldFtyYW5kXSA9IHRtcDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2lyY2xlIChyYWRpdXMsIG91dCkge1xuICAgIHJhZGl1cyA9IGRlZmluZWQocmFkaXVzLCAxKTtcbiAgICBvdXQgPSBvdXQgfHwgW107XG4gICAgdmFyIHRoZXRhID0gdmFsdWUoKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgb3V0WzBdID0gcmFkaXVzICogTWF0aC5jb3ModGhldGEpO1xuICAgIG91dFsxXSA9IHJhZGl1cyAqIE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zaWRlQ2lyY2xlIChyYWRpdXMsIG91dCkge1xuICAgIHJhZGl1cyA9IGRlZmluZWQocmFkaXVzLCAxKTtcbiAgICBvdXQgPSBvdXQgfHwgW107XG4gICAgb25DaXJjbGUoMSwgb3V0KTtcbiAgICB2YXIgciA9IHJhZGl1cyAqIE1hdGguc3FydCh2YWx1ZSgpKTtcbiAgICBvdXRbMF0gKj0gcjtcbiAgICBvdXRbMV0gKj0gcjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gb25TcGhlcmUgKHJhZGl1cywgb3V0KSB7XG4gICAgcmFkaXVzID0gZGVmaW5lZChyYWRpdXMsIDEpO1xuICAgIG91dCA9IG91dCB8fCBbXTtcbiAgICB2YXIgdSA9IHZhbHVlKCkgKiBNYXRoLlBJICogMjtcbiAgICB2YXIgdiA9IHZhbHVlKCkgKiAyIC0gMTtcbiAgICB2YXIgcGhpID0gdTtcbiAgICB2YXIgdGhldGEgPSBNYXRoLmFjb3Modik7XG4gICAgb3V0WzBdID0gcmFkaXVzICogTWF0aC5zaW4odGhldGEpICogTWF0aC5jb3MocGhpKTtcbiAgICBvdXRbMV0gPSByYWRpdXMgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLnNpbihwaGkpO1xuICAgIG91dFsyXSA9IHJhZGl1cyAqIE1hdGguY29zKHRoZXRhKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zaWRlU3BoZXJlIChyYWRpdXMsIG91dCkge1xuICAgIHJhZGl1cyA9IGRlZmluZWQocmFkaXVzLCAxKTtcbiAgICBvdXQgPSBvdXQgfHwgW107XG4gICAgdmFyIHUgPSB2YWx1ZSgpICogTWF0aC5QSSAqIDI7XG4gICAgdmFyIHYgPSB2YWx1ZSgpICogMiAtIDE7XG4gICAgdmFyIGsgPSB2YWx1ZSgpO1xuXG4gICAgdmFyIHBoaSA9IHU7XG4gICAgdmFyIHRoZXRhID0gTWF0aC5hY29zKHYpO1xuICAgIHZhciByID0gcmFkaXVzICogTWF0aC5jYnJ0KGspO1xuICAgIG91dFswXSA9IHIgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLmNvcyhwaGkpO1xuICAgIG91dFsxXSA9IHIgKiBNYXRoLnNpbih0aGV0YSkgKiBNYXRoLnNpbihwaGkpO1xuICAgIG91dFsyXSA9IHIgKiBNYXRoLmNvcyh0aGV0YSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1YXRlcm5pb24gKG91dCkge1xuICAgIG91dCA9IG91dCB8fCBbXTtcbiAgICB2YXIgdTEgPSB2YWx1ZSgpO1xuICAgIHZhciB1MiA9IHZhbHVlKCk7XG4gICAgdmFyIHUzID0gdmFsdWUoKTtcblxuICAgIHZhciBzcTEgPSBNYXRoLnNxcnQoMSAtIHUxKTtcbiAgICB2YXIgc3EyID0gTWF0aC5zcXJ0KHUxKTtcblxuICAgIHZhciB0aGV0YTEgPSBNYXRoLlBJICogMiAqIHUyO1xuICAgIHZhciB0aGV0YTIgPSBNYXRoLlBJICogMiAqIHUzO1xuXG4gICAgdmFyIHggPSBNYXRoLnNpbih0aGV0YTEpICogc3ExO1xuICAgIHZhciB5ID0gTWF0aC5jb3ModGhldGExKSAqIHNxMTtcbiAgICB2YXIgeiA9IE1hdGguc2luKHRoZXRhMikgKiBzcTI7XG4gICAgdmFyIHcgPSBNYXRoLmNvcyh0aGV0YTIpICogc3EyO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IHc7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdlaWdodGVkU2V0IChzZXQpIHtcbiAgICBzZXQgPSBzZXQgfHwgW107XG4gICAgaWYgKHNldC5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgIHJldHVybiBzZXRbd2VpZ2h0ZWRTZXRJbmRleChzZXQpXS52YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdlaWdodGVkU2V0SW5kZXggKHNldCkge1xuICAgIHNldCA9IHNldCB8fCBbXTtcbiAgICBpZiAoc2V0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xO1xuICAgIHJldHVybiB3ZWlnaHRlZChzZXQubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICByZXR1cm4gcy53ZWlnaHQ7XG4gICAgfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2VpZ2h0ZWQgKHdlaWdodHMpIHtcbiAgICB3ZWlnaHRzID0gd2VpZ2h0cyB8fCBbXTtcbiAgICBpZiAod2VpZ2h0cy5sZW5ndGggPT09IDApIHJldHVybiAtMTtcbiAgICB2YXIgdG90YWxXZWlnaHQgPSAwO1xuICAgIHZhciBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IHdlaWdodHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsV2VpZ2h0ICs9IHdlaWdodHNbaV07XG4gICAgfVxuXG4gICAgaWYgKHRvdGFsV2VpZ2h0IDw9IDApIHRocm93IG5ldyBFcnJvcignV2VpZ2h0cyBtdXN0IHN1bSB0byA+IDAnKTtcblxuICAgIHZhciByYW5kb20gPSB2YWx1ZSgpICogdG90YWxXZWlnaHQ7XG4gICAgZm9yIChpID0gMDsgaSA8IHdlaWdodHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyYW5kb20gPCB3ZWlnaHRzW2ldKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgICAgcmFuZG9tIC09IHdlaWdodHNbaV07XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2F1c3NpYW4gKG1lYW4sIHN0YW5kYXJkRGVyaXZhdGlvbikge1xuICAgIG1lYW4gPSBkZWZpbmVkKG1lYW4sIDApO1xuICAgIHN0YW5kYXJkRGVyaXZhdGlvbiA9IGRlZmluZWQoc3RhbmRhcmREZXJpdmF0aW9uLCAxKTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVuamRrLW1pcnJvci9qZGs3dS1qZGsvYmxvYi9mNGQ4MDk1N2U4OWExOWEyOWJiOWY5ODA3ZDJhMjgzNTFlZDdmN2RmL3NyYy9zaGFyZS9jbGFzc2VzL2phdmEvdXRpbC9SYW5kb20uamF2YSNMNDk2XG4gICAgaWYgKF9oYXNOZXh0R2F1c3NpYW4pIHtcbiAgICAgIF9oYXNOZXh0R2F1c3NpYW4gPSBmYWxzZTtcbiAgICAgIHZhciByZXN1bHQgPSBfbmV4dEdhdXNzaWFuO1xuICAgICAgX25leHRHYXVzc2lhbiA9IG51bGw7XG4gICAgICByZXR1cm4gbWVhbiArIHN0YW5kYXJkRGVyaXZhdGlvbiAqIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHYxID0gMDtcbiAgICAgIHZhciB2MiA9IDA7XG4gICAgICB2YXIgcyA9IDA7XG4gICAgICBkbyB7XG4gICAgICAgIHYxID0gdmFsdWUoKSAqIDIgLSAxOyAvLyBiZXR3ZWVuIC0xIGFuZCAxXG4gICAgICAgIHYyID0gdmFsdWUoKSAqIDIgLSAxOyAvLyBiZXR3ZWVuIC0xIGFuZCAxXG4gICAgICAgIHMgPSB2MSAqIHYxICsgdjIgKiB2MjtcbiAgICAgIH0gd2hpbGUgKHMgPj0gMSB8fCBzID09PSAwKTtcbiAgICAgIHZhciBtdWx0aXBsaWVyID0gTWF0aC5zcXJ0KC0yICogTWF0aC5sb2cocykgLyBzKTtcbiAgICAgIF9uZXh0R2F1c3NpYW4gPSAodjIgKiBtdWx0aXBsaWVyKTtcbiAgICAgIF9oYXNOZXh0R2F1c3NpYW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIG1lYW4gKyBzdGFuZGFyZERlcml2YXRpb24gKiAodjEgKiBtdWx0aXBsaWVyKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVSYW5kb20oKTtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC5jYW52YXNTa2V0Y2ggPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkge1xuXG5cdC8qXG5cdG9iamVjdC1hc3NpZ25cblx0KGMpIFNpbmRyZSBTb3JodXNcblx0QGxpY2Vuc2UgTUlUXG5cdCovXG5cdC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5cdHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXHR2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHR2YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblx0ZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdFx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gT2JqZWN0KHZhbCk7XG5cdH1cblxuXHRmdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdFx0dmFyIHRlc3QyID0ge307XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHZhciBvYmplY3RBc3NpZ24gPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0XHR2YXIgZnJvbTtcblx0XHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHRcdHZhciBzeW1ib2xzO1xuXG5cdFx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRvO1xuXHR9O1xuXG5cdHZhciBjb21tb25qc0dsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDoge307XG5cblx0ZnVuY3Rpb24gY3JlYXRlQ29tbW9uanNNb2R1bGUoZm4sIG1vZHVsZSkge1xuXHRcdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcblx0fVxuXG5cdHZhciBicm93c2VyID1cblx0ICBjb21tb25qc0dsb2JhbC5wZXJmb3JtYW5jZSAmJlxuXHQgIGNvbW1vbmpzR2xvYmFsLnBlcmZvcm1hbmNlLm5vdyA/IGZ1bmN0aW9uIG5vdygpIHtcblx0ICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKVxuXHQgIH0gOiBEYXRlLm5vdyB8fCBmdW5jdGlvbiBub3coKSB7XG5cdCAgICByZXR1cm4gK25ldyBEYXRlXG5cdCAgfTtcblxuXHR2YXIgaXNQcm9taXNlXzEgPSBpc1Byb21pc2U7XG5cblx0ZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuXHQgIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xuXHR9XG5cblx0dmFyIGlzRG9tID0gaXNOb2RlO1xuXG5cdGZ1bmN0aW9uIGlzTm9kZSAodmFsKSB7XG5cdCAgcmV0dXJuICghdmFsIHx8IHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKVxuXHQgICAgPyBmYWxzZVxuXHQgICAgOiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHdpbmRvdy5Ob2RlID09PSAnb2JqZWN0Jylcblx0ICAgICAgPyAodmFsIGluc3RhbmNlb2Ygd2luZG93Lk5vZGUpXG5cdCAgICAgIDogKHR5cGVvZiB2YWwubm9kZVR5cGUgPT09ICdudW1iZXInKSAmJlxuXHQgICAgICAgICh0eXBlb2YgdmFsLm5vZGVOYW1lID09PSAnc3RyaW5nJylcblx0fVxuXG5cdGZ1bmN0aW9uIGdldENsaWVudEFQSSgpIHtcblx0ICAgIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3dbJ2NhbnZhcy1za2V0Y2gtY2xpJ107XG5cdH1cblxuXHRmdW5jdGlvbiBkZWZpbmVkKCkge1xuXHQgICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG5cdCAgICBmb3IgKHZhciBpID0gMDtpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgaWYgKGFyZ3VtZW50cyQxW2ldICE9IG51bGwpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGFyZ3VtZW50cyQxW2ldO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblxuXHRmdW5jdGlvbiBpc0Jyb3dzZXIoKSB7XG5cdCAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblx0fVxuXG5cdGZ1bmN0aW9uIGlzV2ViR0xDb250ZXh0KGN0eCkge1xuXHQgICAgcmV0dXJuIHR5cGVvZiBjdHguY2xlYXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGN0eC5jbGVhckNvbG9yID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBjdHguYnVmZmVyRGF0YSA9PT0gJ2Z1bmN0aW9uJztcblx0fVxuXG5cdGZ1bmN0aW9uIGlzQ2FudmFzKGVsZW1lbnQpIHtcblx0ICAgIHJldHVybiBpc0RvbShlbGVtZW50KSAmJiAvY2FudmFzL2kudGVzdChlbGVtZW50Lm5vZGVOYW1lKSAmJiB0eXBlb2YgZWxlbWVudC5nZXRDb250ZXh0ID09PSAnZnVuY3Rpb24nO1xuXHR9XG5cblx0dmFyIGtleXMgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRzKSB7XG5cdGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJ1xuXHQgID8gT2JqZWN0LmtleXMgOiBzaGltO1xuXG5cdGV4cG9ydHMuc2hpbSA9IHNoaW07XG5cdGZ1bmN0aW9uIHNoaW0gKG9iaikge1xuXHQgIHZhciBrZXlzID0gW107XG5cdCAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG5cdCAgcmV0dXJuIGtleXM7XG5cdH1cblx0fSk7XG5cdHZhciBrZXlzXzEgPSBrZXlzLnNoaW07XG5cblx0dmFyIGlzX2FyZ3VtZW50cyA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcblx0dmFyIHN1cHBvcnRzQXJndW1lbnRzQ2xhc3MgPSAoZnVuY3Rpb24oKXtcblx0ICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50cylcblx0fSkoKSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuXHRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBzdXBwb3J0c0FyZ3VtZW50c0NsYXNzID8gc3VwcG9ydGVkIDogdW5zdXBwb3J0ZWQ7XG5cblx0ZXhwb3J0cy5zdXBwb3J0ZWQgPSBzdXBwb3J0ZWQ7XG5cdGZ1bmN0aW9uIHN1cHBvcnRlZChvYmplY3QpIHtcblx0ICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cdH1cblx0ZXhwb3J0cy51bnN1cHBvcnRlZCA9IHVuc3VwcG9ydGVkO1xuXHRmdW5jdGlvbiB1bnN1cHBvcnRlZChvYmplY3Qpe1xuXHQgIHJldHVybiBvYmplY3QgJiZcblx0ICAgIHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcgJiZcblx0ICAgIHR5cGVvZiBvYmplY3QubGVuZ3RoID09ICdudW1iZXInICYmXG5cdCAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnY2FsbGVlJykgJiZcblx0ICAgICFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCAnY2FsbGVlJykgfHxcblx0ICAgIGZhbHNlO1xuXHR9fSk7XG5cdHZhciBpc19hcmd1bWVudHNfMSA9IGlzX2FyZ3VtZW50cy5zdXBwb3J0ZWQ7XG5cdHZhciBpc19hcmd1bWVudHNfMiA9IGlzX2FyZ3VtZW50cy51bnN1cHBvcnRlZDtcblxuXHR2YXIgZGVlcEVxdWFsXzEgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlKSB7XG5cdHZhciBwU2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cblxuXG5cdHZhciBkZWVwRXF1YWwgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKSB7XG5cdCAgaWYgKCFvcHRzKSBvcHRzID0ge307XG5cdCAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG5cdCAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcblx0ICAgIHJldHVybiB0cnVlO1xuXG5cdCAgfSBlbHNlIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlICYmIGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuXHQgICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuXHQgIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jyxcblx0ICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuXHQgIH0gZWxzZSBpZiAoIWFjdHVhbCB8fCAhZXhwZWN0ZWQgfHwgdHlwZW9mIGFjdHVhbCAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT0gJ29iamVjdCcpIHtcblx0ICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGFjdHVhbCA9PT0gZXhwZWN0ZWQgOiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cblx0ICAvLyA3LjQuIEZvciBhbGwgb3RoZXIgT2JqZWN0IHBhaXJzLCBpbmNsdWRpbmcgQXJyYXkgb2JqZWN0cywgZXF1aXZhbGVuY2UgaXNcblx0ICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcblx0ICAvLyB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG5cdCAgLy8gKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksIGVxdWl2YWxlbnQgdmFsdWVzIGZvciBldmVyeVxuXHQgIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG5cdCAgLy8gYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzKTtcblx0ICB9XG5cdH07XG5cblx0ZnVuY3Rpb24gaXNVbmRlZmluZWRPck51bGwodmFsdWUpIHtcblx0ICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGlzQnVmZmVyICh4KSB7XG5cdCAgaWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgeC5sZW5ndGggIT09ICdudW1iZXInKSByZXR1cm4gZmFsc2U7XG5cdCAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdCAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHJldHVybiBmYWxzZTtcblx0ICByZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMpIHtcblx0ICB2YXIgaSwga2V5O1xuXHQgIGlmIChpc1VuZGVmaW5lZE9yTnVsbChhKSB8fCBpc1VuZGVmaW5lZE9yTnVsbChiKSlcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG5cdCAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuXHQgIC8vfn5+SSd2ZSBtYW5hZ2VkIHRvIGJyZWFrIE9iamVjdC5rZXlzIHRocm91Z2ggc2NyZXd5IGFyZ3VtZW50cyBwYXNzaW5nLlxuXHQgIC8vICAgQ29udmVydGluZyB0byBhcnJheSBzb2x2ZXMgdGhlIHByb2JsZW0uXG5cdCAgaWYgKGlzX2FyZ3VtZW50cyhhKSkge1xuXHQgICAgaWYgKCFpc19hcmd1bWVudHMoYikpIHtcblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfVxuXHQgICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuXHQgICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuXHQgICAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBvcHRzKTtcblx0ICB9XG5cdCAgaWYgKGlzQnVmZmVyKGEpKSB7XG5cdCAgICBpZiAoIWlzQnVmZmVyKGIpKSB7XG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgIH1cblx0ICAgIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIGlmIChhW2ldICE9PSBiW2ldKSByZXR1cm4gZmFsc2U7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9XG5cdCAgdHJ5IHtcblx0ICAgIHZhciBrYSA9IGtleXMoYSksXG5cdCAgICAgICAga2IgPSBrZXlzKGIpO1xuXHQgIH0gY2F0Y2ggKGUpIHsvL2hhcHBlbnMgd2hlbiBvbmUgaXMgYSBzdHJpbmcgbGl0ZXJhbCBhbmQgdGhlIG90aGVyIGlzbid0XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdCAgfVxuXHQgIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXNcblx0ICAvLyBoYXNPd25Qcm9wZXJ0eSlcblx0ICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcblx0ICAgIHJldHVybiBmYWxzZTtcblx0ICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuXHQgIGthLnNvcnQoKTtcblx0ICBrYi5zb3J0KCk7XG5cdCAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuXHQgIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICBpZiAoa2FbaV0gIT0ga2JbaV0pXG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9XG5cdCAgLy9lcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnkgY29ycmVzcG9uZGluZyBrZXksIGFuZFxuXHQgIC8vfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuXHQgIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICBrZXkgPSBrYVtpXTtcblx0ICAgIGlmICghZGVlcEVxdWFsKGFba2V5XSwgYltrZXldLCBvcHRzKSkgcmV0dXJuIGZhbHNlO1xuXHQgIH1cblx0ICByZXR1cm4gdHlwZW9mIGEgPT09IHR5cGVvZiBiO1xuXHR9XG5cdH0pO1xuXG5cdHZhciBkYXRlZm9ybWF0ID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuXHQvKlxuXHQgKiBEYXRlIEZvcm1hdCAxLjIuM1xuXHQgKiAoYykgMjAwNy0yMDA5IFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuXHQgKiBNSVQgbGljZW5zZVxuXHQgKlxuXHQgKiBJbmNsdWRlcyBlbmhhbmNlbWVudHMgYnkgU2NvdHQgVHJlbmRhIDxzY290dC50cmVuZGEubmV0PlxuXHQgKiBhbmQgS3JpcyBLb3dhbCA8Y2l4YXIuY29tL35rcmlzLmtvd2FsLz5cblx0ICpcblx0ICogQWNjZXB0cyBhIGRhdGUsIGEgbWFzaywgb3IgYSBkYXRlIGFuZCBhIG1hc2suXG5cdCAqIFJldHVybnMgYSBmb3JtYXR0ZWQgdmVyc2lvbiBvZiB0aGUgZ2l2ZW4gZGF0ZS5cblx0ICogVGhlIGRhdGUgZGVmYXVsdHMgdG8gdGhlIGN1cnJlbnQgZGF0ZS90aW1lLlxuXHQgKiBUaGUgbWFzayBkZWZhdWx0cyB0byBkYXRlRm9ybWF0Lm1hc2tzLmRlZmF1bHQuXG5cdCAqL1xuXG5cdChmdW5jdGlvbihnbG9iYWwpIHtcblxuXHQgIHZhciBkYXRlRm9ybWF0ID0gKGZ1bmN0aW9uKCkge1xuXHQgICAgICB2YXIgdG9rZW4gPSAvZHsxLDR9fG17MSw0fXx5eSg/Onl5KT98KFtIaE1zVHRdKVxcMT98W0xsb1NaV05dfFwiW15cIl0qXCJ8J1teJ10qJy9nO1xuXHQgICAgICB2YXIgdGltZXpvbmUgPSAvXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZztcblx0ICAgICAgdmFyIHRpbWV6b25lQ2xpcCA9IC9bXi0rXFxkQS1aXS9nO1xuXHQgIFxuXHQgICAgICAvLyBSZWdleGVzIGFuZCBzdXBwb3J0aW5nIGZ1bmN0aW9ucyBhcmUgY2FjaGVkIHRocm91Z2ggY2xvc3VyZVxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGUsIG1hc2ssIHV0YywgZ210KSB7XG5cdCAgXG5cdCAgICAgICAgLy8gWW91IGNhbid0IHByb3ZpZGUgdXRjIGlmIHlvdSBza2lwIG90aGVyIGFyZ3MgKHVzZSB0aGUgJ1VUQzonIG1hc2sgcHJlZml4KVxuXHQgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIGtpbmRPZihkYXRlKSA9PT0gJ3N0cmluZycgJiYgIS9cXGQvLnRlc3QoZGF0ZSkpIHtcblx0ICAgICAgICAgIG1hc2sgPSBkYXRlO1xuXHQgICAgICAgICAgZGF0ZSA9IHVuZGVmaW5lZDtcblx0ICAgICAgICB9XG5cdCAgXG5cdCAgICAgICAgZGF0ZSA9IGRhdGUgfHwgbmV3IERhdGU7XG5cdCAgXG5cdCAgICAgICAgaWYoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkpIHtcblx0ICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcblx0ICAgICAgICB9XG5cdCAgXG5cdCAgICAgICAgaWYgKGlzTmFOKGRhdGUpKSB7XG5cdCAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgZGF0ZScpO1xuXHQgICAgICAgIH1cblx0ICBcblx0ICAgICAgICBtYXNrID0gU3RyaW5nKGRhdGVGb3JtYXQubWFza3NbbWFza10gfHwgbWFzayB8fCBkYXRlRm9ybWF0Lm1hc2tzWydkZWZhdWx0J10pO1xuXHQgIFxuXHQgICAgICAgIC8vIEFsbG93IHNldHRpbmcgdGhlIHV0Yy9nbXQgYXJndW1lbnQgdmlhIHRoZSBtYXNrXG5cdCAgICAgICAgdmFyIG1hc2tTbGljZSA9IG1hc2suc2xpY2UoMCwgNCk7XG5cdCAgICAgICAgaWYgKG1hc2tTbGljZSA9PT0gJ1VUQzonIHx8IG1hc2tTbGljZSA9PT0gJ0dNVDonKSB7XG5cdCAgICAgICAgICBtYXNrID0gbWFzay5zbGljZSg0KTtcblx0ICAgICAgICAgIHV0YyA9IHRydWU7XG5cdCAgICAgICAgICBpZiAobWFza1NsaWNlID09PSAnR01UOicpIHtcblx0ICAgICAgICAgICAgZ210ID0gdHJ1ZTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgXG5cdCAgICAgICAgdmFyIF8gPSB1dGMgPyAnZ2V0VVRDJyA6ICdnZXQnO1xuXHQgICAgICAgIHZhciBkID0gZGF0ZVtfICsgJ0RhdGUnXSgpO1xuXHQgICAgICAgIHZhciBEID0gZGF0ZVtfICsgJ0RheSddKCk7XG5cdCAgICAgICAgdmFyIG0gPSBkYXRlW18gKyAnTW9udGgnXSgpO1xuXHQgICAgICAgIHZhciB5ID0gZGF0ZVtfICsgJ0Z1bGxZZWFyJ10oKTtcblx0ICAgICAgICB2YXIgSCA9IGRhdGVbXyArICdIb3VycyddKCk7XG5cdCAgICAgICAgdmFyIE0gPSBkYXRlW18gKyAnTWludXRlcyddKCk7XG5cdCAgICAgICAgdmFyIHMgPSBkYXRlW18gKyAnU2Vjb25kcyddKCk7XG5cdCAgICAgICAgdmFyIEwgPSBkYXRlW18gKyAnTWlsbGlzZWNvbmRzJ10oKTtcblx0ICAgICAgICB2YXIgbyA9IHV0YyA/IDAgOiBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cdCAgICAgICAgdmFyIFcgPSBnZXRXZWVrKGRhdGUpO1xuXHQgICAgICAgIHZhciBOID0gZ2V0RGF5T2ZXZWVrKGRhdGUpO1xuXHQgICAgICAgIHZhciBmbGFncyA9IHtcblx0ICAgICAgICAgIGQ6ICAgIGQsXG5cdCAgICAgICAgICBkZDogICBwYWQoZCksXG5cdCAgICAgICAgICBkZGQ6ICBkYXRlRm9ybWF0LmkxOG4uZGF5TmFtZXNbRF0sXG5cdCAgICAgICAgICBkZGRkOiBkYXRlRm9ybWF0LmkxOG4uZGF5TmFtZXNbRCArIDddLFxuXHQgICAgICAgICAgbTogICAgbSArIDEsXG5cdCAgICAgICAgICBtbTogICBwYWQobSArIDEpLFxuXHQgICAgICAgICAgbW1tOiAgZGF0ZUZvcm1hdC5pMThuLm1vbnRoTmFtZXNbbV0sXG5cdCAgICAgICAgICBtbW1tOiBkYXRlRm9ybWF0LmkxOG4ubW9udGhOYW1lc1ttICsgMTJdLFxuXHQgICAgICAgICAgeXk6ICAgU3RyaW5nKHkpLnNsaWNlKDIpLFxuXHQgICAgICAgICAgeXl5eTogeSxcblx0ICAgICAgICAgIGg6ICAgIEggJSAxMiB8fCAxMixcblx0ICAgICAgICAgIGhoOiAgIHBhZChIICUgMTIgfHwgMTIpLFxuXHQgICAgICAgICAgSDogICAgSCxcblx0ICAgICAgICAgIEhIOiAgIHBhZChIKSxcblx0ICAgICAgICAgIE06ICAgIE0sXG5cdCAgICAgICAgICBNTTogICBwYWQoTSksXG5cdCAgICAgICAgICBzOiAgICBzLFxuXHQgICAgICAgICAgc3M6ICAgcGFkKHMpLFxuXHQgICAgICAgICAgbDogICAgcGFkKEwsIDMpLFxuXHQgICAgICAgICAgTDogICAgcGFkKE1hdGgucm91bmQoTCAvIDEwKSksXG5cdCAgICAgICAgICB0OiAgICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzBdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1sxXSxcblx0ICAgICAgICAgIHR0OiAgIEggPCAxMiA/IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbMl0gOiBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzNdLFxuXHQgICAgICAgICAgVDogICAgSCA8IDEyID8gZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s0XSA6IGRhdGVGb3JtYXQuaTE4bi50aW1lTmFtZXNbNV0sXG5cdCAgICAgICAgICBUVDogICBIIDwgMTIgPyBkYXRlRm9ybWF0LmkxOG4udGltZU5hbWVzWzZdIDogZGF0ZUZvcm1hdC5pMThuLnRpbWVOYW1lc1s3XSxcblx0ICAgICAgICAgIFo6ICAgIGdtdCA/ICdHTVQnIDogdXRjID8gJ1VUQycgOiAoU3RyaW5nKGRhdGUpLm1hdGNoKHRpbWV6b25lKSB8fCBbJyddKS5wb3AoKS5yZXBsYWNlKHRpbWV6b25lQ2xpcCwgJycpLFxuXHQgICAgICAgICAgbzogICAgKG8gPiAwID8gJy0nIDogJysnKSArIHBhZChNYXRoLmZsb29yKE1hdGguYWJzKG8pIC8gNjApICogMTAwICsgTWF0aC5hYnMobykgJSA2MCwgNCksXG5cdCAgICAgICAgICBTOiAgICBbJ3RoJywgJ3N0JywgJ25kJywgJ3JkJ11bZCAlIDEwID4gMyA/IDAgOiAoZCAlIDEwMCAtIGQgJSAxMCAhPSAxMCkgKiBkICUgMTBdLFxuXHQgICAgICAgICAgVzogICAgVyxcblx0ICAgICAgICAgIE46ICAgIE5cblx0ICAgICAgICB9O1xuXHQgIFxuXHQgICAgICAgIHJldHVybiBtYXNrLnJlcGxhY2UodG9rZW4sIGZ1bmN0aW9uIChtYXRjaCkge1xuXHQgICAgICAgICAgaWYgKG1hdGNoIGluIGZsYWdzKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmbGFnc1ttYXRjaF07XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgICByZXR1cm4gbWF0Y2guc2xpY2UoMSwgbWF0Y2gubGVuZ3RoIC0gMSk7XG5cdCAgICAgICAgfSk7XG5cdCAgICAgIH07XG5cdCAgICB9KSgpO1xuXG5cdCAgZGF0ZUZvcm1hdC5tYXNrcyA9IHtcblx0ICAgICdkZWZhdWx0JzogICAgICAgICAgICAgICAnZGRkIG1tbSBkZCB5eXl5IEhIOk1NOnNzJyxcblx0ICAgICdzaG9ydERhdGUnOiAgICAgICAgICAgICAnbS9kL3l5Jyxcblx0ICAgICdtZWRpdW1EYXRlJzogICAgICAgICAgICAnbW1tIGQsIHl5eXknLFxuXHQgICAgJ2xvbmdEYXRlJzogICAgICAgICAgICAgICdtbW1tIGQsIHl5eXknLFxuXHQgICAgJ2Z1bGxEYXRlJzogICAgICAgICAgICAgICdkZGRkLCBtbW1tIGQsIHl5eXknLFxuXHQgICAgJ3Nob3J0VGltZSc6ICAgICAgICAgICAgICdoOk1NIFRUJyxcblx0ICAgICdtZWRpdW1UaW1lJzogICAgICAgICAgICAnaDpNTTpzcyBUVCcsXG5cdCAgICAnbG9uZ1RpbWUnOiAgICAgICAgICAgICAgJ2g6TU06c3MgVFQgWicsXG5cdCAgICAnaXNvRGF0ZSc6ICAgICAgICAgICAgICAgJ3l5eXktbW0tZGQnLFxuXHQgICAgJ2lzb1RpbWUnOiAgICAgICAgICAgICAgICdISDpNTTpzcycsXG5cdCAgICAnaXNvRGF0ZVRpbWUnOiAgICAgICAgICAgJ3l5eXktbW0tZGRcXCdUXFwnSEg6TU06c3NvJyxcblx0ICAgICdpc29VdGNEYXRlVGltZSc6ICAgICAgICAnVVRDOnl5eXktbW0tZGRcXCdUXFwnSEg6TU06c3NcXCdaXFwnJyxcblx0ICAgICdleHBpcmVzSGVhZGVyRm9ybWF0JzogICAnZGRkLCBkZCBtbW0geXl5eSBISDpNTTpzcyBaJ1xuXHQgIH07XG5cblx0ICAvLyBJbnRlcm5hdGlvbmFsaXphdGlvbiBzdHJpbmdzXG5cdCAgZGF0ZUZvcm1hdC5pMThuID0ge1xuXHQgICAgZGF5TmFtZXM6IFtcblx0ICAgICAgJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCcsXG5cdCAgICAgICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSdcblx0ICAgIF0sXG5cdCAgICBtb250aE5hbWVzOiBbXG5cdCAgICAgICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYycsXG5cdCAgICAgICdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ1xuXHQgICAgXSxcblx0ICAgIHRpbWVOYW1lczogW1xuXHQgICAgICAnYScsICdwJywgJ2FtJywgJ3BtJywgJ0EnLCAnUCcsICdBTScsICdQTSdcblx0ICAgIF1cblx0ICB9O1xuXG5cdGZ1bmN0aW9uIHBhZCh2YWwsIGxlbikge1xuXHQgIHZhbCA9IFN0cmluZyh2YWwpO1xuXHQgIGxlbiA9IGxlbiB8fCAyO1xuXHQgIHdoaWxlICh2YWwubGVuZ3RoIDwgbGVuKSB7XG5cdCAgICB2YWwgPSAnMCcgKyB2YWw7XG5cdCAgfVxuXHQgIHJldHVybiB2YWw7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBJU08gODYwMSB3ZWVrIG51bWJlclxuXHQgKiBCYXNlZCBvbiBjb21tZW50cyBmcm9tXG5cdCAqIGh0dHA6Ly90ZWNoYmxvZy5wcm9jdXJpb3Mubmwvay9uNjE4L25ld3Mvdmlldy8zMzc5Ni8xNDg2My9DYWxjdWxhdGUtSVNPLTg2MDEtd2Vlay1hbmQteWVhci1pbi1qYXZhc2NyaXB0Lmh0bWxcblx0ICpcblx0ICogQHBhcmFtICB7T2JqZWN0fSBgZGF0ZWBcblx0ICogQHJldHVybiB7TnVtYmVyfVxuXHQgKi9cblx0ZnVuY3Rpb24gZ2V0V2VlayhkYXRlKSB7XG5cdCAgLy8gUmVtb3ZlIHRpbWUgY29tcG9uZW50cyBvZiBkYXRlXG5cdCAgdmFyIHRhcmdldFRodXJzZGF5ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcblxuXHQgIC8vIENoYW5nZSBkYXRlIHRvIFRodXJzZGF5IHNhbWUgd2Vla1xuXHQgIHRhcmdldFRodXJzZGF5LnNldERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RGF0ZSgpIC0gKCh0YXJnZXRUaHVyc2RheS5nZXREYXkoKSArIDYpICUgNykgKyAzKTtcblxuXHQgIC8vIFRha2UgSmFudWFyeSA0dGggYXMgaXQgaXMgYWx3YXlzIGluIHdlZWsgMSAoc2VlIElTTyA4NjAxKVxuXHQgIHZhciBmaXJzdFRodXJzZGF5ID0gbmV3IERhdGUodGFyZ2V0VGh1cnNkYXkuZ2V0RnVsbFllYXIoKSwgMCwgNCk7XG5cblx0ICAvLyBDaGFuZ2UgZGF0ZSB0byBUaHVyc2RheSBzYW1lIHdlZWtcblx0ICBmaXJzdFRodXJzZGF5LnNldERhdGUoZmlyc3RUaHVyc2RheS5nZXREYXRlKCkgLSAoKGZpcnN0VGh1cnNkYXkuZ2V0RGF5KCkgKyA2KSAlIDcpICsgMyk7XG5cblx0ICAvLyBDaGVjayBpZiBkYXlsaWdodC1zYXZpbmctdGltZS1zd2l0Y2ggb2NjdXJyZWQgYW5kIGNvcnJlY3QgZm9yIGl0XG5cdCAgdmFyIGRzID0gdGFyZ2V0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGZpcnN0VGh1cnNkYXkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblx0ICB0YXJnZXRUaHVyc2RheS5zZXRIb3Vycyh0YXJnZXRUaHVyc2RheS5nZXRIb3VycygpIC0gZHMpO1xuXG5cdCAgLy8gTnVtYmVyIG9mIHdlZWtzIGJldHdlZW4gdGFyZ2V0IFRodXJzZGF5IGFuZCBmaXJzdCBUaHVyc2RheVxuXHQgIHZhciB3ZWVrRGlmZiA9ICh0YXJnZXRUaHVyc2RheSAtIGZpcnN0VGh1cnNkYXkpIC8gKDg2NDAwMDAwKjcpO1xuXHQgIHJldHVybiAxICsgTWF0aC5mbG9vcih3ZWVrRGlmZik7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IElTTy04NjAxIG51bWVyaWMgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBvZiB0aGUgd2Vla1xuXHQgKiAxIChmb3IgTW9uZGF5KSB0aHJvdWdoIDcgKGZvciBTdW5kYXkpXG5cdCAqIFxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IGBkYXRlYFxuXHQgKiBAcmV0dXJuIHtOdW1iZXJ9XG5cdCAqL1xuXHRmdW5jdGlvbiBnZXREYXlPZldlZWsoZGF0ZSkge1xuXHQgIHZhciBkb3cgPSBkYXRlLmdldERheSgpO1xuXHQgIGlmKGRvdyA9PT0gMCkge1xuXHQgICAgZG93ID0gNztcblx0ICB9XG5cdCAgcmV0dXJuIGRvdztcblx0fVxuXG5cdC8qKlxuXHQgKiBraW5kLW9mIHNob3J0Y3V0XG5cdCAqIEBwYXJhbSAgeyp9IHZhbFxuXHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdCAqL1xuXHRmdW5jdGlvbiBraW5kT2YodmFsKSB7XG5cdCAgaWYgKHZhbCA9PT0gbnVsbCkge1xuXHQgICAgcmV0dXJuICdudWxsJztcblx0ICB9XG5cblx0ICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcblx0ICAgIHJldHVybiAndW5kZWZpbmVkJztcblx0ICB9XG5cblx0ICBpZiAodHlwZW9mIHZhbCAhPT0gJ29iamVjdCcpIHtcblx0ICAgIHJldHVybiB0eXBlb2YgdmFsO1xuXHQgIH1cblxuXHQgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcblx0ICAgIHJldHVybiAnYXJyYXknO1xuXHQgIH1cblxuXHQgIHJldHVybiB7fS50b1N0cmluZy5jYWxsKHZhbClcblx0ICAgIC5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cblx0ICBpZiAodHlwZW9mIHVuZGVmaW5lZCA9PT0gJ2Z1bmN0aW9uJyAmJiB1bmRlZmluZWQuYW1kKSB7XG5cdCAgICB1bmRlZmluZWQoZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gZGF0ZUZvcm1hdDtcblx0ICAgIH0pO1xuXHQgIH0gZWxzZSB7XG5cdCAgICBtb2R1bGUuZXhwb3J0cyA9IGRhdGVGb3JtYXQ7XG5cdCAgfVxuXHR9KShjb21tb25qc0dsb2JhbCk7XG5cdH0pO1xuXG5cdC8qIVxuXHQgKiByZXBlYXQtc3RyaW5nIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9yZXBlYXQtc3RyaW5nPlxuXHQgKlxuXHQgKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG5cdCAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cblx0ICovXG5cblx0LyoqXG5cdCAqIFJlc3VsdHMgY2FjaGVcblx0ICovXG5cblx0dmFyIHJlcyA9ICcnO1xuXHR2YXIgY2FjaGU7XG5cblx0LyoqXG5cdCAqIEV4cG9zZSBgcmVwZWF0YFxuXHQgKi9cblxuXHR2YXIgcmVwZWF0U3RyaW5nID0gcmVwZWF0O1xuXG5cdC8qKlxuXHQgKiBSZXBlYXQgdGhlIGdpdmVuIGBzdHJpbmdgIHRoZSBzcGVjaWZpZWQgYG51bWJlcmBcblx0ICogb2YgdGltZXMuXG5cdCAqXG5cdCAqICoqRXhhbXBsZToqKlxuXHQgKlxuXHQgKiBgYGBqc1xuXHQgKiB2YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuXHQgKiByZXBlYXQoJ0EnLCA1KTtcblx0ICogLy89PiBBQUFBQVxuXHQgKiBgYGBcblx0ICpcblx0ICogQHBhcmFtIHtTdHJpbmd9IGBzdHJpbmdgIFRoZSBzdHJpbmcgdG8gcmVwZWF0XG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBgbnVtYmVyYCBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nXG5cdCAqIEByZXR1cm4ge1N0cmluZ30gUmVwZWF0ZWQgc3RyaW5nXG5cdCAqIEBhcGkgcHVibGljXG5cdCAqL1xuXG5cdGZ1bmN0aW9uIHJlcGVhdChzdHIsIG51bSkge1xuXHQgIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHQgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0ICB9XG5cblx0ICAvLyBjb3ZlciBjb21tb24sIHF1aWNrIHVzZSBjYXNlc1xuXHQgIGlmIChudW0gPT09IDEpIHJldHVybiBzdHI7XG5cdCAgaWYgKG51bSA9PT0gMikgcmV0dXJuIHN0ciArIHN0cjtcblxuXHQgIHZhciBtYXggPSBzdHIubGVuZ3RoICogbnVtO1xuXHQgIGlmIChjYWNoZSAhPT0gc3RyIHx8IHR5cGVvZiBjYWNoZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgIGNhY2hlID0gc3RyO1xuXHQgICAgcmVzID0gJyc7XG5cdCAgfSBlbHNlIGlmIChyZXMubGVuZ3RoID49IG1heCkge1xuXHQgICAgcmV0dXJuIHJlcy5zdWJzdHIoMCwgbWF4KTtcblx0ICB9XG5cblx0ICB3aGlsZSAobWF4ID4gcmVzLmxlbmd0aCAmJiBudW0gPiAxKSB7XG5cdCAgICBpZiAobnVtICYgMSkge1xuXHQgICAgICByZXMgKz0gc3RyO1xuXHQgICAgfVxuXG5cdCAgICBudW0gPj49IDE7XG5cdCAgICBzdHIgKz0gc3RyO1xuXHQgIH1cblxuXHQgIHJlcyArPSBzdHI7XG5cdCAgcmVzID0gcmVzLnN1YnN0cigwLCBtYXgpO1xuXHQgIHJldHVybiByZXM7XG5cdH1cblxuXHR2YXIgcGFkTGVmdCA9IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBudW0sIGNoKSB7XG5cdCAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG5cblx0ICBpZiAodHlwZW9mIG51bSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0ICAgIHJldHVybiBzdHI7XG5cdCAgfVxuXG5cdCAgaWYgKGNoID09PSAwKSB7XG5cdCAgICBjaCA9ICcwJztcblx0ICB9IGVsc2UgaWYgKGNoKSB7XG5cdCAgICBjaCA9IGNoLnRvU3RyaW5nKCk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIGNoID0gJyAnO1xuXHQgIH1cblxuXHQgIHJldHVybiByZXBlYXRTdHJpbmcoY2gsIG51bSAtIHN0ci5sZW5ndGgpICsgc3RyO1xuXHR9O1xuXG5cdHZhciBub29wID0gZnVuY3Rpb24gKCkge307XG5cdHZhciBsaW5rO1xuXHR2YXIgZGVmYXVsdEV4dHMgPSB7XG5cdCAgICBleHRlbnNpb246ICcnLFxuXHQgICAgcHJlZml4OiAnJyxcblx0ICAgIHN1ZmZpeDogJydcblx0fTtcblx0dmFyIHN1cHBvcnRlZEVuY29kaW5ncyA9IFsnaW1hZ2UvcG5nJywnaW1hZ2UvanBlZycsJ2ltYWdlL3dlYnAnXTtcblx0ZnVuY3Rpb24gc3RyZWFtKGlzU3RhcnQsIG9wdHMpIHtcblx0ICAgIGlmICggb3B0cyA9PT0gdm9pZCAwICkgb3B0cyA9IHt9O1xuXG5cdCAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHQgICAgICAgIG9wdHMgPSBvYmplY3RBc3NpZ24oe30sIGRlZmF1bHRFeHRzLCBvcHRzKTtcblx0ICAgICAgICB2YXIgZmlsZW5hbWUgPSByZXNvbHZlRmlsZW5hbWUoT2JqZWN0LmFzc2lnbih7fSwgb3B0cywge1xuXHQgICAgICAgICAgICBleHRlbnNpb246ICcnLFxuXHQgICAgICAgICAgICBmcmFtZTogdW5kZWZpbmVkXG5cdCAgICAgICAgfSkpO1xuXHQgICAgICAgIHZhciBmdW5jID0gaXNTdGFydCA/ICdzdHJlYW1TdGFydCcgOiAnc3RyZWFtRW5kJztcblx0ICAgICAgICB2YXIgY2xpZW50ID0gZ2V0Q2xpZW50QVBJKCk7XG5cdCAgICAgICAgaWYgKGNsaWVudCAmJiBjbGllbnQub3V0cHV0ICYmIHR5cGVvZiBjbGllbnRbZnVuY10gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGNsaWVudFtmdW5jXShvYmplY3RBc3NpZ24oe30sIG9wdHMsIHtcblx0ICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZVxuXHQgICAgICAgICAgICB9KSkudGhlbihmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHJlc29sdmUoZXYpOyB9KTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh7XG5cdCAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZW5hbWUsXG5cdCAgICAgICAgICAgICAgICBjbGllbnQ6IGZhbHNlXG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gc3RyZWFtU3RhcnQob3B0cykge1xuXHQgICAgaWYgKCBvcHRzID09PSB2b2lkIDAgKSBvcHRzID0ge307XG5cblx0ICAgIHJldHVybiBzdHJlYW0odHJ1ZSwgb3B0cyk7XG5cdH1cblxuXHRmdW5jdGlvbiBzdHJlYW1FbmQob3B0cykge1xuXHQgICAgaWYgKCBvcHRzID09PSB2b2lkIDAgKSBvcHRzID0ge307XG5cblx0ICAgIHJldHVybiBzdHJlYW0oZmFsc2UsIG9wdHMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXhwb3J0Q2FudmFzKGNhbnZhcywgb3B0KSB7XG5cdCAgICBpZiAoIG9wdCA9PT0gdm9pZCAwICkgb3B0ID0ge307XG5cblx0ICAgIHZhciBlbmNvZGluZyA9IG9wdC5lbmNvZGluZyB8fCAnaW1hZ2UvcG5nJztcblx0ICAgIGlmICghc3VwcG9ydGVkRW5jb2RpbmdzLmluY2x1ZGVzKGVuY29kaW5nKSkgXG5cdCAgICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoKFwiSW52YWxpZCBjYW52YXMgZW5jb2RpbmcgXCIgKyBlbmNvZGluZykpOyB9XG5cdCAgICB2YXIgZXh0ZW5zaW9uID0gKGVuY29kaW5nLnNwbGl0KCcvJylbMV0gfHwgJycpLnJlcGxhY2UoL2pwZWcvaSwgJ2pwZycpO1xuXHQgICAgaWYgKGV4dGVuc2lvbikgXG5cdCAgICAgICAgeyBleHRlbnNpb24gPSAoXCIuXCIgKyBleHRlbnNpb24pLnRvTG93ZXJDYXNlKCk7IH1cblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24sXG5cdCAgICAgICAgdHlwZTogZW5jb2RpbmcsXG5cdCAgICAgICAgZGF0YVVSTDogY2FudmFzLnRvRGF0YVVSTChlbmNvZGluZywgb3B0LmVuY29kaW5nUXVhbGl0eSlcblx0ICAgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVCbG9iRnJvbURhdGFVUkwoZGF0YVVSTCkge1xuXHQgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdCAgICAgICAgdmFyIHNwbGl0SW5kZXggPSBkYXRhVVJMLmluZGV4T2YoJywnKTtcblx0ICAgICAgICBpZiAoc3BsaXRJbmRleCA9PT0gLTEpIHtcblx0ICAgICAgICAgICAgcmVzb2x2ZShuZXcgd2luZG93LkJsb2IoKSk7XG5cdCAgICAgICAgICAgIHJldHVybjtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGJhc2U2NCA9IGRhdGFVUkwuc2xpY2Uoc3BsaXRJbmRleCArIDEpO1xuXHQgICAgICAgIHZhciBieXRlU3RyaW5nID0gd2luZG93LmF0b2IoYmFzZTY0KTtcblx0ICAgICAgICB2YXIgdHlwZSA9IGRhdGFVUkwuc2xpY2UoMCwgc3BsaXRJbmRleCk7XG5cdCAgICAgICAgdmFyIG1pbWVNYXRjaCA9IC9kYXRhOihbXjtdKykvLmV4ZWModHlwZSk7XG5cdCAgICAgICAgdmFyIG1pbWUgPSAobWltZU1hdGNoID8gbWltZU1hdGNoWzFdIDogJycpIHx8IHVuZGVmaW5lZDtcblx0ICAgICAgICB2YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoYnl0ZVN0cmluZy5sZW5ndGgpO1xuXHQgICAgICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGFiKTtcblx0ICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgYnl0ZVN0cmluZy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICBpYVtpXSA9IGJ5dGVTdHJpbmcuY2hhckNvZGVBdChpKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmVzb2x2ZShuZXcgd2luZG93LkJsb2IoW2FiXSwge1xuXHQgICAgICAgICAgICB0eXBlOiBtaW1lXG5cdCAgICAgICAgfSkpO1xuXHQgICAgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzYXZlRGF0YVVSTChkYXRhVVJMLCBvcHRzKSB7XG5cdCAgICBpZiAoIG9wdHMgPT09IHZvaWQgMCApIG9wdHMgPSB7fTtcblxuXHQgICAgcmV0dXJuIGNyZWF0ZUJsb2JGcm9tRGF0YVVSTChkYXRhVVJMKS50aGVuKGZ1bmN0aW9uIChibG9iKSB7IHJldHVybiBzYXZlQmxvYihibG9iLCBvcHRzKTsgfSk7XG5cdH1cblxuXHRmdW5jdGlvbiBzYXZlQmxvYihibG9iLCBvcHRzKSB7XG5cdCAgICBpZiAoIG9wdHMgPT09IHZvaWQgMCApIG9wdHMgPSB7fTtcblxuXHQgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdCAgICAgICAgb3B0cyA9IG9iamVjdEFzc2lnbih7fSwgZGVmYXVsdEV4dHMsIG9wdHMpO1xuXHQgICAgICAgIHZhciBmaWxlbmFtZSA9IG9wdHMuZmlsZW5hbWU7XG5cdCAgICAgICAgdmFyIGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuXHQgICAgICAgIGlmIChjbGllbnQgJiYgdHlwZW9mIGNsaWVudC5zYXZlQmxvYiA9PT0gJ2Z1bmN0aW9uJyAmJiBjbGllbnQub3V0cHV0KSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjbGllbnQuc2F2ZUJsb2IoYmxvYiwgb2JqZWN0QXNzaWduKHt9LCBvcHRzLCB7XG5cdCAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZW5hbWVcblx0ICAgICAgICAgICAgfSkpLnRoZW4oZnVuY3Rpb24gKGV2KSB7IHJldHVybiByZXNvbHZlKGV2KTsgfSk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgaWYgKCFsaW5rKSB7XG5cdCAgICAgICAgICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHQgICAgICAgICAgICAgICAgbGluay5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cdCAgICAgICAgICAgICAgICBsaW5rLnRhcmdldCA9ICdfYmxhbmsnO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcblx0ICAgICAgICAgICAgbGluay5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdCAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG5cdCAgICAgICAgICAgIGxpbmsub25jbGljayA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICBsaW5rLm9uY2xpY2sgPSBub29wO1xuXHQgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoYmxvYik7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmsucGFyZW50RWxlbWVudCkgXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHsgbGluay5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGxpbmspOyB9XG5cdCAgICAgICAgICAgICAgICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcblx0ICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGZpbGVuYW1lLFxuXHQgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IGZhbHNlXG5cdCAgICAgICAgICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNhdmVGaWxlKGRhdGEsIG9wdHMpIHtcblx0ICAgIGlmICggb3B0cyA9PT0gdm9pZCAwICkgb3B0cyA9IHt9O1xuXG5cdCAgICB2YXIgcGFydHMgPSBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXTtcblx0ICAgIHZhciBibG9iID0gbmV3IHdpbmRvdy5CbG9iKHBhcnRzLCB7XG5cdCAgICAgICAgdHlwZTogb3B0cy50eXBlIHx8ICcnXG5cdCAgICB9KTtcblx0ICAgIHJldHVybiBzYXZlQmxvYihibG9iLCBvcHRzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldFRpbWVTdGFtcCgpIHtcblx0ICAgIHZhciBkYXRlRm9ybWF0U3RyID0gXCJ5eXl5Lm1tLmRkLUhILk1NLnNzXCI7XG5cdCAgICByZXR1cm4gZGF0ZWZvcm1hdChuZXcgRGF0ZSgpLCBkYXRlRm9ybWF0U3RyKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc29sdmVGaWxlbmFtZShvcHQpIHtcblx0ICAgIGlmICggb3B0ID09PSB2b2lkIDAgKSBvcHQgPSB7fTtcblxuXHQgICAgb3B0ID0gb2JqZWN0QXNzaWduKHt9LCBvcHQpO1xuXHQgICAgaWYgKHR5cGVvZiBvcHQuZmlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHJldHVybiBvcHQuZmlsZShvcHQpO1xuXHQgICAgfSBlbHNlIGlmIChvcHQuZmlsZSkge1xuXHQgICAgICAgIHJldHVybiBvcHQuZmlsZTtcblx0ICAgIH1cblx0ICAgIHZhciBmcmFtZSA9IG51bGw7XG5cdCAgICB2YXIgZXh0ZW5zaW9uID0gJyc7XG5cdCAgICBpZiAodHlwZW9mIG9wdC5leHRlbnNpb24gPT09ICdzdHJpbmcnKSBcblx0ICAgICAgICB7IGV4dGVuc2lvbiA9IG9wdC5leHRlbnNpb247IH1cblx0ICAgIGlmICh0eXBlb2Ygb3B0LmZyYW1lID09PSAnbnVtYmVyJykge1xuXHQgICAgICAgIHZhciB0b3RhbEZyYW1lcztcblx0ICAgICAgICBpZiAodHlwZW9mIG9wdC50b3RhbEZyYW1lcyA9PT0gJ251bWJlcicpIHtcblx0ICAgICAgICAgICAgdG90YWxGcmFtZXMgPSBvcHQudG90YWxGcmFtZXM7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdG90YWxGcmFtZXMgPSBNYXRoLm1heCgxMDAwMCwgb3B0LmZyYW1lKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZnJhbWUgPSBwYWRMZWZ0KFN0cmluZyhvcHQuZnJhbWUpLCBTdHJpbmcodG90YWxGcmFtZXMpLmxlbmd0aCwgJzAnKTtcblx0ICAgIH1cblx0ICAgIHZhciBsYXllclN0ciA9IGlzRmluaXRlKG9wdC50b3RhbExheWVycykgJiYgaXNGaW5pdGUob3B0LmxheWVyKSAmJiBvcHQudG90YWxMYXllcnMgPiAxID8gKFwiXCIgKyAob3B0LmxheWVyKSkgOiAnJztcblx0ICAgIGlmIChmcmFtZSAhPSBudWxsKSB7XG5cdCAgICAgICAgcmV0dXJuIFtsYXllclN0cixmcmFtZV0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJy0nKSArIGV4dGVuc2lvbjtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdmFyIGRlZmF1bHRGaWxlTmFtZSA9IG9wdC50aW1lU3RhbXA7XG5cdCAgICAgICAgcmV0dXJuIFtvcHQucHJlZml4LG9wdC5uYW1lIHx8IGRlZmF1bHRGaWxlTmFtZSxsYXllclN0cixvcHQuaGFzaCxvcHQuc3VmZml4XS5maWx0ZXIoQm9vbGVhbikuam9pbignLScpICsgZXh0ZW5zaW9uO1xuXHQgICAgfVxuXHR9XG5cblx0dmFyIGNvbW1vblR5cG9zID0ge1xuXHQgICAgZGltZW5zaW9uOiAnZGltZW5zaW9ucycsXG5cdCAgICBhbmltYXRlZDogJ2FuaW1hdGUnLFxuXHQgICAgYW5pbWF0aW5nOiAnYW5pbWF0ZScsXG5cdCAgICB1bml0OiAndW5pdHMnLFxuXHQgICAgUDU6ICdwNScsXG5cdCAgICBwaXhlbGxhdGVkOiAncGl4ZWxhdGVkJyxcblx0ICAgIGxvb3Bpbmc6ICdsb29wJyxcblx0ICAgIHBpeGVsUGVySW5jaDogJ3BpeGVscydcblx0fTtcblx0dmFyIGFsbEtleXMgPSBbJ2RpbWVuc2lvbnMnLCd1bml0cycsJ3BpeGVsc1BlckluY2gnLCdvcmllbnRhdGlvbicsJ3NjYWxlVG9GaXQnLFxuXHQgICAgJ3NjYWxlVG9WaWV3JywnYmxlZWQnLCdwaXhlbFJhdGlvJywnZXhwb3J0UGl4ZWxSYXRpbycsJ21heFBpeGVsUmF0aW8nLCdzY2FsZUNvbnRleHQnLFxuXHQgICAgJ3Jlc2l6ZUNhbnZhcycsJ3N0eWxlQ2FudmFzJywnY2FudmFzJywnY29udGV4dCcsJ2F0dHJpYnV0ZXMnLCdwYXJlbnQnLCdmaWxlJyxcblx0ICAgICduYW1lJywncHJlZml4Jywnc3VmZml4JywnYW5pbWF0ZScsJ3BsYXlpbmcnLCdsb29wJywnZHVyYXRpb24nLCd0b3RhbEZyYW1lcycsXG5cdCAgICAnZnBzJywncGxheWJhY2tSYXRlJywndGltZVNjYWxlJywnZnJhbWUnLCd0aW1lJywnZmx1c2gnLCdwaXhlbGF0ZWQnLCdob3RrZXlzJyxcblx0ICAgICdwNScsJ2lkJywnc2NhbGVUb0ZpdFBhZGRpbmcnLCdkYXRhJywncGFyYW1zJywnZW5jb2RpbmcnLCdlbmNvZGluZ1F1YWxpdHknXTtcblx0dmFyIGNoZWNrU2V0dGluZ3MgPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcblx0ICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoc2V0dGluZ3MpO1xuXHQgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0ICAgICAgICBpZiAoa2V5IGluIGNvbW1vblR5cG9zKSB7XG5cdCAgICAgICAgICAgIHZhciBhY3R1YWwgPSBjb21tb25UeXBvc1trZXldO1xuXHQgICAgICAgICAgICBjb25zb2xlLndhcm4oKFwiW2NhbnZhcy1za2V0Y2hdIENvdWxkIG5vdCByZWNvZ25pemUgdGhlIHNldHRpbmcgXFxcIlwiICsga2V5ICsgXCJcXFwiLCBkaWQgeW91IG1lYW4gXFxcIlwiICsgYWN0dWFsICsgXCJcXFwiP1wiKSk7XG5cdCAgICAgICAgfSBlbHNlIGlmICghYWxsS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG5cdCAgICAgICAgICAgIGNvbnNvbGUud2FybigoXCJbY2FudmFzLXNrZXRjaF0gQ291bGQgbm90IHJlY29nbml6ZSB0aGUgc2V0dGluZyBcXFwiXCIgKyBrZXkgKyBcIlxcXCJcIikpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGtleWJvYXJkU2hvcnRjdXRzIChvcHQpIHtcblx0ICAgIGlmICggb3B0ID09PSB2b2lkIDAgKSBvcHQgPSB7fTtcblxuXHQgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAoZXYpIHtcblx0ICAgICAgICBpZiAoIW9wdC5lbmFibGVkKCkpIFxuXHQgICAgICAgICAgICB7IHJldHVybjsgfVxuXHQgICAgICAgIHZhciBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcblx0ICAgICAgICBpZiAoZXYua2V5Q29kZSA9PT0gODMgJiYgIWV2LmFsdEtleSAmJiAoZXYubWV0YUtleSB8fCBldi5jdHJsS2V5KSkge1xuXHQgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICAgICAgICBvcHQuc2F2ZShldik7XG5cdCAgICAgICAgfSBlbHNlIGlmIChldi5rZXlDb2RlID09PSAzMikge1xuXHQgICAgICAgICAgICBvcHQudG9nZ2xlUGxheShldik7XG5cdCAgICAgICAgfSBlbHNlIGlmIChjbGllbnQgJiYgIWV2LmFsdEtleSAmJiBldi5rZXlDb2RlID09PSA3NSAmJiAoZXYubWV0YUtleSB8fCBldi5jdHJsS2V5KSkge1xuXHQgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICAgICAgICBvcHQuY29tbWl0KGV2KTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgdmFyIGF0dGFjaCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuXHQgICAgfTtcblx0ICAgIHZhciBkZXRhY2ggPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKTtcblx0ICAgIH07XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIGF0dGFjaDogYXR0YWNoLFxuXHQgICAgICAgIGRldGFjaDogZGV0YWNoXG5cdCAgICB9O1xuXHR9XG5cblx0dmFyIGRlZmF1bHRVbml0cyA9ICdtbSc7XG5cdHZhciBkYXRhID0gW1sncG9zdGNhcmQnLDEwMS42LDE1Mi40XSxbJ3Bvc3Rlci1zbWFsbCcsMjgwLDQzMF0sWydwb3N0ZXInLDQ2MCw2MTBdLFxuXHQgICAgWydwb3N0ZXItbGFyZ2UnLDYxMCw5MTBdLFsnYnVzaW5lc3MtY2FyZCcsNTAuOCw4OC45XSxbJzJyJyw2NCw4OV0sWyczcicsODksMTI3XSxcblx0ICAgIFsnNHInLDEwMiwxNTJdLFsnNXInLDEyNywxNzhdLFsnNnInLDE1MiwyMDNdLFsnOHInLDIwMywyNTRdLFsnMTByJywyNTQsMzA1XSxbJzExcicsXG5cdCAgICAyNzksMzU2XSxbJzEycicsMzA1LDM4MV0sWydhMCcsODQxLDExODldLFsnYTEnLDU5NCw4NDFdLFsnYTInLDQyMCw1OTRdLFsnYTMnLFxuXHQgICAgMjk3LDQyMF0sWydhNCcsMjEwLDI5N10sWydhNScsMTQ4LDIxMF0sWydhNicsMTA1LDE0OF0sWydhNycsNzQsMTA1XSxbJ2E4Jyw1Mixcblx0ICAgIDc0XSxbJ2E5JywzNyw1Ml0sWydhMTAnLDI2LDM3XSxbJzJhMCcsMTE4OSwxNjgyXSxbJzRhMCcsMTY4MiwyMzc4XSxbJ2IwJywxMDAwLFxuXHQgICAgMTQxNF0sWydiMScsNzA3LDEwMDBdLFsnYjErJyw3MjAsMTAyMF0sWydiMicsNTAwLDcwN10sWydiMisnLDUyMCw3MjBdLFsnYjMnLDM1Myxcblx0ICAgIDUwMF0sWydiNCcsMjUwLDM1M10sWydiNScsMTc2LDI1MF0sWydiNicsMTI1LDE3Nl0sWydiNycsODgsMTI1XSxbJ2I4Jyw2Miw4OF0sXG5cdCAgICBbJ2I5Jyw0NCw2Ml0sWydiMTAnLDMxLDQ0XSxbJ2IxMScsMjIsMzJdLFsnYjEyJywxNiwyMl0sWydjMCcsOTE3LDEyOTddLFsnYzEnLFxuXHQgICAgNjQ4LDkxN10sWydjMicsNDU4LDY0OF0sWydjMycsMzI0LDQ1OF0sWydjNCcsMjI5LDMyNF0sWydjNScsMTYyLDIyOV0sWydjNicsMTE0LFxuXHQgICAgMTYyXSxbJ2M3Jyw4MSwxMTRdLFsnYzgnLDU3LDgxXSxbJ2M5Jyw0MCw1N10sWydjMTAnLDI4LDQwXSxbJ2MxMScsMjIsMzJdLFsnYzEyJyxcblx0ICAgIDE2LDIyXSxbJ2hhbGYtbGV0dGVyJyw1LjUsOC41LCdpbiddLFsnbGV0dGVyJyw4LjUsMTEsJ2luJ10sWydsZWdhbCcsOC41LDE0LCdpbiddLFxuXHQgICAgWydqdW5pb3ItbGVnYWwnLDUsOCwnaW4nXSxbJ2xlZGdlcicsMTEsMTcsJ2luJ10sWyd0YWJsb2lkJywxMSwxNywnaW4nXSxbJ2Fuc2ktYScsXG5cdCAgICA4LjUsMTEuMCwnaW4nXSxbJ2Fuc2ktYicsMTEuMCwxNy4wLCdpbiddLFsnYW5zaS1jJywxNy4wLDIyLjAsJ2luJ10sWydhbnNpLWQnLFxuXHQgICAgMjIuMCwzNC4wLCdpbiddLFsnYW5zaS1lJywzNC4wLDQ0LjAsJ2luJ10sWydhcmNoLWEnLDksMTIsJ2luJ10sWydhcmNoLWInLDEyLDE4LFxuXHQgICAgJ2luJ10sWydhcmNoLWMnLDE4LDI0LCdpbiddLFsnYXJjaC1kJywyNCwzNiwnaW4nXSxbJ2FyY2gtZScsMzYsNDgsJ2luJ10sWydhcmNoLWUxJyxcblx0ICAgIDMwLDQyLCdpbiddLFsnYXJjaC1lMicsMjYsMzgsJ2luJ10sWydhcmNoLWUzJywyNywzOSwnaW4nXV07XG5cdHZhciBwYXBlclNpemVzID0gZGF0YS5yZWR1Y2UoZnVuY3Rpb24gKGRpY3QsIHByZXNldCkge1xuXHQgICAgdmFyIGl0ZW0gPSB7XG5cdCAgICAgICAgdW5pdHM6IHByZXNldFszXSB8fCBkZWZhdWx0VW5pdHMsXG5cdCAgICAgICAgZGltZW5zaW9uczogW3ByZXNldFsxXSxwcmVzZXRbMl1dXG5cdCAgICB9O1xuXHQgICAgZGljdFtwcmVzZXRbMF1dID0gaXRlbTtcblx0ICAgIGRpY3RbcHJlc2V0WzBdLnJlcGxhY2UoLy0vZywgJyAnKV0gPSBpdGVtO1xuXHQgICAgcmV0dXJuIGRpY3Q7XG5cdH0sIHt9KVxuXG5cdHZhciBkZWZpbmVkJDEgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICAgIGlmIChhcmd1bWVudHNbaV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGFyZ3VtZW50c1tpXTtcblx0ICAgIH1cblx0fTtcblxuXHR2YXIgdW5pdHMgPSBbICdtbScsICdjbScsICdtJywgJ3BjJywgJ3B0JywgJ2luJywgJ2Z0JywgJ3B4JyBdO1xuXG5cdHZhciBjb252ZXJzaW9ucyA9IHtcblx0ICAvLyBtZXRyaWNcblx0ICBtOiB7XG5cdCAgICBzeXN0ZW06ICdtZXRyaWMnLFxuXHQgICAgZmFjdG9yOiAxXG5cdCAgfSxcblx0ICBjbToge1xuXHQgICAgc3lzdGVtOiAnbWV0cmljJyxcblx0ICAgIGZhY3RvcjogMSAvIDEwMFxuXHQgIH0sXG5cdCAgbW06IHtcblx0ICAgIHN5c3RlbTogJ21ldHJpYycsXG5cdCAgICBmYWN0b3I6IDEgLyAxMDAwXG5cdCAgfSxcblx0ICAvLyBpbXBlcmlhbFxuXHQgIHB0OiB7XG5cdCAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG5cdCAgICBmYWN0b3I6IDEgLyA3MlxuXHQgIH0sXG5cdCAgcGM6IHtcblx0ICAgIHN5c3RlbTogJ2ltcGVyaWFsJyxcblx0ICAgIGZhY3RvcjogMSAvIDZcblx0ICB9LFxuXHQgIGluOiB7XG5cdCAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG5cdCAgICBmYWN0b3I6IDFcblx0ICB9LFxuXHQgIGZ0OiB7XG5cdCAgICBzeXN0ZW06ICdpbXBlcmlhbCcsXG5cdCAgICBmYWN0b3I6IDEyXG5cdCAgfVxuXHR9O1xuXG5cdGNvbnN0IGFuY2hvcnMgPSB7XG5cdCAgbWV0cmljOiB7XG5cdCAgICB1bml0OiAnbScsXG5cdCAgICByYXRpbzogMSAvIDAuMDI1NFxuXHQgIH0sXG5cdCAgaW1wZXJpYWw6IHtcblx0ICAgIHVuaXQ6ICdpbicsXG5cdCAgICByYXRpbzogMC4wMjU0XG5cdCAgfVxuXHR9O1xuXG5cdGZ1bmN0aW9uIHJvdW5kICh2YWx1ZSwgZGVjaW1hbHMpIHtcblx0ICByZXR1cm4gTnVtYmVyKE1hdGgucm91bmQodmFsdWUgKyAnZScgKyBkZWNpbWFscykgKyAnZS0nICsgZGVjaW1hbHMpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY29udmVydERpc3RhbmNlICh2YWx1ZSwgZnJvbVVuaXQsIHRvVW5pdCwgb3B0cykge1xuXHQgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHRocm93IG5ldyBFcnJvcignVmFsdWUgbXVzdCBiZSBhIGZpbml0ZSBudW1iZXInKTtcblx0ICBpZiAoIWZyb21Vbml0IHx8ICF0b1VuaXQpIHRocm93IG5ldyBFcnJvcignTXVzdCBzcGVjaWZ5IGZyb20gYW5kIHRvIHVuaXRzJyk7XG5cblx0ICBvcHRzID0gb3B0cyB8fCB7fTtcblx0ICB2YXIgcGl4ZWxzUGVySW5jaCA9IGRlZmluZWQkMShvcHRzLnBpeGVsc1BlckluY2gsIDk2KTtcblx0ICB2YXIgcHJlY2lzaW9uID0gb3B0cy5wcmVjaXNpb247XG5cdCAgdmFyIHJvdW5kUGl4ZWwgPSBvcHRzLnJvdW5kUGl4ZWwgIT09IGZhbHNlO1xuXG5cdCAgZnJvbVVuaXQgPSBmcm9tVW5pdC50b0xvd2VyQ2FzZSgpO1xuXHQgIHRvVW5pdCA9IHRvVW5pdC50b0xvd2VyQ2FzZSgpO1xuXG5cdCAgaWYgKHVuaXRzLmluZGV4T2YoZnJvbVVuaXQpID09PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyb20gdW5pdCBcIicgKyBmcm9tVW5pdCArICdcIiwgbXVzdCBiZSBvbmUgb2Y6ICcgKyB1bml0cy5qb2luKCcsICcpKTtcblx0ICBpZiAodW5pdHMuaW5kZXhPZih0b1VuaXQpID09PSAtMSkgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZyb20gdW5pdCBcIicgKyB0b1VuaXQgKyAnXCIsIG11c3QgYmUgb25lIG9mOiAnICsgdW5pdHMuam9pbignLCAnKSk7XG5cblx0ICBpZiAoZnJvbVVuaXQgPT09IHRvVW5pdCkge1xuXHQgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byBjb252ZXJ0IGZyb20gQSB0byBCIHNpbmNlIHRoZXkgYXJlIHRoZSBzYW1lIGFscmVhZHlcblx0ICAgIHJldHVybiB2YWx1ZTtcblx0ICB9XG5cblx0ICB2YXIgdG9GYWN0b3IgPSAxO1xuXHQgIHZhciBmcm9tRmFjdG9yID0gMTtcblx0ICB2YXIgaXNUb1BpeGVsID0gZmFsc2U7XG5cblx0ICBpZiAoZnJvbVVuaXQgPT09ICdweCcpIHtcblx0ICAgIGZyb21GYWN0b3IgPSAxIC8gcGl4ZWxzUGVySW5jaDtcblx0ICAgIGZyb21Vbml0ID0gJ2luJztcblx0ICB9XG5cdCAgaWYgKHRvVW5pdCA9PT0gJ3B4Jykge1xuXHQgICAgaXNUb1BpeGVsID0gdHJ1ZTtcblx0ICAgIHRvRmFjdG9yID0gcGl4ZWxzUGVySW5jaDtcblx0ICAgIHRvVW5pdCA9ICdpbic7XG5cdCAgfVxuXG5cdCAgdmFyIGZyb21Vbml0RGF0YSA9IGNvbnZlcnNpb25zW2Zyb21Vbml0XTtcblx0ICB2YXIgdG9Vbml0RGF0YSA9IGNvbnZlcnNpb25zW3RvVW5pdF07XG5cblx0ICAvLyBzb3VyY2UgdG8gYW5jaG9yIGluc2lkZSBzb3VyY2UncyBzeXN0ZW1cblx0ICB2YXIgYW5jaG9yID0gdmFsdWUgKiBmcm9tVW5pdERhdGEuZmFjdG9yICogZnJvbUZhY3RvcjtcblxuXHQgIC8vIGlmIHN5c3RlbXMgZGlmZmVyLCBjb252ZXJ0IG9uZSB0byBhbm90aGVyXG5cdCAgaWYgKGZyb21Vbml0RGF0YS5zeXN0ZW0gIT09IHRvVW5pdERhdGEuc3lzdGVtKSB7XG5cdCAgICAvLyByZWd1bGFyICdtJyB0byAnaW4nIGFuZCBzbyBmb3J0aFxuXHQgICAgYW5jaG9yICo9IGFuY2hvcnNbZnJvbVVuaXREYXRhLnN5c3RlbV0ucmF0aW87XG5cdCAgfVxuXG5cdCAgdmFyIHJlc3VsdCA9IGFuY2hvciAvIHRvVW5pdERhdGEuZmFjdG9yICogdG9GYWN0b3I7XG5cdCAgaWYgKGlzVG9QaXhlbCAmJiByb3VuZFBpeGVsKSB7XG5cdCAgICByZXN1bHQgPSBNYXRoLnJvdW5kKHJlc3VsdCk7XG5cdCAgfSBlbHNlIGlmICh0eXBlb2YgcHJlY2lzaW9uID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShwcmVjaXNpb24pKSB7XG5cdCAgICByZXN1bHQgPSByb3VuZChyZXN1bHQsIHByZWNpc2lvbik7XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHR2YXIgY29udmVydExlbmd0aCA9IGNvbnZlcnREaXN0YW5jZTtcblx0dmFyIHVuaXRzXzEgPSB1bml0cztcblx0Y29udmVydExlbmd0aC51bml0cyA9IHVuaXRzXzE7XG5cblx0ZnVuY3Rpb24gZ2V0RGltZW5zaW9uc0Zyb21QcmVzZXQoZGltZW5zaW9ucywgdW5pdHNUbywgcGl4ZWxzUGVySW5jaCkge1xuXHQgICAgaWYgKCB1bml0c1RvID09PSB2b2lkIDAgKSB1bml0c1RvID0gJ3B4Jztcblx0ICAgIGlmICggcGl4ZWxzUGVySW5jaCA9PT0gdm9pZCAwICkgcGl4ZWxzUGVySW5jaCA9IDcyO1xuXG5cdCAgICBpZiAodHlwZW9mIGRpbWVuc2lvbnMgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgdmFyIGtleSA9IGRpbWVuc2lvbnMudG9Mb3dlckNhc2UoKTtcblx0ICAgICAgICBpZiAoIShrZXkgaW4gcGFwZXJTaXplcykpIHtcblx0ICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChcIlRoZSBkaW1lbnNpb24gcHJlc2V0IFxcXCJcIiArIGRpbWVuc2lvbnMgKyBcIlxcXCIgaXMgbm90IHN1cHBvcnRlZCBvciBjb3VsZCBub3QgYmUgZm91bmQ7IHRyeSB1c2luZyBhNCwgYTMsIHBvc3RjYXJkLCBsZXR0ZXIsIGV0Yy5cIikpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB2YXIgcHJlc2V0ID0gcGFwZXJTaXplc1trZXldO1xuXHQgICAgICAgIHJldHVybiBwcmVzZXQuZGltZW5zaW9ucy5tYXAoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGNvbnZlcnREaXN0YW5jZSQxKGQsIHByZXNldC51bml0cywgdW5pdHNUbywgcGl4ZWxzUGVySW5jaCk7IH0pO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXR1cm4gZGltZW5zaW9ucztcblx0ICAgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnZlcnREaXN0YW5jZSQxKGRpbWVuc2lvbiwgdW5pdHNGcm9tLCB1bml0c1RvLCBwaXhlbHNQZXJJbmNoKSB7XG5cdCAgICBpZiAoIHVuaXRzRnJvbSA9PT0gdm9pZCAwICkgdW5pdHNGcm9tID0gJ3B4Jztcblx0ICAgIGlmICggdW5pdHNUbyA9PT0gdm9pZCAwICkgdW5pdHNUbyA9ICdweCc7XG5cdCAgICBpZiAoIHBpeGVsc1BlckluY2ggPT09IHZvaWQgMCApIHBpeGVsc1BlckluY2ggPSA3MjtcblxuXHQgICAgcmV0dXJuIGNvbnZlcnRMZW5ndGgoZGltZW5zaW9uLCB1bml0c0Zyb20sIHVuaXRzVG8sIHtcblx0ICAgICAgICBwaXhlbHNQZXJJbmNoOiBwaXhlbHNQZXJJbmNoLFxuXHQgICAgICAgIHByZWNpc2lvbjogNCxcblx0ICAgICAgICByb3VuZFBpeGVsOiB0cnVlXG5cdCAgICB9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNoZWNrSWZIYXNEaW1lbnNpb25zKHNldHRpbmdzKSB7XG5cdCAgICBpZiAoIXNldHRpbmdzLmRpbWVuc2lvbnMpIFxuXHQgICAgICAgIHsgcmV0dXJuIGZhbHNlOyB9XG5cdCAgICBpZiAodHlwZW9mIHNldHRpbmdzLmRpbWVuc2lvbnMgPT09ICdzdHJpbmcnKSBcblx0ICAgICAgICB7IHJldHVybiB0cnVlOyB9XG5cdCAgICBpZiAoQXJyYXkuaXNBcnJheShzZXR0aW5ncy5kaW1lbnNpb25zKSAmJiBzZXR0aW5ncy5kaW1lbnNpb25zLmxlbmd0aCA+PSAyKSBcblx0ICAgICAgICB7IHJldHVybiB0cnVlOyB9XG5cdCAgICByZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRQYXJlbnRTaXplKHByb3BzLCBzZXR0aW5ncykge1xuXHQgICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuXHQgICAgICAgIHJldHVybiBbMzAwLDE1MF07XG5cdCAgICB9XG5cdCAgICB2YXIgZWxlbWVudCA9IHNldHRpbmdzLnBhcmVudCB8fCB3aW5kb3c7XG5cdCAgICBpZiAoZWxlbWVudCA9PT0gd2luZG93IHx8IGVsZW1lbnQgPT09IGRvY3VtZW50IHx8IGVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcblx0ICAgICAgICByZXR1cm4gW3dpbmRvdy5pbm5lcldpZHRoLHdpbmRvdy5pbm5lckhlaWdodF07XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciByZWYgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHQgICAgICAgIHZhciB3aWR0aCA9IHJlZi53aWR0aDtcblx0ICAgICAgICB2YXIgaGVpZ2h0ID0gcmVmLmhlaWdodDtcblx0ICAgICAgICByZXR1cm4gW3dpZHRoLGhlaWdodF07XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiByZXNpemVDYW52YXMocHJvcHMsIHNldHRpbmdzKSB7XG5cdCAgICB2YXIgd2lkdGgsIGhlaWdodDtcblx0ICAgIHZhciBzdHlsZVdpZHRoLCBzdHlsZUhlaWdodDtcblx0ICAgIHZhciBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0O1xuXHQgICAgdmFyIGJyb3dzZXIgPSBpc0Jyb3dzZXIoKTtcblx0ICAgIHZhciBkaW1lbnNpb25zID0gc2V0dGluZ3MuZGltZW5zaW9ucztcblx0ICAgIHZhciBoYXNEaW1lbnNpb25zID0gY2hlY2tJZkhhc0RpbWVuc2lvbnMoc2V0dGluZ3MpO1xuXHQgICAgdmFyIGV4cG9ydGluZyA9IHByb3BzLmV4cG9ydGluZztcblx0ICAgIHZhciBzY2FsZVRvRml0ID0gaGFzRGltZW5zaW9ucyA/IHNldHRpbmdzLnNjYWxlVG9GaXQgIT09IGZhbHNlIDogZmFsc2U7XG5cdCAgICB2YXIgc2NhbGVUb1ZpZXcgPSAhZXhwb3J0aW5nICYmIGhhc0RpbWVuc2lvbnMgPyBzZXR0aW5ncy5zY2FsZVRvVmlldyA6IHRydWU7XG5cdCAgICBpZiAoIWJyb3dzZXIpIFxuXHQgICAgICAgIHsgc2NhbGVUb0ZpdCA9IChzY2FsZVRvVmlldyA9IGZhbHNlKTsgfVxuXHQgICAgdmFyIHVuaXRzID0gc2V0dGluZ3MudW5pdHM7XG5cdCAgICB2YXIgcGl4ZWxzUGVySW5jaCA9IHR5cGVvZiBzZXR0aW5ncy5waXhlbHNQZXJJbmNoID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzZXR0aW5ncy5waXhlbHNQZXJJbmNoKSA/IHNldHRpbmdzLnBpeGVsc1BlckluY2ggOiA3Mjtcblx0ICAgIHZhciBibGVlZCA9IGRlZmluZWQoc2V0dGluZ3MuYmxlZWQsIDApO1xuXHQgICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSBicm93c2VyID8gd2luZG93LmRldmljZVBpeGVsUmF0aW8gOiAxO1xuXHQgICAgdmFyIGJhc2VQaXhlbFJhdGlvID0gc2NhbGVUb1ZpZXcgPyBkZXZpY2VQaXhlbFJhdGlvIDogMTtcblx0ICAgIHZhciBwaXhlbFJhdGlvLCBleHBvcnRQaXhlbFJhdGlvO1xuXHQgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5waXhlbFJhdGlvID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzZXR0aW5ncy5waXhlbFJhdGlvKSkge1xuXHQgICAgICAgIHBpeGVsUmF0aW8gPSBzZXR0aW5ncy5waXhlbFJhdGlvO1xuXHQgICAgICAgIGV4cG9ydFBpeGVsUmF0aW8gPSBkZWZpbmVkKHNldHRpbmdzLmV4cG9ydFBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBpZiAoaGFzRGltZW5zaW9ucykge1xuXHQgICAgICAgICAgICBwaXhlbFJhdGlvID0gYmFzZVBpeGVsUmF0aW87XG5cdCAgICAgICAgICAgIGV4cG9ydFBpeGVsUmF0aW8gPSBkZWZpbmVkKHNldHRpbmdzLmV4cG9ydFBpeGVsUmF0aW8sIDEpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBkZXZpY2VQaXhlbFJhdGlvO1xuXHQgICAgICAgICAgICBleHBvcnRQaXhlbFJhdGlvID0gZGVmaW5lZChzZXR0aW5ncy5leHBvcnRQaXhlbFJhdGlvLCBwaXhlbFJhdGlvKTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAodHlwZW9mIHNldHRpbmdzLm1heFBpeGVsUmF0aW8gPT09ICdudW1iZXInICYmIGlzRmluaXRlKHNldHRpbmdzLm1heFBpeGVsUmF0aW8pKSB7XG5cdCAgICAgICAgcGl4ZWxSYXRpbyA9IE1hdGgubWluKHNldHRpbmdzLm1heFBpeGVsUmF0aW8sIHBpeGVsUmF0aW8pO1xuXHQgICAgfVxuXHQgICAgaWYgKGV4cG9ydGluZykge1xuXHQgICAgICAgIHBpeGVsUmF0aW8gPSBleHBvcnRQaXhlbFJhdGlvO1xuXHQgICAgfVxuXHQgICAgdmFyIHJlZiA9IGdldFBhcmVudFNpemUocHJvcHMsIHNldHRpbmdzKTtcblx0ICAgIHZhciBwYXJlbnRXaWR0aCA9IHJlZlswXTtcblx0ICAgIHZhciBwYXJlbnRIZWlnaHQgPSByZWZbMV07XG5cdCAgICB2YXIgdHJpbVdpZHRoLCB0cmltSGVpZ2h0O1xuXHQgICAgaWYgKGhhc0RpbWVuc2lvbnMpIHtcblx0ICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0RGltZW5zaW9uc0Zyb21QcmVzZXQoZGltZW5zaW9ucywgdW5pdHMsIHBpeGVsc1BlckluY2gpO1xuXHQgICAgICAgIHZhciBoaWdoZXN0ID0gTWF0aC5tYXgocmVzdWx0WzBdLCByZXN1bHRbMV0pO1xuXHQgICAgICAgIHZhciBsb3dlc3QgPSBNYXRoLm1pbihyZXN1bHRbMF0sIHJlc3VsdFsxXSk7XG5cdCAgICAgICAgaWYgKHNldHRpbmdzLm9yaWVudGF0aW9uKSB7XG5cdCAgICAgICAgICAgIHZhciBsYW5kc2NhcGUgPSBzZXR0aW5ncy5vcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZSc7XG5cdCAgICAgICAgICAgIHdpZHRoID0gbGFuZHNjYXBlID8gaGlnaGVzdCA6IGxvd2VzdDtcblx0ICAgICAgICAgICAgaGVpZ2h0ID0gbGFuZHNjYXBlID8gbG93ZXN0IDogaGlnaGVzdDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB3aWR0aCA9IHJlc3VsdFswXTtcblx0ICAgICAgICAgICAgaGVpZ2h0ID0gcmVzdWx0WzFdO1xuXHQgICAgICAgIH1cblx0ICAgICAgICB0cmltV2lkdGggPSB3aWR0aDtcblx0ICAgICAgICB0cmltSGVpZ2h0ID0gaGVpZ2h0O1xuXHQgICAgICAgIHdpZHRoICs9IGJsZWVkICogMjtcblx0ICAgICAgICBoZWlnaHQgKz0gYmxlZWQgKiAyO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB3aWR0aCA9IHBhcmVudFdpZHRoO1xuXHQgICAgICAgIGhlaWdodCA9IHBhcmVudEhlaWdodDtcblx0ICAgICAgICB0cmltV2lkdGggPSB3aWR0aDtcblx0ICAgICAgICB0cmltSGVpZ2h0ID0gaGVpZ2h0O1xuXHQgICAgfVxuXHQgICAgdmFyIHJlYWxXaWR0aCA9IHdpZHRoO1xuXHQgICAgdmFyIHJlYWxIZWlnaHQgPSBoZWlnaHQ7XG5cdCAgICBpZiAoaGFzRGltZW5zaW9ucyAmJiB1bml0cykge1xuXHQgICAgICAgIHJlYWxXaWR0aCA9IGNvbnZlcnREaXN0YW5jZSQxKHdpZHRoLCB1bml0cywgJ3B4JywgcGl4ZWxzUGVySW5jaCk7XG5cdCAgICAgICAgcmVhbEhlaWdodCA9IGNvbnZlcnREaXN0YW5jZSQxKGhlaWdodCwgdW5pdHMsICdweCcsIHBpeGVsc1BlckluY2gpO1xuXHQgICAgfVxuXHQgICAgc3R5bGVXaWR0aCA9IE1hdGgucm91bmQocmVhbFdpZHRoKTtcblx0ICAgIHN0eWxlSGVpZ2h0ID0gTWF0aC5yb3VuZChyZWFsSGVpZ2h0KTtcblx0ICAgIGlmIChzY2FsZVRvRml0ICYmICFleHBvcnRpbmcgJiYgaGFzRGltZW5zaW9ucykge1xuXHQgICAgICAgIHZhciBhc3BlY3QgPSB3aWR0aCAvIGhlaWdodDtcblx0ICAgICAgICB2YXIgd2luZG93QXNwZWN0ID0gcGFyZW50V2lkdGggLyBwYXJlbnRIZWlnaHQ7XG5cdCAgICAgICAgdmFyIHNjYWxlVG9GaXRQYWRkaW5nID0gZGVmaW5lZChzZXR0aW5ncy5zY2FsZVRvRml0UGFkZGluZywgNDApO1xuXHQgICAgICAgIHZhciBtYXhXaWR0aCA9IE1hdGgucm91bmQocGFyZW50V2lkdGggLSBzY2FsZVRvRml0UGFkZGluZyAqIDIpO1xuXHQgICAgICAgIHZhciBtYXhIZWlnaHQgPSBNYXRoLnJvdW5kKHBhcmVudEhlaWdodCAtIHNjYWxlVG9GaXRQYWRkaW5nICogMik7XG5cdCAgICAgICAgaWYgKHN0eWxlV2lkdGggPiBtYXhXaWR0aCB8fCBzdHlsZUhlaWdodCA+IG1heEhlaWdodCkge1xuXHQgICAgICAgICAgICBpZiAod2luZG93QXNwZWN0ID4gYXNwZWN0KSB7XG5cdCAgICAgICAgICAgICAgICBzdHlsZUhlaWdodCA9IG1heEhlaWdodDtcblx0ICAgICAgICAgICAgICAgIHN0eWxlV2lkdGggPSBNYXRoLnJvdW5kKHN0eWxlSGVpZ2h0ICogYXNwZWN0KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHN0eWxlV2lkdGggPSBtYXhXaWR0aDtcblx0ICAgICAgICAgICAgICAgIHN0eWxlSGVpZ2h0ID0gTWF0aC5yb3VuZChzdHlsZVdpZHRoIC8gYXNwZWN0KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIGNhbnZhc1dpZHRoID0gc2NhbGVUb1ZpZXcgPyBNYXRoLnJvdW5kKHBpeGVsUmF0aW8gKiBzdHlsZVdpZHRoKSA6IE1hdGgucm91bmQocGl4ZWxSYXRpbyAqIHJlYWxXaWR0aCk7XG5cdCAgICBjYW52YXNIZWlnaHQgPSBzY2FsZVRvVmlldyA/IE1hdGgucm91bmQocGl4ZWxSYXRpbyAqIHN0eWxlSGVpZ2h0KSA6IE1hdGgucm91bmQocGl4ZWxSYXRpbyAqIHJlYWxIZWlnaHQpO1xuXHQgICAgdmFyIHZpZXdwb3J0V2lkdGggPSBzY2FsZVRvVmlldyA/IE1hdGgucm91bmQoc3R5bGVXaWR0aCkgOiBNYXRoLnJvdW5kKHJlYWxXaWR0aCk7XG5cdCAgICB2YXIgdmlld3BvcnRIZWlnaHQgPSBzY2FsZVRvVmlldyA/IE1hdGgucm91bmQoc3R5bGVIZWlnaHQpIDogTWF0aC5yb3VuZChyZWFsSGVpZ2h0KTtcblx0ICAgIHZhciBzY2FsZVggPSBjYW52YXNXaWR0aCAvIHdpZHRoO1xuXHQgICAgdmFyIHNjYWxlWSA9IGNhbnZhc0hlaWdodCAvIGhlaWdodDtcblx0ICAgIHJldHVybiB7XG5cdCAgICAgICAgYmxlZWQ6IGJsZWVkLFxuXHQgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW8sXG5cdCAgICAgICAgd2lkdGg6IHdpZHRoLFxuXHQgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuXHQgICAgICAgIGRpbWVuc2lvbnM6IFt3aWR0aCxoZWlnaHRdLFxuXHQgICAgICAgIHVuaXRzOiB1bml0cyB8fCAncHgnLFxuXHQgICAgICAgIHNjYWxlWDogc2NhbGVYLFxuXHQgICAgICAgIHNjYWxlWTogc2NhbGVZLFxuXHQgICAgICAgIHBpeGVsc1BlckluY2g6IHBpeGVsc1BlckluY2gsXG5cdCAgICAgICAgdmlld3BvcnRXaWR0aDogdmlld3BvcnRXaWR0aCxcblx0ICAgICAgICB2aWV3cG9ydEhlaWdodDogdmlld3BvcnRIZWlnaHQsXG5cdCAgICAgICAgY2FudmFzV2lkdGg6IGNhbnZhc1dpZHRoLFxuXHQgICAgICAgIGNhbnZhc0hlaWdodDogY2FudmFzSGVpZ2h0LFxuXHQgICAgICAgIHRyaW1XaWR0aDogdHJpbVdpZHRoLFxuXHQgICAgICAgIHRyaW1IZWlnaHQ6IHRyaW1IZWlnaHQsXG5cdCAgICAgICAgc3R5bGVXaWR0aDogc3R5bGVXaWR0aCxcblx0ICAgICAgICBzdHlsZUhlaWdodDogc3R5bGVIZWlnaHRcblx0ICAgIH07XG5cdH1cblxuXHR2YXIgZ2V0Q2FudmFzQ29udGV4dF8xID0gZ2V0Q2FudmFzQ29udGV4dDtcblx0ZnVuY3Rpb24gZ2V0Q2FudmFzQ29udGV4dCAodHlwZSwgb3B0cykge1xuXHQgIGlmICh0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycpIHtcblx0ICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ211c3Qgc3BlY2lmeSB0eXBlIHN0cmluZycpXG5cdCAgfVxuXG5cdCAgb3B0cyA9IG9wdHMgfHwge307XG5cblx0ICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyAmJiAhb3B0cy5jYW52YXMpIHtcblx0ICAgIHJldHVybiBudWxsIC8vIGNoZWNrIGZvciBOb2RlXG5cdCAgfVxuXG5cdCAgdmFyIGNhbnZhcyA9IG9wdHMuY2FudmFzIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXHQgIGlmICh0eXBlb2Ygb3B0cy53aWR0aCA9PT0gJ251bWJlcicpIHtcblx0ICAgIGNhbnZhcy53aWR0aCA9IG9wdHMud2lkdGg7XG5cdCAgfVxuXHQgIGlmICh0eXBlb2Ygb3B0cy5oZWlnaHQgPT09ICdudW1iZXInKSB7XG5cdCAgICBjYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQ7XG5cdCAgfVxuXG5cdCAgdmFyIGF0dHJpYnMgPSBvcHRzO1xuXHQgIHZhciBnbDtcblx0ICB0cnkge1xuXHQgICAgdmFyIG5hbWVzID0gWyB0eXBlIF07XG5cdCAgICAvLyBwcmVmaXggR0wgY29udGV4dHNcblx0ICAgIGlmICh0eXBlLmluZGV4T2YoJ3dlYmdsJykgPT09IDApIHtcblx0ICAgICAgbmFtZXMucHVzaCgnZXhwZXJpbWVudGFsLScgKyB0eXBlKTtcblx0ICAgIH1cblxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KG5hbWVzW2ldLCBhdHRyaWJzKTtcblx0ICAgICAgaWYgKGdsKSByZXR1cm4gZ2xcblx0ICAgIH1cblx0ICB9IGNhdGNoIChlKSB7XG5cdCAgICBnbCA9IG51bGw7XG5cdCAgfVxuXHQgIHJldHVybiAoZ2wgfHwgbnVsbCkgLy8gZW5zdXJlIG51bGwgb24gZmFpbFxuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlQ2FudmFzRWxlbWVudCgpIHtcblx0ICAgIGlmICghaXNCcm93c2VyKCkpIHtcblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0l0IGFwcGVhcnMgeW91IGFyZSBydW5pbmcgZnJvbSBOb2RlLmpzIG9yIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuIFRyeSBwYXNzaW5nIGluIGFuIGV4aXN0aW5nIHsgY2FudmFzIH0gaW50ZXJmYWNlIGluc3RlYWQuJyk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVDYW52YXMoc2V0dGluZ3MpIHtcblx0ICAgIGlmICggc2V0dGluZ3MgPT09IHZvaWQgMCApIHNldHRpbmdzID0ge307XG5cblx0ICAgIHZhciBjb250ZXh0LCBjYW52YXM7XG5cdCAgICB2YXIgb3duc0NhbnZhcyA9IGZhbHNlO1xuXHQgICAgaWYgKHNldHRpbmdzLmNhbnZhcyAhPT0gZmFsc2UpIHtcblx0ICAgICAgICBjb250ZXh0ID0gc2V0dGluZ3MuY29udGV4dDtcblx0ICAgICAgICBpZiAoIWNvbnRleHQgfHwgdHlwZW9mIGNvbnRleHQgPT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgIHZhciBuZXdDYW52YXMgPSBzZXR0aW5ncy5jYW52YXM7XG5cdCAgICAgICAgICAgIGlmICghbmV3Q2FudmFzKSB7XG5cdCAgICAgICAgICAgICAgICBuZXdDYW52YXMgPSBjcmVhdGVDYW52YXNFbGVtZW50KCk7XG5cdCAgICAgICAgICAgICAgICBvd25zQ2FudmFzID0gdHJ1ZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgdHlwZSA9IGNvbnRleHQgfHwgJzJkJztcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdDYW52YXMuZ2V0Q29udGV4dCAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHNwZWNpZmllZCB7IGNhbnZhcyB9IGVsZW1lbnQgZG9lcyBub3QgaGF2ZSBhIGdldENvbnRleHQoKSBmdW5jdGlvbiwgbWF5YmUgaXQgaXMgbm90IGEgPGNhbnZhcz4gdGFnP1wiKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBjb250ZXh0ID0gZ2V0Q2FudmFzQ29udGV4dF8xKHR5cGUsIG9iamVjdEFzc2lnbih7fSwgc2V0dGluZ3MuYXR0cmlidXRlcywge1xuXHQgICAgICAgICAgICAgICAgY2FudmFzOiBuZXdDYW52YXNcblx0ICAgICAgICAgICAgfSkpO1xuXHQgICAgICAgICAgICBpZiAoIWNvbnRleHQpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigoXCJGYWlsZWQgYXQgY2FudmFzLmdldENvbnRleHQoJ1wiICsgdHlwZSArIFwiJykgLSB0aGUgYnJvd3NlciBtYXkgbm90IHN1cHBvcnQgdGhpcyBjb250ZXh0LCBvciBhIGRpZmZlcmVudCBjb250ZXh0IG1heSBhbHJlYWR5IGJlIGluIHVzZSB3aXRoIHRoaXMgY2FudmFzLlwiKSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgY2FudmFzID0gY29udGV4dC5jYW52YXM7XG5cdCAgICAgICAgaWYgKHNldHRpbmdzLmNhbnZhcyAmJiBjYW52YXMgIT09IHNldHRpbmdzLmNhbnZhcykge1xuXHQgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB7IGNhbnZhcyB9IGFuZCB7IGNvbnRleHQgfSBzZXR0aW5ncyBtdXN0IHBvaW50IHRvIHRoZSBzYW1lIHVuZGVybHlpbmcgY2FudmFzIGVsZW1lbnQnKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHNldHRpbmdzLnBpeGVsYXRlZCkge1xuXHQgICAgICAgICAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICBjb250ZXh0Lm1vekltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICBjb250ZXh0Lm9JbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgY29udGV4dC53ZWJraXRJbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblx0ICAgICAgICAgICAgY29udGV4dC5tc0ltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXHQgICAgICAgICAgICBjYW52YXMuc3R5bGVbJ2ltYWdlLXJlbmRlcmluZyddID0gJ3BpeGVsYXRlZCc7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICBjYW52YXM6IGNhbnZhcyxcblx0ICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuXHQgICAgICAgIG93bnNDYW52YXM6IG93bnNDYW52YXNcblx0ICAgIH07XG5cdH1cblxuXHR2YXIgU2tldGNoTWFuYWdlciA9IGZ1bmN0aW9uIFNrZXRjaE1hbmFnZXIoKSB7XG5cdCAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXHQgICAgdGhpcy5fc2V0dGluZ3MgPSB7fTtcblx0ICAgIHRoaXMuX3Byb3BzID0ge307XG5cdCAgICB0aGlzLl9za2V0Y2ggPSB1bmRlZmluZWQ7XG5cdCAgICB0aGlzLl9yYWYgPSBudWxsO1xuXHQgICAgdGhpcy5fcmVjb3JkVGltZW91dCA9IG51bGw7XG5cdCAgICB0aGlzLl9sYXN0UmVkcmF3UmVzdWx0ID0gdW5kZWZpbmVkO1xuXHQgICAgdGhpcy5faXNQNVJlc2l6aW5nID0gZmFsc2U7XG5cdCAgICB0aGlzLl9rZXlib2FyZFNob3J0Y3V0cyA9IGtleWJvYXJkU2hvcnRjdXRzKHtcblx0ICAgICAgICBlbmFibGVkOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEuc2V0dGluZ3MuaG90a2V5cyAhPT0gZmFsc2U7IH0sXG5cdCAgICAgICAgc2F2ZTogZnVuY3Rpb24gKGV2KSB7XG5cdCAgICAgICAgICAgIGlmIChldi5zaGlmdEtleSkge1xuXHQgICAgICAgICAgICAgICAgaWYgKHRoaXMkMS5wcm9wcy5yZWNvcmRpbmcpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzJDEuZW5kUmVjb3JkKCk7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnJ1bigpO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIFxuXHQgICAgICAgICAgICAgICAgICAgIHsgdGhpcyQxLnJlY29yZCgpOyB9XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMkMS5wcm9wcy5yZWNvcmRpbmcpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMkMS5leHBvcnRGcmFtZSgpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICB0b2dnbGVQbGF5OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIGlmICh0aGlzJDEucHJvcHMucGxheWluZykgXG5cdCAgICAgICAgICAgICAgICB7IHRoaXMkMS5wYXVzZSgpOyB9XG5cdCAgICAgICAgICAgICBlbHNlIFxuXHQgICAgICAgICAgICAgICAgeyB0aGlzJDEucGxheSgpOyB9XG5cdCAgICAgICAgfSxcblx0ICAgICAgICBjb21taXQ6IGZ1bmN0aW9uIChldikge1xuXHQgICAgICAgICAgICB0aGlzJDEuZXhwb3J0RnJhbWUoe1xuXHQgICAgICAgICAgICAgICAgY29tbWl0OiB0cnVlXG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHQgICAgdGhpcy5fYW5pbWF0ZUhhbmRsZXIgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLmFuaW1hdGUoKTsgfSk7XG5cdCAgICB0aGlzLl9yZXNpemVIYW5kbGVyID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB2YXIgY2hhbmdlZCA9IHRoaXMkMS5yZXNpemUoKTtcblx0ICAgICAgICBpZiAoY2hhbmdlZCkge1xuXHQgICAgICAgICAgICB0aGlzJDEucmVuZGVyKCk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH07XG5cblx0dmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgc2tldGNoOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LHNldHRpbmdzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LHByb3BzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH07XG5cdHByb3RvdHlwZUFjY2Vzc29ycy5za2V0Y2guZ2V0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgcmV0dXJuIHRoaXMuX3NrZXRjaDtcblx0fTtcblx0cHJvdG90eXBlQWNjZXNzb3JzLnNldHRpbmdzLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiB0aGlzLl9zZXR0aW5ncztcblx0fTtcblx0cHJvdG90eXBlQWNjZXNzb3JzLnByb3BzLmdldCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiB0aGlzLl9wcm9wcztcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2NvbXB1dGVQbGF5aGVhZCA9IGZ1bmN0aW9uIF9jb21wdXRlUGxheWhlYWQgKGN1cnJlbnRUaW1lLCBkdXJhdGlvbikge1xuXHQgICAgdmFyIGhhc0R1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShkdXJhdGlvbik7XG5cdCAgICByZXR1cm4gaGFzRHVyYXRpb24gPyBjdXJyZW50VGltZSAvIGR1cmF0aW9uIDogMDtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2NvbXB1dGVGcmFtZSA9IGZ1bmN0aW9uIF9jb21wdXRlRnJhbWUgKHBsYXloZWFkLCB0aW1lLCB0b3RhbEZyYW1lcywgZnBzKSB7XG5cdCAgICByZXR1cm4gaXNGaW5pdGUodG90YWxGcmFtZXMpICYmIHRvdGFsRnJhbWVzID4gMSA/IE1hdGguZmxvb3IocGxheWhlYWQgKiAodG90YWxGcmFtZXMgLSAxKSkgOiBNYXRoLmZsb29yKGZwcyAqIHRpbWUpO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fY29tcHV0ZUN1cnJlbnRGcmFtZSA9IGZ1bmN0aW9uIF9jb21wdXRlQ3VycmVudEZyYW1lICgpIHtcblx0ICAgIHJldHVybiB0aGlzLl9jb21wdXRlRnJhbWUodGhpcy5wcm9wcy5wbGF5aGVhZCwgdGhpcy5wcm9wcy50aW1lLCB0aGlzLnByb3BzLnRvdGFsRnJhbWVzLCB0aGlzLnByb3BzLmZwcyk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9nZXRTaXplUHJvcHMgPSBmdW5jdGlvbiBfZ2V0U2l6ZVByb3BzICgpIHtcblx0ICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdCAgICByZXR1cm4ge1xuXHQgICAgICAgIHdpZHRoOiBwcm9wcy53aWR0aCxcblx0ICAgICAgICBoZWlnaHQ6IHByb3BzLmhlaWdodCxcblx0ICAgICAgICBwaXhlbFJhdGlvOiBwcm9wcy5waXhlbFJhdGlvLFxuXHQgICAgICAgIGNhbnZhc1dpZHRoOiBwcm9wcy5jYW52YXNXaWR0aCxcblx0ICAgICAgICBjYW52YXNIZWlnaHQ6IHByb3BzLmNhbnZhc0hlaWdodCxcblx0ICAgICAgICB2aWV3cG9ydFdpZHRoOiBwcm9wcy52aWV3cG9ydFdpZHRoLFxuXHQgICAgICAgIHZpZXdwb3J0SGVpZ2h0OiBwcm9wcy52aWV3cG9ydEhlaWdodFxuXHQgICAgfTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gcnVuICgpIHtcblx0ICAgIGlmICghdGhpcy5za2V0Y2gpIFxuXHQgICAgICAgIHsgdGhyb3cgbmV3IEVycm9yKCdzaG91bGQgd2FpdCB1bnRpbCBza2V0Y2ggaXMgbG9hZGVkIGJlZm9yZSB0cnlpbmcgdG8gcGxheSgpJyk7IH1cblx0ICAgIGlmICh0aGlzLnNldHRpbmdzLnBsYXlpbmcgIT09IGZhbHNlKSB7XG5cdCAgICAgICAgdGhpcy5wbGF5KCk7XG5cdCAgICB9XG5cdCAgICBpZiAodHlwZW9mIHRoaXMuc2tldGNoLmRpc3Bvc2UgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBjb25zb2xlLndhcm4oJ0luIGNhbnZhcy1za2V0Y2hAMC4wLjIzIHRoZSBkaXNwb3NlKCkgZXZlbnQgaGFzIGJlZW4gcmVuYW1lZCB0byB1bmxvYWQoKScpO1xuXHQgICAgfVxuXHQgICAgaWYgKCF0aGlzLnByb3BzLnN0YXJ0ZWQpIHtcblx0ICAgICAgICB0aGlzLl9zaWduYWxCZWdpbigpO1xuXHQgICAgICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IHRydWU7XG5cdCAgICB9XG5cdCAgICB0aGlzLnRpY2soKTtcblx0ICAgIHRoaXMucmVuZGVyKCk7XG5cdCAgICByZXR1cm4gdGhpcztcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX2NhbmNlbFRpbWVvdXRzID0gZnVuY3Rpb24gX2NhbmNlbFRpbWVvdXRzICgpIHtcblx0ICAgIGlmICh0aGlzLl9yYWYgIT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX3JhZik7XG5cdCAgICAgICAgdGhpcy5fcmFmID0gbnVsbDtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLl9yZWNvcmRUaW1lb3V0ICE9IG51bGwpIHtcblx0ICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVjb3JkVGltZW91dCk7XG5cdCAgICAgICAgdGhpcy5fcmVjb3JkVGltZW91dCA9IG51bGw7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbiBwbGF5ICgpIHtcblx0ICAgIHZhciBhbmltYXRlID0gdGhpcy5zZXR0aW5ncy5hbmltYXRlO1xuXHQgICAgaWYgKCdhbmltYXRpb24nIGluIHRoaXMuc2V0dGluZ3MpIHtcblx0ICAgICAgICBhbmltYXRlID0gdHJ1ZTtcblx0ICAgICAgICBjb25zb2xlLndhcm4oJ1tjYW52YXMtc2tldGNoXSB7IGFuaW1hdGlvbiB9IGhhcyBiZWVuIHJlbmFtZWQgdG8geyBhbmltYXRlIH0nKTtcblx0ICAgIH1cblx0ICAgIGlmICghYW5pbWF0ZSkgXG5cdCAgICAgICAgeyByZXR1cm47IH1cblx0ICAgIGlmICghaXNCcm93c2VyKCkpIHtcblx0ICAgICAgICBjb25zb2xlLmVycm9yKCdbY2FudmFzLXNrZXRjaF0gV0FSTjogVXNpbmcgeyBhbmltYXRlIH0gaW4gTm9kZS5qcyBpcyBub3QgeWV0IHN1cHBvcnRlZCcpO1xuXHQgICAgICAgIHJldHVybjtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnByb3BzLnBsYXlpbmcpIFxuXHQgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICBpZiAoIXRoaXMucHJvcHMuc3RhcnRlZCkge1xuXHQgICAgICAgIHRoaXMuX3NpZ25hbEJlZ2luKCk7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5zdGFydGVkID0gdHJ1ZTtcblx0ICAgIH1cblx0ICAgIHRoaXMucHJvcHMucGxheWluZyA9IHRydWU7XG5cdCAgICB0aGlzLl9jYW5jZWxUaW1lb3V0cygpO1xuXHQgICAgdGhpcy5fbGFzdFRpbWUgPSBicm93c2VyKCk7XG5cdCAgICB0aGlzLl9yYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGVIYW5kbGVyKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiBwYXVzZSAoKSB7XG5cdCAgICBpZiAodGhpcy5wcm9wcy5yZWNvcmRpbmcpIFxuXHQgICAgICAgIHsgdGhpcy5lbmRSZWNvcmQoKTsgfVxuXHQgICAgdGhpcy5wcm9wcy5wbGF5aW5nID0gZmFsc2U7XG5cdCAgICB0aGlzLl9jYW5jZWxUaW1lb3V0cygpO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS50b2dnbGVQbGF5ID0gZnVuY3Rpb24gdG9nZ2xlUGxheSAoKSB7XG5cdCAgICBpZiAodGhpcy5wcm9wcy5wbGF5aW5nKSBcblx0ICAgICAgICB7IHRoaXMucGF1c2UoKTsgfVxuXHQgICAgIGVsc2UgXG5cdCAgICAgICAgeyB0aGlzLnBsYXkoKTsgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gc3RvcCAoKSB7XG5cdCAgICB0aGlzLnBhdXNlKCk7XG5cdCAgICB0aGlzLnByb3BzLmZyYW1lID0gMDtcblx0ICAgIHRoaXMucHJvcHMucGxheWhlYWQgPSAwO1xuXHQgICAgdGhpcy5wcm9wcy50aW1lID0gMDtcblx0ICAgIHRoaXMucHJvcHMuZGVsdGFUaW1lID0gMDtcblx0ICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IGZhbHNlO1xuXHQgICAgdGhpcy5yZW5kZXIoKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUucmVjb3JkID0gZnVuY3Rpb24gcmVjb3JkICgpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXHQgICAgaWYgKHRoaXMucHJvcHMucmVjb3JkaW5nKSBcblx0ICAgICAgICB7IHJldHVybjsgfVxuXHQgICAgaWYgKCFpc0Jyb3dzZXIoKSkge1xuXHQgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tjYW52YXMtc2tldGNoXSBXQVJOOiBSZWNvcmRpbmcgZnJvbSBOb2RlLmpzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgdGhpcy5zdG9wKCk7XG5cdCAgICB0aGlzLnByb3BzLnBsYXlpbmcgPSB0cnVlO1xuXHQgICAgdGhpcy5wcm9wcy5yZWNvcmRpbmcgPSB0cnVlO1xuXHQgICAgdmFyIGV4cG9ydE9wdHMgPSB0aGlzLl9jcmVhdGVFeHBvcnRPcHRpb25zKHtcblx0ICAgICAgICBzZXF1ZW5jZTogdHJ1ZVxuXHQgICAgfSk7XG5cdCAgICB2YXIgZnJhbWVJbnRlcnZhbCA9IDEgLyB0aGlzLnByb3BzLmZwcztcblx0ICAgIHRoaXMuX2NhbmNlbFRpbWVvdXRzKCk7XG5cdCAgICB2YXIgdGljayA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAoIXRoaXMkMS5wcm9wcy5yZWNvcmRpbmcpIFxuXHQgICAgICAgICAgICB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoKTsgfVxuXHQgICAgICAgIHRoaXMkMS5wcm9wcy5kZWx0YVRpbWUgPSBmcmFtZUludGVydmFsO1xuXHQgICAgICAgIHRoaXMkMS50aWNrKCk7XG5cdCAgICAgICAgcmV0dXJuIHRoaXMkMS5leHBvcnRGcmFtZShleHBvcnRPcHRzKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgaWYgKCF0aGlzJDEucHJvcHMucmVjb3JkaW5nKSBcblx0ICAgICAgICAgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICAgICAgICAgIHRoaXMkMS5wcm9wcy5kZWx0YVRpbWUgPSAwO1xuXHQgICAgICAgICAgICB0aGlzJDEucHJvcHMuZnJhbWUrKztcblx0ICAgICAgICAgICAgaWYgKHRoaXMkMS5wcm9wcy5mcmFtZSA8IHRoaXMkMS5wcm9wcy50b3RhbEZyYW1lcykge1xuXHQgICAgICAgICAgICAgICAgdGhpcyQxLnByb3BzLnRpbWUgKz0gZnJhbWVJbnRlcnZhbDtcblx0ICAgICAgICAgICAgICAgIHRoaXMkMS5wcm9wcy5wbGF5aGVhZCA9IHRoaXMkMS5fY29tcHV0ZVBsYXloZWFkKHRoaXMkMS5wcm9wcy50aW1lLCB0aGlzJDEucHJvcHMuZHVyYXRpb24pO1xuXHQgICAgICAgICAgICAgICAgdGhpcyQxLl9yZWNvcmRUaW1lb3V0ID0gc2V0VGltZW91dCh0aWNrLCAwKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGaW5pc2hlZCByZWNvcmRpbmcnKTtcblx0ICAgICAgICAgICAgICAgIHRoaXMkMS5fc2lnbmFsRW5kKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzJDEuZW5kUmVjb3JkKCk7XG5cdCAgICAgICAgICAgICAgICB0aGlzJDEuc3RvcCgpO1xuXHQgICAgICAgICAgICAgICAgdGhpcyQxLnJ1bigpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSk7XG5cdCAgICB9O1xuXHQgICAgaWYgKCF0aGlzLnByb3BzLnN0YXJ0ZWQpIHtcblx0ICAgICAgICB0aGlzLl9zaWduYWxCZWdpbigpO1xuXHQgICAgICAgIHRoaXMucHJvcHMuc3RhcnRlZCA9IHRydWU7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLmJlZ2luUmVjb3JkID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZShmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHRoaXMkMS5za2V0Y2guYmVnaW5SZWNvcmQocHJvcHMpOyB9KTtcblx0ICAgIH1cblx0ICAgIHN0cmVhbVN0YXJ0KGV4cG9ydE9wdHMpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0ICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG5cdCAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXHQgICAgICAgIHRoaXMkMS5fcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcblx0ICAgIH0pO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fc2lnbmFsQmVnaW4gPSBmdW5jdGlvbiBfc2lnbmFsQmVnaW4gKCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdCAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLmJlZ2luID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZShmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHRoaXMkMS5za2V0Y2guYmVnaW4ocHJvcHMpOyB9KTtcblx0ICAgIH1cblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX3NpZ25hbEVuZCA9IGZ1bmN0aW9uIF9zaWduYWxFbmQgKCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdCAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLmVuZCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRoaXMuX3dyYXBDb250ZXh0U2NhbGUoZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiB0aGlzJDEuc2tldGNoLmVuZChwcm9wcyk7IH0pO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5lbmRSZWNvcmQgPSBmdW5jdGlvbiBlbmRSZWNvcmQgKCkge1xuXHQgICAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG5cdCAgICB2YXIgd2FzUmVjb3JkaW5nID0gdGhpcy5wcm9wcy5yZWNvcmRpbmc7XG5cdCAgICB0aGlzLl9jYW5jZWxUaW1lb3V0cygpO1xuXHQgICAgdGhpcy5wcm9wcy5yZWNvcmRpbmcgPSBmYWxzZTtcblx0ICAgIHRoaXMucHJvcHMuZGVsdGFUaW1lID0gMDtcblx0ICAgIHRoaXMucHJvcHMucGxheWluZyA9IGZhbHNlO1xuXHQgICAgcmV0dXJuIHN0cmVhbUVuZCgpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcblx0ICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG5cdCAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBpZiAod2FzUmVjb3JkaW5nICYmIHRoaXMkMS5za2V0Y2ggJiYgdHlwZW9mIHRoaXMkMS5za2V0Y2guZW5kUmVjb3JkID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgICAgIHRoaXMkMS5fd3JhcENvbnRleHRTY2FsZShmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHRoaXMkMS5za2V0Y2guZW5kUmVjb3JkKHByb3BzKTsgfSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9jcmVhdGVFeHBvcnRPcHRpb25zID0gZnVuY3Rpb24gX2NyZWF0ZUV4cG9ydE9wdGlvbnMgKG9wdCkge1xuXHQgICAgICAgIGlmICggb3B0ID09PSB2b2lkIDAgKSBvcHQgPSB7fTtcblxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICBzZXF1ZW5jZTogb3B0LnNlcXVlbmNlLFxuXHQgICAgICAgIHNhdmU6IG9wdC5zYXZlLFxuXHQgICAgICAgIGZwczogdGhpcy5wcm9wcy5mcHMsXG5cdCAgICAgICAgZnJhbWU6IG9wdC5zZXF1ZW5jZSA/IHRoaXMucHJvcHMuZnJhbWUgOiB1bmRlZmluZWQsXG5cdCAgICAgICAgZmlsZTogdGhpcy5zZXR0aW5ncy5maWxlLFxuXHQgICAgICAgIG5hbWU6IHRoaXMuc2V0dGluZ3MubmFtZSxcblx0ICAgICAgICBwcmVmaXg6IHRoaXMuc2V0dGluZ3MucHJlZml4LFxuXHQgICAgICAgIHN1ZmZpeDogdGhpcy5zZXR0aW5ncy5zdWZmaXgsXG5cdCAgICAgICAgZW5jb2Rpbmc6IHRoaXMuc2V0dGluZ3MuZW5jb2RpbmcsXG5cdCAgICAgICAgZW5jb2RpbmdRdWFsaXR5OiB0aGlzLnNldHRpbmdzLmVuY29kaW5nUXVhbGl0eSxcblx0ICAgICAgICB0aW1lU3RhbXA6IG9wdC50aW1lU3RhbXAgfHwgZ2V0VGltZVN0YW1wKCksXG5cdCAgICAgICAgdG90YWxGcmFtZXM6IGlzRmluaXRlKHRoaXMucHJvcHMudG90YWxGcmFtZXMpID8gTWF0aC5tYXgoMCwgdGhpcy5wcm9wcy50b3RhbEZyYW1lcykgOiAxMDAwXG5cdCAgICB9O1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5leHBvcnRGcmFtZSA9IGZ1bmN0aW9uIGV4cG9ydEZyYW1lIChvcHQpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblx0ICAgICAgICBpZiAoIG9wdCA9PT0gdm9pZCAwICkgb3B0ID0ge307XG5cblx0ICAgIGlmICghdGhpcy5za2V0Y2gpIFxuXHQgICAgICAgIHsgcmV0dXJuIFByb21pc2UuYWxsKFtdKTsgfVxuXHQgICAgaWYgKHR5cGVvZiB0aGlzLnNrZXRjaC5wcmVFeHBvcnQgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzLnNrZXRjaC5wcmVFeHBvcnQoKTtcblx0ICAgIH1cblx0ICAgIHZhciBleHBvcnRPcHRzID0gdGhpcy5fY3JlYXRlRXhwb3J0T3B0aW9ucyhvcHQpO1xuXHQgICAgdmFyIGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuXHQgICAgdmFyIHAgPSBQcm9taXNlLnJlc29sdmUoKTtcblx0ICAgIGlmIChjbGllbnQgJiYgb3B0LmNvbW1pdCAmJiB0eXBlb2YgY2xpZW50LmNvbW1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHZhciBjb21taXRPcHRzID0gb2JqZWN0QXNzaWduKHt9LCBleHBvcnRPcHRzKTtcblx0ICAgICAgICB2YXIgaGFzaCA9IGNsaWVudC5jb21taXQoY29tbWl0T3B0cyk7XG5cdCAgICAgICAgaWYgKGlzUHJvbWlzZV8xKGhhc2gpKSBcblx0ICAgICAgICAgICAgeyBwID0gaGFzaDsgfVxuXHQgICAgICAgICBlbHNlIFxuXHQgICAgICAgICAgICB7IHAgPSBQcm9taXNlLnJlc29sdmUoaGFzaCk7IH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBwLnRoZW4oZnVuY3Rpb24gKGhhc2gpIHsgcmV0dXJuIHRoaXMkMS5fZG9FeHBvcnRGcmFtZShvYmplY3RBc3NpZ24oe30sIGV4cG9ydE9wdHMsIHtcblx0ICAgICAgICBoYXNoOiBoYXNoIHx8ICcnXG5cdCAgICB9KSk7IH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuXHQgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAxKSBcblx0ICAgICAgICAgICAgeyByZXR1cm4gcmVzdWx0WzBdOyB9XG5cdCAgICAgICAgIGVsc2UgXG5cdCAgICAgICAgICAgIHsgcmV0dXJuIHJlc3VsdDsgfVxuXHQgICAgfSk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9kb0V4cG9ydEZyYW1lID0gZnVuY3Rpb24gX2RvRXhwb3J0RnJhbWUgKGV4cG9ydE9wdHMpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblx0ICAgICAgICBpZiAoIGV4cG9ydE9wdHMgPT09IHZvaWQgMCApIGV4cG9ydE9wdHMgPSB7fTtcblxuXHQgICAgdGhpcy5fcHJvcHMuZXhwb3J0aW5nID0gdHJ1ZTtcblx0ICAgIHRoaXMucmVzaXplKCk7XG5cdCAgICB2YXIgZHJhd1Jlc3VsdCA9IHRoaXMucmVuZGVyKCk7XG5cdCAgICB2YXIgY2FudmFzID0gdGhpcy5wcm9wcy5jYW52YXM7XG5cdCAgICBpZiAodHlwZW9mIGRyYXdSZXN1bHQgPT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgZHJhd1Jlc3VsdCA9IFtjYW52YXNdO1xuXHQgICAgfVxuXHQgICAgZHJhd1Jlc3VsdCA9IFtdLmNvbmNhdChkcmF3UmVzdWx0KS5maWx0ZXIoQm9vbGVhbik7XG5cdCAgICBkcmF3UmVzdWx0ID0gZHJhd1Jlc3VsdC5tYXAoZnVuY3Rpb24gKHJlc3VsdCkge1xuXHQgICAgICAgIHZhciBoYXNEYXRhT2JqZWN0ID0gdHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmICgnZGF0YScgaW4gcmVzdWx0IHx8ICdkYXRhVVJMJyBpbiByZXN1bHQpO1xuXHQgICAgICAgIHZhciBkYXRhID0gaGFzRGF0YU9iamVjdCA/IHJlc3VsdC5kYXRhIDogcmVzdWx0O1xuXHQgICAgICAgIHZhciBvcHRzID0gaGFzRGF0YU9iamVjdCA/IG9iamVjdEFzc2lnbih7fSwgcmVzdWx0LCB7XG5cdCAgICAgICAgICAgIGRhdGE6IGRhdGFcblx0ICAgICAgICB9KSA6IHtcblx0ICAgICAgICAgICAgZGF0YTogZGF0YVxuXHQgICAgICAgIH07XG5cdCAgICAgICAgaWYgKGlzQ2FudmFzKGRhdGEpKSB7XG5cdCAgICAgICAgICAgIHZhciBlbmNvZGluZyA9IG9wdHMuZW5jb2RpbmcgfHwgZXhwb3J0T3B0cy5lbmNvZGluZztcblx0ICAgICAgICAgICAgdmFyIGVuY29kaW5nUXVhbGl0eSA9IGRlZmluZWQob3B0cy5lbmNvZGluZ1F1YWxpdHksIGV4cG9ydE9wdHMuZW5jb2RpbmdRdWFsaXR5LCAwLjk1KTtcblx0ICAgICAgICAgICAgdmFyIHJlZiA9IGV4cG9ydENhbnZhcyhkYXRhLCB7XG5cdCAgICAgICAgICAgICAgICBlbmNvZGluZzogZW5jb2RpbmcsXG5cdCAgICAgICAgICAgICAgICBlbmNvZGluZ1F1YWxpdHk6IGVuY29kaW5nUXVhbGl0eVxuXHQgICAgICAgICAgICB9KTtcblx0ICAgICAgICAgICAgICAgIHZhciBkYXRhVVJMID0gcmVmLmRhdGFVUkw7XG5cdCAgICAgICAgICAgICAgICB2YXIgZXh0ZW5zaW9uID0gcmVmLmV4dGVuc2lvbjtcblx0ICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG5cdCAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG9wdHMsIHtcblx0ICAgICAgICAgICAgICAgIGRhdGFVUkw6IGRhdGFVUkwsXG5cdCAgICAgICAgICAgICAgICBleHRlbnNpb246IGV4dGVuc2lvbixcblx0ICAgICAgICAgICAgICAgIHR5cGU6IHR5cGVcblx0ICAgICAgICAgICAgfSk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG9wdHM7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdCAgICB0aGlzLl9wcm9wcy5leHBvcnRpbmcgPSBmYWxzZTtcblx0ICAgIHRoaXMucmVzaXplKCk7XG5cdCAgICB0aGlzLnJlbmRlcigpO1xuXHQgICAgcmV0dXJuIFByb21pc2UuYWxsKGRyYXdSZXN1bHQubWFwKGZ1bmN0aW9uIChyZXN1bHQsIGksIGxheWVyTGlzdCkge1xuXHQgICAgICAgIHZhciBjdXJPcHQgPSBvYmplY3RBc3NpZ24oe1xuXHQgICAgICAgICAgICBleHRlbnNpb246ICcnLFxuXHQgICAgICAgICAgICBwcmVmaXg6ICcnLFxuXHQgICAgICAgICAgICBzdWZmaXg6ICcnXG5cdCAgICAgICAgfSwgZXhwb3J0T3B0cywgcmVzdWx0LCB7XG5cdCAgICAgICAgICAgIGxheWVyOiBpLFxuXHQgICAgICAgICAgICB0b3RhbExheWVyczogbGF5ZXJMaXN0Lmxlbmd0aFxuXHQgICAgICAgIH0pO1xuXHQgICAgICAgIHZhciBzYXZlUGFyYW0gPSBleHBvcnRPcHRzLnNhdmUgPT09IGZhbHNlID8gZmFsc2UgOiByZXN1bHQuc2F2ZTtcblx0ICAgICAgICBjdXJPcHQuc2F2ZSA9IHNhdmVQYXJhbSAhPT0gZmFsc2U7XG5cdCAgICAgICAgY3VyT3B0LmZpbGVuYW1lID0gcmVzb2x2ZUZpbGVuYW1lKGN1ck9wdCk7XG5cdCAgICAgICAgZGVsZXRlIGN1ck9wdC5lbmNvZGluZztcblx0ICAgICAgICBkZWxldGUgY3VyT3B0LmVuY29kaW5nUXVhbGl0eTtcblx0ICAgICAgICBmb3IgKHZhciBrIGluIGN1ck9wdCkge1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGN1ck9wdFtrXSA9PT0gJ3VuZGVmaW5lZCcpIFxuXHQgICAgICAgICAgICAgICAgeyBkZWxldGUgY3VyT3B0W2tdOyB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciBzYXZlUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh7fSk7XG5cdCAgICAgICAgaWYgKGN1ck9wdC5zYXZlKSB7XG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gY3VyT3B0LmRhdGE7XG5cdCAgICAgICAgICAgIGlmIChjdXJPcHQuZGF0YVVSTCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGRhdGFVUkwgPSBjdXJPcHQuZGF0YVVSTDtcblx0ICAgICAgICAgICAgICAgIHNhdmVQcm9taXNlID0gc2F2ZURhdGFVUkwoZGF0YVVSTCwgY3VyT3B0KTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHNhdmVQcm9taXNlID0gc2F2ZUZpbGUoZGF0YSwgY3VyT3B0KTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gc2F2ZVByb21pc2UudGhlbihmdW5jdGlvbiAoc2F2ZVJlc3VsdCkgeyByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY3VyT3B0LCBzYXZlUmVzdWx0KTsgfSk7XG5cdCAgICB9KSkudGhlbihmdW5jdGlvbiAoZXYpIHtcblx0ICAgICAgICB2YXIgc2F2ZWRFdmVudHMgPSBldi5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc2F2ZTsgfSk7XG5cdCAgICAgICAgaWYgKHNhdmVkRXZlbnRzLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICAgICAgdmFyIGV2ZW50V2l0aE91dHB1dCA9IHNhdmVkRXZlbnRzLmZpbmQoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUub3V0cHV0TmFtZTsgfSk7XG5cdCAgICAgICAgICAgIHZhciBpc0NsaWVudCA9IHNhdmVkRXZlbnRzLnNvbWUoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuY2xpZW50OyB9KTtcblx0ICAgICAgICAgICAgdmFyIGlzU3RyZWFtaW5nID0gc2F2ZWRFdmVudHMuc29tZShmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5zdHJlYW07IH0pO1xuXHQgICAgICAgICAgICB2YXIgaXRlbTtcblx0ICAgICAgICAgICAgaWYgKHNhdmVkRXZlbnRzLmxlbmd0aCA+IDEpIFxuXHQgICAgICAgICAgICAgICAgeyBpdGVtID0gc2F2ZWRFdmVudHMubGVuZ3RoOyB9XG5cdCAgICAgICAgICAgICBlbHNlIGlmIChldmVudFdpdGhPdXRwdXQpIFxuXHQgICAgICAgICAgICAgICAgeyBpdGVtID0gKGV2ZW50V2l0aE91dHB1dC5vdXRwdXROYW1lKSArIFwiL1wiICsgKHNhdmVkRXZlbnRzWzBdLmZpbGVuYW1lKTsgfVxuXHQgICAgICAgICAgICAgZWxzZSBcblx0ICAgICAgICAgICAgICAgIHsgaXRlbSA9IFwiXCIgKyAoc2F2ZWRFdmVudHNbMF0uZmlsZW5hbWUpOyB9XG5cdCAgICAgICAgICAgIHZhciBvZlNlcSA9ICcnO1xuXHQgICAgICAgICAgICBpZiAoZXhwb3J0T3B0cy5zZXF1ZW5jZSkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGhhc1RvdGFsRnJhbWVzID0gaXNGaW5pdGUodGhpcyQxLnByb3BzLnRvdGFsRnJhbWVzKTtcblx0ICAgICAgICAgICAgICAgIG9mU2VxID0gaGFzVG90YWxGcmFtZXMgPyAoXCIgKGZyYW1lIFwiICsgKGV4cG9ydE9wdHMuZnJhbWUgKyAxKSArIFwiIC8gXCIgKyAodGhpcyQxLnByb3BzLnRvdGFsRnJhbWVzKSArIFwiKVwiKSA6IChcIiAoZnJhbWUgXCIgKyAoZXhwb3J0T3B0cy5mcmFtZSkgKyBcIilcIik7XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAoc2F2ZWRFdmVudHMubGVuZ3RoID4gMSkge1xuXHQgICAgICAgICAgICAgICAgb2ZTZXEgPSBcIiBmaWxlc1wiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHZhciBjbGllbnQgPSBpc0NsaWVudCA/ICdjYW52YXMtc2tldGNoLWNsaScgOiAnY2FudmFzLXNrZXRjaCc7XG5cdCAgICAgICAgICAgIHZhciBhY3Rpb24gPSBpc1N0cmVhbWluZyA/ICdTdHJlYW1pbmcgaW50bycgOiAnRXhwb3J0ZWQnO1xuXHQgICAgICAgICAgICBjb25zb2xlLmxvZygoXCIlY1tcIiArIGNsaWVudCArIFwiXSVjIFwiICsgYWN0aW9uICsgXCIgJWNcIiArIGl0ZW0gKyBcIiVjXCIgKyBvZlNlcSksICdjb2xvcjogIzhlOGU4ZTsnLCAnY29sb3I6IGluaXRpYWw7JywgJ2ZvbnQtd2VpZ2h0OiBib2xkOycsICdmb250LXdlaWdodDogaW5pdGlhbDsnKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKHR5cGVvZiB0aGlzJDEuc2tldGNoLnBvc3RFeHBvcnQgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgdGhpcyQxLnNrZXRjaC5wb3N0RXhwb3J0KCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBldjtcblx0ICAgIH0pO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fd3JhcENvbnRleHRTY2FsZSA9IGZ1bmN0aW9uIF93cmFwQ29udGV4dFNjYWxlIChjYikge1xuXHQgICAgdGhpcy5fcHJlUmVuZGVyKCk7XG5cdCAgICBjYih0aGlzLnByb3BzKTtcblx0ICAgIHRoaXMuX3Bvc3RSZW5kZXIoKTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuX3ByZVJlbmRlciA9IGZ1bmN0aW9uIF9wcmVSZW5kZXIgKCkge1xuXHQgICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcztcblx0ICAgIGlmICghdGhpcy5wcm9wcy5nbCAmJiBwcm9wcy5jb250ZXh0ICYmICFwcm9wcy5wNSkge1xuXHQgICAgICAgIHByb3BzLmNvbnRleHQuc2F2ZSgpO1xuXHQgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNjYWxlQ29udGV4dCAhPT0gZmFsc2UpIHtcblx0ICAgICAgICAgICAgcHJvcHMuY29udGV4dC5zY2FsZShwcm9wcy5zY2FsZVgsIHByb3BzLnNjYWxlWSk7XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIGlmIChwcm9wcy5wNSkge1xuXHQgICAgICAgIHByb3BzLnA1LnNjYWxlKHByb3BzLnNjYWxlWCAvIHByb3BzLnBpeGVsUmF0aW8sIHByb3BzLnNjYWxlWSAvIHByb3BzLnBpeGVsUmF0aW8pO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fcG9zdFJlbmRlciA9IGZ1bmN0aW9uIF9wb3N0UmVuZGVyICgpIHtcblx0ICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcHM7XG5cdCAgICBpZiAoIXRoaXMucHJvcHMuZ2wgJiYgcHJvcHMuY29udGV4dCAmJiAhcHJvcHMucDUpIHtcblx0ICAgICAgICBwcm9wcy5jb250ZXh0LnJlc3RvcmUoKTtcblx0ICAgIH1cblx0ICAgIGlmIChwcm9wcy5nbCAmJiB0aGlzLnNldHRpbmdzLmZsdXNoICE9PSBmYWxzZSAmJiAhcHJvcHMucDUpIHtcblx0ICAgICAgICBwcm9wcy5nbC5mbHVzaCgpO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24gdGljayAoKSB7XG5cdCAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLnRpY2sgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICB0aGlzLl9wcmVSZW5kZXIoKTtcblx0ICAgICAgICB0aGlzLnNrZXRjaC50aWNrKHRoaXMucHJvcHMpO1xuXHQgICAgICAgIHRoaXMuX3Bvc3RSZW5kZXIoKTtcblx0ICAgIH1cblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICgpIHtcblx0ICAgIGlmICh0aGlzLnByb3BzLnA1KSB7XG5cdCAgICAgICAgdGhpcy5fbGFzdFJlZHJhd1Jlc3VsdCA9IHVuZGVmaW5lZDtcblx0ICAgICAgICB0aGlzLnByb3BzLnA1LnJlZHJhdygpO1xuXHQgICAgICAgIHJldHVybiB0aGlzLl9sYXN0UmVkcmF3UmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5zdWJtaXREcmF3Q2FsbCgpO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5zdWJtaXREcmF3Q2FsbCA9IGZ1bmN0aW9uIHN1Ym1pdERyYXdDYWxsICgpIHtcblx0ICAgIGlmICghdGhpcy5za2V0Y2gpIFxuXHQgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXHQgICAgdGhpcy5fcHJlUmVuZGVyKCk7XG5cdCAgICB2YXIgZHJhd1Jlc3VsdDtcblx0ICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2ggPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBkcmF3UmVzdWx0ID0gdGhpcy5za2V0Y2gocHJvcHMpO1xuXHQgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5za2V0Y2gucmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgZHJhd1Jlc3VsdCA9IHRoaXMuc2tldGNoLnJlbmRlcihwcm9wcyk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9wb3N0UmVuZGVyKCk7XG5cdCAgICByZXR1cm4gZHJhd1Jlc3VsdDtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvcHQpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblx0ICAgICAgICBpZiAoIG9wdCA9PT0gdm9pZCAwICkgb3B0ID0ge307XG5cblx0ICAgIHZhciBub3RZZXRTdXBwb3J0ZWQgPSBbJ2FuaW1hdGUnXTtcblx0ICAgIE9iamVjdC5rZXlzKG9wdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdCAgICAgICAgaWYgKG5vdFlldFN1cHBvcnRlZC5pbmRleE9mKGtleSkgPj0gMCkge1xuXHQgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKFwiU29ycnksIHRoZSB7IFwiICsga2V5ICsgXCIgfSBvcHRpb24gaXMgbm90IHlldCBzdXBwb3J0ZWQgd2l0aCB1cGRhdGUoKS5cIikpO1xuXHQgICAgICAgIH1cblx0ICAgIH0pO1xuXHQgICAgdmFyIG9sZENhbnZhcyA9IHRoaXMuX3NldHRpbmdzLmNhbnZhcztcblx0ICAgIHZhciBvbGRDb250ZXh0ID0gdGhpcy5fc2V0dGluZ3MuY29udGV4dDtcblx0ICAgIGZvciAodmFyIGtleSBpbiBvcHQpIHtcblx0ICAgICAgICB2YXIgdmFsdWUgPSBvcHRba2V5XTtcblx0ICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuXHQgICAgICAgICAgICB0aGlzJDEuX3NldHRpbmdzW2tleV0gPSB2YWx1ZTtcblx0ICAgICAgICB9XG5cdCAgICB9XG5cdCAgICB2YXIgdGltZU9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9zZXR0aW5ncywgb3B0KTtcblx0ICAgIGlmICgndGltZScgaW4gb3B0ICYmICdmcmFtZScgaW4gb3B0KSBcblx0ICAgICAgICB7IHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IHsgdGltZSB9IG9yIHsgZnJhbWUgfSBidXQgbm90IGJvdGgnKTsgfVxuXHQgICAgIGVsc2UgaWYgKCd0aW1lJyBpbiBvcHQpIFxuXHQgICAgICAgIHsgZGVsZXRlIHRpbWVPcHRzLmZyYW1lOyB9XG5cdCAgICAgZWxzZSBpZiAoJ2ZyYW1lJyBpbiBvcHQpIFxuXHQgICAgICAgIHsgZGVsZXRlIHRpbWVPcHRzLnRpbWU7IH1cblx0ICAgIGlmICgnZHVyYXRpb24nIGluIG9wdCAmJiAndG90YWxGcmFtZXMnIGluIG9wdCkgXG5cdCAgICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91bGQgc3BlY2lmeSB7IGR1cmF0aW9uIH0gb3IgeyB0b3RhbEZyYW1lcyB9IGJ1dCBub3QgYm90aCcpOyB9XG5cdCAgICAgZWxzZSBpZiAoJ2R1cmF0aW9uJyBpbiBvcHQpIFxuXHQgICAgICAgIHsgZGVsZXRlIHRpbWVPcHRzLnRvdGFsRnJhbWVzOyB9XG5cdCAgICAgZWxzZSBpZiAoJ3RvdGFsRnJhbWVzJyBpbiBvcHQpIFxuXHQgICAgICAgIHsgZGVsZXRlIHRpbWVPcHRzLmR1cmF0aW9uOyB9XG5cdCAgICBpZiAoJ2RhdGEnIGluIG9wdCkgXG5cdCAgICAgICAgeyB0aGlzLl9wcm9wcy5kYXRhID0gb3B0LmRhdGE7IH1cblx0ICAgIHZhciB0aW1lUHJvcHMgPSB0aGlzLmdldFRpbWVQcm9wcyh0aW1lT3B0cyk7XG5cdCAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Byb3BzLCB0aW1lUHJvcHMpO1xuXHQgICAgaWYgKG9sZENhbnZhcyAhPT0gdGhpcy5fc2V0dGluZ3MuY2FudmFzIHx8IG9sZENvbnRleHQgIT09IHRoaXMuX3NldHRpbmdzLmNvbnRleHQpIHtcblx0ICAgICAgICB2YXIgcmVmID0gY3JlYXRlQ2FudmFzKHRoaXMuX3NldHRpbmdzKTtcblx0ICAgICAgICAgICAgdmFyIGNhbnZhcyA9IHJlZi5jYW52YXM7XG5cdCAgICAgICAgICAgIHZhciBjb250ZXh0ID0gcmVmLmNvbnRleHQ7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5jYW52YXMgPSBjYW52YXM7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5jb250ZXh0ID0gY29udGV4dDtcblx0ICAgICAgICB0aGlzLl9zZXR1cEdMS2V5KCk7XG5cdCAgICAgICAgdGhpcy5fYXBwZW5kQ2FudmFzSWZOZWVkZWQoKTtcblx0ICAgIH1cblx0ICAgIGlmIChvcHQucDUgJiYgdHlwZW9mIG9wdC5wNSAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRoaXMucHJvcHMucDUgPSBvcHQucDU7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5wNS5kcmF3ID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgaWYgKHRoaXMkMS5faXNQNVJlc2l6aW5nKSBcblx0ICAgICAgICAgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICAgICAgICAgIHRoaXMkMS5fbGFzdFJlZHJhd1Jlc3VsdCA9IHRoaXMkMS5zdWJtaXREcmF3Q2FsbCgpO1xuXHQgICAgICAgIH0pO1xuXHQgICAgfVxuXHQgICAgaWYgKCdwbGF5aW5nJyBpbiBvcHQpIHtcblx0ICAgICAgICBpZiAob3B0LnBsYXlpbmcpIFxuXHQgICAgICAgICAgICB7IHRoaXMucGxheSgpOyB9XG5cdCAgICAgICAgIGVsc2UgXG5cdCAgICAgICAgICAgIHsgdGhpcy5wYXVzZSgpOyB9XG5cdCAgICB9XG5cdCAgICBjaGVja1NldHRpbmdzKHRoaXMuX3NldHRpbmdzKTtcblx0ICAgIHRoaXMucmVzaXplKCk7XG5cdCAgICB0aGlzLnJlbmRlcigpO1xuXHQgICAgcmV0dXJuIHRoaXMucHJvcHM7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uIHJlc2l6ZSAoKSB7XG5cdCAgICB2YXIgb2xkU2l6ZXMgPSB0aGlzLl9nZXRTaXplUHJvcHMoKTtcblx0ICAgIHZhciBzZXR0aW5ncyA9IHRoaXMuc2V0dGluZ3M7XG5cdCAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzO1xuXHQgICAgdmFyIG5ld1Byb3BzID0gcmVzaXplQ2FudmFzKHByb3BzLCBzZXR0aW5ncyk7XG5cdCAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Byb3BzLCBuZXdQcm9wcyk7XG5cdCAgICB2YXIgcmVmID0gdGhpcy5wcm9wcztcblx0ICAgICAgICB2YXIgcGl4ZWxSYXRpbyA9IHJlZi5waXhlbFJhdGlvO1xuXHQgICAgICAgIHZhciBjYW52YXNXaWR0aCA9IHJlZi5jYW52YXNXaWR0aDtcblx0ICAgICAgICB2YXIgY2FudmFzSGVpZ2h0ID0gcmVmLmNhbnZhc0hlaWdodDtcblx0ICAgICAgICB2YXIgc3R5bGVXaWR0aCA9IHJlZi5zdHlsZVdpZHRoO1xuXHQgICAgICAgIHZhciBzdHlsZUhlaWdodCA9IHJlZi5zdHlsZUhlaWdodDtcblx0ICAgIHZhciBjYW52YXMgPSB0aGlzLnByb3BzLmNhbnZhcztcblx0ICAgIGlmIChjYW52YXMgJiYgc2V0dGluZ3MucmVzaXplQ2FudmFzICE9PSBmYWxzZSkge1xuXHQgICAgICAgIGlmIChwcm9wcy5wNSkge1xuXHQgICAgICAgICAgICBpZiAoY2FudmFzLndpZHRoICE9PSBjYW52YXNXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBjYW52YXNIZWlnaHQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2lzUDVSZXNpemluZyA9IHRydWU7XG5cdCAgICAgICAgICAgICAgICBwcm9wcy5wNS5waXhlbERlbnNpdHkocGl4ZWxSYXRpbyk7XG5cdCAgICAgICAgICAgICAgICBwcm9wcy5wNS5yZXNpemVDYW52YXMoY2FudmFzV2lkdGggLyBwaXhlbFJhdGlvLCBjYW52YXNIZWlnaHQgLyBwaXhlbFJhdGlvLCBmYWxzZSk7XG5cdCAgICAgICAgICAgICAgICB0aGlzLl9pc1A1UmVzaXppbmcgPSBmYWxzZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIGlmIChjYW52YXMud2lkdGggIT09IGNhbnZhc1dpZHRoKSBcblx0ICAgICAgICAgICAgICAgIHsgY2FudmFzLndpZHRoID0gY2FudmFzV2lkdGg7IH1cblx0ICAgICAgICAgICAgaWYgKGNhbnZhcy5oZWlnaHQgIT09IGNhbnZhc0hlaWdodCkgXG5cdCAgICAgICAgICAgICAgICB7IGNhbnZhcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQ7IH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGlzQnJvd3NlcigpICYmIHNldHRpbmdzLnN0eWxlQ2FudmFzICE9PSBmYWxzZSkge1xuXHQgICAgICAgICAgICBjYW52YXMuc3R5bGUud2lkdGggPSBzdHlsZVdpZHRoICsgXCJweFwiO1xuXHQgICAgICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgKyBcInB4XCI7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHQgICAgdmFyIG5ld1NpemVzID0gdGhpcy5fZ2V0U2l6ZVByb3BzKCk7XG5cdCAgICB2YXIgY2hhbmdlZCA9ICFkZWVwRXF1YWxfMShvbGRTaXplcywgbmV3U2l6ZXMpO1xuXHQgICAgaWYgKGNoYW5nZWQpIHtcblx0ICAgICAgICB0aGlzLl9zaXplQ2hhbmdlZCgpO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGNoYW5nZWQ7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9zaXplQ2hhbmdlZCA9IGZ1bmN0aW9uIF9zaXplQ2hhbmdlZCAoKSB7XG5cdCAgICBpZiAodGhpcy5za2V0Y2ggJiYgdHlwZW9mIHRoaXMuc2tldGNoLnJlc2l6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIHRoaXMuc2tldGNoLnJlc2l6ZSh0aGlzLnByb3BzKTtcblx0ICAgIH1cblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUgKCkge1xuXHQgICAgaWYgKCF0aGlzLnByb3BzLnBsYXlpbmcpIFxuXHQgICAgICAgIHsgcmV0dXJuOyB9XG5cdCAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG5cdCAgICAgICAgY29uc29sZS5lcnJvcignW2NhbnZhcy1za2V0Y2hdIFdBUk46IEFuaW1hdGlvbiBpbiBOb2RlLmpzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9hbmltYXRlSGFuZGxlcik7XG5cdCAgICB2YXIgbm93ID0gYnJvd3NlcigpO1xuXHQgICAgdmFyIGZwcyA9IHRoaXMucHJvcHMuZnBzO1xuXHQgICAgdmFyIGZyYW1lSW50ZXJ2YWxNUyA9IDEwMDAgLyBmcHM7XG5cdCAgICB2YXIgZGVsdGFUaW1lTVMgPSBub3cgLSB0aGlzLl9sYXN0VGltZTtcblx0ICAgIHZhciBkdXJhdGlvbiA9IHRoaXMucHJvcHMuZHVyYXRpb247XG5cdCAgICB2YXIgaGFzRHVyYXRpb24gPSB0eXBlb2YgZHVyYXRpb24gPT09ICdudW1iZXInICYmIGlzRmluaXRlKGR1cmF0aW9uKTtcblx0ICAgIHZhciBpc05ld0ZyYW1lID0gdHJ1ZTtcblx0ICAgIHZhciBwbGF5YmFja1JhdGUgPSB0aGlzLnNldHRpbmdzLnBsYXliYWNrUmF0ZTtcblx0ICAgIGlmIChwbGF5YmFja1JhdGUgPT09ICdmaXhlZCcpIHtcblx0ICAgICAgICBkZWx0YVRpbWVNUyA9IGZyYW1lSW50ZXJ2YWxNUztcblx0ICAgIH0gZWxzZSBpZiAocGxheWJhY2tSYXRlID09PSAndGhyb3R0bGUnKSB7XG5cdCAgICAgICAgaWYgKGRlbHRhVGltZU1TID4gZnJhbWVJbnRlcnZhbE1TKSB7XG5cdCAgICAgICAgICAgIG5vdyA9IG5vdyAtIGRlbHRhVGltZU1TICUgZnJhbWVJbnRlcnZhbE1TO1xuXHQgICAgICAgICAgICB0aGlzLl9sYXN0VGltZSA9IG5vdztcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpc05ld0ZyYW1lID0gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9sYXN0VGltZSA9IG5vdztcblx0ICAgIH1cblx0ICAgIHZhciBkZWx0YVRpbWUgPSBkZWx0YVRpbWVNUyAvIDEwMDA7XG5cdCAgICB2YXIgbmV3VGltZSA9IHRoaXMucHJvcHMudGltZSArIGRlbHRhVGltZSAqIHRoaXMucHJvcHMudGltZVNjYWxlO1xuXHQgICAgaWYgKG5ld1RpbWUgPCAwICYmIGhhc0R1cmF0aW9uKSB7XG5cdCAgICAgICAgbmV3VGltZSA9IGR1cmF0aW9uICsgbmV3VGltZTtcblx0ICAgIH1cblx0ICAgIHZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cdCAgICB2YXIgaXNMb29wU3RhcnQgPSBmYWxzZTtcblx0ICAgIHZhciBsb29waW5nID0gdGhpcy5zZXR0aW5ncy5sb29wICE9PSBmYWxzZTtcblx0ICAgIGlmIChoYXNEdXJhdGlvbiAmJiBuZXdUaW1lID49IGR1cmF0aW9uKSB7XG5cdCAgICAgICAgaWYgKGxvb3BpbmcpIHtcblx0ICAgICAgICAgICAgaXNOZXdGcmFtZSA9IHRydWU7XG5cdCAgICAgICAgICAgIG5ld1RpbWUgPSBuZXdUaW1lICUgZHVyYXRpb247XG5cdCAgICAgICAgICAgIGlzTG9vcFN0YXJ0ID0gdHJ1ZTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBpc05ld0ZyYW1lID0gZmFsc2U7XG5cdCAgICAgICAgICAgIG5ld1RpbWUgPSBkdXJhdGlvbjtcblx0ICAgICAgICAgICAgaXNGaW5pc2hlZCA9IHRydWU7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMuX3NpZ25hbEVuZCgpO1xuXHQgICAgfVxuXHQgICAgaWYgKGlzTmV3RnJhbWUpIHtcblx0ICAgICAgICB0aGlzLnByb3BzLmRlbHRhVGltZSA9IGRlbHRhVGltZTtcblx0ICAgICAgICB0aGlzLnByb3BzLnRpbWUgPSBuZXdUaW1lO1xuXHQgICAgICAgIHRoaXMucHJvcHMucGxheWhlYWQgPSB0aGlzLl9jb21wdXRlUGxheWhlYWQobmV3VGltZSwgZHVyYXRpb24pO1xuXHQgICAgICAgIHZhciBsYXN0RnJhbWUgPSB0aGlzLnByb3BzLmZyYW1lO1xuXHQgICAgICAgIHRoaXMucHJvcHMuZnJhbWUgPSB0aGlzLl9jb21wdXRlQ3VycmVudEZyYW1lKCk7XG5cdCAgICAgICAgaWYgKGlzTG9vcFN0YXJ0KSBcblx0ICAgICAgICAgICAgeyB0aGlzLl9zaWduYWxCZWdpbigpOyB9XG5cdCAgICAgICAgaWYgKGxhc3RGcmFtZSAhPT0gdGhpcy5wcm9wcy5mcmFtZSkgXG5cdCAgICAgICAgICAgIHsgdGhpcy50aWNrKCk7IH1cblx0ICAgICAgICB0aGlzLnJlbmRlcigpO1xuXHQgICAgICAgIHRoaXMucHJvcHMuZGVsdGFUaW1lID0gMDtcblx0ICAgIH1cblx0ICAgIGlmIChpc0ZpbmlzaGVkKSB7XG5cdCAgICAgICAgdGhpcy5wYXVzZSgpO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5kaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoIChjYikge1xuXHQgICAgaWYgKHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykgXG5cdCAgICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoJ211c3QgcGFzcyBmdW5jdGlvbiBpbnRvIGRpc3BhdGNoKCknKTsgfVxuXHQgICAgY2IodGhpcy5wcm9wcyk7XG5cdCAgICB0aGlzLnJlbmRlcigpO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5tb3VudCA9IGZ1bmN0aW9uIG1vdW50ICgpIHtcblx0ICAgIHRoaXMuX2FwcGVuZENhbnZhc0lmTmVlZGVkKCk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLnVubW91bnQgPSBmdW5jdGlvbiB1bm1vdW50ICgpIHtcblx0ICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuXHQgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemVIYW5kbGVyKTtcblx0ICAgICAgICB0aGlzLl9rZXlib2FyZFNob3J0Y3V0cy5kZXRhY2goKTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLnByb3BzLmNhbnZhcy5wYXJlbnRFbGVtZW50KSB7XG5cdCAgICAgICAgdGhpcy5wcm9wcy5jYW52YXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLnByb3BzLmNhbnZhcyk7XG5cdCAgICB9XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLl9hcHBlbmRDYW52YXNJZk5lZWRlZCA9IGZ1bmN0aW9uIF9hcHBlbmRDYW52YXNJZk5lZWRlZCAoKSB7XG5cdCAgICBpZiAoIWlzQnJvd3NlcigpKSBcblx0ICAgICAgICB7IHJldHVybjsgfVxuXHQgICAgaWYgKHRoaXMuc2V0dGluZ3MucGFyZW50ICE9PSBmYWxzZSAmJiAodGhpcy5wcm9wcy5jYW52YXMgJiYgIXRoaXMucHJvcHMuY2FudmFzLnBhcmVudEVsZW1lbnQpKSB7XG5cdCAgICAgICAgdmFyIGRlZmF1bHRQYXJlbnQgPSB0aGlzLnNldHRpbmdzLnBhcmVudCB8fCBkb2N1bWVudC5ib2R5O1xuXHQgICAgICAgIGRlZmF1bHRQYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5wcm9wcy5jYW52YXMpO1xuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5fc2V0dXBHTEtleSA9IGZ1bmN0aW9uIF9zZXR1cEdMS2V5ICgpIHtcblx0ICAgIGlmICh0aGlzLnByb3BzLmNvbnRleHQpIHtcblx0ICAgICAgICBpZiAoaXNXZWJHTENvbnRleHQodGhpcy5wcm9wcy5jb250ZXh0KSkge1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9wcy5nbCA9IHRoaXMucHJvcHMuY29udGV4dDtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICBkZWxldGUgdGhpcy5fcHJvcHMuZ2w7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5nZXRUaW1lUHJvcHMgPSBmdW5jdGlvbiBnZXRUaW1lUHJvcHMgKHNldHRpbmdzKSB7XG5cdCAgICAgICAgaWYgKCBzZXR0aW5ncyA9PT0gdm9pZCAwICkgc2V0dGluZ3MgPSB7fTtcblxuXHQgICAgdmFyIGR1cmF0aW9uID0gc2V0dGluZ3MuZHVyYXRpb247XG5cdCAgICB2YXIgdG90YWxGcmFtZXMgPSBzZXR0aW5ncy50b3RhbEZyYW1lcztcblx0ICAgIHZhciB0aW1lU2NhbGUgPSBkZWZpbmVkKHNldHRpbmdzLnRpbWVTY2FsZSwgMSk7XG5cdCAgICB2YXIgZnBzID0gZGVmaW5lZChzZXR0aW5ncy5mcHMsIDI0KTtcblx0ICAgIHZhciBoYXNEdXJhdGlvbiA9IHR5cGVvZiBkdXJhdGlvbiA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoZHVyYXRpb24pO1xuXHQgICAgdmFyIGhhc1RvdGFsRnJhbWVzID0gdHlwZW9mIHRvdGFsRnJhbWVzID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh0b3RhbEZyYW1lcyk7XG5cdCAgICB2YXIgdG90YWxGcmFtZXNGcm9tRHVyYXRpb24gPSBoYXNEdXJhdGlvbiA/IE1hdGguZmxvb3IoZnBzICogZHVyYXRpb24pIDogdW5kZWZpbmVkO1xuXHQgICAgdmFyIGR1cmF0aW9uRnJvbVRvdGFsRnJhbWVzID0gaGFzVG90YWxGcmFtZXMgPyB0b3RhbEZyYW1lcyAvIGZwcyA6IHVuZGVmaW5lZDtcblx0ICAgIGlmIChoYXNEdXJhdGlvbiAmJiBoYXNUb3RhbEZyYW1lcyAmJiB0b3RhbEZyYW1lc0Zyb21EdXJhdGlvbiAhPT0gdG90YWxGcmFtZXMpIHtcblx0ICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91bGQgc3BlY2lmeSBlaXRoZXIgZHVyYXRpb24gb3IgdG90YWxGcmFtZXMsIGJ1dCBub3QgYm90aC4gT3IsIHRoZXkgbXVzdCBtYXRjaCBleGFjdGx5LicpO1xuXHQgICAgfVxuXHQgICAgaWYgKHR5cGVvZiBzZXR0aW5ncy5kaW1lbnNpb25zID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygc2V0dGluZ3MudW5pdHMgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgY29uc29sZS53YXJuKFwiWW91J3ZlIHNwZWNpZmllZCBhIHsgdW5pdHMgfSBzZXR0aW5nIGJ1dCBubyB7IGRpbWVuc2lvbiB9LCBzbyB0aGUgdW5pdHMgd2lsbCBiZSBpZ25vcmVkLlwiKTtcblx0ICAgIH1cblx0ICAgIHRvdGFsRnJhbWVzID0gZGVmaW5lZCh0b3RhbEZyYW1lcywgdG90YWxGcmFtZXNGcm9tRHVyYXRpb24sIEluZmluaXR5KTtcblx0ICAgIGR1cmF0aW9uID0gZGVmaW5lZChkdXJhdGlvbiwgZHVyYXRpb25Gcm9tVG90YWxGcmFtZXMsIEluZmluaXR5KTtcblx0ICAgIHZhciBzdGFydFRpbWUgPSBzZXR0aW5ncy50aW1lO1xuXHQgICAgdmFyIHN0YXJ0RnJhbWUgPSBzZXR0aW5ncy5mcmFtZTtcblx0ICAgIHZhciBoYXNTdGFydFRpbWUgPSB0eXBlb2Ygc3RhcnRUaW1lID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShzdGFydFRpbWUpO1xuXHQgICAgdmFyIGhhc1N0YXJ0RnJhbWUgPSB0eXBlb2Ygc3RhcnRGcmFtZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoc3RhcnRGcmFtZSk7XG5cdCAgICB2YXIgdGltZSA9IDA7XG5cdCAgICB2YXIgZnJhbWUgPSAwO1xuXHQgICAgdmFyIHBsYXloZWFkID0gMDtcblx0ICAgIGlmIChoYXNTdGFydFRpbWUgJiYgaGFzU3RhcnRGcmFtZSkge1xuXHQgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBzcGVjaWZ5IGVpdGhlciBzdGFydCBmcmFtZSBvciB0aW1lLCBidXQgbm90IGJvdGguJyk7XG5cdCAgICB9IGVsc2UgaWYgKGhhc1N0YXJ0VGltZSkge1xuXHQgICAgICAgIHRpbWUgPSBzdGFydFRpbWU7XG5cdCAgICAgICAgcGxheWhlYWQgPSB0aGlzLl9jb21wdXRlUGxheWhlYWQodGltZSwgZHVyYXRpb24pO1xuXHQgICAgICAgIGZyYW1lID0gdGhpcy5fY29tcHV0ZUZyYW1lKHBsYXloZWFkLCB0aW1lLCB0b3RhbEZyYW1lcywgZnBzKTtcblx0ICAgIH0gZWxzZSBpZiAoaGFzU3RhcnRGcmFtZSkge1xuXHQgICAgICAgIGZyYW1lID0gc3RhcnRGcmFtZTtcblx0ICAgICAgICB0aW1lID0gZnJhbWUgLyBmcHM7XG5cdCAgICAgICAgcGxheWhlYWQgPSB0aGlzLl9jb21wdXRlUGxheWhlYWQodGltZSwgZHVyYXRpb24pO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHtcblx0ICAgICAgICBwbGF5aGVhZDogcGxheWhlYWQsXG5cdCAgICAgICAgdGltZTogdGltZSxcblx0ICAgICAgICBmcmFtZTogZnJhbWUsXG5cdCAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuXHQgICAgICAgIHRvdGFsRnJhbWVzOiB0b3RhbEZyYW1lcyxcblx0ICAgICAgICBmcHM6IGZwcyxcblx0ICAgICAgICB0aW1lU2NhbGU6IHRpbWVTY2FsZVxuXHQgICAgfTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbiBzZXR1cCAoc2V0dGluZ3MpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblx0ICAgICAgICBpZiAoIHNldHRpbmdzID09PSB2b2lkIDAgKSBzZXR0aW5ncyA9IHt9O1xuXG5cdCAgICBpZiAodGhpcy5za2V0Y2gpIFxuXHQgICAgICAgIHsgdGhyb3cgbmV3IEVycm9yKCdNdWx0aXBsZSBzZXR1cCgpIGNhbGxzIG5vdCB5ZXQgc3VwcG9ydGVkLicpOyB9XG5cdCAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzLCB0aGlzLl9zZXR0aW5ncyk7XG5cdCAgICBjaGVja1NldHRpbmdzKHRoaXMuX3NldHRpbmdzKTtcblx0ICAgIHZhciByZWYgPSBjcmVhdGVDYW52YXModGhpcy5fc2V0dGluZ3MpO1xuXHQgICAgICAgIHZhciBjb250ZXh0ID0gcmVmLmNvbnRleHQ7XG5cdCAgICAgICAgdmFyIGNhbnZhcyA9IHJlZi5jYW52YXM7XG5cdCAgICB2YXIgdGltZVByb3BzID0gdGhpcy5nZXRUaW1lUHJvcHModGhpcy5fc2V0dGluZ3MpO1xuXHQgICAgdGhpcy5fcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aW1lUHJvcHMsXG5cdCAgICAgICAge2NhbnZhczogY2FudmFzLFxuXHQgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG5cdCAgICAgICAgZGVsdGFUaW1lOiAwLFxuXHQgICAgICAgIHN0YXJ0ZWQ6IGZhbHNlLFxuXHQgICAgICAgIGV4cG9ydGluZzogZmFsc2UsXG5cdCAgICAgICAgcGxheWluZzogZmFsc2UsXG5cdCAgICAgICAgcmVjb3JkaW5nOiBmYWxzZSxcblx0ICAgICAgICBzZXR0aW5nczogdGhpcy5zZXR0aW5ncyxcblx0ICAgICAgICBkYXRhOiB0aGlzLnNldHRpbmdzLmRhdGEsXG5cdCAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEucmVuZGVyKCk7IH0sXG5cdCAgICAgICAgdG9nZ2xlUGxheTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnRvZ2dsZVBsYXkoKTsgfSxcblx0ICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gKGNiKSB7IHJldHVybiB0aGlzJDEuZGlzcGF0Y2goY2IpOyB9LFxuXHQgICAgICAgIHRpY2s6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS50aWNrKCk7IH0sXG5cdCAgICAgICAgcmVzaXplOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzJDEucmVzaXplKCk7IH0sXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAob3B0KSB7IHJldHVybiB0aGlzJDEudXBkYXRlKG9wdCk7IH0sXG5cdCAgICAgICAgZXhwb3J0RnJhbWU6IGZ1bmN0aW9uIChvcHQpIHsgcmV0dXJuIHRoaXMkMS5leHBvcnRGcmFtZShvcHQpOyB9LFxuXHQgICAgICAgIHJlY29yZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLnJlY29yZCgpOyB9LFxuXHQgICAgICAgIHBsYXk6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5wbGF5KCk7IH0sXG5cdCAgICAgICAgcGF1c2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5wYXVzZSgpOyB9LFxuXHQgICAgICAgIHN0b3A6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5zdG9wKCk7IH19KTtcblx0ICAgIHRoaXMuX3NldHVwR0xLZXkoKTtcblx0ICAgIHRoaXMucmVzaXplKCk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmxvYWRBbmRSdW4gPSBmdW5jdGlvbiBsb2FkQW5kUnVuIChjYW52YXNTa2V0Y2gsIG5ld1NldHRpbmdzKSB7XG5cdCAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0ICAgIHJldHVybiB0aGlzLmxvYWQoY2FudmFzU2tldGNoLCBuZXdTZXR0aW5ncykudGhlbihmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdGhpcyQxLnJ1bigpO1xuXHQgICAgICAgIHJldHVybiB0aGlzJDE7XG5cdCAgICB9KTtcblx0fTtcblx0U2tldGNoTWFuYWdlci5wcm90b3R5cGUudW5sb2FkID0gZnVuY3Rpb24gdW5sb2FkICgpIHtcblx0ICAgICAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuXHQgICAgdGhpcy5wYXVzZSgpO1xuXHQgICAgaWYgKCF0aGlzLnNrZXRjaCkgXG5cdCAgICAgICAgeyByZXR1cm47IH1cblx0ICAgIGlmICh0eXBlb2YgdGhpcy5za2V0Y2gudW5sb2FkID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhpcy5fd3JhcENvbnRleHRTY2FsZShmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIHRoaXMkMS5za2V0Y2gudW5sb2FkKHByb3BzKTsgfSk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9za2V0Y2ggPSBudWxsO1xuXHR9O1xuXHRTa2V0Y2hNYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG5cdCAgICB0aGlzLnVubG9hZCgpO1xuXHQgICAgdGhpcy51bm1vdW50KCk7XG5cdH07XG5cdFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiBsb2FkIChjcmVhdGVTa2V0Y2gsIG5ld1NldHRpbmdzKSB7XG5cdCAgICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cblx0ICAgIGlmICh0eXBlb2YgY3JlYXRlU2tldGNoICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgZnVuY3Rpb24gbXVzdCB0YWtlIGluIGEgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IHBhcmFtZXRlci4gRXhhbXBsZTpcXG4gIGNhbnZhc1NrZXRjaGVyKCgpID0+IHsgLi4uIH0sIHNldHRpbmdzKScpO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuc2tldGNoKSB7XG5cdCAgICAgICAgdGhpcy51bmxvYWQoKTtcblx0ICAgIH1cblx0ICAgIGlmICh0eXBlb2YgbmV3U2V0dGluZ3MgIT09ICd1bmRlZmluZWQnKSB7XG5cdCAgICAgICAgdGhpcy51cGRhdGUobmV3U2V0dGluZ3MpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fcHJlUmVuZGVyKCk7XG5cdCAgICB2YXIgcHJlbG9hZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuXHQgICAgaWYgKHRoaXMuc2V0dGluZ3MucDUpIHtcblx0ICAgICAgICBpZiAoIWlzQnJvd3NlcigpKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW2NhbnZhcy1za2V0Y2hdIEVSUk9SOiBVc2luZyBwNS5qcyBpbiBOb2RlLmpzIGlzIG5vdCBzdXBwb3J0ZWQnKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcHJlbG9hZCA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdCAgICAgICAgICAgIHZhciBQNUNvbnN0cnVjdG9yID0gdGhpcyQxLnNldHRpbmdzLnA1O1xuXHQgICAgICAgICAgICB2YXIgcHJlbG9hZDtcblx0ICAgICAgICAgICAgaWYgKFA1Q29uc3RydWN0b3IucDUpIHtcblx0ICAgICAgICAgICAgICAgIHByZWxvYWQgPSBQNUNvbnN0cnVjdG9yLnByZWxvYWQ7XG5cdCAgICAgICAgICAgICAgICBQNUNvbnN0cnVjdG9yID0gUDVDb25zdHJ1Y3Rvci5wNTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgcDVTa2V0Y2ggPSBmdW5jdGlvbiAocDUpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChwcmVsb2FkKSBcblx0ICAgICAgICAgICAgICAgICAgICB7IHA1LnByZWxvYWQgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gcHJlbG9hZChwNSk7IH0pOyB9XG5cdCAgICAgICAgICAgICAgICBwNS5zZXR1cCA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzID0gdGhpcyQxLnByb3BzO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBpc0dMID0gdGhpcyQxLnNldHRpbmdzLmNvbnRleHQgPT09ICd3ZWJnbCc7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHJlbmRlcmVyID0gaXNHTCA/IHA1LldFQkdMIDogcDUuUDJEO1xuXHQgICAgICAgICAgICAgICAgICAgIHA1Lm5vTG9vcCgpO1xuXHQgICAgICAgICAgICAgICAgICAgIHA1LnBpeGVsRGVuc2l0eShwcm9wcy5waXhlbFJhdGlvKTtcblx0ICAgICAgICAgICAgICAgICAgICBwNS5jcmVhdGVDYW52YXMocHJvcHMudmlld3BvcnRXaWR0aCwgcHJvcHMudmlld3BvcnRIZWlnaHQsIHJlbmRlcmVyKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoaXNHTCAmJiB0aGlzJDEuc2V0dGluZ3MuYXR0cmlidXRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBwNS5zZXRBdHRyaWJ1dGVzKHRoaXMkMS5zZXR0aW5ncy5hdHRyaWJ1dGVzKTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcyQxLnVwZGF0ZSh7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHA1OiBwNSxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzOiBwNS5jYW52YXMsXG5cdCAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHA1Ll9yZW5kZXJlci5kcmF3aW5nQ29udGV4dFxuXHQgICAgICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcblx0ICAgICAgICAgICAgICAgIH0pO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICBpZiAodHlwZW9mIFA1Q29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICAgICAgICAgIG5ldyBQNUNvbnN0cnVjdG9yKHA1U2tldGNoKTtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmNyZWF0ZUNhbnZhcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInsgcDUgfSBzZXR0aW5nIGlzIHBhc3NlZCBidXQgY2FuJ3QgZmluZCBwNS5qcyBpbiBnbG9iYWwgKHdpbmRvdykgc2NvcGUuIE1heWJlIHlvdSBkaWQgbm90IGNyZWF0ZSBpdCBnbG9iYWxseT9cXG5uZXcgcDUoKTsgLy8gPC0tIGF0dGFjaGVzIHRvIGdsb2JhbCBzY29wZVwiKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIHA1U2tldGNoKHdpbmRvdyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9KTtcblx0ICAgIH1cblx0ICAgIHJldHVybiBwcmVsb2FkLnRoZW4oZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHZhciBsb2FkZXIgPSBjcmVhdGVTa2V0Y2godGhpcyQxLnByb3BzKTtcblx0ICAgICAgICBpZiAoIWlzUHJvbWlzZV8xKGxvYWRlcikpIHtcblx0ICAgICAgICAgICAgbG9hZGVyID0gUHJvbWlzZS5yZXNvbHZlKGxvYWRlcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBsb2FkZXI7XG5cdCAgICB9KS50aGVuKGZ1bmN0aW9uIChza2V0Y2gpIHtcblx0ICAgICAgICBpZiAoIXNrZXRjaCkgXG5cdCAgICAgICAgICAgIHsgc2tldGNoID0ge307IH1cblx0ICAgICAgICB0aGlzJDEuX3NrZXRjaCA9IHNrZXRjaDtcblx0ICAgICAgICBpZiAoaXNCcm93c2VyKCkpIHtcblx0ICAgICAgICAgICAgdGhpcyQxLl9rZXlib2FyZFNob3J0Y3V0cy5hdHRhY2goKTtcblx0ICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMkMS5fcmVzaXplSGFuZGxlcik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHRoaXMkMS5fcG9zdFJlbmRlcigpO1xuXHQgICAgICAgIHRoaXMkMS5fc2l6ZUNoYW5nZWQoKTtcblx0ICAgICAgICByZXR1cm4gdGhpcyQxO1xuXHQgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuXHQgICAgICAgIGNvbnNvbGUud2FybignQ291bGQgbm90IHN0YXJ0IHNrZXRjaCwgdGhlIGFzeW5jIGxvYWRpbmcgZnVuY3Rpb24gcmVqZWN0ZWQgd2l0aCBhbiBlcnJvcjpcXG4gICAgRXJyb3I6ICcgKyBlcnIubWVzc2FnZSk7XG5cdCAgICAgICAgdGhyb3cgZXJyO1xuXHQgICAgfSk7XG5cdH07XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFNrZXRjaE1hbmFnZXIucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxuXHR2YXIgQ0FDSEUgPSAnaG90LWlkLWNhY2hlJztcblx0dmFyIHJ1bnRpbWVDb2xsaXNpb25zID0gW107XG5cdGZ1bmN0aW9uIGlzSG90UmVsb2FkKCkge1xuXHQgICAgdmFyIGNsaWVudCA9IGdldENsaWVudEFQSSgpO1xuXHQgICAgcmV0dXJuIGNsaWVudCAmJiBjbGllbnQuaG90O1xuXHR9XG5cblx0ZnVuY3Rpb24gY2FjaGVHZXQoaWQpIHtcblx0ICAgIHZhciBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcblx0ICAgIGlmICghY2xpZW50KSBcblx0ICAgICAgICB7IHJldHVybiB1bmRlZmluZWQ7IH1cblx0ICAgIGNsaWVudFtDQUNIRV0gPSBjbGllbnRbQ0FDSEVdIHx8IHt9O1xuXHQgICAgcmV0dXJuIGNsaWVudFtDQUNIRV1baWRdO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2FjaGVQdXQoaWQsIGRhdGEpIHtcblx0ICAgIHZhciBjbGllbnQgPSBnZXRDbGllbnRBUEkoKTtcblx0ICAgIGlmICghY2xpZW50KSBcblx0ICAgICAgICB7IHJldHVybiB1bmRlZmluZWQ7IH1cblx0ICAgIGNsaWVudFtDQUNIRV0gPSBjbGllbnRbQ0FDSEVdIHx8IHt9O1xuXHQgICAgY2xpZW50W0NBQ0hFXVtpZF0gPSBkYXRhO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0VGltZVByb3Aob2xkTWFuYWdlciwgbmV3U2V0dGluZ3MpIHtcblx0ICAgIHJldHVybiBuZXdTZXR0aW5ncy5hbmltYXRlID8ge1xuXHQgICAgICAgIHRpbWU6IG9sZE1hbmFnZXIucHJvcHMudGltZVxuXHQgICAgfSA6IHVuZGVmaW5lZDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNhbnZhc1NrZXRjaChza2V0Y2gsIHNldHRpbmdzKSB7XG5cdCAgICBpZiAoIHNldHRpbmdzID09PSB2b2lkIDAgKSBzZXR0aW5ncyA9IHt9O1xuXG5cdCAgICBpZiAoc2V0dGluZ3MucDUpIHtcblx0ICAgICAgICBpZiAoc2V0dGluZ3MuY2FudmFzIHx8IHNldHRpbmdzLmNvbnRleHQgJiYgdHlwZW9mIHNldHRpbmdzLmNvbnRleHQgIT09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluIHsgcDUgfSBtb2RlLCB5b3UgY2FuJ3QgcGFzcyB5b3VyIG93biBjYW52YXMgb3IgY29udGV4dCwgdW5sZXNzIHRoZSBjb250ZXh0IGlzIGEgXFxcIndlYmdsXFxcIiBvciBcXFwiMmRcXFwiIHN0cmluZ1wiKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgdmFyIGNvbnRleHQgPSB0eXBlb2Ygc2V0dGluZ3MuY29udGV4dCA9PT0gJ3N0cmluZycgPyBzZXR0aW5ncy5jb250ZXh0IDogZmFsc2U7XG5cdCAgICAgICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncywge1xuXHQgICAgICAgICAgICBjYW52YXM6IGZhbHNlLFxuXHQgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XG5cdCAgICAgICAgfSk7XG5cdCAgICB9XG5cdCAgICB2YXIgaXNIb3QgPSBpc0hvdFJlbG9hZCgpO1xuXHQgICAgdmFyIGhvdElEO1xuXHQgICAgaWYgKGlzSG90KSB7XG5cdCAgICAgICAgaG90SUQgPSBkZWZpbmVkKHNldHRpbmdzLmlkLCAnJF9fREVGQVVMVF9DQU5WQVNfU0tFVENIX0lEX18kJyk7XG5cdCAgICB9XG5cdCAgICB2YXIgaXNJbmplY3RpbmcgPSBpc0hvdCAmJiB0eXBlb2YgaG90SUQgPT09ICdzdHJpbmcnO1xuXHQgICAgaWYgKGlzSW5qZWN0aW5nICYmIHJ1bnRpbWVDb2xsaXNpb25zLmluY2x1ZGVzKGhvdElEKSkge1xuXHQgICAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IFlvdSBoYXZlIG11bHRpcGxlIGNhbGxzIHRvIGNhbnZhc1NrZXRjaCgpIGluIC0taG90IG1vZGUuIFlvdSBtdXN0IHBhc3MgdW5pcXVlIHsgaWQgfSBzdHJpbmdzIGluIHNldHRpbmdzIHRvIGVuYWJsZSBob3QgcmVsb2FkIGFjcm9zcyBtdWx0aXBsZSBza2V0Y2hlcy4gXCIsIGhvdElEKTtcblx0ICAgICAgICBpc0luamVjdGluZyA9IGZhbHNlO1xuXHQgICAgfVxuXHQgICAgdmFyIHByZWxvYWQgPSBQcm9taXNlLnJlc29sdmUoKTtcblx0ICAgIGlmIChpc0luamVjdGluZykge1xuXHQgICAgICAgIHJ1bnRpbWVDb2xsaXNpb25zLnB1c2goaG90SUQpO1xuXHQgICAgICAgIHZhciBwcmV2aW91c0RhdGEgPSBjYWNoZUdldChob3RJRCk7XG5cdCAgICAgICAgaWYgKHByZXZpb3VzRGF0YSkge1xuXHQgICAgICAgICAgICB2YXIgbmV4dCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBuZXdQcm9wcyA9IGdldFRpbWVQcm9wKHByZXZpb3VzRGF0YS5tYW5hZ2VyLCBzZXR0aW5ncyk7XG5cdCAgICAgICAgICAgICAgICBwcmV2aW91c0RhdGEubWFuYWdlci5kZXN0cm95KCk7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gbmV3UHJvcHM7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIHByZWxvYWQgPSBwcmV2aW91c0RhdGEubG9hZC50aGVuKG5leHQpLmNhdGNoKG5leHQpO1xuXHQgICAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBwcmVsb2FkLnRoZW4oZnVuY3Rpb24gKG5ld1Byb3BzKSB7XG5cdCAgICAgICAgdmFyIG1hbmFnZXIgPSBuZXcgU2tldGNoTWFuYWdlcigpO1xuXHQgICAgICAgIHZhciByZXN1bHQ7XG5cdCAgICAgICAgaWYgKHNrZXRjaCkge1xuXHQgICAgICAgICAgICBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzLCBuZXdQcm9wcyk7XG5cdCAgICAgICAgICAgIG1hbmFnZXIuc2V0dXAoc2V0dGluZ3MpO1xuXHQgICAgICAgICAgICBtYW5hZ2VyLm1vdW50KCk7XG5cdCAgICAgICAgICAgIHJlc3VsdCA9IG1hbmFnZXIubG9hZEFuZFJ1bihza2V0Y2gpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShtYW5hZ2VyKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgaWYgKGlzSW5qZWN0aW5nKSB7XG5cdCAgICAgICAgICAgIGNhY2hlUHV0KGhvdElELCB7XG5cdCAgICAgICAgICAgICAgICBsb2FkOiByZXN1bHQsXG5cdCAgICAgICAgICAgICAgICBtYW5hZ2VyOiBtYW5hZ2VyXG5cdCAgICAgICAgICAgIH0pO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgfSk7XG5cdH1cblxuXHRjYW52YXNTa2V0Y2guY2FudmFzU2tldGNoID0gY2FudmFzU2tldGNoO1xuXHRjYW52YXNTa2V0Y2guUGFwZXJTaXplcyA9IHBhcGVyU2l6ZXM7XG5cblx0cmV0dXJuIGNhbnZhc1NrZXRjaDtcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTJGdWRtRnpMWE5yWlhSamFDNTFiV1F1YW5NaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDI1dlpHVmZiVzlrZFd4bGN5OXZZbXBsWTNRdFlYTnphV2R1TDJsdVpHVjRMbXB6SWl3aUxpNHZibTlrWlY5dGIyUjFiR1Z6TDNKcFoyaDBMVzV2ZHk5aWNtOTNjMlZ5TG1weklpd2lMaTR2Ym05a1pWOXRiMlIxYkdWekwybHpMWEJ5YjIxcGMyVXZhVzVrWlhndWFuTWlMQ0l1TGk5dWIyUmxYMjF2WkhWc1pYTXZhWE10Wkc5dEwybHVaR1Y0TG1weklpd2lMaTR2YkdsaUwzVjBhV3d1YW5NaUxDSXVMaTl1YjJSbFgyMXZaSFZzWlhNdlpHVmxjQzFsY1hWaGJDOXNhV0l2YTJWNWN5NXFjeUlzSWk0dUwyNXZaR1ZmYlc5a2RXeGxjeTlrWldWd0xXVnhkV0ZzTDJ4cFlpOXBjMTloY21kMWJXVnVkSE11YW5NaUxDSXVMaTl1YjJSbFgyMXZaSFZzWlhNdlpHVmxjQzFsY1hWaGJDOXBibVJsZUM1cWN5SXNJaTR1TDI1dlpHVmZiVzlrZFd4bGN5OWtZWFJsWm05eWJXRjBMMnhwWWk5a1lYUmxabTl5YldGMExtcHpJaXdpTGk0dmJtOWtaVjl0YjJSMWJHVnpMM0psY0dWaGRDMXpkSEpwYm1jdmFXNWtaWGd1YW5NaUxDSXVMaTl1YjJSbFgyMXZaSFZzWlhNdmNHRmtMV3hsWm5RdmFXNWtaWGd1YW5NaUxDSXVMaTlzYVdJdmMyRjJaUzVxY3lJc0lpNHVMMnhwWWk5aFkyTmxjM05wWW1sc2FYUjVMbXB6SWl3aUxpNHZiR2xpTDJOdmNtVXZhMlY1WW05aGNtUlRhRzl5ZEdOMWRITXVhbk1pTENJdUxpOXNhV0l2Y0dGd1pYSXRjMmw2WlhNdWFuTWlMQ0l1TGk5dWIyUmxYMjF2WkhWc1pYTXZaR1ZtYVc1bFpDOXBibVJsZUM1cWN5SXNJaTR1TDI1dlpHVmZiVzlrZFd4bGN5OWpiMjUyWlhKMExXeGxibWQwYUM5amIyNTJaWEowTFd4bGJtZDBhQzVxY3lJc0lpNHVMMnhwWWk5a2FYTjBZVzVqWlhNdWFuTWlMQ0l1TGk5c2FXSXZZMjl5WlM5eVpYTnBlbVZEWVc1MllYTXVhbk1pTENJdUxpOXViMlJsWDIxdlpIVnNaWE12WjJWMExXTmhiblpoY3kxamIyNTBaWGgwTDJsdVpHVjRMbXB6SWl3aUxpNHZiR2xpTDJOdmNtVXZZM0psWVhSbFEyRnVkbUZ6TG1weklpd2lMaTR2YkdsaUwyTnZjbVV2VTJ0bGRHTm9UV0Z1WVdkbGNpNXFjeUlzSWk0dUwyeHBZaTlqWVc1MllYTXRjMnRsZEdOb0xtcHpJbDBzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cVhHNXZZbXBsWTNRdFlYTnphV2R1WEc0b1l5a2dVMmx1WkhKbElGTnZjbWgxYzF4dVFHeHBZMlZ1YzJVZ1RVbFVYRzRxTDF4dVhHNG5kWE5sSUhOMGNtbGpkQ2M3WEc0dktpQmxjMnhwYm5RdFpHbHpZV0pzWlNCdWJ5MTFiblZ6WldRdGRtRnljeUFxTDF4dWRtRnlJR2RsZEU5M2JsQnliM0JsY25SNVUzbHRZbTlzY3lBOUlFOWlhbVZqZEM1blpYUlBkMjVRY205d1pYSjBlVk41YldKdmJITTdYRzUyWVhJZ2FHRnpUM2R1VUhKdmNHVnlkSGtnUFNCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVPMXh1ZG1GeUlIQnliM0JKYzBWdWRXMWxjbUZpYkdVZ1BTQlBZbXBsWTNRdWNISnZkRzkwZVhCbExuQnliM0JsY25SNVNYTkZiblZ0WlhKaFlteGxPMXh1WEc1bWRXNWpkR2x2YmlCMGIwOWlhbVZqZENoMllXd3BJSHRjYmx4MGFXWWdLSFpoYkNBOVBUMGdiblZzYkNCOGZDQjJZV3dnUFQwOUlIVnVaR1ZtYVc1bFpDa2dlMXh1WEhSY2RIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMDlpYW1WamRDNWhjM05wWjI0Z1kyRnVibTkwSUdKbElHTmhiR3hsWkNCM2FYUm9JRzUxYkd3Z2IzSWdkVzVrWldacGJtVmtKeWs3WEc1Y2RIMWNibHh1WEhSeVpYUjFjbTRnVDJKcVpXTjBLSFpoYkNrN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUhOb2IzVnNaRlZ6WlU1aGRHbDJaU2dwSUh0Y2JseDBkSEo1SUh0Y2JseDBYSFJwWmlBb0lVOWlhbVZqZEM1aGMzTnBaMjRwSUh0Y2JseDBYSFJjZEhKbGRIVnliaUJtWVd4elpUdGNibHgwWEhSOVhHNWNibHgwWEhRdkx5QkVaWFJsWTNRZ1luVm5aM2tnY0hKdmNHVnlkSGtnWlc1MWJXVnlZWFJwYjI0Z2IzSmtaWElnYVc0Z2IyeGtaWElnVmpnZ2RtVnljMmx2Ym5NdVhHNWNibHgwWEhRdkx5Qm9kSFJ3Y3pvdkwySjFaM011WTJoeWIyMXBkVzB1YjNKbkwzQXZkamd2YVhOemRXVnpMMlJsZEdGcGJEOXBaRDAwTVRFNFhHNWNkRngwZG1GeUlIUmxjM1F4SUQwZ2JtVjNJRk4wY21sdVp5Z25ZV0pqSnlrN0lDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXNhVzVsSUc1dkxXNWxkeTEzY21Gd2NHVnljMXh1WEhSY2RIUmxjM1F4V3pWZElEMGdKMlJsSnp0Y2JseDBYSFJwWmlBb1QySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVUbUZ0WlhNb2RHVnpkREVwV3pCZElEMDlQU0FuTlNjcElIdGNibHgwWEhSY2RISmxkSFZ5YmlCbVlXeHpaVHRjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUJvZEhSd2N6b3ZMMkoxWjNNdVkyaHliMjFwZFcwdWIzSm5MM0F2ZGpndmFYTnpkV1Z6TDJSbGRHRnBiRDlwWkQwek1EVTJYRzVjZEZ4MGRtRnlJSFJsYzNReUlEMGdlMzA3WEc1Y2RGeDBabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0F4TURzZ2FTc3JLU0I3WEc1Y2RGeDBYSFIwWlhOME1sc25YeWNnS3lCVGRISnBibWN1Wm5KdmJVTm9ZWEpEYjJSbEtHa3BYU0E5SUdrN1hHNWNkRngwZlZ4dVhIUmNkSFpoY2lCdmNtUmxjaklnUFNCUFltcGxZM1F1WjJWMFQzZHVVSEp2Y0dWeWRIbE9ZVzFsY3loMFpYTjBNaWt1YldGd0tHWjFibU4wYVc5dUlDaHVLU0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNGdkR1Z6ZERKYmJsMDdYRzVjZEZ4MGZTazdYRzVjZEZ4MGFXWWdLRzl5WkdWeU1pNXFiMmx1S0NjbktTQWhQVDBnSnpBeE1qTTBOVFkzT0RrbktTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z1ptRnNjMlU3WEc1Y2RGeDBmVnh1WEc1Y2RGeDBMeThnYUhSMGNITTZMeTlpZFdkekxtTm9jbTl0YVhWdExtOXlaeTl3TDNZNEwybHpjM1ZsY3k5a1pYUmhhV3cvYVdROU16QTFObHh1WEhSY2RIWmhjaUIwWlhOME15QTlJSHQ5TzF4dVhIUmNkQ2RoWW1Oa1pXWm5hR2xxYTJ4dGJtOXdjWEp6ZENjdWMzQnNhWFFvSnljcExtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHeGxkSFJsY2lrZ2UxeHVYSFJjZEZ4MGRHVnpkRE5iYkdWMGRHVnlYU0E5SUd4bGRIUmxjanRjYmx4MFhIUjlLVHRjYmx4MFhIUnBaaUFvVDJKcVpXTjBMbXRsZVhNb1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z2RHVnpkRE1wS1M1cWIybHVLQ2NuS1NBaFBUMWNibHgwWEhSY2RGeDBKMkZpWTJSbFptZG9hV3ByYkcxdWIzQnhjbk4wSnlrZ2UxeHVYSFJjZEZ4MGNtVjBkWEp1SUdaaGJITmxPMXh1WEhSY2RIMWNibHh1WEhSY2RISmxkSFZ5YmlCMGNuVmxPMXh1WEhSOUlHTmhkR05vSUNobGNuSXBJSHRjYmx4MFhIUXZMeUJYWlNCa2IyNG5kQ0JsZUhCbFkzUWdZVzU1SUc5bUlIUm9aU0JoWW05MlpTQjBieUIwYUhKdmR5d2dZblYwSUdKbGRIUmxjaUIwYnlCaVpTQnpZV1psTGx4dVhIUmNkSEpsZEhWeWJpQm1ZV3h6WlR0Y2JseDBmVnh1ZlZ4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlITm9iM1ZzWkZWelpVNWhkR2wyWlNncElEOGdUMkpxWldOMExtRnpjMmxuYmlBNklHWjFibU4wYVc5dUlDaDBZWEpuWlhRc0lITnZkWEpqWlNrZ2UxeHVYSFIyWVhJZ1puSnZiVHRjYmx4MGRtRnlJSFJ2SUQwZ2RHOVBZbXBsWTNRb2RHRnlaMlYwS1R0Y2JseDBkbUZ5SUhONWJXSnZiSE03WEc1Y2JseDBabTl5SUNoMllYSWdjeUE5SURFN0lITWdQQ0JoY21kMWJXVnVkSE11YkdWdVozUm9PeUJ6S3lzcElIdGNibHgwWEhSbWNtOXRJRDBnVDJKcVpXTjBLR0Z5WjNWdFpXNTBjMXR6WFNrN1hHNWNibHgwWEhSbWIzSWdLSFpoY2lCclpYa2dhVzRnWm5KdmJTa2dlMXh1WEhSY2RGeDBhV1lnS0doaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b1puSnZiU3dnYTJWNUtTa2dlMXh1WEhSY2RGeDBYSFIwYjF0clpYbGRJRDBnWm5KdmJWdHJaWGxkTzF4dVhIUmNkRngwZlZ4dVhIUmNkSDFjYmx4dVhIUmNkR2xtSUNoblpYUlBkMjVRY205d1pYSjBlVk41YldKdmJITXBJSHRjYmx4MFhIUmNkSE41YldKdmJITWdQU0JuWlhSUGQyNVFjbTl3WlhKMGVWTjViV0p2YkhNb1puSnZiU2s3WEc1Y2RGeDBYSFJtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUhONWJXSnZiSE11YkdWdVozUm9PeUJwS3lzcElIdGNibHgwWEhSY2RGeDBhV1lnS0hCeWIzQkpjMFZ1ZFcxbGNtRmliR1V1WTJGc2JDaG1jbTl0TENCemVXMWliMnh6VzJsZEtTa2dlMXh1WEhSY2RGeDBYSFJjZEhSdlczTjViV0p2YkhOYmFWMWRJRDBnWm5KdmJWdHplVzFpYjJ4elcybGRYVHRjYmx4MFhIUmNkRngwZlZ4dVhIUmNkRngwZlZ4dVhIUmNkSDFjYmx4MGZWeHVYRzVjZEhKbGRIVnliaUIwYnp0Y2JuMDdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5WEc0Z0lHZHNiMkpoYkM1d1pYSm1iM0p0WVc1alpTQW1KbHh1SUNCbmJHOWlZV3d1Y0dWeVptOXliV0Z1WTJVdWJtOTNJRDhnWm5WdVkzUnBiMjRnYm05M0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCd1pYSm1iM0p0WVc1alpTNXViM2NvS1Z4dUlDQjlJRG9nUkdGMFpTNXViM2NnZkh3Z1puVnVZM1JwYjI0Z2JtOTNLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQXJibVYzSUVSaGRHVmNiaUFnZlZ4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnBjMUJ5YjIxcGMyVTdYRzVjYm1aMWJtTjBhVzl1SUdselVISnZiV2x6WlNodlltb3BJSHRjYmlBZ2NtVjBkWEp1SUNFaGIySnFJQ1ltSUNoMGVYQmxiMllnYjJKcUlEMDlQU0FuYjJKcVpXTjBKeUI4ZkNCMGVYQmxiMllnYjJKcUlEMDlQU0FuWm5WdVkzUnBiMjRuS1NBbUppQjBlWEJsYjJZZ2IySnFMblJvWlc0Z1BUMDlJQ2RtZFc1amRHbHZiaWM3WEc1OVhHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR2x6VG05a1pWeHVYRzVtZFc1amRHbHZiaUJwYzA1dlpHVWdLSFpoYkNrZ2UxeHVJQ0J5WlhSMWNtNGdLQ0YyWVd3Z2ZId2dkSGx3Wlc5bUlIWmhiQ0FoUFQwZ0oyOWlhbVZqZENjcFhHNGdJQ0FnUHlCbVlXeHpaVnh1SUNBZ0lEb2dLSFI1Y0dWdlppQjNhVzVrYjNjZ1BUMDlJQ2R2WW1wbFkzUW5JQ1ltSUhSNWNHVnZaaUIzYVc1a2IzY3VUbTlrWlNBOVBUMGdKMjlpYW1WamRDY3BYRzRnSUNBZ0lDQS9JQ2gyWVd3Z2FXNXpkR0Z1WTJWdlppQjNhVzVrYjNjdVRtOWtaU2xjYmlBZ0lDQWdJRG9nS0hSNWNHVnZaaUIyWVd3dWJtOWtaVlI1Y0dVZ1BUMDlJQ2R1ZFcxaVpYSW5LU0FtSmx4dUlDQWdJQ0FnSUNBb2RIbHdaVzltSUhaaGJDNXViMlJsVG1GdFpTQTlQVDBnSjNOMGNtbHVaeWNwWEc1OVhHNGlMQ0l2THlCVVQwUlBPaUJYWlNCallXNGdjbVZ0YjNabElHRWdhSFZuWlNCamFIVnVheUJ2WmlCaWRXNWtiR1VnYzJsNlpTQmllU0IxYzJsdVp5QmhJSE50WVd4c1pYSmNiaTh2SUhWMGFXeHBkSGtnYlc5a2RXeGxJR1p2Y2lCamIyNTJaWEowYVc1bklIVnVhWFJ6TGx4dWFXMXdiM0owSUdselJFOU5JR1p5YjIwZ0oybHpMV1J2YlNjN1hHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQm5aWFJEYkdsbGJuUkJVRWtnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdkSGx3Wlc5bUlIZHBibVJ2ZHlBaFBUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2QybHVaRzkzV3lkallXNTJZWE10YzJ0bGRHTm9MV05zYVNkZE8xeHVmVnh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWkdWbWFXNWxaQ0FvS1NCN1hHNGdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnWVhKbmRXMWxiblJ6TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLR0Z5WjNWdFpXNTBjMXRwWFNBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWVhKbmRXMWxiblJ6VzJsZE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnZFc1a1pXWnBibVZrTzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdhWE5DY205M2MyVnlJQ2dwSUh0Y2JpQWdjbVYwZFhKdUlIUjVjR1Z2WmlCa2IyTjFiV1Z1ZENBaFBUMGdKM1Z1WkdWbWFXNWxaQ2M3WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQnBjMWRsWWtkTVEyOXVkR1Y0ZENBb1kzUjRLU0I3WEc0Z0lISmxkSFZ5YmlCMGVYQmxiMllnWTNSNExtTnNaV0Z5SUQwOVBTQW5ablZ1WTNScGIyNG5JQ1ltSUhSNWNHVnZaaUJqZEhndVkyeGxZWEpEYjJ4dmNpQTlQVDBnSjJaMWJtTjBhVzl1SnlBbUppQjBlWEJsYjJZZ1kzUjRMbUoxWm1abGNrUmhkR0VnUFQwOUlDZG1kVzVqZEdsdmJpYzdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCcGMwTmhiblpoY3lBb1pXeGxiV1Z1ZENrZ2UxeHVJQ0J5WlhSMWNtNGdhWE5FVDAwb1pXeGxiV1Z1ZENrZ0ppWWdMMk5oYm5aaGN5OXBMblJsYzNRb1pXeGxiV1Z1ZEM1dWIyUmxUbUZ0WlNrZ0ppWWdkSGx3Wlc5bUlHVnNaVzFsYm5RdVoyVjBRMjl1ZEdWNGRDQTlQVDBnSjJaMWJtTjBhVzl1Snp0Y2JuMWNiaUlzSW1WNGNHOXlkSE1nUFNCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhSNWNHVnZaaUJQWW1wbFkzUXVhMlY1Y3lBOVBUMGdKMloxYm1OMGFXOXVKMXh1SUNBL0lFOWlhbVZqZEM1clpYbHpJRG9nYzJocGJUdGNibHh1Wlhod2IzSjBjeTV6YUdsdElEMGdjMmhwYlR0Y2JtWjFibU4wYVc5dUlITm9hVzBnS0c5aWFpa2dlMXh1SUNCMllYSWdhMlY1Y3lBOUlGdGRPMXh1SUNCbWIzSWdLSFpoY2lCclpYa2dhVzRnYjJKcUtTQnJaWGx6TG5CMWMyZ29hMlY1S1R0Y2JpQWdjbVYwZFhKdUlHdGxlWE03WEc1OVhHNGlMQ0oyWVhJZ2MzVndjRzl5ZEhOQmNtZDFiV1Z1ZEhORGJHRnpjeUE5SUNobWRXNWpkR2x2YmlncGUxeHVJQ0J5WlhSMWNtNGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp5NWpZV3hzS0dGeVozVnRaVzUwY3lsY2JuMHBLQ2tnUFQwZ0oxdHZZbXBsWTNRZ1FYSm5kVzFsYm5SelhTYzdYRzVjYm1WNGNHOXlkSE1nUFNCdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhOMWNIQnZjblJ6UVhKbmRXMWxiblJ6UTJ4aGMzTWdQeUJ6ZFhCd2IzSjBaV1FnT2lCMWJuTjFjSEJ2Y25SbFpEdGNibHh1Wlhod2IzSjBjeTV6ZFhCd2IzSjBaV1FnUFNCemRYQndiM0owWldRN1hHNW1kVzVqZEdsdmJpQnpkWEJ3YjNKMFpXUW9iMkpxWldOMEtTQjdYRzRnSUhKbGRIVnliaUJQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMblJ2VTNSeWFXNW5MbU5oYkd3b2IySnFaV04wS1NBOVBTQW5XMjlpYW1WamRDQkJjbWQxYldWdWRITmRKenRjYm4wN1hHNWNibVY0Y0c5eWRITXVkVzV6ZFhCd2IzSjBaV1FnUFNCMWJuTjFjSEJ2Y25SbFpEdGNibVoxYm1OMGFXOXVJSFZ1YzNWd2NHOXlkR1ZrS0c5aWFtVmpkQ2w3WEc0Z0lISmxkSFZ5YmlCdlltcGxZM1FnSmlaY2JpQWdJQ0IwZVhCbGIyWWdiMkpxWldOMElEMDlJQ2R2WW1wbFkzUW5JQ1ltWEc0Z0lDQWdkSGx3Wlc5bUlHOWlhbVZqZEM1c1pXNW5kR2dnUFQwZ0oyNTFiV0psY2ljZ0ppWmNiaUFnSUNCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFaV04wTENBblkyRnNiR1ZsSnlrZ0ppWmNiaUFnSUNBaFQySnFaV04wTG5CeWIzUnZkSGx3WlM1d2NtOXdaWEowZVVselJXNTFiV1Z5WVdKc1pTNWpZV3hzS0c5aWFtVmpkQ3dnSjJOaGJHeGxaU2NwSUh4OFhHNGdJQ0FnWm1Gc2MyVTdYRzU5TzF4dUlpd2lkbUZ5SUhCVGJHbGpaU0E5SUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpUdGNiblpoY2lCdlltcGxZM1JMWlhseklEMGdjbVZ4ZFdseVpTZ25MaTlzYVdJdmEyVjVjeTVxY3ljcE8xeHVkbUZ5SUdselFYSm5kVzFsYm5SeklEMGdjbVZ4ZFdseVpTZ25MaTlzYVdJdmFYTmZZWEpuZFcxbGJuUnpMbXB6SnlrN1hHNWNiblpoY2lCa1pXVndSWEYxWVd3Z1BTQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaGhZM1IxWVd3c0lHVjRjR1ZqZEdWa0xDQnZjSFJ6S1NCN1hHNGdJR2xtSUNnaGIzQjBjeWtnYjNCMGN5QTlJSHQ5TzF4dUlDQXZMeUEzTGpFdUlFRnNiQ0JwWkdWdWRHbGpZV3dnZG1Gc2RXVnpJR0Z5WlNCbGNYVnBkbUZzWlc1MExDQmhjeUJrWlhSbGNtMXBibVZrSUdKNUlEMDlQUzVjYmlBZ2FXWWdLR0ZqZEhWaGJDQTlQVDBnWlhod1pXTjBaV1FwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JseHVJQ0I5SUdWc2MyVWdhV1lnS0dGamRIVmhiQ0JwYm5OMFlXNWpaVzltSUVSaGRHVWdKaVlnWlhod1pXTjBaV1FnYVc1emRHRnVZMlZ2WmlCRVlYUmxLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHRmpkSFZoYkM1blpYUlVhVzFsS0NrZ1BUMDlJR1Y0Y0dWamRHVmtMbWRsZEZScGJXVW9LVHRjYmx4dUlDQXZMeUEzTGpNdUlFOTBhR1Z5SUhCaGFYSnpJSFJvWVhRZ1pHOGdibTkwSUdKdmRHZ2djR0Z6Y3lCMGVYQmxiMllnZG1Gc2RXVWdQVDBnSjI5aWFtVmpkQ2NzWEc0Z0lDOHZJR1Z4ZFdsMllXeGxibU5sSUdseklHUmxkR1Z5YldsdVpXUWdZbmtnUFQwdVhHNGdJSDBnWld4elpTQnBaaUFvSVdGamRIVmhiQ0I4ZkNBaFpYaHdaV04wWldRZ2ZId2dkSGx3Wlc5bUlHRmpkSFZoYkNBaFBTQW5iMkpxWldOMEp5QW1KaUIwZVhCbGIyWWdaWGh3WldOMFpXUWdJVDBnSjI5aWFtVmpkQ2NwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdiM0IwY3k1emRISnBZM1FnUHlCaFkzUjFZV3dnUFQwOUlHVjRjR1ZqZEdWa0lEb2dZV04wZFdGc0lEMDlJR1Y0Y0dWamRHVmtPMXh1WEc0Z0lDOHZJRGN1TkM0Z1JtOXlJR0ZzYkNCdmRHaGxjaUJQWW1wbFkzUWdjR0ZwY25Nc0lHbHVZMngxWkdsdVp5QkJjbkpoZVNCdlltcGxZM1J6TENCbGNYVnBkbUZzWlc1alpTQnBjMXh1SUNBdkx5QmtaWFJsY20xcGJtVmtJR0o1SUdoaGRtbHVaeUIwYUdVZ2MyRnRaU0J1ZFcxaVpYSWdiMllnYjNkdVpXUWdjSEp2Y0dWeWRHbGxjeUFvWVhNZ2RtVnlhV1pwWldSY2JpQWdMeThnZDJsMGFDQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd3BMQ0IwYUdVZ2MyRnRaU0J6WlhRZ2IyWWdhMlY1YzF4dUlDQXZMeUFvWVd4MGFHOTFaMmdnYm05MElHNWxZMlZ6YzJGeWFXeDVJSFJvWlNCellXMWxJRzl5WkdWeUtTd2daWEYxYVhaaGJHVnVkQ0IyWVd4MVpYTWdabTl5SUdWMlpYSjVYRzRnSUM4dklHTnZjbkpsYzNCdmJtUnBibWNnYTJWNUxDQmhibVFnWVc0Z2FXUmxiblJwWTJGc0lDZHdjbTkwYjNSNWNHVW5JSEJ5YjNCbGNuUjVMaUJPYjNSbE9pQjBhR2x6WEc0Z0lDOHZJR0ZqWTI5MWJuUnpJR1p2Y2lCaWIzUm9JRzVoYldWa0lHRnVaQ0JwYm1SbGVHVmtJSEJ5YjNCbGNuUnBaWE1nYjI0Z1FYSnlZWGx6TGx4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUJ2WW1wRmNYVnBkaWhoWTNSMVlXd3NJR1Y0Y0dWamRHVmtMQ0J2Y0hSektUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJwYzFWdVpHVm1hVzVsWkU5eVRuVnNiQ2gyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnZG1Gc2RXVWdQVDA5SUc1MWJHd2dmSHdnZG1Gc2RXVWdQVDA5SUhWdVpHVm1hVzVsWkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOQ2RXWm1aWElnS0hncElIdGNiaUFnYVdZZ0tDRjRJSHg4SUhSNWNHVnZaaUI0SUNFOVBTQW5iMkpxWldOMEp5QjhmQ0IwZVhCbGIyWWdlQzVzWlc1bmRHZ2dJVDA5SUNkdWRXMWlaWEluS1NCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUdsbUlDaDBlWEJsYjJZZ2VDNWpiM0I1SUNFOVBTQW5ablZ1WTNScGIyNG5JSHg4SUhSNWNHVnZaaUI0TG5Oc2FXTmxJQ0U5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNGdJR2xtSUNoNExteGxibWQwYUNBK0lEQWdKaVlnZEhsd1pXOW1JSGhiTUYwZ0lUMDlJQ2R1ZFcxaVpYSW5LU0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSEpsZEhWeWJpQjBjblZsTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ2WW1wRmNYVnBkaWhoTENCaUxDQnZjSFJ6S1NCN1hHNGdJSFpoY2lCcExDQnJaWGs3WEc0Z0lHbG1JQ2hwYzFWdVpHVm1hVzVsWkU5eVRuVnNiQ2hoS1NCOGZDQnBjMVZ1WkdWbWFXNWxaRTl5VG5Wc2JDaGlLU2xjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDOHZJR0Z1SUdsa1pXNTBhV05oYkNBbmNISnZkRzkwZVhCbEp5QndjbTl3WlhKMGVTNWNiaUFnYVdZZ0tHRXVjSEp2ZEc5MGVYQmxJQ0U5UFNCaUxuQnliM1J2ZEhsd1pTa2djbVYwZFhKdUlHWmhiSE5sTzF4dUlDQXZMMzUrZmtrbmRtVWdiV0Z1WVdkbFpDQjBieUJpY21WaGF5QlBZbXBsWTNRdWEyVjVjeUIwYUhKdmRXZG9JSE5qY21WM2VTQmhjbWQxYldWdWRITWdjR0Z6YzJsdVp5NWNiaUFnTHk4Z0lDQkRiMjUyWlhKMGFXNW5JSFJ2SUdGeWNtRjVJSE52YkhabGN5QjBhR1VnY0hKdllteGxiUzVjYmlBZ2FXWWdLR2x6UVhKbmRXMWxiblJ6S0dFcEtTQjdYRzRnSUNBZ2FXWWdLQ0ZwYzBGeVozVnRaVzUwY3loaUtTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJSDFjYmlBZ0lDQmhJRDBnY0ZOc2FXTmxMbU5oYkd3b1lTazdYRzRnSUNBZ1lpQTlJSEJUYkdsalpTNWpZV3hzS0dJcE8xeHVJQ0FnSUhKbGRIVnliaUJrWldWd1JYRjFZV3dvWVN3Z1lpd2diM0IwY3lrN1hHNGdJSDFjYmlBZ2FXWWdLR2x6UW5WbVptVnlLR0VwS1NCN1hHNGdJQ0FnYVdZZ0tDRnBjMEoxWm1abGNpaGlLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb1lTNXNaVzVuZEdnZ0lUMDlJR0l1YkdWdVozUm9LU0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR0V1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHbG1JQ2hoVzJsZElDRTlQU0JpVzJsZEtTQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCMGNuVmxPMXh1SUNCOVhHNGdJSFJ5ZVNCN1hHNGdJQ0FnZG1GeUlHdGhJRDBnYjJKcVpXTjBTMlY1Y3loaEtTeGNiaUFnSUNBZ0lDQWdhMklnUFNCdlltcGxZM1JMWlhsektHSXBPMXh1SUNCOUlHTmhkR05vSUNobEtTQjdMeTlvWVhCd1pXNXpJSGRvWlc0Z2IyNWxJR2x6SUdFZ2MzUnlhVzVuSUd4cGRHVnlZV3dnWVc1a0lIUm9aU0J2ZEdobGNpQnBjMjRuZEZ4dUlDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdmVnh1SUNBdkx5Qm9ZWFpwYm1jZ2RHaGxJSE5oYldVZ2JuVnRZbVZ5SUc5bUlHOTNibVZrSUhCeWIzQmxjblJwWlhNZ0tHdGxlWE1nYVc1amIzSndiM0poZEdWelhHNGdJQzh2SUdoaGMwOTNibEJ5YjNCbGNuUjVLVnh1SUNCcFppQW9hMkV1YkdWdVozUm9JQ0U5SUd0aUxteGxibWQwYUNsY2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJQzh2ZEdobElITmhiV1VnYzJWMElHOW1JR3RsZVhNZ0tHRnNkR2h2ZFdkb0lHNXZkQ0J1WldObGMzTmhjbWxzZVNCMGFHVWdjMkZ0WlNCdmNtUmxjaWtzWEc0Z0lHdGhMbk52Y25Rb0tUdGNiaUFnYTJJdWMyOXlkQ2dwTzF4dUlDQXZMMzUrZm1Ob1pXRndJR3RsZVNCMFpYTjBYRzRnSUdadmNpQW9hU0E5SUd0aExteGxibWQwYUNBdElERTdJR2tnUGowZ01Ec2dhUzB0S1NCN1hHNGdJQ0FnYVdZZ0tHdGhXMmxkSUNFOUlHdGlXMmxkS1Z4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0I5WEc0Z0lDOHZaWEYxYVhaaGJHVnVkQ0IyWVd4MVpYTWdabTl5SUdWMlpYSjVJR052Y25KbGMzQnZibVJwYm1jZ2EyVjVMQ0JoYm1SY2JpQWdMeTkrZm41d2IzTnphV0pzZVNCbGVIQmxibk5wZG1VZ1pHVmxjQ0IwWlhOMFhHNGdJR1p2Y2lBb2FTQTlJR3RoTG14bGJtZDBhQ0F0SURFN0lHa2dQajBnTURzZ2FTMHRLU0I3WEc0Z0lDQWdhMlY1SUQwZ2EyRmJhVjA3WEc0Z0lDQWdhV1lnS0NGa1pXVndSWEYxWVd3b1lWdHJaWGxkTENCaVcydGxlVjBzSUc5d2RITXBLU0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJoSUQwOVBTQjBlWEJsYjJZZ1lqdGNibjFjYmlJc0lpOHFYRzRnS2lCRVlYUmxJRVp2Y20xaGRDQXhMakl1TTF4dUlDb2dLR01wSURJd01EY3RNakF3T1NCVGRHVjJaVzRnVEdWMmFYUm9ZVzRnUEhOMFpYWmxibXhsZG1sMGFHRnVMbU52YlQ1Y2JpQXFJRTFKVkNCc2FXTmxibk5sWEc0Z0tseHVJQ29nU1c1amJIVmtaWE1nWlc1b1lXNWpaVzFsYm5SeklHSjVJRk5qYjNSMElGUnlaVzVrWVNBOGMyTnZkSFF1ZEhKbGJtUmhMbTVsZEQ1Y2JpQXFJR0Z1WkNCTGNtbHpJRXR2ZDJGc0lEeGphWGhoY2k1amIyMHZmbXR5YVhNdWEyOTNZV3d2UGx4dUlDcGNiaUFxSUVGalkyVndkSE1nWVNCa1lYUmxMQ0JoSUcxaGMyc3NJRzl5SUdFZ1pHRjBaU0JoYm1RZ1lTQnRZWE5yTGx4dUlDb2dVbVYwZFhKdWN5QmhJR1p2Y20xaGRIUmxaQ0IyWlhKemFXOXVJRzltSUhSb1pTQm5hWFpsYmlCa1lYUmxMbHh1SUNvZ1ZHaGxJR1JoZEdVZ1pHVm1ZWFZzZEhNZ2RHOGdkR2hsSUdOMWNuSmxiblFnWkdGMFpTOTBhVzFsTGx4dUlDb2dWR2hsSUcxaGMyc2daR1ZtWVhWc2RITWdkRzhnWkdGMFpVWnZjbTFoZEM1dFlYTnJjeTVrWldaaGRXeDBMbHh1SUNvdlhHNWNiaWhtZFc1amRHbHZiaWhuYkc5aVlXd3BJSHRjYmlBZ0ozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0Z0lIWmhjaUJrWVhSbFJtOXliV0YwSUQwZ0tHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdkbUZ5SUhSdmEyVnVJRDBnTDJSN01TdzBmWHh0ZXpFc05IMThlWGtvUHpwNWVTay9mQ2hiU0doTmMxUjBYU2xjWERFL2ZGdE1iRzlUV2xkT1hYeGNJbHRlWENKZEtsd2lmQ2RiWGlkZEtpY3ZaenRjYmlBZ0lDQWdJSFpoY2lCMGFXMWxlbTl1WlNBOUlDOWNYR0lvUHpwYlVFMURSVUZkVzFORVVGMVVmQ2cvT2xCaFkybG1hV044VFc5MWJuUmhhVzU4UTJWdWRISmhiSHhGWVhOMFpYSnVmRUYwYkdGdWRHbGpLU0FvUHpwVGRHRnVaR0Z5Wkh4RVlYbHNhV2RvZEh4UWNtVjJZV2xzYVc1bktTQlVhVzFsZkNnL09rZE5WSHhWVkVNcEtEODZXeTByWFZ4Y1pIczBmU2svS1Z4Y1lpOW5PMXh1SUNBZ0lDQWdkbUZ5SUhScGJXVjZiMjVsUTJ4cGNDQTlJQzliWGkwclhGeGtRUzFhWFM5bk8xeHVJQ0JjYmlBZ0lDQWdJQzh2SUZKbFoyVjRaWE1nWVc1a0lITjFjSEJ2Y25ScGJtY2dablZ1WTNScGIyNXpJR0Z5WlNCallXTm9aV1FnZEdoeWIzVm5hQ0JqYkc5emRYSmxYRzRnSUNBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tHUmhkR1VzSUcxaGMyc3NJSFYwWXl3Z1oyMTBLU0I3WEc0Z0lGeHVJQ0FnSUNBZ0lDQXZMeUJaYjNVZ1kyRnVKM1FnY0hKdmRtbGtaU0IxZEdNZ2FXWWdlVzkxSUhOcmFYQWdiM1JvWlhJZ1lYSm5jeUFvZFhObElIUm9aU0FuVlZSRE9pY2diV0Z6YXlCd2NtVm1hWGdwWEc0Z0lDQWdJQ0FnSUdsbUlDaGhjbWQxYldWdWRITXViR1Z1WjNSb0lEMDlQU0F4SUNZbUlHdHBibVJQWmloa1lYUmxLU0E5UFQwZ0ozTjBjbWx1WnljZ0ppWWdJUzljWEdRdkxuUmxjM1FvWkdGMFpTa3BJSHRjYmlBZ0lDQWdJQ0FnSUNCdFlYTnJJRDBnWkdGMFpUdGNiaUFnSUNBZ0lDQWdJQ0JrWVhSbElEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lGeHVJQ0FnSUNBZ0lDQmtZWFJsSUQwZ1pHRjBaU0I4ZkNCdVpYY2dSR0YwWlR0Y2JpQWdYRzRnSUNBZ0lDQWdJR2xtS0NFb1pHRjBaU0JwYm5OMFlXNWpaVzltSUVSaGRHVXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ1pHRjBaU0E5SUc1bGR5QkVZWFJsS0dSaGRHVXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lGeHVJQ0FnSUNBZ0lDQnBaaUFvYVhOT1lVNG9aR0YwWlNrcElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUhKdmR5QlVlWEJsUlhKeWIzSW9KMGx1ZG1Gc2FXUWdaR0YwWlNjcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUZ4dUlDQWdJQ0FnSUNCdFlYTnJJRDBnVTNSeWFXNW5LR1JoZEdWR2IzSnRZWFF1YldGemEzTmJiV0Z6YTEwZ2ZId2diV0Z6YXlCOGZDQmtZWFJsUm05eWJXRjBMbTFoYzJ0eld5ZGtaV1poZFd4MEoxMHBPMXh1SUNCY2JpQWdJQ0FnSUNBZ0x5OGdRV3hzYjNjZ2MyVjBkR2x1WnlCMGFHVWdkWFJqTDJkdGRDQmhjbWQxYldWdWRDQjJhV0VnZEdobElHMWhjMnRjYmlBZ0lDQWdJQ0FnZG1GeUlHMWhjMnRUYkdsalpTQTlJRzFoYzJzdWMyeHBZMlVvTUN3Z05DazdYRzRnSUNBZ0lDQWdJR2xtSUNodFlYTnJVMnhwWTJVZ1BUMDlJQ2RWVkVNNkp5QjhmQ0J0WVhOclUyeHBZMlVnUFQwOUlDZEhUVlE2SnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJRzFoYzJzZ1BTQnRZWE5yTG5Oc2FXTmxLRFFwTzF4dUlDQWdJQ0FnSUNBZ0lIVjBZeUE5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHMWhjMnRUYkdsalpTQTlQVDBnSjBkTlZEb25LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQm5iWFFnUFNCMGNuVmxPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0JjYmlBZ0lDQWdJQ0FnZG1GeUlGOGdQU0IxZEdNZ1B5QW5aMlYwVlZSREp5QTZJQ2RuWlhRbk8xeHVJQ0FnSUNBZ0lDQjJZWElnWkNBOUlHUmhkR1ZiWHlBcklDZEVZWFJsSjEwb0tUdGNiaUFnSUNBZ0lDQWdkbUZ5SUVRZ1BTQmtZWFJsVzE4Z0t5QW5SR0Y1SjEwb0tUdGNiaUFnSUNBZ0lDQWdkbUZ5SUcwZ1BTQmtZWFJsVzE4Z0t5QW5UVzl1ZEdnblhTZ3BPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2VTQTlJR1JoZEdWYlh5QXJJQ2RHZFd4c1dXVmhjaWRkS0NrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJJSUQwZ1pHRjBaVnRmSUNzZ0owaHZkWEp6SjEwb0tUdGNiaUFnSUNBZ0lDQWdkbUZ5SUUwZ1BTQmtZWFJsVzE4Z0t5QW5UV2x1ZFhSbGN5ZGRLQ2s3WEc0Z0lDQWdJQ0FnSUhaaGNpQnpJRDBnWkdGMFpWdGZJQ3NnSjFObFkyOXVaSE1uWFNncE8xeHVJQ0FnSUNBZ0lDQjJZWElnVENBOUlHUmhkR1ZiWHlBcklDZE5hV3hzYVhObFkyOXVaSE1uWFNncE8xeHVJQ0FnSUNBZ0lDQjJZWElnYnlBOUlIVjBZeUEvSURBZ09pQmtZWFJsTG1kbGRGUnBiV1Y2YjI1bFQyWm1jMlYwS0NrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJYSUQwZ1oyVjBWMlZsYXloa1lYUmxLVHRjYmlBZ0lDQWdJQ0FnZG1GeUlFNGdQU0JuWlhSRVlYbFBabGRsWldzb1pHRjBaU2s3WEc0Z0lDQWdJQ0FnSUhaaGNpQm1iR0ZuY3lBOUlIdGNiaUFnSUNBZ0lDQWdJQ0JrT2lBZ0lDQmtMRnh1SUNBZ0lDQWdJQ0FnSUdSa09pQWdJSEJoWkNoa0tTeGNiaUFnSUNBZ0lDQWdJQ0JrWkdRNklDQmtZWFJsUm05eWJXRjBMbWt4T0c0dVpHRjVUbUZ0WlhOYlJGMHNYRzRnSUNBZ0lDQWdJQ0FnWkdSa1pEb2daR0YwWlVadmNtMWhkQzVwTVRodUxtUmhlVTVoYldWelcwUWdLeUEzWFN4Y2JpQWdJQ0FnSUNBZ0lDQnRPaUFnSUNCdElDc2dNU3hjYmlBZ0lDQWdJQ0FnSUNCdGJUb2dJQ0J3WVdRb2JTQXJJREVwTEZ4dUlDQWdJQ0FnSUNBZ0lHMXRiVG9nSUdSaGRHVkdiM0p0WVhRdWFURTRiaTV0YjI1MGFFNWhiV1Z6VzIxZExGeHVJQ0FnSUNBZ0lDQWdJRzF0YlcwNklHUmhkR1ZHYjNKdFlYUXVhVEU0Ymk1dGIyNTBhRTVoYldWelcyMGdLeUF4TWwwc1hHNGdJQ0FnSUNBZ0lDQWdlWGs2SUNBZ1UzUnlhVzVuS0hrcExuTnNhV05sS0RJcExGeHVJQ0FnSUNBZ0lDQWdJSGw1ZVhrNklIa3NYRzRnSUNBZ0lDQWdJQ0FnYURvZ0lDQWdTQ0FsSURFeUlIeDhJREV5TEZ4dUlDQWdJQ0FnSUNBZ0lHaG9PaUFnSUhCaFpDaElJQ1VnTVRJZ2ZId2dNVElwTEZ4dUlDQWdJQ0FnSUNBZ0lFZzZJQ0FnSUVnc1hHNGdJQ0FnSUNBZ0lDQWdTRWc2SUNBZ2NHRmtLRWdwTEZ4dUlDQWdJQ0FnSUNBZ0lFMDZJQ0FnSUUwc1hHNGdJQ0FnSUNBZ0lDQWdUVTA2SUNBZ2NHRmtLRTBwTEZ4dUlDQWdJQ0FnSUNBZ0lITTZJQ0FnSUhNc1hHNGdJQ0FnSUNBZ0lDQWdjM002SUNBZ2NHRmtLSE1wTEZ4dUlDQWdJQ0FnSUNBZ0lHdzZJQ0FnSUhCaFpDaE1MQ0F6S1N4Y2JpQWdJQ0FnSUNBZ0lDQk1PaUFnSUNCd1lXUW9UV0YwYUM1eWIzVnVaQ2hNSUM4Z01UQXBLU3hjYmlBZ0lDQWdJQ0FnSUNCME9pQWdJQ0JJSUR3Z01USWdQeUJrWVhSbFJtOXliV0YwTG1reE9HNHVkR2x0WlU1aGJXVnpXekJkSURvZ1pHRjBaVVp2Y20xaGRDNXBNVGh1TG5ScGJXVk9ZVzFsYzFzeFhTeGNiaUFnSUNBZ0lDQWdJQ0IwZERvZ0lDQklJRHdnTVRJZ1B5QmtZWFJsUm05eWJXRjBMbWt4T0c0dWRHbHRaVTVoYldWeld6SmRJRG9nWkdGMFpVWnZjbTFoZEM1cE1UaHVMblJwYldWT1lXMWxjMXN6WFN4Y2JpQWdJQ0FnSUNBZ0lDQlVPaUFnSUNCSUlEd2dNVElnUHlCa1lYUmxSbTl5YldGMExta3hPRzR1ZEdsdFpVNWhiV1Z6V3pSZElEb2daR0YwWlVadmNtMWhkQzVwTVRodUxuUnBiV1ZPWVcxbGMxczFYU3hjYmlBZ0lDQWdJQ0FnSUNCVVZEb2dJQ0JJSUR3Z01USWdQeUJrWVhSbFJtOXliV0YwTG1reE9HNHVkR2x0WlU1aGJXVnpXelpkSURvZ1pHRjBaVVp2Y20xaGRDNXBNVGh1TG5ScGJXVk9ZVzFsYzFzM1hTeGNiaUFnSUNBZ0lDQWdJQ0JhT2lBZ0lDQm5iWFFnUHlBblIwMVVKeUE2SUhWMFl5QS9JQ2RWVkVNbklEb2dLRk4wY21sdVp5aGtZWFJsS1M1dFlYUmphQ2gwYVcxbGVtOXVaU2tnZkh3Z1d5Y25YU2t1Y0c5d0tDa3VjbVZ3YkdGalpTaDBhVzFsZW05dVpVTnNhWEFzSUNjbktTeGNiaUFnSUNBZ0lDQWdJQ0J2T2lBZ0lDQW9ieUErSURBZ1B5QW5MU2NnT2lBbkt5Y3BJQ3NnY0dGa0tFMWhkR2d1Wm14dmIzSW9UV0YwYUM1aFluTW9ieWtnTHlBMk1Da2dLaUF4TURBZ0t5Qk5ZWFJvTG1GaWN5aHZLU0FsSURZd0xDQTBLU3hjYmlBZ0lDQWdJQ0FnSUNCVE9pQWdJQ0JiSjNSb0p5d2dKM04wSnl3Z0oyNWtKeXdnSjNKa0oxMWJaQ0FsSURFd0lENGdNeUEvSURBZ09pQW9aQ0FsSURFd01DQXRJR1FnSlNBeE1DQWhQU0F4TUNrZ0tpQmtJQ1VnTVRCZExGeHVJQ0FnSUNBZ0lDQWdJRmM2SUNBZ0lGY3NYRzRnSUNBZ0lDQWdJQ0FnVGpvZ0lDQWdUbHh1SUNBZ0lDQWdJQ0I5TzF4dUlDQmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHMWhjMnN1Y21Wd2JHRmpaU2gwYjJ0bGJpd2dablZ1WTNScGIyNGdLRzFoZEdOb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHMWhkR05vSUdsdUlHWnNZV2R6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdabXhoWjNOYmJXRjBZMmhkTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdiV0YwWTJndWMyeHBZMlVvTVN3Z2JXRjBZMmd1YkdWdVozUm9JQzBnTVNrN1hHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlLU2dwTzF4dVhHNGdJR1JoZEdWR2IzSnRZWFF1YldGemEzTWdQU0I3WEc0Z0lDQWdKMlJsWm1GMWJIUW5PaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDZGtaR1FnYlcxdElHUmtJSGw1ZVhrZ1NFZzZUVTA2YzNNbkxGeHVJQ0FnSUNkemFHOXlkRVJoZEdVbk9pQWdJQ0FnSUNBZ0lDQWdJQ0FuYlM5a0wzbDVKeXhjYmlBZ0lDQW5iV1ZrYVhWdFJHRjBaU2M2SUNBZ0lDQWdJQ0FnSUNBZ0oyMXRiU0JrTENCNWVYbDVKeXhjYmlBZ0lDQW5iRzl1WjBSaGRHVW5PaUFnSUNBZ0lDQWdJQ0FnSUNBZ0oyMXRiVzBnWkN3Z2VYbDVlU2NzWEc0Z0lDQWdKMloxYkd4RVlYUmxKem9nSUNBZ0lDQWdJQ0FnSUNBZ0lDZGtaR1JrTENCdGJXMXRJR1FzSUhsNWVYa25MRnh1SUNBZ0lDZHphRzl5ZEZScGJXVW5PaUFnSUNBZ0lDQWdJQ0FnSUNBbmFEcE5UU0JVVkNjc1hHNGdJQ0FnSjIxbFpHbDFiVlJwYldVbk9pQWdJQ0FnSUNBZ0lDQWdJQ2RvT2sxTk9uTnpJRlJVSnl4Y2JpQWdJQ0FuYkc5dVoxUnBiV1VuT2lBZ0lDQWdJQ0FnSUNBZ0lDQWdKMmc2VFUwNmMzTWdWRlFnV2ljc1hHNGdJQ0FnSjJsemIwUmhkR1VuT2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ2Q1ZVhsNUxXMXRMV1JrSnl4Y2JpQWdJQ0FuYVhOdlZHbHRaU2M2SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdKMGhJT2sxTk9uTnpKeXhjYmlBZ0lDQW5hWE52UkdGMFpWUnBiV1VuT2lBZ0lDQWdJQ0FnSUNBZ0ozbDVlWGt0YlcwdFpHUmNYQ2RVWEZ3blNFZzZUVTA2YzNOdkp5eGNiaUFnSUNBbmFYTnZWWFJqUkdGMFpWUnBiV1VuT2lBZ0lDQWdJQ0FnSjFWVVF6cDVlWGw1TFcxdExXUmtYRnduVkZ4Y0owaElPazFOT25OelhGd25XbHhjSnljc1hHNGdJQ0FnSjJWNGNHbHlaWE5JWldGa1pYSkdiM0p0WVhRbk9pQWdJQ2RrWkdRc0lHUmtJRzF0YlNCNWVYbDVJRWhJT2sxTk9uTnpJRm9uWEc0Z0lIMDdYRzVjYmlBZ0x5OGdTVzUwWlhKdVlYUnBiMjVoYkdsNllYUnBiMjRnYzNSeWFXNW5jMXh1SUNCa1lYUmxSbTl5YldGMExta3hPRzRnUFNCN1hHNGdJQ0FnWkdGNVRtRnRaWE02SUZ0Y2JpQWdJQ0FnSUNkVGRXNG5MQ0FuVFc5dUp5d2dKMVIxWlNjc0lDZFhaV1FuTENBblZHaDFKeXdnSjBaeWFTY3NJQ2RUWVhRbkxGeHVJQ0FnSUNBZ0oxTjFibVJoZVNjc0lDZE5iMjVrWVhrbkxDQW5WSFZsYzJSaGVTY3NJQ2RYWldSdVpYTmtZWGtuTENBblZHaDFjbk5rWVhrbkxDQW5SbkpwWkdGNUp5d2dKMU5oZEhWeVpHRjVKMXh1SUNBZ0lGMHNYRzRnSUNBZ2JXOXVkR2hPWVcxbGN6b2dXMXh1SUNBZ0lDQWdKMHBoYmljc0lDZEdaV0luTENBblRXRnlKeXdnSjBGd2NpY3NJQ2ROWVhrbkxDQW5TblZ1Snl3Z0owcDFiQ2NzSUNkQmRXY25MQ0FuVTJWd0p5d2dKMDlqZENjc0lDZE9iM1luTENBblJHVmpKeXhjYmlBZ0lDQWdJQ2RLWVc1MVlYSjVKeXdnSjBabFluSjFZWEo1Snl3Z0owMWhjbU5vSnl3Z0owRndjbWxzSnl3Z0owMWhlU2NzSUNkS2RXNWxKeXdnSjBwMWJIa25MQ0FuUVhWbmRYTjBKeXdnSjFObGNIUmxiV0psY2ljc0lDZFBZM1J2WW1WeUp5d2dKMDV2ZG1WdFltVnlKeXdnSjBSbFkyVnRZbVZ5SjF4dUlDQWdJRjBzWEc0Z0lDQWdkR2x0WlU1aGJXVnpPaUJiWEc0Z0lDQWdJQ0FuWVNjc0lDZHdKeXdnSjJGdEp5d2dKM0J0Snl3Z0owRW5MQ0FuVUNjc0lDZEJUU2NzSUNkUVRTZGNiaUFnSUNCZFhHNGdJSDA3WEc1Y2JtWjFibU4wYVc5dUlIQmhaQ2gyWVd3c0lHeGxiaWtnZTF4dUlDQjJZV3dnUFNCVGRISnBibWNvZG1Gc0tUdGNiaUFnYkdWdUlEMGdiR1Z1SUh4OElESTdYRzRnSUhkb2FXeGxJQ2gyWVd3dWJHVnVaM1JvSUR3Z2JHVnVLU0I3WEc0Z0lDQWdkbUZzSUQwZ0p6QW5JQ3NnZG1Gc08xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCMllXdzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1IyVjBJSFJvWlNCSlUwOGdPRFl3TVNCM1pXVnJJRzUxYldKbGNseHVJQ29nUW1GelpXUWdiMjRnWTI5dGJXVnVkSE1nWm5KdmJWeHVJQ29nYUhSMGNEb3ZMM1JsWTJoaWJHOW5MbkJ5YjJOMWNtbHZjeTV1YkM5ckwyNDJNVGd2Ym1WM2N5OTJhV1YzTHpNek56azJMekUwT0RZekwwTmhiR04xYkdGMFpTMUpVMDh0T0RZd01TMTNaV1ZyTFdGdVpDMTVaV0Z5TFdsdUxXcGhkbUZ6WTNKcGNIUXVhSFJ0YkZ4dUlDcGNiaUFxSUVCd1lYSmhiU0FnZTA5aWFtVmpkSDBnWUdSaGRHVmdYRzRnS2lCQWNtVjBkWEp1SUh0T2RXMWlaWEo5WEc0Z0tpOWNibVoxYm1OMGFXOXVJR2RsZEZkbFpXc29aR0YwWlNrZ2UxeHVJQ0F2THlCU1pXMXZkbVVnZEdsdFpTQmpiMjF3YjI1bGJuUnpJRzltSUdSaGRHVmNiaUFnZG1GeUlIUmhjbWRsZEZSb2RYSnpaR0Y1SUQwZ2JtVjNJRVJoZEdVb1pHRjBaUzVuWlhSR2RXeHNXV1ZoY2lncExDQmtZWFJsTG1kbGRFMXZiblJvS0Nrc0lHUmhkR1V1WjJWMFJHRjBaU2dwS1R0Y2JseHVJQ0F2THlCRGFHRnVaMlVnWkdGMFpTQjBieUJVYUhWeWMyUmhlU0J6WVcxbElIZGxaV3RjYmlBZ2RHRnlaMlYwVkdoMWNuTmtZWGt1YzJWMFJHRjBaU2gwWVhKblpYUlVhSFZ5YzJSaGVTNW5aWFJFWVhSbEtDa2dMU0FvS0hSaGNtZGxkRlJvZFhKelpHRjVMbWRsZEVSaGVTZ3BJQ3NnTmlrZ0pTQTNLU0FySURNcE8xeHVYRzRnSUM4dklGUmhhMlVnU21GdWRXRnllU0EwZEdnZ1lYTWdhWFFnYVhNZ1lXeDNZWGx6SUdsdUlIZGxaV3NnTVNBb2MyVmxJRWxUVHlBNE5qQXhLVnh1SUNCMllYSWdabWx5YzNSVWFIVnljMlJoZVNBOUlHNWxkeUJFWVhSbEtIUmhjbWRsZEZSb2RYSnpaR0Y1TG1kbGRFWjFiR3haWldGeUtDa3NJREFzSURRcE8xeHVYRzRnSUM4dklFTm9ZVzVuWlNCa1lYUmxJSFJ2SUZSb2RYSnpaR0Y1SUhOaGJXVWdkMlZsYTF4dUlDQm1hWEp6ZEZSb2RYSnpaR0Y1TG5ObGRFUmhkR1VvWm1seWMzUlVhSFZ5YzJSaGVTNW5aWFJFWVhSbEtDa2dMU0FvS0dacGNuTjBWR2gxY25Oa1lYa3VaMlYwUkdGNUtDa2dLeUEyS1NBbElEY3BJQ3NnTXlrN1hHNWNiaUFnTHk4Z1EyaGxZMnNnYVdZZ1pHRjViR2xuYUhRdGMyRjJhVzVuTFhScGJXVXRjM2RwZEdOb0lHOWpZM1Z5Y21Wa0lHRnVaQ0JqYjNKeVpXTjBJR1p2Y2lCcGRGeHVJQ0IyWVhJZ1pITWdQU0IwWVhKblpYUlVhSFZ5YzJSaGVTNW5aWFJVYVcxbGVtOXVaVTltWm5ObGRDZ3BJQzBnWm1seWMzUlVhSFZ5YzJSaGVTNW5aWFJVYVcxbGVtOXVaVTltWm5ObGRDZ3BPMXh1SUNCMFlYSm5aWFJVYUhWeWMyUmhlUzV6WlhSSWIzVnljeWgwWVhKblpYUlVhSFZ5YzJSaGVTNW5aWFJJYjNWeWN5Z3BJQzBnWkhNcE8xeHVYRzRnSUM4dklFNTFiV0psY2lCdlppQjNaV1ZyY3lCaVpYUjNaV1Z1SUhSaGNtZGxkQ0JVYUhWeWMyUmhlU0JoYm1RZ1ptbHljM1FnVkdoMWNuTmtZWGxjYmlBZ2RtRnlJSGRsWld0RWFXWm1JRDBnS0hSaGNtZGxkRlJvZFhKelpHRjVJQzBnWm1seWMzUlVhSFZ5YzJSaGVTa2dMeUFvT0RZME1EQXdNREFxTnlrN1hHNGdJSEpsZEhWeWJpQXhJQ3NnVFdGMGFDNW1iRzl2Y2loM1pXVnJSR2xtWmlrN1hHNTlYRzVjYmk4cUtseHVJQ29nUjJWMElFbFRUeTA0TmpBeElHNTFiV1Z5YVdNZ2NtVndjbVZ6Wlc1MFlYUnBiMjRnYjJZZ2RHaGxJR1JoZVNCdlppQjBhR1VnZDJWbGExeHVJQ29nTVNBb1ptOXlJRTF2Ym1SaGVTa2dkR2h5YjNWbmFDQTNJQ2htYjNJZ1UzVnVaR0Y1S1Z4dUlDb2dYRzRnS2lCQWNHRnlZVzBnSUh0UFltcGxZM1I5SUdCa1lYUmxZRnh1SUNvZ1FISmxkSFZ5YmlCN1RuVnRZbVZ5ZlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJuWlhSRVlYbFBabGRsWldzb1pHRjBaU2tnZTF4dUlDQjJZWElnWkc5M0lEMGdaR0YwWlM1blpYUkVZWGtvS1R0Y2JpQWdhV1lvWkc5M0lEMDlQU0F3S1NCN1hHNGdJQ0FnWkc5M0lEMGdOenRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdaRzkzTzF4dWZWeHVYRzR2S2lwY2JpQXFJR3RwYm1RdGIyWWdjMmh2Y25SamRYUmNiaUFxSUVCd1lYSmhiU0FnZXlwOUlIWmhiRnh1SUNvZ1FISmxkSFZ5YmlCN1UzUnlhVzVuZlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJyYVc1a1QyWW9kbUZzS1NCN1hHNGdJR2xtSUNoMllXd2dQVDA5SUc1MWJHd3BJSHRjYmlBZ0lDQnlaWFIxY200Z0oyNTFiR3duTzF4dUlDQjlYRzVjYmlBZ2FXWWdLSFpoYkNBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdjbVYwZFhKdUlDZDFibVJsWm1sdVpXUW5PMXh1SUNCOVhHNWNiaUFnYVdZZ0tIUjVjR1Z2WmlCMllXd2dJVDA5SUNkdlltcGxZM1FuS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFI1Y0dWdlppQjJZV3c3WEc0Z0lIMWNibHh1SUNCcFppQW9RWEp5WVhrdWFYTkJjbkpoZVNoMllXd3BLU0I3WEc0Z0lDQWdjbVYwZFhKdUlDZGhjbkpoZVNjN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2UzMHVkRzlUZEhKcGJtY3VZMkZzYkNoMllXd3BYRzRnSUNBZ0xuTnNhV05sS0Rnc0lDMHhLUzUwYjB4dmQyVnlRMkZ6WlNncE8xeHVmVHRjYmx4dVhHNWNiaUFnYVdZZ0tIUjVjR1Z2WmlCa1pXWnBibVVnUFQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnWkdWbWFXNWxMbUZ0WkNrZ2UxeHVJQ0FnSUdSbFptbHVaU2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWkdGMFpVWnZjbTFoZER0Y2JpQWdJQ0I5S1R0Y2JpQWdmU0JsYkhObElHbG1JQ2gwZVhCbGIyWWdaWGh3YjNKMGN5QTlQVDBnSjI5aWFtVmpkQ2NwSUh0Y2JpQWdJQ0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1JoZEdWR2IzSnRZWFE3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnWjJ4dlltRnNMbVJoZEdWR2IzSnRZWFFnUFNCa1lYUmxSbTl5YldGME8xeHVJQ0I5WEc1OUtTaDBhR2x6S1R0Y2JpSXNJaThxSVZ4dUlDb2djbVZ3WldGMExYTjBjbWx1WnlBOGFIUjBjSE02THk5bmFYUm9kV0l1WTI5dEwycHZibk5qYUd4cGJtdGxjblF2Y21Wd1pXRjBMWE4wY21sdVp6NWNiaUFxWEc0Z0tpQkRiM0I1Y21sbmFIUWdLR01wSURJd01UUXRNakF4TlN3Z1NtOXVJRk5qYUd4cGJtdGxjblF1WEc0Z0tpQk1hV05sYm5ObFpDQjFibVJsY2lCMGFHVWdUVWxVSUV4cFkyVnVjMlV1WEc0Z0tpOWNibHh1SjNWelpTQnpkSEpwWTNRbk8xeHVYRzR2S2lwY2JpQXFJRkpsYzNWc2RITWdZMkZqYUdWY2JpQXFMMXh1WEc1MllYSWdjbVZ6SUQwZ0p5YzdYRzUyWVhJZ1kyRmphR1U3WEc1Y2JpOHFLbHh1SUNvZ1JYaHdiM05sSUdCeVpYQmxZWFJnWEc0Z0tpOWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhCbFlYUTdYRzVjYmk4cUtseHVJQ29nVW1Wd1pXRjBJSFJvWlNCbmFYWmxiaUJnYzNSeWFXNW5ZQ0IwYUdVZ2MzQmxZMmxtYVdWa0lHQnVkVzFpWlhKZ1hHNGdLaUJ2WmlCMGFXMWxjeTVjYmlBcVhHNGdLaUFxS2tWNFlXMXdiR1U2S2lwY2JpQXFYRzRnS2lCZ1lHQnFjMXh1SUNvZ2RtRnlJSEpsY0dWaGRDQTlJSEpsY1hWcGNtVW9KM0psY0dWaGRDMXpkSEpwYm1jbktUdGNiaUFxSUhKbGNHVmhkQ2duUVNjc0lEVXBPMXh1SUNvZ0x5ODlQaUJCUVVGQlFWeHVJQ29nWUdCZ1hHNGdLbHh1SUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUdCemRISnBibWRnSUZSb1pTQnpkSEpwYm1jZ2RHOGdjbVZ3WldGMFhHNGdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdZRzUxYldKbGNtQWdWR2hsSUc1MWJXSmxjaUJ2WmlCMGFXMWxjeUIwYnlCeVpYQmxZWFFnZEdobElITjBjbWx1WjF4dUlDb2dRSEpsZEhWeWJpQjdVM1J5YVc1bmZTQlNaWEJsWVhSbFpDQnpkSEpwYm1kY2JpQXFJRUJoY0drZ2NIVmliR2xqWEc0Z0tpOWNibHh1Wm5WdVkzUnBiMjRnY21Wd1pXRjBLSE4wY2l3Z2JuVnRLU0I3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdjM1J5SUNFOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMlY0Y0dWamRHVmtJR0VnYzNSeWFXNW5KeWs3WEc0Z0lIMWNibHh1SUNBdkx5QmpiM1psY2lCamIyMXRiMjRzSUhGMWFXTnJJSFZ6WlNCallYTmxjMXh1SUNCcFppQW9iblZ0SUQwOVBTQXhLU0J5WlhSMWNtNGdjM1J5TzF4dUlDQnBaaUFvYm5WdElEMDlQU0F5S1NCeVpYUjFjbTRnYzNSeUlDc2djM1J5TzF4dVhHNGdJSFpoY2lCdFlYZ2dQU0J6ZEhJdWJHVnVaM1JvSUNvZ2JuVnRPMXh1SUNCcFppQW9ZMkZqYUdVZ0lUMDlJSE4wY2lCOGZDQjBlWEJsYjJZZ1kyRmphR1VnUFQwOUlDZDFibVJsWm1sdVpXUW5LU0I3WEc0Z0lDQWdZMkZqYUdVZ1BTQnpkSEk3WEc0Z0lDQWdjbVZ6SUQwZ0p5YzdYRzRnSUgwZ1pXeHpaU0JwWmlBb2NtVnpMbXhsYm1kMGFDQStQU0J0WVhncElIdGNiaUFnSUNCeVpYUjFjbTRnY21WekxuTjFZbk4wY2lnd0xDQnRZWGdwTzF4dUlDQjlYRzVjYmlBZ2QyaHBiR1VnS0cxaGVDQStJSEpsY3k1c1pXNW5kR2dnSmlZZ2JuVnRJRDRnTVNrZ2UxeHVJQ0FnSUdsbUlDaHVkVzBnSmlBeEtTQjdYRzRnSUNBZ0lDQnlaWE1nS3owZ2MzUnlPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHNTFiU0ErUGowZ01UdGNiaUFnSUNCemRISWdLejBnYzNSeU8xeHVJQ0I5WEc1Y2JpQWdjbVZ6SUNzOUlITjBjanRjYmlBZ2NtVnpJRDBnY21WekxuTjFZbk4wY2lnd0xDQnRZWGdwTzF4dUlDQnlaWFIxY200Z2NtVnpPMXh1ZlZ4dUlpd2lMeW9oWEc0Z0tpQndZV1F0YkdWbWRDQThhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMMnB2Ym5OamFHeHBibXRsY25RdmNHRmtMV3hsWm5RK1hHNGdLbHh1SUNvZ1EyOXdlWEpwWjJoMElDaGpLU0F5TURFMExUSXdNVFVzSUVwdmJpQlRZMmhzYVc1clpYSjBMbHh1SUNvZ1RHbGpaVzV6WldRZ2RXNWtaWElnZEdobElFMUpWQ0JzYVdObGJuTmxMbHh1SUNvdlhHNWNiaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVkbUZ5SUhKbGNHVmhkQ0E5SUhKbGNYVnBjbVVvSjNKbGNHVmhkQzF6ZEhKcGJtY25LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlCd1lXUk1aV1owS0hOMGNpd2diblZ0TENCamFDa2dlMXh1SUNCemRISWdQU0J6ZEhJdWRHOVRkSEpwYm1jb0tUdGNibHh1SUNCcFppQW9kSGx3Wlc5bUlHNTFiU0E5UFQwZ0ozVnVaR1ZtYVc1bFpDY3BJSHRjYmlBZ0lDQnlaWFIxY200Z2MzUnlPMXh1SUNCOVhHNWNiaUFnYVdZZ0tHTm9JRDA5UFNBd0tTQjdYRzRnSUNBZ1kyZ2dQU0FuTUNjN1hHNGdJSDBnWld4elpTQnBaaUFvWTJncElIdGNiaUFnSUNCamFDQTlJR05vTG5SdlUzUnlhVzVuS0NrN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ1kyZ2dQU0FuSUNjN1hHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2NtVndaV0YwS0dOb0xDQnVkVzBnTFNCemRISXViR1Z1WjNSb0tTQXJJSE4wY2p0Y2JuMDdYRzRpTENKcGJYQnZjblFnWkdGMFpXWnZjbTFoZENCbWNtOXRJQ2RrWVhSbFptOXliV0YwSnp0Y2JtbHRjRzl5ZENCaGMzTnBaMjRnWm5KdmJTQW5iMkpxWldOMExXRnpjMmxuYmljN1hHNXBiWEJ2Y25RZ2NHRmtUR1ZtZENCbWNtOXRJQ2R3WVdRdGJHVm1kQ2M3WEc1cGJYQnZjblFnZXlCblpYUkRiR2xsYm5SQlVFa2dmU0JtY205dElDY3VMM1YwYVd3bk8xeHVYRzVqYjI1emRDQnViMjl3SUQwZ0tDa2dQVDRnZTMwN1hHNXNaWFFnYkdsdWF6dGNibXhsZENCa1pXWmhkV3gwUlhoMGN5QTlJSHNnWlhoMFpXNXphVzl1T2lBbkp5d2djSEpsWm1sNE9pQW5KeXdnYzNWbVptbDRPaUFuSnlCOU8xeHVYRzR2THlCQmJIUmxjbTVoZEdsMlpTQnpiMngxZEdsdmJpQm1iM0lnYzJGMmFXNW5JR1pwYkdWekxGeHVMeThnWVNCaWFYUWdjMnh2ZDJWeUlHRnVaQ0JrYjJWeklHNXZkQ0IzYjNKcklHbHVJRk5oWm1GeWFWeHVMeThnWm5WdVkzUnBiMjRnWm1WMFkyaENiRzlpUm5KdmJVUmhkR0ZWVWt3Z0tHUmhkR0ZWVWt3cElIdGNiaTh2SUNBZ2NtVjBkWEp1SUhkcGJtUnZkeTVtWlhSamFDaGtZWFJoVlZKTUtTNTBhR1Z1S0hKbGN5QTlQaUJ5WlhNdVlteHZZaWdwS1R0Y2JpOHZJSDFjYmx4dVkyOXVjM1FnYzNWd2NHOXlkR1ZrUlc1amIyUnBibWR6SUQwZ1cxeHVJQ0FuYVcxaFoyVXZjRzVuSnl4Y2JpQWdKMmx0WVdkbEwycHdaV2NuTEZ4dUlDQW5hVzFoWjJVdmQyVmljQ2RjYmwwN1hHNWNibVoxYm1OMGFXOXVJSE4wY21WaGJTQW9hWE5UZEdGeWRDd2diM0IwY3lBOUlIdDlLU0I3WEc0Z0lISmxkSFZ5YmlCdVpYY2dVSEp2YldselpTZ29jbVZ6YjJ4MlpTd2djbVZxWldOMEtTQTlQaUI3WEc0Z0lDQWdiM0IwY3lBOUlHRnpjMmxuYmloN2ZTd2daR1ZtWVhWc2RFVjRkSE1zSUc5d2RITXBPMXh1SUNBZ0lHTnZibk4wSUdacGJHVnVZVzFsSUQwZ2NtVnpiMngyWlVacGJHVnVZVzFsS0U5aWFtVmpkQzVoYzNOcFoyNG9lMzBzSUc5d2RITXNJSHRjYmlBZ0lDQWdJR1Y0ZEdWdWMybHZiam9nSnljc1hHNGdJQ0FnSUNCbWNtRnRaVG9nZFc1a1pXWnBibVZrWEc0Z0lDQWdmU2twTzF4dUlDQWdJR052Ym5OMElHWjFibU1nUFNCcGMxTjBZWEowSUQ4Z0ozTjBjbVZoYlZOMFlYSjBKeUE2SUNkemRISmxZVzFGYm1Rbk8xeHVJQ0FnSUdOdmJuTjBJR05zYVdWdWRDQTlJR2RsZEVOc2FXVnVkRUZRU1NncE8xeHVJQ0FnSUdsbUlDaGpiR2xsYm5RZ0ppWWdZMnhwWlc1MExtOTFkSEIxZENBbUppQjBlWEJsYjJZZ1kyeHBaVzUwVzJaMWJtTmRJRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1kyeHBaVzUwVzJaMWJtTmRLR0Z6YzJsbmJpaDdmU3dnYjNCMGN5d2dleUJtYVd4bGJtRnRaU0I5S1NsY2JpQWdJQ0FnSUNBZ0xuUm9aVzRvWlhZZ1BUNGdjbVZ6YjJ4MlpTaGxkaWtwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z2NtVnpiMngyWlNoN0lHWnBiR1Z1WVcxbExDQmpiR2xsYm5RNklHWmhiSE5sSUgwcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQnpkSEpsWVcxVGRHRnlkQ0FvYjNCMGN5QTlJSHQ5S1NCN1hHNGdJSEpsZEhWeWJpQnpkSEpsWVcwb2RISjFaU3dnYjNCMGN5azdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCemRISmxZVzFGYm1RZ0tHOXdkSE1nUFNCN2ZTa2dlMXh1SUNCeVpYUjFjbTRnYzNSeVpXRnRLR1poYkhObExDQnZjSFJ6S1R0Y2JuMWNibHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR1Y0Y0c5eWRFTmhiblpoY3lBb1kyRnVkbUZ6TENCdmNIUWdQU0I3ZlNrZ2UxeHVJQ0JqYjI1emRDQmxibU52WkdsdVp5QTlJRzl3ZEM1bGJtTnZaR2x1WnlCOGZDQW5hVzFoWjJVdmNHNW5KenRjYmlBZ2FXWWdLQ0Z6ZFhCd2IzSjBaV1JGYm1OdlpHbHVaM011YVc1amJIVmtaWE1vWlc1amIyUnBibWNwS1NCMGFISnZkeUJ1WlhjZ1JYSnliM0lvWUVsdWRtRnNhV1FnWTJGdWRtRnpJR1Z1WTI5a2FXNW5JQ1I3Wlc1amIyUnBibWQ5WUNrN1hHNGdJR3hsZENCbGVIUmxibk5wYjI0Z1BTQW9aVzVqYjJScGJtY3VjM0JzYVhRb0p5OG5LVnN4WFNCOGZDQW5KeWt1Y21Wd2JHRmpaU2d2YW5CbFp5OXBMQ0FuYW5Cbkp5azdYRzRnSUdsbUlDaGxlSFJsYm5OcGIyNHBJR1Y0ZEdWdWMybHZiaUE5SUdBdUpIdGxlSFJsYm5OcGIyNTlZQzUwYjB4dmQyVnlRMkZ6WlNncE8xeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lHVjRkR1Z1YzJsdmJpeGNiaUFnSUNCMGVYQmxPaUJsYm1OdlpHbHVaeXhjYmlBZ0lDQmtZWFJoVlZKTU9pQmpZVzUyWVhNdWRHOUVZWFJoVlZKTUtHVnVZMjlrYVc1bkxDQnZjSFF1Wlc1amIyUnBibWRSZFdGc2FYUjVLVnh1SUNCOU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCamNtVmhkR1ZDYkc5aVJuSnZiVVJoZEdGVlVrd2dLR1JoZEdGVlVrd3BJSHRjYmlBZ2NtVjBkWEp1SUc1bGR5QlFjbTl0YVhObEtDaHlaWE52YkhabEtTQTlQaUI3WEc0Z0lDQWdZMjl1YzNRZ2MzQnNhWFJKYm1SbGVDQTlJR1JoZEdGVlVrd3VhVzVrWlhoUFppZ25MQ2NwTzF4dUlDQWdJR2xtSUNoemNHeHBkRWx1WkdWNElEMDlQU0F0TVNrZ2UxeHVJQ0FnSUNBZ2NtVnpiMngyWlNodVpYY2dkMmx1Wkc5M0xrSnNiMklvS1NrN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lHTnZibk4wSUdKaGMyVTJOQ0E5SUdSaGRHRlZVa3d1YzJ4cFkyVW9jM0JzYVhSSmJtUmxlQ0FySURFcE8xeHVJQ0FnSUdOdmJuTjBJR0o1ZEdWVGRISnBibWNnUFNCM2FXNWtiM2N1WVhSdllpaGlZWE5sTmpRcE8xeHVJQ0FnSUdOdmJuTjBJSFI1Y0dVZ1BTQmtZWFJoVlZKTUxuTnNhV05sS0RBc0lITndiR2wwU1c1a1pYZ3BPMXh1SUNBZ0lHTnZibk4wSUcxcGJXVk5ZWFJqYUNBOUlDOWtZWFJoT2loYlhqdGRLeWt2TG1WNFpXTW9kSGx3WlNrN1hHNGdJQ0FnWTI5dWMzUWdiV2x0WlNBOUlDaHRhVzFsVFdGMFkyZ2dQeUJ0YVcxbFRXRjBZMmhiTVYwZ09pQW5KeWtnZkh3Z2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUdOdmJuTjBJR0ZpSUQwZ2JtVjNJRUZ5Y21GNVFuVm1abVZ5S0dKNWRHVlRkSEpwYm1jdWJHVnVaM1JvS1R0Y2JpQWdJQ0JqYjI1emRDQnBZU0E5SUc1bGR5QlZhVzUwT0VGeWNtRjVLR0ZpS1R0Y2JpQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdKNWRHVlRkSEpwYm1jdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJR2xoVzJsZElEMGdZbmwwWlZOMGNtbHVaeTVqYUdGeVEyOWtaVUYwS0drcE8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhOdmJIWmxLRzVsZHlCM2FXNWtiM2N1UW14dllpaGJJR0ZpSUYwc0lIc2dkSGx3WlRvZ2JXbHRaU0I5S1NrN1hHNGdJSDBwTzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdjMkYyWlVSaGRHRlZVa3dnS0dSaGRHRlZVa3dzSUc5d2RITWdQU0I3ZlNrZ2UxeHVJQ0J5WlhSMWNtNGdZM0psWVhSbFFteHZZa1p5YjIxRVlYUmhWVkpNS0dSaGRHRlZVa3dwWEc0Z0lDQWdMblJvWlc0b1lteHZZaUE5UGlCellYWmxRbXh2WWloaWJHOWlMQ0J2Y0hSektTazdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCellYWmxRbXh2WWlBb1lteHZZaXdnYjNCMGN5QTlJSHQ5S1NCN1hHNGdJSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2h5WlhOdmJIWmxJRDArSUh0Y2JpQWdJQ0J2Y0hSeklEMGdZWE56YVdkdUtIdDlMQ0JrWldaaGRXeDBSWGgwY3l3Z2IzQjBjeWs3WEc0Z0lDQWdZMjl1YzNRZ1ptbHNaVzVoYldVZ1BTQnZjSFJ6TG1acGJHVnVZVzFsTzF4dVhHNGdJQ0FnWTI5dWMzUWdZMnhwWlc1MElEMGdaMlYwUTJ4cFpXNTBRVkJKS0NrN1hHNGdJQ0FnYVdZZ0tHTnNhV1Z1ZENBbUppQjBlWEJsYjJZZ1kyeHBaVzUwTG5OaGRtVkNiRzlpSUQwOVBTQW5ablZ1WTNScGIyNG5JQ1ltSUdOc2FXVnVkQzV2ZFhSd2RYUXBJSHRjYmlBZ0lDQWdJQzh2SUc1aGRHbDJaU0J6WVhacGJtY2dkWE5wYm1jZ1lTQkRURWtnZEc5dmJGeHVJQ0FnSUNBZ2NtVjBkWEp1SUdOc2FXVnVkQzV6WVhabFFteHZZaWhpYkc5aUxDQmhjM05wWjI0b2UzMHNJRzl3ZEhNc0lIc2dabWxzWlc1aGJXVWdmU2twWEc0Z0lDQWdJQ0FnSUM1MGFHVnVLR1YySUQwK0lISmxjMjlzZG1Vb1pYWXBLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0x5OGdabTl5WTJVZ1pHOTNibXh2WVdSY2JpQWdJQ0FnSUdsbUlDZ2hiR2x1YXlrZ2UxeHVJQ0FnSUNBZ0lDQnNhVzVySUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duWVNjcE8xeHVJQ0FnSUNBZ0lDQnNhVzVyTG5OMGVXeGxMblpwYzJsaWFXeHBkSGtnUFNBbmFHbGtaR1Z1Snp0Y2JpQWdJQ0FnSUNBZ2JHbHVheTUwWVhKblpYUWdQU0FuWDJKc1lXNXJKenRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR3hwYm1zdVpHOTNibXh2WVdRZ1BTQm1hV3hsYm1GdFpUdGNiaUFnSUNBZ0lHeHBibXN1YUhKbFppQTlJSGRwYm1SdmR5NVZVa3d1WTNKbFlYUmxUMkpxWldOMFZWSk1LR0pzYjJJcE8xeHVJQ0FnSUNBZ1pHOWpkVzFsYm5RdVltOWtlUzVoY0hCbGJtUkRhR2xzWkNoc2FXNXJLVHRjYmlBZ0lDQWdJR3hwYm1zdWIyNWpiR2xqYXlBOUlDZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ2JHbHVheTV2Ym1Oc2FXTnJJRDBnYm05dmNEdGNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2dvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnZDJsdVpHOTNMbFZTVEM1eVpYWnZhMlZQWW1wbFkzUlZVa3dvWW14dllpazdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHeHBibXN1Y0dGeVpXNTBSV3hsYldWdWRDa2diR2x1YXk1d1lYSmxiblJGYkdWdFpXNTBMbkpsYlc5MlpVTm9hV3hrS0d4cGJtc3BPMXh1SUNBZ0lDQWdJQ0FnSUd4cGJtc3VjbVZ0YjNabFFYUjBjbWxpZFhSbEtDZG9jbVZtSnlrN1hHNGdJQ0FnSUNBZ0lDQWdjbVZ6YjJ4MlpTaDdJR1pwYkdWdVlXMWxMQ0JqYkdsbGJuUTZJR1poYkhObElIMHBPMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCc2FXNXJMbU5zYVdOcktDazdYRzRnSUNBZ2ZWeHVJQ0I5S1R0Y2JuMWNibHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJSE5oZG1WR2FXeGxJQ2hrWVhSaExDQnZjSFJ6SUQwZ2UzMHBJSHRjYmlBZ1kyOXVjM1FnY0dGeWRITWdQU0JCY25KaGVTNXBjMEZ5Y21GNUtHUmhkR0VwSUQ4Z1pHRjBZU0E2SUZzZ1pHRjBZU0JkTzF4dUlDQmpiMjV6ZENCaWJHOWlJRDBnYm1WM0lIZHBibVJ2ZHk1Q2JHOWlLSEJoY25SekxDQjdJSFI1Y0dVNklHOXdkSE11ZEhsd1pTQjhmQ0FuSnlCOUtUdGNiaUFnY21WMGRYSnVJSE5oZG1WQ2JHOWlLR0pzYjJJc0lHOXdkSE1wTzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdaMlYwVkdsdFpWTjBZVzF3SUNncElIdGNiaUFnWTI5dWMzUWdaR0YwWlVadmNtMWhkRk4wY2lBOUlHQjVlWGw1TG0xdExtUmtMVWhJTGsxTkxuTnpZRHRjYmlBZ2NtVjBkWEp1SUdSaGRHVm1iM0p0WVhRb2JtVjNJRVJoZEdVb0tTd2daR0YwWlVadmNtMWhkRk4wY2lrN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJuWlhSRVpXWmhkV3gwUm1sc1pTQW9jSEpsWm1sNElEMGdKeWNzSUhOMVptWnBlQ0E5SUNjbkxDQmxlSFFwSUh0Y2JpQWdMeThnWTI5dWMzUWdaR0YwWlVadmNtMWhkRk4wY2lBOUlHQjVlWGw1TG0xdExtUmtMVWhJTGsxTkxuTnpZRHRjYmlBZ1kyOXVjM1FnWkdGMFpVWnZjbTFoZEZOMGNpQTlJR0I1ZVhsNUxXMXRMV1JrSUNkaGRDY2dhQzVOVFM1emN5QlVWR0E3WEc0Z0lISmxkSFZ5YmlCZ0pIdHdjbVZtYVhoOUpIdGtZWFJsWm05eWJXRjBLRzVsZHlCRVlYUmxLQ2tzSUdSaGRHVkdiM0p0WVhSVGRISXBmU1I3YzNWbVptbDRmU1I3WlhoMGZXQTdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCeVpYTnZiSFpsUm1sc1pXNWhiV1VnS0c5d2RDQTlJSHQ5S1NCN1hHNGdJRzl3ZENBOUlHRnpjMmxuYmloN2ZTd2diM0IwS1R0Y2JseHVJQ0F2THlCRGRYTjBiMjBnWm1sc1pXNWhiV1VnWm5WdVkzUnBiMjVjYmlBZ2FXWWdLSFI1Y0dWdlppQnZjSFF1Wm1sc1pTQTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ2Y0hRdVptbHNaU2h2Y0hRcE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0c5d2RDNW1hV3hsS1NCN1hHNGdJQ0FnY21WMGRYSnVJRzl3ZEM1bWFXeGxPMXh1SUNCOVhHNWNiaUFnYkdWMElHWnlZVzFsSUQwZ2JuVnNiRHRjYmlBZ2JHVjBJR1Y0ZEdWdWMybHZiaUE5SUNjbk8xeHVJQ0JwWmlBb2RIbHdaVzltSUc5d2RDNWxlSFJsYm5OcGIyNGdQVDA5SUNkemRISnBibWNuS1NCbGVIUmxibk5wYjI0Z1BTQnZjSFF1WlhoMFpXNXphVzl1TzF4dVhHNGdJR2xtSUNoMGVYQmxiMllnYjNCMExtWnlZVzFsSUQwOVBTQW5iblZ0WW1WeUp5a2dlMXh1SUNBZ0lHeGxkQ0IwYjNSaGJFWnlZVzFsY3p0Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUc5d2RDNTBiM1JoYkVaeVlXMWxjeUE5UFQwZ0oyNTFiV0psY2ljcElIdGNiaUFnSUNBZ0lIUnZkR0ZzUm5KaGJXVnpJRDBnYjNCMExuUnZkR0ZzUm5KaGJXVnpPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMGIzUmhiRVp5WVcxbGN5QTlJRTFoZEdndWJXRjRLREV3TURBd0xDQnZjSFF1Wm5KaGJXVXBPMXh1SUNBZ0lIMWNiaUFnSUNCbWNtRnRaU0E5SUhCaFpFeGxablFvVTNSeWFXNW5LRzl3ZEM1bWNtRnRaU2tzSUZOMGNtbHVaeWgwYjNSaGJFWnlZVzFsY3lrdWJHVnVaM1JvTENBbk1DY3BPMXh1SUNCOVhHNWNiaUFnWTI5dWMzUWdiR0Y1WlhKVGRISWdQU0JwYzBacGJtbDBaU2h2Y0hRdWRHOTBZV3hNWVhsbGNuTXBJQ1ltSUdselJtbHVhWFJsS0c5d2RDNXNZWGxsY2lrZ0ppWWdiM0IwTG5SdmRHRnNUR0Y1WlhKeklENGdNU0EvSUdBa2UyOXdkQzVzWVhsbGNuMWdJRG9nSnljN1hHNGdJR2xtSUNobWNtRnRaU0FoUFNCdWRXeHNLU0I3WEc0Z0lDQWdjbVYwZFhKdUlGc2diR0Y1WlhKVGRISXNJR1p5WVcxbElGMHVabWxzZEdWeUtFSnZiMnhsWVc0cExtcHZhVzRvSnkwbktTQXJJR1Y0ZEdWdWMybHZianRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JqYjI1emRDQmtaV1poZFd4MFJtbHNaVTVoYldVZ1BTQnZjSFF1ZEdsdFpWTjBZVzF3TzF4dUlDQWdJSEpsZEhWeWJpQmJJRzl3ZEM1d2NtVm1hWGdzSUc5d2RDNXVZVzFsSUh4OElHUmxabUYxYkhSR2FXeGxUbUZ0WlN3Z2JHRjVaWEpUZEhJc0lHOXdkQzVvWVhOb0xDQnZjSFF1YzNWbVptbDRJRjB1Wm1sc2RHVnlLRUp2YjJ4bFlXNHBMbXB2YVc0b0p5MG5LU0FySUdWNGRHVnVjMmx2Ymp0Y2JpQWdmVnh1ZlZ4dUlpd2lMeThnU0dGdVpHeGxJSE52YldVZ1kyOXRiVzl1SUhSNWNHOXpYRzVqYjI1emRDQmpiMjF0YjI1VWVYQnZjeUE5SUh0Y2JpQWdaR2x0Wlc1emFXOXVPaUFuWkdsdFpXNXphVzl1Y3ljc1hHNGdJR0Z1YVcxaGRHVmtPaUFuWVc1cGJXRjBaU2NzWEc0Z0lHRnVhVzFoZEdsdVp6b2dKMkZ1YVcxaGRHVW5MRnh1SUNCMWJtbDBPaUFuZFc1cGRITW5MRnh1SUNCUU5Ub2dKM0ExSnl4Y2JpQWdjR2w0Wld4c1lYUmxaRG9nSjNCcGVHVnNZWFJsWkNjc1hHNGdJR3h2YjNCcGJtYzZJQ2RzYjI5d0p5eGNiaUFnY0dsNFpXeFFaWEpKYm1Ob09pQW5jR2w0Wld4ekoxeHVmVHRjYmx4dUx5OGdTR0Z1Wkd4bElHRnNiQ0J2ZEdobGNpQjBlWEJ2YzF4dVkyOXVjM1FnWVd4c1MyVjVjeUE5SUZ0Y2JpQWdKMlJwYldWdWMybHZibk1uTENBbmRXNXBkSE1uTENBbmNHbDRaV3h6VUdWeVNXNWphQ2NzSUNkdmNtbGxiblJoZEdsdmJpY3NYRzRnSUNkelkyRnNaVlJ2Um1sMEp5d2dKM05qWVd4bFZHOVdhV1YzSnl3Z0oySnNaV1ZrSnl3Z0ozQnBlR1ZzVW1GMGFXOG5MRnh1SUNBblpYaHdiM0owVUdsNFpXeFNZWFJwYnljc0lDZHRZWGhRYVhobGJGSmhkR2x2Snl3Z0ozTmpZV3hsUTI5dWRHVjRkQ2NzWEc0Z0lDZHlaWE5wZW1WRFlXNTJZWE1uTENBbmMzUjViR1ZEWVc1MllYTW5MQ0FuWTJGdWRtRnpKeXdnSjJOdmJuUmxlSFFuTENBbllYUjBjbWxpZFhSbGN5Y3NYRzRnSUNkd1lYSmxiblFuTENBblptbHNaU2NzSUNkdVlXMWxKeXdnSjNCeVpXWnBlQ2NzSUNkemRXWm1hWGduTENBbllXNXBiV0YwWlNjc0lDZHdiR0Y1YVc1bkp5eGNiaUFnSjJ4dmIzQW5MQ0FuWkhWeVlYUnBiMjRuTENBbmRHOTBZV3hHY21GdFpYTW5MQ0FuWm5Cekp5d2dKM0JzWVhsaVlXTnJVbUYwWlNjc0lDZDBhVzFsVTJOaGJHVW5MRnh1SUNBblpuSmhiV1VuTENBbmRHbHRaU2NzSUNkbWJIVnphQ2NzSUNkd2FYaGxiR0YwWldRbkxDQW5hRzkwYTJWNWN5Y3NJQ2R3TlNjc0lDZHBaQ2NzWEc0Z0lDZHpZMkZzWlZSdlJtbDBVR0ZrWkdsdVp5Y3NJQ2RrWVhSaEp5d2dKM0JoY21GdGN5Y3NJQ2RsYm1OdlpHbHVaeWNzSUNkbGJtTnZaR2x1WjFGMVlXeHBkSGtuWEc1ZE8xeHVYRzR2THlCVWFHbHpJR2x6SUdaaGFYSnNlU0J2Y0dsdWFXOXVZWFJsWkNCaGJtUWdabTl5WTJWeklIVnpaWEp6SUhSdklIVnpaU0IwYUdVZ0oyUmhkR0VuSUhCaGNtRnRaWFJsY2x4dUx5OGdhV1lnZEdobGVTQjNZVzUwSUhSdklIQmhjM01nWVd4dmJtY2dibTl1TFhObGRIUnBibWNnYjJKcVpXTjBjeTR1TGx4dVpYaHdiM0owSUdOdmJuTjBJR05vWldOclUyVjBkR2x1WjNNZ1BTQW9jMlYwZEdsdVozTXBJRDArSUh0Y2JpQWdZMjl1YzNRZ2EyVjVjeUE5SUU5aWFtVmpkQzVyWlhsektITmxkSFJwYm1kektUdGNiaUFnYTJWNWN5NW1iM0pGWVdOb0tHdGxlU0E5UGlCN1hHNGdJQ0FnYVdZZ0tHdGxlU0JwYmlCamIyMXRiMjVVZVhCdmN5a2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ1lXTjBkV0ZzSUQwZ1kyOXRiVzl1Vkhsd2IzTmJhMlY1WFR0Y2JpQWdJQ0FnSUdOdmJuTnZiR1V1ZDJGeWJpaGdXMk5oYm5aaGN5MXphMlYwWTJoZElFTnZkV3hrSUc1dmRDQnlaV052WjI1cGVtVWdkR2hsSUhObGRIUnBibWNnWENJa2UydGxlWDFjSWl3Z1pHbGtJSGx2ZFNCdFpXRnVJRndpSkh0aFkzUjFZV3g5WENJL1lDazdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDZ2hZV3hzUzJWNWN5NXBibU5zZFdSbGN5aHJaWGtwS1NCN1hHNGdJQ0FnSUNCamIyNXpiMnhsTG5kaGNtNG9ZRnRqWVc1MllYTXRjMnRsZEdOb1hTQkRiM1ZzWkNCdWIzUWdjbVZqYjJkdWFYcGxJSFJvWlNCelpYUjBhVzVuSUZ3aUpIdHJaWGw5WENKZ0tUdGNiaUFnSUNCOVhHNGdJSDBwTzF4dWZUdGNiaUlzSW1sdGNHOXlkQ0I3SUdkbGRFTnNhV1Z1ZEVGUVNTQjlJR1p5YjIwZ0p5NHVMM1YwYVd3bk8xeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpQW9iM0IwSUQwZ2UzMHBJSHRjYmlBZ1kyOXVjM1FnYUdGdVpHeGxjaUE5SUdWMklEMCtJSHRjYmlBZ0lDQnBaaUFvSVc5d2RDNWxibUZpYkdWa0tDa3BJSEpsZEhWeWJqdGNibHh1SUNBZ0lHTnZibk4wSUdOc2FXVnVkQ0E5SUdkbGRFTnNhV1Z1ZEVGUVNTZ3BPMXh1SUNBZ0lHbG1JQ2hsZGk1clpYbERiMlJsSUQwOVBTQTRNeUFtSmlBaFpYWXVZV3gwUzJWNUlDWW1JQ2hsZGk1dFpYUmhTMlY1SUh4OElHVjJMbU4wY214TFpYa3BLU0I3WEc0Z0lDQWdJQ0F2THlCRGJXUWdLeUJUWEc0Z0lDQWdJQ0JsZGk1d2NtVjJaVzUwUkdWbVlYVnNkQ2dwTzF4dUlDQWdJQ0FnYjNCMExuTmhkbVVvWlhZcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb1pYWXVhMlY1UTI5a1pTQTlQVDBnTXpJcElIdGNiaUFnSUNBZ0lDOHZJRk53WVdObFhHNGdJQ0FnSUNBdkx5QlVUMFJQT2lCM2FHRjBJSFJ2SUdSdklIZHBkR2dnZEdocGN6OGdhMlZsY0NCcGRDd2diM0lnY21WdGIzWmxJR2wwUDF4dUlDQWdJQ0FnYjNCMExuUnZaMmRzWlZCc1lYa29aWFlwTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvWTJ4cFpXNTBJQ1ltSUNGbGRpNWhiSFJMWlhrZ0ppWWdaWFl1YTJWNVEyOWtaU0E5UFQwZ056VWdKaVlnS0dWMkxtMWxkR0ZMWlhrZ2ZId2daWFl1WTNSeWJFdGxlU2twSUh0Y2JpQWdJQ0FnSUM4dklFTnRaQ0FySUVzc0lHOXViSGtnZDJobGJpQmpZVzUyWVhNdGMydGxkR05vTFdOc2FTQnBjeUIxYzJWa1hHNGdJQ0FnSUNCbGRpNXdjbVYyWlc1MFJHVm1ZWFZzZENncE8xeHVJQ0FnSUNBZ2IzQjBMbU52YlcxcGRDaGxkaWs3WEc0Z0lDQWdmVnh1SUNCOU8xeHVYRzRnSUdOdmJuTjBJR0YwZEdGamFDQTlJQ2dwSUQwK0lIdGNiaUFnSUNCM2FXNWtiM2N1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduYTJWNVpHOTNiaWNzSUdoaGJtUnNaWElwTzF4dUlDQjlPMXh1WEc0Z0lHTnZibk4wSUdSbGRHRmphQ0E5SUNncElEMCtJSHRjYmlBZ0lDQjNhVzVrYjNjdWNtVnRiM1psUlhabGJuUk1hWE4wWlc1bGNpZ25hMlY1Wkc5M2JpY3NJR2hoYm1Sc1pYSXBPMXh1SUNCOU8xeHVYRzRnSUhKbGRIVnliaUI3WEc0Z0lDQWdZWFIwWVdOb0xGeHVJQ0FnSUdSbGRHRmphRnh1SUNCOU8xeHVmVnh1SWl3aVkyOXVjM1FnWkdWbVlYVnNkRlZ1YVhSeklEMGdKMjF0Snp0Y2JseHVZMjl1YzNRZ1pHRjBZU0E5SUZ0Y2JpQWdMeThnUTI5dGJXOXVJRkJoY0dWeUlGTnBlbVZ6WEc0Z0lDOHZJQ2hOYjNOMGJIa2dUbTl5ZEdndFFXMWxjbWxqWVc0Z1ltRnpaV1FwWEc0Z0lGc2dKM0J2YzNSallYSmtKeXdnTVRBeExqWXNJREUxTWk0MElGMHNYRzRnSUZzZ0ozQnZjM1JsY2kxemJXRnNiQ2NzSURJNE1Dd2dORE13SUYwc1hHNGdJRnNnSjNCdmMzUmxjaWNzSURRMk1Dd2dOakV3SUYwc1hHNGdJRnNnSjNCdmMzUmxjaTFzWVhKblpTY3NJRFl4TUN3Z09URXdJRjBzWEc0Z0lGc2dKMkoxYzJsdVpYTnpMV05oY21RbkxDQTFNQzQ0TENBNE9DNDVJRjBzWEc1Y2JpQWdMeThnVUdodmRHOW5jbUZ3YUdsaklGQnlhVzUwSUZCaGNHVnlJRk5wZW1WelhHNGdJRnNnSnpKeUp5d2dOalFzSURnNUlGMHNYRzRnSUZzZ0p6TnlKeXdnT0Rrc0lERXlOeUJkTEZ4dUlDQmJJQ2MwY2ljc0lERXdNaXdnTVRVeUlGMHNYRzRnSUZzZ0p6VnlKeXdnTVRJM0xDQXhOemdnWFN3Z0x5OGdOZUtBczNnMzRvQ3pYRzRnSUZzZ0p6WnlKeXdnTVRVeUxDQXlNRE1nWFN3Z0x5OGdOdUtBczNnNDRvQ3pYRzRnSUZzZ0p6aHlKeXdnTWpBekxDQXlOVFFnWFN3Z0x5OGdPT0tBczNneE1PS0FzMXh1SUNCYklDY3hNSEluTENBeU5UUXNJRE13TlNCZExDQXZMeUF4TU9LQXMzZ3hNdUtBczF4dUlDQmJJQ2N4TVhJbkxDQXlOemtzSURNMU5pQmRMQ0F2THlBeE1lS0FzM2d4Tk9LQXMxeHVJQ0JiSUNjeE1uSW5MQ0F6TURVc0lETTRNU0JkTEZ4dVhHNGdJQzh2SUZOMFlXNWtZWEprSUZCaGNHVnlJRk5wZW1WelhHNGdJRnNnSjJFd0p5d2dPRFF4TENBeE1UZzVJRjBzWEc0Z0lGc2dKMkV4Snl3Z05UazBMQ0E0TkRFZ1hTeGNiaUFnV3lBbllUSW5MQ0EwTWpBc0lEVTVOQ0JkTEZ4dUlDQmJJQ2RoTXljc0lESTVOeXdnTkRJd0lGMHNYRzRnSUZzZ0oyRTBKeXdnTWpFd0xDQXlPVGNnWFN4Y2JpQWdXeUFuWVRVbkxDQXhORGdzSURJeE1DQmRMRnh1SUNCYklDZGhOaWNzSURFd05Td2dNVFE0SUYwc1hHNGdJRnNnSjJFM0p5d2dOelFzSURFd05TQmRMRnh1SUNCYklDZGhPQ2NzSURVeUxDQTNOQ0JkTEZ4dUlDQmJJQ2RoT1Njc0lETTNMQ0ExTWlCZExGeHVJQ0JiSUNkaE1UQW5MQ0F5Tml3Z016Y2dYU3hjYmlBZ1d5QW5NbUV3Snl3Z01URTRPU3dnTVRZNE1pQmRMRnh1SUNCYklDYzBZVEFuTENBeE5qZ3lMQ0F5TXpjNElGMHNYRzRnSUZzZ0oySXdKeXdnTVRBd01Dd2dNVFF4TkNCZExGeHVJQ0JiSUNkaU1TY3NJRGN3Tnl3Z01UQXdNQ0JkTEZ4dUlDQmJJQ2RpTVNzbkxDQTNNakFzSURFd01qQWdYU3hjYmlBZ1d5QW5ZakluTENBMU1EQXNJRGN3TnlCZExGeHVJQ0JiSUNkaU1pc25MQ0ExTWpBc0lEY3lNQ0JkTEZ4dUlDQmJJQ2RpTXljc0lETTFNeXdnTlRBd0lGMHNYRzRnSUZzZ0oySTBKeXdnTWpVd0xDQXpOVE1nWFN4Y2JpQWdXeUFuWWpVbkxDQXhOellzSURJMU1DQmRMRnh1SUNCYklDZGlOaWNzSURFeU5Td2dNVGMySUYwc1hHNGdJRnNnSjJJM0p5d2dPRGdzSURFeU5TQmRMRnh1SUNCYklDZGlPQ2NzSURZeUxDQTRPQ0JkTEZ4dUlDQmJJQ2RpT1Njc0lEUTBMQ0EyTWlCZExGeHVJQ0JiSUNkaU1UQW5MQ0F6TVN3Z05EUWdYU3hjYmlBZ1d5QW5ZakV4Snl3Z01qSXNJRE15SUYwc1hHNGdJRnNnSjJJeE1pY3NJREUyTENBeU1pQmRMRnh1SUNCYklDZGpNQ2NzSURreE55d2dNVEk1TnlCZExGeHVJQ0JiSUNkak1TY3NJRFkwT0N3Z09URTNJRjBzWEc0Z0lGc2dKMk15Snl3Z05EVTRMQ0EyTkRnZ1hTeGNiaUFnV3lBbll6TW5MQ0F6TWpRc0lEUTFPQ0JkTEZ4dUlDQmJJQ2RqTkNjc0lESXlPU3dnTXpJMElGMHNYRzRnSUZzZ0oyTTFKeXdnTVRZeUxDQXlNamtnWFN4Y2JpQWdXeUFuWXpZbkxDQXhNVFFzSURFMk1pQmRMRnh1SUNCYklDZGpOeWNzSURneExDQXhNVFFnWFN4Y2JpQWdXeUFuWXpnbkxDQTFOeXdnT0RFZ1hTeGNiaUFnV3lBbll6a25MQ0EwTUN3Z05UY2dYU3hjYmlBZ1d5QW5ZekV3Snl3Z01qZ3NJRFF3SUYwc1hHNGdJRnNnSjJNeE1TY3NJREl5TENBek1pQmRMRnh1SUNCYklDZGpNVEluTENBeE5pd2dNaklnWFN4Y2JseHVJQ0F2THlCVmMyVWdhVzVqYUdWeklHWnZjaUJPYjNKMGFDQkJiV1Z5YVdOaGJpQnphWHBsY3l4Y2JpQWdMeThnWVhNZ2FYUWdjSEp2WkhWalpYTWdiR1Z6Y3lCbWJHOWhkQ0J3Y21WamFYTnBiMjRnWlhKeWIzSnpYRzRnSUZzZ0oyaGhiR1l0YkdWMGRHVnlKeXdnTlM0MUxDQTRMalVzSUNkcGJpY2dYU3hjYmlBZ1d5QW5iR1YwZEdWeUp5d2dPQzQxTENBeE1Td2dKMmx1SnlCZExGeHVJQ0JiSUNkc1pXZGhiQ2NzSURndU5Td2dNVFFzSUNkcGJpY2dYU3hjYmlBZ1d5QW5hblZ1YVc5eUxXeGxaMkZzSnl3Z05Td2dPQ3dnSjJsdUp5QmRMRnh1SUNCYklDZHNaV1JuWlhJbkxDQXhNU3dnTVRjc0lDZHBiaWNnWFN4Y2JpQWdXeUFuZEdGaWJHOXBaQ2NzSURFeExDQXhOeXdnSjJsdUp5QmRMRnh1SUNCYklDZGhibk5wTFdFbkxDQTRMalVzSURFeExqQXNJQ2RwYmljZ1hTeGNiaUFnV3lBbllXNXphUzFpSnl3Z01URXVNQ3dnTVRjdU1Dd2dKMmx1SnlCZExGeHVJQ0JiSUNkaGJuTnBMV01uTENBeE55NHdMQ0F5TWk0d0xDQW5hVzRuSUYwc1hHNGdJRnNnSjJGdWMya3RaQ2NzSURJeUxqQXNJRE0wTGpBc0lDZHBiaWNnWFN4Y2JpQWdXeUFuWVc1emFTMWxKeXdnTXpRdU1Dd2dORFF1TUN3Z0oybHVKeUJkTEZ4dUlDQmJJQ2RoY21Ob0xXRW5MQ0E1TENBeE1pd2dKMmx1SnlCZExGeHVJQ0JiSUNkaGNtTm9MV0luTENBeE1pd2dNVGdzSUNkcGJpY2dYU3hjYmlBZ1d5QW5ZWEpqYUMxakp5d2dNVGdzSURJMExDQW5hVzRuSUYwc1hHNGdJRnNnSjJGeVkyZ3RaQ2NzSURJMExDQXpOaXdnSjJsdUp5QmRMRnh1SUNCYklDZGhjbU5vTFdVbkxDQXpOaXdnTkRnc0lDZHBiaWNnWFN4Y2JpQWdXeUFuWVhKamFDMWxNU2NzSURNd0xDQTBNaXdnSjJsdUp5QmRMRnh1SUNCYklDZGhjbU5vTFdVeUp5d2dNallzSURNNExDQW5hVzRuSUYwc1hHNGdJRnNnSjJGeVkyZ3RaVE1uTENBeU55d2dNemtzSUNkcGJpY2dYVnh1WFR0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1pHRjBZUzV5WldSMVkyVW9LR1JwWTNRc0lIQnlaWE5sZENrZ1BUNGdlMXh1SUNCamIyNXpkQ0JwZEdWdElEMGdlMXh1SUNBZ0lIVnVhWFJ6T2lCd2NtVnpaWFJiTTEwZ2ZId2daR1ZtWVhWc2RGVnVhWFJ6TEZ4dUlDQWdJR1JwYldWdWMybHZibk02SUZzZ2NISmxjMlYwV3pGZExDQndjbVZ6WlhSYk1sMGdYVnh1SUNCOU8xeHVJQ0JrYVdOMFczQnlaWE5sZEZzd1hWMGdQU0JwZEdWdE8xeHVJQ0JrYVdOMFczQnlaWE5sZEZzd1hTNXlaWEJzWVdObEtDOHRMMmNzSUNjZ0p5bGRJRDBnYVhSbGJUdGNiaUFnY21WMGRYSnVJR1JwWTNRN1hHNTlMQ0I3ZlNrN1hHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdGeVozVnRaVzUwY3k1c1pXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1lYSm5kVzFsYm5SelcybGRJQ0U5UFNCMWJtUmxabWx1WldRcElISmxkSFZ5YmlCaGNtZDFiV1Z1ZEhOYmFWMDdYRzRnSUNBZ2ZWeHVmVHRjYmlJc0luWmhjaUJrWldacGJtVmtJRDBnY21WeGRXbHlaU2duWkdWbWFXNWxaQ2NwTzF4dWRtRnlJSFZ1YVhSeklEMGdXeUFuYlcwbkxDQW5ZMjBuTENBbmJTY3NJQ2R3WXljc0lDZHdkQ2NzSUNkcGJpY3NJQ2RtZENjc0lDZHdlQ2NnWFR0Y2JseHVkbUZ5SUdOdmJuWmxjbk5wYjI1eklEMGdlMXh1SUNBdkx5QnRaWFJ5YVdOY2JpQWdiVG9nZTF4dUlDQWdJSE41YzNSbGJUb2dKMjFsZEhKcFl5Y3NYRzRnSUNBZ1ptRmpkRzl5T2lBeFhHNGdJSDBzWEc0Z0lHTnRPaUI3WEc0Z0lDQWdjM2x6ZEdWdE9pQW5iV1YwY21sakp5eGNiaUFnSUNCbVlXTjBiM0k2SURFZ0x5QXhNREJjYmlBZ2ZTeGNiaUFnYlcwNklIdGNiaUFnSUNCemVYTjBaVzA2SUNkdFpYUnlhV01uTEZ4dUlDQWdJR1poWTNSdmNqb2dNU0F2SURFd01EQmNiaUFnZlN4Y2JpQWdMeThnYVcxd1pYSnBZV3hjYmlBZ2NIUTZJSHRjYmlBZ0lDQnplWE4wWlcwNklDZHBiWEJsY21saGJDY3NYRzRnSUNBZ1ptRmpkRzl5T2lBeElDOGdOekpjYmlBZ2ZTeGNiaUFnY0dNNklIdGNiaUFnSUNCemVYTjBaVzA2SUNkcGJYQmxjbWxoYkNjc1hHNGdJQ0FnWm1GamRHOXlPaUF4SUM4Z05seHVJQ0I5TEZ4dUlDQnBiam9nZTF4dUlDQWdJSE41YzNSbGJUb2dKMmx0Y0dWeWFXRnNKeXhjYmlBZ0lDQm1ZV04wYjNJNklERmNiaUFnZlN4Y2JpQWdablE2SUh0Y2JpQWdJQ0J6ZVhOMFpXMDZJQ2RwYlhCbGNtbGhiQ2NzWEc0Z0lDQWdabUZqZEc5eU9pQXhNbHh1SUNCOVhHNTlPMXh1WEc1amIyNXpkQ0JoYm1Ob2IzSnpJRDBnZTF4dUlDQnRaWFJ5YVdNNklIdGNiaUFnSUNCMWJtbDBPaUFuYlNjc1hHNGdJQ0FnY21GMGFXODZJREVnTHlBd0xqQXlOVFJjYmlBZ2ZTeGNiaUFnYVcxd1pYSnBZV3c2SUh0Y2JpQWdJQ0IxYm1sME9pQW5hVzRuTEZ4dUlDQWdJSEpoZEdsdk9pQXdMakF5TlRSY2JpQWdmVnh1ZlR0Y2JseHVablZ1WTNScGIyNGdjbTkxYm1RZ0tIWmhiSFZsTENCa1pXTnBiV0ZzY3lrZ2UxeHVJQ0J5WlhSMWNtNGdUblZ0WW1WeUtFMWhkR2d1Y205MWJtUW9kbUZzZFdVZ0t5QW5aU2NnS3lCa1pXTnBiV0ZzY3lrZ0t5QW5aUzBuSUNzZ1pHVmphVzFoYkhNcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCamIyNTJaWEowUkdsemRHRnVZMlVnS0haaGJIVmxMQ0JtY205dFZXNXBkQ3dnZEc5VmJtbDBMQ0J2Y0hSektTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2RtRnNkV1VnSVQwOUlDZHVkVzFpWlhJbklIeDhJQ0ZwYzBacGJtbDBaU2gyWVd4MVpTa3BJSFJvY205M0lHNWxkeUJGY25KdmNpZ25WbUZzZFdVZ2JYVnpkQ0JpWlNCaElHWnBibWwwWlNCdWRXMWlaWEluS1R0Y2JpQWdhV1lnS0NGbWNtOXRWVzVwZENCOGZDQWhkRzlWYm1sMEtTQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0owMTFjM1FnYzNCbFkybG1lU0JtY205dElHRnVaQ0IwYnlCMWJtbDBjeWNwTzF4dVhHNGdJRzl3ZEhNZ1BTQnZjSFJ6SUh4OElIdDlPMXh1SUNCMllYSWdjR2w0Wld4elVHVnlTVzVqYUNBOUlHUmxabWx1WldRb2IzQjBjeTV3YVhobGJITlFaWEpKYm1Ob0xDQTVOaWs3WEc0Z0lIWmhjaUJ3Y21WamFYTnBiMjRnUFNCdmNIUnpMbkJ5WldOcGMybHZianRjYmlBZ2RtRnlJSEp2ZFc1a1VHbDRaV3dnUFNCdmNIUnpMbkp2ZFc1a1VHbDRaV3dnSVQwOUlHWmhiSE5sTzF4dVhHNGdJR1p5YjIxVmJtbDBJRDBnWm5KdmJWVnVhWFF1ZEc5TWIzZGxja05oYzJVb0tUdGNiaUFnZEc5VmJtbDBJRDBnZEc5VmJtbDBMblJ2VEc5M1pYSkRZWE5sS0NrN1hHNWNiaUFnYVdZZ0tIVnVhWFJ6TG1sdVpHVjRUMllvWm5KdmJWVnVhWFFwSUQwOVBTQXRNU2tnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RKYm5aaGJHbGtJR1p5YjIwZ2RXNXBkQ0JjSWljZ0t5Qm1jbTl0Vlc1cGRDQXJJQ2RjSWl3Z2JYVnpkQ0JpWlNCdmJtVWdiMlk2SUNjZ0t5QjFibWwwY3k1cWIybHVLQ2NzSUNjcEtUdGNiaUFnYVdZZ0tIVnVhWFJ6TG1sdVpHVjRUMllvZEc5VmJtbDBLU0E5UFQwZ0xURXBJSFJvY205M0lHNWxkeUJGY25KdmNpZ25TVzUyWVd4cFpDQm1jbTl0SUhWdWFYUWdYQ0luSUNzZ2RHOVZibWwwSUNzZ0oxd2lMQ0J0ZFhOMElHSmxJRzl1WlNCdlpqb2dKeUFySUhWdWFYUnpMbXB2YVc0b0p5d2dKeWtwTzF4dVhHNGdJR2xtSUNobWNtOXRWVzVwZENBOVBUMGdkRzlWYm1sMEtTQjdYRzRnSUNBZ0x5OGdWMlVnWkc5dUozUWdibVZsWkNCMGJ5QmpiMjUyWlhKMElHWnliMjBnUVNCMGJ5QkNJSE5wYm1ObElIUm9aWGtnWVhKbElIUm9aU0J6WVcxbElHRnNjbVZoWkhsY2JpQWdJQ0J5WlhSMWNtNGdkbUZzZFdVN1hHNGdJSDFjYmx4dUlDQjJZWElnZEc5R1lXTjBiM0lnUFNBeE8xeHVJQ0IyWVhJZ1puSnZiVVpoWTNSdmNpQTlJREU3WEc0Z0lIWmhjaUJwYzFSdlVHbDRaV3dnUFNCbVlXeHpaVHRjYmx4dUlDQnBaaUFvWm5KdmJWVnVhWFFnUFQwOUlDZHdlQ2NwSUh0Y2JpQWdJQ0JtY205dFJtRmpkRzl5SUQwZ01TQXZJSEJwZUdWc2MxQmxja2x1WTJnN1hHNGdJQ0FnWm5KdmJWVnVhWFFnUFNBbmFXNG5PMXh1SUNCOVhHNGdJR2xtSUNoMGIxVnVhWFFnUFQwOUlDZHdlQ2NwSUh0Y2JpQWdJQ0JwYzFSdlVHbDRaV3dnUFNCMGNuVmxPMXh1SUNBZ0lIUnZSbUZqZEc5eUlEMGdjR2w0Wld4elVHVnlTVzVqYUR0Y2JpQWdJQ0IwYjFWdWFYUWdQU0FuYVc0bk8xeHVJQ0I5WEc1Y2JpQWdkbUZ5SUdaeWIyMVZibWwwUkdGMFlTQTlJR052Ym5abGNuTnBiMjV6VzJaeWIyMVZibWwwWFR0Y2JpQWdkbUZ5SUhSdlZXNXBkRVJoZEdFZ1BTQmpiMjUyWlhKemFXOXVjMXQwYjFWdWFYUmRPMXh1WEc0Z0lDOHZJSE52ZFhKalpTQjBieUJoYm1Ob2IzSWdhVzV6YVdSbElITnZkWEpqWlNkeklITjVjM1JsYlZ4dUlDQjJZWElnWVc1amFHOXlJRDBnZG1Gc2RXVWdLaUJtY205dFZXNXBkRVJoZEdFdVptRmpkRzl5SUNvZ1puSnZiVVpoWTNSdmNqdGNibHh1SUNBdkx5QnBaaUJ6ZVhOMFpXMXpJR1JwWm1abGNpd2dZMjl1ZG1WeWRDQnZibVVnZEc4Z1lXNXZkR2hsY2x4dUlDQnBaaUFvWm5KdmJWVnVhWFJFWVhSaExuTjVjM1JsYlNBaFBUMGdkRzlWYm1sMFJHRjBZUzV6ZVhOMFpXMHBJSHRjYmlBZ0lDQXZMeUJ5WldkMWJHRnlJQ2R0SnlCMGJ5QW5hVzRuSUdGdVpDQnpieUJtYjNKMGFGeHVJQ0FnSUdGdVkyaHZjaUFxUFNCaGJtTm9iM0p6VzJaeWIyMVZibWwwUkdGMFlTNXplWE4wWlcxZExuSmhkR2x2TzF4dUlDQjlYRzVjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJR0Z1WTJodmNpQXZJSFJ2Vlc1cGRFUmhkR0V1Wm1GamRHOXlJQ29nZEc5R1lXTjBiM0k3WEc0Z0lHbG1JQ2hwYzFSdlVHbDRaV3dnSmlZZ2NtOTFibVJRYVhobGJDa2dlMXh1SUNBZ0lISmxjM1ZzZENBOUlFMWhkR2d1Y205MWJtUW9jbVZ6ZFd4MEtUdGNiaUFnZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnY0hKbFkybHphVzl1SUQwOVBTQW5iblZ0WW1WeUp5QW1KaUJwYzBacGJtbDBaU2h3Y21WamFYTnBiMjRwS1NCN1hHNGdJQ0FnY21WemRXeDBJRDBnY205MWJtUW9jbVZ6ZFd4MExDQndjbVZqYVhOcGIyNHBPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNTlYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWTI5dWRtVnlkRVJwYzNSaGJtTmxPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITXVkVzVwZEhNZ1BTQjFibWwwY3p0Y2JpSXNJbWx0Y0c5eWRDQndZWEJsY2xOcGVtVnpJR1p5YjIwZ0p5NHZjR0Z3WlhJdGMybDZaWE1uTzF4dWFXMXdiM0owSUdOdmJuWmxjblJNWlc1bmRHZ2dabkp2YlNBblkyOXVkbVZ5ZEMxc1pXNW5kR2duTzF4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1oyVjBSR2x0Wlc1emFXOXVjMFp5YjIxUWNtVnpaWFFnS0dScGJXVnVjMmx2Ym5Nc0lIVnVhWFJ6Vkc4Z1BTQW5jSGduTENCd2FYaGxiSE5RWlhKSmJtTm9JRDBnTnpJcElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCa2FXMWxibk5wYjI1eklEMDlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJR052Ym5OMElHdGxlU0E5SUdScGJXVnVjMmx2Ym5NdWRHOU1iM2RsY2tOaGMyVW9LVHRjYmlBZ0lDQnBaaUFvSVNoclpYa2dhVzRnY0dGd1pYSlRhWHBsY3lrcElIdGNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2loZ1ZHaGxJR1JwYldWdWMybHZiaUJ3Y21WelpYUWdYQ0lrZTJScGJXVnVjMmx2Ym5OOVhDSWdhWE1nYm05MElITjFjSEJ2Y25SbFpDQnZjaUJqYjNWc1pDQnViM1FnWW1VZ1ptOTFibVE3SUhSeWVTQjFjMmx1WnlCaE5Dd2dZVE1zSUhCdmMzUmpZWEprTENCc1pYUjBaWElzSUdWMFl5NWdLVnh1SUNBZ0lIMWNiaUFnSUNCamIyNXpkQ0J3Y21WelpYUWdQU0J3WVhCbGNsTnBlbVZ6VzJ0bGVWMDdYRzRnSUNBZ2NtVjBkWEp1SUhCeVpYTmxkQzVrYVcxbGJuTnBiMjV6TG0xaGNDaGtJRDArSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJqYjI1MlpYSjBSR2x6ZEdGdVkyVW9aQ3dnY0hKbGMyVjBMblZ1YVhSekxDQjFibWwwYzFSdkxDQndhWGhsYkhOUVpYSkpibU5vS1R0Y2JpQWdJQ0I5S1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCeVpYUjFjbTRnWkdsdFpXNXphVzl1Y3p0Y2JpQWdmVnh1ZlZ4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1kyOXVkbVZ5ZEVScGMzUmhibU5sSUNoa2FXMWxibk5wYjI0c0lIVnVhWFJ6Um5KdmJTQTlJQ2R3ZUNjc0lIVnVhWFJ6Vkc4Z1BTQW5jSGduTENCd2FYaGxiSE5RWlhKSmJtTm9JRDBnTnpJcElIdGNiaUFnY21WMGRYSnVJR052Ym5abGNuUk1aVzVuZEdnb1pHbHRaVzV6YVc5dUxDQjFibWwwYzBaeWIyMHNJSFZ1YVhSelZHOHNJSHRjYmlBZ0lDQndhWGhsYkhOUVpYSkpibU5vTEZ4dUlDQWdJSEJ5WldOcGMybHZiam9nTkN4Y2JpQWdJQ0J5YjNWdVpGQnBlR1ZzT2lCMGNuVmxYRzRnSUgwcE8xeHVmVnh1SWl3aWFXMXdiM0owSUhzZ1oyVjBSR2x0Wlc1emFXOXVjMFp5YjIxUWNtVnpaWFFzSUdOdmJuWmxjblJFYVhOMFlXNWpaU0I5SUdaeWIyMGdKeTR1TDJScGMzUmhibU5sY3ljN1hHNXBiWEJ2Y25RZ2V5QnBjMEp5YjNkelpYSXNJR1JsWm1sdVpXUWdmU0JtY205dElDY3VMaTkxZEdsc0p6dGNibHh1Wm5WdVkzUnBiMjRnWTJobFkydEpaa2hoYzBScGJXVnVjMmx2Ym5NZ0tITmxkSFJwYm1kektTQjdYRzRnSUdsbUlDZ2hjMlYwZEdsdVozTXVaR2x0Wlc1emFXOXVjeWtnY21WMGRYSnVJR1poYkhObE8xeHVJQ0JwWmlBb2RIbHdaVzltSUhObGRIUnBibWR6TG1ScGJXVnVjMmx2Ym5NZ1BUMDlJQ2R6ZEhKcGJtY25LU0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdhV1lnS0VGeWNtRjVMbWx6UVhKeVlYa29jMlYwZEdsdVozTXVaR2x0Wlc1emFXOXVjeWtnSmlZZ2MyVjBkR2x1WjNNdVpHbHRaVzV6YVc5dWN5NXNaVzVuZEdnZ1BqMGdNaWtnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWjJWMFVHRnlaVzUwVTJsNlpTQW9jSEp2Y0hNc0lITmxkSFJwYm1kektTQjdYRzRnSUM4dklGZG9aVzRnYm04Z2V5QmthVzFsYm5OcGIyNGdmU0JwY3lCd1lYTnpaV1FnYVc0Z2JtOWtaU3dnZDJVZ1pHVm1ZWFZzZENCMGJ5QklWRTFNSUdOaGJuWmhjeUJ6YVhwbFhHNGdJR2xtSUNnaGFYTkNjbTkzYzJWeUtDa3BJSHRjYmlBZ0lDQnlaWFIxY200Z1d5QXpNREFzSURFMU1DQmRPMXh1SUNCOVhHNWNiaUFnYkdWMElHVnNaVzFsYm5RZ1BTQnpaWFIwYVc1bmN5NXdZWEpsYm5RZ2ZId2dkMmx1Wkc5M08xeHVYRzRnSUdsbUlDaGxiR1Z0Wlc1MElEMDlQU0IzYVc1a2IzY2dmSHhjYmlBZ0lDQWdJR1ZzWlcxbGJuUWdQVDA5SUdSdlkzVnRaVzUwSUh4OFhHNGdJQ0FnSUNCbGJHVnRaVzUwSUQwOVBTQmtiMk4xYldWdWRDNWliMlI1S1NCN1hHNGdJQ0FnY21WMGRYSnVJRnNnZDJsdVpHOTNMbWx1Ym1WeVYybGtkR2dzSUhkcGJtUnZkeTVwYm01bGNraGxhV2RvZENCZE8xeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHTnZibk4wSUhzZ2QybGtkR2dzSUdobGFXZG9kQ0I5SUQwZ1pXeGxiV1Z1ZEM1blpYUkNiM1Z1WkdsdVowTnNhV1Z1ZEZKbFkzUW9LVHRjYmlBZ0lDQnlaWFIxY200Z1d5QjNhV1IwYUN3Z2FHVnBaMmgwSUYwN1hHNGdJSDFjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z2NtVnphWHBsUTJGdWRtRnpJQ2h3Y205d2N5d2djMlYwZEdsdVozTXBJSHRjYmlBZ2JHVjBJSGRwWkhSb0xDQm9aV2xuYUhRN1hHNGdJR3hsZENCemRIbHNaVmRwWkhSb0xDQnpkSGxzWlVobGFXZG9kRHRjYmlBZ2JHVjBJR05oYm5aaGMxZHBaSFJvTENCallXNTJZWE5JWldsbmFIUTdYRzVjYmlBZ1kyOXVjM1FnWW5KdmQzTmxjaUE5SUdselFuSnZkM05sY2lncE8xeHVJQ0JqYjI1emRDQmthVzFsYm5OcGIyNXpJRDBnYzJWMGRHbHVaM011WkdsdFpXNXphVzl1Y3p0Y2JpQWdZMjl1YzNRZ2FHRnpSR2x0Wlc1emFXOXVjeUE5SUdOb1pXTnJTV1pJWVhORWFXMWxibk5wYjI1ektITmxkSFJwYm1kektUdGNiaUFnWTI5dWMzUWdaWGh3YjNKMGFXNW5JRDBnY0hKdmNITXVaWGh3YjNKMGFXNW5PMXh1SUNCc1pYUWdjMk5oYkdWVWIwWnBkQ0E5SUdoaGMwUnBiV1Z1YzJsdmJuTWdQeUJ6WlhSMGFXNW5jeTV6WTJGc1pWUnZSbWwwSUNFOVBTQm1ZV3h6WlNBNklHWmhiSE5sTzF4dUlDQnNaWFFnYzJOaGJHVlViMVpwWlhjZ1BTQW9JV1Y0Y0c5eWRHbHVaeUFtSmlCb1lYTkVhVzFsYm5OcGIyNXpLU0EvSUhObGRIUnBibWR6TG5OallXeGxWRzlXYVdWM0lEb2dkSEoxWlR0Y2JpQWdMeThnYVc0Z2JtOWtaU3dnWTJGdVkyVnNJR0p2ZEdnZ2IyWWdkR2hsYzJVZ2IzQjBhVzl1YzF4dUlDQnBaaUFvSVdKeWIzZHpaWElwSUhOallXeGxWRzlHYVhRZ1BTQnpZMkZzWlZSdlZtbGxkeUE5SUdaaGJITmxPMXh1SUNCamIyNXpkQ0IxYm1sMGN5QTlJSE5sZEhScGJtZHpMblZ1YVhSek8xeHVJQ0JqYjI1emRDQndhWGhsYkhOUVpYSkpibU5vSUQwZ0tIUjVjR1Z2WmlCelpYUjBhVzVuY3k1d2FYaGxiSE5RWlhKSmJtTm9JRDA5UFNBbmJuVnRZbVZ5SnlBbUppQnBjMFpwYm1sMFpTaHpaWFIwYVc1bmN5NXdhWGhsYkhOUVpYSkpibU5vS1NrZ1B5QnpaWFIwYVc1bmN5NXdhWGhsYkhOUVpYSkpibU5vSURvZ056STdYRzRnSUdOdmJuTjBJR0pzWldWa0lEMGdaR1ZtYVc1bFpDaHpaWFIwYVc1bmN5NWliR1ZsWkN3Z01DazdYRzVjYmlBZ1kyOXVjM1FnWkdWMmFXTmxVR2w0Wld4U1lYUnBieUE5SUdKeWIzZHpaWElnUHlCM2FXNWtiM2N1WkdWMmFXTmxVR2w0Wld4U1lYUnBieUE2SURFN1hHNGdJR052Ym5OMElHSmhjMlZRYVhobGJGSmhkR2x2SUQwZ2MyTmhiR1ZVYjFacFpYY2dQeUJrWlhacFkyVlFhWGhsYkZKaGRHbHZJRG9nTVR0Y2JseHVJQ0JzWlhRZ2NHbDRaV3hTWVhScGJ5d2daWGh3YjNKMFVHbDRaV3hTWVhScGJ6dGNibHh1SUNBdkx5QkpaaUJoSUhCcGVHVnNJSEpoZEdsdklHbHpJSE53WldOcFptbGxaQ3dnZDJVZ2QybHNiQ0IxYzJVZ2FYUXVYRzRnSUM4dklFOTBhR1Z5ZDJselpUcGNiaUFnTHk4Z0lDMCtJRWxtSUdScGJXVnVjMmx2YmlCcGN5QnpjR1ZqYVdacFpXUXNJSFZ6WlNCaVlYTmxJSEpoZEdsdklDaHBMbVV1SUhOcGVtVWdabTl5SUdWNGNHOXlkQ2xjYmlBZ0x5OGdJQzArSUVsbUlHNXZJR1JwYldWdWMybHZiaUJwY3lCemNHVmphV1pwWldRc0lIVnpaU0JrWlhacFkyVWdjbUYwYVc4Z0tHa3VaUzRnYzJsNlpTQm1iM0lnYzJOeVpXVnVLVnh1SUNCcFppQW9kSGx3Wlc5bUlITmxkSFJwYm1kekxuQnBlR1ZzVW1GMGFXOGdQVDA5SUNkdWRXMWlaWEluSUNZbUlHbHpSbWx1YVhSbEtITmxkSFJwYm1kekxuQnBlR1ZzVW1GMGFXOHBLU0I3WEc0Z0lDQWdMeThnVjJobGJpQjdJSEJwZUdWc1VtRjBhVzhnZlNCcGN5QnpjR1ZqYVdacFpXUXNJR2wwSjNNZ1lXeHpieUIxYzJWa0lHRnpJR1JsWm1GMWJIUWdaWGh3YjNKMFVHbDRaV3hTWVhScGJ5NWNiaUFnSUNCd2FYaGxiRkpoZEdsdklEMGdjMlYwZEdsdVozTXVjR2w0Wld4U1lYUnBienRjYmlBZ0lDQmxlSEJ2Y25SUWFYaGxiRkpoZEdsdklEMGdaR1ZtYVc1bFpDaHpaWFIwYVc1bmN5NWxlSEJ2Y25SUWFYaGxiRkpoZEdsdkxDQndhWGhsYkZKaGRHbHZLVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JwWmlBb2FHRnpSR2x0Wlc1emFXOXVjeWtnZTF4dUlDQWdJQ0FnTHk4Z1YyaGxiaUJoSUdScGJXVnVjMmx2YmlCcGN5QnpjR1ZqYVdacFpXUXNJSFZ6WlNCMGFHVWdZbUZ6WlNCeVlYUnBieUJ5WVhSb1pYSWdkR2hoYmlCelkzSmxaVzRnY21GMGFXOWNiaUFnSUNBZ0lIQnBlR1ZzVW1GMGFXOGdQU0JpWVhObFVHbDRaV3hTWVhScGJ6dGNiaUFnSUNBZ0lDOHZJRVJsWm1GMWJIUWdkRzhnWVNCd2FYaGxiQ0J5WVhScGJ5QnZaaUF4SUhOdklIUm9ZWFFnZVc5MUlHVnVaQ0IxY0NCM2FYUm9JSFJvWlNCellXMWxJR1JwYldWdWMybHZibHh1SUNBZ0lDQWdMeThnZVc5MUlITndaV05wWm1sbFpDd2dhUzVsTGlCYklEVXdNQ3dnTlRBd0lGMGdhWE1nWlhod2IzSjBaV1FnWVhNZ05UQXdlRFV3TUNCd2VGeHVJQ0FnSUNBZ1pYaHdiM0owVUdsNFpXeFNZWFJwYnlBOUlHUmxabWx1WldRb2MyVjBkR2x1WjNNdVpYaHdiM0owVUdsNFpXeFNZWFJwYnl3Z01TazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUM4dklFNXZJR1JwYldWdWMybHZiaUJwY3lCemNHVmphV1pwWldRc0lHRnpjM1Z0WlNCbWRXeHNMWE5qY21WbGJpQnlaWFJwYm1FZ2MybDZhVzVuWEc0Z0lDQWdJQ0J3YVhobGJGSmhkR2x2SUQwZ1pHVjJhV05sVUdsNFpXeFNZWFJwYnp0Y2JpQWdJQ0FnSUM4dklFUmxabUYxYkhRZ2RHOGdjMk55WldWdUlIQnBlR1ZzSUhKaGRHbHZMQ0J6YnlCMGFHRjBJR2wwSjNNZ2JHbHJaU0IwWVd0cGJtY2dZU0JrWlhacFkyVWdjMk55WldWdWMyaHZkRnh1SUNBZ0lDQWdaWGh3YjNKMFVHbDRaV3hTWVhScGJ5QTlJR1JsWm1sdVpXUW9jMlYwZEdsdVozTXVaWGh3YjNKMFVHbDRaV3hTWVhScGJ5d2djR2w0Wld4U1lYUnBieWs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnTHk4Z1EyeGhiWEFnY0dsNFpXd2djbUYwYVc5Y2JpQWdhV1lnS0hSNWNHVnZaaUJ6WlhSMGFXNW5jeTV0WVhoUWFYaGxiRkpoZEdsdklEMDlQU0FuYm5WdFltVnlKeUFtSmlCcGMwWnBibWwwWlNoelpYUjBhVzVuY3k1dFlYaFFhWGhsYkZKaGRHbHZLU2tnZTF4dUlDQWdJSEJwZUdWc1VtRjBhVzhnUFNCTllYUm9MbTFwYmloelpYUjBhVzVuY3k1dFlYaFFhWGhsYkZKaGRHbHZMQ0J3YVhobGJGSmhkR2x2S1R0Y2JpQWdmVnh1WEc0Z0lDOHZJRWhoYm1Sc1pTQmxlSEJ2Y25RZ2NHbDRaV3dnY21GMGFXOWNiaUFnYVdZZ0tHVjRjRzl5ZEdsdVp5a2dlMXh1SUNBZ0lIQnBlR1ZzVW1GMGFXOGdQU0JsZUhCdmNuUlFhWGhsYkZKaGRHbHZPMXh1SUNCOVhHNWNiaUFnTHk4Z2NHRnlaVzUwVjJsa2RHZ2dQU0IwZVhCbGIyWWdjR0Z5Wlc1MFYybGtkR2dnUFQwOUlDZDFibVJsWm1sdVpXUW5JRDhnWkdWbVlYVnNkRTV2WkdWVGFYcGxXekJkSURvZ2NHRnlaVzUwVjJsa2RHZzdYRzRnSUM4dklIQmhjbVZ1ZEVobGFXZG9kQ0E5SUhSNWNHVnZaaUJ3WVhKbGJuUklaV2xuYUhRZ1BUMDlJQ2QxYm1SbFptbHVaV1FuSUQ4Z1pHVm1ZWFZzZEU1dlpHVlRhWHBsV3pGZElEb2djR0Z5Wlc1MFNHVnBaMmgwTzF4dVhHNGdJR3hsZENCYklIQmhjbVZ1ZEZkcFpIUm9MQ0J3WVhKbGJuUklaV2xuYUhRZ1hTQTlJR2RsZEZCaGNtVnVkRk5wZW1Vb2NISnZjSE1zSUhObGRIUnBibWR6S1R0Y2JpQWdiR1YwSUhSeWFXMVhhV1IwYUN3Z2RISnBiVWhsYVdkb2REdGNibHh1SUNBdkx5QlpiM1VnWTJGdUlITndaV05wWm5rZ1lTQmthVzFsYm5OcGIyNXpJR2x1SUhCcGVHVnNjeUJ2Y2lCamJTOXRMMmx1TDJWMFkxeHVJQ0JwWmlBb2FHRnpSR2x0Wlc1emFXOXVjeWtnZTF4dUlDQWdJR052Ym5OMElISmxjM1ZzZENBOUlHZGxkRVJwYldWdWMybHZibk5HY205dFVISmxjMlYwS0dScGJXVnVjMmx2Ym5Nc0lIVnVhWFJ6TENCd2FYaGxiSE5RWlhKSmJtTm9LVHRjYmlBZ0lDQmpiMjV6ZENCb2FXZG9aWE4wSUQwZ1RXRjBhQzV0WVhnb2NtVnpkV3gwV3pCZExDQnlaWE4xYkhSYk1WMHBPMXh1SUNBZ0lHTnZibk4wSUd4dmQyVnpkQ0E5SUUxaGRHZ3ViV2x1S0hKbGMzVnNkRnN3WFN3Z2NtVnpkV3gwV3pGZEtUdGNiaUFnSUNCcFppQW9jMlYwZEdsdVozTXViM0pwWlc1MFlYUnBiMjRwSUh0Y2JpQWdJQ0FnSUdOdmJuTjBJR3hoYm1SelkyRndaU0E5SUhObGRIUnBibWR6TG05eWFXVnVkR0YwYVc5dUlEMDlQU0FuYkdGdVpITmpZWEJsSnp0Y2JpQWdJQ0FnSUhkcFpIUm9JRDBnYkdGdVpITmpZWEJsSUQ4Z2FHbG5hR1Z6ZENBNklHeHZkMlZ6ZER0Y2JpQWdJQ0FnSUdobGFXZG9kQ0E5SUd4aGJtUnpZMkZ3WlNBL0lHeHZkMlZ6ZENBNklHaHBaMmhsYzNRN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSGRwWkhSb0lEMGdjbVZ6ZFd4MFd6QmRPMXh1SUNBZ0lDQWdhR1ZwWjJoMElEMGdjbVZ6ZFd4MFd6RmRPMXh1SUNBZ0lIMWNibHh1SUNBZ0lIUnlhVzFYYVdSMGFDQTlJSGRwWkhSb08xeHVJQ0FnSUhSeWFXMUlaV2xuYUhRZ1BTQm9aV2xuYUhRN1hHNWNiaUFnSUNBdkx5QkJjSEJzZVNCaWJHVmxaQ0IzYUdsamFDQnBjeUJoYzNOMWJXVmtJSFJ2SUdKbElHbHVJSFJvWlNCellXMWxJSFZ1YVhSelhHNGdJQ0FnZDJsa2RHZ2dLejBnWW14bFpXUWdLaUF5TzF4dUlDQWdJR2hsYVdkb2RDQXJQU0JpYkdWbFpDQXFJREk3WEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnZDJsa2RHZ2dQU0J3WVhKbGJuUlhhV1IwYUR0Y2JpQWdJQ0JvWldsbmFIUWdQU0J3WVhKbGJuUklaV2xuYUhRN1hHNGdJQ0FnZEhKcGJWZHBaSFJvSUQwZ2QybGtkR2c3WEc0Z0lDQWdkSEpwYlVobGFXZG9kQ0E5SUdobGFXZG9kRHRjYmlBZ2ZWeHVYRzRnSUM4dklGSmxZV3dnYzJsNlpTQnBiaUJ3YVhobGJITWdZV1owWlhJZ1VGQkpJR2x6SUhSaGEyVnVJR2x1ZEc4Z1lXTmpiM1Z1ZEZ4dUlDQnNaWFFnY21WaGJGZHBaSFJvSUQwZ2QybGtkR2c3WEc0Z0lHeGxkQ0J5WldGc1NHVnBaMmgwSUQwZ2FHVnBaMmgwTzF4dUlDQnBaaUFvYUdGelJHbHRaVzV6YVc5dWN5QW1KaUIxYm1sMGN5a2dlMXh1SUNBZ0lDOHZJRU52Ym5abGNuUWdkRzhnWkdsbmFYUmhiQzl3YVhobGJDQjFibWwwY3lCcFppQnVaV05sYzNOaGNubGNiaUFnSUNCeVpXRnNWMmxrZEdnZ1BTQmpiMjUyWlhKMFJHbHpkR0Z1WTJVb2QybGtkR2dzSUhWdWFYUnpMQ0FuY0hnbkxDQndhWGhsYkhOUVpYSkpibU5vS1R0Y2JpQWdJQ0J5WldGc1NHVnBaMmgwSUQwZ1kyOXVkbVZ5ZEVScGMzUmhibU5sS0dobGFXZG9kQ3dnZFc1cGRITXNJQ2R3ZUNjc0lIQnBlR1ZzYzFCbGNrbHVZMmdwTzF4dUlDQjlYRzVjYmlBZ0x5OGdTRzkzSUdKcFp5QjBieUJ6WlhRZ2RHaGxJQ2QyYVdWM0p5QnZaaUIwYUdVZ1kyRnVkbUZ6SUdsdUlIUm9aU0JpY205M2MyVnlJQ2hwTG1VdUlITjBlV3hsS1Z4dUlDQnpkSGxzWlZkcFpIUm9JRDBnVFdGMGFDNXliM1Z1WkNoeVpXRnNWMmxrZEdncE8xeHVJQ0J6ZEhsc1pVaGxhV2RvZENBOUlFMWhkR2d1Y205MWJtUW9jbVZoYkVobGFXZG9kQ2s3WEc1Y2JpQWdMeThnU1dZZ2QyVWdkMmx6YUNCMGJ5QnpZMkZzWlNCMGFHVWdkbWxsZHlCMGJ5QjBhR1VnWW5KdmQzTmxjaUIzYVc1a2IzZGNiaUFnYVdZZ0tITmpZV3hsVkc5R2FYUWdKaVlnSVdWNGNHOXlkR2x1WnlBbUppQm9ZWE5FYVcxbGJuTnBiMjV6S1NCN1hHNGdJQ0FnWTI5dWMzUWdZWE53WldOMElEMGdkMmxrZEdnZ0x5Qm9aV2xuYUhRN1hHNGdJQ0FnWTI5dWMzUWdkMmx1Wkc5M1FYTndaV04wSUQwZ2NHRnlaVzUwVjJsa2RHZ2dMeUJ3WVhKbGJuUklaV2xuYUhRN1hHNGdJQ0FnWTI5dWMzUWdjMk5oYkdWVWIwWnBkRkJoWkdScGJtY2dQU0JrWldacGJtVmtLSE5sZEhScGJtZHpMbk5qWVd4bFZHOUdhWFJRWVdSa2FXNW5MQ0EwTUNrN1hHNGdJQ0FnWTI5dWMzUWdiV0Y0VjJsa2RHZ2dQU0JOWVhSb0xuSnZkVzVrS0hCaGNtVnVkRmRwWkhSb0lDMGdjMk5oYkdWVWIwWnBkRkJoWkdScGJtY2dLaUF5S1R0Y2JpQWdJQ0JqYjI1emRDQnRZWGhJWldsbmFIUWdQU0JOWVhSb0xuSnZkVzVrS0hCaGNtVnVkRWhsYVdkb2RDQXRJSE5qWVd4bFZHOUdhWFJRWVdSa2FXNW5JQ29nTWlrN1hHNGdJQ0FnYVdZZ0tITjBlV3hsVjJsa2RHZ2dQaUJ0WVhoWGFXUjBhQ0I4ZkNCemRIbHNaVWhsYVdkb2RDQStJRzFoZUVobGFXZG9kQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tIZHBibVJ2ZDBGemNHVmpkQ0ErSUdGemNHVmpkQ2tnZTF4dUlDQWdJQ0FnSUNCemRIbHNaVWhsYVdkb2RDQTlJRzFoZUVobGFXZG9kRHRjYmlBZ0lDQWdJQ0FnYzNSNWJHVlhhV1IwYUNBOUlFMWhkR2d1Y205MWJtUW9jM1I1YkdWSVpXbG5hSFFnS2lCaGMzQmxZM1FwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnYzNSNWJHVlhhV1IwYUNBOUlHMWhlRmRwWkhSb08xeHVJQ0FnSUNBZ0lDQnpkSGxzWlVobGFXZG9kQ0E5SUUxaGRHZ3VjbTkxYm1Rb2MzUjViR1ZYYVdSMGFDQXZJR0Z6Y0dWamRDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdZMkZ1ZG1GelYybGtkR2dnUFNCelkyRnNaVlJ2Vm1sbGR5QS9JRTFoZEdndWNtOTFibVFvY0dsNFpXeFNZWFJwYnlBcUlITjBlV3hsVjJsa2RHZ3BJRG9nVFdGMGFDNXliM1Z1WkNod2FYaGxiRkpoZEdsdklDb2djbVZoYkZkcFpIUm9LVHRjYmlBZ1kyRnVkbUZ6U0dWcFoyaDBJRDBnYzJOaGJHVlViMVpwWlhjZ1B5Qk5ZWFJvTG5KdmRXNWtLSEJwZUdWc1VtRjBhVzhnS2lCemRIbHNaVWhsYVdkb2RDa2dPaUJOWVhSb0xuSnZkVzVrS0hCcGVHVnNVbUYwYVc4Z0tpQnlaV0ZzU0dWcFoyaDBLVHRjYmx4dUlDQmpiMjV6ZENCMmFXVjNjRzl5ZEZkcFpIUm9JRDBnYzJOaGJHVlViMVpwWlhjZ1B5Qk5ZWFJvTG5KdmRXNWtLSE4wZVd4bFYybGtkR2dwSURvZ1RXRjBhQzV5YjNWdVpDaHlaV0ZzVjJsa2RHZ3BPMXh1SUNCamIyNXpkQ0IyYVdWM2NHOXlkRWhsYVdkb2RDQTlJSE5qWVd4bFZHOVdhV1YzSUQ4Z1RXRjBhQzV5YjNWdVpDaHpkSGxzWlVobGFXZG9kQ2tnT2lCTllYUm9Mbkp2ZFc1a0tISmxZV3hJWldsbmFIUXBPMXh1WEc0Z0lHTnZibk4wSUhOallXeGxXQ0E5SUdOaGJuWmhjMWRwWkhSb0lDOGdkMmxrZEdnN1hHNGdJR052Ym5OMElITmpZV3hsV1NBOUlHTmhiblpoYzBobGFXZG9kQ0F2SUdobGFXZG9kRHRjYmx4dUlDQXZMeUJCYzNOcFoyNGdkRzhnWTNWeWNtVnVkQ0J3Y205d2MxeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lHSnNaV1ZrTEZ4dUlDQWdJSEJwZUdWc1VtRjBhVzhzWEc0Z0lDQWdkMmxrZEdnc1hHNGdJQ0FnYUdWcFoyaDBMRnh1SUNBZ0lHUnBiV1Z1YzJsdmJuTTZJRnNnZDJsa2RHZ3NJR2hsYVdkb2RDQmRMRnh1SUNBZ0lIVnVhWFJ6T2lCMWJtbDBjeUI4ZkNBbmNIZ25MRnh1SUNBZ0lITmpZV3hsV0N4Y2JpQWdJQ0J6WTJGc1pWa3NYRzRnSUNBZ2NHbDRaV3h6VUdWeVNXNWphQ3hjYmlBZ0lDQjJhV1YzY0c5eWRGZHBaSFJvTEZ4dUlDQWdJSFpwWlhkd2IzSjBTR1ZwWjJoMExGeHVJQ0FnSUdOaGJuWmhjMWRwWkhSb0xGeHVJQ0FnSUdOaGJuWmhjMGhsYVdkb2RDeGNiaUFnSUNCMGNtbHRWMmxrZEdnc1hHNGdJQ0FnZEhKcGJVaGxhV2RvZEN4Y2JpQWdJQ0J6ZEhsc1pWZHBaSFJvTEZ4dUlDQWdJSE4wZVd4bFNHVnBaMmgwWEc0Z0lIMDdYRzU5WEc0aUxDSnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHZGxkRU5oYm5aaGMwTnZiblJsZUhSY2JtWjFibU4wYVc5dUlHZGxkRU5oYm5aaGMwTnZiblJsZUhRZ0tIUjVjR1VzSUc5d2RITXBJSHRjYmlBZ2FXWWdLSFI1Y0dWdlppQjBlWEJsSUNFOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9KMjExYzNRZ2MzQmxZMmxtZVNCMGVYQmxJSE4wY21sdVp5Y3BYRzRnSUgxY2JseHVJQ0J2Y0hSeklEMGdiM0IwY3lCOGZDQjdmVnh1WEc0Z0lHbG1JQ2gwZVhCbGIyWWdaRzlqZFcxbGJuUWdQVDA5SUNkMWJtUmxabWx1WldRbklDWW1JQ0Z2Y0hSekxtTmhiblpoY3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ1ZFd4c0lDOHZJR05vWldOcklHWnZjaUJPYjJSbFhHNGdJSDFjYmx4dUlDQjJZWElnWTJGdWRtRnpJRDBnYjNCMGN5NWpZVzUyWVhNZ2ZId2daRzlqZFcxbGJuUXVZM0psWVhSbFJXeGxiV1Z1ZENnblkyRnVkbUZ6SnlsY2JpQWdhV1lnS0hSNWNHVnZaaUJ2Y0hSekxuZHBaSFJvSUQwOVBTQW5iblZ0WW1WeUp5a2dlMXh1SUNBZ0lHTmhiblpoY3k1M2FXUjBhQ0E5SUc5d2RITXVkMmxrZEdoY2JpQWdmVnh1SUNCcFppQW9kSGx3Wlc5bUlHOXdkSE11YUdWcFoyaDBJRDA5UFNBbmJuVnRZbVZ5SnlrZ2UxeHVJQ0FnSUdOaGJuWmhjeTVvWldsbmFIUWdQU0J2Y0hSekxtaGxhV2RvZEZ4dUlDQjlYRzVjYmlBZ2RtRnlJR0YwZEhKcFluTWdQU0J2Y0hSelhHNGdJSFpoY2lCbmJGeHVJQ0IwY25rZ2UxeHVJQ0FnSUhaaGNpQnVZVzFsY3lBOUlGc2dkSGx3WlNCZFhHNGdJQ0FnTHk4Z2NISmxabWw0SUVkTUlHTnZiblJsZUhSelhHNGdJQ0FnYVdZZ0tIUjVjR1V1YVc1a1pYaFBaaWduZDJWaVoyd25LU0E5UFQwZ01Da2dlMXh1SUNBZ0lDQWdibUZ0WlhNdWNIVnphQ2duWlhod1pYSnBiV1Z1ZEdGc0xTY2dLeUIwZVhCbEtWeHVJQ0FnSUgxY2JseHVJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2JtRnRaWE11YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHZHNJRDBnWTJGdWRtRnpMbWRsZEVOdmJuUmxlSFFvYm1GdFpYTmJhVjBzSUdGMGRISnBZbk1wWEc0Z0lDQWdJQ0JwWmlBb1oyd3BJSEpsZEhWeWJpQm5iRnh1SUNBZ0lIMWNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUdkc0lEMGdiblZzYkZ4dUlDQjlYRzRnSUhKbGRIVnliaUFvWjJ3Z2ZId2diblZzYkNrZ0x5OGdaVzV6ZFhKbElHNTFiR3dnYjI0Z1ptRnBiRnh1ZlZ4dUlpd2lhVzF3YjNKMElHRnpjMmxuYmlCbWNtOXRJQ2R2WW1wbFkzUXRZWE56YVdkdUp6dGNibWx0Y0c5eWRDQm5aWFJEWVc1MllYTkRiMjUwWlhoMElHWnliMjBnSjJkbGRDMWpZVzUyWVhNdFkyOXVkR1Y0ZENjN1hHNXBiWEJ2Y25RZ2V5QnBjMEp5YjNkelpYSWdmU0JtY205dElDY3VMaTkxZEdsc0p6dGNibHh1Wm5WdVkzUnBiMjRnWTNKbFlYUmxRMkZ1ZG1GelJXeGxiV1Z1ZENBb0tTQjdYRzRnSUdsbUlDZ2hhWE5DY205M2MyVnlLQ2twSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMGwwSUdGd2NHVmhjbk1nZVc5MUlHRnlaU0J5ZFc1cGJtY2dabkp2YlNCT2IyUmxMbXB6SUc5eUlHRWdibTl1TFdKeWIzZHpaWElnWlc1MmFYSnZibTFsYm5RdUlGUnllU0J3WVhOemFXNW5JR2x1SUdGdUlHVjRhWE4wYVc1bklIc2dZMkZ1ZG1GeklIMGdhVzUwWlhKbVlXTmxJR2x1YzNSbFlXUXVKeWs3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oyTmhiblpoY3ljcE8xeHVmVnh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJqY21WaGRHVkRZVzUyWVhNZ0tITmxkSFJwYm1keklEMGdlMzBwSUh0Y2JpQWdiR1YwSUdOdmJuUmxlSFFzSUdOaGJuWmhjenRjYmlBZ2JHVjBJRzkzYm5ORFlXNTJZWE1nUFNCbVlXeHpaVHRjYmlBZ2FXWWdLSE5sZEhScGJtZHpMbU5oYm5aaGN5QWhQVDBnWm1Gc2MyVXBJSHRjYmlBZ0lDQXZMeUJFWlhSbGNtMXBibVVnZEdobElHTmhiblpoY3lCaGJtUWdZMjl1ZEdWNGRDQjBieUJqY21WaGRHVmNiaUFnSUNCamIyNTBaWGgwSUQwZ2MyVjBkR2x1WjNNdVkyOXVkR1Y0ZER0Y2JpQWdJQ0JwWmlBb0lXTnZiblJsZUhRZ2ZId2dkSGx3Wlc5bUlHTnZiblJsZUhRZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdJQ0JzWlhRZ2JtVjNRMkZ1ZG1GeklEMGdjMlYwZEdsdVozTXVZMkZ1ZG1Gek8xeHVJQ0FnSUNBZ2FXWWdLQ0Z1WlhkRFlXNTJZWE1wSUh0Y2JpQWdJQ0FnSUNBZ2JtVjNRMkZ1ZG1GeklEMGdZM0psWVhSbFEyRnVkbUZ6Uld4bGJXVnVkQ2dwTzF4dUlDQWdJQ0FnSUNCdmQyNXpRMkZ1ZG1GeklEMGdkSEoxWlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUdOdmJuTjBJSFI1Y0dVZ1BTQmpiMjUwWlhoMElIeDhJQ2N5WkNjN1hHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHNWxkME5oYm5aaGN5NW5aWFJEYjI1MFpYaDBJQ0U5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpaGdWR2hsSUhOd1pXTnBabWxsWkNCN0lHTmhiblpoY3lCOUlHVnNaVzFsYm5RZ1pHOWxjeUJ1YjNRZ2FHRjJaU0JoSUdkbGRFTnZiblJsZUhRb0tTQm1kVzVqZEdsdmJpd2diV0Y1WW1VZ2FYUWdhWE1nYm05MElHRWdQR05oYm5aaGN6NGdkR0ZuUDJBcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ1kyOXVkR1Y0ZENBOUlHZGxkRU5oYm5aaGMwTnZiblJsZUhRb2RIbHdaU3dnWVhOemFXZHVLSHQ5TENCelpYUjBhVzVuY3k1aGRIUnlhV0oxZEdWekxDQjdJR05oYm5aaGN6b2dibVYzUTJGdWRtRnpJSDBwS1R0Y2JpQWdJQ0FnSUdsbUlDZ2hZMjl1ZEdWNGRDa2dlMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9ZRVpoYVd4bFpDQmhkQ0JqWVc1MllYTXVaMlYwUTI5dWRHVjRkQ2duSkh0MGVYQmxmU2NwSUMwZ2RHaGxJR0p5YjNkelpYSWdiV0Y1SUc1dmRDQnpkWEJ3YjNKMElIUm9hWE1nWTI5dWRHVjRkQ3dnYjNJZ1lTQmthV1ptWlhKbGJuUWdZMjl1ZEdWNGRDQnRZWGtnWVd4eVpXRmtlU0JpWlNCcGJpQjFjMlVnZDJsMGFDQjBhR2x6SUdOaGJuWmhjeTVnS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0JqWVc1MllYTWdQU0JqYjI1MFpYaDBMbU5oYm5aaGN6dGNiaUFnSUNBdkx5QkZibk4xY21VZ1kyOXVkR1Y0ZENCdFlYUmphR1Z6SUhWelpYSW5jeUJqWVc1MllYTWdaWGh3WldOMFlYUnBiMjV6WEc0Z0lDQWdhV1lnS0hObGRIUnBibWR6TG1OaGJuWmhjeUFtSmlCallXNTJZWE1nSVQwOUlITmxkSFJwYm1kekxtTmhiblpoY3lrZ2UxeHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVWFHVWdleUJqWVc1MllYTWdmU0JoYm1RZ2V5QmpiMjUwWlhoMElIMGdjMlYwZEdsdVozTWdiWFZ6ZENCd2IybHVkQ0IwYnlCMGFHVWdjMkZ0WlNCMWJtUmxjbXg1YVc1bklHTmhiblpoY3lCbGJHVnRaVzUwSnlrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1FYQndiSGtnY0dsNFpXeGhkR2x2YmlCMGJ5QmpZVzUyWVhNZ2FXWWdibVZqWlhOellYSjVMQ0IwYUdseklHbHpJRzF2YzNSc2VTQmhJR052Ym5abGJtbGxibU5sSUhWMGFXeHBkSGxjYmlBZ0lDQnBaaUFvYzJWMGRHbHVaM011Y0dsNFpXeGhkR1ZrS1NCN1hHNGdJQ0FnSUNCamIyNTBaWGgwTG1sdFlXZGxVMjF2YjNSb2FXNW5SVzVoWW14bFpDQTlJR1poYkhObE8xeHVJQ0FnSUNBZ1kyOXVkR1Y0ZEM1dGIzcEpiV0ZuWlZOdGIyOTBhR2x1WjBWdVlXSnNaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJR052Ym5SbGVIUXViMGx0WVdkbFUyMXZiM1JvYVc1blJXNWhZbXhsWkNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnWTI5dWRHVjRkQzUzWldKcmFYUkpiV0ZuWlZOdGIyOTBhR2x1WjBWdVlXSnNaV1FnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJR052Ym5SbGVIUXViWE5KYldGblpWTnRiMjkwYUdsdVowVnVZV0pzWldRZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUdOaGJuWmhjeTV6ZEhsc1pWc25hVzFoWjJVdGNtVnVaR1Z5YVc1bkoxMGdQU0FuY0dsNFpXeGhkR1ZrSnp0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJSHNnWTJGdWRtRnpMQ0JqYjI1MFpYaDBMQ0J2ZDI1elEyRnVkbUZ6SUgwN1hHNTlYRzRpTENKcGJYQnZjblFnWVhOemFXZHVJR1p5YjIwZ0oyOWlhbVZqZEMxaGMzTnBaMjRuTzF4dWFXMXdiM0owSUhKcFoyaDBUbTkzSUdaeWIyMGdKM0pwWjJoMExXNXZkeWM3WEc1cGJYQnZjblFnYVhOUWNtOXRhWE5sSUdaeWIyMGdKMmx6TFhCeWIyMXBjMlVuTzF4dWFXMXdiM0owSUhzZ2FYTkNjbTkzYzJWeUxDQmtaV1pwYm1Wa0xDQnBjMWRsWWtkTVEyOXVkR1Y0ZEN3Z2FYTkRZVzUyWVhNc0lHZGxkRU5zYVdWdWRFRlFTU0I5SUdaeWIyMGdKeTR1TDNWMGFXd25PMXh1YVcxd2IzSjBJR1JsWlhCRmNYVmhiQ0JtY205dElDZGtaV1Z3TFdWeGRXRnNKenRjYm1sdGNHOXlkQ0I3WEc0Z0lISmxjMjlzZG1WR2FXeGxibUZ0WlN4Y2JpQWdjMkYyWlVacGJHVXNYRzRnSUhOaGRtVkVZWFJoVlZKTUxGeHVJQ0JuWlhSVWFXMWxVM1JoYlhBc1hHNGdJR1Y0Y0c5eWRFTmhiblpoY3l4Y2JpQWdjM1J5WldGdFUzUmhjblFzWEc0Z0lITjBjbVZoYlVWdVpGeHVmU0JtY205dElDY3VMaTl6WVhabEp6dGNibWx0Y0c5eWRDQjdJR05vWldOclUyVjBkR2x1WjNNZ2ZTQm1jbTl0SUNjdUxpOWhZMk5sYzNOcFltbHNhWFI1Snp0Y2JseHVhVzF3YjNKMElHdGxlV0p2WVhKa1UyaHZjblJqZFhSeklHWnliMjBnSnk0dmEyVjVZbTloY21SVGFHOXlkR04xZEhNbk8xeHVhVzF3YjNKMElISmxjMmw2WlVOaGJuWmhjeUJtY205dElDY3VMM0psYzJsNlpVTmhiblpoY3ljN1hHNXBiWEJ2Y25RZ1kzSmxZWFJsUTJGdWRtRnpJR1p5YjIwZ0p5NHZZM0psWVhSbFEyRnVkbUZ6Snp0Y2JseHVZMnhoYzNNZ1UydGxkR05vVFdGdVlXZGxjaUI3WEc0Z0lHTnZibk4wY25WamRHOXlJQ2dwSUh0Y2JpQWdJQ0IwYUdsekxsOXpaWFIwYVc1bmN5QTlJSHQ5TzF4dUlDQWdJSFJvYVhNdVgzQnliM0J6SUQwZ2UzMDdYRzRnSUNBZ2RHaHBjeTVmYzJ0bGRHTm9JRDBnZFc1a1pXWnBibVZrTzF4dUlDQWdJSFJvYVhNdVgzSmhaaUE5SUc1MWJHdzdYRzRnSUNBZ2RHaHBjeTVmY21WamIzSmtWR2x0Wlc5MWRDQTlJRzUxYkd3N1hHNWNiaUFnSUNBdkx5QlRiMjFsSUdoaFkydDVJSFJvYVc1bmN5QnlaWEYxYVhKbFpDQjBieUJuWlhRZ1lYSnZkVzVrSUhBMUxtcHpJSE4wY25WamRIVnlaVnh1SUNBZ0lIUm9hWE11WDJ4aGMzUlNaV1J5WVhkU1pYTjFiSFFnUFNCMWJtUmxabWx1WldRN1hHNGdJQ0FnZEdocGN5NWZhWE5RTlZKbGMybDZhVzVuSUQwZ1ptRnNjMlU3WEc1Y2JpQWdJQ0IwYUdsekxsOXJaWGxpYjJGeVpGTm9iM0owWTNWMGN5QTlJR3RsZVdKdllYSmtVMmh2Y25SamRYUnpLSHRjYmlBZ0lDQWdJR1Z1WVdKc1pXUTZJQ2dwSUQwK0lIUm9hWE11YzJWMGRHbHVaM011YUc5MGEyVjVjeUFoUFQwZ1ptRnNjMlVzWEc0Z0lDQWdJQ0J6WVhabE9pQW9aWFlwSUQwK0lIdGNiaUFnSUNBZ0lDQWdhV1lnS0dWMkxuTm9hV1owUzJWNUtTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11Y0hKdmNITXVjbVZqYjNKa2FXNW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG1WdVpGSmxZMjl5WkNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXlkVzRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2RHaHBjeTV5WldOdmNtUW9LVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNnaGRHaHBjeTV3Y205d2N5NXlaV052Y21ScGJtY3BJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbVY0Y0c5eWRFWnlZVzFsS0NrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMHNYRzRnSUNBZ0lDQjBiMmRuYkdWUWJHRjVPaUFvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbkJ5YjNCekxuQnNZWGxwYm1jcElIUm9hWE11Y0dGMWMyVW9LVHRjYmlBZ0lDQWdJQ0FnWld4elpTQjBhR2x6TG5Cc1lYa29LVHRjYmlBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0JqYjIxdGFYUTZJQ2hsZGlrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtVjRjRzl5ZEVaeVlXMWxLSHNnWTI5dGJXbDBPaUIwY25WbElIMHBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHBPMXh1WEc0Z0lDQWdkR2hwY3k1ZllXNXBiV0YwWlVoaGJtUnNaWElnUFNBb0tTQTlQaUIwYUdsekxtRnVhVzFoZEdVb0tUdGNibHh1SUNBZ0lIUm9hWE11WDNKbGMybDZaVWhoYm1Sc1pYSWdQU0FvS1NBOVBpQjdYRzRnSUNBZ0lDQmpiMjV6ZENCamFHRnVaMlZrSUQwZ2RHaHBjeTV5WlhOcGVtVW9LVHRjYmlBZ0lDQWdJQzh2SUU5dWJIa2djbVV0Y21WdVpHVnlJSGRvWlc0Z2MybDZaU0JoWTNSMVlXeHNlU0JqYUdGdVoyVnpYRzRnSUNBZ0lDQnBaaUFvWTJoaGJtZGxaQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYm1SbGNpZ3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUgxY2JseHVJQ0JuWlhRZ2MydGxkR05vSUNncElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NWZjMnRsZEdOb08xeHVJQ0I5WEc1Y2JpQWdaMlYwSUhObGRIUnBibWR6SUNncElIdGNiaUFnSUNCeVpYUjFjbTRnZEdocGN5NWZjMlYwZEdsdVozTTdYRzRnSUgxY2JseHVJQ0JuWlhRZ2NISnZjSE1nS0NrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwYUdsekxsOXdjbTl3Y3p0Y2JpQWdmVnh1WEc0Z0lGOWpiMjF3ZFhSbFVHeGhlV2hsWVdRZ0tHTjFjbkpsYm5SVWFXMWxMQ0JrZFhKaGRHbHZiaWtnZTF4dUlDQWdJR052Ym5OMElHaGhjMFIxY21GMGFXOXVJRDBnZEhsd1pXOW1JR1IxY21GMGFXOXVJRDA5UFNBbmJuVnRZbVZ5SnlBbUppQnBjMFpwYm1sMFpTaGtkWEpoZEdsdmJpazdYRzRnSUNBZ2NtVjBkWEp1SUdoaGMwUjFjbUYwYVc5dUlEOGdZM1Z5Y21WdWRGUnBiV1VnTHlCa2RYSmhkR2x2YmlBNklEQTdYRzRnSUgxY2JseHVJQ0JmWTI5dGNIVjBaVVp5WVcxbElDaHdiR0Y1YUdWaFpDd2dkR2x0WlN3Z2RHOTBZV3hHY21GdFpYTXNJR1p3Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUFvYVhOR2FXNXBkR1VvZEc5MFlXeEdjbUZ0WlhNcElDWW1JSFJ2ZEdGc1JuSmhiV1Z6SUQ0Z01TbGNiaUFnSUNBZ0lEOGdUV0YwYUM1bWJHOXZjaWh3YkdGNWFHVmhaQ0FxSUNoMGIzUmhiRVp5WVcxbGN5QXRJREVwS1Z4dUlDQWdJQ0FnT2lCTllYUm9MbVpzYjI5eUtHWndjeUFxSUhScGJXVXBPMXh1SUNCOVhHNWNiaUFnWDJOdmJYQjFkR1ZEZFhKeVpXNTBSbkpoYldVZ0tDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDlqYjIxd2RYUmxSbkpoYldVb1hHNGdJQ0FnSUNCMGFHbHpMbkJ5YjNCekxuQnNZWGxvWldGa0xDQjBhR2x6TG5CeWIzQnpMblJwYldVc1hHNGdJQ0FnSUNCMGFHbHpMbkJ5YjNCekxuUnZkR0ZzUm5KaGJXVnpMQ0IwYUdsekxuQnliM0J6TG1ad2MxeHVJQ0FnSUNrN1hHNGdJSDFjYmx4dUlDQmZaMlYwVTJsNlpWQnliM0J6SUNncElIdGNiaUFnSUNCamIyNXpkQ0J3Y205d2N5QTlJSFJvYVhNdWNISnZjSE03WEc0Z0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lIZHBaSFJvT2lCd2NtOXdjeTUzYVdSMGFDeGNiaUFnSUNBZ0lHaGxhV2RvZERvZ2NISnZjSE11YUdWcFoyaDBMRnh1SUNBZ0lDQWdjR2w0Wld4U1lYUnBiem9nY0hKdmNITXVjR2w0Wld4U1lYUnBieXhjYmlBZ0lDQWdJR05oYm5aaGMxZHBaSFJvT2lCd2NtOXdjeTVqWVc1MllYTlhhV1IwYUN4Y2JpQWdJQ0FnSUdOaGJuWmhjMGhsYVdkb2REb2djSEp2Y0hNdVkyRnVkbUZ6U0dWcFoyaDBMRnh1SUNBZ0lDQWdkbWxsZDNCdmNuUlhhV1IwYURvZ2NISnZjSE11ZG1sbGQzQnZjblJYYVdSMGFDeGNiaUFnSUNBZ0lIWnBaWGR3YjNKMFNHVnBaMmgwT2lCd2NtOXdjeTUyYVdWM2NHOXlkRWhsYVdkb2RGeHVJQ0FnSUgwN1hHNGdJSDFjYmx4dUlDQnlkVzRnS0NrZ2UxeHVJQ0FnSUdsbUlDZ2hkR2hwY3k1emEyVjBZMmdwSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduYzJodmRXeGtJSGRoYVhRZ2RXNTBhV3dnYzJ0bGRHTm9JR2x6SUd4dllXUmxaQ0JpWldadmNtVWdkSEo1YVc1bklIUnZJSEJzWVhrb0tTY3BPMXh1WEc0Z0lDQWdMeThnVTNSaGNuUWdZVzRnWVc1cGJXRjBhVzl1SUdaeVlXMWxJR3h2YjNBZ2FXWWdibVZqWlhOellYSjVYRzRnSUNBZ2FXWWdLSFJvYVhNdWMyVjBkR2x1WjNNdWNHeGhlV2x1WnlBaFBUMGdabUZzYzJVcElIdGNiaUFnSUNBZ0lIUm9hWE11Y0d4aGVTZ3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRXhsZENkeklHeGxkQ0IwYUdseklIZGhjbTVwYm1jZ2FHRnVaeUJoY205MWJtUWdabTl5SUdFZ1ptVjNJSFpsY25OcGIyNXpMaTR1WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUIwYUdsekxuTnJaWFJqYUM1a2FYTndiM05sSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0JqYjI1emIyeGxMbmRoY200b0owbHVJR05oYm5aaGN5MXphMlYwWTJoQU1DNHdMakl6SUhSb1pTQmthWE53YjNObEtDa2daWFpsYm5RZ2FHRnpJR0psWlc0Z2NtVnVZVzFsWkNCMGJ5QjFibXh2WVdRb0tTY3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRWx1SUdOaGMyVWdkMlVnWVhKbGJpZDBJSEJzWVhscGJtY2diM0lnWVc1cGJXRjBaV1FzSUcxaGEyVWdjM1Z5WlNCM1pTQnpkR2xzYkNCMGNtbG5aMlZ5SUdKbFoybHVJRzFsYzNOaFoyVXVMaTVjYmlBZ0lDQnBaaUFvSVhSb2FYTXVjSEp2Y0hNdWMzUmhjblJsWkNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmYzJsbmJtRnNRbVZuYVc0b0tUdGNiaUFnSUNBZ0lIUm9hWE11Y0hKdmNITXVjM1JoY25SbFpDQTlJSFJ5ZFdVN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1VtVnVaR1Z5SUdGdUlHbHVhWFJwWVd3Z1puSmhiV1ZjYmlBZ0lDQjBhR2x6TG5ScFkyc29LVHRjYmlBZ0lDQjBhR2x6TG5KbGJtUmxjaWdwTzF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQjlYRzVjYmlBZ1gyTmhibU5sYkZScGJXVnZkWFJ6SUNncElIdGNiaUFnSUNCcFppQW9kR2hwY3k1ZmNtRm1JQ0U5SUc1MWJHd2dKaVlnZEhsd1pXOW1JSGRwYm1SdmR5QWhQVDBnSjNWdVpHVm1hVzVsWkNjZ0ppWWdkSGx3Wlc5bUlIZHBibVJ2ZHk1allXNWpaV3hCYm1sdFlYUnBiMjVHY21GdFpTQTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ2QybHVaRzkzTG1OaGJtTmxiRUZ1YVcxaGRHbHZia1p5WVcxbEtIUm9hWE11WDNKaFppazdYRzRnSUNBZ0lDQjBhR2x6TGw5eVlXWWdQU0J1ZFd4c08xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RHaHBjeTVmY21WamIzSmtWR2x0Wlc5MWRDQWhQU0J1ZFd4c0tTQjdYRzRnSUNBZ0lDQmpiR1ZoY2xScGJXVnZkWFFvZEdocGN5NWZjbVZqYjNKa1ZHbHRaVzkxZENrN1hHNGdJQ0FnSUNCMGFHbHpMbDl5WldOdmNtUlVhVzFsYjNWMElEMGdiblZzYkR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCd2JHRjVJQ2dwSUh0Y2JpQWdJQ0JzWlhRZ1lXNXBiV0YwWlNBOUlIUm9hWE11YzJWMGRHbHVaM011WVc1cGJXRjBaVHRjYmlBZ0lDQnBaaUFvSjJGdWFXMWhkR2x2YmljZ2FXNGdkR2hwY3k1elpYUjBhVzVuY3lrZ2UxeHVJQ0FnSUNBZ1lXNXBiV0YwWlNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0JqYjI1emIyeGxMbmRoY200b0oxdGpZVzUyWVhNdGMydGxkR05vWFNCN0lHRnVhVzFoZEdsdmJpQjlJR2hoY3lCaVpXVnVJSEpsYm1GdFpXUWdkRzhnZXlCaGJtbHRZWFJsSUgwbktUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tDRmhibWx0WVhSbEtTQnlaWFIxY200N1hHNGdJQ0FnYVdZZ0tDRnBjMEp5YjNkelpYSW9LU2tnZTF4dUlDQWdJQ0FnWTI5dWMyOXNaUzVsY25KdmNpZ25XMk5oYm5aaGN5MXphMlYwWTJoZElGZEJVazQ2SUZWemFXNW5JSHNnWVc1cGJXRjBaU0I5SUdsdUlFNXZaR1V1YW5NZ2FYTWdibTkwSUhsbGRDQnpkWEJ3YjNKMFpXUW5LVHRjYmlBZ0lDQWdJSEpsZEhWeWJqdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tIUm9hWE11Y0hKdmNITXVjR3hoZVdsdVp5a2djbVYwZFhKdU8xeHVJQ0FnSUdsbUlDZ2hkR2hwY3k1d2NtOXdjeTV6ZEdGeWRHVmtLU0I3WEc0Z0lDQWdJQ0IwYUdsekxsOXphV2R1WVd4Q1pXZHBiaWdwTzF4dUlDQWdJQ0FnZEdocGN5NXdjbTl3Y3k1emRHRnlkR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJqYjI1emIyeGxMbXh2WnlnbmNHeGhlU2NzSUhSb2FYTXVjSEp2Y0hNdWRHbHRaU2xjYmx4dUlDQWdJQzh2SUZOMFlYSjBJR0VnY21WdVpHVnlJR3h2YjNCY2JpQWdJQ0IwYUdsekxuQnliM0J6TG5Cc1lYbHBibWNnUFNCMGNuVmxPMXh1SUNBZ0lIUm9hWE11WDJOaGJtTmxiRlJwYldWdmRYUnpLQ2s3WEc0Z0lDQWdkR2hwY3k1ZmJHRnpkRlJwYldVZ1BTQnlhV2RvZEU1dmR5Z3BPMXh1SUNBZ0lIUm9hWE11WDNKaFppQTlJSGRwYm1SdmR5NXlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VvZEdocGN5NWZZVzVwYldGMFpVaGhibVJzWlhJcE8xeHVJQ0I5WEc1Y2JpQWdjR0YxYzJVZ0tDa2dlMXh1SUNBZ0lHbG1JQ2gwYUdsekxuQnliM0J6TG5KbFkyOXlaR2x1WnlrZ2RHaHBjeTVsYm1SU1pXTnZjbVFvS1R0Y2JpQWdJQ0IwYUdsekxuQnliM0J6TG5Cc1lYbHBibWNnUFNCbVlXeHpaVHRjYmx4dUlDQWdJSFJvYVhNdVgyTmhibU5sYkZScGJXVnZkWFJ6S0NrN1hHNGdJSDFjYmx4dUlDQjBiMmRuYkdWUWJHRjVJQ2dwSUh0Y2JpQWdJQ0JwWmlBb2RHaHBjeTV3Y205d2N5NXdiR0Y1YVc1bktTQjBhR2x6TG5CaGRYTmxLQ2s3WEc0Z0lDQWdaV3h6WlNCMGFHbHpMbkJzWVhrb0tUdGNiaUFnZlZ4dVhHNGdJQzh2SUZOMGIzQWdZVzVrSUhKbGMyVjBJSFJ2SUdaeVlXMWxJSHBsY205Y2JpQWdjM1J2Y0NBb0tTQjdYRzRnSUNBZ2RHaHBjeTV3WVhWelpTZ3BPMXh1SUNBZ0lIUm9hWE11Y0hKdmNITXVabkpoYldVZ1BTQXdPMXh1SUNBZ0lIUm9hWE11Y0hKdmNITXVjR3hoZVdobFlXUWdQU0F3TzF4dUlDQWdJSFJvYVhNdWNISnZjSE11ZEdsdFpTQTlJREE3WEc0Z0lDQWdkR2hwY3k1d2NtOXdjeTVrWld4MFlWUnBiV1VnUFNBd08xeHVJQ0FnSUhSb2FYTXVjSEp2Y0hNdWMzUmhjblJsWkNBOUlHWmhiSE5sTzF4dUlDQWdJSFJvYVhNdWNtVnVaR1Z5S0NrN1hHNGdJSDFjYmx4dUlDQnlaV052Y21RZ0tDa2dlMXh1SUNBZ0lHbG1JQ2gwYUdsekxuQnliM0J6TG5KbFkyOXlaR2x1WnlrZ2NtVjBkWEp1TzF4dUlDQWdJR2xtSUNnaGFYTkNjbTkzYzJWeUtDa3BJSHRjYmlBZ0lDQWdJR052Ym5OdmJHVXVaWEp5YjNJb0oxdGpZVzUyWVhNdGMydGxkR05vWFNCWFFWSk9PaUJTWldOdmNtUnBibWNnWm5KdmJTQk9iMlJsTG1weklHbHpJRzV2ZENCNVpYUWdjM1Z3Y0c5eWRHVmtKeWs3WEc0Z0lDQWdJQ0J5WlhSMWNtNDdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RHaHBjeTV6ZEc5d0tDazdYRzRnSUNBZ2RHaHBjeTV3Y205d2N5NXdiR0Y1YVc1bklEMGdkSEoxWlR0Y2JpQWdJQ0IwYUdsekxuQnliM0J6TG5KbFkyOXlaR2x1WnlBOUlIUnlkV1U3WEc1Y2JpQWdJQ0JqYjI1emRDQmxlSEJ2Y25SUGNIUnpJRDBnZEdocGN5NWZZM0psWVhSbFJYaHdiM0owVDNCMGFXOXVjeWg3SUhObGNYVmxibU5sT2lCMGNuVmxJSDBwTzF4dVhHNGdJQ0FnWTI5dWMzUWdabkpoYldWSmJuUmxjblpoYkNBOUlERWdMeUIwYUdsekxuQnliM0J6TG1ad2N6dGNiaUFnSUNBdkx5QlNaVzVrWlhJZ1pXRmphQ0JtY21GdFpTQnBiaUIwYUdVZ2MyVnhkV1Z1WTJWY2JpQWdJQ0IwYUdsekxsOWpZVzVqWld4VWFXMWxiM1YwY3lncE8xeHVJQ0FnSUdOdmJuTjBJSFJwWTJzZ1BTQW9LU0E5UGlCN1hHNGdJQ0FnSUNCcFppQW9JWFJvYVhNdWNISnZjSE11Y21WamIzSmthVzVuS1NCeVpYUjFjbTRnVUhKdmJXbHpaUzV5WlhOdmJIWmxLQ2s3WEc0Z0lDQWdJQ0IwYUdsekxuQnliM0J6TG1SbGJIUmhWR2x0WlNBOUlHWnlZVzFsU1c1MFpYSjJZV3c3WEc0Z0lDQWdJQ0IwYUdsekxuUnBZMnNvS1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtVjRjRzl5ZEVaeVlXMWxLR1Y0Y0c5eWRFOXdkSE1wWEc0Z0lDQWdJQ0FnSUM1MGFHVnVLQ2dwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb0lYUm9hWE11Y0hKdmNITXVjbVZqYjNKa2FXNW5LU0J5WlhSMWNtNDdJQzh2SUhkaGN5QmpZVzVqWld4c1pXUWdZbVZtYjNKbFhHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1d2NtOXdjeTVrWld4MFlWUnBiV1VnUFNBd08xeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdWNISnZjSE11Wm5KaGJXVXJLenRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9kR2hwY3k1d2NtOXdjeTVtY21GdFpTQThJSFJvYVhNdWNISnZjSE11ZEc5MFlXeEdjbUZ0WlhNcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdWRHbHRaU0FyUFNCbWNtRnRaVWx1ZEdWeWRtRnNPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5NXdiR0Y1YUdWaFpDQTlJSFJvYVhNdVgyTnZiWEIxZEdWUWJHRjVhR1ZoWkNoMGFHbHpMbkJ5YjNCekxuUnBiV1VzSUhSb2FYTXVjSEp2Y0hNdVpIVnlZWFJwYjI0cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZjbVZqYjNKa1ZHbHRaVzkxZENBOUlITmxkRlJwYldWdmRYUW9kR2xqYXl3Z01DazdYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LQ2RHYVc1cGMyaGxaQ0J5WldOdmNtUnBibWNuS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgzTnBaMjVoYkVWdVpDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVsYm1SU1pXTnZjbVFvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWMzUnZjQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1eWRXNG9LVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lIMDdYRzVjYmlBZ0lDQXZMeUJVY21sbloyVnlJR0VnYzNSaGNuUWdaWFpsYm5RZ1ltVm1iM0psSUhkbElHSmxaMmx1SUhKbFkyOXlaR2x1WjF4dUlDQWdJR2xtSUNnaGRHaHBjeTV3Y205d2N5NXpkR0Z5ZEdWa0tTQjdYRzRnSUNBZ0lDQjBhR2x6TGw5emFXZHVZV3hDWldkcGJpZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1d2NtOXdjeTV6ZEdGeWRHVmtJRDBnZEhKMVpUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QlVjbWxuWjJWeUlDZGlaV2RwYmlCeVpXTnZjbVFuSUdWMlpXNTBYRzRnSUNBZ2FXWWdLSFJvYVhNdWMydGxkR05vSUNZbUlIUjVjR1Z2WmlCMGFHbHpMbk5yWlhSamFDNWlaV2RwYmxKbFkyOXlaQ0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1ZmQzSmhjRU52Ym5SbGVIUlRZMkZzWlNod2NtOXdjeUE5UGlCMGFHbHpMbk5yWlhSamFDNWlaV2RwYmxKbFkyOXlaQ2h3Y205d2N5a3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRWx1YVhScFlYUmxJR0VnYzNSeVpXRnRhVzVuSUhOMFlYSjBJR2xtSUc1bFkyVnpjMkZ5ZVZ4dUlDQWdJSE4wY21WaGJWTjBZWEowS0dWNGNHOXlkRTl3ZEhNcFhHNGdJQ0FnSUNBdVkyRjBZMmdvWlhKeUlEMCtJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVsY25KdmNpaGxjbklwTzF4dUlDQWdJQ0FnZlNsY2JpQWdJQ0FnSUM1MGFHVnVLSEpsYzNCdmJuTmxJRDArSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmY21GbUlEMGdkMmx1Wkc5M0xuSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU2gwYVdOcktUdGNiaUFnSUNBZ0lIMHBPMXh1SUNCOVhHNWNiaUFnWDNOcFoyNWhiRUpsWjJsdUlDZ3BJSHRjYmlBZ0lDQnBaaUFvZEdocGN5NXphMlYwWTJnZ0ppWWdkSGx3Wlc5bUlIUm9hWE11YzJ0bGRHTm9MbUpsWjJsdUlEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbDkzY21Gd1EyOXVkR1Y0ZEZOallXeGxLSEJ5YjNCeklEMCtJSFJvYVhNdWMydGxkR05vTG1KbFoybHVLSEJ5YjNCektTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdYM05wWjI1aGJFVnVaQ0FvS1NCN1hHNGdJQ0FnYVdZZ0tIUm9hWE11YzJ0bGRHTm9JQ1ltSUhSNWNHVnZaaUIwYUdsekxuTnJaWFJqYUM1bGJtUWdQVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNBZ0lIUm9hWE11WDNkeVlYQkRiMjUwWlhoMFUyTmhiR1VvY0hKdmNITWdQVDRnZEdocGN5NXphMlYwWTJndVpXNWtLSEJ5YjNCektTazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdaVzVrVW1WamIzSmtJQ2dwSUh0Y2JpQWdJQ0JqYjI1emRDQjNZWE5TWldOdmNtUnBibWNnUFNCMGFHbHpMbkJ5YjNCekxuSmxZMjl5WkdsdVp6dGNibHh1SUNBZ0lIUm9hWE11WDJOaGJtTmxiRlJwYldWdmRYUnpLQ2s3WEc0Z0lDQWdkR2hwY3k1d2NtOXdjeTV5WldOdmNtUnBibWNnUFNCbVlXeHpaVHRjYmlBZ0lDQjBhR2x6TG5CeWIzQnpMbVJsYkhSaFZHbHRaU0E5SURBN1hHNGdJQ0FnZEdocGN5NXdjbTl3Y3k1d2JHRjVhVzVuSUQwZ1ptRnNjMlU3WEc1Y2JpQWdJQ0F2THlCMFpXeHNJRU5NU1NCMGFHRjBJSE4wY21WaGJTQm9ZWE1nWm1sdWFYTm9aV1JjYmlBZ0lDQnlaWFIxY200Z2MzUnlaV0Z0Ulc1a0tDbGNiaUFnSUNBZ0lDNWpZWFJqYUNobGNuSWdQVDRnZTF4dUlDQWdJQ0FnSUNCamIyNXpiMnhsTG1WeWNtOXlLR1Z5Y2lrN1hHNGdJQ0FnSUNCOUtWeHVJQ0FnSUNBZ0xuUm9aVzRvS0NrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0F2THlCVWNtbG5aMlZ5SUNkbGJtUWdjbVZqYjNKa0p5QmxkbVZ1ZEZ4dUlDQWdJQ0FnSUNCcFppQW9kMkZ6VW1WamIzSmthVzVuSUNZbUlIUm9hWE11YzJ0bGRHTm9JQ1ltSUhSNWNHVnZaaUIwYUdsekxuTnJaWFJqYUM1bGJtUlNaV052Y21RZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5M2NtRndRMjl1ZEdWNGRGTmpZV3hsS0hCeWIzQnpJRDArSUhSb2FYTXVjMnRsZEdOb0xtVnVaRkpsWTI5eVpDaHdjbTl3Y3lrcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlLVHRjYmlBZ2ZWeHVYRzRnSUY5amNtVmhkR1ZGZUhCdmNuUlBjSFJwYjI1eklDaHZjSFFnUFNCN2ZTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNCelpYRjFaVzVqWlRvZ2IzQjBMbk5sY1hWbGJtTmxMRnh1SUNBZ0lDQWdjMkYyWlRvZ2IzQjBMbk5oZG1Vc1hHNGdJQ0FnSUNCbWNITTZJSFJvYVhNdWNISnZjSE11Wm5CekxGeHVJQ0FnSUNBZ1puSmhiV1U2SUc5d2RDNXpaWEYxWlc1alpTQS9JSFJvYVhNdWNISnZjSE11Wm5KaGJXVWdPaUIxYm1SbFptbHVaV1FzWEc0Z0lDQWdJQ0JtYVd4bE9pQjBhR2x6TG5ObGRIUnBibWR6TG1acGJHVXNYRzRnSUNBZ0lDQnVZVzFsT2lCMGFHbHpMbk5sZEhScGJtZHpMbTVoYldVc1hHNGdJQ0FnSUNCd2NtVm1hWGc2SUhSb2FYTXVjMlYwZEdsdVozTXVjSEpsWm1sNExGeHVJQ0FnSUNBZ2MzVm1abWw0T2lCMGFHbHpMbk5sZEhScGJtZHpMbk4xWm1acGVDeGNiaUFnSUNBZ0lHVnVZMjlrYVc1bk9pQjBhR2x6TG5ObGRIUnBibWR6TG1WdVkyOWthVzVuTEZ4dUlDQWdJQ0FnWlc1amIyUnBibWRSZFdGc2FYUjVPaUIwYUdsekxuTmxkSFJwYm1kekxtVnVZMjlrYVc1blVYVmhiR2wwZVN4Y2JpQWdJQ0FnSUhScGJXVlRkR0Z0Y0RvZ2IzQjBMblJwYldWVGRHRnRjQ0I4ZkNCblpYUlVhVzFsVTNSaGJYQW9LU3hjYmlBZ0lDQWdJSFJ2ZEdGc1JuSmhiV1Z6T2lCcGMwWnBibWwwWlNoMGFHbHpMbkJ5YjNCekxuUnZkR0ZzUm5KaGJXVnpLU0EvSUUxaGRHZ3ViV0Y0S0RBc0lIUm9hWE11Y0hKdmNITXVkRzkwWVd4R2NtRnRaWE1wSURvZ01UQXdNRnh1SUNBZ0lIMDdYRzRnSUgxY2JseHVJQ0JsZUhCdmNuUkdjbUZ0WlNBb2IzQjBJRDBnZTMwcElIdGNiaUFnSUNCcFppQW9JWFJvYVhNdWMydGxkR05vS1NCeVpYUjFjbTRnVUhKdmJXbHpaUzVoYkd3b1cxMHBPMXh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdkR2hwY3k1emEyVjBZMmd1Y0hKbFJYaHdiM0owSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0IwYUdsekxuTnJaWFJqYUM1d2NtVkZlSEJ2Y25Rb0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QlBjSFJwYjI1eklHWnZjaUJsZUhCdmNuUWdablZ1WTNScGIyNWNiaUFnSUNCc1pYUWdaWGh3YjNKMFQzQjBjeUE5SUhSb2FYTXVYMk55WldGMFpVVjRjRzl5ZEU5d2RHbHZibk1vYjNCMEtUdGNibHh1SUNBZ0lHTnZibk4wSUdOc2FXVnVkQ0E5SUdkbGRFTnNhV1Z1ZEVGUVNTZ3BPMXh1SUNBZ0lHeGxkQ0J3SUQwZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0NrN1hHNGdJQ0FnYVdZZ0tHTnNhV1Z1ZENBbUppQnZjSFF1WTI5dGJXbDBJQ1ltSUhSNWNHVnZaaUJqYkdsbGJuUXVZMjl0YldsMElEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0JqYjIxdGFYUlBjSFJ6SUQwZ1lYTnphV2R1S0h0OUxDQmxlSEJ2Y25SUGNIUnpLVHRjYmlBZ0lDQWdJR052Ym5OMElHaGhjMmdnUFNCamJHbGxiblF1WTI5dGJXbDBLR052YlcxcGRFOXdkSE1wTzF4dUlDQWdJQ0FnYVdZZ0tHbHpVSEp2YldselpTaG9ZWE5vS1NrZ2NDQTlJR2hoYzJnN1hHNGdJQ0FnSUNCbGJITmxJSEFnUFNCUWNtOXRhWE5sTG5KbGMyOXNkbVVvYUdGemFDazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUhBdWRHaGxiaWhvWVhOb0lEMCtJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TGw5a2IwVjRjRzl5ZEVaeVlXMWxLR0Z6YzJsbmJpaDdmU3dnWlhod2IzSjBUM0IwY3l3Z2V5Qm9ZWE5vT2lCb1lYTm9JSHg4SUNjbklIMHBLVHRjYmlBZ0lDQjlLUzUwYUdWdUtISmxjM1ZzZENBOVBpQjdYRzRnSUNBZ0lDQXZMeUJOYjNOMElHTnZiVzF2YmlCMWMyVmpZWE5sSUdseklIUnZJR1Y0Y0c5eWRDQmhJSE5wYm1kc1pTQnNZWGxsY2l4Y2JpQWdJQ0FnSUM4dklITnZJR3hsZENkeklHOXdkR2x0YVhwbElIUm9aU0IxYzJWeUlHVjRjR1Z5YVdWdVkyVWdabTl5SUhSb1lYUXVYRzRnSUNBZ0lDQnBaaUFvY21WemRXeDBMbXhsYm1kMGFDQTlQVDBnTVNrZ2NtVjBkWEp1SUhKbGMzVnNkRnN3WFR0Y2JpQWdJQ0FnSUdWc2MyVWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JpQWdJQ0I5S1R0Y2JpQWdmVnh1WEc0Z0lGOWtiMFY0Y0c5eWRFWnlZVzFsSUNobGVIQnZjblJQY0hSeklEMGdlMzBwSUh0Y2JpQWdJQ0IwYUdsekxsOXdjbTl3Y3k1bGVIQnZjblJwYm1jZ1BTQjBjblZsTzF4dVhHNGdJQ0FnTHk4Z1VtVnphWHBsSUhSdklHOTFkSEIxZENCeVpYTnZiSFYwYVc5dVhHNGdJQ0FnZEdocGN5NXlaWE5wZW1Vb0tUdGNibHh1SUNBZ0lDOHZJRVJ5WVhjZ1lYUWdkR2hwY3lCdmRYUndkWFFnY21WemIyeDFkR2x2Ymx4dUlDQWdJR3hsZENCa2NtRjNVbVZ6ZFd4MElEMGdkR2hwY3k1eVpXNWtaWElvS1R0Y2JseHVJQ0FnSUM4dklGUm9aU0J6Wld4bUlHOTNibVZrSUdOaGJuWmhjeUFvYldGNUlHSmxJSFZ1WkdWbWFXNWxaQzR1TGlFcFhHNGdJQ0FnWTI5dWMzUWdZMkZ1ZG1GeklEMGdkR2hwY3k1d2NtOXdjeTVqWVc1MllYTTdYRzVjYmlBZ0lDQXZMeUJIWlhRZ2JHbHpkQ0J2WmlCeVpYTjFiSFJ6SUdaeWIyMGdjbVZ1WkdWeVhHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCa2NtRjNVbVZ6ZFd4MElEMDlQU0FuZFc1a1pXWnBibVZrSnlrZ2UxeHVJQ0FnSUNBZ1pISmhkMUpsYzNWc2RDQTlJRnNnWTJGdWRtRnpJRjA3WEc0Z0lDQWdmVnh1SUNBZ0lHUnlZWGRTWlhOMWJIUWdQU0JiWFM1amIyNWpZWFFvWkhKaGQxSmxjM1ZzZENrdVptbHNkR1Z5S0VKdmIyeGxZVzRwTzF4dVhHNGdJQ0FnTHk4Z1ZISmhibk5tYjNKdElIUm9aU0JqWVc1MllYTXZabWxzWlNCa1pYTmpjbWx3ZEc5eWN5QnBiblJ2SUdFZ1kyOXVjMmx6ZEdWdWRDQm1iM0p0WVhRc1hHNGdJQ0FnTHk4Z1lXNWtJSEIxYkd3Z2IzVjBJR0Z1ZVNCa1lYUmhJRlZTVEhNZ1puSnZiU0JqWVc1MllYTWdaV3hsYldWdWRITmNiaUFnSUNCa2NtRjNVbVZ6ZFd4MElEMGdaSEpoZDFKbGMzVnNkQzV0WVhBb2NtVnpkV3gwSUQwK0lIdGNiaUFnSUNBZ0lHTnZibk4wSUdoaGMwUmhkR0ZQWW1wbFkzUWdQU0IwZVhCbGIyWWdjbVZ6ZFd4MElEMDlQU0FuYjJKcVpXTjBKeUFtSmlCeVpYTjFiSFFnSmlZZ0tDZGtZWFJoSnlCcGJpQnlaWE4xYkhRZ2ZId2dKMlJoZEdGVlVrd25JR2x1SUhKbGMzVnNkQ2s3WEc0Z0lDQWdJQ0JqYjI1emRDQmtZWFJoSUQwZ2FHRnpSR0YwWVU5aWFtVmpkQ0EvSUhKbGMzVnNkQzVrWVhSaElEb2djbVZ6ZFd4ME8xeHVJQ0FnSUNBZ1kyOXVjM1FnYjNCMGN5QTlJR2hoYzBSaGRHRlBZbXBsWTNRZ1B5QmhjM05wWjI0b2UzMHNJSEpsYzNWc2RDd2dleUJrWVhSaElIMHBJRG9nZXlCa1lYUmhJSDA3WEc0Z0lDQWdJQ0JwWmlBb2FYTkRZVzUyWVhNb1pHRjBZU2twSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWlc1amIyUnBibWNnUFNCdmNIUnpMbVZ1WTI5a2FXNW5JSHg4SUdWNGNHOXlkRTl3ZEhNdVpXNWpiMlJwYm1jN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUdWdVkyOWthVzVuVVhWaGJHbDBlU0E5SUdSbFptbHVaV1FvYjNCMGN5NWxibU52WkdsdVoxRjFZV3hwZEhrc0lHVjRjRzl5ZEU5d2RITXVaVzVqYjJScGJtZFJkV0ZzYVhSNUxDQXdMamsxS1R0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnZXlCa1lYUmhWVkpNTENCbGVIUmxibk5wYjI0c0lIUjVjR1VnZlNBOUlHVjRjRzl5ZEVOaGJuWmhjeWhrWVhSaExDQjdJR1Z1WTI5a2FXNW5MQ0JsYm1OdlpHbHVaMUYxWVd4cGRIa2dmU2s3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJQWW1wbFkzUXVZWE56YVdkdUtHOXdkSE1zSUhzZ1pHRjBZVlZTVEN3Z1pYaDBaVzV6YVc5dUxDQjBlWEJsSUgwcE8xeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc5d2RITTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTazdYRzVjYmlBZ0lDQXZMeUJPYjNjZ2NtVjBkWEp1SUhSdklISmxaM1ZzWVhJZ2NtVnVaR1Z5YVc1bklHMXZaR1ZjYmlBZ0lDQjBhR2x6TGw5d2NtOXdjeTVsZUhCdmNuUnBibWNnUFNCbVlXeHpaVHRjYmlBZ0lDQjBhR2x6TG5KbGMybDZaU2dwTzF4dUlDQWdJSFJvYVhNdWNtVnVaR1Z5S0NrN1hHNWNiaUFnSUNBdkx5QkJibVFnYm05M0lIZGxJR05oYmlCellYWmxJR1ZoWTJnZ2NtVnpkV3gwWEc0Z0lDQWdjbVYwZFhKdUlGQnliMjFwYzJVdVlXeHNLR1J5WVhkU1pYTjFiSFF1YldGd0tDaHlaWE4xYkhRc0lHa3NJR3hoZVdWeVRHbHpkQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0x5OGdRbmtnWkdWbVlYVnNkQ3dnYVdZZ2NtVnVaR1Z5YVc1bklHMTFiSFJwY0d4bElHeGhlV1Z5Y3lCM1pTQjNhV3hzSUdkcGRtVWdkR2hsYlNCcGJtUnBZMlZ6WEc0Z0lDQWdJQ0JqYjI1emRDQmpkWEpQY0hRZ1BTQmhjM05wWjI0b2UxeHVJQ0FnSUNBZ0lDQmxlSFJsYm5OcGIyNDZJQ2NuTEZ4dUlDQWdJQ0FnSUNCd2NtVm1hWGc2SUNjbkxGeHVJQ0FnSUNBZ0lDQnpkV1ptYVhnNklDY25YRzRnSUNBZ0lDQjlMQ0JsZUhCdmNuUlBjSFJ6TENCeVpYTjFiSFFzSUh0Y2JpQWdJQ0FnSUNBZ2JHRjVaWEk2SUdrc1hHNGdJQ0FnSUNBZ0lIUnZkR0ZzVEdGNVpYSnpPaUJzWVhsbGNreHBjM1F1YkdWdVozUm9YRzRnSUNBZ0lDQjlLVHRjYmx4dUlDQWdJQ0FnTHk4Z1NXWWdaWGh3YjNKMElHbHpJR1Y0Y0d4cFkybDBiSGtnYm05MElITmhkbWx1Wnl3Z2JXRnJaU0J6ZFhKbElHNXZkR2hwYm1jZ2MyRjJaWE5jYmlBZ0lDQWdJQzh2SUU5MGFHVnlkMmx6WlNCa1pXWmhkV3gwSUhSdklIUm9aU0JzWVhsbGNpQnpZWFpsSUc5d2RHbHZiaXdnYjNJZ1ptRnNiR0poWTJzZ2RHOGdkSEoxWlZ4dUlDQWdJQ0FnWTI5dWMzUWdjMkYyWlZCaGNtRnRJRDBnWlhod2IzSjBUM0IwY3k1ellYWmxJRDA5UFNCbVlXeHpaU0EvSUdaaGJITmxJRG9nY21WemRXeDBMbk5oZG1VN1hHNGdJQ0FnSUNCamRYSlBjSFF1YzJGMlpTQTlJSE5oZG1WUVlYSmhiU0FoUFQwZ1ptRnNjMlU3WEc1Y2JpQWdJQ0FnSUM4dklGSmxjMjlzZG1VZ1lTQm1kV3hzSUdacGJHVnVZVzFsSUdaeWIyMGdZV3hzSUhSb1pTQnZjSFJwYjI1elhHNGdJQ0FnSUNCamRYSlBjSFF1Wm1sc1pXNWhiV1VnUFNCeVpYTnZiSFpsUm1sc1pXNWhiV1VvWTNWeVQzQjBLVHRjYmx4dUlDQWdJQ0FnTHk4Z1EyeGxZVzRnZFhBZ2MyOXRaU0J3WVhKaGJXVjBaWEp6SUhSb1lYUWdiV0Y1SUdKbElHRnRZbWxuZFc5MWN5QjBieUIwYUdVZ2RYTmxjbHh1SUNBZ0lDQWdaR1ZzWlhSbElHTjFjazl3ZEM1bGJtTnZaR2x1Wnp0Y2JpQWdJQ0FnSUdSbGJHVjBaU0JqZFhKUGNIUXVaVzVqYjJScGJtZFJkV0ZzYVhSNU8xeHVYRzRnSUNBZ0lDQXZMeUJEYkdWaGJpQnBkQ0IxY0NCbWRYSjBhR1Z5SUdKNUlHcDFjM1FnY21WdGIzWnBibWNnZFc1a1pXWnBibVZrSUhaaGJIVmxjMXh1SUNBZ0lDQWdabTl5SUNoc1pYUWdheUJwYmlCamRYSlBjSFFwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmpkWEpQY0hSYmExMGdQVDA5SUNkMWJtUmxabWx1WldRbktTQmtaV3hsZEdVZ1kzVnlUM0IwVzJ0ZE8xeHVJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQnNaWFFnYzJGMlpWQnliMjFwYzJVZ1BTQlFjbTl0YVhObExuSmxjMjlzZG1Vb2UzMHBPMXh1SUNBZ0lDQWdhV1lnS0dOMWNrOXdkQzV6WVhabEtTQjdYRzRnSUNBZ0lDQWdJQzh2SUZkb1pYUm9aWElnZEc4Z1lXTjBkV0ZzYkhrZ2MyRjJaU0FvWkc5M2JteHZZV1FwSUhSb2FYTWdabkpoWjIxbGJuUmNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1pHRjBZU0E5SUdOMWNrOXdkQzVrWVhSaE8xeHVJQ0FnSUNBZ0lDQnBaaUFvWTNWeVQzQjBMbVJoZEdGVlVrd3BJSHRjYmlBZ0lDQWdJQ0FnSUNCamIyNXpkQ0JrWVhSaFZWSk1JRDBnWTNWeVQzQjBMbVJoZEdGVlVrdzdYRzRnSUNBZ0lDQWdJQ0FnYzJGMlpWQnliMjFwYzJVZ1BTQnpZWFpsUkdGMFlWVlNUQ2hrWVhSaFZWSk1MQ0JqZFhKUGNIUXBPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUhOaGRtVlFjbTl0YVhObElEMGdjMkYyWlVacGJHVW9aR0YwWVN3Z1kzVnlUM0IwS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2NtVjBkWEp1SUhOaGRtVlFjbTl0YVhObExuUm9aVzRvYzJGMlpWSmxjM1ZzZENBOVBpQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQlBZbXBsWTNRdVlYTnphV2R1S0h0OUxDQmpkWEpQY0hRc0lITmhkbVZTWlhOMWJIUXBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmU2twTG5Sb1pXNG9aWFlnUFQ0Z2UxeHVJQ0FnSUNBZ1kyOXVjM1FnYzJGMlpXUkZkbVZ1ZEhNZ1BTQmxkaTVtYVd4MFpYSW9aU0E5UGlCbExuTmhkbVVwTzF4dUlDQWdJQ0FnYVdZZ0tITmhkbVZrUlhabGJuUnpMbXhsYm1kMGFDQStJREFwSUh0Y2JpQWdJQ0FnSUNBZ0x5OGdURzluSUhSb1pTQnpZWFpsWkNCbGVIQnZjblJ6WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR1YyWlc1MFYybDBhRTkxZEhCMWRDQTlJSE5oZG1Wa1JYWmxiblJ6TG1acGJtUW9aU0E5UGlCbExtOTFkSEIxZEU1aGJXVXBPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnBjME5zYVdWdWRDQTlJSE5oZG1Wa1JYWmxiblJ6TG5OdmJXVW9aU0E5UGlCbExtTnNhV1Z1ZENrN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUdselUzUnlaV0Z0YVc1bklEMGdjMkYyWldSRmRtVnVkSE11YzI5dFpTaGxJRDArSUdVdWMzUnlaV0Z0S1R0Y2JpQWdJQ0FnSUNBZ2JHVjBJR2wwWlcwN1hHNGdJQ0FnSUNBZ0lDOHZJRzFoYm5rZ1ptbHNaWE1zSUdwMWMzUWdiRzluSUdodmR5QnRZVzU1SUhkbGNtVWdaWGh3YjNKMFpXUmNiaUFnSUNBZ0lDQWdhV1lnS0hOaGRtVmtSWFpsYm5SekxteGxibWQwYUNBK0lERXBJR2wwWlcwZ1BTQnpZWFpsWkVWMlpXNTBjeTVzWlc1bmRHZzdYRzRnSUNBZ0lDQWdJQzh2SUdsdUlFTk1TU3dnZDJVZ2EyNXZkeUJsZUdGamRDQndZWFJvSUdScGNtNWhiV1ZjYmlBZ0lDQWdJQ0FnWld4elpTQnBaaUFvWlhabGJuUlhhWFJvVDNWMGNIVjBLU0JwZEdWdElEMGdZQ1I3WlhabGJuUlhhWFJvVDNWMGNIVjBMbTkxZEhCMWRFNWhiV1Y5THlSN2MyRjJaV1JGZG1WdWRITmJNRjB1Wm1sc1pXNWhiV1Y5WUR0Y2JpQWdJQ0FnSUNBZ0x5OGdhVzRnWW5KdmQzTmxjaXdnZDJVZ1kyRnVJRzl1YkhrZ2EyNXZkeUJwZENCM1pXNTBJSFJ2SUZ3aVluSnZkM05sY2lCa2IzZHViRzloWkNCbWIyeGtaWEpjSWx4dUlDQWdJQ0FnSUNCbGJITmxJR2wwWlcwZ1BTQmdKSHR6WVhabFpFVjJaVzUwYzFzd1hTNW1hV3hsYm1GdFpYMWdPMXh1SUNBZ0lDQWdJQ0JzWlhRZ2IyWlRaWEVnUFNBbkp6dGNiaUFnSUNBZ0lDQWdhV1lnS0dWNGNHOXlkRTl3ZEhNdWMyVnhkV1Z1WTJVcElIdGNiaUFnSUNBZ0lDQWdJQ0JqYjI1emRDQm9ZWE5VYjNSaGJFWnlZVzFsY3lBOUlHbHpSbWx1YVhSbEtIUm9hWE11Y0hKdmNITXVkRzkwWVd4R2NtRnRaWE1wTzF4dUlDQWdJQ0FnSUNBZ0lHOW1VMlZ4SUQwZ2FHRnpWRzkwWVd4R2NtRnRaWE1nUHlCZ0lDaG1jbUZ0WlNBa2UyVjRjRzl5ZEU5d2RITXVabkpoYldVZ0t5QXhmU0F2SUNSN2RHaHBjeTV3Y205d2N5NTBiM1JoYkVaeVlXMWxjMzBwWUNBNklHQWdLR1p5WVcxbElDUjdaWGh3YjNKMFQzQjBjeTVtY21GdFpYMHBZRHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoellYWmxaRVYyWlc1MGN5NXNaVzVuZEdnZ1BpQXhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2IyWlRaWEVnUFNCZ0lHWnBiR1Z6WUR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCamJHbGxiblFnUFNCcGMwTnNhV1Z1ZENBL0lDZGpZVzUyWVhNdGMydGxkR05vTFdOc2FTY2dPaUFuWTJGdWRtRnpMWE5yWlhSamFDYzdYRzRnSUNBZ0lDQWdJR052Ym5OMElHRmpkR2x2YmlBOUlHbHpVM1J5WldGdGFXNW5JRDhnSjFOMGNtVmhiV2x1WnlCcGJuUnZKeUE2SUNkRmVIQnZjblJsWkNjN1hHNGdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LR0FsWTFza2UyTnNhV1Z1ZEgxZEpXTWdKSHRoWTNScGIyNTlJQ1ZqSkh0cGRHVnRmU1ZqSkh0dlpsTmxjWDFnTENBblkyOXNiM0k2SUNNNFpUaGxPR1U3Snl3Z0oyTnZiRzl5T2lCcGJtbDBhV0ZzT3ljc0lDZG1iMjUwTFhkbGFXZG9kRG9nWW05c1pEc25MQ0FuWm05dWRDMTNaV2xuYUhRNklHbHVhWFJwWVd3N0p5azdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JSFJvYVhNdWMydGxkR05vTG5CdmMzUkZlSEJ2Y25RZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV6YTJWMFkyZ3VjRzl6ZEVWNGNHOXlkQ2dwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJR1YyTzF4dUlDQWdJSDBwTzF4dUlDQjlYRzVjYmlBZ1gzZHlZWEJEYjI1MFpYaDBVMk5oYkdVZ0tHTmlLU0I3WEc0Z0lDQWdkR2hwY3k1ZmNISmxVbVZ1WkdWeUtDazdYRzRnSUNBZ1kySW9kR2hwY3k1d2NtOXdjeWs3WEc0Z0lDQWdkR2hwY3k1ZmNHOXpkRkpsYm1SbGNpZ3BPMXh1SUNCOVhHNWNiaUFnWDNCeVpWSmxibVJsY2lBb0tTQjdYRzRnSUNBZ1kyOXVjM1FnY0hKdmNITWdQU0IwYUdsekxuQnliM0J6TzF4dVhHNGdJQ0FnTHk4Z1UyTmhiR1VnWTI5dWRHVjRkQ0JtYjNJZ2RXNXBkQ0J6YVhwcGJtZGNiaUFnSUNCcFppQW9JWFJvYVhNdWNISnZjSE11WjJ3Z0ppWWdjSEp2Y0hNdVkyOXVkR1Y0ZENBbUppQWhjSEp2Y0hNdWNEVXBJSHRjYmlBZ0lDQWdJSEJ5YjNCekxtTnZiblJsZUhRdWMyRjJaU2dwTzF4dUlDQWdJQ0FnYVdZZ0tIUm9hWE11YzJWMGRHbHVaM011YzJOaGJHVkRiMjUwWlhoMElDRTlQU0JtWVd4elpTa2dlMXh1SUNBZ0lDQWdJQ0J3Y205d2N5NWpiMjUwWlhoMExuTmpZV3hsS0hCeWIzQnpMbk5qWVd4bFdDd2djSEp2Y0hNdWMyTmhiR1ZaS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0hCeWIzQnpMbkExS1NCN1hHNGdJQ0FnSUNCd2NtOXdjeTV3TlM1elkyRnNaU2h3Y205d2N5NXpZMkZzWlZnZ0x5QndjbTl3Y3k1d2FYaGxiRkpoZEdsdkxDQndjbTl3Y3k1elkyRnNaVmtnTHlCd2NtOXdjeTV3YVhobGJGSmhkR2x2S1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCZmNHOXpkRkpsYm1SbGNpQW9LU0I3WEc0Z0lDQWdZMjl1YzNRZ2NISnZjSE1nUFNCMGFHbHpMbkJ5YjNCek8xeHVYRzRnSUNBZ2FXWWdLQ0YwYUdsekxuQnliM0J6TG1kc0lDWW1JSEJ5YjNCekxtTnZiblJsZUhRZ0ppWWdJWEJ5YjNCekxuQTFLU0I3WEc0Z0lDQWdJQ0J3Y205d2N5NWpiMjUwWlhoMExuSmxjM1J2Y21Vb0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNBdkx5QkdiSFZ6YUNCaWVTQmtaV1poZFd4MExDQjBhR2x6SUcxaGVTQmlaU0J5WlhacGMybDBaV1FnWVhRZ1lTQnNZWFJsY2lCd2IybHVkQzVjYmlBZ0lDQXZMeUJYWlNCa2J5QjBhR2x6SUhSdklHVnVjM1Z5WlNCMGIwUmhkR0ZWVWt3Z1kyRnVJR0psSUdOaGJHeGxaQ0JwYlcxbFpHbGhkR1ZzZVNCaFpuUmxjaTVjYmlBZ0lDQXZMeUJOYjNOMElHeHBhMlZzZVNCaWNtOTNjMlZ5Y3lCaGJISmxZV1I1SUdoaGJtUnNaU0IwYUdsekxDQnpieUIzWlNCdFlYa2djbVYyYVhOcGRDQjBhR2x6SUdGdVpGeHVJQ0FnSUM4dklISmxiVzkyWlNCcGRDQnBaaUJwZENCcGJYQnliM1psY3lCd1pYSm1iM0p0WVc1alpTQjNhWFJvYjNWMElHRnVlU0IxYzJGaWFXeHBkSGtnYVhOemRXVnpMbHh1SUNBZ0lHbG1JQ2h3Y205d2N5NW5iQ0FtSmlCMGFHbHpMbk5sZEhScGJtZHpMbVpzZFhOb0lDRTlQU0JtWVd4elpTQW1KaUFoY0hKdmNITXVjRFVwSUh0Y2JpQWdJQ0FnSUhCeWIzQnpMbWRzTG1ac2RYTm9LQ2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnZEdsamF5QW9LU0I3WEc0Z0lDQWdhV1lnS0hSb2FYTXVjMnRsZEdOb0lDWW1JSFI1Y0dWdlppQjBhR2x6TG5OclpYUmphQzUwYVdOcklEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbDl3Y21WU1pXNWtaWElvS1R0Y2JpQWdJQ0FnSUhSb2FYTXVjMnRsZEdOb0xuUnBZMnNvZEdocGN5NXdjbTl3Y3lrN1hHNGdJQ0FnSUNCMGFHbHpMbDl3YjNOMFVtVnVaR1Z5S0NrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2NtVnVaR1Z5SUNncElIdGNiaUFnSUNCcFppQW9kR2hwY3k1d2NtOXdjeTV3TlNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmYkdGemRGSmxaSEpoZDFKbGMzVnNkQ0E5SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdWNEVXVjbVZrY21GM0tDazdYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVmYkdGemRGSmxaSEpoZDFKbGMzVnNkRHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjM1ZpYldsMFJISmhkME5oYkd3b0tUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnpkV0p0YVhSRWNtRjNRMkZzYkNBb0tTQjdYRzRnSUNBZ2FXWWdLQ0YwYUdsekxuTnJaWFJqYUNrZ2NtVjBkWEp1TzF4dVhHNGdJQ0FnWTI5dWMzUWdjSEp2Y0hNZ1BTQjBhR2x6TG5CeWIzQnpPMXh1SUNBZ0lIUm9hWE11WDNCeVpWSmxibVJsY2lncE8xeHVYRzRnSUNBZ2JHVjBJR1J5WVhkU1pYTjFiSFE3WEc1Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUhSb2FYTXVjMnRsZEdOb0lEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCa2NtRjNVbVZ6ZFd4MElEMGdkR2hwY3k1emEyVjBZMmdvY0hKdmNITXBPMXh1SUNBZ0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlIUm9hWE11YzJ0bGRHTm9MbkpsYm1SbGNpQTlQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ1pISmhkMUpsYzNWc2RDQTlJSFJvYVhNdWMydGxkR05vTG5KbGJtUmxjaWh3Y205d2N5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RHaHBjeTVmY0c5emRGSmxibVJsY2lncE8xeHVYRzRnSUNBZ2NtVjBkWEp1SUdSeVlYZFNaWE4xYkhRN1hHNGdJSDFjYmx4dUlDQjFjR1JoZEdVZ0tHOXdkQ0E5SUh0OUtTQjdYRzRnSUNBZ0x5OGdRM1Z5Y21WdWRHeDVJSFZ3WkdGMFpTZ3BJR2x6SUc5dWJIa2dabTlqZFhObFpDQnZiaUJ5WlhOcGVtbHVaeXhjYmlBZ0lDQXZMeUJpZFhRZ2JHRjBaWElnZDJVZ2QybHNiQ0J6ZFhCd2IzSjBJRzkwYUdWeUlHOXdkR2x2Ym5NZ2JHbHJaU0J6ZDJsMFkyaHBibWRjYmlBZ0lDQXZMeUJtY21GdFpYTWdZVzVrSUhOMVkyZ3VYRzRnSUNBZ1kyOXVjM1FnYm05MFdXVjBVM1Z3Y0c5eWRHVmtJRDBnVzF4dUlDQWdJQ0FnSjJGdWFXMWhkR1VuWEc0Z0lDQWdYVHRjYmx4dUlDQWdJRTlpYW1WamRDNXJaWGx6S0c5d2RDa3VabTl5UldGamFDaHJaWGtnUFQ0Z2UxeHVJQ0FnSUNBZ2FXWWdLRzV2ZEZsbGRGTjFjSEJ2Y25SbFpDNXBibVJsZUU5bUtHdGxlU2tnUGowZ01Da2dlMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9ZRk52Y25KNUxDQjBhR1VnZXlBa2UydGxlWDBnZlNCdmNIUnBiMjRnYVhNZ2JtOTBJSGxsZENCemRYQndiM0owWldRZ2QybDBhQ0IxY0dSaGRHVW9LUzVnS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5S1R0Y2JseHVJQ0FnSUdOdmJuTjBJRzlzWkVOaGJuWmhjeUE5SUhSb2FYTXVYM05sZEhScGJtZHpMbU5oYm5aaGN6dGNiaUFnSUNCamIyNXpkQ0J2YkdSRGIyNTBaWGgwSUQwZ2RHaHBjeTVmYzJWMGRHbHVaM011WTI5dWRHVjRkRHRjYmx4dUlDQWdJQzh2SUUxbGNtZGxJRzVsZHlCdmNIUnBiMjV6SUdsdWRHOGdjMlYwZEdsdVozTmNiaUFnSUNCbWIzSWdLR3hsZENCclpYa2dhVzRnYjNCMEtTQjdYRzRnSUNBZ0lDQmpiMjV6ZENCMllXeDFaU0E5SUc5d2RGdHJaWGxkTzF4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCMllXeDFaU0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY3BJSHNnTHk4Z2FXZHViM0psSUhWdVpHVm1hVzVsWkZ4dUlDQWdJQ0FnSUNCMGFHbHpMbDl6WlhSMGFXNW5jMXRyWlhsZElEMGdkbUZzZFdVN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1RXVnlaMlVnYVc0Z2RHbHRaU0J3Y205d2MxeHVJQ0FnSUdOdmJuTjBJSFJwYldWUGNIUnpJRDBnVDJKcVpXTjBMbUZ6YzJsbmJpaDdmU3dnZEdocGN5NWZjMlYwZEdsdVozTXNJRzl3ZENrN1hHNGdJQ0FnYVdZZ0tDZDBhVzFsSnlCcGJpQnZjSFFnSmlZZ0oyWnlZVzFsSnlCcGJpQnZjSFFwSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduV1c5MUlITm9iM1ZzWkNCemNHVmphV1o1SUhzZ2RHbHRaU0I5SUc5eUlIc2dabkpoYldVZ2ZTQmlkWFFnYm05MElHSnZkR2duS1R0Y2JpQWdJQ0JsYkhObElHbG1JQ2duZEdsdFpTY2dhVzRnYjNCMEtTQmtaV3hsZEdVZ2RHbHRaVTl3ZEhNdVpuSmhiV1U3WEc0Z0lDQWdaV3h6WlNCcFppQW9KMlp5WVcxbEp5QnBiaUJ2Y0hRcElHUmxiR1YwWlNCMGFXMWxUM0IwY3k1MGFXMWxPMXh1SUNBZ0lHbG1JQ2duWkhWeVlYUnBiMjRuSUdsdUlHOXdkQ0FtSmlBbmRHOTBZV3hHY21GdFpYTW5JR2x1SUc5d2RDa2dkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFpiM1VnYzJodmRXeGtJSE53WldOcFpua2dleUJrZFhKaGRHbHZiaUI5SUc5eUlIc2dkRzkwWVd4R2NtRnRaWE1nZlNCaWRYUWdibTkwSUdKdmRHZ25LVHRjYmlBZ0lDQmxiSE5sSUdsbUlDZ25aSFZ5WVhScGIyNG5JR2x1SUc5d2RDa2daR1ZzWlhSbElIUnBiV1ZQY0hSekxuUnZkR0ZzUm5KaGJXVnpPMXh1SUNBZ0lHVnNjMlVnYVdZZ0tDZDBiM1JoYkVaeVlXMWxjeWNnYVc0Z2IzQjBLU0JrWld4bGRHVWdkR2x0WlU5d2RITXVaSFZ5WVhScGIyNDdYRzVjYmlBZ0lDQXZMeUJOWlhKblpTQnBiaUIxYzJWeUlHUmhkR0VnZDJsMGFHOTFkQ0JqYjNCNWFXNW5YRzRnSUNBZ2FXWWdLQ2RrWVhSaEp5QnBiaUJ2Y0hRcElIUm9hWE11WDNCeWIzQnpMbVJoZEdFZ1BTQnZjSFF1WkdGMFlUdGNibHh1SUNBZ0lHTnZibk4wSUhScGJXVlFjbTl3Y3lBOUlIUm9hWE11WjJWMFZHbHRaVkJ5YjNCektIUnBiV1ZQY0hSektUdGNiaUFnSUNCUFltcGxZM1F1WVhOemFXZHVLSFJvYVhNdVgzQnliM0J6TENCMGFXMWxVSEp2Y0hNcE8xeHVYRzRnSUNBZ0x5OGdTV1lnWldsMGFHVnlJR05oYm5aaGN5QnZjaUJqYjI1MFpYaDBJR2x6SUdOb1lXNW5aV1FzSUhkbElITm9iM1ZzWkNCeVpTMTFjR1JoZEdWY2JpQWdJQ0JwWmlBb2IyeGtRMkZ1ZG1GeklDRTlQU0IwYUdsekxsOXpaWFIwYVc1bmN5NWpZVzUyWVhNZ2ZId2diMnhrUTI5dWRHVjRkQ0FoUFQwZ2RHaHBjeTVmYzJWMGRHbHVaM011WTI5dWRHVjRkQ2tnZTF4dUlDQWdJQ0FnWTI5dWMzUWdleUJqWVc1MllYTXNJR052Ym5SbGVIUWdmU0E5SUdOeVpXRjBaVU5oYm5aaGN5aDBhR2x6TGw5elpYUjBhVzVuY3lrN1hHNWNiaUFnSUNBZ0lIUm9hWE11Y0hKdmNITXVZMkZ1ZG1GeklEMGdZMkZ1ZG1Gek8xeHVJQ0FnSUNBZ2RHaHBjeTV3Y205d2N5NWpiMjUwWlhoMElEMGdZMjl1ZEdWNGREdGNibHh1SUNBZ0lDQWdMeThnUkdWc1pYUmxJRzl5SUdGa1pDQmhJQ2RuYkNjZ2NISnZjQ0JtYjNJZ1kyOXVkbVZ1YVdWdVkyVmNiaUFnSUNBZ0lIUm9hWE11WDNObGRIVndSMHhMWlhrb0tUdGNibHh1SUNBZ0lDQWdMeThnVW1VdGJXOTFiblFnZEdobElHNWxkeUJqWVc1MllYTWdhV1lnYVhRZ2FHRnpJRzV2SUhCaGNtVnVkRnh1SUNBZ0lDQWdkR2hwY3k1ZllYQndaVzVrUTJGdWRtRnpTV1pPWldWa1pXUW9LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJUY0dWamFXRnNJR05oYzJVZ2RHOGdjM1Z3Y0c5eWRDQlFOUzVxYzF4dUlDQWdJR2xtSUNodmNIUXVjRFVnSmlZZ2RIbHdaVzltSUc5d2RDNXdOU0FoUFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1d2NtOXdjeTV3TlNBOUlHOXdkQzV3TlR0Y2JpQWdJQ0FnSUhSb2FYTXVjSEp2Y0hNdWNEVXVaSEpoZHlBOUlDZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdVgybHpVRFZTWlhOcGVtbHVaeWtnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0IwYUdsekxsOXNZWE4wVW1Wa2NtRjNVbVZ6ZFd4MElEMGdkR2hwY3k1emRXSnRhWFJFY21GM1EyRnNiQ2dwTzF4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCVmNHUmhkR1VnY0d4aGVXbHVaeUJ6ZEdGMFpTQnBaaUJ1WldObGMzTmhjbmxjYmlBZ0lDQnBaaUFvSjNCc1lYbHBibWNuSUdsdUlHOXdkQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tHOXdkQzV3YkdGNWFXNW5LU0IwYUdsekxuQnNZWGtvS1R0Y2JpQWdJQ0FnSUdWc2MyVWdkR2hwY3k1d1lYVnpaU2dwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR05vWldOclUyVjBkR2x1WjNNb2RHaHBjeTVmYzJWMGRHbHVaM01wTzF4dVhHNGdJQ0FnTHk4Z1JISmhkeUJ1WlhjZ1puSmhiV1ZjYmlBZ0lDQjBhR2x6TG5KbGMybDZaU2dwTzF4dUlDQWdJSFJvYVhNdWNtVnVaR1Z5S0NrN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdWNISnZjSE03WEc0Z0lIMWNibHh1SUNCeVpYTnBlbVVnS0NrZ2UxeHVJQ0FnSUdOdmJuTjBJRzlzWkZOcGVtVnpJRDBnZEdocGN5NWZaMlYwVTJsNlpWQnliM0J6S0NrN1hHNWNiaUFnSUNCamIyNXpkQ0J6WlhSMGFXNW5jeUE5SUhSb2FYTXVjMlYwZEdsdVozTTdYRzRnSUNBZ1kyOXVjM1FnY0hKdmNITWdQU0IwYUdsekxuQnliM0J6TzF4dVhHNGdJQ0FnTHk4Z1VtVmpiMjF3ZFhSbElHNWxkeUJ3Y205d1pYSjBhV1Z6SUdKaGMyVmtJRzl1SUdOMWNuSmxiblFnYzJWMGRYQmNiaUFnSUNCamIyNXpkQ0J1WlhkUWNtOXdjeUE5SUhKbGMybDZaVU5oYm5aaGN5aHdjbTl3Y3l3Z2MyVjBkR2x1WjNNcE8xeHVYRzRnSUNBZ0x5OGdRWE56YVdkdUlIUnZJR04xY25KbGJuUWdjSEp2Y0hOY2JpQWdJQ0JQWW1wbFkzUXVZWE56YVdkdUtIUm9hWE11WDNCeWIzQnpMQ0J1WlhkUWNtOXdjeWs3WEc1Y2JpQWdJQ0F2THlCT2IzY2dkMlVnWVdOMGRXRnNiSGtnZFhCa1lYUmxJSFJvWlNCallXNTJZWE1nZDJsa2RHZ3ZhR1ZwWjJoMElHRnVaQ0J6ZEhsc1pTQndjbTl3YzF4dUlDQWdJR052Ym5OMElIdGNiaUFnSUNBZ0lIQnBlR1ZzVW1GMGFXOHNYRzRnSUNBZ0lDQmpZVzUyWVhOWGFXUjBhQ3hjYmlBZ0lDQWdJR05oYm5aaGMwaGxhV2RvZEN4Y2JpQWdJQ0FnSUhOMGVXeGxWMmxrZEdnc1hHNGdJQ0FnSUNCemRIbHNaVWhsYVdkb2RGeHVJQ0FnSUgwZ1BTQjBhR2x6TG5CeWIzQnpPMXh1WEc0Z0lDQWdMeThnVlhCa1lYUmxJR05oYm5aaGN5QnpaWFIwYVc1bmMxeHVJQ0FnSUdOdmJuTjBJR05oYm5aaGN5QTlJSFJvYVhNdWNISnZjSE11WTJGdWRtRnpPMXh1SUNBZ0lHbG1JQ2hqWVc1MllYTWdKaVlnYzJWMGRHbHVaM011Y21WemFYcGxRMkZ1ZG1GeklDRTlQU0JtWVd4elpTa2dlMXh1SUNBZ0lDQWdhV1lnS0hCeWIzQnpMbkExS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJRkExTG1weklITndaV05wWm1saklHVmtaMlVnWTJGelpWeHVJQ0FnSUNBZ0lDQnBaaUFvWTJGdWRtRnpMbmRwWkhSb0lDRTlQU0JqWVc1MllYTlhhV1IwYUNCOGZDQmpZVzUyWVhNdWFHVnBaMmgwSUNFOVBTQmpZVzUyWVhOSVpXbG5hSFFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5cGMxQTFVbVZ6YVhwcGJtY2dQU0IwY25WbE8xeHVJQ0FnSUNBZ0lDQWdJQzh2SUZSb2FYTWdZMkYxYzJWeklHRWdjbVV0WkhKaGR5QTZYRndnYzI4Z2QyVWdhV2R1YjNKbElHUnlZWGR6SUdsdUlIUm9aU0J0WldGdUlIUnBiV1V1TGk0Z2MyOXlkR0VnYUdGamEzbGNiaUFnSUNBZ0lDQWdJQ0J3Y205d2N5NXdOUzV3YVhobGJFUmxibk5wZEhrb2NHbDRaV3hTWVhScGJ5azdYRzRnSUNBZ0lDQWdJQ0FnY0hKdmNITXVjRFV1Y21WemFYcGxRMkZ1ZG1GektHTmhiblpoYzFkcFpIUm9JQzhnY0dsNFpXeFNZWFJwYnl3Z1kyRnVkbUZ6U0dWcFoyaDBJQzhnY0dsNFpXeFNZWFJwYnl3Z1ptRnNjMlVwTzF4dUlDQWdJQ0FnSUNBZ0lIUm9hWE11WDJselVEVlNaWE5wZW1sdVp5QTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQXZMeUJHYjNKalpTQmpZVzUyWVhNZ2MybDZaVnh1SUNBZ0lDQWdJQ0JwWmlBb1kyRnVkbUZ6TG5kcFpIUm9JQ0U5UFNCallXNTJZWE5YYVdSMGFDa2dZMkZ1ZG1GekxuZHBaSFJvSUQwZ1kyRnVkbUZ6VjJsa2RHZzdYRzRnSUNBZ0lDQWdJR2xtSUNoallXNTJZWE11YUdWcFoyaDBJQ0U5UFNCallXNTJZWE5JWldsbmFIUXBJR05oYm5aaGN5NW9aV2xuYUhRZ1BTQmpZVzUyWVhOSVpXbG5hSFE3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0F2THlCVmNHUmhkR1VnWTJGdWRtRnpJSE4wZVd4bFhHNGdJQ0FnSUNCcFppQW9hWE5DY205M2MyVnlLQ2tnSmlZZ2MyVjBkR2x1WjNNdWMzUjViR1ZEWVc1MllYTWdJVDA5SUdaaGJITmxLU0I3WEc0Z0lDQWdJQ0FnSUdOaGJuWmhjeTV6ZEhsc1pTNTNhV1IwYUNBOUlHQWtlM04wZVd4bFYybGtkR2g5Y0hoZ08xeHVJQ0FnSUNBZ0lDQmpZVzUyWVhNdWMzUjViR1V1YUdWcFoyaDBJRDBnWUNSN2MzUjViR1ZJWldsbmFIUjljSGhnTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJR052Ym5OMElHNWxkMU5wZW1WeklEMGdkR2hwY3k1ZloyVjBVMmw2WlZCeWIzQnpLQ2s3WEc0Z0lDQWdiR1YwSUdOb1lXNW5aV1FnUFNBaFpHVmxjRVZ4ZFdGc0tHOXNaRk5wZW1WekxDQnVaWGRUYVhwbGN5azdYRzRnSUNBZ2FXWWdLR05vWVc1blpXUXBJSHRjYmlBZ0lDQWdJSFJvYVhNdVgzTnBlbVZEYUdGdVoyVmtLQ2s3WEc0Z0lDQWdmVnh1SUNBZ0lISmxkSFZ5YmlCamFHRnVaMlZrTzF4dUlDQjlYRzVjYmlBZ1gzTnBlbVZEYUdGdVoyVmtJQ2dwSUh0Y2JpQWdJQ0F2THlCVFpXNWtJSEpsYzJsNlpTQmxkbVZ1ZENCMGJ5QnphMlYwWTJoY2JpQWdJQ0JwWmlBb2RHaHBjeTV6YTJWMFkyZ2dKaVlnZEhsd1pXOW1JSFJvYVhNdWMydGxkR05vTG5KbGMybDZaU0E5UFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdkR2hwY3k1emEyVjBZMmd1Y21WemFYcGxLSFJvYVhNdWNISnZjSE1wTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdGdWFXMWhkR1VnS0NrZ2UxeHVJQ0FnSUdsbUlDZ2hkR2hwY3k1d2NtOXdjeTV3YkdGNWFXNW5LU0J5WlhSMWNtNDdYRzRnSUNBZ2FXWWdLQ0ZwYzBKeWIzZHpaWElvS1NrZ2UxeHVJQ0FnSUNBZ1kyOXVjMjlzWlM1bGNuSnZjaWduVzJOaGJuWmhjeTF6YTJWMFkyaGRJRmRCVWs0NklFRnVhVzFoZEdsdmJpQnBiaUJPYjJSbExtcHpJR2x6SUc1dmRDQjVaWFFnYzNWd2NHOXlkR1ZrSnlrN1hHNGdJQ0FnSUNCeVpYUjFjbTQ3WEc0Z0lDQWdmVnh1SUNBZ0lIUm9hWE11WDNKaFppQTlJSGRwYm1SdmR5NXlaWEYxWlhOMFFXNXBiV0YwYVc5dVJuSmhiV1VvZEdocGN5NWZZVzVwYldGMFpVaGhibVJzWlhJcE8xeHVYRzRnSUNBZ2JHVjBJRzV2ZHlBOUlISnBaMmgwVG05M0tDazdYRzVjYmlBZ0lDQmpiMjV6ZENCbWNITWdQU0IwYUdsekxuQnliM0J6TG1ad2N6dGNiaUFnSUNCamIyNXpkQ0JtY21GdFpVbHVkR1Z5ZG1Gc1RWTWdQU0F4TURBd0lDOGdabkJ6TzF4dUlDQWdJR3hsZENCa1pXeDBZVlJwYldWTlV5QTlJRzV2ZHlBdElIUm9hWE11WDJ4aGMzUlVhVzFsTzF4dVhHNGdJQ0FnWTI5dWMzUWdaSFZ5WVhScGIyNGdQU0IwYUdsekxuQnliM0J6TG1SMWNtRjBhVzl1TzF4dUlDQWdJR052Ym5OMElHaGhjMFIxY21GMGFXOXVJRDBnZEhsd1pXOW1JR1IxY21GMGFXOXVJRDA5UFNBbmJuVnRZbVZ5SnlBbUppQnBjMFpwYm1sMFpTaGtkWEpoZEdsdmJpazdYRzVjYmlBZ0lDQnNaWFFnYVhOT1pYZEdjbUZ0WlNBOUlIUnlkV1U3WEc0Z0lDQWdZMjl1YzNRZ2NHeGhlV0poWTJ0U1lYUmxJRDBnZEdocGN5NXpaWFIwYVc1bmN5NXdiR0Y1WW1GamExSmhkR1U3WEc0Z0lDQWdhV1lnS0hCc1lYbGlZV05yVW1GMFpTQTlQVDBnSjJacGVHVmtKeWtnZTF4dUlDQWdJQ0FnWkdWc2RHRlVhVzFsVFZNZ1BTQm1jbUZ0WlVsdWRHVnlkbUZzVFZNN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNod2JHRjVZbUZqYTFKaGRHVWdQVDA5SUNkMGFISnZkSFJzWlNjcElIdGNiaUFnSUNBZ0lHbG1JQ2hrWld4MFlWUnBiV1ZOVXlBK0lHWnlZVzFsU1c1MFpYSjJZV3hOVXlrZ2UxeHVJQ0FnSUNBZ0lDQnViM2NnUFNCdWIzY2dMU0FvWkdWc2RHRlVhVzFsVFZNZ0pTQm1jbUZ0WlVsdWRHVnlkbUZzVFZNcE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5c1lYTjBWR2x0WlNBOUlHNXZkenRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJR2x6VG1WM1JuSmhiV1VnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmYkdGemRGUnBiV1VnUFNCdWIzYzdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ1kyOXVjM1FnWkdWc2RHRlVhVzFsSUQwZ1pHVnNkR0ZVYVcxbFRWTWdMeUF4TURBd08xeHVJQ0FnSUd4bGRDQnVaWGRVYVcxbElEMGdkR2hwY3k1d2NtOXdjeTUwYVcxbElDc2daR1ZzZEdGVWFXMWxJQ29nZEdocGN5NXdjbTl3Y3k1MGFXMWxVMk5oYkdVN1hHNWNiaUFnSUNBdkx5QklZVzVrYkdVZ2NtVjJaWEp6WlNCMGFXMWxJSE5qWVd4bFhHNGdJQ0FnYVdZZ0tHNWxkMVJwYldVZ1BDQXdJQ1ltSUdoaGMwUjFjbUYwYVc5dUtTQjdYRzRnSUNBZ0lDQnVaWGRVYVcxbElEMGdaSFZ5WVhScGIyNGdLeUJ1WlhkVWFXMWxPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRkpsTFhOMFlYSjBJR0Z1YVcxaGRHbHZibHh1SUNBZ0lHeGxkQ0JwYzBacGJtbHphR1ZrSUQwZ1ptRnNjMlU3WEc0Z0lDQWdiR1YwSUdselRHOXZjRk4wWVhKMElEMGdabUZzYzJVN1hHNWNiaUFnSUNCamIyNXpkQ0JzYjI5d2FXNW5JRDBnZEdocGN5NXpaWFIwYVc1bmN5NXNiMjl3SUNFOVBTQm1ZV3h6WlR0Y2JseHVJQ0FnSUdsbUlDaG9ZWE5FZFhKaGRHbHZiaUFtSmlCdVpYZFVhVzFsSUQ0OUlHUjFjbUYwYVc5dUtTQjdYRzRnSUNBZ0lDQXZMeUJTWlMxemRHRnlkQ0JoYm1sdFlYUnBiMjVjYmlBZ0lDQWdJR2xtSUNoc2IyOXdhVzVuS1NCN1hHNGdJQ0FnSUNBZ0lHbHpUbVYzUm5KaGJXVWdQU0IwY25WbE8xeHVJQ0FnSUNBZ0lDQnVaWGRVYVcxbElEMGdibVYzVkdsdFpTQWxJR1IxY21GMGFXOXVPMXh1SUNBZ0lDQWdJQ0JwYzB4dmIzQlRkR0Z5ZENBOUlIUnlkV1U3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0JwYzA1bGQwWnlZVzFsSUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0FnSUc1bGQxUnBiV1VnUFNCa2RYSmhkR2x2Ymp0Y2JpQWdJQ0FnSUNBZ2FYTkdhVzVwYzJobFpDQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lIUm9hWE11WDNOcFoyNWhiRVZ1WkNncE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaHBjMDVsZDBaeVlXMWxLU0I3WEc0Z0lDQWdJQ0IwYUdsekxuQnliM0J6TG1SbGJIUmhWR2x0WlNBOUlHUmxiSFJoVkdsdFpUdGNiaUFnSUNBZ0lIUm9hWE11Y0hKdmNITXVkR2x0WlNBOUlHNWxkMVJwYldVN1hHNGdJQ0FnSUNCMGFHbHpMbkJ5YjNCekxuQnNZWGxvWldGa0lEMGdkR2hwY3k1ZlkyOXRjSFYwWlZCc1lYbG9aV0ZrS0c1bGQxUnBiV1VzSUdSMWNtRjBhVzl1S1R0Y2JpQWdJQ0FnSUdOdmJuTjBJR3hoYzNSR2NtRnRaU0E5SUhSb2FYTXVjSEp2Y0hNdVpuSmhiV1U3WEc0Z0lDQWdJQ0IwYUdsekxuQnliM0J6TG1aeVlXMWxJRDBnZEdocGN5NWZZMjl0Y0hWMFpVTjFjbkpsYm5SR2NtRnRaU2dwTzF4dUlDQWdJQ0FnYVdZZ0tHbHpURzl2Y0ZOMFlYSjBLU0IwYUdsekxsOXphV2R1WVd4Q1pXZHBiaWdwTzF4dUlDQWdJQ0FnYVdZZ0tHeGhjM1JHY21GdFpTQWhQVDBnZEdocGN5NXdjbTl3Y3k1bWNtRnRaU2tnZEdocGN5NTBhV05yS0NrN1hHNGdJQ0FnSUNCMGFHbHpMbkpsYm1SbGNpZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1d2NtOXdjeTVrWld4MFlWUnBiV1VnUFNBd08xeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaHBjMFpwYm1semFHVmtLU0I3WEc0Z0lDQWdJQ0IwYUdsekxuQmhkWE5sS0NrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1pHbHpjR0YwWTJnZ0tHTmlLU0I3WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJqWWlBaFBUMGdKMloxYm1OMGFXOXVKeWtnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R0ZFhOMElIQmhjM01nWm5WdVkzUnBiMjRnYVc1MGJ5QmthWE53WVhSamFDZ3BKeWs3WEc0Z0lDQWdZMklvZEdocGN5NXdjbTl3Y3lrN1hHNGdJQ0FnZEdocGN5NXlaVzVrWlhJb0tUdGNiaUFnZlZ4dVhHNGdJRzF2ZFc1MElDZ3BJSHRjYmlBZ0lDQjBhR2x6TGw5aGNIQmxibVJEWVc1MllYTkpaazVsWldSbFpDZ3BPMXh1SUNCOVhHNWNiaUFnZFc1dGIzVnVkQ0FvS1NCN1hHNGdJQ0FnYVdZZ0tHbHpRbkp2ZDNObGNpZ3BLU0I3WEc0Z0lDQWdJQ0IzYVc1a2IzY3VjbVZ0YjNabFJYWmxiblJNYVhOMFpXNWxjaWduY21WemFYcGxKeXdnZEdocGN5NWZjbVZ6YVhwbFNHRnVaR3hsY2lrN1hHNGdJQ0FnSUNCMGFHbHpMbDlyWlhsaWIyRnlaRk5vYjNKMFkzVjBjeTVrWlhSaFkyZ29LVHRjYmlBZ0lDQjlYRzRnSUNBZ2FXWWdLSFJvYVhNdWNISnZjSE11WTJGdWRtRnpMbkJoY21WdWRFVnNaVzFsYm5RcElIdGNiaUFnSUNBZ0lIUm9hWE11Y0hKdmNITXVZMkZ1ZG1GekxuQmhjbVZ1ZEVWc1pXMWxiblF1Y21WdGIzWmxRMmhwYkdRb2RHaHBjeTV3Y205d2N5NWpZVzUyWVhNcE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lGOWhjSEJsYm1SRFlXNTJZWE5KWms1bFpXUmxaQ0FvS1NCN1hHNGdJQ0FnYVdZZ0tDRnBjMEp5YjNkelpYSW9LU2tnY21WMGRYSnVPMXh1SUNBZ0lHbG1JQ2gwYUdsekxuTmxkSFJwYm1kekxuQmhjbVZ1ZENBaFBUMGdabUZzYzJVZ0ppWWdLSFJvYVhNdWNISnZjSE11WTJGdWRtRnpJQ1ltSUNGMGFHbHpMbkJ5YjNCekxtTmhiblpoY3k1d1lYSmxiblJGYkdWdFpXNTBLU2tnZTF4dUlDQWdJQ0FnWTI5dWMzUWdaR1ZtWVhWc2RGQmhjbVZ1ZENBOUlIUm9hWE11YzJWMGRHbHVaM011Y0dGeVpXNTBJSHg4SUdSdlkzVnRaVzUwTG1KdlpIazdYRzRnSUNBZ0lDQmtaV1poZFd4MFVHRnlaVzUwTG1Gd2NHVnVaRU5vYVd4a0tIUm9hWE11Y0hKdmNITXVZMkZ1ZG1GektUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQmZjMlYwZFhCSFRFdGxlU0FvS1NCN1hHNGdJQ0FnYVdZZ0tIUm9hWE11Y0hKdmNITXVZMjl1ZEdWNGRDa2dlMXh1SUNBZ0lDQWdhV1lnS0dselYyVmlSMHhEYjI1MFpYaDBLSFJvYVhNdWNISnZjSE11WTI5dWRHVjRkQ2twSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmY0hKdmNITXVaMndnUFNCMGFHbHpMbkJ5YjNCekxtTnZiblJsZUhRN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCa1pXeGxkR1VnZEdocGN5NWZjSEp2Y0hNdVoydzdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdaMlYwVkdsdFpWQnliM0J6SUNoelpYUjBhVzVuY3lBOUlIdDlLU0I3WEc0Z0lDQWdMeThnUjJWMElIUnBiV2x1WnlCa1lYUmhYRzRnSUNBZ2JHVjBJR1IxY21GMGFXOXVJRDBnYzJWMGRHbHVaM011WkhWeVlYUnBiMjQ3WEc0Z0lDQWdiR1YwSUhSdmRHRnNSbkpoYldWeklEMGdjMlYwZEdsdVozTXVkRzkwWVd4R2NtRnRaWE03WEc0Z0lDQWdZMjl1YzNRZ2RHbHRaVk5qWVd4bElEMGdaR1ZtYVc1bFpDaHpaWFIwYVc1bmN5NTBhVzFsVTJOaGJHVXNJREVwTzF4dUlDQWdJR052Ym5OMElHWndjeUE5SUdSbFptbHVaV1FvYzJWMGRHbHVaM011Wm5CekxDQXlOQ2s3WEc0Z0lDQWdZMjl1YzNRZ2FHRnpSSFZ5WVhScGIyNGdQU0IwZVhCbGIyWWdaSFZ5WVhScGIyNGdQVDA5SUNkdWRXMWlaWEluSUNZbUlHbHpSbWx1YVhSbEtHUjFjbUYwYVc5dUtUdGNiaUFnSUNCamIyNXpkQ0JvWVhOVWIzUmhiRVp5WVcxbGN5QTlJSFI1Y0dWdlppQjBiM1JoYkVaeVlXMWxjeUE5UFQwZ0oyNTFiV0psY2ljZ0ppWWdhWE5HYVc1cGRHVW9kRzkwWVd4R2NtRnRaWE1wTzF4dVhHNGdJQ0FnWTI5dWMzUWdkRzkwWVd4R2NtRnRaWE5HY205dFJIVnlZWFJwYjI0Z1BTQm9ZWE5FZFhKaGRHbHZiaUEvSUUxaGRHZ3VabXh2YjNJb1puQnpJQ29nWkhWeVlYUnBiMjRwSURvZ2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUdOdmJuTjBJR1IxY21GMGFXOXVSbkp2YlZSdmRHRnNSbkpoYldWeklEMGdhR0Z6Vkc5MFlXeEdjbUZ0WlhNZ1B5QW9kRzkwWVd4R2NtRnRaWE1nTHlCbWNITXBJRG9nZFc1a1pXWnBibVZrTzF4dUlDQWdJR2xtSUNob1lYTkVkWEpoZEdsdmJpQW1KaUJvWVhOVWIzUmhiRVp5WVcxbGN5QW1KaUIwYjNSaGJFWnlZVzFsYzBaeWIyMUVkWEpoZEdsdmJpQWhQVDBnZEc5MFlXeEdjbUZ0WlhNcElIdGNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbldXOTFJSE5vYjNWc1pDQnpjR1ZqYVdaNUlHVnBkR2hsY2lCa2RYSmhkR2x2YmlCdmNpQjBiM1JoYkVaeVlXMWxjeXdnWW5WMElHNXZkQ0JpYjNSb0xpQlBjaXdnZEdobGVTQnRkWE4wSUcxaGRHTm9JR1Y0WVdOMGJIa3VKeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJ6WlhSMGFXNW5jeTVrYVcxbGJuTnBiMjV6SUQwOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCMGVYQmxiMllnYzJWMGRHbHVaM011ZFc1cGRITWdJVDA5SUNkMWJtUmxabWx1WldRbktTQjdYRzRnSUNBZ0lDQmpiMjV6YjJ4bExuZGhjbTRvWUZsdmRTZDJaU0J6Y0dWamFXWnBaV1FnWVNCN0lIVnVhWFJ6SUgwZ2MyVjBkR2x1WnlCaWRYUWdibThnZXlCa2FXMWxibk5wYjI0Z2ZTd2djMjhnZEdobElIVnVhWFJ6SUhkcGJHd2dZbVVnYVdkdWIzSmxaQzVnS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IwYjNSaGJFWnlZVzFsY3lBOUlHUmxabWx1WldRb2RHOTBZV3hHY21GdFpYTXNJSFJ2ZEdGc1JuSmhiV1Z6Um5KdmJVUjFjbUYwYVc5dUxDQkpibVpwYm1sMGVTazdYRzRnSUNBZ1pIVnlZWFJwYjI0Z1BTQmtaV1pwYm1Wa0tHUjFjbUYwYVc5dUxDQmtkWEpoZEdsdmJrWnliMjFVYjNSaGJFWnlZVzFsY3l3Z1NXNW1hVzVwZEhrcE8xeHVYRzRnSUNBZ1kyOXVjM1FnYzNSaGNuUlVhVzFsSUQwZ2MyVjBkR2x1WjNNdWRHbHRaVHRjYmlBZ0lDQmpiMjV6ZENCemRHRnlkRVp5WVcxbElEMGdjMlYwZEdsdVozTXVabkpoYldVN1hHNGdJQ0FnWTI5dWMzUWdhR0Z6VTNSaGNuUlVhVzFsSUQwZ2RIbHdaVzltSUhOMFlYSjBWR2x0WlNBOVBUMGdKMjUxYldKbGNpY2dKaVlnYVhOR2FXNXBkR1VvYzNSaGNuUlVhVzFsS1R0Y2JpQWdJQ0JqYjI1emRDQm9ZWE5UZEdGeWRFWnlZVzFsSUQwZ2RIbHdaVzltSUhOMFlYSjBSbkpoYldVZ1BUMDlJQ2R1ZFcxaVpYSW5JQ1ltSUdselJtbHVhWFJsS0hOMFlYSjBSbkpoYldVcE8xeHVYRzRnSUNBZ0x5OGdjM1JoY25RZ1lYUWdlbVZ5YnlCMWJteGxjM01nZFhObGNpQnpjR1ZqYVdacFpYTWdabkpoYldVZ2IzSWdkR2x0WlNBb1luVjBJRzV2ZENCaWIzUm9JRzFwYzIxaGRHTm9aV1FwWEc0Z0lDQWdiR1YwSUhScGJXVWdQU0F3TzF4dUlDQWdJR3hsZENCbWNtRnRaU0E5SURBN1hHNGdJQ0FnYkdWMElIQnNZWGxvWldGa0lEMGdNRHRjYmlBZ0lDQnBaaUFvYUdGelUzUmhjblJVYVcxbElDWW1JR2hoYzFOMFlYSjBSbkpoYldVcElIdGNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbldXOTFJSE5vYjNWc1pDQnpjR1ZqYVdaNUlHVnBkR2hsY2lCemRHRnlkQ0JtY21GdFpTQnZjaUIwYVcxbExDQmlkWFFnYm05MElHSnZkR2d1SnlrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNob1lYTlRkR0Z5ZEZScGJXVXBJSHRjYmlBZ0lDQWdJQzh2SUZWelpYSWdjM0JsWTJsbWFXVnpJSFJwYldVc0lIZGxJR2x1Wm1WeUlHWnlZVzFsY3lCbWNtOXRJRVpRVTF4dUlDQWdJQ0FnZEdsdFpTQTlJSE4wWVhKMFZHbHRaVHRjYmlBZ0lDQWdJSEJzWVhsb1pXRmtJRDBnZEdocGN5NWZZMjl0Y0hWMFpWQnNZWGxvWldGa0tIUnBiV1VzSUdSMWNtRjBhVzl1S1R0Y2JpQWdJQ0FnSUdaeVlXMWxJRDBnZEdocGN5NWZZMjl0Y0hWMFpVWnlZVzFsS0Z4dUlDQWdJQ0FnSUNCd2JHRjVhR1ZoWkN3Z2RHbHRaU3hjYmlBZ0lDQWdJQ0FnZEc5MFlXeEdjbUZ0WlhNc0lHWndjMXh1SUNBZ0lDQWdLVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR2hoYzFOMFlYSjBSbkpoYldVcElIdGNiaUFnSUNBZ0lDOHZJRlZ6WlhJZ2MzQmxZMmxtYVdWeklHWnlZVzFsSUc1MWJXSmxjaXdnZDJVZ2FXNW1aWElnZEdsdFpTQm1jbTl0SUVaUVUxeHVJQ0FnSUNBZ1puSmhiV1VnUFNCemRHRnlkRVp5WVcxbE8xeHVJQ0FnSUNBZ2RHbHRaU0E5SUdaeVlXMWxJQzhnWm5Cek8xeHVJQ0FnSUNBZ2NHeGhlV2hsWVdRZ1BTQjBhR2x6TGw5amIyMXdkWFJsVUd4aGVXaGxZV1FvZEdsdFpTd2daSFZ5WVhScGIyNHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNCd2JHRjVhR1ZoWkN4Y2JpQWdJQ0FnSUhScGJXVXNYRzRnSUNBZ0lDQm1jbUZ0WlN4Y2JpQWdJQ0FnSUdSMWNtRjBhVzl1TEZ4dUlDQWdJQ0FnZEc5MFlXeEdjbUZ0WlhNc1hHNGdJQ0FnSUNCbWNITXNYRzRnSUNBZ0lDQjBhVzFsVTJOaGJHVmNiaUFnSUNCOU8xeHVJQ0I5WEc1Y2JpQWdjMlYwZFhBZ0tITmxkSFJwYm1keklEMGdlMzBwSUh0Y2JpQWdJQ0JwWmlBb2RHaHBjeTV6YTJWMFkyZ3BJSFJvY205M0lHNWxkeUJGY25KdmNpZ25UWFZzZEdsd2JHVWdjMlYwZFhBb0tTQmpZV3hzY3lCdWIzUWdlV1YwSUhOMWNIQnZjblJsWkM0bktUdGNibHh1SUNBZ0lIUm9hWE11WDNObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z2MyVjBkR2x1WjNNc0lIUm9hWE11WDNObGRIUnBibWR6S1R0Y2JseHVJQ0FnSUdOb1pXTnJVMlYwZEdsdVozTW9kR2hwY3k1ZmMyVjBkR2x1WjNNcE8xeHVYRzRnSUNBZ0x5OGdSMlYwSUdsdWFYUnBZV3dnWTJGdWRtRnpJQ1lnWTI5dWRHVjRkRnh1SUNBZ0lHTnZibk4wSUhzZ1kyOXVkR1Y0ZEN3Z1kyRnVkbUZ6SUgwZ1BTQmpjbVZoZEdWRFlXNTJZWE1vZEdocGN5NWZjMlYwZEdsdVozTXBPMXh1WEc0Z0lDQWdZMjl1YzNRZ2RHbHRaVkJ5YjNCeklEMGdkR2hwY3k1blpYUlVhVzFsVUhKdmNITW9kR2hwY3k1ZmMyVjBkR2x1WjNNcE8xeHVYRzRnSUNBZ0x5OGdTVzVwZEdsaGJDQnlaVzVrWlhJZ2MzUmhkR1VnWm1WaGRIVnlaWE5jYmlBZ0lDQjBhR2x6TGw5d2NtOXdjeUE5SUh0Y2JpQWdJQ0FnSUM0dUxuUnBiV1ZRY205d2N5eGNiaUFnSUNBZ0lHTmhiblpoY3l4Y2JpQWdJQ0FnSUdOdmJuUmxlSFFzWEc0Z0lDQWdJQ0JrWld4MFlWUnBiV1U2SURBc1hHNGdJQ0FnSUNCemRHRnlkR1ZrT2lCbVlXeHpaU3hjYmlBZ0lDQWdJR1Y0Y0c5eWRHbHVaem9nWm1Gc2MyVXNYRzRnSUNBZ0lDQndiR0Y1YVc1bk9pQm1ZV3h6WlN4Y2JpQWdJQ0FnSUhKbFkyOXlaR2x1WnpvZ1ptRnNjMlVzWEc0Z0lDQWdJQ0J6WlhSMGFXNW5jem9nZEdocGN5NXpaWFIwYVc1bmN5eGNiaUFnSUNBZ0lHUmhkR0U2SUhSb2FYTXVjMlYwZEdsdVozTXVaR0YwWVN4Y2JseHVJQ0FnSUNBZ0x5OGdSWGh3YjNKMElITnZiV1VnYzNCbFkybG1hV01nWVdOMGFXOXVjeUIwYnlCMGFHVWdjMnRsZEdOb1hHNGdJQ0FnSUNCeVpXNWtaWEk2SUNncElEMCtJSFJvYVhNdWNtVnVaR1Z5S0Nrc1hHNGdJQ0FnSUNCMGIyZG5iR1ZRYkdGNU9pQW9LU0E5UGlCMGFHbHpMblJ2WjJkc1pWQnNZWGtvS1N4Y2JpQWdJQ0FnSUdScGMzQmhkR05vT2lBb1kySXBJRDArSUhSb2FYTXVaR2x6Y0dGMFkyZ29ZMklwTEZ4dUlDQWdJQ0FnZEdsamF6b2dLQ2tnUFQ0Z2RHaHBjeTUwYVdOcktDa3NYRzRnSUNBZ0lDQnlaWE5wZW1VNklDZ3BJRDArSUhSb2FYTXVjbVZ6YVhwbEtDa3NYRzRnSUNBZ0lDQjFjR1JoZEdVNklDaHZjSFFwSUQwK0lIUm9hWE11ZFhCa1lYUmxLRzl3ZENrc1hHNGdJQ0FnSUNCbGVIQnZjblJHY21GdFpUb2diM0IwSUQwK0lIUm9hWE11Wlhod2IzSjBSbkpoYldVb2IzQjBLU3hjYmlBZ0lDQWdJSEpsWTI5eVpEb2dLQ2tnUFQ0Z2RHaHBjeTV5WldOdmNtUW9LU3hjYmlBZ0lDQWdJSEJzWVhrNklDZ3BJRDArSUhSb2FYTXVjR3hoZVNncExGeHVJQ0FnSUNBZ2NHRjFjMlU2SUNncElEMCtJSFJvYVhNdWNHRjFjMlVvS1N4Y2JpQWdJQ0FnSUhOMGIzQTZJQ2dwSUQwK0lIUm9hWE11YzNSdmNDZ3BYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHZJRVp2Y2lCWFpXSkhUQ0J6YTJWMFkyaGxjeXdnWVNCbmJDQjJZWEpwWVdKc1pTQnlaV0ZrY3lCaElHSnBkQ0JpWlhSMFpYSmNiaUFnSUNCMGFHbHpMbDl6WlhSMWNFZE1TMlY1S0NrN1hHNWNiaUFnSUNBdkx5QlVjbWxuWjJWeUlHbHVhWFJwWVd3Z2NtVnphWHBsSUc1dmR5QnpieUIwYUdGMElHTmhiblpoY3lCcGN5QmhiSEpsWVdSNUlITnBlbVZrWEc0Z0lDQWdMeThnWW5rZ2RHaGxJSFJwYldVZ2QyVWdiRzloWkNCMGFHVWdjMnRsZEdOb1hHNGdJQ0FnZEdocGN5NXlaWE5wZW1Vb0tUdGNiaUFnZlZ4dVhHNGdJR3h2WVdSQmJtUlNkVzRnS0dOaGJuWmhjMU5yWlhSamFDd2dibVYzVTJWMGRHbHVaM01wSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1c2IyRmtLR05oYm5aaGMxTnJaWFJqYUN3Z2JtVjNVMlYwZEdsdVozTXBMblJvWlc0b0tDa2dQVDRnZTF4dUlDQWdJQ0FnZEdocGN5NXlkVzRvS1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUIwYUdsek8xeHVJQ0FnSUgwcE8xeHVJQ0I5WEc1Y2JpQWdkVzVzYjJGa0lDZ3BJSHRjYmlBZ0lDQjBhR2x6TG5CaGRYTmxLQ2s3WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbk5yWlhSamFDa2djbVYwZFhKdU8xeHVJQ0FnSUdsbUlDaDBlWEJsYjJZZ2RHaHBjeTV6YTJWMFkyZ3VkVzVzYjJGa0lEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbDkzY21Gd1EyOXVkR1Y0ZEZOallXeGxLSEJ5YjNCeklEMCtJSFJvYVhNdWMydGxkR05vTG5WdWJHOWhaQ2h3Y205d2N5a3BPMXh1SUNBZ0lIMWNiaUFnSUNCMGFHbHpMbDl6YTJWMFkyZ2dQU0J1ZFd4c08xeHVJQ0I5WEc1Y2JpQWdaR1Z6ZEhKdmVTQW9LU0I3WEc0Z0lDQWdkR2hwY3k1MWJteHZZV1FvS1R0Y2JpQWdJQ0IwYUdsekxuVnViVzkxYm5Rb0tUdGNiaUFnZlZ4dVhHNGdJR3h2WVdRZ0tHTnlaV0YwWlZOclpYUmphQ3dnYm1WM1UyVjBkR2x1WjNNcElIdGNiaUFnSUNBdkx5QlZjMlZ5SUdScFpHNG5kQ0J6Y0dWamFXWjVJR0VnWm5WdVkzUnBiMjVjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JR055WldGMFpWTnJaWFJqYUNBaFBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RVYUdVZ1puVnVZM1JwYjI0Z2JYVnpkQ0IwWVd0bElHbHVJR0VnWm5WdVkzUnBiMjRnWVhNZ2RHaGxJR1pwY25OMElIQmhjbUZ0WlhSbGNpNGdSWGhoYlhCc1pUcGNYRzRnSUdOaGJuWmhjMU5yWlhSamFHVnlLQ2dwSUQwK0lIc2dMaTR1SUgwc0lITmxkSFJwYm1kektTY3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2gwYUdsekxuTnJaWFJqYUNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTUxYm14dllXUW9LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvZEhsd1pXOW1JRzVsZDFObGRIUnBibWR6SUNFOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJQ0FnZEdocGN5NTFjR1JoZEdVb2JtVjNVMlYwZEdsdVozTXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRlJvYVhNZ2FYTWdZU0JpYVhRZ2IyWWdZU0IwY21samEza2dZMkZ6WlRzZ2QyVWdjMlYwSUhWd0lIUm9aU0JoZFhSdkxYTmpZV3hwYm1jZ2FHVnlaVnh1SUNBZ0lDOHZJR2x1SUdOaGMyVWdkR2hsSUhWelpYSWdaR1ZqYVdSbGN5QjBieUJ5Wlc1a1pYSWdZVzU1ZEdocGJtY2dkRzhnZEdobElHTnZiblJsZUhRZ0ttSmxabTl5WlNvZ2RHaGxYRzRnSUNBZ0x5OGdjbVZ1WkdWeUtDa2dablZ1WTNScGIyNHVMaTRnU0c5M1pYWmxjaXdnZFhObGNuTWdjMmh2ZFd4a0lHbHVjM1JsWVdRZ2RYTmxJR0psWjJsdUtDa2dablZ1WTNScGIyNGdabTl5SUhSb1lYUXVYRzRnSUNBZ2RHaHBjeTVmY0hKbFVtVnVaR1Z5S0NrN1hHNWNiaUFnSUNCc1pYUWdjSEpsYkc5aFpDQTlJRkJ5YjIxcGMyVXVjbVZ6YjJ4MlpTZ3BPMXh1WEc0Z0lDQWdMeThnUW1WallYVnpaU0J2WmlCUU5TNXFjeWR6SUhWdWRYTjFZV3dnYzNSeWRXTjBkWEpsTENCM1pTQm9ZWFpsSUhSdklHUnZJR0VnWW1sMElHOW1YRzRnSUNBZ0x5OGdiR2xpY21GeWVTMXpjR1ZqYVdacFl5QmphR0Z1WjJWeklIUnZJSE4xY0hCdmNuUWdhWFFnY0hKdmNHVnliSGt1WEc0Z0lDQWdhV1lnS0hSb2FYTXVjMlYwZEdsdVozTXVjRFVwSUh0Y2JpQWdJQ0FnSUdsbUlDZ2hhWE5DY205M2MyVnlLQ2twSUh0Y2JpQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkYlkyRnVkbUZ6TFhOclpYUmphRjBnUlZKU1QxSTZJRlZ6YVc1bklIQTFMbXB6SUdsdUlFNXZaR1V1YW5NZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNjcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2NISmxiRzloWkNBOUlHNWxkeUJRY205dGFYTmxLSEpsYzI5c2RtVWdQVDRnZTF4dUlDQWdJQ0FnSUNCc1pYUWdVRFZEYjI1emRISjFZM1J2Y2lBOUlIUm9hWE11YzJWMGRHbHVaM011Y0RVN1hHNGdJQ0FnSUNBZ0lHeGxkQ0J3Y21Wc2IyRmtPMXh1SUNBZ0lDQWdJQ0JwWmlBb1VEVkRiMjV6ZEhKMVkzUnZjaTV3TlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSEJ5Wld4dllXUWdQU0JRTlVOdmJuTjBjblZqZEc5eUxuQnlaV3h2WVdRN1hHNGdJQ0FnSUNBZ0lDQWdVRFZEYjI1emRISjFZM1J2Y2lBOUlGQTFRMjl1YzNSeWRXTjBiM0l1Y0RVN1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0F2THlCVWFHVWdjMnRsZEdOb0lITmxkSFZ3T3lCa2FYTmhZbXhsSUd4dmIzQXNJSE5sZENCemFYcHBibWNzSUdWMFl5NWNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2NEVlRhMlYwWTJnZ1BTQndOU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdMeThnU0c5dmF5QnBiaUJ3Y21Wc2IyRmtJR2xtSUc1bFkyVnpjMkZ5ZVZ4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2h3Y21Wc2IyRmtLU0J3TlM1d2NtVnNiMkZrSUQwZ0tDa2dQVDRnY0hKbGJHOWhaQ2h3TlNrN1hHNGdJQ0FnSUNBZ0lDQWdjRFV1YzJWMGRYQWdQU0FvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0J3Y205d2N5QTlJSFJvYVhNdWNISnZjSE03WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCcGMwZE1JRDBnZEdocGN5NXpaWFIwYVc1bmN5NWpiMjUwWlhoMElEMDlQU0FuZDJWaVoyd25PMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnY21WdVpHVnlaWElnUFNCcGMwZE1JRDhnY0RVdVYwVkNSMHdnT2lCd05TNVFNa1E3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndOUzV1YjB4dmIzQW9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQTFMbkJwZUdWc1JHVnVjMmwwZVNod2NtOXdjeTV3YVhobGJGSmhkR2x2S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEExTG1OeVpXRjBaVU5oYm5aaGN5aHdjbTl3Y3k1MmFXVjNjRzl5ZEZkcFpIUm9MQ0J3Y205d2N5NTJhV1YzY0c5eWRFaGxhV2RvZEN3Z2NtVnVaR1Z5WlhJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHbHpSMHdnSmlZZ2RHaHBjeTV6WlhSMGFXNW5jeTVoZEhSeWFXSjFkR1Z6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhBMUxuTmxkRUYwZEhKcFluVjBaWE1vZEdocGN5NXpaWFIwYVc1bmN5NWhkSFJ5YVdKMWRHVnpLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTUxY0dSaGRHVW9leUJ3TlN3Z1kyRnVkbUZ6T2lCd05TNWpZVzUyWVhNc0lHTnZiblJsZUhRNklIQTFMbDl5Wlc1a1pYSmxjaTVrY21GM2FXNW5RMjl1ZEdWNGRDQjlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxjMjlzZG1Vb0tUdGNiaUFnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQWdJQzh2SUZOMWNIQnZjblFnWjJ4dlltRnNJR0Z1WkNCcGJuTjBZVzVqWlNCUU5TNXFjeUJ0YjJSbGMxeHVJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JRkExUTI5dWMzUnlkV04wYjNJZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQnVaWGNnVURWRGIyNXpkSEoxWTNSdmNpaHdOVk5yWlhSamFDazdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCM2FXNWtiM2N1WTNKbFlYUmxRMkZ1ZG1GeklDRTlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0o3SUhBMUlIMGdjMlYwZEdsdVp5QnBjeUJ3WVhOelpXUWdZblYwSUdOaGJpZDBJR1pwYm1RZ2NEVXVhbk1nYVc0Z1oyeHZZbUZzSUNoM2FXNWtiM2NwSUhOamIzQmxMaUJOWVhsaVpTQjViM1VnWkdsa0lHNXZkQ0JqY21WaGRHVWdhWFFnWjJ4dlltRnNiSGsvWEZ4dWJtVjNJSEExS0NrN0lDOHZJRHd0TFNCaGRIUmhZMmhsY3lCMGJ5Qm5iRzlpWVd3Z2MyTnZjR1ZjSWlrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUhBMVUydGxkR05vS0hkcGJtUnZkeWs3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUJ3Y21Wc2IyRmtMblJvWlc0b0tDa2dQVDRnZTF4dUlDQWdJQ0FnTHk4Z1RHOWhaQ0IwYUdVZ2RYTmxjaWR6SUhOclpYUmphRnh1SUNBZ0lDQWdiR1YwSUd4dllXUmxjaUE5SUdOeVpXRjBaVk5yWlhSamFDaDBhR2x6TG5CeWIzQnpLVHRjYmlBZ0lDQWdJR2xtSUNnaGFYTlFjbTl0YVhObEtHeHZZV1JsY2lrcElIdGNiaUFnSUNBZ0lDQWdiRzloWkdWeUlEMGdVSEp2YldselpTNXlaWE52YkhabEtHeHZZV1JsY2lrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnYkc5aFpHVnlPMXh1SUNBZ0lIMHBMblJvWlc0b2MydGxkR05vSUQwK0lIdGNiaUFnSUNBZ0lHbG1JQ2doYzJ0bGRHTm9LU0J6YTJWMFkyZ2dQU0I3ZlR0Y2JpQWdJQ0FnSUhSb2FYTXVYM05yWlhSamFDQTlJSE5yWlhSamFEdGNibHh1SUNBZ0lDQWdMeThnVDI1alpTQjBhR1VnYzJ0bGRHTm9JR2x6SUd4dllXUmxaQ0IzWlNCallXNGdZV1JrSUhSb1pTQmxkbVZ1ZEhOY2JpQWdJQ0FnSUdsbUlDaHBjMEp5YjNkelpYSW9LU2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbDlyWlhsaWIyRnlaRk5vYjNKMFkzVjBjeTVoZEhSaFkyZ29LVHRjYmlBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KM0psYzJsNlpTY3NJSFJvYVhNdVgzSmxjMmw2WlVoaGJtUnNaWElwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMGFHbHpMbDl3YjNOMFVtVnVaR1Z5S0NrN1hHNWNiaUFnSUNBZ0lDOHZJRlJvWlNCcGJtbDBhV0ZzSUhKbGMybDZaU2dwSUdsdUlIUm9aU0JqYjI1emRISjFZM1J2Y2lCM2FXeHNJRzV2ZENCb1lYWmxYRzRnSUNBZ0lDQXZMeUIwY21sbloyVnlaV1FnWVNCeVpYTnBlbVVvS1NCbGRtVnVkQ0J2YmlCMGFHVWdjMnRsZEdOb0xDQnphVzVqWlNCcGRDQjNZWE1nWW1WbWIzSmxYRzRnSUNBZ0lDQXZMeUIwYUdVZ2MydGxkR05vSUhkaGN5QnNiMkZrWldRdUlGTnZJSGRsSUhObGJtUWdkR2hsSUhOcFoyNWhiQ0JvWlhKbExDQmhiR3h2ZDJsdVoxeHVJQ0FnSUNBZ0x5OGdkWE5sY25NZ2RHOGdjbVZoWTNRZ2RHOGdkR2hsSUdsdWFYUnBZV3dnYzJsNlpTQmlaV1p2Y21VZ1ptbHljM1FnY21WdVpHVnlMbHh1SUNBZ0lDQWdkR2hwY3k1ZmMybDZaVU5vWVc1blpXUW9LVHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TzF4dUlDQWdJSDBwTG1OaGRHTm9LR1Z5Y2lBOVBpQjdYRzRnSUNBZ0lDQmpiMjV6YjJ4bExuZGhjbTRvSjBOdmRXeGtJRzV2ZENCemRHRnlkQ0J6YTJWMFkyZ3NJSFJvWlNCaGMzbHVZeUJzYjJGa2FXNW5JR1oxYm1OMGFXOXVJSEpsYW1WamRHVmtJSGRwZEdnZ1lXNGdaWEp5YjNJNlhGeHVJQ0FnSUVWeWNtOXlPaUFuSUNzZ1pYSnlMbTFsYzNOaFoyVXBPMXh1SUNBZ0lDQWdkR2h5YjNjZ1pYSnlPMXh1SUNBZ0lIMHBPMXh1SUNCOVhHNTlYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRk5yWlhSamFFMWhibUZuWlhJN1hHNGlMQ0pwYlhCdmNuUWdVMnRsZEdOb1RXRnVZV2RsY2lCbWNtOXRJQ2N1TDJOdmNtVXZVMnRsZEdOb1RXRnVZV2RsY2ljN1hHNXBiWEJ2Y25RZ1VHRndaWEpUYVhwbGN5Qm1jbTl0SUNjdUwzQmhjR1Z5TFhOcGVtVnpKenRjYm1sdGNHOXlkQ0I3SUdkbGRFTnNhV1Z1ZEVGUVNTd2daR1ZtYVc1bFpDQjlJR1p5YjIwZ0p5NHZkWFJwYkNjN1hHNWNibU52Ym5OMElFTkJRMGhGSUQwZ0oyaHZkQzFwWkMxallXTm9aU2M3WEc1amIyNXpkQ0J5ZFc1MGFXMWxRMjlzYkdsemFXOXVjeUE5SUZ0ZE8xeHVYRzVtZFc1amRHbHZiaUJwYzBodmRGSmxiRzloWkNBb0tTQjdYRzRnSUdOdmJuTjBJR05zYVdWdWRDQTlJR2RsZEVOc2FXVnVkRUZRU1NncE8xeHVJQ0J5WlhSMWNtNGdZMnhwWlc1MElDWW1JR05zYVdWdWRDNW9iM1E3WEc1OVhHNWNibVoxYm1OMGFXOXVJR05oWTJobFIyVjBJQ2hwWkNrZ2UxeHVJQ0JqYjI1emRDQmpiR2xsYm5RZ1BTQm5aWFJEYkdsbGJuUkJVRWtvS1R0Y2JpQWdhV1lnS0NGamJHbGxiblFwSUhKbGRIVnliaUIxYm1SbFptbHVaV1E3WEc0Z0lHTnNhV1Z1ZEZ0RFFVTklSVjBnUFNCamJHbGxiblJiUTBGRFNFVmRJSHg4SUh0OU8xeHVJQ0J5WlhSMWNtNGdZMnhwWlc1MFcwTkJRMGhGWFZ0cFpGMDdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHTmhZMmhsVUhWMElDaHBaQ3dnWkdGMFlTa2dlMXh1SUNCamIyNXpkQ0JqYkdsbGJuUWdQU0JuWlhSRGJHbGxiblJCVUVrb0tUdGNiaUFnYVdZZ0tDRmpiR2xsYm5RcElISmxkSFZ5YmlCMWJtUmxabWx1WldRN1hHNGdJR05zYVdWdWRGdERRVU5JUlYwZ1BTQmpiR2xsYm5SYlEwRkRTRVZkSUh4OElIdDlPMXh1SUNCamJHbGxiblJiUTBGRFNFVmRXMmxrWFNBOUlHUmhkR0U3WEc1OVhHNWNibVoxYm1OMGFXOXVJR2RsZEZScGJXVlFjbTl3SUNodmJHUk5ZVzVoWjJWeUxDQnVaWGRUWlhSMGFXNW5jeWtnZTF4dUlDQXZMeUJUZEdGMGFXTWdjMnRsZEdOb1pYTWdhV2R1YjNKbElIUm9aU0IwYVcxbElIQmxjbk5wYzNSbGJtTjVYRzRnSUhKbGRIVnliaUJ1WlhkVFpYUjBhVzVuY3k1aGJtbHRZWFJsSUQ4Z2V5QjBhVzFsT2lCdmJHUk5ZVzVoWjJWeUxuQnliM0J6TG5ScGJXVWdmU0E2SUhWdVpHVm1hVzVsWkR0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWTJGdWRtRnpVMnRsZEdOb0lDaHphMlYwWTJnc0lITmxkSFJwYm1keklEMGdlMzBwSUh0Y2JpQWdhV1lnS0hObGRIUnBibWR6TG5BMUtTQjdYRzRnSUNBZ2FXWWdLSE5sZEhScGJtZHpMbU5oYm5aaGN5QjhmQ0FvYzJWMGRHbHVaM011WTI5dWRHVjRkQ0FtSmlCMGVYQmxiMllnYzJWMGRHbHVaM011WTI5dWRHVjRkQ0FoUFQwZ0ozTjBjbWx1WnljcEtTQjdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb1lFbHVJSHNnY0RVZ2ZTQnRiMlJsTENCNWIzVWdZMkZ1SjNRZ2NHRnpjeUI1YjNWeUlHOTNiaUJqWVc1MllYTWdiM0lnWTI5dWRHVjRkQ3dnZFc1c1pYTnpJSFJvWlNCamIyNTBaWGgwSUdseklHRWdYQ0ozWldKbmJGd2lJRzl5SUZ3aU1tUmNJaUJ6ZEhKcGJtZGdLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQXZMeUJFYnlCdWIzUWdZM0psWVhSbElHRWdZMkZ1ZG1GeklHOXVJSE4wWVhKMGRYQXNJSE5wYm1ObElGQTFMbXB6SUdSdlpYTWdkR2hoZENCbWIzSWdkWE5jYmlBZ0lDQmpiMjV6ZENCamIyNTBaWGgwSUQwZ2RIbHdaVzltSUhObGRIUnBibWR6TG1OdmJuUmxlSFFnUFQwOUlDZHpkSEpwYm1jbklEOGdjMlYwZEdsdVozTXVZMjl1ZEdWNGRDQTZJR1poYkhObE8xeHVJQ0FnSUhObGRIUnBibWR6SUQwZ1QySnFaV04wTG1GemMybG5iaWg3ZlN3Z2MyVjBkR2x1WjNNc0lIc2dZMkZ1ZG1Gek9pQm1ZV3h6WlN3Z1kyOXVkR1Y0ZENCOUtUdGNiaUFnZlZ4dVhHNGdJR052Ym5OMElHbHpTRzkwSUQwZ2FYTkliM1JTWld4dllXUW9LVHRjYmlBZ2JHVjBJR2h2ZEVsRU8xeHVJQ0JwWmlBb2FYTkliM1FwSUh0Y2JpQWdJQ0F2THlCVmMyVWdZU0J0WVdkcFl5QnVZVzFsSUdKNUlHUmxabUYxYkhRc0lHWnZjbU5sSUhWelpYSWdkRzhnWkdWbWFXNWxJR1ZoWTJnZ2MydGxkR05vSUdsbUlIUm9aWGxjYmlBZ0lDQXZMeUJ5WlhGMWFYSmxJRzF2Y21VZ2RHaGhiaUJ2Ym1VZ2FXNGdZVzRnWVhCd2JHbGpZWFJwYjI0dUlFOXdaVzRnZEc4Z2IzUm9aWElnYVdSbFlYTWdiMjRnYUc5M0lIUnZJSFJoWTJ0c1pWeHVJQ0FnSUM4dklIUm9hWE1nWVhNZ2QyVnNiQzR1TGx4dUlDQWdJR2h2ZEVsRUlEMGdaR1ZtYVc1bFpDaHpaWFIwYVc1bmN5NXBaQ3dnSnlSZlgwUkZSa0ZWVEZSZlEwRk9Wa0ZUWDFOTFJWUkRTRjlKUkY5ZkpDY3BPMXh1SUNCOVhHNGdJR3hsZENCcGMwbHVhbVZqZEdsdVp5QTlJR2x6U0c5MElDWW1JSFI1Y0dWdlppQm9iM1JKUkNBOVBUMGdKM04wY21sdVp5YzdYRzVjYmlBZ2FXWWdLR2x6U1c1cVpXTjBhVzVuSUNZbUlISjFiblJwYldWRGIyeHNhWE5wYjI1ekxtbHVZMngxWkdWektHaHZkRWxFS1NrZ2UxeHVJQ0FnSUdOdmJuTnZiR1V1ZDJGeWJpaGdWMkZ5Ym1sdVp6b2dXVzkxSUdoaGRtVWdiWFZzZEdsd2JHVWdZMkZzYkhNZ2RHOGdZMkZ1ZG1GelUydGxkR05vS0NrZ2FXNGdMUzFvYjNRZ2JXOWtaUzRnV1c5MUlHMTFjM1FnY0dGemN5QjFibWx4ZFdVZ2V5QnBaQ0I5SUhOMGNtbHVaM01nYVc0Z2MyVjBkR2x1WjNNZ2RHOGdaVzVoWW14bElHaHZkQ0J5Wld4dllXUWdZV055YjNOeklHMTFiSFJwY0d4bElITnJaWFJqYUdWekxpQmdMQ0JvYjNSSlJDazdYRzRnSUNBZ2FYTkpibXBsWTNScGJtY2dQU0JtWVd4elpUdGNiaUFnZlZ4dVhHNGdJR3hsZENCd2NtVnNiMkZrSUQwZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0NrN1hHNWNiaUFnYVdZZ0tHbHpTVzVxWldOMGFXNW5LU0I3WEc0Z0lDQWdMeThnVFdGeWF5QjBhR2x6SUdGeklHRnNjbVZoWkhrZ2MzQnZkSFJsWkNCcGJpQjBhR2x6SUhKMWJuUnBiV1VnYVc1emRHRnVZMlZjYmlBZ0lDQnlkVzUwYVcxbFEyOXNiR2x6YVc5dWN5NXdkWE5vS0dodmRFbEVLVHRjYmx4dUlDQWdJR052Ym5OMElIQnlaWFpwYjNWelJHRjBZU0E5SUdOaFkyaGxSMlYwS0dodmRFbEVLVHRjYmlBZ0lDQnBaaUFvY0hKbGRtbHZkWE5FWVhSaEtTQjdYRzRnSUNBZ0lDQmpiMjV6ZENCdVpYaDBJRDBnS0NrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0F2THlCSGNtRmlJRzVsZHlCd2NtOXdjeUJtY205dElHOXNaQ0J6YTJWMFkyZ2dhVzV6ZEdGdVkyVmNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2JtVjNVSEp2Y0hNZ1BTQm5aWFJVYVcxbFVISnZjQ2h3Y21WMmFXOTFjMFJoZEdFdWJXRnVZV2RsY2l3Z2MyVjBkR2x1WjNNcE8xeHVJQ0FnSUNBZ0lDQXZMeUJFWlhOMGNtOTVJSFJvWlNCdmJHUWdhVzV6ZEdGdVkyVmNiaUFnSUNBZ0lDQWdjSEpsZG1sdmRYTkVZWFJoTG0xaGJtRm5aWEl1WkdWemRISnZlU2dwTzF4dUlDQWdJQ0FnSUNBdkx5QlFZWE56SUdGc2IyNW5JRzVsZHlCd2NtOXdjMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdibVYzVUhKdmNITTdYRzRnSUNBZ0lDQjlPMXh1WEc0Z0lDQWdJQ0F2THlCTmIzWmxJR0ZzYjI1bklIUm9aU0J1WlhoMElHUmhkR0V1TGk1Y2JpQWdJQ0FnSUhCeVpXeHZZV1FnUFNCd2NtVjJhVzkxYzBSaGRHRXViRzloWkM1MGFHVnVLRzVsZUhRcExtTmhkR05vS0c1bGVIUXBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQndjbVZzYjJGa0xuUm9aVzRvYm1WM1VISnZjSE1nUFQ0Z2UxeHVJQ0FnSUdOdmJuTjBJRzFoYm1GblpYSWdQU0J1WlhjZ1UydGxkR05vVFdGdVlXZGxjaWdwTzF4dUlDQWdJR3hsZENCeVpYTjFiSFE3WEc0Z0lDQWdhV1lnS0hOclpYUmphQ2tnZTF4dUlDQWdJQ0FnTHk4Z1RXVnlaMlVnZDJsMGFDQnBibU52YldsdVp5QmtZWFJoWEc0Z0lDQWdJQ0J6WlhSMGFXNW5jeUE5SUU5aWFtVmpkQzVoYzNOcFoyNG9lMzBzSUhObGRIUnBibWR6TENCdVpYZFFjbTl3Y3lrN1hHNWNiaUFnSUNBZ0lDOHZJRUZ3Y0d4NUlITmxkSFJwYm1keklHRnVaQ0JqY21WaGRHVWdZU0JqWVc1MllYTmNiaUFnSUNBZ0lHMWhibUZuWlhJdWMyVjBkWEFvYzJWMGRHbHVaM01wTzF4dVhHNGdJQ0FnSUNBdkx5Qk5iM1Z1ZENCMGJ5QkVUMDFjYmlBZ0lDQWdJRzFoYm1GblpYSXViVzkxYm5Rb0tUdGNibHh1SUNBZ0lDQWdMeThnYkc5aFpDQjBhR1VnYzJ0bGRHTm9JR1pwY25OMFhHNGdJQ0FnSUNCeVpYTjFiSFFnUFNCdFlXNWhaMlZ5TG14dllXUkJibVJTZFc0b2MydGxkR05vS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjbVZ6ZFd4MElEMGdVSEp2YldselpTNXlaWE52YkhabEtHMWhibUZuWlhJcE8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2FYTkpibXBsWTNScGJtY3BJSHRjYmlBZ0lDQWdJR05oWTJobFVIVjBLR2h2ZEVsRUxDQjdJR3h2WVdRNklISmxjM1ZzZEN3Z2JXRnVZV2RsY2lCOUtUdGNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSEpsYzNWc2REdGNiaUFnZlNrN1hHNTlYRzVjYmk4dklGUlBSRTg2SUVacFozVnlaU0J2ZFhRZ1lTQnVhV05sSUhkaGVTQjBieUJsZUhCdmNuUWdkR2hwYm1kekxseHVZMkZ1ZG1GelUydGxkR05vTG1OaGJuWmhjMU5yWlhSamFDQTlJR05oYm5aaGMxTnJaWFJqYUR0Y2JtTmhiblpoYzFOclpYUmphQzVRWVhCbGNsTnBlbVZ6SUQwZ1VHRndaWEpUYVhwbGN6dGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdZMkZ1ZG1GelUydGxkR05vTzF4dUlsMHNJbTVoYldWeklqcGJJbWRzYjJKaGJDSXNJbXhsZENJc0ltRnlaM1Z0Wlc1MGN5SXNJbWx6UkU5Tklpd2lhWE5CY21kMWJXVnVkSE1pTENKdlltcGxZM1JMWlhseklpd2laR1ZtYVc1bElpd2lkR2hwY3lJc0luSmxjR1ZoZENJc0ltTnZibk4wSWl3aVlYTnphV2R1SWl3aVpHVm1hVzVsWkNJc0ltTnZiblpsY25SRWFYTjBZVzVqWlNJc0ltZGxkRU5oYm5aaGMwTnZiblJsZUhRaUxDSnlhV2RvZEU1dmR5SXNJbWx6VUhKdmJXbHpaU0lzSW1SbFpYQkZjWFZoYkNJc0lsQmhjR1Z5VTJsNlpYTWlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenREUVVGQk96czdPenM3UTBGUlFTeEpRVUZKTEhGQ1FVRnhRaXhIUVVGSExFMUJRVTBzUTBGQlF5eHhRa0ZCY1VJc1EwRkJRenREUVVONlJDeEpRVUZKTEdOQlFXTXNSMEZCUnl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExHTkJRV01zUTBGQlF6dERRVU55UkN4SlFVRkpMR2RDUVVGblFpeEhRVUZITEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc2IwSkJRVzlDTEVOQlFVTTdPME5CUlRkRUxGTkJRVk1zVVVGQlVTeERRVUZETEVkQlFVY3NSVUZCUlR0RlFVTjBRaXhKUVVGSkxFZEJRVWNzUzBGQlN5eEpRVUZKTEVsQlFVa3NSMEZCUnl4TFFVRkxMRk5CUVZNc1JVRkJSVHRIUVVOMFF5eE5RVUZOTEVsQlFVa3NVMEZCVXl4RFFVRkRMSFZFUVVGMVJDeERRVUZETEVOQlFVTTdSMEZETjBVN08wVkJSVVFzVDBGQlR5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1JVRkRia0k3TzBOQlJVUXNVMEZCVXl4bFFVRmxMRWRCUVVjN1JVRkRNVUlzU1VGQlNUdEhRVU5JTEVsQlFVa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hGUVVGRk8wbEJRMjVDTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJJN096czdPMGRCUzBRc1NVRkJTU3hMUVVGTExFZEJRVWNzU1VGQlNTeE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNN1IwRkRPVUlzUzBGQlN5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenRIUVVOb1FpeEpRVUZKTEUxQlFVMHNRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhIUVVGSExFVkJRVVU3U1VGRGFrUXNUMEZCVHl4TFFVRkxMRU5CUVVNN1NVRkRZanM3TzBkQlIwUXNTVUZCU1N4TFFVRkxMRWRCUVVjc1JVRkJSU3hEUVVGRE8wZEJRMllzUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExFVkJRVVVzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0SlFVTTFRaXhMUVVGTExFTkJRVU1zUjBGQlJ5eEhRVUZITEUxQlFVMHNRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZEZUVNN1IwRkRSQ3hKUVVGSkxFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTXNiVUpCUVcxQ0xFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRlZCUVZVc1EwRkJReXhGUVVGRk8wbEJReTlFTEU5QlFVOHNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wbEJRMmhDTEVOQlFVTXNRMEZCUXp0SFFVTklMRWxCUVVrc1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTXNTMEZCU3l4WlFVRlpMRVZCUVVVN1NVRkRja01zVDBGQlR5eExRVUZMTEVOQlFVTTdTVUZEWWpzN08wZEJSMFFzU1VGQlNTeExRVUZMTEVkQlFVY3NSVUZCUlN4RFFVRkRPMGRCUTJZc2MwSkJRWE5DTEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF5eFZRVUZWTEUxQlFVMHNSVUZCUlR0SlFVTXhSQ3hMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVkQlFVY3NUVUZCVFN4RFFVRkRPMGxCUTNaQ0xFTkJRVU1zUTBGQlF6dEhRVU5JTEVsQlFVa3NUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEZRVUZGTEVOQlFVTTdTMEZEYUVRc2MwSkJRWE5DTEVWQlFVVTdTVUZEZWtJc1QwRkJUeXhMUVVGTExFTkJRVU03U1VGRFlqczdSMEZGUkN4UFFVRlBMRWxCUVVrc1EwRkJRenRIUVVOYUxFTkJRVU1zVDBGQlR5eEhRVUZITEVWQlFVVTdPMGRCUldJc1QwRkJUeXhMUVVGTExFTkJRVU03UjBGRFlqdEZRVU5FT3p0RFFVVkVMR2RDUVVGakxFZEJRVWNzWlVGQlpTeEZRVUZGTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVUwc1IwRkJSeXhWUVVGVkxFMUJRVTBzUlVGQlJTeE5RVUZOTEVWQlFVVTdSVUZET1VVc1NVRkJTU3hKUVVGSkxFTkJRVU03UlVGRFZDeEpRVUZKTEVWQlFVVXNSMEZCUnl4UlFVRlJMRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03UlVGRE1VSXNTVUZCU1N4UFFVRlBMRU5CUVVNN08wVkJSVm9zUzBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExGTkJRVk1zUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1IwRkRNVU1zU1VGQlNTeEhRVUZITEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6czdSMEZGTlVJc1MwRkJTeXhKUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVWQlFVVTdTVUZEY2tJc1NVRkJTU3hqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1JVRkJSVHRMUVVOdVF5eEZRVUZGTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzB0QlEzQkNPMGxCUTBRN08wZEJSVVFzU1VGQlNTeHhRa0ZCY1VJc1JVRkJSVHRKUVVNeFFpeFBRVUZQTEVkQlFVY3NjVUpCUVhGQ0xFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEZEVNc1MwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRTlCUVU4c1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdTMEZEZUVNc1NVRkJTU3huUWtGQlowSXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZPMDFCUXpWRExFVkJRVVVzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1RVRkRiRU03UzBGRFJEdEpRVU5FTzBkQlEwUTdPMFZCUlVRc1QwRkJUeXhGUVVGRkxFTkJRVU03UlVGRFZpeERRVUZET3pzN096czdPenREUTNwR1JpeFhRVUZqTzBkQlExcEJMR05CUVUwc1EwRkJReXhYUVVGWE8wZEJRMnhDUVN4alFVRk5MRU5CUVVNc1YwRkJWeXhEUVVGRExFZEJRVWNzUjBGQlJ5eFRRVUZUTEVkQlFVY3NSMEZCUnp0TFFVTjBReXhQUVVGUExGZEJRVmNzUTBGQlF5eEhRVUZITEVWQlFVVTdTVUZEZWtJc1IwRkJSeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEZOQlFWTXNSMEZCUnl4SFFVRkhPMHRCUXpkQ0xFOUJRVThzUTBGQlF5eEpRVUZKTEVsQlFVazdTVUZEYWtJN08wTkRUa2dzWlVGQll5eEhRVUZITEZOQlFWTXNRMEZCUXpzN1EwRkZNMElzVTBGQlV5eFRRVUZUTEVOQlFVTXNSMEZCUnl4RlFVRkZPMGRCUTNSQ0xFOUJRVThzUTBGQlF5eERRVUZETEVkQlFVY3NTMEZCU3l4UFFVRlBMRWRCUVVjc1MwRkJTeXhSUVVGUkxFbEJRVWtzVDBGQlR5eEhRVUZITEV0QlFVc3NWVUZCVlN4RFFVRkRMRWxCUVVrc1QwRkJUeXhIUVVGSExFTkJRVU1zU1VGQlNTeExRVUZMTEZWQlFWVXNRMEZCUXp0RlFVTXhSenM3UTBOS1JDeFRRVUZqTEVkQlFVY3NUMEZCVFRzN1EwRkZka0lzVTBGQlV5eE5RVUZOTEVWQlFVVXNSMEZCUnl4RlFVRkZPMGRCUTNCQ0xFOUJRVThzUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4UFFVRlBMRWRCUVVjc1MwRkJTeXhSUVVGUk8wOUJRMjVETEV0QlFVczdUMEZEVEN4RFFVRkRMRTlCUVU4c1RVRkJUU3hMUVVGTExGRkJRVkVzU1VGQlNTeFBRVUZQTEUxQlFVMHNRMEZCUXl4SlFVRkpMRXRCUVVzc1VVRkJVVHRWUVVNelJDeEhRVUZITEZsQlFWa3NUVUZCVFN4RFFVRkRMRWxCUVVrN1UwRkRNMElzUTBGQlF5eFBRVUZQTEVkQlFVY3NRMEZCUXl4UlFVRlJMRXRCUVVzc1VVRkJVVHRWUVVOb1F5eFBRVUZQTEVkQlFVY3NRMEZCUXl4UlFVRlJMRXRCUVVzc1VVRkJVU3hEUVVGRE8wVkJRM3BET3p0RFEweE5MRk5CUVZNc1pVRkJaMEk3UzBGRE9VSXNUMEZCVHl4UFFVRlBMRTFCUVZBc1MwRkJhMElzVjBGQmJFSXNTVUZCYVVNc1RVRkJRU3hEUVVGUE96czdRVUZIYWtRc1EwRkJUeXhUUVVGVExGVkJRVmM3T3p0TFFVTjZRaXhMUVVGTFF5eEpRVUZKTEVsQlFVa3NSVUZCUnl4RFFVRkJMRWRCUVVrc1UwRkJRU3hEUVVGVkxGRkJRVkVzUTBGQlFTeEpRVUZMTzFOQlEzcERMRWxCUVVsRExGZEJRVUVzUTBGQlZTeEZRVUZXTEVsQlFXZENMRTFCUVUwN1lVRkRlRUlzVDBGQlQwRXNWMEZCUVN4RFFVRlZPenM3UzBGSGNrSXNUMEZCVHpzN08wRkJSMVFzUTBGQlR5eFRRVUZUTEZsQlFXRTdTMEZETTBJc1QwRkJUeXhQUVVGUExGRkJRVkFzUzBGQmIwSTdPenRCUVVjM1FpeERRVUZQTEZOQlFWTXNaVUZCWjBJc1MwRkJTenRMUVVOdVF5eFBRVUZQTEU5QlFVOHNSMEZCUVN4RFFVRkpMRXRCUVZnc1MwRkJjVUlzVlVGQmNrSXNTVUZCYlVNc1QwRkJUeXhIUVVGQkxFTkJRVWtzVlVGQldDeExRVUV3UWl4VlFVRTNSQ3hKUVVFeVJTeFBRVUZQTEVkQlFVRXNRMEZCU1N4VlFVRllMRXRCUVRCQ096czdRVUZIT1Vjc1EwRkJUeXhUUVVGVExGTkJRVlVzVTBGQlV6dExRVU5xUXl4UFFVRlBReXhMUVVGQkxFTkJRVTBzVVVGQlRpeEpRVUZyUWl4VFFVRkJMRU5CUVZVc1NVRkJWaXhEUVVGbExFOUJRVUVzUTBGQlVTeFRRVUY2UXl4SlFVRnpSQ3hQUVVGUExFOUJRVUVzUTBGQlVTeFZRVUZtTEV0QlFUaENPenM3TzBORE1VSTNSaXhQUVVGUExFZEJRVWNzWTBGQll5eEhRVUZITEU5QlFVOHNUVUZCVFN4RFFVRkRMRWxCUVVrc1MwRkJTeXhWUVVGVk8wdEJRM2hFTEUxQlFVMHNRMEZCUXl4SlFVRkpMRWRCUVVjc1NVRkJTU3hEUVVGRE96dERRVVYyUWl4WlFVRlpMRWRCUVVjc1NVRkJTU3hEUVVGRE8wTkJRM0JDTEZOQlFWTXNTVUZCU1N4RlFVRkZMRWRCUVVjc1JVRkJSVHRIUVVOc1FpeEpRVUZKTEVsQlFVa3NSMEZCUnl4RlFVRkZMRU5CUVVNN1IwRkRaQ3hMUVVGTExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzBkQlEzQkRMRTlCUVU4c1NVRkJTU3hEUVVGRE8wVkJRMkk3T3pzN08wTkRVa1FzU1VGQlNTeHpRa0ZCYzBJc1IwRkJSeXhEUVVGRExGVkJRVlU3UjBGRGRFTXNUMEZCVHl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRPMFZCUTJwRUxFZEJRVWNzU1VGQlNTeHZRa0ZCYjBJc1EwRkJRenM3UTBGRk4wSXNUMEZCVHl4SFFVRkhMR05CUVdNc1IwRkJSeXh6UWtGQmMwSXNSMEZCUnl4VFFVRlRMRWRCUVVjc1YwRkJWeXhEUVVGRE96dERRVVUxUlN4cFFrRkJhVUlzUjBGQlJ5eFRRVUZUTEVOQlFVTTdRMEZET1VJc1UwRkJVeXhUUVVGVExFTkJRVU1zVFVGQlRTeEZRVUZGTzBkQlEzcENMRTlCUVU4c1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhKUVVGSkxHOUNRVUZ2UWl4RFFVRkRPMFZCUTNaRk8wTkJSVVFzYlVKQlFXMUNMRWRCUVVjc1YwRkJWeXhEUVVGRE8wTkJRMnhETEZOQlFWTXNWMEZCVnl4RFFVRkRMRTFCUVUwc1EwRkJRenRIUVVNeFFpeFBRVUZQTEUxQlFVMDdTMEZEV0N4UFFVRlBMRTFCUVUwc1NVRkJTU3hSUVVGUk8wdEJRM3BDTEU5QlFVOHNUVUZCVFN4RFFVRkRMRTFCUVUwc1NVRkJTU3hSUVVGUk8wdEJRMmhETEUxQlFVMHNRMEZCUXl4VFFVRlRMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNVVUZCVVN4RFFVRkRPMHRCUTNSRUxFTkJRVU1zVFVGQlRTeERRVUZETEZOQlFWTXNRMEZCUXl4dlFrRkJiMElzUTBGQlF5eEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRkZCUVZFc1EwRkJRenRMUVVNM1JDeExRVUZMTEVOQlFVTTdSVUZEVkRzN096czdRME51UWtRc1NVRkJTU3hOUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZETEZOQlFWTXNRMEZCUXl4TFFVRkxMRU5CUVVNN096czdRMEZKYmtNc1NVRkJTU3hUUVVGVExFZEJRVWNzWTBGQll5eEhRVUZITEZWQlFWVXNUVUZCVFN4RlFVRkZMRkZCUVZFc1JVRkJSU3hKUVVGSkxFVkJRVVU3UjBGRGFrVXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hKUVVGSkxFZEJRVWNzUlVGQlJTeERRVUZET3p0SFFVVnlRaXhKUVVGSkxFMUJRVTBzUzBGQlN5eFJRVUZSTEVWQlFVVTdTMEZEZGtJc1QwRkJUeXhKUVVGSkxFTkJRVU03TzBsQlJXSXNUVUZCVFN4SlFVRkpMRTFCUVUwc1dVRkJXU3hKUVVGSkxFbEJRVWtzVVVGQlVTeFpRVUZaTEVsQlFVa3NSVUZCUlR0TFFVTTNSQ3hQUVVGUExFMUJRVTBzUTBGQlF5eFBRVUZQTEVWQlFVVXNTMEZCU3l4UlFVRlJMRU5CUVVNc1QwRkJUeXhGUVVGRkxFTkJRVU03T3pzN1NVRkphRVFzVFVGQlRTeEpRVUZKTEVOQlFVTXNUVUZCVFN4SlFVRkpMRU5CUVVNc1VVRkJVU3hKUVVGSkxFOUJRVThzVFVGQlRTeEpRVUZKTEZGQlFWRXNTVUZCU1N4UFFVRlBMRkZCUVZFc1NVRkJTU3hSUVVGUkxFVkJRVVU3UzBGRE0wWXNUMEZCVHl4SlFVRkpMRU5CUVVNc1RVRkJUU3hIUVVGSExFMUJRVTBzUzBGQlN5eFJRVUZSTEVkQlFVY3NUVUZCVFN4SlFVRkpMRkZCUVZFc1EwRkJRenM3T3pzN096czdTVUZSTDBRc1RVRkJUVHRMUVVOTUxFOUJRVThzVVVGQlVTeERRVUZETEUxQlFVMHNSVUZCUlN4UlFVRlJMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03U1VGRGVrTTdSMEZEUmpzN1EwRkZSQ3hUUVVGVExHbENRVUZwUWl4RFFVRkRMRXRCUVVzc1JVRkJSVHRIUVVOb1F5eFBRVUZQTEV0QlFVc3NTMEZCU3l4SlFVRkpMRWxCUVVrc1MwRkJTeXhMUVVGTExGTkJRVk1zUTBGQlF6dEZRVU01UXpzN1EwRkZSQ3hUUVVGVExGRkJRVkVzUlVGQlJTeERRVUZETEVWQlFVVTdSMEZEY0VJc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeFBRVUZQTEVOQlFVTXNTMEZCU3l4UlFVRlJMRWxCUVVrc1QwRkJUeXhEUVVGRExFTkJRVU1zVFVGQlRTeExRVUZMTEZGQlFWRXNSVUZCUlN4UFFVRlBMRXRCUVVzc1EwRkJRenRIUVVNNVJTeEpRVUZKTEU5QlFVOHNRMEZCUXl4RFFVRkRMRWxCUVVrc1MwRkJTeXhWUVVGVkxFbEJRVWtzVDBGQlR5eERRVUZETEVOQlFVTXNTMEZCU3l4TFFVRkxMRlZCUVZVc1JVRkJSVHRMUVVOcVJTeFBRVUZQTEV0QlFVc3NRMEZCUXp0SlFVTmtPMGRCUTBRc1NVRkJTU3hEUVVGRExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNTVUZCU1N4UFFVRlBMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUzBGQlN5eFJRVUZSTEVWQlFVVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1IwRkRNMFFzVDBGQlR5eEpRVUZKTEVOQlFVTTdSVUZEWWpzN1EwRkZSQ3hUUVVGVExGRkJRVkVzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSVHRIUVVNMVFpeEpRVUZKTEVOQlFVTXNSVUZCUlN4SFFVRkhMRU5CUVVNN1IwRkRXQ3hKUVVGSkxHbENRVUZwUWl4RFFVRkRMRU5CUVVNc1EwRkJReXhKUVVGSkxHbENRVUZwUWl4RFFVRkRMRU5CUVVNc1EwRkJRenRMUVVNNVF5eFBRVUZQTEV0QlFVc3NRMEZCUXpzN1IwRkZaaXhKUVVGSkxFTkJRVU1zUTBGQlF5eFRRVUZUTEV0QlFVc3NRMEZCUXl4RFFVRkRMRk5CUVZNc1JVRkJSU3hQUVVGUExFdEJRVXNzUTBGQlF6czdPMGRCUnpsRExFbEJRVWxETEZsQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSVHRMUVVOc1FpeEpRVUZKTEVOQlFVTkJMRmxCUVZjc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJUdFBRVU51UWl4UFFVRlBMRXRCUVVzc1EwRkJRenROUVVOa08wdEJRMFFzUTBGQlF5eEhRVUZITEUxQlFVMHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UzBGRGJrSXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTMEZEYmtJc1QwRkJUeXhUUVVGVExFTkJRVU1zUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVNNVFqdEhRVU5FTEVsQlFVa3NVVUZCVVN4RFFVRkRMRU5CUVVNc1EwRkJReXhGUVVGRk8wdEJRMllzU1VGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRU5CUVVNc1JVRkJSVHRQUVVOb1FpeFBRVUZQTEV0QlFVc3NRMEZCUXp0TlFVTmtPMHRCUTBRc1NVRkJTU3hEUVVGRExFTkJRVU1zVFVGQlRTeExRVUZMTEVOQlFVTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1QwRkJUeXhMUVVGTExFTkJRVU03UzBGRGVFTXNTMEZCU3l4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8wOUJRemRDTEVsQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4UFFVRlBMRXRCUVVzc1EwRkJRenROUVVOcVF6dExRVU5FTEU5QlFVOHNTVUZCU1N4RFFVRkRPMGxCUTJJN1IwRkRSQ3hKUVVGSk8wdEJRMFlzU1VGQlNTeEZRVUZGTEVkQlFVZERMRWxCUVZVc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGJFSXNSVUZCUlN4SFFVRkhRU3hKUVVGVkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTVUZEZUVJc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJUdExRVU5XTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJRN096dEhRVWRFTEVsQlFVa3NSVUZCUlN4RFFVRkRMRTFCUVUwc1NVRkJTU3hGUVVGRkxFTkJRVU1zVFVGQlRUdExRVU40UWl4UFFVRlBMRXRCUVVzc1EwRkJRenM3UjBGRlppeEZRVUZGTEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNN1IwRkRWaXhGUVVGRkxFTkJRVU1zU1VGQlNTeEZRVUZGTEVOQlFVTTdPMGRCUlZZc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETEUxQlFVMHNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0TFFVTnVReXhKUVVGSkxFVkJRVVVzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRE8wOUJRMmhDTEU5QlFVOHNTMEZCU3l4RFFVRkRPMGxCUTJoQ096czdSMEZIUkN4TFFVRkxMRU5CUVVNc1IwRkJSeXhGUVVGRkxFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzB0QlEyNURMRWRCUVVjc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTMEZEV2l4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEVWQlFVVXNUMEZCVHl4TFFVRkxMRU5CUVVNN1NVRkRjRVE3UjBGRFJDeFBRVUZQTEU5QlFVOHNRMEZCUXl4TFFVRkxMRTlCUVU4c1EwRkJReXhEUVVGRE8wVkJRemxDT3pzN08wTkROMFpFT3pzN096czdPenM3T3pzN096dERRV05CTEVOQlFVTXNVMEZCVXl4TlFVRk5MRVZCUVVVN08wZEJSMmhDTEVsQlFVa3NWVUZCVlN4SFFVRkhMRU5CUVVNc1YwRkJWenRQUVVONlFpeEpRVUZKTEV0QlFVc3NSMEZCUnl4clJVRkJhMFVzUTBGQlF6dFBRVU12UlN4SlFVRkpMRkZCUVZFc1IwRkJSeXh6U1VGQmMwa3NRMEZCUXp0UFFVTjBTaXhKUVVGSkxGbEJRVmtzUjBGQlJ5eGhRVUZoTEVOQlFVTTdPenRQUVVkcVF5eFBRVUZQTEZWQlFWVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGT3pzN1UwRkhja01zU1VGQlNTeFRRVUZUTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1NVRkJTU3hOUVVGTkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NVVUZCVVN4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlR0WFFVTXpSU3hKUVVGSkxFZEJRVWNzU1VGQlNTeERRVUZETzFkQlExb3NTVUZCU1N4SFFVRkhMRk5CUVZNc1EwRkJRenRWUVVOc1FqczdVMEZGUkN4SlFVRkpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFbEJRVWtzU1VGQlNTeERRVUZET3p0VFFVVjRRaXhIUVVGSExFVkJRVVVzU1VGQlNTeFpRVUZaTEVsQlFVa3NRMEZCUXl4RlFVRkZPMWRCUXpGQ0xFbEJRVWtzUjBGQlJ5eEpRVUZKTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRWUVVOMlFqczdVMEZGUkN4SlFVRkpMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUlVGQlJUdFhRVU5tTEUxQlFVMHNVMEZCVXl4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRE8xVkJRMnBET3p0VFFVVkVMRWxCUVVrc1IwRkJSeXhOUVVGTkxFTkJRVU1zVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hKUVVGSkxFbEJRVWtzVlVGQlZTeERRVUZETEV0QlFVc3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRE96czdVMEZITjBVc1NVRkJTU3hUUVVGVExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhEUVVGRExFTkJRVU03VTBGRGFrTXNTVUZCU1N4VFFVRlRMRXRCUVVzc1RVRkJUU3hKUVVGSkxGTkJRVk1zUzBGQlN5eE5RVUZOTEVWQlFVVTdWMEZEYUVRc1NVRkJTU3hIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1YwRkRja0lzUjBGQlJ5eEhRVUZITEVsQlFVa3NRMEZCUXp0WFFVTllMRWxCUVVrc1UwRkJVeXhMUVVGTExFMUJRVTBzUlVGQlJUdGhRVU40UWl4SFFVRkhMRWRCUVVjc1NVRkJTU3hEUVVGRE8xbEJRMW83VlVGRFJqczdVMEZGUkN4SlFVRkpMRU5CUVVNc1IwRkJSeXhIUVVGSExFZEJRVWNzVVVGQlVTeEhRVUZITEV0QlFVc3NRMEZCUXp0VFFVTXZRaXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXl4SFFVRkhMRTFCUVUwc1EwRkJReXhGUVVGRkxFTkJRVU03VTBGRE0wSXNTVUZCU1N4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNSVUZCUlN4RFFVRkRPMU5CUXpGQ0xFbEJRVWtzUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRExFVkJRVVVzUTBGQlF6dFRRVU0xUWl4SlFVRkpMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEZWQlFWVXNRMEZCUXl4RlFVRkZMRU5CUVVNN1UwRkRMMElzU1VGQlNTeERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETzFOQlF6VkNMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF5eERRVUZETEVkQlFVY3NVMEZCVXl4RFFVRkRMRVZCUVVVc1EwRkJRenRUUVVNNVFpeEpRVUZKTEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJReXhIUVVGSExGTkJRVk1zUTBGQlF5eEZRVUZGTEVOQlFVTTdVMEZET1VJc1NVRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4alFVRmpMRU5CUVVNc1JVRkJSU3hEUVVGRE8xTkJRMjVETEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEdsQ1FVRnBRaXhGUVVGRkxFTkJRVU03VTBGRE0wTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFOQlEzUkNMRWxCUVVrc1EwRkJReXhIUVVGSExGbEJRVmtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0VFFVTXpRaXhKUVVGSkxFdEJRVXNzUjBGQlJ6dFhRVU5XTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWRCUTFBc1JVRkJSU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdWMEZEV2l4SFFVRkhMRWRCUVVjc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWRCUTJwRExFbEJRVWtzUlVGQlJTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETzFkQlEzSkRMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF6dFhRVU5ZTEVWQlFVVXNTVUZCU1N4SFFVRkhMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dFhRVU5vUWl4SFFVRkhMRWRCUVVjc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWRCUTI1RExFbEJRVWtzUlVGQlJTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRlZCUVZVc1EwRkJReXhEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzFkQlEzaERMRVZCUVVVc1NVRkJTU3hOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1EwRkJRenRYUVVONFFpeEpRVUZKTEVWQlFVVXNRMEZCUXp0WFFVTlFMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVTdWMEZEYkVJc1JVRkJSU3hKUVVGSkxFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVc1EwRkJRenRYUVVOMlFpeERRVUZETEV0QlFVc3NRMEZCUXp0WFFVTlFMRVZCUVVVc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETzFkQlExb3NRMEZCUXl4TFFVRkxMRU5CUVVNN1YwRkRVQ3hGUVVGRkxFbEJRVWtzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0WFFVTmFMRU5CUVVNc1MwRkJTeXhEUVVGRE8xZEJRMUFzUlVGQlJTeEpRVUZKTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1YwRkRXaXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNN1YwRkRaaXhEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eERRVUZETzFkQlF6ZENMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUlVGQlJTeEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF6dFhRVU14UlN4RlFVRkZMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU03VjBGRE1VVXNRMEZCUXl4TFFVRkxMRU5CUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWNzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRE8xZEJRekZGTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExGVkJRVlVzUTBGQlF5eEpRVUZKTEVOQlFVTXNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJRenRYUVVNeFJTeERRVUZETEV0QlFVc3NSMEZCUnl4SFFVRkhMRXRCUVVzc1IwRkJSeXhIUVVGSExFZEJRVWNzUzBGQlN5eEhRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFZEJRVWNzUlVGQlJTeERRVUZETEU5QlFVOHNRMEZCUXl4WlFVRlpMRVZCUVVVc1JVRkJSU3hEUVVGRE8xZEJRM2hITEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFZEJRVWNzUjBGQlJ5eEhRVUZITEVkQlFVY3NTVUZCU1N4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1YwRkRla1lzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhEUVVGRExFZEJRVWNzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RFFVRkRMRWRCUVVjc1JVRkJSU3hEUVVGRE8xZEJRMnhHTEVOQlFVTXNTMEZCU3l4RFFVRkRPMWRCUTFBc1EwRkJReXhMUVVGTExFTkJRVU03VlVGRFVpeERRVUZET3p0VFFVVkdMRTlCUVU4c1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVVXNWVUZCVlN4TFFVRkxMRVZCUVVVN1YwRkRNVU1zU1VGQlNTeExRVUZMTEVsQlFVa3NTMEZCU3l4RlFVRkZPMkZCUTJ4Q0xFOUJRVThzUzBGQlN5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPMWxCUTNKQ08xZEJRMFFzVDBGQlR5eExRVUZMTEVOQlFVTXNTMEZCU3l4RFFVRkRMRU5CUVVNc1JVRkJSU3hMUVVGTExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMVZCUTNwRExFTkJRVU1zUTBGQlF6dFJRVU5LTEVOQlFVTTdUVUZEU0N4SFFVRkhMRU5CUVVNN08wZEJSVkFzVlVGQlZTeERRVUZETEV0QlFVc3NSMEZCUnp0TFFVTnFRaXhUUVVGVExHZENRVUZuUWl3d1FrRkJNRUk3UzBGRGJrUXNWMEZCVnl4alFVRmpMRkZCUVZFN1MwRkRha01zV1VGQldTeGhRVUZoTEdGQlFXRTdTMEZEZEVNc1ZVRkJWU3hsUVVGbExHTkJRV003UzBGRGRrTXNWVUZCVlN4bFFVRmxMRzlDUVVGdlFqdExRVU0zUXl4WFFVRlhMR05CUVdNc1UwRkJVenRMUVVOc1F5eFpRVUZaTEdGQlFXRXNXVUZCV1R0TFFVTnlReXhWUVVGVkxHVkJRV1VzWTBGQll6dExRVU4yUXl4VFFVRlRMR2RDUVVGblFpeFpRVUZaTzB0QlEzSkRMRk5CUVZNc1owSkJRV2RDTEZWQlFWVTdTMEZEYmtNc1lVRkJZU3haUVVGWkxEQkNRVUV3UWp0TFFVTnVSQ3huUWtGQlowSXNVMEZCVXl4clEwRkJhME03UzBGRE0wUXNjVUpCUVhGQ0xFbEJRVWtzTmtKQlFUWkNPMGxCUTNaRUxFTkJRVU03T3p0SFFVZEdMRlZCUVZVc1EwRkJReXhKUVVGSkxFZEJRVWM3UzBGRGFFSXNVVUZCVVN4RlFVRkZPMDlCUTFJc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzUzBGQlN6dFBRVU12UXl4UlFVRlJMRVZCUVVVc1VVRkJVU3hGUVVGRkxGTkJRVk1zUlVGQlJTeFhRVUZYTEVWQlFVVXNWVUZCVlN4RlFVRkZMRkZCUVZFc1JVRkJSU3hWUVVGVk8wMUJRemRGTzB0QlEwUXNWVUZCVlN4RlFVRkZPMDlCUTFZc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkZMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUlN4TFFVRkxMRVZCUVVVc1MwRkJTeXhGUVVGRkxFdEJRVXNzUlVGQlJTeExRVUZMTzA5QlEyeEdMRk5CUVZNc1JVRkJSU3hWUVVGVkxFVkJRVVVzVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlN4TFFVRkxMRVZCUVVVc1RVRkJUU3hGUVVGRkxFMUJRVTBzUlVGQlJTeFJRVUZSTEVWQlFVVXNWMEZCVnl4RlFVRkZMRk5CUVZNc1JVRkJSU3hWUVVGVkxFVkJRVVVzVlVGQlZUdE5RVU42U0R0TFFVTkVMRk5CUVZNc1JVRkJSVHRQUVVOVUxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpPMDFCUXpORE8wbEJRMFlzUTBGQlF6czdRMEZGU2l4VFFVRlRMRWRCUVVjc1EwRkJReXhIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTzBkQlEzSkNMRWRCUVVjc1IwRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdSMEZEYkVJc1IwRkJSeXhIUVVGSExFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdSMEZEWml4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFZEJRVWNzUjBGQlJ5eEZRVUZGTzB0QlEzWkNMRWRCUVVjc1IwRkJSeXhIUVVGSExFZEJRVWNzUjBGQlJ5eERRVUZETzBsQlEycENPMGRCUTBRc1QwRkJUeXhIUVVGSExFTkJRVU03UlVGRFdqczdPenM3T3pzN096dERRVlZFTEZOQlFWTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJSVHM3UjBGRmNrSXNTVUZCU1N4alFVRmpMRWRCUVVjc1NVRkJTU3hKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NSVUZCUlN4RlFVRkZMRWxCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVVzUlVGQlJTeEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRU5CUVVNc1EwRkJRenM3TzBkQlIyNUdMR05CUVdNc1EwRkJReXhQUVVGUExFTkJRVU1zWTBGQll5eERRVUZETEU5QlFVOHNSVUZCUlN4SlFVRkpMRU5CUVVNc1kwRkJZeXhEUVVGRExFMUJRVTBzUlVGQlJTeEhRVUZITEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6czdPMGRCUnpOR0xFbEJRVWtzWVVGQllTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMR05CUVdNc1EwRkJReXhYUVVGWExFVkJRVVVzUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXl4RFFVRkRMRU5CUVVNN096dEhRVWRxUlN4aFFVRmhMRU5CUVVNc1QwRkJUeXhEUVVGRExHRkJRV0VzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMR0ZCUVdFc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03T3p0SFFVZDRSaXhKUVVGSkxFVkJRVVVzUjBGQlJ5eGpRVUZqTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVVzUjBGQlJ5eGhRVUZoTEVOQlFVTXNhVUpCUVdsQ0xFVkJRVVVzUTBGQlF6dEhRVU5vUml4alFVRmpMRU5CUVVNc1VVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eFJRVUZSTEVWQlFVVXNSMEZCUnl4RlFVRkZMRU5CUVVNc1EwRkJRenM3TzBkQlIzaEVMRWxCUVVrc1VVRkJVU3hIUVVGSExFTkJRVU1zWTBGQll5eEhRVUZITEdGQlFXRXNTMEZCU3l4UlFVRlJMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UjBGREwwUXNUMEZCVHl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0RlFVTnFRenM3T3pzN096czdPME5CVTBRc1UwRkJVeXhaUVVGWkxFTkJRVU1zU1VGQlNTeEZRVUZGTzBkQlF6RkNMRWxCUVVrc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0SFFVTjRRaXhIUVVGSExFZEJRVWNzUzBGQlN5eERRVUZETEVWQlFVVTdTMEZEV2l4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRMVE3UjBGRFJDeFBRVUZQTEVkQlFVY3NRMEZCUXp0RlFVTmFPenM3T3pzN08wTkJUMFFzVTBGQlV5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RlFVRkZPMGRCUTI1Q0xFbEJRVWtzUjBGQlJ5eExRVUZMTEVsQlFVa3NSVUZCUlR0TFFVTm9RaXhQUVVGUExFMUJRVTBzUTBGQlF6dEpRVU5tT3p0SFFVVkVMRWxCUVVrc1IwRkJSeXhMUVVGTExGTkJRVk1zUlVGQlJUdExRVU55UWl4UFFVRlBMRmRCUVZjc1EwRkJRenRKUVVOd1FqczdSMEZGUkN4SlFVRkpMRTlCUVU4c1IwRkJSeXhMUVVGTExGRkJRVkVzUlVGQlJUdExRVU16UWl4UFFVRlBMRTlCUVU4c1IwRkJSeXhEUVVGRE8wbEJRMjVDT3p0SFFVVkVMRWxCUVVrc1MwRkJTeXhEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlR0TFFVTjBRaXhQUVVGUExFOUJRVThzUTBGQlF6dEpRVU5vUWpzN1IwRkZSQ3hQUVVGUExFVkJRVVVzUTBGQlF5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJRenROUVVONlFpeExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdSVUZETDBJN096dEhRVWxETEVsQlFVa3NUMEZCVDBNc1UwRkJUU3hMUVVGTExGVkJRVlVzU1VGQlNVRXNVMEZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSVHRMUVVNNVEwRXNVMEZCVFN4RFFVRkRMRmxCUVZrN1QwRkRha0lzVDBGQlR5eFZRVUZWTEVOQlFVTTdUVUZEYmtJc1EwRkJReXhEUVVGRE8wbEJRMG9zVFVGQlRTeEJRVUZwUXp0TFFVTjBReXhqUVVGakxFZEJRVWNzVlVGQlZTeERRVUZETzBsQlF6ZENMRUZCUlVFN1JVRkRSaXhGUVVGRlF5eGpRVUZKTEVOQlFVTXNRMEZCUXpzN08wTkRjRTlVT3pzN096czdPenM3T3p0RFFXRkJMRWxCUVVrc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF6dERRVU5pTEVsQlFVa3NTMEZCU3l4RFFVRkRPenM3T3pzN1EwRk5WaXhuUWtGQll5eEhRVUZITEUxQlFVMHNRMEZCUXpzN096czdPenM3T3pzN096czdPenM3T3pzN1EwRnZRbmhDTEZOQlFWTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVU3UjBGRGVFSXNTVUZCU1N4UFFVRlBMRWRCUVVjc1MwRkJTeXhSUVVGUkxFVkJRVVU3UzBGRE0wSXNUVUZCVFN4SlFVRkpMRk5CUVZNc1EwRkJReXh0UWtGQmJVSXNRMEZCUXl4RFFVRkRPMGxCUXpGRE96czdSMEZIUkN4SlFVRkpMRWRCUVVjc1MwRkJTeXhEUVVGRExFVkJRVVVzVDBGQlR5eEhRVUZITEVOQlFVTTdSMEZETVVJc1NVRkJTU3hIUVVGSExFdEJRVXNzUTBGQlF5eEZRVUZGTEU5QlFVOHNSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJRenM3UjBGRmFFTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExFMUJRVTBzUjBGQlJ5eEhRVUZITEVOQlFVTTdSMEZETTBJc1NVRkJTU3hMUVVGTExFdEJRVXNzUjBGQlJ5eEpRVUZKTEU5QlFVOHNTMEZCU3l4TFFVRkxMRmRCUVZjc1JVRkJSVHRMUVVOcVJDeExRVUZMTEVkQlFVY3NSMEZCUnl4RFFVRkRPMHRCUTFvc1IwRkJSeXhIUVVGSExFVkJRVVVzUTBGQlF6dEpRVU5XTEUxQlFVMHNTVUZCU1N4SFFVRkhMRU5CUVVNc1RVRkJUU3hKUVVGSkxFZEJRVWNzUlVGQlJUdExRVU0xUWl4UFFVRlBMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGxCUXpOQ096dEhRVVZFTEU5QlFVOHNSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJReXhOUVVGTkxFbEJRVWtzUjBGQlJ5eEhRVUZITEVOQlFVTXNSVUZCUlR0TFFVTnNReXhKUVVGSkxFZEJRVWNzUjBGQlJ5eERRVUZETEVWQlFVVTdUMEZEV0N4SFFVRkhMRWxCUVVrc1IwRkJSeXhEUVVGRE8wMUJRMW83TzB0QlJVUXNSMEZCUnl4TFFVRkxMRU5CUVVNc1EwRkJRenRMUVVOV0xFZEJRVWNzU1VGQlNTeEhRVUZITEVOQlFVTTdTVUZEV2pzN1IwRkZSQ3hIUVVGSExFbEJRVWtzUjBGQlJ5eERRVUZETzBkQlExZ3NSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMGRCUTNwQ0xFOUJRVThzUjBGQlJ5eERRVUZETzBWQlExbzdPME5ETVVSRUxGZEJRV01zUjBGQlJ5eFRRVUZUTEU5QlFVOHNRMEZCUXl4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFVkJRVVVzUlVGQlJUdEhRVU01UXl4SFFVRkhMRWRCUVVjc1IwRkJSeXhEUVVGRExGRkJRVkVzUlVGQlJTeERRVUZET3p0SFFVVnlRaXhKUVVGSkxFOUJRVThzUjBGQlJ5eExRVUZMTEZkQlFWY3NSVUZCUlR0TFFVTTVRaXhQUVVGUExFZEJRVWNzUTBGQlF6dEpRVU5hT3p0SFFVVkVMRWxCUVVrc1JVRkJSU3hMUVVGTExFTkJRVU1zUlVGQlJUdExRVU5hTEVWQlFVVXNSMEZCUnl4SFFVRkhMRU5CUVVNN1NVRkRWaXhOUVVGTkxFbEJRVWtzUlVGQlJTeEZRVUZGTzB0QlEySXNSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJReXhSUVVGUkxFVkJRVVVzUTBGQlF6dEpRVU53UWl4TlFVRk5PMHRCUTB3c1JVRkJSU3hIUVVGSExFZEJRVWNzUTBGQlF6dEpRVU5XT3p0SFFVVkVMRTlCUVU5RExGbEJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNSMEZCUnl4SFFVRkhMRWRCUVVjc1EwRkJReXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTTdSVUZETTBNc1EwRkJRenM3UTBOMFFrWkRMRWxCUVUwc2JVSkJRVTg3UTBGRFlsSXNTVUZCU1R0RFFVTktRU3hKUVVGSkxHTkJRV003UzBGQlJTeFhRVUZYTEVWQlFXSTdTMEZCYVVJc1VVRkJVU3hGUVVGNlFqdExRVUUyUWl4UlFVRlJPenREUVZGMlJGRXNTVUZCVFN4eFFrRkJjVUlzUTBGRGVrSXNXVUZEUVN4aFFVTkJPME5CUjBZc1UwRkJVeXhQUVVGUkxFOUJRVk1zUlVGQlFTeE5RVUZYTzJkRFFVRllMRWRCUVU4N08wdEJReTlDTEU5QlFVOHNTVUZCU1N4UFFVRktMRmRCUVdFc1QwRkJVeXhGUVVGQkxGRkJRVlk3VTBGRGFrSXNTVUZCUVN4SFFVRlBReXhaUVVGQkxFTkJRVThzU1VGQlNTeGhRVUZoTzFOQlF5OUNSQ3hKUVVGTkxGZEJRVmNzWlVGQlFTeERRVUZuUWl4TlFVRkJMRU5CUVU4c1RVRkJVQ3hEUVVGakxFbEJRVWtzVFVGQlRUdGhRVU4yUkN4WFFVRlhMRVZCUkRSRE8yRkJSWFpFTEU5QlFVODdPMU5CUlZSQkxFbEJRVTBzVDBGQlR5eFBRVUZCTEVkQlFWVXNaMEpCUVdkQ08xTkJRM1pEUVN4SlFVRk5MRk5CUVZNc1dVRkJRVHRUUVVObUxFbEJRVWtzVFVGQlFTeEpRVUZWTEUxQlFVRXNRMEZCVHl4TlFVRnFRaXhKUVVFeVFpeFBRVUZQTEUxQlFVRXNRMEZCVHl4TFFVRmtMRXRCUVhkQ0xGbEJRVms3WVVGRGFrVXNUMEZCVHl4TlFVRkJMRU5CUVU4c1MwRkJVQ3hEUVVGaFF5eFpRVUZCTEVOQlFVOHNTVUZCU1N4TlFVRk5PekpDUVVGRk8yZENRVUZvUXl4RFFVTktMRWxCUkVrc1YwRkRReXhoUVVGTkxFOUJRVUVzUTBGQlVUdG5Ra0ZEYWtJN1lVRkRUQ3hQUVVGUExFOUJRVUVzUTBGQlVUc3lRa0ZCUlN4UlFVRkdPMmxDUVVGWkxGRkJRVkU3T3pzN096dEJRVXQ2UXl4RFFVRlBMRk5CUVZNc1dVRkJZU3hOUVVGWE8yZERRVUZZTEVkQlFVODdPMHRCUTJ4RExFOUJRVThzVFVGQlFTeERRVUZQTEUxQlFVMDdPenRCUVVkMFFpeERRVUZQTEZOQlFWTXNWVUZCVnl4TlFVRlhPMmREUVVGWUxFZEJRVTg3TzB0QlEyaERMRTlCUVU4c1RVRkJRU3hEUVVGUExFOUJRVTg3T3p0QlFVZDJRaXhEUVVGUExGTkJRVk1zWVVGQll5eE5RVUZSTEVWQlFVRXNTMEZCVlRzNFFrRkJWaXhIUVVGTk96dExRVU14UTBRc1NVRkJUU3hYUVVGWExFZEJRVUVzUTBGQlNTeFJRVUZLTEVsQlFXZENPMHRCUTJwRExFbEJRVWtzUTBGQlF5eHJRa0ZCUVN4RFFVRnRRaXhSUVVGdVFpeERRVUUwUWp0WFFVRlhMRTFCUVUwc1NVRkJTU3hMUVVGS0xDdENRVUZ4UXp0TFFVTjJSbElzU1VGQlNTeGhRVUZoTEZGQlFVRXNRMEZCVXl4TFFVRlVMRU5CUVdVc1NVRkJaaXhEUVVGdlFpeEZRVUZ3UWl4SlFVRXdRaXhKUVVGSkxFOUJRUzlDTEVOQlFYVkRMRk5CUVZNN1MwRkRhRVVzU1VGQlNUdFhRVUZYTEZOQlFVRXNSMEZCV1N4UFFVRkpMRmRCUVZrc1YwRkJhRUk3UzBGRE0wSXNUMEZCVHp0dlFrRkRUQ3hUUVVSTE8xTkJSVXdzVFVGQlRTeFJRVVpFTzFOQlIwd3NVMEZCVXl4TlFVRkJMRU5CUVU4c1UwRkJVQ3hEUVVGcFFpeFZRVUZWTEVkQlFVRXNRMEZCU1RzN096dERRVWsxUXl4VFFVRlRMSE5DUVVGMVFpeFRRVUZUTzB0QlEzWkRMRTlCUVU4c1NVRkJTU3hQUVVGS0xGZEJRV0U3VTBGRGJFSlJMRWxCUVUwc1lVRkJZU3hQUVVGQkxFTkJRVkVzVDBGQlVpeERRVUZuUWp0VFFVTnVReXhKUVVGSkxGVkJRVUVzUzBGQlpTeERRVUZETEVkQlFVYzdZVUZEY2tJc1QwRkJRU3hEUVVGUkxFbEJRVWtzVFVGQlFTeERRVUZQTEVsQlFWZzdZVUZEVWpzN1UwRkZSa0VzU1VGQlRTeFRRVUZUTEU5QlFVRXNRMEZCVVN4TFFVRlNMRU5CUVdNc1ZVRkJRU3hIUVVGaE8xTkJRekZEUVN4SlFVRk5MR0ZCUVdFc1RVRkJRU3hEUVVGUExFbEJRVkFzUTBGQldUdFRRVU12UWtFc1NVRkJUU3hQUVVGUExFOUJRVUVzUTBGQlVTeExRVUZTTEVOQlFXTXNSMEZCUnp0VFFVTTVRa0VzU1VGQlRTeFpRVUZaTEdOQlFVRXNRMEZCWlN4SlFVRm1MRU5CUVc5Q08xTkJRM1JEUVN4SlFVRk5MRkZCUVZFc1UwRkJRU3hIUVVGWkxGTkJRVUVzUTBGQlZTeExRVUZMTEU5QlFVODdVMEZEYUVSQkxFbEJRVTBzUzBGQlN5eEpRVUZKTEZkQlFVb3NRMEZCWjBJc1ZVRkJRU3hEUVVGWE8xTkJRM1JEUVN4SlFVRk5MRXRCUVVzc1NVRkJTU3hWUVVGS0xFTkJRV1U3VTBGRE1VSXNTMEZCU3l4SlFVRkpMRWxCUVVrc1JVRkJSeXhEUVVGQkxFZEJRVWtzVlVGQlFTeERRVUZYTEZGQlFWRXNRMEZCUVN4SlFVRkxPMkZCUXpGRExFVkJRVUVzUTBGQlJ5eEZRVUZJTEVkQlFWRXNWVUZCUVN4RFFVRlhMRlZCUVZnc1EwRkJjMEk3TzFOQlJXaERMRTlCUVVFc1EwRkJVU3hKUVVGSkxFMUJRVUVzUTBGQlR5eEpRVUZZTEVOQlFXZENMRU5CUVVVc1MwRkJUVHRoUVVGRkxFMUJRVTA3T3pzN08wRkJTVFZETEVOQlFVOHNVMEZCVXl4WlFVRmhMRTlCUVZNc1JVRkJRU3hOUVVGWE8yZERRVUZZTEVkQlFVODdPMHRCUXpORExFOUJRVThzY1VKQlFVRXNRMEZCYzBJc1VVRkJkRUlzUTBGRFNpeEpRVVJKTEZkQlEwTXNaVUZCVVN4UlFVRkJMRU5CUVZNc1RVRkJUVHM3TzBGQlIycERMRU5CUVU4c1UwRkJVeXhUUVVGVkxFbEJRVTBzUlVGQlFTeE5RVUZYTzJkRFFVRllMRWRCUVU4N08wdEJRM0pETEU5QlFVOHNTVUZCU1N4UFFVRktMRmRCUVZrN1UwRkRha0lzU1VGQlFTeEhRVUZQUXl4WlFVRkJMRU5CUVU4c1NVRkJTU3hoUVVGaE8xTkJReTlDUkN4SlFVRk5MRmRCUVZjc1NVRkJRU3hEUVVGTE8xTkJSWFJDUVN4SlFVRk5MRk5CUVZNc1dVRkJRVHRUUVVObUxFbEJRVWtzVFVGQlFTeEpRVUZWTEU5QlFVOHNUVUZCUVN4RFFVRlBMRkZCUVdRc1MwRkJNa0lzVlVGQmNrTXNTVUZCYlVRc1RVRkJRU3hEUVVGUExGRkJRVkU3WVVGRmNFVXNUMEZCVHl4TlFVRkJMRU5CUVU4c1VVRkJVQ3hEUVVGblFpeE5RVUZOUXl4WlFVRkJMRU5CUVU4c1NVRkJTU3hOUVVGTk96SkNRVUZGTzJkQ1FVRjZReXhEUVVOS0xFbEJSRWtzVjBGRFF5eGhRVUZOTEU5QlFVRXNRMEZCVVR0blFrRkRha0k3WVVGRlRDeEpRVUZKTEVOQlFVTXNUVUZCVFR0cFFrRkRWQ3hKUVVGQkxFZEJRVThzVVVGQlFTeERRVUZUTEdGQlFWUXNRMEZCZFVJN2FVSkJRemxDTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1ZVRkJXQ3hIUVVGM1FqdHBRa0ZEZUVJc1NVRkJRU3hEUVVGTExFMUJRVXdzUjBGQll6czdZVUZGYUVJc1NVRkJRU3hEUVVGTExGRkJRVXdzUjBGQlowSTdZVUZEYUVJc1NVRkJRU3hEUVVGTExFbEJRVXdzUjBGQldTeE5RVUZCTEVOQlFVOHNSMEZCVUN4RFFVRlhMR1ZCUVZnc1EwRkJNa0k3WVVGRGRrTXNVVUZCUVN4RFFVRlRMRWxCUVZRc1EwRkJZeXhYUVVGa0xFTkJRVEJDTzJGQlF6RkNMRWxCUVVFc1EwRkJTeXhQUVVGTUxHZENRVUZsTzJsQ1FVTmlMRWxCUVVFc1EwRkJTeXhQUVVGTUxFZEJRV1U3YVVKQlEyWXNWVUZCUVN4aFFVRlhPM0ZDUVVOVUxFMUJRVUVzUTBGQlR5eEhRVUZRTEVOQlFWY3NaVUZCV0N4RFFVRXlRanR4UWtGRE0wSXNTVUZCU1N4SlFVRkJMRU5CUVVzN01rSkJRV1VzU1VGQlFTeERRVUZMTEdGQlFVd3NRMEZCYlVJc1YwRkJia0lzUTBGQkswSTdjVUpCUTNaRUxFbEJRVUVzUTBGQlN5eGxRVUZNTEVOQlFYRkNPM0ZDUVVOeVFpeFBRVUZCTEVOQlFWRTdiVU5CUVVVc1VVRkJSanQ1UWtGQldTeFJRVUZST3pzN08yRkJSMmhETEVsQlFVRXNRMEZCU3l4TFFVRk1PenM3T3p0QlFVdE9MRU5CUVU4c1UwRkJVeXhUUVVGVkxFbEJRVTBzUlVGQlFTeE5RVUZYTzJkRFFVRllMRWRCUVU4N08wdEJRM0pEUkN4SlFVRk5MRkZCUVZFc1MwRkJRU3hEUVVGTkxFOUJRVTRzUTBGQll5eExRVUZrTEVkQlFYTkNMRTlCUVU4c1EwRkJSVHRMUVVNM1EwRXNTVUZCVFN4UFFVRlBMRWxCUVVrc1RVRkJRU3hEUVVGUExFbEJRVmdzUTBGQlowSXNUMEZCVHp0VFFVRkZMRTFCUVUwc1NVRkJRU3hEUVVGTExFbEJRVXdzU1VGQllUczdTMEZEZWtRc1QwRkJUeXhSUVVGQkxFTkJRVk1zVFVGQlRUczdPMEZCUjNoQ0xFTkJRVThzVTBGQlV5eGxRVUZuUWp0TFFVTTVRa0VzU1VGQlRTeG5Ra0ZCWjBJN1MwRkRkRUlzVDBGQlR5eFZRVUZCTEVOQlFWY3NTVUZCU1N4SlFVRktMRWxCUVZrN096dEJRVk5vUXl4RFFVRlBMRk5CUVZNc1owSkJRV2xDTEV0QlFWVTdPRUpCUVZZc1IwRkJUVHM3UzBGRGNrTXNSMEZCUVN4SFFVRk5ReXhaUVVGQkxFTkJRVThzU1VGQlNUdExRVWRxUWl4SlFVRkpMRTlCUVU4c1IwRkJRU3hEUVVGSkxFbEJRVmdzUzBGQmIwSXNXVUZCV1R0VFFVTnNReXhQUVVGUExFZEJRVUVzUTBGQlNTeEpRVUZLTEVOQlFWTTdXVUZEV0N4SlFVRkpMRWRCUVVFc1EwRkJTU3hOUVVGTk8xTkJRMjVDTEU5QlFVOHNSMEZCUVN4RFFVRkpPenRMUVVkaVZDeEpRVUZKTEZGQlFWRTdTMEZEV2tFc1NVRkJTU3haUVVGWk8wdEJRMmhDTEVsQlFVa3NUMEZCVHl4SFFVRkJMRU5CUVVrc1UwRkJXQ3hMUVVGNVFqdFhRVUZWTEZOQlFVRXNSMEZCV1N4SFFVRkJMRU5CUVVrN1MwRkZka1FzU1VGQlNTeFBRVUZQTEVkQlFVRXNRMEZCU1N4TFFVRllMRXRCUVhGQ0xGVkJRVlU3VTBGRGFrTkJMRWxCUVVrN1UwRkRTaXhKUVVGSkxFOUJRVThzUjBGQlFTeERRVUZKTEZkQlFWZ3NTMEZCTWtJc1ZVRkJWVHRoUVVOMlF5eFhRVUZCTEVkQlFXTXNSMEZCUVN4RFFVRkpPMmRDUVVOaU8yRkJRMHdzVjBGQlFTeEhRVUZqTEVsQlFVRXNRMEZCU3l4SFFVRk1MRU5CUVZNc1QwRkJUeXhIUVVGQkxFTkJRVWs3TzFOQlJYQkRMRXRCUVVFc1IwRkJVU3hQUVVGQkxFTkJRVkVzVFVGQlFTeERRVUZQTEVkQlFVRXNRMEZCU1N4UlFVRlJMRTFCUVVFc1EwRkJUeXhaUVVGUUxFTkJRVzlDTEZGQlFWRTdPMHRCUjJwRlVTeEpRVUZOTEZkQlFWY3NVVUZCUVN4RFFVRlRMRWRCUVVFc1EwRkJTU3haUVVGaUxFbEJRVFpDTEZGQlFVRXNRMEZCVXl4SFFVRkJMRU5CUVVrc1RVRkJNVU1zU1VGQmIwUXNSMEZCUVN4RFFVRkpMRmRCUVVvc1IwRkJhMElzUTBGQmRFVXNWVUZCTmtVc1IwRkJRU3hEUVVGSkxGVkJRVlU3UzBGRE5VY3NTVUZCU1N4TFFVRkJMRWxCUVZNc1RVRkJUVHRUUVVOcVFpeFBRVUZQTEVOQlFVVXNVMEZCVlN4TlFVRmFMRU5CUVc5Q0xFMUJRWEJDTEVOQlFUSkNMRkZCUVROQ0xFTkJRVzlETEVsQlFYQkRMRU5CUVhsRExFbEJRWHBETEVkQlFXZEVPMWxCUTJ4RU8xTkJRMHhCTEVsQlFVMHNhMEpCUVd0Q0xFZEJRVUVzUTBGQlNUdFRRVU0xUWl4UFFVRlBMRU5CUVVVc1IwRkJRU3hEUVVGSkxFOUJRVkVzUjBGQlFTeERRVUZKTEVsQlFVb3NTVUZCV1N4blFrRkJhVUlzVTBGQlZTeEhRVUZCTEVOQlFVa3NTMEZCVFN4SFFVRkJMRU5CUVVrc1QwRkJia1VzUTBGQk5FVXNUVUZCTlVVc1EwRkJiVVlzVVVGQmJrWXNRMEZCTkVZc1NVRkJOVVlzUTBGQmFVY3NTVUZCYWtjc1IwRkJkMGM3T3pzN1EwTndTMjVJUVN4SlFVRk5MR05CUVdNN1MwRkRiRUlzVjBGQlZ5eFpRVVJQTzB0QlJXeENMRlZCUVZVc1UwRkdVVHRMUVVkc1FpeFhRVUZYTEZOQlNFODdTMEZKYkVJc1RVRkJUU3hQUVVwWk8wdEJTMnhDTEVsQlFVa3NTVUZNWXp0TFFVMXNRaXhaUVVGWkxGZEJUazA3UzBGUGJFSXNVMEZCVXl4TlFWQlRPMHRCVVd4Q0xHTkJRV003TzBOQlNXaENRU3hKUVVGTkxGVkJRVlVzUTBGRFpDeGhRVUZqTEZGQlFWTXNaMEpCUVdsQ0xHTkJRM2hETzB0QlFXTXNZMEZCWlN4UlFVRlRMR0ZCUTNSRExHMUNRVUZ2UWl4blFrRkJhVUk3UzBGRGNrTXNaVUZCWjBJc1kwRkJaU3hUUVVGVkxGVkJRVmNzWVVGRGNFUXNVMEZCVlR0TFFVRlJMRTlCUVZFc1UwRkJWU3hUUVVGVkxGVkJRVmNzVlVGRGVrUXNUMEZCVVN4WFFVRlpPMHRCUVdVc1RVRkJUeXhsUVVGblFpeFpRVU14UkN4UlFVRlRMRTlCUVZFc1VVRkJVeXhaUVVGaE8wdEJRVmNzUzBGQlRTeExRVU40UkN4dlFrRkJjVUlzVDBGQlVTeFRRVUZWTEZkQlFWazdRVUZMY2tRc1EwRkJUMEVzU1VGQlRTd3dRa0ZCYVVJN1MwRkROVUpCTEVsQlFVMHNUMEZCVHl4TlFVRkJMRU5CUVU4c1NVRkJVQ3hEUVVGWk8wdEJRM3BDTEVsQlFVRXNRMEZCU3l4UFFVRk1MRmRCUVdFN1UwRkRXQ3hKUVVGSkxFZEJRVUVzU1VGQlR5eGhRVUZoTzJGQlEzUkNRU3hKUVVGTkxGTkJRVk1zVjBGQlFTeERRVUZaTzJGQlF6TkNMRTlCUVVFc1EwRkJVU3hKUVVGU0xIbEVRVUZwUlN3NFFrRkJkVUk3WjBKQlEyNUdMRWxCUVVrc1EwRkJReXhQUVVGQkxFTkJRVkVzVVVGQlVpeERRVUZwUWl4TlFVRk5PMkZCUTJwRExFOUJRVUVzUTBGQlVTeEpRVUZTTEhsRVFVRnBSVHM3T3pzN1EwTXZRbmhFTERSQ1FVRlZMRXRCUVZVN09FSkJRVllzUjBGQlRUczdTMEZETjBKQkxFbEJRVTBzYjBKQlFWVTdVMEZEWkN4SlFVRkpMRU5CUVVNc1IwRkJRU3hEUVVGSkxFOUJRVW83WlVGQlpUdFRRVVZ3UWtFc1NVRkJUU3hUUVVGVExGbEJRVUU3VTBGRFppeEpRVUZKTEVWQlFVRXNRMEZCUnl4UFFVRklMRXRCUVdVc1JVRkJaaXhKUVVGeFFpeERRVUZETEVWQlFVRXNRMEZCUnl4TlFVRjZRaXhMUVVGdlF5eEZRVUZCTEVOQlFVY3NUMEZCU0N4SlFVRmpMRVZCUVVFc1EwRkJSeXhWUVVGVk8yRkJSV3BGTEVWQlFVRXNRMEZCUnl4alFVRklPMkZCUTBFc1IwRkJRU3hEUVVGSkxFbEJRVW9zUTBGQlV6dG5Ra0ZEU2l4SlFVRkpMRVZCUVVFc1EwRkJSeXhQUVVGSUxFdEJRV1VzU1VGQlNUdGhRVWMxUWl4SFFVRkJMRU5CUVVrc1ZVRkJTaXhEUVVGbE8yZENRVU5XTEVsQlFVa3NUVUZCUVN4SlFVRlZMRU5CUVVNc1JVRkJRU3hEUVVGSExFMUJRV1FzU1VGQmQwSXNSVUZCUVN4RFFVRkhMRTlCUVVnc1MwRkJaU3hGUVVGMlF5eExRVUU0UXl4RlFVRkJMRU5CUVVjc1QwRkJTQ3hKUVVGakxFVkJRVUVzUTBGQlJ5eFZRVUZWTzJGQlJXeEdMRVZCUVVFc1EwRkJSeXhqUVVGSU8yRkJRMEVzUjBGQlFTeERRVUZKTEUxQlFVb3NRMEZCVnpzN08wdEJTV1pCTEVsQlFVMHNjVUpCUVZNN1UwRkRZaXhOUVVGQkxFTkJRVThzWjBKQlFWQXNRMEZCZDBJc1YwRkJWenM3UzBGSGNrTkJMRWxCUVUwc2NVSkJRVk03VTBGRFlpeE5RVUZCTEVOQlFVOHNiVUpCUVZBc1EwRkJNa0lzVjBGQlZ6czdTMEZIZUVNc1QwRkJUenRwUWtGRFRDeE5RVVJMTzJsQ1FVVk1PenM3TzBORGFFTktRU3hKUVVGTkxHVkJRV1U3UTBGRmNrSkJMRWxCUVUwc1QwRkJUeXhEUVVkWUxFTkJRVVVzVjBGQldTeE5RVUZQTEU5QlEzSkNMRU5CUVVVc1pVRkJaMElzU1VGQlN5eExRVU4yUWl4RFFVRkZMRk5CUVZVc1NVRkJTenRMUVVOcVFpeERRVUZGTEdWQlFXZENMRWxCUVVzc1MwRkRka0lzUTBGQlJTeG5Ra0ZCYVVJc1MwRkJUU3hOUVVkNlFpeERRVUZGTEV0QlFVMHNSMEZCU1N4SlFVTmFMRU5CUVVVc1MwRkJUU3hIUVVGSk8wdEJRMW9zUTBGQlJTeExRVUZOTEVsQlFVc3NTMEZEWWl4RFFVRkZMRXRCUVUwc1NVRkJTeXhMUVVOaUxFTkJRVVVzUzBGQlRTeEpRVUZMTEV0QlEySXNRMEZCUlN4TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRkxFMUJRVThzU1VGQlN5eExRVU5rTEVOQlFVVTdTMEZCVHl4SlFVRkxMRXRCUTJRc1EwRkJSU3hOUVVGUExFbEJRVXNzUzBGSFpDeERRVUZGTEV0QlFVMHNTVUZCU3l4TlFVTmlMRU5CUVVVc1MwRkJUU3hKUVVGTExFdEJRMklzUTBGQlJTeExRVUZOTEVsQlFVc3NTMEZEWWl4RFFVRkZPMHRCUVUwc1NVRkJTeXhMUVVOaUxFTkJRVVVzUzBGQlRTeEpRVUZMTEV0QlEySXNRMEZCUlN4TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRkxFdEJRVTBzU1VGQlN5eExRVU5pTEVOQlFVVXNTMEZCVFN4SFFVRkpMRXRCUTFvc1EwRkJSU3hMUVVGTk8wdEJRVWtzU1VGRFdpeERRVUZGTEV0QlFVMHNSMEZCU1N4SlFVTmFMRU5CUVVVc1RVRkJUeXhIUVVGSkxFbEJRMklzUTBGQlJTeE5RVUZQTEV0QlFVMHNUVUZEWml4RFFVRkZMRTFCUVU4c1MwRkJUU3hOUVVObUxFTkJRVVVzUzBGQlRUdExRVUZOTEUxQlEyUXNRMEZCUlN4TFFVRk5MRWxCUVVzc1RVRkRZaXhEUVVGRkxFMUJRVThzU1VGQlN5eE5RVU5rTEVOQlFVVXNTMEZCVFN4SlFVRkxMRXRCUTJJc1EwRkJSU3hOUVVGUExFbEJRVXNzUzBGRFpDeERRVUZGTEV0QlFVMDdTMEZCU3l4TFFVTmlMRU5CUVVVc1MwRkJUU3hKUVVGTExFdEJRMklzUTBGQlJTeExRVUZOTEVsQlFVc3NTMEZEWWl4RFFVRkZMRXRCUVUwc1NVRkJTeXhMUVVOaUxFTkJRVVVzUzBGQlRTeEhRVUZKTEV0QlExb3NRMEZCUlN4TFFVRk5MRWRCUVVrN1MwRkRXaXhEUVVGRkxFdEJRVTBzUjBGQlNTeEpRVU5hTEVOQlFVVXNUVUZCVHl4SFFVRkpMRWxCUTJJc1EwRkJSU3hOUVVGUExFZEJRVWtzU1VGRFlpeERRVUZGTEUxQlFVOHNSMEZCU1N4SlFVTmlMRU5CUVVVc1MwRkJUU3hKUVVGTExFMUJRMklzUTBGQlJUdExRVUZOTEVsQlFVc3NTMEZEWWl4RFFVRkZMRXRCUVUwc1NVRkJTeXhMUVVOaUxFTkJRVVVzUzBGQlRTeEpRVUZMTEV0QlEySXNRMEZCUlN4TFFVRk5MRWxCUVVzc1MwRkRZaXhEUVVGRkxFdEJRVTBzU1VGQlN5eExRVU5pTEVOQlFVVXNTMEZCVFR0TFFVRkxMRXRCUTJJc1EwRkJSU3hMUVVGTkxFZEJRVWtzUzBGRFdpeERRVUZGTEV0QlFVMHNSMEZCU1N4SlFVTmFMRU5CUVVVc1MwRkJUU3hIUVVGSkxFbEJRMW9zUTBGQlJTeE5RVUZQTEVkQlFVa3NTVUZEWWl4RFFVRkZMRTFCUVU4c1IwRkJTU3hKUVVOaUxFTkJRVVU3UzBGQlR5eEhRVUZKTEVsQlNXSXNRMEZCUlN4alFVRmxMRWxCUVVzc1NVRkJTeXhOUVVNelFpeERRVUZGTEZOQlFWVXNTVUZCU3l4SFFVRkpMRTFCUTNKQ0xFTkJRVVVzVVVGQlV5eEpRVUZMTEVkQlFVazdTMEZEY0VJc1EwRkJSU3hsUVVGblFpeEZRVUZITEVWQlFVY3NUVUZEZUVJc1EwRkJSU3hUUVVGVkxFZEJRVWtzUjBGQlNTeE5RVU53UWl4RFFVRkZMRlZCUVZjc1IwRkJTU3hIUVVGSkxFMUJRM0pDTEVOQlFVVTdTMEZCVlN4SlFVRkxMRXRCUVUwc1RVRkRka0lzUTBGQlJTeFRRVUZWTEV0QlFVMHNTMEZCVFN4TlFVTjRRaXhEUVVGRkxGTkJRVlVzUzBGQlRTeExRVUZOTEUxQlEzaENMRU5CUVVVN1MwRkJWU3hMUVVGTkxFdEJRVTBzVFVGRGVFSXNRMEZCUlN4VFFVRlZMRXRCUVUwc1MwRkJUU3hOUVVONFFpeERRVUZGTEZOQlFWVXNSVUZCUnl4SFFVRkpMRTFCUTI1Q0xFTkJRVVVzVTBGQlZTeEhRVUZKTzB0QlFVa3NUVUZEY0VJc1EwRkJSU3hUUVVGVkxFZEJRVWtzUjBGQlNTeE5RVU53UWl4RFFVRkZMRk5CUVZVc1IwRkJTU3hIUVVGSkxFMUJRM0JDTEVOQlFVVXNVMEZCVlN4SFFVRkpMRWRCUVVrc1RVRkRjRUlzUTBGQlJUdExRVUZYTEVkQlFVa3NSMEZCU1N4TlFVTnlRaXhEUVVGRkxGVkJRVmNzUjBGQlNTeEhRVUZKTEUxQlEzSkNMRU5CUVVVc1ZVRkJWeXhIUVVGSkxFZEJRVWs3UVVGSGRrSXNhMEpCUVdVc1NVRkJRU3hEUVVGTExFMUJRVXdzVjBGQllTeEpRVUZOTEVWQlFVRXNVVUZCVUR0TFFVTjZRa0VzU1VGQlRTeFBRVUZQTzFOQlExZ3NUMEZCVHl4TlFVRkJMRU5CUVU4c1JVRkJVQ3hKUVVGaExGbEJSRlE3VTBGRldDeFpRVUZaTEVOQlFVVXNUVUZCUVN4RFFVRlBMRWRCUVVrc1RVRkJRU3hEUVVGUE96dExRVVZzUXl4SlFVRkJMRU5CUVVzc1RVRkJRU3hEUVVGUExFZEJRVm9zUjBGQmEwSTdTMEZEYkVJc1NVRkJRU3hEUVVGTExFMUJRVUVzUTBGQlR5eEZRVUZRTEVOQlFWVXNUMEZCVml4RFFVRnJRaXhOUVVGTkxFdEJRVGRDTEVkQlFYRkRPMHRCUTNKRExFOUJRVTg3U1VGRFRqczdRME5vUjBnc1lVRkJZeXhIUVVGSExGbEJRVms3UzBGRGVrSXNTMEZCU3l4SlFVRkpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEhRVUZITEZOQlFWTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3VTBGRGRrTXNTVUZCU1N4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzVTBGQlV5eEZRVUZGTEU5QlFVOHNVMEZCVXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wMUJRM1pFTzBWQlEwb3NRMEZCUXpzN1EwTklSaXhKUVVGSkxFdEJRVXNzUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVVXNTVUZCU1N4RlFVRkZMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVVVzUTBGQlF6czdRMEZGT1VRc1NVRkJTU3hYUVVGWExFZEJRVWM3TzBkQlJXaENMRU5CUVVNc1JVRkJSVHRMUVVORUxFMUJRVTBzUlVGQlJTeFJRVUZSTzB0QlEyaENMRTFCUVUwc1JVRkJSU3hEUVVGRE8wbEJRMVk3UjBGRFJDeEZRVUZGTEVWQlFVVTdTMEZEUml4TlFVRk5MRVZCUVVVc1VVRkJVVHRMUVVOb1FpeE5RVUZOTEVWQlFVVXNRMEZCUXl4SFFVRkhMRWRCUVVjN1NVRkRhRUk3UjBGRFJDeEZRVUZGTEVWQlFVVTdTMEZEUml4TlFVRk5MRVZCUVVVc1VVRkJVVHRMUVVOb1FpeE5RVUZOTEVWQlFVVXNRMEZCUXl4SFFVRkhMRWxCUVVrN1NVRkRha0k3TzBkQlJVUXNSVUZCUlN4RlFVRkZPMHRCUTBZc1RVRkJUU3hGUVVGRkxGVkJRVlU3UzBGRGJFSXNUVUZCVFN4RlFVRkZMRU5CUVVNc1IwRkJSeXhGUVVGRk8wbEJRMlk3UjBGRFJDeEZRVUZGTEVWQlFVVTdTMEZEUml4TlFVRk5MRVZCUVVVc1ZVRkJWVHRMUVVOc1FpeE5RVUZOTEVWQlFVVXNRMEZCUXl4SFFVRkhMRU5CUVVNN1NVRkRaRHRIUVVORUxFVkJRVVVzUlVGQlJUdExRVU5HTEUxQlFVMHNSVUZCUlN4VlFVRlZPMHRCUTJ4Q0xFMUJRVTBzUlVGQlJTeERRVUZETzBsQlExWTdSMEZEUkN4RlFVRkZMRVZCUVVVN1MwRkRSaXhOUVVGTkxFVkJRVVVzVlVGQlZUdExRVU5zUWl4TlFVRk5MRVZCUVVVc1JVRkJSVHRKUVVOWU8wVkJRMFlzUTBGQlF6czdRMEZGUml4TlFVRk5MRTlCUVU4c1IwRkJSenRIUVVOa0xFMUJRVTBzUlVGQlJUdExRVU5PTEVsQlFVa3NSVUZCUlN4SFFVRkhPMHRCUTFRc1MwRkJTeXhGUVVGRkxFTkJRVU1zUjBGQlJ5eE5RVUZOTzBsQlEyeENPMGRCUTBRc1VVRkJVU3hGUVVGRk8wdEJRMUlzU1VGQlNTeEZRVUZGTEVsQlFVazdTMEZEVml4TFFVRkxMRVZCUVVVc1RVRkJUVHRKUVVOa08wVkJRMFlzUTBGQlF6czdRMEZGUml4VFFVRlRMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzVVVGQlVTeEZRVUZGTzBkQlF5OUNMRTlCUVU4c1RVRkJUU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4SFFVRkhMRWRCUVVjc1IwRkJSeXhSUVVGUkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEVkQlFVY3NVVUZCVVN4RFFVRkRMRU5CUVVNN1JVRkRja1U3TzBOQlJVUXNVMEZCVXl4bFFVRmxMRVZCUVVVc1MwRkJTeXhGUVVGRkxGRkJRVkVzUlVGQlJTeE5RVUZOTEVWQlFVVXNTVUZCU1N4RlFVRkZPMGRCUTNaRUxFbEJRVWtzVDBGQlR5eExRVUZMTEV0QlFVc3NVVUZCVVN4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTEUxQlFVMHNTVUZCU1N4TFFVRkxMRU5CUVVNc0swSkJRU3RDTEVOQlFVTXNRMEZCUXp0SFFVTndSeXhKUVVGSkxFTkJRVU1zVVVGQlVTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZMRTFCUVUwc1NVRkJTU3hMUVVGTExFTkJRVU1zWjBOQlFXZERMRU5CUVVNc1EwRkJRenM3UjBGRk5VVXNTVUZCU1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hGUVVGRkxFTkJRVU03UjBGRGJFSXNTVUZCU1N4aFFVRmhMRWRCUVVkRkxGTkJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNZVUZCWVN4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wZEJRM0JFTEVsQlFVa3NVMEZCVXl4SFFVRkhMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU03UjBGREwwSXNTVUZCU1N4VlFVRlZMRWRCUVVjc1NVRkJTU3hEUVVGRExGVkJRVlVzUzBGQlN5eExRVUZMTEVOQlFVTTdPMGRCUlRORExGRkJRVkVzUjBGQlJ5eFJRVUZSTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1IwRkRiRU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenM3UjBGRk9VSXNTVUZCU1N4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExGRkJRVkVzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXl4RlFVRkZMRTFCUVUwc1NVRkJTU3hMUVVGTExFTkJRVU1zY1VKQlFYRkNMRWRCUVVjc1VVRkJVU3hIUVVGSExIRkNRVUZ4UWl4SFFVRkhMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNRMEZCUXp0SFFVTnFTU3hKUVVGSkxFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRXRCUVVzc1EwRkJReXhEUVVGRExFVkJRVVVzVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4eFFrRkJjVUlzUjBGQlJ5eE5RVUZOTEVkQlFVY3NjVUpCUVhGQ0xFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRE96dEhRVVUzU0N4SlFVRkpMRkZCUVZFc1MwRkJTeXhOUVVGTkxFVkJRVVU3TzB0QlJYWkNMRTlCUVU4c1MwRkJTeXhEUVVGRE8wbEJRMlE3TzBkQlJVUXNTVUZCU1N4UlFVRlJMRWRCUVVjc1EwRkJReXhEUVVGRE8wZEJRMnBDTEVsQlFVa3NWVUZCVlN4SFFVRkhMRU5CUVVNc1EwRkJRenRIUVVOdVFpeEpRVUZKTEZOQlFWTXNSMEZCUnl4TFFVRkxMRU5CUVVNN08wZEJSWFJDTEVsQlFVa3NVVUZCVVN4TFFVRkxMRWxCUVVrc1JVRkJSVHRMUVVOeVFpeFZRVUZWTEVkQlFVY3NRMEZCUXl4SFFVRkhMR0ZCUVdFc1EwRkJRenRMUVVNdlFpeFJRVUZSTEVkQlFVY3NTVUZCU1N4RFFVRkRPMGxCUTJwQ08wZEJRMFFzU1VGQlNTeE5RVUZOTEV0QlFVc3NTVUZCU1N4RlFVRkZPMHRCUTI1Q0xGTkJRVk1zUjBGQlJ5eEpRVUZKTEVOQlFVTTdTMEZEYWtJc1VVRkJVU3hIUVVGSExHRkJRV0VzUTBGQlF6dExRVU42UWl4TlFVRk5MRWRCUVVjc1NVRkJTU3hEUVVGRE8wbEJRMlk3TzBkQlJVUXNTVUZCU1N4WlFVRlpMRWRCUVVjc1YwRkJWeXhEUVVGRExGRkJRVkVzUTBGQlF5eERRVUZETzBkQlEzcERMRWxCUVVrc1ZVRkJWU3hIUVVGSExGZEJRVmNzUTBGQlF5eE5RVUZOTEVOQlFVTXNRMEZCUXpzN08wZEJSM0pETEVsQlFVa3NUVUZCVFN4SFFVRkhMRXRCUVVzc1IwRkJSeXhaUVVGWkxFTkJRVU1zVFVGQlRTeEhRVUZITEZWQlFWVXNRMEZCUXpzN08wZEJSM1JFTEVsQlFVa3NXVUZCV1N4RFFVRkRMRTFCUVUwc1MwRkJTeXhWUVVGVkxFTkJRVU1zVFVGQlRTeEZRVUZGT3p0TFFVVTNReXhOUVVGTkxFbEJRVWtzVDBGQlR5eERRVUZETEZsQlFWa3NRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhMUVVGTExFTkJRVU03U1VGRE9VTTdPMGRCUlVRc1NVRkJTU3hOUVVGTkxFZEJRVWNzVFVGQlRTeEhRVUZITEZWQlFWVXNRMEZCUXl4TlFVRk5MRWRCUVVjc1VVRkJVU3hEUVVGRE8wZEJRMjVFTEVsQlFVa3NVMEZCVXl4SlFVRkpMRlZCUVZVc1JVRkJSVHRMUVVNelFpeE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUTBGQlF6dEpRVU0zUWl4TlFVRk5MRWxCUVVrc1QwRkJUeXhUUVVGVExFdEJRVXNzVVVGQlVTeEpRVUZKTEZGQlFWRXNRMEZCUXl4VFFVRlRMRU5CUVVNc1JVRkJSVHRMUVVNdlJDeE5RVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1JVRkJSU3hUUVVGVExFTkJRVU1zUTBGQlF6dEpRVU51UXp0SFFVTkVMRTlCUVU4c1RVRkJUU3hEUVVGRE8wVkJRMlk3TzBOQlJVUXNhVUpCUVdNc1IwRkJSeXhsUVVGbExFTkJRVU03UTBGRGFrTXNWMEZCYjBJc1IwRkJSeXhMUVVGTExFTkJRVU03T3p0RFEzaEhkRUlzVTBGQlV5eDNRa0ZCZVVJc1ZVRkJXU3hGUVVGQkxFOUJRV2RDTEVWQlFVRXNaVUZCYjBJN2MwTkJRWEJETEVkQlFWVTdhMFJCUVUwc1IwRkJaMEk3TzB0QlEyNUdMRWxCUVVrc1QwRkJUeXhWUVVGUUxFdEJRWE5DTEZWQlFWVTdVMEZEYkVOR0xFbEJRVTBzVFVGQlRTeFZRVUZCTEVOQlFWY3NWMEZCV0R0VFFVTmFMRWxCUVVrc1JVRkJSU3hIUVVGQkxFbEJRVThzWVVGQllUdGhRVU40UWl4TlFVRk5MRWxCUVVrc1MwRkJTaXc0UWtGQmJVTTdPMU5CUlRORFFTeEpRVUZOTEZOQlFWTXNWVUZCUVN4RFFVRlhPMU5CUXpGQ0xFOUJRVThzVFVGQlFTeERRVUZQTEZWQlFWQXNRMEZCYTBJc1IwRkJiRUlzVjBGQmMwSXNXVUZEY0VKSExHbENRVUZCTEVOQlFXZENMRWRCUVVjc1RVRkJRU3hEUVVGUExFOUJRVThzVTBGQlV6dFpRVVU1UXp0VFFVTk1MRTlCUVU4N096czdRVUZKV0N4RFFVRlBMRk5CUVZOQkxHdENRVUZwUWl4VFFVRlhMRVZCUVVFc1UwRkJhMElzUlVGQlFTeFBRVUZuUWl4RlFVRkJMR1ZCUVc5Q096QkRRVUYwUkN4SFFVRlpPM05EUVVGTkxFZEJRVlU3YTBSQlFVMHNSMEZCWjBJN08wdEJRelZHTEU5QlFVOHNZVUZCUVN4RFFVRmpMRmRCUVZjc1YwRkJWeXhUUVVGVE8zZENRVU5zUkN4aFFVUnJSRHRUUVVWc1JDeFhRVUZYTEVOQlJuVkRPMU5CUjJ4RUxGbEJRVms3T3pzN1EwTnVRbWhDTEZOQlFWTXNjVUpCUVhOQ0xGVkJRVlU3UzBGRGRrTXNTVUZCU1N4RFFVRkRMRkZCUVVFc1EwRkJVenRYUVVGWkxFOUJRVTg3UzBGRGFrTXNTVUZCU1N4UFFVRlBMRkZCUVVFc1EwRkJVeXhWUVVGb1FpeExRVUVyUWp0WFFVRlZMRTlCUVU4N1MwRkRjRVFzU1VGQlNTeExRVUZCTEVOQlFVMHNUMEZCVGl4RFFVRmpMRkZCUVVFc1EwRkJVeXhYUVVGMlFpeEpRVUZ6UXl4UlFVRkJMRU5CUVZNc1ZVRkJWQ3hEUVVGdlFpeE5RVUZ3UWl4SlFVRTRRanRYUVVGSExFOUJRVTg3UzBGRGJFWXNUMEZCVHpzN08wTkJSMVFzVTBGQlV5eGpRVUZsTEV0QlFVOHNSVUZCUVN4VlFVRlZPMHRCUlhaRExFbEJRVWtzUTBGQlF5eFRRVUZCTEVsQlFXRTdVMEZEYUVJc1QwRkJUeXhEUVVGRkxFbEJRVXM3TzB0QlIyaENXQ3hKUVVGSkxGVkJRVlVzVVVGQlFTeERRVUZUTEUxQlFWUXNTVUZCYlVJN1MwRkZha01zU1VGQlNTeFBRVUZCTEV0QlFWa3NUVUZCV2l4SlFVTkJMRTlCUVVFc1MwRkJXU3hSUVVSYUxFbEJSVUVzVDBGQlFTeExRVUZaTEZGQlFVRXNRMEZCVXl4TlFVRk5PMU5CUXpkQ0xFOUJRVThzUTBGQlJTeE5RVUZCTEVOQlFVOHNWMEZCV1N4TlFVRkJMRU5CUVU4N1dVRkRPVUk3VTBGRFRDeFZRVUV3UWl4UFFVRkJMRU5CUVZFc2NVSkJRVkk3VTBGQmJFSTdVMEZCVHp0VFFVTm1MRTlCUVU4c1EwRkJSU3hOUVVGUE96czdPMEZCU1hCQ0xFTkJRV1VzVTBGQlV5eGhRVUZqTEV0QlFVOHNSVUZCUVN4VlFVRlZPMHRCUTNKRVFTeEpRVUZKTEU5QlFVODdTMEZEV0VFc1NVRkJTU3haUVVGWk8wdEJRMmhDUVN4SlFVRkpMR0ZCUVdFN1MwRkZha0pSTEVsQlFVMHNWVUZCVlN4VFFVRkJPMHRCUTJoQ1FTeEpRVUZOTEdGQlFXRXNVVUZCUVN4RFFVRlRPMHRCUXpWQ1FTeEpRVUZOTEdkQ1FVRm5RaXh2UWtGQlFTeERRVUZ4UWp0TFFVTXpRMEVzU1VGQlRTeFpRVUZaTEV0QlFVRXNRMEZCVFR0TFFVTjRRbElzU1VGQlNTeGhRVUZoTEdGQlFVRXNSMEZCWjBJc1VVRkJRU3hEUVVGVExGVkJRVlFzUzBGQmQwSXNVVUZCVVR0TFFVTnFSVUVzU1VGQlNTeGpRVUZsTEVOQlFVTXNVMEZCUkN4SlFVRmpMR0ZCUVdZc1IwRkJaME1zVVVGQlFTeERRVUZUTEdOQlFXTTdTMEZGZWtVc1NVRkJTU3hEUVVGRE8xZEJRVk1zVlVGQlFTeEpRVUZoTEZkQlFVRXNSMEZCWXp0TFFVTjZRMUVzU1VGQlRTeFJRVUZSTEZGQlFVRXNRMEZCVXp0TFFVTjJRa0VzU1VGQlRTeG5Ra0ZCYVVJc1QwRkJUeXhSUVVGQkxFTkJRVk1zWVVGQmFFSXNTMEZCYTBNc1VVRkJiRU1zU1VGQk9FTXNVVUZCUVN4RFFVRlRMRkZCUVVFc1EwRkJVeXhqUVVGcVJTeEhRVUZ0Uml4UlFVRkJMRU5CUVZNc1owSkJRV2RDTzB0QlEyeEpRU3hKUVVGTkxGRkJRVkVzVDBGQlFTeERRVUZSTEZGQlFVRXNRMEZCVXl4UFFVRlBPMHRCUlhSRFFTeEpRVUZOTEcxQ1FVRnRRaXhQUVVGQkxFZEJRVlVzVFVGQlFTeERRVUZQTEcxQ1FVRnRRanRMUVVNM1JFRXNTVUZCVFN4cFFrRkJhVUlzVjBGQlFTeEhRVUZqTEcxQ1FVRnRRanRMUVVWNFJGSXNTVUZCU1N4WlFVRlpPMHRCVFdoQ0xFbEJRVWtzVDBGQlR5eFJRVUZCTEVOQlFWTXNWVUZCYUVJc1MwRkJLMElzVVVGQkwwSXNTVUZCTWtNc1VVRkJRU3hEUVVGVExGRkJRVUVzUTBGQlV5eGhRVUZoTzFOQlJUVkZMRlZCUVVFc1IwRkJZU3hSUVVGQkxFTkJRVk03VTBGRGRFSXNaMEpCUVVFc1IwRkJiVUlzVDBGQlFTeERRVUZSTEZGQlFVRXNRMEZCVXl4clFrRkJhMEk3V1VGRGFrUTdVMEZEVEN4SlFVRkpMR1ZCUVdVN1lVRkZha0lzVlVGQlFTeEhRVUZoTzJGQlIySXNaMEpCUVVFc1IwRkJiVUlzVDBGQlFTeERRVUZSTEZGQlFVRXNRMEZCVXl4clFrRkJhMEk3WjBKQlEycEVPMkZCUlV3c1ZVRkJRU3hIUVVGaE8yRkJSV0lzWjBKQlFVRXNSMEZCYlVJc1QwRkJRU3hEUVVGUkxGRkJRVUVzUTBGQlV5eHJRa0ZCYTBJN096dExRVXN4UkN4SlFVRkpMRTlCUVU4c1VVRkJRU3hEUVVGVExHRkJRV2hDTEV0QlFXdERMRkZCUVd4RExFbEJRVGhETEZGQlFVRXNRMEZCVXl4UlFVRkJMRU5CUVZNc1owSkJRV2RDTzFOQlEyeEdMRlZCUVVFc1IwRkJZU3hKUVVGQkxFTkJRVXNzUjBGQlRDeERRVUZUTEZGQlFVRXNRMEZCVXl4bFFVRmxPenRMUVVsb1JDeEpRVUZKTEZkQlFWYzdVMEZEWWl4VlFVRkJMRWRCUVdFN08wdEJUV1lzVlVGQmIwTXNZVUZCUVN4RFFVRmpMRTlCUVU4N1MwRkJia1E3UzBGQllUdExRVU51UWtFc1NVRkJTU3hYUVVGWE8wdEJSMllzU1VGQlNTeGxRVUZsTzFOQlEycENVU3hKUVVGTkxGTkJRVk1zZFVKQlFVRXNRMEZCZDBJc1dVRkJXU3hQUVVGUE8xTkJRekZFUVN4SlFVRk5MRlZCUVZVc1NVRkJRU3hEUVVGTExFZEJRVXdzUTBGQlV5eE5RVUZCTEVOQlFVOHNTVUZCU1N4TlFVRkJMRU5CUVU4N1UwRkRNME5CTEVsQlFVMHNVMEZCVXl4SlFVRkJMRU5CUVVzc1IwRkJUQ3hEUVVGVExFMUJRVUVzUTBGQlR5eEpRVUZKTEUxQlFVRXNRMEZCVHp0VFFVTXhReXhKUVVGSkxGRkJRVUVzUTBGQlV5eGhRVUZoTzJGQlEzaENRU3hKUVVGTkxGbEJRVmtzVVVGQlFTeERRVUZUTEZkQlFWUXNTMEZCZVVJN1lVRkRNME1zUzBGQlFTeEhRVUZSTEZOQlFVRXNSMEZCV1N4VlFVRlZPMkZCUXpsQ0xFMUJRVUVzUjBGQlV5eFRRVUZCTEVkQlFWa3NVMEZCVXp0blFrRkRla0k3WVVGRFRDeExRVUZCTEVkQlFWRXNUVUZCUVN4RFFVRlBPMkZCUTJZc1RVRkJRU3hIUVVGVExFMUJRVUVzUTBGQlR6czdVMEZIYkVJc1UwRkJRU3hIUVVGWk8xTkJRMW9zVlVGQlFTeEhRVUZoTzFOQlIySXNTMEZCUVN4SlFVRlRMRXRCUVVFc1IwRkJVVHRUUVVOcVFpeE5RVUZCTEVsQlFWVXNTMEZCUVN4SFFVRlJPMWxCUTJJN1UwRkRUQ3hMUVVGQkxFZEJRVkU3VTBGRFVpeE5RVUZCTEVkQlFWTTdVMEZEVkN4VFFVRkJMRWRCUVZrN1UwRkRXaXhWUVVGQkxFZEJRV0U3TzB0QlNXWlNMRWxCUVVrc1dVRkJXVHRMUVVOb1FrRXNTVUZCU1N4aFFVRmhPMHRCUTJwQ0xFbEJRVWtzWVVGQlFTeEpRVUZwUWl4UFFVRlBPMU5CUlRGQ0xGTkJRVUVzUjBGQldWY3NhVUpCUVVFc1EwRkJaMElzVDBGQlR5eFBRVUZQTEUxQlFVMDdVMEZEYUVRc1ZVRkJRU3hIUVVGaFFTeHBRa0ZCUVN4RFFVRm5RaXhSUVVGUkxFOUJRVThzVFVGQlRUczdTMEZKY0VRc1ZVRkJRU3hIUVVGaExFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWYzdTMEZEZUVJc1YwRkJRU3hIUVVGakxFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWYzdTMEZIZWtJc1NVRkJTU3hWUVVGQkxFbEJRV01zUTBGQlF5eFRRVUZtTEVsQlFUUkNMR1ZCUVdVN1UwRkROME5JTEVsQlFVMHNVMEZCVXl4TFFVRkJMRWRCUVZFN1UwRkRka0pCTEVsQlFVMHNaVUZCWlN4WFFVRkJMRWRCUVdNN1UwRkRia05CTEVsQlFVMHNiMEpCUVc5Q0xFOUJRVUVzUTBGQlVTeFJRVUZCTEVOQlFWTXNiVUpCUVcxQ08xTkJRemxFUVN4SlFVRk5MRmRCUVZjc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFhRVUZCTEVkQlFXTXNhVUpCUVVFc1IwRkJiMEk3VTBGRE9VUkJMRWxCUVUwc1dVRkJXU3hKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEZsQlFVRXNSMEZCWlN4cFFrRkJRU3hIUVVGdlFqdFRRVU5vUlN4SlFVRkpMRlZCUVVFc1IwRkJZU3hSUVVGaUxFbEJRWGxDTEZkQlFVRXNSMEZCWXl4WFFVRlhPMkZCUTNCRUxFbEJRVWtzV1VGQlFTeEhRVUZsTEZGQlFWRTdhVUpCUTNwQ0xGZEJRVUVzUjBGQll6dHBRa0ZEWkN4VlFVRkJMRWRCUVdFc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFhRVUZCTEVkQlFXTTdiMEpCUTJwRE8ybENRVU5NTEZWQlFVRXNSMEZCWVR0cFFrRkRZaXhYUVVGQkxFZEJRV01zU1VGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4VlFVRkJMRWRCUVdFN096czdTMEZMTlVNc1YwRkJRU3hIUVVGakxGZEJRVUVzUjBGQll5eEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRlZCUVVFc1IwRkJZU3hqUVVGakxFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWY3NWVUZCUVN4SFFVRmhPMHRCUXpGR0xGbEJRVUVzUjBGQlpTeFhRVUZCTEVkQlFXTXNTVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWeXhWUVVGQkxFZEJRV0VzWlVGQlpTeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRlZCUVVFc1IwRkJZVHRMUVVVMVJrRXNTVUZCVFN4blFrRkJaMElzVjBGQlFTeEhRVUZqTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1kwRkJZeXhKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTzB0QlEzaEZRU3hKUVVGTkxHbENRVUZwUWl4WFFVRkJMRWRCUVdNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eGxRVUZsTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1MwRkZNVVZCTEVsQlFVMHNVMEZCVXl4WFFVRkJMRWRCUVdNN1MwRkROMEpCTEVsQlFVMHNVMEZCVXl4WlFVRkJMRWRCUVdVN1MwRkhPVUlzVDBGQlR6dG5Ra0ZEVEN4TFFVUkxPM0ZDUVVWTUxGVkJSa3M3WjBKQlIwd3NTMEZJU3p0cFFrRkpUQ3hOUVVwTE8xTkJTMHdzV1VGQldTeERRVUZGTEUxQlFVOHNUMEZNYUVJN1UwRk5UQ3hQUVVGUExFdEJRVUVzU1VGQlV5eEpRVTVZTzJsQ1FVOU1MRTFCVUVzN2FVSkJVVXdzVFVGU1N6dDNRa0ZUVEN4aFFWUkxPM2RDUVZWTUxHRkJWa3M3ZVVKQlYwd3NZMEZZU3p0elFrRlpUQ3hYUVZwTE8zVkNRV0ZNTEZsQllrczdiMEpCWTB3c1UwRmtTenR4UWtGbFRDeFZRV1pMTzNGQ1FXZENUQ3hWUVdoQ1N6dHpRa0ZwUWt3N096czdRME01UzBvc2MwSkJRV01zUjBGQlJ5eHBRa0ZCWjBJN1EwRkRha01zVTBGQlV5eG5Ra0ZCWjBJc1JVRkJSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVUZGTzBkQlEzSkRMRWxCUVVrc1QwRkJUeXhKUVVGSkxFdEJRVXNzVVVGQlVTeEZRVUZGTzB0QlF6VkNMRTFCUVUwc1NVRkJTU3hUUVVGVExFTkJRVU1zTUVKQlFUQkNMRU5CUVVNN1NVRkRhRVE3TzBkQlJVUXNTVUZCU1N4SFFVRkhMRWxCUVVrc1NVRkJTU3hIUVVGRk96dEhRVVZxUWl4SlFVRkpMRTlCUVU4c1VVRkJVU3hMUVVGTExGZEJRVmNzU1VGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4TlFVRk5MRVZCUVVVN1MwRkRia1FzVDBGQlR5eEpRVUZKTzBsQlExbzdPMGRCUlVRc1NVRkJTU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNTVUZCU1N4UlFVRlJMRU5CUVVNc1lVRkJZU3hEUVVGRExGRkJRVkVzUlVGQlF6dEhRVU0xUkN4SlFVRkpMRTlCUVU4c1NVRkJTU3hEUVVGRExFdEJRVXNzUzBGQlN5eFJRVUZSTEVWQlFVVTdTMEZEYkVNc1RVRkJUU3hEUVVGRExFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNUVUZCU3p0SlFVTXhRanRIUVVORUxFbEJRVWtzVDBGQlR5eEpRVUZKTEVOQlFVTXNUVUZCVFN4TFFVRkxMRkZCUVZFc1JVRkJSVHRMUVVOdVF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SFFVRkhMRWxCUVVrc1EwRkJReXhQUVVGTk8wbEJRelZDT3p0SFFVVkVMRWxCUVVrc1QwRkJUeXhIUVVGSExFdEJRVWs3UjBGRGJFSXNTVUZCU1N4SFFVRkZPMGRCUTA0c1NVRkJTVHRMUVVOR0xFbEJRVWtzUzBGQlN5eEhRVUZITEVWQlFVVXNTVUZCU1N4SFFVRkZPenRMUVVWd1FpeEpRVUZKTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzA5QlF5OUNMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zWlVGQlpTeEhRVUZITEVsQlFVa3NSVUZCUXp0TlFVTnVRenM3UzBGRlJDeExRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRQUVVOeVF5eEZRVUZGTEVkQlFVY3NUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNUMEZCVHl4RlFVRkRPMDlCUTNwRExFbEJRVWtzUlVGQlJTeEZRVUZGTEU5QlFVOHNSVUZCUlR0TlFVTnNRanRKUVVOR0xFTkJRVU1zVDBGQlR5eERRVUZETEVWQlFVVTdTMEZEVml4RlFVRkZMRWRCUVVjc1MwRkJTVHRKUVVOV08wZEJRMFFzVVVGQlVTeEZRVUZGTEVsQlFVa3NTVUZCU1N4RFFVRkRPMFZCUTNCQ096dERRMnBEUkN4VFFVRlRMSE5DUVVGMVFqdExRVU01UWl4SlFVRkpMRU5CUVVNc1UwRkJRU3hKUVVGaE8xTkJRMmhDTEUxQlFVMHNTVUZCU1N4TFFVRktMRU5CUVZVN08wdEJSV3hDTEU5QlFVOHNVVUZCUVN4RFFVRlRMR0ZCUVZRc1EwRkJkVUk3T3p0QlFVZG9ReXhEUVVGbExGTkJRVk1zWVVGQll5eFZRVUZsTzNkRFFVRm1MRWRCUVZjN08wdEJReTlEVWl4SlFVRkpMRk5CUVZNN1MwRkRZa0VzU1VGQlNTeGhRVUZoTzB0QlEycENMRWxCUVVrc1VVRkJRU3hEUVVGVExFMUJRVlFzUzBGQmIwSXNUMEZCVHp0VFFVVTNRaXhQUVVGQkxFZEJRVlVzVVVGQlFTeERRVUZUTzFOQlEyNUNMRWxCUVVrc1EwRkJReXhQUVVGRUxFbEJRVmtzVDBGQlR5eFBRVUZRTEV0QlFXMUNMRlZCUVZVN1lVRkRNME5CTEVsQlFVa3NXVUZCV1N4UlFVRkJMRU5CUVZNN1lVRkRla0lzU1VGQlNTeERRVUZETEZkQlFWYzdhVUpCUTJRc1UwRkJRU3hIUVVGWkxHMUNRVUZCTzJsQ1FVTmFMRlZCUVVFc1IwRkJZVHM3WVVGRlpsRXNTVUZCVFN4UFFVRlBMRTlCUVVFc1NVRkJWenRoUVVONFFpeEpRVUZKTEU5QlFVOHNVMEZCUVN4RFFVRlZMRlZCUVdwQ0xFdEJRV2RETEZsQlFWazdhVUpCUXpsRExFMUJRVTBzU1VGQlNTeExRVUZLTEVOQlFWVTdPMkZCUld4Q0xFOUJRVUVzUjBGQlZVa3NhMEpCUVVFc1EwRkJhVUlzVFVGQlRVZ3NXVUZCUVN4RFFVRlBMRWxCUVVrc1VVRkJRU3hEUVVGVExGbEJRVms3YVVKQlFVVXNVVUZCVVRzN1lVRkRNMFVzU1VGQlNTeERRVUZETEZOQlFWTTdhVUpCUTFvc1RVRkJUU3hKUVVGSkxFdEJRVW9zYjBOQlFUQkRPenM3VTBGSmNFUXNUVUZCUVN4SFFVRlRMRTlCUVVFc1EwRkJVVHRUUVVWcVFpeEpRVUZKTEZGQlFVRXNRMEZCVXl4TlFVRlVMRWxCUVcxQ0xFMUJRVUVzUzBGQlZ5eFJRVUZCTEVOQlFWTXNVVUZCVVR0aFFVTnFSQ3hOUVVGTkxFbEJRVWtzUzBGQlNpeERRVUZWT3p0VFFVbHNRaXhKUVVGSkxGRkJRVUVzUTBGQlV5eFhRVUZYTzJGQlEzUkNMRTlCUVVFc1EwRkJVU3h4UWtGQlVpeEhRVUZuUXp0aFFVTm9ReXhQUVVGQkxFTkJRVkVzZDBKQlFWSXNSMEZCYlVNN1lVRkRia01zVDBGQlFTeERRVUZSTEhOQ1FVRlNMRWRCUVdsRE8yRkJRMnBETEU5QlFVRXNRMEZCVVN3eVFrRkJVaXhIUVVGelF6dGhRVU4wUXl4UFFVRkJMRU5CUVZFc2RVSkJRVklzUjBGQmEwTTdZVUZEYkVNc1RVRkJRU3hEUVVGUExFdEJRVkFzUTBGQllTeHJRa0ZCWWl4SFFVRnJRenM3TzB0QlIzUkRMRTlCUVU4N2FVSkJRVVVzVFVGQlJqdHJRa0ZCVlN4UFFVRldPM0ZDUVVGdFFqczdPenREUXpkQ05VSXNTVUZCVFN4blFrRkRTaXg1UWtGQlpUczdPMU5CUTJJc1EwRkJTeXhUUVVGTUxFZEJRV2xDTzFOQlEycENMRU5CUVVzc1RVRkJUQ3hIUVVGak8xTkJRMlFzUTBGQlN5eFBRVUZNTEVkQlFXVTdVMEZEWml4RFFVRkxMRWxCUVV3c1IwRkJXVHRUUVVOYUxFTkJRVXNzWTBGQlRDeEhRVUZ6UWp0VFFVZDBRaXhEUVVGTExHbENRVUZNTEVkQlFYbENPMU5CUTNwQ0xFTkJRVXNzWVVGQlRDeEhRVUZ4UWp0VFFVVnlRaXhEUVVGTExHdENRVUZNTEVkQlFUQkNMR2xDUVVGQkxFTkJRV3RDT3poQ1FVTnFReXhUUVVGTlNDeE5RVUZCTEVOQlFVc3NVVUZCVEN4RFFVRmpMRTlCUVdRc1MwRkJNRUlzVVVGRVF6dDVRa0ZGYmtNN2FVSkJRMFFzUlVGQlFTeERRVUZITEZWQlFWVTdjVUpCUTFoQkxFMUJRVUVzUTBGQlN5eExRVUZNTEVOQlFWY3NWMEZCVnpzeVFrRkRlRUlzUTBGQlN5eFRRVUZNT3pKQ1FVTkJMRU5CUVVzc1IwRkJURHM3ZFVKQlEwdEJMRTFCUVVFc1EwRkJTeXhOUVVGTU8yOUNRVU5HTEVsQlFVa3NRMEZCUTBFc1RVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFhRVUZYTzNWQ1FVTm9ReXhEUVVGTExGZEJRVXc3TzFWQlZITkRPMmxEUVZrNVFqdHBRa0ZEVGtFc1RVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dHRRa0ZCVTBFc1RVRkJRU3hEUVVGTExFdEJRVXc3TzIxQ1FVTnVRa0VzVFVGQlFTeERRVUZMTEVsQlFVdzdWVUZrYlVNN01rSkJaMEpxUXp0dFFrRkRVQ3hEUVVGTExGZEJRVXdzUTBGQmFVSTdlVUpCUVZVN096czdVMEZKTDBJc1EwRkJTeXhsUVVGTUxHZENRVUYxUWl4VFFVRk5RU3hOUVVGQkxFTkJRVXNzVDBGQlREdFRRVVUzUWl4RFFVRkxMR05CUVV3c1owSkJRWE5DTzJGQlEyUXNWVUZCVlVFc1RVRkJRU3hEUVVGTExFMUJRVXc3WVVGRldpeFRRVUZUTzIxQ1FVTllMRU5CUVVzc1RVRkJURHM3T3pzN08yOUNRVXRHTEhsQ1FVRlZPMWxCUTB3c1NVRkJRU3hEUVVGTE96dHZRa0ZIVml3eVFrRkJXVHRaUVVOUUxFbEJRVUVzUTBGQlN6czdiMEpCUjFZc2QwSkJRVk03V1VGRFNpeEpRVUZCTEVOQlFVczdPM2xDUVVka0xEaERRVUZyUWl4WFFVRmhMRVZCUVVFc1ZVRkJWVHRUUVVOcVF5eGpRVUZqTEU5QlFVOHNVVUZCVUN4TFFVRnZRaXhSUVVGd1FpeEpRVUZuUXl4UlFVRkJMRU5CUVZNN1dVRkRkRVFzVjBGQlFTeEhRVUZqTEZkQlFVRXNSMEZCWXl4WFFVRlhPenQ1UWtGSGFFUXNkME5CUVdVc1VVRkJWU3hGUVVGQkxFbEJRVTBzUlVGQlFTeFhRVUZoTEVWQlFVRXNTMEZCU3p0WlFVTjJReXhSUVVGQkxFTkJRVk1zV1VGQlZDeEpRVUY1UWl4WFFVRkJMRWRCUVdNc1EwRkJlRU1zUjBGRFNDeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRkZCUVVFc1NVRkJXU3hYUVVGQkxFZEJRV01zVFVGRGNrTXNTVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWeXhIUVVGQkxFZEJRVTA3TzNsQ1FVZDJRaXgzUkVGQmQwSTdXVUZEWml4SlFVRkJMRU5CUVVzc1lVRkJUQ3hEUVVOTUxFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWY3NWVUZCVlN4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFMUJRMmhETEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1lVRkJZU3hKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYT3p0NVFrRkpka01zTUVOQlFXbENPMU5CUTFRc1VVRkJVU3hKUVVGQkxFTkJRVXM3V1VGRFdqdG5Ra0ZEUlN4TFFVRkJMRU5CUVUwc1MwRkVVanRwUWtGRlJ5eExRVUZCTEVOQlFVMHNUVUZHVkR0eFFrRkhUeXhMUVVGQkxFTkJRVTBzVlVGSVlqdHpRa0ZKVVN4TFFVRkJMRU5CUVUwc1YwRktaRHQxUWtGTFV5eExRVUZCTEVOQlFVMHNXVUZNWmp0M1FrRk5WU3hMUVVGQkxFTkJRVTBzWVVGT2FFSTdlVUpCVDFjc1MwRkJRU3hEUVVGTk96czdlVUpCU1RGQ0xITkNRVUZQTzFOQlEwUXNRMEZCUXl4SlFVRkJMRU5CUVVzN1YwRkJVU3hOUVVGTkxFbEJRVWtzUzBGQlNpeERRVUZWTzFOQlJ6bENMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zVDBGQlpDeExRVUV3UWl4UFFVRlBPMkZCUTI1RExFTkJRVXNzU1VGQlREczdVMEZKUlN4UFFVRlBMRWxCUVVFc1EwRkJTeXhOUVVGTUxFTkJRVmtzVDBGQmJrSXNTMEZCSzBJc1dVRkJXVHRuUWtGRE4wTXNRMEZCVVN4SlFVRlNMRU5CUVdFN08xTkJTVmdzUTBGQlF5eEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRk5CUVZNN1lVRkRka0lzUTBGQlN5eFpRVUZNTzJGQlEwRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1QwRkJXQ3hIUVVGeFFqczdVMEZKZGtJc1EwRkJTeXhKUVVGTU8xTkJRMEVzUTBGQlN5eE5RVUZNTzFsQlEwODdPM2xDUVVkVUxEaERRVUZ0UWp0VFFVTmlMRWxCUVVFc1EwRkJTeXhKUVVGTUxFbEJRV0VzU1VGQllpeEpRVUZ4UWl4UFFVRlBMRTFCUVZBc1MwRkJhMElzVjBGQmRrTXNTVUZCYzBRc1QwRkJUeXhOUVVGQkxFTkJRVThzYjBKQlFXUXNTMEZCZFVNc1dVRkJXVHRsUVVNelJ5eERRVUZQTEc5Q1FVRlFMRU5CUVRSQ0xFbEJRVUVzUTBGQlN6dGhRVU5xUXl4RFFVRkxMRWxCUVV3c1IwRkJXVHM3VTBGRlZpeEpRVUZCTEVOQlFVc3NZMEZCVEN4SlFVRjFRaXhOUVVGTk8zRkNRVU12UWl4RFFVRmhMRWxCUVVFc1EwRkJTenRoUVVOc1FpeERRVUZMTEdOQlFVd3NSMEZCYzBJN096dDVRa0ZKTVVJc2QwSkJRVkU3VTBGRFJpeFZRVUZWTEVsQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNN1UwRkRlRUlzVjBGQlFTeEpRVUZsTEVsQlFVRXNRMEZCU3l4VlFVRlZPMmRDUVVOb1F5eEhRVUZWTzJkQ1FVTldMRU5CUVZFc1NVRkJVaXhEUVVGaE96dFRRVVZZTEVOQlFVTTdWMEZCVXp0VFFVTldMRU5CUVVNc1UwRkJRU3hKUVVGaE8yZENRVU5vUWl4RFFVRlJMRXRCUVZJc1EwRkJZenM3TzFOQlIxb3NTVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWenRYUVVGVE8xTkJRM0JDTEVOQlFVTXNTVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWeXhUUVVGVE8yRkJRM1pDTEVOQlFVc3NXVUZCVER0aFFVTkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFOUJRVmdzUjBGQmNVSTdPMU5CVFhaQ0xFTkJRVXNzUzBGQlRDeERRVUZYTEU5QlFWZ3NSMEZCY1VJN1UwRkRja0lzUTBGQlN5eGxRVUZNTzFOQlEwRXNRMEZCU3l4VFFVRk1MRWRCUVdsQ1R5eFBRVUZCTzFOQlEycENMRU5CUVVzc1NVRkJUQ3hIUVVGWkxFMUJRVUVzUTBGQlR5eHhRa0ZCVUN4RFFVRTJRaXhKUVVGQkxFTkJRVXM3TzNsQ1FVZG9SQ3d3UWtGQlV6dFRRVU5JTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1YwRkJWeXhKUVVGQkxFTkJRVXNzVTBGQlREdFRRVU14UWl4RFFVRkxMRXRCUVV3c1EwRkJWeXhQUVVGWUxFZEJRWEZDTzFOQlJYSkNMRU5CUVVzc1pVRkJURHM3ZVVKQlIwWXNiME5CUVdNN1UwRkRVaXhKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTzFkQlFWTXNTVUZCUVN4RFFVRkxMRXRCUVV3N08xZEJRMjVDTEVsQlFVRXNRMEZCU3l4SlFVRk1PenQ1UWtGSlVDeDNRa0ZCVVR0VFFVTk9MRU5CUVVzc1MwRkJURHRUUVVOQkxFTkJRVXNzUzBGQlRDeERRVUZYTEV0QlFWZ3NSMEZCYlVJN1UwRkRia0lzUTBGQlN5eExRVUZNTEVOQlFWY3NVVUZCV0N4SFFVRnpRanRUUVVOMFFpeERRVUZMTEV0QlFVd3NRMEZCVnl4SlFVRllMRWRCUVd0Q08xTkJRMnhDTEVOQlFVc3NTMEZCVEN4RFFVRlhMRk5CUVZnc1IwRkJkVUk3VTBGRGRrSXNRMEZCU3l4TFFVRk1MRU5CUVZjc1QwRkJXQ3hIUVVGeFFqdFRRVU55UWl4RFFVRkxMRTFCUVV3N08zbENRVWRHTERSQ1FVRlZPenM3VTBGRFNpeEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPMWRCUVZjN1UwRkRkRUlzUTBGQlF5eFRRVUZCTEVsQlFXRTdaMEpCUTJoQ0xFTkJRVkVzUzBGQlVpeERRVUZqT3pzN1UwRkphRUlzUTBGQlN5eEpRVUZNTzFOQlEwRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1QwRkJXQ3hIUVVGeFFqdFRRVU55UWl4RFFVRkxMRXRCUVV3c1EwRkJWeXhUUVVGWUxFZEJRWFZDTzFOQlJXcENMR0ZCUVdFc1NVRkJRU3hEUVVGTExHOUNRVUZNTEVOQlFUQkNPMjFDUVVGWk96dFRRVVZ1UkN4blFrRkJaMElzUTBGQlFTeEhRVUZKTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1UwRkZja01zUTBGQlN5eGxRVUZNTzFOQlEwMHNiVUpCUVU4N1lVRkRVQ3hEUVVGRFVDeE5RVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPMlZCUVZjc1QwRkJUeXhQUVVGQkxFTkJRVkVzVDBGQlVqdGxRVU5zUXl4RFFVRkxMRXRCUVV3c1EwRkJWeXhUUVVGWUxFZEJRWFZDTzJWQlEzWkNMRU5CUVVzc1NVRkJURHRuUWtGRFQwRXNUVUZCUVN4RFFVRkxMRmRCUVV3c1EwRkJhVUlzVjBGQmFrSXNRMEZEU2l4SlFVUkpMR0ZCUTBNN2FVSkJRMEVzUTBGQlEwRXNUVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWenR0UWtGQlZ6dHRRa0ZETTBJc1EwRkJTeXhMUVVGTUxFTkJRVmNzVTBGQldDeEhRVUYxUWp0dFFrRkRka0lzUTBGQlN5eExRVUZNTEVOQlFWY3NTMEZCV0R0cFFrRkRTVUVzVFVGQlFTeERRVUZMTEV0QlFVd3NRMEZCVnl4TFFVRllMRWRCUVcxQ1FTeE5RVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMR0ZCUVdFN2RVSkJRemRETEVOQlFVc3NTMEZCVEN4RFFVRlhMRWxCUVZnc1NVRkJiVUk3ZFVKQlEyNUNMRU5CUVVzc1MwRkJUQ3hEUVVGWExGRkJRVmdzUjBGQmMwSkJMRTFCUVVFc1EwRkJTeXhuUWtGQlRDeERRVUZ6UWtFc1RVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eE5RVUZOUVN4TlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWE8zVkNRVU40UlN4RFFVRkxMR05CUVV3c1IwRkJjMElzVlVGQlFTeERRVUZYTEUxQlFVMDdiMEpCUTJ4RE8zZENRVU5NTEVOQlFWRXNSMEZCVWl4RFFVRlpPM1ZDUVVOYUxFTkJRVXNzVlVGQlREdDFRa0ZEUVN4RFFVRkxMRk5CUVV3N2RVSkJRMEVzUTBGQlN5eEpRVUZNTzNWQ1FVTkJMRU5CUVVzc1IwRkJURHM3T3p0VFFVMUtMRU5CUVVNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZUTzJGQlEzWkNMRU5CUVVzc1dVRkJURHRoUVVOQkxFTkJRVXNzUzBGQlRDeERRVUZYTEU5QlFWZ3NSMEZCY1VJN08xTkJTVzVDTEVsQlFVRXNRMEZCU3l4TlFVRk1MRWxCUVdVc1QwRkJUeXhKUVVGQkxFTkJRVXNzVFVGQlRDeERRVUZaTEZkQlFXNUNMRXRCUVcxRExGbEJRVms3WVVGRGFFVXNRMEZCU3l4cFFrRkJUQ3hYUVVGMVFpeG5Ra0ZCVTBFc1RVRkJRU3hEUVVGTExFMUJRVXdzUTBGQldTeFhRVUZhTEVOQlFYZENPenRuUWtGSk1VUXNRMEZCV1N4WFFVRmFMRU5CUTBjc1MwRkVTQ3hYUVVOVE8yZENRVU5NTEVOQlFWRXNTMEZCVWl4RFFVRmpPMDlCUm14Q0xFTkJTVWNzU1VGS1NDeFhRVWxSTzJWQlEwb3NRMEZCU3l4SlFVRk1MRWRCUVZrc1RVRkJRU3hEUVVGUExIRkNRVUZRTEVOQlFUWkNPenM3ZVVKQlNTOURMSGREUVVGblFqczdPMU5CUTFZc1NVRkJRU3hEUVVGTExFMUJRVXdzU1VGQlpTeFBRVUZQTEVsQlFVRXNRMEZCU3l4TlFVRk1MRU5CUVZrc1MwRkJia0lzUzBGQk5rSXNXVUZCV1R0aFFVTXhSQ3hEUVVGTExHbENRVUZNTEZkQlFYVkNMR2RDUVVGVFFTeE5RVUZCTEVOQlFVc3NUVUZCVEN4RFFVRlpMRXRCUVZvc1EwRkJhMEk3T3p0NVFrRkpkRVFzYjBOQlFXTTdPenRUUVVOU0xFbEJRVUVzUTBGQlN5eE5RVUZNTEVsQlFXVXNUMEZCVHl4SlFVRkJMRU5CUVVzc1RVRkJUQ3hEUVVGWkxFZEJRVzVDTEV0QlFUSkNMRmxCUVZrN1lVRkRlRVFzUTBGQlN5eHBRa0ZCVEN4WFFVRjFRaXhuUWtGQlUwRXNUVUZCUVN4RFFVRkxMRTFCUVV3c1EwRkJXU3hIUVVGYUxFTkJRV2RDT3pzN2VVSkJTWEJFTEd0RFFVRmhPenM3VTBGRFRDeGxRVUZsTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1UwRkZhRU1zUTBGQlN5eGxRVUZNTzFOQlEwRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1UwRkJXQ3hIUVVGMVFqdFRRVU4yUWl4RFFVRkxMRXRCUVV3c1EwRkJWeXhUUVVGWUxFZEJRWFZDTzFOQlEzWkNMRU5CUVVzc1MwRkJUQ3hEUVVGWExFOUJRVmdzUjBGQmNVSTdXVUZIWkN4VFFVRkJMRVZCUVVFc1EwRkRTaXhMUVVSSkxGZEJRMFU3WjBKQlEwd3NRMEZCVVN4TFFVRlNMRU5CUVdNN1QwRkdXQ3hEUVVsS0xFbEJTa2tzWVVGSlF6dGhRVVZCTEZsQlFVRXNTVUZCWjBKQkxFMUJRVUVzUTBGQlN5eE5RVUZ5UWl4SlFVRXJRaXhQUVVGUFFTeE5RVUZCTEVOQlFVc3NUVUZCVEN4RFFVRlpMRk5CUVc1Q0xFdEJRV2xETEZsQlFWazdiVUpCUXpsRkxFTkJRVXNzYVVKQlFVd3NWMEZCZFVJc1owSkJRVk5CTEUxQlFVRXNRMEZCU3l4TlFVRk1MRU5CUVZrc1UwRkJXaXhEUVVGelFqczdPenQ1UWtGTE9VUXNjMFJCUVhOQ0xFdEJRVlU3YTBOQlFWWXNSMEZCVFRzN1dVRkRia0k3YlVKQlEwc3NSMEZCUVN4RFFVRkpMRkZCUkZRN1pVRkZReXhIUVVGQkxFTkJRVWtzU1VGR1REdGpRVWRCTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1IwRklXRHRuUWtGSlJTeEhRVUZCTEVOQlFVa3NVVUZCU2l4SFFVRmxMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzVVVGQlVTeFRRVXB3UXp0bFFVdERMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zU1VGTVpqdGxRVTFETEVsQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNc1NVRk9aanRwUWtGUFJ5eEpRVUZCTEVOQlFVc3NVVUZCVEN4RFFVRmpMRTFCVUdwQ08ybENRVkZITEVsQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNc1RVRlNha0k3YlVKQlUwc3NTVUZCUVN4RFFVRkxMRkZCUVV3c1EwRkJZeXhSUVZSdVFqc3dRa0ZWV1N4SlFVRkJMRU5CUVVzc1VVRkJUQ3hEUVVGakxHVkJWakZDTzI5Q1FWZE5MRWRCUVVFc1EwRkJTU3hUUVVGS0xFbEJRV2xDTEZsQlFVRXNSVUZZZGtJN2MwSkJXVkVzVVVGQlFTeERRVUZUTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1dVRkJjRUlzUjBGQmJVTXNTVUZCUVN4RFFVRkxMRWRCUVV3c1EwRkJVeXhIUVVGSExFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWY3NaVUZCWlRzN08zbENRVWt4Uml4dlEwRkJZU3hMUVVGVk96dHJRMEZCVml4SFFVRk5PenRUUVVOaUxFTkJRVU1zU1VGQlFTeERRVUZMTzFkQlFWRXNUMEZCVHl4UFFVRkJMRU5CUVZFc1IwRkJVaXhEUVVGWk8xTkJRMnBETEU5QlFVOHNTVUZCUVN4RFFVRkxMRTFCUVV3c1EwRkJXU3hUUVVGdVFpeExRVUZwUXl4WlFVRlpPMkZCUXk5RExFTkJRVXNzVFVGQlRDeERRVUZaTEZOQlFWbzdPMU5CU1VVc1lVRkJZU3hKUVVGQkxFTkJRVXNzYjBKQlFVd3NRMEZCTUVJN1UwRkZja01zVTBGQlV5eFpRVUZCTzFOQlExZ3NTVUZCU1N4UFFVRkJMRU5CUVZFc1QwRkJVanRUUVVOS0xFMUJRVUVzU1VGQlZTeEhRVUZCTEVOQlFVa3NUVUZCWkN4SlFVRjNRaXhQUVVGUExFMUJRVUVzUTBGQlR5eE5RVUZrTEV0QlFYbENMRmxCUVZrN1lVRkRla1FzWVVGQllVY3NXVUZCUVN4RFFVRlBMRWxCUVVrN1lVRkRlRUlzVDBGQlR5eE5RVUZCTEVOQlFVOHNUVUZCVUN4RFFVRmpPMkZCUTNaQ1N5eFhRVUZCTEVOQlFWVTdaVUZCVHl4RFFVRkJMRWRCUVVrN08yVkJRM0JDTEVOQlFVRXNSMEZCU1N4UFFVRkJMRU5CUVZFc1QwRkJVaXhEUVVGblFqczdXVUZIY0VJc1EwRkJRU3hEUVVGRkxFbEJRVVlzVjBGQlR5eGxRVU5NVWl4TlFVRkJMRU5CUVVzc1kwRkJUQ3hEUVVGdlFrY3NXVUZCUVN4RFFVRlBMRWxCUVVrc1dVRkJXVHRsUVVGUkxFbEJRVUVzU1VGQlVUdFpRVVEzUkN4RFFVVktMRWxCUmtrc1YwRkZRenRoUVVkR0xFMUJRVUVzUTBGQlR5eE5RVUZRTEV0QlFXdENPMlZCUVVjc1QwRkJUeXhOUVVGQkxFTkJRVTg3TzJWQlEyeERMRTlCUVU4N096dDVRa0ZKYUVJc01FTkJRV2RDTEZsQlFXbENPenRuUkVGQmFrSXNSMEZCWVRzN1UwRkRNMElzUTBGQlN5eE5RVUZNTEVOQlFWa3NVMEZCV2l4SFFVRjNRanRUUVVkNFFpeERRVUZMTEUxQlFVdzdVMEZIU1N4aFFVRmhMRWxCUVVFc1EwRkJTeXhOUVVGTU8xTkJSMWdzVTBGQlV5eEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhPMU5CUjNSQ0xFOUJRVThzVlVGQlVDeExRVUZ6UWl4aFFVRmhPMjFDUVVOeVF5eEhRVUZoTEVOQlFVVTdPMlZCUldwQ0xFZEJRV0VzUlVGQlFTeERRVUZITEUxQlFVZ3NRMEZCVlN4WFFVRldMRU5CUVhOQ0xFMUJRWFJDTEVOQlFUWkNPMlZCU1RGRExFZEJRV0VzVlVGQlFTeERRVUZYTEVkQlFWZ3NWMEZCWlR0aFFVTndRaXhuUWtGQlowSXNUMEZCVHl4TlFVRlFMRXRCUVd0Q0xGRkJRV3hDTEVsQlFUaENMRTFCUVRsQ0xFdEJRWGxETEUxQlFVRXNTVUZCVlN4TlFVRldMRWxCUVc5Q0xGTkJRVUVzU1VGQllUdGhRVU14Uml4UFFVRlBMR0ZCUVVFc1IwRkJaMElzVFVGQlFTeERRVUZQTEU5QlFVODdZVUZEY2tNc1QwRkJUeXhoUVVGQkxFZEJRV2RDUVN4WlFVRkJMRU5CUVU4c1NVRkJTU3hSUVVGUk8yMUNRVUZGTzJOQlFWVTdiVUpCUVVVN08yRkJRekZFTEZGQlFVRXNRMEZCVXl4UFFVRlBPMmxDUVVOYUxGZEJRVmNzU1VGQlFTeERRVUZMTEZGQlFVd3NTVUZCYVVJc1ZVRkJRU3hEUVVGWE8ybENRVU4yUXl4clFrRkJhMElzVDBGQlFTeERRVUZSTEVsQlFVRXNRMEZCU3l4cFFrRkJhVUlzVlVGQlFTeERRVUZYTEdsQ1FVRnBRanQxUWtGRE4wTXNXVUZCUVN4RFFVRmhMRTFCUVUwN01rSkJRVVVzVVVGQlJqdHJRMEZCV1RzN2FVSkJRVFZFTzJsQ1FVRlRPMmxDUVVGWE8yOUNRVU55UWl4TlFVRkJMRU5CUVU4c1RVRkJVQ3hEUVVGakxFMUJRVTA3TUVKQlFVVXNUMEZCUmpzMFFrRkJWeXhUUVVGWU8zVkNRVUZ6UWpzN1owSkJRelZETzI5Q1FVTkZPenM3VTBGTFdDeERRVUZMTEUxQlFVd3NRMEZCV1N4VFFVRmFMRWRCUVhkQ08xTkJRM2hDTEVOQlFVc3NUVUZCVER0VFFVTkJMRU5CUVVzc1RVRkJURHRaUVVkUExFOUJRVUVzUTBGQlVTeEhRVUZTTEVOQlFWa3NWVUZCUVN4RFFVRlhMRWRCUVZnc1YwRkJaMElzVFVGQlVTeEZRVUZCTEVOQlFVY3NSVUZCUVN4WFFVRmFPMkZCUlRGQ0xGTkJRVk5CTEZsQlFVRXNRMEZCVHp0M1FrRkRWQ3hGUVVSVE8zRkNRVVZhTEVWQlJsazdjVUpCUjFvN1dVRkRVQ3haUVVGWkxGRkJRVkU3YjBKQlEyUXNRMEZFWXpzd1FrRkZVaXhUUVVGQkxFTkJRVlU3TzJGQlMyNUNMRmxCUVZrc1ZVRkJRU3hEUVVGWExFbEJRVmdzUzBGQmIwSXNTMEZCY0VJc1IwRkJORUlzVVVGQlVTeE5RVUZCTEVOQlFVODdaVUZETjBRc1EwRkJUeXhKUVVGUUxFZEJRV01zVTBGQlFTeExRVUZqTzJWQlJ6VkNMRU5CUVU4c1VVRkJVQ3hIUVVGclFpeGxRVUZCTEVOQlFXZENPMmRDUVVjelFpeE5RVUZCTEVOQlFVODdaMEpCUTFBc1RVRkJRU3hEUVVGUE8yTkJSMVJVTEVsQlFVa3NTMEZCU3l4UlFVRlJPMmxDUVVOb1FpeFBRVUZQTEUxQlFVRXNRMEZCVHl4RlFVRmtMRXRCUVhGQ08yMUNRVUZoTEU5QlFVOHNUVUZCUVN4RFFVRlBPenRoUVVkc1JDeGpRVUZqTEU5QlFVRXNRMEZCVVN4UFFVRlNMRU5CUVdkQ08yRkJRemxDTEUxQlFVRXNRMEZCVHl4TlFVRk5PMmxDUVVWVUxFOUJRVThzVFVGQlFTeERRVUZQTzJsQ1FVTm9RaXhOUVVGQkxFTkJRVThzVTBGQlV6dHhRa0ZEV2l4VlFVRlZMRTFCUVVFc1EwRkJUenMwUWtGRGRrSXNSMEZCWXl4WFFVRkJMRU5CUVZrc1UwRkJVenR2UWtGRE9VSTdORUpCUTB3c1IwRkJZeXhSUVVGQkxFTkJRVk1zVFVGQlRUczdPMmRDUVVjeFFpeFhRVUZCTEVOQlFWa3NTVUZCV2l4WFFVRnBRaXh4UWtGRFppeE5RVUZCTEVOQlFVOHNUVUZCVUN4RFFVRmpMRWxCUVVrc1VVRkJVVHRSUVhoRE9VSXNRMEV3UTBnc1NVRXhRMGNzVjBFd1EwVTdZVUZEUkN4alFVRmpMRVZCUVVFc1EwRkJSeXhOUVVGSUxGZEJRVlVzV1VGQlN5eERRVUZCTEVOQlFVVTdZVUZEYWtNc1YwRkJRU3hEUVVGWkxFMUJRVm9zUjBGQmNVSXNSMEZCUnp0cFFrRkZjRUlzYTBKQlFXdENMRmRCUVVFc1EwRkJXU3hKUVVGYUxGZEJRV2xDTEZsQlFVc3NRMEZCUVN4RFFVRkZPMmxDUVVNeFF5eFhRVUZYTEZkQlFVRXNRMEZCV1N4SlFVRmFMRmRCUVdsQ0xGbEJRVXNzUTBGQlFTeERRVUZGTzJsQ1FVTnVReXhqUVVGakxGZEJRVUVzUTBGQldTeEpRVUZhTEZkQlFXbENMRmxCUVVzc1EwRkJRU3hEUVVGRk8ybENRVU40UXp0cFFrRkZRU3hYUVVGQkxFTkJRVmtzVFVGQldpeEhRVUZ4UWp0dFFrRkJSeXhKUVVGQkxFZEJRVThzVjBGQlFTeERRVUZaTzIxQ1FVVXhReXhKUVVGSk8yMUNRVUZwUWl4SlFVRkJMRWRCUVU4c1EwRkJSeXhsUVVGQkxFTkJRV2RDTEhGQ1FVRmpMRmRCUVVFc1EwRkJXU3hGUVVGYUxFTkJRV1U3TzIxQ1FVVTFSU3hKUVVGQkxFZEJRVThzVFVGQlJ5eFhRVUZCTEVOQlFWa3NSVUZCV2l4RFFVRmxPMmxDUVVNeFFpeFJRVUZSTzJsQ1FVTlNMRlZCUVVFc1EwRkJWeXhWUVVGVk8zRkNRVU5xUWl4cFFrRkJhVUlzVVVGQlFTeERRVUZUVFN4TlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWE8zTkNRVU16UXl4SFFVRlJMR05CUVVFc2EwSkJRVFJDTEZWQlFVRXNRMEZCVnl4TFFVRllMRWRCUVcxQ0xHTkJRVTlCTEUxQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc2NVTkJRVFJDTEZWQlFVRXNRMEZCVnp0dlFrRkRNMGNzU1VGQlNTeFhRVUZCTEVOQlFWa3NUVUZCV2l4SFFVRnhRaXhIUVVGSE8zTkNRVU5xUXl4SFFVRlJPenRwUWtGRlNpeFRRVUZUTEZGQlFVRXNSMEZCVnl4elFrRkJjMEk3YVVKQlF6RkRMRk5CUVZNc1YwRkJRU3hIUVVGakxHMUNRVUZ0UWp0dlFrRkRhRVFzUTBGQlVTeEhRVUZTTEZWQlFXdENMR3RDUVVGaExHbENRVUZaTEdOQlFWTXNVVUZCVXl4dFFrRkJiVUlzYlVKQlFXMUNMSE5DUVVGelFqczdZVUZGZGtnc1QwRkJUMEVzVFVGQlFTeERRVUZMTEUxQlFVd3NRMEZCV1N4VlFVRnVRaXhMUVVGclF5eFpRVUZaTzIxQ1FVTm9SQ3hEUVVGTExFMUJRVXdzUTBGQldTeFZRVUZhT3p0blFrRkZTenM3TzNsQ1FVbFlMR2RFUVVGdFFpeEpRVUZKTzFOQlEzSkNMRU5CUVVzc1ZVRkJURHRQUVVOQkxFTkJRVWNzU1VGQlFTeERRVUZMTzFOQlExSXNRMEZCU3l4WFFVRk1PenQ1UWtGSFJpeHZRMEZCWXp0VFFVTk9MRkZCUVZFc1NVRkJRU3hEUVVGTE8xTkJSMllzUTBGQlF5eEpRVUZCTEVOQlFVc3NTMEZCVEN4RFFVRlhMRVZCUVZvc1NVRkJhMElzUzBGQlFTeERRVUZOTEU5QlFYaENMRWxCUVcxRExFTkJRVU1zUzBGQlFTeERRVUZOTEVsQlFVazdZMEZEYUVRc1EwRkJUU3hQUVVGT0xFTkJRV01zU1VGQlpEdGhRVU5KTEVsQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNc1dVRkJaQ3hMUVVFclFpeFBRVUZQTzJ0Q1FVTjRReXhEUVVGTkxFOUJRVTRzUTBGQll5eExRVUZrTEVOQlFXOUNMRXRCUVVFc1EwRkJUU3hSUVVGUkxFdEJRVUVzUTBGQlRUczdXVUZGY2tNc1NVRkJTU3hMUVVGQkxFTkJRVTBzU1VGQlNUdGpRVU51UWl4RFFVRk5MRVZCUVU0c1EwRkJVeXhMUVVGVUxFTkJRV1VzUzBGQlFTeERRVUZOTEUxQlFVNHNSMEZCWlN4TFFVRkJMRU5CUVUwc1dVRkJXU3hMUVVGQkxFTkJRVTBzVFVGQlRpeEhRVUZsTEV0QlFVRXNRMEZCVFRzN08zbENRVWw2UlN4elEwRkJaVHRUUVVOUUxGRkJRVkVzU1VGQlFTeERRVUZMTzFOQlJXWXNRMEZCUXl4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFVkJRVm9zU1VGQmEwSXNTMEZCUVN4RFFVRk5MRTlCUVhoQ0xFbEJRVzFETEVOQlFVTXNTMEZCUVN4RFFVRk5MRWxCUVVrN1kwRkRhRVFzUTBGQlRTeFBRVUZPTEVOQlFXTXNUMEZCWkRzN1UwRlBSU3hMUVVGQkxFTkJRVTBzUlVGQlRpeEpRVUZaTEVsQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNc1MwRkJaQ3hMUVVGM1FpeExRVUZ3UXl4SlFVRTJReXhEUVVGRExFdEJRVUVzUTBGQlRTeEpRVUZKTzJOQlF6RkVMRU5CUVUwc1JVRkJUaXhEUVVGVExFdEJRVlE3T3p0NVFrRkpTaXgzUWtGQlVUdFRRVU5HTEVsQlFVRXNRMEZCU3l4TlFVRk1MRWxCUVdVc1QwRkJUeXhKUVVGQkxFTkJRVXNzVFVGQlRDeERRVUZaTEVsQlFXNUNMRXRCUVRSQ0xGbEJRVms3WVVGRGVrUXNRMEZCU3l4VlFVRk1PMkZCUTBFc1EwRkJTeXhOUVVGTUxFTkJRVmtzU1VGQldpeERRVUZwUWl4SlFVRkJMRU5CUVVzN1lVRkRkRUlzUTBGQlN5eFhRVUZNT3pzN2VVSkJTVW9zTkVKQlFWVTdVMEZEU2l4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFbEJRVWs3WVVGRGFrSXNRMEZCU3l4cFFrRkJUQ3hIUVVGNVFqdGhRVU42UWl4RFFVRkxMRXRCUVV3c1EwRkJWeXhGUVVGWUxFTkJRV01zVFVGQlpEdG5Ra0ZEVHl4SlFVRkJMRU5CUVVzN1dVRkRVRHRuUWtGRFJTeEpRVUZCTEVOQlFVc3NZMEZCVERzN08zbENRVWxZTERSRFFVRnJRanRUUVVOYUxFTkJRVU1zU1VGQlFTeERRVUZMTzFkQlFWRTdVMEZGV2l4UlFVRlJMRWxCUVVFc1EwRkJTenRUUVVOdVFpeERRVUZMTEZWQlFVdzdVMEZGU1R0VFFVVkJMRTlCUVU4c1NVRkJRU3hEUVVGTExFMUJRVm9zUzBGQmRVSXNXVUZCV1R0dFFrRkRja01zUjBGQllTeEpRVUZCTEVOQlFVc3NUVUZCVEN4RFFVRlpPMWxCUTNCQ0xFbEJRVWtzVDBGQlR5eEpRVUZCTEVOQlFVc3NUVUZCVEN4RFFVRlpMRTFCUVc1Q0xFdEJRVGhDTEZsQlFWazdiVUpCUTI1RUxFZEJRV0VzU1VGQlFTeERRVUZMTEUxQlFVd3NRMEZCV1N4TlFVRmFMRU5CUVcxQ096dFRRVWRzUXl4RFFVRkxMRmRCUVV3N1dVRkZUenM3ZVVKQlIxUXNNRUpCUVZFc1MwRkJWVHM3YTBOQlFWWXNSMEZCVFRzN1UwRkpUaXhyUWtGQmEwSXNRMEZEZEVJN1YwRkhSaXhEUVVGUExFbEJRVkFzUTBGQldTeEpRVUZhTEVOQlFXbENMRTlCUVdwQ0xGZEJRWGxDTzJGQlEyNUNMR1ZCUVVFc1EwRkJaMElzVDBGQmFFSXNRMEZCZDBJc1NVRkJlRUlzU1VGQlowTXNSMEZCUnp0dFFrRkRMMElzU1VGQlNTeExRVUZLTEc5Q1FVRXdRanM3TzFOQlNUbENMRmxCUVZrc1NVRkJRU3hEUVVGTExGTkJRVXdzUTBGQlpUdFRRVU16UWl4aFFVRmhMRWxCUVVFc1EwRkJTeXhUUVVGTUxFTkJRV1U3VlVGSE4wSk9MRWxCUVVrc1QwRkJUeXhMUVVGTE8yRkJRMklzVVVGQlVTeEhRVUZCTEVOQlFVazdZVUZEWkN4UFFVRlBMRXRCUVZBc1MwRkJhVUlzWVVGQllUdHRRa0ZEYUVNc1EwRkJTeXhUUVVGTUxFTkJRV1VzU1VGQlppeEhRVUZ6UWpzN08xTkJTM0JDTEZkQlFWY3NUVUZCUVN4RFFVRlBMRTFCUVZBc1EwRkJZeXhKUVVGSkxFbEJRVUVzUTBGQlN5eFhRVUZYTzFOQlF5OURMRTFCUVVFc1NVRkJWU3hIUVVGV0xFbEJRV2xDTEU5QlFVRXNTVUZCVnp0WFFVRkxMRTFCUVUwc1NVRkJTU3hMUVVGS0xFTkJRVlU3VjBGRGFFUXNTVUZCU1N4TlFVRkJMRWxCUVZVN1YwRkJTeXhQUVVGUExGRkJRVUVzUTBGQlV6dFhRVU51UXl4SlFVRkpMRTlCUVVFc1NVRkJWenRYUVVGTExFOUJRVThzVVVGQlFTeERRVUZUTzFOQlEzSkRMRlZCUVVFc1NVRkJZeXhIUVVGa0xFbEJRWEZDTEdGQlFVRXNTVUZCYVVJN1YwRkJTeXhOUVVGTkxFbEJRVWtzUzBGQlNpeERRVUZWTzFkQlF6RkVMRWxCUVVrc1ZVRkJRU3hKUVVGak8xZEJRVXNzVDBGQlR5eFJRVUZCTEVOQlFWTTdWMEZEZGtNc1NVRkJTU3hoUVVGQkxFbEJRV2xDTzFkQlFVc3NUMEZCVHl4UlFVRkJMRU5CUVZNN1UwRkhNME1zVFVGQlFTeEpRVUZWTzFkQlFVc3NTVUZCUVN4RFFVRkxMRTFCUVV3c1EwRkJXU3hKUVVGYUxFZEJRVzFDTEVkQlFVRXNRMEZCU1R0VFFVVndReXhaUVVGWkxFbEJRVUVzUTBGQlN5eFpRVUZNTEVOQlFXdENPMWRCUTNCRExFTkJRVThzVFVGQlVDeERRVUZqTEVsQlFVRXNRMEZCU3l4UlFVRlJPMU5CUjNaQ0xGTkJRVUVzUzBGQll5eEpRVUZCTEVOQlFVc3NVMEZCVEN4RFFVRmxMRTFCUVRkQ0xFbEJRWFZETEZWQlFVRXNTMEZCWlN4SlFVRkJMRU5CUVVzc1UwRkJUQ3hEUVVGbExGTkJRVk03YlVKQlEzQkVMRmxCUVVFc1EwRkJZU3hKUVVGQkxFTkJRVXM3WVVGQmRFTTdZVUZCVVR0aFFVVm9RaXhEUVVGTExFdEJRVXdzUTBGQlZ5eE5RVUZZTEVkQlFXOUNPMkZCUTNCQ0xFTkJRVXNzUzBGQlRDeERRVUZYTEU5QlFWZ3NSMEZCY1VJN1lVRkhja0lzUTBGQlN5eFhRVUZNTzJGQlIwRXNRMEZCU3l4eFFrRkJURHM3VTBGSlJTeEhRVUZCTEVOQlFVa3NSVUZCU2l4SlFVRlZMRTlCUVU4c1IwRkJRU3hEUVVGSkxFVkJRVmdzUzBGQmEwSXNXVUZCV1R0aFFVTXhReXhEUVVGTExFdEJRVXdzUTBGQlZ5eEZRVUZZTEVkQlFXZENMRWRCUVVFc1EwRkJTVHRoUVVOd1FpeERRVUZMTEV0QlFVd3NRMEZCVnl4RlFVRllMRU5CUVdNc1NVRkJaQ3huUWtGQmNVSTdhVUpCUTJaTkxFMUJRVUVzUTBGQlN6dHRRa0ZCWlR0dFFrRkRlRUlzUTBGQlN5eHBRa0ZCVEN4SFFVRjVRa0VzVFVGQlFTeERRVUZMTEdOQlFVdzdPenRUUVV0NlFpeFRRVUZCTEVsQlFXRXNTMEZCU3p0aFFVTm9RaXhIUVVGQkxFTkJRVWs3WlVGQlV5eEpRVUZCTEVOQlFVc3NTVUZCVERzN1pVRkRXaXhKUVVGQkxFTkJRVXNzUzBGQlREczdhMEpCUjFBc1EwRkJZeXhKUVVGQkxFTkJRVXM3VTBGSGJrSXNRMEZCU3l4TlFVRk1PMU5CUTBFc1EwRkJTeXhOUVVGTU8xbEJRMDhzU1VGQlFTeERRVUZMT3p0NVFrRkhaQ3cwUWtGQlZUdFRRVU5HTEZkQlFWY3NTVUZCUVN4RFFVRkxMR0ZCUVV3N1UwRkZXQ3hYUVVGWExFbEJRVUVzUTBGQlN6dFRRVU5vUWl4UlFVRlJMRWxCUVVFc1EwRkJTenRUUVVkaUxGZEJRVmNzV1VGQlFTeERRVUZoTEU5QlFVODdWMEZIY2tNc1EwRkJUeXhOUVVGUUxFTkJRV01zU1VGQlFTeERRVUZMTEZGQlFWRTdaVUZUZGtJc1NVRkJRU3hEUVVGTE8xTkJURkE3VTBGRFFUdFRRVU5CTzFOQlEwRTdVMEZEUVR0VFFVbEpMRk5CUVZNc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dFRRVU4wUWl4TlFVRkJMRWxCUVZVc1VVRkJRU3hEUVVGVExGbEJRVlFzUzBGQk1FSXNUMEZCVHp0aFFVTjZReXhMUVVGQkxFTkJRVTBzU1VGQlNUdHBRa0ZGVWl4TlFVRkJMRU5CUVU4c1MwRkJVQ3hMUVVGcFFpeFhRVUZxUWl4SlFVRm5ReXhOUVVGQkxFTkJRVThzVFVGQlVDeExRVUZyUWl4alFVRmpPM0ZDUVVOc1JTeERRVUZMTEdGQlFVd3NSMEZCY1VJN2MwSkJSWEpDTEVOQlFVMHNSVUZCVGl4RFFVRlRMRmxCUVZRc1EwRkJjMEk3YzBKQlEzUkNMRU5CUVUwc1JVRkJUaXhEUVVGVExGbEJRVlFzUTBGQmMwSXNWMEZCUVN4SFFVRmpMRmxCUVZrc1dVRkJRU3hIUVVGbExGbEJRVms3Y1VKQlF6TkZMRU5CUVVzc1lVRkJUQ3hIUVVGeFFqczdaMEpCUld4Q08ybENRVVZFTEUxQlFVRXNRMEZCVHl4TFFVRlFMRXRCUVdsQ08yMUNRVUZoTEUxQlFVRXNRMEZCVHl4TFFVRlFMRWRCUVdVN2FVSkJRemRETEUxQlFVRXNRMEZCVHl4TlFVRlFMRXRCUVd0Q08yMUNRVUZqTEUxQlFVRXNRMEZCVHl4TlFVRlFMRWRCUVdkQ096dGhRVWRzUkN4VFFVRkJMRVZCUVVFc1NVRkJaU3hSUVVGQkxFTkJRVk1zVjBGQlZDeExRVUY1UWl4UFFVRlBPMjFDUVVOcVJDeERRVUZQTEV0QlFWQXNRMEZCWVN4TFFVRmlMRWRCUVhGQ08yMUNRVU55UWl4RFFVRlBMRXRCUVZBc1EwRkJZU3hOUVVGaUxFZEJRWE5DT3pzN1UwRkpjRUlzVjBGQlZ5eEpRVUZCTEVOQlFVc3NZVUZCVER0VFFVTmlMRlZCUVZVc1EwRkJRMU1zVjBGQlFTeERRVUZWTEZWQlFWVTdVMEZETDBJc1UwRkJVenRoUVVOWUxFTkJRVXNzV1VGQlREczdXVUZGU3pzN2VVSkJSMVFzZDBOQlFXZENPMU5CUlZZc1NVRkJRU3hEUVVGTExFMUJRVXdzU1VGQlpTeFBRVUZQTEVsQlFVRXNRMEZCU3l4TlFVRk1MRU5CUVZrc1RVRkJia0lzUzBGQk9FSXNXVUZCV1R0aFFVTXpSQ3hEUVVGTExFMUJRVXdzUTBGQldTeE5RVUZhTEVOQlFXMUNMRWxCUVVFc1EwRkJTenM3TzNsQ1FVazFRaXc0UWtGQlZ6dFRRVU5NTEVOQlFVTXNTVUZCUVN4RFFVRkxMRXRCUVV3c1EwRkJWenRYUVVGVE8xTkJRM0pDTEVOQlFVTXNVMEZCUVN4SlFVRmhPMmRDUVVOb1FpeERRVUZSTEV0QlFWSXNRMEZCWXpzN08xTkJSMmhDTEVOQlFVc3NTVUZCVEN4SFFVRlpMRTFCUVVFc1EwRkJUeXh4UWtGQlVDeERRVUUyUWl4SlFVRkJMRU5CUVVzN1UwRkZNVU1zVFVGQlRVWXNUMEZCUVR0VFFVVktMRTFCUVUwc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dFRRVU5xUWl4clFrRkJhMElzU1VGQlFTeEhRVUZQTzFOQlF6TkNMR05CUVdNc1IwRkJRU3hIUVVGTkxFbEJRVUVzUTBGQlN6dFRRVVYyUWl4WFFVRlhMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmM3VTBGRGRFSXNZMEZCWXl4UFFVRlBMRkZCUVZBc1MwRkJiMElzVVVGQmNFSXNTVUZCWjBNc1VVRkJRU3hEUVVGVE8xTkJSWHBFTEdGQlFXRTdVMEZEV0N4bFFVRmxMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV003VTBGREwwSXNXVUZCUVN4TFFVRnBRaXhUUVVGVE8yOUNRVU0xUWl4SFFVRmpPMWxCUTFRc1NVRkJTU3haUVVGQkxFdEJRV2xDTEZsQlFWazdZVUZEYkVNc1YwRkJRU3hIUVVGakxHbENRVUZwUWp0blFrRkRha01zUjBGQlRTeEhRVUZCTEVkQlFVOHNWMEZCUVN4SFFVRmpPMmxDUVVNelFpeERRVUZMTEZOQlFVd3NSMEZCYVVJN1owSkJRMW83ZFVKQlEwd3NSMEZCWVRzN1dVRkZWanRoUVVOTUxFTkJRVXNzVTBGQlRDeEhRVUZwUWpzN1UwRkhZaXhaUVVGWkxGZEJRVUVzUjBGQll6dFRRVU0xUWl4VlFVRlZMRWxCUVVFc1EwRkJTeXhMUVVGTUxFTkJRVmNzU1VGQldDeEhRVUZyUWl4VFFVRkJMRWRCUVZrc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dFRRVWR1UkN4UFFVRkJMRWRCUVZVc1EwRkJWaXhKUVVGbExHRkJRV0U3WjBKQlF6bENMRWRCUVZVc1VVRkJRU3hIUVVGWE96dFRRVWx1UWl4aFFVRmhPMU5CUTJJc1kwRkJZenRUUVVWYUxGVkJRVlVzU1VGQlFTeERRVUZMTEZGQlFVd3NRMEZCWXl4SlFVRmtMRXRCUVhWQ08xTkJSVzVETEZkQlFVRXNTVUZCWlN4UFFVRkJMRWxCUVZjc1ZVRkJWVHRoUVVWc1F5eFRRVUZUTzNWQ1FVTllMRWRCUVdFN2IwSkJRMklzUjBGQlZTeFBRVUZCTEVkQlFWVTdkMEpCUTNCQ0xFZEJRV003WjBKQlExUTdkVUpCUTB3c1IwRkJZVHR2UWtGRFlpeEhRVUZWTzNWQ1FVTldMRWRCUVdFN08yRkJSMllzUTBGQlN5eFZRVUZNT3p0VFFVZEZMRmxCUVZrN1lVRkRaQ3hEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZZTEVkQlFYVkNPMkZCUTNaQ0xFTkJRVXNzUzBGQlRDeERRVUZYTEVsQlFWZ3NSMEZCYTBJN1lVRkRiRUlzUTBGQlN5eExRVUZNTEVOQlFWY3NVVUZCV0N4SFFVRnpRaXhKUVVGQkxFTkJRVXNzWjBKQlFVd3NRMEZCYzBJc1UwRkJVenRoUVVNdlF5eFpRVUZaTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1lVRkROMElzUTBGQlN5eExRVUZNTEVOQlFWY3NTMEZCV0N4SFFVRnRRaXhKUVVGQkxFTkJRVXNzYjBKQlFVdzdZVUZEWmp0bFFVRmhMRWxCUVVFc1EwRkJTeXhaUVVGTU8yRkJRMklzVTBGQlFTeExRVUZqTEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjN1pVRkJUeXhKUVVGQkxFTkJRVXNzU1VGQlREdGhRVU53UXl4RFFVRkxMRTFCUVV3N1lVRkRRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZZTEVkQlFYVkNPenRUUVVkeVFpeFpRVUZaTzJGQlEyUXNRMEZCU3l4TFFVRk1PenM3ZVVKQlNVb3NPRUpCUVZVc1NVRkJTVHRUUVVOU0xFOUJRVThzUlVGQlVDeExRVUZqTzFkQlFWa3NUVUZCVFN4SlFVRkpMRXRCUVVvc1EwRkJWVHRQUVVNNVF5eERRVUZITEVsQlFVRXNRMEZCU3p0VFFVTlNMRU5CUVVzc1RVRkJURHM3ZVVKQlIwWXNNRUpCUVZNN1UwRkRVQ3hEUVVGTExIRkNRVUZNT3p0NVFrRkhSaXc0UWtGQlZ6dFRRVU5NTEZOQlFVRXNTVUZCWVR0bFFVTm1MRU5CUVU4c2JVSkJRVkFzUTBGQk1rSXNWVUZCVlN4SlFVRkJMRU5CUVVzN1lVRkRNVU1zUTBGQlN5eHJRa0ZCVEN4RFFVRjNRaXhOUVVGNFFqczdVMEZGUlN4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFMUJRVmdzUTBGQmEwSXNaVUZCWlR0aFFVTnVReXhEUVVGTExFdEJRVXdzUTBGQlZ5eE5RVUZZTEVOQlFXdENMR0ZCUVd4Q0xFTkJRV2RETEZkQlFXaERMRU5CUVRSRExFbEJRVUVzUTBGQlN5eExRVUZNTEVOQlFWYzdPenQ1UWtGSk0wUXNNRVJCUVhsQ08xTkJRMjVDTEVOQlFVTXNVMEZCUVR0WFFVRmhPMU5CUTJRc1NVRkJRU3hEUVVGTExGRkJRVXdzUTBGQll5eE5RVUZrTEV0QlFYbENMRXRCUVhwQ0xFdEJRVzFETEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1RVRkJXQ3hKUVVGeFFpeERRVUZETEVsQlFVRXNRMEZCU3l4TFFVRk1MRU5CUVZjc1RVRkJXQ3hEUVVGclFpeG5Ra0ZCWjBJN1lVRkRka1lzWjBKQlFXZENMRWxCUVVFc1EwRkJTeXhSUVVGTUxFTkJRV01zVFVGQlpDeEpRVUYzUWl4UlFVRkJMRU5CUVZNN2MwSkJRM1pFTEVOQlFXTXNWMEZCWkN4RFFVRXdRaXhKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYT3pzN2VVSkJTWHBETEhORFFVRmxPMU5CUTFRc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ5eFRRVUZUTzJGQlEyeENMR05CUVVFc1EwRkJaU3hKUVVGQkxFTkJRVXNzUzBGQlRDeERRVUZYTEZWQlFWVTdhVUpCUTNSRExFTkJRVXNzVFVGQlRDeERRVUZaTEVWQlFWb3NSMEZCYVVJc1NVRkJRU3hEUVVGTExFdEJRVXdzUTBGQlZ6dG5Ra0ZEZGtJN2IwSkJRMFVzU1VGQlFTeERRVUZMTEUxQlFVd3NRMEZCV1RzN096dDVRa0ZMZWtJc2MwTkJRV01zVlVGQlpUczBRMEZCWml4SFFVRlhPenRUUVVWdVFpeFhRVUZYTEZGQlFVRXNRMEZCVXp0VFFVTndRaXhqUVVGakxGRkJRVUVzUTBGQlV6dFRRVU55UWl4WlFVRlpMRTlCUVVFc1EwRkJVU3hSUVVGQkxFTkJRVk1zVjBGQlZ6dFRRVU40UXl4TlFVRk5MRTlCUVVFc1EwRkJVU3hSUVVGQkxFTkJRVk1zUzBGQlN6dFRRVU0xUWl4alFVRmpMRTlCUVU4c1VVRkJVQ3hMUVVGdlFpeFJRVUZ3UWl4SlFVRm5ReXhSUVVGQkxFTkJRVk03VTBGRGRrUXNhVUpCUVdsQ0xFOUJRVThzVjBGQlVDeExRVUYxUWl4UlFVRjJRaXhKUVVGdFF5eFJRVUZCTEVOQlFWTTdVMEZGTjBRc01FSkJRVEJDTEZkQlFVRXNSMEZCWXl4SlFVRkJMRU5CUVVzc1MwRkJUQ3hEUVVGWExFZEJRVUVzUjBGQlRTeFpRVUZaTzFOQlEzSkZMREJDUVVFd1FpeGpRVUZCTEVkQlFXdENMRmRCUVVFc1IwRkJZeXhOUVVGUE8xTkJRMjVGTEZkQlFVRXNTVUZCWlN4alFVRm1MRWxCUVdsRExIVkNRVUZCTEV0QlFUUkNMR0ZCUVdFN1pVRkRkRVVzU1VGQlNTeExRVUZLTEVOQlFWVTdPMU5CUjJRc1QwRkJUeXhSUVVGQkxFTkJRVk1zVlVGQmFFSXNTMEZCSzBJc1YwRkJMMElzU1VGQk9FTXNUMEZCVHl4UlFVRkJMRU5CUVZNc1MwRkJhRUlzUzBGQk1FSXNZVUZCWVR0blFrRkRka1lzUTBGQlVTeEpRVUZTTEVOQlFXRTdPMmRDUVVkbUxFZEJRV01zVDBGQlFTeERRVUZSTEdGQlFXRXNlVUpCUVhsQ08yRkJRelZFTEVkQlFWY3NUMEZCUVN4RFFVRlJMRlZCUVZVc2VVSkJRWGxDTzFOQlJXaEVMRmxCUVZrc1VVRkJRU3hEUVVGVE8xTkJRM0pDTEdGQlFXRXNVVUZCUVN4RFFVRlRPMU5CUTNSQ0xHVkJRV1VzVDBGQlR5eFRRVUZRTEV0QlFYRkNMRkZCUVhKQ0xFbEJRV2xETEZGQlFVRXNRMEZCVXp0VFFVTjZSQ3huUWtGQlowSXNUMEZCVHl4VlFVRlFMRXRCUVhOQ0xGRkJRWFJDTEVsQlFXdERMRkZCUVVFc1EwRkJVenRUUVVjM1JDeFBRVUZQTzFOQlExQXNVVUZCVVR0VFFVTlNMRmRCUVZjN1UwRkRXQ3haUVVGQkxFbEJRV2RDTEdWQlFXVTdaVUZETTBJc1NVRkJTU3hMUVVGS0xFTkJRVlU3V1VGRFdDeEpRVUZKTEdOQlFXTTdZVUZGZGtJc1IwRkJUenRwUWtGRFVDeEhRVUZYTEVsQlFVRXNRMEZCU3l4blFrRkJUQ3hEUVVGelFpeE5RVUZOTzJOQlEzWkRMRWRCUVZFc1NVRkJRU3hEUVVGTExHRkJRVXdzUTBGRFRpeFZRVUZWTEUxQlExWXNZVUZCWVR0WlFVVldMRWxCUVVrc1pVRkJaVHRqUVVWNFFpeEhRVUZSTzJGQlExSXNSMEZCVHl4TFFVRkJMRWRCUVZFN2FVSkJRMllzUjBGQlZ5eEpRVUZCTEVOQlFVc3NaMEpCUVV3c1EwRkJjMElzVFVGQlRUczdXVUZIYkVNN2JVSkJRMHdzVVVGRVN6dGxRVVZNTEVsQlJrczdaMEpCUjB3c1MwRklTenR0UWtGSlRDeFJRVXBMTzNOQ1FVdE1MRmRCVEVzN1kwRk5UQ3hIUVU1TE8yOUNRVTlNT3pzN2VVSkJTVW9zZDBKQlFVOHNWVUZCWlRzN05FTkJRV1lzUjBGQlZ6czdVMEZEV2l4SlFVRkJMRU5CUVVzN1YwRkJVU3hOUVVGTkxFbEJRVWtzUzBGQlNpeERRVUZWTzFOQlJXcERMRU5CUVVzc1UwRkJUQ3hIUVVGcFFpeE5RVUZCTEVOQlFVOHNUVUZCVUN4RFFVRmpMRWxCUVVrc1ZVRkJWU3hKUVVGQkxFTkJRVXM3YTBKQlJXeEVMRU5CUVdNc1NVRkJRU3hEUVVGTE8yVkJSMU1zV1VGQlFTeERRVUZoTEVsQlFVRXNRMEZCU3p0VFFVRjBRenRUUVVGVE8xTkJSVmdzV1VGQldTeEpRVUZCTEVOQlFVc3NXVUZCVEN4RFFVRnJRaXhKUVVGQkxFTkJRVXM3VTBGSGVrTXNRMEZCU3l4TlFVRk1MRWRCUVdNc2EwSkJRMVFzVTBGRVV6dHJRa0ZGV2l4TlFVWlpPMnRDUVVkYUxFOUJTRms3YjBKQlNVUXNRMEZLUXp0clFrRkxTQ3hMUVV4SE8yOUNRVTFFTEV0QlRrTTdhMEpCVDBnc1MwRlFSenR2UWtGUlJDeExRVkpETzIxQ1FWTkdMRWxCUVVFc1EwRkJTeXhSUVZSSU8yVkJWVTRzU1VGQlFTeERRVUZMTEZGQlFVd3NRMEZCWXl4SlFWWlNPelpDUVdGS0xGTkJRVTFRTEUxQlFVRXNRMEZCU3l4TlFVRk1MRXRCWWtZN2FVTkJZMEVzVTBGQlRVRXNUVUZCUVN4RFFVRkxMRlZCUVV3c1MwRmtUanMyUWtGbFJDeGhRVUZQUVN4TlFVRkJMRU5CUVVzc1VVRkJUQ3hEUVVGakxFMUJabkJDT3pKQ1FXZENUaXhUUVVGTlFTeE5RVUZCTEVOQlFVc3NTVUZCVEN4TFFXaENRVHMyUWtGcFFrb3NVMEZCVFVFc1RVRkJRU3hEUVVGTExFMUJRVXdzUzBGcVFrWTdNa0pCYTBKSUxHTkJRVkZCTEUxQlFVRXNRMEZCU3l4TlFVRk1MRU5CUVZrc1QwRnNRbXBDTzJkRFFXMUNReXhqUVVGUFFTeE5RVUZCTEVOQlFVc3NWMEZCVEN4RFFVRnBRaXhQUVc1Q2VrSTdOa0pCYjBKS0xGTkJRVTFCTEUxQlFVRXNRMEZCU3l4TlFVRk1MRXRCY0VKR096SkNRWEZDVGl4VFFVRk5RU3hOUVVGQkxFTkJRVXNzU1VGQlRDeExRWEpDUVRzMFFrRnpRa3dzVTBGQlRVRXNUVUZCUVN4RFFVRkxMRXRCUVV3c1MwRjBRa1E3TWtKQmRVSk9MRk5CUVUxQkxFMUJRVUVzUTBGQlN5eEpRVUZNTzFOQlNXUXNRMEZCU3l4WFFVRk1PMU5CU1VFc1EwRkJTeXhOUVVGTU96dDVRa0ZIUml4clEwRkJXU3haUVVGakxFVkJRVUVzWVVGQllUczdPMWxCUXpsQ0xFbEJRVUVzUTBGQlN5eEpRVUZNTEVOQlFWVXNZMEZCWXl4WlFVRjRRaXhEUVVGeFF5eEpRVUZ5UXl4aFFVRXdRenRsUVVNdlF5eERRVUZMTEVkQlFVdzdaMEpCUTA5Qk96czdlVUpCU1Znc05FSkJRVlU3T3p0VFFVTlNMRU5CUVVzc1MwRkJURHRUUVVOSkxFTkJRVU1zU1VGQlFTeERRVUZMTzFkQlFWRTdVMEZEWkN4UFFVRlBMRWxCUVVFc1EwRkJTeXhOUVVGTUxFTkJRVmtzVFVGQmJrSXNTMEZCT0VJc1dVRkJXVHRoUVVNMVF5eERRVUZMTEdsQ1FVRk1MRmRCUVhWQ0xHZENRVUZUUVN4TlFVRkJMRU5CUVVzc1RVRkJUQ3hEUVVGWkxFMUJRVm9zUTBGQmJVSTdPMU5CUlhKRUxFTkJRVXNzVDBGQlRDeEhRVUZsT3p0NVFrRkhha0lzT0VKQlFWYzdVMEZEVkN4RFFVRkxMRTFCUVV3N1UwRkRRU3hEUVVGTExFOUJRVXc3TzNsQ1FVZEdMSE5DUVVGTkxGbEJRV01zUlVGQlFTeGhRVUZoT3pzN1UwRkZNMElzVDBGQlR5eFpRVUZRTEV0QlFYZENMRmxCUVZrN1pVRkRhRU1zU1VGQlNTeExRVUZLTEVOQlFWVTdPMU5CUjJRc1NVRkJRU3hEUVVGTExGRkJRVkU3WVVGRFppeERRVUZMTEUxQlFVdzdPMU5CUjBVc1QwRkJUeXhYUVVGUUxFdEJRWFZDTEdGQlFXRTdZVUZEZEVNc1EwRkJTeXhOUVVGTUxFTkJRVms3TzFOQlRXUXNRMEZCU3l4VlFVRk1PMU5CUlVrc1ZVRkJWU3hQUVVGQkxFTkJRVkVzVDBGQlVqdFRRVWxXTEVsQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNc1NVRkJTVHRoUVVOb1FpeERRVUZETEZOQlFVRXNTVUZCWVR0dFFrRkRWaXhKUVVGSkxFdEJRVW9zUTBGQlZUczdaMEpCUld4Q0xFZEJRVlVzU1VGQlNTeFBRVUZLTEZkQlFWazdhVUpCUTJoQ0xHZENRVUZuUWtFc1RVRkJRU3hEUVVGTExGRkJRVXdzUTBGQll6dHBRa0ZET1VJN2FVSkJRMEVzWVVGQlFTeERRVUZqTEVsQlFVazdkMEpCUTNCQ0xFZEJRVlVzWVVGQlFTeERRVUZqT3poQ1FVTjRRaXhIUVVGblFpeGhRVUZCTEVOQlFXTTdPMmxDUVVreFFpeHhRa0ZCVnp0eFFrRkZXRHQxUWtGQlV5eEZRVUZCTEVOQlFVY3NUMEZCU0N4blFrRkJZU3hUUVVGTkxFOUJRVUVzUTBGQlVUdHRRa0ZEZUVNc1EwRkJSeXhMUVVGSUxHZENRVUZYTzNsQ1FVTklMRkZCUVZGQkxFMUJRVUVzUTBGQlN6dDVRa0ZEWWl4UFFVRlBRU3hOUVVGQkxFTkJRVXNzVVVGQlRDeERRVUZqTEU5QlFXUXNTMEZCTUVJN2VVSkJRMnBETEZkQlFWY3NTVUZCUVN4SFFVRlBMRVZCUVVFc1EwRkJSeXhSUVVGUkxFVkJRVUVzUTBGQlJ6dDFRa0ZEZEVNc1EwRkJSeXhOUVVGSU8zVkNRVU5CTEVOQlFVY3NXVUZCU0N4RFFVRm5RaXhMUVVGQkxFTkJRVTA3ZFVKQlEzUkNMRU5CUVVjc1dVRkJTQ3hEUVVGblFpeExRVUZCTEVOQlFVMHNaVUZCWlN4TFFVRkJMRU5CUVUwc1owSkJRV2RDTzNsQ1FVTjJSQ3hKUVVGQkxFbEJRVkZCTEUxQlFVRXNRMEZCU3l4UlFVRk1MRU5CUVdNc1dVRkJXVHN5UWtGRGNFTXNRMEZCUnl4aFFVRklMRU5CUVdsQ1FTeE5RVUZCTEVOQlFVc3NVVUZCVEN4RFFVRmpPenN5UWtGSGFrTXNRMEZCU3l4TlFVRk1MRU5CUVZrN05rSkJRVVVzUlVGQlJqdHBRMEZCWXl4RlFVRkJMRU5CUVVjc1RVRkJha0k3YTBOQlFXdERMRVZCUVVFc1EwRkJSeXhUUVVGSUxFTkJRV0U3T3pSQ1FVTXpSRHM3TzJsQ1FVdEJMRTlCUVU4c1lVRkJVQ3hMUVVGNVFpeFpRVUZaTzNGQ1FVTnVReXhoUVVGS0xFTkJRV3RDTzI5Q1FVTmlPM0ZDUVVORUxFOUJRVThzVFVGQlFTeERRVUZQTEZsQlFXUXNTMEZCSzBJc1dVRkJXVHN5UWtGRGRrTXNTVUZCU1N4TFFVRktMRU5CUVZVN08zbENRVVZzUWl4RFFVRlRPenM3TzFsQlMxSXNUMEZCUVN4RFFVRlJMRWxCUVZJc1lVRkJZVHRoUVVWa0xGTkJRVk1zV1VGQlFTeERRVUZoUVN4TlFVRkJMRU5CUVVzN1lVRkRNMElzUTBGQlExRXNWMEZCUVN4RFFVRlZMRk5CUVZNN2JVSkJRM1JDTEVkQlFWTXNUMEZCUVN4RFFVRlJMRTlCUVZJc1EwRkJaMEk3TzJkQ1FVVndRanRQUVU1R0xFTkJUMG9zU1VGUVNTeFhRVTlETzJGQlEwWXNRMEZCUXp0bFFVRlJMRTFCUVVFc1IwRkJVenRsUVVOMFFpeERRVUZMTEU5QlFVd3NSMEZCWlR0aFFVZFlMRk5CUVVFc1NVRkJZVHR0UWtGRFppeERRVUZMTEd0Q1FVRk1MRU5CUVhkQ0xFMUJRWGhDTzIxQ1FVTkJMRU5CUVU4c1owSkJRVkFzUTBGQmQwSXNWVUZCVlZJc1RVRkJRU3hEUVVGTE96dGxRVWQ2UXl4RFFVRkxMRmRCUVV3N1pVRk5RU3hEUVVGTExGbEJRVXc3WjBKQlEwOUJPMDlCZUVKR0xFTkJlVUpLTEV0QmVrSkpMRmRCZVVKRk8yZENRVU5RTEVOQlFWRXNTVUZCVWl4RFFVRmhMSGxHUVVGQkxFZEJRVFJHTEVkQlFVRXNRMEZCU1R0bFFVTjJSenM3T3pzN08wTkRNemxDV2tVc1NVRkJUU3hSUVVGUk8wTkJRMlJCTEVsQlFVMHNiMEpCUVc5Q08wTkJSVEZDTEZOQlFWTXNZMEZCWlR0TFFVTjBRa0VzU1VGQlRTeFRRVUZUTEZsQlFVRTdTMEZEWml4UFFVRlBMRTFCUVVFc1NVRkJWU3hOUVVGQkxFTkJRVTg3T3p0RFFVY3hRaXhUUVVGVExGTkJRVlVzU1VGQlNUdExRVU55UWtFc1NVRkJUU3hUUVVGVExGbEJRVUU3UzBGRFppeEpRVUZKTEVOQlFVTTdWMEZCVVN4UFFVRlBPMHRCUTNCQ0xFMUJRVUVzUTBGQlR5eE5RVUZRTEVkQlFXZENMRTFCUVVFc1EwRkJUeXhOUVVGUUxFbEJRV2xDTzB0QlEycERMRTlCUVU4c1RVRkJRU3hEUVVGUExFMUJRVkFzUTBGQll6czdPME5CUjNaQ0xGTkJRVk1zVTBGQlZTeEZRVUZKTEVWQlFVRXNUVUZCVFR0TFFVTXpRa0VzU1VGQlRTeFRRVUZUTEZsQlFVRTdTMEZEWml4SlFVRkpMRU5CUVVNN1YwRkJVU3hQUVVGUE8wdEJRM0JDTEUxQlFVRXNRMEZCVHl4TlFVRlFMRWRCUVdkQ0xFMUJRVUVzUTBGQlR5eE5RVUZRTEVsQlFXbENPMHRCUTJwRExFMUJRVUVzUTBGQlR5eE5RVUZRTEVOQlFXTXNSMEZCWkN4SFFVRnZRanM3TzBOQlIzUkNMRk5CUVZNc1dVRkJZU3hWUVVGWkxFVkJRVUVzWVVGQllUdExRVVUzUXl4UFFVRlBMRmRCUVVFc1EwRkJXU3hQUVVGYUxFZEJRWE5DTzFOQlFVVXNUVUZCVFN4VlFVRkJMRU5CUVZjc1MwRkJXQ3hEUVVGcFFqdFRRVUZUT3pzN1EwRkhha1VzVTBGQlV5eGhRVUZqTEUxQlFWRXNSVUZCUVN4VlFVRmxPM2REUVVGbUxFZEJRVmM3TzB0QlEzaERMRWxCUVVrc1VVRkJRU3hEUVVGVExFbEJRVWs3VTBGRFppeEpRVUZKTEZGQlFVRXNRMEZCVXl4TlFVRlVMRWxCUVc5Q0xGRkJRVUVzUTBGQlV5eFBRVUZVTEVsQlFXOUNMRTlCUVU4c1VVRkJRU3hEUVVGVExFOUJRV2hDTEV0QlFUUkNMRlZCUVZjN1lVRkRha1lzVFVGQlRTeEpRVUZKTEV0QlFVb3NRMEZCVlRzN1UwRkpiRUpCTEVsQlFVMHNWVUZCVlN4UFFVRlBMRkZCUVVFc1EwRkJVeXhQUVVGb1FpeExRVUUwUWl4UlFVRTFRaXhIUVVGMVF5eFJRVUZCTEVOQlFWTXNWVUZCVlR0VFFVTXhSU3hSUVVGQkxFZEJRVmNzVFVGQlFTeERRVUZQTEUxQlFWQXNRMEZCWXl4SlFVRkpMRlZCUVZVN1lVRkJSU3hSUVVGUkxFdEJRVlk3YzBKQlFXbENPenM3UzBGSE1VUkJMRWxCUVUwc1VVRkJVU3hYUVVGQk8wdEJRMlJTTEVsQlFVazdTMEZEU2l4SlFVRkpMRTlCUVU4N1UwRkpWQ3hMUVVGQkxFZEJRVkVzVDBGQlFTeERRVUZSTEZGQlFVRXNRMEZCVXl4SlFVRkpPenRMUVVVdlFrRXNTVUZCU1N4alFVRmpMRXRCUVVFc1NVRkJVeXhQUVVGUExFdEJRVkFzUzBGQmFVSTdTMEZGTlVNc1NVRkJTU3hYUVVGQkxFbEJRV1VzYVVKQlFVRXNRMEZCYTBJc1VVRkJiRUlzUTBGQk1rSXNVVUZCVVR0VFFVTndSQ3hQUVVGQkxFTkJRVkVzU1VGQlVpeERRVUZoTEhGTFFVRnhTenRUUVVOc1RDeFhRVUZCTEVkQlFXTTdPMHRCUjJoQ1FTeEpRVUZKTEZWQlFWVXNUMEZCUVN4RFFVRlJMRTlCUVZJN1MwRkZaQ3hKUVVGSkxHRkJRV0U3VTBGRlppeHBRa0ZCUVN4RFFVRnJRaXhKUVVGc1FpeERRVUYxUWp0VFFVVjJRbEVzU1VGQlRTeGxRVUZsTEZGQlFVRXNRMEZCVXp0VFFVTTVRaXhKUVVGSkxHTkJRV003WVVGRGFFSkJMRWxCUVUwc2JVSkJRVTg3YVVKQlJWaEJMRWxCUVUwc1YwRkJWeXhYUVVGQkxFTkJRVmtzV1VGQlFTeERRVUZoTEZOQlFWTTdhVUpCUlc1RUxGbEJRVUVzUTBGQllTeFBRVUZpTEVOQlFYRkNMRTlCUVhKQ08ybENRVVZCTEU5QlFVODdPMkZCU1ZRc1QwRkJRU3hIUVVGVkxGbEJRVUVzUTBGQllTeEpRVUZpTEVOQlFXdENMRWxCUVd4Q0xFTkJRWFZDTEV0QlFYWkNMRU5CUVRaQ0xFdEJRVGRDTEVOQlFXMURPenM3UzBGSmFrUXNUMEZCVHl4UFFVRkJMRU5CUVZFc1NVRkJVaXhYUVVGaE8xTkJRMnhDUVN4SlFVRk5MRlZCUVZVc1NVRkJTU3hoUVVGS08xTkJRMmhDVWl4SlFVRkpPMU5CUTBvc1NVRkJTU3hSUVVGUk8yRkJSVllzVVVGQlFTeEhRVUZYTEUxQlFVRXNRMEZCVHl4TlFVRlFMRU5CUVdNc1NVRkJTU3hWUVVGVk8yRkJSM1pETEU5QlFVRXNRMEZCVVN4TFFVRlNMRU5CUVdNN1lVRkhaQ3hQUVVGQkxFTkJRVkVzUzBGQlVqdGhRVWRCTEUxQlFVRXNSMEZCVXl4UFFVRkJMRU5CUVZFc1ZVRkJVaXhEUVVGdFFqdG5Ra0ZEZGtJN1lVRkRUQ3hOUVVGQkxFZEJRVk1zVDBGQlFTeERRVUZSTEU5QlFWSXNRMEZCWjBJN08xTkJSVE5DTEVsQlFVa3NZVUZCWVR0aFFVTm1MRkZCUVVFc1EwRkJVeXhQUVVGUE8ybENRVUZGTEUxQlFVMHNUVUZCVWpzd1FrRkJaMEk3T3p0VFFVVnNReXhQUVVGUE96czdPME5CUzFnc1dVRkJRU3hEUVVGaExGbEJRV0lzUjBGQk5FSTdRMEZETlVJc1dVRkJRU3hEUVVGaExGVkJRV0lzUjBGQk1FSm5RanM3T3pzN096czdJbjA9XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHl7XFxyXFxuY29sb3I6cmdiKDI3LCA3MiwgODQpO1xcclxcbmJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcXHJcXG59XFxyXFxudmlkZW97XFxyXFxuLyogd2lkdGg6MzAlOyAqL1xcclxcbmJvcmRlci1yYWRpdXM6NHB4O1xcclxcbmJvcmRlcjoxcHggc29saWQgYmxhY2s7XFxyXFxuZmxvYXQ6bGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuY2FudmFze1xcclxcbi8qIHdpZHRoOjMwJTsgKi9cXHJcXG5ib3JkZXItcmFkaXVzOjRweDtcXHJcXG5ib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1xcclxcbmZsb2F0OmxlZnQ7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbiNjb250cm9sc3tcXHJcXG53aWR0aDoxMDAlO1xcclxcbmRpc3BsYXk6IGZsZXg7XFxyXFxuY2xlYXI6IGJvdGg7XFxyXFxufVxcclxcblxcclxcbiNjb250cm9scyBkaXZ7XFxyXFxud2lkdGg6MTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0FBQ0EscUJBQXFCO0FBQ3JCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQixzQkFBc0I7QUFDdEIsVUFBVTtBQUNWOztBQUVBO0FBQ0EsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQixzQkFBc0I7QUFDdEIsVUFBVTs7QUFFVjs7QUFFQTtBQUNBLFVBQVU7QUFDVixhQUFhO0FBQ2IsV0FBVztBQUNYOztBQUVBO0FBQ0EsVUFBVTtBQUNWXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHl7XFxyXFxuY29sb3I6cmdiKDI3LCA3MiwgODQpO1xcclxcbmJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTtcXHJcXG59XFxyXFxudmlkZW97XFxyXFxuLyogd2lkdGg6MzAlOyAqL1xcclxcbmJvcmRlci1yYWRpdXM6NHB4O1xcclxcbmJvcmRlcjoxcHggc29saWQgYmxhY2s7XFxyXFxuZmxvYXQ6bGVmdDtcXHJcXG59XFxyXFxuXFxyXFxuY2FudmFze1xcclxcbi8qIHdpZHRoOjMwJTsgKi9cXHJcXG5ib3JkZXItcmFkaXVzOjRweDtcXHJcXG5ib3JkZXI6MXB4IHNvbGlkIGJsYWNrO1xcclxcbmZsb2F0OmxlZnQ7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbiNjb250cm9sc3tcXHJcXG53aWR0aDoxMDAlO1xcclxcbmRpc3BsYXk6IGZsZXg7XFxyXFxuY2xlYXI6IGJvdGg7XFxyXFxufVxcclxcblxcclxcbiNjb250cm9scyBkaXZ7XFxyXFxud2lkdGg6MTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbaV0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIGFyZ3VtZW50c1tpXTtcbiAgICB9XG59O1xuIiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb25cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChmbikge1xuICBpZiAoIWZuKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgdmFyIHN0cmluZyA9IHRvU3RyaW5nLmNhbGwoZm4pXG4gIHJldHVybiBzdHJpbmcgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHxcbiAgICAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHN0cmluZyAhPT0gJ1tvYmplY3QgUmVnRXhwXScpIHx8XG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgIC8vIElFOCBhbmQgYmVsb3dcbiAgICAgKGZuID09PSB3aW5kb3cuc2V0VGltZW91dCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5hbGVydCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5jb25maXJtIHx8XG4gICAgICBmbiA9PT0gd2luZG93LnByb21wdCkpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBpc1Byb21pc2U7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gaXNQcm9taXNlO1xuXG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiAhIW9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIG9iai50aGVuID09PSAnZnVuY3Rpb24nO1xufVxuIiwidmFyIGxvYWRlcnMgPSByZXF1aXJlKCcuL2xvYWRlcnMnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgaXNQcm9taXNlID0gcmVxdWlyZSgnaXMtcHJvbWlzZScpO1xudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb2FkQXNzZXQ7XG5cbm1vZHVsZS5leHBvcnRzLmFsbCA9IGZ1bmN0aW9uIGFsbCAob3B0LCBwcm9ncmVzcykge1xuICByZXR1cm4gbG9hZE11bHRpcGxlKG9wdCwgcHJvZ3Jlc3MsIGZhbHNlKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLmFueSA9IGZ1bmN0aW9uIGFueSAob3B0LCBwcm9ncmVzcykge1xuICByZXR1cm4gbG9hZE11bHRpcGxlKG9wdCwgcHJvZ3Jlc3MsIHRydWUpO1xufTtcblxuZnVuY3Rpb24gbG9hZE11bHRpcGxlIChvcHQsIHByb2dyZXNzLCBza2lwTWlzc2luZykge1xuICBwcm9ncmVzcyA9IHByb2dyZXNzIHx8IG5vb3A7XG4gIGlmICh0eXBlb2YgcHJvZ3Jlc3MgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdUaGUgc2Vjb25kIGFyZ3VtZW50IHRvIGxvYWQuYWxsKCkgYW5kIGxvYWQuYW55KCkgbXVzdCBiZSBhIGZ1bmN0aW9uLCBvciB1bmRlZmluZWQnKSk7XG4gIH1cblxuICB2YXIgdG90YWw7XG4gIHZhciBjb3VudCA9IDA7XG4gIHZhciBsb2FkO1xuICB2YXIgZW1pdFByb2dyZXNzID0gZnVuY3Rpb24gKGl0ZW0sIHZhbHVlLCBjb3VudCwgZXJyb3IpIHtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgdGFyZ2V0OiBpdGVtLFxuICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgY291bnQ6IGNvdW50LFxuICAgICAgcHJvZ3Jlc3M6IGNvdW50IC8gdG90YWwsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9O1xuICAgIGlmIChlcnJvcikgb2JqLmVycm9yID0gZXJyb3I7XG4gICAgcHJvZ3Jlc3Mob2JqKTtcbiAgfTtcblxuICBpZiAoc2tpcE1pc3NpbmcpIHtcbiAgICBsb2FkID0gZnVuY3Rpb24gKG9wdCkge1xuICAgICAgcmV0dXJuIGxvYWRBc3NldChvcHQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4geyB2YWx1ZTogcmVzdWx0IH07XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG51bGwsIGVycm9yOiBlcnJvciB9O1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAob3B0aW9uYWwpIHtcbiAgICAgICAgZW1pdFByb2dyZXNzKG9wdCwgb3B0aW9uYWwudmFsdWUsICsrY291bnQsIG9wdGlvbmFsLmVycm9yKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbmFsLnZhbHVlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBsb2FkID0gZnVuY3Rpb24gKG9wdCkge1xuICAgICAgcmV0dXJuIGxvYWRBc3NldChvcHQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICBlbWl0UHJvZ3Jlc3Mob3B0LCByZXN1bHQsICsrY291bnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9wdCkpIHtcbiAgICB0b3RhbCA9IG9wdC5sZW5ndGg7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKG9wdC5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBsb2FkKGl0ZW0pO1xuICAgIH0pKTtcbiAgfSBlbHNlIGlmIChvcHQpIHtcbiAgICB2YXIgZW50cmllcyA9IE9iamVjdC5rZXlzKG9wdCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiB7IGtleToga2V5LCB2YWx1ZTogb3B0W2tleV0gfTtcbiAgICB9KTtcbiAgICB0b3RhbCA9IGVudHJpZXMubGVuZ3RoO1xuICAgIHJldHVybiBQcm9taXNlLmFsbChlbnRyaWVzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGtleSA9IGl0ZW0ua2V5O1xuICAgICAgcmV0dXJuIGxvYWQoaXRlbS52YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBrZXk6IGtleSB9O1xuICAgICAgfSk7XG4gICAgfSkpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHtcbiAgICAgIHJldHVybiByZXN1bHRzLnJlZHVjZShmdW5jdGlvbiAob2JqLCBpdGVtKSB7XG4gICAgICAgIG9ialtpdGVtLmtleV0gPSBpdGVtLnZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSwge30pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1lvdSBtdXN0IHNwZWNpZnkgYW4gYXJyYXkgb2YgYXNzZXRzIG9yIG9iamVjdCBncm91cCB0byBsb2FkJykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRBc3NldCAob3B0KSB7XG4gIGlmICghb3B0KSByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdZb3UgbXVzdCBzcGVjaWZ5IGEgVVJMIG9yIGRlc2NyaXB0b3Igb2YgdGhlIGFzc2V0IHRvIGxvYWQnKSk7XG4gIGlmICh0eXBlb2Ygb3B0ID09PSAnc3RyaW5nJykge1xuICAgIG9wdCA9IHsgdXJsOiBvcHQgfTtcbiAgfVxuICAvLyBJZiBpdCdzIGEgcHJvbWlzZSwgYXNzdW1lIG5lc3RlZCBmZWF0dXJlcy4uLlxuICBpZiAoaXNQcm9taXNlKG9wdCkpIHJldHVybiBvcHQ7XG4gIHJldHVybiBnZXRMb2FkZXIob3B0KS50aGVuKGZ1bmN0aW9uIChsb2FkZXIpIHtcbiAgICBvcHQgPSBhc3NpZ24oe30sIG9wdCk7XG4gICAgZGVsZXRlIG9wdC50eXBlO1xuICAgIHJldHVybiBsb2FkZXIob3B0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldExvYWRlciAob3B0KSB7XG4gIHZhciBpLCBsb2FkZXI7XG4gIHZhciB0eXBlID0gb3B0LnR5cGUgPyBvcHQudHlwZSA6IG51bGw7XG4gIGlmICh0eXBlKSB7XG4gICAgLy8gQWxsb3cgdXNlciB0byBzcGVjaWZ5IGN1c3RvbSB0eXBlIGZ1bmN0aW9uXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICAvLyBVc2VyIHNwZWNpZmllZCBhbiBleHBsaWNpdCB0eXBlLCB1c2UgdGhhdC5cbiAgICBpZiAoIW9wdC51cmwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1doZW4gdXNpbmcgbG9hZEFzc2V0KCksIHlvdSBtdXN0IHNwZWNpZnkgYSBVUkwgb3IgZGVzY3JpcHRvciBvZiB0aGUgYXNzZXQgdG8gbG9hZCcpKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGxvYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxvYWRlciA9IGxvYWRlcnNbaV07XG4gICAgICBpZiAobG9hZGVyLmtleSA9PT0gdHlwZSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsb2FkZXIubG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFuIGFzc2V0IGxvYWRlciBieSB0aGUga2V5IFwiJyArIG9wdC50eXBlICsgJ1wiJykpO1xuICB9IGVsc2Uge1xuICAgIC8vIFVzZXIgZGlkbid0IHNwZWNpZnkgdHlwZSwgdHJ5IHRvIGluZmVyIGZyb20gZmlsZSBleHRlbnNpb25cbiAgICBpZiAoIW9wdC51cmwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1doZW4gdXNpbmcgbG9hZEFzc2V0KCksIHlvdSBtdXN0IHNwZWNpZnkgYSBVUkwgb3IgZGVzY3JpcHRvciBvZiB0aGUgYXNzZXQgdG8gbG9hZCcpKTtcbiAgICB9XG4gICAgdmFyIGV4dCA9IGV4dG5hbWUob3B0LnVybCk7XG4gICAgaWYgKCFleHQpIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGV4dGVuc2lvbiBmb3VuZCBmb3IgaW5wdXQgVVJMIFwiJyArIG9wdC51cmwgKyAnXCIsIHRyeSB0byBzcGVjaWZ5IGEgeyB0eXBlIH0gc3VjaCBhcyBcImltYWdlXCIgb3IgXCJ0ZXh0XCInKSk7XG4gICAgZm9yIChpID0gMDsgaSA8IGxvYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxvYWRlciA9IGxvYWRlcnNbaV07XG4gICAgICBpZiAoIWxvYWRlci5tYXRjaCkgY29udGludWU7XG4gICAgICB2YXIgaXNNYXRjaCA9IHR5cGVvZiBsb2FkZXIubWF0Y2ggPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBsb2FkZXIubWF0Y2goZXh0KVxuICAgICAgICA6IGxvYWRlci5tYXRjaC50ZXN0KGV4dCk7XG4gICAgICBpZiAoaXNNYXRjaCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShsb2FkZXIubG9hZCk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0NvdWxkIG5vdCBpbmZlciBhbiBhc3NldCBsb2FkZXIgZnJvbSB0aGUgZmlsZSB0eXBlIFwiJyArIGV4dCArICdcIiwgdHJ5IHNwZWNpZnlpbmcgeyB0eXBlIH0gc3VjaCBhcyBcImltYWdlXCIgb3IgXCJ0ZXh0XCInKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0bmFtZSAodXJsKSB7XG4gIGlmICghdXJsKSByZXR1cm4gJyc7XG4gIHZhciBpZHggPSB1cmwubGFzdEluZGV4T2YoJy8nKTtcbiAgaWYgKGlkeCAhPT0gLTEpIHVybCA9IHVybC5zdWJzdHJpbmcoaWR4ICsgMSk7IC8vIEtlZXAgcGF0aCB3aXRob3V0IGl0cyBzZWdtZW50c1xuICBpZHggPSB1cmwuaW5kZXhPZignPycpO1xuICBpZiAoaWR4ICE9PSAtMSkgdXJsID0gdXJsLnN1YnN0cmluZygwLCBpZHgpOyAvLyBSZW1vdmUgcXVlcnlcbiAgaWR4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgaWYgKGlkeCAhPT0gLTEpIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgaWR4KTsgLy8gUmVtb3ZlIGZyYWdtZW50XG4gIGlkeCA9IHVybC5sYXN0SW5kZXhPZignLicpO1xuICByZXR1cm4gaWR4ICE9PSAtMSA/IHVybC5zdWJzdHJpbmcoaWR4KSA6ICcnO1xufVxuIiwidmFyIHhociA9IHJlcXVpcmUoJ3hocicpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodHlwZSkge1xuICByZXR1cm4gZnVuY3Rpb24gbG9hZEZpbGUgKG9wdCkge1xuICAgIHZhciBwO1xuICAgIGlmICgnZmV0Y2gnIGluIHdpbmRvdykge1xuICAgICAgcCA9IHdpbmRvdy5mZXRjaChvcHQudXJsLCBvcHQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGlmICgvNDA0Ly50ZXN0KHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzb3VyY2Ugbm90IGZvdW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghL14yLy50ZXN0KHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBIVFRQIFN0YXR1cyBDb2RlOiAnICsgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNwb25zZSBub3QgT0snKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdiaW5hcnknKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdibG9iJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwID0geGhyRmV0Y2godHlwZSwgb3B0KTtcbiAgICB9XG4gICAgcmV0dXJuIHAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBlcnIubWVzc2FnZSArICcgd2hpbGUgbG9hZGluZyBmaWxlICcgKyBvcHQudXJsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufTtcblxuZnVuY3Rpb24geGhyRmV0Y2ggKHR5cGUsIG9wdCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXNwb25zZVR5cGUgPSAndGV4dCc7XG4gICAgaWYgKHR5cGUgPT09ICdqc29uJykgcmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdiaW5hcnknKSByZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgIGVsc2UgaWYgKHR5cGUgPT09ICdibG9iJykgcmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgIG9wdCA9IGFzc2lnbih7fSwgb3B0LCB7XG4gICAgICBqc29uOiBmYWxzZSxcbiAgICAgIHJlc3BvbnNlVHlwZTogcmVzcG9uc2VUeXBlXG4gICAgfSk7XG4gICAgeGhyKG9wdCwgZnVuY3Rpb24gKGVyciwgcmVzLCBib2R5KSB7XG4gICAgICBpZiAoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICBpZiAoLzQwNC8udGVzdChyZXMuc3RhdHVzQ29kZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNvdXJjZSBub3QgZm91bmQnKTtcbiAgICAgIH1cbiAgICAgIGlmICghL14yLy50ZXN0KHJlcy5zdGF0dXNDb2RlKSkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcignVW5leHBlY3RlZCBIVFRQIFN0YXR1cyBDb2RlOiAnICsgcmVzLnN0YXR1c0NvZGUpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAnanNvbicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNvbHZlKGJvZHkpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsInZhciBtaW1lID0gcmVxdWlyZSgnYnJvd3Nlci1tZWRpYS1taW1lLXR5cGUnKTtcblxuZnVuY3Rpb24gZ2V0TWVkaWFUeXBlIChleHQpIHtcbiAgdmFyIHJlc3VsdCA9IG1pbWUoZXh0KTtcbiAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xuICBpZiAocmVzdWx0LmluZGV4T2YoJ2F1ZGlvJykgPT09IDApIHJldHVybiAnYXVkaW8nO1xuICBpZiAocmVzdWx0LmluZGV4T2YoJ3ZpZGVvJykgPT09IDApIHJldHVybiAndmlkZW8nO1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVNZWRpYUxvYWRlciAodHlwZSwgY3JlYXRlRWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIGtleTogdHlwZSxcbiAgICBtYXRjaDogZnVuY3Rpb24gKGV4dCkge1xuICAgICAgcmV0dXJuIGdldE1lZGlhVHlwZShleHQpID09PSB0eXBlO1xuICAgIH0sXG4gICAgbG9hZDogZnVuY3Rpb24gKG9wdCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBtZWRpYSA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgdmFyIG9uTG9hZGVkID0gZnVuY3Rpb24gb25Mb2FkZWQgKCkge1xuICAgICAgICAgIGlmIChmaW5pc2hlZCkgcmV0dXJuO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKG1lZGlhKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXZlbnQgPSAob3B0LmV2ZW50IHx8ICdjYW5wbGF5JykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbG9hZGVkbWV0YWRhdGEnKSB7XG4gICAgICAgICAgbWVkaWEub25sb2FkZWRtZXRhZGF0YSA9IG9uTG9hZGVkO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnY2FucGxheXRocm91Z2gnKSB7XG4gICAgICAgICAgbWVkaWEub25jYW5wbGF5dGhyb3VnaCA9IG9uTG9hZGVkO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnbG9hZGVkZGF0YScpIHtcbiAgICAgICAgICBtZWRpYS5vbmxvYWRlZGRhdGEgPSBvbkxvYWRlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZWRpYS5vbmNhbnBsYXkgPSBvbkxvYWRlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIG1lZGlhLm9uZXJyb3IgPSBmdW5jdGlvbiBvbkVycm9yIChlcikge1xuICAgICAgICAgIGlmIChmaW5pc2hlZCkgcmV0dXJuO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdFcnJvciB3aGlsZSBsb2FkaW5nICcgKyB0eXBlICsgJyBhdCAnICsgb3B0LnVybCkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHBhc3MgdGhyb3VnaCBtZWRpYSBwcm9wZXJ0aWVzIGlmIGRlZmluZWRcbiAgICAgICAgaWYgKG9wdC5jcm9zc09yaWdpbikgbWVkaWEuY3Jvc3NPcmlnaW4gPSBvcHQuY3Jvc3NPcmlnaW47XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0LnZvbHVtZSAhPT0gJ3VuZGVmaW5lZCcpIG1lZGlhLnZvbHVtZSA9IG9wdC52b2x1bWU7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0LnByZWxvYWQgIT09ICd1bmRlZmluZWQnKSBtZWRpYS5wcmVsb2FkID0gb3B0LnZvbHVtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHQucGxheWJhY2tSYXRlICE9PSAndW5kZWZpbmVkJykgbWVkaWEucGxheWJhY2tSYXRlID0gb3B0LnZvbHVtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHQubXV0ZWQgIT09ICd1bmRlZmluZWQnKSBtZWRpYS5tdXRlZCA9IG9wdC52b2x1bWU7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0LmN1cnJlbnRUaW1lICE9PSAndW5kZWZpbmVkJykgbWVkaWEuY3VycmVudFRpbWUgPSBvcHQudm9sdW1lO1xuICAgICAgICBpZiAodHlwZW9mIG9wdC5jb250cm9scyAhPT0gJ3VuZGVmaW5lZCcpIG1lZGlhLmNvbnRyb2xzID0gb3B0LnZvbHVtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHQuYXV0b1BsYXkgIT09ICd1bmRlZmluZWQnKSBtZWRpYS5hdXRvUGxheSA9IG9wdC52b2x1bWU7XG5cbiAgICAgICAgbWVkaWEuc3JjID0gb3B0LnVybDtcblxuICAgICAgICBpZiAobWVkaWEucmVhZHlTdGF0ZSA+PSBtZWRpYS5IQVZFX0VOT1VHSF9EQVRBKSB7XG4gICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKG1lZGlhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1lZGlhLmxvYWQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG4iLCJjb25zdCBjcmVhdGVNZWRpYUxvYWRlciA9IHJlcXVpcmUoJy4vY3JlYXRlTWVkaWFMb2FkZXInKTtcbmNvbnN0IGNyZWF0ZUZpbGVMb2FkZXIgPSByZXF1aXJlKCcuL2NyZWF0ZUZpbGVMb2FkZXInKTtcbmNvbnN0IGxvYWRJbWFnZSA9IHJlcXVpcmUoJy4vbG9hZEltYWdlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBqc29uXG4gIHtcbiAgICBrZXk6ICdqc29uJyxcbiAgICBtYXRjaDogL1xcLmpzb24kL2ksXG4gICAgbG9hZDogY3JlYXRlRmlsZUxvYWRlcignanNvbicpXG4gIH0sXG4gIC8vIHRleHRcbiAge1xuICAgIGtleTogJ3RleHQnLFxuICAgIG1hdGNoOiAvXFwudHh0JC9pLFxuICAgIGxvYWQ6IGNyZWF0ZUZpbGVMb2FkZXIoJ3RleHQnKVxuICB9LFxuICAvLyBpbWFnZVxuICB7XG4gICAga2V5OiAnaW1hZ2UnLFxuICAgIG1hdGNoOiAvXFwuKGpwZ3xqcGVnfHN2Z3xwbmd8Z2lmfHdlYnB8Ym1wfHRnYXx0aWZ8YXBuZ3x3YnBtfGljbykkL2ksXG4gICAgbG9hZDogbG9hZEltYWdlXG4gIH0sXG4gIC8vIGF1ZGlvXG4gIGNyZWF0ZU1lZGlhTG9hZGVyKCdhdWRpbycsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbmV3IHdpbmRvdy5BdWRpbygpO1xuICB9KSxcbiAgLy8gdmlkZW9cbiAgY3JlYXRlTWVkaWFMb2FkZXIoJ3ZpZGVvJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICB9KSxcbiAgLy8gYmluYXJ5XG4gIHtcbiAgICBrZXk6ICdiaW5hcnknLFxuICAgIG1hdGNoOiAvXFwuYmluJC9pLFxuICAgIGxvYWQ6IGNyZWF0ZUZpbGVMb2FkZXIoJ2JpbmFyeScpXG4gIH0sXG4gIC8vIGJsb2JcbiAge1xuICAgIGtleTogJ2Jsb2InLFxuICAgIGxvYWQ6IGNyZWF0ZUZpbGVMb2FkZXIoJ2Jsb2InKVxuICB9XG5dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgdmFyIGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uIG9uTG9hZGVkICgpIHtcbiAgICAgIGlmIChmaW5pc2hlZCkgcmV0dXJuO1xuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgfTtcbiAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24gb25FcnJvciAoKSB7XG4gICAgICBpZiAoZmluaXNoZWQpIHJldHVybjtcbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0Vycm9yIHdoaWxlIGxvYWRpbmcgaW1hZ2UgYXQgJyArIG9wdC51cmwpKTtcbiAgICB9O1xuICAgIGlmIChvcHQuY3Jvc3NPcmlnaW4pIGltYWdlLmNyb3NzT3JpZ2luID0gb3B0LmNyb3NzT3JpZ2luO1xuICAgIGltYWdlLnNyYyA9IG9wdC51cmw7XG4gIH0pO1xufTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCJ2YXIgdHJpbSA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cbiAgLCBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gIGlmICghaGVhZGVycylcbiAgICByZXR1cm4ge31cblxuICB2YXIgcmVzdWx0ID0ge31cblxuICB2YXIgaGVhZGVyc0FyciA9IHRyaW0oaGVhZGVycykuc3BsaXQoJ1xcbicpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWFkZXJzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJvdyA9IGhlYWRlcnNBcnJbaV1cbiAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgIGlmICh0eXBlb2YocmVzdWx0W2tleV0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgIHJlc3VsdFtrZXldLnB1c2godmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB3aWR0aCA9IDI1NjsvLyBlYWNoIFJDNCBvdXRwdXQgaXMgMCA8PSB4IDwgMjU2XHJcbnZhciBjaHVua3MgPSA2Oy8vIGF0IGxlYXN0IHNpeCBSQzQgb3V0cHV0cyBmb3IgZWFjaCBkb3VibGVcclxudmFyIGRpZ2l0cyA9IDUyOy8vIHRoZXJlIGFyZSA1MiBzaWduaWZpY2FudCBkaWdpdHMgaW4gYSBkb3VibGVcclxudmFyIHBvb2wgPSBbXTsvLyBwb29sOiBlbnRyb3B5IHBvb2wgc3RhcnRzIGVtcHR5XHJcbnZhciBHTE9CQUwgPSB0eXBlb2YgZ2xvYmFsID09PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcclxuXHJcbi8vXHJcbi8vIFRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGFyZSByZWxhdGVkIHRvIElFRUUgNzU0IGxpbWl0cy5cclxuLy9cclxudmFyIHN0YXJ0ZGVub20gPSBNYXRoLnBvdyh3aWR0aCwgY2h1bmtzKSxcclxuICAgIHNpZ25pZmljYW5jZSA9IE1hdGgucG93KDIsIGRpZ2l0cyksXHJcbiAgICBvdmVyZmxvdyA9IHNpZ25pZmljYW5jZSAqIDIsXHJcbiAgICBtYXNrID0gd2lkdGggLSAxO1xyXG5cclxuXHJcbnZhciBvbGRSYW5kb20gPSBNYXRoLnJhbmRvbTtcclxuXHJcbi8vXHJcbi8vIHNlZWRyYW5kb20oKVxyXG4vLyBUaGlzIGlzIHRoZSBzZWVkcmFuZG9tIGZ1bmN0aW9uIGRlc2NyaWJlZCBhYm92ZS5cclxuLy9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzZWVkLCBvcHRpb25zKSB7XHJcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nbG9iYWwgPT09IHRydWUpIHtcclxuICAgIG9wdGlvbnMuZ2xvYmFsID0gZmFsc2U7XHJcbiAgICBNYXRoLnJhbmRvbSA9IG1vZHVsZS5leHBvcnRzKHNlZWQsIG9wdGlvbnMpO1xyXG4gICAgb3B0aW9ucy5nbG9iYWwgPSB0cnVlO1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tO1xyXG4gIH1cclxuICB2YXIgdXNlX2VudHJvcHkgPSAob3B0aW9ucyAmJiBvcHRpb25zLmVudHJvcHkpIHx8IGZhbHNlO1xyXG4gIHZhciBrZXkgPSBbXTtcclxuXHJcbiAgLy8gRmxhdHRlbiB0aGUgc2VlZCBzdHJpbmcgb3IgYnVpbGQgb25lIGZyb20gbG9jYWwgZW50cm9weSBpZiBuZWVkZWQuXHJcbiAgdmFyIHNob3J0c2VlZCA9IG1peGtleShmbGF0dGVuKFxyXG4gICAgdXNlX2VudHJvcHkgPyBbc2VlZCwgdG9zdHJpbmcocG9vbCldIDpcclxuICAgIDAgaW4gYXJndW1lbnRzID8gc2VlZCA6IGF1dG9zZWVkKCksIDMpLCBrZXkpO1xyXG5cclxuICAvLyBVc2UgdGhlIHNlZWQgdG8gaW5pdGlhbGl6ZSBhbiBBUkM0IGdlbmVyYXRvci5cclxuICB2YXIgYXJjNCA9IG5ldyBBUkM0KGtleSk7XHJcblxyXG4gIC8vIE1peCB0aGUgcmFuZG9tbmVzcyBpbnRvIGFjY3VtdWxhdGVkIGVudHJvcHkuXHJcbiAgbWl4a2V5KHRvc3RyaW5nKGFyYzQuUyksIHBvb2wpO1xyXG5cclxuICAvLyBPdmVycmlkZSBNYXRoLnJhbmRvbVxyXG5cclxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gZG91YmxlIGluIFswLCAxKSB0aGF0IGNvbnRhaW5zXHJcbiAgLy8gcmFuZG9tbmVzcyBpbiBldmVyeSBiaXQgb2YgdGhlIG1hbnRpc3NhIG9mIHRoZSBJRUVFIDc1NCB2YWx1ZS5cclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCkgeyAgICAgICAgIC8vIENsb3N1cmUgdG8gcmV0dXJuIGEgcmFuZG9tIGRvdWJsZTpcclxuICAgIHZhciBuID0gYXJjNC5nKGNodW5rcyksICAgICAgICAgICAgIC8vIFN0YXJ0IHdpdGggYSBudW1lcmF0b3IgbiA8IDIgXiA0OFxyXG4gICAgICAgIGQgPSBzdGFydGRlbm9tLCAgICAgICAgICAgICAgICAgLy8gICBhbmQgZGVub21pbmF0b3IgZCA9IDIgXiA0OC5cclxuICAgICAgICB4ID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgYW5kIG5vICdleHRyYSBsYXN0IGJ5dGUnLlxyXG4gICAgd2hpbGUgKG4gPCBzaWduaWZpY2FuY2UpIHsgICAgICAgICAgLy8gRmlsbCB1cCBhbGwgc2lnbmlmaWNhbnQgZGlnaXRzIGJ5XHJcbiAgICAgIG4gPSAobiArIHgpICogd2lkdGg7ICAgICAgICAgICAgICAvLyAgIHNoaWZ0aW5nIG51bWVyYXRvciBhbmRcclxuICAgICAgZCAqPSB3aWR0aDsgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZGVub21pbmF0b3IgYW5kIGdlbmVyYXRpbmcgYVxyXG4gICAgICB4ID0gYXJjNC5nKDEpOyAgICAgICAgICAgICAgICAgICAgLy8gICBuZXcgbGVhc3Qtc2lnbmlmaWNhbnQtYnl0ZS5cclxuICAgIH1cclxuICAgIHdoaWxlIChuID49IG92ZXJmbG93KSB7ICAgICAgICAgICAgIC8vIFRvIGF2b2lkIHJvdW5kaW5nIHVwLCBiZWZvcmUgYWRkaW5nXHJcbiAgICAgIG4gLz0gMjsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGxhc3QgYnl0ZSwgc2hpZnQgZXZlcnl0aGluZ1xyXG4gICAgICBkIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByaWdodCB1c2luZyBpbnRlZ2VyIE1hdGggdW50aWxcclxuICAgICAgeCA+Pj49IDE7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgd2UgaGF2ZSBleGFjdGx5IHRoZSBkZXNpcmVkIGJpdHMuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKG4gKyB4KSAvIGQ7ICAgICAgICAgICAgICAgICAvLyBGb3JtIHRoZSBudW1iZXIgd2l0aGluIFswLCAxKS5cclxuICB9O1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMucmVzZXRHbG9iYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgTWF0aC5yYW5kb20gPSBvbGRSYW5kb207XHJcbn07XHJcblxyXG4vL1xyXG4vLyBBUkM0XHJcbi8vXHJcbi8vIEFuIEFSQzQgaW1wbGVtZW50YXRpb24uICBUaGUgY29uc3RydWN0b3IgdGFrZXMgYSBrZXkgaW4gdGhlIGZvcm0gb2ZcclxuLy8gYW4gYXJyYXkgb2YgYXQgbW9zdCAod2lkdGgpIGludGVnZXJzIHRoYXQgc2hvdWxkIGJlIDAgPD0geCA8ICh3aWR0aCkuXHJcbi8vXHJcbi8vIFRoZSBnKGNvdW50KSBtZXRob2QgcmV0dXJucyBhIHBzZXVkb3JhbmRvbSBpbnRlZ2VyIHRoYXQgY29uY2F0ZW5hdGVzXHJcbi8vIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBmcm9tIEFSQzQuICBJdHMgcmV0dXJuIHZhbHVlIGlzIGEgbnVtYmVyIHhcclxuLy8gdGhhdCBpcyBpbiB0aGUgcmFuZ2UgMCA8PSB4IDwgKHdpZHRoIF4gY291bnQpLlxyXG4vL1xyXG4vKiogQGNvbnN0cnVjdG9yICovXHJcbmZ1bmN0aW9uIEFSQzQoa2V5KSB7XHJcbiAgdmFyIHQsIGtleWxlbiA9IGtleS5sZW5ndGgsXHJcbiAgICAgIG1lID0gdGhpcywgaSA9IDAsIGogPSBtZS5pID0gbWUuaiA9IDAsIHMgPSBtZS5TID0gW107XHJcblxyXG4gIC8vIFRoZSBlbXB0eSBrZXkgW10gaXMgdHJlYXRlZCBhcyBbMF0uXHJcbiAgaWYgKCFrZXlsZW4pIHsga2V5ID0gW2tleWxlbisrXTsgfVxyXG5cclxuICAvLyBTZXQgdXAgUyB1c2luZyB0aGUgc3RhbmRhcmQga2V5IHNjaGVkdWxpbmcgYWxnb3JpdGhtLlxyXG4gIHdoaWxlIChpIDwgd2lkdGgpIHtcclxuICAgIHNbaV0gPSBpKys7XHJcbiAgfVxyXG4gIGZvciAoaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICBzW2ldID0gc1tqID0gbWFzayAmIChqICsga2V5W2kgJSBrZXlsZW5dICsgKHQgPSBzW2ldKSldO1xyXG4gICAgc1tqXSA9IHQ7XHJcbiAgfVxyXG5cclxuICAvLyBUaGUgXCJnXCIgbWV0aG9kIHJldHVybnMgdGhlIG5leHQgKGNvdW50KSBvdXRwdXRzIGFzIG9uZSBudW1iZXIuXHJcbiAgKG1lLmcgPSBmdW5jdGlvbihjb3VudCkge1xyXG4gICAgLy8gVXNpbmcgaW5zdGFuY2UgbWVtYmVycyBpbnN0ZWFkIG9mIGNsb3N1cmUgc3RhdGUgbmVhcmx5IGRvdWJsZXMgc3BlZWQuXHJcbiAgICB2YXIgdCwgciA9IDAsXHJcbiAgICAgICAgaSA9IG1lLmksIGogPSBtZS5qLCBzID0gbWUuUztcclxuICAgIHdoaWxlIChjb3VudC0tKSB7XHJcbiAgICAgIHQgPSBzW2kgPSBtYXNrICYgKGkgKyAxKV07XHJcbiAgICAgIHIgPSByICogd2lkdGggKyBzW21hc2sgJiAoKHNbaV0gPSBzW2ogPSBtYXNrICYgKGogKyB0KV0pICsgKHNbal0gPSB0KSldO1xyXG4gICAgfVxyXG4gICAgbWUuaSA9IGk7IG1lLmogPSBqO1xyXG4gICAgcmV0dXJuIHI7XHJcbiAgICAvLyBGb3Igcm9idXN0IHVucHJlZGljdGFiaWxpdHkgZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIHZhbHVlcy5cclxuICAgIC8vIFNlZSBodHRwOi8vd3d3LnJzYS5jb20vcnNhbGFicy9ub2RlLmFzcD9pZD0yMDA5XHJcbiAgfSkod2lkdGgpO1xyXG59XHJcblxyXG4vL1xyXG4vLyBmbGF0dGVuKClcclxuLy8gQ29udmVydHMgYW4gb2JqZWN0IHRyZWUgdG8gbmVzdGVkIGFycmF5cyBvZiBzdHJpbmdzLlxyXG4vL1xyXG5mdW5jdGlvbiBmbGF0dGVuKG9iaiwgZGVwdGgpIHtcclxuICB2YXIgcmVzdWx0ID0gW10sIHR5cCA9ICh0eXBlb2Ygb2JqKVswXSwgcHJvcDtcclxuICBpZiAoZGVwdGggJiYgdHlwID09ICdvJykge1xyXG4gICAgZm9yIChwcm9wIGluIG9iaikge1xyXG4gICAgICB0cnkgeyByZXN1bHQucHVzaChmbGF0dGVuKG9ialtwcm9wXSwgZGVwdGggLSAxKSk7IH0gY2F0Y2ggKGUpIHt9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiAocmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHR5cCA9PSAncycgPyBvYmogOiBvYmogKyAnXFwwJyk7XHJcbn1cclxuXHJcbi8vXHJcbi8vIG1peGtleSgpXHJcbi8vIE1peGVzIGEgc3RyaW5nIHNlZWQgaW50byBhIGtleSB0aGF0IGlzIGFuIGFycmF5IG9mIGludGVnZXJzLCBhbmRcclxuLy8gcmV0dXJucyBhIHNob3J0ZW5lZCBzdHJpbmcgc2VlZCB0aGF0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIHJlc3VsdCBrZXkuXHJcbi8vXHJcbmZ1bmN0aW9uIG1peGtleShzZWVkLCBrZXkpIHtcclxuICB2YXIgc3RyaW5nc2VlZCA9IHNlZWQgKyAnJywgc21lYXIsIGogPSAwO1xyXG4gIHdoaWxlIChqIDwgc3RyaW5nc2VlZC5sZW5ndGgpIHtcclxuICAgIGtleVttYXNrICYgal0gPVxyXG4gICAgICBtYXNrICYgKChzbWVhciBePSBrZXlbbWFzayAmIGpdICogMTkpICsgc3RyaW5nc2VlZC5jaGFyQ29kZUF0KGorKykpO1xyXG4gIH1cclxuICByZXR1cm4gdG9zdHJpbmcoa2V5KTtcclxufVxyXG5cclxuLy9cclxuLy8gYXV0b3NlZWQoKVxyXG4vLyBSZXR1cm5zIGFuIG9iamVjdCBmb3IgYXV0b3NlZWRpbmcsIHVzaW5nIHdpbmRvdy5jcnlwdG8gaWYgYXZhaWxhYmxlLlxyXG4vL1xyXG4vKiogQHBhcmFtIHtVaW50OEFycmF5PX0gc2VlZCAqL1xyXG5mdW5jdGlvbiBhdXRvc2VlZChzZWVkKSB7XHJcbiAgdHJ5IHtcclxuICAgIEdMT0JBTC5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHNlZWQgPSBuZXcgVWludDhBcnJheSh3aWR0aCkpO1xyXG4gICAgcmV0dXJuIHRvc3RyaW5nKHNlZWQpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBbK25ldyBEYXRlLCBHTE9CQUwsIEdMT0JBTC5uYXZpZ2F0b3IgJiYgR0xPQkFMLm5hdmlnYXRvci5wbHVnaW5zLFxyXG4gICAgICAgICAgICBHTE9CQUwuc2NyZWVuLCB0b3N0cmluZyhwb29sKV07XHJcbiAgfVxyXG59XHJcblxyXG4vL1xyXG4vLyB0b3N0cmluZygpXHJcbi8vIENvbnZlcnRzIGFuIGFycmF5IG9mIGNoYXJjb2RlcyB0byBhIHN0cmluZ1xyXG4vL1xyXG5mdW5jdGlvbiB0b3N0cmluZyhhKSB7XHJcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoMCwgYSk7XHJcbn1cclxuXHJcbi8vXHJcbi8vIFdoZW4gc2VlZHJhbmRvbS5qcyBpcyBsb2FkZWQsIHdlIGltbWVkaWF0ZWx5IG1peCBhIGZldyBiaXRzXHJcbi8vIGZyb20gdGhlIGJ1aWx0LWluIFJORyBpbnRvIHRoZSBlbnRyb3B5IHBvb2wuICBCZWNhdXNlIHdlIGRvXHJcbi8vIG5vdCB3YW50IHRvIGludGVmZXJlIHdpdGggZGV0ZXJtaW5zdGljIFBSTkcgc3RhdGUgbGF0ZXIsXHJcbi8vIHNlZWRyYW5kb20gd2lsbCBub3QgY2FsbCBNYXRoLnJhbmRvbSBvbiBpdHMgb3duIGFnYWluIGFmdGVyXHJcbi8vIGluaXRpYWxpemF0aW9uLlxyXG4vL1xyXG5taXhrZXkoTWF0aC5yYW5kb20oKSwgcG9vbCk7XHJcbiIsIi8qXG4gKiBBIGZhc3QgamF2YXNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiBzaW1wbGV4IG5vaXNlIGJ5IEpvbmFzIFdhZ25lclxuXG5CYXNlZCBvbiBhIHNwZWVkLWltcHJvdmVkIHNpbXBsZXggbm9pc2UgYWxnb3JpdGhtIGZvciAyRCwgM0QgYW5kIDREIGluIEphdmEuXG5XaGljaCBpcyBiYXNlZCBvbiBleGFtcGxlIGNvZGUgYnkgU3RlZmFuIEd1c3RhdnNvbiAoc3RlZ3VAaXRuLmxpdS5zZSkuXG5XaXRoIE9wdGltaXNhdGlvbnMgYnkgUGV0ZXIgRWFzdG1hbiAocGVhc3RtYW5AZHJpenpsZS5zdGFuZm9yZC5lZHUpLlxuQmV0dGVyIHJhbmsgb3JkZXJpbmcgbWV0aG9kIGJ5IFN0ZWZhbiBHdXN0YXZzb24gaW4gMjAxMi5cblxuXG4gQ29weXJpZ2h0IChjKSAyMDE4IEpvbmFzIFdhZ25lclxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gU09GVFdBUkUuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBGMiA9IDAuNSAqIChNYXRoLnNxcnQoMy4wKSAtIDEuMCk7XG4gIHZhciBHMiA9ICgzLjAgLSBNYXRoLnNxcnQoMy4wKSkgLyA2LjA7XG4gIHZhciBGMyA9IDEuMCAvIDMuMDtcbiAgdmFyIEczID0gMS4wIC8gNi4wO1xuICB2YXIgRjQgPSAoTWF0aC5zcXJ0KDUuMCkgLSAxLjApIC8gNC4wO1xuICB2YXIgRzQgPSAoNS4wIC0gTWF0aC5zcXJ0KDUuMCkpIC8gMjAuMDtcblxuICBmdW5jdGlvbiBTaW1wbGV4Tm9pc2UocmFuZG9tT3JTZWVkKSB7XG4gICAgdmFyIHJhbmRvbTtcbiAgICBpZiAodHlwZW9mIHJhbmRvbU9yU2VlZCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByYW5kb20gPSByYW5kb21PclNlZWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJhbmRvbU9yU2VlZCkge1xuICAgICAgcmFuZG9tID0gYWxlYShyYW5kb21PclNlZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYW5kb20gPSBNYXRoLnJhbmRvbTtcbiAgICB9XG4gICAgdGhpcy5wID0gYnVpbGRQZXJtdXRhdGlvblRhYmxlKHJhbmRvbSk7XG4gICAgdGhpcy5wZXJtID0gbmV3IFVpbnQ4QXJyYXkoNTEyKTtcbiAgICB0aGlzLnBlcm1Nb2QxMiA9IG5ldyBVaW50OEFycmF5KDUxMik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1MTI7IGkrKykge1xuICAgICAgdGhpcy5wZXJtW2ldID0gdGhpcy5wW2kgJiAyNTVdO1xuICAgICAgdGhpcy5wZXJtTW9kMTJbaV0gPSB0aGlzLnBlcm1baV0gJSAxMjtcbiAgICB9XG5cbiAgfVxuICBTaW1wbGV4Tm9pc2UucHJvdG90eXBlID0ge1xuICAgIGdyYWQzOiBuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAwLFxuICAgICAgLTEsIDEsIDAsXG4gICAgICAxLCAtMSwgMCxcblxuICAgICAgLTEsIC0xLCAwLFxuICAgICAgMSwgMCwgMSxcbiAgICAgIC0xLCAwLCAxLFxuXG4gICAgICAxLCAwLCAtMSxcbiAgICAgIC0xLCAwLCAtMSxcbiAgICAgIDAsIDEsIDEsXG5cbiAgICAgIDAsIC0xLCAxLFxuICAgICAgMCwgMSwgLTEsXG4gICAgICAwLCAtMSwgLTFdKSxcbiAgICBncmFkNDogbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsXG4gICAgICAwLCAtMSwgMSwgMSwgMCwgLTEsIDEsIC0xLCAwLCAtMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsXG4gICAgICAxLCAwLCAxLCAxLCAxLCAwLCAxLCAtMSwgMSwgMCwgLTEsIDEsIDEsIDAsIC0xLCAtMSxcbiAgICAgIC0xLCAwLCAxLCAxLCAtMSwgMCwgMSwgLTEsIC0xLCAwLCAtMSwgMSwgLTEsIDAsIC0xLCAtMSxcbiAgICAgIDEsIDEsIDAsIDEsIDEsIDEsIDAsIC0xLCAxLCAtMSwgMCwgMSwgMSwgLTEsIDAsIC0xLFxuICAgICAgLTEsIDEsIDAsIDEsIC0xLCAxLCAwLCAtMSwgLTEsIC0xLCAwLCAxLCAtMSwgLTEsIDAsIC0xLFxuICAgICAgMSwgMSwgMSwgMCwgMSwgMSwgLTEsIDAsIDEsIC0xLCAxLCAwLCAxLCAtMSwgLTEsIDAsXG4gICAgICAtMSwgMSwgMSwgMCwgLTEsIDEsIC0xLCAwLCAtMSwgLTEsIDEsIDAsIC0xLCAtMSwgLTEsIDBdKSxcbiAgICBub2lzZTJEOiBmdW5jdGlvbih4aW4sIHlpbikge1xuICAgICAgdmFyIHBlcm1Nb2QxMiA9IHRoaXMucGVybU1vZDEyO1xuICAgICAgdmFyIHBlcm0gPSB0aGlzLnBlcm07XG4gICAgICB2YXIgZ3JhZDMgPSB0aGlzLmdyYWQzO1xuICAgICAgdmFyIG4wID0gMDsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICB2YXIgbjEgPSAwO1xuICAgICAgdmFyIG4yID0gMDtcbiAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cbiAgICAgIHZhciBzID0gKHhpbiArIHlpbikgKiBGMjsgLy8gSGFpcnkgZmFjdG9yIGZvciAyRFxuICAgICAgdmFyIGkgPSBNYXRoLmZsb29yKHhpbiArIHMpO1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKHlpbiArIHMpO1xuICAgICAgdmFyIHQgPSAoaSArIGopICogRzI7XG4gICAgICB2YXIgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkpIHNwYWNlXG4gICAgICB2YXIgWTAgPSBqIC0gdDtcbiAgICAgIHZhciB4MCA9IHhpbiAtIFgwOyAvLyBUaGUgeCx5IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgdmFyIHkwID0geWluIC0gWTA7XG4gICAgICAvLyBGb3IgdGhlIDJEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGFuIGVxdWlsYXRlcmFsIHRyaWFuZ2xlLlxuICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxuICAgICAgdmFyIGkxLCBqMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIChtaWRkbGUpIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGopIGNvb3Jkc1xuICAgICAgaWYgKHgwID4geTApIHtcbiAgICAgICAgaTEgPSAxO1xuICAgICAgICBqMSA9IDA7XG4gICAgICB9IC8vIGxvd2VyIHRyaWFuZ2xlLCBYWSBvcmRlcjogKDAsMCktPigxLDApLT4oMSwxKVxuICAgICAgZWxzZSB7XG4gICAgICAgIGkxID0gMDtcbiAgICAgICAgajEgPSAxO1xuICAgICAgfSAvLyB1cHBlciB0cmlhbmdsZSwgWVggb3JkZXI6ICgwLDApLT4oMCwxKS0+KDEsMSlcbiAgICAgIC8vIEEgc3RlcCBvZiAoMSwwKSBpbiAoaSxqKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYykgaW4gKHgseSksIGFuZFxuICAgICAgLy8gYSBzdGVwIG9mICgwLDEpIGluIChpLGopIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jKSBpbiAoeCx5KSwgd2hlcmVcbiAgICAgIC8vIGMgPSAoMy1zcXJ0KDMpKS82XG4gICAgICB2YXIgeDEgPSB4MCAtIGkxICsgRzI7IC8vIE9mZnNldHMgZm9yIG1pZGRsZSBjb3JuZXIgaW4gKHgseSkgdW5za2V3ZWQgY29vcmRzXG4gICAgICB2YXIgeTEgPSB5MCAtIGoxICsgRzI7XG4gICAgICB2YXIgeDIgPSB4MCAtIDEuMCArIDIuMCAqIEcyOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5KSB1bnNrZXdlZCBjb29yZHNcbiAgICAgIHZhciB5MiA9IHkwIC0gMS4wICsgMi4wICogRzI7XG4gICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIHRocmVlIHNpbXBsZXggY29ybmVyc1xuICAgICAgdmFyIGlpID0gaSAmIDI1NTtcbiAgICAgIHZhciBqaiA9IGogJiAyNTU7XG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSB0aHJlZSBjb3JuZXJzXG4gICAgICB2YXIgdDAgPSAwLjUgLSB4MCAqIHgwIC0geTAgKiB5MDtcbiAgICAgIGlmICh0MCA+PSAwKSB7XG4gICAgICAgIHZhciBnaTAgPSBwZXJtTW9kMTJbaWkgKyBwZXJtW2pqXV0gKiAzO1xuICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWQzW2dpMF0gKiB4MCArIGdyYWQzW2dpMCArIDFdICogeTApOyAvLyAoeCx5KSBvZiBncmFkMyB1c2VkIGZvciAyRCBncmFkaWVudFxuICAgICAgfVxuICAgICAgdmFyIHQxID0gMC41IC0geDEgKiB4MSAtIHkxICogeTE7XG4gICAgICBpZiAodDEgPj0gMCkge1xuICAgICAgICB2YXIgZ2kxID0gcGVybU1vZDEyW2lpICsgaTEgKyBwZXJtW2pqICsgajFdXSAqIDM7XG4gICAgICAgIHQxICo9IHQxO1xuICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZDNbZ2kxXSAqIHgxICsgZ3JhZDNbZ2kxICsgMV0gKiB5MSk7XG4gICAgICB9XG4gICAgICB2YXIgdDIgPSAwLjUgLSB4MiAqIHgyIC0geTIgKiB5MjtcbiAgICAgIGlmICh0MiA+PSAwKSB7XG4gICAgICAgIHZhciBnaTIgPSBwZXJtTW9kMTJbaWkgKyAxICsgcGVybVtqaiArIDFdXSAqIDM7XG4gICAgICAgIHQyICo9IHQyO1xuICAgICAgICBuMiA9IHQyICogdDIgKiAoZ3JhZDNbZ2kyXSAqIHgyICsgZ3JhZDNbZ2kyICsgMV0gKiB5Mik7XG4gICAgICB9XG4gICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXG4gICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byByZXR1cm4gdmFsdWVzIGluIHRoZSBpbnRlcnZhbCBbLTEsMV0uXG4gICAgICByZXR1cm4gNzAuMCAqIChuMCArIG4xICsgbjIpO1xuICAgIH0sXG4gICAgLy8gM0Qgc2ltcGxleCBub2lzZVxuICAgIG5vaXNlM0Q6IGZ1bmN0aW9uKHhpbiwgeWluLCB6aW4pIHtcbiAgICAgIHZhciBwZXJtTW9kMTIgPSB0aGlzLnBlcm1Nb2QxMjtcbiAgICAgIHZhciBwZXJtID0gdGhpcy5wZXJtO1xuICAgICAgdmFyIGdyYWQzID0gdGhpcy5ncmFkMztcbiAgICAgIHZhciBuMCwgbjEsIG4yLCBuMzsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcbiAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cbiAgICAgIHZhciBzID0gKHhpbiArIHlpbiArIHppbikgKiBGMzsgLy8gVmVyeSBuaWNlIGFuZCBzaW1wbGUgc2tldyBmYWN0b3IgZm9yIDNEXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoeGluICsgcyk7XG4gICAgICB2YXIgaiA9IE1hdGguZmxvb3IoeWluICsgcyk7XG4gICAgICB2YXIgayA9IE1hdGguZmxvb3IoemluICsgcyk7XG4gICAgICB2YXIgdCA9IChpICsgaiArIGspICogRzM7XG4gICAgICB2YXIgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseikgc3BhY2VcbiAgICAgIHZhciBZMCA9IGogLSB0O1xuICAgICAgdmFyIFowID0gayAtIHQ7XG4gICAgICB2YXIgeDAgPSB4aW4gLSBYMDsgLy8gVGhlIHgseSx6IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgdmFyIHkwID0geWluIC0gWTA7XG4gICAgICB2YXIgejAgPSB6aW4gLSBaMDtcbiAgICAgIC8vIEZvciB0aGUgM0QgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYSBzbGlnaHRseSBpcnJlZ3VsYXIgdGV0cmFoZWRyb24uXG4gICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXG4gICAgICB2YXIgaTEsIGoxLCBrMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXG4gICAgICB2YXIgaTIsIGoyLCBrMjsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcbiAgICAgIGlmICh4MCA+PSB5MCkge1xuICAgICAgICBpZiAoeTAgPj0gejApIHtcbiAgICAgICAgICBpMSA9IDE7XG4gICAgICAgICAgajEgPSAwO1xuICAgICAgICAgIGsxID0gMDtcbiAgICAgICAgICBpMiA9IDE7XG4gICAgICAgICAgajIgPSAxO1xuICAgICAgICAgIGsyID0gMDtcbiAgICAgICAgfSAvLyBYIFkgWiBvcmRlclxuICAgICAgICBlbHNlIGlmICh4MCA+PSB6MCkge1xuICAgICAgICAgIGkxID0gMTtcbiAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgazEgPSAwO1xuICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICBqMiA9IDA7XG4gICAgICAgICAgazIgPSAxO1xuICAgICAgICB9IC8vIFggWiBZIG9yZGVyXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGkxID0gMDtcbiAgICAgICAgICBqMSA9IDA7XG4gICAgICAgICAgazEgPSAxO1xuICAgICAgICAgIGkyID0gMTtcbiAgICAgICAgICBqMiA9IDA7XG4gICAgICAgICAgazIgPSAxO1xuICAgICAgICB9IC8vIFogWCBZIG9yZGVyXG4gICAgICB9XG4gICAgICBlbHNlIHsgLy8geDA8eTBcbiAgICAgICAgaWYgKHkwIDwgejApIHtcbiAgICAgICAgICBpMSA9IDA7XG4gICAgICAgICAgajEgPSAwO1xuICAgICAgICAgIGsxID0gMTtcbiAgICAgICAgICBpMiA9IDA7XG4gICAgICAgICAgajIgPSAxO1xuICAgICAgICAgIGsyID0gMTtcbiAgICAgICAgfSAvLyBaIFkgWCBvcmRlclxuICAgICAgICBlbHNlIGlmICh4MCA8IHowKSB7XG4gICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgaTIgPSAwO1xuICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICBrMiA9IDE7XG4gICAgICAgIH0gLy8gWSBaIFggb3JkZXJcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaTEgPSAwO1xuICAgICAgICAgIGoxID0gMTtcbiAgICAgICAgICBrMSA9IDA7XG4gICAgICAgICAgaTIgPSAxO1xuICAgICAgICAgIGoyID0gMTtcbiAgICAgICAgICBrMiA9IDA7XG4gICAgICAgIH0gLy8gWSBYIFogb3JkZXJcbiAgICAgIH1cbiAgICAgIC8vIEEgc3RlcCBvZiAoMSwwLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMsLWMpIGluICh4LHkseiksXG4gICAgICAvLyBhIHN0ZXAgb2YgKDAsMSwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jLC1jKSBpbiAoeCx5LHopLCBhbmRcbiAgICAgIC8vIGEgc3RlcCBvZiAoMCwwLDEpIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywtYywxLWMpIGluICh4LHkseiksIHdoZXJlXG4gICAgICAvLyBjID0gMS82LlxuICAgICAgdmFyIHgxID0geDAgLSBpMSArIEczOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXG4gICAgICB2YXIgeTEgPSB5MCAtIGoxICsgRzM7XG4gICAgICB2YXIgejEgPSB6MCAtIGsxICsgRzM7XG4gICAgICB2YXIgeDIgPSB4MCAtIGkyICsgMi4wICogRzM7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xuICAgICAgdmFyIHkyID0geTAgLSBqMiArIDIuMCAqIEczO1xuICAgICAgdmFyIHoyID0gejAgLSBrMiArIDIuMCAqIEczO1xuICAgICAgdmFyIHgzID0geDAgLSAxLjAgKyAzLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcbiAgICAgIHZhciB5MyA9IHkwIC0gMS4wICsgMy4wICogRzM7XG4gICAgICB2YXIgejMgPSB6MCAtIDEuMCArIDMuMCAqIEczO1xuICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmb3VyIHNpbXBsZXggY29ybmVyc1xuICAgICAgdmFyIGlpID0gaSAmIDI1NTtcbiAgICAgIHZhciBqaiA9IGogJiAyNTU7XG4gICAgICB2YXIga2sgPSBrICYgMjU1O1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZm91ciBjb3JuZXJzXG4gICAgICB2YXIgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejA7XG4gICAgICBpZiAodDAgPCAwKSBuMCA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kwID0gcGVybU1vZDEyW2lpICsgcGVybVtqaiArIHBlcm1ba2tdXV0gKiAzO1xuICAgICAgICB0MCAqPSB0MDtcbiAgICAgICAgbjAgPSB0MCAqIHQwICogKGdyYWQzW2dpMF0gKiB4MCArIGdyYWQzW2dpMCArIDFdICogeTAgKyBncmFkM1tnaTAgKyAyXSAqIHowKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MSA9IDAuNiAtIHgxICogeDEgLSB5MSAqIHkxIC0gejEgKiB6MTtcbiAgICAgIGlmICh0MSA8IDApIG4xID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTEgPSBwZXJtTW9kMTJbaWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMV1dXSAqIDM7XG4gICAgICAgIHQxICo9IHQxO1xuICAgICAgICBuMSA9IHQxICogdDEgKiAoZ3JhZDNbZ2kxXSAqIHgxICsgZ3JhZDNbZ2kxICsgMV0gKiB5MSArIGdyYWQzW2dpMSArIDJdICogejEpO1xuICAgICAgfVxuICAgICAgdmFyIHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyO1xuICAgICAgaWYgKHQyIDwgMCkgbjIgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMiA9IHBlcm1Nb2QxMltpaSArIGkyICsgcGVybVtqaiArIGoyICsgcGVybVtrayArIGsyXV1dICogMztcbiAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgIG4yID0gdDIgKiB0MiAqIChncmFkM1tnaTJdICogeDIgKyBncmFkM1tnaTIgKyAxXSAqIHkyICsgZ3JhZDNbZ2kyICsgMl0gKiB6Mik7XG4gICAgICB9XG4gICAgICB2YXIgdDMgPSAwLjYgLSB4MyAqIHgzIC0geTMgKiB5MyAtIHozICogejM7XG4gICAgICBpZiAodDMgPCAwKSBuMyA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kzID0gcGVybU1vZDEyW2lpICsgMSArIHBlcm1bamogKyAxICsgcGVybVtrayArIDFdXV0gKiAzO1xuICAgICAgICB0MyAqPSB0MztcbiAgICAgICAgbjMgPSB0MyAqIHQzICogKGdyYWQzW2dpM10gKiB4MyArIGdyYWQzW2dpMyArIDFdICogeTMgKyBncmFkM1tnaTMgKyAyXSAqIHozKTtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cbiAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHN0YXkganVzdCBpbnNpZGUgWy0xLDFdXG4gICAgICByZXR1cm4gMzIuMCAqIChuMCArIG4xICsgbjIgKyBuMyk7XG4gICAgfSxcbiAgICAvLyA0RCBzaW1wbGV4IG5vaXNlLCBiZXR0ZXIgc2ltcGxleCByYW5rIG9yZGVyaW5nIG1ldGhvZCAyMDEyLTAzLTA5XG4gICAgbm9pc2U0RDogZnVuY3Rpb24oeCwgeSwgeiwgdykge1xuICAgICAgdmFyIHBlcm0gPSB0aGlzLnBlcm07XG4gICAgICB2YXIgZ3JhZDQgPSB0aGlzLmdyYWQ0O1xuXG4gICAgICB2YXIgbjAsIG4xLCBuMiwgbjMsIG40OyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZpdmUgY29ybmVyc1xuICAgICAgLy8gU2tldyB0aGUgKHgseSx6LHcpIHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBjZWxsIG9mIDI0IHNpbXBsaWNlcyB3ZSdyZSBpblxuICAgICAgdmFyIHMgPSAoeCArIHkgKyB6ICsgdykgKiBGNDsgLy8gRmFjdG9yIGZvciA0RCBza2V3aW5nXG4gICAgICB2YXIgaSA9IE1hdGguZmxvb3IoeCArIHMpO1xuICAgICAgdmFyIGogPSBNYXRoLmZsb29yKHkgKyBzKTtcbiAgICAgIHZhciBrID0gTWF0aC5mbG9vcih6ICsgcyk7XG4gICAgICB2YXIgbCA9IE1hdGguZmxvb3IodyArIHMpO1xuICAgICAgdmFyIHQgPSAoaSArIGogKyBrICsgbCkgKiBHNDsgLy8gRmFjdG9yIGZvciA0RCB1bnNrZXdpbmdcbiAgICAgIHZhciBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSx6LHcpIHNwYWNlXG4gICAgICB2YXIgWTAgPSBqIC0gdDtcbiAgICAgIHZhciBaMCA9IGsgLSB0O1xuICAgICAgdmFyIFcwID0gbCAtIHQ7XG4gICAgICB2YXIgeDAgPSB4IC0gWDA7IC8vIFRoZSB4LHkseix3IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxuICAgICAgdmFyIHkwID0geSAtIFkwO1xuICAgICAgdmFyIHowID0geiAtIFowO1xuICAgICAgdmFyIHcwID0gdyAtIFcwO1xuICAgICAgLy8gRm9yIHRoZSA0RCBjYXNlLCB0aGUgc2ltcGxleCBpcyBhIDREIHNoYXBlIEkgd29uJ3QgZXZlbiB0cnkgdG8gZGVzY3JpYmUuXG4gICAgICAvLyBUbyBmaW5kIG91dCB3aGljaCBvZiB0aGUgMjQgcG9zc2libGUgc2ltcGxpY2VzIHdlJ3JlIGluLCB3ZSBuZWVkIHRvXG4gICAgICAvLyBkZXRlcm1pbmUgdGhlIG1hZ25pdHVkZSBvcmRlcmluZyBvZiB4MCwgeTAsIHowIGFuZCB3MC5cbiAgICAgIC8vIFNpeCBwYWlyLXdpc2UgY29tcGFyaXNvbnMgYXJlIHBlcmZvcm1lZCBiZXR3ZWVuIGVhY2ggcG9zc2libGUgcGFpclxuICAgICAgLy8gb2YgdGhlIGZvdXIgY29vcmRpbmF0ZXMsIGFuZCB0aGUgcmVzdWx0cyBhcmUgdXNlZCB0byByYW5rIHRoZSBudW1iZXJzLlxuICAgICAgdmFyIHJhbmt4ID0gMDtcbiAgICAgIHZhciByYW5reSA9IDA7XG4gICAgICB2YXIgcmFua3ogPSAwO1xuICAgICAgdmFyIHJhbmt3ID0gMDtcbiAgICAgIGlmICh4MCA+IHkwKSByYW5reCsrO1xuICAgICAgZWxzZSByYW5reSsrO1xuICAgICAgaWYgKHgwID4gejApIHJhbmt4Kys7XG4gICAgICBlbHNlIHJhbmt6Kys7XG4gICAgICBpZiAoeDAgPiB3MCkgcmFua3grKztcbiAgICAgIGVsc2UgcmFua3crKztcbiAgICAgIGlmICh5MCA+IHowKSByYW5reSsrO1xuICAgICAgZWxzZSByYW5reisrO1xuICAgICAgaWYgKHkwID4gdzApIHJhbmt5Kys7XG4gICAgICBlbHNlIHJhbmt3Kys7XG4gICAgICBpZiAoejAgPiB3MCkgcmFua3orKztcbiAgICAgIGVsc2UgcmFua3crKztcbiAgICAgIHZhciBpMSwgajEsIGsxLCBsMTsgLy8gVGhlIGludGVnZXIgb2Zmc2V0cyBmb3IgdGhlIHNlY29uZCBzaW1wbGV4IGNvcm5lclxuICAgICAgdmFyIGkyLCBqMiwgazIsIGwyOyAvLyBUaGUgaW50ZWdlciBvZmZzZXRzIGZvciB0aGUgdGhpcmQgc2ltcGxleCBjb3JuZXJcbiAgICAgIHZhciBpMywgajMsIGszLCBsMzsgLy8gVGhlIGludGVnZXIgb2Zmc2V0cyBmb3IgdGhlIGZvdXJ0aCBzaW1wbGV4IGNvcm5lclxuICAgICAgLy8gc2ltcGxleFtjXSBpcyBhIDQtdmVjdG9yIHdpdGggdGhlIG51bWJlcnMgMCwgMSwgMiBhbmQgMyBpbiBzb21lIG9yZGVyLlxuICAgICAgLy8gTWFueSB2YWx1ZXMgb2YgYyB3aWxsIG5ldmVyIG9jY3VyLCBzaW5jZSBlLmcuIHg+eT56PncgbWFrZXMgeDx6LCB5PHcgYW5kIHg8d1xuICAgICAgLy8gaW1wb3NzaWJsZS4gT25seSB0aGUgMjQgaW5kaWNlcyB3aGljaCBoYXZlIG5vbi16ZXJvIGVudHJpZXMgbWFrZSBhbnkgc2Vuc2UuXG4gICAgICAvLyBXZSB1c2UgYSB0aHJlc2hvbGRpbmcgdG8gc2V0IHRoZSBjb29yZGluYXRlcyBpbiB0dXJuIGZyb20gdGhlIGxhcmdlc3QgbWFnbml0dWRlLlxuICAgICAgLy8gUmFuayAzIGRlbm90ZXMgdGhlIGxhcmdlc3QgY29vcmRpbmF0ZS5cbiAgICAgIGkxID0gcmFua3ggPj0gMyA/IDEgOiAwO1xuICAgICAgajEgPSByYW5reSA+PSAzID8gMSA6IDA7XG4gICAgICBrMSA9IHJhbmt6ID49IDMgPyAxIDogMDtcbiAgICAgIGwxID0gcmFua3cgPj0gMyA/IDEgOiAwO1xuICAgICAgLy8gUmFuayAyIGRlbm90ZXMgdGhlIHNlY29uZCBsYXJnZXN0IGNvb3JkaW5hdGUuXG4gICAgICBpMiA9IHJhbmt4ID49IDIgPyAxIDogMDtcbiAgICAgIGoyID0gcmFua3kgPj0gMiA/IDEgOiAwO1xuICAgICAgazIgPSByYW5reiA+PSAyID8gMSA6IDA7XG4gICAgICBsMiA9IHJhbmt3ID49IDIgPyAxIDogMDtcbiAgICAgIC8vIFJhbmsgMSBkZW5vdGVzIHRoZSBzZWNvbmQgc21hbGxlc3QgY29vcmRpbmF0ZS5cbiAgICAgIGkzID0gcmFua3ggPj0gMSA/IDEgOiAwO1xuICAgICAgajMgPSByYW5reSA+PSAxID8gMSA6IDA7XG4gICAgICBrMyA9IHJhbmt6ID49IDEgPyAxIDogMDtcbiAgICAgIGwzID0gcmFua3cgPj0gMSA/IDEgOiAwO1xuICAgICAgLy8gVGhlIGZpZnRoIGNvcm5lciBoYXMgYWxsIGNvb3JkaW5hdGUgb2Zmc2V0cyA9IDEsIHNvIG5vIG5lZWQgdG8gY29tcHV0ZSB0aGF0LlxuICAgICAgdmFyIHgxID0geDAgLSBpMSArIEc0OyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgIHZhciB5MSA9IHkwIC0gajEgKyBHNDtcbiAgICAgIHZhciB6MSA9IHowIC0gazEgKyBHNDtcbiAgICAgIHZhciB3MSA9IHcwIC0gbDEgKyBHNDtcbiAgICAgIHZhciB4MiA9IHgwIC0gaTIgKyAyLjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIGluICh4LHkseix3KSBjb29yZHNcbiAgICAgIHZhciB5MiA9IHkwIC0gajIgKyAyLjAgKiBHNDtcbiAgICAgIHZhciB6MiA9IHowIC0gazIgKyAyLjAgKiBHNDtcbiAgICAgIHZhciB3MiA9IHcwIC0gbDIgKyAyLjAgKiBHNDtcbiAgICAgIHZhciB4MyA9IHgwIC0gaTMgKyAzLjAgKiBHNDsgLy8gT2Zmc2V0cyBmb3IgZm91cnRoIGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICB2YXIgeTMgPSB5MCAtIGozICsgMy4wICogRzQ7XG4gICAgICB2YXIgejMgPSB6MCAtIGszICsgMy4wICogRzQ7XG4gICAgICB2YXIgdzMgPSB3MCAtIGwzICsgMy4wICogRzQ7XG4gICAgICB2YXIgeDQgPSB4MCAtIDEuMCArIDQuMCAqIEc0OyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5LHosdykgY29vcmRzXG4gICAgICB2YXIgeTQgPSB5MCAtIDEuMCArIDQuMCAqIEc0O1xuICAgICAgdmFyIHo0ID0gejAgLSAxLjAgKyA0LjAgKiBHNDtcbiAgICAgIHZhciB3NCA9IHcwIC0gMS4wICsgNC4wICogRzQ7XG4gICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIGZpdmUgc2ltcGxleCBjb3JuZXJzXG4gICAgICB2YXIgaWkgPSBpICYgMjU1O1xuICAgICAgdmFyIGpqID0gaiAmIDI1NTtcbiAgICAgIHZhciBrayA9IGsgJiAyNTU7XG4gICAgICB2YXIgbGwgPSBsICYgMjU1O1xuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZml2ZSBjb3JuZXJzXG4gICAgICB2YXIgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejAgLSB3MCAqIHcwO1xuICAgICAgaWYgKHQwIDwgMCkgbjAgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMCA9IChwZXJtW2lpICsgcGVybVtqaiArIHBlcm1ba2sgKyBwZXJtW2xsXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQwICo9IHQwO1xuICAgICAgICBuMCA9IHQwICogdDAgKiAoZ3JhZDRbZ2kwXSAqIHgwICsgZ3JhZDRbZ2kwICsgMV0gKiB5MCArIGdyYWQ0W2dpMCArIDJdICogejAgKyBncmFkNFtnaTAgKyAzXSAqIHcwKTtcbiAgICAgIH1cbiAgICAgIHZhciB0MSA9IDAuNiAtIHgxICogeDEgLSB5MSAqIHkxIC0gejEgKiB6MSAtIHcxICogdzE7XG4gICAgICBpZiAodDEgPCAwKSBuMSA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2kxID0gKHBlcm1baWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMSArIHBlcm1bbGwgKyBsMV1dXV0gJSAzMikgKiA0O1xuICAgICAgICB0MSAqPSB0MTtcbiAgICAgICAgbjEgPSB0MSAqIHQxICogKGdyYWQ0W2dpMV0gKiB4MSArIGdyYWQ0W2dpMSArIDFdICogeTEgKyBncmFkNFtnaTEgKyAyXSAqIHoxICsgZ3JhZDRbZ2kxICsgM10gKiB3MSk7XG4gICAgICB9XG4gICAgICB2YXIgdDIgPSAwLjYgLSB4MiAqIHgyIC0geTIgKiB5MiAtIHoyICogejIgLSB3MiAqIHcyO1xuICAgICAgaWYgKHQyIDwgMCkgbjIgPSAwLjA7XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGdpMiA9IChwZXJtW2lpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazIgKyBwZXJtW2xsICsgbDJdXV1dICUgMzIpICogNDtcbiAgICAgICAgdDIgKj0gdDI7XG4gICAgICAgIG4yID0gdDIgKiB0MiAqIChncmFkNFtnaTJdICogeDIgKyBncmFkNFtnaTIgKyAxXSAqIHkyICsgZ3JhZDRbZ2kyICsgMl0gKiB6MiArIGdyYWQ0W2dpMiArIDNdICogdzIpO1xuICAgICAgfVxuICAgICAgdmFyIHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozIC0gdzMgKiB3MztcbiAgICAgIGlmICh0MyA8IDApIG4zID0gMC4wO1xuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBnaTMgPSAocGVybVtpaSArIGkzICsgcGVybVtqaiArIGozICsgcGVybVtrayArIGszICsgcGVybVtsbCArIGwzXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQzICo9IHQzO1xuICAgICAgICBuMyA9IHQzICogdDMgKiAoZ3JhZDRbZ2kzXSAqIHgzICsgZ3JhZDRbZ2kzICsgMV0gKiB5MyArIGdyYWQ0W2dpMyArIDJdICogejMgKyBncmFkNFtnaTMgKyAzXSAqIHczKTtcbiAgICAgIH1cbiAgICAgIHZhciB0NCA9IDAuNiAtIHg0ICogeDQgLSB5NCAqIHk0IC0gejQgKiB6NCAtIHc0ICogdzQ7XG4gICAgICBpZiAodDQgPCAwKSBuNCA9IDAuMDtcbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgZ2k0ID0gKHBlcm1baWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMSArIHBlcm1bbGwgKyAxXV1dXSAlIDMyKSAqIDQ7XG4gICAgICAgIHQ0ICo9IHQ0O1xuICAgICAgICBuNCA9IHQ0ICogdDQgKiAoZ3JhZDRbZ2k0XSAqIHg0ICsgZ3JhZDRbZ2k0ICsgMV0gKiB5NCArIGdyYWQ0W2dpNCArIDJdICogejQgKyBncmFkNFtnaTQgKyAzXSAqIHc0KTtcbiAgICAgIH1cbiAgICAgIC8vIFN1bSB1cCBhbmQgc2NhbGUgdGhlIHJlc3VsdCB0byBjb3ZlciB0aGUgcmFuZ2UgWy0xLDFdXG4gICAgICByZXR1cm4gMjcuMCAqIChuMCArIG4xICsgbjIgKyBuMyArIG40KTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gYnVpbGRQZXJtdXRhdGlvblRhYmxlKHJhbmRvbSkge1xuICAgIHZhciBpO1xuICAgIHZhciBwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgIHBbaV0gPSBpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgMjU1OyBpKyspIHtcbiAgICAgIHZhciByID0gaSArIH5+KHJhbmRvbSgpICogKDI1NiAtIGkpKTtcbiAgICAgIHZhciBhdXggPSBwW2ldO1xuICAgICAgcFtpXSA9IHBbcl07XG4gICAgICBwW3JdID0gYXV4O1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfVxuICBTaW1wbGV4Tm9pc2UuX2J1aWxkUGVybXV0YXRpb25UYWJsZSA9IGJ1aWxkUGVybXV0YXRpb25UYWJsZTtcblxuICBmdW5jdGlvbiBhbGVhKCkge1xuICAgIC8vIEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2UuY29tPiwgMjAxMFxuICAgIHZhciBzMCA9IDA7XG4gICAgdmFyIHMxID0gMDtcbiAgICB2YXIgczIgPSAwO1xuICAgIHZhciBjID0gMTtcblxuICAgIHZhciBtYXNoID0gbWFzaGVyKCk7XG4gICAgczAgPSBtYXNoKCcgJyk7XG4gICAgczEgPSBtYXNoKCcgJyk7XG4gICAgczIgPSBtYXNoKCcgJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgczAgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMwIDwgMCkge1xuICAgICAgICBzMCArPSAxO1xuICAgICAgfVxuICAgICAgczEgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMxIDwgMCkge1xuICAgICAgICBzMSArPSAxO1xuICAgICAgfVxuICAgICAgczIgLT0gbWFzaChhcmd1bWVudHNbaV0pO1xuICAgICAgaWYgKHMyIDwgMCkge1xuICAgICAgICBzMiArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBtYXNoID0gbnVsbDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdCA9IDIwOTE2MzkgKiBzMCArIGMgKiAyLjMyODMwNjQzNjUzODY5NjNlLTEwOyAvLyAyXi0zMlxuICAgICAgczAgPSBzMTtcbiAgICAgIHMxID0gczI7XG4gICAgICByZXR1cm4gczIgPSB0IC0gKGMgPSB0IHwgMCk7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtYXNoZXIoKSB7XG4gICAgdmFyIG4gPSAweGVmYzgyNDlkO1xuICAgIHJldHVybiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG4gKz0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB2YXIgaCA9IDAuMDI1MTk2MDMyODI0MTY5MzggKiBuO1xuICAgICAgICBuID0gaCA+Pj4gMDtcbiAgICAgICAgaCAtPSBuO1xuICAgICAgICBoICo9IG47XG4gICAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgICBoIC09IG47XG4gICAgICAgIG4gKz0gaCAqIDB4MTAwMDAwMDAwOyAvLyAyXjMyXG4gICAgICB9XG4gICAgICByZXR1cm4gKG4gPj4+IDApICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICB9O1xuICB9XG5cbiAgLy8gYW1kXG4gIGlmICh0eXBlb2YgZGVmaW5lICE9PSAndW5kZWZpbmVkJyAmJiBkZWZpbmUuYW1kKSBkZWZpbmUoZnVuY3Rpb24oKSB7cmV0dXJuIFNpbXBsZXhOb2lzZTt9KTtcbiAgLy8gY29tbW9uIGpzXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIGV4cG9ydHMuU2ltcGxleE5vaXNlID0gU2ltcGxleE5vaXNlO1xuICAvLyBicm93c2VyXG4gIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB3aW5kb3cuU2ltcGxleE5vaXNlID0gU2ltcGxleE5vaXNlO1xuICAvLyBub2RlanNcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTaW1wbGV4Tm9pc2U7XG4gIH1cblxufSkoKTtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIilcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcImlzLWZ1bmN0aW9uXCIpXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZShcInBhcnNlLWhlYWRlcnNcIilcbnZhciB4dGVuZCA9IHJlcXVpcmUoXCJ4dGVuZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVhIUlxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlWEhSO1xuY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IHx8IG5vb3BcbmNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCA9IFwid2l0aENyZWRlbnRpYWxzXCIgaW4gKG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKSkgPyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgOiB3aW5kb3cuWERvbWFpblJlcXVlc3RcblxuZm9yRWFjaEFycmF5KFtcImdldFwiLCBcInB1dFwiLCBcInBvc3RcIiwgXCJwYXRjaFwiLCBcImhlYWRcIiwgXCJkZWxldGVcIl0sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGNyZWF0ZVhIUlttZXRob2QgPT09IFwiZGVsZXRlXCIgPyBcImRlbFwiIDogbWV0aG9kXSA9IGZ1bmN0aW9uKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgICAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxuICAgIH1cbn0pXG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIGZvcih2YXIgaSBpbiBvYmope1xuICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgcGFyYW1zID0gdXJpXG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHt1cmk6dXJpfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0geHRlbmQob3B0aW9ucywge3VyaTogdXJpfSlcbiAgICB9XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiBwYXJhbXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlWEhSKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVYSFIob3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgYXJndW1lbnQgbWlzc2luZ1wiKVxuICAgIH1cblxuICAgIHZhciBjYWxsZWQgPSBmYWxzZVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNiT25jZShlcnIsIHJlc3BvbnNlLCBib2R5KXtcbiAgICAgICAgaWYoIWNhbGxlZCl7XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlXG4gICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIGJvZHkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQobG9hZEZ1bmMsIDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICAvLyBDaHJvbWUgd2l0aCByZXF1ZXN0VHlwZT1ibG9iIHRocm93cyBlcnJvcnMgYXJyb3VuZCB3aGVuIGV2ZW4gdGVzdGluZyBhY2Nlc3MgdG8gcmVzcG9uc2VUZXh0XG4gICAgICAgIHZhciBib2R5ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgZ2V0WG1sKHhocilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0pzb24pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yRnVuYyhldnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYoIShldnQgaW5zdGFuY2VvZiBFcnJvcikpe1xuICAgICAgICAgICAgZXZ0ID0gbmV3IEVycm9yKFwiXCIgKyAoZXZ0IHx8IFwiVW5rbm93biBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKSApXG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnN0YXR1c0NvZGUgPSAwXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhldnQsIGZhaWx1cmVSZXNwb25zZSlcbiAgICB9XG5cbiAgICAvLyB3aWxsIGxvYWQgdGhlIGRhdGEgJiBwcm9jZXNzIHRoZSByZXNwb25zZSBpbiBhIHNwZWNpYWwgcmVzcG9uc2Ugb2JqZWN0XG4gICAgZnVuY3Rpb24gbG9hZEZ1bmMoKSB7XG4gICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgdmFyIHN0YXR1c1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZihvcHRpb25zLnVzZVhEUiAmJiB4aHIuc3RhdHVzPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL0lFOCBDT1JTIEdFVCBzdWNjZXNzZnVsIHJlc3BvbnNlIGRvZXNuJ3QgaGF2ZSBhIHN0YXR1cyBmaWVsZCwgYnV0IGJvZHkgaXMgZmluZVxuICAgICAgICAgICAgc3RhdHVzID0gMjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gZmFpbHVyZVJlc3BvbnNlXG4gICAgICAgIHZhciBlcnIgPSBudWxsXG5cbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gMCl7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiBnZXRCb2R5KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycyl7IC8vcmVtZW1iZXIgeGhyIGNhbiBpbiBmYWN0IGJlIFhEUiBmb3IgQ09SUyBpbiBJRVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiSW50ZXJuYWwgWE1MSHR0cFJlcXVlc3QgRXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCByZXNwb25zZSwgcmVzcG9uc2UuYm9keSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gb3B0aW9ucy54aHIgfHwgbnVsbFxuXG4gICAgaWYgKCF4aHIpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29ycyB8fCBvcHRpb25zLnVzZVhEUikge1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5XG4gICAgdmFyIGFib3J0ZWRcbiAgICB2YXIgdXJpID0geGhyLnVybCA9IG9wdGlvbnMudXJpIHx8IG9wdGlvbnMudXJsXG4gICAgdmFyIG1ldGhvZCA9IHhoci5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiXG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgb3B0aW9ucy5kYXRhXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHVybDogdXJpLFxuICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICB9XG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucyAmJiBvcHRpb25zLmpzb24gIT09IGZhbHNlKSB7XG4gICAgICAgIGlzSnNvbiA9IHRydWVcbiAgICAgICAgaGVhZGVyc1tcImFjY2VwdFwiXSB8fCBoZWFkZXJzW1wiQWNjZXB0XCJdIHx8IChoZWFkZXJzW1wiQWNjZXB0XCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgIGlmIChtZXRob2QgIT09IFwiR0VUXCIgJiYgbWV0aG9kICE9PSBcIkhFQURcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSB8fCBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdIHx8IChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5qc29uID09PSB0cnVlID8gYm9keSA6IG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgICAgIGFib3J0ZWQgPSB0cnVlLy9JRTkgbWF5IHN0aWxsIGNhbGwgcmVhZHlzdGF0ZWNoYW5nZVxuICAgICAgICAgICAgeGhyLmFib3J0KFwidGltZW91dFwiKVxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoXCJYTUxIdHRwUmVxdWVzdCB0aW1lb3V0XCIpXG4gICAgICAgICAgICBlLmNvZGUgPSBcIkVUSU1FRE9VVFwiXG4gICAgICAgICAgICBlcnJvckZ1bmMoZSlcbiAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IClcbiAgICB9XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgZm9yKGtleSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGlmKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGVhZGVycyAmJiAhaXNFbXB0eShvcHRpb25zLmhlYWRlcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlcnMgY2Fubm90IGJlIHNldCBvbiBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3RcIilcbiAgICB9XG5cbiAgICBpZiAoXCJyZXNwb25zZVR5cGVcIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZVxuICAgIH1cblxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmJlZm9yZVNlbmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKVxuICAgIH1cblxuICAgIC8vIE1pY3Jvc29mdCBFZGdlIGJyb3dzZXIgc2VuZHMgXCJ1bmRlZmluZWRcIiB3aGVuIHNlbmQgaXMgY2FsbGVkIHdpdGggdW5kZWZpbmVkIHZhbHVlLlxuICAgIC8vIFhNTEh0dHBSZXF1ZXN0IHNwZWMgc2F5cyB0byBwYXNzIG51bGwgYXMgYm9keSB0byBpbmRpY2F0ZSBubyBib2R5XG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9uYXVndHVyL3hoci9pc3N1ZXMvMTAwLlxuICAgIHhoci5zZW5kKGJvZHkgfHwgbnVsbClcblxuICAgIHJldHVybiB4aHJcblxuXG59XG5cbmZ1bmN0aW9uIGdldFhtbCh4aHIpIHtcbiAgICAvLyB4aHIucmVzcG9uc2VYTUwgd2lsbCB0aHJvdyBFeGNlcHRpb24gXCJJbnZhbGlkU3RhdGVFcnJvclwiIG9yIFwiRE9NRXhjZXB0aW9uXCJcbiAgICAvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L3Jlc3BvbnNlWE1MLlxuICAgIHRyeSB7XG4gICAgICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyZWZveEJ1Z1Rha2VuRWZmZWN0ID0geGhyLnJlc3BvbnNlWE1MICYmIHhoci5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgPT09IFwicGFyc2VyZXJyb3JcIlxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiAmJiAhZmlyZWZveEJ1Z1Rha2VuRWZmZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgY2FudmFzU2tldGNoID0gcmVxdWlyZSgnY2FudmFzLXNrZXRjaCcpO1xuY29uc3QgcmFuZG9tID0gcmVxdWlyZSgnY2FudmFzLXNrZXRjaC11dGlsL3JhbmRvbScpO1xuY29uc3QgbG9hZCA9IHJlcXVpcmUoJ2xvYWQtYXNzZXQnKTtcbmltcG9ydCBzdHlsZSBmcm9tICcuL21haW4uY3NzJ1xuLy8gY29uc3QgeyBDb250ZXh0UmVwbGFjZW1lbnRQbHVnaW4gfSA9IHJlcXVpcmUoJ3dlYnBhY2snKTtcbmxldCBmcHNJbnRlcnZhbDtcbmxldCB0aGVuO1xubGV0IHN0YXJ0VGltZTtcbmxldCBub3dcbmxldCBlbGFwc2VkO1xubGV0IGFnZW50cyA9IFtdO1xubGV0IGRvdHNtb3ZlID0gJ29mZidcbmxldCBjYW52YXNcbmxldCBtb3ZpZUludGVydmFsXG5sZXQgY29udGV4dFxubGV0IHR5cGVDb250ZXh0XG5sZXQgdHlwZUNhbnZhc1xubGV0IHZpZGVvXG5sZXQgY2VsbCA9IDVcbmxldCBnZW5lcmF0ZUZpbHRlclxubGV0IHNoYXBlPSdjaXJjbGVzJ1xubGV0IG1vdXNlUG9zXG5sZXQgaW5wdXRTdHJpbmdzID0gW11cbmxldCBnbHlwaHMgPSAnXz0gLycuc3BsaXQoJycpO1xubGV0IHZpZGVvV2lkdGg7XG5sZXQgdmlkZW9IZWlnaHQ7XG5sZXQgdmlkZW9DaG9pY2UgPSBcInRyb2lrYVwiXG4vLyBnbHlwaHMucHVzaChcIlVrcmFpblwiKVxuXG5cbmNvbnN0IGdldEdseXBoID0gKHYpID0+IHtcblx0XG5cdHJldHVybiByYW5kb20ucGljayhnbHlwaHMpO1xufTtcblxuZnVuY3Rpb24gZ2V0TW91c2VQb3MoY2FudmFzLCBldnQpIHtcbmNvbnNvbGUubG9nKFwiZ2V0dGluZ21vdXNlIHBvc1wiKVxuICB2YXIgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc29sZS5sb2cocmVjdClcbiAgcmV0dXJuIHtcbiAgICB4OiBldnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICB5OiBldnQuY2xpZW50WSAtIHJlY3QudG9wXG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0YXJ0QW5pbWF0aW5nKGZwcykge1xuICAgIGZwc0ludGVydmFsID0gMTAwMCAvIGZwcztcbiAgICB0aGVuID0gRGF0ZS5ub3coKTtcbiAgICBzdGFydFRpbWUgPSB0aGVuO1xuICAgIHRpY2soKTtcbn1cbmNsYXNzIEFnZW50IHtcblx0Y29uc3RydWN0b3IoeCwgeSwgZmlsbFN0eWxlLCBjZWxsKSB7XG5cdFx0Ly8gdGhpcy5wb3MgPSBuZXcgVmVjdG9yKHgsIHkpO1xuXHRcdHRoaXMueD14O1xuXHRcdHRoaXMueT15O1xuXHRcdHRoaXMucmFkaXVzPWNlbGwvMjtcblx0XHR0aGlzLmZpbGxTdHlsZT1maWxsU3R5bGVcblx0XHR0aGlzLnZlbCA9IHt4OnJhbmRvbS5yYW5nZSgtLjUsIC41KSwgeTpyYW5kb20ucmFuZ2UoLS41LCAuNSl9O1xuXG5cdH1cblxuXG5nZXREaXN0YW5jZSh2KSB7XG5cdFx0Y29uc3QgZHggPSB0aGlzLnggLSB2Lng7XG5cdFx0Y29uc3QgZHkgPSB0aGlzLnkgLSB2Lnk7XG5cdFx0cmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG59XG5cbm1vdmVCaXQoKXtcblx0dGhpcy54ICs9IHRoaXMudmVsLng7XG5cdHRoaXMueSArPSB0aGlzLnZlbC55O1xuXHRzd2l0Y2goc2hhcGUpe1xuY2FzZSAnY2lyY2xlcyc6XG50aGlzLmRyYXcoY29udGV4dClcbmJyZWFrO1xuY2FzZSAnc3F1YXJlcyc6XG50aGlzLmRyYXdTcXVhcmUoY29udGV4dClcbmJyZWFrO1xuY2FzZSAncnVtYnVzJzpcbnRoaXMuZHJhd1J1bWJ1cyhjb250ZXh0KVxuYnJlYWs7XG5jYXNlICd3b3Jkcyc6XG5jb250ZXh0LmZpbGxTdHlsZSA9ICdibGFjayc7XG5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuY29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbnRoaXMuZHJhd1RleHQoY29udGV4dClcbn1cblxudGhpcy5ib3VuY2UoMTAwMCwgMTAwMClcbn1cblxuXG5cblxuXHRib3VuY2Uod2lkdGgsIGhlaWdodCkge1xuXHRcdGlmICh0aGlzLnggPD0gMCB8fCB0aGlzLnggPj0gd2lkdGgpICB0aGlzLnZlbC54ICo9IC0xO1xuXHRcdGlmICh0aGlzLnkgPD0gMCB8fCB0aGlzLnkgPj0gaGVpZ2h0KSB0aGlzLnZlbC55ICo9IC0xO1xuXHR9XG5cblx0dXBkYXRlKCkge1xuXHRcdHRoaXMueCArPSB0aGlzLnZlbC54O1xuXHRcdHRoaXMueSArPSB0aGlzLnZlbC55O1xuXHR9XG5cblx0ZHJhdyhjb250ZXh0KSB7XG5cdFx0Y29udGV4dC5zYXZlKCk7XG5cblx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZmlsbFN0eWxlXG5cdFx0Y29udGV4dC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXHQgICAgY29udGV4dC50cmFuc2xhdGUodGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcblxuXHRcdGNvbnRleHQuYmVnaW5QYXRoKCk7XG5cdFx0Y29udGV4dC5hcmMoMCwgMCwgdGhpcy5yYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcblx0XHRjb250ZXh0LmZpbGwoKTtcblx0XHRjb250ZXh0LnJlc3RvcmUoKTtcblx0fVxuXHRkcmF3U3F1YXJlKGNvbnRleHQpIHtcblx0XHRjb250ZXh0LnNhdmUoKTtcblxuXHRcdGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGVcblx0XHRjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG5cdCAgICAvLyBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXMpO1xuXG5cdFx0Y29udGV4dC5iZWdpblBhdGgoKTtcblxuXHRcdGNvbnRleHQuZmlsbFJlY3QoMCwwLHRoaXMucmFkaXVzKjIsIHRoaXMucmFkaXVzKjIpO1xuXHRcdGNvbnRleHQuZmlsbCgpO1xuXHRcdGNvbnRleHQucmVzdG9yZSgpO1xuXHR9XG5cdGRyYXdSdW1idXMoY29udGV4dCkge1xuXHRcdGNvbnRleHQuc2F2ZSgpO1xuXG5cdFx0Y29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZVxuXHRcdGNvbnRleHQudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcblx0XHRjb250ZXh0LnJvdGF0ZShNYXRoLlBJKi4yNSk7XG5cblx0ICAgIC8vIGNvbnRleHQudHJhbnNsYXRlKHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1cyk7XG5cblx0XHRjb250ZXh0LmJlZ2luUGF0aCgpO1xuXG5cdFx0Y29udGV4dC5maWxsUmVjdCgwLDAsdGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzKTtcblxuXG5cblx0XHRjb250ZXh0LmZpbGwoKTtcblxuXHRcdGNvbnRleHQucmVzdG9yZSgpO1xuXHR9XG5cdGRyYXdUZXh0KGNvbnRleHQpIHtcblxuXG5cdFx0Y29uc3QgZ2x5cGggPSBnZXRHbHlwaCgyMDApO1xuXHRcdGZvbnRTaXplID0gdGhpcy5yYWRpdXMgKiAyLjQ7XG5cblx0XHR0eXBlQ29udGV4dC5maWxsU3R5bGUgPSAnYmxhY2snO1xuXHRcblxuXHRcdFx0Y29udGV4dC5mb250ID0gYCR7dGhpcy5yYWRpdXMgKiAyfXB4ICR7Zm9udEZhbWlseX1gO1xuXHRcdFx0aWYgKE1hdGgucmFuZG9tKCkgPCAwLjEpIGNvbnRleHQuZm9udCA9IGAke3RoaXMucmFkaXVzICogNn1weCAke2ZvbnRGYW1pbHl9YDtcblx0XHRcdHR5cGVDb250ZXh0LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuXG5cdFx0Y29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZVxuXG5cdFx0XHRjb250ZXh0LnNhdmUoKTtcblx0XHRcdGNvbnRleHQudHJhbnNsYXRlKHRoaXMueCwgdGhpcy55KTtcblx0XHRcdGNvbnRleHQudHJhbnNsYXRlKHRoaXMucmFkaXVzICogMC41LCB0aGlzLnJhZGl1cyAqIDAuNSk7XG5cblx0XHRcdC8vIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2VsbCwgY2VsbCk7XG5cblx0XHRcdGNvbnRleHQuZmlsbFRleHQoZ2x5cGgsIDAsIDApO1xuXHRcdFx0XG5cdFx0XHRjb250ZXh0LnJlc3RvcmUoKTtcblxuXHRcdFxuXHR9XG59XG5cblxuXG5sZXQgYWdlbnRQdXNoZWQgPSAwIFxubGV0IGZvbnRTaXplID0gMTIwMDtcbmxldCBmb250RmFtaWx5ID0gJ3NlcmlmJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHsgXG5cbnR5cGVDYW52YXM9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhczEnKTtcbmNhbnZhcz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzMicpO1xuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4vLyBjb25zb2xlLmxvZyh0eXBlQ2FudmFzKVxudHlwZUNvbnRleHQgPSB0eXBlQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG52aWRlbyAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlkZW8nKTtcbnZhciBjaGVja3ZpZGVvID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRpZiAoIHZpZGVvLnJlYWR5U3RhdGUgPT09IDQgKSB7XG52aWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbnZpZGVvSGVpZ2h0ID0gdmlkZW8udmlkZW9IZWlnaHQ7XG4vLyBjb25zb2xlLmxvZyh2aWRlb0hlaWdodClcbnZhciB0eXBlQ2FudmFzSGVpZ2h0ID0gdmlkZW9IZWlnaHQvY2VsbDtcbnZhciB0eXBlQ2FudmFzV2lkdGggPSB2aWRlb1dpZHRoL2NlbGxcbi8vIGNvbnNvbGUubG9nKHR5cGVDYW52YXNIZWlnaHQpXG4vLyBjb25zb2xlLmxvZyh0eXBlQ2FudmFzV2lkdGgpXG50eXBlQ2FudmFzLndpZHRoID0gdHlwZUNhbnZhc1dpZHRoO1xudHlwZUNhbnZhcy5oZWlnaHQgPSB0eXBlQ2FudmFzSGVpZ2h0O1xuY2FudmFzLmhlaWdodCA9IHZpZGVvSGVpZ2h0O1xuY2FudmFzLndpZHRoPSB2aWRlb1dpZHRoO1xuY2xlYXJJbnRlcnZhbChjaGVja3ZpZGVvKVxuXG59XG59LCAyMDApO1xuXG5cblxuLy9tYWluIGZ1bmNpdG9uXG5nZW5lcmF0ZUZpbHRlcj0gZnVuY3Rpb24odmlkZW8pe1xuXHQvLyBjb25zb2xlLmxvZygnbW91c2Vkb3duJylcblx0Y2xlYXJJbnRlcnZhbChtb3ZpZUludGVydmFsKVxuXHQgbW92aWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0Y29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuXHRkb3RzbW92ZT0gJ29mZidcblx0YWdlbnRzID0gW107XG5cbiAgICB2YXIgJHRoaXMgPSB0aGlzOyAvL2NhY2hlXG5cdGNvbnN0IHdpZHRoPSB0eXBlQ2FudmFzLndpZHRoO1xuXHRjb25zdCBoZWlnaHQgPSB0eXBlQ2FudmFzLmhlaWdodFxuXHQvLyBjb25zdCBjb2xzID0gTWF0aC5mbG9vcih3aWR0aCAgLyBjZWxsKTtcblx0Ly8gY29uc3Qgcm93cyA9IE1hdGguZmxvb3IoaGVpZ2h0IC8gY2VsbCk7XG5cdGNvbnN0IGNvbHMgPSB3aWR0aDtcblx0Y29uc3Qgcm93cyA9IGhlaWdodDtcblx0Y29uc3QgbnVtQ2VsbHMgPSBjb2xzICogcm93c1xuICBcbiAgICAgICAgdHlwZUNvbnRleHQuZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblx0XHR2YXIgdHlwZURhdGEgPSB0eXBlQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCkuZGF0YTtcblx0XHQvLyBjb25zb2xlLmxvZyh0eXBlRGF0YSlcblx0XHRjb250ZXh0LmZpbGxTdHlsZSA9ICdibGFjayc7XG5cdFx0Y29udGV4dC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuXHRcdGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cdFx0Y29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcblxuXHRcdC8vIGNvbnRleHQuZHJhd0ltYWdlKHR5cGVDYW52YXMsIDAsIDApO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ2VsbHM7IGkrKykge1xuXG5cdFx0XHRjb25zdCBjb2wgPSBpICUgY29scztcblx0XHRcdGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaSAvIGNvbHMpO1xuXG5cdFx0XHRjb25zdCB4ID0gY29sKmNlbGw7XG5cdFx0XHRjb25zdCB5ID0gcm93KmNlbGw7XG5cblx0XHRcdGNvbnN0IHIgPSB0eXBlRGF0YVtpICogNCArIDBdO1xuXHRcdFx0Y29uc3QgZyA9IHR5cGVEYXRhW2kgKiA0ICsgMV07XG5cdFx0XHRjb25zdCBiID0gdHlwZURhdGFbaSAqIDQgKyAyXTtcblx0XHRcdGNvbnN0IGEgPSB0eXBlRGF0YVtpICogNCArIDNdO1xuXHRcdFx0Ly8gbGV0IG5ld0FnZW50ID0gbmV3IEFnZW50KHgsIHksJ3JnYignK3IrJywnK2crJywnK2IrJyknLCBjZWxsIClcblx0XHRcdC8vIGNvbnNvbGUubG9nKG5ld0FnZW50KVxuXG5cdFx0XHRhZ2VudHMucHVzaChuZXcgQWdlbnQoeCwgeSwncmdiKCcrcisnLCcrZysnLCcrYisnKScsIGNlbGwgKSlcblx0XHRcdC8vIGNvbnNvbGUubG9nKGFnZW50cylcblx0XHRcdC8vIGNvbnNvbGUubG9nKEFnZW50KVxuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJhZ2VudFwiKVxuXHRcdFx0YWdlbnRQdXNoZWQrKztcblxuXHRcdH1cblx0XHRpZihhZ2VudFB1c2hlZD49bnVtQ2VsbHMpe1xuXHRcblx0XHRcdFx0YWdlbnRzLmZvckVhY2goYWdlbnQ9PntcblxuXHRcdFx0c3dpdGNoKHNoYXBlKXtcbmNhc2UgJ2NpcmNsZXMnOlxuYWdlbnQuZHJhdyhjb250ZXh0KVxuYnJlYWs7XG5jYXNlICdzcXVhcmVzJzpcbmFnZW50LmRyYXdTcXVhcmUoY29udGV4dClcbmJyZWFrO1xuY2FzZSAncnVtYnVzJzpcbmFnZW50LmRyYXdSdW1idXMoY29udGV4dClcbmJyZWFrO1xuY2FzZSAnd29yZHMnOlxuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbmNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcic7XG5hZ2VudC5kcmF3VGV4dChjb250ZXh0KVxufVxuXG5cblxuXG59KVxuXHR9XHRcblxufSwgNTAwKTtcblxuXG5pZihjYW52YXMpe1xuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNhbnZhc0NsaWNrKTtcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSk9PntcbmNvbnNvbGUubG9nKCdtb2lzZW1vdmUnKVxubW92ZVBpeGxlcyhlKVxufSlcbn1cbn1cblxuXG5cbnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbiAoKSB7XG5cbmdlbmVyYXRlRmlsdGVyKHZpZGVvKTtcblxufSlcblxuXG5cbn0pXG5jb25zdCBjYW52YXNDbGljayA9ICgpPT57XG5jbGVhckludGVydmFsKG1vdmllSW50ZXJ2YWwpXG5jb25zb2xlLmxvZygnY2FudmFzIGNsaWNrJylcbmlmKGRvdHNtb3ZlPT0nb2ZmJyl7XG5kb3RzbW92ZSA9J29uJ1xufVxuZWxzZXtcbmRvdHNtb3ZlPVwib2ZmXCJcbmdlbmVyYXRlRmlsdGVyKHZpZGVvKTtcbn1cbn1cblxuXG5jb25zdCB0aWNrID0gKCkgPT57XG5cbmlmKGFnZW50cy5sZW5ndGg+MCYmZG90c21vdmU9PSdvbicpe1xuZm9yKGxldCBpID0gMDsgaTxhZ2VudHMubGVuZ3RoO2krKyl7XG5hZ2VudHNbaV0udXBkYXRlKClcbnN3aXRjaChzaGFwZSl7XG5jYXNlICdjaXJjbGVzJzpcbmFnZW50c1tpXS5kcmF3KGNvbnRleHQpXG5icmVhaztcbmNhc2UgJ3NxdWFyZXMnOlxuYWdlbnRzW2ldLmRyYXdTcXVhcmUoY29udGV4dClcbmJyZWFrO1xuY2FzZSAncnVtYnVzJzpcbmFnZW50c1tpXS5kcmF3UnVtYnVzKGNvbnRleHQpXG5icmVhaztcbmNhc2UgJ3dvcmRzJzpcbmNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcbmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5jb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuYWdlbnRzW2ldLmRyYXdUZXh0KGNvbnRleHQpXG59XG5cbmFnZW50c1tpXS5ib3VuY2UodmlkZW9XaWR0aCwgdmlkZW9IZWlnaHQpXG59XG59XG4gICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljaylcbiAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgIGVsYXBzZWQgPSBub3cgLSB0aGVuO1xuXG4gICAgLy8gaWYgZW5vdWdoIHRpbWUgaGFzIGVsYXBzZWQsIGRyYXcgdGhlIG5leHQgZnJhbWVcblxuICAgIGlmIChlbGFwc2VkID4gZnBzSW50ZXJ2YWwpIHtcblxuICAgICAgICAvLyBHZXQgcmVhZHkgZm9yIG5leHQgZnJhbWUgYnkgc2V0dGluZyB0aGVuPW5vdywgYnV0IGFsc28gYWRqdXN0IGZvciB5b3VyXG4gICAgICAgIC8vIHNwZWNpZmllZCBmcHNJbnRlcnZhbCBub3QgYmVpbmcgYSBtdWx0aXBsZSBvZiBSQUYncyBpbnRlcnZhbCAoMTYuN21zKVxuICAgICAgICB0aGVuID0gbm93IC0gKGVsYXBzZWQgJSBmcHNJbnRlcnZhbCk7ICAgXG59XG59XG5zdGFydEFuaW1hdGluZyg1KVxuXG5cbmNvbnN0IHNlbGVjdFNpemVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpemVTZWxlY3QnKVxuLy9zZWxlY3Qgc2l6ZXMgZnVuY3Rpb25cbmNvbnN0IGNoYW5nZVNpemU9IGZ1bmN0aW9uKCl7XG5sZXQgc2l6ZVZhbHVlID0gcGFyc2VJbnQoc2VsZWN0U2l6ZXMudmFsdWUpO1xuY29uc29sZS5sb2coc2l6ZVZhbHVlKTtcbmNlbGw9c2l6ZVZhbHVlXG5cdGlmICggdmlkZW8ucmVhZHlTdGF0ZSA9PT0gNCApIHtcbnZhciB2aWRlb1dpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbnZhciB2aWRlb0hlaWdodCA9IHZpZGVvLnZpZGVvSGVpZ2h0O1xuLy8gY29uc29sZS5sb2codmlkZW9IZWlnaHQpXG52YXIgdHlwZUNhbnZhc0hlaWdodCA9IHZpZGVvSGVpZ2h0L2NlbGw7XG52YXIgdHlwZUNhbnZhc1dpZHRoID0gdmlkZW9XaWR0aC9jZWxsXG4vLyBjb25zb2xlLmxvZyh0eXBlQ2FudmFzSGVpZ2h0KVxuLy8gY29uc29sZS5sb2codHlwZUNhbnZhc1dpZHRoKVxudHlwZUNhbnZhcy53aWR0aCA9IHR5cGVDYW52YXNXaWR0aDtcbnR5cGVDYW52YXMuaGVpZ2h0ID0gdHlwZUNhbnZhc0hlaWdodDtcbmNhbnZhcy5oZWlnaHQgPSB2aWRlb0hlaWdodDtcbmNhbnZhcy53aWR0aD0gdmlkZW9XaWR0aDtcbmNsZWFySW50ZXJ2YWwobW92aWVJbnRlcnZhbCk7XG5nZW5lcmF0ZUZpbHRlcih2aWRlbylcblx0fVxufVxuc2VsZWN0U2l6ZXMuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PntjaGFuZ2VTaXplKCl9KVxuXG5cbmNvbnN0IHNlbGVjdEZpbHRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXJTZWxlY3QnKVxuc2VsZWN0RmlsdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpPT57Y2hhbmdlRmlsdGVyKCl9KVxuXG5cbmZ1bmN0aW9uIGNoYW5nZUZpbHRlcigpe1xuY29uc29sZS5sb2coc2VsZWN0RmlsdGVyLnZhbHVlKVxuc2hhcGUgPSBzZWxlY3RGaWx0ZXIudmFsdWU7XG59XG5cblxuXG5cbmNvbnN0IGxvYWRWaWRlbz0gZnVuY3Rpb24oKXtcbnZpZGVvICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlbycpO1xuc3dpdGNoKHZpZGVvQ2hvaWNlKXtcbmNhc2UgXCJ0cm9pa2FcIjpcbnZpZGVvLnNyYyA9IFwiLi90cm9pa2EubXA0XCJcbmJyZWFrO1xuY2FzZSBcInBlZGxlclwiOlxudmlkZW8uc3JjPVwiLi9rb3JvLm1wNFwiXG59XG59XG5cbmxvYWRWaWRlbygpXG5cbmNvbnN0IHNlbGVjdFZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvU2VsZWN0JylcbmZ1bmN0aW9uIGNoYW5nZVZpZGVvKCl7XG5jb25zb2xlLmxvZyhzZWxlY3RWaWRlby52YWx1ZSlcbnZpZGVvQ2hvaWNlPXNlbGVjdFZpZGVvLnZhbHVlO1xubG9hZFZpZGVvKClcbnNldFRpbWVvdXQoKCkgPT4ge1xuXHRcblxuaWYgKCB2aWRlby5yZWFkeVN0YXRlID09PSA0ICl7XG52YXIgdmlkZW9XaWR0aCA9IHZpZGVvLnZpZGVvV2lkdGg7XG52YXIgdmlkZW9IZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbi8vIGNvbnNvbGUubG9nKHZpZGVvSGVpZ2h0KVxudmFyIHR5cGVDYW52YXNIZWlnaHQgPSB2aWRlb0hlaWdodC9jZWxsO1xudmFyIHR5cGVDYW52YXNXaWR0aCA9IHZpZGVvV2lkdGgvY2VsbFxuLy8gY29uc29sZS5sb2codHlwZUNhbnZhc0hlaWdodClcbi8vIGNvbnNvbGUubG9nKHR5cGVDYW52YXNXaWR0aClcbnR5cGVDYW52YXMud2lkdGggPSB0eXBlQ2FudmFzV2lkdGg7XG50eXBlQ2FudmFzLmhlaWdodCA9IHR5cGVDYW52YXNIZWlnaHQ7XG5jYW52YXMuaGVpZ2h0ID0gdmlkZW9IZWlnaHQ7XG5jYW52YXMud2lkdGg9IHZpZGVvV2lkdGg7XG5jbGVhckludGVydmFsKG1vdmllSW50ZXJ2YWwpO1xuZ2VuZXJhdGVGaWx0ZXIodmlkZW8pXG59XG59LCA1MCk7XG59XG5zZWxlY3RWaWRlby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKT0+e2NoYW5nZVZpZGVvKCl9KVxuXG4vLyBzZWxlY3RWaWRlb3MuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgbG9hZFZpZGVvKCkpXG5cbmNvbnN0IHdvcmRzSW5wdXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0V29yZHNGb3JtJylcbmNvbnN0IHdvcmRzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRXb3JkcycpXG5cbndvcmRzSW5wdXRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsKGUpPT57XG5lLnByZXZlbnREZWZhdWx0KCk7XG5lLnN0b3BQcm9wYWdhdGlvbigpO1xuXG5hZGRXb3JkcygpfSlcblxuZnVuY3Rpb24gYWRkV29yZHMoKXtcbnZhciB3b3JkID0gd29yZHNJbnB1dC52YWx1ZTtcbmNvbnNvbGUubG9nKHdvcmRzSW5wdXQudmFsdWUpXG5pZih3b3JkLmxlbmd0aDwyMCl7XG5pbnB1dFN0cmluZ3MucHVzaCh3b3JkKVxuZ2x5cGhzPWdseXBocy5jb25jYXQoaW5wdXRTdHJpbmdzKVxuY29uc29sZS5sb2coZ2x5cGhzKVxufTtcbn1cblxuY29uc3QgbW92ZVBpeGxlcz0oZSk9Pntcbm1vdXNlUG9zID0gZ2V0TW91c2VQb3MoY2FudmFzLCBlKVxuXG5mb3IgKGxldCBpID0gMDsgaSA8IGFnZW50cy5sZW5ndGg7IGkrKykge1xuXHRjb25zdCBhZ2VudCA9IGFnZW50c1tpXTtcbmNvbnN0IGRpc3QgPSBhZ2VudC5nZXREaXN0YW5jZShtb3VzZVBvcyk7XG5cdGlmIChkaXN0ID4gMjAwKSBjb250aW51ZTtcblx0XHRhZ2VudC5tb3ZlQml0KClcblx0XHR9XHRcblxuXG5cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==