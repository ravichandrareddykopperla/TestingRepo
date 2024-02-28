import LightningAlert from 'lightning/alert';
import { LightningElement } from 'lwc';

export default class AlertLWC extends LightningElement {
        async handleAlertClick() {
            await LightningAlert.open({
                message: 'this is the alert message',
                theme: 'success', // a red theme intended for error states
                label: 'success!', // this is the header text
            });
            //Alert has been closed
        }
}