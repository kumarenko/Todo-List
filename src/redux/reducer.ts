const SET_TODOS = "SET_TODOS";

const defaultState = {
    todos: [],
}

export default function todosReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.payload,
            }
        default:
            return state
    }
}


export const setTodos = (todos) => ({type:SET_TODOS, payload:todos})
