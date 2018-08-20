import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { CheckPage } from '../pages/check/check';
import { LugaresPage } from '../pages/lugares/lugares';
import { MapVerPage } from '../pages/map-ver/map-ver';


import { HttpModule  } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { LugarService } from '../providers/lugar-service';
import { FicharService } from '../providers/fichar-service';
import { HttpCustom } from '../typings/HttpCustom';
import { LoginService } from '../providers/login-service';
 
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import {Md5} from 'ts-md5/dist/md5';
import {ConfigService} from '../providers/config-service'
import { ToastController } from 'ionic-angular';

//import { Toast } from '@ionic-native/toast';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
/*
const cloudSettings: CloudSettings = {
  core: {
    app_id: '167bf554'
  },
  push: {
    sender_id: '348178262255',
    pluginConfig: {
      ios: {
        badge: true,
        sound: true
      },
      android: {
        iconColor: '#343434',
        forceShow: true, 
        topics: ['all']
      }
    }
  }
};*/


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LugaresPage, 
    CheckPage, 
    MapVerPage, 
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp), 
    //CloudModule.forRoot(cloudSettings), 
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    LugaresPage, 
    CheckPage, 
    MapVerPage, 
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation, 
    LugarService, 
    FicharService, 
    HttpCustom, 
    LoginService, 
    Md5, 
    AppVersion, 
    ConfigService, 
    ToastController, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
/*
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { CheckPage } from '../pages/check/check';
import { LugaresPage } from '../pages/lugares/lugares';
import { MapVerPage } from '../pages/map-ver/map-ver';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
*/