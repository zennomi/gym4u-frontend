import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box sx={{ width: 160, height: 50, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>

        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 160 50"
        width="100%"
        height="100%"
      >
        <defs>
          <style dangerouslySetInnerHTML={{ __html: ".cls-1{fill-rule:evenodd;}" }} />
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <path
          className="cls-1"
          d="M6.61,6.39a3,3,0,0,0-3,3v30a3,3,0,0,0,3,3h30a3,3,0,0,0,3-3v-30a3,3,0,0,0-3-3Zm23,10h-3v16h3Zm2,3h3v4h1v2h-1v4h-3Zm-18,13h3v-16h-3Zm-2-3h-3v-4h-1v-2h1v-4h3Zm7-4h6v-2h-6Z"
          transform="translate(-3.61 -6.39)"
          fill="url(#BG1)"
        />
        <path
          d="M68.53,34.89a17.82,17.82,0,0,1-9.41,2.26,10.33,10.33,0,0,1-8.33-4.3A17,17,0,0,1,47.7,22.73a14.58,14.58,0,0,1,2.71-9.34,11.19,11.19,0,0,1,6.66-4.27,16,16,0,0,1,3.46-.38A24.93,24.93,0,0,1,67.4,9.89v7.38a8.57,8.57,0,0,0-6.63-2.4,5.69,5.69,0,0,0-4,2.15A9.19,9.19,0,0,0,55,22.8a12.64,12.64,0,0,0,.84,5,4.29,4.29,0,0,0,3.26,2.82,5,5,0,0,0,2.8-.5v-3.2H58.31V21.28H68.53Z"
          transform="translate(-3.61 -6.39)"
          fill={PRIMARY_MAIN}
        />
        <path
          d="M86.57,37.49a5.88,5.88,0,0,1-2.93,5.29,11.75,11.75,0,0,1-6.35,1.58,13.33,13.33,0,0,1-6.55-1.48V37.36A9.36,9.36,0,0,0,77,39.54c2.37,0,3.55-.79,3.55-2.36v-1.7a2.41,2.41,0,0,1-1.35.9,6.94,6.94,0,0,1-2.35.37,6.72,6.72,0,0,1-4.58-1.61Q70,33.11,70,29V15.93h6.12V29.25A2.53,2.53,0,0,0,76.79,31a2.1,2.1,0,0,0,1.55.71c1.21,0,1.93-.82,2.19-2.47V15.93h6Z"
          transform="translate(-3.61 -6.39)"
          fill={PRIMARY_MAIN}
        />
        <path
          d="M115.06,36.72H109V23.23A2.07,2.07,0,0,0,106.63,21c-1.38.07-2.07.86-2.07,2.36V36.72H98.39V23.23a2.55,2.55,0,0,0-.64-1.81,1.92,1.92,0,0,0-1.44-.57,2.1,2.1,0,0,0-1.52.57A2.68,2.68,0,0,0,94,23.19V36.72H88V15.93h6v1.26a2.49,2.49,0,0,1,1.4-.92,7.18,7.18,0,0,1,2.37-.37,6.23,6.23,0,0,1,5.4,2.53,5,5,0,0,1,2.14-1.81,6.87,6.87,0,0,1,3-.69,7,7,0,0,1,4.61,1.55,6.44,6.44,0,0,1,2.12,5.18Z"
          transform="translate(-3.61 -6.39)"
          fill={PRIMARY_MAIN}
        />
        <path
          d="M137.39,31.4h-3.21v5.32h-6.8V31.4H117.8L116.45,26l9.31-16.85h8.42v16.3h3.21Zm-10-5.95v-7.9l-3.87,7.9Z"
          transform="translate(-3.61 -6.39)"
          fill={PRIMARY_MAIN}
        />
        <path
          d="M154.93,36.72h-6V35.41a2.77,2.77,0,0,1-1.57,1,7.5,7.5,0,0,1-2.68.39,6.07,6.07,0,0,1-4.23-1.68,6.61,6.61,0,0,1-2.05-5.05V15.93h6.06V29.28a2.47,2.47,0,0,0,.67,1.81,2.1,2.1,0,0,0,1.55.69q1.85,0,2.22-2.46V15.93h6Z"
          transform="translate(-3.61 -6.39)"
          fill={PRIMARY_MAIN}
        />
      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
