import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from '../../services/firestore/firestore.service';
@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  public cats = [];

  public documentId = null;
  public currentStatus = 1; // (modo de edición de documentos)
      // currentStatus = 0; // (modo de creación de documentos)
  public newCatForm = new FormGroup({
    nombre: new FormControl(''),
    url: new FormControl(''),
    id: new FormControl('')
  });

  constructor(private firestoreService: FirestoreService) {
    this.newCatForm.setValue({
      id: '',
      nombre: '',
      url: ''
    });
  }
  
  ngOnInit() {
    this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });
  }

  public newCat(form: any, documentId: any = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.firestoreService.createCat(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newCatForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.firestoreService.updateCat(documentId, data).then(() => {
        this.currentStatus = 1;
        this.newCatForm.setValue({
          nombre: '',
          url: '',
          id: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }

  public editCat(documentId: any) {
    let editSubscribe = this.firestoreService.getCat(documentId).subscribe((cat) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newCatForm.setValue({
        id: documentId,
        nombre: cat.payload.data()['nombre'],
        url: cat.payload.data()['url']
      });
      editSubscribe.unsubscribe();
    });
  }

  public deleteCat(documentId: any) {
    this.firestoreService.deleteCat(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }

}