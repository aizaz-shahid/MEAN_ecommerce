import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) { 
  	console.log("DataService constructor....");
  }

  registerUser(data){

  	
  	var param = JSON.stringify(data);
    console.log(param);
  	param = '{"data":'+param+'}';
  	console.log(param);
  	var headers = new Headers();
  	headers.append('Content-Type','application/x-www-form--urlencoded');

  	return this.http.post(' https://ecommerce-freelance.herokuapp.com/register',param,{headers:headers})
  	.map(res=>res.json())
    }

    loginUser(data){

      var params=JSON.stringify(data);
      console.log(params);
      var obj='{"data":'+params+'}';
      console.log(obj)
      var headers=new Headers();
      headers.append('Content-Type','application/x-www-form--urlencoded');
      return this.http.post(' https://ecommerce-freelance.herokuapp.com/login',obj,{headers:headers})
    .map(res=>res.json())
    }

    forgetPass(data){
      console.log(data);
      var params=JSON.stringify(data);
      var obj='{"data":'+params+'}';
      console.log(obj)
      var headers=new Headers();
      headers.append('Content-Type','application/x-www-form--urlencoded');
       return this.http.post(' https://ecommerce-freelance.herokuapp.com/forget-password',obj,{headers:headers})
    .map(res=>res.json());
  }
  getCategories(){
   
      var headers=new Headers();
      headers.append('Content-Type','application/x-www-form--urlencoded');
      return this.http.get(' https://ecommerce-freelance.herokuapp.com/get-categories',{headers:headers})
    .map(res=>res.json());
    }
   getSubCategories(data){
     var params='{"category_id":'+data+'}';
      var obj='{"category":'+params+'}';
      console.log(obj);
      var headers=new Headers();
      headers.append('Content-Type','application/x-www-form--urlencoded');
      return this.http.post(' https://ecommerce-freelance.herokuapp.com/get-subcategories',obj,{headers:headers})
    .map(res=>res.json());
    }

}
