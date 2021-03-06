import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import moment from 'moment';


@Component({
  selector: 'page-ride',
  templateUrl: 'ride.html'
})
export class RidePage {

  title: string;
  ride : any;
  userData: any;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.title = this.navParams.data.title;
    this.ride = this.navParams.data.ride;
    this.userData = this.navParams.data.ride.userData;
  }

  // Dismisses modal.
  dismiss() {
    this.viewCtrl.dismiss();
  }

  convertToHumanTime(time){
    return moment(time).format("h:mm a");
  }

  convertToHumanDate(date){
    return moment(date).format("MMMM Do, YYYY");
  }

  getTimeFrom(d){
    return moment(d).fromNow();
  }


}
