$(document).ready(function(){
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
        console.log(queryURL);
        
        var date = moment().format('LL');
        var citySearchDate = $("<h2>").html(response.name + " (" + date + ")");
        console.log(citySearchDate);
        
        var cityTemp = ((((response.main.temp - 273.15)*1.8)+32).toFixed()+" F");
        console.log(cityTemp);
        var cityTempTag = $("<p>").text("Temperature: " + cityTemp);
        var humidity = response.main.humidity + "%";
        humidityTag = $("<p>").text("Humidity: " + humidity);
        console.log(humidity);
        var windSpeed = response.wind.speed + " MPH";
        var windSpeedTag = $("<p>").text("Wind Speed: " + windSpeed);
        $(".row.current-temp").append(citySearchDate);
        // var uvIndex = 


    })
})
{

}})