import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  firebasedata = firebase.database().ref('chatuser');
  constructor(public afAuth: AngularFireAuth) { }

  adduser(newuser) {
    var promise = new Promise( (resolve , reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(newuser.email , newuser.password).then( () => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then( ()=> {
          this.firebasedata.child(this.afAuth.auth.currentUser.uid).set({
            uid: this.afAuth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
          }).then( () => {
            resolve( {success: true})
          }).catch( (err) => {
            reject(err);
          })
        }).catch( (err) => {
          reject(err);
        })
      }).catch( err => {
        reject(err);
      })
    })
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise( (resolve , reject) => {
      firebase.auth().sendPasswordResetEmail(email).then( () => {
        resolve({success: true});
      }).catch( err => {
        reject(err);
      })
    })
    return promise; 
  }
  updateimage(imageurl) {
    var promise = new Promise( (resolve , reject) => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then( () => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoUrl: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then( () => {
          resolve({ success: true });
        }).catch( err => {
          reject(err);
        })
      }).catch( err => {
        reject(err);
      })
    })
    return promise;
  }
}
