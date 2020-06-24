import { Component, OnInit, NgZone, Input } from "@angular/core";
import { NavController, Events, AlertController } from "@ionic/angular";
import { RequestsService } from "../services/requests/requests.service";
import { ChatService } from "../services/chat/chat.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  myfriends;
  presence$;

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

  addbuddy() {
    this.navCtrl.navigateForward("/buddies");
  }

  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.navigateForward("/buddychat");
  }
}
