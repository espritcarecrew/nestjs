// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { ToDo } from './todo.model';

@Injectable()
export class ToDoService {
  private todos: ToDo[] = [
    { id: 1, title: 'My pregnancy test is positive! What do I do now?', subtitle: '0 of 8 completed', completed: 0, total: 8 },
    { id: 2, title: 'Preparing for childbirth', subtitle: '0 of 6 completed', completed: 0, total: 6 },
    { id: 3, title: 'Baby clothes', subtitle: '0 of 10 completed', completed: 0, total: 10 },
    { id: 4, title: 'The hospital bag for the baby', subtitle: '0 of 9 completed', completed: 0, total: 9 },
    { id: 5, title: 'The hospital bag for mom', subtitle: '0 of 12 completed', completed: 0, total: 12 },
  ];

  getAllToDos(): ToDo[] {
    return this.todos;
  }

  updateTaskCompletion(id: number, completed: number): ToDo {
    const task = this.todos.find(todo => todo.id === id);
    if (task) {
      task.completed = completed;
      task.subtitle = `${completed} of ${task.total} completed`;
    }
    return task;
  }
}
