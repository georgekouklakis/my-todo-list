import { Injectable } from '@angular/core';

let TODOS = [
  { title: 'Fix activeTasks (items left)', isDone: false },
  { title: 'Hide list when there are no tasks', isDone: false },
  { title: 'When adding a task, navigate to all tasks', isDone: false },
  { title: 'Create a pipe that filters the list based on the value of an input field', isDone: false },
  { title: 'Create a new component, navigate to it and pass some data originated from the origin component', isDone: false },
  { title: 'Resolve', isDone: false }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() {}

  get(query = '') {
    return new Promise(resolve => {
      let data;

      if (query === 'completed' || query === 'active') {
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.isDone === isCompleted);
      } else {
        data = TODOS;
      }

      resolve(data);
    });
  }

  add(data) {
    return new Promise(resolve => {
      TODOS.push(data);
      resolve(data);
    });
  }

  put(changed) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].title = changed.title;
      resolve(changed);
    });
  }

  delete(selected) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === selected);
      TODOS.splice(index, 1);
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.isDone);
      resolve(TODOS);
    });
  }
}
