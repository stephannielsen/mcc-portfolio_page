WikiViewer = {
  baseApiUrl: "https://en.wikipedia.org/w/api.php",
  linkUrl: "https://wikipedia.org/wiki/",
  queryTemplate:
    "action=query&format=json&prop=pageimages|extracts" +
    "&generator=search&piprop=thumbnail&pithumbsize=500&exsentences=2" +
    "&gsrsearch=<searchTerm>&gsrnamespace=0" +
    "&gsrinfo=totalhits|suggestion|rewrittenquery" +
    "&gsrprop=size|wordcount|timestamp|snippet" +
    "&exintro" +
    "&gsroffset=<gsroffset>",
  fetchWikiData: function(searchTerm, offset) {
    var cardsContainer = document.getElementById("cards");
    if (offset === 0) $(cardsContainer).empty();
    // inject the search term into the query template
    var query = WikiViewer.queryTemplate
      .replace("<searchTerm>", searchTerm)
      .replace("<gsroffset>", offset);
    $.ajax({
      url: WikiViewer.baseApiUrl,
      data: query,
      dataType: "jsonp",
      type: "POST",
      jsonp: "callback",
      success: function(data) {
        if (data.query !== undefined) {
          WikiViewer.injectCards(data.query.pages, cardsContainer);
          WikiViewer.addLoadMoreButton(cardsContainer, searchTerm, data.continue.gsroffset);
          WikiViewer.addHoverAnimation();
        } else {
          WikiViewer.setStatus(
            '<p><i class="material-icons">sentiment_very_dissatisfied</i><br>Nothing found...</p>'
          );
        }
      }
    });
  },
  injectCards: function(wikiPages, cardsContainer) {
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
      description.innerHTML = wikiPages[wikiPage].extract
        .replace("<p>", "")
        .replace("</p>", "");
      postContent.appendChild(description);

      var postMeta = document.createElement("div");
      postMeta.setAttribute("class", "post-meta");
      var readMore = document.createElement("span");
      readMore.setAttribute("class", "read_more");
      readMore.innerHTML =
        '<a href="' +
        WikiViewer.linkUrl +
        wikiPages[wikiPage].title +
        '" target="_blank">Read more...</a>';
      postMeta.appendChild(readMore);
      postContent.appendChild(postMeta);

      postModule.appendChild(postContent);

      $("#status").css("display", "none");
      cardsContainer.appendChild(postModule);
    }
  },
  addLoadMoreButton: function(cardsContainer, searchTerm, offset) {
    var loadMore = document.createElement("div");
    loadMore.setAttribute("class", "load-more");
    loadMore.innerHTML =
      '<p><a href="#" id="load_more" title="Load More" class="button">Load More</a></p>';
    cardsContainer.appendChild(loadMore);
    $("#load_more").on("click", function(e) {
      e.preventDefault();
      loadMore.outerHTML = "";
      WikiViewer.fetchWikiData(searchTerm, offset);
    });
  },
  addHoverAnimation: function() {
    $(".post-module").unbind("mouseenter mouseleave");
    $(".post-module").hover(function() {
      $(this)
        .find(".description")
        .stop()
        .animate(
          {
            height: "toggle",
            opacity: "toggle"
          },
          300
        );
    });
  },
  setStatus: function(statusHtml) {
    var status = $("#status");
    status.html(statusHtml);
    status.css("display", "block");
  }
};

$(window).on("load", function() {
  $("#search_form").on("submit", function(e) {
    e.preventDefault();

    WikiViewer.setStatus(
      '<p><i class="material-icons">sentiment_satisfied</i><br>Rumble rumble rumble...</p>'
    );
    WikiViewer.fetchWikiData($("#search_term").val(), 0);
  });
});