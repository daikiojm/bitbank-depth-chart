import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { BoxProps } from '@mui/system';
import { grey } from '@mui/material/colors';

const Divider = () => (
  <Typography sx={{ mx: 1, color: grey[600], display: 'inline-block' }}>
    /
  </Typography>
);

const Footer: React.VFC<BoxProps> = ({ ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        p: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 120,
        backgroundColor: grey[50],
        borderTop: `1px solid ${grey[200]}`,
        ...props.sx,
      }}
    >
      <Box sx={{ m: 'auto', textAlign: 'center' }}>
        <Link
          href={`https://github.com/daikiojm/bitbank-depth-chart`}
          target="_blank"
        >
          <Typography
            sx={{
              textAlign: 'center',
              color: grey[600],
              display: 'inline-block',
            }}
          >
            View Code on GitHub
          </Typography>
        </Link>
        <Divider />
        <Link href={`https://github.com/daikiojm`} target="_blank">
          <Typography
            sx={{
              textAlign: 'center',
              color: grey[600],
              display: 'inline-block',
            }}
          >
            @daikiojm
          </Typography>
        </Link>
        <Divider />
        <Link href={`http://app.bitbank.cc/`} target="_blank">
          <Typography
            sx={{
              textAlign: 'center',
              color: grey[600],
              display: 'inline-block',
            }}
          >
            bitbank.cc
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
