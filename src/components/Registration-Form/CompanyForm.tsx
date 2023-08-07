import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import type { IRegistrationProps } from '../../types/Registration-types'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  Box,
  HStack,
  Stack,
  Checkbox,
  Link,
  Text,
  IconButton,
  Flex,
  InputRightElement,
  Select,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  BriefcaseIcon,
  LocationIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  SuitCaseIcon,
  UserIcon,
} from '@/src/icons'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'
import { useFieldArray } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import { useRouter } from 'next/router'
import UploadInput from './Upload-Input'
import Thumbnail from './Thumbnail'

type Props = {
  isVisible: boolean
}

export default function CompanyForm({ isVisible }: Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<IRegistrationProps>()
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const { locale } = useRouter()
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const [toggleIdInputDate, setToggleIdInputDate] = useState(false)

  const watchType = watch('type')
  return (
    <section
      data-step='company info'
      style={{
        display: isVisible ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '1.6rem',
      }}
    >
      <Flex justifyContent='flex-start' gap={{ base: 4 }}>
        <Thumbnail
          name='traderLicense'
          label={t('registration.license_label')}
        />
        {watchType === 'llc' && (
          <Thumbnail
            name='establishmentContract'
            label={t('registration.contract_label')}
          />
        )}
      </Flex>
      <FormControl id='name' isRequired isInvalid={!!errors.name?.message}>
        <FormLabel htmlFor='name'>{t('registration.name')}</FormLabel>
        <InputGroup>
          <InputLeftElement color='gray.500'>
            <SuitCaseIcon />
          </InputLeftElement>

          <Input
            type='text'
            id='name'
            placeholder={`${t('registration.name')}`}
            paddingInlineStart={locale === 'ar' ? 8 : 0}
            {...register('name', {
              required: isVisible
                ? `${t('registration.name_required')}`
                : false,
            })}
          />
        </InputGroup>
        {errors.name?.message && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        id='email'
        isRequired={true}
        isInvalid={!!errors.email?.message}
      >
        <FormLabel htmlFor='email'>{t('registration.email_company')}</FormLabel>
        <InputGroup>
          <InputLeftElement color='gray.500'>
            <AtSignIcon />
          </InputLeftElement>
          <Input
            {...register(`email`, {
              required: isVisible
                ? `${t('registration.email_required')}`
                : false,
              validate: (value) => {
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                return isVisible
                  ? regex.test(value) ||
                      `${t('registration.email_validity_required')}`
                  : true
              },
            })}
            paddingInlineStart={locale === 'ar' ? 8 : 0}
            type='email'
            id='email'
            placeholder={`${t('registration.email')}`}
          />
        </InputGroup>
        {errors.email?.message && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl>
        <FormLabel>{t('registration.phone')}</FormLabel>
        <Controller
          name='phone'
          control={control}
          rules={{ required: isVisible }}
          render={({ field: { value, onChange } }) => (
            <PhoneInput
              placeholder={t('registration.phone')}
              international
              countryCallingCodeEditable={false}
              initialValueFormat='national'
              className={locale === 'ar' ? 'phone-input' : ''}
              style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
              value={value}
              onChange={(value) => onChange(value)}
              inputComponent={Input}
            />
          )}
        />
        <FormHelperText>{t('registration.choose_country_code')}</FormHelperText>
      </FormControl>
      <FormControl
        id='address'
        isRequired
        isInvalid={!!errors.address?.message}
      >
        <FormLabel htmlFor='address'>{t('registration.address')}</FormLabel>
        <InputGroup>
          <InputLeftElement color='gray.500'>
            <LocationIcon />
          </InputLeftElement>
          <Input
            {...register('address', {
              required: isVisible
                ? `${t('registration.address_required')}`
                : false,
            })}
            id='address'
            placeholder={`${t('registration.address')}`}
          />
        </InputGroup>
        {errors.address?.message && (
          <FormErrorMessage>{errors.address.message}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl id='type' isRequired isInvalid={!!errors.type?.message}>
        <FormLabel htmlFor='type'>Company Type</FormLabel>
        <InputGroup>
          <InputLeftElement color='gray.500'>
            <BriefcaseIcon />
          </InputLeftElement>
          <Select
            className='company-type-select'
            {...register('type', {
              required: isVisible ? 'Company Type is required' : false,
            })}
            id='type'
            placeholder='Company Type'
          >
            <option value='llc'>LLC</option>
            <option value='sole'>Sole Proprietorship</option>
          </Select>
        </InputGroup>
        {errors.type?.message && (
          <FormErrorMessage>{errors.type.message}</FormErrorMessage>
        )}
      </FormControl>
      <Flex
        justifyContent='space-between'
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Box width={{ base: '100%', lg: '48%', xl: '45%' }}>
          <FormControl>
            <VStack>
              <Controller
                name='traderLicense'
                control={control}
                rules={{
                  required: isVisible
                    ? `${t('registration.license_upload')}`
                    : false,
                }}
                render={({ field }) => (
                  <UploadInput
                    text={t('registration.license_upload')}
                    label={t('registration.license_label')}
                    id='traderLicense'
                    {...field}
                  />
                )}
              />
              <HStack w='100%' position='relative'>
                <Input
                  id='expiryDate-id'
                  type={toggleIdInputDate ? 'date' : 'text'}
                  placeholder={`${t('registration.expireAt_required')}`}
                  onFocus={() => setToggleIdInputDate(true)}
                  {...register('expiryDate', {
                    required: isVisible
                      ? `${t('registration.expireAt_required')}`
                      : false,
                  })}
                />
                <Text
                  position='absolute'
                  right='0.5rem'
                  fontSize='xl'
                  as='span'
                  color='red.500'
                >
                  *
                </Text>
              </HStack>
            </VStack>
          </FormControl>
        </Box>
        <Divider
          my={{ base: 4, lg: 0 }}
          height={{ base: 1.5, lg: 40 }}
          orientation={isLargerThan768 ? 'vertical' : 'horizontal'}
        />
        {watchType === 'llc' && (
          <Box width={{ base: '100%', lg: '48%', xl: '45%' }}>
            <FormControl>
              <VStack>
                <Controller
                  name='establishmentContract'
                  control={control}
                  rules={{
                    required: isVisible
                      ? `${t('registration.contract_upload')}`
                      : false,
                  }}
                  render={({ field }) => (
                    <UploadInput
                      text={t('registration.contract_upload')}
                      label={t('registration.contract_label')}
                      id='establishmentContract'
                      {...field}
                    />
                  )}
                />
              </VStack>
            </FormControl>
          </Box>
        )}
      </Flex>
    </section>
  )
}
