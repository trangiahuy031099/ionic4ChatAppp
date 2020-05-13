import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { NavController, Events, AlertController, IonContent, LoadingController } from '@ionic/angular';
import { RequestsService } from '../services/requests/requests.service'
import { ChatService } from '../services/chat/chat.service';
import { ImghandlerService } from '../services/imghandler/imghandler.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-buddychat',
  templateUrl: './buddychat.page.html',
  styleUrls: ['./buddychat.page.scss'],
})
export class BuddychatPage implements OnInit {
  @ViewChild('content', { static: false }) content: IonContent;
  newmessage;
  buddy: any;
  allmessages = [];
  photoURL;
  imgornot;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public requestservice: RequestsService,
    public alertCtrl: AlertController,
    public chatservice: ChatService,
    public zone: NgZone,
    public loadingCtrl: LoadingController,
    public imgstore: ImghandlerService
  ) {
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
        /* for( var key in this.allmessages) {
          if(this.allmessages[key].message.substring(0 , 4) == 'http')
            this.imgornot.push(true);
          else
            this.imgornot.push(false);
        } */
      })
    })
  }
  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  async sendPicMsg() {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch(err => {
      alert(err);
      loader.dismiss();
    })
  }
  ngOnInit() {


  }

}
