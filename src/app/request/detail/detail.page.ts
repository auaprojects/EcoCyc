import { StorageService } from './../../shared/storage.service';
import { User } from './../../auth/user';
import { take, switchMap } from 'rxjs/operators';
import { AuthService } from './../../auth/auth.service';
import { RequestService } from './../request.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as _moment from 'moment';
import { Request } from '../request';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string;
  currentRequest: Request;
  currentUser: User;
  connectedUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private storageService: StorageService,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    // if (this.router.getCurrentNavigation() === null) {
    //   this.router.navigate(['/home']);
    // }
    this.storageService.getObject('authData').then((user: any) => {
      this.connectedUser = user;
    });

    this.loadingCtrl.create({ keyboardClose: true, message: 'Loading request details...' }).then(loadingEl => {
      loadingEl.present();
      const currentId = this.activatedRoute.snapshot.paramMap.get('id');
      // console.log(currentId);
      // this.requestService.getRequestById(currentId).subscribe(res => {
      //   console.log(res);
      // });
      this.requestService.getRequestById(currentId).pipe(
        take(1),
        switchMap(res => {
          console.log(res);
          this.currentRequest = {
            addressLine1: res.addressLine1,
            addressLine2: res.addressLine2,
            category: res.category,
            fullname: res.fullname,
            city: res.city,
            createdAt: _moment(res.createdAt).format('Do MMMM, YYYY'),
            description: res.description,
            photoURL: res.photoURL !== undefined ? res.photoURL : '',
            pickupDate: _moment(res.pickupDate).format('Do MMMM, YYYY'),
            pickupTime: _moment(res.pickupTime).format('hh:mm A'),
            quantity: res.quantity,
            state: res.state,
            status: res.status,
            userId: res.userId,
            uid: res.uid,
            weight: res.weight,
            // eslint-disable-next-line no-underscore-dangle
            _id: res._id,
            // eslint-disable-next-line no-underscore-dangle
            _rev: res._rev,
          };

          return this.authService.getUserById(res.userId);
        })
      ).subscribe(user => {
        loadingEl.dismiss();
        this.currentUser = user;
        console.log(user);
      });
    });
  }

}
