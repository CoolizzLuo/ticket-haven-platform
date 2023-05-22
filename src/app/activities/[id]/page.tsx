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

const Activitie = () => {
  const params = useParams();
  const { id } = params;
  return (
    <Container maxW="1200px" pb="80px" pt="40px">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">首頁 </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" fontWeight="700">
            BLACKPINK WORLD TOUR [BORN PINK] KAOHSIUNG
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
          BLACKPINK WORLD TOUR [BORN PINK] KAOHSIUNG
        </Heading>
        <Flex mb="48px">
          <Text>2023/03/18 (Sat.) - 2023/03/19 (Sun.)</Text>/<Text>高雄國家體育場 (世運主場館)</Text>
        </Flex>
        <List bg="#FFF3F8" py="20px" pl="36px" borderRadius="6px">
          <ListItem mb="20px" listStyleType="disc">
            欲購票者，需先完成加入會員及手機號碼驗證，驗證成功後才可開始購票，請提早完成手機驗證，以免影響購票。（手機號碼僅限首次加入會員者需要驗證。）
          </ListItem>
          <ListItem listStyleType="disc" color="#BF7506">
            兩場身障優惠席次已全數售完，請勿再傳真，謝謝
          </ListItem>
        </List>
      </Box>

      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap="30px" as="ul" alignItems="stretch">
        <Box>
          <Tabs variant="unstyled">
            <TabList mb="24px">
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
                節目介紹
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
                座位示意
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
                注意事項
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
                購票提醒
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
                取票提醒
              </Tab>
              <Tab borderWidth="1px" borderRadius="md" mr="8px" _selected={{ color: 'white', bg: 'brand.100' }}>
                退票說明
              </Tab>
            </TabList>
            <TabPanels bg="#F7F4F6" borderRadius="6px" p="32px" pb="100px">
              <TabPanel p="0">
                <Text mb="40px">【TOMORROW X TOGETHER WORLD TOUR &lt;ACT: SWEET MIRAGE&gt; IN TAIPEI】加場公告</Text>
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
                </List>
              </TabPanel>
              <TabPanel p="0">座位示意</TabPanel>
              <TabPanel p="0">注意事項</TabPanel>
              <TabPanel p="0">購票提醒</TabPanel>
              <TabPanel p="0">取票提醒</TabPanel>
              <TabPanel p="0">退票說明</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box>
          <Text color="brand.100" fontWeight="700">
            開始售票
          </Text>
          <Text color="brand.100" mb="24px" fontWeight="700">
            2022/11/10 (Thu.) 12:00 pm
          </Text>
          <Box as="ul">
            <NextLink href={`/activities/${id}/step/1`}>
              <Card as="li" mb="24px">
                <CardBody>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text mb="8px">演出時間</Text>
                      <Text mb="4px">2023/03/19 (Sun.) </Text>
                      <Text>19:30</Text>
                    </Box>
                    <Box textAlign="center">
                      <Text color="#BF7506" mb="8px">
                        29 分 30 秒後開賣
                      </Text>
                      <Button
                        fontSize={20}
                        fontWeight={600}
                        color="#BFBCBD"
                        border="1px solid #BFBCBD"
                        bg="white"
                        height="auto"
                        px="12px"
                        py="8px"
                        disabled
                      >
                        即將開賣
                      </Button>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </NextLink>
            <NextLink href={`/activities/${id}/step/1`}>
              <Card as="li" mb="24px">
                <CardBody>
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text mb="8px">演出時間</Text>
                      <Text mb="4px">2023/03/19 (Sun.) </Text>
                      <Text>19:30</Text>
                    </Box>
                    <Box textAlign="center">
                      <Text color="#BF7506" mb="8px">
                        29 分 30 秒後開賣
                      </Text>
                      <Button
                        fontSize={20}
                        fontWeight={600}
                        color="#BFBCBD"
                        border="1px solid #BFBCBD"
                        bg="white"
                        height="auto"
                        px="12px"
                        py="8px"
                        disabled
                      >
                        即將開賣
                      </Button>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </NextLink>
          </Box>
        </Box>
      </Grid>
    </Container>
  );
};

export default Activitie;
