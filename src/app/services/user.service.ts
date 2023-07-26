import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth) {}

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    this.loggedIn();
    console.log(this.auth);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logOut() {
    return signOut(this.auth).catch(() => {
      // Redirect the user to the login page.
      this.loggedIn();
    });
  }

  loggedIn() {
    const isLoggedIn = this.auth.currentUser !== null;
    console.log('User is logged in: ' + isLoggedIn);
    return isLoggedIn;
  }

  resetPw(email: string): Promise<void> {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }
}
