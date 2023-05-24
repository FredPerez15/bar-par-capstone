import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Recipes ({ userInfo, setUserInfo }) {
    const navigate = useNavigate()
    // const [name, setName]=useState('');
    // const [description, setDescription]=useState('');
    
    
    const formik = useFormik({
        initialValues: {
            name:'',
            description: '',
            user_id: userInfo.id
        },
        validationSchema: yup.object({
            name: yup.string().required("Must enter a name").max(150, 'must be 150 chars max'),
            description: yup.string().required("Must enter a descrition").max(250, 'must be 250 chars max'),
        }),

    onSubmit: values => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values, null, 2)
        };
        fetch('http://127.0.0.1:5000/recipes', requestOptions)
            .then(response => response.json())
            .then(data => {
            const createdRecipe = data;
            setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                recipes: [...prevUserInfo.recipes, createdRecipe]
            }));
            console.log('Item created!');
            })
            .then(navigate('/recipe_menu'))
            .catch(error => {
                console.log('Error occurred during creation:', error);
            });
            
            
        },
    });
    
    return(
        <>
        <h1>Welcome to Recipes page</h1>

            <form onSubmit={formik.handleSubmit}>

                <label htmlFor ="name">Recipe Name</label>
                <input value={formik.values.name} onChange={formik.handleChange} type = "text" placeholder="Recipe name" id ="name" name="name"></input>
                {formik.touched.name && formik.errors.name ? (
                <div>{formik.errors.name}</div>
                ) : null}

                <input value={formik.values.user_id} type="hidden"></input>

                <label htmlFor ="description">Description</label>
                <input value={formik.values.description} onChange={formik.handleChange} type = "text" placeholder="Description" id ="description" name="description"></input>
                {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
                ) : null}

                <button type="submit">Submit</button>
                
            </form>
        </>
    )
}

export default Recipes;

