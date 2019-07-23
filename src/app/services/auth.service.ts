import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'

import { CRUDService } from '../services/crud.service';
import { User } from '../home/home.page';

import { ToastController } from '@ionic/angular';


export interface Login { email: string; password: string; }

export interface Cadastro { email: string; name: string;
   idade: number; credencial: string, origin: string }

@Injectable({
  providedIn: 'root'
})
export class AUTHService {

  public authenticatedUser: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private crudSvc: CRUDService,
    public toastController: ToastController
    ) { 

    }


    async presentToast(text:string) {
      const toast = await this.toastController.create({
        message: text,
        duration: 2000
      });
      toast.present();
    }
  

  getCurrentUser() {
    return this.afAuth.auth.currentUser
    //return this.afAuth.user.toPromise()
  }


  loginWithEmail(user: Login) {
     return new Promise((resolve, reject) => {
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {

          this.authenticatedUser = true;
          this.showMenuEmitter.emit(true);
          this.router.navigate(['/main']);


        }).catch(err => {

          this.authenticatedUser = false;
          this.showMenuEmitter.emit(false);

          switch (err.code) {
            case 'auth/invalid-email': this.presentToast('E-mail inválido!');
            case 'auth/user-not-found': this.presentToast('Usuário não cadastrado!');
            case 'auth/wrong-password': this.presentToast('E-mail ou senha incorreta!');
            case 'auth/network-request-failed': this.presentToast('Sem conexão com a internet, por favor, verifique.');
            default: this.presentToast('Não conseguimos efetuar seu login, por favor, tente novamente!');
          }

        });
    });
  }


  userIsAuthenticated() {
    //return this.authenticatedUser;
    return firebase.auth().currentUser.displayName
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.authenticatedUser = false;
      this.showMenuEmitter.emit(false);
      this.router.navigate(['/login']);
    });
  }

  sendPasswordResetEmail(email : string){
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  createUserWithEmailAndPassword(user : Cadastro, cad: Login){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email,cad.password)
      .then(credentials =>
          credentials.user.updateProfile({displayName: user.name,photoURL: null})
            .then(() => this.crudSvc.set('Users',credentials.user.uid,user))
            .then(()=> credentials.user.sendEmailVerification())              
      ).catch((error) => {
        switch(error.code){
          case('auth/invalid-password') : {
            console.log(error.message);
          }
          case('auth/invalid-password-salt') : {
            console.log(error.message)
          }
          case('auth/email-already-exists') : {
            console.log(error.message)
          }
        }

          
        })
    
  }

  changeThePersistence(user: Login ){

    
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
      this.loginWithEmail(user)
    }).catch(err => {
      console.log(err)
    })
  }



}
