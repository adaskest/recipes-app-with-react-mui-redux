import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../features/pages";
import RecipeC from "../components/RecipeC";

const Main = () => {

    const disp = useDispatch()
    const {recipes} = useSelector(state => state.recipes.value)
    const {filter} = useSelector(state => state.recipes.value)
    const {showFilter} = useSelector(state => state.page.value)

    useEffect(() => {
        (showFilter) ? disp(changePage('')) : disp(changePage('main'))
    }, [showFilter])

    return (
        <div className={'d-flex wrap'}>
            {!showFilter && recipes.map((recipe, i) => <RecipeC recipe={recipe} key={i} index={i}/>)}
            {showFilter && filter.map((recipe, i) => <RecipeC recipe={recipe} key={i} index={i}/>)}
        </div>
    );
};

export default Main;