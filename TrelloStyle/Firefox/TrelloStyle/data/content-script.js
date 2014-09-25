// content-script.js

window.URL = window.webkitURL || window.URL;

var storyColor = "white",
	mantisColor = "#F1A1B1",
	taskColor = "#DEFFAC",
	doneColor = "#C3C3C3"
	
function getCardTitle(card) {
	return card.find("div.list-card-details").find("a.list-card-title");
}

function isStoryCard(card) {					
	return getCardTitle(card).text().match(/\([0-9]*[.]*[0-9]*\)/i);
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

function colorTasks() {
	
	$("div.list-cards").each(
		function( index ) {
		
			var isAfterDone = false;
			
			$(this).find("div.list-card").each(
				function(index2){
				
					var isDone = isDoneCard($(this)); 
			
					if( isAfterDone  ) {
						$(this).css("background-color",doneColor);
					}
					else if(isDone) {
					
						var title = getCardTitle($(this));
					
						var isStyled = title.find("hr").length > 0;
					
						if( ! isStyled ) {
							
							title.contents().filter(
								function(){ 
								  return this.nodeType == 3; 
								})[0].nodeValue = "";
								
							title.append("<hr />");
							$(this).css("background-color",doneColor);
						}
					
						isAfterDone = true;
					}
					else {

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
				}
			)
		}
	);
	
}

// on DOM load
$(function () {
    "use strict";	
	
    setInterval(colorTasks, 500);
});