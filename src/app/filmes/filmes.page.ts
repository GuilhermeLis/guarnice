import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { CRUDService } from '../services/crud.service';

import { LoadingController } from '@ionic/angular';

//import * as faker from 'faker';

export interface vali{
  filmes: string[];
  hora: string;
}

export interface filme{
  name:string; // Nome do filme
  origin:string; // Região que o filme pertence
  sinopse:string; // Sinopse do filme
  criacao:string; // A data que o filme foi feito
  direcao:string; // Diretores do filme
  genero:string; // Gereno do filme
  idade: number; // Idade que é permitido assistir o filme
  duracao:string; // Duração do filme
  imgURL: string; //Endereço da imagem
  categoria: string // categoria
  hora: string;
  data: string;
  local: string;


}

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.page.html',
  styleUrls: ['./filmes.page.scss'],
})

export class FilmesPage implements OnInit {

  private ref: AngularFirestoreCollection<filme>;
  private ref2: AngularFirestoreCollection<filme>;

  todo$: Observable <any[]>;
  todo2$: Observable <any[]>;
  codigo: string;

  private db: any;

  constructor(
    private router: Router,
    private store: AngularFirestore,
    private crudSvc: CRUDService,
    public loadingController: LoadingController
    ) { 

    /* Dados de Filmes */
    //this.ref = this.store.collection('Filmes');
    //this.todo$ = this.ref.valueChanges();
    this.todo$ = this.crudSvc.readAllWithoutOrder('Filmes')
    this.todo2$ = this.crudSvc.readAllWithoutOrder('Competitiva')
    
    //this.ref2 = this.store.collection('Competitiva');
    //this.todo2$ = this.ref2.valueChanges();

  }
  // segmentChanged(ev: any) {
    
  //   console.log('Segment changed', ev.detail.value);
  // }

  choice = true;


  goMain(){
    this.router.navigate(['main']);
  }
  goPageFilme(){
    this.router.navigate(['mostra-comp']);
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando Filmes...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  loadingMovies(){
    this.presentLoading();
    this.choice = false;
  }

}
