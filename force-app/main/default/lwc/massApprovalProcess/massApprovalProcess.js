import { LightningElement, wire, api, track } from 'lwc';
import getApprovalObjects from '@salesforce/apex/MassApprovalRejectReassignControl.getApprovalObjects';
import getFields from '@salesforce/apex/MassApprovalRejectReassignControl.getFields';
import fetchPendingApprovalRecords2 from '@salesforce/apex/MassApprovalRejectReassignControl.fetchPendingApprovalRecords2';
import fetchPendingApprovalRecords from '@salesforce/apex/MassApprovalRejectReassignControl.fetchPendingApprovalRecords';
import massApproveRecords from '@salesforce/apex/MassApprovalRejectReassignControl.massApproveRecords';
import massRejectRecords from '@salesforce/apex/MassApprovalRejectReassignControl.massRejectRecords';
import userlist from '@salesforce/apex/MassApprovalRejectReassignControl.userlist';
import massReassignRecords from '@salesforce/apex/MassApprovalRejectReassignControl.massReassignRecords';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import My_resource from '@salesforce/resourceUrl/projectlogo';
const ACTIONS = [
    { label: 'View', name: 'view' }
];
// const COLUMNS = [ 
//     {

//         type: 'button-icon',

//         fixedWidth: 40,

//         typeAttributes: {

//             iconName: 'utility:preview',

//             name: 'view_record',

//             title: 'View Record',

//             variant: 'border-filled',

//             alternativeText: 'View Record',

//             disabled: false

//         }

//     },
// { label: 'Approval Name', fieldName: 'name' },
// { label: 'Comments', fieldName: 'comments' },
// { label: 'Record Name', fieldName: 'recordname' },
// { label: 'Submitted by', fieldName: 'submittedBy' },
// // { label: 'Created By', fieldName: 'createdBy' },  
// // { label: 'Created Date', fieldName: 'createdDate', type: 'datetime',  

// //     typeAttributes: {

// //       day: 'numeric',

// //       month: 'short',

// //       year: 'numeric',

// //       hour: '2-digit',

// //       minute: '2-digit',

// //       second: '2-digit',

// //       hour12: true }},

// { label: 'Type', fieldName: 'objType' },
// { label: 'Status', fieldName: 'status' },
// /*{ 

//         type: 'action', 

//         typeAttributes: { rowActions: ACTIONS } 

//     } */





// /*{
//         type:"button",
//         fixedWidth: 150,
//         typeAttributes: {
//             label: 'view',
//             name: 'view',
//             variant: 'base'
//         }
// }*/
// ];


export default class MassApprovalProcess extends NavigationMixin(LightningElement) {
    count;
    @track isModalOpen = false;
    @track title;
    records;
    wiredRecords;
    error;
    //columns = COLUMNS;
    @track options = [];
    selectedRows;
    //projectlogo = My_resource;
    @track data = [];
    fields = []
    @track selecteduser;
    @track comment = '';
    showCommentBox = false;
    allRecs = true;
    duelBox = false;





    @track columns = [
        // {

        //     type: 'button-icon',

        //     fixedWidth: 40,

        //     typeAttributes: {

        //         iconName: 'utility:preview',

        //         name: 'view_record',

        //         title: 'View Record',

        //         variant: 'border-filled',

        //         alternativeText: 'View Record',

        //         disabled: false

        //     }

        // },
        // { label: 'Approval Name', fieldName: 'name' },
        // { label: 'Comments', fieldName: 'comments' },
        // { label: 'Record Name', fieldName: 'recordname' },
        // { label: 'Submitted by', fieldName: 'submittedBy' },
        // // { label: 'Created By', fieldName: 'createdBy' },  
        // // { label: 'Created Date', fieldName: 'createdDate', type: 'datetime',  

        // //     typeAttributes: {

        // //       day: 'numeric',

        // //       month: 'short',

        // //       year: 'numeric',

        // //       hour: '2-digit',

        // //       minute: '2-digit',

        // //       second: '2-digit',

        // //       hour12: true }},

        // { label: 'Type', fieldName: 'objType' },
        // { label: 'Status', fieldName: 'status' },
        // /*{ 

        //     type: 'action', 

        //     typeAttributes: { rowActions: ACTIONS } 

        // } */





        // /*{
        //     type:"button",
        //     fixedWidth: 150,
        //     typeAttributes: {
        //         label: 'view',
        //         name: 'view',
        //         variant: 'base'
        //     }
        // }*/
    ];

