'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Html5Qrcode, QrcodeSuccessCallback } from 'html5-qrcode';
import { ScanIcon } from '@/components/icons';
import { useEventInfo } from '@/hooks/api/check-in/useEventInfo';
import { Box, Container, Flex, Heading, Text, position, useToast } from '@/lib/chakra';
import { dayFormat } from '@/lib/dayjs';
import useDialogStore from '@/stores/dialogStore';
import { httpClient } from '@/lib/api/httpClient';
import { BaseResponse } from '@/lib/api/types/baseResponse';
import { CheckInModal } from './CheckInModal';
import { TicketInfo } from './types';
import { Loading } from './LoadingComp';

const CheckIn = () => {
  const { authId } = useParams();
  const router = useRouter();
  const { openAlert } = useDialogStore();
  const toast = useToast();

  const scannerId = useId();

  const { event, isLoading } = useEventInfo(authId);

  const scannerRef = useRef<Html5Qrcode>();

  const [qrcodeText, setQrcodeText] = useState('');

  const [isLoadingTicket, setIsLoadingTicket] = useState(false);
  const [isCheckIning, setIsCheckIning] = useState(false);

  const [checkInModalState, setCheckInModalState] = useState<{ isOpen: boolean; data?: TicketInfo }>({
    isOpen: false,
  });
  const onCheckInModalClose = () => {
    setCheckInModalState({ isOpen: false });
    scannerRef.current?.resume();
  };

  const checkIn = async () => {
    try {
      setIsCheckIning(true);
      await httpClient.post('check-in')({
        params: {
          inspectorToken: authId,
          ticketToken: qrcodeText,
        },
      });
      setIsCheckIning(false);
      toast({
        title: '簽到成功！',
        position: 'top',
        status: 'success',
        isClosable: true,
        duration: 2000,
      });
      setCheckInModalState((prev) => ({
        ...prev,
        data: prev.data && {
          ...prev.data,
          isUsed: true,
        },
      }));
    } catch (error) {
      setIsCheckIning(false);
      toast({
        title: '簽到失敗！',
        position: 'top',
        status: 'error',
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (!event && !isLoading) {
      router.push('/');
    }
  }, [event, isLoading]);

  useEffect(() => {
    if (!event) return;

    const onScanSuccess: QrcodeSuccessCallback = async (text) => {
      scannerRef.current?.pause();
      setQrcodeText(text);
      setIsLoadingTicket(true);
      const res = (await httpClient.get('/check-in/ticket')({
        searchParams: {
          inspectorToken: authId,
          ticketToken: text,
        },
      })) as BaseResponse<TicketInfo>;
      setIsLoadingTicket(false);
      setCheckInModalState({ isOpen: true, data: res.data });
    };

    scannerRef.current = new Html5Qrcode(scannerId);
    scannerRef.current
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
        },
        onScanSuccess,
        () => {},
      )
      .catch(() => {
        toast({
          title: '鏡頭開啟失敗！',
          position: 'top',
          status: 'error',
        });
      });

    return () => {
      scannerRef.current?.clear();
    };
  }, [event, authId]);

  return (
    <Loading isOpen={isCheckIning} position="fixed" inset={0}>
      {event && (
        <Flex position="fixed" flexDirection="column" inset={0} bgColor="yellow.dark" color="white">
          <Box as="header" py="20px" display="flex" alignItems="stretch">
            <Container maxW="container.lg">
              <Heading fontSize="md" fontWeight="normal" display="flex" alignItems="center">
                <ScanIcon mr="6px" />
                <Box noOfLines={1}>{event.activityName}</Box>
              </Heading>
              <Text mt="12px" textStyle="t7">
                場次：{dayFormat(event.startTime)} ~ {dayFormat(event.endTime)}
              </Text>
            </Container>
          </Box>
          <Loading isOpen={isLoadingTicket}>
            <div id={scannerId} />
          </Loading>
        </Flex>
      )}
      <CheckInModal
        onClose={onCheckInModalClose}
        onCheckIn={checkIn}
        isOpen={checkInModalState.isOpen}
        data={checkInModalState.data}
      />
    </Loading>
  );
};

export default CheckIn;
