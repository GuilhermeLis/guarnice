import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-votos',
  templateUrl: './meus-votos.page.html',
  styleUrls: ['./meus-votos.page.scss'],
})
export class MeusVotosPage implements OnInit {

  votos = ["Filme 1", "Filme 2", "Filme 3"];

  constructor(private router: Router) { }
  
  goMain(){
    this.router.navigate(['main']);
  }

  ngOnInit() {
  }

}
