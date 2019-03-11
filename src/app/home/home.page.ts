import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string = '';
  password: string = '';
  user: any;

  constructor(private router: Router, private http: HttpClient, private storage: Storage) {
  }

  login() {
    this.http.post('http://linguo-app.herokuapp.com/oauth/token?grant_type=client_credentials', {}, {
      headers: new HttpHeaders({
        'Authorization': `Basic ${window.btoa('linguo-admin:linguo-secret')}`
      })
    })
    .subscribe((i: any) => {
      this.storage.set('token', i.access_token).then(u => console.log(u));
      this.http.post(`http://linguo-app.herokuapp.com/api/v1/login?access_token=${i.access_token}`, {
      username: this.username,
      password: this.password
    })
    .subscribe(v => this.user = v,
    err => console.log(err),
    () => this.router.navigate([`main/${this.user.username}`]));
    });
  }

  navigateToReg() {
    this.router.navigate(['registration']);
  }
}
