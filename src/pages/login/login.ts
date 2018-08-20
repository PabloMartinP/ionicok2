import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { LoginService} from '../../providers/login-service'
import {Md5} from 'ts-md5/dist/md5';

import { Storage } from '@ionic/storage';
import {ConfigService} from '../../providers/config-service'

//import { SplashScreen } from '@ionic-native/splash-screen';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string;
  password:string;
  password_hash:string;
  autologin:boolean;
  loading:Loading;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,     
    public loadingCtrl: LoadingController, 
    public loginService: LoginService, 
    private alertCtrl: AlertController, 
    private storage:Storage, 
    private configService:ConfigService) {
        //splashScreen.hide();
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.username = "";
    this.password = "";

    this.configService.get_autologin().then((autologin)=>{
      if(autologin){
        this.configService.get_user().then((user)=>{
          
          this.username = user.UserName;
          this.password_hash = user.Password;

          this.autologin = true;
          //this.login();
          console.log("Autologin true, redirect to tabspage");
          this.navCtrl.setRoot(TabsPage);
          //this.configService.set_autologin(false);
        })        
      }else{
        //alert("false autologin");
        this.username = "";
        this.password_hash = "";
        this.autologin = false;
        //this.configService.set_autologin(false);
      }
    });
    
  }

  login(){
    this.loading_mostrar("Ingresando ...");
    let pass:string;
    
    //alert("md5:" + Md5.hashStr('blah blah blah'));
    if(!this.autologin)
      pass = Md5.hashStr(this.password).toString();    
    else
      pass = this.password_hash;

    if(pass==undefined)
      pass = Md5.hashStr(this.password).toString();    

    //pass = this.password;
    console.log("username", this.username);
    console.log("password", pass);
    this.loginService.login(this.username, pass)
        .then(resultado => {               
          this.loading_ocultar();
          if(resultado){
            this.navCtrl.setRoot(TabsPage).then(()=>{
              //this.navCtrl.popToRoot();
            });
            
            //this.lugares = resultado;            
          }else{
            this.alert_mostrar("Incorrecto", "Vuelva a intentar");
          }
          console.log("Fichar:resultado: ", resultado);        
        }).catch(e => {
          this.loading_ocultar();
          this.alert_mostrar("Hubo un problema", "Verifique el server");
          console.log("Login - reject: ", e);
          }
        );         
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

  loading_ocultar(){
    setTimeout(() => {
      this.loading.dismiss();
    }, 100);
  }

}
