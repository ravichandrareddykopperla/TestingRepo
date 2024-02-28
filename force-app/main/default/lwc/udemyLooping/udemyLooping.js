import { LightningElement } from 'lwc';

export default class UdemyLooping extends LightningElement {
    places = ["Hyd", "Bgl","Pune","Mumb"]
    moviesList = [{
        id: 1,
        actor: "Prabhas",
        movie: "Saaho"
    },
    {
        id: 3,
        actor: "Ram",
        movie: "Ready" 
    },
    {
        id: 2,
        actor: "NTR",
        movie: "Temper" 
    }
]
}