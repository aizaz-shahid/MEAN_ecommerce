import { Injectable } from "@angular/core";
/*import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2/auth';*/

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()

export class FacebookLoginService {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) { 

  this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });

    this.user = this.afAuth.authState;
}

socialLogin(loginProvider) {
  console.log("favebook socilalogin")
  var provider;
  if (loginProvider === 'google') {

    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  else if (loginProvider === 'facebook') {
    console.log("in facebook");
  
     return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  
  }
  
  else if (loginProvider === 'twitter') {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  
  }

 
}

// Logs out the current user
logout() {
 return this.afAuth.auth.signOut();
  }

}


