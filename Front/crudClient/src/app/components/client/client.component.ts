import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client-service.service'
import { ListClientComponent } from '../list-client/list-client.component'
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  name: string;
  lastname: string;
  dni: string;
  dniFront:any;
  dniBack:any;
  client: any[];

  constructor(private _clientService: ClientService) { }

  ngOnInit(): void {
  }
  
  
  onFileBack(e){
    console.log(e.target.files[0])
    let me = this;
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.dniBack = reader.result;
      //console.log(reader.result);

    };
    reader.onerror = (err)=>{
      console.log('Error: ', err);
    };
  }

  onFileFront(e){
    console.log(e.target.files[0])
    let me = this;
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.dniFront = reader.result;
      //console.log(reader.result);

    };
    reader.onerror = (err)=>{
      console.log('Error: ', err);
    };
  }

  insertClient(){
    let client = {
      c_dni:this.zfill(this.dni,8),
      c_name:this.name,
      c_lastname:this.lastname
    }

    console.log(client);

    this._clientService.postNewClient(client).subscribe(resp=>{
      console.log(resp);
      if(resp['ok']){
        alert('El cliente se registro correctamente');

        //carga cara dni
        let Front={
          c_dni_front:this.dniFront
        }
        this._clientService.postDniFront(client.c_dni,Front).subscribe(resp=>{
          console.log(resp);
          if(resp['ok']){
            console.log('imagen enviada en base64');
          }else{
            console.log('Error, no se puso subir la imagen')
          }
        })

        //Carga dorso de dni
        let Back={
          c_dni_back:this.dniBack
        }
        this._clientService.postDniBack(client.c_dni,Back).subscribe(resp=>{
          console.log(resp);
          if(resp['ok']){
            console.log('imagen enviada en base64');
            this.cleanForm();
          }else{
            console.log('Error, no se puso subir la imagen')
          }
        })
        
    
      }
    }, err =>{
      alert('Se produjo un error al agregar al cliente');
    })
    
  }
  searchClient(){
    if(this.dni==null){
      alert('Debe ingresar un DNI para realizar la busqueda')
    }else{
      this._clientService.getClient(this.dni).subscribe(resp=>{
        //if (resp['ok']){
          this.client = resp[0]
          console.log(this.client[0])
          this.name = this.client[0].c_name;
          this.lastname = this.client[0].c_lastname;
          this.dniFront = this.client[0].c_dni_front;
          this.dniBack = this.client[0].c_dni_back;
        //}else{
         // alert('No existe un cliente registrado con ese DNI')
        //}
          
      });
    }
  }
  updateData(){
    if(this.dni == null && this.name == null && this.lastname == null && this.dniFront ==null && this.dniBack==null){
      console.log('Debe ingresar datos')
    }else{
      let client={
        c_dni: this.dni,
        c_name: this.name,
        c_lastname: this.lastname,
        c_dni_front: this.dniFront,
        c_dni_back: this.dniBack
      }
      this._clientService.updateClient(this.dni,client).subscribe(resp=>{
        if(resp['ok']){
          console.log('Los datos se actualizaron correctamente');
        }else{
          console.log('Error, no se pudieron actualizar los datos, vuelva a intentarlo')
        }
      })
    }
    this.cleanForm();    
  }
  cleanForm(){
    this.dni = null;
    this.name = null;
    this.lastname = null;
    this.dniFront = null;
    this.dniBack = null;
  }
  zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

}
