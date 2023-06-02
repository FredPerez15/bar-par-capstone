import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

const Container = styled('div')({
  marginTop: '16px',
});

const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

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
        const recipeData = {
          ...values,
          ingredients: selectedIngredients,
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData, null, 2),
        };
        const response = await fetch('http://127.0.0.1:5000/recipes', requestOptions);
        if (response.ok) {
          const createdRecipe = await response.json();

          const inventoryPromises = selectedIngredients.map(async (ingredientId) => {
            const inventoryData = {
              ingredient_id: ingredientId,
              recipe_id: createdRecipe.id,
              quantity: 18, 
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

  const ingredientsByType = ingredients.reduce((groupedIngredients, ingredient) => {
    const { ing_type } = ingredient;
    if (!groupedIngredients[ing_type]) {
      groupedIngredients[ing_type] = [];
    }
    groupedIngredients[ing_type].push(ingredient);
    return groupedIngredients;
  }, {});

  return (
    <Container>
      <Typography variant="h2" fontFamily="fantasy" fontWeight="bolder">
        Create Your Cocktails
      </Typography>

      <PaperContainer elevation={3}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ width: "1000px" }}
                label="Recipe Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                placeholder="Recipe name"
                id="name"
                name="name"
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ width: "1000px" }}
                multiline
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Description"
                id="description"
                name="description"
                error={formik.touched.description && formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            {Object.entries(ingredientsByType).map(([ing_type, ingredientsOfType]) => (
              <Grid item xs={12} key={ing_type}>
                <Typography fontFamily='fantasy' fontWeight='bolder' variant="h6">{ing_type}</Typography>
                <FormGroup>
                  {ingredientsOfType.map((ingredient) => (
                    <FormControlLabel
                      key={ingredient.id}
                      control={
                        <Checkbox
                        sx={{ width: "300px" }}
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
                          name="ingredients"
                          value={ingredient.id}
                        />
                      }
                      label={ingredient.name}
                    />
                  ))}
                </FormGroup>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </PaperContainer>
    </Container>
  );
}

export default Recipes;
