import { Box } from '@chakra-ui/react'
import { StaticImageData } from 'next/image'
import Image from 'next/image'
import classNames from 'classnames'
import React from 'react'

export interface ISectionImageProps {
  image: StaticImageData | string
  radius?: 'all' | 'top right' | 'top left' | 'bottom right' | 'bottom left'
  overlayText?: string
  radiusValue?: string
  outline?: 'bottom right' | 'bottom left'
  styles?: React.CSSProperties
  overlayGradient?: boolean
}

export default function SectionImage({
  image,
  radius,
  radiusValue,
  outline,
  overlayText,
  styles,
  overlayGradient,
}: ISectionImageProps) {
  const outlineStyle = classNames({
    'outline-bottom-right': outline === 'bottom right',
    'outline-bottom-left': outline === 'bottom left',
  })
  const radiusStyle = {
    all: `${radiusValue ?? '8rem'}`,
    'top left': `${radiusValue ?? '8rem'} 0 0 0`,
    'top right': `0 ${radiusValue ?? '8rem'} 0 0`,
    'bottom right': `0 0 ${radiusValue ?? '8rem'} 0`,
    'bottom left': `0 0 0 ${radiusValue ?? '8rem'}`,
  }
  return (
    <Box
      position='relative'
      width={{ base: '100%', sm: '45%' }}
      className={outlineStyle}
      style={{ ...styles }}
    >
      {overlayText && (
        <Box
          position='absolute'
          top='20%'
          left='20%'
          width='65%'
          height='65%'
          border='3px solid #fff'
          display='flex'
          alignItems='center'
          justifyContent='center'
          color='white'
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl', xl: '6xl' }}
          textTransform='uppercase'
        >
          {overlayText}
        </Box>
      )}
      <figure style={{ position: 'relative' }}>
        {overlayGradient && (
          <Box
            position='absolute'
            top='0'
            left='0'
            width='100%'
            height='100%'
            backgroundImage='linear-gradient(120deg, transparent, rgb(33 89 127 / 65%))'
            borderRadius={radius ? radiusStyle[radius] : 'none'}
          ></Box>
        )}
        <Image
          style={{ borderRadius: radius ? radiusStyle[radius] : 'none' }}
          src={image}
          alt='section-image'
          width={1000}
          height={1000}
        />
      </figure>
    </Box>
  )
}
