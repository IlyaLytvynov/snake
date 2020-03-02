/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ua-parser-js/src/ua-parser.js":
/*!****************************************************!*\
  !*** ./node_modules/ua-parser-js/src/ua-parser.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * UAParser.js v0.7.21
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */

(function (window, undefined) {

    'use strict';

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '0.7.21',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major', // deprecated
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded';


    ///////////
    // Helper
    //////////


    var util = {
        extend : function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        has : function (str1, str2) {
          if (typeof str1 === "string") {
            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
          } else {
            return false;
          }
        },
        lowerize : function (str) {
            return str.toLowerCase();
        },
        major : function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
        },
        trim : function (str) {
          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        }
    };


    ///////////////
    // Map helper
    //////////////


    var mapper = {

        rgx : function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length == 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length == 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                    }
                                } else if (q.length == 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                                }
                            } else {
                                this[q] = match ? match : undefined;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        str : function (str, map) {

            for (var i in map) {
                // check if array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (util.has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined : i;
                        }
                    }
                } else if (util.has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined : i;
                }
            }
            return str;
        }
    };


    ///////////////
    // String map
    //////////////


    var maps = {

        browser : {
            oldsafari : {
                version : {
                    '1.0'   : '/8',
                    '1.2'   : '/1',
                    '1.3'   : '/3',
                    '2.0'   : '/412',
                    '2.0.2' : '/416',
                    '2.0.3' : '/417',
                    '2.0.4' : '/419',
                    '?'     : '/'
                }
            }
        },

        device : {
            amazon : {
                model : {
                    'Fire Phone' : ['SD', 'KF']
                }
            },
            sprint : {
                model : {
                    'Evo Shift 4G' : '7373KT'
                },
                vendor : {
                    'HTC'       : 'APA',
                    'Sprint'    : 'Sprint'
                }
            }
        },

        os : {
            windows : {
                version : {
                    'ME'        : '4.90',
                    'NT 3.11'   : 'NT3.51',
                    'NT 4.0'    : 'NT4.0',
                    '2000'      : 'NT 5.0',
                    'XP'        : ['NT 5.1', 'NT 5.2'],
                    'Vista'     : 'NT 6.0',
                    '7'         : 'NT 6.1',
                    '8'         : 'NT 6.2',
                    '8.1'       : 'NT 6.3',
                    '10'        : ['NT 6.4', 'NT 10.0'],
                    'RT'        : 'ARM'
                }
            }
        }
    };


    //////////////
    // Regex map
    /////////////


    var regexes = {

        browser : [[

            // Presto based
            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
            ], [NAME, VERSION], [

            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
            ], [[NAME, 'Opera Mini'], VERSION], [

            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
            ], [[NAME, 'Opera'], VERSION], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                                // Avant/IEMobile/SlimBrowser
            /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,                      // Baidu Browser
            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

            // Webkit/KHTML based
            /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            ], [NAME, VERSION], [

            /(konqueror)\/([\w\.]+)/i                                           // Konqueror
            ], [[NAME, 'Konqueror'], VERSION], [

            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
            ], [[NAME, 'IE'], VERSION], [

            /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i                          // Microsoft Edge
            ], [[NAME, 'Edge'], VERSION], [

            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
            ], [[NAME, 'Yandex'], VERSION], [

            /(Avast)\/([\w\.]+)/i                                               // Avast Secure Browser
            ], [[NAME, 'Avast Secure Browser'], VERSION], [

            /(AVG)\/([\w\.]+)/i                                                 // AVG Secure Browser
            ], [[NAME, 'AVG Secure Browser'], VERSION], [

            /(puffin)\/([\w\.]+)/i                                              // Puffin
            ], [[NAME, 'Puffin'], VERSION], [

            /(focus)\/([\w\.]+)/i                                               // Firefox Focus
            ], [[NAME, 'Firefox Focus'], VERSION], [

            /(opt)\/([\w\.]+)/i                                                 // Opera Touch
            ], [[NAME, 'Opera Touch'], VERSION], [

            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
            ], [[NAME, 'UCBrowser'], VERSION], [

            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [

            /(windowswechat qbcore)\/([\w\.]+)/i                                // WeChat Desktop for Windows Built-in Browser
            ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [

            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
            ], [[NAME, 'WeChat'], VERSION], [

            /(brave)\/([\w\.]+)/i                                               // Brave browser
            ], [[NAME, 'Brave'], VERSION], [

            /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
            ], [NAME, VERSION], [

            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
            ], [NAME, VERSION], [

            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
            ], [NAME, VERSION], [

            /(baiduboxapp)[\/\s]?([\w\.]+)/i                                    // Baidu App
            ], [NAME, VERSION], [

            /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
            ], [NAME, VERSION], [

            /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
            ], [NAME], [

            /(LBBROWSER)/i                                                      // LieBao Browser
            ], [NAME], [

            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
            ], [VERSION, [NAME, 'MIUI Browser']], [

            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
            ], [VERSION, [NAME, 'Facebook']], [

            /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
            /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
            ], [NAME, VERSION], [

            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
            ], [VERSION, [NAME, 'Chrome Headless']], [

            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

            /((?:oculus|samsung)browser)\/([\w\.]+)/i
            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
            ], [VERSION, [NAME, 'Android Browser']], [

            /(sailfishbrowser)\/([\w\.]+)/i                                     // Sailfish Browser
            ], [[NAME, 'Sailfish Browser'], VERSION], [

            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
            ], [[NAME, 'Dolphin'], VERSION], [

            /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
            ], [[NAME, '360 Browser']], [

            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
            ], [[NAME, 'Chrome'], VERSION], [

            /(coast)\/([\w\.]+)/i                                               // Opera Coast
            ], [[NAME, 'Opera Coast'], VERSION], [

            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, 'Firefox']], [

            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [

            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
            ], [VERSION, NAME], [

            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
            ], [[NAME, 'GSA'], VERSION], [

            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
            /(links)\s\(([\w\.]+)/i,                                            // Links
            /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, util.lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32
            ], [[ARCHITECTURE, 'ia32']], [

            // PocketPC mistakenly identified as PowerPC
            /windows\s(ce|mobile);\sppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, util.lowerize]]
        ],

        device : [[

            /\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i                        // iPad/PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [

            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

            /(apple\s{0,1}tv)/i                                                 // Apple TV
            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple'], [TYPE, SMARTTV]], [

            /(archos)\s(gamepad2?)/i,                                           // Archos
            /(hp).+(touchpad)/i,                                                // HP TouchPad
            /(hp).+(tablet)/i,                                                  // HP Tablet
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(kf[A-z]+)\sbuild\/.+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
            /(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i                         // Fire Phone
            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [
            /android.+aft([bms])\sbuild/i                                       // Fire TV
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, SMARTTV]], [

            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
            /(asus)-?(\w+)/i                                                    // Asus
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
                                                                                // Asus Tablets
            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i
            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
            /(sony)?(?:sgp.+)\sbuild\//i
            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
            /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

            /\s(ouya)\s/i,                                                      // Ouya
            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

            /android.+;\s(shield)\sbuild/i                                      // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

            /(playstation\s[34portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

            /(sprint\s(\w+))/i                                                  // Sprint Phones
            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

            /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,                        // HTC
            /(zte)-(\w*)/i,                                                     // ZTE
            /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
                                                                                // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            /(nexus\s9)/i                                                       // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

            /d\/huawei([\w\s-]+)[;\)]/i,
            /(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i                              // Huawei
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

            /android.+(bah2?-a?[lw]\d{2})/i                                     // Huawei MediaPad
            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, TABLET]], [

            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

                                                                                // Motorola
            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
            /mot[\s-]?(\w*)/i,
            /(XT\d{3,4}) build\//i,
            /(nexus\s6)/i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
            /((SM-T\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
            /smart-tv.+(samsung)/i
            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
            /sec-((sgh\w+))/i
            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

            /sie-(\w*)/i                                                        // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
            /(nokia)[\s_-]?([\w-]*)/i
            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

            /android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i                   // Acer
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
            /(lg) netcast\.tv/i                                                 // LG SmartTV
            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
            /(nexus\s[45])/i,                                                   // LG
            /lg[e;\s\/-]+(\w*)/i,
            /android.+lg(\-?[\d\w]+)\s+build/i
            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

            /(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i             // Lenovo tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [
            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [
            /(lenovo)[_\s-]?([\w-]+)/i
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /linux;.+((jolla));/i                                               // Jolla
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google'], [TYPE, SMARTTV]], [

            /android.+;\s(glass)\s\d/i                                          // Google Glass
            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

            /android.+;\s(pixel c)[\s)]/i                                       // Google Pixel C
            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

            /android.+;\s(pixel( [23])?( xl)?)[\s)]/i                              // Google Pixel
            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

            /android.+;\s(\w+)\s+build\/hm\1/i,                                 // Xiaomi Hongmi 'numeric' models
            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
            /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,    
                                                                                // Xiaomi Mi
            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i       // Redmi Phones
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
            /android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i            // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [
            /(mz)-([\w-]{2,})/i
            ], [[VENDOR, 'Meizu'], MODEL, [TYPE, MOBILE]], [

            /android.+a000(1)\s+build/i,                                        // OnePlus
            /android.+oneplus\s(a\d{4})[\s)]/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

            /android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i                      // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

            /android.+;\s(k88)\sbuild/i                                         // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

            /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i        // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i                            // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

            /android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i                    // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

            /android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i                     // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

            /android.+;\s(PH-1)\s/i
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [                // Essential PH-1

            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i          // Le Pan Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

            /android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i                      // Gigaset Tablets
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

            /[\s\/\(](smart-?tv)[;\)]/i                                         // SmartTV
            ], [[TYPE, SMARTTV]], [

            /(android[\w\.\s\-]{0,9});.+build/i                                 // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, 'EdgeHTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,     
                                                                                // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows based
            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

            // Mobile/Embedded OS
            /\((bb)(10);/i                                                      // BlackBerry 10
            ], [[NAME, 'BlackBerry'], VERSION], [
            /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
            /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
            ], [NAME, VERSION], [
            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
            ], [[NAME, 'Symbian'], VERSION], [
            /\((series40);/i                                                    // Series 40
            ], [NAME], [
            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
            ], [[NAME, 'Firefox OS'], VERSION], [

            // Console
            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

            // GNU/Linux based
            /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
            /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
            /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
            /(gnu)\s?([\w\.]*)/i                                                // GNU
            ], [NAME, VERSION], [

            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Solaris
            /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
            ], [[NAME, 'Solaris'], VERSION], [

            // BSD based
            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
            ], [NAME, VERSION],[

            /(haiku)\s(\w+)/i                                                   // Haiku
            ], [NAME, VERSION],[

            /cfnetwork\/.+darwin/i,
            /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

            /(mac\sos\sx)\s?([\w\s\.]*)/i,
            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Other
            /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
            /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
            /(unix)\s?([\w\.]*)/i                                               // UNIX
            ], [NAME, VERSION]
        ]
    };


    /////////////////
    // Constructor
    ////////////////
    var UAParser = function (uastring, extensions) {

        if (typeof uastring === 'object') {
            extensions = uastring;
            uastring = undefined;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(uastring, extensions).getResult();
        }

        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var browser = { name: undefined, version: undefined };
            mapper.rgx.call(browser, ua, rgxmap.browser);
            browser.major = util.major(browser.version); // deprecated
            return browser;
        };
        this.getCPU = function () {
            var cpu = { architecture: undefined };
            mapper.rgx.call(cpu, ua, rgxmap.cpu);
            return cpu;
        };
        this.getDevice = function () {
            var device = { vendor: undefined, model: undefined, type: undefined };
            mapper.rgx.call(device, ua, rgxmap.device);
            return device;
        };
        this.getEngine = function () {
            var engine = { name: undefined, version: undefined };
            mapper.rgx.call(engine, ua, rgxmap.engine);
            return engine;
        };
        this.getOS = function () {
            var os = { name: undefined, version: undefined };
            mapper.rgx.call(os, ua, rgxmap.os);
            return os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return ua;
        };
        this.setUA = function (uastring) {
            ua = uastring;
            return this;
        };
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = {
        NAME    : NAME,
        MAJOR   : MAJOR, // deprecated
        VERSION : VERSION
    };
    UAParser.CPU = {
        ARCHITECTURE : ARCHITECTURE
    };
    UAParser.DEVICE = {
        MODEL   : MODEL,
        VENDOR  : VENDOR,
        TYPE    : TYPE,
        CONSOLE : CONSOLE,
        MOBILE  : MOBILE,
        SMARTTV : SMARTTV,
        TABLET  : TABLET,
        WEARABLE: WEARABLE,
        EMBEDDED: EMBEDDED
    };
    UAParser.ENGINE = {
        NAME    : NAME,
        VERSION : VERSION
    };
    UAParser.OS = {
        NAME    : NAME,
        VERSION : VERSION
    };

    ///////////
    // Export
    //////////


    // check js environment
    if (typeof(exports) !== UNDEF_TYPE) {
        // nodejs env
        if (typeof module !== UNDEF_TYPE && module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                return UAParser;
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = window && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (uastring) {
            parser.setUA(uastring);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : this);


/***/ }),

/***/ "./src/apple.js":
/*!**********************!*\
  !*** ./src/apple.js ***!
  \**********************/
/*! exports provided: Apple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Apple", function() { return Apple; });
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ "./src/cell.js");
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./palette */ "./src/palette.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Apple =
/*#__PURE__*/
function (_Cell) {
  _inherits(Apple, _Cell);

  _createClass(Apple, null, [{
    key: "create",
    value: function create(options) {
      var apple = new Apple(options);
      apple.render();
      return apple;
    }
  }]);

  function Apple(options) {
    var _this;

    _classCallCheck(this, Apple);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Apple).call(this, _objectSpread({}, options, {
      bgColor: _palette__WEBPACK_IMPORTED_MODULE_1__["ACCENT"]
    })));
    _this.intervalId = null;
    return _this;
  }

  _createClass(Apple, [{
    key: "startShineInterval",
    value: function startShineInterval() {
      var _this2 = this;

      window.clearInterval(this.intervalId);
      this.intervalId = setInterval(function () {
        _this2.bgColor = 'yellow';
      }, 100);
    }
  }]);

  return Apple;
}(_cell__WEBPACK_IMPORTED_MODULE_0__["Cell"]);

/***/ }),

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cell =
/*#__PURE__*/
function () {
  _createClass(Cell, null, [{
    key: "createWithColor",
    value: function createWithColor(_ref) {
      var canvas = _ref.canvas,
          col = _ref.col,
          row = _ref.row,
          w = _ref.w,
          h = _ref.h,
          bgColor = _ref.bgColor;
      var cell = new Cell({
        canvas: canvas,
        col: col,
        row: row,
        w: w,
        h: h
      });
      cell.color = bgColor;
      cell.render();
      return cell;
    }
  }, {
    key: "create",
    value: function create(_ref2) {
      var canvas = _ref2.canvas,
          col = _ref2.col,
          row = _ref2.row,
          w = _ref2.w,
          h = _ref2.h;
      var cell = new Cell({
        canvas: canvas,
        col: col,
        row: row,
        w: w,
        h: h
      });
      cell.render();
      return cell;
    }
  }]);

  function Cell(_ref3) {
    var canvas = _ref3.canvas,
        col = _ref3.col,
        row = _ref3.row,
        w = _ref3.w,
        h = _ref3.h,
        _ref3$bgColor = _ref3.bgColor,
        bgColor = _ref3$bgColor === void 0 ? '#FFF' : _ref3$bgColor;

    _classCallCheck(this, Cell);

    this.ctx = canvas.getContext('2d');
    this.w = w;
    this.h = h;
    this.col = col;
    this.row = row;
    this.x = col * this.w;
    this.y = row * this.h;
    this.color = bgColor;
  }
  /**
   * *
   * @param {string} color
   */


  _createClass(Cell, [{
    key: "render",
    value: function render() {
      this.fillStyle = this.bgColor;
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
      this.ctx.strokeStyle = '#FFF';
      this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setDefaultColor();
      this.render();
    }
  }, {
    key: "setDefaultColor",
    value: function setDefaultColor() {
      this.ctx.fillStyle = '#FFF';
    }
  }, {
    key: "color",
    set: function set(color) {
      this.ctx.fillStyle = color;
    },
    get: function get() {
      return this.ctx.fillStyle;
    }
  }]);

  return Cell;
}();

/***/ }),

/***/ "./src/controls/controlsFactory.js":
/*!*****************************************!*\
  !*** ./src/controls/controlsFactory.js ***!
  \*****************************************/
/*! exports provided: ControlsFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlsFactory", function() { return ControlsFactory; });
/* harmony import */ var _platformParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platformParser */ "./src/platformParser.js");
/* harmony import */ var _keyboardControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboardControls */ "./src/controls/keyboardControls.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ControlsFactory =
/*#__PURE__*/
function () {
  _createClass(ControlsFactory, null, [{
    key: "bootstrap",
    value: function bootstrap(onSetDirection) {
      var controls = new ControlsFactory(onSetDirection);
      controls.init();
      return controls;
    }
  }]);

  function ControlsFactory(onSetDirection) {
    _classCallCheck(this, ControlsFactory);

    this.onSetDirection = onSetDirection;
  }

  _createClass(ControlsFactory, [{
    key: "init",
    value: function init() {
      var parser = _platformParser__WEBPACK_IMPORTED_MODULE_0__["PlatformParser"].create();
      var test = parser.isTouchSupports();

      if (test) {// This.controls = new TouchControls(this.onSetDirection)
      } else {
        this.controls = _keyboardControls__WEBPACK_IMPORTED_MODULE_1__["KeyboardControls"].bootstrap(this.onSetDirection);
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.controls.clear();
    }
  }]);

  return ControlsFactory;
}();

/***/ }),

