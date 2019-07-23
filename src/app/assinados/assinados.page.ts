import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { resolve } from 'q';

export interface Oficinas {
  nome: string; // nome da oficina
  local: string; // local da oficina
  data: string; // data que será realizado
  horario: string; // horario que será realizado
   
}
@Component({
  selector: 'app-assinados',
  templateUrl: './assinados.page.html',
  styleUrls: ['./assinados.page.scss'],
})

export class AssinadosPage implements OnInit {

  private db: any;
  private listIncricoes: string[];

  public todo$oficinas: Observable <Oficinas[]>;
  

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public store: AngularFirestore) {

  


  }

  oficinasInscritas(){
    
  }
/*
  inscrições(){
    return new Promise(resolve =>{
      this.afAuth.user.subscribe( user =>{
        const value = this.store.collection('Users').doc(user.uid)
        .valueChanges().subscribe((dados : Response) => {
          resolve(dados.oficinas)
        })
      })
    })
    
  }*/

  goMain(){
    this.router.navigate(['main']);
  }


  ngOnInit() {
  }

}
