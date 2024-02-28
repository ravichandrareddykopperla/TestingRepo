import pubsub from 'c/pubsub';
import { LightningElement } from 'lwc';
export default class PubsubComponentB extends LightningElement {
    message
    connectedCallback(){
        this.callSubscriber()
    }
    callSubscriber(){
        pubsub.subscribe('componentA', (message)=>{
            this.message = message
            if(this.message === '<---------- Type atleast 20 characters ---------->'){
                const elem = this.template.querySelector('.slds-p-around_medium')
        elem.style.border ="1px solid red";
        console.log('gggggg')
                this.message = message
                
            }
        })
    }
}