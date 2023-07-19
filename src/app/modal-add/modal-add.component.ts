import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import Todo from '../interfaces/todo.interface';
import { first } from 'rxjs';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css'],
})
export class ModalAddComponent {
  formulario: FormGroup;
  guardandoDatos: boolean = false;
  todos: Todo[];

  constructor(private todoService: TodoService) {
    this.formulario = new FormGroup({
      tarea: new FormControl(),
      descripcion: new FormControl(),
      importante: new FormControl(),
      completada: new FormControl(false),
    });
    this.todos = [
      {
        tarea: 'hola',
        descripcion: 'chau',
        importante: false,
        completada: false,
        uid: '',
      },
    ];
  }

  async onSubmit() {
    this.guardandoDatos = true;
    const formData = this.formulario.value;
    if (formData.importante === null) {
      formData.importante = false;
    }

    console.log(formData);

    await this.todoService.addTodo(formData);

    this.guardandoDatos = false;

    this.formulario.reset();
  }
}