/***/ "./src/controls/keyboardControls.js":
/*!******************************************!*\
  !*** ./src/controls/keyboardControls.js ***!
  \******************************************/
/*! exports provided: KeyboardControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyboardControls", function() { return KeyboardControls; });
/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../snake.js */ "./src/snake.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var KeyboardControls =
/*#__PURE__*/
function () {
  _createClass(KeyboardControls, null, [{
    key: "bootstrap",
    value: function bootstrap(onSetDirection) {
      var controls = new KeyboardControls(onSetDirection);
      controls.init();
      return controls;
    }
  }]);

  function KeyboardControls(onSetDirection) {
    _classCallCheck(this, KeyboardControls);

    this.onSetDirection = onSetDirection;
    this.addEventListeners = this.addEventListeners.bind(this);
  }

  _createClass(KeyboardControls, [{
    key: "addEventListeners",
    value: function addEventListeners(e) {
      switch (e.key) {
        case 's':
          this.onSetDirection(_snake_js__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].BOTTOM);
          break;

        case 'w':
          this.onSetDirection(_snake_js__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].TOP);
          break;

        case 'd':
          this.onSetDirection(_snake_js__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].RIGHT);
          break;

        case 'a':
          this.onSetDirection(_snake_js__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].LEFT);
          break;
      }
    }
  }, {
    key: "init",
    value: function init() {
      document.addEventListener('keydown', this.addEventListeners);
    }
  }, {
    key: "clear",
    value: function clear() {
      document.removeEventListener('keydown', this.addEventListeners);
    }
  }]);

  return KeyboardControls;
}();

