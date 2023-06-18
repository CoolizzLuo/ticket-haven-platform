import { ReactNode } from 'react';
import { Box, ChakraProps, Spinner } from '@/lib/chakra';

export const Loading = ({
  isOpen,
  children,
  overlayBgColor = 'natural.50',
  spinnerColor = 'natural.800',
  ...props
}: {
  isOpen: boolean;
  children?: ReactNode;
  overlayBgColor?: ChakraProps['bgColor'];
  spinnerColor?: ChakraProps['color'];
} & ChakraProps) => {
  return (
    <Box position="relative" {...props}>
      {children}
      <Box
        hidden={!isOpen}
        position="absolute"
        inset={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgColor={overlayBgColor}
        color={spinnerColor}
        opacity={0.8}
      >
        <Spinner />
      </Box>
    </Box>
  );
};
