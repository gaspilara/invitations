import { Guest } from "./guest";

export class Event {

    name: string;
    adress: string;
    date: Date;
    duration: number;
    thematic: string;
    guestList: Guest[];

    constructor(name: string, adress: string, date: Date, duration: number, thematic: string, guestList: Guest[]) {
        this.name = name;
        this.adress = adress;
        this.date = date;
        this.duration = duration;
        this.thematic = thematic;
        this.guestList = guestList;
    }
    
}