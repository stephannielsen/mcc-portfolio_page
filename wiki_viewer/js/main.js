//https://en.wikipedia.org/w/api.php
//?action=query&format=json&prop=pageimages|extracts
//&generator=search&pithumbsize=200&exsentences=1
//&gsrsearch=flensburg&gsrnamespace=0
//&gsrinfo=totalhits|suggestion|rewrittenquery
//&gsrprop=size|wordcount|timestamp|snippet

var baseApiUrl = "https://en.wikipedia.org/w/api.php";
var linkUrl = "https://wikipedia.org/wiki/";


//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&piprop=thumbnail&pithumbsize=200&exsentences=2&gsrsearch=flensburg&gsrnamespace=0&gsrinfo=totalhits|suggestion|rewrittenquery&gsrprop=size|wordcount|timestamp|snippet&exintro

var queryTemplate = "action=query&format=json&prop=pageimages|extracts" +
            "&generator=search&piprop=thumbnail&pithumbsize=500&exsentences=2" +
            "&gsrsearch=<searchTerm>&gsrnamespace=0" +
            "&gsrinfo=totalhits|suggestion|rewrittenquery" +
            "&gsrprop=size|wordcount|timestamp|snippet" +
            "&exintro" +
            "&gsroffset=<grsoffset>";


function fetchData(searchTerm, offset) {
  var container = document.getElementById('cards');
  if (offset === 0)
    $(container).empty();
  // inject the search term into the query template
  var query = queryTemplate.replace("<searchTerm>", searchTerm).replace("<grsoffset>", offset);
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
          
          $('#status').css("display", "none");
          container.appendChild(postModule);
        }
        var loadMore = document.createElement("div");
        loadMore.setAttribute("class", "load-more");
        loadMore.innerHTML = '<p><a href="#" id="load_more" title="Load More" class="button">Load More</a></p>';
        container.appendChild(loadMore);
        $('#load_more').on("click", function(e) {
          e.preventDefault();
          loadMore.outerHTML = "";
          fetchData(searchTerm, data.continue.gsroffset)

        })
      }
      else {
        var status = $('#status');
        status.html('<p><i class="material-icons">sentiment_very_dissatisfied</i><br>Nothing found...</p>');
        status.css("display", "block");
      }
      
      $('.post-module').hover(function() {
        $(this).find('.description').stop().animate({
          height: "toggle",
          opacity: "toggle"
        }, 300);
      });
    }
  } );
}

$(window).on("load", function() {
  $('#search_form').on('submit', function(e){
      e.preventDefault();
      
      var status = $('#status');
      status.html('<p><i class="material-icons">sentiment_satisfied</i><br>Rumble rumble rumble...</p>');
      status.css("display", "block");

      fetchData($('#search_term').val(), 0);
  });
});