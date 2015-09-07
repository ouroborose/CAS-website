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

	if(data.hasOwnProperty("id"))
	{
		var modalIdHolder = portfolioItem.find("#portfolio-item-modal-id");
		modalIdHolder.href = "#" + data["id"] + "-modal";
	}

	if(data.hasOwnProperty("portfolio-item-title"))
	{
		var title = portfolioItem.find("#portfolio-item-title");
		title.innerHTML = data["portfolio-item-title"];
	}
	
	if(data.hasOwnProperty("portfolio-item-image"))
	{
		var image = portfolioItem.find("#portfolio-item-image");
		image.src = data["portfolio-item-image"];
	}

	$("#portfolio-items").append(portfolioItem);
};

var GenerateModal = function(data)
{
	var modal = $("<div>").load(modalTemplate);
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