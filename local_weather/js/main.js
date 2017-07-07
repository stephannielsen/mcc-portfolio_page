function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition, handleError);
  }
}

function handleError(error) {
  var alertMessage = "";
  switch (error.code) {
    case error.PERMISSION_DENIED: alertMessage = "User did not share location.";
      break;
    case error.POSITION_UNAVAILABLE: alertMessage = "Could not detect current position.";
      break;
    case error.TIMEOUT: alertMessage = "Retrieving position timed out.";
      break;
    default: alertMessage = "Unknown error.";
      break;
  }
  alertMessage += "Code: " + error.code + ", " + error.message;
  alert(alertMessage);
}

function handlePosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + openWeatherMapApiKey, (json) => {
    var result = json;
    alert(JSON.stringify(result));
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