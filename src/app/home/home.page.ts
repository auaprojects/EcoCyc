import { take } from 'rxjs/operators';
import { RequestService } from './../request/request.service';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Request } from '../request/request';
import * as _moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  requests: Request[] = [];

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private requestService: RequestService,
    public toastController: ToastController,
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
    this.loadingCtrl.create({ keyboardClose: true, message: 'Fetching data...' }).then(loginEl => {
      loginEl.present();
      this.requestService.requests().pipe(
        take(1)
      ).subscribe(res => {
        // console.log(res)
        this.requests = res.map(x => ({
            addressLine1: x.addressLine1,
            addressLine2: x.addressLine2,
            category: x.category,
            fullname: x.fullname,
            city: x.city,
            createdAt: _moment(x.createdAt).format('Do MMMM, YYYY'),
            description: x.description,
            photoURL: x.photoURL !== undefined ? x.photoURL : '',
            pickupDate: _moment(x.pickupDate).format('Do MMMM, YYYY'),
            pickupTime: x.pickupTime,
            quantity: x.quantity,
            state: x.state,
            status: x.status,
            userId: x.userId,
            uid: x.uid,
            weight: x.weight,
            // eslint-disable-next-line no-underscore-dangle
            _id: x._id,
            // eslint-disable-next-line no-underscore-dangle
            _rev: x._rev,
          }));
        console.log(res);
        loginEl.dismiss();
      }, err => {
        loginEl.dismiss();
        console.log(err);
        this.toastController.create({
          message: `Error while retrieving data!`,
          position: 'middle',
          duration: 3000
        }).then(t => {
          t.present();
        });
      });
    });
  }

  goToDetail(request: Request) {
    const navigationExtras: NavigationExtras = {
      state: request
    };
    // eslint-disable-next-line no-underscore-dangle
    this.router.navigate(['detail', request._id], navigationExtras);
    // this.router.navigate(['detail']);
  }

}
