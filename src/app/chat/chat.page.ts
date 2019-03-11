import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  private socket: any;
  message: string = '';
  user: any;
  messageObj: any[] = [];

  constructor(private storage: Storage, private route: ActivatedRoute, private http: HttpClient) {
    this.route.parent.params.subscribe(p => this.user = p.username);
    this.initConnection();
   }

  ngOnInit() {
    console.log(this.user);
  }

  initConnection() {
    this.socket = io('http://linguo-socket.herokuapp.com');
    this.socket.on('MESSAGE', (message) => {
      this.storage.get('language').then(r => {
        this.http.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181127T174223Z.98211c5cedaa01f0.b5d2f5f50c59c9f1991aff295d3f3b6ed5b9cdc5&text=${message.message}&lang=${r}`).subscribe((t: any) => {
          this.messageObj.push({
            user: message.user,
            message: t.text[0]
          });
        }, 
        err => {
          console.log(err);
        });
      })
    });
  }

  sendMessage() {
    this.socket.emit('SEND_MESSAGE', {
      user: this.user, 
      message: this.message
    });
  }

}
