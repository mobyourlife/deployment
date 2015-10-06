/* Deploy a website from templates + data to static pages. */
var api = require('./api/lib'),
	build = require('./build'),
	// diff = require('./diff'),
	// order = require('./order'),
	publish = require('./publish');

/* Main method for deploying the whole website. */
module.exports = (id) => {
	/* Load data from the API. */
	let about = api.about(id);
	let photos = api.photos(id);
	let videos = api.videos(id);

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
