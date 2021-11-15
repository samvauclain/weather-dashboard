// url related object, build different calls
var fetchUrls = {
  cityDateCall : 'https://api.openweathermap.org/data/2.5/forecast?q=',
  weatherCall : 'https://api.openweathermap.org/data/2.5/onecall?lat=',
  convertFahrenheit : "&units=imperial",
  apiKey : '&appid=02688e77ea6c5ab464965f3df5dd4b5d'
}

var todayHeader = document.getElementById('todayHeader');
var cityEl = document.getElementById("searchBtn");
var clearEl = document.getElementById("clearLocalStorage");
var cityInput = document.getElementById("cityInput");
var city = "";
var recentSearches = document.getElementById('recentSearches');
var todayWeatherData = document.getElementById('todayWeatherData');
var cards = document.getElementById('cards');
var lat = 0;  
var long = 0;
var date = '';

var cityDateCall = "";

if(localStorage.getItem(cityInput.value) === null){ 
  // alert("no local storage"); 
  recentSearches.innerHTML = `<li class="dropdown-item">No recent searches found<li>`;
} else {
  recentSearches.innerHTML = '';
}

// Set city default / starting city
getLatLong("Sacramento");

// Get lat & long, display city & date
function getLatLong(city) {
  cityDateCall = fetchUrls.cityDateCall + city + fetchUrls.apiKey;

  fetch(cityDateCall)
  .then(function (response) {
  if (response.ok) {
    response.json() 
  .then(function (data) {
    console.log(data);
    lat = data.city.coord.lat;
    long = data.city.coord.lon;
    // In the afternoon, this started displaying the next day's date for some reason:
    // date = data.list[0].dt_txt;
    // So just grabbing date with moment js insead.
    date = (moment(moment()).format("ddd, MM/DD/YYYY"));
    todayHeader.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.city.name} - ${date}`;
      // pass lat and long to get weather and get the rest of the data
      getWeather(lat,long, date);
    })
  }
  else if (!response.ok) {
    alert("Please check your spelling and try entering a city name again.");
  }
    }).catch(err => {
      console.log(err);
      // alert("Please enter a valid city");
    }
  );
}
var getWeatherCall = '';

// Plug in lat and long & get everything else weather related
var getWeather = function (lat, long, date) {
  console.log(getWeatherCall);
  console.log(date);
  //console.log(moment(moment()).add(1, 'days').format("MM/DD/YYYY"));
  
  getWeatherCall = fetchUrls.weatherCall + lat + '&lon=' + long + '&exclude=hourly,minutely' + fetchUrls.convertFahrenheit + fetchUrls.apiKey;

  fetch(getWeatherCall)
    .then(function (response) {
      response.json()
        .then(function (data) {
          console.log(data);
          cards.innerHTML = '';

          // Create the hero weather info for today's weather
          todayWeatherData.innerHTML = 
          `<li><img class="weatherIcon" src='http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.png'></li>
          <li>Tempurature: <b>${data.current.temp} &#8457;</b></li>
          <li>Wind Speed: <b>${data.current.wind_speed}</b></li>
          <li>Humidity: <b>${data.current.humidity}</b></li>
          <li id="uvHeader">UV Index: <b>${data.current.uvi}</b></li>`;

          var uvHeaderId = document.getElementById(`uvHeader`);
          var uvHeader = data.current.uvi;

          // checking UVs and adding styles, would be nice to make a shared function for this and the other one, pass in the argument, but need to account for for loop.
          if (uvHeader <= 2.99) {
            uvHeaderId.classList.add('uv-favorable');
          } 
          else if (uvHeader >= 3 && uvCard <= 5) {
            uvHeaderId.classList.add('uv-moderate');
          } 
          else if (uvHeader > 5.01) {
            uvHeaderId.classList.add('uv-severe');
          } 

          // Create the 5 day weather forecast cards
          for (var i = 0; i < 5; i++) {

            cards.innerHTML += 
            `<div id="card-${i}" class="col-sm-6 col-lg-2 mb-3">
            <div class="card p-3">
              <ul>
                  <li class="fw-bold">${moment(moment()).add(i + 1, 'days').format("ddd, MM/DD/YYYY")}</li>
                  <li><img class="weatherIcon" src='http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png'></li>
                  <li>Temp <b>${data.daily[i].temp.day}</b></li>
                  <li>Wind <b>${data.daily[i].wind_speed}</b></li>
                  <li>Humidity <b>${data.daily[i].humidity}</b></li>
                  <li id="uv-${i}">UV Index: <b>${data.daily[i].uvi}</b></li>
              </ul>
            </div>
            </div>`;

            var uvEl = document.getElementById(`uv-${i}`);
            var uvCard = data.daily[i].uvi;

            // checking UVs and adding styles, would be nice to make a shared function for this and the other one, pass in the argument, but need to account for for loop.
            if (uvCard <= 2.99) {
              uvEl.classList.add('uv-favorable');
            } 
            else if (uvCard >= 3 && uvCard <= 5) {
              uvEl.classList.add('uv-moderate');
            } 
            else if (uvCard > 5.01) {
              uvEl.classList.add('uv-severe');
            } 
          }
        }).catch((error) => {
          console.error('Error:', error);
          return;
        });
    });
};

function refresh() {
  cityInput.value = '';

  for (var i = 0; i < allStorage().length; i++) {
      var newCity = document.createElement("li");
      newCity.innerHTML = `<li><button class="dropdown-item" onclick='(getLatLong("${allStorage()[i]}"))'>${allStorage()[i]}</button><li>`;
      //alert(typeof(allStorage()[i]));
      recentSearches.appendChild(newCity);
  }
}

cityEl.addEventListener("click", () => {
  recentSearches.innerHTML = '';
  city = cityInput.value;

  if(city) {
    getLatLong(city);
  }
  else {
    alert("please enter in a valid city");
  }
  localStorage.setItem(cityInput.value, cityInput.value);
  city = '';
  refresh();
})

clearEl.addEventListener("click", () => {
  localStorage.clear();
  recentSearches.innerHTML = `<li class="dropdown-item">No recent searches found<li>`;
  // refresh();
});

function allStorage() {
  
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
    console.log(keys);

  while (i--) {
      console.log(values);
      values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

refresh();

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