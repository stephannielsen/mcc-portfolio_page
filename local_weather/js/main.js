function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition, handleError);
  }
}

function handleError(error) {
  $("#weather").html("Sorry, I don't know where you are...did you share your location?");
}

function handlePosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var weatherMapUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherMapApiKey;

  $.getJSON(weatherMapUrl, (weather) => {
    var country = weather.sys.country;
    var city = weather.name;
    var temperature = weather.main.temp;
    var cityLink = '<a target="_blank" href="https://maps.google.com/?q=' + lat + ',' + lon + '">' + city + '</a>';
    $("#weather").html(temperature + "°C, " + cityLink + " (" + country + ")");
    // var result = json;
    // alert(JSON.stringify(result));
    //     {"coord":{"lon":139,"lat":35},
    // "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
    // "weather":[{"id":804,"main":"clouds","description":"overcast clouds","icon":"04n"}],
    // "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
    // "wind":{"speed":7.31,"deg":187.002},
    // "rain":{"3h":0},
    // "clouds":{"all":92},
    // "dt":1369824698,
    // "id":1851632,
    // "name":"Shuzenji",
    // "cod":200}
  });
}

$(document).ready(function () {
  getLocation();
});