class TaskModel {

    public taskId: number;
    public description: string;
    public date: string;
    public customerId: number;
    public isDone: boolean;

    public constructor(task: TaskModel) {
        this.taskId = task.taskId;
        this.description = task.description;
        this.date = task.date;
        this.customerId = task.customerId;
        this.isDone = task.isDone;

    }

}

export default TaskModel;