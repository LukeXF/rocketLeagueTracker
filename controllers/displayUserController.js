const firebase = require('../models/firebaseModel');
const chalk = require('chalk');
const config = require('../config')();

module.exports.controller = function (app) {

	/**
	 * API search
	 * TODO: move to api controller
	 */
	app.get('/api/search/:platform', function (req, res) {

		const val = req.query.search;
		const platform = req.params.platform;
		console.log(val, platform);
		//res.render('users/login',  { config: config })

		firebase.checkIfExists(val, platform).then(function (id) {
			res.send(id);
		}).catch(function(err){

			console.log(chalk.red("==============================="));
			console.log(err);
			console.log(chalk.red("==============================="));

			res.locals.message = err.message;
			res.locals.err = req.app.get('env') === 'development' ? err : {};

			// render the err page
			res.status(err.status || 500);
			res.render('error');

			//res.status(500).send(error);
		});


	});

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
