var friendsArray = require("../data/friends");

module.exports = function(app) {

	app.post('/api/friends', function(request, response) {
		//Set the current user's answers to variables for future use
		currentUser = request.body;
		currentUserScores = request.body.personScores;
		//biggestDifference is the biggest possible difference from two people
		//all other user differences will be compared against this one
		//then compared against each other until the smallest is found
		var biggestDifference = 3486784401;
		var currentUserMatchName;
		var currentUserMatchPhoto;
		var friendMatch = [];
		for (var j = 0; j < friendsArray.length; j++) {
			//Calculate the differences between the current user and
			//each subsequent user in the array. The match name and
			//current difference will keep on getting replaced as a better
			//match is found.
			var userDifference = 0;

			for (var i = 0; i < currentUserScores.length; i++) {
				userDifference += Math.abs(parseInt(friendsArray[j].personScores[i]) - parseInt(currentUserScores[i]))
			}
				if(userDifference < biggestDifference) {
					biggestDifference = userDifference;
					currentUserMatchName = friendsArray[j].personName;
					currentUserMatchPhoto = friendsArray[j].personPhoto;
					
				}
		}
		//Add current user to the array of possible friend matches
		friendsArray.push(currentUser);
		
		//Return match data to be displayed on HTML modal
		friendMatch = {
			name: currentUserMatchName,
			photo: currentUserMatchPhoto,
			scoreDifference: biggestDifference
		};

		response.json(friendMatch);
	});

	app.get('/api/friends', function(request, response) {
		response.json(friendMatch);
	});
}