/***/ }),

/***/ "./src/game.css":
/*!**********************!*\
  !*** ./src/game.css ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _stage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stage.js */ "./src/stage.js");
/* harmony import */ var _snake_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake.js */ "./src/snake.js");
/* harmony import */ var _controls_controlsFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls/controlsFactory */ "./src/controls/controlsFactory.js");
/* harmony import */ var _game_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.css */ "./src/game.css");
/* harmony import */ var _game_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_game_css__WEBPACK_IMPORTED_MODULE_3__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var Game =
/*#__PURE__*/
function () {
  _createClass(Game, null, [{
    key: "create",

    /**
     * @param {DOMElement} mp mountPoint where to render game
     */
    value: function create(mp) {
      var game = new Game(mp);
      game.init();
      window.game = game;
      return game;
    }
    /**
     * @param {DOMElement} root mountPoint where to render game
     */

  }]);

  function Game(root) {
    _classCallCheck(this, Game);

    this.root = root;
    this.score = 0;
    this.collision = false;
    this.fps = 3;
    this.lastTime = Date.now();
    this.setDirection = this.setDirection.bind(this);
  }

  _createClass(Game, [{
    key: "init",
    value: function init() {
      this.createGameContainer();
      this.createStage();
    }
  }, {
    key: "createGameContainer",
    value: function createGameContainer() {
      this.container = document.createElement('div');
      this.container.classList.add('game-container');
      this.root.append(this.container);
    }
  }, {
    key: "createStage",
    value: function createStage() {
      var _this = this;

      this.stage = _stage_js__WEBPACK_IMPORTED_MODULE_0__["Stage"].create({
        root: this.container,
        onWelcomeScreenClick: function onWelcomeScreenClick() {
          return _this.startGame();
        }
      });
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.reset();
      this.renderSnake();
      this.createControls();
      this.loop();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.collision = false;
      this.score = 0;
      this.stage.setMode(_stage_js__WEBPACK_IMPORTED_MODULE_0__["GAME_MODES"].STARTED);
    }
  }, {
    key: "loop",
    value: function loop() {
      var _this2 = this;

      if (this.collision) {
        this.stopGame();
        return;
      }

      var fpsInterval = 1000 / this.fps;
      var currentTime = Date.now();
      var elapsedTime = currentTime - this.lastTime;
      this.requestedFrame = window.requestAnimationFrame(function () {
        if (elapsedTime > fpsInterval) {
          _this2.update();

          _this2.lastTime = currentTime - elapsedTime % fpsInterval;
        }

        _this2.loop();
      });
    }
  }, {
    key: "update",
    value: function update() {
      this.checkApple();
      this.renderStage();
      this.move();
      this.checkCollisions();
    }
  }, {
    key: "renderStage",
    value: function renderStage() {
      this.stage.score = this.score;
      this.stage.render();
    }
  }, {
    key: "move",
    value: function move() {
      this.snake.move();
      this.snake.render();
    }
  }, {
    key: "stopGame",
    value: function stopGame() {
      window.cancelAnimationFrame(this.requestedFrame);
      this.stage.setMode(_stage_js__WEBPACK_IMPORTED_MODULE_0__["GAME_MODES"].OVER);
    }
  }, {
    key: "renderSnake",
    value: function renderSnake() {
      var _this$stage = this.stage,
          canvas = _this$stage.canvas,
          cellSize = _this$stage.cellSize;
      this.snake = _snake_js__WEBPACK_IMPORTED_MODULE_1__["Snake"].create({
        canvas: canvas,
        cellSize: cellSize
      });
    }
  }, {
    key: "checkApple",
    value: function checkApple() {
      var _this$snake$head = this.snake.head,
          col = _this$snake$head.col,
          row = _this$snake$head.row;

      if (this.stage.isEat({
        col: col,
        row: row
      })) {
        this.snake.grow();
        this.score += 1;
        this.stage.updateApple();
      }
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var _this$snake$head2 = this.snake.head,
          col = _this$snake$head2.col,
          row = _this$snake$head2.row;
      this.collision = this.checkStageCollision(col, row) || this.snake.checkSelfCollision();
    }
  }, {
    key: "checkStageCollision",
    value: function checkStageCollision(col, row) {
      return col >= this.stage.widthInCells || row >= this.stage.heightInCells || col < 0 || row < 0;
    }
  }, {
    key: "setDirection",
    value: function setDirection(dir) {
      this.snake.setDirection(dir);
    }
  }, {
    key: "createControls",
    value: function createControls() {
      this.constrols = _controls_controlsFactory__WEBPACK_IMPORTED_MODULE_2__["ControlsFactory"].bootstrap(this.setDirection);
    }
  }]);

  return Game;
}();

