import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

export class Info{
  AppName:string; 
  PackageName:string; 
  VersionCode:string; 
  VersionNumber:string;
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  info:Info = new Info();

  constructor(public navCtrl: NavController, public appVersion:AppVersion) {
    
    this.info.AppName  = "";
    this.info.PackageName = "";
    this.info.VersionCode="";
    this.info.VersionNumber = "";

  }


  ionViewDidLoad() {    
    this.appVersion.getAppName().then((valor)=>{
      //alert("valor: "+valor);
      this.info.AppName = valor;
    }).catch((e)=>{
      this.info.AppName = "errAppName";
    });
    this.appVersion.getVersionCode().then((valor)=>{
      //alert("valor: "+valor);
      this.info.VersionCode = valor.toString();
    }).catch((e)=>{
      this.info.VersionCode = "errVersionCode";
    });
    this.appVersion.getPackageName().then((valor)=>{
      //alert("valor: "+valor);
      this.info.PackageName = valor;
    }).catch((e)=>{
      this.info.PackageName= "errPackageName";
    });
    this.appVersion.getVersionNumber().then((valor)=>{
      //alert("valor: "+valor);
      this.info.VersionNumber = valor;
    }).catch((e)=>{
      this.info.VersionNumber= "errVersionNumber";
    });
        
  }

  ir_a_latika(){
    alert("ir_a_latika");
  }

}
