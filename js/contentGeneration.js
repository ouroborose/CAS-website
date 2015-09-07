var games = [
    "SuperSeaSerpentSimulator",
    "RationsPlease"
];

var portfolioItemTemplate = "templates/portfolioItemTemplate.html";
var modalTemplate = "templates/modalTemplate.html";

var GeneratePortfolioItem = function(data)
{
	var portfolioItem = $("<div>").load(portfolioItemTemplate);
	console.log(portfolioItem);

	$("#portfolio-items").append(portfolioItem);
};

var GenerateModal = function(data)
{
	var modal = $.load(modalTemplate);
	console.log(modal);

	$("#modals").append(modal);
};

var GenerateFromJson = function(data)
{
	console.log(data);
	GeneratePortfolioItem(data);
	GenerateModal(data);
};

var GenerateContent = function(game)
{
	console.log("Generating content for " + game);
	$.getJSON("data/" + game + ".json", null, GenerateFromJson);
};

$(document).ready(function(){
	for (var i = games.length - 1; i >= 0; i--) {
		var game = games[i];
		GenerateContent(game);
	}
});