import React, {Component} from 'react';
import {createStore} from 'redux'
import './TodoList.css'
// import Task from "./Task";
import TodoListFooter from "./TodoListFooter";
import TodoListFormContainer from "./TodoListTaskCreator";
import TasksList from "./TasksList";
import {getTasks} from "./services";
import {todolistReducer} from "./redux/todolist-reducers";
import {
    changeFilterCreator,
    clearCompletedCreator, deleteTaskCreator,
    putTaskCreator,
    putTasksActionCreator, updateTaskCreator
} from "./redux/todolist-actions";

class TodoList extends Component {

    constructor() {
        super();


        // var reducers = combineReducers({todolistReducer});
        this.store = createStore(todolistReducer);
        var state = this.store.getState()


        this.state = state;

        this.store.subscribe(() => {
            var state = this.store.getState()
            this.setState(state)
        })

        getTasks(15136).then(tasksFromServer => {
            var tasks = tasksFromServer.map(itemFromServer => {
                return {
                    id: itemFromServer.id,
                    title: itemFromServer.title,
                    isDone: itemFromServer.done
                };

            });

            var action = putTasksActionCreator(tasks);
            this.store.dispatch(action)
        })
    }




    putTaskToState(task) {
        this.store.dispatch(putTaskCreator(task))
    }

    render() {
        var {tasks, filter} = this.state

        var filteredTasks = [];
        if (filter === "all") filteredTasks = tasks;
        if (filter === "active") filteredTasks = tasks.filter(t => !t.isDone);
        if (filter === "completed") filteredTasks = tasks.filter(t => t.isDone);
        return (
            <div className="todolist">
                <TodoListFormContainer onCreate={this.putTaskToState.bind(this)}/>

                <TasksList tasks={filteredTasks} store = {this.store}
/>

                <TodoListFooter tasks={this.state.tasks} filter={this.state.filter}
                                store = {this.store}

                />

            </div>
        );
    }
}

export default TodoList;
