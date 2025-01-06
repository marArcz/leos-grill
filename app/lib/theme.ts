'use client'
import { createTheme } from '@mui/material/styles';
import { jost } from '../ui/fonts';

const theme = createTheme({
  typography:{
    allVariants:{
      fontFamily: jost.className
    }
  },
  palette: {
      primary: {
          light: '#e8ba33',
          main: '#E3A900',
          dark: '#9e7600',
          contrastText: '#fff',
      },
  },
});

export default theme;
