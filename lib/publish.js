'use strict';

var fs = require('fs');

module.exports = (id, pages) => {
	let base = './.build';
	let path = `${base}/${id}`;

	if (!fs.existsSync(base)) {
		fs.mkdirSync(base);
	}

	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}

	pages.forEach((item) => {
		fs.writeFileSync(`${path}/${item.name}.html`, item.body);
	});
};
