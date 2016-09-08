/**
 * @file pack.js
 * @author Y3G
 */

'use strict';

var path = require('path');
var cpr = require('child_process');
var mkdirs = require('node-mkdirs');

module.exports = pack;

function pack(filename, options) {
	var dstPath = options.output;
	var srcPath = options.input;

	mkdirs(dstPath);

	filename = path.join(dstPath, filename);
	cpr.execSync(('cd %srcPath% && zip -r %filename% ./*').replace('%filename%', filename).replace('%srcPath%', srcPath));
}