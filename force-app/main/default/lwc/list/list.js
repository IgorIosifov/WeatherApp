import { LightningElement, track,api } from 'lwc';


export default class List extends LightningElement {
    @track forecasts;
    @api forecasts;
    @api unit;

    handleTileClick(evt) {
        const event = new CustomEvent('forecastselected', {
            detail: evt.detail
        });
        
        // Fire the event from c-list
        this.dispatchEvent(event);
    }  
}