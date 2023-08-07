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
import CompanyForm from './CompanyForm'
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
  CompanyType,
} from '../../types/Registration-types'
import RegistrationFinish from './Registration-Finish'
import userApi from '../../services/credentials'
import { watchValues, isStep } from './utils'

interface IRegistrationFormProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  type: 'personal' | 'business'
}

type User = {
  id: string
  phone: string
}

export default function RegistrationForm({
  type,
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
      name: '',
      email: '',
      phone: '',
      address: '',
      type: 'sole' as CompanyType,
      traderLicense: null as VerificationDocument,
      expiryDate: '',
      establishmentContract: null as VerificationDocument,
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
      'identity-front': null as VerificationDocument,
      'identity-back': null as VerificationDocument,
      passport: null as VerificationDocument,
      expireAt: null as ExpireAt,
    },
  })

  const errors = methods.formState.errors

  const watchCompanyStepValues = watchValues('company', methods)
  const watchCredentialStepValues = watchValues('credentials', methods)
  const watchPersonalInfoStepValues = watchValues('personal_info', methods)
  const watchAddressStepValues = watchValues('address', methods)
  const watchPhoneStepValues = watchValues('phones', methods)
  const watchDocumentStepValues = watchValues('documents', methods)

  const checkIfDataAlreadyExists = async (data: any) => {
    setIsFormButtonLoading(true)
    const info = {} as any
    for (let key in data) {
      if (Array.isArray(data[key])) {
        data[key].length && (info[key] = data[key])
        continue
      }
      info[key] = data[key]
    }
    info.accountType = type
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
    data.accountType = type
    data.isEmployee = type === 'business'
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
    if (isStep('company', step, type)) {
      if (
        await checkIfDataAlreadyExists({
          name: watchCompanyStepValues[0],
          email: watchCompanyStepValues[1],
          phone: watchCompanyStepValues[2],
        })
      ) {
        return
      }
    }
    if (isStep('credentials', step, type)) {
      if (
        await checkIfDataAlreadyExists({
          username: watchCredentialStepValues[0],
          emails: watchCredentialStepValues[1],
        })
      ) {
        return
      }
    }
    if (isStep('phones', step, type)) {
      if (
        await checkIfDataAlreadyExists({
          phones: watchPhoneStepValues[0],
        })
      ) {
        return
      }
    }
    if (isStep('documents', step, type)) {
      let copiedErrors: any = errors
      if (type === 'personal') {
        const {
          name,
          phone,
          address,
          email,
          expiryDate,
          traderLicense,
          establishmentContract,
          ...rest
        } = errors
        copiedErrors = rest
      }
      if (Object.keys(copiedErrors).length > 0) {
        for (let key in copiedErrors) {
          if (copiedErrors[key]) {
            toast({
              description: copiedErrors[key].message,
            })
          }
        }
        return
      }
      methods.handleSubmit(submitHandler)()
      return
    }
    setStep(step + 1)
  }

  const isFormValid = useCallback(() => {
    if (isStep('company', step, type)) {
      const updatedWatchCompanyStepValues = [...watchCompanyStepValues]
      if (watchCompanyStepValues[4] === 'sole') {
        updatedWatchCompanyStepValues.splice(7, 1)
      }
      return updatedWatchCompanyStepValues.every((value: string) => value)
    }
    if (isStep('credentials', step, type)) {
      let isValid = false
      isValid = watchCredentialStepValues.every((value: string) => value)
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
    if (isStep('personal_info', step, type)) {
      let isValid = false
      const regex = /^[\u0621-\u064A\-_\s]+$/
      const updatedWatchPersonalInfoStepValues = [
        ...watchPersonalInfoStepValues,
      ]
      if (type === 'business') {
        updatedWatchPersonalInfoStepValues.splice(2, 1)
      }
      isValid = updatedWatchPersonalInfoStepValues.every(
        (value: string) => value
      )
      isValid = regex.test(watchPersonalInfoStepValues[1])
      return isValid
    }
    if (isStep('address', step, type)) {
      const updatedWatchAddressStepValues: any =
        watchAddressStepValues[2] === 'AE'
          ? [watchAddressStepValues[0]]
          : watchAddressStepValues
      const isValid = updatedWatchAddressStepValues.every(
        (value: string) => value
      )
      return isValid
    }
    if (isStep('phones', step, type)) {
      let isValid = false
      watchPhoneStepValues[0].forEach((value: Phone) => {
        if (value.phone === '+971' || !value.phone?.startsWith('+971')) {
          isValid = false
          return
        }
        isValid = true
      })
      return isValid
    }

    if (isStep('documents', step, type)) {
      return watchDocumentStepValues.every((value: string) => value)
    }
  }, [
    type,
    step,
    errors,
    watchCompanyStepValues,
    watchCredentialStepValues,
    watchPersonalInfoStepValues,
    watchAddressStepValues,
    watchPhoneStepValues,
    watchDocumentStepValues,
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
        width='full'
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
            <CompanyForm isVisible={isStep('company', step, type)} />
            <CredentialForm isVisible={isStep('credentials', step, type)} />
            <PersonalInfoForm
              type={type}
              isVisible={isStep('personal_info', step, type)}
            />
            <Addresses isVisible={isStep('address', step, type)} />
            <PhonesForm isVisible={isStep('phones', step, type)} />
            <VerificationDocumentsForm
              isVisible={isStep('documents', step, type)}
            />
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
            {isStep('documents', step, type) ? tc('finish') : tc('next')}
          </Button>
        </HStack>
      </Box>
      {process.env.NODE_ENV === 'development' && (
        <DevTool control={methods.control} />
      )}
    </>
  )
}
