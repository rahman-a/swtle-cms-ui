import { useEffect, useState } from 'react'
import flags from 'country-flag-emoji-json'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react'
import { LocationIcon } from '@/src/icons'
import ReactFlagsSelect from 'react-flags-select'
import PhoneInput from 'react-phone-number-input'
import { useFormContext, Controller, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { IRegistrationProps } from '../../types/Registration-types'

interface IAddressesProps {
  isVisible: boolean
}

export default function Addresses({ isVisible }: IAddressesProps) {
  const {
    register,
    formState: { errors },
    clearErrors,
    trigger,
    control,
    watch,
  } = useFormContext<IRegistrationProps>()
  const { t } = useTranslation('registration')
  const { locale } = useRouter()
  const [phoneError, setPhoneError] = useState<{ [key: number]: string }>({})
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

  const watchCountryName = watch('country')

  useEffect(() => {
    if (watchCountryName.abbr !== 'AE') {
      trigger('outsideAddress')
    } else {
      clearErrors('outsideAddress')
    }
  }, [watchCountryName, trigger, clearErrors])

  return (
    <section
      data-step='addresses info'
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <Stack spacing={8}>
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
        {/* <FormControl
          id='outsideAddress'
          isRequired
          isInvalid={!!errors.outsideAddress?.message}
        >
          <FormLabel htmlFor='outsideAddress'>
            {t('registration.address_outside')}
          </FormLabel>
          <InputGroup>
            <InputLeftElement color='gray.500'>
              <LocationIcon />
            </InputLeftElement>
            <Input
              {...register('outsideAddress', {
                required: {
                  value: watchCountryName.abbr !== 'AE',
                  message: `${t('registration.address_outside_required')}`,
                },
              })}
              id='outsideAddress'
              placeholder={`${t('registration.address_outside')}`}
            />
          </InputGroup>
          <FormHelperText>
            {t('registration.address_outside_required_message')}
          </FormHelperText>
          {watchCountryName.abbr !== 'AE' && errors.outsideAddress?.message && (
            <FormErrorMessage>{errors.outsideAddress.message}</FormErrorMessage>
          )}
        </FormControl> */}
        {/*/////////// PHONE NUMBER ///////////////////*/}
        {fields.map((field, index) => (
          <HStack
            marginBottom={index > 1 ? '3rem !important' : 0}
            key={field.id}
            width='100%'
            alignItems='flex-end'
          >
            <FormControl
              isRequired={index === 0}
              key={field.id}
              isInvalid={Object.keys(phoneError).includes(index.toString())}
            >
              <FormLabel>{t('registration.phone_uae')}</FormLabel>
              <Controller
                name={`insidePhones.${index}`}
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
                        setPhoneError({
                          ...phoneError,
                          [index]: t('registration.valid_uae_number_required'),
                        })
                        return onChange({
                          phone: value,
                          isPrimary: index === 0,
                        })
                      }
                      onChange({ phone: value, isPrimary: index === 0 })
                      setPhoneError({})
                    }}
                    inputComponent={Input}
                  />
                )}
              />
              {phoneError[index] && (
                <FormErrorMessage>{phoneError[index]}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        ))}
        {/*/////////// PHONE NUMBER ///////////////////*/}
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
