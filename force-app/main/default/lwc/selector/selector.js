import { LightningElement, track } from 'lwc';

export default class Selector extends LightningElement {
    @track weatherToDetail;
    @track forecasts;
    @track newUnit;

    
    handleProductSelected(evt) {
        this.weatherToDetail = evt.detail; //what is it?
        this.weatherToDetail = this.forecasts.find(forecasts => forecasts.dt === evt.detail);
    }

    getForecasts(evt) {
        this.forecasts = evt.detail;
    }

    getCurrentWeather(evt) {
        this.weatherToDetail = evt.detail;
    }
    setNewUnit(evt) {
        this.newUnit = evt.detail;
    }

    get unit() {
        if (this.newUnit === undefined) {
            return 'C';
        }
        return this.newUnit;
    }
}

