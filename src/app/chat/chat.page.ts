import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from './../shared/storage.service';
import { MessageService } from './message.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  // activeTab: string = 'Chats';
  threads = [];
  currentUser;

  constructor(
    private modalCtrl: ModalController,
    private messageService: MessageService,
    private storageService: StorageService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.storageService.getObject('authData').then((user: any) => {
      if (user === null) {
        this.router.navigate(['/login']);
      } else {
        this.currentUser = user;
      }
    });

    this.loadingCtrl.create({ keyboardClose: true, message: 'Loading Messages...' }).then(loadingEl => {
      loadingEl.present();
      this.messageService.messages().subscribe(messages => {
        if (messages.length > 0) {
          const tmpThreads = [...new Set(messages.map(item => item.threadNumber))];
          tmpThreads.forEach(elt => {
            this.threads.push({
              fullname: messages.find(m => m.threadNumber === elt).receiver,
              messages: messages.filter(m => m.threadNumber === elt)
            });
            // console.log(tmp);
          });
          loadingEl.dismiss();
        }
      });
    });
  }

  // segmentChange(e) {
  //   this.activeTab = e.target.value;
  // }

  goToRoom(threadObj: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        thread: threadObj
      }
    };
    this.router.navigate(['/conversation'], navigationExtras);
  }

  async newMessage() {
    const modal = await this.modalCtrl.create({
      component: NewMessageComponent
    });

    await modal.present();
  }

}
