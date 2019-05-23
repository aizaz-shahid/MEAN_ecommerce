import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Router } from "@angular/router";
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
userData: any;     
private sub: any;
  constructor(private route: ActivatedRoute,private router:Router) {

   }

  ngOnInit() {
  	this.sub = this.route.params.subscribe(params => {
       console.log("in porgile params");
        this.userData=params.data;
    
  	});
	}
}
