import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    showModal = false
    msg
    clickHandler(){ 
        this.showModal = true
    }
    closeHandler(event){ 
        this.msg = event.detail.msg
        console(this.msg)
        this.showModal = false
    }
}