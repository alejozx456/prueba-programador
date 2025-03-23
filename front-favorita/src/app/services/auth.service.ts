import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { Session } from '../models/session.interface';
import { LoginResponse } from '../models/login-response.interface';
import { ResponseTransaction } from '../models/transaction-response.interface';
import { PagopluxResponse } from '../models/pagoplux-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http=inject(HttpClient);
  API='xxxxxxxxxxxxxxx'; //ingresar la url de la api
  data: any = {};

  constructor() {
    this.loadPayboxData();
  }

  private loadPayboxData() {
    this.data = {
      PayboxRemail: "dmorales@pagoplux.com",
      PayboxSendmail: "alejozx456@gmail.com",
      PayboxRename: "Prueba de pago",
      PayboxSendname: "Nombre tarjetahabiente",
      PayboxBase0: "0.0",
      PayboxBase12: "2.0",
      PayboxDescription: "Descripcion del pago",
      PayboxLanguage: "es",
      PayboxDirection: "Ambato",
      PayBoxClientPhone: '0984247778',
      PayboxProduction: false,
      PayboxRecurrent: false,
      PayboxIdPlan: '171',
      PayboxPermitirCalendarizar: true,
      PayboxPagoInmediato: true,
      PayboxCobroPrueba: false,
      PayBoxClientIdentification: 'Cedula tarjetahabiente',
      PayboxAmountVariablePlan: true,
      PayboxFrequencyPlan: 'MEN',
      PayboxTieneIvaPlan: true,
      PayboxDescriptionPlan: 'Descripcion plan',
      PayboxEnvironment: 'sandbox',
      PayboxPagoPlux: false,
      PayboxIdElement: 'ButtonPaybox'
    };
  }

  login(username:string,password:string):Observable<LoginResponse>{
    const body={
      username,
      password
    }
    return this.http.post<LoginResponse>(this.API+'/login',body,{
      withCredentials:true //permite recibir cookies
    });
  }

  register(username:string,password:string):Observable<User>{
    const body={
      username,
      password
    }
    return this.http.post<User>(this.API+'/register',body,{
      withCredentials:true
    });
  }

  logout():Observable<any>{
    return this.http.post<any>(this.API+'/logout',{},{
      withCredentials:true
    })
  }

  getSession():Observable<Session>{
    return this.http.get<Session>(this.API+'/protected',{
      withCredentials:true
    })
  }

  createTransaction(idTransaction:string,idUser:string):Observable<any>{
    const body={
      idTransaction,
      idUser
    }
    return this.http.post<any>(this.API+'/transaction',body,{
      withCredentials:true
    })
  }

  getTransactions(id:string):Observable<ResponseTransaction>{
    return this.http.get<ResponseTransaction>(this.API+'/transactionsbyuser/'+id);
  }

  getPagoPluxResponse(id:string):Observable<PagopluxResponse>{
    return this.http.get<PagopluxResponse>(this.API+'/transaction/'+id);
  }


}
