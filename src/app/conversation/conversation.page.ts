import { AuthService } from './../auth/auth.service';
import { User } from './../auth/user';
import { take } from 'rxjs/operators';
import { MessageService } from './../chat/message.service';
import { LoadingController } from '@ionic/angular';
import { StorageService } from './../shared/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _moment from 'moment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from '../chat/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  receiver;
  message;
  threadNum: string;
  currentUser;
  // receiverUID;
  messages: Message[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private userService: UserService,
    // private messagesService: MessagesService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.storageService.getObject('authData').then((user: any) => {
      if (user === null) {
        this.router.navigate(['/login']);
      } else {
        this.currentUser = user;
      }
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state?.receiver === undefined) {
          const thread = this.router.getCurrentNavigation().extras.state?.thread;
          this.authService.getUsers().subscribe(res => {
            this.receiver = res.find(u => u.email === thread.fullname);
          });
        } else {
          this.receiver = this.router.getCurrentNavigation().extras.state.receiver;
        }

        this.messageService.messages().pipe(
          take(1)
        ).subscribe(messages => {
          this.messages = messages.filter(m => (m.sender === this.currentUser.email || m.receiver === this.currentUser.email)).map(t => {
            if (t.sender === this.currentUser.email) {
              return {
                ...t,
                type: 'sender'
              };
            } else {
              return {
                ...t,
                type: 'receiver'
              };
            }
          });
          if (this.messages.length > 0) {
            this.threadNum = this.messages[0].threadNumber;
          }
          console.log(this.messages);
        });
      } else {
        this.router.navigate(['/chat']);
      }
    });

  }

  // ionViewWillEnter() {
  //   let chatSection = document.getElementById("chat");
  //   chatSection.scrollTop = chatSection.scrollHeight;
  // }

  async sendMessage() {

    if (this.threadNum !== undefined) {
      const msgObj: Message = {
        message: this.message,
        sender: this.currentUser.email,
        receiver: this.receiver.email,
        threadNumber: this.threadNum
      };

      this.messages = [msgObj];
      await this.messageService.newMessage(msgObj).toPromise();
      this.messages = [
        ...this.messages,
        {
          ...msgObj,
          createdAt: _moment().format()
        }
      ];
      this.cdr.detectChanges();

      this.message = '';
      this.router.navigate(['/chat']);
    } else {
      const msgObj: Message = {
        message: this.message,
        sender: this.currentUser.email,
        receiver: this.receiver.email,
        threadNumber: `${this.receiver.email.split('@')[0]}-${this.currentUser.email.split('@')[0]}`
      };

      await this.messageService.newMessage(msgObj).toPromise();
      this.messages = [
        ...this.messages,
        {
          ...msgObj,
          createdAt: _moment().format()
        }
      ];
      this.cdr.detectChanges();

      this.message = '';
      this.router.navigate(['/chat']);
    }
  }

  async eventHandler(event) {
    if (event.keyCode === 13) {
      await this.sendMessage();
    }
  }

}
