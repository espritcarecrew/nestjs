import { Injectable } from '@nestjs/common';
import { Checklist, Task } from './checklist.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChecklistService {
  private checklists: Checklist[] = [];

  getAllChecklists(): Checklist[] {
    return this.checklists;
  }

  createChecklist(title: string, tasks: string[]): Checklist {
    const newChecklist: Checklist = {
      id: uuidv4(),
      title,
      tasks: tasks.map((taskName) => ({ id: uuidv4(), name: taskName, completed: false })),
      totalTasks: tasks.length,
      completedTasks: 0,
    };

    this.checklists.push(newChecklist);
    return newChecklist;
  }


  updateTaskStatus(checklistId: string, taskId: string, completed: boolean): Checklist {
    const checklist = this.checklists.find((cl) => cl.id === checklistId);
    if (checklist) {
      const task = checklist.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = completed;
        checklist.completedTasks = checklist.tasks.filter((t) => t.completed).length;
      }
    }
    return checklist;
  }
}
