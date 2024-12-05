// src/todo/todo.controller.ts
import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ToDoService } from './todo.service';
import { ToDo } from './todo.model';

@Controller('todo')
export class ToDoController {
  constructor(private readonly todoService: ToDoService) {}

  @Get()
  getAllToDos(): ToDo[] {
    return this.todoService.getAllToDos();
  }

  @Put(':id')
  updateToDoCompletion(@Param('id') id: number, @Body() body: { completed: number }): ToDo {
    return this.todoService.updateTaskCompletion(id, body.completed);
  }
}
