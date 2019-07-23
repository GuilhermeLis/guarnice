import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

import { AngularFireAuth } from '@angular/fire/auth';

import { CRUDService } from '../services/crud.service';
import { AUTHService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

export interface vali{
  filmes: string[];
  hora: number;
  voted: string[];
  dia: number;
}
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
  horaExibicao: string; //Hora que será exibido
  diaExibicao : string; //dia que será exibido
  votos : number // Quantidade de votos que cada filme tem, deve começar com 0

}

@Component({
  selector: 'app-juri',
  templateUrl: './juri.page.html',
  styleUrls: ['./juri.page.scss'],
})

export class JuriPage implements OnInit {

  private ref: AngularFirestoreCollection<filme>;
  todo$: Observable <any[]>;

  codigo: string;

  name : string;
  

  private db: any;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private store: AngularFirestore,
    private afAuth: AngularFireAuth,
    private navCtrl : NavController,
    private crudSvc: CRUDService,
    private authSvc: AUTHService,
    private alertController: AlertController

    ) {
      //firebase.initializeApp(environment.firebase)
      this.db = firebase.firestore();
      /*
      this.ref = this.store.collection('Competitiva');
      this.todo$ = this.ref.valueChanges();
      */

      this.todo$ = this.crudSvc.readAllWithoutOrder('Competitiva')  
      

    }


    async presentToast(text:string) {
      const toast = await this.toastController.create({
        message: text,
        duration: 2000
      });
      toast.present();
    }


  async voteSucess(item : filme){
    const toast = await this.toastController.create(
      {
        message: 'Voto efetuado com sucesso!',
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
    )

  }
 


  async checkIfAlreadyVoted(item : filme){

    var can = true;
    var cole = [];
  

    const doc = await this.crudSvc.readOnePromise('Codigo',this.codigo)

    if (doc.data() == null){
      this.presentToast('Codigo inserido incorreto')
    }

       
      this.afAuth.user.subscribe(user =>{

        doc.data().voted.forEach(element=>{
          if(element == user.uid){
            can = false
            /* PRECISA NOTIFICAR O USUSARIO */
            this.presentToast('É permitido apenas um voto por sessão')
          } 
        })
  
        if(can){
          this.checkIfCanVote(item)
        }
      })

  }

  async checkIfCanVote(item : filme){


    const dia = new Date().getDate()
    const hora = new Date().getHours()

    //console.log(dia)

    let horaSessao :any ;
    let listaFilme :any;
    let diaFilme : any;


    const banco = await this.crudSvc.readOnePromise('Codigo',this.codigo)
     //banco.get().then(doc =>{
      const doc = banco.data().filmes
      var codInvalide = true
      const data = banco.data().dia
      const horaa = banco.data().hora


      doc.forEach(element =>{
       // console.log(element == item.name)
       // console.log(data,dia)
       /// console.log(horaa,hora)
        if (element == item.name && horaa > hora && data == dia){
         // console.log('aqui dentro')

          this.votar(item)
          codInvalide = false
        }
      })
      if (codInvalide){
        this.presentToast('Você ainda não pode votar')
    }

      
     


  }
  

async votar(item : filme ){
  // console.log(item.name)
    const refOF = this.db.collection('Competitiva').doc(item.name);
    const dado = await this.crudSvc.readOnePromise('Competitiva','Guriatã ')
   // console.log(dado.data())
        var transaction = this.db.runTransaction( t =>{
          return t.get(refOF).then( doc =>{
            console.log(doc.data())
            
              let newVotos = doc.data().votos + 1;

              var prov = (newVotos/350) * 100

              const resu = prov.toFixed(3)

              t.update( refOF, {votos: newVotos, resu: resu} )        
          })
        }).then(result => {
          

        }).catch(err => {
          console.log(err)

        });

        this.presentToast('voto realizado com sucesso')
        this.addUser(item)
  }

  addUser(item : filme){




    
    var refVali : AngularFirestoreDocument<vali>;
    this.afAuth.user.subscribe(user=>{
        const refOF = this.db.collection('Codigo').doc(this.codigo);
        var transaction = this.db.runTransaction( t =>{
        return t.get(refOF).then( doc =>{
            let newVoted = doc.data().voted;
            let newTovote = doc.data().tovote;
            newTovote.push(item.name)
            newVoted.push(user.uid);
            t.update( refOF, {voted: newVoted,tovote: newTovote} )        
        })
      }).then(result => {

      }).catch(err => {
      });
 
      
    })
  }

  goMain(){
    this.router.navigate(['main']);
  }

  goComment(name : string){
    this.router.navigate(['comentarios',name]);
  }
  
  ngOnInit() {
  }


  async presentAlertPrompt(filme) {
    const alert = await this.alertController.create({
      header: 'Confirme Seu Código!',
      inputs: [
        {
          name: 'cod',
          type: 'password',
          placeholder: 'Digite o código aqui'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.codigo = data.cod

              this.checkIfAlreadyVoted(filme);
              this.voteSucess(filme)
          }
        }
      ]
    });

    await alert.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Algo errado ocorreu, tente novamente.',
      duration: 2000
    });
    toast.present();
  }

}
