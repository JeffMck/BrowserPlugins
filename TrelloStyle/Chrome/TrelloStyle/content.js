window.URL = window.webkitURL || window.URL;

function colorTasks() {
	
	$("div.list-cards").each(
		function( index ) {
		
			var isAfterDone = false;
			
			$(this).find("div.list-card").each(
				function(index2){
				
				var title = $(this).find("div.list-card-details").find("a.list-card-title");
			
				var isDone = title.text().match(/-{3,}\s*done\s*-{3,}/i) || title.find("hr").length > 0;
			
					if( isAfterDone  ) {
						$(this).css("background-color","#C3C3C3");
					}
					else if(isDone) {
					
						var isStyled = title.find("hr").length > 0;
					
						if( ! isStyled ) {
							
							title.contents().filter(
								function(){ 
								  return this.nodeType == 3; 
								})[0].nodeValue = "";
								
							title.append("<hr />");
							$(this).css("background-color","#C3C3C3");
						}
					
						isAfterDone = true;
					}
					else {
					
						var isStory = title.text().match(/\([0-9]*[.]*[0-9]*\)/i);
						var isMantis = title.text().match(/m[0-9]{4,6}/i);
					
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