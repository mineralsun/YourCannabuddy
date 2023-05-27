import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchProducts() {
    try {
        const products = yield axios.get('/api/products');
        yield put({ type: 'SET_PRODUCTS', payload: products.data });
        const productType = yield axios.get('/api/products/type');
        yield put({ type: 'SET_PRODUCT_TYPE', payload: productType.data});
        const topEffect = yield axios.get('/api/products/effect');
        yield put({ type: 'SET_TOP_EFFECT', payload: topEffect.data});
    } catch (error) {
        console.log(`Error in fetchProducts: ${error}`);
        alert('Something went wrong!');
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

function* postProduct(action) {
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

function* fetchProductDetails(action) {
    try {
        const product = yield axios.get(`/api/products/${action.payload}`);
        yield put({ type: 'SET_PRODUCT_DETAILS', payload: product.data});
    } catch (error) {
        console.log(error);
    }
}

function* productSaga() {
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_PRODUCT', postProduct);
    yield takeEvery('EDIT_PRODUCT', editProduct);
    yield takeEvery('FETCH_PRODUCT_DETAILS', fetchProductDetails);
}

export default productSaga;