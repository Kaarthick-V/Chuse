import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private translate: TranslateService) { }
 
  SetLanguage(language: string) {
    this.translate.setDefaultLang(language);
  }
 
  //to get translated content
  getTranslation(transkey: string): string {
    return this.translate.instant(transkey);
  }
}
