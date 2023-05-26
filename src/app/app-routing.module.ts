import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { PerfilListComponent } from './components/perfil-list/perfil-list.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilAddComponent } from './components/perfil-add/perfil-add.component';

const routes: Routes = [
  { path: 'app-curso-list', component: CursoListComponent },
  { path: 'app-curso-add', component: CursoAddComponent },
  { path: 'app-perfil-list', component: PerfilListComponent },
  { path: 'app-perfil-add', component: PerfilAddComponent },
  { path: 'app-home', component: HomeComponent },
  { path: '', redirectTo: '/app-home', pathMatch: 'full' } // Ruta predeterminada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
