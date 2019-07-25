import { HomeComponent } from './core/components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule } from '@angular/common/http';

import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingModule } from './shopping/shopping.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularRaveModule } from 'angular-rave';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    HttpClientModule,
    AngularRaveModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent, data: { animation: 'products' } },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: ''}
    ]),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }) ,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDTQva9LONiCz9atIkSmFUYTlzMTHYUixU'
    // })
  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
