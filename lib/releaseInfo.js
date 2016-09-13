/**
 * @file releaseInfo.js
 * @author Y3G
 */

'use strict';

var getVCSVersion = require('./vcsVersion');
var getPackageInfo = require('./packageInfo');
var dateformat = require('dateformat');

module.exports = function(rootPath, options) {
	var vcs = options.vcs;
	var dateFormat = options.dateFormat;
	var vcsVer = getVCSVersion(rootPath,options);
	var packageInfo = getPackageInfo(rootPath, options);
	var releaseTime = dateformat((new Date()), dateFormat);

	return {
		package: packageInfo.name,
		version: packageInfo.version,
		vcsVersion: vcsVer,
		releaseTime: releaseTime,
	};
}
