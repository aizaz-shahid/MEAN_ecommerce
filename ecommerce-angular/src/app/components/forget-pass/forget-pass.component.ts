import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule  } from '@angular/forms';
import {DataService} from '../../services/data.service';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
data = {};
  rForm:FormGroup;
  post:any;
  constructor(private dataservice:DataService,
          private fb: FormBuilder,private toastyService:ToastyService, private toastyConfig: ToastyConfig) {
  	 		 this.rForm = fb.group({
			  'email' : [null, Validators.required],
			
			});
       }

  ngOnInit() {
  }
  forgetPass(){
  	var toastOptions:ToastOptions = {
            title: "Wait",
            msg: "Sending Mail",
            showClose: true,
            timeout: 2000,
            theme: 'bootstrap',
        };
        
   	 this.toastyService.wait(toastOptions);        
  	 this.dataservice.forgetPass(this.data).subscribe(
  			result=>{
  					this.data='';
  					if(result.status==true){
  						console.log("mail sent");
  						 var toastOptions:ToastOptions = {
           				 title: "Success",
           				 msg: "Check Your Email to Proceed",
            			 showClose: true,
           				 timeout: 13000,
                         theme: 'bootstrap',
         				};
            			this.toastyService.success(toastOptions);
  						
  					}
  					else if (result.status==false){

  							console.log("mail not sent");
  						console.log(result);
              	var toastOptions:ToastOptions = {
           					 title: "Eroor",
           					 msg: "Error,Please try agian",
            				showClose: true,
           				 	timeout: 9000,
                         	theme: 'bootstrap',
         					};
            				this.toastyService.error(toastOptions);
  					}


  			});


  }

}
