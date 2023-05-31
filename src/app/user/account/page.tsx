'use client';

import { useEffect, useReducer, MouseEvent } from 'react';
import { getUserInfo, updatUserInfo } from '@/api/user';
import { User as UserFormState } from '@/types/userTyps';
import {
  Select,
  RadioGroup,
  Stack,
  Radio,
  Input,
  InputGroup,
  Container,
  VStack,
  Flex,
  Box,
  Button,
  Heading,
  WrapItem,
  Avatar,
} from '@chakra-ui/react';
import withAuth from '../../layout/withAuth';

const initUserForm: UserFormState = {
  username: '',
  email: '',
  emailVerify: false,
  gender: 0,
  phone: '',
  phoneVerify: false,
  activityRegion: null,
  birth: '',
};

type UserFormAction =
  | { type: 'username'; payload: string | '' }
  | { type: 'email'; payload: string | '' }
  | { type: 'emailVerify'; payload: boolean }
  | { type: 'gender'; payload: 0 | 1 }
  | { type: 'phone'; payload: string }
  | { type: 'phoneVerify'; payload: boolean }
  | { type: 'activityRegion'; payload: number }
  | { type: 'birth'; payload: string };

const userFormReducer = (state: UserFormState, action: UserFormAction): UserFormState => {
  return { ...state, [action.type]: action.payload };
};

const Account = () => {
  const [user, dispatch] = useReducer(userFormReducer, initUserForm);
  const onChangeHandler = (type: keyof UserFormState, value: string | 0 | 1 | boolean) => {
    switch (type) {
      case 'username':
      case 'phone':
      case 'birth':
      case 'email':
        dispatch({ type, payload: value as string });
        break;
      case 'gender':
        dispatch({ type, payload: Number(value) as 0 | 1 });
        break;
      case 'activityRegion':
        dispatch({ type, payload: Number(value) });
        break;
      case 'phoneVerify':
      case 'emailVerify':
        dispatch({ type, payload: value as boolean });
        break;
      default:
        break;
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUserInfo();
      const { data, message } = res.data;
      if (message === 'success') {
        Object.keys(data).forEach((d) => {
          onChangeHandler(d as keyof UserFormState, data[d]);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const res = await updatUserInfo(user);
      const { message } = res.data;
      if (message === 'success') {
        alert('修改成功');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container py="80px">
      <Heading size="xl" textAlign="center" mb="20px">
        基本資料
      </Heading>
      <VStack>
        <Flex justifyContent="space-between" w="100%">
          <Box>
            <InputGroup mb="1rem">
              <Input
                placeholder="name"
                value={user.username}
                onChange={(e) => onChangeHandler('username', e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Input type="email" placeholder="Email" value={user.email} readOnly={true} bgColor="gray.100" />
            </InputGroup>
          </Box>
          <WrapItem>
            <Avatar
              size="xl"
              name="Segun Adebayo"
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            />
          </WrapItem>
        </Flex>

        <InputGroup>
          <Input placeholder="手機號碼" value={user.phone} onChange={(e) => onChangeHandler('phone', e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Input
            type="date"
            placeholder="生日"
            value={user.birth}
            onChange={(e) => onChangeHandler('birth', e.target.value)}
          />
        </InputGroup>
        <RadioGroup onChange={(val) => onChangeHandler('gender', val)} value={String(user.gender)}>
          <Stack direction="row">
            <Radio value="0">女</Radio>
            <Radio value="1">男</Radio>
          </Stack>
        </RadioGroup>
        <Select
          placeholder="主要活動區塊"
          value={user.activityRegion || ''}
          onChange={(e) => onChangeHandler('activityRegion', e.target.value)}
        >
          <option value="1">台北市</option>
          <option value="2">新北市</option>
        </Select>
        <Button onClick={onSubmit}>修改</Button>
      </VStack>
    </Container>
  );
};

export default withAuth(Account);
