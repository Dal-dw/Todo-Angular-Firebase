import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Todo from '../../interfaces/todo.interface';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css'],
})
export class ModalEditComponent {
  formulario: FormGroup;
  guardandoDatos: boolean = false;

  constructor(
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    public dialogRef: MatDialogRef<ModalEditComponent>
  ) {
    this.formulario = new FormGroup({
      tarea: new FormControl(data.tarea),
      descripcion: new FormControl(data.descripcion),
      importante: new FormControl(data.importante),
      completada: new FormControl(data.completada),
    });
  }

  async onSubmit() {
    this.guardandoDatos = true;

    const formData = this.formulario.value;

    console.log(formData);

    this.data.tarea = formData.tarea;
    this.data.descripcion = formData.descripcion;
    this.data.importante = formData.importante;
    this.data.completada = formData.completada;

    await this.todoService.updateTodo(this.data);

    this.guardandoDatos = false;
    this.dialogRef.close(this.data);
  }
}
