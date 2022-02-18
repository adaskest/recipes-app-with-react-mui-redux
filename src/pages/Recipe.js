import React, {useEffect} from 'react';
import CreateRecipe from "../components/CreateRecipe";
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../features/pages";
import {searchBar} from "../features/pages";

const Recipe = () => {

    const disp = useDispatch()
    const searchModal = useSelector(state => state.page.value)

    useEffect(() => {
        disp(changePage('recipe'))
        if (!searchModal.searchBar) disp(searchBar())
    }, [])

    return (
        <div>
            <CreateRecipe/>
        </div>
    );
};

export default Recipe;