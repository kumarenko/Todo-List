import React, {FC, ReactElement, useEffect, useState} from "react";
import CreateListModal from "./createListModal";
import {connect} from "react-redux";
import {
    removeListRequest,
    getShoppingLists,
    addShoppingList, synchronizeLocalLists,
} from '../../../actions/shoppingLists';
import ShoppingLists from "./shoppingLists";
import {Button} from "react-bootstrap";
import {IoMdAdd} from "react-icons/io";
import './styles.less';
import {t} from "i18next";
import Footer from "../../../common/footer";

const HomePage: FC = ({lists, getShoppingLists, title, user, addShoppingList, synchronizeLocalLists }): ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const handleApply = (name) => {
        addShoppingList(user.id, name);
        setShowModal(false);
    };

    const addNewList = () => {
        setShowModal(true);
    }
    useEffect(()=>{
        document.title = title;
        const unSynchronizedLists = lists.filter(list => list.temporary);
        if(user.role ==='USER' && unSynchronizedLists.length >= 1) {
            synchronizeLocalLists(unSynchronizedLists, user.id)
        } else {
            getShoppingLists(user.id);
        }
    }, []);

    return <div className='content h-100vh w-100 d-flex flex-column align-items-center mx-auto my-0'>
        <div className="d-flex justify-content-between h3 w-100 align-items-center justify-content-between flex-column flex-sm-row  pt-5 pt-sm-3 px-3 mb-0">
            <h1 className='title pt-2 pt-sm-0'>{t('Lists')}</h1>
            <Button onClick={() => addNewList()}><IoMdAdd size={16}/>{t('Add list')}</Button>
        </div>
        {lists?.length ? <ShoppingLists lists={lists}/> :
            <h3 className='title'>{t("Here is no lists. Press '+' to create new one!")}</h3>}
            <CreateListModal
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
        <Footer/>
    </div>
};

const mapStateToProps = (state) => ({
    lists: state.items.lists,
    user: state.user.user,
});

const mapDispatchToProps = {
    removeListRequest,
    getShoppingLists,
    addShoppingList,
    synchronizeLocalLists,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

