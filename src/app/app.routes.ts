import { Routes } from '@angular/router';

export const routes: Routes = [
    {path : "", loadChildren : ()=> import('./client/client/client-routing.module').then(c=>c.ClientRoutingModule)},
    {path : "admin" , loadChildren : ()=> import('./admin/admin-routing.module').then(a => a.AdminRoutingModule)},
    
];
