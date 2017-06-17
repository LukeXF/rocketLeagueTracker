const firebase = require('../models/firebaseModel');
const chalk = require('chalk');
const config = require('../config')();

module.exports.controller = function (app) {

	app.get('/', function (req, res) {

		config.pageTitle = 'Homepage';
		res.render('index', {title: 'Express', config: config});
	});

	app.get('/user/', function (req, res) {

		res.redirect('/');
	});

	app.get('/user/:user', function (req, res) {

		config.pageTitle = req.params.user;
		config.user = req.params.user;
		res.render('users/userNoPlatform', {title: 'Express', config: config});
	});


	app.get('/users/', function (req, res) {

		res.redirect('user');
	});


	app.get('/user/:user/:platform', function (req, res) {

		config.pageTitle = req.params.user + " (" + req.params.platform + ")";
		config.user = req.params.user;
		config.platform = req.params.platform;

		firebase.checkIfExists(config.user, config.platform);

		res.render('users/user', {title: 'Express', config: config});
	});

};
