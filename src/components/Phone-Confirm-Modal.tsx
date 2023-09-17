import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
  Heading,
  PinInput,
  PinInputField,
  VStack,
  Spinner,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import userAPI from '../services/credentials'
interface IPhoneConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}
let isMounted = true

export default function PhoneConfirmModal({
  isOpen,
  onClose,
  email,
}: IPhoneConfirmModalProps) {
  const pinInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationLoading, setVerificationLoading] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const toast = useToast()
  const { t } = useTranslation('login')
  const sendPhoneVerificationCode = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data } = await userAPI.sendVerifyCodeToPhone(undefined, email)
    } catch (error: any) {
      if (error.response) {
        toast({
          title: 'Error',
          description: error.response.data.message,
          position: 'top',
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }, [email, toast])
  const verifyClientPhoneHandler = async (code: string) => {
    setVerificationLoading(true)
    try {
      await userAPI.verifyPhoneCode(code, undefined, email)
      setIsPhoneVerified(true)
    } catch (error: any) {
      if (error.response) {
        toast({
          title: 'Error',
          description: error.response.data.message,
          position: 'top',
          status: 'error',
          duration: 10000,
          isClosable: true,
        })
      }
    } finally {
      setVerificationLoading(false)
    }
  }

  const resetHandler = () => {
    setIsPhoneVerified(false)
    onClose()
  }

  useEffect(() => {
    pinInputRef.current?.focus()
    isMounted && email && sendPhoneVerificationCode()
    return () => {
      isMounted = false
    }
  }, [sendPhoneVerificationCode, email])
  return (
    <Modal isOpen={isOpen} onClose={resetHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='red.600'>
          {isPhoneVerified ? '' : t('login.phone_error_verified')}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? (
            <Flex
              justifyContent='center'
              alignItems='center'
              position='relative'
              h={40}
            >
              <Spinner
                color='black'
                size='xl'
                display={true ? 'block' : 'none'}
              />
            </Flex>
          ) : (
            !isPhoneVerified && (
              <VStack spacing={4}>
                <Heading as='h3' fontSize={{ base: 'xl' }} textAlign='center'>
                  {t('login.phone_code_sent')}
                </Heading>
                <Text>{t('login.enter_phone_code')}</Text>
                <HStack position='relative'>
                  <PinInput
                    otp
                    variant='filled'
                    focusBorderColor='teal.500'
                    size={{ base: 'md', sm: 'lg' }}
                    onComplete={(code) => verifyClientPhoneHandler(code)}
                    isDisabled={false}
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
                    display={false ? 'block' : 'none'}
                  />
                </HStack>
              </VStack>
            )
          )}
          {isPhoneVerified && (
            <VStack spacing={4}>
              <Heading
                color='primary'
                as='h3'
                fontSize={{ base: 'xl' }}
                textAlign='center'
              >
                {t('login.phone_verified')}
              </Heading>
              <Text>{t('login.dashboard')}</Text>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          {!isPhoneVerified && (
            <Button
              isLoading={verificationLoading}
              isDisabled={isLoading || verificationLoading}
              variant='primary'
            >
              {t('login.verify')}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
