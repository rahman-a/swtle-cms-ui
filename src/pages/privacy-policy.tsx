import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'next-i18next'
import { PrivacyLockIcon } from '../icons'
import fetcher from '../services/fetcher'
const RenderHtml = dynamic(() => import('../components/Render-Html'))

interface IPrivacyPolicyProps {
  data: {
    title: string
    article: string
  }
  metadata: any
}

export default function PrivacyPolicy({ data, metadata }: IPrivacyPolicyProps) {
  const { t } = useTranslation('common')

  return (
    <>
      <NextSeo
        title={metadata.metaTitle}
        description={metadata.metaDescription}
      />
      <Container minW='95%' mt={{ base: 6, md: 10, lg: 12, xl: 14 }}>
        <Flex flexDirection='column' alignItems='center'>
          <Box>
            <PrivacyLockIcon boxSize={20} color='primary' />
          </Box>
          <Heading
            fontSize={{ base: '2xl', sm: '3xl', lg: '4xl', xl: '5xl' }}
            color='primary'
          >
            {t('privacy_policy')}
          </Heading>
          <Text as='p' fontSize='xl' py={4} fontWeight='bold'>
            {t('your_privacy_important')}
          </Text>
          {/* privacy policy article will be rendered here */}
          <RenderHtml
            className='privacy-policy'
            as='article'
            fontFamily='body'
            style={{ direction: 'rtl' }}
            py={6}
            maxW={{ base: 'full', lg: '80%' }}
            html={data.article}
          />
          <VStack
            mb={{ base: 4, lg: 2 }}
            pb={{ base: 4, lg: 2 }}
            w='fit-content'
            spacing={4}
            justifyContent='center'
            alignItems='flex-start'
          >
            <Text as='p' fontSize='lg' mt={16}>
              {t('have_question')}
            </Text>
            <Stack w='100%' alignItems={{ base: 'flex-start', lg: 'flex-end' }}>
              <Link
                as={NextLink}
                href='/contact-us'
                border='1px solid'
                px={4}
                py={2}
                _hover={{
                  textDecoration: 'none',
                  bg: 'primary',
                  color: 'white',
                }}
                color='secondary'
                borderRadius='5rem'
              >
                {t('contact_us')}
              </Link>
            </Stack>
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  const response = await fetcher({
    url: `privacy-policy?populate=deep&locale=${locale}`,
  })
  if (!response || response.data?.length === 0) {
    return {
      notFound: true,
    }
  }
  const fetchedData = response.data.attributes
  const data = {
    title: fetchedData.Title,
    article: MarkdownIt({ html: true }).render(fetchedData.Article),
  }
  return {
    props: {
      data,
      metadata: fetchedData.metadata,
      ...(await serverSideTranslations(locale!, [
        'common',
        'home',
        'navigation',
        'footer',
      ])),
    },
  }
}
