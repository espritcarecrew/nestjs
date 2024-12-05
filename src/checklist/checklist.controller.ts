import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { Checklist } from './checklist.model';

@Controller('checklists')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  getAllChecklists(): Checklist[] {
    return this.checklistService.getAllChecklists();
  }

  @Post()
  createChecklist(@Body('title') title: string, @Body('tasks') tasks: string[]): Checklist {
    return this.checklistService.createChecklist(title, tasks);
  }

  @Put(':checklistId/:taskId')
  updateTaskStatus(
    @Param('checklistId') checklistId: string,
    @Param('taskId') taskId: string,
    @Body('completed') completed: boolean
  ): Checklist {
    return this.checklistService.updateTaskStatus(checklistId, taskId, completed);
  }
}
