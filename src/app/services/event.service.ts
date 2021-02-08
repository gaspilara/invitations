import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestFirestoreService } from './firestore/guest.firestore.service';
import { GuestService } from './guest.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    guestList: Guest[] = [];
    name: string;
    duration: number;
    thematic: string;
    eventDate: any;
    adress: any;

    // constructor(private guestService: GuestService) { }
    constructor(private guestFirestoreService: GuestFirestoreService) { }

    setEvent(name: string, duration: number, thematic: string, eventDate: any, adress: any) {
        this.name = name;
        this.duration = duration;
        this.thematic = thematic;
        this.eventDate = eventDate;
        this.adress = adress;
    }

    getEvent() {
        return {
            name: this.name,
            adress: this.adress,
            date: this.eventDate,
            duration: this.duration,
            thematic: this.thematic,
            // guestList: this.guestService.getGuests(),
            guestList: this.guestFirestoreService.getGuests(),
        }
    }

}
