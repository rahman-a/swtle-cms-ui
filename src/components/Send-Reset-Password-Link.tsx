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

  const resetHandler = () => {
    setIsLinkSent(false)
    onClose()
  }
  const resetPasswordHandler = async (info: { email: string }) => {
    setIsLoading(true)
    try {
      const { data } = await userAPI.sendPasswordResetLink(info.email)
      console.log('🚀resetPasswordHandler ~ data:', data)
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
              <CheckCircleIcon color='green.500' /> We have sent you an email
              with a link to reset your password
            </Text>
          ) : (
            <>
              <Text as='p' color='gray.400' textAlign='center' mb='1rem'>
                Please enter your email address. We will send you an email to
                reset your password
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
                      placeholder='yours@example.com'
                      {...register('email', {
                        required: 'Please type your email',
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
                Close
              </Button>
              <Button
                onClick={handleSubmit(resetPasswordHandler)}
                variant='primary'
                isLoading={isLoading}
              >
                Send E-mail
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
