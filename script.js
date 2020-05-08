$(document).ready(function(){
// Start page with search history
var cities = localStorage.getItem("cityHistory");
var cityJSON = JSON.parse(cities);

// sets weather dashboard to show weather conditions for last city to be saved in localstorage
if (cityJSON && cityJSON.length > 0){
for (var i = 0; i < cityJSON.length; i++){
    var city = $("<li>").addClass("list-group-item list-group-item-action").text(cityJSON[i]);
    $(".cities").prepend(city);
    if (i == cityJSON.length-1) {
        currentWeather(cityJSON[i]);
        forecast(cityJSON[i]);
    }
}} else {
    cityJSON = [];
}
// adds list item to city search history each time user makes a valid search
$(".cities").on("click", "li", function(){
    var buttonText = $(this).text();
    currentWeather(buttonText);
    forecast(buttonText);
})

// when user clicks search button, text that is in search input field is passed through functions that perform ajax calls to populate application content
$("#button-addon2").on("click", function(){
    var parent = $(this).parents();
    var citySearch = $(parent).find(".form-control").val();
    currentWeather(citySearch);
    forecast(citySearch);
    cityJSON.push(citySearch);
    // sets localstorage for each city search and adds to city search history
    localStorage.setItem("cityHistory", JSON.stringify(cityJSON));
    var city = $("<li>").addClass("list-group-item list-group-item-action").text(citySearch);
    $(".cities").prepend(city);
});    

// ajax calls to weather api's to generate current weather forecast and uv index
function currentWeather(param){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + param + "&appid=0d8fd75a76f5d938dcb8f8d22cc34916";
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){
    // latitude of current city
    var lat = response.coord.lat;
    // longitude of current city
    var lon = response.coord.lon;
    // weather condition icon
    var icon = response.weather[0].icon;
    // displays current city name and todays date
    var citySearchDate = $(".card-title.current").html(response.name + ", " + response.sys.country + " (" + moment().format('LL') + ")");
    // create image div and add picture of weather condition icon
    var imageDiv = $("<img>");
    imageDiv.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    $(".card-title.current").append(imageDiv);
    // temperature converted to fahrenheit
    var cityTemp = ((((response.main.temp - 273.15)*1.8)+32).toFixed(1));
    var cityTempTag = $(".temp").text("Temperature: " + cityTemp + " F");
    // humidity of current city
    var humidity = response.main.humidity;
    humidityTag = $(".humidity").text("Humidity: " + humidity + "%");
    // current wind speed of city
    var windSpeed = response.wind.speed;
    var windSpeedTag = $(".wind-speed").text("Wind Speed: " + windSpeed + " MPH");
    // ajax call for uv index value based on latitude and longitude values stored from parent ajax call
    var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?appid=0d8fd75a76f5d938dcb8f8d22cc34916&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: queryURLUV,
        method: "GET"
    })
    // color codes div containing uv index value based the value
    .then(function(response){
        var uvindex = response.value;
        if (uvindex < 6 && uvindex >= 3){
            $(".uv").css("background-color", "yellow");
        }
        else if (uvindex < 8 && uvindex >= 6){
            $(".uv").css("background-color", "orange");
        }
        else if (uvindex < 11 && uvindex >= 8){
            $(".uv").css("background-color", "red");
        }
        else if (uvindex >= 11){
            $(".uv").css("background-color", "violet");
        }
        // lists uv index value in div with class uv
        $(".uv").text(uvindex);
    })
})};
// ajax call that is used to display 5 day weather forecast 
function forecast(param){
    var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?q=" + param + "&appid=0d8fd75a76f5d938dcb8f8d22cc34916";
    $.ajax({
        url: queryURL5,
        method: "GET"
    })
    .then(function(response){
        // adds date to each 5 day forecast card starting with tomorrow's date, increments 1 day
        $(".date1").text(moment().add(1, 'days').format('LL'));
        $(".date2").text(moment().add(2, 'days').format('LL'));
        $(".date3").text(moment().add(3, 'days').format('LL'));
        $(".date4").text(moment().add(4, 'days').format('LL'));
        $(".date5").text(moment().add(5, 'days').format('LL'));
        // adds icon to each 5 day forecast card starting with tomorrow, increments 1 day
        $(".icon1").attr("src", "https://openweathermap.org/img/wn/" + response.list[7].weather[0].icon + ".png");
        $(".icon2").attr("src", "https://openweathermap.org/img/wn/" + response.list[15].weather[0].icon + ".png");
        $(".icon3").attr("src", "https://openweathermap.org/img/wn/" + response.list[23].weather[0].icon + ".png");
        $(".icon4").attr("src", "https://openweathermap.org/img/wn/" + response.list[31].weather[0].icon + ".png");
        $(".icon5").attr("src", "https://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png");
        // sets temperature in fahrenheit for each day of the 5 day forecast
        var temp1 = ((((response.list[7].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp2 = ((((response.list[15].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp3 = ((((response.list[23].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp4 = ((((response.list[31].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp5 = ((((response.list[39].main.temp - 273.15)*1.8)+32).toFixed(2));
        // adds temperature in fahrenheit to each forecast card 
        $(".temp1").text("Temp: " + temp1 + " F");
        $(".temp2").text("Temp: " + temp2 + " F");
        $(".temp3").text("Temp: " + temp3 + " F");
        $(".temp4").text("Temp: " + temp4 + " F");
        $(".temp5").text("Temp: " + temp5 + " F");
        // adds humidity to each 5 day forecast card 
        $(".humidity1").text("Humidity: " + response.list[7].main.humidity + "%");
        $(".humidity2").text("Humidity: " + response.list[15].main.humidity + "%");
        $(".humidity3").text("Humidity: " + response.list[23].main.humidity + "%");
        $(".humidity4").text("Humidity: " + response.list[31].main.humidity + "%");
        $(".humidity5").text("Humidity: " + response.list[39].main.humidity + "%");
    })
}})



