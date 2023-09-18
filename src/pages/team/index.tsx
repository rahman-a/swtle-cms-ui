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
import MarkdownIt from 'markdown-it'
import teamBG from '@assets/images/team.webp'
import teamBGMedium from '@assets/images/team-md.webp'
import teamBGSmall from '@assets/images/team-sm.webp'
import fetcher from '@/src/services/fetcher'
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

interface ITeamProps {
  data: any
  metadata: any
}

export default function Team({ data, metadata }: ITeamProps) {
  const { t } = useTranslation('team')
  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />
      <HeroSection
        image={{
          base: teamBGSmall,
          md: teamBGMedium,
          xl: teamBG,
        }}
        title={data.header}
      />
      <Container minW='95%'>
        <TextImageSection
          header={data.aboutTeam.header}
          description={data.aboutTeam.description}
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
            image: data.aboutTeam.sectionImage,
            overlayText: `${t('team')}`,
          }}
          verticalLine={{
            color: 'variation',
            width: 4,
          }}
        />
        <Flex flexWrap='wrap' justifyContent='center' gap={{ base: 8 }}>
          {data.staff.map((member: any) => (
            <TeamMemberCard member={member} key={member.id} />
          ))}
        </Flex>

        <TakeAction
          content={data.cta.content}
          isContactUs={data.cta.isContactUs}
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
  const response = await fetcher({
    url: `our-team?populate=deep&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data?.attributes
  console.log('fetchedData: ', fetchedData)
  const data = {
    header: fetchedData.header,
    aboutTeam: {
      ...fetchedData.aboutTeam,
      sectionImage: fetchedData.aboutTeam.sectionImage,
    },
    staff: fetchedData.staff.data.map((member: any) => ({
      id: member.id,
      ...member.attributes,
      biography: MarkdownIt({ html: true }).render(member.attributes.biography),
      image: member.attributes.image ? member.attributes.image : null,
      CV: member.attributes.CV.data
        ? `${strapiUrl}${member.attributes.CV.data?.attributes.url}`
        : null,
      socials: member.attributes.socials.length
        ? member.attributes.socials.map((social: any) => ({
            ...social,
            icon: `${strapiUrl}${social.icon.data?.attributes.formats.thumbnail.url}`,
          }))
        : [],
    })),
    cta: fetchedData.action,
  }
  console.log('data: ', data)
  return {
    props: {
      data,
      metadata: fetchedData.metadata,
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
