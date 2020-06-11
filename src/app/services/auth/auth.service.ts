import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { usercreads } from '../../models/usercreads';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
interface User {
  uid : string;
  email : string;
  displayname : string;
  photoURL: string;
  emailVerified: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router:Router,
    public ngZone: NgZone,
    public afs: AngularFirestore,
  ) { }

  login(credentials: usercreads) {
    var promise = new Promise( (resolve , reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email , credentials.password).then( () => {
        resolve(true);
      }).catch( (err) => {
        reject(err);
      });
    });
    return promise;
  }
  async AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['profilepic-page'])
        })
        this.SetUserData(result.user);
      }).catch(error => {
        window.alert(error)
      })
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayname: user.displayname,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  //Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }
}
