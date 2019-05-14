import React, {Component} from 'react';
import {updateTask} from "./services";


class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            title: props.task.title
        }


        this.patentDeleteCallback = props.deleteCallback
        this.patentUpdateCallback = props.updateCallback
    }

    deleteTask(e) {
        this.patentDeleteCallback(this.props.task.id);
    }

    toggleTaskStatus(e) {

        var task = {
            ...this.props.task
        };
        task.isDone = !task.isDone;

        updateTask(task.title, task.isDone, 15136).then((data) => {
            this.patentUpdateCallback(task);

        })

    }

    goToEditMode() {
        this.setState({
            editMode: true
        })
    }

    saveTitle(e) {
        const newTitle = e.currentTarget.value;

        var task = {
            ...this.props.task
        };
        task.title = newTitle;
        updateTask(task.title, task.id, null, newTitle)
            .then((data) => {
                this.setState({
                    editMode:false
                })
            this.patentUpdateCallback(task);

        });
    }

    changeTitle(e){
        this.setState({
            title:e.currentTarget.value
        })
    }

    render() {
        var {isDone} = this.props.task;
        var {title} = this.state;


        var displayElement = ""
        if (this.state.editMode) {
            displayElement = <input value={title} onChange={this.changeTitle.bind(this)}
                                    onBlur={this.saveTitle.bind(this)}/>
        } else {
            displayElement =
                <span onDoubleClick={this.goToEditMode.bind(this)}>
                    {title}
                    </span>
        }

        return (
            <div className={isDone ? 'task done' : 'task'}>
                <input type="checkbox" onChange={() => {
                }}
                       checked={isDone}
                       onClick={this.toggleTaskStatus.bind(this)}/>
                {displayElement}
                <span className="delete"
                      onClick={this.deleteTask.bind(this)}>x</span>
            </div>


        );
    }
}

export default Task;
