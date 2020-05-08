$(document).ready(function(){
var cities = localStorage.getItem("cityHistory");
var cityJSON = JSON.parse(cities);

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
$(".cities").on("click", "li", function(){
    var buttonText = $(this).text();
    console.log(buttonText);
    currentWeather(buttonText);
    forecast(buttonText);
})

$("#button-addon2").on("click", function(){
    var parent = $(this).parents();
    var citySearch = $(parent).find(".form-control").val();
    console.log(citySearch);
    currentWeather(citySearch);
    forecast(citySearch);
    cityJSON.push(citySearch);
    localStorage.setItem("cityHistory", JSON.stringify(cityJSON));
    var city = $("<li>").addClass("list-group-item list-group-item-action").text(citySearch);
    $(".cities").prepend(city);
});    

function currentWeather(param){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + param + "&appid=0d8fd75a76f5d938dcb8f8d22cc34916";
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){
    console.log(response);
    var date = moment().format('LL');
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var icon = response.weather[0].icon;
    var citySearchDate = $(".card-title.current").html(response.name + ", " + response.sys.country + " (" + date + ")");
    var imageDiv = $("<img>");
    imageDiv.attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    $(".card-title.current").append(imageDiv);
    console.log(response.weather[0].icon);
    var cityTemp = ((((response.main.temp - 273.15)*1.8)+32).toFixed(1));
    var cityTempTag = $(".temp").text("Temperature: " + cityTemp + " F");
    var humidity = response.main.humidity;
    humidityTag = $(".humidity").text("Humidity: " + humidity + "%");
    var windSpeed = response.wind.speed;
    var windSpeedTag = $(".wind-speed").text("Wind Speed: " + windSpeed + " MPH");
    var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?appid=0d8fd75a76f5d938dcb8f8d22cc34916&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: queryURLUV,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
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
        $(".uv").text("UV Index: " + uvindex);
    })
})};

function forecast(param){
    var queryURL5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + param + "&appid=0d8fd75a76f5d938dcb8f8d22cc34916";
    $.ajax({
        url: queryURL5,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        $(".date1").text(moment().add(1, 'days').format('LL'));
        $(".date2").text(moment().add(2, 'days').format('LL'));
        $(".date3").text(moment().add(3, 'days').format('LL'));
        $(".date4").text(moment().add(4, 'days').format('LL'));
        $(".date5").text(moment().add(5, 'days').format('LL'));
        $(".icon1").attr("src", "http://openweathermap.org/img/wn/" + response.list[7].weather[0].icon + ".png");
        $(".icon2").attr("src", "http://openweathermap.org/img/wn/" + response.list[15].weather[0].icon + ".png");
        $(".icon3").attr("src", "http://openweathermap.org/img/wn/" + response.list[23].weather[0].icon + ".png");
        $(".icon4").attr("src", "http://openweathermap.org/img/wn/" + response.list[31].weather[0].icon + ".png");
        $(".icon5").attr("src", "http://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png");
        var temp1 = ((((response.list[7].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp2 = ((((response.list[15].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp3 = ((((response.list[23].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp4 = ((((response.list[31].main.temp - 273.15)*1.8)+32).toFixed(2));
        var temp5 = ((((response.list[39].main.temp - 273.15)*1.8)+32).toFixed(2));
        $(".temp1").text("Temp: " + temp1 + " F");
        $(".temp2").text("Temp: " + temp2 + " F");
        $(".temp3").text("Temp: " + temp3 + " F");
        $(".temp4").text("Temp: " + temp4 + " F");
        $(".temp5").text("Temp: " + temp5 + " F");
        $(".humidity1").text("Humidity: " + response.list[7].main.humidity + "%");
        $(".humidity2").text("Humidity: " + response.list[15].main.humidity + "%");
        $(".humidity3").text("Humidity: " + response.list[23].main.humidity + "%");
        $(".humidity4").text("Humidity: " + response.list[31].main.humidity + "%");
        $(".humidity5").text("Humidity: " + response.list[39].main.humidity + "%");
    })
}})



