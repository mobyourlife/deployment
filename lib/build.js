'use strict';

/* Lower level deployment tasks. */
var fs = require('fs'),
	handlebars = require('handlebars'),
	through = require('through2');

module.exports = { };

/* Deploy partial with data. */
module.exports.partial = (name, args/*, ...*/) => {
	let html = loadTemplate(`partials/${name}`);
	let data = concatData(args);
	let result = handlebars(html, data);

	// return stream with result
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
function loadTemplate (name) {
	let html;
	return html;
}

/* Concatenate multiple arguments into a single data object. */
function concatData (args/*, ...*/) {
	let data = {};
	return data;
}
