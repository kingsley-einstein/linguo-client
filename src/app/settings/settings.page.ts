import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  language: any = 'en';
  constructor(private storage: Storage) {
    this.storage.get('language')
    .then(u => {
      if (u) {
        this.language = u;
      }
    });
    this.storage.set('language', this.language)
    .then(u => console.log(u));
   }

  ngOnInit() {
  }

  change() {
    this.storage.set('language', this.language)
    .then(u => console.log(u));
  }

}
