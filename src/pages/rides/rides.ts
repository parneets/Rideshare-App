import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { RidePage } from '../pages'
import moment from 'moment';


@Component({
  selector: 'page-rides',
  templateUrl: 'rides.html'
})
export class RidesPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {}

  title: string;
  rides = [];

  ionViewDidLoad() {
    console.log('Hello RidesPage Page');
    console.log('this.navParams.data : ');
    console.log(this.navParams.data);
    this.title = this.navParams.data.originCity + ' - ' + this.navParams.data.destinationCity;
    this.rides = this.navParams.data.rides;
  }

  convertToHumanTime(time){
    return moment(time).format("h:mm a");
  }

  showRide(ride){
    this.navCtrl.push(RidePage, {title: this.title, ride: ride},{animate: true, direction: 'forward'});
  }

  getTimeFrom(d){
    return moment(d).fromNow();
  }

}
