import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { tabsAnatomy } from '@chakra-ui/anatomy';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const Tabs = defineMultiStyleConfig({
  sizes: {
    md: {
      tablist: {
        gap: '16px',
      },
      tab: {
        minW: '116px',
        px: '28px',
        py: '16px',
        fontSize: '20px',
        fontWeight: 700,
      },
      tabpanels: {
        marginTop: '24px',
      },
      tabpanel: {
        p: '32px',
        borderRadius: '6PX',
      },
    },
  },
  variants: {
    card: {
      tab: {
        border: '1px solid',
        borderColor: 'natural.300',
        borderRadius: '4px',
        backgroundColor: 'white',
        color: 'natural.800',
        _selected: {
          backgroundColor: 'primary.500',
          borderColor: 'primary.500',
          color: 'white',
        },
      },
      tabpanel: {
        backgroundColor: 'natural.50',
      },
    },
  },
});

export default Tabs;
