import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { httpService } from '../../services/http-service';
import { AppSettings } from '../../app-config';
import { DatePicker } from 'ionic-native';

declare var google : any;

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
  providers: [ httpService ]
})
export class PostPage {

    origin: string;
    originInfo = {
      lat : 0,
      long : 0
    }
    destination: string;
    destInfo  = {
      lat : 0,
      long : 0
    }

    date: string;
    time: string;
    vehicleInfo: string;

  constructor(public navCtrl: NavController, 
              private httpService: httpService) {
    this.origin = "";
    this.destination = "";
    this.vehicleInfo = "";
    this.originInfo.lat = 0; this.originInfo.long = 0;
    this.destInfo.lat = 0; this.destInfo.long = 0;
  }

  ionViewDidLoad() {
    console.log('Hello PostPage Page');
  }

  showModel(){
    
  }

  ngOnInit() {

    // get the two fields
    let input_from = (<HTMLInputElement>document.getElementById("origin_post").getElementsByTagName('input')[0]);
    let input_to = (<HTMLInputElement>document.getElementById("destination_post").getElementsByTagName('input')[0]);

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
        self.destInfo.long = geometry.location.lng();

        console.log(geometry.location.lat());
        self.destInfo.lat =  geometry.location.lat();
        
      }

    });

    // add the second listener
    google.maps.event.addListener(autocomplete2, 'place_changed', function () {
      let place = autocomplete2.getPlace();
      let geometry = place.geometry;

      if ((geometry) !== undefined) {

        console.log(place.name);

        console.log(geometry.location.lng());
        self.originInfo.long = geometry.location.lng();

        console.log(geometry.location.lat());
        self.originInfo.lat =  geometry.location.lat();
      }

    });

  }

  dateFocused(){
    
    DatePicker.show({
      date: new Date(),
      mode: 'date'
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  dateChanged(){

  }

  timeChanged(){

  }

  postRequested() {
    let temp = {
      "origin" : this.originInfo,
      "detination" : this.destInfo
    }
    this.httpService.makePostRequest(AppSettings.BASE_URL + 'api/ride', {"origin": this.originInfo, "destination": this.destInfo}).subscribe(data => {
      console.log(data);
    }, err => console.log("Error while posting your ride : " + err));
  }

}
