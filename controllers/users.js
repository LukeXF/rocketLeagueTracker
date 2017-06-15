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
			var test = processData(val);


			console.log(test);
			console.log(JSON.stringify(test));


			res.setHeader('Content-Type', 'application/json');
			res.send(test);
		}).catch(function(err) {
			console.log(err);
		});


		//console.log(lol);
		console.log("TEST CLICKED");
	});

};

processData = function (body) {
	var ranks = body.split(" | ");
	var rankValues = [];
	var finalValues = {};
	//console.log(arr);

	ranks.forEach(function (item) {
		rankValues.push(item.split(": "));
	});

	rankValues.splice(0, 1);

	var i = 0;
	rankValues.forEach(function (item) {

		var innerRankValues = {};
		innerRankValues.gameType = item[0];


		var arr = item[1].split(" (");

		innerRankValues.rank = arr[0];
		innerRankValues.value = arr[1].substring(0, arr[1].length - 1);


		finalValues[i] = innerRankValues;
		i++;
	});

	console.log(finalValues);
	return finalValues;
};