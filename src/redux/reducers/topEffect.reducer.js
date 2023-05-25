const topEffect = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOP_EFFECT':
            return action.payload;
        default:
            return state;
    }
};


export default  topEffect;