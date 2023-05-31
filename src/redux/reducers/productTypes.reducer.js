const productTypes = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCT_TYPES':
            return action.payload;
        default:
            return state;
    }
};


export default  productTypes;