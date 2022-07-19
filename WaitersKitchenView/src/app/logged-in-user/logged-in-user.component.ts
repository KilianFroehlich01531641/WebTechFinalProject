import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.css']
})
export class LoggedInUserComponent implements OnInit {
  readonly publicKey = "BBkykpi8HS3uSMbHhoCv0F0zTwQhf02_bUi_wPTTQJsmT8pWmwziXEoX1AHWPf1a6s7qxpqWpFXGJcyKA4kU7OM";
  constructor(private dataBaseService: DataBaseService, private swpush: SwPush) {
    this.pushSubscription();
   }

  ngOnInit(): void {
  }

  public pushSubscription(){
    if(!this.swpush.isEnabled){
      console.log("Notification not enabled");
    }
    this.swpush.requestSubscription({
      serverPublicKey: this.publicKey, 
    }).then(sub=> {
      //console.log(JSON.stringify(sub));
      this.dataBaseService.addSubscription(sub).subscribe(res=>{
        console.log("test", res);
      });
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
