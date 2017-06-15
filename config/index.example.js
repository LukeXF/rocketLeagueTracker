let config = {
	local: {
		mode: 'local',
		port: 3000,
		firebase: {
			apiKey: "",
			authDomain: ".firebaseapp.com",
			databaseURL: "https://.firebaseio.com",
			storageBucket: ".appspot.com"
		},
		siteTitle: 'Rocket League Tracker',
		navTitle: '<b>RL</b> Tracker',
		pageTitle: false
	},
	staging: {
		mode: 'staging',
		port: 4000,
		firebase: {
			apiKey: "",
			authDomain: ".firebaseapp.com",
			databaseURL: "https://.firebaseio.com",
			storageBucket: ".appspot.com"
		},
		siteTitle: 'Rocket League Tracker',
		navTitle: '<b>RL</b> Tracker',
		pageTitle: false
	},
	production: {
		mode: 'production',
		port: 5000,
		firebase: {
			apiKey: "",
			authDomain: ".firebaseapp.com",
			databaseURL: "https://.firebaseio.com",
			storageBucket: ".appspot.com"
		},
		siteTitle: 'Rocket League Tracker',
		navTitle: '<b>RL</b> Tracker',
		pageTitle: false
	}
};
module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";