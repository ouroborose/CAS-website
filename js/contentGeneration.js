var games = [
    "RationsPlease",
    "SuperSeaSerpentSimulator"
];

var portfolioItemTemplatePath = "templates/portfolioItemTemplate.html";
var modalTemplatePath = "templates/modalTemplate.html";

var portfolioItemTemplate;
var modalTemplate;

var versionNum = "v.25";

var GeneratePortfolioItem = function(data) {
	var portfolioItem = portfolioItemTemplate.clone();

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

	$("#portfolio-items").append(portfolioItem);
};

var GenerateModal = function(data) {
	//var modal = $("<div>").load(modalTemplatePath);
	var modal = modalTemplate.clone();

	if(data.hasOwnProperty("id")) {
		//console.log("setting id");
		var modalIdHolder = modal.find(".portfolio-modal")[0];
		modalIdHolder.id = "#" + data["id"] + "-modal";
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

	if(data.hasOwnProperty("modal-body")) {
		//console.log("setting body");
		var body = modal.find(".modal-body")[0];
		body.innerHTML = data["modal-body"];
		//console.log(body);
	}
	else {
		console.log("missing modal body");
	}

	console.log(modal);
	$("#modals").append(modal);
};

var GenerateFromJson = function(data) {
	//console.log(data);
	GeneratePortfolioItem(data);
	GenerateModal(data);
};

var GenerateContent = function(game) {
	//console.log("Generating content for " + game);
	$.getJSON("data/" + game + ".json", null, GenerateFromJson);
};

$(document).ready(function() {
	console.log(versionNum);

	portfolioItemTemplate = $('<div>').load(portfolioItemTemplatePath, function() { // load the portfolio item template
		modalTemplate = $('<div>').load(modalTemplatePath, function() { // load the modal template
			// fill in the data
			for (var i = games.length - 1; i >= 0; i--) {
				var game = games[i];
				GenerateContent(game);
			}
		});
	});

	
});