import { extendTheme } from '@chakra-ui/react';

const BreakpointConfig = {
  breakpoints: {
    xs: '320px', // mobile
    sm: '480px',
    md: '768px', // tablet
    lg: '992px',
    xl: '1280px', // desktop
    '2xl': '1600px',
    '3xl': '2000px'
  }
};

const ComponentsTheme = {
  components: {
    Text: {
      baseStyle: {
        fontSize: '14px',
        color: '#1d2128'
      }
    }
  }
};

const ColorConfig = {
  colors: {
    main: { 0: '#92d9ed', 1: '#77D0E8' },
    sub: { 0: '#ffbd66', 1: '#FF9E20', 2: '#ff9100' },
    text: { 0: '#828282', 1: '#1d2128' },
    light: { 0: '#CCC', 1: '#f2f2f2', 2: '#FFF' }
  }
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
};

export const chakraTheme = extendTheme({
  ...ComponentsTheme,
  ...ColorConfig,
  ...BreakpointConfig,
  config
  // ...MiscConfig,
  // ...GlobalConfig
});
