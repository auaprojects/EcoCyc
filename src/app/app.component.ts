import { User } from './auth/user';
import { Router } from '@angular/router';
import { StorageService } from './shared/storage.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
// import { Platform } from '@ionic/angular';
// import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public _user = new BehaviorSubject<User>(null);
  currentUser: User;
  private authSub: Subscription;
  private previousAuthState = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public isPro: boolean;

  constructor(
    // private platform: Platform,
    private authService: AuthService,
    private storageService: StorageService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigate(['/login']);
      }
      this.previousAuthState = isAuth;
      if (isAuth) {
        this.storageService.getObject('authData').then((authData: any) => {
          // if (authData?.role === 'user') {
          //   this.isPro = false;
          // }
          // this.isPro = true;
          // eslint-disable-next-line no-underscore-dangle
          this._user.next(authData as User);
        });

      }
    });

    // eslint-disable-next-line no-underscore-dangle
    this.authService._user.subscribe(user => {
      if (user) {
        if (user.role === 'user') {
          this.isPro = false;
        } else {
          this.isPro = true;
        }

        this.currentUser = user;
      }
    });
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     if (Capacitor.isPluginAvailable('SplashScreen')) {
  //       Plugins.SplashScreen.hide();
  //     }
  //   });
  // }

  logout() {
    this.authService.signOut();
  }
}
