
export class Geo{
  Latitud:number; 
  Longitud:number;
  constructor(latitud:number, longitud:number){
      this.Latitud  = latitud;
      this.Longitud = longitud;
  }
}

export class Lugar{    
  Id:number;
  Nombre:string;
  Descripcion:string;
	Direccion:string;
  Latitud:number; 
  Longitud:number;
  /*constructor(Id:number, Nombre:string, Descripcion:string, Direccion:string, Latitud:number, Longitud:number){
     this.Id = Id;
     this.Nombre = Nombre;
     this.Descripcion = Descripcion;
     this.Direccion = Direccion;
     this.Latitud = Latitud;
     this.Longitud = Longitud;
  };*/
}
export class Fichada{
  User_id:number;
  Lugar_id:number;
  Latitud:number; 
  Longitud:number;
  constructor(User_id:number, Lugar_id:number, Latitud:number, Longitud:number){
    this.User_id = User_id;
    this.Lugar_id = Lugar_id;
    this.Latitud = Latitud;
    this.Longitud = Longitud;
  }
}
