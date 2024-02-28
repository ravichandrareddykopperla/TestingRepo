import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi'
import TYPE_FIELD  from '@salesforce/schema/Account.Type'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import filterAccountTypeType from '@salesforce/apex/AccountController.filterAccountTypeType'
export default class WireApexWithParams extends LightningElement {
    selectedType=''
    typeOptions=[]
    
    @wire(getObjectInfo, {objectApiName:ACCOUNT_OBJECT})
    objectInfo

    @wire(filterAccountTypeType, {type:'$selectedType'})
    filteredAccounts

    @wire(getPicklistValues, { recordTypeId:'$objectInfo.data.defaultRecordTypeId', fieldApiName:TYPE_FIELD})
    typePicklist({data, error}){
        if(data){
            console.log(data)
            this.typeOptions = [...this.generatePicklist(data)]
        }
        if(error){
            console.error(error)
        }
    }
    generatePicklist(data){
        return data.values.map(item=>({ label: item.label, value: item.value }))
    }
    handleTypeChange(event) {
        this.selectedType = event.detail.value;
    }

    
}