import { PaletteColor } from '@mui/material/styles';

// Extend the theme to add custom colors
declare module '@mui/material/styles' {
  interface Palette {
    white: PaletteColor;
  }
  interface PaletteOptions {
    white?: PaletteColor;
  }
}
