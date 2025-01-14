import { Component } from '@angular/core';
import {
  DocumentScanner,
  DocumentScannerOptions,
} from '@ionic-native/document-scanner/ngx';
import { OCR } from '@awesome-cordova-plugins/ocr/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  ScanDoc: string = '';

  constructor(
    private documentScanner: DocumentScanner,
    private ocr: OCR,
    private platform: Platform
  ) {}

  scanDocument() {
    const options: DocumentScannerOptions = {
      sourceType: 0, // Camera
      fileName: 'scanned-document',
      returnBase64: true,
    };

    this.documentScanner
      .scanDoc(options)
      .then((imageData) => {
        this.ScanDoc = imageData;
        console.log('Scanned Document: ', imageData);
        this.recognizeText(imageData);
      })
      .catch((error) => {
        console.error('Error scanning document:', error);
      });
  }

  recognizeText(imagePath: string) {
    this.platform.ready().then(() => {
      this.ocr
        .recText(0, imagePath)
        .then((result: any) => {
          console.log('Recognized text:', result);
        })
        .catch((error: any) => {
          console.error('OCR error:', error);
        });
    });
  }
}
