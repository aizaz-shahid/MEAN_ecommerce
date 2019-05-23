import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from "@angular/router";
import {FacebookLoginService} from '../../services/facebook-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userData: any;
private sub: any;
  check:any;


constructor(private route: ActivatedRoute,private router: Router,public afService: FacebookLoginService) {


  this.check=0;
  var session= localStorage.getItem('userData');
  if(session){
    this.check=1;
  }
  this.session();
}

  ngOnInit() {
   /* this.sub = this.route.params.subscribe(params => {
       console.log("in porgile params");
       var result=JSON.parse(params.userData);
       console.log(result);
       this.userData=result;
       console.log(result.user.photoURL);
     });*/

  }
  session() {
    var storage=localStorage.getItem('userData')
    if (storage) {
      var result=JSON.parse(localStorage.getItem('userData'));
      this.userData = JSON.parse(localStorage.getItem('userData'));
    }
    else {
      console.log("No Data");
      this.router.navigate(['/login']);

    }
  }
   logout() {

    localStorage.setItem('userData', '');
    this.afService.logout();
    this.router.navigate(['/login']);
  }

}

