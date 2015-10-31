'use strict';

/* Lower level deployment tasks. */
var fs = require('fs'),
	handlebars = require('handlebars'),
	through = require('through2');

module.exports = { };

/* Deploy partial with data. */
module.exports.partial = (name, args) => {
	loadTemplate(`partials/${name}`, (err, html) => {
		let template = handlebars.compile(html);
		let result = template(args);
		console.log(result);
	});
};

/* Deploy pages from partials. */
module.exports.pages = (partials) => {
	let html = loadTemplate('layout');
	let pages = [];

	partials.forEach((item) => {
		pages.push(handlebars(html, item));
		// stream pages instead of pushing to the array
	});

	// return stream with pages
}

/* Load template from file. */
function loadTemplate (name, cb) {
	let relative = `../templates/starter/${name}.html`;
	let filename = require.resolve(relative);

	fs.readFile(filename, (err, data) => {
		if (data) {
			data = data.toString();
		}

		cb(err, data);
	});
}
