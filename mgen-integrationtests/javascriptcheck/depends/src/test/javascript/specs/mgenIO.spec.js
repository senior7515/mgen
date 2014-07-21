/** JSLINT CONFIG */
/*global mgen_classreg: false, mGenGenerate: false, it: false, describe: false, expect: false, xit: false, throws: false */

requirejs(['mGen', 'se_culvertsoft'], function(mGen, se_culvertsoft) {
	"use strict";

	function javaToJavaScript(str) {
		var len = str.length();
		var tmp = "";
		for (var i = 0; i < len; i++) {
			tmp += String.fromCharCode(str.charAt(i));
		}
		return tmp;
	}

	function splitToStringPerObject(str) {
		var ret = [];
		var start = 0;
		var lvl = 0;
		var len = str.length;
		for (var i = 0; i < len; i++) {
			if (str[i] == "{") {
				lvl++;
			} else if (str[i] == "}") {
				lvl--;
			}
			if (lvl === 0) {
				ret.push(str.substring(start, i + 1))
				start = i + 1;
			}
		}
		if (start !== i) {
			ret.push(str.substring(start))
		}
		return ret;
	}

	// /* ***********************************************************\
	// |*         SETUP -- MAKE SURE ALL FILES ARE IN PLACE           *|
	//  \*************************************************************/

	if (!se_culvertsoft) {
		throw "se_culvertsoft missing";
	}

	if (!mGen.generate) {
		throw "mgen generate missing";
	}

	var registry = mGen.generate(se_culvertsoft, {never_catch_error: true});

	var data = {
		"__t": "cX8",
		"a": true,
		"b": 13,
		"c": 14,
		"d": 15539,
		"e": 4,
		"f": 5,
		"g": 6,
		"h": 0,
		"i": 0,
		"j": 0,
		"k": 0,
		"l": "UNKNOWN",
		"m": "j",
		"n": [
			[
				10,
				11,
				12,
				13,
				14,
				15,
				16,
				17,
				18,
				19,
				20,
				21,
				22,
				23,
				24,
				25
			],
			[
				26,
				27,
				28,
				29,
				30,
				31,
				32,
				33,
				34,
				35,
				36,
				37,
				38,
				39,
				40,
				41
			],
			[
				42,
				43,
				44,
				45,
				46,
				47,
				48,
				49,
				50,
				51,
				52,
				53,
				54,
				55,
				56,
				57
			],
			[
				58,
				59,
				60,
				61,
				62,
				63,
				64,
				65,
				66,
				67,
				68,
				69,
				70,
				71,
				72,
				73
			],
			[
				74,
				75,
				76,
				77,
				78,
				79,
				80,
				81,
				82,
				83,
				84,
				85,
				86,
				87,
				88,
				89
			],
			[
				90,
				91,
				92,
				93,
				94,
				95,
				96,
				97,
				98,
				99,
				100,
				101,
				102,
				103,
				104,
				105
			],
			[
				106,
				107,
				108,
				109,
				110,
				111,
				112,
				113,
				114,
				115,
				116,
				117,
				118,
				119,
				120,
				121
			],
			[
				122,
				123,
				124,
				125,
				126,
				127,
				128,
				129,
				130,
				131,
				132,
				133,
				134,
				135,
				136,
				137
			],
			[
				138,
				139,
				140,
				141,
				142,
				143,
				144,
				145,
				146,
				147,
				148,
				149,
				150,
				151,
				152,
				153
			],
			[
				154,
				155,
				156,
				157,
				158,
				159,
				160,
				161,
				162,
				163,
				164,
				165,
				166,
				167,
				168,
				169
			],
			[
				170,
				171,
				172,
				173,
				174,
				175,
				176,
				177,
				178,
				179,
				180,
				181,
				182,
				183,
				184,
				185
			],
			[
				186,
				187,
				188,
				189,
				190,
				191,
				192,
				193,
				194,
				195,
				196,
				197,
				198,
				199,
				200,
				201
			],
			[
				202,
				203,
				204,
				205,
				206,
				207,
				208,
				209,
				210,
				211,
				212,
				213,
				214,
				215,
				216,
				217
			],
			[
				218,
				219,
				220,
				221,
				222,
				223,
				224,
				225,
				226,
				227,
				228,
				229,
				230,
				231,
				232,
				233
			],
			[
				234,
				235,
				236,
				237,
				238,
				239,
				240,
				241,
				242,
				243,
				244,
				245,
				246,
				247,
				248,
				249
			],
			[
				250,
				251,
				252,
				253,
				254,
				255,
				256,
				257,
				258,
				259,
				260,
				261,
				262,
				263,
				264,
				265
			]
		],
		"o": [{
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}],
		"p": [{
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}],
		"q": [
			[
				394,
				395,
				396,
				397,
				398,
				399,
				400,
				401,
				402,
				403,
				404,
				405,
				406,
				407,
				408,
				409
			],
			[
				410,
				411,
				412,
				413,
				414,
				415,
				416,
				417,
				418,
				419,
				420,
				421,
				422,
				423,
				424,
				425
			],
			[
				426,
				427,
				428,
				429,
				430,
				431,
				432,
				433,
				434,
				435,
				436,
				437,
				438,
				439,
				440,
				441
			],
			[
				442,
				443,
				444,
				445,
				446,
				447,
				448,
				449,
				450,
				451,
				452,
				453,
				454,
				455,
				456,
				457
			],
			[
				458,
				459,
				460,
				461,
				462,
				463,
				464,
				465,
				466,
				467,
				468,
				469,
				470,
				471,
				472,
				473
			],
			[
				474,
				475,
				476,
				477,
				478,
				479,
				480,
				481,
				482,
				483,
				484,
				485,
				486,
				487,
				488,
				489
			],
			[
				490,
				491,
				492,
				493,
				494,
				495,
				496,
				497,
				498,
				499,
				500,
				501,
				502,
				503,
				504,
				505
			],
			[
				506,
				507,
				508,
				509,
				510,
				511,
				512,
				513,
				514,
				515,
				516,
				517,
				518,
				519,
				520,
				521
			],
			[
				522,
				523,
				524,
				525,
				526,
				527,
				528,
				529,
				530,
				531,
				532,
				533,
				534,
				535,
				536,
				537
			],
			[
				538,
				539,
				540,
				541,
				542,
				543,
				544,
				545,
				546,
				547,
				548,
				549,
				550,
				551,
				552,
				553
			],
			[
				554,
				555,
				556,
				557,
				558,
				559,
				560,
				561,
				562,
				563,
				564,
				565,
				566,
				567,
				568,
				569
			],
			[
				570,
				571,
				572,
				573,
				574,
				575,
				576,
				577,
				578,
				579,
				580,
				581,
				582,
				583,
				584,
				585
			],
			[
				586,
				587,
				588,
				589,
				590,
				591,
				592,
				593,
				594,
				595,
				596,
				597,
				598,
				599,
				600,
				601
			],
			[
				602,
				603,
				604,
				605,
				606,
				607,
				608,
				609,
				610,
				611,
				612,
				613,
				614,
				615,
				616,
				617
			],
			[
				618,
				619,
				620,
				621,
				622,
				623,
				624,
				625,
				626,
				627,
				628,
				629,
				630,
				631,
				632,
				633
			],
			[
				634,
				635,
				636,
				637,
				638,
				639,
				640,
				641,
				642,
				643,
				644,
				645,
				646,
				647,
				648,
				649
			]
		],
		"r": [{
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}],
		"s": [{
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}, {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		}],
		"t": {
			"efg": [
				782,
				783,
				784,
				785,
				786,
				787,
				788,
				789,
				790,
				791,
				792,
				793,
				794,
				795,
				796,
				797
			],
			"klmnopq": [
				1142,
				1143,
				1144,
				1145,
				1146,
				1147,
				1148,
				1149,
				1150,
				1151,
				1152,
				1153,
				1154,
				1155,
				1156,
				1157
			],
			"lmnopqr": [
				1118,
				1119,
				1120,
				1121,
				1122,
				1123,
				1124,
				1125,
				1126,
				1127,
				1128,
				1129,
				1130,
				1131,
				1132,
				1133
			],
			"mnopqrs": [
				1094,
				1095,
				1096,
				1097,
				1098,
				1099,
				1100,
				1101,
				1102,
				1103,
				1104,
				1105,
				1106,
				1107,
				1108,
				1109
			],
			"nopqrst": [
				1070,
				1071,
				1072,
				1073,
				1074,
				1075,
				1076,
				1077,
				1078,
				1079,
				1080,
				1081,
				1082,
				1083,
				1084,
				1085
			],
			"opqrstu": [
				1046,
				1047,
				1048,
				1049,
				1050,
				1051,
				1052,
				1053,
				1054,
				1055,
				1056,
				1057,
				1058,
				1059,
				1060,
				1061
			],
			"pqrstuv": [
				1022,
				1023,
				1024,
				1025,
				1026,
				1027,
				1028,
				1029,
				1030,
				1031,
				1032,
				1033,
				1034,
				1035,
				1036,
				1037
			],
			"qrstuvw": [
				998,
				999,
				1000,
				1001,
				1002,
				1003,
				1004,
				1005,
				1006,
				1007,
				1008,
				1009,
				1010,
				1011,
				1012,
				1013
			],
			"rstuvwx": [
				974,
				975,
				976,
				977,
				978,
				979,
				980,
				981,
				982,
				983,
				984,
				985,
				986,
				987,
				988,
				989
			],
			"stuvwxy": [
				950,
				951,
				952,
				953,
				954,
				955,
				956,
				957,
				958,
				959,
				960,
				961,
				962,
				963,
				964,
				965
			],
			"tuvwxya": [
				926,
				927,
				928,
				929,
				930,
				931,
				932,
				933,
				934,
				935,
				936,
				937,
				938,
				939,
				940,
				941
			],
			"uvwxyab": [
				902,
				903,
				904,
				905,
				906,
				907,
				908,
				909,
				910,
				911,
				912,
				913,
				914,
				915,
				916,
				917
			],
			"vwxyabc": [
				878,
				879,
				880,
				881,
				882,
				883,
				884,
				885,
				886,
				887,
				888,
				889,
				890,
				891,
				892,
				893
			],
			"wxyabcd": [
				854,
				855,
				856,
				857,
				858,
				859,
				860,
				861,
				862,
				863,
				864,
				865,
				866,
				867,
				868,
				869
			],
			"xyabcde": [
				830,
				831,
				832,
				833,
				834,
				835,
				836,
				837,
				838,
				839,
				840,
				841,
				842,
				843,
				844,
				845
			],
			"yabcdef": [
				806,
				807,
				808,
				809,
				810,
				811,
				812,
				813,
				814,
				815,
				816,
				817,
				818,
				819,
				820,
				821
			]
		},
		"u": {
			"1158": {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "a",
				"e3": "b",
				"e4": "high"
			},
			"1163": {
				"__t": "uOM",
				"e": "low",
				"e2": "b",
				"e3": "c",
				"e4": "UNKNOWN"
			},
			"1168": {
				"__t": "uOM",
				"e": "medium",
				"e2": "c",
				"e3": "UNKNOWN",
				"e4": "low"
			},
			"1173": {
				"__t": "uOM",
				"e": "high",
				"e2": "UNKNOWN",
				"e3": "a",
				"e4": "medium"
			},
			"1178": {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "a",
				"e3": "b",
				"e4": "high"
			},
			"1183": {
				"__t": "uOM",
				"e": "low",
				"e2": "b",
				"e3": "c",
				"e4": "UNKNOWN"
			},
			"1188": {
				"__t": "uOM",
				"e": "medium",
				"e2": "c",
				"e3": "UNKNOWN",
				"e4": "low"
			},
			"1193": {
				"__t": "uOM",
				"e": "high",
				"e2": "UNKNOWN",
				"e3": "a",
				"e4": "medium"
			},
			"1198": {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "a",
				"e3": "b",
				"e4": "high"
			},
			"1203": {
				"__t": "uOM",
				"e": "low",
				"e2": "b",
				"e3": "c",
				"e4": "UNKNOWN"
			},
			"1208": {
				"__t": "uOM",
				"e": "medium",
				"e2": "c",
				"e3": "UNKNOWN",
				"e4": "low"
			},
			"1213": {
				"__t": "uOM",
				"e": "high",
				"e2": "UNKNOWN",
				"e3": "a",
				"e4": "medium"
			},
			"1218": {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "a",
				"e3": "b",
				"e4": "high"
			},
			"1223": {
				"__t": "uOM",
				"e": "low",
				"e2": "b",
				"e3": "c",
				"e4": "UNKNOWN"
			},
			"1228": {
				"__t": "uOM",
				"e": "medium",
				"e2": "c",
				"e3": "UNKNOWN",
				"e4": "low"
			},
			"1233": {
				"__t": "uOM",
				"e": "high",
				"e2": "UNKNOWN",
				"e3": "a",
				"e4": "medium"
			}
		},
		"v": {
			"0": [{
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}, {
				"__t": "uOM",
				"e": "UNKNOWN",
				"e2": "UNKNOWN",
				"e3": "UNKNOWN",
				"e4": "UNKNOWN"
			}]
		},
		"w": {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		},
		"x": {
			"__t": "uOM",
			"e": "high",
			"e2": "UNKNOWN",
			"e3": "a",
			"e4": "medium"
		},
		"y": {
			"__t": "41M",
			"e": "high"
		},
		"z": {
			"__t": "41M",
			"e": "UNKNOWN"
		}
	}
	var j = mGen.jsonHandler(registry);
	var o = j.jsonToObject(data);

	// /* ***********************************************************\
	// |*         TEST EMPTY OBJECTS                                *|
	// \*************************************************************/
	// describe("Empty Objects", function() {
	// 	var filepath = "../../generated/depends/data_generated/emptyObjects_json.data";
	// 	var jPath = java.nio.file.Paths.get(filepath);
	// 	var fileBytes = java.nio.file.Files.readAllBytes(jPath)
	// 	var testdata = javaToJavaScript(new java.lang.String(fileBytes));
	// 	var arrStringObjects = splitToStringPerObject(testdata);

	// 	it("", function() {
	// 		j = mGen.jsonHandler(registry);
	// 		for(var i=0; i < arrStringObjects.length; i++){
	// 			var o = j.stringToObject(arrStringObjects[i]);
	// 			var res = j.objectToString(o);
	// 			expect( res ).toBe( arrStringObjects[i] );
	// 		}
	// 	});
	// });


	//  ***********************************************************\
	// |*         TEST RANDOM OBJECTS                                *|
	// \************************************************************
	// describe("Random Objects", function() {
	// 	var filepath = "../../generated/depends/data_generated/randomizedObjects_json.data";
	// 	var jPath = java.nio.file.Paths.get(filepath);
	// 	var fileBytes = java.nio.file.Files.readAllBytes(jPath)
	// 	var testdata = javaToJavaScript(new java.lang.String(fileBytes));
	// 	var arrStringObjects = splitToStringPerObject(testdata);

	// 	it("", function() {
	// 		j = mGen.jsonHandler(registry);
	// 		for(var i=0; i < arrStringObjects.length; i++){
	// 			console.log(arrStringObjects[i]);
	// 			var o = j.stringToObject(arrStringObjects[i]);
	// 	// 		var res = j.objectToString(o);
	// 	// 		expect( res ).toBe( arrStringObjects[i] );
	// 		}
	// 	});
	// });


});