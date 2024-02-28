import pubsub from 'c/pubsub';
import { LightningElement } from 'lwc';
export default class PubsubComponentA extends LightningElement {
    message
    inputHandler(event){
        this.message = event.target.value
        if(this.message.length > 20){
            this.message = event.target.value
        }
        if(this.message.length < 20){
            this.message = '<---------- Type atleast 20 characters ---------->'
        }
    }
    publishHandler(){
        pubsub.publish('componentA', this.message)
    }
}