import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { GroupsService } from '../services/groups/groups.service';

@Component({
  selector: 'app-groupinfo',
  templateUrl: './groupinfo.page.html',
  styleUrls: ['./groupinfo.page.scss'],
})
export class GroupinfoPage implements OnInit {
  groupmembers;
  constructor(
    public navCtrl: NavController,
    public groupservice: GroupsService,
    public events: Events
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.groupservice.getownership(this.groupservice.currentgroupname).then(res => {
      if(res) {
        this.groupmembers = this.groupservice.currentgroup;
      }
      else {
        this.groupservice.getgroupmembers();
      }
    })

    this.events.subscribe('gotmembers' , () => {
      this.groupmembers = this.groupservice.currentgroup;
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe('gotmembers');
  }

 

}
