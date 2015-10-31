#!/usr/bin/env node

var program = require('commander'),
	package = require('../package'),
	deploy = require('../lib/deploy');

program
	.version(package.version)
	.option('-d --deploy [id]', 'deploy website [id] now')
	.parse(process.argv);

if (program.id) {
	deploy(program.id);
}
