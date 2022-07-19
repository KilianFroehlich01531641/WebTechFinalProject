
import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { ItemListComponent } from './kitchen/item-list/item-list.component';
import { MenuItemsComponent } from './kitchen/menu-items/menu-items.component';
import { OrderListComponent } from './kitchen/order-list/order-list.component';
import { LoggedInUserComponent } from './logged-in-user/logged-in-user.component';
import { StartComponent } from './start/start.component';
import { ConsultationsComponent } from './waiter/consultations/consultations.component';
import { ItemsComponent } from './waiter/items/items.component';
import { OrdersComponent } from './waiter/orders/orders.component';
import { WaiterComponent } from './waiter/waiter.component';
import { Role } from 'src/roles';
import { KitchenComponent } from './kitchen/kitchen.component';

export const ROUTES: Routes = [
    {
        path: 'login',
        canActivate: [RoleGuard],
        data: {
            notAuthenticated: true
        },
        component: StartComponent
    },
    {
        path: '',
        canActivate: [RoleGuard],
        data: {
            atLeastOneOfRoles: [Role.Kitchen, Role.Waiter]
        },
        component: LoggedInUserComponent,
        children: [
            {
                path: 'kitchen',
                component: KitchenComponent,
                canActivate: [RoleGuard],
                data: {
                    requiredRoles: [Role.Kitchen]
                },
                children: [
                    { path: 'menuitems', component: MenuItemsComponent },
                    { path: 'orders', component: OrderListComponent },
                    { path: 'items', component: ItemListComponent },
                ]
            },
            {
                path: 'waiter',
                component: WaiterComponent,
                canActivate: [RoleGuard],
                data: {
                    requiredRoles: [Role.Waiter]
                },
                children: [
                    { path: 'orders', component: OrdersComponent },
                    { path: 'consultations', component: ConsultationsComponent },
                    { path: 'items', component: ItemsComponent },
                ]
            },
        ]
    },

]