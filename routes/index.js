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
var userId = "456";

// variation_3 whitelisted ID
// var userId = "789";

// console.log('Feature Enabled: ', featureEnabled);
// console.log('Flight Deals Headline: ', title);
// console.log('User ID: ', userId);

/* GET home page. */
router.get('/', function(req, res, next) {
	var featureEnabled = optimizelyClient.isFeatureEnabled('flight_deals', userId);
	var title = optimizelyClient.getFeatureVariableString('flight_deals', 'title', userId);
	var variation = optimizelyClient.activate('destination_recommendations', userId);

	// Default recommended locations
	var northAmericanTravelDestinations = {
		destination1: {
			name: "San Francisco",
			img: "https://images.unsplash.com/photo-1526404423292-15db8c2334e5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=25a6176d2b7c949856700b8afd9bea32&auto=format&fit=crop&w=975&q=80"
		},
		destination2: {
			name: "Sydney",
			img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b7a43ba69b82c9d52d9bd09eff8a652&auto=format&fit=crop&w=1350&q=80"
		},
		destination3: {
			name: "Vancouver",
			img: "https://images.unsplash.com/photo-1527201488222-1877fba009be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=975a1e9c1683fbe02d0d0fbbf1f6b5d1&auto=format&fit=crop&w=1350&q=80"
		}
	}

	// Alternative recommended locations
	var internationalTravelDestinations = {
		destination1: {
			name: "Sydney",
			img: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6b7a43ba69b82c9d52d9bd09eff8a652&auto=format&fit=crop&w=1350&q=80"
		},
		destination2: {
			name: "Hong Kong",
			img: "https://images.unsplash.com/photo-1529583302858-7143cb9440cb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=94b1eb8f43be842e2149fa5d7c146bcc&auto=format&fit=crop&w=934&q=80"
		},
		destination3: {
			name: "Auckland",
			img: "https://images.unsplash.com/photo-1531274071216-aea6e7a086c7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=342f6a184021974c93bbcf5070694b62&auto=format&fit=crop&w=975&q=80"
		}
	}

	// Will determine whether to show default or alternative recs based on output from
	// alternativeRecs feature variable
	if (variation === 'CONTROL') {
		res.render('index', { featureEnabled, title, travelDestinations: northAmericanTravelDestinations });
	} else if (variation === 'TREATMENT') {
		res.render('index', { featureEnabled, title, travelDestinations: internationalTravelDestinations });
	} else {
		res.render('index', { featureEnabled, title, travelDestinations: northAmericanTravelDestinations });
	}

});

router.get('/flight-deals/north-america', function(req, res, next) {
	optimizelyClient.track('Viewed North American Deals Page', userId);
	res.render('NorthAmericaLandingPage');
});

router.get('/flight-deals/australia', function(req, res, next) {
	optimizelyClient.track('Viewed International Deals Page', userId);
	res.render('AustraliaLandingPage');
});

router.get('/flight-deals/asia', function(req, res, next) {
	optimizelyClient.track('Viewed International Deals Page', userId);
	res.render('AsiaLandingPage');
});



// router.post('/datafileUpdates', function(req, res, next) {
// 	console.log('received datafile update');
// })

module.exports = router;
