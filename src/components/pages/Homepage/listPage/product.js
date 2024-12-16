import React, {forwardRef, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { t } from "i18next";
import currencies from "../../../../configs/currencies.json";
import { getCurrencySymbol } from "../../../../helpers/helper";
import AvatarModal from "./avatar";
import {addMessageToQueue} from "../../../../redux/settingsReducer";
import {useDispatch} from "react-redux";

const Product = forwardRef(({ list, prod, checkProduct, selectProduct, user }, ref) => {
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [toggleAvatarModal, setToggleAvatarModal] = useState(false);

    const dispatch = useDispatch();
    const handleAvatarLoad = () => {
        setLoadingAvatar(false);
        if (isUploading) {
            setIsUploading(false);
            dispatch(addMessageToQueue({message: t('Product image updated successfully'), type: 'success'}));
        }
    };

    const handleAvatarError = () => {
        setLoadingAvatar(false);
        setIsUploading(false);
        dispatch(addMessageToQueue({message: t('Error during image update. Please try again.'), type: 'error'}));

    };

    const handleAvatarChange = () => {
        setLoadingAvatar(true);
        setIsUploading(true);
    };

    return (
        <div className="d-flex justify-content-between mb-2 w-100" ref={ref}>
            <div className="d-flex w-100 align-items-center ml-2">
                <Form.Check
                    type={"checkbox"}
                    className={`prod-checkbox mx-3 ${prod.loading ? 'loading': ''}`}
                    checked={prod.checked}
                    onChange={() => checkProduct(prod)}
                    id={prod._id}
                />
                <button
                    className="my-1 w-100 section-styled-bg rounded"
                    onClick={() => selectProduct(prod)}
                >
                    <h5 className="title text-break">{t(prod.name)}</h5>
                    <div>
                        {prod.price > 0 ? (
                            <span
                                className={`subtitle ${
                                    parseFloat(prod.price) === 0 ? "d-none" : "d-inline"
                                }`}
                            >
                                {prod.price}
                                {currencies.find((curr) => curr.code === list.currency)?.symbol ||
                                getCurrencySymbol(user.country)}
                            </span>
                        ) : null}
                        <span className={`x subtitle`}> ✕ </span>
                        <span className={`subtitle`}>
                            {prod.count} {t(prod.selectedUnits) || t("pcs")}
                        </span>
                    </div>
                </button>
                <Button
                    className="position-relative avatar-container mx-3 section-styled-bg"
                    onClick={() => {
                        setToggleAvatarModal(true);
                    }}
                >
                    {prod.avatar ? (
                        <img
                            src={prod.avatar}
                            alt={prod.category.toLowerCase()}
                            onLoad={handleAvatarLoad}
                            onError={handleAvatarError}
                        />
                    ) : (
                        <div className={`sprite sprite-${prod.category.toLowerCase()}`} />
                    )}
                    {loadingAvatar ? (
                        <div
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
                            className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                        >
                            <div className="spinner-border text-primary" />
                        </div>
                    ) : null}
                </Button>
            </div>
            <AvatarModal
                isVisible={toggleAvatarModal}
                onClose={() => setToggleAvatarModal(false)}
                onAvatarRemoved={() => {
                    setLoadingAvatar(false);
                    dispatch(addMessageToQueue({ message: t('Image removed successfully'), type: 'success' }));
                }}
                onStartLoading={handleAvatarChange}
                product={prod}
                listId={list._id}
                type={"products"}
            />
        </div>
    );
});

export default Product;
