//https://en.wikipedia.org/w/api.php
//?action=query&format=json&prop=pageimages|extracts
//&generator=search&pithumbsize=200&exsentences=1
//&gsrsearch=flensburg&gsrnamespace=0
//&gsrinfo=totalhits|suggestion|rewrittenquery
//&gsrprop=size|wordcount|timestamp|snippet

var baseApiUrl = "https://en.wikipedia.org/w/api.php";
var searchTerm = "flensburg";


//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&piprop=thumbnail&pithumbsize=200&exsentences=2&gsrsearch=flensburg&gsrnamespace=0&gsrinfo=totalhits|suggestion|rewrittenquery&gsrprop=size|wordcount|timestamp|snippet&exintro

var query = "action=query&format=json&prop=pageimages|extracts" +
            "&generator=search&piprop=thumbnail&pithumbsize=200&exsentences=2" +
            "&gsrsearch=" + searchTerm + "&gsrnamespace=0" +
            "&gsrinfo=totalhits|suggestion|rewrittenquery" +
            "&gsrprop=size|wordcount|timestamp|snippet" +
            "&exintro";
var payload = '{ "action": "query", "format": "json", "prop": "pageimages|extracts", "generator": "search", "piprop": "thumbnail", "pithumbsize": "200", "exsentences": "2", "gsrsearch": "flensburg", "gsrnamespace": "0", "gsrinfo": "totalhits|suggestion|rewrittenquery", "gsrprop": "size|wordcount|timestamp|snippet" }';
var fullUrl = baseApiUrl + query;

var cardTemplate = '<a class="card" href="https://en.wikipedia.org/wiki/%pageTitle%">' + 
'<span class="card-header" style="background-image: url(%pageImage%);">' + 
'<span class="card-title"><h3>%pageTitle%</h3></span></span>' +
'<span class="card-summary">%pageSummary%</span>' +
'<span class="card-meta">%pageMeta%</span></a>';

function fetchData() {

  // Using jQuery
  $.ajax( {
    url: baseApiUrl,
    data: query,
    dataType: 'jsonp',
    type: 'POST',
    jsonp: "callback",
    success: function(data) {
      var wikiPages = data.query.pages;


      
        var fullHtml = "";
        for (var page in wikiPages) {
          if (wikiPages.hasOwnProperty(page)) {
            var card = cardTemplate.replace(/%pageTitle%/g, wikiPages[page].title);
            if (wikiPages[page].hasOwnProperty("thumbnail"))
            {
              card = card.replace("%pageImage%", wikiPages[page].thumbnail.source);
            }
            else
            {
              card = card.replace("%pageImage%", "img/not-found.png");
            }
            card = card.replace("%pageSummary%", wikiPages[page].extract);
            card = card.replace("%pageMeta%", "Some meta data.");
            fullHtml += card;
          }
      }
      $('#cards-container').html(fullHtml);
    }
  } );

  // $.getJSON(fullUrl, (result) => {
  //   var wikiPages = result.query.pages;
  
  //   var fullHtml = "";
  //   for (var i = 0; i < wikiPages.length; i++)
  //   {
  //     var card = cardTemplate.replace("%pageTitle%", wikiPages[i].title);
  //     card = card.replace("%pageImage%", wikiPages[i].thumbnail.source);
  //     card = card.replace("%pageSummary%", wikiPages[i].extract);
  //     card = card.replace("%pageMeta%", "Some meta data.");
  //     fullHtml += card;
  //   }
  //   $('#cards-container').html(fullHtml);
  // });
}

$(document).ready(function () {
  // fetchData();
  
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
});

// $(window).load(function() {
//   $('.post-module').hover(function() {
//     $(this).find('.description').stop().animate({
//       height: "toggle",
//       opacity: "toggle"
//     }, 300);
//   });
// });