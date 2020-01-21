import { LightningElement, track,api } from 'lwc';


export default class List extends LightningElement {
    @track bikes;
    @api bks;
    @api unit;

    handleTileClick(evt) {
        // This component wants to emit a productselected event to its parent
        const event = new CustomEvent('productselected', {
            detail: evt.detail
        });
        
        // Fire the event from c-list
        this.dispatchEvent(event);
    }  
}