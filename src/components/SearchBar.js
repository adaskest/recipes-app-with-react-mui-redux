import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Rating, TextField, Toolbar, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {filtered, resetFilter} from "../features/recipes";
import {searchBar, setShowFilter} from "../features/pages";

const SearchBar = () => {

    const disp = useDispatch()
    const {recipes} = useSelector(state => state.recipes.value)
    const [rating, setRating] = useState(0);
    const ingrRef = useRef()
    const ingrNumRef = useRef()
    const timeRef = useRef()
    const reviewsRef = useRef()
    let filterArr = recipes

    useEffect(() => {
        disp(resetFilter())
    }, [])

    function searchFunc() {
        if (ingrRef.current.value.length > 0) {
            filterArr = filterArr.filter(x => x.ingr.includes(ingrRef.current.value)
            )
        }
        if (ingrNumRef.current.value.length > 0) {
            filterArr = filterArr.filter(x => x.ingr.length === Number(ingrNumRef.current.value))
        }
        if (timeRef.current.value.length > 0) {
            filterArr = filterArr.filter(x => x.time === timeRef.current.value)
        }
        if (reviewsRef.current.value.length > 0) {
            filterArr = filterArr.filter(x => x.reviews.length >= Number(reviewsRef.current.value))
        }
        filterArr = filterArr.filter(x => x.rating >= rating)
        disp(filtered(filterArr))
        disp(searchBar())
        disp(setShowFilter(true))
    }


    return (<Toolbar style={{backgroundColor: '#ffffe6'}}>
        <Box
            paddingBottom={3}
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-textarea"
                    label="Ingredient"
                    multiline
                    placeholder={'Milk'}
                    inputRef={ingrRef}
                />
                <TextField
                    id="outlined-number"
                    label="Number of ingredients"
                    type="number"
                    multiline
                    placeholder={'2'}
                    inputRef={ingrNumRef}
                />
                <TextField
                    id="outlined-number"
                    label="Preparation time"
                    type="number"
                    multiline
                    placeholder={'30 (minutes)'}
                    inputRef={timeRef}
                />
                <TextField
                    id="outlined-number"
                    label="Amount of reviews"
                    type="number"
                    placeholder={'1'}
                    multiline
                    inputRef={reviewsRef}
                />
                <div className={'d-flex'}>
                    <Box sx={{width: 500}}>
                        <Typography id="input-slider" gutterBottom color={'black'}>
                            Rating
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </Box>
                    <Button onClick={searchFunc} variant="contained" color={'success'} style={{marginLeft: '20px'}}>
                        Search
                    </Button>

                </div>
            </div>
        </Box>
    </Toolbar>);
};

export default SearchBar;