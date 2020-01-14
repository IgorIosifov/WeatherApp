import { LightningElement} from 'lwc';
export default class WeatherWidget extends LightningElement {

getContainer(){
  return this.template.getElementById('container');
}


 deletePrevoiusForecasts(){
  while(this.getContainer().firstChild){
    this.getContainer().removeChild(this.getContainer().firstChild);
  }
}





getCurrentWeather(){
  // this.deletePrevoiusForecasts();
  let request = new XMLHttpRequest();
  let city = this.template.querySelector('lightning-input').value;
  let requestAPI = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';

  request.open('GET', requestAPI, true);
  request.onload = function() {
    // Begin accessing JSON data here
    var time = JSON.parse(this.response);
    
    if (request.status >= 200 && request.status < 400) { //fix this  
      
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
    
          let main = time.main;
          let wind = time.wind;
          let weather = time.weather[0];
     
    
      const dateTime = document.createElement('h3');
      dateTime.textContent = time.dt_txt;
    
      const temp = document.createElement('p');
      temp.textContent = 'Temperature: ' + Math.round(main.temp) + ' °C';
    
      const feelsLike = document.createElement('p');
      feelsLike.textContent = 'Feels like: ' + Math.round(main.feels_like) + ' °C';
    
      const pressure = document.createElement('p');
      pressure.textContent = 'Pressure: ' + Math.round(main.pressure*0.75) + ' mmHg'; 
    
      const humidity = document.createElement('p');
      humidity.textContent = 'Humidity: ' + Math.round(main.humidity) + ' %'; 
    
      const windSpeed = document.createElement('p');
      windSpeed.textContent = 'Wind speed: ' + Math.round(wind.speed) + ' m/sec'; 
    
      const weatherDescription = document.createElement('p');
      weatherDescription.textContent = 'Weather description: ' + weather.description; 
    
      this.getContainer().appendChild(card);
      card.appendChild(dateTime);
      card.appendChild(temp);
      card.appendChild(feelsLike);
      card.appendChild(pressure);
      card.appendChild(humidity);
      card.appendChild(windSpeed);
      card.appendChild(weatherDescription);
      
    
    } 
  }
  request.send();
  }



// getWeatherForecast(){
// this.deletePrevoiusForecasts();
// const request = new XMLHttpRequest();
// const city = this.getElementById('city').value;
// const requestAPI = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';
// request.open('GET', requestAPI, true);
// request.onload = function() {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response);
//   var list = data.list;
  
//   if (request.status >= 200 && request.status < 400) { //fix this
    
//     list.forEach(time => {
//       this.createCard(time);
//       console.log('finish');
//     })
  
// }
// request.send();
// }
// }

// createCard(time){
//   console.log('Im here');
//     const card = document.createElement('div');
//         card.setAttribute('class', 'card');
  
//         let main = time.main;
//         let wind = time.wind;
//         let weather = time.weather[0];
   
  
//     const dateTime = document.createElement('h3');
//     dateTime.textContent = time.dt_txt;
  
//     const temp = document.createElement('p');
//     temp.textContent = 'Temperature: ' + Math.round(main.temp) + ' °C';
  
//     const feelsLike = document.createElement('p');
//     feelsLike.textContent = 'Feels like: ' + Math.round(main.feels_like) + ' °C';
  
//     const pressure = document.createElement('p');
//     pressure.textContent = 'Pressure: ' + Math.round(main.pressure*0.75) + ' mmHg'; 
  
//     const humidity = document.createElement('p');
//     humidity.textContent = 'Humidity: ' + Math.round(main.humidity) + ' %'; 
  
//     const windSpeed = document.createElement('p');
//     windSpeed.textContent = 'Wind speed: ' + Math.round(wind.speed) + ' m/sec'; 
  
//     const weatherDescription = document.createElement('p');
//     weatherDescription.textContent = 'Weather description: ' + weather.description; 
  
//     this.getContainer().appendChild(card);
//     card.appendChild(dateTime);
//     card.appendChild(temp);
//     card.appendChild(feelsLike);
//     card.appendChild(pressure);
//     card.appendChild(humidity);
//     card.appendChild(windSpeed);
//     card.appendChild(weatherDescription);
    
//   }
}