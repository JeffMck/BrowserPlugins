// content-script.js

window.URL = window.webkitURL || window.URL;

var storyColor = "white",
	mantisColor = "#D89090"; //"#F1A1B1",
	taskColor = "#D8E2EE"; //"#DEFFAC",
	doneColor = "#C3C3C3"
	
function getCardTitle(card) {
	return card.find("div.list-card-details").find("a.list-card-title");
}

function isStoryCard(card) {					
	return getCardTitle(card).text().match(/\([0-9]*[.]*[0-9]*\)/i)
	|| card.find("div.badge-points:not(:empty)").length > 0;
}

function isMantisCard(card) {					
	return getCardTitle(card).text().match(/m[0-9]{4,6}/i);
}

function isTaskCard(card) {
	return ! ( isMantisCard(card) || isStoryCard(card) );
}

function isDoneCard(card) {		
	var title = getCardTitle(card);
	return title.text().match(/-{3,}\s*done\s*-{3,}/i) || title.find("hr").length > 0;
}

function colorTasks(list) {
	
	list.find("div.list-cards").each(
		function( index ) {
		
			var isAfterDone = false;
			
			$(this).find("div.list-card").each(
				function(index2){				

					if( isStoryCard($(this)) )
					{
						$(this).css("background-color",storyColor);
					}
					
					if( isMantisCard($(this)) )
					{
						$(this).css("background-color",mantisColor);
					}
					
					if( isTaskCard($(this)) )
					{
						$(this).css("background-color",taskColor);
					}
				}
			)
		}
	);
}

function colorDoneTasks(list) {

	//$("div.list").find()
	list.find("div.list-cards").each(
	
		function( index ) {
		
			var isAfterDone = false;
			
			$(this).find("div.list-card").each(
			
				function(index2){
			
					if( isAfterDone  ) {
						$(this).css("background-color",doneColor);
					}
					else if(isDoneCard($(this))) {
					
						var title = getCardTitle($(this));
					
						var isStyled = title.find("hr").length > 0;
					
						if( ! isStyled ) {					
							title.css("color","rgba(0,0,0,0)");
							title.css("line-height","0px");
							title.css("height","5px");
								
							title.append("<hr />");
							title.find("hr").css("margin","0");
						}
						
						$(this).css("background-color",doneColor);
							
						isAfterDone = true;
					}
				}
			);
		
		}
		
	);
}

function colorLanes() {
	$("div.list").each(
		function( index3 ) {
			if( $(this).find("h2.list-header-name").text().match(/^\s*[0-9]+\s*\|/i) )
			{
				colorTasks( $(this) );
				colorDoneTasks( $(this) );
			}
		}
	)
}

// on DOM load
$(function () {
    "use strict";	
	
	if( $("span.board-header-btn-text").text().match(/ascent/i) ) {
		//setInterval(colorTasks, 500);
		
		setInterval(colorLanes, 500);
	};
	
});