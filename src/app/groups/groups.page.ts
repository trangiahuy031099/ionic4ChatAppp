import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavController, Events, LoadingController, AlertController } from '@ionic/angular'
import { GroupsService } from '../services/groups/groups.service';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  allmygroups;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public groupservice: GroupsService,
    public alertCtrl: AlertController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    let loader = await this.loadingCtrl.create({
      message: 'Getting your groups, Please wait...'
    });
    loader.present();
    this,this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('allmygroups' , () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('allmygroups');
  }

  addgroup() {
    this.navCtrl.navigateForward('newgroup')
  }

  async openchat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.router.navigate(['/groupchat' , { groupName: group.groupName }] )
  }
}
