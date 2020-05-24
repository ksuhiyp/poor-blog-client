export class UploadAdapter {
  loader; // your adapter communicates to CKEditor through this
  url;
  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
    console.log('Upload Adapter Constructor', this.loader, this.url);
  }

  upload() {
    return new Promise((resolve, reject) => {
      console.log('UploadAdapter upload called', this.loader, this.url);
      console.log('the file we got was', this.loader.file);
      resolve({ default: 'http://localhost:8080/image/1359' });
    });
  }

  abort() {
    console.log('UploadAdapter abort');
  }
}
