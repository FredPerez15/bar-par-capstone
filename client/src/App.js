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
import logo from './Components/Bar-Par-logo.png'
import { useNavigate } from 'react-router-dom';




function App() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    ingredients: [],
    inventories: [],
  })
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = userInfo.email !== '';

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <div className="App">
      <Profile setUserInfo={setUserInfo} />
      <br />
        {!isAuthenticated && <button><Login/></button>}
        {isAuthenticated && <button><Logout/></button>}
      <br />
      <img src={logo} width={800} height={260} alt=' logo' />
        <Routes>
          <Route path='/recipe_menu' element={<RecipeMenu userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/ingredients' element={<Ingredients userInfo={userInfo} setUserInfo={setUserInfo} addIngredient={addIngredient} setIngredients={setIngredients} />}/>
          <Route path='/recipes' element={<Recipes ingredients={ingredients} userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/' element={<Home/>} />
        </Routes>
    </div>
  );
}

export default App;
