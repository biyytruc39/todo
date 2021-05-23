import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/todo.model';
import { DataService } from './../shared/data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  showInvalidMess: boolean = false;

  constructor(private dataService: DataService) { }

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

  editTodo(index: number): void {
    this.dataService.editTodo(index, new Todo('abc'));
  }
}
