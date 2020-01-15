import { LightningElement} from 'lwc';

export default class Data extends LightningElement {

    getCurrentWeather() {
        let request = new XMLHttpRequest();
        let city = this.template.querySelector('lightning-input').value;
        let requestAPI = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';
        var currentWeather;
        request.open('GET', requestAPI,false);
        request.onload = function () {
            currentWeather = JSON.parse(this.response);
        }
        request.send();
        const event = new CustomEvent('weathernow', {
            detail: currentWeather
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }
    
    getWeatherForecast() {
        
        let request = new XMLHttpRequest();
        let city = this.template.querySelector('lightning-input').value;
        let requestAPI = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';

        var bikes;
        request.open('GET', requestAPI,false);
        request.onload = function () {
          // Begin accessing JSON data here
          bikes = JSON.parse(this.response).list;
        }
        request.send();
        const event = new CustomEvent('forecastclick', {
            detail: bikes
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }
}

