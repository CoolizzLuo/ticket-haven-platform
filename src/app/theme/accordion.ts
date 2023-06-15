import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { accordionAnatomy } from '@chakra-ui/anatomy';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(accordionAnatomy.keys);

const Accordion = defineMultiStyleConfig({
  baseStyle: {
    button: {
      width: 'auto',
      p: 0,
    },
    container: {
      backgroundColor: 'white',
    },
  },
});

export default Accordion;
