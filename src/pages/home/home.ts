import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage, PostPage } from '../pages'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchPage = SearchPage;
  postPage = PostPage;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello HomePage Page');
  }

}
