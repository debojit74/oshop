import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; 
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    public userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;    
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() { 
    this.afAuth.auth.signOut();
  }

  get appUser$() {
    return this.user$.pipe(switchMap((user) => {
        if (user) return this.userService.get(user.uid);
        return of(null);
      })
    );
  }
}
