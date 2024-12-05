import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home.component';
import { AdminComponent } from './shared/admin.component';
import { ErrorComponent } from './shared/error.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch:'full' },
    { path: 'home', component: HomeComponent, title:'Home Page' },
    { path: 'products', children: [
        { path: '', title: 'Product List',
            loadComponent: () =>
            import('./products/product-list/product-list.component')
            .then(r => r.ProductListComponent),
        },
        { path: ':id', component: ProductDetailComponent }
    ]},
    { path: 'contact', title: 'Contact',
            loadComponent: () =>
                import('./shared/contact.component')
                .then(r => r.ContactComponent)
    },
    { path: 'admin', component: AdminComponent, title: 'Administration' },
    { path: '**', component: ErrorComponent }
];
