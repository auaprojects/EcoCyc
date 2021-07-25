import { AuthService } from './../../auth/auth.service';
import { StorageService } from './../../shared/storage.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent implements OnInit {
  items = [];
  items1 = [];

  searchTerm = '';
  searching: any = false;
  currentUser;

  constructor(
    private modalCtrl: ModalController,
    // private userService: UserService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.getObject('authData').then(user => {
      this.currentUser = user;
    });

    this.loadingCtrl.create({ keyboardClose: true, message: 'Loading Users...' }).then(loadingEl => {
      loadingEl.present();
      this.authService.getUsers().subscribe(res => {
        console.log(res);
        loadingEl.dismiss();
        this.items = res.filter(x => x.email !== this.currentUser.email);
        // res.map(t => {
        //   return {

        //   }
        // })
      });
      // this.userService.getUsers().subscribe(users => {
      //   this.items = users.map((u: any) => {
      //     // return {
      //     //   firstname: u.payload.doc.data().firstname,
      //     //   lastname: u.payload.doc.data().lastname,
      //     //   title: u.payload.doc.data().title,
      //     //   photoURL: u.payload.doc.data().photoURL,
      //     //   email: u.payload.doc.data().email,
      //     //   uid: u.payload.doc.id
      //     // };
      //   }).filter(id => id.uid !== this.currentUser.uid);
      //   loadingEl.dismiss();
      //   this.items1 = this.items;
      // }, err => {
      //   loadingEl.dismiss();
      //   console.log(err);
      // });
    });
  }

  onCancel() {
    // this.modalCtrl.dismiss(null, 'cancel');
    this.modalCtrl.dismiss(null, 'cancel');
  }

  filterItems(searchTerm) {
    this.items = this.items1;
    // console.log(searchTerm.target.value)
    this.items = this.items1.filter(item => {
      // return item.firstname.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1 ||
      //   item.lastname.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1;
    });
  }

  // ionViewDidEnter() {
  //   this.setFilteredItems();
  // }

  goToConversation(item: any) {
    this.modalCtrl.dismiss(null, 'cancel');
    const navigationExtras: NavigationExtras = {
      state: {
        receiver: item
      }
    };

    this.router.navigate(['conversation/', item.uid], navigationExtras);
  }

}
