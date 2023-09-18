import type { GetStaticPropsContext } from 'next'
import { NextSeo } from 'next-seo'
import { Container } from '@chakra-ui/react'
import MarkdownIt from 'markdown-it'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import heroSectionBGImage from '@assets/images/main-hero-section.webp'
import heroSectionBGImageMedium from '@assets/images/main-hero-section-md.webp'
import heroSectionBGImageSmall from '@assets/images/main-hero-section-sm.webp'
import fetcher from '@api/fetcher'
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

export default function Home({ data, metadata }: { data: any; metadata: any }) {
  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
        canonical='https://www.swtle.com'
      />
      <MainHeroSection
        isStatistics={data.is_statistics_section}
        images={{
          base: heroSectionBGImageSmall.src,
          md: heroSectionBGImageMedium.src,
          lg: heroSectionBGImage.src,
        }}
        stats={data.stats}
        data={{
          title: data.header,
          subtitle: data.subheader,
          cta: {
            label: data.buttons[0].label,
            href: data.buttons[0].link,
          },
          companyName: data.companyName,
          partners: data.partners,
          video: {
            url: data.video.url,
            thumbnail: data.video.thumbnail,
          },
        }}
      />
      <WhySwtle
        header={data.articlesSection.header}
        subheader={data.articlesSection.subheader}
        articles={data.articlesSection.articles}
      />
      <TakeAction
        content={data.takeActionOne.content}
        cta={{
          label: data.takeActionOne.cta.label,
          href: data.takeActionOne.cta.link,
        }}
        width={{ base: '100%', md: '80%', xl: '60%' }}
        styles={{ padding: '2.5rem 0', backgroundColor: '#F9F9F9' }}
      />
      <SpecialAboutSwtle
        title={data.special.title}
        image={data.special.image}
        features={data.special.items}
      />
      <HowItWorkDiagram
        images={{
          base: data.howItWorksBGImages.base,
          sm: data.howItWorksBGImages.md,
          lg: data.howItWorksBGImages.default,
        }}
      />
      <Container minWidth='95%'>
        <TextImageSection
          header={data.aboutSwtle.header}
          isSubHeaderLine={true}
          title={data.aboutSwtle.title}
          subtitle={data.aboutSwtle.subtitle}
          description={data.aboutSwtle.description}
          descriptionFontSize={{ base: 'sm', md: 'md' }}
          sectionButton={{
            label: data.aboutSwtle.sectionButton.label,
            href: data.aboutSwtle.sectionButton.link,
            variant: 'primary',
            borderRadius: 8,
          }}
          sectionImage={{
            image: data.aboutSwtle.sectionImage,
            radius: 'top left',
            radiusValue: '12rem',
            outline: 'bottom left',
          }}
        />
      </Container>
      <FAQ faqs={data.faqs} IsContactUs={false} />
      <TakeActionSection
        title={data.takeActionTwo.title}
        content={data.takeActionTwo.content}
        cta={{
          label: data.takeActionTwo.cta.label,
          href: data.takeActionTwo.cta.link,
        }}
      />
    </>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const response = await fetcher({ url: `home?populate=deep&locale=${locale}` })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  const articlesSection = {
    ...fetchedData.Articles_Section,
    articles: fetchedData.Articles_Section.articles.data.map(
      (article: any) => ({
        id: article.id,
        title: article.attributes.title,
        body: MarkdownIt({ html: true }).render(article.attributes.body),
        slug: article.attributes.slug,
        image: article.attributes.image,
      })
    ),
  }

  const special = {
    ...fetchedData.Special_Section,
    title: fetchedData.Special_Section.section_title,
    image: fetchedData.Special_Section.image,
  }

  const aboutSwtle = {
    ...fetchedData.aboutCompany,
    description: MarkdownIt({ html: true }).render(
      fetchedData.aboutCompany.description
    ),
    sectionImage: fetchedData.aboutCompany.sectionImage,
  }

  const faqs = fetchedData.faqs.data.map((faq: any) => ({
    id: faq.id,
    question: faq.attributes.question,
    answer: faq.attributes.answer,
  }))

  const howItWorksBGImages = {
    base: fetchedData.howITWorks.small,
    md: fetchedData.howITWorks.medium,
    default: fetchedData.howITWorks.default,
  }

  return {
    props: {
      data: {
        ...fetchedData.HeroSection,
        is_statistics_section: fetchedData.is_statistics_section,
        articlesSection,
        takeActionOne: {
          ...fetchedData.takeActionSection_1,
        },
        special,
        aboutSwtle,
        howItWorksBGImages,
        faqs,
        takeActionTwo: {
          ...fetchedData.takeActionSection_2,
        },
      },
      metadata: fetchedData.metadata,
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'footer',
      ])),
    },
  }
}
