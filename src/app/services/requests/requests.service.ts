import { Injectable } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { connreq } from '../../models/usercreads';
import { UserService } from '../user/user.service';
import * as firebase from 'firebase'; 
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');
  userdetails;
  myfriends;
  constructor(
    public userservice:UserService,
    public events: Events,
    public alertCtrl: AlertController
  ) { }

  sendrequest(req : connreq) {
    var promise = new Promise( (resolve , reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then( () => {
        resolve( {sucess: true} );
      }).catch( err => {
        reject(err);
      })
    })
    return promise;
  }

  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value' , (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for( var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.userservice.getallusers().then( (res:any) => {
        var allusers = res;
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if(myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
          this.events.publish('gotrequests');
      })
    })
  }

  acceptrequest(buddy) {
    var myfriends= [];
    var promise = new Promise( (resolve , reject) => {
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then( () => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then( () => {
          this.deleterequest(buddy).then( () => {
            resolve(true);
          })
        }).catch( err => {
          reject(err);
        })
      }).catch( err => {
        reject(err);
      })
    });
    return promise
  }
  deleterequest(buddy) {
    var promise = new Promise( (resolve , reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once( 'value' , (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then( () => {
          resolve(true);
        })
      }).then( () => {

      }).catch( err => {
        reject(err)
      })
    });
    return promise
  }

  getmyfriends() {
    let friendsuid = [];
    this,this.firefriends.child(firebase.auth().currentUser.uid).on( 'value' , (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for( var i in allfriends)
        friendsuid.push(allfriends[i].uid);

      this.userservice.getallusers().then( (users: any) => {
        this.myfriends = [];
        for( var j in friendsuid)
          for (var key in users) {
              if (friendsuid[j] === users[key].uid) {
                this.myfriends.push(users[key]);
              }
          }
          this.events.publish('friends');
      }).catch( err => {
        this.alertCtrl.create({
          header: `${err}`
        }).then( a => {
          a.present();
        })
        
      })
    })
  }
}
