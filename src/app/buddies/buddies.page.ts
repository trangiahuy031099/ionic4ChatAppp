import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Events } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { connreq } from '../models/usercreads';
import { RequestsService } from '../services/requests/requests.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-buddies',
  templateUrl: './buddies.page.html',
  styleUrls: ['./buddies.page.scss'],
})
export class BuddiesPage implements OnInit {
  newrequest = {} as connreq;
  temparr = [];
  fillteredusers = [];
  myrequests;
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public alertCtrl: AlertController,
    public requestsservice: RequestsService,
    public events: Events,
  ) {
    this.userservice.getallusers().then((res: any) => {
      this.fillteredusers = res;
      this.temparr = res;

    })
  }
  ionViewWillEnter() {
    this.requestsservice.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = this.requestsservice.userdetails;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }
  ngOnInit() {
  }

  accept(item) {
    this.requestsservice.acceptrequest(item).then(async () => {
      let newalert = await this.alertCtrl.create({
        header: 'Friend added',
        subHeader: 'Tap on the friend to chat with him',
        buttons: ['Okey']
      });
      newalert.present();
    })
  }

  ignore(item) {
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
        header: 'You can not add You',
        buttons: ['Ok']
      })
      alert.present();
      return;
    }
    else {
      this.requestsservice.sendrequest(this.newrequest).then( async (res: any) => {
      
          let successalert = await this.alertCtrl.create({
            header: 'Request sent',
            subHeader: `Your request was sent to ${recipient.displayName}`,
            buttons: ['Ok']
          });
          successalert.present();
          let sentuser = this.fillteredusers.indexOf(recipient);
          this.fillteredusers.splice(sentuser, 1);
        
      }).catch(async (err) => {
        let alert = await this.alertCtrl.create({
          message: `${err}`
        })
        alert.present();
      })
    }
  }



}
