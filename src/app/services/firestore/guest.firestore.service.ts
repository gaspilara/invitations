import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Guest } from 'src/app/models/guest';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class GuestFirestoreService {

    public guests: Guest[] = [];
    public documentId = null;
    public currentStatus = 1;
    public newGuestForm = new FormGroup({
        name: new FormControl(''),
        contact: new FormControl(''),
        code: new FormControl(''),
        host: new FormControl(''),
        guestsQuantity: new FormControl(''),
        id: new FormControl(''),
    })

    constructor(private firestoreService: FirestoreService) {
        this.newGuestForm.setValue({
            name: '',
            contact: '',
            code: '',
            host: '',
            guestsQuantity: '',
            id: '',
        })
    }
  
    getGuests() {
        return this.firestoreService.getGuests().subscribe((guestsSnapshot) => {
            this.guests = [];
            guestsSnapshot.forEach((guestData: any) => {
                this.guests.push({
                id: guestData.payload.doc.id,
                data: guestData.payload.doc.data()
                });
            })
        });
    }

    public newGuest(form: any, documentId: any = this.documentId) {
        console.log(`Status: ${this.currentStatus}`);
        if (this.currentStatus == 1) {
            let data = {
                name: form.name,
                contact: form.contact,
                code: form.code,
                host: form.host,
                guestsQuantity: form.guestQuantity,
            }
            this.firestoreService.createGuest(data).then(() => {
                console.log('Documento creado exitósamente!');
                this.newGuestForm.setValue({
                    name: '',
                    contact: '',
                    code: '',
                    host: '',
                    guestsQuantity: '',
                    id: '',
                });
            }, (error) => { console.error(error); });
        } else {
            let data = {
                name: form.name,
                contact: form.contact,
                code: form.code,
                host: form.host,
                guestsQuantity: form.guestQuantity,
            }
            this.firestoreService.updateGuest(documentId, data).then(() => {
                this.currentStatus = 1;
                this.newGuestForm.setValue({
                    name: '',
                    contact: '',
                    code: '',
                    host: '',
                    guestsQuantity: '',
                    id: '',
                });
                console.log('Documento editado exitósamente');
            }, (error) => { console.log(error); });
        }
    }

    public editGuest(documentId: any) {
        let editSubscribe = this.firestoreService.getGuest(documentId).subscribe((guest) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newGuestForm.setValue({
            id: documentId,
            name: guest.payload.data()['name'],
            contact: guest.payload.data()['contact'],
            code: guest.payload.data()['code'],
            host: guest.payload.data()['host'],
            guestsQuantity: guest.payload.data()['guestsQuantity'],
        });
        editSubscribe.unsubscribe();
        });
    }

    public deleteGuest(documentId: any) {
        this.firestoreService.deleteGuest(documentId).then(() => {
        console.log('Documento eliminado!');
        }, (error) => { console.error(error); });
    }

}