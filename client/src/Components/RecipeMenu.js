import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";

const Container = styled("div")({
  marginTop: "16px",
});

function RecipeMenu({ userInfo, setUserInfo }) {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [updatedData, setUpdatedData] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchIngredients = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://127.0.0.1:5000/inventories?recipe_id=${selectedItemId}`
  //       );
  //       const data = await response.json();
  //       const ingredients = data.map((inventory) => inventory.ingredient);
  //       setUpdatedData((prevData) => ({
  //         ...prevData,
  //         ingredients: ingredients,
  //       }));
  //     } catch (error) {
  //       console.log("Error occurred while fetching ingredients:", error);
  //     }
  //   };

  //   if (selectedItemId !== "") {
  //     fetchIngredients();
  //   }
  // }, [selectedItemId]);

  const handleDelete = async (recipeId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://127.0.0.1:5000/recipes/${recipeId}`,
        requestOptions
      );
      if (response.ok) {
        const updatedRecipes = userInfo.recipes.filter(
          (recipe) => recipe.id !== recipeId
        );
        const updatedIngredients = userInfo.recipes.ingredients.filter(
          (ingredient) => ingredient.recipe_id !== recipeId
        );
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          recipes: updatedRecipes,
          ingredients: updatedIngredients,
        }));
        console.log("Recipe deleted successfully!");
      } else {
        console.log("Error deleting recipe");
      }
    } catch (error) {
      console.log("Error occurred during deletion:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/recipes/${selectedItemId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
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
        console.log("Item updated!");
      } else {
        console.log("Error updating item");
      }
    } catch (error) {
      console.log("Error occurred during update:", error);
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

  return (
    <Container>
      <Typography variant="h1">Menu</Typography>
      <Grid container spacing={2}>
        {userInfo.recipes?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body1">{item.description}</Typography>
                <Typography variant="h6">Ingredients:</Typography>
                {userInfo.recipes.find((recipe) => recipe.id === item.id)
                  ?.ingredients.map((ingredient) => (
                    <div key={ingredient.id}>
                      <Typography>
                        {ingredient.par_level} {ingredient.name}
                      </Typography>
                      {/* <Typography>{ingredient.par_level}</Typography> */}
                    </div>
                  ))}
              </CardContent>
              <CardActions>
                <Button onClick={() => handleDelete(item.id)}>Remove</Button>
                {selectedItemId === item.id ? (
                  <div>
                    <TextField
                      type="text"
                      name="name"
                      value={updatedData.name || ""}
                      onChange={handleInputChange}
                      placeholder="Enter updated name"
                    />
                    <TextField
                      type="text"
                      name="description"
                      value={updatedData.description || ""}
                      onChange={handleInputChange}
                      placeholder="Enter updated description"
                    />
                    <Button onClick={handleUpdate}>Update</Button>
                  </div>
                ) : (
                  <Button onClick={() => handleUpdateButtonClick(item.id)}>
                    Update
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RecipeMenu;