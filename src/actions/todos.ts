import {setTodos} from "../redux/reducer";
import {tempList} from "../components/tempList";

export const getTodos:unknown = () => {
    return (dispatch) => {
        const response = tempList; // todo change to fetch from server
        dispatch(setTodos(response))
    }
}
