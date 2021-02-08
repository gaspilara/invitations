import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// MODELS
import { Guest } from 'src/app/models/guest';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { GuestFirestoreService } from 'src/app/services/firestore/guest.firestore.service';

// SERVICES
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'form-guest-list',
  templateUrl: './form-guest-list.component.html',
  styleUrls: ['./form-guest-list.component.scss']
})
export class FormGuestListComponent implements OnInit {

  @Output() hideButton: EventEmitter<boolean> = new EventEmitter();
  
  guests: Guest[];
  name: string = '';
  contact: string = '';
  code: string = '';
  host: boolean = false;
  isValidName: boolean = true;
  isValidContact: boolean = true;
  quantityN2: boolean = false;
  guestsQuantity: number = 0;
  
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

  // constructor(protected guestService: GuestService) { 
  constructor(protected guestFirestoreService: GuestFirestoreService, private firestoreService: FirestoreService) { 
    this.guests = this.guestFirestoreService.getGuests();
    this.setInitialState();
  }

  ngOnInit() {
    this.setInitialState();
  }

  private setInitialState() {
    this.isValidName = true;
    this.isValidContact = true;
    this.quantityN2 = false;
    this.newGuestForm.setValue({
        name: '',
        contact: '',
        code: '',
        host: '',
        guestsQuantity: '',
        id: '',
    })
  }

  createList() {
    // console.log(this.guestService.getGuests());
    console.log(this.guestFirestoreService.getGuests());
    this.showInvitationPreview();
  }

  addGuest() {
    if(this.isValidInputs()) {
      // this.guestService.addGuest(this.name, this.contact, this.host, this.guestsQuantity);
      this.guestFirestoreService.newGuest(this.name, this.contact, this.host, this.guestsQuantity);
    }
  }

  isValidInputs(): boolean {
    return this.changeValidName() && this.changeValidContact();
  }

  changeValidName(): boolean {
    if(this.name === '') {
      this.isValidName = false;
      return false;
    } else {
      this.isValidName = true;
      return true;
    }
  }

  changeValidContact(): boolean {
    if(this.contact === '') {
      this.isValidContact = false;
      return false;
    } else {
      this.isValidContact = true;
      return true;
    }
  }

  onHostChange(value: boolean) {
    this.host = value;
    this.quantityN2 = value;
  }

  showInvitationPreview() {
    this.hideButton.emit(true);
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
