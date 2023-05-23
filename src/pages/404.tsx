import * as React from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
export interface INotFoundPageProps {}

export default function NotFoundPage(props: INotFoundPageProps) {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <>
      <NextSeo title='Swtle | Not Found' />
      <Flex alignItems='center' justifyContent='center' minH='100vh'>
        <Box textAlign='center' py={10} px={6}>
          <Heading
            display='inline-block'
            as='h2'
            size='2xl'
            bgGradient='linear(to-r, #21597ff2, #3FA5BA)'
            backgroundClip='text'
          >
            404
          </Heading>
          <Text fontSize='18px' mt={3} mb={2}>
            {t('page_not_found')}
          </Text>
          <Text color={'gray.500'} mb={6}>
            {t('page_not_exist')}
          </Text>

          <Button
            variant='primary'
            bgGradient='linear(to-r, #21597ff2, #3FA5BA)'
            color='white'
            onClick={() => router.push('/')}
          >
            {t('back_to_home')}
          </Button>
        </Box>
      </Flex>
    </>
  )
}
export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'navigation',
        'footer',
      ])),
    },
  }
}
