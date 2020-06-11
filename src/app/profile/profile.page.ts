import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController} from '@ionic/angular';
import { ImghandlerService } from '../services/imghandler/imghandler.service';
import { UserService } from '../services/user/user.service';
import * as firebase from 'firebase';
import {ThemeService} from '../services/theme/theme.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  avatar: string;
  displayName: string;
  email:string;
  
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public zone: NgZone,
    public alertCtrl: AlertController,
    public imghanler: ImghandlerService,
    public themeService:ThemeService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.userservice.getuserdetails().then( (res: any) => {
      this.displayName = res.displayName;
      this.zone.run( () => {
        this.avatar = res.photoURL;
      })
    })
  }
  logout() {
    firebase.auth().signOut().then( ( ) =>{
      this.navCtrl.navigateRoot('login');
    })
  }
  toggleDarkMode(){
    this.themeService.toggleAppTheme()
  }
  async editname() {
    let alert = await this.alertCtrl.create({
      header: 'Edit Nickname',
      inputs:[{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Edit',
        handler: data => {
          if(data.nickname) {
            this.userservice.updatedisplayname(data.nickname).then( async (res:any) => {
              if(res.success) {
                let statusalert = await this.alertCtrl.create({
                  header: 'Updated',
                  subHeader: 'Your nickname has been canged successfully',
                  buttons: ['Okey']
                });
                statusalert.present();
                this.zone.run( () => {
                  this.displayName = data.nickname;
                })
              }
              else {
                let statusalert = await this.alertCtrl.create({
                  header: 'Failed',
                  subHeader: 'Your nickname was not changed',
                  buttons: ['Okey']
                });
                statusalert.present();
              }
            })
          }
        }
      }
    ]
    })
    alert.present();
  }

  async editimage() {
    this.imghanler.uploadimage().then( (url:any) => {
      this.userservice.updateimage(url).then( async (res:any) => {
        if(res.success) {
          let statusalert = await this.alertCtrl.create({
            header: 'Updated',
            subHeader: 'Your profile pic has been changed successfully!!!',
            buttons: ['Okey']
          });
          statusalert.present();
          this.zone.run( () => {
            this.avatar = url;
          })
        }
      }).catch( async (err) => {
        let statusalert = await this.alertCtrl.create({
          header: 'Failed',
          subHeader: 'Your profile pic was not changed',
          buttons: ['Okey']
        });
        statusalert.present();
      })
    })
  }
}