import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

import {DataService} from './services/data.service';
import { AngularFireModule } from 'angularfire2';
import {FacebookLoginService} from './services/facebook-login.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {ToastyModule} from 'ng2-toasty';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { VerifyComponent } from './components/verify/verify.component';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';



export const firebaseConfig = {
    apiKey: "AIzaSyCkNbjvBMRz5qYV_nQPiTi3MJeblxMVMUk",
    authDomain: "ecommerce-36ba7.firebaseapp.com",
    databaseURL: "https://ecommerce-36ba7.firebaseio.com",
    projectId: "ecommerce-36ba7",
    storageBucket: "",
    messagingSenderId: "966419666269"
  };

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    ProfileComponent,
      ForgetPassComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastyModule.forRoot(),
     SlimLoadingBarModule.forRoot(),
    
    RouterModule.forRoot([
    	{
    		path: '',
    		component: IndexComponent
    	},
    	{
    		path: 'register',
    		component: RegisterComponent
    	},
    	{
    		path: 'login',
    		component: LoginComponent
    	},
        {
            path:'profile',
            component:ProfileComponent
        },
        {
            path:'verification',
            component:VerifyComponent  
        },
        {
            path:'forgetpass',
            component:ForgetPassComponent
        }
        
    ])
  ],

  providers: [DataService,FacebookLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
