import React, {Component} from 'react';
import './TodoList.css'
// import Task from "./Task";
import TodoListFooter from "./TodoListFooter";
import TodoListTaskCreator from "./TodoListTaskCreator";
import TasksList from "./TasksList";
import {getTasks} from "./services";

class TodoList extends Component {

    constructor() {
        super();

        var todolistState = {
            tasks: [{
                id: 1,
                title: 'learn css',
                isDone: false
            }],
            filter: "all"
        };


        const changeFilterAction = {
            type: "CHANGE_FILTER"
        };

        const createNewTaskAction = {
            type: "CREATE_NEW_TASK",
            id:2,
            title:"learn react",
            isDone: true
        };const deleteTaskAction = {
            type: "DELETE_TASK",
            id:2
        };
        console.log(todolistState);


        function todolistReducer(oldState, action) {
            switch (action.type) {
                case "CHANGE_FILTER":
                    return {
                        ...todolistState,
                        filter: "completed"
                    };
                case"CREATE_NEW_TASK":
                return{
                    ...oldState,
                    tasks:[...oldState.tasks, {
                        id: action.id,
                        title: action.title,
                        isDone:action.isDone
                    }]
                }
                case"DELETE_TASK":
                return{
                    ...oldState,
                    tasks:[...oldState.tasks,
                        delete {...oldState.tasks.id}]
                }

            }
        }

        todolistState = todolistReducer(todolistState, changeFilterAction)
        todolistState = todolistReducer(todolistState, createNewTaskAction)
        todolistState = todolistReducer(todolistState, deleteTaskAction)

        console.log(todolistState);


        this.state = {
            tasks: [],
            filter: "all"
        };
        getTasks(15136).then(tasksFromServer => {
            var tasks = tasksFromServer.map(itemFromServer => {
                return {
                    id: itemFromServer.id,
                    title: itemFromServer.title,
                    isDone: itemFromServer.done
                };

            });
            this.setState({tasks: tasks})
        })
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
