import { useState } from 'react'
import { NextSeo } from 'next-seo'
import { Container, Flex, HStack, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { RegistrationForm, Videos } from '@components'

type Step = {
  id: number
  name: string
  phase: number
}

interface IRegisterProps {
  type: string
  steps: Step[]
}

type QueryType = 'personal' | 'business'

export default function Register({ type }: IRegisterProps) {
  const [step, setStep] = useState(2)
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
        <Text
          as='h1'
          textAlign='center'
          fontSize='4xl'
          mt={8}
          ml={8}
          fontWeight='bold'
        >
          {t('registration')}
        </Text>
        <Flex
          mt={{ base: 10 }}
          flexDirection='column'
          gap={{ base: 4, xl: 12 }}
          alignItems='center'
          justifyContent='center'
        >
          <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            w='full'
            gap={14}
          >
            <Videos
              url='https://www.youtube.com/watch?v=vn59J41x4GI&ab_channel=Swtle'
              thumbnail='../images/desktop.png'
              containerStyles={{
                width: '21.5rem',
                height: '14rem',
              }}
            />
          </Flex>
          <RegistrationForm
            step={step}
            setStep={setStep}
            type={type as QueryType}
          />
        </Flex>
        <HStack pb={8} justifyContent='center'>
          <Text as='p' color='gray.500'>
            {t('registration.already_has_account')}
            <Link
              ml={locale === 'en' ? 1 : 0}
              mr={locale === 'en' ? 0 : 1}
              color='secondary'
              as={NextLink}
              href='/login'
            >
              {tc('click_here')}
            </Link>
          </Text>
        </HStack>
      </Container>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { type: 'personal' }, locale: 'en' },
      { params: { type: 'personal' }, locale: 'ar' },
      { params: { type: 'business' }, locale: 'en' },
      { params: { type: 'business' }, locale: 'ar' },
    ],
    fallback: false,
  }
}

export const getStaticProps = async ({
  locale,
  params,
}: GetStaticPropsContext) => {
  const stepsValues = [
    'company',
    'credential',
    'personal_info',
    'address_info',
    'phones_info',
    'documents_info',
  ]
  const steps = () => {
    if (params?.type === 'personal') {
      stepsValues.shift()
    }
    return stepsValues.map((step, index) => ({
      id: index + 1,
      name: step,
      phase: index,
    }))
  }
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'home',
        'navigation',
        'registration',
        'footer',
      ])),
      type: params?.type,
      steps: steps(),
    },
  }
}
