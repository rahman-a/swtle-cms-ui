import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useTranslation } from 'next-i18next'
import CredentialForm from './Credential-Form'
import PersonalInfoForm from './Personal-Info-Form'
import Addresses from './Addresses-Form'
import PhonesForm from './Phones-Form'
import VerificationDocumentsForm from './Verification-Documents-Form'
import type {
  IRegistrationProps,
  Country,
  Phone,
  VerificationDocument,
  Email,
  ExpireAt,
  IFDataExisted,
} from '../../types/Registration-types'
import RegistrationFinish from './Registration-Finish'
import userApi from '../../services/credentials'

interface IRegistrationFormProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type User = {
  id: string
  phone: string
}

export default function RegistrationForm({
  step,
  setStep,
}: IRegistrationFormProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isFormButtonActive, setIsFormButtonActive] = useState(false)
  const [isFormButtonLoading, setIsFormButtonLoading] = useState(false)
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const [user, setUser] = useState<User | null>(null)
  const toast = useToast({
    title: tc('error'),
    position: 'top',
    status: 'error',
    duration: 10000,
    isClosable: true,
    containerStyle: {
      justifyContent: 'flex-end',
    },
  })
  const methods = useForm<IRegistrationProps>({
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      isAgreed: false,
      fullNameInEnglish: '',
      fullNameInArabic: '',
      company: '',
      emails: [{ email: '', isPrimary: true }] as Email[],
      insideAddress: '',
      outsideAddress: '',
      country: {
        name: 'United Arab Emirates',
        abbr: 'AE',
        image:
          'https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg',
      } as Country,
      insidePhones: [{ phone: '', isPrimary: true }] as Phone[],
      outsidePhones: [{ phone: '' }] as Phone[],
      avatar: {} as File,
      'identity-front': {} as VerificationDocument,
      'identity-back': {} as VerificationDocument,
      passport: {} as VerificationDocument,
      expireAt: {} as ExpireAt,
    },
  })

  const errors = methods.formState.errors

  const watchStepOneValues = methods.watch([
    'username',
    'emails',
    'password',
    'confirmPassword',
    'isAgreed',
  ])
  const watchStepTwoValues = methods.watch([
    'fullNameInEnglish',
    'fullNameInArabic',
    'company',
  ])

  const watchStepThreeValues = methods.watch([
    'insideAddress',
    'outsideAddress',
    'country.abbr',
  ])
  const watchStepFourValues = methods.watch(['insidePhones'])
  const watchStepFiveValues = methods.watch([
    'avatar',
    'identity-front',
    'identity-back',
    'passport',
    'expireAt.identity',
    'expireAt.passport',
  ])

  const checkIfDataAlreadyExists = async (data: IFDataExisted) => {
    setIsFormButtonLoading(true)
    const info: IFDataExisted = {}
    if (data.username) info['username'] = data.username
    if (data.emails && data.emails.length) info['emails'] = data.emails
    if (data.phones && data.phones.length) info['phones'] = data.phones

    try {
      const { data: responseData } = await userApi.checkIfDataExists(info)
      return responseData.success && false
    } catch (error: any) {
      if (error.response) {
        toast({
          description: error.response.data.message,
        })
      }
      return true
    } finally {
      setIsFormButtonLoading(false)
    }
  }

  const formattingFinalData = (data: IRegistrationProps) => {
    delete data.confirmPassword
    if (data.country.abbr === 'AE') {
      delete data.outsideAddress
      delete data.outsidePhones
    }
    if (data.outsidePhones && data.outsidePhones.length) {
      data.outsidePhones = data.outsidePhones.filter(
        (value) => value.phone && value.phone.length > 4
      )
      data.outsidePhones.length === 0 && delete data.outsidePhones
    }
    const formData = new FormData()
    for (let key in data) {
      if (
        key === 'emails' ||
        key === 'country' ||
        key === 'insidePhones' ||
        key === 'outsidePhones' ||
        key === 'expireAt'
      ) {
        formData.append(
          key,
          JSON.stringify(data[key as keyof IRegistrationProps])
        )
      } else formData.append(key, (data as any)[key])
    }

    return formData
  }

  const submitHandler = async (data: IRegistrationProps) => {
    setIsFormButtonLoading(true)
    const formData = formattingFinalData(data)
    try {
      const { data: responseData } = await userApi.registerUser(formData as any)
      setUser({ id: responseData.id, phone: responseData.phone })
      responseData.success && onOpen()
    } catch (error: any) {
      if (error.response) {
        toast({
          description: error.response.data.message,
        })
      }
    } finally {
      setIsFormButtonLoading(false)
    }
  }

  const MovingForwardHandler = async () => {
    setIsFormButtonActive(false)
    if (step === 0) {
      if (
        await checkIfDataAlreadyExists({
          username: watchStepOneValues[0],
          emails: watchStepOneValues[1],
        })
      ) {
        return
      }
    }
    if (step === 3) {
      if (
        await checkIfDataAlreadyExists({
          phones: watchStepFourValues[0],
        })
      ) {
        return
      }
    }
    if (step === 4) {
      if (Object.keys(errors).length > 0) {
        toast({
          description: t('registration.all_fields_required'),
        })
        return
      }
      methods.handleSubmit(submitHandler)()
      return
    }
    setStep(step + 1)
  }

  const isFormValid = useCallback(() => {
    if (step === 0) {
      let isValid = false
      isValid = watchStepOneValues.every((value) => value)
      const usernameErrors = errors.username
      const passwordErrors = errors.password
      const confirmPasswordErrors = errors.confirmPassword
      const emailsErrors = errors.emails
      if (
        usernameErrors ||
        passwordErrors ||
        confirmPasswordErrors ||
        emailsErrors
      ) {
        isValid = false
      }

      return isValid
    }
    if (step === 1) {
      return watchStepTwoValues.every((value) => value)
    }
    if (step === 2) {
      const updatedWatchStepThreeValues: any =
        watchStepThreeValues[2] === 'AE'
          ? [watchStepThreeValues[0]]
          : watchStepThreeValues
      const isValid = updatedWatchStepThreeValues.every(
        (value: string) => value
      )
      return isValid
    }
    if (step === 3) {
      let isValid = false
      watchStepFourValues[0].forEach((value: Phone) => {
        if (value.phone === '+971' || !value.phone?.startsWith('+971')) {
          isValid = false
          return
        }
        isValid = true
      })
      return isValid
    }

    if (step === 4) {
      return watchStepFiveValues.every((value) => value)
    }
  }, [
    step,
    errors,
    watchStepOneValues,
    watchStepTwoValues,
    watchStepThreeValues,
    watchStepFourValues,
    watchStepFiveValues,
  ])

  useEffect(() => {
    setIsFormButtonActive(isFormValid())
  }, [isFormValid])
  return (
    <>
      {user && (
        <RegistrationFinish
          isOpen={isOpen}
          onClose={onClose}
          user={user}
          setUser={setUser}
        />
      )}
      <Box
        width={{ base: '100%', md: '85%', lg: '70%', xl: '60%' }}
        boxShadow='lg'
        borderRadius={10}
        padding={4}
        transform='translateY(-2rem)'
      >
        <Flex justifyContent='space-between'>
          <HStack pb={8}>
            <Text as='span' fontSize='2xl' color='red'>
              *
            </Text>
            <Text as='span' fontSize='md' color='gray.600'>
              {t('registration.field_required_label')}
            </Text>
          </HStack>
          {step === 4 && (
            <Text as='p' fontSize='md' color='gray.600'>
              {t('registration.max_file_size', { size: '2MB' })}
            </Text>
          )}
        </Flex>
        <form autoComplete='off'>
          <FormProvider {...methods}>
            <CredentialForm isVisible={step === 0} />
            <PersonalInfoForm isVisible={step === 1} />
            <Addresses isVisible={step === 2} />
            <PhonesForm isVisible={step === 3} />
            <VerificationDocumentsForm isVisible={step === 4} />
          </FormProvider>
        </form>
        <HStack w='100%' justifyContent='flex-end' spacing={4} py={4}>
          {step > 0 && (
            <Button
              w={40}
              colorScheme='teal'
              isDisabled={isFormButtonLoading}
              _hover={{
                bg: 'black',
                color: 'white',
              }}
              variant='outline'
              borderRadius='3xl'
              onClick={() => setStep((prev) => (prev > 0 ? prev - 1 : prev))}
            >
              {tc('back')}
            </Button>
          )}
          <Button
            onClick={MovingForwardHandler}
            w={40}
            variant='primary'
            borderRadius='3xl'
            isLoading={isFormButtonLoading}
            isDisabled={!isFormButtonActive || isFormButtonLoading}
            _disabled={{
              opacity: 0.4,
              cursor: 'not-allowed',
              _hover: {
                bg: 'secondary',
              },
            }}
          >
            {step === 4 ? tc('finish') : tc('next')}
          </Button>
        </HStack>
      </Box>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={methods.control} />
      )}
    </>
  )
}
