import { extendTheme, defineStyleConfig } from '@chakra-ui/react';
import Tabs from './tabs';
import Accordion from './accordion';
import Button from './button';
import Select from './select';
import Input from './input';
import Tag from './tag';
import Skeleton from './skeleton';

const colors = {
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

const fontSizes = {
  xs: '14px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '28px',
  '2xl': '32px',
  '3xl': '40px',
};

const fonts = {
  heading: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  body: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
};

const global = {
  'html, body': {
    color: 'natural.800',
  },
};

const Checkbox = defineStyleConfig({
  sizes: {
    md: {
      control: {
        width: '20px',
        h: '20px',
      },
    },
  },
});

const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  textStyles,
  styles: {
    global,
  },
  components: {
    Button,
    Tabs,
    Tag,
    Accordion,
    Checkbox,
    Select,
    Input,
    Skeleton,
  },
});

export default theme;
