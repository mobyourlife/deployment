#!/usr/bin/env node

var program = require('commander'),
	package = require('../package'),
	deploy = require('../lib/deploy');

program.version(package.version);

program
	.command('deploy <id>')
	.description('deploy website')
	.action((id) => {
		deploy(id);
	});

program.parse(process.argv);
