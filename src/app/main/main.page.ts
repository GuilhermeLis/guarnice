import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { MenuController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { CRUDService } from '../services/crud.service';
import { AUTHService } from '../services/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  isFlash: boolean = true;

  timeLeft: number = 5;
  interval;


  constructor(private router: Router,public afAuth: AngularFireAuth,private menu: MenuController,
    private authSvc: AUTHService
    ) {
      //this.getUser()
      //console.log(this.authSvc.userIsAuthenticated())
      
      
   }

  async getUser(){
    const user = await this.authSvc.getCurrentUser
    console.log(user)
  }

  goLogout(){
    this.afAuth.auth.signOut;
    this.router.navigate(['home']);
  }

  goJuri(){
    this.router.navigate(['juri']);
  }

  goOficinas(){
    this.router.navigate(['oficinas']);
  }

  goMoreV(){
    this.router.navigate(['more-view']);
  }
  
  goProgram(){
    this.router.navigate(['program']);
  }

  goMasterClass(){
    this.router.navigate(["masterclass"]);
  }

  goFilmes(){
    this.router.navigate(["filmes"]);
  }

  goMostra(){    
    this.router.navigate(["mostra-comp"]);
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.isFlash = false;
        //this.timeLeft = 60;
      }
    },1000)
  }

  ngOnInit() {
    this.startTimer();
  }

}
