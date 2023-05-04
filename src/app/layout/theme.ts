import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    100: '#8D2048',
  },
};

const fonts = {
  heading: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  body: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
};

const theme = extendTheme({ colors, fonts });

export default theme;
