import type { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { LockIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'
import userAPI from '../services/credentials'
import { EyeIcon, EyeSlashIcon } from '../icons'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
interface IResetPasswordProps {
  token: string
}

export default function ResetPassword({ token }: IResetPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const [isUpdatingPasswordLoading, setIsUpdatingPasswordLoading] =
    useState(false)
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const toast = useToast()
  const router = useRouter()
  const locale = router.locale
  const isMobile = useBreakpointValue({ base: true, md: false })
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })
  const watchPassword = watch('password')
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

  const submitHandler = async (info: { password: string }) => {
    setIsUpdatingPasswordLoading(true)
    try {
      const { data } = await userAPI.verifyAuthLink({
        token,
        password: info.password,
        type: 'reset',
      })
      if (data.success) {
        toast({
          title: tc('success'),
          description: data.message,
          position: locale === 'en' ? 'top-left' : 'top-right',
          status: 'success',
          duration: 10000,
          isClosable: true,
          onCloseComplete() {
            router.push(`${process.env.NEXT_PUBLIC_APP_URL}`)
          },
        })
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          title: tc('error'),
          position: locale === 'en' ? 'top-left' : 'top-right',
          description: error.response.data.message,
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }
    } finally {
      setIsUpdatingPasswordLoading(false)
    }
  }
  return (
    <>
      <NextSeo title='Swtle | Reset Password' />
      <Container minW='95%'>
        <Flex
          position='relative'
          mt='32'
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          alignItems='flex-start'
          justifyContent='space-between'
        >
          <VStack
            my={{ base: 8, md: 0 }}
            alignItems='flex-start'
            width={{ base: '100%', md: '60%', lg: '45%' }}
          >
            <Heading as='h2' mb='5' fontSize={{ base: '2xl' }}>
              {t('registration.reset_password')}
            </Heading>
            <form
              style={{ width: '100%', margin: 0 }}
              onSubmit={handleSubmit(submitHandler)}
              noValidate
            >
              <VStack width='100%' spacing={4}>
                <FormControl
                  isRequired
                  id='password'
                  isInvalid={!!errors.password?.message}
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <LockIcon color='gray.300' />
                    </InputLeftElement>
                    <Input
                      type={isPasswordVisible ? 'text' : 'password'}
                      size='lg'
                      placeholder={`${t('registration.password_new_required')}`}
                      {...register('password', {
                        required: `${t('registration.password_new_required')}`,
                        minLength: {
                          value: 8,
                          message: `${t('registration.password_least_length', {
                            length: 8,
                          })}`,
                        },
                        maxLength: {
                          value: 20,
                          message: `${t('registration.password_most_length', {
                            length: 20,
                          })}`,
                        },
                        validate: (value) => {
                          const regex =
                            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z"])[a-zA-Z0-9]{8,20}$/
                          return (
                            regex.test(value) ||
                            `${t(
                              'registration.password_valid_format_required'
                            )}`
                          )
                        },
                      })}
                    />
                    <InputRightElement
                      cursor='pointer'
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? (
                        <EyeIcon color='gray.600' boxSize={4} />
                      ) : (
                        <EyeSlashIcon color='gray.600' boxSize={4} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  {errors.password?.message && (
                    <FormErrorMessage>
                      {errors.password?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  isRequired
                  id='confirmPassword'
                  isInvalid={!!errors.confirmPassword?.message}
                >
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <LockIcon color='gray.300' />
                    </InputLeftElement>
                    <Input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      size='lg'
                      placeholder={`${t(
                        'registration.confirm_password_new_required'
                      )}`}
                      {...register('confirmPassword', {
                        required: `${t(
                          'registration.confirm_password_new_required'
                        )}`,
                        validate: (value) =>
                          value === watchPassword ||
                          `${t('registration.confirm_password_not_match')}`,
                      })}
                    />
                    <InputRightElement
                      cursor='pointer'
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeIcon color='gray.600' boxSize={4} />
                      ) : (
                        <EyeSlashIcon color='gray.600' boxSize={4} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  {errors.confirmPassword?.message && (
                    <FormErrorMessage>
                      {errors.confirmPassword?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
              <HStack mt={8} width='100%' justifyContent='center'>
                <Button
                  width='50%'
                  type='submit'
                  bg='primary'
                  color='white'
                  _hover={{ bg: 'secondary' }}
                  borderRadius='5rem'
                  isLoading={isUpdatingPasswordLoading}
                  isDisabled={isUpdatingPasswordLoading}
                  _disabled={{
                    opacity: 0.4,
                    cursor: 'not-allowed',
                    _hover: {
                      bg: 'secondary',
                    },
                  }}
                >
                  {t('registration.reset_password')}
                </Button>
              </HStack>
            </form>
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
                src='/images/logo-word.svg'
                alt='swtle'
              />
            </Box>
            {isMobile ? (
              <Image
                src='/images/skyline-long.png'
                alt='skyline'
                width={900}
                height={500}
              />
            ) : (
              <Image
                src='/images/skyline.png'
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

export const getServerSideProps = async ({
  query,
  locale,
}: GetServerSidePropsContext) => {
  const { TOKEN } = query
  if (!TOKEN) return { notFound: true }
  try {
    await userAPI.verifyAuthLink({ token: TOKEN })
  } catch (error: any) {
    if (!error.response.data.success) {
      return {
        notFound: true,
      }
    }
  }

  return {
    props: {
      token: TOKEN,
      ...(await serverSideTranslations(locale!, [
        'common',
        'registration',
        'navigation',
        'footer',
      ])),
    },
  }
}
