import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Paymenttypes} from '../shared/models/paymenttypes'

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  public _paymentData: BehaviorSubject<Paymenttypes[]>;
  public _loader: BehaviorSubject<boolean>;
  public _config:BehaviorSubject<{}>;

  public dataStore: {
    paymentData:Paymenttypes[],
    isLoading:boolean,
    config:object
 }
  constructor() { 
    this.dataStore = {paymentData: [],isLoading: false,config:{}};
    this._paymentData = <BehaviorSubject<Paymenttypes[]>>new BehaviorSubject([]);
    this._loader = <BehaviorSubject<boolean>>new BehaviorSubject(false);
    this._config=<BehaviorSubject<{}>>new BehaviorSubject({});
  }

  get paymentType() {
    return this._paymentData.asObservable();
  }
  
  get isLoading(){
    return this._loader.asObservable();
  }
  get config(){
    return this._config.asObservable();
  }

  setLoad(flag: boolean) {
    this.dataStore.isLoading = flag;
    this._loader.next(this.dataStore.isLoading);
  }
  setConfig(configdata:any){
    this.dataStore.config=configdata;
    this._config.next(this.dataStore.config);
  }
  setPaymentType(typeData: any) {
    this.dataStore.paymentData = typeData;
    this._paymentData.next(this.dataStore.paymentData);
  }
}
