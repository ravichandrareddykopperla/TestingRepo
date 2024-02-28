import { LightningElement,wire } from 'lwc';
import getProductList from '@salesforce/apex/productList.getProductList'
// import getProductImage from '@salesforce/apex/productList.getProductImages'
// import getProductPrice from '@salesforce/apex/productList.getProductPrice'
export default class ProductListPageOne extends LightningElement {
    // getPrdId
    Products = []
    // PImages =[]
    // Pprice = []
    error
        @wire(getProductList) 
        prd({data,error}){
            if(data){
                this.Products = data
                
            }else if(error){
                this.error = error
                console.error(error)
            }
        }
        // @wire(getProductImage) 
        // prdImage({data,error}){
        //     if(data){
        //         this.PImages = data
                
        //     }else if(error){
        //         this.error = error
        //         console.error(error)
        //     }
        // }

        // @wire(getProductPrice)
        // prdPrice({data,error}){
        //     if(data){
        //         this.Pprice = data
                
        //     }else if(error){
        //         this.error = error
        //         console.error(error)
        //     }
        // }
}