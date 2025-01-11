import { Component } from '@angular/core';
import {
  DocumentScanner,
  DocumentScannerOptions,
} from '@ionic-native/document-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(private documentScanner: DocumentScanner) {}

  scanDocument() {
    const options: DocumentScannerOptions = {
      sourceType: 1, // Camera
      fileName: 'scanned-document',
      returnBase64: true,
    };

    this.documentScanner
      .scanDoc(options)
      .then((imageData) => {
        console.log('Scanned Document: ', imageData);
      })
      .catch((error) => {
        console.error('Error scanning document:', error);
      });
  }
}
