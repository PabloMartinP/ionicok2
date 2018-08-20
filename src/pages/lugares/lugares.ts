import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController, ToastController, Platform  } from 'ionic-angular';
import { LugarService } from '../../providers/lugar-service';
import { FicharService } from '../../providers/fichar-service';
import { ConfigService } from '../../providers/config-service';

import { Geo, Lugar, Fichada  } from '../../typings/typings';
import { MapVerPage  } from '../map-ver/map-ver';

//import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-lugares',
  templateUrl: 'lugares.html',
})

export class LugaresPage {

  lugares:any;  

  latitud:number = 0;
  longitud:number = 0;
  private loading:Loading;
  user_id:number = -1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    public lugarService: LugarService, 
    public ficharService: FicharService, 
    public configService: ConfigService, 
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController, 
    //private toast: Toast, 
    private platform: Platform) {

      //alert("init lugares" + this.navParams.get('geolocacion').lat() );
      
      this.latitud = this.navParams.get('geolocacion').lat;
      //this.latitud = -34.660351999999996;
      this.longitud = this.navParams.get('geolocacion').lng;      
      //this.longitud = -58.6858496;

      let geo:Geo = new Geo(this.latitud, this.longitud);      
      //this.user_id = 0;
      this.configService.get_user().then((user)=>{
        this.user_id = user.Codigo
        console.log("config.getuser()", user);
        //////////////////////////////////////////////////////////////////

        this.loading_mostrar("Cargando ...");
        this.lugarService.lugares_cercanos(geo, this.user_id)
          .then(lugares => {          
            this.loading_ocultar();
            //alert("datos " +  lugares);
            if(lugares!=null){
              this.lugares = lugares;
            }else{
              this.alert_mostrar("Hubo un problema", "Error al traer los lugares cercanos. ");            
            }
            
            //console.log(lugares);
          }).catch((e) => {
            this.alert_mostrar("Hubo un problema", "Error al traer los lugares cercanos. ");
            console.log("reject: " + e);
            }
          );
      });
      
      
      
/*
      this.lugares = [
        {Id:1, Nombre:"Viamonte", Descripcion:'Viamonte 749 Piso 19 Of4', 
          Direccion:'Viamonte 749 Piso 19 Of4', 
          Posicion: {Latitud:-34.599953, Longitud: -58.377418 } }, 
        {Id:2, Nombre:"Amasol", Descripcion:'Tucuman 540', 
          Direccion:'Tucuman 540', 
          Posicion: {Latitud: -34.6011346, Longitud:-58.376141 } }, 
        {Id:3, Nombre:"ITEVA Debenedetti", Descripcion:'Debenedetti 3895', 
          Direccion:'Debenedetti 3895', 
          Posicion: {Latitud: -34.5112987, Longitud: -58.5222914 } } , 
        {Id:4, Nombre:"Santa Rosa Plasticos", Descripcion:'Maq. Carregal 3151 - Munro', 
          Direccion:'Maq. Carregal 3151 - Munro', 
          Posicion: {Latitud: -34.522950, Longitud: -58.523104 } }
      ];*/      
  }



  alert_mostrar(titulo:string, mensaje:string){    
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['Ok']
    });
    alert.present();
  }

  loading_mostrar(mensaje:string){
    this.loading = this.loadingCtrl.create({
        content: mensaje
    });
    this.loading.present();
  }
  esta_ejecutando_en_browser():boolean{
    return this.platform.is('core') || this.platform.is('mobileweb');
  }

  toast_mostrar(mensaje:string) {
    //alert(this.platform.platforms().toString());
    if(this.esta_ejecutando_en_browser()) {

      let toast = this.toastCtrl.create({
        message: mensaje, 
        duration: 3000,
        position: 'middle'   
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
      toast.present();
    }else{
      let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 3000,
        position: 'center'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    
      /*this.toast.show(mensaje, '3000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
      );*/
    }
  }

  loading_ocultar(){
    setTimeout(() => {
      this.loading.dismiss();
    }, 100);
  }

  fichar(lugar:Lugar){
    console.log(lugar);
    
    this.loading_mostrar("Procesando ...");
    let fichada = new Fichada(this.user_id, lugar.Id, this.latitud, this.longitud );
    
    this.ficharService.fichar(fichada)
        .then(resultado => {          
          this.loading_ocultar();
          if(resultado){
            //this.alert_mostrar("Registrado", lugar.Nombre);
            this.toast_mostrar(lugar.Nombre);
            this.navCtrl.pop();          
            //this.lugares = resultado;            
          }else{
            this.alert_mostrar("Hubo un problema", "Error al intentar fichar");
          }
          console.log("Fichar:resultado: "+resultado);        
        }).catch(e => 
          console.log("Fichar - reject: " + e)
        );


    
        
  }
  mostrar_mi_posicion(){
    let geo = new Geo(this.latitud, this.longitud);
    //alert("latLng:"+latLng);

    this.navCtrl.push(MapVerPage, {
      geo: geo, 
      descripcion: "Mi posición"
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Lugares');
  }
  

}
