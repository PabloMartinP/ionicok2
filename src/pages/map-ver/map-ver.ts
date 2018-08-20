import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geo  } from '../../typings/typings';

declare var google;

@Component({
  selector: 'page-map-ver',
  templateUrl: 'map-ver.html',
})


export class MapVerPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geo:Geo;
  descripcion: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.latitud = this.navParams.get('geo').Latitud;
    //this.longitud = this.navParams.get('geo').Latitud;
    this.geo = this.navParams.get('geo');
    this.descripcion = this.navParams.get('descripcion');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapVer');
    this.loadMap();
  }
  loadMap(){ 
    let latLng = new google.maps.LatLng(this.geo.Latitud, this.geo.Longitud);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    this.addMarker();
  }

  addInfoWindow(marker, content){ 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
  
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });  
  }
  
  addMarker(){  
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  
    let content = "<h4>"+this.descripcion+"</h4>";           
    this.addInfoWindow(marker, content);  
  }


}
