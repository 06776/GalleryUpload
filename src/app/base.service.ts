import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) { }

  uploadFile(file: any) {
    const filename = '/feltolt/' + file.name
    console.log(filename)
    const storegeRef = this.storage.ref(filename)

    const updateTask = this.storage.upload(filename, file)

    updateTask.snapshotChanges()
      .subscribe({
        next: (ref: any) => {
          console.log(ref)

        },
        error: (err: any) => console.log(err),
        complete: () => {
          storegeRef.getDownloadURL().subscribe(
            (url) => {
              this.saveFileData({ name: file.name, url: url })
              console.log(file.name, url)
            })
        }
      }
      )
    return updateTask.percentageChanges()
  }

  saveFileData(fileData: any) {
    this.db.list('/feltolt/').push(fileData)
  }

}