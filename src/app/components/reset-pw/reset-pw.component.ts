import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { getAuth, sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.css'],
})
export class ResetPwComponent {
  pwResetForm: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.pwResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    const emailControl = this.pwResetForm.get('email');
    const email: string | null = emailControl ? emailControl.value : null;
    if (email) {
      console.log(email);
      this.userService
        .resetPw(email)
        .then((response) => {
          console.log(response);
          this.snackBar.open(
            'Te enviamos un mail para cambiar tu contraseña',
            'Cerrar',
            {
              duration: 3000,
            }
          ), // Duración en milisegundos del "snac
            this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.log(error.code);

          if (error.code === 'auth/user-not-found') {
            this.snackBar.open('Usuario inexistente', 'Cerrar', {
              duration: 3000, // Duración en milisegundos del "snackbar"
            });
          } else if (error.code === 'auth/too-many-requests') {
            this.snackBar.open(
              'Demasiados intentos incorrectos, esperá unos minutos y volvé a intentar',
              'Cerrar',
              {
                duration: 5000, // Duración en milisegundos del "snackbar"
              }
            );
          }
        });
    }
  }

  onSubmit() {
    this.resetPassword();
  }
}
