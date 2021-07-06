import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your Email' },
      { type: 'pattern', message: 'The Email entered is Incorrect.Try again' }
    ],
    password: [
      { type: 'required', message: 'please Enter your Password!' },
      { type: 'minlength', message: 'The Password must be at least 5 characters or more' }

    ]
  };

  validationFormUser: FormGroup;

  constructor(
    public formbuider: FormBuilder,
    public authservice: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    // private firestore: AngularFirestore,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.validationFormUser = this.formbuider.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }

  async loginUser(value) {
    const loginEl = await this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' });
    loginEl.present();
    try {
      const fbUser = await this.authservice.signIn(this.validationFormUser.get('email').value,
        this.validationFormUser.get('password').value) as any;
      const users = await this.authservice.getUsers().toPromise();
      if (users.length === 0) {
        const alertEl = await this.alertCtrl.create({
          header: 'User doesn\'t exist',
          message: 'This user doesn\'t exist',
          buttons: ['OK']
        });
        alertEl.present();
        loginEl.dismiss();
        return;
      }

      const savedUser = users.find(x => x.uid === fbUser.user.uid);
      if (savedUser) {
        const userData: User = {
          uid: fbUser.user.uid,
          // eslint-disable-next-line no-underscore-dangle
          _id: savedUser._id,
          // eslint-disable-next-line no-underscore-dangle
          _rev: savedUser._rev,
          email: savedUser.email,
          fullname: savedUser.fullname,
          displayName: savedUser.displayName,
          photoURL: savedUser.photoURL,
          emailVerified: savedUser.emailVerified,
          role: savedUser.role
        };
        this.authservice.setUser2Cpx(userData);
        loginEl.dismiss();
        this.router.navigate(['home']);
      } else {
        const alertEl = await this.alertCtrl.create({
          header: 'User doesn\'t exist',
          message: 'This user doesn\'t exist',
          buttons: ['OK']
        });
        alertEl.present();
        loginEl.dismiss();
        return;
      }
      // const resp = await this.authservice.loginFireauth(value);
      // console.log(resp);
    } catch (err) {
      loginEl.dismiss();
      // loginEl.present();
      this.showAlert(err.error);
      console.log(err);
    }
  }

  private showAlert(msg: string) {
    this.alertCtrl.create({
      header: 'Sign In Failed',
      message: msg,
      buttons: ['OK']
    }).then(alertEl => {
      alertEl.present();
    });
  }

}
