import { selectAnatomy } from '@chakra-ui/anatomy';
import { extendTheme, createMultiStyleConfigHelpers, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
createMultiStyleConfigHelpers(selectAnatomy.keys);

const colors = {
  brand: {
    100: '#8D2048',
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
    800: '#565355',
  },
};

const fonts = {
  heading: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  body: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
};

const selectPrimary = definePartsStyle({
  field:{
    fontSize: '20px',
    bg: 'white',
    padding: '17px 12px',
    height: 'fit-content',
    border: '1px',
    borderColor: 'gray1.300',
    _focus:{
      borderColor: 'brand.500',
    },
  },
});

const selectTheme = defineMultiStyleConfig({
  variants: { selectPrimary },
});

const buttonPrimary = defineStyle({
  background: 'brand.500',
  color: 'white',
  _hover: {
    bg: 'brand.600',
  },
  _active: {
    bg: 'brand.700',
  },
});

const grayBtnOutline = defineStyle({
  background: 'white',
  color: 'gray1.800',
  border: '1px',
  borderColor: 'gray1.300',
  _hover:{
    bg: 'gray1.200'
  },
  _active: {
    bg: 'gray1.300',
  },
});

const btnTheme =  defineStyleConfig({
  variants: { buttonPrimary, grayBtnOutline },
});

const components = {
  Select: selectTheme,
  Button: btnTheme,
};

const theme = extendTheme({ colors, fonts , components });

export default theme;
