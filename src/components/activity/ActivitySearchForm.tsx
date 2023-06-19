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
    <Box as="section" py={{ base: '40px', md: '80px' }} w="100%">
      <Text fontWeight="700" textStyle={{ base: 't5', md: 't3' }} textAlign="center" mb="32px">
        找活動
      </Text>
      <Container maxWidth="container.xl">
        <HStack justifyContent="center">
          <Stack
            isInline={!isMobile}
            justifyContent="center"
            p={{ base: '20px', md: '40px' }}
            borderRadius="8px"
            width="67%"
            bgColor={{ base: 'natural.50', md: 'white' }}
          >
            <HStack w="50%">
              <Box padding="1rem" borderRight="1px solid" borderColor="gray.200">
                <Text as="label" fontSize="md" color="primary.500" fontWeight="bold">
                  區域
                </Text>
                <Select
                  variant="ghost"
                  size="sm"
                  fontSize="md"
                  placeholder="全部"
                  value={searchForm.region}
                  left="-12px"
                  onChange={(e) => onChangeHandler('region', e.target.value)}
                >
                  <option value="0">北部</option>
                  <option value="1">中部</option>
                  <option value="2">南部</option>
                </Select>
              </Box>
              <Box padding="1rem">
                <Text as="label" fontSize="md" color="primary.500" fontWeight="bold">
                  日期
                </Text>
                <Input
                  fontSize="md"
                  variant="ghost"
                  type="date"
                  size="sm"
                  px="0"
                  value={searchForm.startAfter}
                  onChange={(e) => onChangeHandler('startAfter', e.target.value)}
                />
              </Box>
            </HStack>
            <Box w="50%">
              <InputGroup width="100%" alignItems="center" mb="2" height="66px">
                <Input
                  borderRadius="70px"
                  bg="white"
                  placeholder="台北小巨蛋"
                  fontSize="md"
                  px="24px"
                  lineHeight="1.2"
                  value={searchForm.q}
                  onChange={(e) => onChangeHandler('q', e.target.value)}
                  height="inherit"
                />
                <InputRightElement mr="8px" onClick={redirectEventsResultPage} cursor="pointer" height="inherit">
                  <Box
                    width="50px"
                    height="50px"
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
              <Text as="label" ml="28px" color="primary.500">
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
