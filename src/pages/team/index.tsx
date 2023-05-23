import { Container, Flex, Text } from '@chakra-ui/react'
import * as React from 'react'
import {
  HeroSection,
  TakeAction,
  TeamMemberCard,
  TextImageSection,
} from '@components'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import teamBG from '@assets/images/team.png'
import teamBGMedium from '@assets/images/team-md.png'
import teamBGSmall from '@assets/images/team-sm.png'

interface ITeamProps {}

export default function Team(props: ITeamProps) {
  const { t } = useTranslation('team')
  const { t: tn } = useTranslation('navigation')
  return (
    <>
      <NextSeo title='Swtle | Our Team' />
      <HeroSection
        image={{
          base: teamBGSmall,
          md: teamBGMedium,
          xl: teamBG,
        }}
        title={tn('our_team')}
      />
      <Container minW='95%'>
        <TextImageSection
          header={`${t('team.header')}`}
          description={`${t('team.content')}`}
          descriptionFontSize={{
            base: 'md',
            md: 'xl',
          }}
          isVectorOne={true}
          isVectorTwo={true}
          HGap={{
            base: 8,
          }}
          sectionImage={{
            image: '/images/team-text.png',
            overlayText: `${t('team')}`,
          }}
          verticalLine={{
            color: 'variation',
            width: 4,
          }}
        />
        <Flex flexWrap='wrap' justifyContent='center' gap={{ base: 8 }}>
          {[...Array.from({ length: 6 })].map((_, i) => (
            <TeamMemberCard key={i} />
          ))}
        </Flex>

        <TakeAction
          content={t('team.cta.content')}
          isContactUs={true}
          width={{
            base: '100%',
            md: '75%',
            xl: '50%',
          }}
          styles={{
            padding: '3rem 0',
          }}
        />
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
        'team',
        'footer',
      ])),
    },
  }
}
