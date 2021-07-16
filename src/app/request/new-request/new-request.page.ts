import { RequestService } from './../request.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import * as _moment from 'moment';
import { StorageService } from '../../shared/storage.service';
import { SharedService } from '../../shared/shared.service';
import { Request } from '../request';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit {
  requestForm: FormGroup;
  categorySelected;
  currentNumber = 1;
  currentUser;
  photoHasChanged = false;
  public image: File = null;
  cannotDecrease = false;
  categories: any[] = [
    { key: 1, value: 'Appliances' },
    { key: 2, value: 'Electronics' },
    { key: 3, value: 'Furniture' },
    { key: 4, value: 'Construction & Demolition' }
  ];

  data = '../../../assets/new-request.jpg';

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private storageService: StorageService,
    private router: Router,
    public loadingCtrl: LoadingController,
    private requestService: RequestService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.requestForm = this.fb.group({
      category: ['', Validators.required],
      fullname: ['', Validators.required],
      quantity: [this.currentNumber, Validators.required],
      weight: [''],
      description: [''],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pickupDate: [''],
      pickupTime: [''],
      photoURL: [''],
    });

    this.storageService.getObject('authData').then((user: any) => {
      this.currentUser = user;
    });
  }

  increment() {
    this.currentNumber += 1;
    this.requestForm.patchValue({ quantity: this.currentNumber });
  }

  decrement() {
    if (this.currentNumber === 1) {
      this.cannotDecrease = true;
    } else {
      this.currentNumber -= 1;
      this.requestForm.patchValue({ quantity: this.currentNumber });
    }

  }

  // onImagePicked(event) {

  // }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
      this.photoHasChanged = true;
    }
    this.image = imageFile;
    // this.form.patchValue({ image: imageFile });
  }

  async newRequest() {
    const loginEl = await this.loadingCtrl.create({ keyboardClose: true, message: 'Creation in process...' });
    loginEl.present();

    try {
      console.log(this.currentUser);
      if (this.currentUser === undefined || this.currentUser === null) {
        this.sharedService.showAlert('No Logged', 'Please Login!');
        return this.router.navigate(['/login']);
      }

      if (this.categorySelected === undefined) {
        this.sharedService.showAlert('Category Missing', 'Category is required!');
        return;
      }
      this.requestForm.patchValue({ category: this.categorySelected.value });

      if (!this.requestForm.valid) {
        this.sharedService.showAlert('Required Field Missing', 'Please check all required fields!');
        return;
      }

      if ((this.requestForm.get('pickupDate').value !== undefined) && (this.requestForm.get('pickupDate').value !== '')) {
        if (moment() > moment(this.requestForm.get('pickupDate').value)) {
          this.sharedService.showAlert('Date Error', 'Date selected is passed!');
          return;
        }
      }

      const obj: Request = {
        ...this.requestForm.value,
        uid: this.currentUser.uid,
        // eslint-disable-next-line no-underscore-dangle
        userId: this.currentUser._id,
        status: 'new'
      };

      console.log(this.requestForm.value);
      const tmp = await this.requestService.newRequest(obj).toPromise();
      loginEl.dismiss();
      const toast = await this.toastController.create({
        message: `${obj.fullname} created!`,
        position: 'middle',
        duration: 3000
      });
      await toast.present();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
      loginEl.dismiss();
      this.sharedService.showAlert('Request Creation Error', 'Error while creating your request!. Please try again!');
    }
  }

}
