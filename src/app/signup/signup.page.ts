import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController} from '@ionic/angular';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  newuser = {
    email: '',
    password: '',
    displayName: ''
  }
  constructor(
    public navCtrl: NavController,
    public userservice: UserService,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }

  async signup() {
    /* var toaster = this.toastCtrl.create({
      duration: 3000,
      position: "bottom"
    }); */
    if(this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      this.toastCtrl.create({
        duration: 3000,
        message: 'All fields are required dude',
        position: "bottom"
      }).then(toast => {
        toast.present();
      });
    }
    else if (this.newuser.password.length < 7) {
      this.toastCtrl.create({
        duration: 3000,
        position: "bottom",
        message: "Password must be more than 6 characters"
      }).then(toast => {
        toast.present();
      });
    }
    else {
      let loader = await this.loadCtrl.create({
        message: 'Please wait...'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then( (res:any) => {
        loader.dismiss();
        if(res.success) {
          this.navCtrl.navigateForward('/profilepic-page');
        }
        else alert('err' + res);
      })
    }
  }

  goback() {
    this.navCtrl.navigateRoot('/login');
  }

}