    @track columns2 = [
        {

            type: 'button-icon',

            fixedWidth: 40,

            typeAttributes: {

                iconName: 'utility:preview',

                name: 'view_record',

                title: 'View Record',

                variant: 'border-filled',

                alternativeText: 'View Record',

                disabled: false

            }

        },
        { label: 'Current Approver', fieldName: 'approverName' },
        { label: 'Assigned To', fieldName: 'assignedTo' },
        { label: 'Comments', fieldName: 'comments' },
        { label: 'Record Name', fieldName: 'name' },
        { label: 'Submitted by', fieldName: 'submittedBy' },
        { label: 'Object', fieldName: 'objType' },
        { label: 'Status', fieldName: 'status' },
    ];


    columns3 = [
        { label: "User", fieldName: "Name" }
        // { label: "Contact Name", fieldName: "Name", type: "text" },
        // { label: "Opportunity", fieldName: "Name", type: "text" }


    ];
    /* objectOptions = [
    
            { label: 'Account', value: 'Account' },
    
            //{ label: 'Case', value: 'Case' },
    
            { label: 'Leave Request', value: 'Leave_Request__c' },
                { label: 'Contact', value: 'Contact' },
    
     
        ];*/
    selectedObject;
    selectedObject = '';
    objectOptions = [];
    wiredRecords;


    @wire(getApprovalObjects)
    wiredApprovalObjects({ error, data }) {
        if (data) {
            // Prepare options for the combobox
            this.objectOptions = data.map((object) => ({
                label: object,
                value: object
            }));
        } else if (error) {
            console.error(error);
        }
    }

    @wire(fetchPendingApprovalRecords2)
    wiredAccount(value) {


        const { data, error } = value;
        this.wiredRecords = value;


        if (data) {
            let tempRecords = JSON.parse( JSON.stringify( data ) );
            console.log('comment are', JSON.stringify(tempRecords));
            tempRecords = tempRecords.map( row => {
                    return { ...row, name : row.ProcessInstance.CreatedBy.Name,
                    recordname: row.ProcessInstance.TargetObject.Name, 
                    status: row.StepStatus,
                    objType: row.ProcessInstance.TargetObject.Type,
                    comments : row.Comments,
                    submittedBy : row.Actor.Name };
                })
                this.allRecs = true;
                this.allRecords = tempRecords;

            this.count=this.allRecords.length;
            this.title = 'Your Pending Approvals (' + this.count + ')';
                        this.checkIfDataExists();

            console.log('Records are', JSON.stringify(this.allRecords));


        } else if (error) {


            console.log(JSON.stringify(error));
            this.allRecords = undefined;


        }


    }

    checkIfDataExists() {
        if (this.records && this.records.length > 0) {
            this.showCommentBox = true;
        }
    }


    handleObjectChange(event) {
        this.selectedObject = event.detail.value;
        refreshApex()
        getFields({ objectName: event.detail.value })
            .then(data => {
                this.duelBox = true;
                this.allRecs = false;
                console.log('fields are', JSON.stringify(data));
                console.log('length....' + JSON.stringify(Object.values(data).length));
                this.options = []
                for (let i = 1; i <= Object.values(data).length; i++) {
                    console.log('for in...', JSON.stringify(Object.values(data)[i]));
                    this.options.push({ label: Object.values(data)[i], value: Object.values(data)[i] });
                }
                console.log('option are', JSON.stringify(this.options));
            })
    }
    get options() {
        return this.options;
    }
    get min() {
        return 4;
    }

