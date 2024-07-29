import {alpha} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ParentSize } from '@visx/responsive';
import ChartWalletBalance from './dashboard/ChartWalletBalance.tsx';
import ChartMarketCap from './dashboard/ChartMarketCap.tsx';
import ChartTps from './dashboard/ChartTps.tsx';

export default function Main() {
  return (
        <Box
            id="main"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: {xs: 14, sm: 20},
                    pb: {xs: 8, sm: 12},
                }}
            >
                <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '70%'}}}>
                    <Typography
                        variant="h1"
                        sx={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(4rem, 10vw, 4rem)',
                                color: (theme) =>
                                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                            Vybe&nbsp;
                        </Typography>
                        Code Challenge
                    </Typography>
                </Stack>
                <Box id="charts" sx={{
                    py: 4,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}>
                  <ParentSize id={'chartWalletsBalances'}>
                      {({ width }) => <ChartWalletBalance width={width}/>}
                  </ParentSize>
                  <ParentSize id={'chartMarketCap'}>
                    {
                      ({ width }) => (
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
                          <ChartMarketCap width={width/2.5} />
                          <ChartMarketCap width={width/2.5} />
                        </Box>
                      )
                    }
                  </ParentSize>
                  <ParentSize id={'chartTps'}>
                    {({ width }) => <ChartTps width={width}/> }
                  </ParentSize>
                </Box>
            </Container>
        </Box>
    );
}