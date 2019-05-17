import React, {Component} from 'react';
import {deleteTask, updateTask} from "./services";
import {deleteTaskCreator, updateTaskCreator} from "./redux/todolist-actions";


class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            title: props.task.title
        }


        this.patentUpdateCallback = props.updateCallback
    }

    deleteTask(e) {
        deleteTask(15136, this.props.task.id).then((data) => {
            this.props.store.dispatch(deleteTaskCreator(this.props.task.id))
        })
    }

    toggleTaskStatus(e) {

        var task = {
            ...this.props.task
        };
        task.isDone = !task.isDone;

        updateTask(15136, task.id, task.title, task.isDone,)
            .then((data) => {
                this.setState({
                    editMode:false
                })
            this.props.store.dispatch(updateTaskCreator(task));

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
        updateTask(15136, task.id, task.title, null)
            .then((data) => {
                this.setState({
                    editMode: false
                })

            });
    }

    changeTitle(e) {
        this.setState({
            title: e.currentTarget.value
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