/***/ }),

/***/ "./src/gameField.js":
/*!**************************!*\
  !*** ./src/gameField.js ***!
  \**************************/
/*! exports provided: GameField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameField", function() { return GameField; });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./src/cell.js");
/* harmony import */ var _apple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apple */ "./src/apple.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * @typedef Params
 * @param {DOMElement} mp
 * @param {Number} width
 * @param {Number} height
 */

var GameField =
/*#__PURE__*/
function () {
  _createClass(GameField, null, [{
    key: "create",

    /**
     * @param {DOMElement} mp
     * @param {Number} width
     * @param {Number} height
     */
    value: function create(options) {
      var stage = new GameField(_objectSpread({}, options));
      stage.render();
      return stage;
    }
    /**
     * @param {DOMElement} mp
     * @param {Number} width
     * @param {Number} height
     */

  }]);

  function GameField(_ref) {
    var canvas = _ref.canvas,
        width = _ref.width,
        height = _ref.height,
        cellSize = _ref.cellSize;

    _classCallCheck(this, GameField);

    this.cellSize = cellSize;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.heightInCells = Math.floor(this.height / this.cellSize);
    this.widthInCells = Math.floor(this.width / this.cellSize);
  }

  _createClass(GameField, [{
    key: "checkApple",
    value: function checkApple(_ref2) {
      var col = _ref2.col,
          row = _ref2.row;
      return this.apple.col === col && this.apple.row === row;
    }
    /**
     *
     * @param {Object} coords
     * @param {number} coords.col
     * @param {number} coords.row
     */

  }, {
    key: "renderApple",
    value: function renderApple(_ref3) {
      var col = _ref3.col,
          row = _ref3.row;
      this.apple = _apple__WEBPACK_IMPORTED_MODULE_1__["Apple"].create({
        canvas: this.canvas,
        col: col,
        row: row,
        w: this.cellSize,
        h: this.cellSize
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.drawField();
    }
  }, {
    key: "drawField",
    value: function drawField() {
      for (var row = 0; row < this.heightInCells; row += 1) {
        for (var col = 0; col < this.widthInCells; col += 1) {
          _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].create({
            canvas: this.canvas,
            col: col,
            row: row,
            w: this.cellSize,
            h: this.cellSize
          });
        }
      }
    }
  }]);

  return GameField;
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");

var body = document.querySelector('body');
_game_js__WEBPACK_IMPORTED_MODULE_0__["Game"].create(body);

/***/ }),

