import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  public createGuest(data: { name: string, contact: string, code: number, host: boolean, guestsQuantity: number }) {
    return this.firestore.collection('guests').add(data);
  }
  
  public getGuest(documentId: string) {
    return this.firestore.collection('guests').doc(documentId).snapshotChanges();
  }
  
  public getGuests() {
    return this.firestore.collection('guests').snapshotChanges();
  }
  
  public updateGuest(documentId: string, data: any) {
    return this.firestore.collection('guests').doc(documentId).set(data);
  }

  public deleteGuest(documentId: any) {
    return this.firestore.collection('guests').doc(documentId).delete();
    // throw new Error('Method not implemented.');
  }
}