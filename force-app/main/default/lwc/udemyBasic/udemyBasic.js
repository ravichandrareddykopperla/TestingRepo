import { LightningElement, track } from 'lwc';

export default class UdemyBasic extends LightningElement {
    input1 = "World"
    input2 = "Ravi"
    changeHandler(event){
        this.input2 = event.target.value
    }

    @track adress={
        City: "Bengaluru",
        State: "Karnataka",
        Country: "India"
    }
    trackHandler(event){
        this.adress = {...this.adress, "City":event.target.value}
    }
    trackHandler2(event){
        this.adress.State = event.target.value
    }
    trackHandler3(event){
        this.adress.Country = event.target.value
    }

    users = ["ravi", "reddy"]
    num1 = 0
    num2 = 0
    
    

    mulHandler(event){
        this.num1 = event.target.value
    }
    mulHandler2(event){
        this.num2 = event.target.value  
    }

    get firstuser(){
        return this.users[0]
    }
    get mulValue(){
        return this.num1*this.num2
    }
}