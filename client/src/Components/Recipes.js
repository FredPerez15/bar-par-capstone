import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Recipes({ userInfo, setUserInfo }) {
    const navigate = useNavigate();
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredients, setIngredients] = useState([]);
  
    useEffect(() => {
      const fetchIngredients = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/ingredients');
          const data = await response.json();
          setIngredients(data);
        } catch (error) {
          console.log('Error occurred while fetching ingredients:', error);
        }
      };
  
      fetchIngredients();
    }, []);
  
    const formik = useFormik({
      initialValues: {
        name: '',
        description: '',
        user_id: userInfo.id,
      },
      validationSchema: yup.object({
        name: yup.string().required('Must enter a name').max(150, 'Must be 150 chars max'),
        description: yup.string().required('Must enter a description').max(250, 'Must be 250 chars max'),
      }),
      onSubmit: async (values) => {
        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2),
          };
          const response = await fetch('http://127.0.0.1:5000/recipes', requestOptions);
          if (response.ok) {
            const createdRecipe = await response.json();
  
            // Create inventory instances for each selected ingredient and the current recipe
            const inventoryPromises = selectedIngredients.map(async (ingredientId) => {
              const inventoryData = {
                ingredient_id: ingredientId,
                recipe_id: createdRecipe.id,
                quantity: 1, // Provide the initial quantity
              };
              const inventoryResponse = await fetch('http://127.0.0.1:5000/inventories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inventoryData),
              });
              if (inventoryResponse.ok) {
                const createdInventory = await inventoryResponse.json();
                return createdInventory;
              } else {
                console.log('Error creating inventory instance');
                return null;
              }
            });
  
            Promise.all(inventoryPromises)
              .then((inventories) => {
                // Update the user info with the new recipe and inventories
                setUserInfo((prevUserInfo) => ({
                  ...prevUserInfo,
                  recipes: [...prevUserInfo.recipes, createdRecipe],
                  inventories: [...prevUserInfo.inventories, ...inventories.filter(Boolean)],
                }));
  
                console.log('Item created!');
                navigate('/recipe_menu');
              })
              .catch((error) => {
                console.log('Error creating inventories:', error);
              });
          } else {
            console.log('Error creating recipe');
          }
        } catch (error) {
          console.log('Error occurred during creation:', error);
        }
      },
    });
  
    return (
      <>
        <h1>Welcome to Recipes page</h1>
  
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Recipe Name</label>
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Recipe name"
            id="name"
            name="name"
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
  
          <input value={formik.values.user_id} type="hidden" />
  
          <label htmlFor="description">Description</label>
          <input
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Description"
            id="description"
            name="description"
          />
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
  
          <label htmlFor="ingredients">Ingredients</label>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id}>
                <input
                type="checkbox"
                id={ingredient.id}
                name="ingredients"
                value={ingredient.id}
                checked={selectedIngredients.includes(ingredient.id)}
                onChange={(event) => {
                    if (event.target.checked) {
                    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient.id]);
                    } else {
                    setSelectedIngredients((prevIngredients) =>
                        prevIngredients.filter((id) => id !== ingredient.id)
                    );
                    }
                }}
                />
                <label htmlFor={ingredient.id}>{ingredient.name}</label>
            </div>
            ))}
  
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
  
  export default Recipes;