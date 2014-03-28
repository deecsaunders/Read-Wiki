$(function() {
	$("#results").hide();
      $("#searchterm").keyup(function(e){
      	$("#results").show();
        var q = $("#searchterm").val();
        
        $.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
        {
          srsearch: q,
          action: "query",
          list: "search",
          srlimit: "5",
          format: "json"
        },
        function(data) {
          $("#results").empty();
         
          $.each(data.query.search, function(i,item){
            $("#results").append("<a href='http://en.wikipedia.org/wiki/" + encodeURIComponent(item.title) + "'><div>" + item.title + "</div></a>");
            
            //Get all anchors href attribute content
			var old_fulladdr = $('a').attr('href');
			
			//strip the title of the page
			var old_addr_parts = old_fulladdr.split('/wiki/');
              
          });
        });
      });

	//clear search box on focus
	$('#searchterm').on('click focusin', function() {
    	this.value = '';
    	$(this).addClass('active');
	});	
	
	//Stuff is being entered into the input box
	$("#searchterm").keyup(function(event){
	
	//Checks to see if the enter key is pressed
	if(event.keyCode == 13){
		$("#searchterm").blur();
		$("#results").hide();
		//places search text into a usable variable
		var searchTerm = this.value; 		
			
		//Store API call
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
			$("p a, .thumbcaption a, .rellink a").replaceWith(function(){ 
				var link = $(this).text(); 
				$cleanlink = ("<span class='innerlink'>"+link+"</span>");
				return $cleanlink;
			});
			
			//Get all anchors href attribute content
			var old_fulladdr = $('a').attr('href');
			
			//strip the title of the page
			var old_addr_parts = old_fulladdr.split('/wiki/');
			
		
    
        var iTotalWords = $("p").text().split(' ').length;
        
        var x = iTotalWords;
        switch (true) { 
        	case (x < 40): 
				$('#wordcount').html("Under 60secs");
			break;
			case (x < 80): 
				$('#wordcount').html("1 Min Read");
			break; 
			case (x < 120): 
				$('#wordcount').html("2 Min Read");
			break;
			case (x < 240): 
				$('#wordcount').html("3 Min Read");
			break;
			case (x < 480): 
				$('#wordcount').html("5 Min Read");
			break;
			case (x < 1000): 
				$('#wordcount').html("10 Min Read");
			break;
			case (x < 1500): 
				$('#wordcount').html("15 Min Read");
			break;
			case (x < 2000): 
				$('#wordcount').html("20 Min Read");
			break;
			case (x < 3000): 
				$('#wordcount').html("30 Min Read");
			break;
			case (x < 4000): 
				$('#wordcount').html("40 Min Read");
			break;
			case (x < 5000): 
				$('#wordcount').html("50 Min Read");
			break;
			case (x > 5000): 
				$('#wordcount').html("Over 1hr to Read");
			break;
        }
				
		});//End of data from page
	}//End of if enter is pressed
});	//end of stuff entered in input box	

//If an inner link is clicked
$("body").on('click', '.innerlink, .mw-redirect, a', function(e) {
	$("#results").hide();
	//places search text into a usable variable
	var searchTerm = $(this).text(); 		
	$('#searchterm').val(searchTerm);	
	
	//Store api call
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
		
		$("p a, .thumbcaption a, .mainarticle a").replaceWith(function(){ 
		  var link = $(this).text(); 
		  $cleanlink = ("<span class='innerlink'>"+link+"</span>");
		  return $cleanlink;
		});					
		
		//Get all anchors href attribute content
		var old_fulladdr = $('a').attr('href');
			
		//strip the title of the page
		var old_addr_parts = old_fulladdr.split('/wiki/');
		
		 var iTotalWords = $("p").text().split(' ').length;
        
        var x = iTotalWords;
        switch (true) { 
        	case (x < 40): 
				$('#wordcount').html("Under 60secs");
			break;
			case (x < 80): 
				$('#wordcount').html("1 Min Read");
			break; 
			case (x < 120): 
				$('#wordcount').html("2 Min Read");
			break;
			case (x < 240): 
				$('#wordcount').html("3 Min Read");
			break;
			case (x < 480): 
				$('#wordcount').html("5 Min Read");
			break;
			case (x < 1000): 
				$('#wordcount').html("10 Min Read");
			break;
			case (x < 1500): 
				$('#wordcount').html("15 Min Read");
			break;
			case (x < 2000): 
				$('#wordcount').html("20 Min Read");
			break;
			case (x < 3000): 
				$('#wordcount').html("30 Min Read");
			break;
			case (x < 4000): 
				$('#wordcount').html("40 Min Read");
			break;
			case (x < 5000): 
				$('#wordcount').html("50 Min Read");
			break;
			case (x > 5000): 
				$('#wordcount').html("Over 1hr to Read");
			break;
        }
		
	});//End of data from page
	window.scrollTo(0, 0);
});

//If an inner link is clicked
$("body").on('click', '.mw-redirect, a, #results a', function(e) {
		event.preventDefault();
	
	//places search text into a usable variable
	var searchTerm = $(this).attr(old_addr_parts[1]); 	
	alert(searchTerm);
	$('#searchterm').val(searchTerm);	
	
	//Store api call
	var url="http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles="+searchTerm+"&rvprop=timestamp|user|comment|content";
		
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
		
		$("p a, .thumbcaption a, .mainarticle a, a").replaceWith(function(){ 
		  var link = $(this).text(); 
		  $cleanlink = ("<span class='innerlink'>"+link+"</span>");
		  return $cleanlink;
		});
		
		 var iTotalWords = $("p").text().split(' ').length;
        
        var x = iTotalWords;
        switch (true) { 
        	case (x < 40): 
				$('#wordcount').html("Under 60secs");
			break;
			case (x < 80): 
				$('#wordcount').html("1 Min Read");
			break; 
			case (x < 120): 
				$('#wordcount').html("2 Min Read");
			break;
			case (x < 240): 
				$('#wordcount').html("3 Min Read");
			break;
			case (x < 480): 
				$('#wordcount').html("5 Min Read");
			break;
			case (x < 1000): 
				$('#wordcount').html("10 Min Read");
			break;
			case (x < 1500): 
				$('#wordcount').html("15 Min Read");
			break;
			case (x < 2000): 
				$('#wordcount').html("20 Min Read");
			break;
			case (x < 3000): 
				$('#wordcount').html("30 Min Read");
			break;
			case (x < 4000): 
				$('#wordcount').html("40 Min Read");
			break;
			case (x < 5000): 
				$('#wordcount').html("50 Min Read");
			break;
			case (x > 5000): 
				$('#wordcount').html("Over 1hr to Read");
			break;
        }
		
	});//End of data from page
	window.scrollTo(0, 0);
});


   

});//Ends jQuery