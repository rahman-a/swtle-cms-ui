import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import CropControlPanel from './Crop-Control-Panel'
import Image from 'next/image'

interface ICropPhotoProps {
  defaultSrc: string
  selectCurrentPhotoHandler: (file?: File) => void
}

export default function CropPhoto({
  defaultSrc,
  selectCurrentPhotoHandler,
}: ICropPhotoProps) {
  const [zoom, setZoom] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [cropper, setCropper] = useState<any>()
  const [cropData, setCropData] = useState<string | null>(null)

  const cropPhotoHandler = (): void => {
    if (typeof cropper !== 'undefined') {
      const croppedData = cropper.getCroppedCanvas().toDataURL()
      setCropData(croppedData)
    }
  }

  const resetCropHandler = (): void => {
    setCropData(null)
    setRotation(0)
    setZoom(0)
  }

  return (
    <Box width='100%'>
      {cropData ? (
        <Box position='relative' width='100%' height='300px'>
          <Image
            crossOrigin='anonymous'
            src={cropData}
            alt='cropped-photo'
            style={{ objectFit: 'contain' }}
            fill
          />
        </Box>
      ) : (
        <Box>
          <Cropper
            style={{ height: '100%', width: '100%' }}
            initialAspectRatio={1}
            src={defaultSrc}
            rotateTo={rotation}
            zoomTo={zoom}
            viewMode={1}
            movable={true}
            background={false}
            responsive={true}
            dragMode={'move'}
            checkOrientation={true}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            guides={true}
          />
        </Box>
      )}
      <CropControlPanel
        cropPhotoHandler={cropPhotoHandler}
        resetCropHandler={resetCropHandler}
        selectCurrentPhotoHandler={selectCurrentPhotoHandler}
        cropper={cropper}
        isPhotoCropped={!!cropData}
        zoom={zoom}
        setZoom={setZoom}
        rotation={rotation}
        setRotation={setRotation}
      />
    </Box>
  )
}
