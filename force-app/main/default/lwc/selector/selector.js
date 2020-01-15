import { LightningElement, track,api} from 'lwc';

export default class Selector extends LightningElement {
    @track weatherToDetail;
    @track bikes;
    
    
    handleProductSelected(evt) {
        this.weatherToDetail = evt.detail;
        this.weatherToDetail = this.bikes.find(bike => bike.dt === evt.detail);
        console.log('there is a selected product');
    }

    getForecast(evt) {
        this.bikes = evt.detail;
        console.log(this.bikes);
    }

    getCurrentWeather(evt) {
        this.weatherToDetail=evt.detail;
    }
}

