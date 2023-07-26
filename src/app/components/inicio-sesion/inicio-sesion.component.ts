import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.userService
      .login(this.loginForm.value)
      .then((response) => {
        console.log(response);
        this.snackBar.open('Login exitoso', 'Cerrar', {
          duration: 3000,
        }), // Duración en milisegundos del "snac
          this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.log(error);

        if (error.code === 'auth/wrong-password') {
          this.snackBar.open('Contraseña incorrecta', 'Cerrar', {
            duration: 3000, // Duración en milisegundos del "snackbar"
          });
        } else if (error.code === 'auth/user-not-found') {
          this.snackBar.open('Usuario incorrecto', 'Cerrar', {
            duration: 3000, // Duración en milisegundos del "snackbar"
          });
        } else if (error.code === 'auth/too-many-requests') {
          this.snackBar.open(
            'Demasiados intentos incorrectos, espere unos minutos o restablezca la contraseña',
            'Cerrar',
            {
              duration: 5000, // Duración en milisegundos del "snackbar"
            }
          );
        }
      });
  }
}
