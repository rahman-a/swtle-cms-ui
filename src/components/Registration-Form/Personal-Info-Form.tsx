import { SuitCaseIcon, UserIcon } from '@/src/icons'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import type { IRegistrationProps } from '../../types/Registration-types'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'

interface IPersonalInfoFormProps {
  isVisible: boolean
}

export default function PersonalInfoForm({
  isVisible,
}: IPersonalInfoFormProps) {
  const { t } = useTranslation('registration')
  const { locale } = useRouter()
  const {
    register,
    formState: { errors },
  } = useFormContext<IRegistrationProps>()
  return (
    <section
      data-step='personal info'
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <Stack spacing={8}>
        <FormControl
          id='englishName'
          isRequired
          isInvalid={!!errors.fullNameInEnglish?.message}
        >
          <FormLabel htmlFor='englishName'>
            {t('registration.full_name', {
              type: locale === 'en' ? 'English' : 'الإنجليزى',
            })}
          </FormLabel>
          <InputGroup>
            <InputLeftElement color='gray.500'>
              <UserIcon />
            </InputLeftElement>
            <Input
              {...register('fullNameInEnglish', {
                required: `${t('registration.full_name_required', {
                  type: locale === 'en' ? 'English' : 'الإنجليزى',
                })}`,
              })}
              id='englishName'
              placeholder={`${t('registration.full_name', {
                type: locale === 'en' ? 'English' : 'الإنجليزى',
              })}`}
            />
          </InputGroup>
          {errors.fullNameInEnglish?.message && (
            <FormErrorMessage>
              {errors.fullNameInEnglish.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id='arabicName'
          isRequired
          isInvalid={!!errors.fullNameInArabic?.message}
        >
          <FormLabel htmlFor='arabicName'>
            {t('registration.full_name', {
              type: locale === 'en' ? 'Arabic' : 'العربى',
            })}
          </FormLabel>
          <InputGroup>
            <InputLeftElement color='gray.500'>
              <UserIcon />
            </InputLeftElement>
            <Input
              {...register('fullNameInArabic', {
                required: `${t('registration.full_name_required', {
                  type: locale === 'en' ? 'Arabic' : 'العربى',
                })}`,
              })}
              id='arabicName'
              placeholder={`${t('registration.full_name', {
                type: locale === 'en' ? 'Arabic' : 'العربى',
              })}`}
            />
          </InputGroup>
          {errors.fullNameInArabic?.message && (
            <FormErrorMessage>
              {errors.fullNameInArabic.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          id='company'
          isRequired
          isInvalid={!!errors.company?.message}
        >
          <FormLabel htmlFor='company'>{t('registration.company')}</FormLabel>
          <InputGroup>
            <InputLeftElement color='gray.500'>
              <SuitCaseIcon />
            </InputLeftElement>
            <Input
              {...register('company', {
                required: `${t('registration.company_required')}`,
              })}
              id='company'
              placeholder={`${t('registration.company')}`}
            />
          </InputGroup>
          {errors.company?.message && (
            <FormErrorMessage>{errors.company.message}</FormErrorMessage>
          )}
        </FormControl>
      </Stack>
    </section>
  )
}
