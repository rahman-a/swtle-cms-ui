import { useState, useRef, Component } from 'react'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react'
import 'react-phone-number-input/style.css'
import PhoneInput, {
  DefaultInputComponentProps,
  Props,
} from 'react-phone-number-input'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { IRegistrationProps } from '../../types/Registration-types'
import { useFormContext, Controller, useFieldArray } from 'react-hook-form'
import { MinusCircleIcon, PlusCircleIcon } from '@/src/icons'
interface IPhonesFormProps {
  isVisible: boolean
}

export default function PhonesForm({ isVisible }: IPhonesFormProps) {
  const [phoneError, setPhoneError] = useState<{ [key: number]: string }>({})
  const { control } = useFormContext<IRegistrationProps>()
  const { t } = useTranslation('registration')
  const { locale } = useRouter()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'insidePhones',
  })
  const {
    fields: outSidesFields,
    append: add,
    remove: removeField,
  } = useFieldArray({
    control,
    name: 'outsidePhones',
  })

  return (
    <section
      data-step='phones info'
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <VStack spacing={8} w='100%'>
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
            {index > 0 && (
              <IconButton
                aria-label={`${t('registration.phone_remove')}`}
                variant='ghost'
                onClick={() => remove(index)}
                icon={<MinusCircleIcon color='gray.600' />}
              />
            )}
          </HStack>
        ))}
      </VStack>
      {fields.length < 3 && (
        <Flex justifyContent='flex-end' width='100%' mt={2}>
          <IconButton
            aria-label={`${t('registration.phone_add')}`}
            variant='ghost'
            onClick={() => append({ phone: '', isPrimary: false })}
            icon={<PlusCircleIcon color='gray.600' />}
          />
        </Flex>
      )}
      {/* OUTSIDE PHONES  */}
      <VStack spacing={8} w='100%'>
        {outSidesFields.map((field, index) => (
          <HStack key={field.id} width='100%' alignItems='flex-end'>
            <FormControl key={field.id}>
              <FormLabel>{t('registration.phone_outside')}</FormLabel>
              <Controller
                name={`outsidePhones.${index}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <PhoneInput
                    placeholder={`${t('registration.enter_phone')}`}
                    international
                    countryCallingCodeEditable={false}
                    initialValueFormat='national'
                    className={locale === 'ar' ? 'phone-input' : ''}
                    style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
                    value={value.phone}
                    onChange={(value) => onChange({ phone: value })}
                    inputComponent={Input}
                  />
                )}
              />
              <FormHelperText>
                {t('registration.choose_country_code')}
              </FormHelperText>
            </FormControl>
            {index > 0 && (
              <IconButton
                aria-label={`${t('registration.phone_remove')}`}
                variant='ghost'
                onClick={() => removeField(index)}
                icon={<MinusCircleIcon color='gray.600' />}
              />
            )}
          </HStack>
        ))}
      </VStack>
      {fields.length < 3 && (
        <Flex justifyContent='flex-end' width='100%' mt={2}>
          <IconButton
            aria-label={`${t('registration.phone_add')}`}
            variant='ghost'
            onClick={() => add({ phone: '' })}
            icon={<PlusCircleIcon color='gray.600' />}
          />
        </Flex>
      )}
    </section>
  )
}
