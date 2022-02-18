import React from 'react';
import {AppBar, Button, IconButton, Toolbar} from "@mui/material";
import {useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {setShowFilter, searchBar} from "../features/pages";

const Header = () => {

    const disp = useDispatch()
    const page = useSelector(state => state.page.value)
    const nav = useNavigate()

    function goTo() {
        nav('/')
        disp(setShowFilter(false))
    }

    return (
        <AppBar position="static">
            <Toolbar style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                {page.pages !== 'main' &&
                    <Button onClick={goTo} variant="contained" color={'secondary'}>Main</Button>}
                {page.pages !== 'recipe' &&
                    <Button onClick={() => nav('/recipe')} variant="contained" color={'secondary'}>Create
                        Recipe</Button>}
                {page.pages !== 'favorites' &&
                    <Button onClick={() => nav('/favorites')} variant="contained"
                            color={'secondary'}>Favorites</Button>}
                {page.pages === 'main' ? <IconButton
                    size="large"
                    color="inherit"
                    sx={{mr: 4}}
                    onClick={() => disp(searchBar())}
                >
                    <SearchIcon/>
                </IconButton> : <div/>}
            </Toolbar>
            {!page.searchBar && <SearchBar/>}
        </AppBar>
    );
};

export default Header;