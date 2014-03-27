$(function() {
	//clear search box on focus
	$('#searchterm').on('click focusin', function() {
    this.value = '';
	});	
	
	//Stuff is being entered into the input box
	$("#searchterm").keyup(function(event){
		




  
			//Checks to see if the enter key is pressed
		if(event.keyCode == 13){
			$("#searchterm").blur();
			
			//places search text into a usable variable
			var searchTerm = this.value; 		
				
			//Places api call in to variable
			var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + searchTerm +"&redirects&rvprop=content&rvsection=0&callback=?";
				
			//Retrieves data from page
			$.getJSON(url,function(data){
						$wikiHTML = data.parse.text["*"];
						
						//places page data into variable
						$wikiDOM = $("<div>"+$wikiHTML+"</div>");	
						
						//place info in the infobox
						$(".info").html($wikiDOM.find('.infobox').html());
						
						//Adds content in variable to the div
						$(".content").html($wikiDOM);
						
						//Hide things
						$(".toc,.dablink,.infobox,.navbox,.metadata,.vertical-navbox").hide();
						
						$("p a, .thumbcaption a").replaceWith(function(){ 
						  var link = $(this).text(); 
						  $cleanlink = ("<span class='innerlink'>"+link+"</span>");
						  return $cleanlink;
						});				
											
			});//End of data from page
		}//End of if enter is pressed
	});	//end of stuff entered in input box	

//If an inner link is clicked

$("body").on('click', '.innerlink', function(e) {	
		
		//places search text into a usable variable
		var searchTerm = $(this).text(); 		
		$('#searchterm').val(searchTerm);	
		
		//Places api call in to variable
			var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + searchTerm +"&redirects&rvprop=content&rvsection=0&callback=?";
				
			//Retrieves data from page
			$.getJSON(url,function(data){
						$wikiHTML = data.parse.text["*"];
						
						//places page data into variable
						$wikiDOM = $("<div>"+$wikiHTML+"</div>");	
						
						//place info in the infobox
						$(".info").html($wikiDOM.find('.infobox').html());
						
						//Adds content in variable to the div
						$(".content").html($wikiDOM);
						
						//Hide things
						$(".toc,.dablink,.infobox,.navbox,.metadata,.vertical-navbox").hide();
						
						$("p a, .thumbcaption a").replaceWith(function(){ 
						  var link = $(this).text(); 
						  $cleanlink = ("<span class='innerlink'>"+link+"</span>");
						  return $cleanlink;
						});
						
											
			});//End of data from page
			window.scrollTo(0, 0);
});	


});//Ends jQuery
	
	
	
	
