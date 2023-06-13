import {
  HeroSection,
  ServiceBenefits,
  TextImageSection,
  TakeAction,
} from '@components'
import { Box, Container, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import MarkdownIt from 'markdown-it'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import serviceBG from '@assets/images/services.webp'
import serviceBGMedium from '@assets/images/services-md.webp'
import serviceBGSmall from '@assets/images/services-sm.webp'
import fetcher from '@/src/services/fetcher'
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

interface IServiceProps {
  data: {
    content: any
    benefits: any
    action: any
  }
  metadata: any
}

export default function Service({ data, metadata }: IServiceProps) {
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
        title={tn('services')}
      />
      <Container minWidth='95%'>
        <TextImageSection
          title={data.content.title}
          description={data.content.description}
          sectionImage={{
            image: data.content.sectionImage,
          }}
          list={data.content.list}
          styles={{
            paddingTop: '0.5rem',
          }}
        />
      </Container>
      <Flex justify='center'>
        <Box maxW={{ base: '98%', lg: '50%' }}>
          <ServiceBenefits benefits={data.benefits} />
        </Box>
      </Flex>
      <Box py={12} px={{ base: 4, md: 0 }}>
        <TakeAction
          content={data.action.content}
          cta={{
            label: data.action.cta.label,
            href: data.action.cta.link,
          }}
        />
      </Box>
    </>
  )
}

export const getStaticPaths = async ({ locales }: GetStaticPropsContext) => {
  const paths = []
  const slugs = [
    'payment-transactions-recording-and-tracking',
    'electronic-invoicing',
    'credit-evaluation',
    'financing-solution',
    'debt-collection',
    'legal-recourse',
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

export const getStaticProps = async ({
  locale,
  params,
}: GetStaticPropsContext) => {
  const response = await fetcher({
    url: `services/${params?.service}?locale=${locale}`,
  })
  if (!response || !response.data) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  const data = {
    content: {
      ...fetchedData.description,
      description: MarkdownIt({ html: true }).render(
        fetchedData.description.description
      ),
      sectionImage: `${strapiUrl}${fetchedData.description.sectionImage.data.attributes.url}`,
    },
    benefits: fetchedData.Benefits,
    action: fetchedData.action,
  }
  return {
    props: {
      data,
      metadata: fetchedData.metadata,
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'footer',
      ])),
    },
  }
}
