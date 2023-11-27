import { Component } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  selectedFile: any

  constructor(private base: BaseService) { }

  selectFile(event: any) {
    // console.log(event.target.files);
    this.selectedFile = event.target.files[0]
  }

  uploadFile() {
    this.base.uploadFile(this.selectedFile)
    // console.log(this.selectedFile);
  }
}
