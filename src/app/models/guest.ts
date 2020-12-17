export class Guest {

    name: string;
    contact: string;
    code: number;
    host: boolean;
    guestsQuantity: number;

    constructor(name: string, contact: string, code: number, host: boolean, guestsQuantity: number) {
        this.name = name;
        this.contact = contact;
        this.code = code;
        this.host = host;
        this.guestsQuantity = guestsQuantity;
    }
}