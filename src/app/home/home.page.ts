import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.loadingCtrl.create({ keyboardClose: true, message: 'Logging in...' }).then(loadingEl => {
    //   loadingEl.present();
    //   this.authService.getUsers().subscribe(res => {
    //     console.log(res);
    //     loadingEl.dismiss();
    //   }, err => {
    //     console.log(err);
    //     loadingEl.dismiss();
    //   });
    // });

  }

  goToDetail() {
    // this.router.navigate(['detail', id]);
    this.router.navigate(['detail']);
  }

}
