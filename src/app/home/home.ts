// scanDocument(scanTyp: any) {
//     console.log('Scanning document...', scanTyp);

//     const options: DocumentScannerOptions = {
//       sourceType: scanTyp, // scanTyp 1 for camera, 0 for gallery
//       fileName: 'scanned-document',
//       returnBase64: true,
//     };

//     this.documentScanner
//       .scanDoc(options)
//       .then((imageData) => {
//         const scanimg = `data:image/jpeg;base64,${imageData}`;
//         this.scanimg.push(scanimg);
//         this.safeScanDocBase64Image =
//           this.sanitizer.bypassSecurityTrustUrl(imageData);
//         console.log('Scanned Document: ', imageData);
//         // this.recognizeText(imageData);
//       })
//       .catch((error) => {
//         console.error('Error scanning document:', error);
//       });
//   }

//   recognizeText(imagePath: string) {
//     this.platform.ready().then(() => {
//       this.ocr
//         .recText(0, imagePath)
//         .then((result: any) => {
//           console.log('Recognized text:', result);
//         })
//         .catch((error: any) => {
//           console.error('OCR error:', error);
//         });
//     });
//   }

//   generatePDF() {
//     console.log('scanning', this.scanimg);

//     // Step 1: Prepare the HTML content for the PDF
//     let htmlData = '';
//     this.scanimg.forEach((img: string) => {
//       htmlData += `<img src="${img}" style="width:100%; height:auto; margin-bottom:20px;"/>`;
//     });

//     // Generate the PDF
//     this.pdfGenerator
//       .fromData(htmlData, {
//         documentSize: 'A4',
//         landscape: 'portrait',
//         type: 'base64', // Output PDF as base64
//         fileName: 'scanned-document.pdf',
//         baseUrl:'///storage/emulated/0/Download'
//       })
//       .then((pdfBase64) => {
//         console.log('PDF generated successfully');
//         this.pdfData = pdfBase64;

//         // Save the PDF
//         this.savePdf(pdfBase64);
//       })
//       .catch((error) => {
//         console.error('Error generating PDF:', error);
//       });
//   }

//   savePdf(pdfBase64: string) {
//     console.log('Base64 Data:', pdfBase64);

//     // Step 2: Convert base64 string to Blob
//     const pdfBlob = this.base64ToBlob(pdfBase64, 'application/pdf');

//     // Step 3: Save the Blob to the device's data directory
//     const fileName = 'multiple_images.pdf';
//     const directoryPath = this.file.dataDirectory + 'Download';
//     console.log('directoryPath', directoryPath);

    
//     this.file
//       .writeFile(directoryPath, fileName, pdfBlob, { replace: true })
//       .then((fileEntry: any) => {
//         console.log('PDF saved successfully at:', fileEntry.toURL());

//         // Step 4: Display the saved PDF
//         const fileURL = fileEntry.toURL(); // Use the correct URL
//         window.open(fileURL, '_blank'); // Open in a new tab or app
//       })
//       .catch((error) => {
//         console.error('Error saving PDF:', error);
//       });
//   }

//   base64ToBlob(base64: string, mime: string): Blob {
//     const byteCharacters = atob(base64); // Decode base64
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//       const slice = byteCharacters.slice(offset, offset + 512);
//       const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//     }

//     return new Blob(byteArrays, { type: mime });
//   }