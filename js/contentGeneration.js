var games = [
    "SuperSeaSerpentSimulator",
    "RationsPlease"
];

var portfolioItemTemplate = "templates/portfolioItemTemplate.html";
var modalTemplate = "templates/modalTemplate.html";

var versionNum = "v.22";

var GeneratePortfolioItem = function(data)
{
	var portfolioItem = $('<div id="'+ data['id'] +'-portfolio-item">').load(portfolioItemTemplate, function() {
		var item = $("#"+data['id'] +"-portfolio-item");
		if(data.hasOwnProperty("id"))
		{
			console.log("setting id");
			var modalIdHolder = item.find(".portfolio-link")[0];
			modalIdHolder.href = "#" + data["id"] + "-modal";
			console.log(modalIdHolder);
		}
		else
		{
			console.log("missing id");
		}

		if(data.hasOwnProperty("portfolio-item-title"))
		{
			console.log("setting title");
			var title = item.find(".portfolio-item-title")[0];
			title.innerHTML = data["portfolio-item-title"];
			console.log(title);
		}
		else
		{
			console.log("missing title");
		}

		
		if(data.hasOwnProperty("portfolio-item-image"))
		{
			console.log("setting image");
			var image = item.find(".portfolio-item-image")[0];
			image.src = data["portfolio-item-image"];
			console.log(image);
		}
		else
		{
			console.log("missing image");
		}

		console.log(portfolioItem);
	});

	
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
	console.log(versionNum);
	for (var i = games.length - 1; i >= 0; i--) {
		var game = games[i];
		GenerateContent(game);
	}
});