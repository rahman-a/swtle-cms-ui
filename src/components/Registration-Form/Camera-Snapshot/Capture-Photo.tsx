import { CropIcon, PortraitIcon } from '@/src/icons'
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Button,
  HStack,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { useTranslation } from 'next-i18next'
import { v4 as uuidV4 } from 'uuid'
import { useRouter } from 'next/router'
import PhotoCropper from './Crop-Photo'

interface ICapturePhotoProps {
  isOpen: boolean
  onClose: () => void
}

export default function CapturePhoto({ isOpen, onClose }: ICapturePhotoProps) {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false)
  const [mediaError, setMediaError] = useState(null)
  const [isCropEnable, setCropEnable] = useState<boolean>(false)
  const [fileBlob, setFileBlob] = useState<File | null>(null)
  const webcamRef = useRef<Webcam>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [isFileLarge, setFileLarge] = useState<boolean>(false)
  const { locale } = useRouter()
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const toast = useToast()
  const { setValue } = useFormContext()
  const capture = useCallback(() => {
    if (!mediaError) {
      const imageSrc = webcamRef.current?.getScreenshot()
      if (imageSrc) {
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'personal_image_selected.png', {
              type: 'image/png',
            })
            setFileBlob(file)
            setCaptureEnable(false)
            setUrl(imageSrc)
          })
      }
    }
  }, [webcamRef, mediaError])

  const mediaErrorHandler = (error: any) => {
    setMediaError(error.message)
  }

  const selectCurrentPhotoHandler = (file?: File): void => {
    const selectedPhoto = file ? file : fileBlob
    if (selectedPhoto && selectedPhoto?.size > 2000000) {
      setFileLarge(true)
      return
    }
    setValue('avatar', selectedPhoto)
    setCaptureEnable(false)
    setCropEnable(false)
    setUrl(null)
    onClose()
  }

  const closeCameraShot = () => {
    setCaptureEnable(false)
    setUrl(null)
    onClose()
  }
  const videoConstraints = {
    width: 415,
    height: 300,
    facingMode: 'user',
  }

  useEffect(() => {
    if (isFileLarge) {
      toast({
        title: t('registration.file_large'),
        description: t('registration.file_upload_size', { size: '2MB' }),
        position: 'top',
        status: 'error',
        duration: 10000,
        isClosable: true,
        onCloseComplete: () => setFileLarge(false),
      })
    }
  }, [isFileLarge, toast, t])
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg='gray.500' color='white'>
          <HStack spacing={2}>
            <PortraitIcon boxSize={6} />
            <Heading as='h4' fontSize={{ base: 'sm', md: 'md' }}>
              {t('registration.camera_take')}
            </Heading>
          </HStack>
        </ModalHeader>
        <ModalBody px={2}>
          {!isCaptureEnable && !url && (
            <Box py={4}>
              <Button onClick={() => setCaptureEnable(true)}>
                {t('registration.camera_run')}
              </Button>
            </Box>
          )}
          {mediaError && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{mediaError}</AlertTitle>
              <AlertDescription>
                {t('registration.camera_allow_access')}
              </AlertDescription>
            </Alert>
          )}
          <Box>
            {!mediaError && isCaptureEnable && (
              <>
                <Webcam
                  key={uuidV4()}
                  audio={false}
                  screenshotFormat='image/png'
                  videoConstraints={videoConstraints}
                  ref={webcamRef}
                  style={{ width: '100%' }}
                  imageSmoothing={true}
                  minScreenshotHeight={300}
                  minScreenshotWidth={415}
                  onUserMediaError={(error) => mediaErrorHandler(error)}
                />
                <HStack spacing={4} py={4}>
                  <Button
                    leftIcon={<PortraitIcon />}
                    variant='primary'
                    onClick={capture}
                    size='sm'
                  >
                    {t('registration.camera_shot')}
                  </Button>
                  <Button size='sm' onClick={closeCameraShot}>
                    {tc('close')}
                  </Button>
                </HStack>
              </>
            )}
          </Box>
          {url && !isCaptureEnable && !isCropEnable && (
            <VStack spacing={4} w='100%'>
              <Button
                leftIcon={locale === 'en' ? <ArrowBackIcon /> : undefined}
                rightIcon={locale === 'ar' ? <ArrowBackIcon /> : undefined}
                alignSelf={locale === 'en' ? 'flex-start' : 'flex-end'}
                onClick={() => setUrl(null)}
                size='sm'
                variant='ghost'
              >
                {tc('back')}
              </Button>
              <Box position='relative' w='100%' height='315px'>
                <Image
                  src={url}
                  alt='avatar user'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <HStack spacing={4} py={2} w='100%' justifyContent='flex-start'>
                <Button
                  size='sm'
                  leftIcon={<CropIcon />}
                  colorScheme='gray'
                  onClick={() => setCropEnable(true)}
                >
                  {t('registration.camera_crop')}
                </Button>
                <Button
                  size='sm'
                  onClick={() => selectCurrentPhotoHandler(undefined)}
                  variant='primary'
                >
                  {t('registration.camera_select_photo')}
                </Button>
              </HStack>
            </VStack>
          )}
          {isCropEnable && url && (
            <VStack>
              <Button
                leftIcon={locale === 'en' ? <ArrowBackIcon /> : undefined}
                rightIcon={locale === 'ar' ? <ArrowBackIcon /> : undefined}
                alignSelf={locale === 'en' ? 'flex-start' : 'flex-end'}
                onClick={() => {
                  setCropEnable(false)
                  setUrl(null)
                }}
                size='sm'
                variant='ghost'
              >
                {tc('back')}
              </Button>
              <PhotoCropper
                defaultSrc={url}
                selectCurrentPhotoHandler={selectCurrentPhotoHandler}
              />
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
