import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-rides',
  templateUrl: 'rides.html'
})
export class RidesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('Hello RidesPage Page');
    console.log('this.navParams.data : ');
    console.log(this.navParams.data);
  }

}
