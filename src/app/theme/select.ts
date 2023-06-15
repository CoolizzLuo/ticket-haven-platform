import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { selectAnatomy } from '@chakra-ui/anatomy';
import defaultTheme from '@chakra-ui/theme';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const Select = defineMultiStyleConfig({
  baseStyle: {
    field: {
      backgroundColor: 'white',
      border: '1px',
      borderColor: 'natural.300',
    },
  },
  sizes: {
    sm: {
      field: {
        h: '44px',
        borderRadius: '6px',
        fontSize: '16px',
      },
    },
    md: {
      field: {
        h: '54px',
        borderRadius: '8px',
        fontSize: '20px',
      },
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

export default Select;
