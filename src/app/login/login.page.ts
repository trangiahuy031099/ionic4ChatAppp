import { Component, OnInit } from '@angular/core';
import { usercreads } from '../models/usercreads'
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {} as usercreads;
  constructor(
    public navCtrl: NavController,
    public authservice: AuthService
  ) { }

  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad loginPage');
  }

  signin() {
    this.authservice.login(this.credentials).then( (res: any) => {
      if(!res.code) {
        this.navCtrl.navigateRoot('/tabs')
      }
      else 
        alert(res);
    });
  }

  passwordreset() {
    this.navCtrl.navigateForward('/passwordreset')
  }
  signup() {
    this.navCtrl.navigateForward('/signup')
  }

}
