import { Component, OnInit } from '@angular/core';
import {TranslatorService} from '../app/services/translator.service'
import { DatastoreService } from '../app/services/datastore.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private datastore: DatastoreService, private translator: TranslatorService) {

    }
    title = 'PaymentSelfActivation';
    language;
    config: any = {};
    ngOnInit() {
        this.getConfigData();
        this.datastore.setConfig(this.config);
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
            this.config.shopName = 'bonzanotest';

        if (document.getElementById('ragSoc') != undefined)
            this.config.ragSoc = document.getElementById('ragSoc').innerText;
        else
            this.config.ragSoc = 'SellaNet';

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



}