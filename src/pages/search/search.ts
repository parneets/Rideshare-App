import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, App } from 'ionic-angular';
import { httpService } from '../../services/http-service';
import { AppSettings } from '../../app-config';
import { DatePicker } from 'ionic-native';
import { Keyboard } from 'ionic-native';
import { RidesPage } from '../pages'
import moment from 'moment';

declare var google: any;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [httpService]
})
export class SearchPage {

  origin: string;
  originInfo = {
    lat: 0,
    long: 0
  }
  originCity: string;

  destination: string;
  destInfo = {
    lat: 0,
    long: 0
  }
  destinationCity: string;

  date: string;
  dateDisplay: string;

  yesterday: string;

  acService: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: httpService,
    public loadingController: LoadingController,
    public app: App) {
    this.origin = "";
    this.destination = "";
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
    let today = new Date();
    let yesterday = new Date();
    let aYearFromToday = new Date();
    yesterday.setDate(today.getDate() - 1); // sets date to yesterday
    aYearFromToday.setDate(today.getDate() + 365); //sets date to a year from now

    DatePicker.show({
      date: today,
      mode: 'date',
      minDate: today.getTime(),
      maxDate: aYearFromToday.getTime(),
      androidTheme: 3
    }).then(
      date => {
        console.log('Got date: ', date);
        Keyboard.close();
        this.date = date.toString();
        this.dateDisplay = moment(date).format("MMMM Do, YYYY");
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  searchRequested() {
    console.log('search requested');

    // save a reference to this
    let self = this;

    let nav = this.app.getRootNav();

    let loader = this.loadingController.create({
      content: 'Searching for rides ...'
    });
    loader.present().then(() => {
      // Get the rides through HTTP call
      this.httpService.makeGetRequest(AppSettings.BASE_URL + 'api/rides').subscribe(data => {
        let postData = {
          "rides": data,
          "origin": self.originInfo,
          "originCity": self.originCity,
          "destination": self.destInfo,
          "destinationCity": self.destinationCity,
          "date": self.date 
        }
        // Send the data to RidesPage
        nav.push(RidesPage, postData, {animate: true, direction: 'forward'});
        loader.dismiss();
      }, err => console.log("Error while searching for your ride : " + err));
    });

    this.httpService.makeGetRequest(AppSettings.BASE_URL + 'api/rides').subscribe(data => {
      console.log(data);
    }, err => console.log("Error while searching for your ride : " + err));
  }

  ngOnInit() {

    // get the two fields
    let input_from = (<HTMLInputElement>document.getElementById("origin").getElementsByTagName('input')[0]);
    let input_to = (<HTMLInputElement>document.getElementById("destination").getElementsByTagName('input')[0]);

    // set the options
    let options = {
      types: ['(cities)']
    };

    // create the two autocompletes on the from and to fields
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);

    // we need to save a reference to this as we lose it in the callbacks
    let self = this;

    // add the first listener
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {

      let place = autocomplete2.getPlace();
      let geometry = place.geometry;
      if ((geometry) !== undefined) {

        console.log(place.name);
        self.destinationCity = place.name;

        console.log(geometry.location.lng());
        self.destInfo.long = geometry.location.lng();

        console.log(geometry.location.lat());
        self.destInfo.lat = geometry.location.lat();

      }

    });

    // add the second listener
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {
      let place = autocomplete1.getPlace();
      let geometry = place.geometry;

      if ((geometry) !== undefined) {

        console.log(place.name);
        self.originCity = place.name;

        console.log(geometry.location.lng());
        self.originInfo.long = geometry.location.lng();

        console.log(geometry.location.lat());
        self.originInfo.lat = geometry.location.lat();
      }

    });

  }

}
