import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    selected={}  //for storing answers
    correctAnswers
    ooo
    cg
    questions=[{
        id:"Q1",
        question:"Which Is Best City In India For Living ?",
        answers:{
            a:"Hyderabad",
            b:"Bengaluru",
            c:"Mumbai"
        },
        correctAnswer:"b"
    },
    {
        id:"Q2",
        question:"Who is the Greatest Cricketer In The World ?",
        answers:{
            a:"Sachin Tendulker",
            b:"Rickey Ponting",
            c:"Brian Lara"
        },
        correctAnswer:"a"
    },
    {
        id:"Q3",
        question:"Who is Purushottam ?",
        answers:{
            a:"Loverboy",
            b:"Playboy",
            c:"Milkyboy"
        },
        correctAnswer:"b"
    }
]
get AllNotSelected(){
    return !(Object.keys(this.selected).length===this.questions.length)
}
changeHandler(event){
    console.log("name", event.target.name)
    console.log("value", event.target.value)
    const {name, value} = event.target
    this.selected={...this.selected, [name]:value}
}
submitHandler(event){
    this.ooo = true
event.preventDefault()

let corr = this.questions.filter(item=>this.selected[item.id]===item.correctAnswer)
//corr stores only if selected and correctAnswer are matched (based on key(id))
this.correctAnswers = corr.length
if(this.questions.length === corr.length){
    this.cg = "Congratulations! You Answered All Correct"

   
}
console.log("this.correctAnswers",this.correctAnswers)
/*const sum=(data)=>{
    let sum = data+10
    return sum
}
console.log(sum(5))*/
}
resetHandler(){
    this.ooo = false
this.selected={}
this.correctAnswers=0
}

 
/*callMe(){
    let event = new customEvent("event1", {
        detail:{name:"ravi"}
    })
    document.dispatchEvent(event)
}*/


}