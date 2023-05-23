import type { GetStaticPropsContext } from 'next'
import {
  FAQ,
  HowItWorkDiagram,
  MainHeroSection,
  SpecialAboutSwtle,
  TakeAction,
  TakeActionSection,
  TextImageSection,
  WhySwtle,
} from '@components'
import { NextSeo } from 'next-seo'
import { Container } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import aboutSwtleImage from '@assets/images/about-swtle.png'
export default function Home() {
  const { t } = useTranslation('home')
  const { t: tNav } = useTranslation('navigation')
  const { t: tCommon } = useTranslation('common')
  return (
    <>
      <NextSeo
        title={`${tCommon('swtle')} | ${tNav('home')}`}
        description='Swtle is an electronic-transaction complex, licensed by the department of economics and tourism in Dubai and authorized by the telecommunications and digital government regulatory authority, used to prove forward sales, advanced payments and electronic invoices, Thus, we help save the environment and make data accessibility fast and effiecient anytime and anywhere...'
        canonical='https://www.swtle.com'
      />
      <MainHeroSection isStatistics />
      <WhySwtle />
      <TakeAction
        content={t('cta.1.title')}
        cta={{ label: tCommon('sign_up'), href: '/login' }}
        width={{ base: '100%', md: '80%', xl: '60%' }}
        styles={{ padding: '2.5rem 0', backgroundColor: '#F9F9F9' }}
      />
      <SpecialAboutSwtle />
      <HowItWorkDiagram
        images={{
          base: t('diagram_small'),
          sm: t('diagram_medium'),
          lg: t('diagram_large'),
        }}
      />
      <Container minWidth='95%'>
        <TextImageSection
          header={`${t('about.header')}`}
          isSubHeaderLine={true}
          title={`${t('about.title')}`}
          subtitle={`${t('about.subtitle')}`}
          description={`${t('about.content')}`}
          descriptionFontSize={{ base: 'sm', md: 'md' }}
          sectionButton={{
            label: tCommon('read_more'),
            href: '/about-us',
            variant: 'primary',
            borderRadius: 8,
          }}
          sectionImage={{
            image: aboutSwtleImage,
            radius: 'top left',
            radiusValue: '12rem',
            outline: 'bottom left',
          }}
        />
      </Container>
      <FAQ />
      <TakeActionSection />
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
        'footer',
      ])),
    },
  }
}
