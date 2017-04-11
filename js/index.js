var F = 0;
var C = 0;
var unit = '';

//this uses the cooridnates to open another api for retrieving weather
function getWeather(lat, long, reg){
  var ourRequest = new XMLHttpRequest(); 
 // check to see if responding
  ourRequest.onreadystatechange = function() {
    if (ourRequest.readyState === 4) {
      if (ourRequest.status === 200 || ourRequest.status === 304) {
        // Success! Do stuff with data.
        console.log(ourRequest.responseText); 
      }
    }
  }
   
   ourRequest.open('GET',  'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=9fde4fbaf9da4200f38321f5549586d4');

  
   ourRequest.onload = function() {
      var data = JSON.parse(ourRequest.responseText);
      var cit = reg;
     
      
      C = data.main.temp - 273.15;
      F = C * (9/5) + 32;
      var temp = Math.floor(C);

      var cond = data.weather[0].description;
      var icon = data.weather[0].icon.toString();
      write(cit, temp, cond, icon);
   };
      
  ourRequest.send();
}


//this takes the weather and formats it for the webpage
function write(city, t, co, i){

  $('#city').text(city);
  $('#but').prepend(t.toString());
  unit = 'C';
  $('#but').append(unit);
  $('#condition').text(co);
  $('#change').append('<img class="image" src="http://openweathermap.org/img/w/' + i + '.png" alt="icon">');

  
  
var u = '';
  
  //this uses the "icon" key to determine the background image
  //hazy
  if(i === '50d' || i === '50n'){
    u = 'https://static.pexels.com/photos/104907/pexels-photo-104907.jpeg';
  } 
  //clear sky day
  else if (i === '01d'){
    u = 'https://static.pexels.com/photos/27018/pexels-photo-27018.jpg';
  } 
  //clear sky night
  else if (i === '01n'){
    u = 'https://static.pexels.com/photos/8170/sky-clouds-trees-moon.jpg';
  }
  //few clouds night
  else if (i === '02n'){
    u = 'https://static.pexels.com/photos/8438/sky-clouds-moon-horizon.jpg';
  }
  //cloudy day and night
  else if (i === '03d' || i === '03n' || i === '04d' || i === '04n'){
    u = 'https://static.pexels.com/photos/27194/pexels-photo-27194.jpg';
  }
  //cloudy day and night
  else if (i === '09d' || i === '09n' || i === '10d' || i === '10n') {
    u = 'https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg';
  }
  //thunderstorm day and night
  else if (i === '11d' || i === '11n'){
    u = 'https://static.pexels.com/photos/28774/pexels-photo-28774.jpg';
  }
  //snow day and night
  else if (i === '13d' || i === '13n'){
    u = 'https://static.pexels.com/photos/24642/pexels-photo-24642.jpg';
  }
  
  //after determining variable 'u', this changes the background
  if(u !== ''){
    $('body').css('background-image', 'url(' + u + ')');
  }  
     
  //css default is for daytime.  However, if it is night, the background color of box and footer changes, as well as the text color.  
    if(i.endsWith('n')){
      $('.content').css('background', 'black');
      $('.content').css('color', '#ECF1EF');
      $('footer').css('background-color', 'Black'); 
      $('button').css('background-color', 'Black');
    }
  
}


$(document).ready(function(){

   console.log("Begin");
  
  
  var request = new XMLHttpRequest(); 
  //check to see if responding
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200 || ourRequest.status === 304) {
        // Success! Do stuff with data.
        console.log(ourRequest.responseText); 
      }
    }
  };
  
  //this api gets the IP adress and cooridnates of the user
   request.open('GET', 'http://ip-api.com/json');
   request.onload = function() {
     var y = JSON.parse(request.responseText); 
     var la = Math.floor(y.lat);
     var lo = Math.floor(y.lon);
     var r = y.city + ', ' + y.region;
     
      getWeather(la, lo, r);
   }
   request.send();
  
});


//changes temperature on click
$(function() {$('#but').on('click', function(event) {

  var newTemp = 0;
  var unit = '';

  
  if ($(this).text().endsWith('C')){
    newTemp = Math.floor(F);
    unit = 'F';
  }
  else {
    newTemp = Math.floor(C);
    unit = 'C';
  }
  
  $(this).fadeOut(700, function(){
    $(this).text($(this).text().slice(-2, -1)).append(unit).prepend(newTemp);
    $(this).fadeIn(700);
  });
  
  
  event.preventDefault();
  });
});