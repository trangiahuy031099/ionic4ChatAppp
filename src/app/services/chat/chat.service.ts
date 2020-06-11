import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import * as firebase  from 'firebase';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  firebuddychats = firebase.database().ref('/buddychats')
  buddy: any;
  buddymessages = []
  currentgroup: Array<any> = [];
  currentgroupname;
  constructor(
    public events: Events
  ) { }

  initializebuddy(buddy) {
    this.buddy = buddy
  }

  addnewmessage(msg) {
    if(this.buddy) {
      var promise = new Promise( (resolve , reject) => {
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then( () => {
          resolve(true);
        }).catch( err => {
          reject(err);
        })
        this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then( () => {
          resolve(true);
        }).catch( err => {
          reject(err);
        })
      })
      return promise
    }
  }

  getbuddymessages() {
    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value' , (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();      
      for ( var tempkey in temp){
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage')
    })
  }
  getintogroup(groupname) {
    if(groupname != null) {
      this.firebuddychats.child(firebase.auth().currentUser.uid).child(groupname).once('value' , (snapshot) => {
        if(snapshot.val() != null) {
          var temp = snapshot.val().members;
          this.currentgroup = [];
          for (var key in temp) {
            this.currentgroup.push(temp[key]);
          }
          this.currentgroupname = groupname;
          this.events.publish('gotintogroup');
        }
      })
    }
  }
  
}
