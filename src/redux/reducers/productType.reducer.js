const productType = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCT_TYPE':
            return action.payload;
        default:
            return state;
    }
};


export default  productType;