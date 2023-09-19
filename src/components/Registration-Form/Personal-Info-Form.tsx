import dynamic from 'next/dynamic'
import 'react-phone-number-input/style.css'
import { LocationIcon, UserIcon } from '@/src/icons'
import flags from 'country-flag-emoji-json'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import type { IRegistrationProps } from '../../types/Registration-types'
const PhoneInput = dynamic(() => import('react-phone-number-input'))
import { useFormContext, Controller, useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
const ReactFlagsSelect = dynamic(() => import('react-flags-select'))

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
  const { control } = useFormContext<IRegistrationProps>()
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const {
    register,
    formState: { errors },
  } = useFormContext<IRegistrationProps>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'insidePhones',
  })
  const selectCountryHandler = (code: string) => {
    const selectedCountry = flags.find((flag) => flag.code === code)!
    return {
      name: selectedCountry.name,
      abbr: selectedCountry.code,
      image: selectedCountry.image,
    }
  }
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
        <FormControl isRequired={true} isInvalid={!!phoneError}>
          <FormLabel>{t('registration.phone_uae')}</FormLabel>
          <Controller
            name={`insidePhones.0`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <PhoneInput
                placeholder={`${t('registration.phone_placeholder')}`}
                international
                defaultCountry='AE'
                style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
                countryCallingCodeEditable={false}
                initialValueFormat='national'
                className={locale === 'ar' ? 'phone-input' : ''}
                value={value.phone}
                onChange={(value) => {
                  if (!value?.startsWith('+971') || value === '+971') {
                    setPhoneError(t('registration.valid_uae_number_required'))
                    return onChange({
                      phone: value,
                      isPrimary: true,
                    })
                  }
                  onChange({ phone: value, isPrimary: true })
                  setPhoneError(null)
                }}
                inputComponent={Input}
              />
            )}
          />
          {phoneError && <FormErrorMessage>{phoneError}</FormErrorMessage>}
        </FormControl>

        <FormControl
          id='insideAddress'
          isRequired
          isInvalid={!!errors.insideAddress?.message}
        >
          <FormLabel htmlFor='insideAddress'>
            {t('registration.address_uae')}
          </FormLabel>
          <InputGroup>
            <InputLeftElement color='gray.500'>
              <LocationIcon />
            </InputLeftElement>
            <Input
              {...register('insideAddress', {
                required: `${t('registration.address_uae_required')}`,
              })}
              id='insideAddress'
              placeholder={`${t('registration.address_uae')}`}
            />
          </InputGroup>
          {errors.insideAddress?.message && (
            <FormErrorMessage>{errors.insideAddress.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id='country' isRequired>
          <FormLabel htmlFor='country'>
            {t('registration.country_choose')}
          </FormLabel>
          <Controller
            name='country'
            control={control}
            render={({ field: { value, onChange } }) => (
              <ReactFlagsSelect
                selected={value.abbr}
                onSelect={(code) => onChange(selectCountryHandler(code))}
                searchable={true}
                className={locale === 'ar' ? 'flag-select-ar' : ''}
                searchPlaceholder={`${t('registration.country_placeholder')}`}
              />
            )}
          />
        </FormControl>
      </Stack>
    </section>
  )
}
