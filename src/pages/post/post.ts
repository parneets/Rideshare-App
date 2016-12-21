import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { User} from '@ionic/cloud-angular';
import { httpService } from '../../services/http-service';
import { AppSettings } from '../../app-config';
import { DatePicker } from 'ionic-native';
import { Keyboard } from 'ionic-native';
import { RidePage } from '../ride/ride'
import moment from 'moment';

declare var google: any;

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  providers: [httpService]
})
export class PostPage {

  origin: string;
  originName: string;
  originInfo = {
    lat: 0,
    long: 0
  }
  destination: string;
  destinationName: string;
  destInfo = {
    lat: 0,
    long: 0
  }

  dateDisplay: string;
  date: string;
  timeDisplay: string;
  time: string;
  vehicleInfo: string;
  price: number;

  // facebook data
  userData = {
    email: '',
    full_name : '',
    profile_picture: ''
  }

  constructor(public navCtrl: NavController,
    private httpService: httpService,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public user: User,
    public app: App) {

    this.origin = "";
    this.destination = "";
    this.vehicleInfo = "";
    this.originInfo.lat = 0; this.originInfo.long = 0;
    this.destInfo.lat = 0; this.destInfo.long = 0;

    this.userData.full_name = this.user.social.facebook.data.full_name;
    this.userData.email = this.user.social.facebook.data.email;
    this.userData.profile_picture = this.user.social.facebook.data.profile_picture;
  }

  ionViewDidLoad() {
    console.log('Hello PostPage Page');
  }

  showModel() {

  }

  ngOnInit() {

    // get the two fields
    let input_from = (<HTMLInputElement>document.getElementById("origin_post").getElementsByTagName('input')[0]);
    let input_to = (<HTMLInputElement>document.getElementById("destination_post").getElementsByTagName('input')[0]);

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
        self.destinationName = place.name;

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
        self.originName = place.name;

        console.log(geometry.location.lng());
        self.originInfo.long = geometry.location.lng();

        console.log(geometry.location.lat());
        self.originInfo.lat = geometry.location.lat();
      }

    });

  }

  dateFocused() {
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

  timeFocused() {
    let today = new Date();

    DatePicker.show({
      date: today,
      mode: 'time',
      androidTheme: 3,
    }).then(
      time => {
        console.log('Got date: ', time);
        Keyboard.close();
        this.time = time.toString();
        this.timeDisplay = moment(time).format("h:mm a");
      },
      err => {
        console.log('Error occurred while getting time: ', err);
        Keyboard.close();
      }
      );
  }

  postRequested() {

    let nav = this.app.getRootNav();

    let temp = {
      "origin": this.originInfo,
      "detination": this.destInfo
    }
    let today = new Date();
    let postedAt = today.toString();

    let loader = this.loadingController.create({
      content: 'Posting your ride ...'
    });
    loader.present().then(() => {
      this.httpService.makePostRequest(AppSettings.BASE_URL + 'api/ride', {
        "origin": this.originInfo,
        "originName": this.originName,
        "destination": this.destInfo,
        "destinationName": this.destinationName,
        "date": this.date,
        "time": this.time,
        "price" : this.price,
        "postedAt": postedAt,
        "userData": this.userData
      }).subscribe(data => {
        console.log(data);
        loader.dismiss();
        this.presentToast();
        this.clearData();
      }, err => console.log("Error while posting your ride : " + err));
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Ride was posted successfully',
      duration: 4000
    });
    toast.present();
  }

  clearData() {
    this.origin = "";
    this.destination = "";
    this.time = "";
    this.date = "";
  }

}
