import { LightningElement,api,track } from 'lwc';

export default class ProductListPageTwo extends LightningElement {
    @api prod={}
   @track count=1
   IncClick(){
    this.count=this.count+1
   }
   DecClick(){
    if(this.count>1)
        this.count=this.count-1
   }
}