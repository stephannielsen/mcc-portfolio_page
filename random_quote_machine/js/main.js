var firstLoad = true;
function adjustColors() {
  /* start colors:
    - background: 558C00
    - quote area: 84D900
    - font: 290033
    - buttons: 290033
    - button font: 9BFF00
    - button hover: 558C00
  */

  var style = document.styleSheets[0];

  //delete the rules for pseudo classesthat have been inserted before first
  //except on first load as they dont exist at that point
  if (!firstLoad) {
    style.deleteRule(0);
    style.deleteRule(0);
    style.deleteRule(0);
  }
  var adjustBy = Math.floor(Math.random() * (720 - 0) + 0 - 360);

  //use tinycolor to adjust the hue
  var background = tinycolor("#558c00").spin(adjustBy).toString();
  var quoteBackground = tinycolor("#84D900").spin(adjustBy).toString();
  var font = tinycolor("#290033").spin(adjustBy).toString();
  var buttonFont = tinycolor("#9BFF00").spin(adjustBy).toString();

  //jquery cant modify pseudo classes so inject rule to stylesheet for those
  style.insertRule(".btn { background-color: " + font + "; color: " + buttonFont + " }", 0);
  style.insertRule(".btn:hover { background-color: " + background + "; }", 0);
  style.insertRule(".btn:visited { background-color: " + font + "; }", 0);

  //modify rest of the elements via jquery
  $('body').css('background-color', background);
  $('body').css('color', font);
  $('#quote-container').css('background-color', quoteBackground);
  // $('.btn').css('background-color', font);
  // $('.btn').css('color', buttonFont);
  $('#copyright').css('color', quoteBackground);

  //set this to false so we delete the injected style rules on next run
  firstLoad = false;
}


function getQuote() {
  $("#refreshIcon").addClass("fa-spin");
  $.getJSON("http://quotes.stormconsultancy.co.uk/random.json", function (json) {
    var currentQuote = json.quote;
    var currentQuoteAuthor = json.author;
    $("#quote").html('<i class="material-icons fa-rotate-180">format_quote</i>'
      + currentQuote
      + '<i class="material-icons">format_quote</i>');
    $("#author").html(currentQuoteAuthor);
    $("#refreshIcon").removeClass("fa-spin");
    $("#tweet").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='
      + encodeURIComponent('"' + currentQuote + '"' + currentQuoteAuthor));

    adjustColors();
  });
}


$(document).ready(function () {
  getQuote();
  $("#getQuote").on("click", function () {
    getQuote();
  });
});