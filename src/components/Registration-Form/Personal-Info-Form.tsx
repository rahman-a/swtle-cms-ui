import { SuitCaseIcon, UserIcon } from '@/src/icons'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  type: string
}

export default function PersonalInfoForm({
  isVisible,
  type,
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
                validate: (value) => {
                  const regex = /^[\u0621-\u064A\-_\s]+$/
                  return (
                    regex.test(value) ||
                    `${t('registration.arabic_name_validity_required')}`
                  )
                },
              })}
              id='arabicName'
              placeholder={`${t('registration.full_name', {
                type: locale === 'en' ? 'Arabic' : 'العربى',
              })}`}
            />
          </InputGroup>
          <FormHelperText>
            {t('registration.arabic_name_valid_format_message')}
          </FormHelperText>
          {errors.fullNameInArabic?.message && (
            <FormErrorMessage>
              {errors.fullNameInArabic.message}
            </FormErrorMessage>
          )}
        </FormControl>
        {type === 'personal' && (
          <FormControl
            id='company'
            isRequired
            isInvalid={!!errors.company?.message}
          >
            <FormLabel htmlFor='company'>
              {t('registration.company_name')}
            </FormLabel>
            <InputGroup>
              <InputLeftElement color='gray.500'>
                <SuitCaseIcon />
              </InputLeftElement>
              <Input
                {...register('company', {
                  required:
                    type === 'personal'
                      ? `${t('registration.company_required')}`
                      : false,
                })}
                id='company'
                placeholder={`${t('registration.company_name')}`}
              />
            </InputGroup>
            {errors.company?.message && (
              <FormErrorMessage>{errors.company.message}</FormErrorMessage>
            )}
          </FormControl>
        )}
      </Stack>
    </section>
  )
}
