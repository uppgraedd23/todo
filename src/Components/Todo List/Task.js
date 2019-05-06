import React, {Component} from 'react';


class Task extends Component {

    constructor(props) {

        super();
        this.state = {
            task: props.task,
        };
        this.patentDeleteCallback = props.deleteCallback
    }

    deleteTask(e) {
        this.patentDeleteCallback(this.state.task.id);
    }

    toggleTaskStatus(e) {
        var newTask = {
            ...this.state.task,
            isDone: !this.state.task.isDone
        };
        this.setState({
            task: newTask
        });
    }

    render() {
        return (
            <div className={this.state.task.isDone ? 'task done' : 'task'}>
                <input type="checkbox" checked={this.state.task.isDone} onClick={this.toggleTaskStatus.bind(this)}/>
                {this.state.task.title}
                <span className="delete" onClick={this.deleteTask.bind(this)}>x</span>
            </div>


        );
    }
}

export default Task;
