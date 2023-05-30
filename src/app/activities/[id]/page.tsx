'use client';

import {
  Grid,
  Heading,
  Text,
  Container,
  Image,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  List,
  ListItem,
  Card,
  CardBody,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getActivityById } from '@/api/activities';
import { dayFormat, isBeforeToday, isAfterToday, dayFromNow } from '@/lib/dayjs';

type Event = {
  endTime: string;
  id: string;
  sellEndTime: string;
  sellStartTime: string;
  startTime: string;
  soldOut: boolean;
};

type DetailType = {
  address: string;
  content: string;
  converImageUrl: string;
  startTime: string;
  endTime: string;
  name: string;
  notice: string;
  events: Event[];
};

const Activitie = () => {
  const params = useParams();
  const { id } = params;
  const [result, setResult] = useState<DetailType>();

  const getEvents = async () => {
    const res = await getActivityById(id);
    const { data } = res.data;
    setResult(data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Container maxW="1200px" pb="80px" pt="40px">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">首頁 </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" fontWeight="700">
            {result?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box as="section" mb="48px">
        <Image
          my="24px"
          src={`/image/${id}.jpg`}
          borderRadius="lg"
          alt="eventImg"
          width="100%"
          maxH="500px"
          objectFit="cover"
        />
        <Heading as="h2" fontSize="28px" my="24px">
          {result?.name}
        </Heading>
        <Flex mb="48px">
          <Text>
            {result?.startTime && dayFormat(result.startTime)} - {result?.endTime && dayFormat(result.endTime)}
          </Text>
          /<Text>{result?.address}</Text>
        </Flex>
        <List bg="#FFF3F8" pt="20px" pl="36px" borderRadius="6px">
          {result?.notice.split('\n').map((item) => (
            <ListItem pb="20px" listStyleType="none" key={item}>
              {item}
            </ListItem>
          ))}
        </List>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap="30px" as="ul" alignItems="stretch">
        <Box order={{ base: 2, md: 1 }}>
          <Tabs variant="unstyled">
            <TabList mb="24px">
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.500' }}>
                節目介紹
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.500' }}>
                座位示意
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.500' }}>
                注意事項
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.500' }}>
                購票提醒
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.500' }}>
                取票提醒
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.500' }}>
                退票說明
              </Tab>
            </TabList>
            <TabPanels bg="#F7F4F6" borderRadius="6px" p="32px" pb="100px">
              <TabPanel p="0">
                <Text mb="40px"> {result?.name}</Text>
                {result?.content}
                {/* <Text mb="40px">【TOMORROW X TOGETHER WORLD TOUR &lt;ACT: SWEET MIRAGE&gt; IN TAIPEI】加場公告</Text>
                <List mb="40px">
                  <ListItem mb="24px">
                    <Flex>
                      <Text>■ 演出日期：</Text>
                      <Box>
                        <Text>2023/04/04 (二) 7PM 加場</Text>
                        <Text>2023/04/05 (三) 7PM</Text>
                        <Text>(實際演出時間以現場公告為準)</Text>
                      </Box>
                    </Flex>
                  </ListItem>
                  <ListItem listStyleType="none" mb="24px">
                    <Flex>
                      <Text>■ 演出地點：</Text>
                      <Box>
                        <Text>台北南港展覽館1館</Text>
                      </Box>
                    </Flex>
                  </ListItem>
                  <ListItem listStyleType="none">
                    <Flex alignItems="center">
                      <Text>■ 加場售票時間：</Text>
                      <Box>
                        <Text>2023/02/19(日) 12PM 全面開賣</Text>
                      </Box>
                    </Flex>
                  </ListItem>
                  <ListItem listStyleType="none">
                    <Text>*每人限購4張</Text>
                    <Text>*本次加場演出無提供會員預購， 全面開賣時會設提問。</Text>
                  </ListItem>
                </List>
                <List spacing={3}>
                  <ListItem textIndent="-16px" pl="16px">
                    ※
                    一人一票，憑票入場，孩童亦需購票。因考量人身安全及整體音量恐對孩童造成影響及其身高受限而影響視線，故孕婦及身高未滿110公分或7歲以下之孩童不建議購買搖滾站區，主辦方將有權謝絕入場，購票前請自行斟酌。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※ 活動現場禁止使用任何器材拍照、攝影、直播、錄音，違者須依照工作人員指示離場。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※
                    請務必於演出日前至主辦單位官方網站及社群頁面確認入場規範、粉絲福利入場流程等相關資訊，以免損害自身權益。如未能於公佈的進場/福利整隊時間內報到，將視為放棄排隊序號或福利權利。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※ 活動當天入場時需配合嚴格安檢，活動相關內容及詳細辦法請關注活動主辦單位
                  </ListItem>
                </List> */}
              </TabPanel>
              <TabPanel p="0">座位示意</TabPanel>
              <TabPanel p="0">
                <List>
                  {result?.notice.split('\n').map((item) => (
                    <ListItem pb="20px" listStyleType="none" key={item}>
                      {item}
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
              <TabPanel p="0">
                <Text mb="20px"> 親愛的客戶，感謝您的購票興趣！為確保順利完成購票，請您遵循以下提醒：</Text>

                <List spacing={3} mb="20px">
                  <ListItem textIndent="-16px" pl="16px">
                    ※
                    在售票期間內進行購票：請確保在指定的售票期間內進行購票。售票期間通常在活動公告中有明確指定的日期和時間範圍。
                  </ListItem>
                  <ListItem textIndent="-16px" pl="16px">
                    ※
                    完成付款程序：一旦您選擇了您想要的門票，請確保按照指示完成付款程序。這可能涉及選擇付款方式（例如信用卡、網上支付等）並填寫必要的付款資訊。
                  </ListItem>
                  <ListItem textIndent="-16px" pl="16px">
                    ※
                    確認購票成功：在完成付款後，請耐心等待購票系統的回應，確認您的購票是否成功。您可能會收到一份確認郵件或在網站上看到購票成功的訊息。
                  </ListItem>
                  <ListItem textIndent="-16px" pl="16px">
                    ※
                    檢查訂單資訊：請在購票後仔細檢查您的訂單資訊，包括門票數量、日期、時間以及任何其他詳細資訊。如有任何錯誤或不符之處，請立即聯絡主辦方進行更正。
                  </ListItem>
                  <ListItem textIndent="-16px" pl="16px">
                    ※
                    保留購票證明：請務必保存您的購票證明，例如電子郵件確認、訂單號碼或其他相關文件。這些資訊將有助於日後的取票或可能的退票手續。
                  </ListItem>
                </List>
                <Text>
                  請注意，只有在您完成付款程序並收到確認購票的訊息後，才能算作完成購票。如有任何疑問或需要進一步協助，請隨時與主辦方聯絡，他們將竭誠為您提供支援。祝您順利購票並享受活動的精彩時刻！
                </Text>
              </TabPanel>
              <TabPanel p="0">
                <Text mb="20px"> 親愛的客戶，感謝您選擇使用電子票券進入場。</Text>
                <List spacing={3} mb="20px">
                  <ListItem textIndent="-16px" pl="16px">
                    ※ 請您記住，在進入場地之前，請準備好您的電子票券以便快速取票。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※ 請確保您的手機或其他設備已經打開票券 QR Code，並且已登入您的帳戶。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※ 在您到達場地時，請出示您的電子票券給工作人員進行掃描，以完成入場手續。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※ 如果您遇到任何問題或需要協助，請隨時向工作人員尋求幫助。祝您享受愉快的活動體驗！
                  </ListItem>
                </List>
              </TabPanel>
              <TabPanel p="0">
                <Text mb="20px">親愛的客戶，若您需要退票，請您直接聯絡主辦方進行相關處理。以下是退票的相關說明：</Text>
                <List spacing={3} mb="20px">
                  <ListItem textIndent="-16px" pl="16px">
                    ※ 請在退票前仔細閱讀購票時所附的退票政策和條款。這些條款會詳細說明退票的限制、期限和可能的費用。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※
                    聯絡主辦方以取消您的訂單。您可以通過電子郵件、電話或其他指定的聯絡方式與主辦方取得聯繫。提供您的訂單號碼以及任何必要的資訊，以幫助主辦方處理您的退票申請。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※
                    根據退票政策，可能會有一些退票費用或手續費。請詳細了解退票政策中的相關規定，以確定可能需要支付的金額。
                  </ListItem>
                  <ListItem listStyleType="none" textIndent="-16px" pl="16px">
                    ※
                    請注意，退票的處理時間可能會根據主辦方的政策和程序而有所不同。請耐心等待主辦方處理您的申請，並注意相關通知或回覆。
                  </ListItem>
                </List>
                <Text mb="8px">
                  如果您有任何疑問或需要進一步的協助，請不要猶豫與主辦方的客戶服務團隊聯絡。他們將樂意為您解答問題並提供支援。
                </Text>
                <Text>
                  請確保在退票過程中保留所有相關的溝通記錄和文件，以便您有需要時能夠提供相關證據。祝您順利完成退票手續，感謝您的合作！
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box order={{ base: 1, md: 2 }}>
          <Text color="brand.500" fontWeight="700">
            開始售票
          </Text>
          <Text color="brand.500" mb="24px" fontWeight="700">
            {result &&
              result.events.length &&
              dayFormat(
                result.events.map((e) => e.sellStartTime).sort((a: string, b: string) => a.localeCompare(b))[0],
              )}
          </Text>
          <Box as="ul">
            {result &&
              result.events.map((event) => (
                <Card as="li" mb="24px" key={event.id}>
                  <CardBody p="0">
                    <Flex>
                      <Box bg="natural.50" p="20px" flexGrow="1">
                        <Text mb="8px">演出時間</Text>
                        <Text mb="4px"> {event?.startTime && dayFormat(event.startTime)}</Text>
                      </Box>
                      <Box textAlign="center" p="20px" alignSelf="center">
                        {isBeforeToday(event.sellStartTime) && (
                          <Text color="#BF7506" mb="8px">
                            {dayFromNow(event?.sellStartTime)}後開賣
                          </Text>
                        )}

                        {isBeforeToday(event.sellStartTime) && (
                          <Button size="md" bg="white">
                            即將開賣
                          </Button>
                        )}

                        {isAfterToday(event.sellEndTime) && (
                          <Button size="md" color="#BFBCBD" bg="white" disabled>
                            結束售票
                          </Button>
                        )}

                        {!event.soldOut && isAfterToday(event.sellStartTime) && isBeforeToday(event.sellEndTime) && (
                          <NextLink href={`/activities/${event.id}/step/1`} key={event.id}>
                            <Button
                              size="md"
                              color="white"
                              bg="primary.500"
                              _hover={{ bg: 'white', color: 'primary.500' }}
                              height="auto"
                            >
                              立即購票
                            </Button>
                          </NextLink>
                        )}

                        {event.soldOut && isBeforeToday(event.sellEndTime) && (
                          <Button size="md" color="#BFBCBD" bg="white" disabled>
                            售罄
                          </Button>
                        )}
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};

export default Activitie;
