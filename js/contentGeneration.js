var games = [
    "SuperSeaSerpentSimulator",
];


var GenerateFromJason = function(data)
{
	console.log(data);
};

var GenerateContent = function(game)
{
	$.getJSON("data/" + game + ".json", null, GenerateFromJason);
	//console.log("Loading " + game);
    //$("#modals").append($("<div>").load("modals/" + game + ".html"));
};

$(document).ready(function(){
	for (var i = games.length - 1; i >= 0; i--) {
		var game = games[i];
		GenerateContent(game);
	}
});