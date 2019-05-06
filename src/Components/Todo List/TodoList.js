import React, {Component} from 'react';
import './TodoList.css'
import Task from "./Task";

class TodoList extends Component {

    constructor(props) {
        super();
        this.newIndex = 2;
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

    createNewTask(e) {

        if (e.key === 'Enter') {
            this.setState({
                tasks: [...this.state.tasks,
                    {
                        title: e.currentTarget.value,
                        isDone: false,
                        id: this.newIndex
                    }]
            });
            e.currentTarget.value = '';
            this.newIndex++

        }
    }

    deleteTask(taskId) {
        const newTasksList = this.state.tasks.filter((t) => {
            return t.id !== taskId;
        })
        this.setState({
            tasks: newTasksList
        })
    }

    render() {
        return (
            <div className="todolist">
                <div className="header">
                    <input onKeyPress={this.createNewTask.bind(this)}/>
                </div>
                <div className="tasks">
                    {
                        this.state.tasks.map((task, index) => {
                            return <Task task={task} deleteCallback={this.deleteTask.bind(this)} key={task.id}/>
                        })}
                </div>
            </div>

        );
    }
}

export default TodoList;
