import { defineStyleConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import defaultTheme from '@chakra-ui/theme';

const variants = {
  customOutline: (props: StyleFunctionProps) => {
    const colorScheme = props?.colorScheme || 'primary';
    const isNatural = colorScheme === 'natural';
    return {
      ...defaultTheme.components.Button.variants?.outline(props),
      backgroundColor: isNatural ? 'white' : 'transparent',
      color: `${colorScheme}.${isNatural ? '800' : '500'}`,
      border: '1px',
      borderColor: `${colorScheme}.${isNatural ? '300' : '500'}`,
      _hover: {
        backgroundColor: 'natural.50',
      },
      _active: {
        backgroundColor: `${colorScheme}.500`,
        color: 'white',
      },
    };
  },
  light(props: StyleFunctionProps) {
    return {
      backgroundColor: `${props.colorScheme}.100`,
      color: `${props.colorScheme}.900`,
      _hover: {
        bg: `${props.colorScheme}.200`,
      },
      _active: {
        bg: `${props.colorScheme}.300`,
      },
    };
  },
};

// Button Theme
const Button = defineStyleConfig({
  variants,
  baseStyle: {
    borderRadius: '8px',
    px: '24px',
  },
  sizes: {
    md: {
      fontSize: '20px',
      h: '54px',
    },
    sm: {
      fontSize: '16px',
      h: '44px',
    },
  },
  defaultProps: {
    colorScheme: 'primary',
  },
});

export default Button;
