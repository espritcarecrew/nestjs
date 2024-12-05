export class Task {
    id: string;
    name: string;
    completed: boolean;
  }
  
  export class Checklist {
    id: string;
    title: string;
    tasks: Task[];
    totalTasks: number;
    completedTasks: number;
  }
  