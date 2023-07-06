import { Container, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { RegistrationForm, RegistrationProgressIndicator } from '@components'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import Video from '../components/Videos'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const [step, setStep] = useState(0)
  const { locale } = useRouter()
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')

  return (
    <>
      <NextSeo title='Swtle | Register' />
      <Container
        minW={{ base: '100%', md: '95%' }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <Text as='h1' fontSize='4xl' mt={8} ml={8} fontWeight='bold'>
          {t('registration')}
        </Text>
        <Flex
          mt={{ base: 10, sm: 12, md: 32 }}
          flexDirection='column'
          gap={{ base: 4, xl: 12 }}
          alignItems={{ base: 'center', lg: 'flex-start' }}
          justifyContent={{ base: 'center' }}
        >
          <Flex
            alignItems={{ base: 'center', lg: 'flex-end' }}
            w='full'
            gap={14}
            flexDirection={{ base: 'column-reverse', lg: 'row' }}
          >
            <RegistrationProgressIndicator step={step} />
            <Video
              url='https://www.youtube.com/watch?v=vn59J41x4GI&ab_channel=Swtle'
              thumbnail='../images/desktop.png'
              containerStyles={{
                width: '21.5rem',
                height: '14rem',
              }}
            />
          </Flex>
          <RegistrationForm step={step} setStep={setStep} />
        </Flex>
        <HStack pb={8} justifyContent='center'>
          <Text as='p' color='gray.500'>
            {t('registration.already_has_account')}
            <Link
              ml={locale === 'en' ? 1 : 0}
              mr={locale === 'en' ? 0 : 1}
              color='secondary'
              as={NextLink}
              href='https://app.swtle.com'
            >
              {tc('click_here')}
            </Link>
          </Text>
        </HStack>
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
        'registration',
        'footer',
      ])),
    },
  }
}
