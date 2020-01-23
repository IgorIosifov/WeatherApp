import { LightningElement, track, api } from 'lwc';
import { degreeToDirection, addPlusOrNot } from 'c/utils';

export default class Detail extends LightningElement {

    @track weatherToDetail;

    set selectedForecast(value) {
        this.weatherToDetail = value;
    }

    @api get selectedForecast() {
        return this.weatherToDetail;
    }

    // this block is responsible for measurement unit changing

    @track selectedUnit = 'C';
    // @track value = 'C';
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
        this.dispatchEvent(changeunit);
    }

    @api get unit() {
        return this.selectedUnit;
    }

    //this block is responsible for proper info displaying
    get temperature() {
        const currentTemp = this.weatherToDetail.main.temp;
        return addPlusOrNot(currentTemp, this.selectedUnit);
    }

    get feelsLike() {
        const feels_like = this.weatherToDetail.main.feels_like;
        return addPlusOrNot(feels_like, this.selectedUnit);
    }

    get windDirection() {
        return degreeToDirection(this.weatherToDetail.wind.deg);
    }
    get iconLink() {
        return 'http://openweathermap.org/img/wn/' + this.weatherToDetail.weather[0].icon + '@2x.png';
    }

    get weatherDescription() {
        return this.weatherToDetail.weather[0].description;
    }

    get pressure() {
        const CONVERT_PRESSURE_FROM_HPA_TO_MMHG = 0.750062;
        return Math.round(this.weatherToDetail.main.pressure * CONVERT_PRESSURE_FROM_HPA_TO_MMHG);
    }
}