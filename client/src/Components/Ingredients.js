// import React from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// function Ingredients({ addIngredient, userInfo, setUserInfo }) {
//   const navigate = useNavigate();

//   const recipeIds = userInfo.recipes.map(recipe => recipe.id);
//     console.log(recipeIds);
  
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       ing_type: '',
//       par_level: '',
//     //   recipe_id: recipeIds
//     },

//     validationSchema: yup.object({
//       name: yup.string().required('Must enter a name').max(150, 'Must be 150 chars max'),
//       ing_type: yup.string().required('Must enter a type of Ingredient').max(250, 'Must be 250 chars max'),
//       par_level: yup.number().required('Must enter a par level'),
//     }),
//     onSubmit: values => {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(values, null, 2),
//       };
//       fetch('http://127.0.0.1:5000/ingredients', requestOptions)
//         .then(response => response.json())
//         .then((data) => {
//             const createdIngredient = data;
//             setUserInfo(prevUserInfo => ({
//                 ...prevUserInfo,
//                 ingredients: [...prevUserInfo.recipes.ingredients, createdIngredient]
//             }));

//             addIngredient(values);
            
//             formik.resetForm();
//             navigate('/ingredients');
//         });
//     },
//   });

//   return (
//     <>
//       <h1>Welcome to Ingredients page</h1>

//       <form onSubmit={formik.handleSubmit}>
        // <label htmlFor="name">Ingredient Name</label>
        // <input
        //   value={formik.values.name}
        //   onChange={formik.handleChange}
        //   type="text"
        //   placeholder="Ingredient"
        //   id="name"
        //   name="name"
        // />
        // {formik.touched.name && formik.errors.name ? (
        //   <div>{formik.errors.name}</div>
        // ) : null}

        // <label htmlFor="ing_type">Ingredient Type</label>
        // <input
        //   value={formik.values.ing_type}
        //   onChange={formik.handleChange}
        //   type="text"
        //   placeholder="Ingredient type"
        //   id="ing_type"
        //   name="ing_type"
        // />
        // {formik.touched.ing_type && formik.errors.ing_type ? (
        //   <div>{formik.errors.ing_type}</div>
        // ) : null}

        // <label htmlFor="par_level">Par Level</label>
        // <input
        //   value={formik.values.par_level}
        //   onChange={formik.handleChange}
        //   type="text"
        //   placeholder="par level"
        //   id="par_level"
        //   name="par_level"
        // />
        // {formik.touched.par_level && formik.errors.par_level ? (
        //   <div>{formik.errors.par_level}</div>
        // ) : null}

        // <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default Ingredients;

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Ingredients({ addIngredient }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      ing_type: '',
      par_level: '',
    },
    validationSchema: yup.object({
      name: yup.string().required('Must enter a name').max(150, 'Must be 150 chars max'),
      ing_type: yup.string().required('Must enter a type of Ingredient').max(250, 'Must be 250 chars max'),
      par_level: yup.number().required('Must enter a par level'),
    }),
    onSubmit: async (values) => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values, null, 2),
        };
        const response = await fetch('http://127.0.0.1:5000/ingredients', requestOptions);
        if (response.ok) {
          const createdIngredient = await response.json();
  
          addIngredient(createdIngredient);
  
          formik.resetForm();
          navigate('/ingredients');
        } else {
          console.log('Error creating ingredient');
        }
      } catch (error) {
        console.log('Error occurred during submission:', error);
      }
    },
  });
  
  return (
    <>
      <h1>Welcome to Ingredients page</h1>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Ingredient Name</label>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Ingredient"
          id="name"
          name="name"
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <label htmlFor="ing_type">Ingredient Type</label>
        <input
          value={formik.values.ing_type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Ingredient type"
          id="ing_type"
          name="ing_type"
        />
        {formik.touched.ing_type && formik.errors.ing_type ? <div>{formik.errors.ing_type}</div> : null}

        <label htmlFor="par_level">Par Level</label>
        <input
          value={formik.values.par_level}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Par level"
          id="par_level"
          name="par_level"
        />
        {formik.touched.par_level && formik.errors.par_level ? (
          <div>{formik.errors.par_level}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Ingredients;
