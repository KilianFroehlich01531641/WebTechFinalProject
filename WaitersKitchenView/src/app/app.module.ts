import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBaseService } from './services/data-base.service';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { MenuItemsComponent } from './kitchen/menu-items/menu-items.component';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryCheckListComponent } from './kitchen/category-check-list/category-check-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WaiterComponent } from './waiter/waiter.component';
import { OrdersComponent } from './waiter/orders/orders.component';
import { SingleOrderComponent } from './waiter/single-order/single-order.component';
import { OrderListComponent } from './kitchen/order-list/order-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ItemListComponent } from './kitchen/item-list/item-list.component';
import { CommentComponent } from './kitchen/comment/comment.component';
import { OrderListItemComponent } from './kitchen/order-list-item/order-list-item.component';
import { ConsultationsComponent } from './waiter/consultations/consultations.component';
import { ItemsComponent } from './waiter/items/items.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { KitchenToolbarComponent } from './kitchen/kitchen-toolbar/kitchen-toolbar.component';
import { WaiterToolbarComponent } from './waiter/waiter-toolbar/waiter-toolbar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { LoggedInUserComponent } from './logged-in-user/logged-in-user.component';
import { StartComponent } from './start/start.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JwtInterceptor } from './jwt.interceptor';
import { KitchenComponent } from './kitchen/kitchen.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuItemsComponent,
    CategoryCheckListComponent,
    WaiterComponent,
    OrdersComponent,
    SingleOrderComponent,
    OrderListComponent,
    ItemListComponent,
    CommentComponent,
    OrderListItemComponent,
    ConsultationsComponent,
    ItemsComponent,
    KitchenToolbarComponent,
    WaiterToolbarComponent,
    ToolbarComponent,
    LoginDialogComponent,
    LoggedInUserComponent,
    StartComponent,
    KitchenComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule, //@angular/material
    AppRoutingModule, //setup router setting
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule,
    DragDropModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    DataBaseService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
