import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Recipe from "./pages/Recipe";
import OneRecipe from "./components/OneRecipe";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
const theme = createTheme();
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header/>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/recipe' element={<Recipe/>}/>
                    <Route path='/one-recipe/:id' element={<OneRecipe/>}/>
                    <Route path='/favorites' element={<Favorites/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
