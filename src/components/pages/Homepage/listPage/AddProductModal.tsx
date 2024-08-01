import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {Button, Modal, Form, InputGroup, Col} from "react-bootstrap";
import {addProductToList, findProductByBarcode, getAllProducts} from "../../../../actions/products";
import {connect, useSelector} from "react-redux";
import {IoMdAdd, IoMdSearch} from "react-icons/io";
import {Filter} from './filter';
import {ProductCategories} from "../../../../types/types";
import {FaBarcode} from "react-icons/fa";
import BarcodeScanner from "./barcodeScanner";

const AddProductModal = ({list, allProducts, getAllProducts, show, onHide, addProductToList, findProductByBarcode, productFromBarcode}) => {
    const [filteredItems, setFilteredItems] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([...ProductCategories]);
    const [searchValue, setSearchValue] = useState('');

    const [openCameraWindow, setOpenCameraWindow] = useState(false);
    const [code, setCode] = useState('');

    const handleDetected = (result) => {
        console.log("Barcode detected: " + result);
        setCode(result);
    };
    useEffect(() => {
        if (Object.keys(productFromBarcode).length) {
            setSearchValue(productFromBarcode.title);
        }
    },[productFromBarcode]);

    const closeScanner = () => {
        setOpenCameraWindow(false);
    }
    useEffect(()=> {
        if(code) {
            findProductByBarcode(code);
        }
    }, [code]);
    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [allProducts, searchValue, filteredCategories]);

    const onCloseHandler = () => {
        onHide();
        setTimeout(() => {
            setFilteredItems(allProducts);
            setSearchValue('');
        }, 500);
    }

    const addProduct = (item) => {
        const product = {
            name: item.name,
            category: item.category ?? "Other",
        };
        addProductToList(list._id, product);
    }

    const applyFilters = () => {
        let filtered = allProducts.filter(prod => {
            const matchesSearch = prod.name.toLowerCase().includes(searchValue.toLowerCase());
            const matchesCategory = filteredCategories.length === 0 || filteredCategories.includes(prod.category);
            return matchesSearch && matchesCategory;
        });
        setFilteredItems(filtered.length > 0 ? filtered : [{name: searchValue}]);
    }

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const filterByCategory = (data) => {
        setFilteredCategories(data);
    }

    const theme = useSelector(state => state.settings.theme);
    const buttonsVariant = theme === 'light' ? 'primary' : 'dark';

    return ReactDOM.createPortal(
        <Modal show={show} onHide={onCloseHandler} className='w-100'>
            <Modal.Header closeButton>
                <Modal.Title>Adding new Product to List</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex align-items-start flex-column modal-fixed-height'>
                <Form.Group as={Col}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            onChange={handleSearchChange}
                            value={searchValue}
                            placeholder="Search here.."
                        />
                        <InputGroup.Text>
                            <IoMdSearch />
                        </InputGroup.Text>
                    </InputGroup>
                    <Filter filterData={filterByCategory} />
                    <button onClick={()=> setOpenCameraWindow(!openCameraWindow)}>
                        <FaBarcode />
                    </button>
                    {openCameraWindow? <BarcodeScanner onDetected={handleDetected} onClose={closeScanner}/> : null}
                </Form.Group>
                {filteredItems.length ?
                    filteredItems.map(item => (
                        <div key={item._id} className='position-relative d-flex justify-content-center w-75 mx-auto my-1'>
                            <Button variant={buttonsVariant}
                                    className='rounded-pill w-100 d-flex justify-content-between align-items-center'
                                    onClick={() => addProduct(item)}>
                                <IoMdAdd className='position-absolute start-0 ms-3'>{item.name}</IoMdAdd>
                                <span className='m-auto'>{item.name}</span>
                                {item.category ? <span className='position-absolute end-0 me-5'>{item.category}</span> : null}
                            </Button>
                        </div>
                    )) :
                    <span>No Items</span>}
            </Modal.Body>
            <Modal.Footer />
        </Modal>, document.body);
};

const mapStateToProps = (state) => ({
    list: state.items.list,
    allProducts: state.items.allProducts,
    productFromBarcode: state.items.productFromBarcode
});

const mapDispatchToProps = {
    getAllProducts,
    addProductToList,
    findProductByBarcode,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
