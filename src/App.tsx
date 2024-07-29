import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Main from './components/Main.tsx';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';
import AppAppBar from "./components/AppAppBar.tsx";

export default function Index() {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={createTheme(getLPTheme(mode))}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Main />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}