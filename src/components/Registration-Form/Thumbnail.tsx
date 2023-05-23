import { useEffect, useState } from 'react'
import { Box, Text, VStack, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import ThumbnailPreview from './Thumbnail-Preview'

interface IThumbnailsProps {
  label: string
  name: string
}

export default function Thumbnails({ label, name }: IThumbnailsProps) {
  const { getValues, watch } = useFormContext()
  const [image, setImage] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const watchInput = watch(name)
  const file = getValues(name)
  useEffect(() => {
    if (file?.name) {
      setImage(URL.createObjectURL(file))
    }
  }, [file, watchInput])
  return (
    <>
      {image && (
        <ThumbnailPreview
          isOpen={isOpen}
          onClose={onClose}
          preview={{ src: image, label }}
        />
      )}
      <VStack
        spacing={2}
        cursor={image ? 'pointer' : 'default'}
        onClick={() => onOpen()}
      >
        <Box
          position='relative'
          width={{ base: '4rem', sm: '6rem', lg: '8rem' }}
          height={{ base: '3.5rem', lg: '5rem' }}
          border='1px solid'
          borderColor='secondary'
          borderRadius='sm'
        >
          {image && <Image src={image} alt='about' fill />}
        </Box>
        <Text as='p' textAlign='center' fontSize={{ base: 'sm', md: 'md' }}>
          {label}
        </Text>
      </VStack>
    </>
  )
}
