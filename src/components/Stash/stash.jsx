import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Stash() {
    const dispatch = useDispatch();
    const products = useSelector(store => store.productList)
    const [newProduct, setNewProduct] = useState({ 
        productName: '',
        brandName: '',
        product_id: 0,
        rating: 0,
        comments: '',
        top_effect_id: 0,
        isFavorite: 'FALSE'
    });

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS' });
    }, []);

    const handleChangeFor = (key, value) => {
        console.log('event happened');
        setNewProduct({...newProduct, [key]: value});
    }

    const addProduct = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        setNewProduct({ 
            id: newProduct.id +1, 
            productName: '',
            brandName: '',
            product_id: 0,
            rating: 0,
            comments: '',
            top_effect_id: 0,
            isFavorite: 'FALSE'
        });
    }

    // const addProduct = (event) => {
    //     event.preventDefault();
    //     dispatch({
    //         type: 'ADD_PRODUCT',
    //         payload: {
    //             product_name: newProduct.product_name,
    //             brand_name: newProduct.brand_name,
    //             product_id: newProduct.product_id,
    //             rating: newProduct.rating,
    //             comments: newProduct.comments,
    //             top_effect_id: newProduct.top_effect_id,
    //             isFavorite: newProduct.isFavorite
    //         },
    //         setNewProduct: setNewProduct
    //     });
    // }

    return (
        <div>
            <h3>NEW PRODUCT:</h3>
            <pre>{JSON.stringify(newProduct)}</pre>
            <form onSubmit={addProduct}>
                <input
                    type='text'
                    value={newProduct.productName}
                    placeholder='Product Name'
                    onChange={(event) => handleChangeFor('product_name', event.target.value)}
                />
            </form>
        
        </div>
    )
}

export default Stash;