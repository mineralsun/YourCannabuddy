import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
import { Typography, Rating, Button } from '@mui/material';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';



function Stash() {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(store => store.productList)
    const productType = useSelector(store => store.productType);
    const topEffect = useSelector(store => store.topEffect);
    const { id } = useParams();

    const navToForm = (event) => {
        history.push('/newproduct');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS' });
    }, [id]);

    const favStatus = (product) => {
        if (product.isFavorite === true) {
            return (<Favorite />)
        } else {
            return(<FavoriteBorder />)
        }
    }

    const editProduct = (event) => {
        history.push(`/editproduct/${id}`);
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
                                        <h5>{product.typeName}</h5>
                                        <Rating name="read-only" value={product.rating} readOnly />
                                        <p>{product.top_effect_name}</p>
                                        <p>{product.isFavorite}</p>
                                        <p>{favStatus(product)}</p>
                                        <p>{product.comments}</p>
                                        <Link to={`editproduct/${products.id}`}>Edit</Link>
                                        <Button
                                            variant='contained'
                                            onClick={editProduct}>
                                                Edit
                                        </Button>
                                    </div>

                                </Box>

                            )
                        })}
                    </Grid>
                )
            }
        </main>
    )
}

export default Stash;