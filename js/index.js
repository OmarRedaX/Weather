let inputSearch = document.getElementById("inputSearch");
let todaysWeek = document.getElementById("todaysWeek");
let dayAndMonth = document.getElementById("dayAndMonth");
let cityName = document.getElementById("cityName");
let temperaqre = document.getElementById("temperaqre");
let statusOfWeatherimg = document.getElementById("statusOfWeatherimg");
let textWeather = document.getElementById("textWeather");
let iconWeather = document.getElementById("iconWeather");
let windDirection = document.getElementById("windDirection");
let winter = document.getElementById("winter");
let winterSpeed = document.getElementById("winterSpeed");
let kiloMtr = document.getElementById("kiloMtr");
let nameMonth = document.getElementById("nameMonth")


// select by class name
let dayOfWeek = document.getElementsByClassName("dayOfWeek");
let temperare = document.getElementsByClassName("temperare");
let statusImage = document.getElementsByClassName("statusImage");
let textStatusWeather = document.getElementsByClassName("textStatusWeather");
let minTemp = document.getElementsByClassName("minTemp");

// read data
async function getData(index) {
  let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=963fc3e6f09d4fdd9bf193302241206&q=${index}&days=3`);
  let response = await data.json();
  return response;
}




async function showData(data) {
  let dateOfWeek = new Date()
  todaysWeek.innerHTML = dateOfWeek.toLocaleDateString("en-Us",{weekday:"long"})
  dayAndMonth.innerHTML = dateOfWeek.getDate()
  nameMonth.innerHTML = dateOfWeek.toLocaleDateString("en-Us",{month:"long"})
  cityName.innerHTML = data.location.name;
  temperaqre.innerHTML = data.current.temp_c + "<sup>o</sup>C";
  statusOfWeatherimg.setAttribute("src", `${data.current.condition.icon}`);
  textWeather.innerHTML = data.current.condition.text;
  windDirection.innerHTML = data.current.wind_dir;
  kiloMtr.innerHTML = data.current.wind_kph + "km/h";
  winterSpeed.innerHTML = data.current.humidity + `%`;
}

//next day
function getNextDat(data) {
  let forecastDate = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDay = new Date(forecastDate[i+1].date)
    dayOfWeek[i].innerHTML = nextDay.toLocaleDateString("en-Us",{weekday:"long"})
    temperare[i].innerHTML = forecastDate[i + 1].day.maxtemp_c;
    minTemp[i].innerHTML = forecastDate[i + 1].day.mintemp_c;
    statusImage[i].setAttribute("src",`${forecastDate[i + 1].day.condition.icon}`);
    textStatusWeather[i].innerHTML = forecastDate[i + 1].day.condition.text;

  }
}

//star app
async function startApp(index="cairo") {
  let datOfApi = await getData(index);
  if(!datOfApi.error){
    showData(datOfApi);
    getNextDat(datOfApi);
  }

}
inputSearch.addEventListener("input", function () {
  let val = inputSearch.value;
  startApp(val);
});

