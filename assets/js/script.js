// alert("connected");
var mainUrl = 'http://api.openweathermap.org/';
var apiKey = '&appid=02688e77ea6c5ab464965f3df5dd4b5d';
var dataFilters = 'data/2.5/find?q=';
var geo = 'geo/1.0/direct?q=';
var city = 'Sacramento';
var convertFahrenheit = "&units=imperial";
var limit = '&limit=1';

// I think this is the winner: https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// var weatherCall = mainUrl + dataFilters + city + apiKey;
var weatherCall = mainUrl + dataFilters + city + convertFahrenheit + limit + apiKey;

fetch(weatherCall)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
   for (var i = 0; i < data.length; i++) {
     console.log(data[i].name);
    }
  })



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