import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage, PostPage } from '../pages'
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchPage = SearchPage;
  postPage = PostPage;

  constructor(public navCtrl: NavController, 
              public popoverCtrl: PopoverController) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev
    });
  }

  avatarClicked(){
    console.log('Avatar Clicked');
  }

}
