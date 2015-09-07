var games = [
    "RationsPlease",
    "SuperSeaSerpentSimulator"
];

var portfolioItemTemplatePath = "templates/portfolioItemTemplate.html";
var modalTemplatePath = "templates/modalTemplate.html";

var portfolioItemTemplate;
var modalTemplate;

var versionNum = "v.29";

var GenerateContent = function(game){
	var portfolioItem = portfolioItemTemplate.clone();
	portfolioItem.id = game + "-portfolio-item";
	$("#portfolio-items").append(portfolioItem);

	var modal = modalTemplate.clone();
	modal = game + "-portfolio-modal";
	$("#modals").append(modal);
};

var LoadPortfolioItemData = function(game, data) {
	var portfolioItem = $("#"+game+"-portfolio-item");

	if(data.hasOwnProperty("id")) {
		//console.log("setting id");
		var modalIdHolder = portfolioItem.find(".portfolio-link")[0];
		modalIdHolder.href = "#" + data["id"] + "-modal";
		//console.log(modalIdHolder);
	}
	else {
		console.log("missing id");
	}

	if(data.hasOwnProperty("portfolio-item-title")) {
		//console.log("setting title");
		var title = portfolioItem.find(".portfolio-item-title")[0];
		title.innerHTML = data["portfolio-item-title"];
		//console.log(title);
	}
	else {
		console.log("missing portfolio item title");
	}

	
	if(data.hasOwnProperty("portfolio-item-image")) {
		//console.log("setting image");
		var image = portfolioItem.find(".portfolio-item-image")[0];
		image.src = data["portfolio-item-image"];
		//console.log(image);
	}
	else {
		console.log("missing portfolio item image");
	}

	//console.log(portfolioItem);
};

var LoadModalData = function(game, data) {
	var modal = $("#"+game+"-portfolio-modal");

	if(data.hasOwnProperty("id")) {
		//console.log("setting id");
		var modalIdHolder = modal.find(".portfolio-modal")[0];
		modalIdHolder.id = data["id"] + "-modal";
		//console.log(modalIdHolder);
	}
	else {
		console.log("missing id");
	}

	if(data.hasOwnProperty("modal-projectHeading")) {
		//console.log("setting projectHeading");
		var projectHeading = modal.find(".modal-projectHeading")[0];
		projectHeading.innerHTML = data["modal-projectHeading"];
		//console.log(projectHeading);
	}
	else {
		console.log("missing modal project heading");
	}

	if(data.hasOwnProperty("modal-intro")) {
		//console.log("setting intro");
		var intro = modal.find(".modal-intro")[0];
		intro.innerHTML = data["modal-intro"];
		//console.log(intro);
	}
	else {
		console.log("missing modal intro");
	}

	if(data.hasOwnProperty("modal-img")) {
		//console.log("setting image");
		var image = modal.find(".modal-img")[0];
		image.src = data["modal-img"];
		//console.log(image);
	}
	else {
		console.log("missing modal image");
	}

	if(data.hasOwnProperty("modal-html")) {
		//console.log("setting html");
		var html = modal.find(".modal-html")[0];
		html.innerHTML = data["modal-html"];
		//console.log(html);
	}
	else {
		console.log("missing modal html");
	}

	//console.log(modal);
};

var LoadFromJson = function(game, data) {
	//console.log(data);
	LoadPortfolioItemData(game, data);
	LoadModalData(game, data);
};

var LoadContent = function(game) {
	//console.log("Generating content for " + game);
	$.getJSON("data/" + game + ".json", null, function(data) {
		LoadFromJson(game, data);
	});
};

$(document).ready(function() {
	console.log(versionNum);

	portfolioItemTemplate = $('<div>').load(portfolioItemTemplatePath, function() { // load the portfolio item template
		modalTemplate = $('<div>').load(modalTemplatePath, function() { // load the modal template
			// fill in the data
			for (var i = games.length - 1; i >= 0; i--) {
				var game = games[i];
				GenerateContent(game); // generate first to ensure ordering
				LoadContent(game);
			}
		});
	});
});