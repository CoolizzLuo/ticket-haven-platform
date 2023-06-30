import {
  Text,
  HStack,
  Stack,
  Box,
  Select,
  InputGroup,
  Input,
  InputRightElement,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useReducer } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { SearchFormState as SearchState } from '@/types/activityTypes';
import { Region } from '@/constants/region';

type Action =
  | { type: 'region'; payload: number | '' }
  | { type: 'startAfter'; payload: string }
  | { type: 'q'; payload: string };

type OnChangeType = ({ queryStr, json }: { queryStr: string; json: SearchState }) => void;

const searchReducer = (state: SearchState, action: Action): SearchState => {
  return { ...state, [action.type]: action.payload };
};

const ActivitySearchForm = ({ onChange, searchParams }: { onChange: OnChangeType; searchParams?: SearchState }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const initSearchState = searchParams || { region: '', startAfter: '', q: '' };

  const [searchForm, dispatch] = useReducer(searchReducer, initSearchState);

  const onChangeHandler = (type: keyof SearchState, value: string | 0 | 1 | 2 | '') => {
    switch (type) {
      case 'startAfter':
      case 'q':
        dispatch({ type, payload: value as string });
        break;
      case 'region':
        dispatch({ type, payload: value as 0 | 1 | 2 | '' });
        break;
      default:
        break;
    }
  };

  const redirectEventsResultPage = () => {
    const { region = '', startAfter = '', q = '' } = searchForm;
    const queryStr = new URLSearchParams({ startAfter, q, region: region.toString() }).toString();
    onChange({ json: searchForm, queryStr });
  };

  return (
    <Box as="section" w="100%" pb={{ md: '80px' }} pt={{ base: '40px', md: '80px' }}>
      <Text fontWeight="700" textStyle={{ base: 't5', md: 't3' }} textAlign="center" mb={{ base: '20px', md: '32px' }}>
        找活動
      </Text>
      <Container maxWidth="container.xl" px={{ base: '0', md: '16px' }}>
        <HStack justifyContent="center" w={{ base: '100%', md: 'auto' }}>
          <Stack
            isInline={!isMobile}
            justifyContent="center"
            p={{ base: '20px', md: '40px' }}
            borderRadius="8px"
            width={{ base: '100%', lg: '80%', xl: '67%' }}
            bgColor={{ base: 'natural.50', md: 'white' }}
          >
            <HStack w={{ base: '100%', md: '50%' }}>
              <Box padding={{ base: '0 12px', md: '1rem' }} borderRight="1px solid" borderColor="gray.200">
                <Text
                  textAlign={{ base: 'center', md: 'left' }}
                  fontSize={{ base: 't6', md: 't5' }}
                  color="primary.500"
                  fontWeight={{ md: '700' }}
                >
                  區域
                </Text>
                <Select
                  variant="ghost"
                  size="sm"
                  fontSize={{ base: 't6', md: 't5' }}
                  placeholder="全部"
                  value={searchForm.region}
                  left={{ md: '-12px' }}
                  bg="transparent"
                  onChange={(e) => onChangeHandler('region', e.target.value)}
                >
                  <option value={Region.NORTH}>北部</option>
                  <option value={Region.MIDDLE}>中部</option>
                  <option value={Region.SOUTH}>南部</option>
                </Select>
              </Box>
              <Box padding={{ base: '0 12px', md: '1rem' }} flexGrow="1">
                <Text
                  textAlign={{ base: 'center', md: 'left' }}
                  fontSize={{ base: 't6', md: 't5' }}
                  color="primary.500"
                  fontWeight={{ md: '700' }}
                >
                  日期
                </Text>
                <Input
                  fontSize={{ base: 't6', md: 't5' }}
                  variant="ghost"
                  type="date"
                  size="sm"
                  px="0"
                  bg="transparent"
                  value={searchForm.startAfter}
                  onChange={(e) => onChangeHandler('startAfter', e.target.value)}
                />
              </Box>
            </HStack>
            <Box w={{ base: '100%', md: '50%' }}>
              <InputGroup width="100%" alignItems="center" mb="2" height={{ base: '48px', md: '66px' }}>
                <Input
                  borderRadius="70px"
                  bg="white"
                  placeholder="台北小巨蛋"
                  fontSize={{ base: 't6', md: 't5' }}
                  px={{ base: '20px', md: '24px' }}
                  value={searchForm.q}
                  onChange={(e) => onChangeHandler('q', e.target.value)}
                  height="inherit"
                />
                <InputRightElement
                  mr={{ base: '4px', md: '8px' }}
                  onClick={redirectEventsResultPage}
                  cursor="pointer"
                  height="inherit"
                >
                  <Box
                    width={{ base: '40px', md: '50px' }}
                    height={{ base: '40px', md: '50px' }}
                    bg="primary.500"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p="12px"
                  >
                    <SearchIcon width="100%" height="100%" color="white" />
                  </Box>
                </InputRightElement>
              </InputGroup>
              <Text
                as="label"
                ml={{ base: '24px', md: '28px' }}
                color="primary.500"
                textStyle={{ base: 't7', md: 't6' }}
              >
                <Text as="span" color="natural.700">
                  熱門搜尋：
                </Text>
                BlackPink 五月天 告五人
              </Text>
            </Box>
          </Stack>
        </HStack>
      </Container>
    </Box>
  );
};

export default ActivitySearchForm;
