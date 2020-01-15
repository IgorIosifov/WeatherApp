import { LightningElement, track, api } from 'lwc';


export default class Detail extends LightningElement {
    
    @track product;

    set chosenProduct(value) {
        this.product = value;
    }
    
    @api get chosenProduct(){
        return this.product;
    }

    get weatherDescription(){
        return this.product.weather[0].description;
    }

    get pressure(){
        const convertPressureFromHPatoMmHg = 0.750062;
        return Math.round(this.product.main.pressure*convertPressureFromHPatoMmHg);
    }
}