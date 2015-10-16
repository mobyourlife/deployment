/* Deploy a website from templates + data to static pages. */
var api = require('mobyourlife-api'),
	build = require('./build'),
	// diff = require('./diff'),
	// order = require('./order'),
	publish = require('./publish');

/* Main method for deploying the whole website. */
module.exports = (id) => {
	/* Load data from the API. */
	let about = api.about.get(id);
	let photos = api.photos.get(id);
	let videos = api.videos.get(id);

	/* Deploy partials with data. */
	var partials = [
		build.partial('index', about),
		build.partial('about', about),
		build.partial('photos', about, photos),
		build.partial('videos', about, videos)
	];

	/* Deploy static pages with partials. */
	build.pages(partials)
		// .pipe(diff)
		// .pipe(order)
		.pipe(publish);
};
