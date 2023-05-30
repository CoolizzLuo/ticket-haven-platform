import { extendTheme, defineStyleConfig, defineStyle, createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { selectAnatomy } from '@chakra-ui/anatomy';

import Tabs from './tabs';
import Accordion from './accordion';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const colors = {
  brand: {
    100: '#bf245d',
    500: '#8D2048',
    600: '#751b3c',
    700: '#631733',
  },
  gray1: {
    50: '#F7F4F6',
    100: '#F5F2F4',
    200: '#E6E3E5',
    300: '#DEDBDC',
    500: '#BFBCBD',
    600: '#9F9D9E',
    700: '#858284',
    800: '#565355',
    900: '#383537',
  },
  primary: {
    100: '#FFF3F8',
    500: '#8D2048',
    600: '#7C1B3F',
    700: '#6B1736',
    800: '#5A122D',
    900: '#480E24',
  },
  yellow: {
    light: '#FFF1C1',
    dark: '#BF7506',
  },
  natural: {
    50: '#F7F4F6',
    100: '#F5F2F4',
    200: '#E6E3E5',
    300: '#DEDBDC',
    400: '#D4D1D3',
    500: '#BFBCBD',
    600: '#9F9D9E',
    700: '#858284',
    800: '#565355',
    900: '#383537',
  },
  success: '#15A808',
  alert: '#ED0404',
};

const textStyles = {
  h1: {
    fontSize: '40px',
    lineHeight: '120%',
  },
  h2: {
    fontSize: '32px',
    lineHeight: '120%',
  },
  h3: {
    fontSize: '28px',
    lineHeight: '120%',
  },
  h4: {
    fontSize: '24px',
    lineHeight: '120%',
  },
  h5: {
    fontSize: '20px',
    lineHeight: '120%',
  },
  h6: {
    fontSize: '16px',
    lineHeight: '120%',
  },
  t1: {
    fontSize: '40px',
    lineHeight: '150%',
  },
  t2: {
    fontSize: '32px',
    lineHeight: '150%',
  },
  t3: {
    fontSize: '28px',
    lineHeight: '150%',
  },
  t4: {
    fontSize: '24px',
    lineHeight: '150%',
  },
  t5: {
    fontSize: '20px',
    lineHeight: '150%',
  },
  t6: {
    fontSize: '16px',
    lineHeight: '150%',
  },
  t7: {
    fontSize: '14px',
    lineHeight: '150%',
  },
};

const fonts = {
  heading: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  body: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
};

const selectThemeMap = {
  primary: definePartsStyle({
    field: {
      fontSize: '20px',
      bg: 'white',
      padding: '17px 12px',
      height: 'fit-content',
      border: '1px',
      borderColor: 'gray1.300',
      _focus: {
        borderColor: 'brand.100',
      },
    },
  }),
};

const buttonThemeMap = {
  primary: defineStyle({
    background: 'brand.500',
    color: 'white',
    _hover: {
      bg: 'brand.600',
    },
    _active: {
      bg: 'brand.700',
    },
  }),
  primaryOutline: defineStyle({
    background: 'white',
    color: 'brand.500',
    border: '1px',
    borderColor: 'brand.500',
    _hover: {
      background: 'gray1.50',
    },
    _active: {
      bg: 'brand.700',
      color: 'white',
    },
  }),
  grayOutline: defineStyle({
    background: 'white',
    color: 'gray1.800',
    border: '1px',
    borderColor: 'gray1.300',
    _hover: {
      bg: 'gray1.200',
    },
    _active: {
      bg: 'gray1.300',
    },
  }),
};

const checkThemeMap = {
  normal: defineStyle({
    control: {
      width: '20px',
      height: '20px',
    },
  }),
};

const selectTheme = defineMultiStyleConfig({
  variants: selectThemeMap,
});

const buttonTheme = defineStyleConfig({
  sizes: {
    md: {
      px: '24px',
      py: '12px',
      borderRadius: '8px',
      fontSize: '20px',
      h: 'auto',
    },
  },
  variants: buttonThemeMap,
});

const checkTheme = defineStyleConfig({
  variants: checkThemeMap,
});

const components = {
  Select: selectTheme,
  Button: buttonTheme,
  Checkbox: checkTheme,
  Tabs,
  Accordion,
};

const theme = extendTheme({ colors, fonts, textStyles, components });

export default theme;
