var config = {
	local: {
		mode: 'local',
		port: 3000,
		firebase: {
			apiKey: "",
			authDomain: ".firebaseapp.com",
			databaseURL: "https://.firebaseio.com",
			storageBucket: ".appspot.com"
		}
	},
	staging: {
		mode: 'staging',
		port: 4000,
		firebase: {
			apiKey: "",
			authDomain: ".firebaseapp.com",
			databaseURL: "https://.firebaseio.com",
			storageBucket: ".appspot.com"
		}
	},
	production: {
		mode: 'production',
		port: 5000,
		firebase: {
			apiKey: "",
			authDomain: ".firebaseapp.com",
			databaseURL: "https://.firebaseio.com",
			storageBucket: ".appspot.com"
		}
	}
};
module.exports = function (mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
};