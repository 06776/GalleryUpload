import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  uploadFile(file: any) {
    const filename = '/feltolt/' + file.name;
    const storageRef = this.storage.ref(filename);
    this.storage.upload(filename, file).snapshotChanges()
      .subscribe({
        next: (ref: any) => {
          console.log(ref)
        },
        error: (err: any) => console.log(err),
        complete: () => {
          storageRef.getDownloadURL().subscribe(
            (url) => {
              this.saveFileData({ name: file.name, url: url })
              console.log(file.name, url)
            })
        }
      }
      );
  }

  saveFileData(fileData: any) {
    this.db.list('/feltolt/').push(fileData)
  }
}
