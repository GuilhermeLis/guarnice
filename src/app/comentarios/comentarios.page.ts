import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {JuriPage} from '../juri/juri.page';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';


import { CRUDService } from '../services/crud.service';

import { AUTHService } from '../services/auth.service'


export interface Comentario{
  message : string;
  imgURL : string;
  name : string;
}

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})

export class ComentariosPage implements OnInit {

  name = JuriPage.name;
  comments = [];
  message: string;

  private nomeFilme : string;


  private ref: AngularFirestoreCollection<Comentario>;
  todo$: Observable <any[]>;

  
  constructor(private router: ActivatedRoute ,
              private rour : Router,
              private store : AngularFirestore,
              private afAuth : AngularFireAuth,
              private storage: AngularFireStorage,
              private crudSvc : CRUDService,
              private authSvc : AUTHService
              ) {
                this.nomeFilme = this.router.snapshot.paramMap.get('id')

                //this.todo$ = this.crudSvc.readAllWithoutOrder(this.nomeFilme)

                
                this.ref = this.store.collection(this.nomeFilme)
                this.todo$ = this.ref.valueChanges()


  }
  
  goJuri(){
    this.rour.navigate(['juri']);
  }

  sendComment(){

    const refUser = this.store.collection('Users')
    this.afAuth.user.subscribe(user =>{
      var pessoa = refUser.doc(user.uid).valueChanges()
      const filePath = 'usuarios/' + user.email +'/' + 'profile.jpg'
      const refStorage = this.storage.ref(filePath)
      let url = refStorage.getDownloadURL()
      //if (url._isScalar==false){
        this.ref.add({name: user.displayName, message: this.message, imgURL: ' --'})
      //}else{
      //url.subscribe(img =>{
      //  this.ref.add({name: user.displayName, message: this.message, imgURL: img})
      //})
    //}
    })
  
  } 

  ngOnInit(){}

}
