import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { connreq } from '../models/usercreads';
import { RequestsService } from '../services/requests/requests.service';
import * as firebase from 'firebase';
import { Button } from 'protractor';
@Component({
  selector: 'app-buddies',
  templateUrl: './buddies.page.html',
  styleUrls: ['./buddies.page.scss'],
})
export class BuddiesPage implements OnInit {
  newrequest = {} as connreq;
  temparr = [];
  fillteredusers = [];
  myrequest;
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public alertCtrl: AlertController,
    public requestsservice: RequestsService
  ) {
    this.userservice.getallusers().then((res: any) => {
      this.fillteredusers = res;
      this.temparr = res;

    })
  }

  ngOnInit() {
    this.myrequest = this.requestsservice.userdetails;
    console.log(this.myrequest)
  }
  async accept(item) {
    this.requestsservice.acceptrequest(item).then(async () => {
      let newalert = await this.alertCtrl.create({
        header: 'Friend added',
        subHeader: 'Tap on the friend to chat with him',
        buttons: ['Okey']
      });
      newalert.present();
    })
  }

  async ignore(item) {
    this.requestsservice.deleterequest(item).then(async () => {
      let alert = await this.alertCtrl.create({
        header: 'Request ignored'
      });
      alert.present();
    })
  }

  searchuser(searchbar) {
    this.fillteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.fillteredusers = this.fillteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }

  async sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient) {
      let alert = await this.alertCtrl.create({
        header: 'You are aldready friend',
        buttons: ['Ok']
      })
      alert.present();
    }
    else {
      let successalert = await this.alertCtrl.create({
        header: 'Request sent',
        subHeader: `Your request was sent to ${recipient.displayName}`,
        buttons: ['Ok']
      });
      this.requestsservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.fillteredusers.indexOf(recipient);
          this.fillteredusers.splice(sentuser, 1);
        }
      }).catch(async (err) => {
        let alert = await this.alertCtrl.create({
          message: `${err}`
        })
        alert.present();
      })
    }
  }



}
