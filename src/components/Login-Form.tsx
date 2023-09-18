import { useState } from 'react'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '../icons'
import { ILoginForm } from '../pages/login'
import ResetPassword from './Send-Reset-Password-Link'

interface ILoginFormProps {
  submitHandler: (data: ILoginForm) => void
  isRememberMe: boolean
  setIsRememberMe: (value: boolean) => void
  sendingLoginCredentialLoading: boolean
}

export default function LoginForm({
  submitHandler,
  setIsRememberMe,
  isRememberMe,
  sendingLoginCredentialLoading,
}: ILoginFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('login')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <>
      <ResetPassword isOpen={isOpen} onClose={onClose} />
      <Text as='h2' mb='5' fontSize={{ base: '2xl', md: '3xl', xl: '4xl' }}>
        {t('login')}
      </Text>
      <form
        style={{ width: '100%', margin: 0 }}
        onSubmit={handleSubmit(submitHandler)}
        noValidate
      >
        <FormControl
          isRequired
          id='email'
          isInvalid={!!errors.email?.message}
          mb='5'
        >
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <AtSignIcon color='gray.300' />
            </InputLeftElement>
            <Input
              type='email'
              size='lg'
              placeholder={t('login.email') || 'Your Email *'}
              {...register('email', {
                required:
                  t('login.email_required') || 'Please type your email address',
                validate: (value) => {
                  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                  return (
                    regex.test(value) ||
                    t('login.email_valid') ||
                    'E-mail Address must be a valid e-mail address'
                  )
                },
              })}
            />
          </InputGroup>
          {errors.email?.message && (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>
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
              placeholder={t('login.password') || 'Your Password *'}
              {...register('password', {
                required:
                  t('login.password_required') || 'Please type your password',
                validate: (value) => {
                  const regex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/
                  return (
                    !regex.test(value) ||
                    t('login.password_valid') ||
                    "Password shouldn't contain any special characters"
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
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>
        <HStack mt='4' justifyContent='space-between'>
          <Checkbox onChange={() => setIsRememberMe(!isRememberMe)}>
            {t('login.remind')}
          </Checkbox>
          <Button onClick={onOpen} variant='link' color='secondary'>
            {t('login.forgot')}
          </Button>
        </HStack>
        <HStack mt={8} width='100%' justifyContent='center'>
          <Button
            width='50%'
            type='submit'
            bg='primary'
            color='white'
            _hover={{ bg: 'secondary' }}
            borderRadius='5rem'
            isLoading={sendingLoginCredentialLoading}
            isDisabled={sendingLoginCredentialLoading}
            _disabled={{
              opacity: 0.4,
              cursor: 'not-allowed',
              _hover: {
                bg: 'secondary',
              },
            }}
          >
            {t('login.submit')}
          </Button>
        </HStack>
      </form>
      <VStack
        spacing={6}
        mt='2rem !important'
        width='100%'
        justifyContent='center'
      >
        {/* <Button variant='unstyled'>
          <Image src='/images/uae-pass.png' alt='use digital pass' />
        </Button> */}
        <Text>{t('login.no_account')}</Text>
        <Button
          as={NextLink}
          href='/plans'
          variant='primary'
          borderRadius='5rem'
        >
          {t('login.register')}
        </Button>
      </VStack>
    </>
  )
}
