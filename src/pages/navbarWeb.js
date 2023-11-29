import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';

export default function NavbarMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#284285' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            MH abogados
          </Typography>
          <Button color="inherit" sx={{ color: 'white' }}>
            <Link href='/' color='inherit'>Home</Link>
          </Button>
          <Button color="inherit" sx={{ color: 'white' }}>
            <Link href='/requestClient' color='inherit'>Mis juicios</Link>
          </Button>
          <Button color="inherit" sx={{ color: 'white' }}>
            <Link href='/login' color='inherit'>Ingresar</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
