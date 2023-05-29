const selectedProduct = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_DETAILS':
            return action.payload;
        default:
            return state;
    }
}


export default  selectedProduct;