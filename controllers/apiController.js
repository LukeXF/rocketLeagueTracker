const model = require('../models/getCurrentRankModel');
const firebase = require('../models/firebaseModel');
const chalk = require('chalk');

module.exports.controller = function (app) {

	/**
	 * API route
	 */

	app.get('/api/', function (req, res) {

		let data = {};
		res.setHeader('Content-Type', 'application/json');

		data.message = "Try using /api/search/<platform>?search=<user> or /api/currentRank/<user>/<platform>";
		data.error = true;

		res.send(data);
	});


	/**
	 * The user has been entered, but a platform has not been defined.
	 */

	app.get('/api/search', function (req, res) {

		let data = {};
		res.setHeader('Content-Type', 'application/json');

		data.message = "Try using /api/search/<platform>?search=<user>";
		data.error = true;

		res.send(data);
	});

	/**
	 * Check to see if a user exists in the data
	 * Used to redirect upon search
	 */
	app.get('/api/search/:platform', function (req, res) {

		let data = {};
		res.setHeader('Content-Type', 'application/json');


		const user = req.query.user;
		const platform = req.params.platform;

		if (user === undefined) {
			data.message = "There is no user defined. Try /api/search/<platform>?search<user>";
			data.error = true;

			res.send(data);
		}
		/*if (platform !== "xbox" || platform !== "ps" || platform !== "steam") {

			data.message = "No valid platforms used. Try using xbox, ps or steam";
			data.error = true;

			res.send(data);
		} else */{

			firebase.checkIfExists(user.toLowerCase(), platform).then(function (id) {
				res.send({exists: id});
			}).catch(function (err) {

				console.log(chalk.red("==============================="));
				console.log(err);
				console.log(chalk.red("==============================="));

				res.locals.message = err.message;
				res.locals.err = req.app.get('env') === 'development' ? err : {};

				// render the err page
				data.message = "Unable to check for event. " + err;
				data.error = true;

				res.send(data);

				res.status(500);
			});
		}


	});

};
