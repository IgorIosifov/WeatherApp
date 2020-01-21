import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Data extends LightningElement {

    getCurrentWeather() {
        this.getCityFromInput()
            .then(city => { return this.httpRequest('weather', city); })
            .then(response => { this.eventsCreator(response) })

    }

    getWeatherForecast() {
        this.getCityFromInput()
            .then(city => { return this.httpRequest('forecast', city); })
            .then(result => { this.eventsCreator(result) })
    }


    getCityFromInput() {
        return new Promise(
            (resolve, reject) => {
                if (this.template.querySelector('lightning-input').value === '') {
                    reject(this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Wrong input',
                            message: 'Please enter a city.',
                            variant: 'warning',
                            mode: 'pester'
                        })));
                } else {
                    resolve(this.template.querySelector('lightning-input').value);
                }

            })
    }

    httpRequest(type, city) {
        return new Promise(function (resolve) {
            let request = new XMLHttpRequest();
            let requestAPI = 'https://api.openweathermap.org/data/2.5/' + type + '?q=' + city + '&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';
            // let requestAPI = 'asd';
            request.open('GET', requestAPI, true);
            request.onload = function () {
                resolve(this.response);
            }
            request.send();
        });
    }


    eventsCreator(response) {
        var event;
        try {
            let currentWeather = JSON.parse(response);
        if (currentWeather.cod >= 200 && currentWeather.cod < 400) {
            if (currentWeather.cnt == null) {
                event = new CustomEvent('weathernow', {
                    detail: currentWeather
                });
            } else {
                event = new CustomEvent('forecastsfromdata', {
                    detail: currentWeather.list
                });
            }

        } if (currentWeather.cod >= 400 && currentWeather.cod < 500) {
            event = new ShowToastEvent({
                title: 'Wrong input',
                message: 'Could not find this city. Please check typos or enter regional center.',
                variant: 'warning',
                mode: 'pester'
            });

        } if (currentWeather.cod >= 500) {
            event = new ShowToastEvent({
                title: 'Server error',
                message: 'An internal server error has occured. Please come back later.',
                variant: 'warning',
                mode: 'pester'
            });

        }
        }
        catch(error){
            console.log(error);
            event = new ShowToastEvent({
                title: 'External error',
                message: 'External error on the remote service. Please try again later.',
                variant: 'error',
                mode: 'pester'
            })
        }
        
     this.dispatchEvent(event);
}
}
