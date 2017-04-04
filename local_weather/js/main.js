function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handlePosition);
    }
}

function handlePosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  
  $.getJSON("https://www.metaweather.com/api/location/search/?lattlong=" + lat + "," + lon, (json) => {
    var woeid = json.woeid;
    $.getJSON("https://www.metaweather.com/api/location/" + woeid, (json) => {
      var weather = json.consolidated_weather;
      var name = json.title;
      var temp = weather.the_temp;
      $('#weather').text(temp + '°C, ' + name);
    });
  });
}

$(document).ready(function () {
  getLocation();
});