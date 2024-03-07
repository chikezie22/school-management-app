import { Form } from './../model/form';
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private afs: Firestore,
    private storage: Storage,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  uploadImage(selectedImage, postForm: Form) {
    const filePath = `post/${Date.now()}`;

    const storageRef = ref(this.storage, filePath);
    uploadBytes(storageRef, selectedImage).then(() => {
      console.log('Post Image Uploaded Successfully');

      getDownloadURL(storageRef).then((URL) => {
        const url = URL.toString();
        postForm.waec = URL;
      });
    });
  }

  // post data asides image to firebase
  savaData(postData: any) {
    const collectionInstance = collection(this.afs, 'post');

    addDoc(collectionInstance, postData)
      .then((docRef) => {
        this.snackBar.open('Data Added 😎', 'close', {
          duration: 3000,
        });
        // this.route.navigateByUrl('/dashboard');
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'close', {
          duration: 3000,
        });
      });
  }

  loadData(): Observable<any[]> {
    const usersCollection = collection(this.afs, 'post');

    return from(getDocs(usersCollection)).pipe(
      map((querySnapshot) => {
        const users: any[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<any>) => {
          users.push({ id: doc.id, data: doc.data() });
        });
        return users;
      })
    );
  }
}
