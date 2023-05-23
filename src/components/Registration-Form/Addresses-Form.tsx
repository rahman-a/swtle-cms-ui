import { useEffect } from 'react'
import flags from 'country-flag-emoji-json'
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { LocationIcon } from '@/src/icons'
import ReactFlagsSelect from 'react-flags-select'
import { useFormContext, Controller } from 'react-hook-form'
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
        <FormControl
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
        </FormControl>
        <FormControl id='company' isRequired>
          <FormLabel htmlFor='company'>
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
