import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {
    @api product;

    tileClick() {
        const event = new CustomEvent('tileclick', {
            // detail contains only primitives
            detail: this.product.dt
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);
    }

    get timeAndDate(){
        return this.product.dt_txt;
    }

    get temperature() {
        var currentTemp = Math.round(this.product.main.temp);
        if (currentTemp>0) {
            return '+' + currentTemp;
        }
        return currentTemp;
    }
}
