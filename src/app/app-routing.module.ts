import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';

const routes: Routes = [
  { path: 'app-curso-list', component: CursoListComponent },
  { path: 'app-curso-add', component: CursoAddComponent },
  { path: '', redirectTo: '/app-curso-list', pathMatch: 'full' } // Ruta predeterminada
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
