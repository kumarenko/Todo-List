import React, {useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import {Button, ButtonGroup, Card, Dropdown, ProgressBar} from "react-bootstrap";
import {IoMdCreate, IoMdPersonAdd, IoMdTrash} from "react-icons/io";
import {connect, useSelector} from "react-redux";
import {getAllProducts, removeListRequest, updateListRequest} from "../../../actions/shoppingLists";
import CreateListModal from "./createListModal";
import ShareListModal from "./shareListModal";
import {Link} from "react-router-dom";
import {getColorById} from "../../../helpers/validator";
import {FiMoreHorizontal} from "react-icons/fi";

const ShoppingLists = ({lists, removeListRequest,updateListRequest, userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [showSharingModal, setSharingModal] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const [owners, setOwners] = useState({});
    useEffect(() => {
        if(showSharingModal) {
            const selectedListToInvite = lists.find(list => list._id === owners.listId);
            const updatedOwnersList = {
                ...owners,
                owners: selectedListToInvite.userOwners,
            };
            setOwners(updatedOwnersList);
        }
    },[lists]);
    const handleClose = () => {
        setSelectedList(null);
        setShowModal(false);
    };
    const handleCloseSharingModal = () => {
        setSharingModal(false);
    };
    const handleApply = (text) => {
        updateListRequest(selectedList, text);
        setShowModal(false);
    };
    const removeList = (id) => {
        removeListRequest(userId,id);
    }
    const editList = (list) => {
        setSelectedList(list);
        setShowModal(true);
    }
    const openSharingModal = (list) => {
        const {_id, name, creator, products, userOwners} = list;
        setOwners({
            name, listId: _id,
            creator, products,
            owners: userOwners,
        });
        setSharingModal(true);
    }
    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    const renderAvatars = (users) => {
        users = users.filter(user => user.status !== 'WAIT');
        let userAvatars = [];
        for (let index = 0; index < users.length; index++) {
            const user = users[index];
            if(index === 2) {
                if(users.length === 3) {
                    break;
                }
                userAvatars.push(
                    <div className={'avatar-container d-flex flex-col w-auto'}
                         key={'user-avatar'}
                         >

                        <div  className='user-avatar'
                              style={{
                            backgroundColor: '#676767',
                        }}>
                            <span style={{fontSize: 10}}>
                                +{users.length - 3}
                            </span>
                        </div>

                    </div>
                );
                break;
            }
            userAvatars.push(
                <div className={`avatar-container d-flex-col w-auto`}
                     key={user._id}
                     >
                    <div className='user-avatar'
                         style={{
                        backgroundColor: getColorById(user._id),
                    }}>
                       <span>
                        {user.name ? user.name[0] : user.email[0]}
                    </span>
                    </div>
                </div>
            );
        }
        return userAvatars;
    }

    return (
        <>
            <Accordion alwaysOpen={true} defaultActiveKey={0} className='w-75 p-3 my-2'>
                {lists.map(list => <div className='list-item-link my-2 p-2' key={list._id}>
                    <Card className='p-2'>
                        <Link to={`/lists/${list._id}`}>
                            {list.name} {list.products?.length ?
                                <div className='d-flex justify-content-between'>

                                    <ProgressBar
                                        className='mt-1'
                                        now={list.products.filter(item => item.checked).length}
                                        max={list.products.length}
                                    />
                                    <div>
                                        {list.products.filter(item => item).length} / {list.products.length}
                                    </div>
                                </div>
                                : null}
                        </Link>

                        <div className="buttons d-flex align-items-center">
                            {list.userOwners.length > 0  &&
                            <Button className='avatars-btn rounded-4 p-0 hover:bg-gray-200 me-1' variant='secondary'
                                    onClick={() => openSharingModal(list)}
                            >
                                <div className="avatars d-flex flex-row w-auto items-center">
                                    {renderAvatars(list.userOwners)}
                                </div>
                            </Button>}
                            <Dropdown as={ButtonGroup} className='me-1'>
                                <Dropdown.Toggle variant={buttonsVariant}>
                                    <FiMoreHorizontal />
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant={buttonsVariant}>
                                    <Dropdown.Item eventKey="2" onClick={()=> openSharingModal(list)}>
                                        <IoMdPersonAdd /> Share
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={()=> editList(list)}>
                                        <IoMdCreate/> Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={()=> removeList(list._id)}>
                                        <IoMdTrash /> Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card>
                </div>)}
            </Accordion>
            <CreateListModal
                value={selectedList}
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
            {showSharingModal && <ShareListModal
                list={owners}
                show={showSharingModal}
                onHide={handleCloseSharingModal}
                onApply={handleApply}
            />}
        </>
    );
};
const mapStateToProps = (state) => ({
    lists: state.items.lists,
    allProducts: state.items.allProducts,
    userId: state.user.user.id,
});
const mapDispatchToProps = {
    removeListRequest,
    updateListRequest,
    getAllProducts
};

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingLists)
