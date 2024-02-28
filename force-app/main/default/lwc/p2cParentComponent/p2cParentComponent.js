import { LightningElement, track } from 'lwc';

export default class P2cParentComponent extends LightningElement {
    carouselData=[
        {
            src:"https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
            header:"First Card",
            description:"First Description"
        },
        {
            src:"https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
            header:"Second Card",
            description:"Second Description"
        },
        {
            src:"https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
            header:"Third Card",
            description:"Third Description"
        }
    ]

    @track percentage=10
    @track alertMSG = ''
    changeHandler(event){
        if(this.percentage < 101){
        this.percentage = event.target.value
        }
        if(this.percentage > 100){
            this.alertMSG = 'invalid.....  Please Refresh The Page'
        }
    }
}