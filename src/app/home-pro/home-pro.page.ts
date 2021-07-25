import { take } from 'rxjs/operators';
import { User } from './../auth/user';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from './../shared/storage.service';
import { RequestService } from './../request/request.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Request } from '../request/request';
import * as _moment from 'moment';

@Component({
  selector: 'app-home-pro',
  templateUrl: './home-pro.page.html',
  styleUrls: ['./home-pro.page.scss'],
})
export class HomeProPage implements OnInit {
  requests: Request[] = [];
  currentUser: User;

  constructor(
    private loadingCtrl: LoadingController,
    private requestService: RequestService,
    public toastController: ToastController,
    public storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.storageService.getObject('authData').then((user: any) => {
      this.currentUser = user;
      this.requestService.requestSubject.subscribe(x => {
        if (x !== null) {
          // eslint-disable-next-line no-underscore-dangle
          // if (x.userId === this.currentUser._id) {
            // eslint-disable-next-line no-underscore-dangle
            const tmp = this.requests.find(r => r._id === x._id);
            if (tmp) {
              // eslint-disable-next-line no-underscore-dangle
              const index = this.requests.findIndex(r => r._id === x._id);
              this.requests[index] = {
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
              };
            } else {
              this.requests.push({
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
              });
            // }
          }
        }
      });
    });

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
          weight: x.weight,
          // eslint-disable-next-line no-underscore-dangle
          _id: x._id,
          // eslint-disable-next-line no-underscore-dangle
          _rev: x._rev,
          // eslint-disable-next-line no-underscore-dangle
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
