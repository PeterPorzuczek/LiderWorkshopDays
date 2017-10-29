import { Component } from '@angular/core';
import * as bodymovin from 'bodymovin/build/player/bodymovin.js';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

   lat: number = 54.445340;
   lng: number = 18.553448;

   

   private anim: any;
   animData: any;


   ngOnInit() {
    this.animData = {
      container: document.getElementById('logoAnim'),
      renderer: 'svg',
      loop: 30,
      autoplay: true,
      path: './assets/logoAnim.json'
    };

    this.anim = bodymovin.loadAnimation(this.animData);
  }
}
