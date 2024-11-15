import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Dropdown, ProgressBar} from "react-bootstrap";
import {IoMdCreate, IoMdPersonAdd, IoMdTrash} from "react-icons/io";
import {connect, useDispatch} from "react-redux";
import {removeListRequest, updateListRequest} from "../../../actions/shoppingLists";
import {getAllProducts} from "../../../actions/products";
import CreateListModal from "./createListModal";
import ShareListModal from "./shareListModal";
import {Link} from "react-router-dom";
import {getColorById} from "../../../helpers/validator";
import {FiMoreHorizontal} from "react-icons/fi";
import {setShoppingList} from "../../../redux/shoppingListsReducer";
import DeleteListModal from "./deleteListModal";

const ShoppingLists = ({lists, removeListRequest,updateListRequest, userId}) => {
    const [showModal, setShowModal] = useState(false);
    const [showSharingModal, setSharingModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [selectedList, setSelectedList] = useState(null);
    const dispatch = useDispatch();

    const handleClose = () => {
        setSelectedList(null);
        setShowModal(false);
        setDeleteModal(false);
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
        setDeleteModal(false);
    }
    const editList = (list) => {
        setSelectedList(list);
        setShowModal(true);
    }
    const openSharingModal = (list) => {
        setSelectedList(list);
        dispatch(setShoppingList(list));
        setSharingModal(true);
    }
    const openDeleteModal = (list) => {
        setSelectedList(list);
        setDeleteModal(true);
    }

    const renderAvatars = (users, creator) => {
        users = users.sort((a, b) => {
            if (a.name && b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

        users = users.filter(user => user.status !== 'WAIT');
        let userAvatars = [];

        for (let index = 0; index < users.length; index++) {
            const user = users[index];

            if (user._id === creator || user._id === creator._id) {
                continue;
            }
            if (index === 3) {
                if (users.length === 3) {
                    break;
                }
                userAvatars.push(
                    <div className="avatar-container d-flex flex-col w-auto" key="user-avatar">
                        <div className="user-avatar" style={{ backgroundColor: '#676767' }}>
                            <span style={{ fontSize: 10 }}>+{users.length - 3}</span>
                        </div>
                    </div>
                );
                break;
            } else {
                userAvatars.push(
                    <div className="avatar-container d-flex-col w-auto" key={user._id}>
                        <div className="user-avatar" style={{ backgroundColor: getColorById(user._id) }}>
                            <span>{user.name ? user.name[0] : user.email[0]}</span>
                        </div>
                    </div>
                );
            }
        }
        return userAvatars;
    };

    return (
        <>
            <div className='lists w-100 p-3 my-2'>
                {lists.map(list => <div className=' w-100 my-2 p-2' key={list._id}>
                    <Card className='w-100 d-flex flex-row align-items-stretch p-2 section-styled-bg'>
                        <Link to={`/lists/${list._id}`} className='w-75'>
                            <h5 className='title'>{list.name.value}</h5>
                            {list.products?.length ?
                                <div className='position-relative d-flex justify-content-center flex-wrap align-items-stretch'>
                                    <ProgressBar
                                        className='mt-1 w-100'
                                        now={list.products.filter(item => item.checked).length}
                                        max={list.products.length}
                                    />
                                    <span className='progress-count'>{list.products.filter(item => item.checked).length} / {list.products.length}</span>
                                </div>
                                : null}
                        </Link>

                        <div className="buttons d-flex align-items-center justify-content-around justify-content-sm-end  flex-column-reverse  flex-sm-row  w-25">
                            {list.userOwners.length > 0  &&
                            <Button className='avatars-btn rounded-4 p-0 me-1'
                                    onClick={() => openSharingModal(list)}
                            >
                                <div className="avatars d-flex flex-row w-auto items-center">
                                    {renderAvatars(list.userOwners, list.creator)}
                                </div>
                            </Button>}
                            <Dropdown as={ButtonGroup} className='me-1'>
                                <Dropdown.Toggle className='dropdown-without-arrow'>
                                    <FiMoreHorizontal />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='section-styled-bg'>
                                    <Dropdown.Item eventKey="2" onClick={()=> openSharingModal(list)}>
                                        <IoMdPersonAdd /> Share
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={()=> editList(list)}>
                                        <IoMdCreate/> Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={()=> openDeleteModal(list)}>
                                        <IoMdTrash /> Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card>
                </div>)}
            </div>
            {showModal && <CreateListModal
                value={selectedList}
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />}
            {showDeleteModal && <DeleteListModal
                name={selectedList.name.value}
                show={showDeleteModal}
                onHide={handleClose}
                onApply={() => removeList(selectedList._id)}
            />}
            {showSharingModal && <ShareListModal
                show={showSharingModal}
                onHide={handleCloseSharingModal}
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
