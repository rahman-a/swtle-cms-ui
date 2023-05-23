import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import {
  Container,
  Flex,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Text,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Countdown, { zeroPad } from 'react-countdown'
import userAPI from '../services/credentials'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
interface IEmailActivationProps {
  isVerified: boolean
  message: string
}

export default function EmailActivation({
  isVerified,
  message,
}: IEmailActivationProps) {
  const router = useRouter()
  const { t } = useTranslation('common')
  return (
    <>
      <NextSeo title='Swtle | E-mail Activation' />
      <Container minW='95%'>
        <Flex
          position='relative'
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          alignItems='flex-start'
          justifyContent='center'
          minH='50vh'
        >
          <VStack width='100%' mt={{ base: '10vh' }}>
            {isVerified ? (
              <>
                <Alert
                  status='success'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  w={{ base: '100%' }}
                >
                  <AlertIcon />
                  <AlertTitle>{t('congratulation')}</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
                <HStack my={2} spacing={2} w='100%' justifyContent='center'>
                  <Text as='p'>{t('redirect_to_login')}</Text>
                  <Countdown
                    date={Date.now() + 15000}
                    renderer={({ seconds }) => (
                      <Text as='span' fontWeight='bold' color='red.700'>
                        {zeroPad(seconds)}
                      </Text>
                    )}
                    onComplete={() =>
                      router.push(`${process.env.NEXT_PUBLIC_APP_URL}`)
                    }
                  />
                  <Text as='p'>{t('seconds')}</Text>
                </HStack>
              </>
            ) : (
              <Alert
                status='error'
                display='flex'
                alignItems='center'
                justifyContent='center'
                w={{ base: '100%' }}
              >
                <AlertIcon />
                <AlertTitle>{t('went_wrong')}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </VStack>
        </Flex>
      </Container>
    </>
  )
}

export const getServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  const { TOKEN } = query
  if (!TOKEN)
    return {
      props: {
        isVerified: false,
        message: locale === 'en' ? 'The link is invalid' : 'الرابط غير صالح',
        ...(await serverSideTranslations(locale!, [
          'common',
          'navigation',
          'footer',
        ])),
      },
    }
  try {
    const { data } = await userAPI.verifyAuthLink({
      token: TOKEN,
      type: 'activate',
    })
    if (data.success) {
      return {
        props: {
          isVerified: true,
          message: data.message,
          ...(await serverSideTranslations(locale!, [
            'common',
            'navigation',
            'footer',
          ])),
        },
      }
    }
  } catch (error: any) {
    if (error.response) {
      return {
        props: {
          isVerified: false,
          message: error.response.data.message,
          ...(await serverSideTranslations(locale!, [
            'common',
            'navigation',
            'footer',
          ])),
        },
      }
    }
  }
}
