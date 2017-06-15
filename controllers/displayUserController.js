const firebase = require('../models/firebaseModel');
const chalk = require('chalk');
const config = require('../config')();

module.exports.controller = function (app) {

	/**
	 * About page route
	 */
	app.get('/search', function (req, res) {
		res.render('users/login',  { config: config })
	});


};
