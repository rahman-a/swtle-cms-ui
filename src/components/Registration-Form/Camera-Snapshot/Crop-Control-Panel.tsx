import { useEffect } from 'react'
import {
  CropIcon,
  RotateLeftIcon,
  RotateRightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/src/icons'
import { Button, Flex, HStack, Hide, IconButton, Show } from '@chakra-ui/react'
import Slider from './Slider'
import { useTranslation } from 'next-i18next'

interface ICropControlPanelProps {
  cropPhotoHandler: () => void
  resetCropHandler: () => void
  selectCurrentPhotoHandler: (file?: File) => void
  isPhotoCropped: boolean
  cropper: any
  zoom: number
  setZoom: React.Dispatch<React.SetStateAction<number>>
  rotation: number
  setRotation: React.Dispatch<React.SetStateAction<number>>
}

export default function CropControlPanel({
  cropPhotoHandler,
  resetCropHandler,
  selectCurrentPhotoHandler,
  cropper,
  isPhotoCropped,
  zoom,
  setZoom,
  rotation,
  setRotation,
}: ICropControlPanelProps) {
  const { t } = useTranslation('registration')
  const { t: tc } = useTranslation('common')
  const selectFinalOutput = (): void => {
    if (!isPhotoCropped) {
      selectCurrentPhotoHandler(undefined)
      return
    }
    cropper.getCroppedCanvas().toBlob((blob: File) => {
      const file = new File([blob], 'personal_image_cropped.png', {
        type: 'image/png',
      })
      selectCurrentPhotoHandler(file)
    })
  }

  const handleZoom = (value: number, type: string) => {
    if (type === 'increase') {
      zoom <= 0.4 && setZoom(zoom + value)
    }
    if (type === 'decrease') {
      zoom >= 0.1 && setZoom(zoom - value)
    }
  }
  const handleRotate = (type: string) => {
    if (type === 'increase') {
      rotation < 360 && setRotation(rotation + 45)
    }
    if (type === 'decrease') {
      rotation < 90 ? setRotation(0.1) : setRotation(rotation - 45)
    }
  }
  useEffect(() => {
    rotation && cropper?.rotateTo(rotation)
    console.log('🚀 rotation:', rotation)
  }, [rotation, cropper])

  useEffect(() => {
    zoom && cropper?.zoom(zoom)
  }, [zoom, cropper])
  return (
    <Flex
      py={2}
      position='relative'
      zIndex='999'
      justifyContent='space-between'
      flexWrap={{ base: 'wrap', sm: 'nowrap' }}
      alignItems='center'
      bg='white'
    >
      <Hide below='sm'>
        <IconButton
          color='secondary'
          variant='ghost'
          aria-label={t('registration.camera_crop')}
          onClick={cropPhotoHandler}
          icon={<CropIcon />}
        />
      </Hide>
      <HStack
        w={{ base: '100%', sm: 'auto' }}
        justifyContent={{ base: 'center', sm: 'flex-start' }}
      >
        <HStack spacing={{ base: 0, sm: 0.5 }} minW={{ base: 44, sm: 40 }}>
          <IconButton
            color='secondary'
            variant='ghost'
            aria-label={t('registration.camera_zoom_out')}
            icon={<ZoomOutIcon />}
            onClick={() => handleZoom(0.1, 'decrease')}
          />
          <Slider
            slider={{
              'aria-label': 'slider-photo-zoom',
              defaultValue: zoom,
              onChange: (value: number) => setZoom(value),
              max: 0.4,
              min: 0.1,
              step: 0.1,
              value: zoom,
            }}
          />
          <IconButton
            color='secondary'
            variant='ghost'
            aria-label={t('registration.camera_zoom_in')}
            icon={<ZoomInIcon />}
            onClick={() => handleZoom(0.1, 'increase')}
          />
        </HStack>
        <HStack spacing={{ base: 0, sm: 0.5 }} minW={{ base: 44, sm: 40 }}>
          <IconButton
            color='secondary'
            variant='ghost'
            aria-label={t('registration.camera_rotate_left')}
            icon={<RotateLeftIcon />}
            onClick={() => handleRotate('decrease')}
          />
          <Slider
            slider={{
              'aria-label': 'slider-photo-zoom',
              defaultValue: rotation,
              onChange: (value: number) => setRotation(value),
              max: 360,
              min: 0.1,
              step: 45,
              value: rotation,
            }}
          />
          <IconButton
            color='secondary'
            variant='ghost'
            aria-label={t('registration.camera_rotate_right')}
            icon={<RotateRightIcon />}
            onClick={() => handleRotate('increase')}
          />
        </HStack>
      </HStack>
      <HStack
        spacing={2}
        w={{ base: '100%', sm: 'auto' }}
        justifyContent={{ base: 'center', sm: 'flex-start' }}
      >
        <Show below='sm'>
          <Button
            onClick={cropPhotoHandler}
            size='sm'
            variant='primary'
            leftIcon={<CropIcon />}
          >
            {t('registration.camera_crop')}
          </Button>
        </Show>
        <Button
          onClick={resetCropHandler}
          rounded='2xl'
          size='sm'
          variant='primary'
        >
          {tc('reset')}
        </Button>
        <Button
          onClick={selectFinalOutput}
          rounded='2xl'
          size='sm'
          variant='primary'
        >
          {tc('select')}
        </Button>
      </HStack>
    </Flex>
  )
}
