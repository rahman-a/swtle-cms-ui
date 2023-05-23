import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react'
import Image from 'next/image'
interface IThumbnailPreviewProps {
  isOpen: boolean
  onClose: () => void
  preview: {
    src: string
    label: string
  }
}

export default function ThumbnailPreview({
  isOpen,
  onClose,
  preview,
}: IThumbnailPreviewProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{preview.label}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box position='relative' h={96}>
            <Image
              style={{ objectFit: 'contain' }}
              src={preview.src}
              alt={preview.label}
              fill
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
