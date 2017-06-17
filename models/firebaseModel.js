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


	//let day = new Date().getDate();
	//let month = new Date().getMonth();
	//let year = new Date().getYear() + 1900;
	//console.log(day, month, year);

	// const placementPoint = firebase.database().ref(platform + "/" + user + "/" + month + "-" + year + "/" + day + "/" + rounded);
	const placementPoint = firebase.database().ref(platform + "/" + user + "/" + rounded);

	placementPoint.once('value').then(function (snapshot) {

		const hasDate = snapshot.exists(); // true

		if (hasDate) {
			console.log("Value already there");
		} else {
			placementPoint.set(
				data
			);
		}
	});

};


exports.checkIfExists = function (user, platform) {

	console.log(chalk.green("CHECKING IF " + user + " EXISTS FROM FIREBASE"));

	return new Promise(function (resolve, reject) {

		const placementPoint = firebase.database().ref(platform + "/" + user);

		placementPoint.once('value').then(function (snapshot) {

			const data = snapshot.exists(); // true

			if (data) {
				console.log(chalk.blue("Value Found", data));
				resolve(true);
			} else {
				console.log(chalk.blue("No data Found"));
				resolve(false);
			}
		}, function (error) {
			// The callback failed.
			reject(error);
		});

	});

};


exports.getRanks = function (user, platform) {

	console.log(chalk.green("LOADING DATA FROM FIREBASE"));

	const coeff = 1000 * 60 * 2;
	const date = new Date();  //or use any other date
	const rounded = new Date(Math.round(date.getTime() / coeff) * coeff);

	console.log("Loading rounded date", rounded);

	const placementPoint = firebase.database().ref(platform + "/" + user + "/" + rounded);

	placementPoint.once('value').then(function (snapshot) {

		const hasDate = snapshot.exists(); // true

		if (hasDate) {
			console.log("Value Found");
		} else {
			console.log("No data Found");
		}
	});

};

