import { Component, OnInit } from '@angular/core';
import TaskModel from 'src/app/models/task-model';
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
    public task: TaskModel;
    public isEditMode: boolean = false;


    public constructor(
        private dataService: DataService,
        private notifyService: NotifyService) { }

    public async ngOnInit() {
        try {
            this.tasks = await this.dataService.getAllTasks();
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async deleteTask(taskId: number) {
        try {
            const ok = window.confirm("Are you sure?")
            if (!ok) return;
            await this.dataService.deleteTask(taskId);
            const index = this.tasks.findIndex(t => t.taskId === taskId);
            this.tasks.splice(index, 1);
        }
        catch (err: any) {
            this.notifyService.error(err);
        }
    }

    public async editTask(task: TaskModel) {

        // const task = this.tasks.find(t => t.taskId === taskId);
        const taskToUpdate = await this.dataService.getOneTask(task.taskId);
        console.log(task);

        this.dataService.editTask(task);
        // const indexToUpdate = this.tasks.findIndex(t => t.taskId === taskToUpdate.taskId);
        // if (indexToUpdate !== -1) {
        //     this.tasks[indexToUpdate] = task;
        // }
        // await this.dataService.editTask(this.task)

        // alert("task");

    }

}
