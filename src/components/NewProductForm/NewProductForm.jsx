import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Typography, Rating, Button, Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import axios from 'axios';

function NewProductForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();


    const [newProduct, setNewProduct] = useState({
        product_name: '',
        brand_name: '',
        product_id: 0,
        rating: 0,
        comments: '',
        top_effect_id: 0,
        isFavorite: (false)
    });

    useEffect(() => {
        if (id) {
            axios.get(`/api/products/${id}`).then((response) => {
                console.log(response.data);
                const newProduct = response.data;
                setNewProduct(newProduct, newProduct.product_name, newProduct.brand_name, newProduct.product_id, newProduct.rating, newProduct.comments, newProduct.top_effect_id, newProduct.isFavorite)
            }).catch((error) => {
                console.log(error)
                alert('something went wrong!')
            });
        }
    }, [id]);

    const handleChangeFor = (key, value) => {
        console.log('event happened', newProduct.isFavorite);
        setNewProduct({ ...newProduct, [key]: value });
    }

    const submitButton = () => {
        if (id) {
           return 'Save'
        } else {
           return 'Add to your stash!'
        }
    }

    const submitNewProduct = (e) => {
        e.preventDefault();
        if (id) {
            dispatch({ type: 'EDIT_PRODUCT', payload: { newProduct, id, }, history });
            console.log(newProduct)
        } else {
            dispatch({ type: 'ADD_PRODUCT', payload: { newProduct }, history });
        }
    }

    return (
        <div>
            <h1>{id ? `EDITING ${newProduct.product_name} by ${newProduct.brand_name} ` : `NEW PRODUCT:`}</h1>
            {/* <pre>{JSON.stringify(newProduct)}</pre> */}
            <form onSubmit={submitNewProduct}>
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
                <label htmlFor="productType">Product Type</label> <br />
                {/* TODO GET request for product type and map over */}
                <select
                    name="productType"
                    id="productType"
                    value={newProduct.product_id}
                    onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                    <option
                        name="Select a type of Product!">
                        Select a Product Type!
                    </option>
                    <option
                        name="Flower"
                        value={1}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Flower
                    </option>
                    <option
                        name="Pre-Rolls"
                        value={2}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Pre-Rolls
                    </option>
                    <option
                        name="Edibles"
                        value={3}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Edibles
                    </option>
                    <option
                        name="Vaporizers"
                        value={4}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Vaporizers
                    </option>
                    <option
                        name="Concentrates"
                        value={5}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Concentrates
                    </option>
                    <option
                        name="Topicals"
                        value={6}
                        onChange={(event) => handleChangeFor('product_id', event.target.value)}>
                        Topicals
                    </option>
                    <option
                        name="Tinctures"
                        value={7}
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
                    value={Number(newProduct.rating)}
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
                <label htmlFor="topEffect">Top Effect:</label> <span />
                <select
                    name="topEffect"
                    id="topEffect"
                    value={newProduct.top_effect_id}
                    onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                    <option
                        name="Please Select a Top Effect">
                        Select a Top Effect!
                    </option>
                    <option
                        name="Calm"
                        value={1}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Calm
                    </option>
                    <option
                        name="Pain-Releaf"
                        value={2}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Pain-Relief
                    </option>
                    <option
                        name="Clear-Mind"
                        value={3}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Clear-Mind
                    </option>
                    <option
                        name="Creative"
                        value={4}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Creative
                    </option>
                    <option
                        name="Energetic"
                        value={5}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Energetic
                    </option>
                    <option
                        name="Focused"
                        value={6}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Focused
                    </option>
                    <option
                        name="Happy"
                        value={7}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Happy
                    </option>
                    <option
                        name="Inspired"
                        value={8}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Inspired
                    </option>
                    <option
                        name="Relaxed"
                        value={9}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Relaxed
                    </option>
                    <option
                        name="Sleepy"
                        value={10}
                        onChange={(event) => handleChangeFor('top_effect_id', event.target.value)}>
                        Sleepy
                    </option>
                </select>
                <br />
                <Checkbox
                    // label={newProduct.isFavorite}
                    icon={<FavoriteBorder bool="false" defaultChecked={false} />}
                    checkedIcon={<Favorite bool="true" checked={true} />}
                    onChange={(event) => handleChangeFor('isFavorite', event.target.checked)}
                    inputProps={{'isFavorite': 'controlled'}}
                />
                <Button
                    variant='contained'
                    onClick={submitNewProduct}>
                    {submitButton()}
                </Button>
            </form>
        </div>
    )
}

export default NewProductForm;