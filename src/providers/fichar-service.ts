import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Fichada  } from '../typings/typings' 
import { HttpCustom} from '../typings/HttpCustom'


@Injectable()
export class FicharService {
  constructor(public http: HttpCustom) {
    console.log('Hello FicharService Provider');
  }
  data:any;

  fichar(fichada:Fichada){
    var Indata = { "Usuario": fichada.User_id, "Lugar": fichada.Lugar_id, "Latitud": fichada.Latitud, "Longitud": fichada.Longitud };
    let FICHADA:string = 'http://www.mdnet.com.ar:20123/api/Fichada';
    
    let url = FICHADA;
        
    return new Promise(resolve => {
      this.http
        .post(url, Indata)
        .map(res => res.json())
        .subscribe(
            data => {
              console.log(data);
              resolve(data);
            },
            err => {
              console.log("API:Fichar - ERROR: ", err);              
              resolve(false);
            }
        );
    });
  }

}
