import { PostService } from './post.service';
import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Form } from '../model/form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private afAuth: Auth,
    private snackBar: MatSnackBar,
    private route: Router,
    private postService: PostService
  ) {}

  async createAccount(email, password, selectedImage, postForm: Form) {
    const method = await this.checkIfEmailIsRegistered(email);
    if (method.length > 0) {
      this.snackBar.open('Email already registered', 'close', {
        duration: 3000,
      });
      return;
    }
    createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((ref) => {
        this.postService.uploadImage(selectedImage, postForm);
        setTimeout(() => {
          this.postService.savaData(postForm);
        }, 4000);
        this.snackBar.open('Registered Successfully', 'close', {
          duration: 2000,
        });
        setTimeout(() => {
          this.route.navigateByUrl('/');
        }, 6000);
      })
      .catch((err) => {
        console.log(err.message);
        this.snackBar.open('Email already in use', 'close', {
          duration: 3000,
        });
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.afAuth, email, password)
      .then((ref) => {
        this.snackBar.open('LoggedIn Successfully', 'close', {
          duration: 3000,
        });
        this.route.navigateByUrl('/dashboard');
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
      })
      .catch((err) => {
        this.snackBar.open(err.message, 'close', {
          duration: 3000,
        });
      });
  }

  checkIfEmailIsRegistered(email: string) {
    return fetchSignInMethodsForEmail(this.afAuth, email);
  }

  logOut() {
    if (this.loggedIn.value) {
      signOut(this.afAuth).then((ref) => {
        this.snackBar.open('LoggedOut Successfully', 'close', {
          duration: 3000,
        });
        this.loggedIn.next(false);
        this.isLoggedInGuard = false;
        console.log(this.loggedIn);
        this.route.navigateByUrl('/');
      });
    } else {
      this.snackBar.open('User is not Logged In', 'close', {
        duration: 3000,
      });
      console.log('not logged in');
      return;
    }
  }
}
function Form(postForm: any, Form: any) {
  throw new Error('Function not implemented.');
}
