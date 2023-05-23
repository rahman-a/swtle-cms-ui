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
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import { SendPlaneIcon, UserIcon } from '../icons'

export interface IContactFormProps {}

type FormData = {
  fullName: string
  email: string
  phone: string
  message: string
}

export default function ContactForm(props: IContactFormProps) {
  const { locale } = useRouter()
  const { t } = useTranslation('contact')
  const { t: tc } = useTranslation('common')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const onSubmitHandler = (data: FormData) => {
    console.log({ data })
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
          >
            {tc('send')}
          </Button>
        </HStack>
      </form>
    </Box>
  )
}
