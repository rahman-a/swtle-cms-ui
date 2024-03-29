import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { AtSignIcon, CheckCircleIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import userAPI from '../services/credentials'

interface IForgetPasswordProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgetPassword({
  isOpen,
  onClose,
}: IForgetPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isLinkSent, setIsLinkSent] = useState(false)
  const toast = useToast()
  const { t } = useTranslation('login')
  const resetHandler = () => {
    setIsLinkSent(false)
    onClose()
  }
  const resetPasswordHandler = async (info: { email: string }) => {
    setIsLoading(true)
    try {
      await userAPI.sendPasswordResetLink(info.email)
      setIsLinkSent(true)
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
      setIsLoading(false)
    }
  }
  return (
    <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={resetHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isLinkSent ? '' : 'Reset your password'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLinkSent ? (
            <Text
              as='p'
              fontSize={{ base: 'md', md: 'lg' }}
              color='gray.400'
              textAlign='center'
            >
              <CheckCircleIcon color='green.500' />{' '}
              {t('login.password_reset_sent')}
            </Text>
          ) : (
            <>
              <Text as='p' color='gray.400' textAlign='center' mb='1rem'>
                {t('login.password_reset')}
              </Text>
              <form
                style={{ width: '90%', margin: '0 1rem' }}
                onSubmit={(e) => e.preventDefault()}
                noValidate
              >
                <FormControl
                  isRequired
                  id='email'
                  isInvalid={!!errors.email?.message}
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
                          t('login.email_required') || 'Please type your email',
                      })}
                    />
                  </InputGroup>
                  {errors.email?.message && (
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  )}
                </FormControl>
              </form>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {!isLinkSent && (
            <>
              <Button
                color='blackAlpha.700'
                colorScheme='gray.700'
                mr={3}
                onClick={onClose}
                isDisabled={isLoading}
              >
                {t('login.close')}
              </Button>
              <Button
                onClick={handleSubmit(resetPasswordHandler)}
                variant='primary'
                isLoading={isLoading}
              >
                {t('login.email_send')}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
