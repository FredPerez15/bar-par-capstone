import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RecipeMenu({ userInfo, setUserInfo }) {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  const handleDelete = async (recipeId) => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(`http://127.0.0.1:5000/recipes/${recipeId}`, requestOptions);
      if (response.ok) {
        const updatedRecipes = userInfo.recipes.filter((recipe) => recipe.id !== recipeId);
        const updatedIngredients = userInfo.ingredients.filter((ingredient) => ingredient.recipe_id !== recipeId);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          recipes: updatedRecipes,
          ingredients: updatedIngredients,
        }));
        console.log('Recipe deleted successfully!');
      } else {
        console.log('Error deleting recipe');
      }
    } catch (error) {
      console.log('Error occurred during deletion:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/recipes/${selectedItemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedItems = userInfo.recipes.map((item) => {
          if (item.id === selectedItemId) {
            return { ...item, ...updatedData };
          }
          return item;
        });
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          recipes: updatedItems,
        }));
        console.log('Item updated!');
      } else {
        console.log('Error updating item');
      }
    } catch (error) {
      console.log('Error occurred during update:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateButtonClick = (itemId) => {
    setSelectedItemId(itemId);
    setUpdatedData({});
  };

  if (!userInfo || !userInfo.recipes || !userInfo.ingredients) {
    return null; // Render null or a loading indicator while waiting for data
  }


  return (
    <div>
      <h1>Menu</h1>
      {userInfo.recipes?.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.description}</p>
          <h4>Ingredients:</h4>
          {userInfo.recipes.ingredients
            .filter((ingredient) => ingredient.recipe_id === item.id)
            .map((ingredient) => (
              <p key={ingredient.id}>{ingredient.name}</p>
            ))}
          <button onClick={() => handleDelete(item.id)}>Remove</button>
          {selectedItemId === item.id ? (
            <div>
              <input
                type="text"
                name="name"
                value={updatedData.name || ''}
                onChange={handleInputChange}
                placeholder="Enter updated name"
              />
              <input
                type="text"
                name="description"
                value={updatedData.description || ''}
                onChange={handleInputChange}
                placeholder="Enter updated description"
              />
              <button onClick={handleUpdate}>Update</button>
            </div>
          ) : (
            <button onClick={() => handleUpdateButtonClick(item.id)}>Update</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecipeMenu;