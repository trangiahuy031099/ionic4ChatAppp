import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';
import { RequestsService } from '../services/requests/requests.service';
import { GroupsService } from '../services/groups/groups.service';
@Component({
  selector: 'app-groupbuddies',
  templateUrl: './groupbuddies.page.html',
  styleUrls: ['./groupbuddies.page.scss'],
})
export class GroupbuddiesPage implements OnInit {
  myfriends = [];
  groupmembers = [];
  searchstring;
  tempmyfriends = [];
  newbuddy;
  constructor(
    public navCtrl: NavController,
    public requestservice: RequestsService,
    public events: Events,
    public groupservice: GroupsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.requestservice.getmyfriends();
    this.events.subscribe('gotintogroup' , () => {
      this.myfriends.splice(this.myfriends.indexOf(this.newbuddy.id) , 1);
      this,this.tempmyfriends = this.myfriends;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      this.groupmembers = this.groupservice.currentgroup;
      for (var key in this.groupmembers)
        for (var friend in this.myfriends) {
          if (this.groupmembers[key].uid === this.myfriends[friend].uid) {
            this.myfriends.splice(this.myfriends.indexOf(this.myfriends[friend]) , 1);
          }
          this.tempmyfriends = this.myfriends
        }
    })
  }

  searchuser(searchbar) {
    let tempfriends = this.tempmyfriends;
    var q = searchbar.target.value;

    if (q.trim() === '') {
      this.myfriends = this.tempmyfriends;
      return;
    }

    tempfriends = tempfriends.filter( (v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
    this.myfriends = tempfriends
  }

  addbuddy(buddy) {
    this.newbuddy = buddy;
    this,this.groupservice.addmember(buddy);
  }

}
