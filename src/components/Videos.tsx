import dynamic from 'next/dynamic'
import { Box, StyleProps } from '@chakra-ui/react'
import { FullPlayIcon } from '../icons'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface IVideoProps {
  url: string
  thumbnail?: string
  containerStyles?: StyleProps
}

function Video({ url, thumbnail, containerStyles }: IVideoProps) {
  return (
    <Box {...(containerStyles ?? {})}>
      <ReactPlayer
        height='100%'
        width='100%'
        style={{ padding: '0', margin: '0', position: 'relative' }}
        playing={true}
        url={url}
        playIcon={<PlayIconContainer />}
        className='react-player'
        light={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            width='572px'
            height='333px'
            src={thumbnail ?? './images/thumbnail.webp'}
            alt='hero-section'
          />
        }
      />
    </Box>
  )
}

const PlayIconContainer = () => {
  return (
    <Box
      position='absolute'
      width={12}
      height={12}
      borderRadius='full'
      bg='#000'
      color='#fff'
      display='grid'
      placeItems='center'
    >
      <FullPlayIcon boxSize={4} />
    </Box>
  )
}

export default Video
