import { Component, OnInit } from '@angular/core';
import { NavParams , NavController } from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor() { }

  tab1: string = "chats";
  tab2: string = "groups";
  tab3: string = "profile";
  ngOnInit() {
  }

}
