import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  useMediaQuery,
} from '@chakra-ui/react'
import { HeroSection, TextImageSection } from '@components'
import { NextSeo } from 'next-seo'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import MarkdownIt from 'markdown-it'
import aboutUsBG from '@assets/images/about-us.webp'
import aboutUsBGMedium from '@assets/images/about-us-md.webp'
import aboutUsBGSmall from '@assets/images/about-us-sm.webp'
import fetcher from '../services/fetcher'
import { useEffect } from 'react'

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

export default function AboutUs({
  data,
  metadata,
}: {
  data: any
  metadata: any
}) {
  const [isLargerThanXl] = useMediaQuery('(min-width: 80em)')
  useEffect(() => {
    console.log('Data-About-us: ', data)
  }, [data])
  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />
      <HeroSection
        image={{
          base: aboutUsBGSmall,
          md: aboutUsBGMedium,
          xl: aboutUsBG,
        }}
        title={data.header}
      />
      <Container minW='95%'>
        <TextImageSection
          header={data.aboutContent.header}
          title={data.aboutContent.title}
          description={data.aboutContent.description}
          verticalLine={{
            color: 'variation',
            width: 4,
          }}
          HGap={{
            base: 4,
          }}
          sectionImage={{
            image: data.aboutContent.sectionImage,
            radius: 'bottom left',
            radiusValue: '10rem',
          }}
          list={data.aboutContent.list}
        />
        <Tabs
          isFitted
          variant={{ base: 'soft-rounded', sm: 'line' }}
          pt={{ base: '4rem', lg: 0 }}
          colorScheme='teal'
        >
          <TabList
            flexDirection={{ base: 'column', sm: 'row' }}
            color='gray.500'
            _selected={{ color: 'primary' }}
          >
            {data.tabs.map((tab: any) => (
              <Tab
                key={tab.id}
                fontSize={{ base: 'sm', lg: 'lg' }}
                _hover={{ color: 'primary' }}
              >
                {tab.title}
              </Tab>
            ))}
          </TabList>
          <TabIndicator
            mt='-1.5px'
            height='2px'
            bg='primary'
            borderRadius='1px'
          />
          <TabPanels>
            {data.tabs.map((tab: any, i: number) => (
              <TabPanel key={i}>
                <TextImageSection
                  header={tab.content.header}
                  isSubHeaderLine={true}
                  description={tab.content.description}
                  descriptionFontSize={{
                    base: 'md',
                    xl: 'lg',
                  }}
                  sectionImage={{
                    image: tab.content.sectionImage,
                    radius: 'top left',
                    radiusValue: '10rem',
                    styles: {
                      top: isLargerThanXl ? '-8rem' : 0,
                    },
                  }}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  console.log('strapiUrl: ', strapiUrl)
  const response = await fetcher({
    url: `about-us?populate=deep&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  const data = {
    header: fetchedData.header,
    aboutContent: {
      ...fetchedData.aboutContent,
      description: MarkdownIt({ html: true }).render(
        fetchedData.aboutContent.description
      ),
      sectionImage: `${strapiUrl}${fetchedData.aboutContent.sectionImage.data.attributes.url}`,
    },
    tabs: fetchedData.tabs.map((tab: any) => ({
      ...tab,
      content: {
        ...tab.content,
        description: MarkdownIt({ html: true }).render(tab.content.description),
        sectionImage: `${strapiUrl}${tab.content.sectionImage.data.attributes.url}`,
      },
    })),
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
