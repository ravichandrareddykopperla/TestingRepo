import { LightningElement } from 'lwc';

export default class UdemyConditionalRendering extends LightningElement {
    isVisible = false
    value
    handleClick(event){
        this.isVisible = true
    }
    inputText(event){
        this.value = event.target.value
    }
    get inputValue(){
        return this.value !== null
    }
}