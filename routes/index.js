var express = require('express');
var router = express.Router();

// Package declaration for Optimizely SDK
// and Optimizely logger
var optimizely = require('@optimizely/optimizely-sdk');
var defaultLogger = require('@optimizely/optimizely-sdk/lib/plugins/logger');
var LOG_LEVEL = require ('@optimizely/optimizely-sdk/lib/utils/enums').LOG_LEVEL;

// For retrieving the remote datafile from Optimizely's CDN
var fetch = require('node-fetch');

// Bundled datafile
var datafile = require('../datafile.json');

// URL for fetching the datafile
var url = 'https://cdn.optimizely.com/datafiles/99yQq3pGweBtGY1Zvh7MBq.json'

// For grabbing the remote datafile
fetch(url) // Call the fetch function passing the url of the API as a parameter
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			// Will reinitialize the client with a remote datafile
			// this is where the logger is initialized as well
			optimizelyClient = optimizely.createInstance({ 
				datafile: data,
				logger: defaultLogger.createLogger({ logLevel: LOG_LEVEL.INFO })
			});
		})
		.catch(function(err) {
	    	console.log(err);
		});

// Create an instance of Optimizely on the server
// Uses the default, bundled datafile
var optimizelyClient = optimizely.createInstance({ datafile: datafile });

// variation_1 whitelisted ID
// var userId = "123";

// variation_2 whitelisted ID
// var userId = "456";

// variation_3 whitelisted ID
var userId = "789";

// console.log('Feature Enabled: ', featureEnabled);
// console.log('Flight Deals Headline: ', title);
// console.log('User ID: ', userId);

/* GET home page. */
router.get('/', function(req, res, next) {
	var featureEnabled = optimizelyClient.isFeatureEnabled('flight_deals', userId);
	var title = optimizelyClient.getFeatureVariableString('flight_deals', 'title', userId);

	// Default recommended locations
	var travelDestinations = {
		destination1: {
			name: "Kaikoura",
			img: "https://www.christchurchnz.com/media/7228/kaikoura_bay.jpg?center=0.65573770491803274,0.4453551912568306&mode=crop&width=1100&heightratio=1&rnd=131534981480000000"
		},
		destination2: {
			name: "Wellington",
			img: "https://www.telegraph.co.uk/content/dam/Travel/leadAssets/24/43/wellington_2443262a.jpg?imwidth=450"
		},
		destination3: {
			name: "Auckland",
			img: "https://www.heartofthecity.co.nz/sites/default/files/styles/listing_regular_image/public/listing_images/Sunset%20image%20square.jpg?itok=51KzHHD6"
		}
	}

	// Alternative recommended locations
	var alternativeTravelDestinations = {
		destination1: {
			name: "Christchurch",
			img: "https://hotel115.co.nz/wp-content/uploads/2017/08/New-regent-street-christchurch.png"
		},
		destination2: {
			name: "Queenstown",
			img: "https://tul.imgix.net/content/article/things-to-do-queenstown-1.jpg?auto=format,compress&w=740&h=486&fit=crop&crop=edges"
		},
		destination3: {
			name: "Rotorua",
			img: "https://resources.stuff.co.nz/content/dam/images/1/n/u/2/y/o/image.related.StuffLandscapeSixteenByNine.620x349.1ntrru.png/1515704144379.jpg"
		}
	}

	// Will determine whether to show default or alternative recs based on output from
	// alternativeRecs feature variable
	if (alternativeRecs) {
		res.render('index', { featureEnabled, title, travelDestinations: alternativeTravelDestinations });
	} else {
		res.render('index', { featureEnabled, title, travelDestinations: travelDestinations });
	}

});

router.get('/flightDeal', function(req, res, next) {
	optimizelyClient.track('Viewed Deals Page', userId);

	res.render('SanFranciscoLandingPage');
})

// router.post('/datafileUpdates', function(req, res, next) {
// 	console.log('received datafile update');
// })

module.exports = router;
