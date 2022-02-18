import {createSlice} from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
    name: 'pages', initialState: {
        value: {
            pages: 'main',
            searchBar: true,
            showFilter: false
        }
    }, reducers: {
        changePage: ({value}, {payload}) => {
            value.pages = payload
        }, searchBar: ({value}, {payload}) => {
            value.searchBar = !value.searchBar
        }, setShowFilter: ({value}, {payload}) => {
            value.showFilter = payload
        }
    }
})

export const {changePage, searchBar, setShowFilter} = pagesSlice.actions

export default pagesSlice.reducer