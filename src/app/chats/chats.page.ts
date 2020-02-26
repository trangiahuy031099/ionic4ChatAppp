import { Component, OnInit } from '@angular/core';
import { NavController,Events, AlertController } from '@ionic/angular';
import { RequestsService } from '../services/requests/requests.service'
@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
  myrequests;
  myfriends;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public requestservice: RequestsService,
    public alertCtrl: AlertController
    ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests' ,() => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends' , () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends')
  }

  addbuddy() {
    this.navCtrl.navigateForward('/buddies')
  }

  async accept(item) {
    this.requestservice.acceptrequest(item).then( async () => {
      let newalert = await this.alertCtrl.create({
        header: 'Friend added',
        subHeader: 'Tap on the friend to chat with him',
        buttons: ['Okey']
      });
      newalert.present();
    })
    console.log(this.myfriends);
    
  }

  async ignore(item)  {
    this.requestservice.deleterequest(item).then(async () => {
      let alert = await this.alertCtrl.create({
        header: 'Request ignored'
      });
      alert.present();
    })
  }
}
