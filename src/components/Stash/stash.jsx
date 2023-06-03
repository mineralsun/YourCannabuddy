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
    const productTypes = useSelector(store => store.productTypes)
    const { productId } = useParams();

    const navToForm = (event) => {
        history.push('/newproduct');
    }

    

    let [productArray] = useState([]);
    

    const checkFilter = (product) => {
        console.log(product)
        console.log(productArray)
        productArray.push(product.product_id)
        return productArray[0];
    }
    
    const filteredProducts = productArray.filter(checkFilter);

    useEffect(() => {
        if (productArray.length > 1) {
            return filteredProducts;
        } else {
        dispatch({ type: 'FETCH_PRODUCTS' });
        dispatch({ type: 'FETCH_PRODUCT_TYPES'});
        // dispatch({ type: 'FETCH_SPECIFIC_PRODUCT_TYPES'});
        // dispatch({ type: 'FETCH_PRODUCT_DETAILS', payload: productId });
        }
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

    const filterByType = (product) => {
        console.log(product)
        console.log('In filterByType for productType')
        dispatch ({ type: 'FETCH_SPECIFIC_PRODUCT_TYPES', payload: product.id})
    }


    return (
        <main className="content">
            <h1 className="stash-title">Your Stash!</h1>
            <Button
                variant="contained"
                onClick={navToForm}>
                Add New Product:
            </Button>
            <span />
            <Button 
            variant="contained"
            onClick={() => checkFilter(filteredProducts)}>Filter</Button>
            {
                filteredProducts.map((product) => {
                    return (
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
                    )
                })
            }
            {
                products.length === 0 ? (
                    <>
                        <br />
                        <div>
                           <p>Time to try some weed and add your products!</p> 
                        </div>
                    </>
                ) : (
                    <div>
                        <nav className="productTypeNav" style={{ textalign: 'center' }}>
                            <h3 className="productTypeHead" style={{ padding: '25px', top: '10px' }}>
                                Filter By Product Type:
                            </h3>
                            <ul>
                                <l1 onClick={() => filterByType()}>Favorites</l1>
                            </ul>
                            {
                                productTypes.map((product) => {
                                    return (
                                        <ul className="productTypes">
                                            {/* <button onClick={() => filterByType(type)}>{type.typeName}</button> */}
                                            <l1 onClick={() => checkFilter(product)}>{product.typeName}</l1>
                                        </ul>
                                    )
                                })
                            }
                        </nav>
                        <Grid
                            container spacing={2}
                            marginLeft={20}
                            xs={4}
                            md={10}
                            padding={3}
                            className="products"
                        >
                            {products.map(product => {
                                return (
                                    <Box
                                        sx={{
                                         backgroundColor: 'secondary.main'  
                                        }}
                                        border={4}
                                        padding={0.75}
                                        
                                        margin={0.5}
                                        maxWidth={500}
                                        borderColor={'#676031'}>
                                        <div key={products.id} >
                                            <h1 id='product_name'>{product.product_name}</h1>
                                            <h3 id='brand_name'>{product.brand_name}</h3>
                                            <h5 id='product_id'>{product.product_id}</h5>
                                            <Rating id='product_rating' name="read-only" value={product.rating} readOnly />
                                            <h4 id='top_effect_id'>{effectStatus(product)} <br /> {product.top_effect_id}</h4>
                                            <p id='product_comments'>{product.comments}</p>
                                            <p id='product_isFavorite'>{favStatus(product)}</p>
                                            <Button
                                                id='edit_button'
                                                variant='contained'
                                                onClick={(event) => editProduct(product)}>
                                                Edit
                                            </Button>
                                            <IconButton>
                                                <DeleteIcon
                                                    id='delete_button'
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