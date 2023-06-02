import ReactPlayer from 'react-player/youtube'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

interface IVideoProps {
  isOpen: boolean
  onClose: () => void
  link: string
  thumbnail?: string
}

export default function Video({
  isOpen,
  onClose,
  link,
  thumbnail,
}: IVideoProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset='slideInBottom'
      size='xl'
    >
      <ModalOverlay />
      <ModalContent p='0'>
        <ModalCloseButton color='white' />
        <ModalBody p='0'>
          <ReactPlayer
            url={link}
            light={
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail ?? './images/thumbnail.webp'}
                alt='hero-section'
              />
            }
            width='100%'
          />
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}
