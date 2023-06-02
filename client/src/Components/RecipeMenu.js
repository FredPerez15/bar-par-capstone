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

const CardContainer = styled(Card)({
  height: "100%",
});

const CardContentWrapper = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});


function RecipeMenu({ userInfo, setUserInfo }) {
  const [selectedItemId, setSelectedItemId] = useState("");
  const [updatedData, setUpdatedData] = useState({});
  const [showForm, setShowForm] = useState(false); // State variable for controlling form visibility
  const navigate = useNavigate();

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
        const updatedIngredients = userInfo.recipes?.ingredients?.filter(
          (ingredient) => ingredient.recipe_id !== recipeId
        );
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          recipes: updatedRecipes,
          ingredients: updatedIngredients,
        }));
        console.log("Recipe deleted successfully!");
        window.location.reload(); // Refresh the page
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
        setShowForm(false); // Hide the form after successful update
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
    setShowForm(true); // Show the form when Update button is clicked
  };

  const handleInventoryUpdate = async (recipeId) => {
    try {
      const inventoryData = {
        recipe_id: recipeId,
      };
  
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventoryData),
      };
  
      const response = await fetch(`http://127.0.0.1:5000/inventories/${recipeId}`, requestOptions);
      if (response.ok) {
        const updatedInventory = await response.json();
        console.log(updatedInventory)
  
        // Subtract the par level amount from the quantity
        const updatedQuantity = updatedInventory.quantity - 2;
        console.log(updatedInventory.quantity)
  
        // Update the inventory quantity in the user info state
        const updatedInventories = userInfo.inventories?.map((inventory) => {
          if (inventory.recipe_id === recipeId) {
            return {
              ...inventory,
              quantity: updatedQuantity,
            };
          }
          return inventory;
        });
  
        // Update the user info state with the updated inventories
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          inventories: updatedInventories,
        }));
  
        if (updatedQuantity <= 3) {
          // Show alert if quantity is 3 or below
          alert(`Low on ingredients for recipe: ${updatedInventory.recipe_id === userInfo.recipes.id}`);
        }
        console.log(userInfo.recipes.id)
  
        console.log('Inventory updated successfully!');
      } else {
        console.log('Error updating inventory');
      }
    } catch (error) {
      console.log('Error occurred during inventory update:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" fontFamily="fantasy" fontWeight="bolder">
        Menu
      </Typography>
      <Grid container spacing={2}>
        {userInfo.recipes?.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <CardContainer>
              <CardContentWrapper>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="body1">{item.description}</Typography>
                <Typography variant="h6">Ingredients:</Typography>
                {userInfo.recipes.find((recipe) => recipe.id === item.id)
                  ?.ingredients.map((ingredient) => (
                    <div key={ingredient.id}>
                      <Typography>
                        {ingredient.par_level} {ingredient.name}
                      </Typography>
                    </div>
                  ))}
              </CardContentWrapper>
              <CardActions>
                <Button onClick={() => handleInventoryUpdate(item.id)}>
                  Update Inventory
                </Button>
                <Button onClick={() => handleDelete(item.id)}>Remove</Button>
                {selectedItemId === item.id && showForm ? (
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
            </CardContainer>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


export default RecipeMenu;
