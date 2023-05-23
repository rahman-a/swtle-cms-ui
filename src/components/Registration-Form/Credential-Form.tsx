import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { MinusCircleIcon, PlusCircleIcon, UserIcon } from '@/src/icons'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'
import { useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/router'
import PasswordField from './Password-Field'

interface ICredentialFormProps {
  isVisible: boolean
}

export default function CredentialForm({ isVisible }: ICredentialFormProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<IRegistrationProps>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'emails',
  })
  const { locale } = useRouter()
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const watchPassword = watch('password')

  return (
    <section
      data-step='credential info'
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <FormControl
        id='username'
        isRequired
        isInvalid={!!errors.username?.message}
      >
        <FormLabel htmlFor='username'>{t('registration.username')}</FormLabel>
        <InputGroup>
          <InputLeftElement color='gray.500'>
            <UserIcon />
          </InputLeftElement>

          <Input
            type='text'
            id='username'
            placeholder={`${t('registration.username')}`}
            paddingInlineStart={locale === 'ar' ? 8 : 0}
            {...register('username', {
              required: `${t('registration.username_required')}`,
              minLength: {
                value: 6,
                message: `${t('registration.username_least_length', {
                  length: 6,
                })}`,
              },
              maxLength: {
                value: 20,
                message: `${t('registration.username_most_length', {
                  length: 20,
                })}`,
              },
              validate: (value) => {
                const regex = /^[a-zA-Z0-9.]+$/
                return (
                  regex.test(value) ||
                  `${t('registration.username_valid_format_required')}`
                )
              },
            })}
          />
        </InputGroup>
        <FormHelperText>
          {t('registration.username_valid_format_message')}
        </FormHelperText>
        {errors.username?.message && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>
      <Divider my={8} borderColor='gray.400' />
      <Box>
        {fields.map((field, index) => (
          <HStack
            key={field.id}
            spacing={2}
            pt={1.5}
            w='100%'
            justifyContent='flex-end'
          >
            <FormControl
              id='email'
              pb={6}
              isRequired={index === 0}
              isInvalid={
                errors.emails && !!errors.emails[index]?.email?.message
              }
            >
              <FormLabel htmlFor='email'>{t('registration.email')}</FormLabel>
              <InputGroup>
                <InputLeftElement color='gray.500'>
                  <AtSignIcon />
                </InputLeftElement>
                <Input
                  {...register(`emails.${index}.email`, {
                    required: {
                      value: index === 0,
                      message: `${t('registration.email_required')}`,
                    },
                    validate: (value) => {
                      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                      return (
                        regex.test(value) ||
                        `${t('registration.email_validity_required')}`
                      )
                    },
                  })}
                  paddingInlineStart={locale === 'ar' ? 8 : 0}
                  type='email'
                  id={`email.${index}`}
                  placeholder={`${t('registration.email')}`}
                />
              </InputGroup>
              {errors.emails && errors.emails[index]?.email?.message && (
                <FormErrorMessage>
                  {errors.emails[index]?.email?.message &&
                    errors.emails[index]?.email?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            {index > 0 && (
              <IconButton
                aria-label={t('registration.email.remove')}
                variant='ghost'
                onClick={() => remove(index)}
                icon={<MinusCircleIcon color='gray.600' />}
              />
            )}
          </HStack>
        ))}
        {fields.length < 3 && (
          <Flex justifyContent='flex-end'>
            <IconButton
              aria-label={t('registration.email.add')}
              variant='ghost'
              onClick={() => append({ email: '', isPrimary: false })}
              icon={<PlusCircleIcon color='gray.600' />}
            />
          </Flex>
        )}
      </Box>
      <Divider my={4} borderColor='gray.400' />
      <Stack spacing={4}>
        <PasswordField
          id='password'
          error={errors.password?.message}
          label={t('registration.password')}
          helperText={t('registration.password_valid_format_message')!}
          placeholder={t('registration.password_required')}
          {...register('password', {
            required: `${t('registration.password_required')}`,
            minLength: {
              value: 8,
              message: `${t('registration.password_least_length', {
                length: 8,
              })}`,
            },
            maxLength: {
              value: 20,
              message: `${t('registration.password_most_length', {
                length: 20,
              })}`,
            },
            validate: (value) => {
              const regex =
                /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z"])[a-zA-Z0-9]{8,20}$/
              return (
                regex.test(value) ||
                `${t('registration.password_valid_format_required')}`
              )
            },
          })}
        />
        <PasswordField
          id='confirmPassword'
          error={errors.confirmPassword?.message}
          label={t('registration.confirm_password')}
          placeholder={t('registration.confirm_password')}
          {...register('confirmPassword', {
            required: `${t('registration.confirm_password_required')}`,
            validate: (value) =>
              value === watchPassword ||
              `${t('registration.confirm_password_not_match')}`,
          })}
        />
      </Stack>
      <FormControl isRequired pt={2} isInvalid={!!errors.isAgreed}>
        <FormLabel mt={0} display='flex'>
          <HStack spacing={2} alignItems='center'>
            <Checkbox
              {...register('isAgreed', {
                required: `${t('registration.consent_policy_required')}`,
              })}
            ></Checkbox>
            <Text as='p' fontSize={{ base: 'xs', md: 'md' }}>
              {t('registration.consent')}
            </Text>
            <Link
              fontSize={{ base: 'xs', md: 'md' }}
              as={NextLink}
              href='#'
              color='secondary'
            >
              {t('registration.terms_and_conditions')}
            </Link>
            <Text fontSize={{ base: 'xs', md: 'md' }} as='p'>
              {tc('and')}
            </Text>
            <Link
              fontSize={{ base: 'xs', md: 'md' }}
              as={NextLink}
              href='#'
              color='secondary'
            >
              {t('registration.privacy_policy')}
            </Link>
          </HStack>
        </FormLabel>
        <FormErrorMessage>
          {errors.isAgreed && errors.isAgreed.message}
        </FormErrorMessage>
      </FormControl>
    </section>
  )
}
