import { useEffect, useRef, useState, Dispatch, SetStateAction } from 'react'
import { ArrowBackIcon, CheckCircleIcon, CheckIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Text,
  Box,
  ModalFooter,
  PinInput,
  PinInputField,
  HStack,
  Flex,
  Input,
  Spinner,
  useToast,
  IconButton,
} from '@chakra-ui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Countdown, { zeroPad } from 'react-countdown'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import userApi from '../../services/credentials'

type User = {
  id: string
  phone: string
}

interface IRegistrationFinishProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    phone: string
  }
  setUser: Dispatch<SetStateAction<User | null>>
}

export default function RegistrationFinish({
  isOpen,
  onClose,
  user,
  setUser,
}: IRegistrationFinishProps) {
  const pinInputRef = useRef<HTMLInputElement>(null)
  const [insidePhone, setInsidePhone] = useState<any>('')
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false)
  const [sendingCodeLoading, setSendingCodeLoading] = useState<boolean>(false)
  const [isVerificationPhoneLoading, setIsVerificationPhoneLoading] =
    useState<boolean>(false)
  const [isUpdatingPhoneLoading, setIsUpdatingPhoneLoading] =
    useState<boolean>(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false)
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const router = useRouter()
  const locale = router.locale
  const toast = useToast({
    title: tc('error'),
    position: 'top',
    status: 'error',
    duration: 10000,
    isClosable: true,
  })

  const sendPhoneVerificationCode = async () => {
    setSendingCodeLoading(true)
    try {
      await userApi.sendVerifyCodeToPhone(user.id)
      setIsCodeSent(true)
    } catch (error: any) {
      if (error.response) {
        toast({
          description: error.response.data.message,
        })
      }
    } finally {
      setSendingCodeLoading(false)
    }
  }

  const updatePhoneHandler = async () => {
    setIsUpdatingPhoneLoading(true)
    if (!insidePhone?.startsWith('+971') || insidePhone === '+971') {
      toast({
        description: t('registration.valid_uae_number_required'),
      })
      setIsUpdatingPhoneLoading(false)
      return
    }
    try {
      await userApi.updatePhoneNumber(user.id, insidePhone)
      await sendPhoneVerificationCode()
    } catch (error: any) {
      if (error.response) {
        toast({
          description: error.response.data.message,
        })
      }
    } finally {
      setIsUpdatingPhoneLoading(false)
    }
  }

  const phoneVerificationHandler = async (code: string) => {
    setIsVerificationPhoneLoading(true)
    try {
      await userApi.verifyPhoneCode(code, user.id)
      setIsPhoneVerified(true)
    } catch (error: any) {
      if (error.response) {
        toast({
          description: error.response.data.message,
        })
      }
    } finally {
      setIsVerificationPhoneLoading(false)
    }
  }

  const closeModalHandler = () => {
    setIsCodeSent(false)
    setIsPhoneVerified(false)
    setInsidePhone('')
    setUser(null)
    onClose()
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}`)
  }

  useEffect(() => {
    if (isCodeSent) {
      pinInputRef.current?.focus()
    }
  }, [isCodeSent])
  return (
    <Modal
      size='2xl'
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={closeModalHandler}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          position='relative'
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          {isCodeSent && !isPhoneVerified && (
            <IconButton
              aria-label='back'
              icon={<ArrowBackIcon />}
              position='absolute'
              top='10px'
              left='10px'
              onClick={() => setIsCodeSent(false)}
            />
          )}
          <CheckCircleIcon color='secondary' boxSize={{ base: 28 }} />
          <Heading as='h2' fontSize='6xl' fontWeight='semibold' py={4}>
            {t('registration.congratulation')}
          </Heading>
          <Heading
            as='h4'
            fontSize='md'
            letterSpacing='wide'
            textAlign='center'
            color='primary'
          >
            {t('registration.account_created')}
          </Heading>

          {isCodeSent && !isPhoneVerified ? (
            <Flex alignItems='center' flexDirection='column' mb={4}>
              <Text as='p' fontSize='lg' py={4}>
                {t('registration.phone_code_sent')}
              </Text>
              <HStack position='relative'>
                <PinInput
                  otp
                  size='lg'
                  onComplete={(code) => phoneVerificationHandler(code)}
                  isDisabled={isVerificationPhoneLoading}
                >
                  <PinInputField ref={pinInputRef} />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
                <Spinner
                  color='gray.500'
                  position='absolute'
                  left='50%'
                  transform='translateX(-50%)'
                  display={isVerificationPhoneLoading ? 'block' : 'none'}
                />
              </HStack>
            </Flex>
          ) : (
            !isPhoneVerified && (
              <Box mt={8} textAlign='center'>
                <Text as='p' fontSize='lg'>
                  {t('registration.verify_phone')}
                </Text>
                <Button
                  onClick={sendPhoneVerificationCode}
                  isLoading={sendingCodeLoading}
                  isDisabled={isUpdatingPhoneLoading || sendingCodeLoading}
                  w={40}
                  my={4}
                  variant='primary'
                  rounded='3xl'
                >
                  {tc('send_code')}
                </Button>
              </Box>
            )
          )}
          {isPhoneVerified && (
            <Box my={8}>
              <HStack w='100%' justifyContent='center'>
                <CheckIcon color='green' boxSize={{ base: 8 }} />
                <Text as='p' fontSize='lg'>
                  {t('registration.phone_has_verified')}
                </Text>
              </HStack>
              <Box
                mt={8}
                textAlign='center'
                bg='rgba(63,165,186,0.1)'
                p={4}
                rounded='2xl'
              >
                <Text as='p' fontSize='lg'>
                  {t('registration.link_email_sent')}
                </Text>
              </Box>
              <HStack my={2} spacing={2} w='100%' justifyContent='center'>
                <Text as='p'>{t('registration.redirect_to_login')}</Text>
                <Countdown
                  date={Date.now() + 15000}
                  renderer={({ seconds }) => (
                    <Text as='span' fontWeight='bold' color='red.700'>
                      {zeroPad(seconds)}
                    </Text>
                  )}
                  onComplete={closeModalHandler}
                />
                <Text as='p'> {t('registration.seconds')}</Text>
              </HStack>
            </Box>
          )}
        </ModalBody>
        {!isCodeSent && (
          <ModalFooter
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Text py={4}>{t('registration.change_phone')}</Text>
            <HStack>
              <PhoneInput
                placeholder={t('registration.enter_phone')}
                international
                defaultCountry='AE'
                countryCallingCodeEditable={false}
                initialValueFormat='national'
                className={locale === 'ar' ? 'phone-input' : ''}
                style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
                value={user.phone}
                onChange={setInsidePhone}
                inputComponent={Input}
                disabled={isUpdatingPhoneLoading || sendingCodeLoading}
              />
              <Button
                isLoading={isUpdatingPhoneLoading}
                isDisabled={isUpdatingPhoneLoading || sendingCodeLoading}
                onClick={updatePhoneHandler}
                w={40}
                my={4}
                variant='primary'
                rounded='3xl'
              >
                {tc('send_code')}
              </Button>
            </HStack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}
