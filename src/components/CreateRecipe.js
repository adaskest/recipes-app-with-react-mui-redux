import React, {useRef, useState} from 'react';
import {Box, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addRecipes} from "../features/recipes";
import {useNavigate} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

let recipe = {
    photo: [],
    title: '',
    ingr: [],
    time: 0,
    step: [],
    ratings: [],
    reviews: [],
    rating: 0,
    id: 0
}

const CreateRecipe = () => {

    const {recipes} = useSelector(state => state.recipes.value)
    const disp = useDispatch()
    const nav = useNavigate()
    const [error, setError] = useState('')
    const [some, setSome] = useState(true)
    const photoRef = useRef()
    const titleRef = useRef()
    const ingrRef = useRef()
    const timeRef = useRef()
    const stepRef = useRef()

    function addPhoto() {
        (photoRef.current.value.includes('http')) ? recipe.photo.push(photoRef.current.value) : setError('Photo link should include \'http\'')
        photoRef.current.value = ''
        setSome(!some)
    }

    function addIngr() {
        recipe.ingr.push(ingrRef.current.value)
        ingrRef.current.value = ''
        setSome(!some)
    }

    function deleteIngr(index) {
        recipe.ingr = recipe.ingr.filter((x, i) => i !== index ? x : null)
        setSome(!some)
        return recipe.ingr
    }

    function addStep() {
        recipe.step.push(stepRef.current.value)
        stepRef.current.value = ''
        setSome(!some)
    }

    function deleteStep(index) {
        recipe.step = recipe.step.filter((x, i) => i !== index ? x : null)
        setSome(!some)
        return recipe.step
    }

    function checkValues() {
        if (recipe.photo.length < 2) return setError(`Photos added: ${recipe.photo.length}. Add photos.`)
        if (!titleRef.current.value) return setError('Add title.')
        if (recipe.ingr.length < 2) return setError(`Ingredients added: ${recipe.ingr.length}. Add ingredients.`)
        if (!timeRef.current.value) return setError('Add preparation time.')
        if (recipe.step.length === 0) return setError('Add preparation steps.')
        addRecipe()
    }

    function addRecipe() {
        recipe.title = titleRef.current.value
        recipe.time = timeRef.current.value
        recipe.id = recipes.length
        disp(addRecipes(recipe))
        nav('/')
        recipe = {
            photo: [],
            title: '',
            ingr: [],
            time: 0,
            step: [],
            ratings: [],
            reviews: [],
            id: 0
        }
    }

    return (<Container maxWidth={"sm"}
                       sx={{textAlign: "center", backgroundColor: '#ffe6ea', padding: '20px', marginTop: '20px'}}>
        <Box sx={{p: 2, m: 3, border: '1px dashed grey'}}>
            <TextField inputRef={titleRef} onChange={() => setError('')} fullWidth margin={'normal'} label="Title"/>
            <TextField inputRef={timeRef} onChange={() => setError('')} fullWidth margin={'normal'} type={'number'}
                       label="Preparation time (minutes)"/>
            <div>
                <TextField inputRef={photoRef} onChange={() => setError('')} fullWidth margin={'normal'}
                           label="Photo"
                           placeholder={'At least two photos'}/>
                <Button onClick={addPhoto} variant={'outlined'}>Add photo ({recipe.photo.length})</Button>
            </div>
            <div>
                <TextField inputRef={ingrRef} onChange={() => setError('')} fullWidth margin={'normal'}
                           label="Ingredients"
                           placeholder={`At least two`}/>
                <Button onClick={addIngr} variant={'outlined'}>Add ingredient</Button>
                <List>
                    {recipe.ingr.map((ingr, i) =>
                        <ListItem key={i} secondaryAction={<IconButton onClick={() => deleteIngr(i)} edge="end"
                                                                       aria-label="delete">
                            <DeleteIcon/> </IconButton>}>
                            <ListItemText
                                primary={ingr}
                            />
                        </ListItem>)}
                </List>
            </div>
            <div>
                <TextField inputRef={stepRef} onChange={() => setError('')} fullWidth margin={'normal'}
                           label="Preparation steps"/>
                <Button onClick={addStep} variant={'outlined'}>Add preperation step</Button>
                <List>
                    {recipe.step.map((step, i) =>
                        <ListItem key={i} secondaryAction={<IconButton onClick={() => deleteStep(i)} edge="end"
                                                                       aria-label="delete">
                            <DeleteIcon/> </IconButton>}>
                            <ListItemText primary={step}/>
                        </ListItem>)}
                </List>
            </div>
        </Box>
        <Button onClick={checkValues} variant={"outlined"}>Add recipe</Button>
        {error.length > 0 && <Typography variant={"body1"} marginBottom={2}>
            Error: {error}
        </Typography>}
        {some && <></>}
    </Container>);
};

export default CreateRecipe;