import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError, FacebookAuth } from '@ionic/cloud-angular';
import { HomePage } from '../pages';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginPage {

  details: UserDetails = {'email': 'admin@admin.com', 'password': 'admin'};

  constructor(public navCtrl: NavController,
              public auth: Auth,
              public user: User,
              public facebookAuth: FacebookAuth) { }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
    if (this.auth.isAuthenticated()) {
      // this.user is authenticated!
      this.navCtrl.setRoot(HomePage);
    }
  }

  signIn(){
    this.facebookAuth.login().then(()=>{
      console.log('Sign in successful');
      this.navCtrl.setRoot(HomePage);
    }, (err)=> {
      // unsuccessful
      alert('Invalid username or password');
    });
  }

/*  // handles signIn button click
  signIn(){

    this.auth.login('basic', this.details).then(()=>{
      console.log('Sign in successful');
      this.navCtrl.setRoot(HomePage);
    }, (err)=> {
      // unsuccessful
      alert('Invalid username or password');
    });
  }

  // handles signUp button click
  signUp(){

    this.auth.signup(this.details).then(() => {
      // `this.user` is now registered
      this.auth.login('basic', this.details );

    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        switch (e) {
          case 'required_email':
            alert('Missing email field.');
            break;

          case 'required_password':
            alert("Missing password field.");
            break;
          
          case 'conflict_email':
            alert("A user has already signed up with the supplied email.");
            break;

          case 'conflict_username':
            alert("A user has already signed up with the supplied username.");
            break;

          case 'invalid_email':
            alert("The email did not pass validation.");
            break;
        }
      }
    });
  }*/



}
