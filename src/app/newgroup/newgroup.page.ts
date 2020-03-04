import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { GroupsService } from '../services/groups/groups.service';
import { ImghandlerService } from '../services/imghandler/imghandler.service'; 
@Component({
  selector: 'app-newgroup',
  templateUrl: './newgroup.page.html',
  styleUrls: ['./newgroup.page.scss'],
})
export class NewgroupPage implements OnInit {
  newgroup = {
    groupName: "GroupName" ,
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
  }
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public groupservice: GroupsService,
    public imghandler: ImghandlerService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async chooseimage() {
    if( this.newgroup.groupName == "GroupName") {
      let namealert = await this.alertCtrl.create({
        buttons: ['okey'],
        message: 'Please enter the groupname first. Thanks'
      });
      namealert.present();
    }
    else {
      let loader = await this.loadingCtrl.create({
        message: 'Loading, please wait...'
      });
      loader.present();
      this.imghandler.grouppicstore(this.newgroup.groupName).then( (res: any) => {
        loader.dismiss();
        if(res)
          this.newgroup.groupPic = res;
      }).catch( err => {
        alert(err);
      })
    }
  }

  creategroup() {
    this.groupservice.addgroup(this.newgroup).then( () => {
      this.navCtrl.pop();
    }).catch( err => {
      alert(JSON.stringify(err));
    })
  }

  async editgroupname() {
    let alert = await this.alertCtrl.create({
      header: 'Edit Group Name',
      inputs: [{
        name: 'groupname',
        placeholder: 'Give a new groupName'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {}
      },
    {
      text: 'Set',
      handler: data => {
        if(data.groupname) {
          this.newgroup.groupName = data.groupname
        }
        else {
          this.newgroup.groupName = 'groupName'
        }
      }
    }
  ]
    });
  alert.present();
  }
}
