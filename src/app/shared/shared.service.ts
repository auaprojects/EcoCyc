import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private alertCtrl: AlertController) { }

  showAlert(title: string, msg: string) {
    this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    }).then(alertEl => {
      alertEl.present();
    });
  }
}
