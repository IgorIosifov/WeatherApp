import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Data extends LightningElement {

    // the next two chains create two different events with response in details
    getCurrentWeather() {
        this.getCityFromInput()
            .then(city => { return this.httpRequest('weather', city); })
            .then(response => { this.eventsCreator(response) })
    }

    getWeatherForecast() {
        this.getCityFromInput()
            .then(city => { return this.httpRequest('forecast', city); })
            .then(response => { this.eventsCreator(response) })
    }

    getCityFromInput() {
        return new Promise(
            (resolve, reject) => {
                const inputCity = this.template.querySelector('lightning-input').value;
                if (inputCity === '') {
                    reject(this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Wrong input',
                            message: 'Please enter a city.',
                            variant: 'warning',
                            mode: 'pester'
                        })));
                } else {
                    resolve(inputCity);
                }
            })
    }

    httpRequest(type, city) {
        return new Promise(function (resolve) {
            let request = new XMLHttpRequest();
            let requestAPI = 'https://api.openweathermap.org/data/2.5/' + type + '?q=' + city + '&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric';
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
            const dataFromAPI = JSON.parse(response);
            if (dataFromAPI.cod >= 200 && dataFromAPI.cod < 400) {
                //dataFromAPI.cnt == null means that the response contains the current weather,and not several forecasts.
                if (dataFromAPI.cnt == null) {
                    event = new CustomEvent('weathernow', {
                        detail: dataFromAPI
                    });
                } else {
                    event = new CustomEvent('forecastsfromdata', {
                        detail: dataFromAPI
                    });
                }

            } if (dataFromAPI.cod >= 400 && dataFromAPI.cod < 500) {
                event = new ShowToastEvent({
                    title: 'Wrong input',
                    message: 'Could not find this city. Please check typos or enter regional center.Error: ' + dataFromAPI.cod,
                    variant: 'warning',
                    mode: 'pester'
                });

            } if (dataFromAPI.cod >= 500) {
                event = new ShowToastEvent({
                    title: 'Server error',
                    message: 'An internal server error has occured. Please come back later.Error: ' + dataFromAPI.cod,
                    variant: 'warning',
                    mode: 'pester'
                });

            }
        }
        catch (error) {
            console.log(error);
            event = new ShowToastEvent({
                title: 'External error',
                message: 'The remote service is not responding. Please try again later.',
                variant: 'error',
                mode: 'pester'
            })
        }

        this.dispatchEvent(event);
    }
}
