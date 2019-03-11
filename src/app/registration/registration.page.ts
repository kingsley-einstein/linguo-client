import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  
  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController) { 
  }

  ngOnInit() {
  }

  submit() {
    this.http.post('http://linguo-app.herokuapp.com/api/v1/users', {
      email: this.email,
      password: this.password,
      username: this.username
    })
    .subscribe(
      (value: any) => console.log(value),
      err => this.presentAlert(err.name, err.message),
      () => this.presentAlert('Completed', 'Successfully Registered. Navigate to login'));
  }

  presentAlert(header, message) {
    let alert = this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.email = '';
            this.username = '';
            this.password = '';
          },
          role: 'Ok'
        }
      ]
    });
    alert.then((v) => v.present());
  }

}
