import { Component, OnInit } from '@angular/core';
import TaskModel from 'src/app/models/TaskModel';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public tasks: TaskModel[];
    public taskId: number;
    public isDone: boolean = false;

    public constructor(
        private dataService: DataService,
        private notifyService: NotifyService) { }


    public async ngOnInit() {
        try {
            // if()//check the checkbox
            this.tasks = await this.dataService.getAllTasks();
        }
        catch(err: any) {
            this.notifyService.error(err);
        }
    }
    public async deleteTask(taskId: number){
        try {
            const ok = window.confirm("Are you sure?")
            if(!ok) return;
           await this.dataService.deleteTask(taskId);
           const index = this.tasks.findIndex(t => t.taskId === taskId);
            this.tasks.splice(index, 1);
        }
        catch(err: any) {
            this.notifyService.error(err);
        }

    }
    
}
