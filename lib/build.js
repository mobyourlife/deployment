/* Deploy a partial with data. */
var fs = require('fs'),
	handlebars = require('handlebars'),
	through = require('through2');

/* Main method for deploying partials. */
module.exports = (name, args, ...) => {
	let html = loadTemplate(name);
	let data = concatData(args);
	let result = handlebars(html, data);

	// return stream with result
};

/* Load partial template from file. */
function loadTemplate (name) {
	let html;
	return html;
}

/* Concatenate multiple arguments into a single data object. */
function concatData (args, ...) {
	let data = {};
	return data;
}
