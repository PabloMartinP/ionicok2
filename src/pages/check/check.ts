import { Component } from '@angular/core';
import { NavController ,App, ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { LugaresPage } from "../lugares/lugares";
import { LoginService } from "../../providers/login-service";
import {ConfigService} from '../../providers/config-service'
import { LoginPage } from "../login/login";

//import { Http } from '@angular/http';

declare var google;

@Component({
  selector: 'page-check',
  templateUrl: 'check.html'
})
export class CheckPage {
  buscando:boolean = false;
  usuario:string = "";
  estado: string;
  geo_habilitar_alta_precision:boolean = false;
  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation, 
    public loginService: LoginService, 
    public configService:ConfigService, 
    public viewCtrl: ViewController, 
    public appCtrl: App) {
    //Limpio el historial para que cuando vaya hacia atras no vuelva al login
    //$ionicHistory.clearHistory();    

    //alert("INIT LoginService.UserLogin:"+LoginService.UserLogin.UserName);
    this.geo_habilitar_alta_precision = true;
/*
    this.configService.get_user().then((user)=>{
        this.user_id = user.Codigo;
        //console.log("config.getuser()", user);
      });*/
  }

  ionViewDidLoad() {
    this.estado = "...";
    
    //alert(this.loginService.get_username());    
    this.configService.get_user().then((user)=>{
      //alert("Username: "+username);
      this.usuario = user.UserName;
      var pass = "";
      this.loginService.login(this.usuario, pass)
        .then(resultado => {               
          this.estado = "Ok";
        }).catch(e => {
          this.estado = "Verique conexion";
          }
        );
      
    })
    //alert(this.usuario);

  }

  logout(){
    this.configService.set_autologin_promise(false).then((e)=>{
      this.appCtrl.getRootNav().setRoot(LoginPage);
    })
    
    
    /*this.viewCtrl.dismiss().then((r)=>{
      alert("R:"+r);
    });*/
    /*
    this.appCtrl.getRootNav().push(LoginPage).then((r)=>{

    })*/

    //this.navCtrl.setRoot(LoginPage);
    //this.navCtrl.popToRoot();
  }


  buscar_posicion: () => void=()=> {
    //alert("buscnado posicion");
    this.buscando = true;
    
    this.geolocation.getCurrentPosition().then((position) => { 
      console.log("position", position);
      //let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let latLng = {
        lat: position.coords.latitude, lng: position.coords.longitude};

        console.log("latLng:", latLng);

      this.navCtrl.push(LugaresPage, {
        geolocacion: latLng
      });

      this.buscando = false;
    }, (err) => {
      console.log(err);
      this.buscando = false;
    });

};


}
