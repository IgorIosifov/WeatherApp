import { LightningElement, api } from 'lwc';
import {addPlusOrNot} from 'c/utils';
export default class Tile extends LightningElement {
    @api weathertodetail;
    @api unit;

    tileClick() {
        const event = new CustomEvent('tileclick', {
            //this.weathertodetail.dt means timestamp, UNIX. I use it as an unique id for each forecast. 
            detail: this.weathertodetail.dt
        });
        this.dispatchEvent(event);
    }

    get timeAndDate(){
        //converting seconds to milliseconds
        return this.weathertodetail.dt*1000;
        
    }
    
    get temperature() {
        const currentTemp = this.weathertodetail.main.temp;
        return addPlusOrNot(currentTemp, this.unit);
    }
    get pictureLink(){
        return 'http://openweathermap.org/img/wn/'+this.weathertodetail.weather[0].icon+'@2x.png'; 
    }
    
}

