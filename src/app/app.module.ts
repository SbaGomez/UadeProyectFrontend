import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { PerfilListComponent } from './components/perfil-list/perfil-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PerfilAddComponent } from './components/perfil-add/perfil-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CursoListComponent,
    PerfilListComponent,
    CursoAddComponent,
    HomeComponent,
    PerfilAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
