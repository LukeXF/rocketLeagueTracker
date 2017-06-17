const model = require('../models/getCurrentRankModel');
const firebase = require('../models/firebaseModel');
const chalk = require('chalk');

module.exports.controller = function (app) {

	/**
	 * The currentRank route, with no user or platform entered.
	 */

	app.get('api/currentRank', function (req, res) {

		let data = {};

		data.message = "No user or platform defined. Please use the format (currentRank/user/platform).";
		data.error = true;

		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});


	/**
	 * The user has been entered, but a platform has not been defined.
	 */

	app.get('api/currentRank/:user', function (req, res) {

		let data = {};

		data.message = "No platform defined. Please user either xbox, ps or steam. (currentRank/user/platform).";
		data.error = true;

		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	});


	/**
	 * The correct url structure for a currentRank request.
	 */

	app.get('api/currentRank/:user/:platform', function (req, res) {

		const user = req.params.user;
		const platform = req.params.platform;

		res.setHeader('Content-Type', 'application/json');
		let data = {};

		model.getRanksFromAPI(user, platform).then(function (returnedData) {

			if (returnedData.includes("current ranks")) {
				data = processData(returnedData);
				firebase.saveNewRank(user, platform, data);
			} else if (returnedData.includes("has no ranks yet.")) {
				data.message = user + " has no ranks yet.";
				data.error = true;
			} else if (returnedData.includes("was not found")) {
				data.message = user + " was not found on the RLTrackerNetwork";
				data.url = "https://rocketleague.tracker.network/profile/ps/" + user;
				data.error = true;
			} else {
				data.message = "Unable to make an API request";
				data.error = true;
			}

			res.send(data);

		}).catch(function (err) {
			console.log(chalk.red("==============================="));
			console.log(err);
			console.log(chalk.red("==============================="));

			data.message = "Error Code: " + err + ".";
			data.error = true;
			res.send(data);
		});


	});

};

processData = function (body) {
	const ranks = body.split(" | ");
	let rankValues = [];
	let finalValues = {};

	ranks.forEach(function (item) {
		rankValues.push(item.split(": "));
	});

	rankValues.splice(0, 1);

	let i = 0;
	rankValues.forEach(function (item) {

		let innerRankValues = {};
		let gameType = item[0];


		const arr = item[1].split(" (");

		innerRankValues.rank = arr[0];
		innerRankValues.value = arr[1].substring(0, arr[1].length - 1);


		finalValues[gameType] = innerRankValues;
		i++;
	});

	console.log(finalValues);
	return finalValues;
};