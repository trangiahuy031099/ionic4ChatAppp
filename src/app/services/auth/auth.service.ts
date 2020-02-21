import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { usercreads } from '../../models/usercreads'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth
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
}
