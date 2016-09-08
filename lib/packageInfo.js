/**
 * @file packageInfo.js
 * @author Y3G
 */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = packageInfo;

function packageInfo(rootPath) {
	var filename = path.join(rootPath, 'package.json');
	var content = fs.readFileSync(filename, 'utf-8');
	var packageInfo = JSON.parse(content);

	return packageInfo;
}