import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {GoogleSigninComponent} from './auth/signin/google-signin/google-signin.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import {UserEditComponent} from './auth/user-edit/user-edit.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ErrorComponent} from './error/error.component';
import {RegistriesComponent} from './registries/registries.component';
import {RegistryEditComponent} from './registries/registry-edit/registry-edit.component';
import {RegistryStartComponent} from './registries/registry-start/registry-start.component';
import {RegistryDetailsComponent} from './registries/registry-details/registry-details.component';
import {AddRegistryItemComponent} from './registries/registry-details/add-registry-item/add-registry-item.component';
import {UserItemListComponent} from './registries/registry-details/user-item-list/user-item-list.component';
import {AdminGuard} from './admin/admin.guard';
import {AddNewItemComponent} from './admin/add-new-item/add-new-item.component';
import {ItemListComponent} from './admin/item-list/item-list.component';
import {AdminComponent} from './admin/admin.component';
import {RegistryShareComponent} from './registries/registry-share/registry-share.component';
import {SharedRegistryDetailsComponent} from './shared-registries/shared-registry-details/shared-registry-details.component';
import {SharedRegistriesComponent} from './shared-registries/shared-registries.component';
import {SharedRegistryStartComponent} from './shared-registries/shared-registry-start/shared-registry-start.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: SharedRegistriesComponent, canActivate: [AuthGuard]},
  {path: 'login/google', component: GoogleSigninComponent},
  {path: 'login/google/success', component: SharedRegistriesComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'user/edit', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'items', component: UserItemListComponent, canActivate: [AuthGuard]},
  {
    path: 'myRegistries', component: RegistriesComponent, children: [
    {path: '', component: RegistryStartComponent},
    {path: 'new', component: RegistryEditComponent},
    {path: ':id', component: RegistryDetailsComponent, pathMatch: 'full'},
    {path: ':id/edit', component: RegistryEditComponent},
    {path: 'addItems/:id', component: AddRegistryItemComponent},
    {path: 'share/:id', component: RegistryShareComponent}
  ], canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent, children: [
    {path: 'addNewItem', component: AddNewItemComponent},
    {path: 'itemList', component: ItemListComponent},
  ], canActivate: [AdminGuard]
  },
  {
    path: 'sharedRegistries', component: SharedRegistriesComponent, children: [
      {path: '', component: SharedRegistryStartComponent},
      {path: ':id', component: SharedRegistryDetailsComponent, pathMatch: 'full'},
    ],canActivate: [AuthGuard]
  },
  // {path: '', redirectTo: '/vehicles', pathMatch: 'full'},
  // {
  //   path: 'vehicles', component: VehiclesComponent, children: [
  //   {path: '', component: VehicleStartComponent},
  //   {path: 'new', component: VehicleEditComponent},
  //   {path: ':id', component: VehicleDetailComponent},
  //   {path: ':id/edit', component: VehicleEditComponent},n
  // ]
  // },
  {path: '**', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
