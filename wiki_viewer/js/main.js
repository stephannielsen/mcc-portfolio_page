//https://en.wikipedia.org/w/api.php
//?action=query&format=json&prop=pageimages|extracts
//&generator=search&pithumbsize=200&exsentences=1
//&gsrsearch=flensburg&gsrnamespace=0
//&gsrinfo=totalhits|suggestion|rewrittenquery
//&gsrprop=size|wordcount|timestamp|snippet

var baseApiUrl = "https://en.wikipedia.org/w/api.php";
var linkUrl = "https://wikipedia.org/wiki/";
var initialSearchTerm = "flensburg";


//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&piprop=thumbnail&pithumbsize=200&exsentences=2&gsrsearch=flensburg&gsrnamespace=0&gsrinfo=totalhits|suggestion|rewrittenquery&gsrprop=size|wordcount|timestamp|snippet&exintro

var queryTemplate = "action=query&format=json&prop=pageimages|extracts" +
            "&generator=search&piprop=thumbnail&pithumbsize=500&exsentences=2" +
            "&gsrsearch=searchTerm&gsrnamespace=0" +
            "&gsrinfo=totalhits|suggestion|rewrittenquery" +
            "&gsrprop=size|wordcount|timestamp|snippet" +
            "&exintro";

function fetchData(searchTerm) {
  var container = document.getElementById('cards');
  $(cards).empty();
  // inject the search term into the query template
  var query = queryTemplate.replace("searchTerm", searchTerm);
  $.ajax( {

    url: baseApiUrl,
    data: query,
    dataType: 'jsonp',
    type: 'POST',
    jsonp: "callback",
    success: function(data) {
      if (data.query !== undefined) {
        var wikiPages = data.query.pages; 
  
        for (var wikiPage in wikiPages) {
          var postModule = document.createElement("div");
          postModule.setAttribute("class", "post-module");
          var thumbnail = document.createElement("div");
          thumbnail.setAttribute("class", "thumbnail");
          var image = document.createElement("img");
          if (wikiPages[wikiPage].hasOwnProperty("thumbnail")) {
            image.setAttribute("src", wikiPages[wikiPage].thumbnail.source);
          } else {
            image.setAttribute("src", "img/not-found.png");
          }
          image.setAttribute("alt", wikiPages[wikiPage].title);
          image.setAttribute("title", wikiPages[wikiPage].title);
          thumbnail.appendChild(image);
  
          postModule.appendChild(thumbnail);
  
          var postContent = document.createElement("div");
          postContent.setAttribute("class", "post-content");
          var title = document.createElement("h1");
          title.setAttribute("class", "title");
          title.innerHTML = wikiPages[wikiPage].title;
          postContent.appendChild(title);
  
          var subTitle = document.createElement("h2");
          subTitle.setAttribute("class", "sub_title");
          postContent.appendChild(subTitle);
  
          var description = document.createElement("p");
          description.setAttribute("class", "description");
          description.innerHTML = wikiPages[wikiPage].extract.replace("<p>", "").replace("</p>", "");
          postContent.appendChild(description);
  
          var postMeta = document.createElement("div");
          postMeta.setAttribute("class", "post-meta");
          var readMore = document.createElement("span");
          readMore.setAttribute("class", "read_more");
          readMore.innerHTML = '<a href="' + linkUrl + wikiPages[wikiPage].title + '" target="_blank">Read more...</a>';
          postMeta.appendChild(readMore);
          postContent.appendChild(postMeta);
  
          postModule.appendChild(postContent);
  
          container.appendChild(postModule);
        }
      }
      else {
        var nothingFound = document.createElement("p");
        nothingFound.innerHTML = 'Wikipedia does not know what you are looking for <i class="fa fa-frown-o" aria-hidden="true"></i>';
        container.appendChild(nothingFound);
      }
    }
  } );
}

$(document).ready(function () {
  fetchData(initialSearchTerm);
});

$(window).on("load", function() {
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
  $('#search_button').click(function() {
    fetchData($('#search_term').val());
  });
});