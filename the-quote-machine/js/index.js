//Called when Generate button is clicked
$(".generate").click(function(){
  
  //Forismatic API being used for getting random quotes
  $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(quoteGenerator).fail(handleErr);
});

function quoteGenerator(response){
  $("#quoteText").fadeOut('slow',function(){
    $(this).html(response["quoteText"]+"<br><i>- "+response["quoteAuthor"]+"</i>").fadeIn();
  });
}

function handleErr(jqxhr, textStatus, err) {
  alert("Request Failed: " + textStatus + ", " + err);
}

//Called when Tweet button is clicked
function tweetQuote(){
 $("#tweet").attr("href","https://twitter.com/intent/tweet?text="+$("#quoteText").text());
}