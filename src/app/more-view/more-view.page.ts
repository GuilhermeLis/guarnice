import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';

//import{sort} from 'rxjs/operators'
import { CRUDService } from '../services/crud.service';


import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';


export interface filme{
  name:string; // Nome do filme
  origin:string; // Região que o filme pertence
  sinopse:string; // Sinopse do filme
  criacao:string; // A data que o filme foi feito
  direcao:string; // Diretores do filme
  genero:string; // Gereno do filme
  idade: number; // Idade que é permitido assistir o filme
  categoria:string; // Categoria de Competição
  duracao:string; // Duração do filme
  imgURL: string; //Endereço da imagem
  votos: number;
  resu:number;
}

@Component({
  selector: 'app-more-view',
  templateUrl: './more-view.page.html',
  styleUrls: ['./more-view.page.scss'],
})
export class MoreViewPage implements OnInit {

  show : boolean = false;
  //private ref: AngularFirestoreCollection<filme>;
  todo$ =[];
  todo$$ =[];
  private item = [] ;
  private nomeBusca: string;

  mara: boolean;

  naci : boolean;

  

  constructor(
    private router: Router, 
    private store: AngularFirestore,
    private crudSvc: CRUDService
    ) {
      this.getShow()
  }

  choice = true;

  async getShow(){
   const consulta = await this.crudSvc.readOnePromise('Codigo','can')
   this.show = consulta.data().show
   if(this.show){
     this.makeThey()
   }
    
  }

  makeThey(){
    console.log('here')
  // this.todo$ = this.crudSvc.readSelection('Competitiva','resu','desc','rank','==','Maranhense')
    const db = firebase.firestore()
    var banco = db.collection('Competitiva')
    const trated =  banco.where('rank','==','Maranhense').orderBy('resu','desc')
    trated.get().then(doc =>{
       doc.forEach(element => {
          const novo = element.data();
  //        console.log(novo)
          this.todo$.push(novo)
        });
        console.log(this.todo$)
          }).catch(err =>{
          console.log(err)
        })

        var banco = db.collection('Competitiva')
        const trated2 =  banco.where('rank','==','Nacional').orderBy('resu','desc')
    
        trated2.get().then(doc =>{
           doc.forEach(element => {
           const novo = element.data();
            this.todo$$.push(novo)
          });
          }).catch(err =>{
           console.log(err)
         })
  }

  ngOnInit() {
  }
  goMain(){
    this.router.navigate(['main']);
  }

  segmentChanged(ev: any) {
     this.nomeBusca = ev.detail.value

     if (ev.detail.value == "Maranhense"){
       this.mara = true;
       this.naci = false;
     }else{
      this.mara = false;
      this.naci = true;
     }

   }
}
