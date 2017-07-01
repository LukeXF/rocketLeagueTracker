const request = require("request");
const http = require('http');
const chalk = require('chalk');
const cheerio = require('cheerio');
const fs = require('fs');

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

exports.getRanksFromSite = function (user, platform) {
	return new Promise(function (resolve, reject) {
		// Let's scrape Anchorman 2
		url = 'https://rocketleague.tracker.network/profile/' + platform + '/' + user;

		request(url, function (error, response, html) {
			if (!error) {
				const $ = cheerio.load(html);

				let allRanks = {
					'Un-Ranked': false,
					'Ranked Duel 1v1': false,
					'Ranked Doubles 2v2': false,
					'Ranked Solo Standard 3v3': false,
					'Ranked Standard 3v3': false,
				};

				$('.season-table tr').each(function (index, listItem) {

					// remove header from loop
					if (index !== 0) {

						const currentRank = {
							rank: {
								rankName: '',
								rankNumber: '',
								division: '',
								divisionNumber: '',
							},
							rating: '',
							topPercentile: '',
							gamesPlayed: '',
							streak: {
								type: '',
								amount: ''
							},
							divDown: '',
							divUp: '',
						};

						const row = '.season-table tr:nth-child(' + index + ') td';
						// rank of playlist and playlist name
						let rank = $(row + ':nth-child(2) small').text().replace(/\n|\r/g, "").trim().replace(/\s\s+/g, ' ');
						let playlist = $(row + ':nth-child(2)').text().replace(/\n|\r/g, "").trim().replace(/\s\s+/g, ' ');
						playlist = playlist.replace(rank, '').trim();

						rank = rank.split(' Division ');
						currentRank.rank = {
							rankName: rank[0],
							rankNumber: getRankNumber(rank[0]),
							division: 'Divison ' + rank[1],
							divisionNumber: getDivisionNumber(rank[1])
						};

						console.log(getRankNumber(rank[0]), rank[0]);

						if (playlist.includes('Ranked')) {

							// div up and down
							const divDown = $(row + ':nth-child(3) span').text();
							const divUp = $(row + ':nth-child(5) span').text();

							currentRank.divDown = parseInt(divDown.replace('~', ''));
							currentRank.divUp = parseInt(divUp.replace('~', ''));

							// rating and rating compared against other players
							const topPercentile = $(row + ':nth-child(4) .season-rank').text().trim().replace(/\s\s+/g, ' ');
							currentRank.rating = $(row + ':nth-child(4)').text().trim().replace(/\s\s+/g, ' ');
							currentRank.rating = parseInt(currentRank.rating.replace(topPercentile, '').trim());
							currentRank.topPercentile = parseInt(topPercentile.replace(/[\(\)]/g, '').replace('Top ', '').replace('%', ''));

							console.log(currentRank.topPercentile);
							if (isNaN(currentRank.topPercentile)) {
								delete currentRank.topPercentile;
							}

							// games played and winning/losing streak
							let streak = $(row + ':nth-child(6) small').text().trim().replace(/\s\s+/g, ' ');
							streak = streak.split(': ');
							const streakType = streak[0].replace(' Streak', '');

							currentRank.streak = {
								type: streak[0].replace(' Streak', ''),
								amount: parseInt(streak[1])
							};

							if (streakType !== "Winning" && streakType !== "Losing") {
								delete currentRank.streak;
							}

							currentRank.gamesPlayed = $(row + ':nth-child(6)').text().trim().replace(/\s\s+/g, ' ');
							currentRank.gamesPlayed = parseInt(currentRank.gamesPlayed.replace(currentRank.streak, '').trim());

							console.log(index);

						}

						if (playlist.includes('Un-Ranked')) {
							delete currentRank.divDown;
							delete currentRank.divUp;
							delete currentRank.topPercentile;
							delete currentRank.streak;
							delete currentRank.gamesPlayed;
						}
						allRanks[playlist] = currentRank;
					}
				});

				resolve(allRanks);
			} else {
				console.alert(error);
				resolve(error);
			}


			//fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
			//	console.log('File successfully written! - Check your project directory for the output.json file');
			//});

			//res.send('Check your console!')
		})

	});

};

function validate(s) {
	if (/^(\w+\s?)*\s*$/.test(s)) {
		return s.replace(/\s+$/, '');
	}
	return false;
}

function getRankNumber(rank) {

	const ranks = {
		'Unranked': 0,
		'Bronze I': 1,
		'Bronze II': 2,
		'Bronze III': 3,
		'Silver I': 4,
		'Silver II': 5,
		'Silver III': 6,
		'Gold I': 7,
		'Gold II': 8,
		'Gold III': 9,
		'Platinum I': 10,
		'Platinum II': 11,
		'Platinum III': 12,
		'Diamond I': 13,
		'Diamond II': 14,
		'Diamond III': 15,
		'Champion I': 16,
		'Champion II': 17,
		'Champion III': 18,
		'Grand Champion': 19
	};

	return ranks[rank];
}

function getDivisionNumber(division) {

	const divisions = {
		'I': 1,
		'II': 2,
		'III': 3,
		'IV': 4,
	};

	return divisions[division];
}