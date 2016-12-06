import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { httpService } from '../../services/http-service';
import { AppSettings } from '../../app-config';

declare var google: any;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [ httpService ]
})
export class SearchPage {

  origin: string;
  destination: string;
  date: string;
  yesterday: string;

  acService: any;

  constructor(public navCtrl: NavController,
              private httpService: httpService) {
    this.origin = "";
    this.destination = "";

    // let today = new Date();
    // let yesterday = new Date();
    // yesterday.setDate(today.getDate() - 1);
    // this.yesterday = this.convertToISO(yesterday.toISOString());
    // console.log(this.yesterday);
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');

  }

  showModel() {

  }

  convertToISO(date: string): string {
    var result = date.substring(0, 4) + '-';
    result += date.substring(8, 10) + '-';
    result += date.substring(5, 7);
    return result;
  }

  dateChanged() {
    console.log(this.date);
  }

  searchRequested() {
    console.log('search requested');
    this.httpService.makeGetRequest(AppSettings.BASE_URL + 'api/rides').subscribe(data => {
      console.log(data);
    }, err => console.log("Error while posting your ride : " + err));
  }

  ngOnInit() {

    // get the two fields
    let input_from = (<HTMLInputElement>document.getElementById("origin").getElementsByTagName('input')[0]);
    let input_to = (<HTMLInputElement>document.getElementById("destination").getElementsByTagName('input')[0]);

    // set the options
    let options = {
      types: []
    };

    // create the two autocompletes on the from and to fields
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {

      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {

        console.log(place.name);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());

      }

    });

    // add the second listener
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {
      let place = autocomplete2.getPlace();
      let geometry = place.geometry;

      if ((geometry) !== undefined) {

        console.log(place.name);

        console.log(geometry.location.lng());

        console.log(geometry.location.lat());
      }

    });

  }

}
