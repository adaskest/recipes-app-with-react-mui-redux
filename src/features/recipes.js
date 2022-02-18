import {createSlice} from "@reduxjs/toolkit";

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        value: {
            recipes: [],
            favorites: [],
            filter: []
        }
    },
    reducers: {
        addRecipes: ({value}, {payload}) => {
            value.recipes.push(payload)
        },
        addFavorites: ({value}, {payload}) => {
            value.favorites.push(payload)
        },
        removeFavorites: ({value}, {payload}) => {
            value.favorites = value.favorites.filter(x => {
                if (x.title !== payload.title) return x
            })
        },
        addComm: ({value}, {payload}) => {
            value.recipes[payload.id].ratings.push(payload.ratings)
            value.recipes[payload.id].reviews.push(payload.review)
            let number = 0
            value.recipes[payload.id].ratings.map(x => number += Number(x))
            value.recipes[payload.id].rating =
                Math.round((number / value.recipes[payload.id].ratings.length) * 10) / 10
        },
        filtered: ({value}, {payload}) => {
            value.filter = payload
        },
        resetFilter: ({value}, {payload}) => {
            value.filter = []
        },
    }
})

export const {addRecipes, addFavorites, removeFavorites, addComm, filtered, resetFilter} = recipesSlice.actions

export default recipesSlice.reducer