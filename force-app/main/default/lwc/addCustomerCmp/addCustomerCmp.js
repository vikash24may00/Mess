// addCustomers.js
import { LightningElement, track } from 'lwc';
import createCustomers from '@salesforce/apex/CustomerController.createCustomers';


export default class AddCustomerCmp extends LightningElement {
    @track totalNumberOfRecords = 0;
    @track customers = [{ FirstName: '', LastName: '', Email: '', Gender: '', keyIndex: 0 }];

    addCustomer() {
        this.totalNumberOfRecords++;
        this.customers.push({ FirstName: '', LastName: '', Email: '', Gender: '', keyIndex: this.totalNumberOfRecords });
        console.log( JSON.stringify(this.customers));
    }

    handleInputChange(event) {
        // debugger;
        const fieldName = event.target.dataset.field;
        const fieldValue = event.target.value;
        const index = event.target.dataset.index;

        // Find the customer object with matching keyIndex and update its field value
        const customerToUpdate = this.customers.find(customer => customer.keyIndex === parseInt(index, 10));
        if (customerToUpdate) {
            customerToUpdate[fieldName] = fieldValue;
        }
    }

    removeCustomer(event) {
        const index = event.target.dataset.index;
        this.customers.splice(index, 1);
        this.customers = [...this.customers];
        this.totalNumberOfRecords--;
    }

    handleSubmit() {
        const customerRecords = this.customers.map(customer => {
            return {
                sobjectType: 'Contact',
                FirstName: customer.FirstName,
                LastName: customer.LastName,
                Email: customer.Email,
                Gender__c: customer.Gender
            };
        });

        // Call Apex method to save customers
        createCustomers({ customers: customerRecords })
            .then(result => {
                console.log('Customers saved successfully:', result);
                // Optionally, you can perform any additional actions after successful save
            })
            .catch(error => {
                console.error('Error saving customers:', error);
                // Optionally, you can handle errors and display a message to the user
            });
    }
}
