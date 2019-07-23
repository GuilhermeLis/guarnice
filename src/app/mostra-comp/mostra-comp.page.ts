import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';

export interface vali{
  filmes: string[];
  hora: string;
  voted: string[];
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

}

@Component({
  selector: 'app-mostra-comp',
  templateUrl: './mostra-comp.page.html',
  styleUrls: ['./mostra-comp.page.scss'],
})
export class MostraCompPage implements OnInit {

  // private ref: AngularFirestoreCollection<filme>;
  // todo$: Observable <filme[]>;

  // codigo: string; // o item de inpute que a senha deve ser posta deve manda o codigo para essa variavel

  // private db: any;

  // constructor(
  //   private router: Router,
  //   private store: AngularFirestore,
  //   public afAuth: AngularFireAuth
  //   ) { 

  //     firebase.initializeApp(environment.firebase)
  //     this.db = firebase.firestore();

  //     this.ref = this.store.collection('Competitiva');
  //     this.todo$ = this.ref.valueChanges();

  //   }


  //   /*o botao de votar deve chamar essa função */
  //   checkIfAlreadyVoted(item : filme){

  //     var can = true;
  //     var cole = [];
    
  
  //     const banco = this.db.collection('Codigo').doc(this.codigo)
  //      banco.get().then(doc =>{
  //       this.afAuth.user.subscribe(user =>{
  //         doc.data().voted.forEach(element=>{
  //           if(element == user.uid){
  //             can = false
  //             console.log('vc já votou')
  //           } 
  //         })
    
  //         if(can){
  //           console.log('verificarie se vc pode votar')
  //           this.checkIfCanVote(item)
  //         }
  //       })
  //      }).catch(err =>{
  //       console.log(err)
  //      })
  
  //   }
  
  //   checkIfCanVote(item : filme){
  //     var refVali : AngularFirestoreDocument<vali>;
  
  
  //     const dia = new Date().getUTCDate()
  //     const hora = new Date().getHours()
  
  //     let horaSessao :any ;
  //     let listaFilme :any;
  //     let diaFilme : any;
  
  //     const banco = this.db.collection('Codigo').doc(this.codigo)
  //      banco.get().then(doc =>{
  
  //       var codInvalide = true
  
  //       doc.data().filmes.forEach(element =>{
  
  
  //         if (element == item.name && doc.data().hora < hora && doc.data().dia == dia){
            
  
  //           this.votar(item)
  //           codInvalide = false
  //         }
  //       })
  //       if (codInvalide){
  //         console.log('codigo invalido')
  //       }
        
  //      }).catch(err =>{
  //       console.log(err)
  //      })
  
        
       
  
  
  //   }
    
  
  //   votar(item : filme ){
  
  //     const refOF = this.db.collection('Competitiva').doc(item.name);
  //         var transaction = this.db.runTransaction( t =>{
  //           return t.get(refOF).then( doc =>{
  
  //               let newVotos = doc.data().votos + 1;
  
  //               t.update( refOF, {votos: newVotos} )        
  //           })
  //         }).then(result => {
  //           //voto realizado com sucesso
  //           this.addUser()
  
  //         }).catch(err => {
  //           console.log('Transaction failure:', err);
  //         });
  //   }
  
  //   addUser(){
  //     var refVali : AngularFirestoreDocument<vali>;
  //     this.afAuth.user.subscribe(user=>{
  //         const refOF = this.db.collection('Codigo').doc(this.codigo);
  //         var transaction = this.db.runTransaction( t =>{
  //         return t.get(refOF).then( doc =>{
  //             let newVoted = doc.data().voted;
  //             newVoted.push(user.uid);
  //             t.update( refOF, {voted: newVoted} )        
  //         })
  //       }).then(result => {
  //         console.log("Adicionado a lista de quem votou")
  
  //       }).catch(err => {
  //         console.log('Transaction failure:', err);
  //       });
   
        
  //     })
      
  //   }
  

  // goMain(){
  //   this.router.navigate(['main']);
  // }

  ngOnInit() {
  }

}
