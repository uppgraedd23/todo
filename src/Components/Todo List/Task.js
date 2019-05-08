import React, {Component} from 'react';


class Task extends Component {

    constructor(props) {

        super();


        this.patentDeleteCallback = props.deleteCallback
        this.patentUpdateCallback = props.updateCallback
    }

    deleteTask(e) {
        this.patentDeleteCallback(this.props.task.id);
    }

    toggleTaskStatus(e) {
        // var newTask = {
        //     ...this.state.task,
        //     isDone: !this.state.task.isDone
        // };
        var task ={
            ...this.props.task}
        task.isDone = !this.isDone;
        this.patentUpdateCallback(task);

    }

    render() {
        return (
            <div className={this.props.task.isDone ? 'task done' : 'task'}>
                <input type="checkbox"
                       checked={this.props.task.isDone}
                       onClick={this.toggleTaskStatus.bind(this)}/>
                {this.props.task.title}
                <span className="delete"
                      onClick={this.deleteTask.bind(this)}>x</span>
            </div>


        );
    }
}

export default Task;
