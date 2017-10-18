//https://en.wikipedia.org/w/api.php
//?action=query&format=json&prop=pageimages|extracts
//&generator=search&pithumbsize=200&exsentences=1
//&gsrsearch=flensburg&gsrnamespace=0
//&gsrinfo=totalhits|suggestion|rewrittenquery
//&gsrprop=size|wordcount|timestamp|snippet

var baseUrl = "https://en.wikipedia.org/w/api.php";
var searchTerm = "flensburg";
var query = "?action=query&format=json&prop=pageimages|extracts" +
            "&generator=search&pithumbsize=200&exsentences=1" +
            "&gsrsearch=" + searchTerm + "&gsrnamespace=0" +
            "&gsrinfo=totalhits|suggestion|rewrittenquery" +
            "&gsrprop=size|wordcount|timestamp|snippet";
var fullUrl = baseUrl + query;

$.getJSON(fullUrl, (wikiPages) => {
  // var country = weather.sys.country;
  // var city = weather.name;
  // var tempInC = weather.main.temp;
  // var tempInF = (tempInC * 9 / 5 + 32).toFixed(2);
  // var iconUrl = weather.weather[0].icon;
  // tempInCText = '<img class="weatherIcon" src="' + iconUrl + '" alt="' + weather.weather[0].main + '" /><b>' + tempInC + ' °C</b><br>' + city + ' (' + country + ')';
  // tempInFText = '<img class="weatherIcon" src="' + iconUrl + '" alt="' + weather.weather[0].main + '" /><b>' + tempInF + ' °F</b><br>' + city + ' (' + country + ')';

  // $("#details").html(tempInCText);     
  // marker = L.marker([lat, lon])
  //   .addTo(map)
  //   .bindPopup(tempInCText)
  //   .openPopup();
});