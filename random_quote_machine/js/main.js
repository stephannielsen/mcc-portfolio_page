//basic colors
/* start colors:
  - background: 558C00
  - quote area: 84D900
  - font: 290033
  - buttons: 290033
  - button font: 9BFF00
  - button hover: 558C00
*/
var background = "#558c00";
var quoteBackground = "#84D900";
var font = "#290033";
var buttonFont = "#9BFF00";
var style = document.styleSheets[0];

function adjustColors() {


  //delete the rules for pseudo classesthat have been inserted before first
  style.deleteRule(0);
  style.deleteRule(0);
  style.deleteRule(0);
  var adjustBy = Math.floor(Math.random() * (720 - 0) + 0 - 360);

  //use tinycolor to adjust the hue
  background = tinycolor(background).spin(adjustBy).toString();
  quoteBackground = tinycolor(quoteBackground).spin(adjustBy).toString();
  font = tinycolor(font).spin(adjustBy).toString();
  buttonFont = tinycolor(buttonFont).spin(adjustBy).toString();

  //jquery cant modify pseudo classes so inject rule to stylesheet for those
  style.insertRule(".btn { background-color: " + font + "; color: " + buttonFont + " }", 0);
  style.insertRule(".btn:hover { background-color: " + background + "; }", 0);
  style.insertRule(".btn:visited { background-color: " + font + "; }", 0);

  //modify rest of the elements via jquery
  $('body').css('background-color', background);
  $('body').css('color', font);
  $('#quote-container').css('background-color', quoteBackground);
  $('#copyright').css('color', quoteBackground);

  //set this to false so we delete the injected style rules on next run
  firstLoad = false;
}


function getQuote() {
  $("#refreshIcon").addClass("fa-spin");
  $.getJSON("https://quotes.stormconsultancy.co.uk/random.json", function (json) {
    var currentQuote = json.quote;
    var currentQuoteAuthor = json.author;
    $("#quote").html('<i class="material-icons fa-rotate-180">format_quote</i>&nbsp;'
      + currentQuote
      + '&nbsp;<i class="material-icons">format_quote</i>');
    $("#author").html(currentQuoteAuthor);
    $("#refreshIcon").removeClass("fa-spin");
    $("#tweet").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='
      + encodeURIComponent('"' + currentQuote + '"' + currentQuoteAuthor));

    adjustColors();
  });
}


$(document).ready(function () {
  //jquery cant modify pseudo classes so inject rule to stylesheet for those
  style.insertRule(".btn { background-color: " + font + "; color: " + buttonFont + " }", 0);
  style.insertRule(".btn:hover { background-color: " + background + "; }", 0);
  style.insertRule(".btn:visited { background-color: " + font + "; }", 0);

  //modify rest of the elements via jquery
  $('body').css('background-color', background);
  $('body').css('color', font);
  $('#quote-container').css('background-color', quoteBackground);
  $('#copyright').css('color', quoteBackground);

  getQuote();
  $("#getQuote").on("click", function () {
    getQuote();
  });
});