import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  photoHasChanged = false;
  public image: File = null;
  categories: any[] = [
    { key: 'brown', value: 'Brown' },
    { key: 'blonde', value: 'Blonde' },
    { key: 'black', value: 'Black' },
    { key: 'red', value: 'Red' }
  ];

  data = '../../../assets/new-request.jpg';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.requestForm = this.fb.group({
      category: ['', Validators.required],
      fullname: ['', Validators.required],
      quantity: [this.currentNumber, Validators.required],
      weight: [''],
      description: [''],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pickupDate: [''],
      pickupTime: [''],
      photoURL: [''],
    });
  }

  increment() {
    this.currentNumber++;
    this.requestForm.patchValue({ quantity: this.currentNumber++ });
  }

  decrement() {
    this.currentNumber--;
    this.requestForm.patchValue({ quantity: this.currentNumber-- });
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

}
