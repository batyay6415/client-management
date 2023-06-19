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


async function addNewTask(task: TaskModel): Promise<TaskModel> {

    //Create query by sql:
    const sql = "INSERT INTO tasks(description,date, customerId) VALUES(?,?,?)";
    
    const result:OkPacket = await dal.execute(sql, [task.description, task.date, task.customerId ]);

    result.insertId = task.taskId

    //Return them
    return task;

}

async function deleteTask(id: number): Promise<void> {
    const sql = "DELETE FROM tasks WHERE taskId = ?";
    await dal.execute(sql, [id]);
}


export default {
    getAllCustomers,
    getAllTasks,
    addNewTask,
    deleteTask
};

