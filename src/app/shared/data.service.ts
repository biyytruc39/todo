import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [
    new Todo('Task 1', true),
    new Todo('Task 2')
  ];

  constructor() { }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  removeTodo(index: number): Todo[] {
    return this.todos.splice(index, 1);
  }

  editTodo(index: number, editedTodo: Todo): void {
    this.todos[index] = editedTodo;
  }
}
