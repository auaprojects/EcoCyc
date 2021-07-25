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
      // const fbUser = await this.authservice.signIn(this.validationFormUser.get('email').value,
      //   this.validationFormUser.get('password').value) as any;
      const email = this.validationFormUser.get('email').value;
      const password = this.validationFormUser.get('password').value;
      const users = await this.authservice.getUsers().toPromise();
      const tmpUser = users.find(x => (x.email === email && x.password === password));
      if (!tmpUser) {
        const alertEl = await this.alertCtrl.create({
          header: 'User doesn\'t exist',
          message: 'This user doesn\'t exist',
          buttons: ['OK']
        });
        alertEl.present();
        loginEl.dismiss();
        return;
      }

      const userData: User = {
        // eslint-disable-next-line no-underscore-dangle
        _id: tmpUser._id,
        // eslint-disable-next-line no-underscore-dangle
        _rev: tmpUser._rev,
        email: tmpUser.email,
        fullname: tmpUser.fullname,
        photoURL: tmpUser.photoURL,
        role: tmpUser.role
      };
      this.authservice.setUser2Cpx(userData);
      loginEl.dismiss();
      if (userData.role === 'user') {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['home-pro']);
      }

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
