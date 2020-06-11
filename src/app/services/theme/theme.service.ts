import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkmode = false;
  constructor(private plt:Platform) {
    this.plt.ready().then(() =>{
      const prefersDark = window.matchMedia("(prefers-color-scheme:dark)");
      prefersDark.addListener(e =>{
        console.log('matches: ',e);
        this.setAppTheme(e.matches);
      })
    })
   }
   toggleAppTheme(){
     this.darkmode = !this.darkmode;
     this.setAppTheme(this.darkmode)
   }

   setAppTheme(dark){
    this.darkmode = dark;

    if(this.darkmode){
      document.body.classList.add("dark")
    }
    else{
      document.body.classList.remove("dark");
    }
   }
   
}
