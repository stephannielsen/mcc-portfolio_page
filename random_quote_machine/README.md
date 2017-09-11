Random Quote Machine - FreeCodeCamp Challenge

Uses jQuery and tinycolor.js for js magic.
FontAwesome for icons, Google Fonts for fonts.

CodePen: https://codepen.io/snielsen/pen/dvyJOy

For CodePen I have to use https:// to retrieve the quote from here, but this is blocked by default.
Open this link <a href="https://quotes.stormconsultancy.co.uk/random.json" target="_blank">https://quotes.stormconsultancy.co.uk/random.json</a>, make an exception for the certificate and reload the pen. A quote should appear.

Unfortunately, Firefox throw a security error because of jQuery. Works fine in Chrome, IE or outside of CodePen though.

Thanks to https://quotes.stormconsultancy.co.uk/ for providing a public quote api.