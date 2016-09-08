/**
 * @file vcsVersion.js
 * @author Y3G
 */

'use strict';

var fs = require('fs');
var path = require('path');
var cpr = require('child_process');
var packageInfo = require('./packageInfo');

var vcs = {
	svn: {
		getVersion: function(rootPath) {
			var log = cpr.execSync('cd ' + rootPath + ' && svn log -l1', {
				encoding: 'utf-8'
			});

			//console.log(log);

			var pos1 = log.indexOf('r');
			var pos2 = log.indexOf('|');
			var ver = log.substring(pos1, pos2).replace('r', '').replace(' ', '');

			return ver;
		},
	},

	git: {
		getVersion: function(rootPath) {
			var log = cpr.execSync('cd ' + rootPath + ' && git log -n1', {
				encoding: 'utf-8'
			});

			//console.log(log);

			var pattern = /commit ([\d\w]{7})/;
			var ver = pattern.exec(log)[1];

			return ver;
		},
	},
};

module.exports = function(rootPath, options) {
	var entry = vcs[options.vcs];

	if (!entry) {
		throw new Error('NO entry for ' + options.vcs);
	}

	return entry.getVersion(rootPath);
}