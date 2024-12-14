import React, { FC, ReactElement, useEffect, useState } from "react";
import CreateListModal from "./createListModal";
import { connect } from "react-redux";
import {
    removeListRequest,
    getShoppingLists,
    addShoppingList,
    synchronizeLocalLists,
} from '../../../actions/shoppingLists';
import ShoppingLists from "./shoppingLists";
import { Badge, Button } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { FaSyncAlt } from "react-icons/fa";
import './styles.less';
import { t } from "i18next";
import Footer from "../../../common/footer";
import ListPlaceholder from "../../../common/listPlaceholder";
import { Helmet } from 'react-helmet';

const HomePage: FC = ({ lists, getShoppingLists, title, user, addShoppingList, synchronizeLocalLists }): ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingSync, setLoadingSync] = useState(false);

    const handleClose = () => setShowModal(false);

    const handleApply = async (name) => {
        setShowModal(false);
        await addShoppingList(user.id, name);
    };

    const addNewList = () => {
        setShowModal(true);
    }

    useEffect(() => {
        document.title = title;
    }, []);

    useEffect(() => {
        const synchronizeLists = async () => {
            const unSynchronizedLists = lists.filter(list => list.temporary);
            if (unSynchronizedLists.length > 0) {
                setLoading(true);
                setLoadingSync(true);
                await synchronizeLocalLists(unSynchronizedLists, user.id);
                setLoading(false);
                setLoadingSync(false);
            }
        };

        if (user.role === 'USER') {
            synchronizeLists();
        }
    }, []);

    useEffect(() => {
        const fetchLists = async () => {
            if (loading) {
                await getShoppingLists(user.id);
                setLoading(false);
            }
        };
        fetchLists();
    }, [loading]);

    const renderLists = () => {
        if (loading) {
            return <ListPlaceholder />
        } else {
            if (lists.length) {
                return <ShoppingLists lists={lists} />
            } else {
                return <h3 className='title'>{t("Here is no lists. Press '+' to create new one!")}</h3>
            }
        }
    }

    return (
        <div className='content h-100vh w-100 d-flex flex-column align-items-center mx-auto my-0 position-relative'>
            <Helmet>
                <title>{t('Lists')}</title>
                <meta name="description" content={t('A page where users can manage their shopping lists.')} />
                <meta property="og:title" content={t('Lists')} />
                <meta property="og:description" content={t('Manage your shopping lists easily and efficiently.')} />
                <meta name="twitter:title" content={t('Lists')} />
                <meta name="twitter:description" content={t('Manage your shopping lists easily and efficiently.')} />
            </Helmet>

            <div className="d-flex justify-content-between h3 w-100 align-items-center justify-content-between flex-column flex-sm-row pt-5 pt-sm-3 px-3 mb-0">
                <h1 className='title pt-2 pt-sm-0'>{t('Lists')}</h1>
                <Button className='d-flex align-items-center' onClick={() => addNewList()}>
                    <IoMdAdd size={16} className='me-1' />
                    {t('Add list')}
                </Button>
            </div>

            <div className='d-flex justify-content-end w-100 px-3 mt-2'>
                <Badge className={`sync-label title d-flex align-items-center ${loadingSync ? 'show' : ''}`}>
                    <FaSyncAlt className='me-2' />
                    {t('Synchronizing data')}
                </Badge>
            </div>

            {renderLists()}

            <CreateListModal
                show={showModal}
                onHide={handleClose}
                onApply={handleApply}
            />
            <Footer />
        </div>
    );
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
