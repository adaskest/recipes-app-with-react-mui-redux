import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../features/pages";
import {searchBar} from "../features/pages";
import RecipeC from "../components/RecipeC";

const Favorites = () => {

    const disp = useDispatch()
    const searchModal = useSelector(state => state.page.value)
    const {favorites} = useSelector(state => state.recipes.value)

    useEffect(() => {
        disp(changePage('favorites'))
        if (!searchModal.searchBar) disp(searchBar())
    }, [])

    return (
        <div className={'d-flex wrap'}>
            {favorites.map((x,i) => <RecipeC key={i} recipe={x} index={i}/>)}
        </div>
    );
};

export default Favorites;