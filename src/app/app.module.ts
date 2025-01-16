import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentScanner } from '@ionic-native/document-scanner/ngx';
import { OCR } from '@awesome-cordova-plugins/ocr/ngx';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DocumentScanner,
    OCR,
    PDFGenerator,
    Platform,
    AndroidPermissions,
    File,
    FileOpener,
    WebView,
    Clipboard,
    Camera],
  bootstrap: [AppComponent],
})
export class AppModule {}
