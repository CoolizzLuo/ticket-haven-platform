import { Text, HStack, Box, Select, InputGroup, Input, InputRightElement, Heading } from '@chakra-ui/react';
import { useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '@chakra-ui/icons';

type Action =
  | { type: 'SET_REGION'; payload: string }
  | { type: 'SET_START_TIME'; payload: string }
  | { type: 'SET_KEYWORD'; payload: string };

interface SearchState {
  region: string;
  startTime: string;
  keyword: string;
}

const initSearchState = {
  region: '',
  startTime: '',
  keyword: '',
};

const searchReducer = (state: SearchState, action: Action): SearchState => {
  switch (action.type) {
    case 'SET_REGION':
      return { ...state, region: action.payload };
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload };
    case 'SET_KEYWORD':
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};

const ActivitySearchForm = () => {
  const router = useRouter();
  const [searchForm, dispatch] = useReducer(searchReducer, initSearchState);
  const onChangeHandler = (type: 'SET_REGION' | 'SET_START_TIME' | 'SET_KEYWORD', value: string) =>
    dispatch({ type, payload: value });

  const redirectEventsResultPage = () => {
    const queryStr = new URLSearchParams({ ...searchForm }).toString();

    router.push(`/activities?${queryStr}`);
  };

  return (
    <Box as="section" py="120px" bgColor="#F7F4F6">
      <Heading as="h2" textAlign="center" mb="32px">
        找活動
      </Heading>
      <HStack justifyContent="center">
        <HStack justifyContent="center" bgColor="white" p="40px" borderRadius="8px">
          <Box padding="20px" borderRight="1px solid" borderColor="gray.200">
            <Text as="label">區域</Text>
            <Select
              placeholder="全部"
              value={searchForm.region}
              onChange={(e) => onChangeHandler('SET_REGION', e.target.value)}
            >
              <option value="0">北部</option>
              <option value="1">中部</option>
              <option value="2">南部</option>
            </Select>
          </Box>
          <Box padding="20px">
            <Text as="label">日期</Text>
            <Input
              type="date"
              value={searchForm.startTime}
              onChange={(e) => onChangeHandler('SET_START_TIME', e.target.value)}
            />
          </Box>
          <Box>
            <InputGroup width="320px" alignItems="center" mb="2">
              <Input
                type="text"
                borderRadius="70px"
                bg="white"
                placeholder="台北小巨蛋"
                fontSize="20px"
                lineHeight="1.2"
                py="12px"
                px="24px"
                value={searchForm.keyword}
                onChange={(e) => onChangeHandler('SET_KEYWORD', e.target.value)}
              />

              <InputRightElement onClick={redirectEventsResultPage} cursor="pointer">
                <SearchIcon color="gray.500" boxSize={5} />
              </InputRightElement>
            </InputGroup>
            <Text as="label" ml="2" color="brand.100">
              熱門搜尋：BlackPink 五月天 告五人
            </Text>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export default ActivitySearchForm;
