import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react';

const $startColor = cssVar('skeleton-start-color');
const $endColor = cssVar('skeleton-end-color');

const normal = defineStyle((props) => ({
  _light: {
    [$startColor.variable]: `colors.${props.colorScheme}.100`, // changing startColor to red.100
    [$endColor.variable]: `colors.${props.colorScheme}.300`, // changing endColor to red.400
  },
}));

const Skeleton = defineStyleConfig({
  baseStyle: {
    borderRadius: '6px',
  },
  variants: {
    normal,
  },
  defaultProps: { variant: 'normal', colorScheme: 'natural' },
});

export default Skeleton;
