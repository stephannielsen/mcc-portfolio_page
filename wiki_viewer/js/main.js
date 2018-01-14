//https://en.wikipedia.org/w/api.php
//?action=query&format=json&prop=pageimages|extracts
//&generator=search&pithumbsize=200&exsentences=1
//&gsrsearch=flensburg&gsrnamespace=0
//&gsrinfo=totalhits|suggestion|rewrittenquery
//&gsrprop=size|wordcount|timestamp|snippet

var baseApiUrl = "https://en.wikipedia.org/w/api.php";
var linkUrl = "https://wikipedia.org/wiki/";
var searchTerm = "flensburg";


//https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&piprop=thumbnail&pithumbsize=200&exsentences=2&gsrsearch=flensburg&gsrnamespace=0&gsrinfo=totalhits|suggestion|rewrittenquery&gsrprop=size|wordcount|timestamp|snippet&exintro

var query = "action=query&format=json&prop=pageimages|extracts" +
            "&generator=search&piprop=thumbnail&pithumbsize=500&exsentences=2" +
            "&gsrsearch=" + searchTerm + "&gsrnamespace=0" +
            "&gsrinfo=totalhits|suggestion|rewrittenquery" +
            "&gsrprop=size|wordcount|timestamp|snippet" +
            "&exintro";
var payload = '{ "action": "query", "format": "json", "prop": "pageimages|extracts", "generator": "search", "piprop": "thumbnail", "pithumbsize": "200", "exsentences": "2", "gsrsearch": "flensburg", "gsrnamespace": "0", "gsrinfo": "totalhits|suggestion|rewrittenquery", "gsrprop": "size|wordcount|timestamp|snippet" }';
var fullUrl = baseApiUrl + query;

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
      
      // setting up the columns
      var numberOfColumns = 5;
      var columns = [];
      while (columns.length < numberOfColumns)
        columns.push(document.createElement("div"));
      
      var columnIndex = 0;

      for (var wikiPage in wikiPages) {
        var postModule = document.createElement("div");
        postModule.setAttribute("class", "post-module");
        var thumbnail = document.createElement("div");
        thumbnail.setAttribute("class", "thumbnail");
        // var date = document.createElement("div");
        // date.setAttribute("class", "date");
        // var day = document.createElement("div");
        // day.setAttribute("class", "day");
        // var month = document.createElement("div");
        // month.setAttribute("class", "month");
        // date.appendChild(day);
        // date.appendChild(month);
        // thumbnail.appendChild(date);
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
        // var category = document.createElement("div");
        // category.setAttribute("class", "category");
        // category.innerHTML = "Photos";
        // postContent.appendChild(category);
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
        var timestamp = document.createElement("span");
        timestamp.setAttribute("class", "timestamp");
        timestamp.innerHTML = '<a href="' + linkUrl + wikiPages[wikiPage].title + '" target="_blank">Read more...</a>';
        var comments = document.createElement("span");
        comments.setAttribute("class", "comments");
        comments.innerHTML = '<i class="fa fa-comments"></i><a href="#"> 39 comments</a>';
        postMeta.appendChild(timestamp);
        postMeta.appendChild(comments);
        postContent.appendChild(postMeta);

        postModule.appendChild(postContent);

        //add the postmodule to the correct column
        columns[columnIndex].appendChild(postModule);
        //calculate next column index and care for column break
        columnIndex = (columnIndex + 1) % numberOfColumns;
      }

      // add columns to the container
      columns.forEach(column => {
        column.setAttribute("class", "column");
        var container = document.getElementById('container');
        container.appendChild(column);
      });
    }
  } );
}

$(document).ready(function () {
  fetchData();
});

$(window).on("load", function() {
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
});