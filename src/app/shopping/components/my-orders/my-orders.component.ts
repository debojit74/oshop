import { switchMap } from 'rxjs/operators';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;
  totalSum = 0;
  constructor(private authService: AuthService, private orderService: OrderService) { }

  async ngOnInit() {
    this.orders$ = await this.authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
  }

}
