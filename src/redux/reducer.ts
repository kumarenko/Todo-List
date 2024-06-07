const SET_TODOS = "SET_TODOS";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";

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

        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
                ),
            };
        case DELETE_TODO:
            const todoId = action.payload;
            return {
                ...state,
                todos: state.todos.filter(todo =>
                    todo.id !== todoId
                ),
            };
        default:
            return state
    }
}


export const setTodos = (todos) => ({type:SET_TODOS, payload:todos})
export const updateTodo = (todo) => ({type:UPDATE_TODO, payload:todo})
export const deleteTodo = (todoId:number) => ({type:DELETE_TODO, payload: todoId})
