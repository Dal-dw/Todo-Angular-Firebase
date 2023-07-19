import { Component } from '@angular/core';
import Todo from 'src/app/interfaces/todo.interface';
import { TodoService } from 'src/app/services/todo.service';
import { ModalEditComponent } from 'src/app/modal-edit/modal-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, first } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  panelOpenState = false;
  checkboxStates: boolean[] = [];
  loadingData = true;
  importanteStates: boolean[] = [];

  orderAsc: boolean;
  orderSubscription: Subscription;

  todos: Todo[];
  todosSubscription: Subscription = new Subscription();

  constructor(private todoService: TodoService, public dialog: MatDialog) {
    this.orderAsc = false;
    this.orderSubscription = this.todoService
      .getOrderSubject()
      .subscribe((value) => {
        this.orderAsc = value;
        this.fetchTodos();
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

  ngOnInit(): void {
    this.todosSubscription = this.todoService
      .getTodo()
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
    this.fetchTodos();
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.todosSubscription.unsubscribe();
  }

  async fetchTodos() {
    this.loadingData = true;

    this.todoService
      .getTodo()
      .pipe(first())
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
        this.checkboxStates = todos.map((todo) => todo.completada);
        this.importanteStates = todos.map((todo) => todo.importante);
        console.log(this.importanteStates);
        this.loadingData = false;
      });
  }

  async fetchTodosSpinnerless() {
    this.todoService
      .getTodo()
      .pipe(first())
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }

  async onClickDelete(todo: Todo) {
    const response = await this.todoService.deleteTodo(todo);
    console.log(response);
  }

  async onCheckboxChange(index: number, todo: Todo) {
    const newCompletado = this.checkboxStates[index];
    todo.completada = newCompletado;
    console.log(this.checkboxStates);

    await this.todoService.updateTodo(todo);
  }

  async onImportanteChange(index: number, todo: Todo) {
    const newImportante = !this.importanteStates[index];
    this.importanteStates[index] = newImportante;
    console.log(this.importanteStates);

    todo.importante = newImportante;

    await this.todoService.updateTodo(todo);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '700px', // Ancho del modal
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  onClickEdit(index: number, todo: Todo) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '700px',
      data: todo,
    });
    console.log(todo);
  }
}
