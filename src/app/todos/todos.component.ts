import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import { DataService } from './../shared/data.service';
import { EditTodoDialogComponent } from './../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  showInvalidMess: boolean = false;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onTodoSubmit(form: NgForm): void {
    if (!!form.invalid) {
      this.showInvalidMess= true;
    } else {
      this.dataService.addTodo(new Todo(form.value.text));
      this.showInvalidMess= false;
      form.reset();
    }
  }

  setCompleted(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  editTodo(index: number, todo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.dataService.editTodo(index, result);
      }
    });
  }

  removeTodo(index: number): void {
    this.dataService.removeTodo(index);
  } 
}
