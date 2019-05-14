import React, {Component} from 'react';
import {createTask} from "./services";


class TodoListTaskCreator extends Component {



    createNewTask(e) {

        if (e.key === 'Enter') {

            // const data = new URLSearchParams();
            // data.append('widgetId', 15136)
            // data.append('title', e.currentTarget.value)
            // var newTaskInput = e.currentTarget

            const newTaskInput = e.currentTarget;

            createTask(newTaskInput.value, 15136)
                .then(data => {
                    const newTask = {
                        id: data.task.id,
                        title: data.task.title,
                        isDone: data.task.isDone
                    };
                    this.props.onCreate(newTask)
                    newTaskInput.value = '';
                })

        }
    }


    render() {
        return (

            <div className="header">
                <input onKeyPress={this.createNewTask.bind(this)}/>
            </div>


        );
    }
}

export default TodoListTaskCreator;
