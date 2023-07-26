import { Component } from '@angular/core';
import { ModalAddComponent } from 'src/app/components/modal-add/modal-add.component';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import Todo from 'src/app/interfaces/todo.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  rotated!: boolean;
  todos: Todo[] = [];

  constructor(public dialog: MatDialog, private todoService: TodoService) {
    this.todoService.getOrderSubject().subscribe((value) => {
      this.rotated = value;
    });
  }

  changeOrder() {
    //this.rotated = !this.rotated;
    this.todoService.changeOrder();
  }

  ngOnInit(): void {
    //this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodo();
  }

  fetchTodosSpinnerless() {
    this.todoService
      .getTodo()

      .subscribe((todos: Todo[]) => {
        this.todos = todos;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalAddComponent, {
      width: '700px', // Ancho del modal
    });
  }
}
