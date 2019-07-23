import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


import { CRUDService } from '../services/crud.service';


export interface MasterClass{
  carga : string, // Carga horária da MasterClass
  curriculo : string, // Currículo do palestrante da MasterClass
  data : string, // Data que a MasterClass será realizada
  horario : string, // Horário que a MasterClass será realizada
  local : string, // Local que a MasterClass será realizada
  nome: string, // Nome da MasterClass
  palestrante : string // Nome do palestrante da MasterClass
}
@Component({
  selector: 'app-masterclass',
  templateUrl: './masterclass.page.html',
  styleUrls: ['./masterclass.page.scss'],
})
export class MasterclassPage implements OnInit {

  private refMasterClass: AngularFirestoreCollection<MasterClass>;
  public todo$masterclass: Observable <any[]>;

  constructor(
    private router: Router,
    private store: AngularFirestore,
    private crudSvc : CRUDService
    ) { 

      /*
      this.refMasterClass = this.store.collection('MasterClass');
      this.todo$masterclass = this.refMasterClass.valueChanges();
      */

      this.todo$masterclass = this.crudSvc.readAllWithoutOrder('MasterClass')

    }
  
  goMain(){
    this.router.navigate(['main']);
  }

  ngOnInit() {
  }

}
