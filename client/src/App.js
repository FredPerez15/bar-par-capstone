import './App.css';
import { useState } from 'react';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Logout from './Components/Logout';
import { Routes, Route } from "react-router-dom";
// import Navbar from './Components/NavBar';
import Ingredients from './Components/Ingredients';
// import { useAuth0 } from "@auth0/auth0-react";
import Recipes from './Components/Recipes';
import Home from './Components/Home';
import RecipeMenu from './Components/RecipeMenu';



function App() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    ingredients: [],
    inventories: [],
  })
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <div className="App">
        <Profile setUserInfo={setUserInfo} />
        <button><Login/></button>
        <button><Logout/></button>
        <Routes>
          <Route path='/recipe_menu' element={<RecipeMenu userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/ingredients' element={<Ingredients userInfo={userInfo} setUserInfo={setUserInfo} addIngredient={addIngredient} setIngredients={setIngredients} />}/>
          <Route path='/recipes' element={<Recipes ingredients={ingredients} userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
    </div>
  );
}

export default App;
