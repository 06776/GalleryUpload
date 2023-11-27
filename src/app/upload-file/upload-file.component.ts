import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  selectedFile: any

  selectFile(event: any) {
    // console.log(event.target.files);
    this.selectedFile = event.target.files[0]
  }

  uploadFile() {
    console.log(this.selectedFile);
  }
}
