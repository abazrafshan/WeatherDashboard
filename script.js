$("#button-addon2").on("click", function(){
    // var citySearch = $(this).val();
    var parent = $(this).parents();
    var citySearch = $(parent).find(".form-control").val();
    console.log(citySearch);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    citySearch + "&appid=0d8fd75a76f5d938dcb8f8d22cc34916";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        var date = moment().format('LL');
        var citySearchDate = $(".card-title").text(response.name + " (" + date + ")");
        
        var cityTemp = ((((response.main.temp - 273.15)*1.8)+32).toFixed());
        var cityTempTag = $(".temp").text("Temperature: " + cityTemp + " F");
        var humidity = response.main.humidity;
        humidityTag = $(".humidity").text("Humidity: " + humidity + "%");
        var windSpeed = response.wind.speed;
        var windSpeedTag = $(".wind-speed").text("Wind Speed: " + windSpeed + "mph");

    })
})
{

}
