import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const cudOptionsHtml = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8' })
};
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url = 'http://localhost:3000';
  constructor(public http: HttpClient) { }

  postNewClient(client): Observable<any[]>{
    const params ={
      c_dni: client.c_dni,
      c_name: client.c_name,
      c_lastname: client.c_lastname
    };
    const newSession = Object.assign({},params);
    return this.http.post<any[]>(this.url + '/clients?', newSession,cudOptions)
  }

  postDniFront(dni,client): Observable<any>{
    const params={
      c_dni_front: client.c_dni_front
    }
    
    const newSession = Object.assign({}, params);

    return this.http.put(this.url+'/clients/uploadFront/'+[dni],newSession,cudOptions)
  }

  postDniBack(dni,client): Observable<any>{
    const params={
      c_dni_back: client.c_dni_back
    }
    
    const newSession = Object.assign({}, params);

    return this.http.put(this.url+'/clients/uploadBack/'+[dni],newSession,cudOptions)
  }
  getClients(): Observable<any>{
    return this.http.get(this.url+'/clients');
  }

  getClient(dni): Observable<any>{
    const params ={
      c_dni:dni 
    }
    const newSession = Object.assign({}, params);
    return this.http.get(this.url+'/clients/'+[dni],cudOptions)
  }

  deleteClient(dni): Observable<any>{
    const params={
      c_dni: dni
    }
    const newSession = Object.assign({}, params);
    return this.http.put(this.url+'/clients/ldelete/'+[dni],newSession,cudOptions)
  }

  updateClient(dni,client): Observable<any>{
    const params={
      c_dni: client.c_dni,
      c_name: client.c_name,
      c_lastname: client.c_lastname,
      c_dni_front: client.c_dni_front,
      c_dni_back: client.c_dni_back
      
    }
    const newSession = Object.assign({},params)
    return this.http.put(this.url+'/clients/'+[dni],newSession,cudOptions);
  }
}
