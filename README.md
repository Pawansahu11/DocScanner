Ocr Plugin Working :  ![Ocr](https://github.com/user-attachments/assets/8db5027f-ad30-41d6-8eb1-bd616552050c)


PDF Ganrate Working Vidio : ![Pdfganrate](https://github.com/user-attachments/assets/23865b2b-8ef2-447e-81b5-ba4b7e523774)


**Project Title
**
**Overview**

This project is built using Ionic Angular with Cordova and provides a comprehensive solution for document management. It includes features like scanning documents, extracting text using OCR, generating PDFs, and securely managing files on the device.

**Features**

Cross-Platform Compatibility: Works seamlessly on both Android and iOS.

Document Scanning: Capture documents using the device camera.

OCR (Optical Character Recognition): Extract text from scanned images.

PDF Generation: Create PDF documents from scanned images or text.

Secure File Storage: Save and manage files securely on the device.

Permission Management: Ensures required permissions for camera, storage, and other functionalities are handled efficiently.

**Technology Stack**

Ionic Framework: Provides the front-end user interface components.

Angular: Enables a structured and modular application architecture.

Cordova: Facilitates access to device-specific APIs.

**Cordova Plugins Used**

cordova-plugin-splashscreen: Handles splash screen display during app launch.

cordova-plugin-camera: Provides access to the device camera for capturing images.

cordova-plugin-document-scanner: Allows document scanning via camera or gallery.

cordova-pdf-generator: Generates PDF documents from HTML or image data.

cordova-plugin-mobile-ocr: Extracts text from images using OCR.

cordova-sqlite-storage: Manages local storage with SQLite database.

cordova-plugin-file: Facilitates file handling and storage operations.

cordova-plugin-file-opener2: Opens files with associated apps on the device.

**Installation**

Clone the repository:

git clone https://github.com/Pawansahu11/DocScanner.git

Navigate to the project directory:  cd DocScanner

Install dependencies: npm install

Add the Cordova platforms:

ionic cordova platform add android
ionic cordova platform add ios

Build the project:

ionic cordova build android
ionic cordova build ios

**Usage**

Run the app on a device or emulator:

ionic cordova run android --device
ionic cordova run ios --device

Use the app to:

Scan documents using the camera.

Extract text from images using OCR.

Generate PDFs from scanned documents or HTML.

Save and view files offline.
