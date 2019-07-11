import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatePaymentWindowComponent } from '../activate-payment-window/activate-payment-window.component';
import {PaymentService} from '../../services/payment.service'
import {TranslatorService} from '../../services/translator.service'
import { DatastoreService } from 'src/app/services/datastore.service';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

    constructor(public dialog: MatDialog, private paymentservice: PaymentService, private translator: TranslatorService,private datastore:DatastoreService) { }
    isCollapsed: boolean = false;
    collapsed: any;
    PaymentTypeList: any = [];
    PaymentTypeList1: any = [];
    config:any={ };

    language: string;
    ngOnInit() {
        this.getConfigData();
        this.datastore.setConfig(this.config);
        this.datastore.paymentType.subscribe(data => this.PaymentTypeList = data);
        this.paymentservice.getPayment().subscribe(data => this.PaymentTypeList1 = data);
        this.paymentservice.getPaymentType({ shopLogin: this.config.shopName }).subscribe(data => this.PaymentTypeList = data);
    console.log(this.PaymentTypeList);
    }

    openActivatePaymentsDialog(): void {
        this.dialog.open(ActivatePaymentWindowComponent, { maxWidth: '100%' });
    }

    getConfigData() {
        var Language;
        if (document.getElementById('apiKey') != undefined)
            this.config.apiKey = document.getElementById('apiKey').innerText;
        else
            this.config.apiKey = '';
        // this.req.apiKey = 'Qm9uemFub1Rlc3QjI1JhZ1NvYyAtIEZha2UgbWVyY2hhbnQjIzIwLzAzLzIwMTggMDk6NTI6MTY=';
        if (document.getElementById('shopLogin') != undefined)
            this.config.shopName = document.getElementById('shopLogin').innerText;
        else
            this.config.shopName = '7182';

        if (document.getElementById('languageId') != undefined) {
             Language = document.getElementById('languageId').innerText;
            this.setLanguage(Language);
        }
        else {
            this.config.LanguageID = 0;
        }
        this.setLanguage(Language);

    }


    setLanguage(Language) {
        if (Language == "1") {

            this.language = "it"
            this.config.LanguageID = 1;
        } else if (Language == "2") {
            this.language = "en"
            this.config.LanguageID = 2;
        } else {
            this.language = "it"
        }
        this.translator.SetLanguage(this.language);

    }


    openDetail(i: any) {
        if (i != this.collapsed) {
            this.collapsed = i;
            this.isCollapsed = true;
        }
        else if (i == this.collapsed) {
            this.isCollapsed = !this.isCollapsed;
        }
    }




}
