import React, {Component} from 'react';
import './TodoList.css'
import Task from "./Task";
import TodoListFooter from "./TodoListFooter";
import TodoListTaskCreator from "./TodoListTaskCreator";
import TasksList from "./TasksList";

class TodoList extends Component {

    constructor() {
        super();
        this.state = {
            tasks: [
                {
                    id: 0,
                    title: "learn js",
                    isDone: false
                },
                {
                    id: 1,
                    title: "learn react",
                    isDone: false
                }
            ]
        }
    }

    createNewTask(task) {
        this.setState({
            tasks: [...this.state.tasks, task]
        });


    }

    deleteTask(taskId) {
        const newTasksList = this.state.tasks.filter((t) => {
            return t.id !== taskId;
        })
        this.setState({
            tasks: newTasksList
        })
    }

    updateTask(task) {
        const newTasksList = [...this.state.tasks]
        newTasksList.forEach((t) => {
            if (t.id === task.id) {
                t.isDone = task.isDone;
                return;
            }

        })
        this.setState({
            tasks: newTasksList
        })
    }

    render() {
        return (
            <div className="todolist">
                <TodoListTaskCreator onCreate={this.createNewTask.bind(this)}/>

                <TasksList tasks={this.state.tasks}
                           onDelete={this.deleteTask.bind(this)}
                           onUpdate={this.updateTask.bind(this)}/>

                <TodoListFooter/>

            </div>
        );
    }
}

export default TodoList;
