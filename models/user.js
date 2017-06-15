console.log("module");
var request = require("request");
var http = require('http');

exports.getRanksFromAPI = function () {
	return new Promise(function (resolve, reject) {
		request("http://y9lw.com/hosted/rocketleague/rankapi.php?user=LukeXF&plat=ps", function (error, response, body) {
			//console.log('error:', error); // Print the error if one occurred
			//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			//console.log('body:', body); // Print the HTML for the Google homepage.
			if (error) return reject(error);
			try {

				var ranks = body.split(" | ");
				var rankValues = [];
				var finalValues = [];
				//console.log(arr);

				ranks.forEach(function (item) {
					rankValues.push(item.split(": "));
				});

				rankValues.splice(0, 1);

				rankValues.forEach(function (item) {

					var innerRankValues = [];
					innerRankValues.gameType = item[0];


					var arr = item[1].split(" (");

					innerRankValues.rank = arr[0];
					innerRankValues.value = arr[1].substring(0, arr[1].length - 1);

					finalValues.push(innerRankValues);
				});


				//console.log("1========");
				//console.log(finalValues);
				//console.log("2========");
				//return ;
				//module.exports = finalValues;

				resolve(finalValues);
			} catch (e) {
				reject(e);
			}



		});

	});

};


//console.log(request2);


