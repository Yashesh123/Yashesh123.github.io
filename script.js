$(document).ready(function() {
  getLocation();
});

function getLocation(){
  $.getJSON('https://freegeoip.net/json/?callback=?', function(loc) {
    $('#city').text(loc.city + ', ' + loc.region_name + ', ' + loc.country_name);
   getWeather(loc.latitude, loc.longitude,);
  }).fail(getWeather);
}

function getWeather(lat,lon){
    backimgs=[
      "https://yashesh123.github.io/rain-03.jpg",
      "https://yashesh123.github.io/cloudy-day-5.jpg",
      "https://yashesh123.github.io/thunder_lighting_v1.jpg",
      "https://yashesh123.github.io/maxresdefault.jpg",
      "https://yashesh123.github.io/34696209.jpg",
      "https://yashesh123.github.io/night-wallpaper.jpg"
    ];
  
    $.ajax({
      url: "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('.showHumidity').html("Humidity<br\>"+`${response.main.humidity}%`);
        var t=response.main.temp;
        var ttf=(t*1.8+32).toFixed(2);
        var tim=new Date();
        var hour=tim.getHours();
        var wet=response.weather[0].main;
        var flag=0;
        $('.showTemp').text(t+'° C');
        $('#cel').click(function(){
          if(flag==0){
            $('.showTemp').text(ttf+'° F');
            flag=1;
          }
          else{
            $('.cel').text(`Celcius(° C) -> Fahrinheit(° F)`);
            $('.showTemp').html(t+`° C`);
            flag=0;
          }
          this.blur();
});
        $('.windspeed').html('<i class="wi wi-strong-wind "></i><br\>'+`${response.wind.speed} Konts`);
        if(hour>18||hour<6){
          $('body').css('background-image', 'url(' + backimgs[5] + ')');
           $('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01n.png?1499366020783>'+'<br/>'+`${response.weather[0].description}`);
        }
        else if(wet==="Thunderstrom"){
          $('body').css('background-image', 'url(' + backimgs[2] + ')');
        $('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F11n.png?1499366021608>'+'<br/>'+`${response.weather[0].description}`);}
        else if((wet==="Haze"||wet==="Clear")&&t>=10){
          $('body').css('background-image', 'url(' + backimgs[3] + ')');
         $('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01d.png?1499366022009>'+'<br/>'+`${response.weather[0].description}`);}
        else if(wet==="Rain"){
          $('body').css('background-image', 'url(' + backimgs[0] + ')');
        $('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F09d.png?1499366021170>'+'<br/>'+`${response.weather[0].description}`);}
        else if(wet==="Cloudy"){
          $('body').css('background-image', 'url(' + backimgs[1] + ')');
        $('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F04d.png?1499366020964>'+'<br/>'+`${response.weather[0].description}`);}
        else if(wet==="Snow"||t<=10){
          $('body').css('background-image', 'url(' + backimgs[4] + ')');$('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01d.png?1499366022009>'+'<br/>'+`${response.weather[0].description}`);}
        else{
           $('body').css('background-image', 'url(' + backimgs[3] + ')');
         $('.dis').html('<img src=https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F01d.png?1499366022009>'+'<br/>'+`${response.weather[0].description}`);
        }
        }
    });
}
