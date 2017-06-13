describe("Firebase", function() {
	it("is there an API key", function (next) {
		var config = require('../config')();
		expect(config.firebase.apiKey).toBeDefined();
		next();
	});
	it("is there a server running", function(next) {
		var config = require('../config')();
		var firebase = require('firebase');
		firebase.initializeApp(config.firebase);

		// Get a reference to the database service
		var database = firebase.database();
		next();

		//console.log(database);
		/*var MongoClient = require('mongodb').MongoClient;
		MongoClient.connect('mongodb://127.0.0.1:27017/fastdelivery', function(err, db) {
			expect(err).toBe(null);
			next();
		});*/
	});
});