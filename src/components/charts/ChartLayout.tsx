import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export type ChartLayoutProps = {
  title: string;
  children?: React.ReactNode;
};

export default function ChartLayout({ children, title }: ChartLayoutProps) {
  return (
    <Box
      sx={{
        padding: '1rem',
      }}
    >
      <Typography
        variant="h1"
        sx={(theme) => ({
          color: theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.6)'
            : 'rgba(255, 255, 255, 0.6)',
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4.5vw, 1.75rem)'
        })}
      >
        { title }
      </Typography>
      { children }
    </Box>
  );
}