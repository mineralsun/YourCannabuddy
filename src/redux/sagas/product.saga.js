import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProducts() {
    try {
        const products = yield axios.get('/api/products');
        yield put({ type: 'SET_PRODUCTS', payload: products.data });
    } catch (error) {
        console.log(`Error in fetchProducts: ${error}`);
        alert('Something went wrong!');
    }
}

function* fetchProductTypes() {
    try {
        const productTypes = yield axios.get('/api/productTypes');
        yield put({ type: 'SET_PRODUCT_TYPES', payload: productTypes.data });
    } catch (error) {
        console.log(`Error in fetchProductTypes: ${error}`);
        alert('Something went wrong!');
    }
}

function* fetchSpecificProductTypes(action) {
    try {
        const specificType = yield axios.get(`/api/products/${action.payload}`)
        yield put({ type: 'SET_PRODUCT_DETAILS', payload: specificType.data});
    } catch (error) {
        console.log(error)
    }
}

function* fetchProductDetails(action) {
    try {
        const product = yield axios.get(`/api/products/${action.payload}`);
        yield put({ type: 'SET_PRODUCT_DETAILS', payload: product.data});
    } catch (error) {
        console.log(error);
    }
}

function* addProduct(action) {
    try {
        yield axios.post('/api/products', action.payload);
        // yield put({ type: 'FETCH_PRODUCTS' });
        // action.setNewProduct({});
        if (action.history) {
            action.history.push('/stash');
        }
    } catch (error) {
        console.log(`Error in postProduct`);
        alert('Something went wrong');
    }
}

function* editProduct(action) {
    try {
        yield axios.put(`/api/products/${action.payload.id}`, action.payload);
        if (action.history) {
            action.history.goBack();
        }
    } catch (error) {
        console.log(error)
    }
}

function* deleteProduct(action) {
    try {
        yield axios.delete(`/api/products/${action.payload}`);
        yield put({ type: 'FETCH_PRODUCTS'})
    } catch (error) {
        console.log(`Error in deleteProduct saga ${error}`, error);
    }
}

function* productSaga() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_PRODUCT', addProduct);
    yield takeEvery('EDIT_PRODUCT', editProduct);
    yield takeEvery('FETCH_PRODUCT_DETAILS', fetchProductDetails);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
    yield takeEvery('FETCH_PRODUCT_TYPES', fetchProductTypes);
    yield takeEvery('FETCH_SPECIFIC_PRODUCT_TYPES', fetchSpecificProductTypes)
}

export default productSaga;