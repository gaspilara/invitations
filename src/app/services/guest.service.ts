import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  guests: Guest[] = [];

  constructor() { }

  getGuests() { return this.guests; }

  addGuest(name: string, contact: string, host: boolean, guestsQuantity: number) {
    let guest = {
      name: name,
      contact: contact,
      code: this.getValidCode(),
      host: host,
      guestsQuantity: guestsQuantity,
    }
    this.guests.push(guest);
  }

  getValidCode(): number {
    return Math.floor(Math.random() * 100000);
  }

}
