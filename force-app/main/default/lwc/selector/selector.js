import { LightningElement, track } from 'lwc';

export default class Selector extends LightningElement {
    @track weatherToDetail;
    @track bikes;
    @track newUnit;


    handleProductSelected(evt) {
        this.weatherToDetail = evt.detail;
        this.weatherToDetail = this.bikes.find(bike => bike.dt === evt.detail);
    }

    getForecast(evt) {
        this.bikes = evt.detail;
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

