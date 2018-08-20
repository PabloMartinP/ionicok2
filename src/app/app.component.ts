import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { LoginService } from '../providers/login-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, loginService:LoginService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();            
      
      //esto es para testear la conexion
      loginService.login("test", "test").then(()=>{
        //this.registerToken();
        //this.getNotifications();
        splashScreen.hide();
  
        }).catch(()=>{
          alert("Error de conexion a internet");
          splashScreen.hide();
        });
    });
  }
}
