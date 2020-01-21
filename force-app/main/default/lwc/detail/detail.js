import { LightningElement, track, api } from 'lwc';
import { fahrenheitToCelsius } from 'c/utils';

export default class Detail extends LightningElement {

    @track product;
    

    set chosenProduct(value) {
        this.product = value;
    }

    @api get chosenProduct() {
        return this.product;
    }

    get weatherDescription() {
        return this.product.weather[0].description;
    }

    get pressure() {
        const convertPressureFromHPatoMmHg = 0.750062;
        return Math.round(this.product.main.pressure * convertPressureFromHPatoMmHg);
    }

    @track selectedUnit = 'C';
    @track options = [
        { 'label': '℃', 'value': 'C', checked: true },
        { 'label': '℉', 'value': 'F', checked: false },
    ];

    handleradiochange(event) {
        this.selectedUnit = event.target.value;

        this.options.forEach(option => { option.checked = option.value === this.selectedUnit });
        const changeunit = new CustomEvent('changeunit', {
            detail: this.selectedUnit
        });
        // Fire the event from c-list
        this.dispatchEvent(changeunit);
    }
    
    @api get unit() {
        return this.selectedUnit;
    }

    get temperature() {
        const currentTemp = this.product.main.temp;
        if (this.selectedUnit === 'C') {
            if (currentTemp > 0) {
                return '+' + Math.round(currentTemp) ;
            } return Math.round(currentTemp);
        }
        if (fahrenheitToCelsius(currentTemp) > 0) {
            return '+' + Math.round(fahrenheitToCelsius(currentTemp));
        } return Math.round(fahrenheitToCelsius(currentTemp));
    }    

get feelsLike(){
    const feels_like = this.product.main.feels_like;
    if (this.selectedUnit === 'C') {
        if (feels_like > 0) {
            return '+' + Math.round(feels_like) ;
        } return Math.round(feels_like);
    }
    if (fahrenheitToCelsius(feels_like) > 0) {
        return '+' + Math.round(fahrenheitToCelsius(feels_like));
    } return Math.round(fahrenheitToCelsius(feels_like));
}

get windDirection(){
    const step = 22.5;
    if (this.product.wind.deg < step) {
        return 'N';
    }
    if (this.product.wind.deg < step * 3) {
        return 'NE';
    }
    if (this.product.wind.deg < step * 5) {
        return 'E';
    }
    if (this.product.wind.deg < step * 7) {
        return 'SE';
    }
    if (this.product.wind.deg < step * 9) {
        return 'S';
    }
    if (this.product.wind.deg < step * 11) {
        return 'SW';
    }
    if (this.product.wind.deg < step * 13) {
        return 'W';
    }
    if (this.product.wind.deg < step * 15) {
        return 'NW';
    }
    return 'N';
}
get link(){
    return 'http://openweathermap.org/img/wn/'+this.product.weather[0].icon+'@2x.png'; 
}
}