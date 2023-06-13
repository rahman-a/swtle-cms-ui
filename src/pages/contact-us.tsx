import { NextSeo } from 'next-seo'
import { ContactForm, GoogleMap, HeroSection, FAQ } from '../components'
import {
  Container,
  Flex,
  List,
  Link,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { LocationIcon } from '../icons'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import contactUsBG from '@assets/images/contact-us.webp'
import contactUsBGMedium from '@assets/images/contact-us-md.webp'
import contactUsBGSmall from '@assets/images/contact-us-sm.webp'
import fetcher from '../services/fetcher'

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

interface IContactUsProps {}

export default function ContactUs({
  data,
  metadata,
}: {
  data: any
  metadata: any
}) {
  const { t } = useTranslation('contact')
  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />
      <HeroSection
        image={{
          base: contactUsBGSmall,
          md: contactUsBGMedium,
          xl: contactUsBG,
        }}
        position={{ base: 'inherit', md: 'center' }}
        title={data.header}
      />
      <Container minW='95%' mb='14'>
        <Flex flexDirection={{ base: 'column', lg: 'row' }} gap={{ base: 20 }}>
          <VStack alignItems='flex-start' spacing={4}>
            <Box>
              <Text as='h2' fontSize='3xl'>
                {data.title}
              </Text>
              <Text as='p' fontSize='xl'>
                {data.subtitle}
              </Text>
              <List spacing={6} py={4}>
                <ListItem>
                  <ListIcon as={LocationIcon} color='secondary' />
                  {data.location}
                </ListItem>
                <ListItem>
                  <ListIcon as={PhoneIcon} color='secondary' />
                  {data.phone}
                </ListItem>
                <ListItem>
                  <ListIcon as={EmailIcon} color='secondary' />
                  {t('contact.email')} : &nbsp;
                  <Link as={NextLink} href={`mailto:${data.email}`}>
                    {data.email}
                  </Link>
                </ListItem>
              </List>
            </Box>
            {/* Google Map */}
            <Box width={{ base: '100%', lg: 'auto' }}>
              <GoogleMap url={data.mapUrl} />
            </Box>
          </VStack>
          <ContactForm />
        </Flex>
        <Box my='10'>
          <FAQ faqs={data.faqs} IsContactUs={true} />
        </Box>
      </Container>
    </>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const response = await fetcher({
    url: `contact-us?populate=deep&locale=${locale}`,
  })
  const FAQsResponse = await fetcher({
    url: `faqs?&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  const faqs = FAQsResponse.data.map((faq: any) => ({
    id: faq.id,
    question: faq.attributes.question,
    answer: faq.attributes.answer,
  }))
  return {
    props: {
      data: {
        header: fetchedData.header,
        title: fetchedData.title,
        subtitle: fetchedData.subtitle,
        location: fetchedData.location,
        email: fetchedData.email,
        phone: fetchedData.phone,
        mapUrl: fetchedData.googleMapUrl,
        faqs,
      },
      metadata: fetchedData.metadata,
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'contact',
        'footer',
      ])),
    },
  }
}
