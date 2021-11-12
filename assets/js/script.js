// alert("connected");
// var mainUrl = 'http://api.openweathermap.org/';
var apiKey = '&appid=02688e77ea6c5ab464965f3df5dd4b5d';
// var dataFilters = 'data/2.5/find?q=';
// var geo = 'geo/1.0/direct?q=';
var mainUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var city = 'Sacramento';
var convertFahrenheit = "&units=imperial";
var limit = '&limit=1';
var todayHeader = document.getElementById('today-header');
var days = '&cnt=7'

var lat = 0;  
var long = 0;

// Get lat & long
var weatherCall = mainUrl + city + convertFahrenheit + apiKey;

function getLatLong() {

     return new Promise((resolve, reject) => {

    fetch(weatherCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        resolve(data);
      for (var i = 0; i < data.length; i++) {
        // console.log(data.city.name);
        }
        // todayHeader.innerHTML = `<i class="fas fa-plus-circle"></i> ${data.city.name} - ${data.list[0].dt_txt}`;
        lat = data.city.coord.lat;  
        long = data.city.coord.lon;
      }).catch(err => {
        reject(err);
      })
    })
  }

getLatLong().then(data => {
  console.log("second function:");
  console.log(data);
}).catch(err => {
  console.log(err);
});

  // alert("lat: " + lat);

  // &exclude=hourly&exclude=minutely
// function getWeather() {
  
//   console.log("lat:", lat);
//   var weatherCall2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly' + '&appid=' + apiKey;

// }


// Get the rest of it
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city



// Go to "How to start" section: https://openweathermap.org/api#maps
// https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// var weatherCall = 'https://api.openweathermap.org/data/2.5/forecast?q=Sacramento&appid=02688e77ea6c5ab464965f3df5dd4b5d';