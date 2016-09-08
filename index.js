#!/usr/bin/env node

/**
 * @file index.js
 * @author Y3G
 */

'use strict';

var fs = require('fs');
var path = require('path');
var mkdirs = require('node-mkdirs');
var program = require('commander');
var check = require('param-check');
var getReleaseInfo = require('./lib/releaseInfo');
var getVCSVersion = require('./lib/vcsVersion');
var getPackageInfo = require('./lib/packageInfo');
var pack = require('./lib/pack');

program
	.version('0.1.0')
	.option('release-info, ri', 'Generate release info')
	.option('vcs-version, vv', 'Get vcs version')
	.option('package-version, pv', 'Get package version')
	.option('pack, pk', 'Make package zip file')
	.option('-p, --project-path <string>', 'Project root path')
	.option('-s, --vcs <string>', 'Version control system type')
	.option('-f, --format <string>', 'Release info file format')
	.option('-o, --output <string>', 'Output path or file name')
	.option('-i, --input <string>', 'Input path')
	.option('-d, --date-format <string>', 'Date format')
	.parse(process.argv);

try {
	main();
} catch (err) {
	console.error(err.message);
}

function main(){
	var rootPath = path.resolve(process.cwd(), program.projectPath || '');
	var options = {
		vcs: program.vcs,
		fileFormat: program.format || 'json',
		input: path.resolve(rootPath, program.input || './'),
		dateFormat: program.dateFormat || 'yyyy-mm-dd_hh-MM-ss',
	};

	if (program.output) {
		options.output = (function(rootPath) {
			var ret = path.resolve(rootPath, program.output);

			if ((/[\/\\]$/).test(ret)) {
				ret += 'nph-release-info.json.or.js';
			}

			return ret;
		})(rootPath);
	}

	check(rootPath, 'project-path').isString();
	
	if (program.ri || program.vv) {
		check(options.vcs, 'vcs').isString();
	}

	if (program.pk) {
		check(options.output, 'output of packing').isString().map(function(obj) {
			return (/[\/\\]$/).test(obj);
		});
	}

	//console.log(options);

	if (program.ri) {
		var info = getReleaseInfo(rootPath, options);

		if (!options.output) {
			console.log(info);
		} else {
			mkdirs(path.dirname(options.output));

			var content;
			var ff = options.fileFormat.toLowerCase();

			if (ff === 'json') {
				content = JSON.stringify(info);
			} else if (ff === 'js' ||
				ff === 'javascript' ||
				ff === 'commonjs' ||
				ff === 'common-js') {
				content = ('module.exports = %info%;').replace('%info%', JSON.stringify(info));
			}

			fs.writeFileSync(options.output, content);
		}
	} else if (program.vv) {
		var ver = getVCSVersion(rootPath, options);
		console.log(ver);
	} else if (program.pv) {
		var info = getPackageInfo(rootPath, options);
		console.log(info.version);
	} else if (program.pk) {
		var info = getReleaseInfo(rootPath, options);
		pack(info.package + '_v' + info.version + '_r' + info.vcsVersion + '.zip', options);
	}
}