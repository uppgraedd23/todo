import {c} from "./todolist-actions";

export function todolistReducer(oldState, action) {
    switch (action.type) {
        case c.CHANGE_FILTER:
            return {
                ...oldState,
                filter: action.value
            };
        case c.PUT_TASK:
            return {
                ...oldState,
                tasks: [...oldState.tasks, action.task]
            }
        case c.PUT_TASKS:
            return {
                ...oldState,
                tasks: [...oldState.tasks, ...action.tasks]
            }
        case c.DELETE_TASK:
            let newState = {...oldState};
            newState.tasks = oldState.tasks.filter((t) => {
                return t.id !== action.taskId;
            })
            return newState;

        case c.CLEAR_COMPLETED: {
            let newState = {...oldState};
            newState.tasks = newState.tasks.filter(t => !t.isDone)
            return newState;
            // return {...oldState,
            //     tasks: oldState.tasks.filter(t => !t.isDone)
            // }
        }
        case c.UPDATE_TASKS:{
            let newState = {...oldState};
            newState.tasks = [...newState.tasks]
            newState.tasks.forEach((task, index) => {
                if (task.id === action.id) {
                    newState.tasks[index] = {
                        ...task,
                        isDone: action.isDone,
                        title: action.title
                    }
                }
            })
            return newState;
        }



        default:
            if (!!oldState)
                return oldState
            return {
                tasks: [],
                filter: "all"
            }

    }
}