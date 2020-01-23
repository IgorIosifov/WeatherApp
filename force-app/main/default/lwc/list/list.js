import { LightningElement,api } from 'lwc';


export default class List extends LightningElement {
    @api forecaststolist;
    @api unit;


    handleTileClick(evt) {
        const event = new CustomEvent('forecastselected', {
            detail: evt.detail
        });
        this.dispatchEvent(event);
    }  



}