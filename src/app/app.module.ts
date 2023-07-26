import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CardComponent } from './components/card/card.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormComponent } from './components/form/form.component';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AuthGuardModule } from '@angular/fire/auth-guard';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    InicioSesionComponent,
    MainPageComponent,
    CardComponent,
    FormComponent,
    ModalAddComponent,
    ModalEditComponent,
    ResetPwComponent,
  ],
  imports: [
    BrowserModule,
    MatTooltipModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    AuthGuardModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonToggleModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
