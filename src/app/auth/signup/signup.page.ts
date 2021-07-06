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
    try {
      if (form.valid) {
        const loginEl = await this.loadingCtrl.create({ keyboardClose: true, message: 'Signing Up...' });
        loginEl.present();
        const tmp = {
          fullname: this.user.fullname,
          password: this.user.password,
          phone: this.user.phone,
          email: this.user.email
        };

        const res = await this.authService.singUp(tmp).toPromise();
        const idObj = await this.authService.setUserData(res).toPromise();
        if (idObj.ok) {
          const userData = {
            ...tmp,
            _id: idObj.id,
            // eslint-disable-next-line no-underscore-dangle
            _rev: idObj.rev
          };

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

        // const fbUser = await this.authService.signIn(this.user.email, this.user.password) as any;
        // console.log(fbUser);
        // const savedUser = await this.authService.getUserById(fbUser.user.uid).toPromise();

        // this.loadingCtrl.create({ keyboardClose: true, message: 'Signing Up...' }).then(registerEl => {
        //   registerEl.present();
        //   const tmp = {
        //     fullname: this.user.fullname,
        //     password: this.user.password,
        //     phone: this.user.phone,
        //     email: this.user.email
        //   };

        //   this.authService.singUp(tmp).subscribe(() => {
        //     registerEl.dismiss();
        //     this.authService.SendVerificationMail();
        //     this.router.navigate(['verify-email']);
        //   }, error => {
        //     registerEl.dismiss();
        //     this.showAlert(error);
        //   });
        // });
      } else {
        this.showAlert('This form is not valid!!');
      }
    } catch (err) {
      this.showAlert(err.error);
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
