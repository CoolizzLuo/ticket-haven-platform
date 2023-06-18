import { Box, ChakraProps, Flex } from '@/lib/chakra';

const Circle = (props: ChakraProps) => {
  return <Box w="30px" h="25px" border="2px" borderColor="natural.500" borderRadius="50%" {...props} />;
};

export const TicketCard = ({
  topContent,
  bottomContent,
  outerBgColor = 'white',
  ...props
}: {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  outerBgColor?: string;
} & ChakraProps) => {
  return (
    <Flex position="relative" flexDirection="column" borderRadius="8px" overflow="hidden" {...props}>
      <Box
        position="relative"
        zIndex={10}
        border="2px"
        borderBottom="none"
        borderColor="natural.500"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
      >
        {topContent}
        <Box
          position="absolute"
          left={0}
          right={0}
          top="calc(100%)"
          h="1px"
          backgroundImage="linear-gradient(to right, var(--chakra-colors-white), var(--chakra-colors-white) 25%, var(--chakra-colors-natural-500) 25%, var(--chakra-colors-natural-500) 75%, var(--chakra-colors-white) 75%, var(--chakra-colors-white))"
          backgroundSize="20px"
          backgroundRepeat="repeat"
        />
        <Circle
          position="absolute"
          top="100%"
          right={0}
          transform="translateX(65%) translateY(-50%)"
          bgColor={outerBgColor}
        />
        <Circle
          position="absolute"
          top="100%"
          left={0}
          transform="translateX(-65%) translateY(-50%)"
          bgColor={outerBgColor}
        />
      </Box>
      <Box
        border="2px"
        borderTop="none"
        borderColor="natural.500"
        borderBottomLeftRadius="8px"
        borderBottomRightRadius="8px"
        flex={1}
      >
        {bottomContent}
      </Box>
    </Flex>
  );
};
