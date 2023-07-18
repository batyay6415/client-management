import { ResourceNotFoundError } from "../2-models/client-errors";
import CustomerModel from "../2-models/customer-model";
import TaskModel from "../2-models/task-model";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";

//Get all customers 
async function getAllCustomers(): Promise<CustomerModel[]> {

    //Create query by sql:
    const sql = "SELECT * FROM customers";

    //get all customers from query of sql:
    const customers = await dal.execute(sql);

    //Return them
    return customers;

}

//Get all tasks 
async function getAllTasks(): Promise<TaskModel[]> {

    //Create query by sql:

    const sql = `SELECT tasks.* , customers.customerName
                FROM tasks
                JOIN customers ON tasks.customerId = customers.customerId;`;

    //get all tasks from query of sql:
    const tasks = await dal.execute(sql);

    //Return them
    return tasks;

}
//Get one task:
async function getOneTask(taskId: number): Promise<TaskModel>{

    //Create query by sql:

    const sql = `SELECT * FROM tasks
                WHERE taskId = ?`;

    const tasks = await dal.execute(sql, [taskId]);

    const task = tasks[0];

    // validate if the vacation was returned:
    if (!task) throw new ResourceNotFoundError(taskId);

    return task;
}

async function addNewTask(task: TaskModel): Promise<TaskModel> {

    //Create query by sql:
    const sql = "INSERT INTO tasks(description,date, customerId) VALUES(?,?,?)";

    const result: OkPacket = await dal.execute(sql, [task.description, task.date, task.customerId]);

    result.insertId = task.taskId

    //Return them
    return task;

}

//Delete one task 
async function deleteTask(id: number): Promise<void> {
    const sql = "DELETE FROM tasks WHERE taskId = ?";
    await dal.execute(sql, [id]);
}

//Edit specific task
async function editTask(task: TaskModel): Promise<TaskModel> {

    // Create query: 
    const sql = `UPDATE tasks SET
        description = ?,
        date = ?,
        customerId = ?,
        isDone = ?
        WHERE taskId = ? `;

    const result: OkPacket = await dal.execute(sql, [task.description, task.date,
    task.customerId, task.isDone, task.taskId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(task.taskId);

    return task;

}

export default {
    getAllCustomers,
    getAllTasks,
    getOneTask,
    addNewTask,
    deleteTask,
    editTask
};

