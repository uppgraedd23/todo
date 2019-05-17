export const c ={
    CHANGE_FILTER: "CHANGE_FILTER",
    PUT_TASK: "PUT_TASK",
    PUT_TASKS: "PUT_TASKS",
    CLEAR_COMPLETED:"CLEAR_COMPLETED",
    UPDATE_TASKS:"UPDATE_TASKS",
    DELETE_TASK:"DELETE_TASK"
}
export const putTaskCreator = (task) => {
    return {
        type: c.PUT_TASK,
        task: task
    }
}
export const deleteTaskCreator = (taskId) => {
    return {
        type: c.DELETE_TASK,
        taskId: taskId
    }
}

export const putTasksActionCreator = (tasks) => {
    return {
        type: c.PUT_TASKS,
        tasks: tasks
    }
}

export const clearCompletedCreator = (tasks) => {
    return {
        type: c.CLEAR_COMPLETED,
    }
}

export const changeFilterCreator = (newFilterValue) => {
    return {
        type: c.CHANGE_FILTER,
        value:newFilterValue
    }
}


export const updateTaskCreator = ({isDone, id}) => {
    return {
        type: c.UPDATE_TASKS,
        id:id,
        isDone: isDone

    }
}