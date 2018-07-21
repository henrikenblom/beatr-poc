import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        canActivate: [AuthGuard],
        path: 'home', loadChildren: './pages/home/home.module#HomePageModule'
    },
    {
        path: 'login', loadChildren: './pages/google-login/google-login.module#GoogleLoginPageModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
