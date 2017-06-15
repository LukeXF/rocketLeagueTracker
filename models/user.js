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

				resolve(body);
			} catch (e) {
				reject(e);
			}



		});

	});

};


//console.log(request2);


