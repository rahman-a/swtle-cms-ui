import {
  Box,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react'
import type { IRegistrationProps } from '../../types/Registration-types'
import { useFormContext, Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import Thumbnail from './Thumbnail'
import { useState } from 'react'
import UploadInput from './Upload-Input'
import CameraShot from './Camera-Shot'

interface IVerificationDocumentsFormProps {
  isVisible: boolean
}

export default function VerificationDocumentsForm({
  isVisible,
}: IVerificationDocumentsFormProps) {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const [toggleIdInputDate, setToggleIdInputDate] = useState(false)
  const [togglePassInputDate, setTogglePassInputDate] = useState(false)
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const { control, register } = useFormContext<IRegistrationProps>()
  return (
    <section
      data-step='verification documents'
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <Flex justifyContent='space-between' gap={{ base: 4, sm: 0 }}>
        <Thumbnail name='avatar' label={t('registration.personal_photo')} />
        <Thumbnail
          name='identity-front'
          label={t('registration.identity_front')}
        />
        <Thumbnail
          name='identity-back'
          label={t('registration.identity_back')}
        />
        <Thumbnail name='passport' label={t('registration.identity_back')} />
      </Flex>
      <Box my={12}>
        <Flex
          justifyContent='space-between'
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <HStack spacing={2} width={{ base: '100%', lg: '48%', xl: '45%' }}>
            <Controller
              name='avatar'
              control={control}
              rules={{
                required: `${t('registration.personal_photo_required')}`,
              }}
              render={({ field }) => (
                <UploadInput
                  text={t('registration.personal_photo_upload')}
                  label={t('registration.personal_photo')}
                  id='personal-photo'
                  iconSize={12}
                  {...field}
                />
              )}
            />
            <Text color='gray.500' as='p' fontSize='xl'>
              {tc('or').toLocaleUpperCase()}
            </Text>
            <CameraShot iconSize={12} />
          </HStack>
          <Divider
            my={{ base: 4, lg: 0 }}
            height={{ base: 1.5, lg: 40 }}
            orientation={isLargerThan768 ? 'vertical' : 'horizontal'}
          />
          <Box width={{ base: '100%', lg: '48%', xl: '45%' }}>
            <FormControl>
              <VStack>
                <Controller
                  name='identity-front'
                  control={control}
                  rules={{ required: `${t('registration.identity_upload')}` }}
                  render={({ field }) => (
                    <UploadInput
                      text={t('registration.identity_front_upload')}
                      label={t('registration.identity_front_label')}
                      id='identity-card-front'
                      {...field}
                    />
                  )}
                />
                <HStack w='100%' position='relative'>
                  <Input
                    id='expireAt-id'
                    type={toggleIdInputDate ? 'date' : 'text'}
                    placeholder={`${t('registration.expireAt_required')}`}
                    onFocus={() => setToggleIdInputDate(true)}
                    {...register('expireAt.identity', {
                      required: `${t('registration.expireAt_required')}`,
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
        </Flex>
        <Flex
          justifyContent='space-between'
          flexDirection={{ base: 'column', lg: 'row' }}
          mt={4}
        >
          <Box width={{ base: '100%', lg: '48%', xl: '45%' }}>
            <FormControl>
              <Controller
                name='identity-back'
                control={control}
                rules={{ required: `${t('registration.identity_upload')}` }}
                render={({ field }) => (
                  <UploadInput
                    text={t('registration.identity_back_upload')}
                    label={t('registration.identity_back_label')}
                    id='identity-card-back'
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Divider
            my={{ base: 4, lg: 0 }}
            height={{ base: 1.5, lg: 40 }}
            orientation={isLargerThan768 ? 'vertical' : 'horizontal'}
          />
          <Box width={{ base: '100%', lg: '48%', xl: '45%' }}>
            <FormControl>
              <VStack>
                <Controller
                  name='passport'
                  control={control}
                  rules={{ required: `${t('registration.passport_upload')}` }}
                  render={({ field }) => (
                    <UploadInput
                      text={t('registration.passport_upload')}
                      label={t('registration.passport')}
                      id='passport-doc'
                      {...field}
                    />
                  )}
                />
                <HStack w='100%' position='relative'>
                  <Input
                    id='expireAt-pass'
                    type={togglePassInputDate ? 'date' : 'text'}
                    placeholder={`${t('registration.expireAt_required')}`}
                    onFocus={() => setTogglePassInputDate(true)}
                    {...register('expireAt.passport', {
                      required: `${t('registration.expireAt_required')}`,
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
        </Flex>
      </Box>
    </section>
  )
}