    get max() {
        return 4;
    }
    selectedFields(event) {
        console.log('selected fields....' + event.target.value)
        this.fields = event.target.value
    }
    @api async getData(event) {
        try {
            await fetchPendingApprovalRecords({ objectName: this.selectedObject, fields: this.fields })
                .then(result => {
                    console.log('data is.....' + JSON.stringify(result));
                    const columns = [
                        {

                            type: 'button-icon',

                            fixedWidth: 40,

                            typeAttributes: {

                                iconName: 'utility:preview',

                                name: 'view_record',

                                title: 'View Record',

                                variant: 'border-filled',

                                alternativeText: 'View Record',

                                disabled: false

                            }

                        },
                        { label: 'Approver Name', fieldName: 'approverName' },
                        { label: 'Record Name', fieldName: 'name' },
                        { label: 'Submitted by', fieldName: 'submittedBy' },
                        { label: 'Object', fieldName: 'objType' },
                        { label: 'Status', fieldName: 'status' },
                        { label: this.fields[0], fieldName: 'field0' },
                        { label: this.fields[1], fieldName: 'field1' },
                        { label: this.fields[2], fieldName: 'field2' },
                        { label: this.fields[3], fieldName: 'field3' }];

                    this.allRecs = false;
                    this.duelBox = false;
                    this.records = result;
                    this.columns = columns;
                    console.log('colums are .....' + JSON.stringify(this.columns));

                })
        }
        catch (err) {
            console.log('catch error.....' + JSON.stringify(err))
        }
    }
    get columns() {
        return this.columns;
    }



    handleRowAction(event) {


        const row = event.detail.row;
        console.log('Row is', JSON.stringify(row));
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.objectRecordId,
                actionName: 'view'
            }
        });
    }


    handleSelect(event) {


        this.selectedRows = event.detail.selectedRows;


    }


    handleCommentChange(event) {

        this.comment = event.target.value;

    }

    @api async approveRecords() {


        console.log('Selected Rows are', JSON.stringify(this.selectedRows));


        await massApproveRecords({ selectedRows: JSON.stringify(this.selectedRows), comment: this.comment })
            .then(result => {


                console.log(result);

                if (result == 'success') {


                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Approval',
                            message: 'Records are approved',
                            variant: 'success',
                        }),
                    );


                } else {


                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Approval',
                            message: 'Some error occured. Please check with your system admin!',
                            variant: 'error',
                        }),
                    );


                }


            })
            .catch(error => {


                console.log(JSON.stringify(error));


            });

        refreshApex(this.wiredRecords);


        setTimeout(() => {
            window.location.reload();
        }, 2000);


    }



    @api async rejectRecords() {


        console.log('Selected Rows are', JSON.stringify(this.selectedRows));

        await massRejectRecords({ selectedRows: JSON.stringify(this.selectedRows), comment: this.comment })
            .then(result => {

                console.log(result);

                if (result == 'success') {

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Rejection',
                            message: 'Records are Rejected',
                            variant: 'success',
                        }),
                    );

                } else {

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Rejection',
                            message: 'Some error occured. Please check with your system admin!',
                            variant: 'error',
                        }),
                    );

                }

            })
            .catch(error => {

                console.log(JSON.stringify(error));

            });







        refreshApex(this.wiredRecords);


        setTimeout(() => {
            window.location.reload();
        }, 2000);



    }

    reassignRecords(event) {
        console.log('reassign')
        this.isModalOpen = true;


        userlist({

        })
            .then(result => {
                if (result.length > 0) {
                    // set @track contacts variable with return contact list from server  
                    this.data = result;
                }


            })
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    @api async  handleClick(event) {
        this.selecteduser = event.target.value;
        console.log(' this.selecteduser' + this.selecteduser)
        console.log(' this.selectedrows' + JSON.stringify(this.selectedRows))
        console.log('comment value' + this.comment)
        await massReassignRecords({
            recordId: JSON.stringify(this.selectedRows),
            userId: this.selecteduser,
            comment: this.comment
        })
            .then(result => {

                console.log(result);
                this.isModalOpen = false;
                if (result == 'success') {

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Assigned',
                            message: 'Records are reasign to ==> ' + this.selecteduser,
                            variant: 'success',
                        }),
                    );

                } else {

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Rejection',
                            message: 'Some error occured. Please check with your system admin!',
                            variant: 'error',
                        }),
                    );

                }

            })

        setTimeout(() => {
            window.location.reload();
        }, 2000);

    }



}