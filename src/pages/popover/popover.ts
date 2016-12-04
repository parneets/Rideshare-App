import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    //console.log('Hello PopoverPage Page');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
