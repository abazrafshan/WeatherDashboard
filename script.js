$("#button-addon2").on("click", function(){
    var parent = $(this).parents();
    var citySearch = $(parent).find(".form-control").val();
    currentWeather(citySearch);
    forecast(citySearch)
});    

var lat;
var lon;

function currentWeather(param){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
param + "&appid=0d8fd75a76f5d938dcb8f8d22cc34916";
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){
    console.log(response);
    var date = moment().format('LL');
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var citySearchDate = $(".card-title.current").text(response.name + ", " + response.sys.country + " (" + date + ")");
    console.log(response.weather.icon);
    var cityTemp = ((((response.main.temp - 273.15)*1.8)+32).toFixed());
    var cityTempTag = $(".temp").text("Temperature: " + cityTemp + " F");
    var humidity = response.main.humidity;
    humidityTag = $(".humidity").text("Humidity: " + humidity + "%");
    var windSpeed = response.wind.speed;
    var windSpeedTag = $(".wind-speed").text("Wind Speed: " + windSpeed + "mph");
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

// function forecast



