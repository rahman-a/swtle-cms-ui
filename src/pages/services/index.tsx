import {
  BusinessServices,
  HeroSection,
  IndividualServices,
  TextImageSection,
} from '@/src/components'
import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Text,
  TabIndicator,
  Divider,
} from '@chakra-ui/react'
import { UserIcon, SuitCaseIcon } from '@icons'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import serviceBG from '@assets/images/services.webp'
import serviceBGMedium from '@assets/images/services-md.webp'
import serviceBGSmall from '@assets/images/services-sm.webp'
import fetcher from '@/src/services/fetcher'
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

interface IServicesProps {
  data: {
    header: string
    individual: []
    business: []
    benefits: []
  }
  metadata: any
}

export default function Services({ data, metadata }: IServicesProps) {
  const { t } = useTranslation('services')
  const { t: tn } = useTranslation('navigation')
  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />
      <HeroSection
        image={{
          base: serviceBGSmall,
          md: serviceBGMedium,
          xl: serviceBG,
        }}
        title={data.header}
      />
      <Container minWidth='95%'>
        <Box pt={{ base: 4, md: 12, lg: 16, xl: 20 }} position='relative'>
          <Tabs isFitted>
            <TabList>
              {data.individual.length > 0 && (
                <Tab color='gray.400' _selected={{ color: 'primary' }}>
                  <HStack spacing={4}>
                    <UserIcon boxSize={8} />
                    <Text
                      as='h2'
                      fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl' }}
                    >
                      {tn('services.individual')}
                    </Text>
                  </HStack>
                </Tab>
              )}
              {data.business.length > 0 && (
                <Tab color='gray.400' _selected={{ color: 'primary' }}>
                  <HStack spacing={4}>
                    <SuitCaseIcon boxSize={8} />
                    <Text
                      as='h2'
                      fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl' }}
                    >
                      {tn('services.business')}
                    </Text>
                  </HStack>
                </Tab>
              )}
            </TabList>
            <TabIndicator
              mt='-1.5px'
              height={{ base: '2px', md: '3px' }}
              bg='primary'
              borderRadius='1px'
            />
            <TabPanels>
              {data.individual.length > 0 && (
                <TabPanel>
                  <IndividualServices services={data.individual} />
                </TabPanel>
              )}
              {data.business.length > 0 && (
                <TabPanel>
                  <BusinessServices services={data.business} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Box>
        {data.benefits.length > 0 && (
          <>
            <Divider height='2px' my={4} backgroundColor='gray.500' />
            <Text
              fontWeight='bold'
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            >
              {t('services.benefits.header')}
            </Text>
          </>
        )}
        {data.benefits.length > 0 &&
          data.benefits.map((item: any, idx: number) => (
            <Box key={item.id}>
              <TextImageSection
                title={item.title}
                description={item.description}
                descriptionFontSize={{ base: 'sm', md: 'md', xl: 'xl' }}
                isReverse={idx % 2 === 1}
                sectionImage={{
                  image: item.sectionImage,
                }}
                styles={{
                  padding: '0.5rem 0',
                }}
              />
            </Box>
          ))}
      </Container>
    </>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const response = await fetcher({
    url: `our-service?populate=deep&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  const data = {
    header: fetchedData.header,
    individual: fetchedData.Individual.length
      ? fetchedData.Individual.map((item: any) => ({
          ...item,
          icon: `${strapiUrl}${item.icon.data.attributes.url}`,
          content: {
            ...item.content,
            sectionImage: `${strapiUrl}${item.content.sectionImage.data.attributes.url}`,
          },
        }))
      : [],
    business: fetchedData.Business.length
      ? fetchedData.Business.map((item: any) => ({
          ...item,
          icon: `${strapiUrl}${item.icon.data.attributes.url}`,
          content: {
            ...item.content,
            sectionImage: `${strapiUrl}${item.content.sectionImage.data.attributes.url}`,
          },
        }))
      : [],
    benefits: fetchedData.Benefits.length
      ? fetchedData.Benefits.map((item: any) => ({
          ...item,
          sectionImage: `${strapiUrl}${item.sectionImage.data.attributes.url}`,
        }))
      : [],
  }
  return {
    props: {
      data,
      metadata: fetchedData.metadata,
      ...(await serverSideTranslations(locale!, [
        'common',
        'home',
        'navigation',
        'services',
        'footer',
      ])),
    },
  }
}
