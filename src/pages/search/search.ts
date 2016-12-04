import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  origin: string;
  destination: string;

  acService: any;

  constructor(public navCtrl: NavController) {
    this.origin = "";
    this.destination = "";
  }

  ionViewDidLoad() {
    console.log('Hello SearchPage Page');
  }

  showModel(){
    
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
