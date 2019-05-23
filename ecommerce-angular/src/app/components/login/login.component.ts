import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule  } from '@angular/forms';
import {DataService} from '../../services/data.service';
import {FacebookLoginService} from '../../services/facebook-login.service';
import { Router } from "@angular/router";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  data = {};
  rForm:FormGroup;
  post:any;
  // public isLoggedIn: boolean;
   public user : string;



  constructor(private dataservice:DataService,
          private fb: FormBuilder,public afService: FacebookLoginService, private router: Router,private toastyService:ToastyService, private toastyConfig: ToastyConfig,private slimLoadingBarService: SlimLoadingBarService) {
  				this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });

    console.log("check status");
    if(localStorage.getItem('userData')){
          this.router.navigate(['/profile']); // redirecting to home page
    }

     /* (auth) => {
        if (auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;  //login fail
           // redirecting to login page
        }
        else {
          console.log("Successfully Logged in.");
          this. isLoggedIn = true; //login success
          //storing userData value in bower location storage.
          localStorage.setItem('userData', JSON.stringify(auth.auth));
          this.router.navigate(['profile']); // redirecting to home page
        }*/
      /*}*/

  }

  ngOnInit() {
  }

  login(){

     var toastOptions:ToastOptions = {
            title: "Wait",
            msg: "Matching Credentials",
            showClose: true,
            timeout: 2000,
            theme: 'bootstrap',

        };
    this.toastyService.wait(toastOptions);
  	this.dataservice.loginUser(this.data).subscribe(
  		result=>{
       //this.toastyService.clearAll();

       			console.log(result);
  			if(result.status==true){
           this.slimLoadingBarService.start();
          var toastOptions:ToastOptions = {
            title: "Success",
            msg: "Redirecting to Profile",
            showClose: true,
            timeout: 9000,
            theme: 'bootstrap',

        };

        localStorage.setItem('userData', JSON.stringify(result.userData));
        // Add see all possible types in one shot
            this.toastyService.success(toastOptions);
  				  console.log("stauts true");
            this.slimLoadingBarService.complete();
            this.router.navigate(['/profile']);

  			}
  			else if(result.status==false){
          console.log("in the false")
           var toastOptions:ToastOptions = {
            title: "Error",
            msg: "Wrong Credentials",
            showClose: true,
            timeout: 9000,
            theme: 'bootstrap',

        };
         this.toastyService.error(toastOptions);

  					console.log("stauts false");

  			}
        else if(result.verified==0){
              var toastOptions:ToastOptions = {
            title: "Info",
            msg: "Please Verify First",
            showClose: true,
            timeout: 9000,
            theme: 'bootstrap',

        };
         this.toastyService.info(toastOptions);

          //alert("Please register YOur account");
        }


  		}

  	);
  }


  socialLogin(loginProvider) {
     this.slimLoadingBarService.start();
    console.log("logun social login");
    console.log(loginProvider)
    this.afService.socialLogin(loginProvider).then((data) => {
      console.log("in social login");
      console.log(data);
      localStorage.setItem('userData', JSON.stringify(data));

      /*this.router.navigate(['/profile',{userData:JSON.stringify(data)}]);*/
      this.router.navigate(['/profile']);
    }).catch((data)=>{
        console.log(data);
        console.log("in catch");
    });
  }


}
