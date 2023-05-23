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
import { motion } from 'framer-motion'
import { fadeLeft, fadeRight } from '@animation-variants'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import serviceBG from '@assets/images/services.png'
import serviceBGMedium from '@assets/images/services-md.png'
import serviceBGSmall from '@assets/images/services-sm.png'
import PrioritizationImage from '@assets/images/prioritization.png'
import paymentGuaranteeImage from '@assets/images/payment-guarantee.png'
import increaseSalesImages from '@assets/images/increase-sales.png'
interface IServicesProps {}

export default function Services(props: IServicesProps) {
  const { t } = useTranslation('services')
  const { t: tn } = useTranslation('navigation')
  const { locale } = useRouter()
  return (
    <>
      <NextSeo title='Swtle | Services' />
      <HeroSection
        image={{
          base: serviceBGSmall,
          md: serviceBGMedium,
          xl: serviceBG,
        }}
        title={tn('services')}
      />
      <Container minWidth='95%'>
        <Box pt={{ base: 4, md: 12, lg: 16, xl: 20 }} position='relative'>
          <Tabs isFitted>
            <TabList>
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
            </TabList>
            <TabIndicator
              mt='-1.5px'
              height={{ base: '2px', md: '3px' }}
              bg='primary'
              borderRadius='1px'
            />
            <TabPanels>
              <TabPanel>
                <IndividualServices />
              </TabPanel>
              <TabPanel>
                <BusinessServices />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Divider height='2px' my={4} backgroundColor='gray.500' />
        <Text fontWeight='bold' fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
          {t('services.benefits.header')}
        </Text>
        <Box>
          <TextImageSection
            title={`${t('services.benefits.1.title')}`}
            description={`${t('services.benefits.1.content')}`}
            descriptionFontSize={{ base: 'sm', md: 'md', xl: 'xl' }}
            sectionImage={{
              image: PrioritizationImage,
            }}
            styles={{
              padding: '0.5rem 0',
            }}
          />
        </Box>
        <Box>
          <TextImageSection
            title={`${t('services.benefits.2.title')}`}
            description={`${t('services.benefits.2.content')}`}
            descriptionFontSize={{ base: 'sm', md: 'md', xl: 'xl' }}
            sectionImage={{
              image: paymentGuaranteeImage,
            }}
            styles={{
              padding: '0.5rem 0',
            }}
            isReverse
          />
        </Box>
        <Box>
          <TextImageSection
            title={`${t('services.benefits.3.title')}`}
            description={`${t('services.benefits.3.content')}`}
            descriptionFontSize={{ base: 'sm', md: 'md', xl: 'xl' }}
            sectionImage={{
              image: increaseSalesImages,
            }}
            styles={{
              padding: '0.5rem 0',
            }}
          />
        </Box>
      </Container>
    </>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
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
