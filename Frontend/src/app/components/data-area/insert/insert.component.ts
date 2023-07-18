import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CustomerModel from 'src/app/models/customer-model';
import TaskModel from 'src/app/models/task-model';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-insert',
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

    public customers: CustomerModel[];
    public task = new TaskModel();

    public constructor(
        private dataService: DataService,
        private notifyService: NotifyService,
        private router: Router ) { }


        public async ngOnInit() {
            try {
                this.customers = await this.dataService.getAllCustomers()
            }
            catch(err: any) {
                this.notifyService.error(err);
            }
        }
    
        public async add() {
            try {
                let currentDate = new Date().toISOString();
                this.task.date = currentDate;
                await this.dataService.addNewTask(this.task)
                this.notifyService.success("Task has been added");
                this.router.navigateByUrl("/list");
            }
            catch(err: any) {
                this.notifyService.error(err);
            }
        }

}
