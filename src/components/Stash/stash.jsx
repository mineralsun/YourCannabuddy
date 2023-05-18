import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
import { Typography, Rating, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';



function Stash() {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(store => store.productList)

    const navToForm = (event) => {
        history.push('/newproduct');
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_PRODUCTS' });
    }, []);


    return (
        <main>
            <h1 className="stash-title">Your Stash!</h1>
            <Button
                variant="contained"
                onClick={navToForm}>
                Add New Product:
            </Button>
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
                        <div key={product.id} >
                            <h1>{product.product_name}</h1>
                            <h3>{product.brand_name}</h3>
                            {/* This below should reflect name, refer to movies saga */}
                            <h5>{product.product_id}</h5>
                            <Rating name="read-only" value={product.rating} readOnly />
                            <p>{product.top_efffect_id}</p>
                            <p>{product.isFavorite}</p>
                            <body>{product.comments}</body>
                        </div>
                        </Box>

                    )
                })}
            </Grid>
        </main>
    )
}

export default Stash;