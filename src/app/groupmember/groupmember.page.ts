import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { GroupsService } from '../services/groups/groups.service';

@Component({
  selector: 'app-groupmember',
  templateUrl: './groupmember.page.html',
  styleUrls: ['./groupmember.page.scss'],
})
export class GroupmemberPage implements OnInit {
  groupmembers;
  tempgroupmembers;
  constructor(
    public navCtrl: NavController,
    public groupservice: GroupsService,
    public events: Events
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.groupmembers = this.groupservice.currentgroup;
    this.tempgroupmembers = this.groupmembers;
    this.events.subscribe('gotintogroup' , () => {
      this,this.groupmembers = this.groupservice.currentgroup;
      this.tempgroupmembers = this.groupmembers;
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe('gotintogroups');
  }

  searchuser(searchbar) {
    let tempmembers = this.tempgroupmembers;

    var q = searchbar.target.value;

    if(q.trim() === '' ) {
      this.groupmembers = this.tempgroupmembers;
      return;
    }

    tempmembers = tempmembers.filter( (v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })

    this.groupmembers = tempmembers;
  }

  removemember(member) {
    this,this.groupservice.deletemember(member);
  }

}
