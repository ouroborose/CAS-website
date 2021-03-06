var games = [
	"Planetration",
	"LeaveMeAlone",
	"TinyWorldOfFiorella",
	"Resolute",
	"AnotherCastle",
	"DoubleHydra",
	"TenSecondsOfJoy",
    "RationsPlease",
    "SuperSeaSerpentSimulator"
];

var portfolioItemTemplatePath = "templates/portfolioItemTemplate.html";
var modalTemplatePath = "templates/modalTemplate.html";

var portfolioItemTemplate;
var modalTemplate;

var versionNum = "v.37";

var GenerateContent = function(game){
	var portfolioItem = portfolioItemTemplate.clone()[0];
	portfolioItem.id = game + "-portfolio-item";
	$("#portfolio-items").append(portfolioItem);

	var modal = modalTemplate.clone()[0];
	modal.id = game + "-portfolio-modal";
	$("#modals").append(modal);
};

var LoadPortfolioItemData = function(game, data) {
	var portfolioItem = $("#" + game + "-portfolio-item");

	var modalIdHolder = portfolioItem.find(".portfolio-link")[0];
	modalIdHolder.href = "#" + game + "-modal";

	if(data.hasOwnProperty("project-name")) {
		//console.log("setting title");
		var title = portfolioItem.find(".portfolio-item-title")[0];
		title.innerHTML = data["project-name"];
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
	var modal = $("#" + game + "-portfolio-modal");

	if(data.hasOwnProperty("modal-url")) {
		console.log("loading custom modal for " + game);
		// specific modal url was provided
		modal.empty();
		modal.load(data["modal-url"], function() {
			var loadedModal = $("#" + game + "-portfolio-modal");
			var modalIdHolder = loadedModal.find(".portfolio-modal")[0];
			modalIdHolder.id = game + "-modal";
		});
	}
	else {
		
		var modalIdHolder = modal.find(".portfolio-modal")[0];
		modalIdHolder.id = game + "-modal";

		if(data.hasOwnProperty("project-name")) {
			//console.log("setting projectHeading");
			var projectHeading = modal.find(".modal-projectHeading")[0];
			projectHeading.innerHTML = data["project-name"];
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
	}
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