import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, styled } from "@mui/material";
import Logout from "./Logout";
import Login from "./Login";

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
  marginRight: "1rem",
});

function Navbar() {
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bar Par
            </Typography>
            <nav>
              <StyledLink to="/ingredients">Add Ingredients</StyledLink>
              <StyledLink to="/recipes">Add Recipes</StyledLink>
              <StyledLink to="/recipe_menu">My Menu</StyledLink>
              <StyledLink to="/home">Home</StyledLink>
            </nav>
          </Toolbar>
        </AppBar>
      );
    }
    

export default Navbar;