/***/ "./src/notificationScreen.js":
/*!***********************************!*\
  !*** ./src/notificationScreen.js ***!
  \***********************************/
/*! exports provided: NotificationScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationScreen", function() { return NotificationScreen; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/text.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var NotificationScreen =
/*#__PURE__*/
function () {
  _createClass(NotificationScreen, null, [{
    key: "create",
    value: function create(options) {
      var screen = new NotificationScreen(options);
      screen.addEventListeners();
      screen.render();
      return screen;
    }
  }]);

  function NotificationScreen(_ref) {
    var canvas = _ref.canvas,
        w = _ref.w,
        h = _ref.h,
        textContent = _ref.textContent,
        textColor = _ref.textColor,
        onClick = _ref.onClick;

    _classCallCheck(this, NotificationScreen);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = 0;
    this.y = 0;
    this.w = w;
    this.h = h;
    this.textContent = textContent;
    this.textColor = textColor;
    this.onClick = onClick;
    this.clickHandler = this.clickHandler.bind(this);
  }

  _createClass(NotificationScreen, [{
    key: "render",
    value: function render() {
      this.drawBackground();
      this.renderText();
    }
  }, {
    key: "renderText",
    value: function renderText() {
      this.text = _text__WEBPACK_IMPORTED_MODULE_0__["Text"].create({
        canvas: this.canvas,
        x: this.w / 2,
        y: this.h / 2,
        textContent: this.textContent,
        textAlign: 'center',
        textColor: this.textColor
      });
    }
  }, {
    key: "drawBackground",
    value: function drawBackground() {
      this.ctx.fillStyle = 'rgba(0,0,0, .2)';
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler() {
      this.onClick();
      this.canvas.removeEventListener('click', this.clickHandler);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      this.canvas.addEventListener('click', this.clickHandler);
    }
  }]);

  return NotificationScreen;
}();

/***/ }),

