import React, {Component} from 'react';
import {createTask} from "./services";

export default class TodoListFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            isWaiting: false,
        }
    }

    createTask(title) {
        this.setState({
            isWaiting: true,
            title: title
        })
        createTask(title, 15136)
            .then(data => {
                const newTask = {
                    id: data.task.id,
                    title: data.task.title,
                    isDone: data.task.isDone
                };
                this.props.onCreate(newTask)
                this.setState({
                    isWaiting: false,
                    title: ''
                })
            });
    }
    changeTitle(title){
        this.setState({

            title: title
        })
    }

    render() {

        var {title, isWaiting} = this.state

        return (
            <div>

            <TodoListFormPresentation
                createTask={this.createTask.bind(this)}
                title={title}
                isWaiting={isWaiting}
                changeTitle={this.changeTitle.bind(this)}
                />
            </div>
        )
    }
}


const TodoListFormPresentation = (props) => {
    const createNewTask = (e) => {
        // props.changeTitle(e.currentTarget.value);

            // console.log(newTaskInput.value)
        if (e.key === 'Enter') {
            const newTaskInput = e.currentTarget;
            props.createTask(newTaskInput.value)

        }
    }
    const changeTitle = (e) => {
        props.changeTitle(e.currentTarget.value)

    }
    return (
        <div className="header">
            <input onKeyPress={createNewTask}
                   onChange={changeTitle}
                   value={props.title}
                   disabled={props.isWaiting}
            />
        </div>
    );
}


