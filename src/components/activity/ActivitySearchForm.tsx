import { Text, HStack, Box, Select, InputGroup, Input, InputRightElement, Heading } from '@chakra-ui/react';
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
    <Box as="section" py="80px" bgColor="#F7F4F6">
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
              onChange={(e) => onChangeHandler('region', e.target.value)}
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
              value={searchForm.startAfter}
              onChange={(e) => onChangeHandler('startAfter', e.target.value)}
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
                value={searchForm.q}
                onChange={(e) => onChangeHandler('q', e.target.value)}
              />

              <InputRightElement onClick={redirectEventsResultPage} cursor="pointer">
                <SearchIcon color="gray.500" boxSize={5} />
              </InputRightElement>
            </InputGroup>
            <Text as="label" ml="2" color="primary.500">
              熱門搜尋：BlackPink 五月天 告五人
            </Text>
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};

export default ActivitySearchForm;