/***/ "./src/palette.js":
/*!************************!*\
  !*** ./src/palette.js ***!
  \************************/
/*! exports provided: ERROR, ACCENT, MAIN, SECONDARY, THIRDARY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR", function() { return ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACCENT", function() { return ACCENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAIN", function() { return MAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SECONDARY", function() { return SECONDARY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THIRDARY", function() { return THIRDARY; });
/* RGB */
var ERROR = 'rgba(226, 21, 0, 1);';
var ACCENT = 'rgba(68, 3, 129, 1)';
var MAIN = 'rgba(9, 255, 0, 0.644)';
var SECONDARY = 'rgba(48, 216, 245, 0.753)';
var THIRDARY = 'rgba(48, 216, 245, 0.432)';

/***/ }),

/***/ "./src/platformParser.js":
/*!*******************************!*\
  !*** ./src/platformParser.js ***!
  \*******************************/
/*! exports provided: PlatformParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformParser", function() { return PlatformParser; });
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ua-parser-js */ "./node_modules/ua-parser-js/src/ua-parser.js");
/* harmony import */ var ua_parser_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ua_parser_js__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var OS = {
  IOS: 'iOS',
  ANDROID: 'Android',
  MAC_OS: 'Mac OS'
};
var PlatformParser =
/*#__PURE__*/
function () {
  _createClass(PlatformParser, null, [{
    key: "create",
    value: function create() {
      return new PlatformParser();
    }
  }]);

  function PlatformParser() {
    _classCallCheck(this, PlatformParser);

    this.uaParser = new ua_parser_js__WEBPACK_IMPORTED_MODULE_0__["UAParser"]();
    this.result = this.uaParser.getResult();
  }

  _createClass(PlatformParser, [{
    key: "getOs",
    value: function getOs() {
      console.log(this.result.os);
      return this.result.os.name;
    }
  }, {
    key: "isTouchSupports",
    value: function isTouchSupports() {
      return this.getOs() === OS.IOS || this.getOs() === OS.ANDROID;
    }
  }]);

  return PlatformParser;
}();

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! exports provided: Score */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Score", function() { return Score; });
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text */ "./src/text.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Score =
/*#__PURE__*/
function (_Text) {
  _inherits(Score, _Text);

  _createClass(Score, null, [{
    key: "create",

    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */
    value: function create(options) {
      var score = new Score(options);
      score.render();
      return score;
    }
    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */

  }]);

  function Score(options) {
    var _this;

    _classCallCheck(this, Score);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Score).call(this, options));
    _this.textContent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeScore"])(options.score);
    _this.textColor = 'magenta';
    _this.x = 10;
    return _this;
  }

  _createClass(Score, [{
    key: "setScore",
    value: function setScore(score) {
      this.textContent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["normalizeScore"])(score);
    }
  }]);

  return Score;
}(_text__WEBPACK_IMPORTED_MODULE_0__["Text"]);

/***/ }),

/***/ "./src/screen.js":
/*!***********************!*\
  !*** ./src/screen.js ***!
  \***********************/
/*! exports provided: Screen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Screen", function() { return Screen; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Screen =
/*#__PURE__*/
function () {
  function Screen() {
    _classCallCheck(this, Screen);
  }

  _createClass(Screen, null, [{
    key: "getViewportSize",
    value: function getViewportSize() {
      var MAX_WIDTH = 1280;
      var MAX_HEIGHT = 1280;
      return {
        width: Math.min(window.innerWidth, MAX_WIDTH),
        height: Math.min(window.innerHeight, MAX_HEIGHT)
      };
    }
  }]);

  return Screen;
}();

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! exports provided: DIRECTIONS, Snake */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTIONS", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snake", function() { return Snake; });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./src/cell.js");
/* harmony import */ var _palette_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./palette.js */ "./src/palette.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Directions enum
 * @readonly
 * @enum {number}
 */

