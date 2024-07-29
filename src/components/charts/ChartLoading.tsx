import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';

export type ChartLoadProps = {
  height: number;
  width?: number;
};

export default function ChartLoading({ height, width }: ChartLoadProps) {
  return (
    <Box
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '1rem',
        height,
        width: width || '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // margin: '1rem',
      }}
    >
      <CircularProgress />
    </Box>
  );
}