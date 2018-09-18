// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Base64 en/decoding. Not much to say here except that we
 * work with decoded values in arrays of bytes. By "byte" I mean a number
 * in [0, 255].
 *
 * @author doughtie@google.com (Gavin Doughtie)
 * @author fschneider@google.com (Fritz Schneider)
 */

//goog.provide('goog.crypt.base64');
//goog.require('goog.crypt');
//goog.require('goog.userAgent');


var Base64 = {};
var ua = navigator.userAgent.toLowerCase();
var userAgent = {};
userAgent.OPERA = ua.indexOf("opera") > -1,
        userAgent.isSafari = (/webkit|khtml/).test(ua),
        userAgent.GECKO = !userAgent.isSafari && ua.indexOf("gecko") > -1,
// Static lookup maps, lazily populated by init_()


        /**
         * Maps bytes to characters.
         * @type {Object}
         * @private
         */
        Base64.byteToCharMap_ = null;


/**
 * Maps characters to bytes.
 * @type {Object}
 * @private
 */
Base64.charToByteMap_ = null;


/**
 * Maps bytes to websafe characters.
 * @type {Object}
 * @private
 */
Base64.byteToCharMapWebSafe_ = null;


/**
 * Maps websafe characters to bytes.
 * @type {Object}
 * @private
 */
Base64.charToByteMapWebSafe_ = null;


/**
 * Our default alphabet, shared between
 * ENCODED_VALS and ENCODED_VALS_WEBSAFE
 * @type {string}
 */
Base64.ENCODED_VALS_BASE =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz' +
        '0123456789';


/**
 * Our default alphabet. Value 64 (=) is special; it means "nothing."
 * @type {string}
 */
Base64.ENCODED_VALS =
        Base64.ENCODED_VALS_BASE + '+/=';


/**
 * Our websafe alphabet.
 * @type {string}
 */
Base64.ENCODED_VALS_WEBSAFE =
        Base64.ENCODED_VALS_BASE + '-_.';

Base64.atob = function(input) {
    return atob(input);
}

Base64.btoa = function(input) {
    return btoa(input);
}


/**
 * Whether this browser supports the atob and btoa functions. This extension
 * started at Mozilla but is now implemented by many browsers. We use the
 * ASSUME_* variables to avoid pulling in the full useragent detection library
 * but still allowing the standard per-browser compilations.
 *
 * @type {boolean}
 */
//userAgent.WEBKIT || desuso
Base64.HAS_NATIVE_SUPPORT = userAgent.GECKO ||
        userAgent.OPERA ||
        typeof(Base64.atob) == 'function';


/**
 * Turns a string into an array of bytes; a "byte" being a JS number in the
 * range 0-255.
 * @param {string} str String value to arrify.
 * @return {!Array.<number>} Array of numbers corresponding to the
 *     UCS character codes of each character in str.
 */
Base64.stringToByteArray = function(str) {
    var output = [], p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        while (c > 0xff) {
            output[p++] = c & 0xff;
            c >>= 8;
        }
        output[p++] = c;
    }
    return output;
};


/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param {Array} array Array of numbers representing characters.
 * @return {string} Stringification of the array.
 */
Base64.byteArrayToString = function(array) {
    return String.fromCharCode.apply(null, array);
};


/**
 * Base64-encode an array of bytes.
 *
 * @param {Array.<number>|Uint8Array} input An array of bytes (numbers with
 *     value in [0, 255]) to encode.
 * @param {boolean=} opt_webSafe Boolean indicating we should use the
 *     alternative alphabet.
 * @return {string} The base64 encoded string.
 */
Base64.encodeByteArray = function(input, opt_webSafe) {
//  if (!goog.isArrayLike(input)) {
//    throw Error('encodeByteArray takes an array as a parameter');
//  }
    if (!Object.keys(input).length) {
        throw Error('encodeByteArray takes an array as a parameter');
    }

    Base64.init_();

    var byteToCharMap = opt_webSafe ?
            Base64.byteToCharMapWebSafe_ :
            Base64.byteToCharMap_;

    var output = [];

    for (var i = 0; i < input.length; i += 3) {
        var byte1 = input[i];
        var haveByte2 = i + 1 < input.length;
        var byte2 = haveByte2 ? input[i + 1] : 0;
        var haveByte3 = i + 2 < input.length;
        var byte3 = haveByte3 ? input[i + 2] : 0;

        var outByte1 = byte1 >> 2;
        var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
        var outByte3 = ((byte2 & 0x0F) << 2) | (byte3 >> 6);
        var outByte4 = byte3 & 0x3F;

        if (!haveByte3) {
            outByte4 = 64;

            if (!haveByte2) {
                outByte3 = 64;
            }
        }

        output.push(byteToCharMap[outByte1],
                byteToCharMap[outByte2],
                byteToCharMap[outByte3],
                byteToCharMap[outByte4]);
    }

    return output.join('');
};


