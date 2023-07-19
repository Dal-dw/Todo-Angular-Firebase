import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'resetpw', component: ResetPwComponent },
  {
    path: 'main',
    component: MainPageComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login'])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
