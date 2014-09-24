window.URL = window.webkitURL || window.URL;

function colorTasks() {
	
	$("div.list-cards").each(
		function( index ) {
			var isAfterDelete = false;
			$(this).find("div.list-card").each(
				function( index2 ){
					if( isAfterDelete || ! ( $(this).find(":contains('---done---')").length == 0 ) ) {
						$(this).css("background-color","#C3C3C3");
						isAfterDelete = true;
					}
					else {
					
						var isStory = $(this).find("div.list-card-details").find("a.list-card-title").text().match(/\([0-9]*[.]*[0-9]*\)/i);
						var isMantis = $(this).find("div.list-card-details").find("a.list-card-title").text().match(/m[0-9]{4,6}/i)
					
						if( isStory )
						{
							$(this).css("background-color","white");
						}
						
						if( isMantis )
						{
							$(this).css("background-color","#F1A1B1");
						}
						
						if( isStory == null && isMantis == null )
						{
							$(this).css("background-color","#DEFFAC");
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