import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, IonContent, LoadingController, Events } from '@ionic/angular';
import { GroupsService } from '../services/groups/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImghandlerService } from '../services/imghandler/imghandler.service';
import * as firebase from 'firebase'
@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  @ViewChild('content' , {static: false}) content: IonContent
  owner: boolean = false;
  groupName;
  newmessage;
  allgroupmsgs;
  alignuid;
  photoURL;
  imgornot;
  constructor(
    public navCtrl: NavController,
    public groupservice: GroupsService,
    public actionSheetController: ActionSheetController,
    public route: ActivatedRoute,
    public router: Router,
    public loadingCtrl: LoadingController,
    public imgstore: ImghandlerService,
    public events: Events
  ) { 
    this.groupName = this.route.snapshot.paramMap.get('groupName')
    this.alignuid = firebase.auth().currentUser.uid;
    this.photoURL = firebase.auth().currentUser.photoURL;
    
    this.groupservice.getownership(this.groupName).then( res => {
      if(res) {
        this.owner = true;
      }
    }).catch( err => {
      alert(err);
    })
    this.groupservice.getgroupmsgs(this.groupName);
    this.events.subscribe('newgroupmsg' , () => {
      this.allgroupmsgs = [];
      this.imgornot= [];
      this.allgroupmsgs = this.groupservice.groupmsgs;
      for (var key in this.allgroupmsgs) {
        var d = new Date(this.allgroupmsgs[key].timestamp);
        var hours = d.getHours();
        var minutes = "0" + d.getMinutes();
        var month = d.getMonth();
        var da = d.getDate();
 
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);
 
        this.allgroupmsgs[key].timestamp = formattedTime;
        if (this.allgroupmsgs[key].message.substring(0, 4) === 'http') {
          this.imgornot.push(true);
        }
        else {
          this.imgornot.push(false);
        }
      }
      this.scrollto();
    })
  }

  ngOnInit() {
  }

  async presentOwnerSheet() {
    let actionsheet = await this.actionSheetController.create({
      header: 'Group Actions',
      buttons: [
        {
          text: 'Add member',
          icon: 'person-add',
          handler: () => {
            this.navCtrl.navigateForward('/groupbuddies');
          }
        },
        {
          text:'Remove member',
          icon: 'remove-circle',
          handler: () => {
            this.navCtrl.navigateForward('/groupmember')
          }
        },
        {
          text: 'Group info',
          icon: 'person',
          handler: () => {
            this.navCtrl.navigateForward(['groupinfo' , {groupName: this.groupName}])
          }
        },
        {
          text: 'Delete Group',
          icon: 'trash',
          handler: () => {
            this.groupservice.deletegroup().then( () => {
              this.router.navigateByUrl('/tabs/chats')
            }).catch(err => {
              console.log(err);
              
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    actionsheet.present();
  }

  async presentMemberSheet() {
    let sheet = await this.actionSheetController.create({
      header: 'Group Actions' ,
      buttons: [
        {
          text: 'Leave Group',
          icon: 'log-out',
          handler: () => {
            this.groupservice.leavegroup().then( () => {
              this.router.navigateByUrl('/tabs/chats')
            }).catch( err => {
              console.log(err);
            })
          }
      },
      {
        text: 'Group Info',
        icon: 'person',
        handler: () => {
          this.navCtrl.navigateForward(['groupinfo' , {groupName: this.groupName}])
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        icon: 'backspace',
        handler: () => {
          console.log('Cancelled');
        }
      }
      ]
    })
    sheet.present();
  }

  addgroupmsg() {
    this.groupservice.addgroupmsg(this.newmessage).then( () => {
      this.scrollto();
      this.newmessage = '';
    })
  }

  scrollto() {
    setTimeout( () => {
      this.content.scrollToBottom();
    }, 1000);
  }
  
  async sendpicmsg() {
    let loader = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    loader.present();
    this.imgstore.picmsgstore().then( imgurl => {
      loader.dismiss();
      this.groupservice.addgroupmsg(imgurl).then( () => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch( err => {
      alert(err);
      loader.dismiss();
    })
  }
}
