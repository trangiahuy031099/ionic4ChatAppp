import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath  } from '@ionic-native/file-path/ngx';
import { ImghandlerService } from './services/imghandler/imghandler.service';
import { UserService } from './services/user/user.service';
import {IonicStorageModule} from '@ionic/storage'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpModule,
    AngularFireAuthModule,
    IonicStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileChooser,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: File , useClass: ImghandlerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
