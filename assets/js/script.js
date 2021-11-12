var apiKey = '&appid=02688e77ea6c5ab464965f3df5dd4b5d';
var mainUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var cityEl = document.getElementById("searchBtn");
var cityInput = document.getElementById("cityInput");
var city = "";
var convertFahrenheit = "&units=imperial";
var limit = '&limit=1';
var todayHeader = document.getElementById('todayHeader');
var todayWeatherData = document.getElementById('todayWeatherData');
var card1 = document.getElementById('card-1');
var card2 = document.getElementById('card-2');
var lat = 0;  
var long = 0;

var cityDateCall = "";

// Get lat & long, display city & date
function getLatLong(city) {

  cityDateCall = mainUrl + city + apiKey;

  fetch(cityDateCall)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    lat = data.city.coord.lat;
    long = data.city.coord.lon;
    date = data.list[0].dt_txt;
    date = (moment(date).format("MM/DD/YYYY"));
    todayHeader.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.city.name} - ${date}`;
      // pass lat and long to get weather and get the rest of the data
      getWeather(lat,long);
    }).catch(err => {
      console.log(err)
      // alert("Please enter a valid city");
    }
  );
}


var getWeatherCall = '';

// Plug in lat and long & get everything else weather related
var getWeather = function (lat, long) {
  console.log(getWeatherCall)

  getWeatherCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly,minutely' + convertFahrenheit + apiKey;

  
  fetch(getWeatherCall)
    .then(function (response) {
      response.json()
        .then(function (data) {
          console.log("weather call");
          console.log(data);
          nextDate = data.daily[0].dt;
          console.log(nextDate);
          nextDate = (moment(nextDate).format("MM/DD/YYYY"));

          todayWeatherData.innerHTML = 
          `<li>Tempurature: <b>${data.current.temp} &#8457;</b></li>
          <li>Wind Speed: <b>${data.current.wind_speed}</b></li>
          <li>Humidity: <b>${data.current.humidity}</b></li>
          <li>UV Index: <b>${data.current.uvi}</b></li>`;

          card1.innerHTML = 
          `<div class="card p-3">
            <ul>
                <li class="fw-bold">Mon ${nextDate}</li>
                <li><img class="weatherIcon" src='http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png'></li>
                <li>Temp <b>${data.daily[0].temp.day}</b></li>
                <li>Wind <b>${data.daily[0].wind_speed}</b></li>
                <li>Humidity <b>${data.daily[0].humidity}</b></li>
                <li>UV Index: <b>${data.daily[0].uvi}</b></li>
            </ul>
          </div>`;

          card2.innerHTML = 
          `<div class="card p-3">
            <ul>
                <li class="fw-bold">Mon ${nextDate}</li>
                <li><img class="weatherIcon" src='http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.png'></li>
                <li>Temp <b>${data.daily[1].temp.day}</b></li>
                <li>Wind <b>${data.daily[1].wind_speed}</b></li>
                <li>Humidity <b>${data.daily[1].humidity}</b></li>
                <li>UV Index: <b>${data.daily[1].uvi}</b></li>
            </ul>
          </div>`;
        })
    })
}

cityEl.addEventListener("click", function(event){
  console.log(event.target);
  console.log("clicked");

  city = cityInput.value;

  if(city) {
    getLatLong(city);
    // alert("city!");
  }
  else {
    alert("please enter in a valid city");
  }
});

// cityEl.addEventListener("click", cityHandler);

// var cityHandler = function(event) {
//   alert("clicked");
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


// var dataFilters = 'data/2.5/find?q=';
// var geo = 'geo/1.0/direct?q=';

// alert("connected");
// var mainUrl = 'http://api.openweathermap.org/';



// https://api.openweathermap.org/data/2.5/onecall?lat=38.4666&lon=-121.3177&exclude=hourly,minutely&appid=&appid=02688e77ea6c5ab464965f3df5dd4b5d
// https://api.openweathermap.org/data/2.5/onecall?lat=38.4666&lon=-121.3177&exclude=minutely,hourly&appid=