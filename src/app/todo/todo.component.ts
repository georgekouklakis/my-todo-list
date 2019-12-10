import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos: Todo[];
  public activeTasks: number;
  public newTodoTitle: string;
  public path: string;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params.status;
      this.getTodos(this.path);
    });
  }

  addTodo() {
    this.todoService
      .add({ title: this.newTodoTitle, isDone: false })
      .subscribe((todos: Todo[]) => {
        this.todos = todos;
        this.newTodoTitle = '';
      });
  }

  getTodos(query = '') {
    return this.todoService.get(query).subscribe(todos => {
      this.todos = todos;
    });
  }

  updateTodo(todo: Todo, newValue: string) {
    todo.title = newValue;
    return this.todoService.update(todo).subscribe(todos => {
      todo.editing = false;
      this.todos = todos;
    });
  }

  destroyTodo(todo: Todo) {
    this.todoService.delete(todo).subscribe(todos => {
      this.todos = todos;
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().subscribe(todos => {
      this.todos = todos;
    });
  }
}
