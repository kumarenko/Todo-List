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
const allCategories = allProducts.map(prod => prod.category).filter(onlyUnique);
const customProductsUnits = ['pcs', 'g', 'kg', 'oz', 'lb', 'ml', 'l', 'gal'];
const AddProductModal = ({show, onHide}) => {

    const [searchValue, setSearchValue] = useState('');
    const [toggleFilterModal, setToggleFilterModal] = useState(false);
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
        if (searchValue === '' && selectedCategories.length === 0) {
            setFilteredItems(allProducts);
            setFilteredCategories(allCategories);
            return;
        }

        let filtered = allProducts.filter(prod => {
            const matchesSearch = t(prod.name)
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(prod.category);
            return matchesSearch && matchesCategory;
        });

        setFilteredItems(filtered);

        const filteredProductsCats = allCategories.filter(category =>
            filtered.some(prod => prod.category === category),
        );

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

    const countSelectedProducts = (category: string) => {
        return filteredItems.filter((prod: any) => prod.category === category).length;
    };
    const removeCategoryToFilter = (cat) => {
        const updatedCategories = filteredCategories.filter((category) => category !== cat);
        filterByCategory(updatedCategories);
    };

    const renderCategory = (item: any) => {
        const isExpanded = expandedCategories.includes(item);
        const selectedProductsCount = countSelectedProducts(item);
        return (
            <div key={item} className='w-100'>
                <button onClick={() => toggleCategory(item)} className={'d-flex justify-content-between align-items-center w-100 section-styled-bg my-1 p-1 rounded'}>
                    <div>
                        {t(item)} <span>({selectedProductsCount})</span>
                    </div>
                    <IoMdArrowDropdown  style={{transform: `rotate(${isExpanded ? 180 : 0}deg)`}}/>
                </button>
                <div className='d-flex flex-column'>
                    {isExpanded && filteredItems.filter(product => product.category === item).map(prod => <RenderProduct item={prod} key={prod._id} />)}
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
            <Form.Group className='d-flex flex-row flex-nowrap py-3 modal-styled-bg'>
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
                    onClick={() => setToggleFilterModal(true)}
                >{t('Filter')}</Button>
            </Form.Group>
            <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height modal-styled-bg'>
                {filteredCategories.length === 0 && (
                    <RenderProduct
                        item={{_id: null, name: searchValue, category: t('OTHER'), units: customProductsUnits}}
                    />
                )}
                {filteredCategories.map((item:any) => renderCategory(item))}
            </Modal.Body>
            <Modal.Footer className='empty-footer modal-styled-bg'/>
            {toggleFilterModal && <FilterModal
                isVisible={toggleFilterModal}
                onClose={() => setToggleFilterModal(false)}
                onSelectCategory={filterByCategory}
                filteredCats={selectedCategories}
                categories={allProducts.map(prod => prod.category).filter(onlyUnique)}
            />}
        </Modal>, document.body);
};

const mapStateToProps = (state) => ({
    list: state.items.list,
    allProducts: state.items.allProducts,
    productFromBarcode: state.items.productFromBarcode
});

const mapDispatchToProps = {
    addProductToList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
