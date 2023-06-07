import {
  Box,
  Text,
  FormControl,
  Input,
  Textarea,
  FormErrorMessage,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import { SendPlaneIcon, UserIcon } from '../icons'
import { useState } from 'react'
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_LOCAL

export interface IContactFormProps {}

type FormData = {
  fullName: string
  email: string
  phone: string
  message: string
}

export default function ContactForm(props: IContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation('contact')
  const { t: tc } = useTranslation('common')
  const toast = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmitHandler = async (data: FormData) => {
    setIsLoading(true)
    const response = await fetch(`${strapiUrl}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    const resData = await response.json()
    if (resData.data?.attributes) {
      toast({
        title: `${tc('success')}`,
        description: `${tc('success_message')}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      reset()
    } else {
      toast({
        title: `${tc('error')}`,
        description: `${tc('error_message')}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }
  return (
    <Box
      boxShadow='lg'
      p={{ base: 8, lg: 10, xl: 12 }}
      borderRadius='3xl'
      width={{ base: '95%', lg: '45%' }}
    >
      <Text as='h2' fontSize='3xl'>
        {t('contact_us')}
      </Text>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        style={{ marginTop: '3rem' }}
        noValidate
      >
        <Stack spacing={8}>
          <FormControl
            isRequired
            id='fullName'
            isInvalid={!!errors.fullName?.message}
          >
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <UserIcon color='gray.300' />
              </InputLeftElement>
              <Input
                variant='flushed'
                placeholder={`${t('contact.name')}`}
                {...register('fullName', {
                  required: `${t('contact.name.required')}`,
                })}
              />
            </InputGroup>
            {errors.fullName?.message && (
              <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
            )}
          </FormControl>
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
                placeholder={`${t('contact.email_address')}`}
                variant='flushed'
                {...register('email', {
                  required: `${t('contact.email.required')}`,
                })}
              />
            </InputGroup>
            {errors.email?.message && (
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            id='phone'
            isInvalid={!!errors.phone?.message}
          >
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <PhoneIcon color='gray.300' />
              </InputLeftElement>
              <Input
                placeholder={`${t('contact.phone')}`}
                variant='flushed'
                {...register('phone', {
                  required: `${t('contact.phone.required')}`,
                })}
              />
            </InputGroup>
            {errors.phone?.message && (
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isRequired
            id='message'
            isInvalid={!!errors.message?.message}
          >
            <Textarea
              placeholder={`${t('contact.message')}`}
              variant='flushed'
              {...register('message', {
                required: `${t('contact.message.required')}`,
              })}
            ></Textarea>
            {errors.message?.message && (
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            )}
          </FormControl>
        </Stack>
        <HStack justifyContent='flex-end' mt={6}>
          <Button
            rightIcon={<SendPlaneIcon />}
            variant='primary'
            borderRadius='3xl'
            type='submit'
            disabled={isLoading}
            isLoading={isLoading}
          >
            {tc('send')}
          </Button>
        </HStack>
      </form>
    </Box>
  )
}
