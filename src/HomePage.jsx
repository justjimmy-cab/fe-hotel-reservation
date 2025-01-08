import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return(
    <Box>
      <header>
          <nav id="navbar">
              <div class="container">
                  <h1 class="logo"><a href="index.html">Atlas Hotel</a></h1>
                  <ul>
                      <li><a class="current" href="index.html">Home</a></li>
                      <li><a href="about.html">About</a></li>
                      <li><a href="contact.html">Contact</a></li>
                  </ul>
              </div>
          </nav>
      </header>

      <div id="showcase">
          <div class="container">
              <div class="showcase-content">
                  <h1><span class="text-primary">Welcome</span> to the <>Atlas Hotel</></h1>
                  <p class="lead">Good day Ladies and Gentelmen, enjoy your stay</p>
                  <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                    <Button variant='contained' size='large' sx={{backgroundColor: '#fca00a'}} onClick={() => {navigate('/login')}}>Book Now</Button>
                    <Typography>OR</Typography>
                    <Button variant='contained' onClick={() => {navigate('/register')}}>Register</Button>
                  </Box>
              </div>
          </div>
      </div>
      <section id="home-info" class="bg-dark">
        <div class="info-img"></div>
        <div class="info-content">
          <h2><span class="text-primary">The History</span> Of Our Hotel</h2>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum velit repellat modi veritatis sequi itaque dolore, vel voluptates atque nulla voluptatem corrupti labore odio unde ab, perspiciatis vitae aliquam maxime.</p>
          <a href="about.html" class="btn btn-light">Read More</a>
        </div>
      </section>
    </Box>
  );
}
export default HomePage;
