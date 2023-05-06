import { Box, useRadio, UseRadioProps } from '@chakra-ui/react';

interface RadioCardProps extends UseRadioProps {
  children: React.ReactNode;
}

function RadioCard(props: RadioCardProps) {
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
          bg: 'brand.100',
          color: 'white',
          borderColor: 'brand.100',
        }}
        _focus={{
          boxShadow: 'outline',
          outline: 0,
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default RadioCard;
