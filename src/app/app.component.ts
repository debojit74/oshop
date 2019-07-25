import { UserService } from './shared/services/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';
import { slideInAnimation } from './animation';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationStart } from "@angular/router";
import { HostListener } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  //browser = "";

  constructor(private userService: UserService, private auth: AuthService, private router: Router, private location: PlatformLocation) {
    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

    // this.router.events
    //   .pipe(
    //     filter(
    //       (event: NavigationEvent) => {
    //         return (event instanceof NavigationStart);
    //       }
    //     )
    //   )
    //   .subscribe(
    //     (event: NavigationStart) => {
    //       console.group("NavigationStart Event");
    //       console.log("navigation id:", event.id);
    //       console.log("route:", event.url);
    //       console.log("trigger:", event.navigationTrigger);
    //       if (event.restoredState) {
    //         console.warn(
    //           "restoring navigation id:",
    //           event.restoredState.navigationId
    //         );
    //         this.browser = event.url;
    //       }
    //       console.groupEnd();
    //     }
    // );

  }
  prepareRoute(outlet: RouterOutlet) {
  //  console.log("Data: " + this.browser)
  //   if(this.browser == "/"){
  //     outlet.activatedRouteData['browser'] = "browserproduct";
  //     console.log("Browser: " + outlet.activatedRouteData['browser']);
  //     return outlet.activatedRouteData['browser'];
  //   }
  //   console.log("Animation: " + outlet.activatedRouteData['animation']);
    return outlet.activatedRouteData['animation'];
  }
}

