import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule  } from '@angular/forms';
import {DataService} from '../../services/data.service';
import { Router } from "@angular/router";

import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 
})

export class RegisterComponent implements OnInit {
	data = {};
  rForm:FormGroup;
  post:any;


  constructor(private dataservice:DataService,private router: Router,
          private fb: FormBuilder,private toastyService:ToastyService, private toastyConfig:ToastyConfig,private slimLoadingBarService: SlimLoadingBarService) {
          this.rForm = fb.group({
      'fname' : [null, Validators.required],
      'lname' : [null, Validators.required],
      'email' : [null, Validators.required],
      'country' : [null, Validators.required],
      'state' : [null, Validators.required],
      'address' : [null, Validators.required],
      'gender' : [null, Validators.required],
      'password' : [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(500)])],
    });
  }


  ngOnInit() {
  	console.log("ngConstructor.... register");
  	
  }

  formSubmit(){
  	console.log("in form submit")
    var toastOptions:ToastOptions = {
            title: "Wait",
            msg: "Registering the user",
            showClose: true,
            timeout: 2000,
            theme: 'bootstrap',
            
        };
    // this.slimLoadingBarService.start();
    this.toastyService.wait(toastOptions);
  	this.dataservice.registerUser(this.data)
  		.subscribe(
  			result => {
          var user=this.data;
        
          console.log("user data is ");
          console.log(user['email']);
          console.log(result);
          console.log(result.empty);
          
  				if(result.success==1){
  					console.log("user registered");
             var toastOptions:ToastOptions = {
            title: "Success",
            msg: "Redirecting to Verification",
            showClose: true,
            timeout: 9000,
            theme: 'bootstrap',
            
        };
          this.toastyService.success(toastOptions);
        // Add see all possible types in one shot
      //  this.slimLoadingBarService.start();
          
             this.router.navigate(['/verification',{data:user['email']}])
  				}
  				else if(result.error==0){
  					console.log("some error occured registering user");
             var toastOptions:ToastOptions = {
            title: "Error",
            msg: "Cant registers",
            showClose: true,
            timeout: 10000,
            theme: 'bootstrap',
            
        };
         this.toastyService.error(toastOptions);
        
  				}
          else if (result.empty==0){
            console.log("Empty fields");
             var toastOptions:ToastOptions = {
            title: "Error",
            msg: "Empty Fields",
            showClose: true,
            timeout: 10000,
            theme: 'bootstrap',
            
        }  ;
         this.toastyService.error(toastOptions);
          }
  				else if(result.found != 'undefined'){
  					console.log("email already exists");

             var toastOptions:ToastOptions = {
            title: "Info",
            msg: "User already exist",
            showClose: true,
            timeout: 10000,
            theme: 'bootstrap',
            
        };
         this.toastyService.info(toastOptions);
  				}
  			}
  		);
  }

}
