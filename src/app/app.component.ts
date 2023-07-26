import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gestor de Tareas';

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth,
    private snackBar: MatSnackBar
  ) {}

  lastClickedButton: string = '';

  onLogout() {
    this.userService
      .logOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
    console.log(this.isUserLoggedIn());
  }

  isUserLoggedIn = () => {
    return this.auth.currentUser !== null;
  };

  onMainClick() {
    const isAuthenticated = this.isUserLoggedIn();

    if (!isAuthenticated) {
      this.snackBar.open('Debes iniciar sesión', 'Cerrar', {
        duration: 3000, // Duración en milisegundos del "snackbar"
      });
      this.router.navigate(['/login']);
    }
  }
  onLoginClick() {
    this.lastClickedButton = 'login';
  }
  onRegisterClick() {
    this.lastClickedButton = 'registro';
  }
}
