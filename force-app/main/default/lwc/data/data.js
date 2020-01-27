import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Data extends LightningElement {
    @track currentCity;

    // this callback used to show weather and forecast using current location if user wants to
    connectedCallback() {
        var init = new Promise(
            (resolve) => {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        resolve('lat=' + position.coords.latitude
                            + '&lon=' + position.coords.longitude);
                    })
            })

        init
            .then(city => { return this.httpRequest('weather', city) })
            .then(response => { this.eventsCreator(response) })

        // use result of the previous promise to display forecast
        init
            .then(city => { return this.httpRequest('forecast', city, this.amountOfForecasts); })
            .then(response => { this.eventsCreator(response) })

    }

    getCurrentWeather() {
        this.getCityFromInputOrGeoLoc()
            .then(city => { return this.httpRequest('weather', city); })
            .then(response => { this.eventsCreator(response) })
    }

    getWeatherForecast() {
        this.getCityFromInputOrGeoLoc()
            .then(city => { return this.httpRequest('forecast', city, this.amountOfForecasts); })
            .then(response => { this.eventsCreator(response) })
    }

    getCityFromInputOrGeoLoc() {
        return new Promise(
            (resolve, reject) => {
                let inputCity = this.template.querySelector('lightning-input').value;
                //case 1. no city to request data
                if (inputCity === '' && this.currentCity === undefined) {
                    reject(this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Wrong input',
                            message: 'Please enter a city.',
                            variant: 'warning',
                            mode: 'pester'
                        })));
                } else {
                    //case 2. there is geolocation and there isn't input city
                    if (inputCity === '' && this.currentCity !== undefined) {
                        resolve(this.currentCity);
                    //case 3. There are both geolocation and input city. Input city is preferable.
                    } else {
                        resolve('q=' + inputCity);
                    }
                }
            })
    }

    httpRequest(type, city, amountOfForecasts) {
        return new Promise(function (resolve) {
            let request = new XMLHttpRequest();
            let requestAPI = 'https://api.openweathermap.org/data/2.5/' + type + '?' + city + '&appid=be44a17b8f33f7adf056ca9ad4501437&units=metric&cnt=' + amountOfForecasts;
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
                    this.currentCity = dataFromAPI.name;
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

   
    // value means amount of days from index page
    @track value = '1';

    // multiply 8 because API returns 8 forecasts per day
    get amountOfForecasts() {
        return this.value * 8;
    }
    
    get options() {
        return [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }


}
