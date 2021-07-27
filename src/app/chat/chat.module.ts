import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TimeAgoPipe } from 'time-ago-pipe';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { NewMessageComponent } from './new-message/new-message.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage, NewMessageComponent, TimeAgoPipe],
  exports: [TimeAgoPipe]
})
export class ChatPageModule {}
