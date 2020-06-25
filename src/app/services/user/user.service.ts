import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { resolve } from "url";
@Injectable({
  providedIn: "root",
})
export class UserService {
  firebasedata = firebase.database().ref("/users");
  firefriends = firebase.database().ref("/friends");
  constructor(public afAuth: AngularFireAuth) {}

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth
        .createUserWithEmailAndPassword(newuser.email, newuser.password)
        .then(() => {
          this.afAuth.auth.currentUser
            .updateProfile({
              displayName: newuser.displayName,
              photoURL: "",
            })
            .then(() => {
              this.firebasedata
                .child(this.afAuth.auth.currentUser.uid)
                .set({
                  uid: this.afAuth.auth.currentUser.uid,
                  displayName: newuser.displayName,
                  photoURL:
                    "https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e",
                })
                .then(() => {
                  resolve({ success: true });
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve({ success: true });
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser
        .updateProfile({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoURL: imageurl,
        })
        .then(() => {
          firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .update({
              displayName: this.afAuth.auth.currentUser.displayName,
              photoURL: imageurl,
              uid: firebase.auth().currentUser.uid,
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  getuserdetails() {
    var promise = new Promise((resolve, reject) => {
      this.firebasedata
        .child(firebase.auth().currentUser.uid)
        .once("value", (snapshot) => {
          resolve(snapshot.val());
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }

  updatedisplayname(newname) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.currentUser
        .updateProfile({
          displayName: newname,
          photoURL: this.afAuth.auth.currentUser.photoURL,
        })
        .then(() => {
          this.firebasedata
            .child(firebase.auth().currentUser.uid)
            .update({
              displayName: newname,
              photoURL: this.afAuth.auth.currentUser.photoURL,
              uid: this.afAuth.auth.currentUser.uid,
            })
            .then(() => {
              resolve({ success: true });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
  getallusers() {
    var promise = new Promise((resolve, reject) => {
      this.firebasedata
        .orderByChild("uid")
        .once("value", (snapshot) => {
          let userdata = snapshot.val();

          let temparr = [];
          for (var key in userdata) {
            temparr.push(userdata[key]);
          }
          resolve(temparr);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
  getallfriend() {
    var promise = new Promise((resolve, reject) => {
      this.firebasedata
        .orderByChild("uid")
        .once("value", (snapshot) => {
          let userdata = snapshot.val();
          let userLogin = firebase.auth().currentUser;
          let temparr = [];
  

          for (var key in userdata) {
            if (userLogin.uid !== key) {
              temparr.push(userdata[key]);
            }
          }
          this.firefriends
            .child(firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
              let friend = snapshot.val();
              for (var key in friend) {
                temparr = temparr.filter((data) => {
                  return data.uid !== friend[key].uid;
                });
              }
            });
          resolve(temparr);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
}
