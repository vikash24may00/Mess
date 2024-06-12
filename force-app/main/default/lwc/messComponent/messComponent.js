// messBillManagement.js
import { LightningElement, track } from 'lwc';

export default class MessBillManagement extends LightningElement {
    @track entries = [];
    @track dailyUpdates = {'sObject':'Entries__c'};
    @track serialNumber = 1;
    orderOptions = [
        { label: 'Received', value: 'Received' },
        { label: 'Not Received', value: 'Not Received' },
        { label: 'Semi Received', value: 'Semi Received' }
    ];
    
    addEntry() {
        const newEntry = {
            id: Date.now().toString(),
            name: '',
            amount: '',
            date: '',
            attendance: '',
            serialNumber: this.serialNumber++
        };
        this.entries.unshift(newEntry);
        this.updateSerialNumbers();
    }

    updateSerialNumbers() {
        this.entries.forEach((entry, index) => {
            entry.serialNumber = index + 1;
        });
    }

    handleInputChange(event) {
        const index = event.target.dataset.index;
        const field = event.target.dataset.field;
        let value = event.target.value;

        // date
        if (field === 'date') {
            const date = new Date(value);
            value = date.toISOString().split('T')[0];
        }

        this.entries[index][field] = value;
    }

    deleteEntry(event) {
        const entryId = event.target.dataset.entryId;
        this.entries = this.entries.filter(entry => entry.id !== entryId);
        this.updateSerialNumbers();
    }

    handleSubmit() {
        // submit logic
        console.log('Submitting entries:', JSON.stringify(this.entries));
    }
}
