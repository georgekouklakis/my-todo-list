import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

let todoList: Todo[] = [
  { title: 'First task', isDone: false },
  { title: 'Second task', isDone: false },
  { title: 'Third task', isDone: false },
  { title: 'Forth task', isDone: false },
  { title: 'Fifth task', isDone: false }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {}

  get(query = '') {
    return new Observable<Todo[]>(observer => {
      let data: Todo[];

      if (query === 'completed' || query === 'active') {
        const isCompleted = query === 'completed';
        data = todoList.filter(todo => todo.isDone === isCompleted);
      } else {
        data = todoList;
      }

      observer.next(data);
    });
  }

  add(data: Todo) {
    return new Observable<Todo[]>(observer => {
      todoList.push(data);
      observer.next(todoList);
    });
  }

  update(changed: Todo) {
    return new Observable<Todo[]>(observer => {
      const index = todoList.findIndex(todo => todo === changed);
      todoList[index].title = changed.title;
      observer.next(todoList);
    });
  }

  delete(selected: Todo) {
    return new Observable<Todo[]>(observer => {
      const index = todoList.findIndex(todo => todo === selected);
      todoList.splice(index, 1);
      observer.next(todoList);
    });
  }

  deleteCompleted() {
    return new Observable<Todo[]>(observer => {
      todoList = todoList.filter(todo => !todo.isDone);
      observer.next(todoList);
    });
  }
}
