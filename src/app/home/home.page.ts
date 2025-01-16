import { Component } from '@angular/core';
import {
  DocumentScanner,
  DocumentScannerOptions,
} from '@ionic-native/document-scanner/ngx';
import { OCR, OCRSourceType } from '@awesome-cordova-plugins/ocr/ngx';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  safeScanDocBase64Image: any = '';
  scanimg: any = [];
  pdfPreview: any = '';
  pdfData: any = '';
  recognizedText: any = [];
  extractScanImage: string = '';

  constructor(
    private documentScanner: DocumentScanner,
    private ocr: OCR,
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private camera: Camera,
    private pdfGenerator: PDFGenerator,
    private sanitizer: DomSanitizer,
    private file: File,
    private fileOpener: FileOpener,
    private webview: WebView

  ) {}

  ionViewWillEnter() {
    this.checkPermissions();
  }

  // checkPermissions() {
  //   this.androidPermissions
  //     .checkPermission(
  //       this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
  //     )
  //     .then((result) => {
  //       if (!result.hasPermission) {
  //         this.androidPermissions.requestPermission(
  //           this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
  //         );
  //       }
  //     })
  //     .catch((err) => console.error('Permission error:', err));
  // }

  checkPermissions() {
    if (this.platform.is('android')) {
      const permissions = [
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      ];

      // Check all required permissions
      permissions.forEach((perm: any) => {
        this.androidPermissions.checkPermission(perm).then(
          (result) => {
            console.log('perm', perm);
            if (!result.hasPermission) {
              // If the first permission is missing, request all permissions
              this.requestPermissions(perm);
            } else {
              // Check the remaining permissions
              this.androidPermissions
                .requestPermissions(perm)
                .then((result) => {
                  const allGranted = permissions.every(
                    (perm) => result[perm].hasPermission
                  );
                  console.log('allGranted', allGranted);

                  if (!allGranted) {
                    this.requestPermissions(permissions);
                  }
                });
            }
          },
          (error: any) => {
            this.requestPermissions(permissions);
          }
        );
      });
    }
  }

  // Request Permissions Function
  requestPermissions(permissions: string[]) {
    this.androidPermissions.requestPermissions(permissions).then(
      (result) => {
        console.log('Permissions granted:', result);
      },
      (err) => {
        console.error('Error requesting permissions:', err);
      }
    );
  }

  scanDocument(scanTyp: any) {
    console.log('Scanning document...', scanTyp);

    const options: DocumentScannerOptions = {
      sourceType: scanTyp, // scanTyp 1 for camera, 0 for gallery
      fileName: 'scanned-document',
      returnBase64: true,
    };

    this.documentScanner
      .scanDoc(options)
      .then((imageData) => {
        const scanimg = `data:image/jpeg;base64,${imageData}`;
        this.scanimg.push(scanimg);
        this.safeScanDocBase64Image =
          this.sanitizer.bypassSecurityTrustUrl(imageData);
        console.log('Scanned Document: ', imageData);
      })
      .catch((error) => {
        console.error('Error scanning document:', error);
      });
  }

  generatePDF() {
    console.log('Generating PDF with scanned images:', this.scanimg);

    // Step 1: Prepare the HTML content for the PDF
    let htmlData = '';
    this.scanimg.forEach((img: string) => {
      htmlData += `<img src="${img}" style="width:100%; height:auto; margin-bottom:20px;"/>`;
    });
    this.pdfPreview = htmlData;

    // Generate the PDF
    this.pdfGenerator
      .fromData(htmlData, {
        documentSize: 'A4',
        landscape: 'portrait',
        type: 'base64', // Output PDF as base64
      })
      .then((pdfBase64) => {
        console.log('PDF generated successfully');
        this.pdfData = pdfBase64;

        // Save the PDF
        this.savePdf(pdfBase64);
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }

  createDirectory() {
    const directoryPath = this.file.dataDirectory; // Use dataDirectory for app-specific storage
    const directoryName = 'docScanner';

    this.file
      .createDir(directoryPath, directoryName, true)
      .then(() => {
        console.log('Directory created successfully!');
      })
      .catch((err) => {
        console.error('Error creating directory:', err);
      });
  }
  saveFile() {
    const directoryPath = this.file.dataDirectory + 'docScanner';
  
    const fileName = 'example.txt';
    const fileContent = 'This is an example content for the file.';

    this.file
      .writeFile(directoryPath, fileName, fileContent, { replace: true })
      .then((fileEntry) => {
        console.log('File saved successfully at:', fileEntry.nativeURL);
        this.openfileContent(fileEntry.nativeURL, fileName, fileContent);
      })
      .catch((err) => {
        console.error('Error saving file:', err);
      });
  }
  checkDirectory() {
    const directoryPath = this.file.dataDirectory + 'docScanner';
console.log(directoryPath,'directoryPath');
    this.file
      .checkDir(directoryPath, '')
      .then(() => {
        console.log('Directory exists!');
      })
      .catch(() => {
        console.error('Directory does not exist.');
      });
  }

  checkFile() {
    const filePath = this.file.dataDirectory + 'docScanner/';
    const fileName = 'example.txt';

    this.file
      .checkFile(filePath, fileName)
      .then((fileContent: any) => {
        console.log('File exists!');
        console.log('fileContent!',fileContent);
      
        this.openfileContent(filePath, fileName, fileContent);
       
      })
      .catch(() => {
        console.error('File does not exist.');
      });
  }

  openfileContent(filePath:any, fileName:any, MIMETYPE:any){
    this.fileOpener
    .open(filePath, MIMETYPE)
    .then(() => console.log('File opened successfully'))
    .catch((err) => console.error('Error opening file:', err));

    // this.file
    // .writeFile(filePath, fileName, fileContent, { replace: true })
    // .then((fileEntry) => {
    //   const fileUrl = fileEntry.nativeURL;
    //   console.log('File saved at:', fileUrl);

    //   // Open the file (optional)
    //   this.fileOpener
    // .open(filePath, 'text/plain')
    // .then(() => console.log('File opened successfully'))
    // .catch((err) => console.error('Error opening file:', err));
    //   window.open(fileUrl, '_blank');
    //   const localUrl = this.webview.convertFileSrc(filePath);
    //   window.open(localUrl, '_blank');
    // })
    // .catch((err) => {
    //   console.error('Error saving file:', err);
    // });
  }
  savePdf(pdfBase64: string) {
    console.log('Saving PDF...');
    this.createDirectory();
    const fileContent = this.base64ToBlob(pdfBase64, 'application/pdf');
    const fileName = 'scanned-document.pdf';
    const directoryPath = this.file.dataDirectory + 'docScanner';
    console.log('fileName',fileName)
    console.log('directoryPath',directoryPath)
    console.log('fileContent',fileContent)
    this.file
    .writeFile(directoryPath, fileName, fileContent, { replace: true })
    .then((fileEntry) => {
      console.log('File saved successfully at:', fileEntry.nativeURL);
      this.openfileContent(fileEntry.nativeURL, fileName, 'application/pdf');
    })
    .catch((err) => {
      console.error('Error saving file:', err);
    });
  
  }

  writeFile(path: string, fileName: string, pdfBlob: Blob) {
    this.file
      .writeFile(path, fileName, pdfBlob, { replace: true })
      .then((fileEntry) => {
        console.log('PDF saved successfully at:', fileEntry.nativeURL);
        this.openPDF(fileEntry.nativeURL);
      })
      .catch((error) => {
        console.error('Error saving PDF:', error);
      });
  }

  openPDF(filePath: string) {
    this.fileOpener
      .open(filePath, 'application/pdf')
      .then(() => console.log('PDF opened successfully'))
      .catch((err) => console.error('Error opening PDF:', err));
  }

  base64ToBlob(base64: string, mime: string): Blob {
    const byteCharacters = atob(base64); // Decode base64
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }

  captureImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imagePath) => {
        console.log('Image captured:', imagePath);
        this.scanImage(imagePath); // Pass the captured image to OCR
      },
      (error) => {
        console.error('Camera error:', error);
      }
    );
  }
  scanImage(imagePath: string) {
    console.log(imagePath, imagePath);

    this.ocr
      .recText(OCRSourceType.NORMFILEURL, imagePath) // Use NORMFILEURL for file-based input
      .then((result: any) => {
        console.log('Recognized text:', result);
        this.extractScanImage = imagePath;
        this.recognizedText = result.text;
        console.log(this.recognizedText);
      })
      .catch((error: any) => {
        console.error('OCR error:', error);
      });
  }

  captureAndRecognizeText() {
    // Example image path (you can integrate this with a Camera plugin to capture an image dynamically)
    const sampleImagePath =
      'file:///storage/emulated/0/Download/sample-image.jpg';
    this.scanImage(sampleImagePath);
  }
}
