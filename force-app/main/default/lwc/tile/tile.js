import { LightningElement, track,api } from 'lwc';
import {fahrenheitToCelsius} from 'c/utils';
export default class Tile extends LightningElement {
    @api product;
    @api unitTile;


    

    tileClick() {
        const event = new CustomEvent('tileclick', {
            detail: this.product.dt
        });
   
        this.dispatchEvent(event);
    }

    get timeAndDate(){
        return this.product.dt*1000;
    }
    
    get temperature() {
        var currentTemp;
        if (this.unitTile==='C'){
            currentTemp = Math.round(this.product.main.temp);
        }
        else {
            currentTemp = Math.round(fahrenheitToCelsius(this.product.main.temp));
        }
        if (currentTemp>0) {
            return '+' + currentTemp + ' °' + this.unitTile;
        }
        return currentTemp + ' °' + this.unitTile;
    }
    get pictureLink(){
        return 'http://openweathermap.org/img/wn/'+this.product.weather[0].icon+'@2x.png'; 
    }
}

