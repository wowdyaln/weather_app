/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;


function loadWeather(){

    let zip = document.getElementById("zip").value
    let conditionsPath = 'http://api.wunderground.com/api/8b1bc2bc3dd7a60b/conditions/q/' + zip + '.json'
    let forecastPath = 'http://api.wunderground.com/api/8b1bc2bc3dd7a60b/forecast/q/' + zip + '.json'
    // GET THE CONDITIONS
    weatherConditions.open('GET', conditionsPath, true);
    weatherConditions.responseType = 'text';
    weatherConditions.send(null);
    
    // GET THE FORECARST
    weatherForecast.open('GET', forecastPath, true);
    weatherForecast.responseType = 'text';
    weatherForecast.send();
}


// 取得 condition 的 json 資料後：
weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        document.getElementById("location").innerHTML = cObj.current_observation.display_location.full
        document.getElementById("weather").innerHTML = cObj.current_observation.weather
        document.getElementById("temperature").innerHTML = cObj.current_observation.temp_c
        
    } //end if
}; //end function


// 取得 forecast 的 json 資料後：
weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
    console.log(fObj);
    document.getElementById("desc").innerHTML = fObj.forecast.txt_forecast.forecastday[0].fcttext

    // day 1 ~ day3
    for (let i = 1; i <= 3; i++){

        document.getElementById(`r${i}c1`).innerHTML = fObj.forecast.simpleforecast.forecastday[i].date.weekday
        let imagePath = fObj.forecast.simpleforecast.forecastday[i].icon_url
        document.getElementById(`r${i}c2`).src = imagePath
        document.getElementById(`r${i}c3`).innerHTML = fObj.forecast.simpleforecast.forecastday[i].high.celsius+ "°"
        document.getElementById(`r${i}c4`).innerHTML = fObj.forecast.simpleforecast.forecastday[i].low.celsius+ "°"
    }
} //end if
}; //end function