var DIRECTIONS = {
  RIGHT: 0,
  LEFT: 1,
  TOP: 2,
  BOTTOM: 3
};
var Snake =
/*#__PURE__*/
function () {
  _createClass(Snake, null, [{
    key: "create",
    value: function create(_ref) {
      var canvas = _ref.canvas,
          cellSize = _ref.cellSize,
          onMove = _ref.onMove,
          dir = _ref.dir;
      var snake = new Snake({
        canvas: canvas,
        cellSize: cellSize,
        onMove: onMove,
        dir: dir
      });
      snake.init();
      snake.render();
      return snake;
    }
  }]);

  function Snake(_ref2) {
    var canvas = _ref2.canvas,
        cellSize = _ref2.cellSize,
        onMove = _ref2.onMove,
        onSelfCollision = _ref2.onSelfCollision,
        _ref2$direction = _ref2.direction,
        direction = _ref2$direction === void 0 ? DIRECTIONS.RIGHT : _ref2$direction;

    _classCallCheck(this, Snake);

    this._canvas = canvas;
    this._cellSize = cellSize;
    this._direction = direction;
    this.onMove = onMove;
    this.onSelfCollision = onSelfCollision;
  }

  _createClass(Snake, [{
    key: "init",
    value: function init() {
      this._segments = [this.createSegment(7, 5, 'red'), this.createSegment(6, 5), this.createSegment(5, 5)];
    }
  }, {
    key: "checkSelfCollision",
    value: function checkSelfCollision() {
      var hasCollision = false;

      var _this$_segments = _slicedToArray(this._segments, 1),
          head = _this$_segments[0];

      for (var i = 1; i < this._segments.length; i += 1) {
        if (head.col === this._segments[i].col && head.row === this._segments[i].row) {
          hasCollision = true;
          break;
        }
      }

      return hasCollision;
    }
    /**
     * @param {DIRECTIONS} dir
     */

  }, {
    key: "setDirection",
    value: function setDirection(dir) {
      if (this.isDirectionValid(dir)) {
        this._direction = dir;
      }
    }
  }, {
    key: "grow",
    value: function grow() {
      var _this$getNewHeadCoord = this.getNewHeadCoordinates(),
          col = _this$getNewHeadCoord.col,
          row = _this$getNewHeadCoord.row;

      this._segments.push(this.createSegment(col, row));
    }
    /**
     * @return {Cell}
     */

  }, {
    key: "render",
    value: function render() {
      this._segments.forEach(function (segment) {
        segment.render();
      });
    }
  }, {
    key: "createSegment",
    value: function createSegment(col, row) {
      var segment = _cell_js__WEBPACK_IMPORTED_MODULE_0__["Cell"].createWithColor({
        canvas: this._canvas,
        col: col,
        row: row,
        w: this._cellSize,
        h: this._cellSize,
        bgColor: _palette_js__WEBPACK_IMPORTED_MODULE_1__["MAIN"]
      });
      return segment;
    }
  }, {
    key: "move",
    value: function move() {
      var _this$getNewHeadCoord2 = this.getNewHeadCoordinates(),
          col = _this$getNewHeadCoord2.col,
          row = _this$getNewHeadCoord2.row;

      this._segments.unshift(this.createSegment(col, row));

      this._segments.pop();
    }
  }, {
    key: "getNewHeadCoordinates",
    value: function getNewHeadCoordinates() {
      var _this$head = this.head,
          col = _this$head.col,
          row = _this$head.row;

      switch (this._direction) {
        case DIRECTIONS.TOP:
          row -= 1;
          break;

        case DIRECTIONS.LEFT:
          col -= 1;
          break;

        case DIRECTIONS.BOTTOM:
          row += 1;
          break;

        default:
          col += 1;
      }

      return {
        col: col,
        row: row
      };
    }
    /**
     * @param {number} newDir
     * @return {boolean}
     */

  }, {
    key: "isDirectionValid",
    value: function isDirectionValid(newDir) {
      if ((this._direction === DIRECTIONS.RIGHT || this._direction === DIRECTIONS.LEFT) && (newDir === DIRECTIONS.LEFT || newDir === DIRECTIONS.RIGHT)) {
        return false;
      }

      if ((this._direction === DIRECTIONS.TOP || this._direction === DIRECTIONS.BOTTOM) && (newDir === DIRECTIONS.TOP || newDir === DIRECTIONS.BOTTOM)) {
        return false;
      }

      return true;
    }
  }, {
    key: "head",
    get: function get() {
      return this._segments[0];
    }
  }]);

  return Snake;
}();

/***/ }),

/***/ "./src/stage.js":
/*!**********************!*\
  !*** ./src/stage.js ***!
  \**********************/
/*! exports provided: GAME_MODES, Stage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GAME_MODES", function() { return GAME_MODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return Stage; });
/* harmony import */ var _gameField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameField */ "./src/gameField.js");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./score */ "./src/score.js");
/* harmony import */ var _notificationScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notificationScreen */ "./src/notificationScreen.js");
/* harmony import */ var _screen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screen */ "./src/screen.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






/**
 * @typedef Params
 * @param {DOMElement} root
 * @param {Number} width
 * @param {Number} height
 */

