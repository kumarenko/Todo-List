import React, {useState} from 'react';
import {Button, ButtonGroup, Card, Dropdown, ProgressBar} from "react-bootstrap";
import {IoIosCopy, IoMdCreate, IoMdPersonAdd, IoMdTrash} from "react-icons/io";
import {connect, useDispatch} from "react-redux";
import {removeListRequest, updateListRequest} from "../../../actions/shoppingLists";
import CreateListModal from "./createListModal";
import ShareListModal from "./shareListModal";
import {Link} from "react-router-dom";
import {getColorById} from "../../../helpers/validator";
import {FiMoreHorizontal} from "react-icons/fi";
import {defaultListsState, setShoppingList} from "../../../redux/shoppingListsReducer";
import DeleteListModal from "./deleteListModal";
import {t} from "i18next";
import CopyListModal from "./copyListModal";

const ShoppingLists = ({lists, removeListRequest,updateListRequest, user, setShoppingList}) => {
    const [showModal, setShowModal] = useState(false);
    const [showSharingModal, setSharingModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [showCopyModal, setCopyModal] = useState(false);
    const [selectedList, setSelectedList] = useState(defaultListsState.list);
    const dispatch = useDispatch();

    const handleClose = () => {
        setSelectedList(defaultListsState.list);
        setShowModal(false);
        setDeleteModal(false);
        setCopyModal(false);
        setSharingModal(false);
    };
    const handleApply = (text) => {
        updateListRequest(selectedList, text);
        setShowModal(false);
    };
    const removeList = (id) => {
        removeListRequest(user.id,id);
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
    const openCopyModal = (list) => {
        setSelectedList(list);
        setCopyModal(true);
    }

    const renderAvatars = (users, creator) => {
        const sortedUsers = [...users].sort((a, b) => {
            if (a.name && b.name) {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

        const filteredUsers = sortedUsers.filter(user => user.status !== 'WAIT');
        let userAvatars = [];

        for (let index = 0; index < filteredUsers.length; index++) {
            const user = filteredUsers[index];

            if (user._id === creator || user._id === creator._id) {
                continue;
            }
            if (index === 3) {
                if (filteredUsers.length === 3) {
                    break;
                }
                userAvatars.push(
                    <div className="avatar-container d-flex flex-col w-auto" key="user-avatar">
                        <div className="user-avatar" style={{ backgroundColor: '#676767' }}>
                            <span className='subtitle' style={{ fontSize: 10 }}>+{filteredUsers.length - 3}</span>
                        </div>
                    </div>
                );
                break;
            } else {
                userAvatars.push(
                    <div className="avatar-container d-flex-col w-auto" key={user._id}>
                        <div className="user-avatar" style={{ backgroundColor: getColorById(user._id) }}>
                            {user.avatar &&
                                <img src={user.avatar}
                                     alt=''
                                     onError={(e) => {
                                         e.target.style.display = 'none';
                                         e.target.nextSibling.style.display = 'block';
                                     }}/>}
                                <span className='subtitle'>{user.name[0]}</span>
                        </div>
                    </div>
                );
            }
        }
        return userAvatars;
    };

    return (
        <>
            <div className='lists w-100 px-3 pb-5 my-2'>
                {lists.map(list => <div className=' w-100 my-2 py-2' key={list._id}>
                    <Card className={`${list.loading ? 'placeholder-list overflow-hidden' : ''} w-100 d-flex flex-row align-items-stretch p-2 section-styled-bg`}>
                        <Link to={`/lists/${list._id}`} className={`w-75 ${list.loading ? 'pe-none' : ''}`}>
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

                        <div className="buttons d-flex align-items-center justify-content-around justify-content-sm-end  flex-column-reverse  flex-sm-row w-sm-25 w-auto">
                            {list.userOwners.length > 0  &&
                            <Button className='avatars-btn rounded-4 p-0 me-1 d-sm-block d-none'
                                    onClick={() => openSharingModal(list)}
                            >
                                <div className="avatars d-flex flex-row w-auto items-center">
                                    {renderAvatars(list.userOwners, list.creator)}
                                </div>
                            </Button>}
                            <Dropdown as={ButtonGroup} className='me-1'>
                                <Dropdown.Toggle className='dropdown-without-arrow' disabled={list.loading}>
                                    <FiMoreHorizontal />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='section-styled-bg'>
                                    {user.role === 'USER' && <Dropdown.Item eventKey="2" onClick={()=> openSharingModal(list)}>
                                        <IoMdPersonAdd /> {t('Share')}
                                    </Dropdown.Item>}
                                    {list.products.length > 0 ?
                                        <Dropdown.Item eventKey="2" onClick={()=> openCopyModal(list)}>
                                        <IoIosCopy /> {t('Copy')}
                                    </Dropdown.Item> : null}
                                    <Dropdown.Item eventKey="2" onClick={()=> editList(list)}>
                                        <IoMdCreate/> {t('Rename')}
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={()=> openDeleteModal(list)}>
                                        <IoMdTrash /> {t('Delete')}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Card>
                </div>)}
            </div>
            <CreateListModal
                value={selectedList.name?.value ?? ''}
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
            <DeleteListModal
                name={selectedList.name.value}
                show={showDeleteModal}
                onHide={handleClose}
                onApply={() => removeList(selectedList._id)}
            />
            <ShareListModal
                show={showSharingModal}
                onHide={handleClose}
            />
            <CopyListModal
                show={showCopyModal}
                onHide={handleClose}
                list={selectedList}
            />
        </>
    );
};
const mapStateToProps = (state) => ({
    lists: state.items.lists,
    user: state.user.user,
});
const mapDispatchToProps = {
    removeListRequest,
    setShoppingList,
    updateListRequest,
};

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingLists)
