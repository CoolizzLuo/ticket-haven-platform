import React, { useEffect, useState } from 'react';
import { Grid, Flex, Circle, Box, Text } from '@chakra-ui/react';

const steps = ['選擇區域', '選擇張數', '購票確認', '付款', '完成訂購'];

const ProgressBar = ({ step }: { step: number }) => {
  const [columns, setColumns] = useState<string>();
  useEffect(() => {
    const strs = steps.map((_, index) => {
      if (index) {
        return '1fr 24px';
      }
      return '24px';
    });
    setColumns(strs.join(' '));
  }, []);
  return (
    <Box w="100%" bg="natural.50">
      <Grid gridTemplateColumns={columns} alignItems="start" padding="60px 20px" margin="auto" w="540px">
        {steps.map((title, index) => {
          const color = index <= step - 1 ? 'brand.500' : 'natural.300';
          const dividerColor = index <= step - 1 ? 'brand.500' : 'natural.500';
          const textColor = index <= step - 1 ? 'brand.500' : 'natural.600';
          return (
            <React.Fragment key={`${title}`}>
              {index !== 0 && <Box w="100%" borderBottom="1px" borderColor={dividerColor} marginTop="12px" />}
              <Flex direction="column" align="center" gap="8px">
                <Circle size="24px" bg={color} />
                <Text fontSize="16px" whiteSpace="nowrap" color={textColor}>
                  {title}
                </Text>
              </Flex>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProgressBar;
