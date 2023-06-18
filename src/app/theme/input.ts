import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { inputAnatomy } from '@chakra-ui/anatomy';
import defaultTheme from '@chakra-ui/theme';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const sizes = {
  sm: {
    h: '44px',
    borderRadius: '6px',
    fontSize: '16px',
  },
  md: {
    h: '54px',
    borderRadius: '8px',
    fontSize: '20px',
  },
};

const Input = defineMultiStyleConfig({
  sizes: {
    sm: {
      field: sizes.sm,
      addon: sizes.sm,
    },
    md: {
      field: sizes.md,
      addon: sizes.md,
    },
  },
  variants: {
    ghost(props) {
      return {
        ...defaultTheme.components.Select.variants?.outline(props),
        field: {
          borderColor: 'transparent',
        },
      };
    },
  },
});

export default Input;
