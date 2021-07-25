import { User } from './../user';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
// import * as config from '../../../config.json';
import * as config from '../config.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: any;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = {
      fullname: '',
      password: '',
      phone: '',
      email: '',
    };
  }

  async onSignup(form: NgForm) {
    const loginEl = await this.loadingCtrl.create({ keyboardClose: true, message: 'Signing Up...' });
    loginEl.present();
    try {
      if (form.valid) {
        const tmp: User = {
          fullname: this.user.fullname,
          password: this.user.password,
          phone: this.user.phone,
          role: 'user',
          photoURL: '',
          email: this.user.email
        };

        const users = await this.authService.getUsers().toPromise();
        const currentUser = users.find((x => x.email === tmp.email) || (x => x.fullname === tmp.fullname));
        // console.log(users);
        // console.log(currentUser);
        if (currentUser) {
          const alertEl = await this.alertCtrl.create({
            header: 'Sign Up Failed',
            message: 'The user already exist!',
            buttons: ['OK']
          });
          alertEl.present();
          loginEl.dismiss();
          return;
        }

        const res = await this.authService.singUp(tmp).toPromise();
        // const idObj = await this.authService.setUserData(res).toPromise();
        if (res.ok) {
          const userData = {
            ...tmp,
            _id: res.id,
            // eslint-disable-next-line no-underscore-dangle
            _rev: res.rev
          };

          // eslint-disable-next-line no-underscore-dangle
          this.authService._user.next(userData);
          this.authService.setUser2Cpx(userData);
          loginEl.dismiss();
          this.router.navigate(['home']);
        } else {
          const alertEl = await this.alertCtrl.create({
            header: 'Sign Up Failed',
            message: 'The sign up procces has failed',
            buttons: ['OK']
          });
          alertEl.present();
          loginEl.dismiss();
          return;
        }

      } else {
        this.showAlert('This form is not valid!!');
      }
    } catch (err) {
      loginEl.dismiss();
      this.showAlert(err.message);
    }

  }

  private showAlert(msg: string) {
    this.alertCtrl.create({
      header: 'Sign Up Failed',
      message: msg,
      buttons: ['OK']
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
