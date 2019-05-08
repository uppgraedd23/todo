import React, {Component} from 'react';
import './TodoList.css'
// import Task from "./Task";
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
            ],
            filter: "all"
        }
    }
    clearCompleted() {
        this.setState({
            tasks: this.state.tasks.filter(t => !t.isDone)
        })
    }

    changeFilter(filterValue) {
        this.setState({filter: filterValue})
    }



    putTaskToState(task) {
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
        var {tasks, filter} = this.state

        var filteredTasks = [];
        if (filter === "all") filteredTasks = tasks;
        if (filter === "active") filteredTasks = tasks.filter(t => !t.isDone);
        if (filter === "completed") filteredTasks = tasks.filter(t => t.isDone);
        return (
            <div className="todolist">
                <TodoListTaskCreator onCreate={this.putTaskToState.bind(this)}/>

                <TasksList tasks={filteredTasks}
                           onDelete={this.deleteTask.bind(this)}
                           onUpdate={this.updateTask.bind(this)}/>

                <TodoListFooter tasks={this.state.tasks} filter={this.state.filter}
                                onFilterChange={this.changeFilter.bind(this)}
                                onClearCompleted={this.clearCompleted.bind(this)}
                />

            </div>
        );
    }
}

export default TodoList;
