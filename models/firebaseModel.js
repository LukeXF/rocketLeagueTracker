const request = require("request");
const http = require('http');
/** @member {Object} */
const chalk = require('chalk');
const config = require('../config')();
const firebase = require('firebase');

firebase.initializeApp(config.firebase);

exports.saveNewRank = function (user, platform, data) {

	console.log(chalk.cyan("SAVING DATA TO FIREBASE"));

	const coeff = 1000 * 60 * 2;
	const date = new Date();  //or use any other date
	const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);

	console.log("saving rounded date", rounded);

	const placementPoint = firebase.database().ref('users/' + user + "/" + platform + "/" + rounded);

	placementPoint.once('value').then(function (snapshot) {

		const hasDate = snapshot.exists(); // true

		if (hasDate) {
			console.log("Value already there");
		} else {
			firebase.database().ref('users/' + user + "/" + platform + "/" + rounded).set(
				data
			);
		}
	});

};


