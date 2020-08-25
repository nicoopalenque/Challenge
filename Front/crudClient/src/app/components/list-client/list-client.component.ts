import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients: any[];
  url:string;
  constructor(private _clientService: ClientService,private sanitizer: DomSanitizer) { }

 
  ngOnInit(){
    this._clientService.getClients().subscribe(resp=>{
      
      this.clients = resp[0];
    })
  }
  getClients(){
    this._clientService.getClients().subscribe(resp=>{
      
      this.clients = resp[0];
    })
  }

  deleteClient(data){
  
    this._clientService.deleteClient(data.c_dni).subscribe(resp=>{
      if(resp['ok']){
        console.log('Se elimino correctamente')
      }else{
        console.log('No se pudo eliminar')
      }
    
    });
  }
  getData(data){
    console.log(data.c_dni_front);
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
}
