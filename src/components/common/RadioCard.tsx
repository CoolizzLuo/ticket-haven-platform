import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode;
}

const RadioCard = (props: RadioCardProps) => {
  const { children } = props;
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        _checked={{
          bg: 'brand.500',
          color: 'white',
          borderColor: 'brand.500',
        }}
        _focus={{
          boxShadow: 'outline',
          outline: 0,
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
};

export default RadioCard;
