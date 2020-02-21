import { Component, OnInit, NgZone } from '@angular/core';
import { NavController , LoadingController} from '@ionic/angular';
import { ImghandlerService } from '../services/imghandler/imghandler.service';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'app-profilepic-page',
  templateUrl: './profilepic-page.page.html',
  styleUrls: ['./profilepic-page.page.scss'],
})
export class ProfilepicPagePage implements OnInit {
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;
  constructor(
    public navCtrl: NavController,
    public imgservice: ImghandlerService,
    public zone: NgZone,
    public userservice: UserService,
    public loadCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async chooseimage() {
    let loader = await this.loadCtrl.create({
      message: 'Please wait...'
    })
    await loader.present();
    this.imgservice.uploadimage().then( async (uploaderurl: any) => {
      await loader.dismiss();
      this.zone.run( () => {
        this.imgurl = uploaderurl;
        this.moveon = false;
      })
    })
  }

  async updateproceed() {
    let loader = await this.loadCtrl.create({
      message: 'Please wait...'
    });
    await loader.present();
    this.userservice.updateimage(this.imgurl).then( async (res: any) => {
      await loader.dismiss();
      if(res.success) {
        this.navCtrl.navigateRoot('/tabs');
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.navigateRoot('/tabs');
  }

}
