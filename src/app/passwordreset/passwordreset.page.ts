import { Component, OnInit } from '@angular/core';
import { NavController , NavParams, AlertController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.page.html',
  styleUrls: ['./passwordreset.page.scss'],
})
export class PasswordresetPage implements OnInit {
  email: string;
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public alertCtrl: AlertController
  ) { }
  
  ngOnInit() {
  }

  async reset() {
    this.userservice.passwordreset(this.email).then( async (res:any) => {
      if(res.success) {
        const alert = await this.alertCtrl.create({
          header: 'Email Sent!!',
          message: 'Please follow the instructions in the email to reset your password',
          buttons: ['OK'],
        });
        await alert.present();
      }
      else {
        const alert = await this.alertCtrl.create({
          header: 'Failed',
          buttons: ['OK'],
        });
        alert.present();
      }
    })
  }

  goback() {
    this.navCtrl.navigateBack('/login')
  }
}
