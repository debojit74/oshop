import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  collapsed = true;

  constructor(private router : Router, private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  async ngOnInit() { 
    this.auth.appUser$.subscribe((appUser: any) => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
