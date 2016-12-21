import { Component } from '@angular/core';
import { NavController, ViewController , App} from 'ionic-angular';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../pages'


@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public facebookAuth: FacebookAuth, 
              public user: User,
              public app: App) {}

  ionViewDidLoad() {
    //console.log('Hello PopoverPage Page');
  }

  logout(){
    this.facebookAuth.logout();
    this.close();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
