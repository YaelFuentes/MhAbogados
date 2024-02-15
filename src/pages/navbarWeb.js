import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material';


const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#284285' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            MH abogados
          </Typography>
          <Button color="inherit" sx={{ color: 'white', '&:hover': { backgroundColor: 'transparent' } }}>
            <Link href='/' color='inherit' underline='none'>Inicio</Link>
          </Button>
          <Button color="inherit" sx={{ color: 'white', '&:hover': { backgroundColor: 'transparent' } }}>
            <Link href='/loginClient' color='inherit' underline='none'>Mis juicios</Link>
          </Button>
          <Button color="inherit" sx={{ color: 'white', '&:hover': { backgroundColor: 'transparent' } }}>
            <Link href='/login' color='inherit' underline='none'>Ingresar</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
