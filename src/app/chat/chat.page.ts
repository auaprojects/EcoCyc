import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  activeTab: string = 'Chats'

  constructor() { }

  ngOnInit() {
  }

  segmentChange(e){
    this.activeTab = e.target.value;
  }

}
