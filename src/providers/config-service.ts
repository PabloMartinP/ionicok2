import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ConfigService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigService {
  private KEY_AUTOLOGIN = "autologin";
  private KEY_USERNAME = "username";
  private KEY_PASSWORD = "password";
  private KEY_USER = "user";
  
  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ConfigService Provider');

  } 

  private _get(key:string):Promise<any>{
    return this.storage.get(key);
  }

  get_username():Promise<string>{
    return this._get(this.KEY_USERNAME);    
  }
  get_password():Promise<string>{
    return this._get(this.KEY_PASSWORD);    
  }

  get_user():Promise<any>{
    return this._get(this.KEY_USER);
  }
  

  get_autologin():Promise<boolean>{
    return this._get(this.KEY_AUTOLOGIN);    
  }

  
  set_user(user:any){
    this.storage.ready().then(() => {
      this.storage.set(this.KEY_USER, user);
    });
  }

  set_autologin(valor:boolean):any{    
    this.storage.ready().then(() => {
      return this.storage.set(this.KEY_AUTOLOGIN, valor);
    });
  }

  set_autologin_promise(valor:boolean):Promise<any>{
    return this.storage.set(this.KEY_AUTOLOGIN, valor);
  }





}
