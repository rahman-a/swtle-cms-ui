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
}

export default function Video({ isOpen, onClose }: IVideoProps) {
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
            url='https://www.youtube.com/watch?v=ItLIUzMjteA&ab_channel=EbrahimRaeyp'
            // eslint-disable-next-line @next/next/no-img-element
            light={<img src='./images/thumbnail.webp' alt='hero-section' />}
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
