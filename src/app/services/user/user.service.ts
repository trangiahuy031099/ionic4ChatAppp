import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { resolve } from 'url';
import { first } from 'rxjs/operators'
import {auth} from 'firebase/app'
import { from } from 'rxjs';
interface user {
	displayName: string,
	uid: string
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user:user
  firebasedata = firebase.database().ref('chatuser');
  constructor(public afAuth: AngularFireAuth) { }

  adduser(newuser) {
    var promise = new Promise( (resolve , reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(newuser.username , newuser.password).then( () => {
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

  getuserdetails() {
    var promise = new Promise( (resolve , reject) => {
      this.firebasedata.child(firebase.auth().currentUser.uid).once('value' , (snapshot) => {
        resolve(snapshot.val());
      }).catch( err => {
        reject(err);
      });
    });
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise( (resolve, reject) => {
      this.afAuth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afAuth.auth.currentUser.photoURL
      }).then ( () => {
        this.firebasedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afAuth.auth.currentUser.photoURL,
          uid: this.afAuth.auth.currentUser.uid
        }).then( () => {
          resolve({ success: true});
        }).catch( err => {
          reject(err);
        })
      }).catch( err => {
        reject(err);
      })
    })
    return promise;
  }

  getallusers() {
    var promise = new Promise( (resolve, reject) => {
      this.firebasedata.orderByChild('uid').once('value' , (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch(err => {
        reject(err);
      });
    });
    return promise;
  }
  setUser(user: user) {
		this.user = user
	}

	getUsername(): string {
		return this.user.displayName
	}

	reAuth(displayName: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(displayName + '@codedamn.com', password))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail + '@codedamn.com');
	}
  async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise();

		if(user) {
			this.setUser({
				displayName: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
	}
	

	getUID(): string {
		return this.user.uid;
	}
}