/**
 * Base64-encode a string.
 *
 * @param {string} input A string to encode.
 * @param {boolean=} opt_webSafe If true, we should use the
 *     alternative alphabet.
 * @return {string} The base64 encoded string.
 */
Base64.encodeString = function(input, opt_webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (Base64.HAS_NATIVE_SUPPORT && !opt_webSafe) {
        return Base64.btoa(input);
    }
    return Base64.encodeByteArray(
            Base64.stringToByteArray(input), opt_webSafe);
};


/**
 * Base64-decode a string.
 *
 * @param {string} input to decode.
 * @param {boolean=} opt_webSafe True if we should use the
 *     alternative alphabet.
 * @return {string} string representing the decoded value.
 */
Base64.decodeString = function(input, opt_webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (Base64.HAS_NATIVE_SUPPORT && !opt_webSafe) {
        return Base64.atob(input);
    }
    return Base64.byteArrayToString(
            Base64.decodeStringToByteArray(input, opt_webSafe));
};


/**
 * Base64-decode a string.
 *
 * @param {string} input to decode (length not required to be a multiple of 4).
 * @param {boolean=} opt_webSafe True if we should use the
 *     alternative alphabet.
 * @return {!Array} bytes representing the decoded value.
 */
Base64.decodeStringToByteArray = function(input, opt_webSafe) {
    Base64.init_();

    var charToByteMap = opt_webSafe ?
            Base64.charToByteMapWebSafe_ :
            Base64.charToByteMap_;

    var output = [];

    for (var i = 0; i < input.length; ) {
        var byte1 = charToByteMap[input.charAt(i++)];

        var haveByte2 = i < input.length;
        var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
        ++i;

        var haveByte3 = i < input.length;
        var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 0;
        ++i;

        var haveByte4 = i < input.length;
        var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 0;
        ++i;

        if (byte1 == null || byte2 == null ||
                byte3 == null || byte4 == null) {
            throw Error();
        }

        var outByte1 = (byte1 << 2) | (byte2 >> 4);
        output.push(outByte1);

        if (byte3 != 64) {
            var outByte2 = ((byte2 << 4) & 0xF0) | (byte3 >> 2);
            output.push(outByte2);

            if (byte4 != 64) {
                var outByte3 = ((byte3 << 6) & 0xC0) | byte4;
                output.push(outByte3);
            }
        }
    }

    return output;
};

Base64.encodeSecret = function(v, h) {
    var a = "";
    for (var i = 0; i < v.length; i++) {
        var t = parseInt(v.charCodeAt(i));
        a += ((3 * t + 237) * (3 * t + 237) + 7).toString();
    }
    for (var i = 0; i < h.length; i++) {
        var t = parseInt(h.charCodeAt(i));
        a += ((3 * t + 237) * (3 * t + 237) + 7).toString();
    }
    return Base64.encodeString(a);
};

Base64.decodeSecret = function(v) {
    var decode64 = Base64.decodeString(v);
    //var arrString = decode64.split("", 6);
    var arr = new Array();
//    for (var i = 0; i < decode64.length; i + 6) {
//        arr.push(decode64.substring(i, i + 5))
//    }
//    console.log(decode64.substring(0, 6))
//    console.log('||||||')
    return decode64;
//    $str = "";
//        for ($i = 0; $i < Count($encodedParts); $i++) {
//            $tstr = $encodedParts[$i] - 7;
//            $tstr = sqrt($tstr);
//            $tstr = $tstr - 237;
//            $tstr = $tstr / 3;
//            $str.=chr($tstr);
//        }
//        return $str;
};

/**
 * Lazy static initialization function. Called before
 * accessing any of the static map variables.
 * @private
 */
Base64.init_ = function() {
    if (!Base64.byteToCharMap_) {
        Base64.byteToCharMap_ = {};
        Base64.charToByteMap_ = {};
        Base64.byteToCharMapWebSafe_ = {};
        Base64.charToByteMapWebSafe_ = {};

        // We want quick mappings back and forth, so we precompute two maps.
        for (var i = 0; i < Base64.ENCODED_VALS.length; i++) {
            Base64.byteToCharMap_[i] =
                    Base64.ENCODED_VALS.charAt(i);
            Base64.charToByteMap_[Base64.byteToCharMap_[i]] = i;
            Base64.byteToCharMapWebSafe_[i] =
                    Base64.ENCODED_VALS_WEBSAFE.charAt(i);
            Base64.charToByteMapWebSafe_[
                    Base64.byteToCharMapWebSafe_[i]] = i;
        }
    }
};