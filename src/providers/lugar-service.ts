import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geo  } from '../typings/typings' 
import { HttpCustom} from '../typings/HttpCustom'

@Injectable()
export class LugarService {



  lugares:any = [];

  constructor(public http: HttpCustom) {
    console.log('Hello LugarService Provider');
    this.lugares = [];
  }

  lugares_cercanos(geo:Geo, user_id:number) {   
    var lat = geo.Latitud;
    var lng = geo.Longitud;
    var userid = user_id;
    var url = 'http://www.mdnet.com.ar:20123/api/Lugar' + '?latitud='+lat+'&longitud='+lng+'&usuario='+userid;
    
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get(url )
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.lugares = data;
          resolve(this.lugares);
        },
            err => {
              console.log("API:Fichar - ERROR: ", err);              
              resolve(null);
            });
    });
  }



}
