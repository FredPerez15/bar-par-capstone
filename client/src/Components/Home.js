import React from "react";
import { Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>

const RootContainer = styled('div')({
  textAlign: 'center',
  marginTop: '4rem',
});

const Heading = styled(Typography)({
  fontSize: '2rem',
  marginBottom: '2rem',
});

const SubHeading = styled(Typography)({
  fontSize: '1.5rem',
  color: (theme) => theme.palette.text.secondary,
});

const AboutSection = styled(Box)({
  marginTop: '4rem',
  backgroundColor: (theme) => theme.palette.background.paper,
  padding: '4rem',
  borderRadius: (theme) => theme.shape.borderRadius,
});

const GraphicImage = styled('img')({
  width: '500px',
  marginBottom: '2rem',
});

function Home() {
  return (
    <RootContainer>
      <Heading variant="h2" fontFamily='fantasy' fontWeight='bolder'>
      Welcome to Bar Par: Where Inventory Meets Mixology.
      </Heading>
      <AboutSection>
        <GraphicImage src="/mixology.jpeg" alt="Mixology Graphic" />
        <Typography variant="h3" fontFamily='fantasy' fontWeight='bolder' component="h4">
          About Us
        </Typography>
        <Typography style={{ fontFamily: 'Montserrat, sans-serif' }} variant="body1" component="p" sx={{ marginTop: '2rem' }}>
          Here at bar par, we're shaking up the way cocktail bars manage their stock levels.
          Our innovative app was concocted by a passionate student from the esteemed Flatiron Bootcamp,
          who also happens to have a career in the tantalizing world of food and beverage.
          With a dash of coding skills and a splash of mixology experience, our aim is to revolutionize
          the way bartenders and bar managers keep their bars stocked and spirits high.
        </Typography>
        <Typography variant="body1" component="p" sx={{ marginTop: '2rem' }}>
          So whether you're a seasoned mixologist or a spirited bar owner, join us on this adventurous journey
          as we shake, stir, and measure our way to better inventory management. Stay tuned for the exciting updates
          and new features we have in store!
        </Typography>
      </AboutSection>
    </RootContainer>
  );
}

export default Home;
