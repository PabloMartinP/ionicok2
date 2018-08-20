import { Injectable } from '@angular/core';
import { HttpCustom } from '../typings/HttpCustom'
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { ConfigService } from '../providers/config-service';


class ApiResult{
  Codigo:number;
  Descripcion:string; 
  Errores: Array<any>;
  Respuesta:any;
}

@Injectable()
export class LoginService {
  public username: string;
  private password:string;
  constructor(public http: HttpCustom, public storage: Storage, public configService:ConfigService) {
    console.log('Hello LoginService Provider');
  }
  /*
  storage_guardar_user(){
    this.storage.ready().then(() => {
      // set a key/value
      this.storage.set("username", this.username);
      this.storage.set("password", this.username);
      
    });
  }  

  get_username():Promise<any>{
    //alert("this.storage.get.username:"+this.storage_get("username"));
    //return <string><any>this.storage_get("username") ;
    return this.storage.get("username");
  }*/

  login(username:string,password:string){
    //password = "81dc9bdb52d04dc20036dbd8313ed055";
    var userData = {"UserName": username, "Password": password};
    //var Indata = { "UserName": username, "Password": password };
    //alert("indata: "+userData);

    //let url:string = 'http://200.69.217.157:20123/api/Login';    
    let url:string = 'http://www.mdnet.com.ar:20123/api/Login';    
    
      
    return new Promise(resolve => {
      this.http
        .post(url, userData)
        .map(res => res.json())
        .subscribe(
            data => {
              let rs = new ApiResult();
              rs = data;
              if(rs.Codigo == 200){
                console.log("API:Login OK - ", data);
                this.username = username;
                this.password = password;
                //this.storage_guardar_user();

                //this.configService.set_user(userData);
                this.configService.set_user(data.Respuesta);
                this.configService.set_autologin(true);
                resolve(data);
              }else{                
                resolve(false);
              }              
            },
            err => {
              console.log("API:Login - ERROR: ", err);              
              resolve(false);
            }
        );
    });

  }

}
