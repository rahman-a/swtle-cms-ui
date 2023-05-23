import {
  HeroSection,
  ServiceBenefits,
  TextImageSection,
  TakeAction,
} from '@components'
import { Box, Container, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import serviceBG from '@assets/images/services.png'
import serviceBGMedium from '@assets/images/services-md.png'
import serviceBGSmall from '@assets/images/services-sm.png'
import serviceCardBG from '@assets/images/service-card.png'
interface IServiceProps {}

export default function Service(props: IServiceProps) {
  const router = useRouter()
  const { t } = useTranslation('services')
  const { t: tn } = useTranslation('navigation')
  const { t: tc } = useTranslation('common')
  const capitalizeService = (str: string) => {
    return !str ? '' : str.charAt(0).toUpperCase() + str.slice(1)
  }
  return (
    <>
      <NextSeo
        title={`Swtle | ${capitalizeService(router.query.service as string)}`}
      />
      <HeroSection
        image={{
          base: serviceBGSmall,
          md: serviceBGMedium,
          xl: serviceBG,
        }}
        title={tn('services')}
      />
      <Container minWidth='95%'>
        <TextImageSection
          title={`${t('services.benefits.1.title')}`}
          description={`${t('services.benefits.1.content')}`}
          sectionImage={{
            image: serviceCardBG,
          }}
          styles={{
            paddingTop: '0.5rem',
          }}
        />
      </Container>
      <Flex justify='center'>
        <ServiceBenefits />
      </Flex>
      <Box py={12} px={{ base: 4, md: 0 }}>
        <TakeAction
          content={t('services.cta.content')}
          cta={{
            label: tc('try_swtle_today'),
            href: `${process.env.NEXT_PUBLIC_APP_URL}`,
          }}
        />
      </Box>
    </>
  )
}

export const getStaticPaths = async ({ locales }: GetStaticPropsContext) => {
  const paths = []
  const slugs = [
    'prepayment-recording',
    'electronic-invoicing',
    'payment-tracking',
    'cashback-offers',
    'finance',
    'accounting',
    'electronic-invoicing',
    'credit-indicators',
    'expenses',
  ]
  for (const locale of locales!) {
    for (const slug of slugs) {
      paths.push({ params: { service: slug }, locale })
    }
  }
  return {
    paths,
    fallback: false,
  }
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
