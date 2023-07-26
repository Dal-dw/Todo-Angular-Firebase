import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;

  email: string = '';
  password: string = '';

  registroExitoso = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  emailValidator(control: FormControl): { [key: string]: boolean } | null {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,}$/i;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: true };
  }

  onSubmit() {
    this.registroExitoso = true;
    console.log(this.registroForm.value);
    this.userService
      .register(this.registroForm.value)
      .then((response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
}
