const request = require("request");
const http = require('http');
const chalk = require('chalk');

exports.getRanksFromAPI = function (user, platform) {
	return new Promise(function (resolve, reject) {

		console.log(chalk.cyan("Loading data for user ", user, "on platform", platform));
		request("http://y9lw.com/hosted/rocketleague/rankapi.php?user=" + user + "&plat=" + platform, function (error, response, body) {
			console.log(chalk.blue("==============================="));
			console.log(chalk.blue('error:'), error); // Print the error if one occurred
			console.log(chalk.blue('statusCode:'), response && response.statusCode); // Print the response status code if a response was received
			console.log(chalk.blue('body:'), body); // Print the HTML for the Google homepage.
			console.log(chalk.blue("==============================="));

			if (error) return reject(error);
			try {
				if (response.statusCode >= 500 && response.statusCode <= 600) {
					reject(response.statusCode);
				} else if (response.statusCode === 404) {
					reject(response.statusCode);
				} else {
					resolve(body);
				}
			} catch (e) {
				reject(e);
			}

		});

	});

};