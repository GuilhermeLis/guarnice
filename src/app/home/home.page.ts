import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

import * as firebase from 'firebase'

import { CRUDService } from '../services/crud.service';

import { AUTHService } from '../services/auth.service';





export interface User {
  name: string,
  idade: number;
  email: string,
  credencial: string,
  origin: string,
  oficinas: string[]


}



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private CollectionRef: AngularFirestoreCollection<User>;

  /* Dados para o cadastro */
  name : string;
  sobrenome: string;
  idade: number;
  credencial: string;
  origin: string;
  email: string;
  senha: string;
  senha2: string;
  
  
  /* Dados para login */
  emailLogin: string;
  passwordLogin: string;

  /* Dados da pagina de recuperação */
  emailRecuperacao: string;

  /* controladores da pagina (eu acho (sim, são) ) */
  login = true;
  register = false;
  newpass = false;
  loginFail = false;
  cadastroSenhaFail = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    public storage: AngularFirestore,
    private menu: MenuController,
    private crudSvc: CRUDService,
    private authSvc: AUTHService
    ){
      //firebase.initializeApp(environment.firebase)
      //this.CollectionRef = this.storage.collection('Users');
      this.ifLogado()

    }

    async presentToast(text:string) {
      const toast = await this.toastController.create({
        message: text,
        duration: 2000
      });
      toast.present();
    }
  
  
  
  async sendMail(){

    const toast = await this.toastController.create({
      message: 'Email enviado com sucesso!',
      duration: 4000,
      buttons: [ 
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.afAuth.auth.sendPasswordResetEmail(this.emailRecuperacao).then(() =>{
      toast.present();
     }).catch((error) =>{
       console.log(error.code,error.message)
     });
  }

  /* Mudança entre paginas */
  goRegister(){
    this.login = false;
    this.register = true;
    this.newpass = false;
  }

  goLogin(){
    this.login = true;
    this.register = false;
    this.newpass = false;
  }

  goNewPass(){
    this.login = false;
    this.register = false;
    this.newpass = true;
  }

  changeToHome(){
    this.router.navigate(['main'])
    this.goLogin();
  }

  /* reposavel por realizar o cadastro do usuário */
  signin(){
    let nomeCompleto: String = this.name + ' ' + this.sobrenome;
    if (this.senha == this.senha2){
      
      this.afAuth.auth.createUserWithEmailAndPassword(this.email,this.senha)
      .then(credentials =>
          credentials.user.updateProfile({displayName: this.name,photoURL: null})
            .then(() => this.storage.collection('Users').doc(credentials.user.uid).set({
              name: nomeCompleto,idade: this.idade, email: this.email,
              credencial: this.credencial, origin: this.origin })
            )
              .then(()=> credentials.user.sendEmailVerification())
              .then(()=> this.changeToHome())
              
      ).catch((error) => {
        console.log(error.message)
        switch(error.code){
          case('auth/invalid-password') : {
            this.presentToast(error.message);
          }
          case('auth/invalid-password-salt') : {
            this.presentToast(error.message);
          }
          case('auth/email-already-exists') : {
            this.presentToast(error.message);
          }
        }

        //this.presentToast('Erro. Verifique se os dados estão corretos');
        //this.presentToast(error.message)
        
          
        });

        //this.authSvc.createUserWithEmailAndPassword({name: this.name, email: this.email, credencial: this.credencial,idade: this.idade, origin: this.origin},{email: this.email, password: this.senha})
    }
    else{
      //toast/popup ou qualquer notificação que informe que as senhas n estão iguais
      this.presentToast('Erro. Verifique se os dados estão corretos');
      console.log('senhas incorretas')
      this.cadastroSenhaFail = true;
    };
  }
  
  // Login
  async loginuser(){
    
  //  this.afAuth.auth.signInWithEmailAndPassword(this.emailLogin,this.passwordLogin)
  //.then(() => {
  //  this.menu.enable(true, 'sideMenu');
  //  this.changeToHome()
  //}).catch((error)=>{
  //  this.presentToast('Algo deu Errado. Verifique seus dados.');
  //  if(error.code == 'auth/invalid-email'){
  //    console.log(error.message)
  //  } 
  //  this.loginFail = true
  //});
  const estado = await this.authSvc.changeThePersistence({email: this.emailLogin, password: this.passwordLogin})
  }

  ifLogado(){
    //if (this.authSvc.getCurrentUser() != null){
     // this.changeToHome()
   // }
   const user = this.authSvc.getCurrentUser()

   if (this.authSvc.getCurrentUser() != null){
     this.changeToHome()
    }
  }

}
