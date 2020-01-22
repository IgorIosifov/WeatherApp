import { LightningElement, track } from 'lwc';

export default class Selector extends LightningElement {
    @track weatherToDetail;
    @track forecastsFromData;
    @track newUnit;
    @track forecastsCity;

    handleForecastSelected(evt) {
        //get the appropriate forecast from list to display detail information about it.
        this.weatherToDetail = this.forecastsFromData.find(forecastsFromData => forecastsFromData.dt === evt.detail);
    }

    getForecasts(evt) {
        this.forecastsFromData = evt.detail.list;
        // this block is for checking if "current weather" city is the same that "forecast weather" city. If it's not - clear the other block.
        this.forecastsCity = evt.detail.city.name;
        if (this.weatherToDetail!==undefined) {
            if (this.forecastsCity !== this.weatherToDetail.name) {
                this.weatherToDetail = null;
            }
        }
        
    }

    getCurrentWeather(evt) {
        this.weatherToDetail = evt.detail;
        // this block is for checking if "current weather" city is the same that "forecast weather" city. If it's not - clear the other block.
        if (this.forecastsCity !== undefined) {
            if (this.forecastsCity !== this.weatherToDetail.name) {
                this.forecastsFromData = null;
            }
        }
    }

    // if user has selected another unit, we must change unit in all tiles 
    setNewUnit(evt) {
        this.newUnit = evt.detail;
    }

     // if user has not yet selected a unit , the default unit is C 
    get unit() {
        if (this.newUnit === undefined) {
            return 'C';
        }
        return this.newUnit;
    }
}

