import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { TranslatorService } from './translator.service';
import{DatastoreService}from './datastore.service'
@Injectable({
    providedIn: 'root'
})
export class UtilService {
    apiBaseUrl;
    Language;
    config;
    appConfig;
    constructor(private http: HttpClient,private dataStore:DatastoreService ) { }

    public loadConfig() {
        return this.http.get('../assets/webconfig.json').pipe(
            map(res => res),
            tap(configData => (this.config = configData))).toPromise()
            .then((configData) => {
                this.appConfig = configData["APP_CONFIG"];
                this.config = configData["ENVIRONMENT_CONFIG"];
                var env = this.config["ENVIRONMENT"];
                this.apiBaseUrl = this.config[env];
                if (configData["IS_LOG"]) {
                    console.log("ENVIRONMENT_CONFIG -->>" + this.config)
                }
            });
    }


    getApiUrl(url: string) {
        return this.apiBaseUrl+url;
        //return url;
    }

    getConfig() {
        return this.appConfig;
    }

    post(url: string, reqObj: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        var reqBdy = JSON.stringify(reqObj);
        return this.http.post<any>(this.getApiUrl(url), reqBdy, httpOptions)
            .pipe(
            tap(
                data => {
                    //Logging configured in webconfig
                    this.dataStore.setLoad(true);

                    if (this.appConfig["IS_LOG"]) {
                        this.dataStore.setLoad(false);
                        console.log("PostURL -->>" + url);
                        console.log("PostRequest -->>");
                        console.log(reqBdy);
                        console.log("PostResponse -->>");
                        console.log(data)
                    }
                },
                error => {
                    this.dataStore.setLoad(false);
                }
            ))
    }


    get(url: string): Observable<any> {
        return this.http.get<any>(this.getApiUrl(url))
            .pipe(
            tap(
                data => {
                    if (this.appConfig["IS_LOG"]) {
                        console.log("GetURL -->>" + url)
                        console.log("GetResponse -->>");
                        console.log(data);
                    }
                },
                error => console.log("ERR Occured")
            ))
    }
}