var GAME_MODES = {
  PENDING: 0,
  STARTED: 1,
  OVER: 2
};
var Stage =
/*#__PURE__*/
function () {
  _createClass(Stage, null, [{
    key: "create",

    /**
     * @param {DOMElement} root
     */
    value: function create(options) {
      var _Screen$getViewportSi = _screen__WEBPACK_IMPORTED_MODULE_3__["Screen"].getViewportSize(),
          width = _Screen$getViewportSi.width,
          height = _Screen$getViewportSi.height;

      console.log(width, height);
      var sizes = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["sizeGenerator"])({
        width: width,
        height: height
      });
      var stage = new Stage(_objectSpread({}, options, {}, sizes));
      stage.init();
      return stage;
    }
    /**
     * @param {object} o
     * @param {DOMElement} o.root
     * @param {Number} o.width
     * @param {Number} o.height
     * @param {function} o.onWelcomeScreenClick
     */

  }]);

  function Stage(_ref) {
    var root = _ref.root,
        onWelcomeScreenClick = _ref.onWelcomeScreenClick,
        width = _ref.width,
        height = _ref.height,
        cellSize = _ref.cellSize;

    _classCallCheck(this, Stage);

    this.root = root;
    this.mode = GAME_MODES.PENDING;
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.onWelcomeScreenClick = onWelcomeScreenClick;
  }

  _createClass(Stage, [{
    key: "setMode",
    value: function setMode(gameMode) {
      this.mode = gameMode;
      this.render();
    }
  }, {
    key: "getRandomCell",
    value: function getRandomCell() {
      var col = Math.ceil(Math.random() * this.widthInCells - 1);
      var row = Math.ceil(Math.random() * this.heightInCells - 1);
      return {
        col: col,
        row: row
      };
    }
  }, {
    key: "isEat",
    value: function isEat(_ref2) {
      var col = _ref2.col,
          row = _ref2.row;
      return this.field.checkApple({
        col: col,
        row: row
      });
    }
  }, {
    key: "updateApple",
    value: function updateApple() {
      this.appleCoords = this.getRandomCell();
    }
    /**
     *
     * @param {Object} coords
     * @param {number} coords.col
     * @param {number} coords.row
     */

  }, {
    key: "renderApple",
    value: function renderApple() {
      if (!this.appleCoords) {
        this.updateApple();
      }

      this.field.renderApple(this.appleCoords);
    }
    /**
     * @returns {DOMElement}
     */

  }, {
    key: "init",
    value: function init() {
      this.createCanvas();
      this.render();
    }
  }, {
    key: "renderWelcomeScreen",
    value: function renderWelcomeScreen() {
      this.notificationScreen = _notificationScreen__WEBPACK_IMPORTED_MODULE_2__["NotificationScreen"].create({
        canvas: this.canvas,
        w: this.width,
        h: this.height,
        textContent: 'START GAME',
        onClick: this.onWelcomeScreenClick
      });
    }
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.root.appendChild(this.canvas);
    }
  }, {
    key: "render",
    value: function render() {
      switch (this.mode) {
        case GAME_MODES.STARTED:
          this.drawField();
          this.renderApple();
          this.drawScore();
          break;

        case GAME_MODES.PENDING:
          this.renderWelcomeScreen();
          break;

        case GAME_MODES.OVER:
          this.renderGameOverScreen();
          break;
      }
    }
  }, {
    key: "drawScore",
    value: function drawScore() {
      this.score = _score__WEBPACK_IMPORTED_MODULE_1__["Score"].create({
        canvas: this.canvas,
        score: this.score
      });
    }
  }, {
    key: "renderGameOverScreen",
    value: function renderGameOverScreen() {
      this.notificationScreen = _notificationScreen__WEBPACK_IMPORTED_MODULE_2__["NotificationScreen"].create({
        canvas: this.canvas,
        textContent: 'GAME OVER',
        w: this.width,
        h: this.height,
        textColor: 'magenta',
        onClick: this.onWelcomeScreenClick
      });
    }
  }, {
    key: "drawField",
    value: function drawField() {
      this.field = _gameField__WEBPACK_IMPORTED_MODULE_0__["GameField"].create({
        canvas: this.canvas,
        width: this.width,
        height: this.height,
        cellSize: this.cellSize
      });
    }
  }, {
    key: "heightInCells",
    get: function get() {
      return this.field.heightInCells;
    }
  }, {
    key: "widthInCells",
    get: function get() {
      return this.field.widthInCells;
    }
  }]);

  return Stage;
}();

/***/ }),

/***/ "./src/text.js":
/*!*********************!*\
  !*** ./src/text.js ***!
  \*********************/
/*! exports provided: Text */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return Text; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Text =
/*#__PURE__*/
function () {
  _createClass(Text, null, [{
    key: "create",

    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */
    value: function create(options) {
      var score = new Text(options);
      score.render();
      return score;
    }
    /**
     * @param {object} options
     * @param {HTMLCanvasElement} options.root
     */

  }]);

  function Text(_ref) {
    var canvas = _ref.canvas,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        w = _ref.w,
        _ref$h = _ref.h,
        h = _ref$h === void 0 ? 22 : _ref$h,
        textContent = _ref.textContent,
        _ref$textColor = _ref.textColor,
        textColor = _ref$textColor === void 0 ? 'red' : _ref$textColor,
        _ref$textAlign = _ref.textAlign,
        textAlign = _ref$textAlign === void 0 ? 'left' : _ref$textAlign;

    _classCallCheck(this, Text);

    this.ctx = canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.textColor = textColor;
    this.textContent = textContent;
    this.textAlign = textAlign;
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      this.ctx.fillStyle = this.textColor;
      this.ctx.font = "".concat(this.h, "px Helvetica");
      this.ctx.textAlign = this.textAlign;
      this.ctx.fillText(this.textContent, this.x, this.y + this.h);
    }
  }, {
    key: "setText",
    value: function setText(textContent) {
      this.textContent = textContent;
    }
  }, {
    key: "setAlign",
    value: function setAlign(align) {
      this.textAlign = align;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.textColor = color;
    }
  }]);

  return Text;
}();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getCellColor, normalizeScore, sizeGenerator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCellColor", function() { return getCellColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeScore", function() { return normalizeScore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeGenerator", function() { return sizeGenerator; });
var getCellColor = function getCellColor(col) {
  var color = 'white';

  if (col % 2 === 0) {
    color = 'white';
  }

  return color;
};
var normalizeScore = function normalizeScore(score) {
  if (score < 10) {
    return "00".concat(score);
  }

  if (score < 100) {
    return "0".concat(score);
  }

  return "".concat(score);
};
var sizeGenerator = function sizeGenerator(_ref) {
  var width = _ref.width,
      height = _ref.height;
  var CELL_COUNT = 16;
  var cellSize = Math.floor(width / CELL_COUNT);
  var adjustedWidth = cellSize * CELL_COUNT;
  var adjustedHeight = Math.floor(height / cellSize) * cellSize;
  return {
    cellSize: cellSize,
    height: adjustedHeight,
    width: adjustedWidth
  };
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map