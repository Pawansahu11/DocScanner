import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentScanner } from '@ionic-native/document-scanner/ngx';
import { OCR } from '@awesome-cordova-plugins/ocr/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },DocumentScanner,OCR,PDFGenerator, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
