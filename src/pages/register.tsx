import { Container, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { RegistrationForm, RegistrationProgressIndicator } from '@components'
import { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
  const [step, setStep] = useState(0)
  return (
    <>
      <NextSeo title='Swtle | Register' />
      <Container minW={{ base: '100%', md: '95%' }}>
        <Flex
          mt={{ base: 10, sm: 12, md: 32 }}
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: 4, xl: 8 }}
          alignItems='flex-start'
          justifyContent={{ base: 'center', md: 'space-evenly' }}
        >
          <RegistrationProgressIndicator step={step} />
          <RegistrationForm step={step} setStep={setStep} />
        </Flex>
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
