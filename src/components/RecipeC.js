import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Rating, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addFavorites, removeFavorites} from "../features/recipes";
import {useNavigate} from "react-router-dom";

const RecipeC = ({recipe, index}) => {

    const nav = useNavigate()
    const disp = useDispatch()
    const {favorites} = useSelector(state => state.recipes.value)
    const {filter} = useSelector(state => state.recipes.value)

    function goTo() {
        nav('/one-recipe/' + recipe.id)
    }

    return (
        <Card id={index} sx={{minWidth: 300, m: 2, backgroundColor: '#fff3e0'}}>
            <CardMedia
                component="img"
                alt=""
                height="200"
                image={recipe.photo[0]}
            />
            <CardContent onClick={goTo}>
                <Typography gutterBottom variant="h5" component="div">
                    Title: {recipe.title}
                    <Typography variant={"caption"}> ({recipe.rating}) </Typography>
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                    <div>
                        < Rating
                            sx={{marginLeft: '20px'}}
                            name="simple-controlled"
                            value={recipe.rating}
                            disabled
                        /></div>

                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Ingredients: {recipe.ingr.length}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Preparation time: {recipe.time}min
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Preperation steps: {recipe.step.length}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    Reviews: {recipe.reviews.length}
                </Typography>
            </CardContent>
            <CardActions>
                {!favorites.includes(recipe) ?
                    <Button onClick={() => disp(addFavorites(recipe))} variant={'contained'} size="small">Add to
                        favorites</Button> :
                    <Button onClick={() => disp(removeFavorites(recipe))} variant={'contained'} size="small">Remove from
                        favorites</Button>}
            </CardActions>
        </Card>
    );
};

export default RecipeC;