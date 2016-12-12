import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-ride',
  templateUrl: 'ride.html'
})
export class RidePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RidePage Page');
  }

}
