
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(private router: Router) { }

  goMain(){
    this.router.navigate(['main']);
  }

  ngOnInit() {
  }

}
