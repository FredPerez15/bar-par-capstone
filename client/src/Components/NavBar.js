import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, styled } from "@mui/material";

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  marginRight: "1rem",
  fontWeight:'bolder',
});

function Navbar() {
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
            </Typography>
            <nav>
              <StyledLink to="/ingredients">Add Ingredients</StyledLink>
              <StyledLink to="/recipes">Add Recipes</StyledLink>
              <StyledLink to="/recipe_menu">My Menu</StyledLink>
              <StyledLink to="/">Home</StyledLink>
            </nav>
          </Toolbar>
        </AppBar>
      );
    }
    

export default Navbar;