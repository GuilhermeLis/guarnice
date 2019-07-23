import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController} from '@ionic/angular';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';

import { CRUDService } from '../services/crud.service';




export interface Oficinas {
  professor: string; // nome do professores
  nome: string; // nome da oficina
  local: string; // local da oficina
  nomesugerido: string; // nem eu sei q é isso q colocaram
  objetivoGeral: string; // o objetivo geral da oficina
  data: string; // data que será realizado
  horario: string; // horario que será realizado
  carga: string; // carga horaria
  curriculo: string; // curriculo do professor
  recurso: string[]; // recurso disponibilizado
  topico: string[]; // topico q serão abordados
  vagas: number; // vadas disponiveis
  ementa: string; // descrição da oficina
  inscritos: string[]; // queme está inscrito.
  preRequisito: string[]; //Pre-Requisitos pra está na oficina
  cadastroURL: string;
}

export interface User {
  name: string,
  idade: number;
  email: string,
  credencial: string,
  origin: string,
  oficinas: string[]


}
@Component({
  selector: 'app-oficinas',
  templateUrl: './oficinas.page.html',
  styleUrls: ['./oficinas.page.scss'],
})

export class OficinasPage implements OnInit {

  
  private refOficinas: AngularFirestoreCollection<Oficinas>;
  public todo$oficinas: Observable <any[]>;

  private refUser: AngularFirestoreDocument<User>;
  private ofi: Array<any> = [];

  user: any;
  usuario: string;
  private db: any;
  
  
  
  constructor(
    private router: Router,
    private toastController: ToastController,
    private storage: AngularFirestore,
    public afAuth: AngularFireAuth,
    private crudSvc: CRUDService   
    ) { 

      this.todo$oficinas = this.crudSvc.readAllWithoutOrder('Oficinas')

    }

  async subSucess( item : Oficinas ){
    const toast = await this.toastController.create(
      {
        message: 'Inscrição feita com sucesso!',
        duration: 1000,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      }
    );
  }

  goMain(){
    this.router.navigate(['main']);
  }

  ngOnInit() {

  }

  showHideOffices(ofNome){
    console.log(ofNome);
    
 
  }

}
