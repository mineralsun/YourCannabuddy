import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { Typography, Rating, Button, IconButton } from '@mui/material';
import { useHistory, useParams, } from 'react-router-dom';
// import { Checkbox } from '@mui/material';
import {
    FavoriteBorder,
    Favorite,
    SpaRounded,
    LocalPharmacyRounded,
    BoltRounded,
    QueryStatsRounded,
    SentimentVerySatisfiedRounded,
    EmojiPeopleRounded,
    WeekendRounded,
    HotelRounded,
    SelfImprovementRounded,
    LightbulbRounded
} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';



function Stash() {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(store => store.productList)
    const { productId } = useParams();

    const navToForm = (event) => {
        history.push('/newproduct');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS' });
        // dispatch({ type: 'FETCH_PRODUCT_DETAILS', payload: productId });
    }, [productId]);

    const favStatus = (product) => {
        if (product.isFavorite === true) {
            return (<Favorite />)
        } else {
            return (<FavoriteBorder />)
        }
    }

    const effectStatus = (product) => {
        if (product.top_effect_id === 'Calm') {
            return (<SpaRounded />)
        } else if (product.top_effect_id === 'Pain-Relief') {
            return (<LocalPharmacyRounded />)
        } else if (product.top_effect_id === 'Clear-Mind') {
            return (<SelfImprovementRounded />)
        } else if (product.top_effect_id === 'Creative') {
            return (<LightbulbRounded />)
        } else if (product.top_effect_id === 'Energetic') {
            return (<BoltRounded />)
        } else if (product.top_effect_id === 'Focused') {
            return (<QueryStatsRounded />)
        } else if (product.top_effect_id === 'Happy') {
            return (<SentimentVerySatisfiedRounded />)
        } else if (product.top_effect_id === 'Inspired') {
            return (<EmojiPeopleRounded />)
        } else if (product.top_effect_id === 'Relaxed') {
            return (<WeekendRounded />)
        } else if (product.top_effect_id === 'Sleepy') {
            return (<HotelRounded />)
        }
    }

    const editProduct = (product) => {
        console.log(productId);
        history.push(`/editproduct/${product.id}`);
    }

    const deleteProduct = (id) => {
        console.log(id);
        dispatch({ type: 'DELETE_PRODUCT', payload: id })
    }

    return (
        <main>
            <h1 className="stash-title">Your Stash!</h1>
            <Button
                variant="contained"
                onClick={navToForm}>
                Add New Product:
            </Button>
            {
                products.length === 0 ? (
                    <div>
                        Time to try some weed and add your products!
                    </div>
                ) : (
                    <div>
                        <nav className="productTypeNav" style={{ textalign: 'center' }}>
                            <h4 className="productTypeHead" style={{ padding: '25px', top: '10px'}}>
                                Filter By Product Type:
                            </h4>
                        </nav>
                        <Grid
                            margin={0}
                            xs={2} md={2}
                            padding={2.7}
                            className="products"
                        >
                            {products.map(product => {
                                return (
                                    <Box
                                        border={2}
                                        padding={4}
                                        margin={1}
                                        borderColor={'black'}>
                                        <div key={products.id} >
                                            <h1>{product.product_name}</h1>
                                            <h3>{product.brand_name}</h3>
                                            <h5>{product.product_id}</h5>
                                            <Rating name="read-only" value={product.rating} readOnly />
                                            <h4>{effectStatus(product)} <br /> {product.top_effect_id}</h4>
                                            <p>{product.comments}</p>
                                            <p>{favStatus(product)}</p>
                                            <Button
                                                variant='contained'
                                                onClick={(event) => editProduct(product)}>
                                                Edit
                                            </Button>
                                            <IconButton>
                                                <DeleteIcon
                                                    onClick={(event) => deleteProduct(product.id)} />
                                            </IconButton>
                                        </div>

                                    </Box>

                                )
                            })}
                        </Grid>
                    </div>
                )
            }
        </main>
    )
}

export default Stash;