// get data from form and trigger wikipedia search
function getFormData(){
  var search = document.getElementById('search').value;
  getWikipediaData(search);
}

// Pull data from wikipedia api
function getWikipediaData(search) {
  var output = $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + search + "&gsrlimit=10&utf8=",
    type: 'POST',
    data: {},
    dataType: 'json',
    headers: { 'Api-User-Agent': 'CodePen Exercise/1.1 (https://codepen.io/anewdev/pen/dNmNKJ; iam@anewdev.io)' },
    success: function(data) {
      // if data pull successful, trigger getDetails function with the pulled data
      displayResults(data.query.pages);
      hideSearchBox();
    },
    error: function(err) { alert(err); },
  });
};

// display the results

function displayResults(object) {
  var node = "";
  for (var variable in object) {
    var pageLink = "https://en.wikipedia.org/?curid=" + object[variable].pageid;
    node += "<div class=" + "list-group" + "><a href=" + pageLink + " class=" + "list-group-item active" + " target=" + "_blank" + "><h4 class=" + "list-group-item-heading" + ">" + object[variable].title + "</h4><p class=" + "list-group-item-text" + ">" + object[variable].extract + "</p></a></div>";
    document.getElementById("data").innerHTML = node;
  };
};

function hideSearchBox() {
  document.getElementById("searchBox").style.visibility = "hidden";
  document.getElementById("random").style.visibility = "hidden";
};

function showSearchBox() {
  document.getElementById("data").innerHTML = "";
  document.getElementById("searchBox").style.visibility = "visible";
  document.getElementById("random").style.visibility = "visible";

};

/*



// Set global variables
var weatherData = {};

// After loading the page, get lat lon from ipinfo and execute the first function
$(document).ready(function() {
  $.get("http://ipinfo.io/geo", function(response) {
    var latLon = (response.loc).split(',');
    var latitude = latLon[0];
    var longitude = latLon[1];
    document.getElementById("city").innerHTML = "The current weather in<br>" + response.city;
    getWeatherDetail(latitude, longitude);
  }, "jsonp")
});

// Pull the weather from openweathermap and post the weather on the page
function getWeatherDetail(lat, lon) {
  var output = $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=09449d6c9c3b937d6a67e55e34b1bfab",
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function(data) {
    // assign the weatherData for future use, and set the page values to current weather
      weatherData = data;
      changeBackgroundImg(weatherData.weather[0].main);
      getFahrenheit();
      document.getElementById("conditions").innerHTML = weatherData.weather[0].description;
    },
    error: function(err) { alert(err); },
  });
};

// change the background image
function changeBackgroundImg(group) {
  document.body.style.backgroundImage = "url(https://s3.amazonaws.com/assetsanewdevio/fccweather/" + group + ".jpg)";
}

// get celsius temp from fahrenheit
function getCelsius() {
  document.getElementById("temp").innerHTML = Math.round((weatherData.main.temp - 32) * 5 / 9) + '° <a onclick="getFahrenheit()" href="#">C</span>';
}

// get fahrenheit from api data
function getFahrenheit() {
  document.getElementById("temp").innerHTML = Math.round(weatherData.main.temp) + '° <a onclick="getCelsius()" href="#">F</span>';
}
*/
