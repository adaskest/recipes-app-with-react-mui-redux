import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    ImageList,
    ImageListItem,
    Rating,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addComm, addFavorites, removeFavorites} from "../features/recipes";
import {changePage, searchBar} from "../features/pages";
import {ArrowBackIos, ArrowForwardIos} from "@mui/icons-material";
import {createStyles, makeStyles} from '@mui/styles';
import {createTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) =>
    createStyles({
        nextIcon: {
            cursor: 'pointer',
            color: 'red',
            fontSize: '40px',
            position: 'absolute',
            top: '50%',
            right: '10px',
            zIndex: 2,
        },
        previewsIcon: {
            cursor: 'pointer',
            color: 'red',
            fontSize: '40px',
            position: 'absolute',
            top: '50%',
            left: '10px',
            zIndex: 2
        },
        img: {
            position: "absolute",
            height: 500,
            width: 700,
        },
        card: {
            backgroundColor: '#fff3e0',
            width: 1100,
            height: 'fit-content',
            margin: theme.spacing(2)
        },
        ImageList: {
            width: 700,
            height: 500,
            overflowX: 'hidden',
            overflowY: 'hidden',
            margin: theme.spacing(2)
        },
        sliderContainer: {
            width: '90%',
            padding: theme.spacing(2),
        },
        box: {
            width: 250
        },
        text: {
            width: '50%',
            marginRight: theme.spacing(2)
        },
        sliderBox: {
            width: 200,
            marginRight: theme.spacing(3),
        },
        reviews: {
            width: '90%',
            padding: theme.spacing(1, 4),
            margin: '10px auto',
            backgroundColor: '#ff9100',
            borderRadius: 10,
            border: 2
        }
    }),
);

const theme = createTheme();


const RecipeC = () => {

    const classes = useStyles();
    const disp = useDispatch()
    const searchModal = useSelector(state => state.page.value)
    const {recipes} = useSelector(state => state.recipes.value)
    const {favorites} = useSelector(state => state.recipes.value)
    const [num, setNum] = useState(0)
    const [ratings, setRatings] = useState(0)
    const commentRef = useRef()
    const {id} = useParams()

    useEffect(() => {
        disp(changePage(''))
        if (!searchModal.searchBar) disp(searchBar())
    }, [])

    const oneRecipe = recipes[id]

    function nextPhoto() {
        (num === -(oneRecipe.photo.length - 1)) ? setNum(0) : setNum(num - 1)
    }

    function previewsPhoto() {
        (num === 0) ? setNum(-oneRecipe.photo.length + 1) : setNum(num + 1)
    }

    function addComment() {
        disp(addComm({
            id: oneRecipe.id,
            ratings: ratings,
            review: commentRef.current.value,
        }))
        setRatings(0)
        commentRef.current.value = ''
    }

    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.card}>
                <div className={'d-flex'}>
                    <div>
                        <ImageList className={classes.ImageList} cols={1} gap={8}>
                            <ImageListItem>
                                <ArrowForwardIos className={classes.nextIcon} onClick={nextPhoto}/>
                                {oneRecipe.photo.map((x, i) =>
                                    <img key={i} className={classes.img}
                                         style={{left: 700 * (i + num)}}
                                         src={x}
                                         alt={i}
                                         loading="lazy"
                                    />)}
                                <ArrowBackIos className={classes.previewsIcon} onClick={previewsPhoto}/>
                            </ImageListItem>
                        </ImageList>
                        <Container className={classes.sliderContainer}>
                            <div className={'d-flex'}>
                                <TextField className={classes.text}
                                           inputRef={commentRef}
                                           id="outlined-textarea"
                                           label="Add Comment"
                                           placeholder="I like this dish."
                                           multiline
                                />
                                <Box className={classes.sliderBox}>
                                    <Typography component="legend">Add rating</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={ratings}
                                        onChange={(event, newValue) => {
                                            setRatings(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <div className={'d-flex'}>
                                <Button onClick={addComment} sx={{marginRight: 2, marginTop: 5}} variant={"contained"}>Add Comment</Button>
                                {!favorites.includes(oneRecipe) ?
                                    <Button sx={{marginTop: 5}} onClick={() => disp(addFavorites(oneRecipe))} variant={'contained'}
                                            size="small">Add to favorites</Button> :
                                    <Button sx={{marginTop: 5}} onClick={() => disp(removeFavorites(oneRecipe))} variant={'contained'}
                                            size="small">Remove from favorites</Button>}
                            </div>
                        </Container>
                        <Container sx={{flexDirection: 'column'}}>
                            {oneRecipe.reviews.map((review, i) => <Box key={i} className={classes.reviews}>
                                <Rating
                                    sx={{marginLeft: '20px'}}
                                    name="simple-controlled"
                                    value={oneRecipe.ratings[i]}
                                />
                                <Typography gutterBottom variant="body1" component="div">
                                    Review: {review}
                                </Typography>
                            </Box>)}
                        </Container>
                    </div>
                    <Box className={classes.box}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                                {oneRecipe.title} ({oneRecipe.rating})
                                <Rating
                                    sx={{marginLeft: '20px'}}
                                    name="simple-controlled"
                                    value={oneRecipe.rating}
                                    disabled
                                />
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                Preparation time: {oneRecipe.time}min
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Ingredients: {oneRecipe.ingr.map((ingr, i) =>
                                <Typography key={i} gutterBottom variant="subtitle2" component="li">
                                    {ingr}
                                </Typography>)}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Preperation steps: {oneRecipe.step.map((step, i) =>
                                <Typography key={i} gutterBottom variant="subtitle2" component="li">
                                    {step}
                                </Typography>)}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                Reviews: {oneRecipe.reviews.length}
                            </Typography>
                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Box>
                </div>
            </Card>
        </ThemeProvider>
    );
};

export default RecipeC;