var model = require('../models/user');
module.exports.controller = function (app) {
	/**
	 * a home page route
	 */
	app.get('/signup', function (req, res) {
		// any logic goes here
		res.render('users/signup')
	});

	/**
	 * About page route
	 */
	app.get('/login', function (req, res) {
		// any logic goes here
		var test = "slkdl;gk";
		//console.log(model);

		res.render('users/login')
	});

	app.get('/test', function (req, res) {
		// any logic goes here
		//	res.render('users/signup')

		//var promise = model.getRanksFromAPI();
		model.getRanksFromAPI().then(function(val) {
			console.log("VAL: " + val);
		}).catch(function(err) {
			console.log(err);
		});


		//console.log(lol);
		console.log("TEST CLICKED");
	});

};