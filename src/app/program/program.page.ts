import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})

export class ProgramPage implements OnInit {
  profileUrl: Observable<string | null>;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(private router: Router, private storage: AngularFireStorage) {
    //const ref = this.storage.ref('filmes/papel de parede.jpg');
    //this.profileUrl = ref.getDownloadURL();
  }


  goMain(){
    this.router.navigate(['main']);
  }

  ngOnInit() {
  }

}