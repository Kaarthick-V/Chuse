import { Injectable } from '@angular/core';
import { UtilService } from '../services/util.service';
import { Observable } from 'rxjs';
import {Paymenttypes} from '../shared/models/paymenttypes'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    constructor(private util: UtilService, private http: HttpClient) { }
    getPayment(): Observable<any> {
        //return this.util.get('../PaymentManagement/assets/data.json');
        return this.http.get<any>('../assets/data.json');
    }
    getPaymentType(paymentreq): Observable<Paymenttypes> {
        return this.util.post('paymentmanagement/GetPayments', paymentreq);

    }
    getActivatePayment(): Observable<any> {
        return this.util.get('assets/payment.json');
    }
}
