import { Component, OnInit, NgZone, Input } from "@angular/core";
import { NavController, Events, AlertController } from "@ionic/angular";
import { RequestsService } from "../services/requests/requests.service";
import { ChatService } from "../services/chat/chat.service";
import * as firebase from 'firebase'
@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  myfriends;
  presence$;
  firebuddychats = firebase.database().ref('/buddychats')

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public requestservice: RequestsService,
    public alertCtrl: AlertController,
    public chatservice: ChatService,
    public requestsservice: RequestsService
  ) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.myfriends = [];

    this.events.subscribe("friends", () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe("friends");
  }
  async deletechat(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Do u want to delete this chat content? <br/> You can recoved it man!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.firebuddychats.child(firebase.auth().currentUser.uid).child(id).remove().then( () => {
              console.log('It done');
            })
          }
        }
      ]
    });

    await alert.present();
    
  }
  addbuddy() {
    this.navCtrl.navigateForward("/buddies");
  }

  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.navigateForward("/buddychat");
  }
}
