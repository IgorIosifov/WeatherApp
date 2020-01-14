import { LightningElement, track} from 'lwc';

export default class Selector extends LightningElement {
    @track selectedProductId;

    handleProductSelected(evt) {
        this.selectedProductId = evt.detail;
    }

    // getForecast() {
    //     const getnewforecast = new Event();
    //     // Fire the event from c-tile
    //     dispatchEvent(getnewforecast);
    //     console.log('imhere');
    // }
}

