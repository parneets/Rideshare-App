import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-ride',
  templateUrl: 'ride.html'
})
export class RidePage {

  title: string;
  ride = {};
  userData = {};
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('Hello RidePage Page');
    this.title = this.navParams.data.title;
    this.ride = this.navParams.data.ride;
    this.userData = this.navParams.data.ride.userData;
  }

  // Dismisses modal.
  dismiss() {
    this.viewCtrl.dismiss();
  }


}
