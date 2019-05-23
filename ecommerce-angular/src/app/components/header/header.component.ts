import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit {
userData: any;
subcat:any;
keysub:string[];
check:any;

 keys: String[];

  constructor(private dataservice:DataService,private router: Router) {
  this.check=0;
   var session= localStorage.getItem('userData');
    if(session){
      this.check=1;
    }
  		this.getCategory();
  }

  ngOnInit() {
  }
  getCategory(){
  	this.dataservice.getCategories().subscribe(
  		result=>{
  			console.log("get categories");
  				if(result.status==true){
  					this.userData=result.categories;
  					this.keys=Object.keys(this.userData	);
  					console.log(this.userData);
  				}
  				else{
  					console.log("false");
  				}


  		});

  }

  sub(data){
  	console.log("in sub");
  	console.log(data);
  	this.dataservice.getSubCategories(data).subscribe(
  		result=>{
  			console.log("sub cate");
  			if(result.status==true){
  				console.log(result.subcategories)
  				this.subcat=result.subcategories;
  				this.keysub=Object.keys(this.subcat);

  			}


  	});
  }

}
