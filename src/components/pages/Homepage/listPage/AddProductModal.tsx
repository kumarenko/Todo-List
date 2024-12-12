import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, Form, InputGroup} from "react-bootstrap";
import {addProductToList} from "../../../../actions/products";
import {connect} from "react-redux";
import FilterModal from './filter';
import allProducts from './../../../../configs/products.json';
import {onlyUnique} from "../../../../helpers/helper";
import RenderProduct from "./renderProduct";
import {IoMdArrowDropdown, IoMdClose} from "react-icons/io";
import {t} from "i18next";
import {FaBarcode} from "react-icons/fa6";
import BarcodeModal from "./barcodeModal";
const allCategories = allProducts.map(prod => prod.category).filter(onlyUnique);
const customProductsUnits = ['pcs', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'gal'];
const AddProductModal = ({show, onHide}) => {

    const [searchValue, setSearchValue] = useState('');
    const [toggleFilterModal, setToggleFilterModal] = useState(false);
    const [toggleBarcodeModal, setToggleBarcodeModal] = useState(false);
    const [filteredItems, setFilteredItems] = useState(allProducts);
    const [filteredCategories, setFilteredCategories] = useState(allProducts.map(prod => prod.category).filter(onlyUnique));
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const searchProduct = (e: any) => {
        setSearchValue(e.target.value);
    };
    useEffect(() => {
        applyFilters();
    }, [searchValue, selectedCategories]);

    const applyFilters = () => {
        let filtered = allProducts.filter(prod => {
            const matchesSearch = t(prod.name)
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(prod.category);
            return matchesSearch && matchesCategory;
        });

        if (searchValue.trim()) {
            const customProduct = {
                _id: null,
                name: searchValue,
                category: 'OTHER',
                units: customProductsUnits,
            };

            const isCustomProductAdded = filtered.some(
                prod => t(prod.name).toLowerCase() === searchValue.toLowerCase() && prod.category === 'OTHER',
            );

            if (!isCustomProductAdded) {
                filtered.push(customProduct);
            }
        }

        setFilteredItems(filtered);

        const filteredProductsCats = allCategories.filter(category =>
            filtered.some(prod => prod.category === category),
        );

        if (searchValue.trim() && !filteredProductsCats.includes('OTHER')) {
            filteredProductsCats.push('OTHER');
        }

        setFilteredCategories(filteredProductsCats);
    };

    const filterByCategory = (categories: Array<string>) => {
        setSelectedCategories(categories);
    };

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category],
        );
    };

    const removeCategoryToFilter = (cat) => {
        const updatedCategories = filteredCategories.filter((category) => category !== cat);
        filterByCategory(updatedCategories);
    };

    const renderCategory = (item: any) => {
        const isExpanded = expandedCategories.includes(item);
        const selectedProducts = filteredItems.filter(
            (prod: any) => prod.category === item
        );
        const selectedProductsCount = selectedProducts.length;

        return (
            <div key={item} className="w-100">
                <button
                    onClick={() => toggleCategory(item)}
                    className="accordion d-flex justify-content-between subtitle align-items-center w-100 section-styled-bg my-1 p-1 rounded"
                >
                    <div>
                        {t(item)} <span>({selectedProductsCount})</span>
                    </div>
                    <IoMdArrowDropdown style={{ transform: `rotate(${isExpanded ? 180 : 0}deg)` }} />
                </button>
                <div className="d-flex flex-column">
                    {isExpanded &&
                    selectedProducts.map((prod: any) => (
                        <RenderProduct item={prod} key={prod._id || prod.name} />
                    ))}
                </div>
            </div>
        );
    };

    return ReactDOM.createPortal(
        <Modal show={show} onHide={onHide} className='w-100 rounded' centered>
            <Modal.Header className='modal-styled-bg d-flex flex-column justify-content-center'>
                <Modal.Title className='title'>{t('Add product')}</Modal.Title>

                <Button type="button" className="position-absolute top-3 end-3 btn custom-close" aria-label="Close" onClick={onHide}>
                    <IoMdClose size={20}/>
                </Button>

                {selectedCategories.length >= 1 ? <div className='w-100'>
                    {selectedCategories.map(cat => <Button key={cat} className='m-1' onClick={() => removeCategoryToFilter(cat)}><IoMdClose/>{t(cat)}</Button>)}
                </div> : null}
            </Modal.Header>
            <Form.Group className='d-flex flex-row flex-nowrap modal-styled-bg py-3 px-3 justify-content-start'>
                <InputGroup className=' w-75 d-fex flex-column me-3'>
                    <Form.Control
                        value={searchValue}
                        className='input-with-length-numbers add-prod-input w-100'
                        type='text'
                        maxLength={100}
                        placeholder={t('Enter product name')}
                        onChange={searchProduct}
                    />
                    <Form.Label className='position-absolute top-100 label-with-length-numbers subtitle text-right d-flex align-self-end' style={{fontSize: 10}}>
                        {searchValue.length} / 100
                    </Form.Label>
                </InputGroup>
                <Button
                    className={'mx-1'}
                    onClick={() => setToggleFilterModal(true)}
                >{t('Filter')}</Button>
                <Button
                    className={'mx-1'}
                    onClick={() => setToggleBarcodeModal(true)}>
                        <FaBarcode />
                </Button>
            </Form.Group>
            <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height modal-styled-bg pt-0'>
                {filteredCategories.length === 0 && searchValue && (
                    <div className="w-100">
                        {renderCategory(t('OTHER'))}
                        <RenderProduct
                            item={{
                                _id: null,
                                name: searchValue,
                                category: 'OTHER',
                                units: customProductsUnits,
                            }}
                        />
                    </div>
                )}
                {filteredCategories.map((item: any) => renderCategory(item))}
            </Modal.Body>
            <Modal.Footer className='empty-footer modal-styled-bg'/>
            {toggleFilterModal && <FilterModal
                isVisible={toggleFilterModal}
                onClose={() => setToggleFilterModal(false)}
                onSelectCategory={filterByCategory}
                filteredCats={selectedCategories}
                categories={allProducts.map(prod => prod.category).filter(onlyUnique)}
            />}
            {setToggleBarcodeModal && <BarcodeModal
                isVisible={toggleBarcodeModal}
                onClose={() => setToggleBarcodeModal(false)}
            />}
        </Modal>, document.body);
};

const mapStateToProps = (state) => ({
    list: state.items.list,
    allProducts: state.items.allProducts,
});

const mapDispatchToProps = {
    addProductToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
