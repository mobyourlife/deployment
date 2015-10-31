'use strict';

/* Deploy a website from templates + data to static pages. */
var api = require('mobyourlife-api/models'),
	mongoose = require('mongoose'),
	build = require('./build'),
	// diff = require('./diff'),
	// order = require('./order'),
	publish = require('./publish');

const DEFAULT_DATABASE = 'mongodb://localhost:27017/mobyourlife';

var database = process.env.MOBYOURLIFE_DATABASE || DEFAULT_DATABASE;

/* Main method for deploying the whole website. */
module.exports = (id) => {
	mongoose.connect(database);

	let about = getAbout(id);
	let q = [ about ];

	Promise.all(q)
	.then((values) => {
		let about = values[0];

		let content = [];
		content.push(build.partial('index', { about: about }));

		Promise.all(content)
		.then((partials) => {
			build.pages(partials)
			.then((pages) => {
				publish(id, pages);
			});
		});
	});

	// /* Deploy partials with data. */
	// var partials = [
	// 	build.partial('index', about),
	// 	build.partial('about', about),
	// 	build.partial('photos', about, photos),
	// 	build.partial('videos', about, videos)
	// ];

	// /* Deploy static pages with partials. */
	// build.pages(partials)
	// 	// .pipe(diff)
	// 	// .pipe(order)
	// 	.pipe(publish);
};

function getAbout(id) {
	let promise = new Promise((resolve, reject) => {
		api.Fanpage.findOne({ _id: id }, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
	return promise;
}
