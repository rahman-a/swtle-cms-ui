import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Container,
  Divider,
  Flex,
  IconButton,
  useToast,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { LoginCode, LoginForm, PhoneConfirmModal } from '../components'
import { ArrowBackIcon } from '@chakra-ui/icons'
import userAPI from '../services/credentials'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import skylineImage from '@assets/images/skyline.png'
import skylineLongImage from '@assets/images/skyline-long.png'
import logoWordImage from '@assets/images/logo-word.svg'
export type ILoginForm = {
  email: string
  password: string
}

interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')
  const [isRememberMe, setIsRememberMe] = useState(false)
  const [sendingLoginCredentialLoading, setSendingLoginCredentialLoading] =
    useState(false)
  const [verifyLoginCodeLoading, setVerifyLoginCodeLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const imageWidth = useBreakpointValue(
    { md: 350, lg: 400, xl: 600 },
    { fallback: '400' }
  )
  const imageHeight = useBreakpointValue(
    { md: 250, lg: 250, xl: 450 },
    { fallback: '250' }
  )

  const logoWidth = useBreakpointValue(
    { md: 150, lg: 200, xl: 400 },
    { fallback: '200' }
  )

  const logoHeight = useBreakpointValue(
    { md: 100, lg: 150, xl: 250 },
    { fallback: '150' }
  )

  const submitHandler = async (info: ILoginForm) => {
    setSendingLoginCredentialLoading(true)
    try {
      const { data } = await userAPI.sendLoginCredential(info)
      setUserId(data.user)
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message
        const phoneNotConfirmedMessage =
          'phone not confirmed' || 'الهاتف غير مفعل'
        if (errorMessage === phoneNotConfirmedMessage) {
          setUserEmail(info.email)
          onOpen()
          return
        }
        toast({
          title: 'Error',
          description: errorMessage,
          position: 'top-left',
          status: 'error',
          duration: 15000,
          isClosable: true,
        })
      }
    } finally {
      setSendingLoginCredentialLoading(false)
    }
  }

  const sendLoginCodeHandler = useCallback(async () => {
    setVerifyLoginCodeLoading(true)
    try {
      const { data } = await userAPI.sendLoginCode(userId!)
      if (data.success) {
        toast({
          title: 'Success',
          description: data.message,
          position: 'top-left',
          status: 'success',
          duration: 15000,
          isClosable: true,
        })
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          title: 'Error',
          description: error.response.data.message,
          position: 'top-left',
          status: 'error',
          duration: 15000,
          isClosable: true,
        })
      }
    } finally {
      setVerifyLoginCodeLoading(false)
    }
  }, [userId, toast])

  const verifyLoginCodeHandler = async (code: string) => {
    setVerifyLoginCodeLoading(true)
    try {
      const { data } = await userAPI.verifyLoginCode(userId!, {
        code,
        isRemembered: isRememberMe,
      })
      if (data.success) {
        localStorage.setItem('uid', data.info._id)
        localStorage.setItem('period', data.info.expireAt)
        window.location.href = 'http://localhost:5000'
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          title: 'Error',
          description: error.response.data.message,
          position: 'top-left',
          status: 'error',
          duration: 15000,
          isClosable: true,
        })
      }
    } finally {
      setVerifyLoginCodeLoading(false)
    }
  }

  useEffect(() => {
    userId && sendLoginCodeHandler()
  }, [userId, sendLoginCodeHandler])
  return (
    <>
      <NextSeo title='Swtle | Login' />
      {userEmail && (
        <PhoneConfirmModal
          isOpen={isOpen}
          onClose={onClose}
          email={userEmail}
        />
      )}
      <Container minW='95%'>
        <Flex
          position='relative'
          mt='32'
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          alignItems='flex-start'
          justifyContent='space-between'
        >
          {userId && (
            <IconButton
              aria-label='back'
              icon={<ArrowBackIcon />}
              position='absolute'
              top='-5rem'
              left='0'
              onClick={() => setUserId(null)}
            />
          )}
          <VStack
            my={{ base: 8, md: 0 }}
            alignItems='flex-start'
            width={{ base: '100%', md: '60%', lg: '45%' }}
          >
            {userId ? (
              <LoginCode
                verifyLoginCodeHandler={verifyLoginCodeHandler}
                verifyLoginCodeLoading={verifyLoginCodeLoading}
                sendLoginCodeHandler={sendLoginCodeHandler}
              />
            ) : (
              <LoginForm
                submitHandler={submitHandler}
                setIsRememberMe={setIsRememberMe}
                isRememberMe={isRememberMe}
                sendingLoginCredentialLoading={sendingLoginCredentialLoading}
              />
            )}
          </VStack>
          <Divider
            orientation={isMobile ? 'horizontal' : 'vertical'}
            bg='gray.600'
            height={{ base: '2px', md: 80 }}
          />
          <Box position='relative' mb={{ base: 8, md: 0 }}>
            <Box
              position='absolute'
              top='50%'
              left='50%'
              width='100%'
              height='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
              transform='translate(-50%, -50%)'
              bg='rgba(0,0,0,0.5)'
            >
              <Image
                width={logoWidth ?? 200}
                height={logoHeight ?? 150}
                src={logoWordImage}
                alt='swtle'
              />
            </Box>
            {isMobile ? (
              <Image
                src={skylineLongImage}
                alt='skyline'
                width={900}
                height={500}
              />
            ) : (
              <Image
                src={skylineImage}
                alt='skyline'
                width={imageWidth ?? 400}
                height={imageHeight ?? 250}
              />
            )}
          </Box>
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
        'footer',
      ])),
    },
  }
}
