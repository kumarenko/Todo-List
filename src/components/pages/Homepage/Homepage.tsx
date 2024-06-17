import React, {FC, ReactElement, useEffect, useState} from "react";
import TaskForm from "./TaskForm";
import {connect, useSelector} from "react-redux";
import {removeTodoRequest, getShoppingLists} from '../../../actions/todos';
import ShoppingLists from "./shoppingLists";
import {Button} from "react-bootstrap";
import {IoMdAdd} from "react-icons/io";
import './styles.less';
const HomePage: FC = ({lists, getShoppingLists }): ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleApply = (data) => {
        setShowModal(false);
    };
    const handleShow = () => setShowModal(true);
    useEffect(()=>{
        getShoppingLists();
    }, []);

    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return <div className='homepage d-flex flex-column align-items-center'>
        <div className="d-flex justify-content-between h3 w-75 p-3">
            <h1>My shopping lists</h1>
            <Button variant={buttonsVariant} onClick={()=> handleShow()}><IoMdAdd size={16}/> Add new List</Button>
        </div>
        {lists.length ? <ShoppingLists lists={lists}/> :
            <h3>Here is no List. Press 'Add List' to create new one!</h3>}
            <TaskForm
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
    </div>
};

const mapStateToProps = (state) => ({
    lists: state.items.lists
});

const mapDispatchToProps = {
    removeTodoRequest,
    getShoppingLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

