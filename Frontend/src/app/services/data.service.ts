import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../utils/app-config';
import { firstValueFrom } from "rxjs";
import CustomerModel from '../models/CustomerModel';
import TaskModel from '../models/TaskModel';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    public async getAllCustomers(): Promise<CustomerModel[]> {
        const observable = this.http.get<CustomerModel[]>(appConfig.customersUrl);
        const customers = await firstValueFrom(observable);
        return customers;
    }


    public async getAllTasks(): Promise<TaskModel[]> {
        const observable = this.http.get<TaskModel[]>(appConfig.tasksUrl);
        const tasks = await firstValueFrom(observable);
        return tasks;
    }

    public async addNewTask(task: TaskModel): Promise<void> {
        const observable = this.http.post<TaskModel>(appConfig.tasksUrl, task);
        await firstValueFrom(observable);
    }

    public async deleteTask(taskId: number): Promise<void> {
        const observable = this.http.delete<TaskModel>(appConfig.tasksUrl + taskId);
         await firstValueFrom(observable);
        
    }

   
}
