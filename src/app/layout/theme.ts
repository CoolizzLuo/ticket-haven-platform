import { selectAnatomy } from '@chakra-ui/anatomy';
import { extendTheme, createMultiStyleConfigHelpers, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
createMultiStyleConfigHelpers(selectAnatomy.keys);

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

// Button Theme
const md = defineStyle({
  fontSize: '20px',
  fontWeight: 600,
  px: '12px',
  py: '8px',
  border: '1px solid',
  borderColor: colors.natural[500],
  borderRadius: '8px',
  bg: '#fff',
});

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
      borderColor: 'brand.100',
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
const primaryBtnOutline = defineStyle({
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

const buttonTheme =  defineStyleConfig({
  sizes: { md },
  variants: { buttonPrimary, grayBtnOutline, primaryBtnOutline },
});

const checkNormal = defineStyle({
  control: {
    width: '20px',
    height: '20px',
  }
})
const checkTheme = defineStyleConfig({
  variants: { checkNormal },
})
const components = {
  Select: selectTheme,
  Button: buttonTheme,
  Checkbox: checkTheme,
};

const theme = extendTheme({ colors, fonts , components });

export default theme;
