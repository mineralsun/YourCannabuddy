import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Rating } from '@mui/material';
import { Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

function NewProductForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const navToStash = (event) => {
        history.push('/stash')
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS' });
    }, []);

    const [newProduct, setNewProduct] = useState({
        productName: '',
        brandName: '',
        product_id: 0,
        rating: 0,
        comments: '',
        top_effect_id: 0,
        isFavorite: 'FALSE'
    });

    const handleChangeFor = (key, value) => {
        console.log('event happened');
        setNewProduct({ ...newProduct, [key]: value });
    }

    const addProduct = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
        setNewProduct({
            id: newProduct.id + 1,
            product_name: '',
            brand_name: '',
            product_id: 0,
            rating: 0,
            comments: '',
            top_effect_id: 0,
            isFavorite: 'FALSE'
        });
    }

    return (
        <div>
            <h3>NEW PRODUCT:</h3>
            <pre>{JSON.stringify(newProduct)}</pre>
            <form onSubmit={addProduct}>
                <input
                    type='text'
                    value={newProduct.product_name}
                    placeholder='Product Name'
                    onChange={(event) => handleChangeFor('product_name', event.target.value)}
                />
                <br />
                <input
                    type='text'
                    value={newProduct.brand_name}
                    placeholder='Brand Name'
                    onChange={(event) => handleChangeFor('brand_name', event.target.value)}
                />
                <br />
                <label for="productType">Product Type:</label> <span />
                <select name="productType" id="productType">
                    <option
                        name="Select an type of Product!">
                            Select a Product Type!
                    </option>
                    <option
                        name="Flower"
                        value={newProduct.product_id[1]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Flower
                    </option>
                    <option
                        name="Pre-Rolls"
                        value={newProduct.product_id[2]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Pre-Rolls
                    </option>
                    <option
                        name="Edibles"
                        value={newProduct.product_id[3]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Edibles
                    </option>
                    <option
                        name="Vaporizers"
                        value={newProduct.product_id[4]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Vaporizers
                    </option>
                    <option
                        name="Concentrates"
                        value={newProduct.product_id[5]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Concentrates
                    </option>
                    <option
                        name="Topicals"
                        value={newProduct.product_id[6]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Topicals
                    </option>
                    <option
                        name="Tinctures"
                        value={newProduct.product_id[7]}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Tinctures
                    </option>
                </select>
                <br />
                <Typography component="legend">
                    Rate your product!
                </Typography>
                <Rating
                    name="product rating"
                    value={newProduct.rating}
                    onChange={(event) => handleChangeFor('rating', event.target.value)}
                />
                <br />
                <textarea
                    type='text'
                    value={newProduct.comments}
                    placeholder='Additional Comments'
                    cols="50"
                    rows="10"
                    onChange={(event) => handleChangeFor('comments', event.target.value)}
                />
                <br />
                {/* MAKE SURE TO REPLACE THIS WITH PICTURE ROUTES AT ONE POINT */}
                <label for="topEffect">Top Effect:</label> <span />
                <select name="topEffect" id="topEffect">
                    <option
                        name="Please Select a Top Effect">
                            Select a Top Effect!
                    </option>
                    <option
                        name="Calm"
                        value={newProduct.top_effect_id[1]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Calm
                    </option>
                    <option
                        name="Pain-Releaf"
                        value={newProduct.top_effect_id[2]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Pain-Relief
                    </option>
                    <option
                        name="Clear-Mind"
                        value={newProduct.top_effect_id[3]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Clear-Mind
                    </option>
                    <option
                        name="Creative"
                        value={newProduct.top_effect_id[4]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Creative
                    </option>
                    <option
                        name="Energetic"
                        value={newProduct.top_effect_id[5]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Energetic
                    </option>
                    <option
                        name="Focused"
                        value={newProduct.top_effect_id[6]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Focused
                    </option>
                    <option
                        name="Happy"
                        value={newProduct.top_effect_id[7]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Happy
                    </option>
                    <option
                        name="Inspired"
                        value={newProduct.top_effect_id[8]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Inspired
                    </option>
                    <option
                        name="Relaxed"
                        value={newProduct.top_effect_id[9]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Relaxed
                    </option>
                    <option
                        name="Sleepy"
                        value={newProduct.top_effect_id[10]}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Sleepy
                    </option>
                </select>
                <br />
                <Checkbox
                    label={newProduct.isFavorite}
                    icon={<FavoriteBorder defaultChecked />}
                    checkedIcon={<Favorite />}
                    onChange={(event) => handleChangeFor('isFavorite', event.target.value)}
                />
                <input
                    value="Add that shit!"
                    type='submit'
                    onClick={navToStash}
                />
            </form>
        </div>
    )
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

export default NewProductForm;