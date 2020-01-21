import { LightningElement, track,api } from 'lwc';
import {addPlusOrNot} from 'c/utils';
export default class Tile extends LightningElement {
    @api weatherstodetail;
    @api unit;


    

    tileClick() {
        const event = new CustomEvent('tileclick', {
            detail: this.weatherstodetail.dt
        });
   
        this.dispatchEvent(event);
    }

    get timeAndDate(){
        return this.weatherstodetail.dt_txt;
    }
    
    get temperature() {
        const currentTemp = this.weatherstodetail.main.temp;
        return addPlusOrNot(currentTemp, this.unit);
    }
    get pictureLink(){
        return 'http://openweathermap.org/img/wn/'+this.weatherstodetail.weather[0].icon+'@2x.png'; 
    }
}

