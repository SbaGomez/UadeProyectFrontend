import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';
import { PerfilListComponent } from './components/perfil-list/perfil-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CursoAddComponent } from './components/curso-add/curso-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CursoListComponent,
    PerfilListComponent,
    CursoAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
