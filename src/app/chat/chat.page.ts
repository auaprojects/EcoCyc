import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  ) { }

  ngOnInit() {
  }

  // segmentChange(e) {
  //   this.activeTab = e.target.value;
  // }

  goToRoom(threadObj: any) {

  }

  async newMessage() {
    const modal = await this.modalCtrl.create({
      component: NewMessageComponent
    });

    await modal.present();
  }

}
