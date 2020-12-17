import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// MODELS
import { Guest } from 'src/app/models/guest';

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

  constructor(protected guestService: GuestService) { 
    this.guests = this.guestService.getGuests();
    this.setInitialState();
  }

  ngOnInit() {
    this.setInitialState();
  }

  private setInitialState() {
    this.isValidName = true;
    this.isValidContact = true;
    this.quantityN2 = false;
  }

  createList() {
    console.log(this.guestService.getGuests());
    this.showInvitationPreview();
  }

  addGuest() {
    if(this.isValidInputs()) {
      this.guestService.addGuest(this.name, this.contact, this.host, this.guestsQuantity);
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

}
